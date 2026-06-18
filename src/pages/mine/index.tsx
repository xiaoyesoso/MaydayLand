import React, { useState, useCallback } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro, { useDidShow, useShareAppMessage } from '@tarojs/taro';
import { userBadges, userFootprints } from '@/data/badges';
import { getFootprints, getBadges, getUserInfo } from '@/utils/storage';
import { buildDiscoverShare } from '@/utils/share';
import { getImageUrl } from '@/utils/image';
import type { Badge, CheckinFootprint } from '@/types/corner';
import styles from './index.module.scss';

const tools = [
  { key: 'card', label: '我的卡片' },
  { key: 'submit', label: '推荐角落' },
  { key: 'fav', label: '收藏' },
  { key: 'service', label: '联系客服' }
];

const MinePage: React.FC = () => {
  const [footprints, setFootprints] = useState<CheckinFootprint[]>(userFootprints);
  const [badges, setBadges] = useState<Badge[]>(userBadges);
  const [userInfo] = useState(getUserInfo());

  // 每次显示页面时刷新本地数据
  useDidShow(() => {
    console.log('[Mine] page show, refresh local data');
    const localFootprints = getFootprints();
    const localBadges = getBadges();

    // 合并 mock 数据 + 本地数据（本地优先）
    const localCornerIds = new Set(localFootprints.map((f) => f.cornerId));
    const mergedFootprints = [
      ...localFootprints,
      ...userFootprints.filter((f) => !localCornerIds.has(f.cornerId))
    ];
    setFootprints(mergedFootprints);

    const localSongs = new Set(localBadges.map((b) => `${b.song}-${b.city}`));
    const mergedBadges = [
      ...localBadges,
      ...userBadges.filter((b) => !localSongs.has(`${b.song}-${b.city}`))
    ];
    setBadges(mergedBadges);
  });

  useShareAppMessage(() => buildDiscoverShare());

  const handleTool = useCallback((key: string) => {
    console.log('[Mine] tool tap', key);
    if (key === 'submit') {
      Taro.navigateTo({ url: '/pages/submit/index' }).catch((err: unknown) =>
        console.error('[Mine] navigate failed', err)
      );
    } else if (key === 'service') {
      Taro.showToast({ title: '客服功能开发中', icon: 'none' });
    } else {
      Taro.showToast({ title: '功能开发中', icon: 'none' });
    }
  }, []);

  const cityCount = new Set(footprints.map((f) => f.city)).size;

  return (
    <View className={styles.page}>
      <View className={styles.profile}>
        <View className={styles.glow} />
        <View className={styles.profileTop}>
          <View className={styles.avatar}>M</View>
          <View className={styles.profileMeta}>
            <View className={styles.userName}>{userInfo.name}</View>
            <View className={styles.userTag}>MAYDAY FAN · LV.{userInfo.level} · 半个温柔的人</View>
          </View>
        </View>
        <View className={styles.profileStats}>
          <View className={styles.statItem}>
            <View className={styles.statNum}>{footprints.length}</View>
            <View className={styles.statLabel}>打卡角落</View>
          </View>
          <View className={styles.statDivider} />
          <View className={styles.statItem}>
            <View className={styles.statNum}>{badges.length}</View>
            <View className={styles.statLabel}>五迷徽章</View>
          </View>
          <View className={styles.statDivider} />
          <View className={styles.statItem}>
            <View className={styles.statNum}>{cityCount}</View>
            <View className={styles.statLabel}>城市</View>
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionTitleRow}>
          <Text className={styles.sectionTitle}>徽章墙</Text>
          <Text className={styles.sectionSub}>对暗号解锁主题歌</Text>
        </View>
        <View className={styles.badgeGrid}>
          {badges.map((b: Badge) => (
            <View
              key={b.id}
              className={styles.badgeItem}
              onClick={() => console.log('[Mine] badge tap', b.id)}
            >
              <View className={styles.badgeIcon}>♪</View>
              <View className={styles.badgeSong}>{b.song}</View>
              <View className={styles.badgeMeta}>{b.city} · {b.unlockedAt}</View>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionTitleRow}>
          <Text className={styles.sectionTitle}>打卡足迹</Text>
          <Text className={styles.sectionSub}>近期</Text>
        </View>
        <View className={styles.footprintList}>
          {footprints.map((f: CheckinFootprint) => (
            <View
              key={f.id}
              className={styles.footprintItem}
              onClick={() => {
                console.log('[Mine] footprint tap', f.cornerId);
                Taro.navigateTo({ url: `/pages/corner/index?cornerId=${f.cornerId}` }).catch((err: unknown) =>
                  console.error('[Mine] navigate failed', err)
                );
              }}
            >
              <Image
                className={styles.footprintImg}
                src={getImageUrl(f.imageId, 200, 200)}
                mode='aspectFill'
                lazyLoad
                onError={(e: unknown) => console.error('[Mine] image error', f.id, e)}
              />
              <View className={styles.footprintBody}>
                <View className={styles.footprintTitle}>{f.cornerName}</View>
                <View className={styles.footprintLyric}>"{f.lyric}"</View>
                <View className={styles.footprintMeta}>{f.city} · {f.song} · {f.date}</View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionTitleRow}>
          <Text className={styles.sectionTitle}>常用工具</Text>
        </View>
        <View className={styles.toolGrid}>
          {tools.map((t) => (
            <View key={t.key} className={styles.toolItem} onClick={() => handleTool(t.key)}>
              <View className={styles.toolEmoji}>★</View>
              <Text>{t.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default MinePage;
