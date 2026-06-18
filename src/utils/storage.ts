/**
 * 本地存储工具
 * 管理评论、打卡足迹、喜欢列表
 */

import Taro from '@tarojs/taro'

const STORAGE_KEYS = {
  COMMENTS: 'maydayland_comments',      // { [cornerId]: string[] }
  FOOTPRINTS: 'maydayland_footprints',   // CheckinFootprint[]
  LIKES: 'maydayland_likes',            // string[] (cornerIds)
  BADGES: 'maydayland_badges',           // Badge[]
  USER_INFO: 'maydayland_user',          // { name, level }
  PENDING_CORNERS: 'maydayland_pending_corners' // PendingCorner[]
} as const

// ============ 评论 ============

export function getComments(cornerId: string): string[] {
  const all = Taro.getStorageSync(STORAGE_KEYS.COMMENTS) || {}
  return all[cornerId] || []
}

export function addComment(cornerId: string, text: string): string[] {
  const all = Taro.getStorageSync(STORAGE_KEYS.COMMENTS) || {}
  const list = all[cornerId] || []
  const next = [text, ...list].slice(0, 10)
  all[cornerId] = next
  Taro.setStorageSync(STORAGE_KEYS.COMMENTS, all)
  return next
}

// ============ 打卡足迹 ============

import type { CheckinFootprint } from '@/types/corner'

export function getFootprints(): CheckinFootprint[] {
  return Taro.getStorageSync(STORAGE_KEYS.FOOTPRINTS) || []
}

export function addFootprint(footprint: CheckinFootprint): CheckinFootprint[] {
  const list = getFootprints()
  // 避免同一角落重复打卡
  const filtered = list.filter((f) => f.cornerId !== footprint.cornerId)
  const next = [footprint, ...filtered]
  Taro.setStorageSync(STORAGE_KEYS.FOOTPRINTS, next)
  return next
}

// ============ 喜欢 ============

export function getLikes(): string[] {
  return Taro.getStorageSync(STORAGE_KEYS.LIKES) || []
}

export function toggleLike(cornerId: string): { likes: string[]; liked: boolean } {
  const list = getLikes()
  const idx = list.indexOf(cornerId)
  let liked: boolean
  let next: string[]
  if (idx >= 0) {
    next = list.filter((id) => id !== cornerId)
    liked = false
  } else {
    next = [cornerId, ...list]
    liked = true
  }
  Taro.setStorageSync(STORAGE_KEYS.LIKES, next)
  return { likes: next, liked }
}

export function isLiked(cornerId: string): boolean {
  return getLikes().includes(cornerId)
}

// ============ 徽章 ============

import type { Badge } from '@/types/corner'

export function getBadges(): Badge[] {
  return Taro.getStorageSync(STORAGE_KEYS.BADGES) || []
}

export function addBadge(badge: Badge): Badge[] {
  const list = getBadges()
  if (list.some((b) => b.song === badge.song && b.city === badge.city)) {
    return list
  }
  const next = [badge, ...list]
  Taro.setStorageSync(STORAGE_KEYS.BADGES, next)
  return next
}

// ============ 用户信息 ============

export function getUserInfo(): { name: string; level: number } {
  return Taro.getStorageSync(STORAGE_KEYS.USER_INFO) || { name: '城市漫游者', level: 1 }
}

export function setUserInfo(info: { name: string; level: number }): void {
  Taro.setStorageSync(STORAGE_KEYS.USER_INFO, info)
}

// ============ 用户推荐角落 ============

import type { PendingCorner } from '@/types/corner'

export function getPendingCorners(): PendingCorner[] {
  return Taro.getStorageSync(STORAGE_KEYS.PENDING_CORNERS) || []
}

export function addPendingCorner(corner: PendingCorner): PendingCorner[] {
  const list = getPendingCorners()
  const next = [corner, ...list].slice(0, 50)
  Taro.setStorageSync(STORAGE_KEYS.PENDING_CORNERS, next)
  return next
}
