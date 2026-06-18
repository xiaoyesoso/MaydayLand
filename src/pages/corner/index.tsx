import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, Image, Button } from '@tarojs/components';
import Taro, { useRouter, useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import PasscodeCard from '@/components/PasscodeCard';
import CommentSection from '@/components/CommentSection';
import { corners } from '@/data/corners';
import { isLiked, toggleLike } from '@/utils/storage';
import { getImageUrl } from '@/utils/image';
import { buildShareMessage, buildTimelineShare } from '@/utils/share';
import styles from './index.module.scss';

const CornerPage: React.FC = () => {
  const router = useRouter();
  const [liked, setLiked] = useState<boolean>(() => {
    const id = (router.params?.cornerId as string) || corners[0].id;
    return isLiked(id);
  });

  const cornerId = (router.params?.cornerId as string) || corners[0].id;

  const corner = useMemo(() => {
    const found = corners.find((c) => c.id === cornerId);
    if (!found) {
      console.error('[Corner] not found', cornerId);
    }
    return found;
  }, [cornerId]);

  // 分享
  useShareAppMessage(() => buildShareMessage(corner || corners[0]));
  useShareTimeline(() => buildTimelineShare(corner || corners[0]));

  const handleCheckin = useCallback(() => {
    if (!corner) return;
    console.log('[Corner] navigate to checkin', corner.id);
    Taro.navigateTo({
      url: `/pages/checkin/index?cornerId=${corner.id}`
    }).catch((err: unknown) => {
      console.error('[Corner] navigate failed', err);
    });
  }, [corner]);

  const handleLike = useCallback(() => {
    if (!corner) return;
    const { liked: newLiked } = toggleLike(corner.id);
    console.log('[Corner] like toggle', corner.id, newLiked);
    setLiked(newLiked);
  }, [corner]);

  if (!corner) {
    return (
      <View className={styles.page}>
        <View className={styles.notFound}>角落不见了，先回首页看看其他吧～</View>
      </View>
    );
  }

  const coverUrl = getImageUrl(corner.imageId, 750, 500);

  return (
    <View className={styles.page}>
      <View className={styles.cover}>
        <Image
          className={styles.coverImage}
          src={coverUrl}
          mode='aspectFill'
          onError={(e: unknown) => console.error('[Corner] cover error', corner.id, e)}
        />
        <View className={styles.coverMask} />
        <View className={styles.coverInfo}>
          <View className={styles.coverCategory}>{corner.categoryLabel}</View>
          <View className={styles.coverName}>{corner.name}</View>
          <View className={styles.coverAddr}>{corner.city} · {corner.address} · 距你 {corner.distanceText}</View>
        </View>
      </View>

      <View className={styles.lyricBox}>
        <View className={styles.lyricLabel}>SONG · LYRIC</View>
        <View className={styles.lyricText}>
          "{corner.lyric}"
        </View>
        <View className={styles.lyricCredit}>
          {corner.lyricCredit}
          <Text className={styles.song}>《{corner.song}》</Text>
        </View>
      </View>

      <PasscodeCard passcode={corner.passcode} song={corner.song} />

      <View className={styles.section}>
        <View className={styles.sectionTitle}>五迷推荐</View>
        <View className={styles.recommend}>{corner.recommend}</View>
        <View className={styles.tagsRow}>
          {corner.moodTags.map((t: string) => (
            <View key={t} className={styles.tag}>#{t}</View>
          ))}
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionTitle}>角落数据</View>
        <View className={styles.statRow}>
          <View className={styles.statItem}>
            <View className={styles.statNum}>{corner.likes + (liked ? 1 : 0)}</View>
            <View className={styles.statLabel}>喜欢</View>
          </View>
          <View className={styles.statDivider} />
          <View className={styles.statItem}>
            <View className={styles.statNum}>{corner.notes}</View>
            <View className={styles.statLabel}>笔记</View>
          </View>
          <View className={styles.statDivider} />
          <View className={styles.statItem}>
            <View className={styles.statNum}>{corner.distanceText}</View>
            <View className={styles.statLabel}>距离</View>
          </View>
        </View>
      </View>

      {/* 评论区 */}
      <CommentSection cornerId={corner.id} />

      <View className={styles.bottomBar}>
        <Button className={styles.btnSecondary} onClick={handleLike}>
          {liked ? '已喜欢' : '♥ 喜欢'}
        </Button>
        <Button className={styles.btnPrimary} onClick={handleCheckin}>
          ✦ 我要打卡
        </Button>
      </View>
    </View>
  );
};

export default CornerPage;
