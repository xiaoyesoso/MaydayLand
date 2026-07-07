# MaydayLand · 五月天·城市漫游

> 报名赛道：**生活娱乐**　|　产品形态：**ModelScope 创空间 H5**　|　创意名称：**五月天·城市漫游**  
> 在线体验：https://modelscope.cn/studios/souljoy/MaydayLand  
> GitHub 仓库：https://github.com/xiaoyesoso/MaydayLand

面向五月天粉丝（五迷）的城市漫游产品 —— **"跟着歌词，发现城市里的五迷角落"**。  
将 **歌词主题打卡**、**演唱会同好互动**、**五月天全曲库人格测评** 与 **移动端游戏门户** 融为一体，验证五迷群体对 "歌词角落地图 + 打卡分享 + 同好暗号 + 人格测评 + 游戏门户" 五大核心功能的接受度。

---

## ✨ 核心创意

五月天的歌词陪伴了无数人的青春，许多城市里藏着五迷开的咖啡馆、书店、涂鸦墙、唱片行 —— 它们散落各处，长期缺乏一个集中的发现入口。

MaydayLand 用 **"歌词情绪标签 + LBS 城市角落 + 同好暗号 + 人格测评 + 游戏门户"** 五位一体的产品形态，回应五迷五大未被满足的真实需求：

| 痛点 | 现有方案的缺失 | MaydayLand 的解法 |
| :--- | :--- | :--- |
| 歌词主题角落信息散落 | 微博/小红书/点评信息零散 | 一张专属于五迷的 LBS 城市地图 |
| 缺少"同好滤镜" | 大众平台无法筛"真五迷据点" | 店铺暗号 + 一次性 token 同好认证 |
| 打卡分享缺乏仪式感 | 现有工具不能体现"歌词 × 我 × 城市" | Canvas 合成 3 套主题歌词卡片 |
| 演唱会续场缺少互动 | 散场后同好迅速流失 | 人格测评 + 歌单解锁 + 海报分享裂变 |
| 日常等待演出无聊 | 演唱会间隔期缺乏轻量互动 | 移动端游戏门户：8 款游戏 + 3 款工具 |

---

## 🎯 功能闭环

```
🗺️ 发现歌词角落  →  📸 到店打卡生成卡片  →  💬 对暗号解锁徽章  →  🔄 微信分享裂变
                          ↓
                    🎤 五月天人格测评 → 📸 测评海报保存/分享 → 💰 赞赏支持
                          ↓
                    🎮 游戏门户：8 款游戏 + 3 款工具（本地可玩）
                          ↓
                    📰 官方动态：每日自动抓取相信音乐五月天新闻
```

### 核心 Capabilities（详见 [`openspec/`](./openspec)）

