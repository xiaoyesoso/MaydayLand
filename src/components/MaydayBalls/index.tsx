import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';

interface MaydayBallsProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const MaydayBalls: React.FC<MaydayBallsProps> = ({ size = 'md', animated = true }) => {
  return (
    <View className={`${styles.balls} ${styles[size]} ${animated ? styles.animated : ''}`}>
      <View className={`${styles.ball} ${styles.blue}`} />
      <View className={`${styles.ball} ${styles.red}`} />
      <View className={`${styles.ball} ${styles.yellow}`} />
      <View className={`${styles.ball} ${styles.green}`} />
      <View className={`${styles.ball} ${styles.pink}`} />
    </View>
  );
};

export default MaydayBalls;
