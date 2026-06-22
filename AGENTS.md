# AGENTS.md — MaydayLand AI Agent 研发指引

> 本文件是给 AI Agent（Claude / Trae / Cursor 等）的项目研发指引，确保任何 Agent 接手后都能快速理解项目规范并产出符合质量的代码。

## 1. 项目概述

- **项目名称**：MaydayLand · 五月天·城市漫游
- **产品形态**：H5 单页应用 + 后端 API（仿 [wxcloudrun-flask](https://github.com/WeixinCloud/wxcloudrun-flask) 微信云托管模板）
- **运行入口**：根目录 `run.py`，Flask 渲染 `app/templates/index.html`，前端 `app/static/app.js` fetch 调用后端 API
- **目标终端**：移动端 H5（可嵌入微信小程序 WebView），最大宽度 480px 居中
- **创意主线**：跟着歌词，发现城市里的五迷角落
- **报名赛道**：生活娱乐

### 1.1 核心功能闭环

```
🗺️ 发现歌词角落 → 🎤 人格测评 → 📸 打卡卡片 → 💬 暗号 / 评论 → 🔄 微信分享
```

### 1.2 专业评审维度对齐（权重合计 100%）

| 维度 | 权重 | 对齐策略 | 关键证据 |
|------|------|----------|----------|
| **创新性** | 30% | 「歌词 + LBS + 暗号 + 人格测评」组合创新 | 歌词地图 / 暗号核销 / 五月天全曲库人格测评 |
| **实用性** | 30% | 18-35 岁五迷真实场景 + 2026 真数据 + 数据落库 | Flask + MySQL/SQLite / 22 个 API / 12 角落 + 4 演唱会 |
| **完成度** | 20% | 全链路可点击 + 后端持久化 + 容器化部署 | Dockerfile / container.config.json / 微信云托管一键上线 |
| **美观度** | 20% | 五球配色 + 真实素材（28 张专辑封面 + 5 色球 + logo） | assets/images/{ui, albums} 全量本地化 |

## 2. 技术栈

| 层 | 技术 | 备注 |
|----|------|------|
| 后端 | Flask 2.0 + SQLAlchemy + PyMySQL | `app/__init__.py` |
| 数据库 | MySQL（生产） / SQLite（本地 `USE_SQLITE=1`） | `config.py` 二选一 |
| ORM | SQLAlchemy 1.4 | `app/model.py` 10 张表 |
| API | RESTful，统一 `{code, data, errorMsg}` | `app/views.py` 22 个端点 |
| 前端 | 原生 HTML + ES5 JS + CSS | `app/templates/index.html` + `app/static/app.js` |
| 静态资源 | Flask static + 自定义 `/static/assets/` 路由（指向根 `assets/`） | 避免重复占空间 |
| 容器 | Alpine + Python3 | `Dockerfile`（端口 80） |
| 部署 | 微信云托管 | `container.config.json` |

### 禁止引入
- 禁止引入前端框架（React / Vue / Taro），保持单文件零依赖
- 禁止引入 UI 库 / 状态管理库 / Canvas 库 / 图表库
- 禁止使用 `any` / 隐式 `any`（如果未来引入 TS）

## 3. 目录结构

```
MaydayLand/
├── app/                              # Flask 应用包
│   ├── __init__.py                   # 应用初始化 + /static/assets/ 路由
│   ├── model.py                      # 10 张表（Corner/Concert/News/Comment/Footprint/PasscodeLog/SongUnlock/QuizResult/UserStat/Badge）
│   ├── dao.py                        # 数据访问层
│   ├── views.py                      # 22 个 RESTful API
│   ├── response.py                   # 统一响应格式
│   ├── templates/index.html          # 单页 HTML（Jinja2 模板）
│   └── static/app.js                 # 前端交互逻辑（fetch 调后端 API）
├── assets/images/                    # 图片素材源（唯一存储）
│   ├── ui/                           # 5 色球 PNG + 五版logo.png + favicon.svg
│   └── albums/                       # 28 张专辑封面（按歌名匹配）
├── openspec/                         # SDD 规格
│   └── changes/mayday-cityroam-mvp/
│       ├── proposal.md
│       ├── design.md
│       ├── tasks.md
│       └── specs/                    # 11 个 capability spec
├── html-demo/                        # 零依赖纯前端 Demo（保留评审用）
├── seed.py                           # 种子数据导入（12 角落 + 4 演唱会 + 5 资讯 + 9 评论）
├── config.py                         # 配置（DB URI / DEBUG / SQLite fallback）
├── run.py                            # 应用入口（端口 80）
├── requirements.txt                  # Python 依赖
├── Dockerfile                        # 微信云托管容器镜像
├── container.config.json             # 微信云托管配置
├── README.md
└── AGENTS.md                         # 本文件
```

## 4. 开发规范

### 4.1 后端（Python / Flask）

- 路由集中在 `app/views.py`，按 capability 分组并加注释分割
- 数据访问统一走 `app/dao.py`，禁止在 views 里直接 `Model.query`
- 所有 API 返回必须用 `make_succ_response` / `make_err_response`，格式 `{code:0,data}` 或 `{code:-1,errorMsg}`
- 数据库字段：Python 属性下划线，列名驼峰（`db.Column('cornerId', ...)`）
- 表名 PascalCase（`__tablename__ = 'Corner'`）
- 错误用 `OperationalError` 捕获并 logger.info，不抛 500

### 4.2 前端（HTML + 原生 JS）

- ES5 风格（兼容微信内置浏览器 / iOS 12+ / Android 8+）
- 所有 DOM 操作前必须判空：`var el=document.getElementById('x'); if(el){...}`
- localStorage 通过 `ls.get/set` 包装，key 统一加 `ml_` 前缀
- 后端调用通过 `api.get/post/put`，code === 0 表示成功
- 所有功能必须先写 localStorage 兜底，API 调用作为同步副作用
- 图片优先用本地 `/static/assets/`，禁止引入 unsplash 等远程占位图
- 关键交互打日志：`console.log('[模块]', payload)`

### 4.3 视觉规范

- **五球配色**：蓝 `#3B7DD8` / 粉 `#FF6B9D` / 黄 `#FFD23F` / 绿 `#4ECDC4` / 紫 `#9B7EDE`
- **人格测评主题色**：A橙 `#dc3320` / B粉 `#e86ca5` / C黄 `#efce3e` / D蓝 `#29a7e1` / E绿 `#22a93a`
- **圆角**：卡片 18-24px，按钮胶囊（border-radius:full），图片 12px
- **字体**：系统字体栈，标题加粗（800/900）
- 不再使用「模拟手机外壳」UI，页面占满视口，最大宽度 480px 居中

### 4.4 数据合规

- 歌词展示 ≤ 30 字片段，标注词曲作者
- 不提供完整歌词
- 用户照片仅本地处理，不上云
- 用户标识：未来对接微信 openid 哈希，本地开发用 `'local_user'`

## 5. 功能清单（含 v1.2 五月天全曲库人格测评）

### P0 — 核心闭环
- [x] 歌词地图（标签筛选 + 角落列表）`lyric-corner-map`
- [x] 角落详情（歌词 + 暗号 + 推荐 + 地图导航）`corner-detail-enhance`
- [x] 演唱会聚合（日程 + 场馆 + 今晚同场）`concert-hub`
- [x] 个人中心（徽章 + 足迹 + 歌单解锁）`song-unlock`
- [x] 打卡卡片 Canvas 合成（3 模板）`checkin-card`
- [x] 评论增强（点赞 + 回复）`comment-enhance`
- [x] 微信分享 + 推荐人提示卡 `share-growth`
- [x] 城市切换 `city-switcher`
- [x] 暗号核销 + 徽章墙 `fan-passcode`

### P1 — v1.2 新增
- [ ] 🆕 **五月天全曲库人格测评**（首页入口，非"我的"）`personality-quiz`
  - 20 道题、5 大维度（追梦者 A / 治愈者 B / 燃烧者 C / 思想家 D / 探索者 E）
  - 主+副人格、复合标题、人生代表曲、共鸣 Top3、匹配 Top5
  - 5 色吉祥物动画 + 主题色随人格切换
  - 结果可分享、可保存（Canvas 海报）

## 6. 质量门禁

| 检查项 | 标准 |
|--------|------|
| Python 语法 | `python -c "import ast; ast.parse(open('app/views.py').read())"` 通过 |
| Flask 启动 | `USE_SQLITE=1 python run.py 0.0.0.0 8080` 无报错 |
| 数据初始化 | `USE_SQLITE=1 python seed.py` 全部"已导入" |
| API 健康 | `curl /api/corners?city=北京` 返回 `code:0` |
| 前端无错 | 浏览器 console 无红色 error |
| 静态资源 | `/static/assets/images/ui/blue.png` 等 200 OK |
| OpenSpec | `openspec validate mayday-cityroam-mvp` 通过 |

## 7. 本地预览

```bash
# 1. 安装依赖
pip install -r requirements.txt

# 2. 种子数据
USE_SQLITE=1 python seed.py

# 3. 启动服务（端口 8080）
USE_SQLITE=1 python run.py 0.0.0.0 8080

# 4. 浏览器打开 http://127.0.0.1:8080/
```

## 8. 生产部署（微信云托管）

```bash
# 仓库根作为云托管服务源码，自动按 Dockerfile 构建
# 需要 MySQL 实例 + 环境变量：MYSQL_USERNAME / MYSQL_PASSWORD / MYSQL_ADDRESS
# 详见 container.config.json
```

## 9. 关联文档索引

| 文档 | 路径 |
|------|------|
| 项目 README | [README.md](README.md) |
| OpenSpec 提案 | [openspec/changes/mayday-cityroam-mvp/proposal.md](openspec/changes/mayday-cityroam-mvp/proposal.md) |
| 技术设计 | [openspec/changes/mayday-cityroam-mvp/design.md](openspec/changes/mayday-cityroam-mvp/design.md) |
| 任务清单 | [openspec/changes/mayday-cityroam-mvp/tasks.md](openspec/changes/mayday-cityroam-mvp/tasks.md) |
| HTML Demo | [html-demo/](html-demo/) |

### OpenSpec Capability 清单

| Capability | 状态 |
|------------|------|
| lyric-corner-map | v1.0 |
| checkin-card | v1.0 |
| fan-passcode | v1.0 |
| concert-hub | v1.0 |
| share-growth | v1.0 |
| lyric-data-pipeline | v1.0 |
| city-switcher | v1.1 |
| comment-enhance | v1.1 |
| corner-detail-enhance | v1.1 |
| song-unlock | v1.1 |
| **personality-quiz** | **v1.2 新增** |
