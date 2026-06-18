import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getImageUrl } from '@/utils/image';
import type { Corner } from '@/types/corner';
import styles from './index.module.scss';

interface CornerCardProps {
  corner: Corner;
}

const CornerCard: React.FC<CornerCardProps> = ({ corner }) => {
  const handleTap = () => {
    console.log('[CornerCard] navigate to corner', corner.id);
    Taro.navigateTo({
      url: `/pages/corner/index?cornerId=${corner.id}`
    }).catch((err: unknown) => {
      console.error('[CornerCard] navigate failed', err);
    });
  };

  const imageUrl = getImageUrl(corner.imageId, 750, 500);

  return (
    <View className={styles.card} onClick={handleTap}>
      <View className={styles.cover}>
        <Image
          className={styles.coverImage}
          src={imageUrl}
          mode='aspectFill'
          lazyLoad
          onError={(e: unknown) => console.error('[CornerCard] image error', corner.id, e)}
        />
        <View className={styles.categoryTag}>{corner.categoryLabel}</View>
        <View className={styles.lyricOverlay}>"{corner.lyric}"</View>
      </View>
      <View className={styles.body}>
        <View className={styles.title}>{corner.name}</View>
        <View className={styles.location}>
          <Text className={styles.locationDot}>·</Text>
          {corner.city} · {corner.address} · {corner.distanceText}
        </View>
        <View className={styles.recommend}>{corner.recommend}</View>
        <View className={styles.meta}>
          <Text className={styles.metaItem}>♥ {corner.likes}</Text>
          <Text className={styles.metaItem}>笔记 {corner.notes}</Text>
          <Text className={styles.passcode}>暗号 · {corner.passcode}</Text>
        </View>
      </View>
    </View>
  );
};

export default CornerCard;
