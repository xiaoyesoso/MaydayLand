import React from 'react';
import { ScrollView, View, Text } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';

export interface TagOption {
  key: string;
  label: string;
  highlight?: boolean;
}

interface TagChipProps {
  options: TagOption[];
  activeKey: string;
  onChange: (key: string) => void;
}

const TagChip: React.FC<TagChipProps> = ({ options, activeKey, onChange }) => {
  return (
    <ScrollView className={styles.scroll} scrollX showScrollbar={false}>
      {options.map((opt: TagOption) => (
        <View
          key={opt.key}
          className={classnames(
            styles.chip,
            activeKey === opt.key && styles.active,
            opt.highlight && activeKey !== opt.key && styles.highlight
          )}
          onClick={() => {
            console.log('[TagChip] select', opt.key);
            onChange(opt.key);
          }}
        >
          <Text>{opt.label}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default TagChip;
