# MaydayLand · 五月天·城市漫游

> 报名赛道：**生活娱乐**　|　产品形态：**微信小程序 / Taro 跨端**　|　创意名称：**五月天·城市漫游**

面向五月天粉丝（五迷）的城市漫游产品 —— **"跟着歌词，发现城市里的五迷角落"**。
将 **歌词主题打卡** 与 **演唱会同好互动** 融为一体，验证五迷群体对 **"歌词角落地图 + 打卡分享 + 同好暗号"** 三大核心功能的接受度。

---

## ✨ 核心创意

五月天的歌词陪伴了无数人的青春，许多城市里藏着五迷开的咖啡馆、书店、涂鸦墙、唱片行 —— 它们散落各处，长期缺乏一个集中的发现入口。

MaydayLand 用 **"歌词情绪标签 + LBS 城市角落 + 同好暗号"** 三位一体的产品形态，回应五迷三大未被满足的真实需求：

| 痛点 | 现有方案的缺失 | MaydayLand 的解法 |
| :--- | :--- | :--- |
| 歌词主题角落信息散落 | 微博/小红书/点评信息零散 | 一张专属于五迷的 LBS 城市地图 |
| 缺少"同好滤镜" | 大众平台无法筛"真五迷据点" | 店铺暗号 + 一次性 token 同好认证 |
| 打卡分享缺乏仪式感 | 现有工具不能体现"歌词 × 我 × 城市" | Canvas 合成 3 套主题歌词卡片 |

---

## 🎯 MVP 功能闭环

```
🗺️ 发现歌词角落  →  📸 到店打卡生成卡片  →  💬 对暗号解锁徽章  →  🔄 微信分享裂变
```

### 六大 Capabilities（详见 [`openspec/`](./openspec)）

- 🗺️ **lyric-corner-map**：五迷角落 LBS 地图、情绪标签筛选、歌词关键词匹配、UGC 角落共创
- 📸 **checkin-card**：到店核验（200m 严格 / 1km 宽松降级）、Canvas 卡片合成（拍立得 / 票根 / 胶片）、小程序码绘制、足迹归档
- 💬 **fan-passcode**：店铺暗号绑定、一次性 token 生成与校验、单用户日限校验、徽章墙
- 🎤 **concert-hub**：演唱会日程、官方动态、场馆地图（含周边 1km 内歌词角落）、"今晚同场"现场互动
- 🔄 **share-growth**：分享卡片携参、新用户落地页推荐人提示卡（2s 自动收起）、空结果引导推荐 CTA
- 🎵 **lyric-data-pipeline**：从 [MaydaySkills](https://github.com/xiaoyesoso/MaydaySkills) 既有 `lyrics-db/`（9 张专辑 / 120 首）抽取片段 + 情绪标签生成歌词匹配字典（合规 ≤ 30 字片段）

---

## 📦 仓库结构

```
MaydayLand/
├── html-demo/                       # 🎁 比赛评审交付物（零依赖单文件 Demo）
│   ├── index.html                   # 主页面（CSS 样式与页面结构）
│   ├── app.js                       # 交互逻辑（种子数据 / 路由 / Canvas / localStorage）
│   └── README.txt                   # Demo 使用说明
├── html-demo.zip                    # html-demo 打包文件
├── 五月天粉丝互动MVP需求文档.md       # 产品需求文档（PRD）
├── openspec/                        # OpenSpec 规格文档
│   └── changes/mayday-cityroam-mvp/
│       ├── proposal.md              # 变更提案（Why / What / Capabilities）
│       ├── design.md                # 技术设计（D1–D9）
│       ├── tasks.md                 # 任务清单与验收标准
│       └── specs/                   # 六大 capability 的 spec.md
├── src/                             # Taro + React + TypeScript 源码（小程序工程）
│   ├── pages/                       # 7 个页面：discover/corner/checkin/concert/mine/map/submit
│   ├── components/                  # 10+ 复用组件
│   ├── data/                        # corners / concerts / badges 种子数据
│   ├── utils/                       # storage / share / image
│   └── styles/                      # 五球配色主题 + 设计令牌
├── dist/                            # Taro 编译产物（微信小程序原生代码）
├── pages/                           # 微信小程序原生入口（编译用）
├── mock/                            # 模拟数据（news / schedule）
├── config/                          # Taro 构建配置
├── package.json                     # Taro / React 依赖
└── README.md                        # 本文件
```

---

## 🚀 快速体验

### 方案 A：HTML Demo（零依赖，推荐评审使用）

```bash
# 解压 html-demo.zip 后双击 index.html
# 或：
cd html-demo
open index.html        # macOS
# start index.html     # Windows
```

无需 Node.js、无需服务器、无需安装任何依赖，浏览器（Chrome / Safari / Edge 最新版）打开即用。

### 方案 B：Taro 小程序工程（开发模式）

```bash
# 安装依赖
npm install

# 编译微信小程序
npm run dev:weapp
# 然后用微信开发者工具打开本目录
```

支持的端：`weapp` / `swan` / `alipay` / `tt` / `h5` / `rn` / `qq` / `jd`。

---

## 🎨 视觉系统

- **五球配色**：蓝 `#3B7DD8` / 粉 `#FF6B9D` / 黄 `#FFD23F` / 绿 `#4ECDC4` / 紫 `#9B7EDE`
- **设计语言**：卜卜圆润几何 + STAYREAL 潮玩贴纸感
- **核心组件**：LyricBanner（启动页动画）/ CornerCard / ConcertCard / PasscodeCard / MaydayBalls

---

## 📊 评审维度自评

| 评审维度 | 权重 | 关键证据 |
| :--- | :---: | :--- |
| **创新性** | 30% | 三大未被满足需求 + "歌词情绪标签 × LBS × 同好暗号"差异化形态 + HTML Demo 单文件零依赖复刻 |
| **实用性** | 30% | 18-35 岁五迷真实场景（演唱会续场 / 周末 citywalk / 出差打卡）；Demo 已跑通核心链路；2026 最新真实数据 |
| **完成度** | 20% | 发现 → 详情 → 打卡 / 对暗号 → 分享 → 我的 全链路可点击；7 页面 + 3 套卡片模板 + 暗号核销 + 徽章墙 |
| **美观度** | 20% | 五球配色 + 启动动画 + 页面转场 + Canvas 卡片 + 暗号弹窗动效完整；专业移动端 UI |

---

## 📚 文档导航

- [产品需求文档（PRD）](./五月天粉丝互动MVP需求文档.md)
- [OpenSpec 变更提案](./openspec/changes/mayday-cityroam-mvp/proposal.md)
- [技术设计文档](./openspec/changes/mayday-cityroam-mvp/design.md)
- [任务清单与验收标准](./openspec/changes/mayday-cityroam-mvp/tasks.md)
- [HTML Demo 说明](./html-demo/README.txt)

---

## ⚖️ 合规说明

- **歌词使用**：仅展示 ≤ 30 字片段并标注词曲作者，遵守版权策略
- **用户照片**：仅本地处理与临时合成，不上云、不在公开列表展示
- **定位精度**：仅用于到店核验，不持久化用户轨迹
- **用户标识**：使用微信 openid 哈希，不存储手机号 / 微信号

---

## 🎤 致敬

> 「我们的人生，从来不是一直顺利，但只要我们继续走着，就一定会走到属于自己的舞台。」

献给每一位陪伴五月天走过的五迷 ❤
