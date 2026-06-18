# AGENT.md — MaydayLand AI Agent 研发指引

> 本文件是给 AI Agent（Claude / Trae / Cursor 等）的项目研发指引，确保任何 Agent 接手后都能快速理解项目规范并产出符合质量的代码。

## 1. 项目概述

**项目名称**：MaydayLand · 五月天·城市漫游
**产品形态**：微信小程序（Taro 4 + React 18 + TypeScript）
**比赛交付形态**：交互式可体验 HTML Demo（单文件自包含，Zip 打包上传社区）
**创意主线**：跟着歌词，发现城市里的五迷角落
**报名赛道**：生活娱乐

### 核心功能闭环
```
发现歌词角落 → 到店打卡 → 生成卡片分享 → 同好暗号互动
```

### 专业评审维度对齐（权重合计 100%）

| 评审维度 | 权重 | 作品对齐策略 | 对应功能/证据 |
|----------|------|--------------|---------------|
| **创新性** | 30% | 精准识别五迷"歌词主题角落信息散落、同好认证难、打卡缺乏仪式感"三大未被满足需求；以"歌词 + LBS + 暗号"组合创新回应，而非单一工具 | 歌词地图、Canvas 打卡卡片、五迷暗号核销、徽章墙 |
| **实用性** | 30% | 目标用户明确（18-35 岁五迷），场景真实（演唱会前后续场、周末 citywalk、出差打卡）；Demo 已跑通核心链路，非纯概念 | 真实 2026 角落/演唱会数据、本地存储足迹、Web Share API 分享 |
| **完成度** | 20% | 核心功能链路完整可点击，无明显阻塞性 bug；用户 3 步内可感知"发现 → 打卡 → 分享"价值 | 发现页、角落详情、打卡卡片、演唱会页、我的页 5 页面闭环 |
| **美观度/设计体验** | 20% | 专业移动端视觉体系：五球配色 + 卜卜圆润几何 + STAYREAL 潮玩贴纸感；交互符合小程序用户习惯 | 启动动画、圆角卡片、标签筛选、模板切换、暗号弹窗 |

### 评审视角关键证据
1. **需求创新**：现有平台（微博/小红书/大众点评）无"歌词主题 + LBS 探店 + 同好暗号"统一入口。
2. **解决思路突破性**：用五月天歌词作为"情绪标签"匹配城市空间，把抽象的 fan culture 转化为可打卡、可对暗号、可分享的实体地点。
3. **技术创新**：比赛交付的 HTML Demo 以单文件零依赖方式完整复刻小程序体验；Canvas 2D 合成卡片、localStorage 持久化、Web Share API 分享均浏览器原生实现。
4. **落地可行性**：HTML Demo 双击即开，评审可直接操作；数据均来自 2026 年真实五迷打卡点/演唱会动态，无事实错误。

## 2. 技术栈

| 层 | 技术 | 版本 |
|----|------|------|
| 框架 | Taro | 4.x |
| UI | React | 18 |
| 语言 | TypeScript | 5.x |
| 样式 | CSS Modules + SCSS | — |
| Canvas | 微信 Canvas 2D API | 原生 |
| 存储 | wx.setStorage / getStorage | 原生 |
| 分享 | onShareAppMessage / onShareTimeline | 原生 |
| 地图 | map 组件（MVP 用伪地图卡片） | 原生 |

### 禁止引入
- 不引入 Taro UI 库（NutUI / Taroify）
- 不引入状态管理库（Redux / MobX）
- 不引入第三方 Canvas 库
- 不引入图表库

## 3. 目录结构

