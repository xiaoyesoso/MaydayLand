import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getPosterUrl } from '@/utils/image';
import type { Concert } from '@/types/concert';
import styles from './index.module.scss';

interface ConcertCardProps {
  concert: Concert;
}

const statusLabel: Record<Concert['status'], string> = {
  upcoming: '即将开演',
  live: '正在现场',
  past: '已结束',
  ended: '已收官'
};

const ConcertCard: React.FC<ConcertCardProps> = ({ concert }) => {
  const handleTap = () => {
    console.log('[ConcertCard] tap', concert.id);
    Taro.showToast({ title: `${concert.city} 站详情（演示）`, icon: 'none' });
  };

  const posterUrl = getPosterUrl(concert.posterId);

  return (
    <View className={styles.card} onClick={handleTap}>
      <Image
        className={styles.poster}
        src={posterUrl}
        mode='aspectFill'
        lazyLoad
        onError={(e: unknown) => console.error('[ConcertCard] image error', concert.id, e)}
      />
      <View className={styles.mask} />
      <View className={styles.body}>
        <View className={styles.statusBadge}>{statusLabel[concert.status]}</View>
        <View className={styles.city}>五月天 · {concert.city}站</View>
        <View className={styles.venue}>{concert.venue} · {concert.dateText}</View>
        <View className={styles.metaRow}>
          <Text>周边 {concert.cornerCount} 个歌词角落</Text>
          <View className={styles.cornerCount}>查看场馆地图 ›</View>
        </View>
      </View>
    </View>
  );
};

export default ConcertCard;
