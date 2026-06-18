import React, { useState, useCallback } from 'react';
import { View, Canvas, Button, Image } from '@tarojs/components';
import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro';
import { corners } from '@/data/corners';
import { addFootprint, addBadge } from '@/utils/storage';
import { buildShareMessage } from '@/utils/share';
import type { Corner } from '@/types/corner';
import styles from './index.module.scss';

type TemplateKey = 'polaroid' | 'ticket' | 'film';

const templates: { key: TemplateKey; name: string; desc: string }[] = [
  { key: 'polaroid', name: '复古拍立得', desc: '白边手写' },
  { key: 'ticket', name: '演唱会票根', desc: '深色锯齿' },
  { key: 'film', name: '极简胶片', desc: '全屏渐变' }
];

const CheckinPage: React.FC = () => {
  const router = useRouter();
  const cornerId = (router.params?.cornerId as string) || corners[0].id;
  const corner = corners.find((c) => c.id === cornerId) || corners[0];

  const [photoPath, setPhotoPath] = useState<string>('');
  const [template, setTemplate] = useState<TemplateKey>('polaroid');
  const [cardImagePath, setCardImagePath] = useState<string>('');
  const [generating, setGenerating] = useState(false);

  useShareAppMessage(() => {
    if (cardImagePath) {
      return buildShareMessage(corner, cardImagePath);
    }
    return {
      title: `我在${corner.city}${corner.name}，遇见了一句${corner.lyric}`,
      path: `/pages/corner/index?cornerId=${corner.id}`
    };
  });

  // 选择照片
  const handleChoosePhoto = useCallback(() => {
    console.log('[Checkin] choose photo');
    Taro.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      sizeType: ['compressed'],
      success: (res) => {
        const tempPath = res.tempFiles[0].tempFilePath;
        console.log('[Checkin] photo selected', tempPath);
        setPhotoPath(tempPath);
      },
      fail: (err: unknown) => {
        console.error('[Checkin] choose photo failed', err);
      }
    });
  }, []);

  // Canvas 合成卡片
  const generateCard = useCallback(async () => {
    if (!photoPath) {
      Taro.showToast({ title: '请先选择一张照片', icon: 'none' });
      return;
    }

    setGenerating(true);
    console.log('[Checkin] generate card', template);

    try {
      const query = Taro.createSelectorQuery();
      query
        .select('#cardCanvas')
        .fields({ node: true, size: true })
        .exec(async (res) => {
          if (!res[0] || !res[0].node) {
            console.error('[Checkin] canvas node not found');
            setGenerating(false);
            return;
          }

          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');
          const dpr = Taro.getSystemInfoSync().pixelRatio;
          const canvasW = res[0].width;
          const canvasH = res[0].height;
          canvas.width = canvasW * dpr;
          canvas.height = canvasH * dpr;
          ctx.scale(dpr, dpr);

          // 加载照片
          const img = canvas.createImage();
          img.src = photoPath;
          img.onload = () => {
            drawCard(ctx, canvas, img, canvasW, canvasH, corner, template);

            // 导出
            Taro.canvasToTempFilePath({
              canvas: canvas,
              success: (exportRes) => {
                console.log('[Checkin] card exported', exportRes.tempFilePath);
                setCardImagePath(exportRes.tempFilePath);
                setGenerating(false);
                Taro.showToast({ title: '卡片已生成', icon: 'success' });
              },
              fail: (err: unknown) => {
                console.error('[Checkin] export failed', err);
                setGenerating(false);
                Taro.showToast({ title: '生成失败，请重试', icon: 'none' });
              }
            });
          };
          img.onerror = (e: unknown) => {
            console.error('[Checkin] image load failed', e);
            setGenerating(false);
            Taro.showToast({ title: '图片加载失败', icon: 'none' });
          };
        });
    } catch (err) {
      console.error('[Checkin] generate error', err);
      setGenerating(false);
    }
  }, [photoPath, template, corner]);

  // 保存到相册
  const handleSave = useCallback(() => {
    if (!cardImagePath) {
      Taro.showToast({ title: '请先生成卡片', icon: 'none' });
      return;
    }
    console.log('[Checkin] save to album');
    Taro.saveImageToPhotosAlbum({
      filePath: cardImagePath,
      success: () => {
        console.log('[Checkin] saved');
        Taro.showToast({ title: '已保存到相册', icon: 'success' });
      },
      fail: (err: unknown) => {
        console.error('[Checkin] save failed', err);
        Taro.showToast({ title: '保存失败，请授权相册权限', icon: 'none' });
      }
    });
  }, [cardImagePath]);

  // 确认打卡（写入足迹 + 徽章）
  const handleConfirmCheckin = useCallback(() => {
    console.log('[Checkin] confirm checkin', corner.id);

    // 写入足迹
    addFootprint({
      id: `f_${Date.now()}`,
      cornerId: corner.id,
      cornerName: corner.name,
      city: corner.city,
      song: corner.song,
      lyric: corner.lyric,
      date: new Date().toISOString().slice(0, 10),
      imageId: corner.imageId
    });

    // 写入徽章
    addBadge({
      id: `b_${Date.now()}`,
      song: corner.passcode,
      city: corner.city,
      unlockedAt: new Date().toISOString().slice(0, 10)
    });

    Taro.showToast({ title: '打卡成功！', icon: 'success' });

    setTimeout(() => {
      Taro.navigateBack();
    }, 1500);
  }, [corner]);

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <View className={styles.title}>生成打卡卡片</View>
        <View className={styles.subtitle}>{corner.name} · {corner.city}</View>
      </View>

      {/* Canvas 预览 */}
      <View className={`${styles.canvasWrap} ${cardImagePath ? styles.canvasWrapGenerated : ''}`}>
        <Canvas
          type='2d'
          id='cardCanvas'
          className={styles.canvas}
        />
        {!cardImagePath && (
          <View className={styles.canvasPlaceholder}>
            <View className={styles.placeholderIcon}>✦</View>
            <View>选择照片后点击「生成卡片」</View>
          </View>
        )}
      </View>

      {/* 照片选择 */}
      <View className={styles.photoSection}>
        <View className={styles.sectionLabel}>现场照片</View>
        {photoPath ? (
          <View className={styles.photoPreview}>
            <Image className={styles.photoPreviewImg} src={photoPath} mode='aspectFill' />
            <View className={styles.photoChangeBtn} onClick={handleChoosePhoto}>
              重新选择
            </View>
          </View>
        ) : (
          <View className={styles.photoPicker} onClick={handleChoosePhoto}>
            <View className={styles.photoPickerIcon}>+</View>
            <View>点击拍摄或选择照片</View>
          </View>
        )}
      </View>

      {/* 模板选择 */}
      <View className={styles.templateSection}>
        <View className={styles.sectionLabel}>卡片模板</View>
        <View className={styles.templateList}>
          {templates.map((t) => (
            <View
              key={t.key}
              className={`${styles.templateItem} ${
                t.key === 'polaroid' ? styles.templatePolaroid :
                t.key === 'ticket' ? styles.templateTicket :
                styles.templateFilm
              } ${template === t.key ? styles.templateActive : ''}`}
              onClick={() => {
                console.log('[Checkin] template', t.key);
                setTemplate(t.key);
              }}
            >
              <View className={styles.templateName}>{t.name}</View>
              <View className={styles.templateDesc}>{t.desc}</View>
            </View>
          ))}
        </View>
      </View>

      {/* 歌词预览 */}
      <View className={styles.lyricPreview}>
        <View className={styles.lyricLabel}>LYRIC</View>
        <View className={styles.lyricText}>"{corner.lyric}"</View>
        <View className={styles.lyricSong}>《{corner.song}》 · {corner.lyricCredit}</View>
      </View>

      {/* 底部操作栏 */}
      <View className={styles.bottomBar}>
        <Button
          className={`${styles.btnSecondary} ${generating ? styles.btnDisabled : ''}`}
          onClick={generateCard}
          disabled={generating}
        >
          {generating ? '生成中...' : '生成卡片'}
        </Button>
        <Button
          className={styles.btnSecondary}
          onClick={handleSave}
          disabled={!cardImagePath}
        >
          保存相册
        </Button>
        <Button
          className={`${styles.btnPrimary} ${!cardImagePath ? styles.btnDisabled : ''}`}
          onClick={handleConfirmCheckin}
          disabled={!cardImagePath}
        >
          确认打卡
        </Button>
      </View>
    </View>
  );
};

