## Why

五月天粉丝（五迷）在城市生活中存在 **"歌词主题角落"信息散落、缺少同好认证、打卡分享缺乏仪式感** 三大未被满足的需求；现有平台（微博、大众点评、票务）无法提供"音乐主题 + LBS 探店 + 同好暗号"的统一入口。本次变更引入 MaydayLand「五月天·城市漫游」微信小程序 MVP，验证"歌词主题探店打卡"作为生活娱乐新场景的市场假设，目标上线 1 个月内 30,000+ 用户、分享率 ≥ 30%。

## What Changes

- **新增产品形态**：在现有 MaydaySkills（Agent Skills 集合，主要为 LLM 工具）之外，引入面向 C 端用户的微信小程序产品形态。
- **新增核心功能**：
  - 🗺️ **歌词地图（lyric-corner-map）**：基于 LBS 展示城市内"五迷角落"（咖啡馆 / 书店 / 唱片店 / 涂鸦墙 / 演唱会场馆），每个角落配匹配的五月天歌词。
  - 📸 **打卡卡片（checkin-card）**：到店核验后，前端 Canvas 合成"歌词 + 用户照片 + 地点 + 日期"专属卡片，可保存/分享。
  - 💬 **五迷暗号（fan-passcode）**：店铺绑定专属暗号歌名，用户出示一次性 token 二维码，店家小程序扫码核销，沉淀"五迷徽章"。
  - 🎤 **演唱会信息聚合（concert-hub）**：日程、官方动态、场馆地图（含周边 1km 内歌词角落）、"今晚同场"现场互动。
  - 🔄 **微信分享裂变（share-growth）**：以打卡卡片图为分享封面，链接携带 `userId + cornerId`，朋友圈/好友直达角落详情页。
- **新增数据资产**：
  - `corners.json`（5 城 × 50 角落种子数据）、`schedule.json`、`news.json`，托管 CDN。
  - 复用 MaydaySkills 既有 `lyrics-db/`（9 张专辑 / 120 首），仅取 ≤ 30 字片段 + 情绪/锚句字段，用于歌词与角落匹配。
- **新增依赖**：微信小程序原生框架、`map` 组件、`canvas 2d`、微信云开发（云函数 + 数据库，仅暗号核销 / UGC 角落审核）。
- **运营 / 合规**：与 5–10 家首批合作店铺签约；歌词使用仅展示片段并标注词曲作者；用户照片不在公开列表展示。

## Capabilities

### New Capabilities
- `lyric-corner-map`：五迷角落 LBS 地图、标签筛选、歌词关键词匹配、角落详情、UGC 角落共创与审核。
- `checkin-card`：到店核验、Canvas 卡片合成（3 套主题：拍立得 / 票根 / 胶片）、保存到相册、打卡足迹。
- `fan-passcode`：店铺暗号绑定、一次性 token 生成与校验、商家扫码核销、徽章墙。
- `concert-hub`：演唱会日程轮播、官方动态、场馆地图 + 周边角落、"今晚同场"留言。
- `share-growth`：打卡卡片图分享封面、`onShareAppMessage` / `onShareTimeline` 携参、用户 ID 追踪、原生分享分析。
- `lyric-data-pipeline`：从 MaydaySkills `lyrics-db/` 抽取片段 + 情绪标签生成角落–歌词匹配字典（合规 ≤ 30 字片段）。

### Modified Capabilities
<!-- 当前 MaydaySkills 仓库尚无 openspec/specs/ 既有规格，无现存 capability 的 requirement 变更。 -->

## 初赛评审维度论证

| 维度 | 权重 | 作品论证 | 变更支撑 |
|------|------|----------|----------|
| **创新性** | 30% | 精准识别五迷三大未被满足需求（信息散落、同好认证难、打卡缺乏仪式感）；以"歌词情绪标签 + LBS 城市角落 + 同好暗号"三位一体差异化回应；HTML Demo 以单文件零依赖方式复刻小程序体验，体现 TRAE 能力的独特思路 | lyric-corner-map / fan-passcode / checkin-card / share-growth capabilities |
| **实用性** | 30% | 目标用户 18-35 岁五迷，场景真实（演唱会续场、周末 citywalk、出差打卡）；解决效果可量化（一站式发现、降低踩雷成本、仪式感分享）；Demo 已跑通核心链路，非纯概念 | 真实 2026 数据、localStorage 足迹、Web Share API 分享、CDN + 云开发低成本架构 |
| **完成度** | 20% | 核心链路"发现 → 打卡/对暗号 → 分享 → 我的"完整可点击；5 页面 + 3 套卡片模板 + 暗号核销 + 徽章墙全部实现；无明显阻塞性 bug | HTML Demo 5 页面闭环、tasks.md §0 全部完成 |
| **美观度/设计体验** | 20% | 五球配色 + 卜卜圆润几何 + STAYREAL 潮玩贴纸感贯穿；启动动画、页面转场、卡片模板切换、暗号弹窗动效完整；手机外壳容器符合移动端审美 | design.md D9 视觉系统、theme.scss 变量约束 |

## Impact

- **代码 / 仓库**：新增小程序工程目录 `miniapp/`（独立于 `MaydaySkills/`，不影响既有 Skill 资源包）；新增 `html-demo/` 目录作为比赛交付物；新增 CDN 数据生成脚本 `scripts/build-corners.py`、`scripts/sync-lyrics-snippets.py`。
- **API / 服务**：新增微信云开发云函数 `createPasscodeToken`、`verifyPasscodeToken`、`submitUserCorner`；CDN 静态托管 `corners.json` / `schedule.json` / `news.json`。
- **数据 / 隐私**：用户照片仅本地处理 + 临时合成，不上云；定位精度仅用于到店核验，不持久化；用户 ID 使用微信 openid 哈希。
- **依赖 / 合规**：歌词片段使用须遵守 `MaydaySkills/docs/sdd/30-quality.md` 中既有版权策略（≤ 1–2 句、不分发完整歌词）；店铺数据需获得授权或允许下架。
- **运营**：首期聚焦 5 城（台北 / 上海 / 北京 / 广州 / 成都）；演唱会城市优先扩展；KOL 五迷投放配合分享文案 A/B 测试。
- **风险**：本地存储 2MB 上限（评论 / 足迹）、Canvas 跨端字体差异、LBS 偏移、暗号被刷、UGC 数据失实——均在 design.md 中给出对应方案。