```
MaydayLand/
├── AGENT.md                          # 本文件（AI Agent 研发指引，≤ 500 行）
├── MaydayLand-HTML-Demo.zip          # 比赛交付物：交互式 HTML Demo
├── html-demo/                        # 比赛交付 HTML Demo 源码
│   ├── index.html                    # 单文件主页面（内联 CSS + 页面结构）
│   ├── app.js                        # 交互逻辑（种子数据/路由/Canvas/localStorage）
│   └── README.txt                    # 交付说明
├── src/                              # 微信小程序工程源码（上线形态）
│   ├── app.config.ts                 # 小程序全局配置
│   ├── app.tsx / app.scss            # 入口
│   ├── styles/
│   │   ├── theme.scss                # 主题变量（颜色/圆角/阴影）
│   │   └── variables.scss            # 全局 mixin（flex-center / text-ellipsis 等）
│   ├── types/
│   │   ├── corner.ts                 # 角落 / 徽章 / 足迹类型
│   │   └── concert.ts               # 演唱会类型
│   ├── data/
│   │   ├── corners.ts               # 12 个种子角落 mock
│   │   ├── concerts.ts              # 5 场演唱会 + 5 条动态 mock
│   │   └── badges.ts                # 6 个徽章 + 4 条足迹 mock
│   ├── utils/
│   │   ├── storage.ts               # 本地存储工具（评论/足迹/喜欢）
│   │   └── share.ts                 # 分享文案生成
│   ├── components/
│   │   ├── CornerCard/              # 角落卡片
│   │   ├── LyricBanner/             # 歌词横幅
│   │   ├── TagChip/                 # 标签筛选
│   │   ├── PasscodeCard/            # 暗号卡片
│   │   ├── ConcertCard/             # 演唱会卡片
│   │   └── CommentSection/          # 评论区
│   └── pages/
│       ├── discover/                # 发现（tabBar）
│       ├── map/                     # 歌词地图（tabBar）
│       ├── concert/                 # 演唱会（tabBar）
│       ├── mine/                    # 我的（tabBar）
│       ├── corner/                  # 角落详情（二级）
│       └── checkin/                 # 打卡卡片合成（二级）
├── openspec/                         # SDD 需求文档 + PRD（统一维护）
│   ├── PRD-MVP.md                   # 产品功能需求文档（PRD）
│   └── changes/mayday-cityroam-mvp/ # SDD 规格（proposal/design/tasks/specs）
├── MaydaySkills/                     # 五月天 Agent Skills 集合（独立项目）
└── package.json
```

## 4. 开发规范

### 4.1 命名
- **页面组件**：`XxxPage`（如 `CornerPage`）
- **文件名**：目录名 = 组件名，入口文件 `index.tsx`
- **CSS 类名**：camelCase，条件类名用 `classnames` 库
- **事件处理**：`handleXxx`（如 `handleCheckin`）

### 4.2 样式
- 每个 `.module.scss` 头部 `@use '@/styles/variables.scss' as *;`
- 颜色/圆角/阴影必须用 `theme.scss` 变量，禁止硬编码
- 布局工具用 `variables.scss` 的 mixin（`flex-center` / `text-ellipsis` / `scroll-x-container`）

### 4.3 日志
- 关键交互必须打日志：`console.log('[ModuleName] action', payload)`
- 错误必须打日志：`console.error('[ModuleName] error', payload, err)`

### 4.4 TypeScript
- 事件回调参数必须显式标注类型（`unknown` / `boolean` / 具体接口）
- 禁止 `any`
- 公共类型放 `types/` 目录

### 4.5 Canvas 2D
- 使用 `Taro.createSelectorQuery().select('#id').fields({ node: true })` 获取节点
- 必须设置 `dpr` 缩放
- 图片加载用 `canvas.createImage()`

## 5. 功能清单与优先级

### P0 — 核心闭环（必须完成）
- [x] 歌词地图（标签筛选 + 角落列表）
- [x] 角落详情（歌词 + 暗号 + 推荐）
- [x] 演唱会信息聚合（日程轮播 + 动态列表）
- [x] 个人中心（徽章墙 + 足迹）
- [x] **打卡卡片 Canvas 合成**（3 套模板 + 照片上传 + 导出）
- [x] **评论区**（本地存储 + 渲染）
- [x] **微信分享**（onShareAppMessage / onShareTimeline）
- [x] **本地存储足迹联动**（打卡后写入 → mine 页读取）

### P1 — 体验提升
- [x] 歌词关键词搜索（map 页）
- [x] 暗号二维码生成（Canvas 绘制）
- [x] 加载骨架屏
- [x] 空状态组件

### P2 — 创新加分
- [x] 用户共创角落提交
- [x] 演唱会场馆周边角落推荐
- [x] 打卡卡片模板动画

## 6. 质量门禁

### 微信小程序工程

| 检查项 | 标准 |
|--------|------|
| 诊断 | `GetDiagnostics()` 返回 0 Error / 0 Warning |
| 页面完整性 | 每个页面有 `index.tsx` + `index.module.scss` + `index.config.ts` |
| 配置一致性 | `app.config.ts` 的 pages 与实际文件一一对应 |
| 样式变量 | 无硬编码颜色值 |
| 类型安全 | 无 `any`，无隐式 `any` |
| 预览 | `preview-server.js` 运行无报错 |

### HTML Demo（比赛交付物）

