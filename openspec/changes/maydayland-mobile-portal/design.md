# MaydayLand 移动端统一门户 · 设计文档

## 总体架构

```
Flask H5 SPA（复用现有 MaydayLand 工程）
├── app/templates/index.html          # 现有单页模板，新增 #page-mobile-portal 等容器
├── app/static/app.js                 # 新增门户路由 + 各游戏逻辑
├── assets/MaydayLand/images/         # 新素材源
│   ├── ui/                           # Logo、Banner、图标
│   └── games/                        # 各游戏 emoji/水果/卡片素材
└── 访问入口：/#mobile-portal
```

## 路由设计

使用现有 hash 路由扩展：

| 路由 | 页面 |
|------|------|
| `#mobile-portal` | 门户首页 |
| `#game-wordle` | 猜词 / 猜歌名 |
| `#game-choice` | 二选一 |
| `#game-emoji` | Emoji 猜歌 |
| `#game-ten` | 十秒猜歌 |
| `#game-land` | 歌词选择 |
| `#game-synthesis` | 合成大月天 |
| `#game-memory` | 记忆配对 |
| `#tool-moments` | 朋友圈 |
| `#tool-scratch` | DIY 刮刮乐 |
| `#tool-gallery` | 图库 |

## 技术约束

- **ES5 语法**，兼容 iOS 12+ / Android 8+ / 微信内置浏览器
- **零依赖**：不使用 React / Vue / Matter.js / PixiJS / GSAP
- 合成大月天改用 **原生 Canvas + requestAnimationFrame** 简化物理
- 记忆配对 3D 翻转使用 **CSS transform**
- 图片必须使用本地 `assets/MaydayLand/images/`
- 所有状态优先 localStorage，key 加 `ml_` 前缀

## 数据模型（localStorage）

```js
// 统一用户
ml_portal_user: { nickname, avatarColor }

// 各游戏战绩
ml_wordle_stats: { played, wins, streak, maxStreak }
ml_choice_stats: { votes, bestStreak }
ml_emoji_stats: { solved, hintsUsed }
ml_ten_stats: { played, totalScore, bestScore }
ml_land_stats: { nickname, bestScore }
ml_synthesis_stats: { bestScore, games }
ml_memory_stats: { level1Best, level2Best, level3Best }

// 本地排行榜（仅本机）
ml_leaderboard_local: [{ game, nickname, score, date }]
```

## 视觉规范

- 主品牌色 `#425AEF`
- 背景 `#fdfdfe`，卡片 `#fff`
- 卡片圆角 16px，按钮圆角 12px
- 首页入口图标 46×46px，圆形/圆角裁剪
- 页面最大宽度 480px 居中
- 顶部 Header：Logo + 标题 + 设置入口
- 底部 TabBar：首页 / 游戏 / 工具 / 我的

## 非功能性需求

- 首屏 ≤ 2s
- 游戏帧率目标 60fps（合成大月天允许 30fps 低端机降级）
- 兼容最低 375px 宽度
- 所有 DOM 操作前判空
