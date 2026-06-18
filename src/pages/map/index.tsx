import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, Input } from '@tarojs/components';
import { useShareAppMessage } from '@tarojs/taro';
import TagChip from '@/components/TagChip';
import type { TagOption } from '@/components/TagChip';
import CornerCard from '@/components/CornerCard';
import EmptyState from '@/components/EmptyState';
import { corners } from '@/data/corners';
import { buildDiscoverShare } from '@/utils/share';
import type { Corner, CornerCategory } from '@/types/corner';
import styles from './index.module.scss';

type CategoryKey = 'all' | CornerCategory;

const tagOptions: TagOption[] = [
  { key: 'all', label: '🔥 全部' },
  { key: 'cafe', label: '咖啡馆' },
  { key: 'bookstore', label: '书店' },
  { key: 'record', label: '唱片店' },
  { key: 'graffiti', label: '涂鸦墙' },
  { key: 'venue', label: '演唱会场馆' },
  { key: 'newopen', label: '✨ 新开的店', highlight: true }
];

const MapPage: React.FC = () => {
  const [activeKey, setActiveKey] = useState<CategoryKey>('all');
  const [keyword, setKeyword] = useState('');

  useShareAppMessage(() => buildDiscoverShare());

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    const byCategory = activeKey === 'all'
      ? corners
      : corners.filter((c) => c.category === activeKey);

    if (!k) return byCategory;

    return byCategory.filter((c) => {
      const hit =
        c.lyric.toLowerCase().includes(k) ||
        c.song.toLowerCase().includes(k) ||
        c.name.toLowerCase().includes(k) ||
        c.city.toLowerCase().includes(k) ||
        c.moodTags.some((t) => t.toLowerCase().includes(k)) ||
        c.passcode.toLowerCase().includes(k);
      return hit;
    });
  }, [activeKey, keyword]);

  const handleClear = useCallback(() => {
    console.log('[Map] clear search');
    setKeyword('');
  }, []);

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <View className={styles.title}>歌词地图</View>
        <View className={styles.subtitle}>每一个标记 都对应一句五月天</View>
      </View>

      <View className={styles.fakeMap}>
        <View className={styles.mapGrid} />
        <View className={`${styles.dot} ${styles.dotA}`} />
        <View className={`${styles.dot} ${styles.dotB}`} />
        <View className={`${styles.dot} ${styles.dotC}`} />
        <View className={`${styles.dot} ${styles.dotD}`} />
        <View className={`${styles.dot} ${styles.dotE}`} />
        <View className={styles.mapInfo}>
          <View className={styles.mapCity}>当前定位 · 上海 · 永康路</View>
          <View className={styles.mapHeadline}>5km 内 {filtered.length} 个角落</View>
          <View className={styles.mapHint}>点击标记查看歌词与暗号</View>
        </View>
      </View>

      <View className={styles.searchRow}>
        <Input
          className={styles.searchInput}
          placeholder='试试 "温柔" / "倔强" / "知足"'
          placeholderClass={styles.searchPlaceholder}
          value={keyword}
          onInput={(e) => setKeyword(e.detail.value)}
          confirmType='search'
        />
        {keyword ? (
          <Text className={styles.searchAction} onClick={handleClear}>清除</Text>
        ) : (
          <Text className={styles.searchAction}>搜索</Text>
        )}
      </View>

      <TagChip
        options={tagOptions}
        activeKey={activeKey}
        onChange={(k: string) => setActiveKey(k as CategoryKey)}
      />

      <View className={styles.summary}>
        共 {filtered.length} 个 · 距离升序
      </View>

      <View className={styles.list}>
        {filtered.length === 0 ? (
          <EmptyState
            icon='♪'
            title='没找到对应的角落'
            subtitle={`换个歌词或标签试试，比如 "知足"、"温柔"、"倔强"`}
            actionText='重置搜索'
            onAction={handleClear}
          />
        ) : (
          filtered.map((corner: Corner) => <CornerCard key={corner.id} corner={corner} />)
        )}
      </View>
    </View>
  );
};

export default MapPage;