| 检查项 | 标准 | 评审维度关联 |
|--------|------|--------------|
| 单文件自包含 | `index.html` + `app.js` 即可运行，无外部构建依赖 | 完成度 / 实用性 |
| 双击即开 | 无需服务器、无需安装，解压后直接用浏览器打开 | 实用性 |
| 核心链路跑通 | 发现 → 角落详情 → 打卡 / 对暗号 → 我的页，全程可点击 | 完成度 |
| 视觉统一 | 五球配色 / 卜卜圆润几何 / STAYREAL 潮玩贴纸感贯穿所有页面 | 美观度 |
| 数据真实 | 角落、演唱会、官方动态均为 2026 年真实信息，无事实错误 | 创新性 / 实用性 |
| 无阻塞 Bug | 页面切换、Canvas 合成、localStorage 读写、Modal 弹窗无异常 | 完成度 |
| 响应式适配 | 390×844 手机外壳 + 真机全屏自适应 | 美观度 |
| ZIP 打包 | 最终交付 `MaydayLand-HTML-Demo.zip`，含 `README.txt` 说明 | 完成度 |

## 7. 预览与调试

```bash
# 启动预览（非阻塞）
node /Users/souljoy/.trae-cn/builtin_skills/TRAE-generate-mini-app/scripts/preview-server.js .

# 预览 URL 格式
# https://trae.mobile.volcapp.com/preview/?ws=ws://localhost:<port>
```

- 每次代码变更后必须刷新预览
- 预览页面支持配置微信/支付宝/抖音小程序凭证
- 配置后可闭环完成二维码生成、预览、调试、上传、发布

## 8. 版权合规

- 歌词仅展示片段（≤ 30 字），标注词曲作者
- 不提供完整歌词
- 用户照片仅用于生成本人卡片，不公开展示原图
- 店铺名称需合作授权或用户共创标注

## 9. 关联文档索引

> 本文件（AGENT.md）仅保留 AI Agent 研发指引核心规范（≤ 500 行）。以下文档已拆分到独立位置，请按需查阅：

| 文档 | 路径 | 说明 |
|------|------|------|
| **PRD 产品需求文档** | [openspec/PRD-MVP.md](openspec/PRD-MVP.md) | MaydayLand MVP 完整功能需求文档（项目概述 / 用户分析 / 功能需求 / 数据验证 / 上线迭代 / 风险控制） |
| **OpenSpec SDD 规格** | [openspec/changes/mayday-cityroam-mvp/](openspec/changes/mayday-cityroam-mvp/) | SDD 规格文档（proposal / design / tasks / 10 个 capability spec） |
| **HTML Demo 源码** | [html-demo/](html-demo/) | 比赛交付物：单文件交互式 HTML Demo（index.html + app.js） |
| **项目 README** | [README.md](README.md) | 项目简介、核心功能、仓库结构 |

### OpenSpec SDD capability 清单

| Capability | Spec 路径 | 状态 |
|------------|----------|------|
| lyric-corner-map | [specs/lyric-corner-map/spec.md](openspec/changes/mayday-cityroam-mvp/specs/lyric-corner-map/spec.md) | v1.0 |
| checkin-card | [specs/checkin-card/spec.md](openspec/changes/mayday-cityroam-mvp/specs/checkin-card/spec.md) | v1.0 |
| fan-passcode | [specs/fan-passcode/spec.md](openspec/changes/mayday-cityroam-mvp/specs/fan-passcode/spec.md) | v1.0 |
| concert-hub | [specs/concert-hub/spec.md](openspec/changes/mayday-cityroam-mvp/specs/concert-hub/spec.md) | v1.0 |
| share-growth | [specs/share-growth/spec.md](openspec/changes/mayday-cityroam-mvp/specs/share-growth/spec.md) | v1.0 |
| lyric-data-pipeline | [specs/lyric-data-pipeline/spec.md](openspec/changes/mayday-cityroam-mvp/specs/lyric-data-pipeline/spec.md) | v1.0 |
| city-switcher | [specs/city-switcher/spec.md](openspec/changes/mayday-cityroam-mvp/specs/city-switcher/spec.md) | v1.1 新增 |
| comment-enhance | [specs/comment-enhance/spec.md](openspec/changes/mayday-cityroam-mvp/specs/comment-enhance/spec.md) | v1.1 新增 |
| corner-detail-enhance | [specs/corner-detail-enhance/spec.md](openspec/changes/mayday-cityroam-mvp/specs/corner-detail-enhance/spec.md) | v1.1 新增 |
| song-unlock | [specs/song-unlock/spec.md](openspec/changes/mayday-cityroam-mvp/specs/song-unlock/spec.md) | v1.1 新增 |