- 🗺️ **lyric-corner-map**：五迷角落 LBS 地图、情绪标签筛选、歌词关键词匹配、UGC 角落共创
- 📸 **checkin-card**：到店核验（200m 严格 / 1km 宽松降级）、Canvas 卡片合成（拍立得 / 票根 / 胶片）、小程序码绘制、足迹归档
- 💬 **fan-passcode**：店铺暗号绑定、一次性 token 生成与校验、单用户日限校验、徽章墙
- 🎤 **concert-hub**：演唱会日程、官方动态、场馆地图（含周边 1km 内歌词角落）、"今晚同场"现场互动
- 🔄 **share-growth**：分享卡片携参、新用户落地页推荐人提示卡（2s 自动收起）、空结果引导推荐 CTA
- 🎵 **lyric-data-pipeline**：从 [MaydaySkills](https://github.com/xiaoyesoso/MaydaySkills) 既有 `lyrics-db/`（9 张专辑 / 120 首）抽取片段 + 情绪标签生成歌词匹配字典（合规 ≤ 30 字片段）
- 🧠 **personality-quiz**（v1.2）：五月天全曲库人格测评，20 题 5 维度，题目与选项融入歌词韵味，生成复合人格标题、人生代表曲、共鸣 Top3、匹配 Top5 与 Canvas 测评海报
- 🎮 **mobile-portal**（v1.3）：移动端游戏门户，底部 TabBar「游戏」入口，聚合人格测评 + 8 款五月天主题小游戏（猜歌名 Wordle、二选一、Emoji 猜歌、十秒猜歌、歌词选择、合成大月天、记忆配对）+ 3 款工具（朋友圈、DIY 刮刮乐、图库），全部本地可玩
- 📰 **news-fetcher**（v1.4）：每日自动抓取相信音乐官网五月天相关新闻，按 URL 去重入库，保持官方动态新鲜度

---

## 📦 仓库结构

```
MaydayLand/
├── app/                             # 🐍 Flask 后端应用
│   ├── __init__.py                  # Flask 应用初始化 + SQLAlchemy + 静态资源 CORS + 保活/新闻刷新线程
│   ├── model.py                     # 10 张表数据模型（Corner/Concert/News/Comment/Footprint/PasscodeLog/SongUnlock/QuizResult/UserStat）
│   ├── dao.py                       # 数据访问层（CRUD 封装）
│   ├── views.py                     # RESTful API 路由（22+ 个接口，含 /api/refresh-news）
│   ├── response.py                  # 统一响应格式（code/data/errorMsg）
│   ├── keepalive.py                 # 服务保活模块（当前部署于 ModelScope，未启用）
│   ├── news_fetcher.py              # 五月天官方新闻抓取器（相信音乐官网）
│   ├── news_refresh.py              # 每日定时刷新新闻线程
│   ├── templates/index.html         # 前端单页 HTML（Jinja2 模板）
│   └── static/                      # 前端交互逻辑与微信验证文件
│       ├── app.js                   # 前端交互逻辑（fetch 调用后端 API，承载全部门户/游戏/工具页面）
│       └── f342dd5a3c7a9653bcaddc5ee5ca998c.txt  # 微信公众平台域名验证文件
├── assets/                          # 图片素材源（唯一存储）
│   ├── images/ui/                   # 5 色球 PNG + 五版logo + 吉祥物 + 二维码
│   └── images/albums/               # 28 张专辑封面（按歌名匹配）
├── openspec/                        # OpenSpec 规格文档
│   └── changes/
│       ├── mayday-cityroam-mvp/     # 城市漫游 MVP
│       │   ├── proposal.md          # 变更提案（Why / What / Capabilities）
│       │   ├── design.md            # 技术设计（D1–D9）
│       │   ├── tasks.md             # 任务清单与验收标准
│       │   └── specs/               # 11 个 capability 的 spec.md
│       └── maydayland-mobile-portal/# 移动端游戏门户
│           ├── proposal.md          # 变更提案
│           ├── design.md            # 技术设计
│           ├── tasks.md             # 任务清单与验收标准
│           └── specs/               # 游戏与工具 capability 的 spec.md
├── seed.py                          # 种子数据导入脚本（12 角落 / 4 演唱会 / 5 资讯 / 9 评论）
├── config.py                        # 配置（DB URI / DEBUG / MySQL / SQLite fallback）
├── run.py                           # 应用入口：自动建库建表 + 导入种子数据
├── requirements.txt                 # Python 依赖
├── Dockerfile                       # Docker 容器化部署配置（当前用于 ModelScope）
├── .dockerignore                    # 排除 .git/__pycache__/*.db 等
├── container.config.json            # 微信云托管遗留配置（当前未使用）
├── ms_deploy.json                   # ModelScope 创空间部署配置
├── AGENTS.md                        # 项目研发指引（含 v1.2 需求清单与多仓库同步规范）
└── README.md                        # 本文件
```

---

## 🚀 快速体验

前端 HTML 由 Flask 渲染，本地开发使用 SQLite，生产部署在 ModelScope 创空间。

```bash
# 1. 安装依赖
pip install -r requirements.txt

# 2. 本地开发（使用 SQLite，无需 MySQL）
USE_SQLITE=1 python seed.py        # 导入种子数据
USE_SQLITE=1 python run.py 0.0.0.0 8080

# 3. 浏览器打开 http://127.0.0.1:8080/
```

**生产部署（ModelScope 创空间）**：应用已部署至 https://modelscope.cn/studios/souljoy/MaydayLand，依据根目录 `Dockerfile` 与 `ms_deploy.json` 自动构建容器，使用 SQLite 运行。

**部署特性**：
- `run.py` 启动时自动 `db.create_all()` → `seed_all()`，无需手动初始化
- 容器内使用 SQLite，无需外部 MySQL 服务
- 前端 `app.js` 通过 `?v={{ build_time }}` 实现 cache busting，每次部署自动刷新
- 启动 60 秒后自动执行第一次新闻抓取，之后每 24 小时自动更新一次五月天官方动态

---

## 🔌 后端 API 一览

RESTful 接口，统一 `{code, data, errorMsg}` 响应格式：

| 接口 | 方法 | 功能 |
| :--- | :--- | :--- |
| `/api/corners` | GET | 角落列表（`?city=`） |
| `/api/corners/<id>` | GET | 角落详情 |
| `/api/concerts` | GET | 演唱会列表 |
| `/api/news` | GET | 资讯动态 |
| `/api/refresh-news` | POST | 手动触发新闻刷新（从相信音乐官网抓取） |
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

## � 移动端游戏门户

底部 TabBar「游戏」入口，11 个子产品全部本地可玩：

| 类型 | 名称 | 玩法简介 |
| :--- | :--- | :--- |
| 游戏 | 猜歌名 Wordle | 5 次机会，颜色小球提示每个字是否命中 |
| 游戏 | 二选一 | 30 首歌曲随机对决，连击挑战 |
| 游戏 | Emoji 猜歌 | 根据 Emoji 组合猜歌名 |
| 游戏 | 十秒猜歌 | 14 颗小球倒计时，剩余秒数 × 10 计分 |
| 游戏 | 歌词选择 | 20 题 4 选 1 歌词出处 |
| 游戏 | 合成大月天 | Canvas 物理引擎，合成五月天主题图案 |
| 游戏 | 记忆配对 | 3 关卡翻牌配对，3D 翻转动画 |
| 工具 | 朋友圈 | 五迷主题动态流，支持 Lightbox 预览 |
| 工具 | DIY 刮刮乐 | Canvas 擦除刮奖，可生成分享图 |
| 工具 | 图库 | 专辑封面瀑布流 + 懒加载 + Lightbox |
| 测评 | 五月天人格测评 | 20 题 5 维度，生成专属海报 |

---

## �🎨 视觉系统

- **五球配色**：蓝 `#3B7DD8` / 粉 `#FF6B9D` / 黄 `#FFD23F` / 绿 `#4ECDC4` / 紫 `#9B7EDE`
- **人格测评主题色**：A橙 `#dc3320` / B粉 `#e86ca5` / C黄 `#efce3e` / D蓝 `#29a7e1` / E绿 `#22a93a`
- **设计语言**：卜卜圆润几何 + STAYREAL 潮玩贴纸感
- **核心组件**：LyricBanner（启动页动画）/ CornerCard / ConcertCard / PasscodeCard / MaydayBalls / QuizPoster / WordleGrid / MemoryBoard

---

## 📊 评审维度自评

| 评审维度 | 权重 | 关键证据 |
| :--- | :---: | :--- |
| **创新性** | 30% | 三大未被满足需求 + "歌词情绪标签 × LBS × 同好暗号 × 人格测评 × 游戏门户"差异化形态；每日自动新闻抓取保持内容新鲜 |
| **实用性** | 30% | 18-35 岁五迷真实场景（演唱会续场 / 周末 citywalk / 出差打卡）；全链路可点击；2026 最新真实数据 |
| **完成度** | 20% | 发现 → 详情 → 打卡 / 对暗号 → 分享 → 测评 → 游戏 → 我的 全链路可点击；11 capabilities + Canvas 海报 + 徽章墙 + 移动端游戏门户（8 游戏 + 3 工具） |
| **美观度** | 20% | 五球配色 + 启动动画 + 页面转场 + Canvas 卡片 + 测评海报 + 暗号弹窗动效完整；专业移动端 UI |

---

## 📚 文档导航

- [项目研发指引（AGENTS.md）](./AGENTS.md)
- [OpenSpec 城市漫游 MVP 变更提案](./openspec/changes/mayday-cityroam-mvp/proposal.md)
- [OpenSpec 城市漫游 MVP 技术设计](./openspec/changes/mayday-cityroam-mvp/design.md)
- [OpenSpec 城市漫游 MVP 任务清单](./openspec/changes/mayday-cityroam-mvp/tasks.md)
- [OpenSpec 移动端游戏门户变更提案](./openspec/changes/maydayland-mobile-portal/proposal.md)
- [OpenSpec 移动端游戏门户技术设计](./openspec/changes/maydayland-mobile-portal/design.md)
- [OpenSpec 移动端游戏门户任务清单](./openspec/changes/maydayland-mobile-portal/tasks.md)

---

## ⚖️ 合规说明

- **歌词使用**：仅展示 ≤ 30 字片段并标注词曲作者，遵守版权策略
- **用户照片**：仅本地处理与临时合成，不上云、不在公开列表展示
- **定位精度**：仅用于到店核验，不持久化用户轨迹
- **用户标识**：使用微信 openid 哈希，不存储手机号 / 微信号
- **新闻抓取**：仅从公开官网（相信音乐）抓取新闻标题与摘要，不抓取全文、不商用

---

## 🎤 致敬

> 「我们的人生，从来不是一直顺利，但只要我们继续走着，就一定会走到属于自己的舞台。」

献给每一位陪伴五月天走过的五迷 ❤
