import React, { useState, useCallback } from 'react';
import { View, Text, Input, Button } from '@tarojs/components';
import classnames from 'classnames';
import { getComments, addComment } from '@/utils/storage';
import styles from './index.module.scss';

interface CommentItem {
  name: string;
  text: string;
  time: string;
}

// 预置评论（模拟其他五迷的留言）
const presetComments: Record<string, CommentItem[]> = {
  default: [
    { name: '温柔的五迷', text: '对暗号的时候老板直接放了《倔强》，全场一起唱！', time: '2 小时前' },
    { name: '憨人阿星', text: '打卡成功！明信片已收到，超有仪式感', time: '昨天' },
    { name: '知足女孩', text: '这家店的拿铁拉花真的是吉他图案，太用心了', time: '3 天前' }
  ]
};

interface CommentSectionProps {
  cornerId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ cornerId }) => {
  const [inputValue, setInputValue] = useState('');
  const [localComments, setLocalComments] = useState<string[]>(() => getComments(cornerId));

  const preset = presetComments.default;

  const handleSend = useCallback(() => {
    const text = inputValue.trim();
    if (!text) {
      console.log('[CommentSection] empty input');
      return;
    }
    console.log('[CommentSection] send', cornerId, text);
    const next = addComment(cornerId, text);
    setLocalComments(next);
    setInputValue('');
  }, [inputValue, cornerId]);

  return (
    <View className={styles.section}>
      <View className={styles.header}>
        <Text className={styles.title}>五迷留言</Text>
        <Text className={styles.count}>{preset.length + localComments.length} 条</Text>
      </View>

      <View className={styles.inputRow}>
        <Input
          className={styles.input}
          placeholder='留下一句歌词或感受...'
          placeholderClass={styles.inputPlaceholder}
          maxlength={200}
          value={inputValue}
          onInput={(e) => setInputValue(e.detail.value)}
        />
        <Button
          className={classnames(styles.sendBtn, !inputValue.trim() && styles.sendBtnDisabled)}
          onClick={handleSend}
          disabled={!inputValue.trim()}
        >
          发送
        </Button>
      </View>

      <View className={styles.list}>
        {localComments.map((text, idx) => (
          <View key={`local-${idx}`} className={styles.item}>
            <View className={styles.avatar}>我</View>
            <View className={styles.body}>
              <View className={styles.name}>城市漫游者 · 刚刚</View>
              <View className={styles.text}>{text}</View>
              <View className={styles.time}>刚刚</View>
            </View>
          </View>
        ))}
        {preset.map((c, idx) => (
          <View key={`preset-${idx}`} className={styles.item}>
            <View className={styles.avatar}>{c.name.charAt(0)}</View>
            <View className={styles.body}>
              <View className={styles.name}>{c.name}</View>
              <View className={styles.text}>{c.text}</View>
              <View className={styles.time}>{c.time}</View>
            </View>
          </View>
        ))}
      </View>

      {preset.length === 0 && localComments.length === 0 && (
        <View className={styles.empty}>
          <View className={styles.emptyIcon}>♪</View>
          <View>还没有五迷留言，来抢沙发吧</View>
        </View>
      )}
    </View>
  );
};

export default CommentSection;