// ============ Canvas 绘制逻辑 ============

function drawCard(
  ctx: any,
  _canvas: any,
  img: any,
  w: number,
  h: number,
  corner: Corner,
  template: TemplateKey
) {
  const date = new Date().toISOString().slice(0, 10);

  if (template === 'polaroid') {
    // 复古拍立得：白底 + 照片居中 + 底部歌词
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    const padding = 30;
    const imgW = w - padding * 2;
    const imgH = h - padding * 2 - 120;
    const imgX = padding;
    const imgY = padding;

    // 绘制照片（cover 模式）
    drawImageCover(ctx, img, imgX, imgY, imgW, imgH);

    // 歌词
    ctx.fillStyle = '#2d2a24';
    ctx.font = 'italic bold 20px sans-serif';
    ctx.textAlign = 'center';
    wrapText(ctx, `"${corner.lyric}"`, w / 2, imgY + imgH + 40, w - 60, 26);

    // 地点 + 日期
    ctx.fillStyle = '#a39e91';
    ctx.font = '12px sans-serif';
    ctx.fillText(`${corner.name} · ${corner.city} · ${date}`, w / 2, h - 25);
  } else if (template === 'ticket') {
    // 演唱会票根：深色背景 + 照片 + 票根信息
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#2d2a24');
    grad.addColorStop(1, '#4a3f35');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // 照片区域
    const padding = 30;
    const imgW = w - padding * 2;
    const imgH = h * 0.55;
    drawImageCover(ctx, img, padding, padding, imgW, imgH);

    // 票根分割线
    ctx.strokeStyle = '#d4a574';
    ctx.lineWidth = 1;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(padding, padding + imgH + 16);
    ctx.lineTo(w - padding, padding + imgH + 16);
    ctx.stroke();
    ctx.setLineDash([]);

    // 歌词
    ctx.fillStyle = '#d4a574';
    ctx.font = 'italic bold 18px sans-serif';
    ctx.textAlign = 'center';
    wrapText(ctx, `"${corner.lyric}"`, w / 2, padding + imgH + 50, w - 60, 24);

    // 票根信息
    ctx.fillStyle = '#e8c89e';
    ctx.font = '12px sans-serif';
    ctx.fillText(`《${corner.song}》`, w / 2, h - 50);
    ctx.fillStyle = '#a39e91';
    ctx.font = '11px sans-serif';
    ctx.fillText(`${corner.name} · ${corner.city} · ${date}`, w / 2, h - 28);
  } else {
    // 极简胶片：全屏照片 + 渐变遮罩 + 底部歌词
    drawImageCover(ctx, img, 0, 0, w, h);

    // 底部渐变遮罩
    const grad = ctx.createLinearGradient(0, h * 0.4, 0, h);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(0,0,0,0.85)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, h * 0.4, w, h * 0.6);

    // 歌词
    ctx.fillStyle = '#d4a574';
    ctx.font = 'italic bold 22px sans-serif';
    ctx.textAlign = 'center';
    wrapText(ctx, `"${corner.lyric}"`, w / 2, h - 80, w - 60, 28);

    // 地点
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '12px sans-serif';
    ctx.fillText(`${corner.name} · ${corner.city} · ${date}`, w / 2, h - 25);
  }
}

// cover 模式绘制图片
function drawImageCover(ctx: any, img: any, x: number, y: number, w: number, h: number) {
  const imgRatio = img.width / img.height;
  const boxRatio = w / h;
  let sx = 0, sy = 0, sw = img.width, sh = img.height;

  if (imgRatio > boxRatio) {
    sw = img.height * boxRatio;
    sx = (img.width - sw) / 2;
  } else {
    sh = img.width / boxRatio;
    sy = (img.height - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

// 文字换行
function wrapText(ctx: any, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const chars = text.split('');
  let line = '';
  let lineCount = 0;

  for (let i = 0; i < chars.length; i++) {
    const testLine = line + chars[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line.length > 0) {
      ctx.fillText(line, x, y + lineCount * lineHeight);
      line = chars[i];
      lineCount++;
      if (lineCount >= 2) break; // 最多 2 行
    } else {
      line = testLine;
    }
  }
  if (line.length > 0 && lineCount < 2) {
    ctx.fillText(line, x, y + lineCount * lineHeight);
  }
}

export default CheckinPage;
