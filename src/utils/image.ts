// 真实氛围图映射：使用 Unsplash CDN 直链
// 所有图片均来自 Unsplash，可免费商用（Unsplash License）
// 使用网络 URL 以确保在小程序预览容器中可正常加载

const IMAGE_MAP: Record<number, string> = {
  // 明园餐厅 - 老北京炸酱面 / 胡同烟火
  431: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80',
  // 水立方 / 鸟巢周边 - 北京奥运场馆夜景
  292: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=800&q=80',
  // 长沙 IFS 卜卜花园 - 现代城市商业综合体
  326: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
  // 阿信同款烧饼店 - 老北京胡同小吃
  580: 'https://images.unsplash.com/photo-1517260739337-6799d239ce83?w=800&q=80',

  // 北外滩歌词地贴 - 上海外滩夜景
  1080: 'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=800&q=80',
  // 首钢园 石头公仔 - 工业风园区日落
  1036: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80',
  // 钟鼓楼广场 - 北京古建筑街景
  1018: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80',

  // 西单更新场 STAYREAL PARK - 潮流快闪/彩色装置
  250: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
  // 东方明珠 MAYDAYLAND - 上海陆家嘴天际线
  119: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=800&q=80',

  // THE BOX 朝外 MAYDAYLAND - 北京城市潮流空间
  1015: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
  // 朝阳公园五色大球 - 城市公园夜景灯光
  1044: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80',

  // 居庸关长城 阿信公仔 - 长城壮观景色
  1082: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80'
}

const POSTER_MAP: Record<number, string> = {
  // 北京鸟巢 - 演唱会场馆夜景
  1015: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=800&q=80',
  // 台北 - 城市夜景
  1018: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&q=80',
  // 长沙 - 城市风光
  1044: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
  // 上海 - 外滩/陆家嘴
  1036: 'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=800&q=80',
  // 备用海报
  1039: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80'
}

const FALLBACK_COVER = 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80'
const FALLBACK_POSTER = 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80'

export function getImageUrl(imageId: number, _width = 750, _height = 500): string {
  return IMAGE_MAP[imageId] || FALLBACK_COVER
}

export function getPosterUrl(posterId: number): string {
  return POSTER_MAP[posterId] || FALLBACK_POSTER
}
