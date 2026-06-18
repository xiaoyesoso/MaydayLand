import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

interface LyricBannerProps {
  label?: string;
  headline: string;
  lyric: string;
  cornerCount: number;
  cityCount: number;
}

const LyricBanner: React.FC<LyricBannerProps> = ({
  label = '2026 最新 · 真实五迷角落',
  headline,
  lyric,
  cornerCount,
  cityCount
}) => {
  return (
    <View className={styles.banner}>
      <View className={styles.glow} />
      <View className={styles.label}>{label}</View>
      <View className={styles.headline}>{headline}</View>
      <View className={styles.lyric}>"{lyric}"</View>
      <View className={styles.metaRow}>
        <Text className={styles.metaItem}>{cornerCount} 个歌词角落</Text>
        <View className={styles.metaDivider} />
        <Text className={styles.metaItem}>{cityCount} 座城市</Text>
        <View className={styles.metaDivider} />
        <Text className={styles.metaItem}>持续共创中</Text>
      </View>
    </View>
  );
};

export default LyricBanner;
