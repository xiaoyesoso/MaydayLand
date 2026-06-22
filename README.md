# MaydayLand · 五月天·城市漫游

> 报名赛道：**生活娱乐**　|　产品形态：**微信云托管 H5 / 小程序**　|　创意名称：**五月天·城市漫游**

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
├── app/                             # 🐍 Flask 后端应用（仿 wxcloudrun-flask 架构）
│   ├── __init__.py                  # Flask 应用初始化 + SQLAlchemy
│   ├── model.py                     # 10 张表数据模型（Corner/Concert/News/Comment/Footprint/...）
│   ├── dao.py                       # 数据访问层（CRUD 封装）
│   ├── views.py                     # 22 个 RESTful API 路由
│   ├── response.py                  # 统一响应格式（code/data/errorMsg）
│   ├── templates/index.html         # 前端单页 HTML（Jinja2 模板）
│   └── static/app.js                # 前端交互逻辑（fetch 调用后端 API）
├── html-demo/                       # 🎁 零依赖纯前端 Demo（保留用于评审）
├── openspec/                        # OpenSpec 规格文档
│   └── changes/mayday-cityroam-mvp/
│       ├── proposal.md              # 变更提案（Why / What / Capabilities）
│       ├── design.md                # 技术设计（D1–D9）
│       ├── tasks.md                 # 任务清单与验收标准
│       └── specs/                   # 六大 capability 的 spec.md
├── seed.py                          # 种子数据导入脚本（12 角落 / 4 演唱会 / 5 资讯 / 9 评论）
├── config.py                        # 配置（DB URI / DEBUG / MySQL / SQLite fallback）
├── run.py                           # 应用入口
├── requirements.txt                 # Python 依赖
├── Dockerfile                       # 微信云托管容器化部署
├── container.config.json            # 微信云托管配置（端口 / CPU / DB 初始化 SQL）
├── AGENT.md                         # 项目研发指引（含 v1.1 需求清单）
└── README.md                        # 本文件
```

---

## 🚀 快速体验

### 方案 A：Flask 后端 + 前端一体化（推荐 ✨）

参照 [`wxcloudrun-flask`](https://github.com/WeixinCloud/wxcloudrun-flask) 微信云托管模板改造，前端 HTML 由 Flask 渲染，所有数据持久化到数据库。

```bash
# 1. 安装依赖
pip install -r requirements.txt

# 2. 本地开发（使用 SQLite，无需 MySQL）
USE_SQLITE=1 python seed.py        # 导入种子数据
USE_SQLITE=1 python run.py 0.0.0.0 8080

# 3. 浏览器打开 http://127.0.0.1:8080/
```

**生产部署（微信云托管）**：直接将仓库根目录作为云托管服务源码，依据 `Dockerfile` 和 `container.config.json` 自动构建容器，连接 MySQL 即可。

### 方案 B：HTML Demo（零依赖纯前端）

```bash
cd html-demo
open index.html        # macOS
# start index.html     # Windows
```

无需 Node.js、无需服务器、无需安装任何依赖，浏览器（Chrome / Safari / Edge 最新版）打开即用。数据仅持久化在 `localStorage`。

---

## 🔌 后端 API 一览

22 个 RESTful 接口，统一 `{code, data, errorMsg}` 响应格式：

| 接口 | 方法 | 功能 |
| :--- | :--- | :--- |
| `/api/corners` | GET | 角落列表（`?city=`） |
| `/api/corners/<id>` | GET | 角落详情 |
| `/api/concerts` | GET | 演唱会列表 |
| `/api/news` | GET | 资讯动态 |
| `/api/cities` | GET | 可用城市列表 |
| `/api/comments/<cornerId>` | GET | 角落评论（含回复） |
| `/api/comments` | POST | 发表评论 / 回复 |
| `/api/comments/<id>/like` | POST | 评论点赞 / 取消 |
| `/api/footprints` | GET/POST | 打卡足迹 |
| `/api/passcode-logs` | GET/POST | 暗号核销 |
| `/api/songs/unlocked` | GET | 已解锁歌曲 |
| `/api/songs/unlock` | POST | 解锁歌曲 |
| `/api/quiz/result` | GET/POST | 人格测评结果 |
| `/api/user/stat` | GET/PUT | 用户统计（切城/分享） |
| `/api/tonight/<concertId>` | GET/POST | 今晚同场留言 |

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

- [项目研发指引（AGENT.md）](./AGENT.md)
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
