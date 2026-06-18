import type { Concert, ConcertNews } from '@/types/concert';

export const concerts: Concert[] = [
  {
    id: 'c001',
    city: '北京',
    venue: '国家体育场（鸟巢）',
    dateText: '2026.04.30 - 05.18',
    status: 'ended',
    posterId: 1015,
    cornerCount: 6
  },
  {
    id: 'c002',
    city: '台北',
    venue: '台北大巨蛋',
    dateText: '2026.07.03 / 04 / 05 / 08 / 10 / 11 / 12',
    status: 'upcoming',
    posterId: 1018,
    cornerCount: 12
  },
  {
    id: 'c003',
    city: '长沙',
    venue: '长沙 IFS',
    dateText: '2026.05.23 起',
    status: 'upcoming',
    posterId: 1044,
    cornerCount: 4
  },
  {
    id: 'c004',
    city: '上海',
    venue: '上海体育场',
    dateText: '2026 夏（待官宣）',
    status: 'upcoming',
    posterId: 1036,
    cornerCount: 8
  }
];

export const concertNews: ConcertNews[] = [
  {
    id: 'n001',
    title: '鸟巢 12 场收官创纪录',
    summary: '五月天「5525+2 回到那一天」北京鸟巢站 4/30-5/18 连开 12 场，累计 55 场鸟巢演出刷新华语乐团纪录',
    type: 'news',
    typeLabel: '资讯',
    time: '今天 09:24'
  },
  {
    id: 'n002',
    title: '台北站重回大巨蛋 7/3 起开唱',
    summary: '台北大巨蛋 7/3、4、5、8、10、11、12 共七场，5/23 拓元售票已启动，周三/五 19:00、周六/日 18:30 开演',
    type: 'ticket',
    typeLabel: '票务',
    time: '昨天 18:02'
  },
  {
    id: 'n003',
    title: 'STAYREAL PARK 4.0 北京西单更新场',
    summary: '五一期间西单更新场单日客流破 7 万，巨型纯真兔、魔魔胡胡胡萝卜等装置成五迷打卡热点',
    type: 'activity',
    typeLabel: '活动',
    time: '昨天 12:15'
  },
  {
    id: 'n004',
    title: '水立方「胡萝卜麦克风」破吉尼斯纪录',
    summary: 'STAYREAL 与水立方联手打造 33 米巨型充气胡萝卜麦克风，获「最大的充气麦克风」吉尼斯世界纪录',
    type: 'news',
    typeLabel: '资讯',
    time: '前天 21:00'
  },
  {
    id: 'n005',
    title: '长沙 IFS「MOJO IN BLOOM」全国首展',
    summary: '5/23 长沙 IFS 联合 STAYREAL 开启 MOJO FAMILY 全国首展，11 米长沙限定卜卜全球首展',
    type: 'activity',
    typeLabel: '展览',
    time: '3 天前 11:42'
  }
];
