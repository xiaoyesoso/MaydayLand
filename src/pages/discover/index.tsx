import React, { useMemo, useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useDidShow, useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import LyricBanner from '@/components/LyricBanner';
import CornerCard from '@/components/CornerCard';
import Skeleton from '@/components/Skeleton';
import MaydayBalls from '@/components/MaydayBalls';
import BubuEar from '@/components/BubuEar';
import { corners } from '@/data/corners';
import { buildDiscoverShare } from '@/utils/share';
import styles from './index.module.scss';

const DiscoverPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useDidShow(() => {
    console.log('[Discover] page show');
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  });

  useShareAppMessage(() => buildDiscoverShare());
  useShareTimeline(() => ({
    title: '五月天·城市漫游 — 跟着歌词，发现城市里的五迷角落',
    query: ''
  }));

  const cityCount = useMemo(() => {
    const set = new Set(corners.map((c) => c.city));
    return set.size;
  }, []);

  const handleSearchTap = () => {
    console.log('[Discover] search tap');
    Taro.switchTab({ url: '/pages/map/index' }).catch((err: unknown) =>
      console.error('[Discover] switchTab failed', err)
    );
  };

  const handleBentoTap = (key: string) => {
    console.log('[Discover] bento tap', key);
    if (key === 'map') {
      Taro.switchTab({ url: '/pages/map/index' });
    } else if (key === 'concert') {
      Taro.switchTab({ url: '/pages/concert/index' });
    } else if (key === 'checkin') {
      const first = corners[0];
      Taro.navigateTo({ url: `/pages/checkin/index?cornerId=${first.id}` }).catch((err: unknown) =>
        console.error('[Discover] navigate failed', err)
      );
    } else {
      Taro.showToast({ title: '功能开发中', icon: 'none' });
    }
  };

  const hotCorners = corners.slice(0, 6);

  const headline = '鸟巢 55 场毕业快乐';
  const lyric = '从无名高地到鸟巢的 10 年，谢谢你们对五月天的疼爱';

  return (
    <View className={styles.page}>
      {/* 页头装饰：五球散落 + 卜卜触角 */}
      <View className={styles.heroDecor}>
        <View className={`${styles.decorDot} ${styles.dotBlue}`} />
        <View className={`${styles.decorDot} ${styles.dotRed}`} />
        <View className={`${styles.decorDot} ${styles.dotYellow}`} />
        <View className={`${styles.decorDot} ${styles.dotGreen}`} />
        <View className={`${styles.decorDot} ${styles.dotPink}`} />
      </View>

      <View className={styles.heroTop}>
        <View className={styles.greetingRow}>
          <View className={styles.greeting}>嘿 五迷，今天想去哪里漫游</View>
          <MaydayBalls size='sm' animated />
        </View>
        <View className={styles.greetingName}>
          跟着歌词
          <Text className={styles.greetingHighlight}>发现城市角落</Text>
        </View>
      </View>

      <LyricBanner
        headline={headline}
        lyric={lyric}
        cornerCount={corners.length}
        cityCount={cityCount}
      />

      <View className={styles.searchBox} onClick={handleSearchTap}>
        <Text className={styles.searchIcon}>☌</Text>
        <Text className={styles.searchText}>搜索城市 / 歌词 / 店铺</Text>
        <View className={styles.searchBadge}>GO</View>
      </View>

      <View className={styles.sectionHeader}>
        <Text className={styles.sectionTitle}>快速入口</Text>
        <Text className={styles.sectionSub}>三个心情起点</Text>
      </View>

      <View className={styles.bentoGrid}>
        <View
          className={`${styles.bentoItem} ${styles.bentoItemA}`}
          onClick={() => handleBentoTap('map')}
        >
          <BubuEar position='top-right' />
          <Text className={styles.bentoEmoji}>♢</Text>
          <View>
            <View className={styles.bentoTitle}>歌词地图</View>
            <View className={styles.bentoDesc}>按情绪找角落</View>
          </View>
        </View>
        <View
          className={`${styles.bentoItem} ${styles.bentoItemB}`}
          onClick={() => handleBentoTap('checkin')}
        >
          <Text className={styles.bentoEmoji}>✦</Text>
          <View>
            <View className={styles.bentoTitle}>打卡卡片</View>
            <View className={styles.bentoDesc}>歌词 + 你</View>
          </View>
        </View>
        <View
          className={`${styles.bentoItem} ${styles.bentoItemC}`}
          onClick={() => handleBentoTap('concert')}
        >
          <Text className={styles.bentoEmoji}>♪</Text>
          <View>
            <View className={styles.bentoTitle}>演唱会</View>
            <View className={styles.bentoDesc}>同场同行</View>
          </View>
        </View>
      </View>

      <View className={styles.sectionHeader}>
        <Text className={styles.sectionTitle}>热门歌词角落</Text>
        <Text className={styles.sectionSub}>本周五迷打卡 Top 6</Text>
      </View>
      <View className={styles.cornerList}>
        {loading ? (
          <Skeleton type='card' rows={3} />
        ) : (
          hotCorners.map((corner) => <CornerCard key={corner.id} corner={corner} />)
        )}
      </View>
    </View>
  );
};

export default DiscoverPage;
