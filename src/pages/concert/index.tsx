import React, { useMemo, useState } from 'react';
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components';
import Taro, { useShareAppMessage } from '@tarojs/taro';
import classnames from 'classnames';
import ConcertCard from '@/components/ConcertCard';
import { concerts, concertNews } from '@/data/concerts';
import { corners } from '@/data/corners';
import { buildConcertShare } from '@/utils/share';
import { getImageUrl } from '@/utils/image';
import type { Corner } from '@/types/corner';
import styles from './index.module.scss';

type TabKey = 'schedule' | 'news';

const ConcertPage: React.FC = () => {
  const [tab, setTab] = useState<TabKey>('schedule');

  useShareAppMessage(() => buildConcertShare());

  // 场馆周边推荐：根据演唱会城市匹配同城市角落
  const venueCorners = useMemo(() => {
    const citySet = new Set(concerts.map((c) => c.city));
    return corners.filter((c) => citySet.has(c.city)).slice(0, 6);
  }, []);

  const handleCornerTap = (corner: Corner) => {
    console.log('[Concert] venue corner tap', corner.id);
    Taro.navigateTo({ url: `/pages/corner/index?cornerId=${corner.id}` }).catch((err: unknown) =>
      console.error('[Concert] navigate failed', err)
    );
  };

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <View className={styles.title}>2026 巡演</View>
        <View className={styles.subtitle}>「回到那一天」全球巡回演唱会</View>
      </View>

      <View className={styles.tabBar}>
        <View
          className={classnames(styles.tabItem, tab === 'schedule' && styles.tabActive)}
          onClick={() => {
            console.log('[Concert] tab schedule');
            setTab('schedule');
          }}
        >
          日程
        </View>
        <View
          className={classnames(styles.tabItem, tab === 'news' && styles.tabActive)}
          onClick={() => {
            console.log('[Concert] tab news');
            setTab('news');
          }}
        >
          官方动态
        </View>
      </View>

      {tab === 'schedule' ? (
        <View>
          <Swiper
            className={styles.swiper}
            circular
            autoplay
            interval={4500}
            previousMargin='24rpx'
            nextMargin='24rpx'
          >
            {concerts.slice(0, 3).map((concert) => (
              <SwiperItem key={concert.id} className={styles.swiperItem}>
                <ConcertCard concert={concert} />
              </SwiperItem>
            ))}
          </Swiper>

          <View className={styles.sectionLabel}>更多场次</View>
          <View className={styles.list}>
            {concerts.slice(3).map((concert) => (
              <ConcertCard key={concert.id} concert={concert} />
            ))}
          </View>

          {/* 场馆周边推荐 */}
          <View className={styles.nearbySection}>
            <View className={styles.nearbyHeader}>
              <View>
                <View className={styles.nearbyTitle}>场馆周边角落</View>
                <View className={styles.nearbySub}>演唱会前后，顺路去这些地方</View>
              </View>
              <View className={styles.nearbyCount}>{venueCorners.length} 个</View>
            </View>
            <View className={styles.nearbyList}>
              {venueCorners.map((corner) => (
                <View
                  key={corner.id}
                  className={styles.nearbyItem}
                  onClick={() => handleCornerTap(corner)}
                >
                  <Image
                    className={styles.nearbyImg}
                    src={getImageUrl(corner.imageId, 200, 200)}
                    mode='aspectFill'
                    lazyLoad
                  />
                  <View className={styles.nearbyBody}>
                    <View className={styles.nearbyName}>{corner.name}</View>
                    <View className={styles.nearbyLyric}>"{corner.lyric}"</View>
                    <View className={styles.nearbyMeta}>{corner.city} · {corner.categoryLabel}</View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      ) : (
        <View className={styles.newsList}>
          {concertNews.map((news) => (
            <View
              key={news.id}
              className={styles.newsCard}
              onClick={() => console.log('[Concert] news tap', news.id)}
            >
              <View className={styles.newsTopRow}>
                <Text className={styles.newsType}>{news.typeLabel}</Text>
                <Text className={styles.newsTime}>{news.time}</Text>
              </View>
              <View className={styles.newsTitle}>{news.title}</View>
              <View className={styles.newsSummary}>{news.summary}</View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default ConcertPage;
