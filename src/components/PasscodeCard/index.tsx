import React, { useState, useCallback } from 'react';
import { View, Text, Canvas, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';

interface PasscodeCardProps {
  passcode: string;
  song?: string;
}

const PasscodeCard: React.FC<PasscodeCardProps> = ({ passcode, song }) => {
  const [showQr, setShowQr] = useState(false);

  const drawQrCode = useCallback(() => {
    // 绘制暗号二维码：把暗号文本编码为简单点阵
    const query = Taro.createSelectorQuery();
    query
      .select('#passcodeQr')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0] || !res[0].node) return;

        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const dpr = Taro.getSystemInfoSync().pixelRatio;
        const size = res[0].width;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        ctx.scale(dpr, dpr);

        // 背景
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);

        // 用暗号字符串生成伪随机点阵
        const cells = 21;
        const cellSize = (size - 40) / cells;
        const seed = passcode.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

        // 定位角（模拟 QR 定位图案）
        drawPositionPattern(ctx, 10, 10, cellSize * 7);
        drawPositionPattern(ctx, size - 10 - cellSize * 7, 10, cellSize * 7);
        drawPositionPattern(ctx, 10, size - 10 - cellSize * 7, cellSize * 7);

        // 数据点
        ctx.fillStyle = '#2d2a24';
        for (let row = 0; row < cells; row++) {
          for (let col = 0; col < cells; col++) {
            // 跳过定位角区域
            if (
              (row < 7 && col < 7) ||
              (row < 7 && col >= cells - 7) ||
              (row >= cells - 7 && col < 7)
            ) {
              continue;
            }
            const value = Math.sin(seed + row * 3 + col * 7) > 0;
            if (value) {
              ctx.fillRect(
                20 + col * cellSize,
                20 + row * cellSize,
                cellSize * 0.85,
                cellSize * 0.85
              );
            }
          }
        }
      });
  }, [passcode]);

  const handleTap = useCallback(() => {
    console.log('[PasscodeCard] open qr', passcode);
    setShowQr(true);
    // 等弹窗渲染后绘制
    setTimeout(() => drawQrCode(), 100);
  }, [drawQrCode, passcode]);

  const handleClose = useCallback(() => {
    console.log('[PasscodeCard] close qr');
    setShowQr(false);
  }, []);

  return (
    <>
      <View className={styles.card} onClick={handleTap}>
        <View className={styles.icon}>♪</View>
        <View className={styles.body}>
          <View className={styles.title}>五迷暗号 {song ? `· ${song}` : ''}</View>
          <View className={styles.passcode}>{passcode}</View>
        </View>
        <Text className={styles.action}>对暗号</Text>
      </View>

      {showQr && (
        <View className={styles.mask} onClick={handleClose}>
          <View className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <View className={styles.modalTitle}>到店出示暗号</View>
            <View className={styles.modalSub}>{song ? `《${song}》` : ''} · {passcode}</View>
            <Canvas
              type='2d'
              id='passcodeQr'
              className={styles.qrCanvas}
            />
            <View className={styles.modalHint}>店员扫码后可解锁主题歌单</View>
            <Button className={styles.modalBtn} onClick={handleClose}>
              关闭
            </Button>
          </View>
        </View>
      )}
    </>
  );
};

function drawPositionPattern(ctx: any, x: number, y: number, size: number) {
  ctx.fillStyle = '#2d2a24';
  ctx.fillRect(x, y, size, size);
  ctx.clearRect(x + size * 0.15, y + size * 0.15, size * 0.7, size * 0.7);
  ctx.fillRect(x + size * 0.3, y + size * 0.3, size * 0.4, size * 0.4);
}

export default PasscodeCard;
