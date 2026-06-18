import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';

interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle?: string;
  actionText?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '♪',
  title,
  subtitle,
  actionText,
  onAction
}) => {
  return (
    <View className={styles.empty}>
      <View className={styles.icon}>{icon}</View>
      <View className={styles.title}>{title}</View>
      {subtitle && <View className={styles.subtitle}>{subtitle}</View>}
      {actionText && onAction && (
        <View className={styles.action} onClick={onAction}>
          {actionText}
        </View>
      )}
    </View>
  );
};

export default EmptyState;
