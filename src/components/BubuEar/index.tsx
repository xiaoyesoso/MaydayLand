import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';

interface BubuEarProps {
  position?: 'top-left' | 'top-right';
}

// 抽象卜卜怪兽角：用小圆球 + 触角表现，不直接使用版权形象
const BubuEar: React.FC<BubuEarProps> = ({ position = 'top-right' }) => {
  return (
    <View className={`${styles.ear} ${styles[position]}`}>
      <View className={styles.horn} />
      <View className={styles.dot} />
    </View>
  );
};

export default BubuEar;
