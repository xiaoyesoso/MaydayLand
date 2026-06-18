import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';

interface SkeletonProps {
  rows?: number;
  type?: 'card' | 'text' | 'avatar' | 'banner';
}

const Skeleton: React.FC<SkeletonProps> = ({ rows = 1, type = 'card' }) => {
  return (
    <View className={styles.skeleton}>
      {Array.from({ length: rows }).map((_, idx) => (
        <View
          key={idx}
          className={
            type === 'banner'
              ? styles.banner
              : type === 'text'
              ? styles.text
              : type === 'avatar'
              ? styles.avatarRow
              : styles.card
          }
        >
          {type === 'card' && (
            <>
              <View className={styles.image} />
              <View className={styles.body}>
                <View className={styles.title} />
                <View className={styles.desc} />
              </View>
            </>
          )}
          {type === 'avatar' && (
            <>
              <View className={styles.circle} />
              <View className={styles.lines}>
                <View className={styles.line} />
                <View className={styles.lineShort} />
              </View>
            </>
          )}
        </View>
      ))}
    </View>
  );
};

export default Skeleton;
