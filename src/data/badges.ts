import type { Badge, CheckinFootprint } from '@/types/corner';

export const userBadges: Badge[] = [
  { id: 'b1', song: '倔强', city: '高雄', unlockedAt: '2026-04-12' },
  { id: 'b2', song: '温柔', city: '台北', unlockedAt: '2026-04-25' },
  { id: 'b3', song: '人生海海', city: '上海', unlockedAt: '2026-05-08' },
  { id: 'b4', song: '盛夏光年', city: '北京', unlockedAt: '2026-05-19' },
  { id: 'b5', song: '突然好想你', city: '广州', unlockedAt: '2026-05-30' },
  { id: 'b6', song: '诺亚方舟', city: '成都', unlockedAt: '2026-06-04' }
];

export const userFootprints: CheckinFootprint[] = [
  {
    id: 'f1',
    cornerId: 'corner_004',
    cornerName: '人生海海居酒屋',
    city: '上海',
    song: '人生海海',
    lyric: '人生海海 山山水水 你不必在意',
    date: '2026-05-08',
    imageId: 292
  },
  {
    id: 'f2',
    cornerId: 'corner_005',
    cornerName: '盛夏光年涂鸦墙',
    city: '北京',
    song: '盛夏光年',
    lyric: '愛上你的我們 都會等到那天',
    date: '2026-05-19',
    imageId: 1015
  },
  {
    id: 'f3',
    cornerId: 'corner_001',
    cornerName: '倔强咖啡',
    city: '高雄',
    song: '倔强',
    lyric: '有些事现在不做 一辈子都不会做了',
    date: '2026-04-12',
    imageId: 431
  },
  {
    id: 'f4',
    cornerId: 'corner_007',
    cornerName: '诺亚方舟咖啡',
    city: '成都',
    song: '诺亚方舟',
    lyric: '我們不要 一起老去',
    date: '2026-06-04',
    imageId: 326
  }
];
