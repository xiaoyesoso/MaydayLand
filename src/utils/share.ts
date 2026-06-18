/**
 * 分享文案生成工具
 */

import type { Corner } from '@/types/corner'

export function buildShareMessage(corner: Corner, cardImage?: string) {
  return {
    title: `我在${corner.city}遇见一句"${corner.lyric}"`,
    path: `/pages/corner/index?cornerId=${corner.id}`,
    imageUrl: cardImage
  }
}

export function buildTimelineShare(corner: Corner, cardImage?: string) {
  return {
    title: `跟着歌词，发现城市里的五迷角落 | MaydayLand`,
    query: `cornerId=${corner.id}`,
    imageUrl: cardImage
  }
}

export function buildDiscoverShare() {
  return {
    title: '五月天·城市漫游 — 跟着歌词，发现城市里的五迷角落',
    path: '/pages/discover/index',
    imageUrl: ''
  }
}

export function buildConcertShare(city?: string) {
  return {
    title: city
      ? `五月天${city}站演唱会 — 周边歌词角落打卡攻略`
      : '五月天 2026 巡演 — 周边歌词角落打卡攻略',
    path: '/pages/concert/index',
    imageUrl: ''
  }
}
