# AGENTS.md — MaydayLand

> 本文件是写给 AI Agent 的项目操作手册。人类开发者请先阅读 [README.md](README.md)。

## Project Overview

MaydayLand · 五月天·城市漫游：移动端 H5 单页应用 + Flask 后端 API，面向五月天粉丝的城市漫游产品。

- 创意主线：跟着歌词，发现城市里的五迷角落
- 核心闭环：歌词地图 → 人格测评 → 打卡卡片 → 暗号/评论 → 微信分享
- 目标终端：移动端 H5（可嵌入微信小程序 WebView），最大宽度 480px 居中

## Quick Commands

```bash
# 本地开发（SQLite）
pip install -r requirements.txt
USE_SQLITE=1 python seed.py
USE_SQLITE=1 python run.py 0.0.0.0 8080

# 生产构建（微信云托管自动执行）
# docker build -t maydayland .
```

## Tech Stack

- 后端：Flask 2.0 + Flask-SQLAlchemy 2.5 + PyMySQL 1.0 + SQLAlchemy 1.4
- 数据库：MySQL（生产）/ SQLite（本地 `USE_SQLITE=1`）
- 前端：原生 HTML + ES5 JS + CSS，单文件零依赖
- 容器：Alpine 3.13 + Python3，端口 80
- 部署：微信云托管

**禁止引入**：React / Vue / Taro、UI 库、状态管理库、Canvas 库、图表库。

## Project Structure

```
MaydayLand/
├── app/
│   ├── __init__.py          # Flask 初始化、/static/assets/ 路由、模板变量
│   ├── model.py             # 10 张表：Corner/Concert/News/Comment/Footprint/PasscodeLog/SongUnlock/QuizResult/UserStat
│   ├── dao.py               # 数据访问层，views 必须走这里
│   ├── views.py             # 22 个 RESTful API
│   ├── response.py          # make_succ_response / make_err_response
│   ├── keepalive.py         # 生产环境服务保活
│   ├── templates/index.html # 单页 Jinja2 模板
│   └── static/app.js        # 前端交互逻辑
├── assets/images/           # 图片素材唯一源
│   ├── ui/                  # 5 色球、logo、吉祥物、二维码
│   └── albums/              # 28 张专辑封面
├── seed.py                  # 种子数据导入
├── run.py                   # 入口：自动建库建表 + seed_all()
├── config.py                # DB URI / DEBUG / SQLite fallback
├── Dockerfile
├── .dockerignore
└── container.config.json    # 微信云托管配置
```

## Code Conventions

### Python / Flask
- 路由集中在 `app/views.py`，按 capability 分组
- 数据访问统一走 `app/dao.py`，**禁止在 views 里直接 `Model.query`**
- 所有 API 返回统一格式：`{code, data, errorMsg}`，使用 `make_succ_response` / `make_err_response`
- 数据库字段：Python 属性下划线，列名驼峰，例如 `db.Column('cornerId', ...)`
- 表名 PascalCase，例如 `__tablename__ = 'Corner'`
- MySQL 严格模式下，TIMESTAMP 列使用 `server_default=db.text('CURRENT_TIMESTAMP')`，禁止 `default=datetime.now`
- 捕获 `OperationalError` 后 logger.info，不抛 500

### HTML / JS
- ES5 语法，兼容微信内置浏览器 / iOS 12+ / Android 8+
- DOM 操作前必须判空：`var el = document.getElementById('x'); if (el) { ... }`
- localStorage 使用 `ls.get/set` 包装，key 统一加 `ml_` 前缀
- 后端调用使用 `api.get/post/put`，判断 `code === 0` 为成功
- 所有功能先写 localStorage 兜底，API 调用作为同步副作用
- 图片必须用本地 `/static/assets/`，禁止远程占位图
- 静态资源引用带 cache busting：`url_for('static', filename='app.js') }}?v={{ build_time }}`

### Visual
- 五球配色：蓝 `#3B7DD8` / 粉 `#FF6B9D` / 黄 `#FFD23F` / 绿 `#4ECDC4` / 紫 `#9B7EDE`
- 人格测评主题色：A橙 `#dc3320` / B粉 `#e86ca5` / C黄 `#efce3e` / D蓝 `#29a7e1` / E绿 `#22a93a`
- 卡片圆角 18-24px，按钮胶囊，图片 12px
- 页面占满视口，最大宽度 480px 居中

## Critical Rules

1. **不要创建新文件 unless absolutely necessary**；优先编辑现有文件。
2. **不要主动创建文档文件**（README / .md），除非用户明确要求。
3. **禁止引入前端框架和 UI 库**，保持零依赖。
4. **数据库操作必须走 dao.py**，不在 views 里直接 query。
5. **静态资源必须使用本地 `/static/assets/`**，不要引入 unsplash 等外链。
6. **所有 API 返回统一格式**，不要直接返回裸数据或抛 500。
7. **DOM 操作前判空**，避免微信内置浏览器报错。
8. **不要 over-engineering**：只改用户明确要求的，不要加不需要的抽象。

## Common Pitfalls

### 部署后前端仍是旧代码
- 原因：微信/浏览器缓存了 `app.js`
- 已启用 `?v={{ build_time }}` cache busting，每次 Docker 构建 URL 会变
- 手动验证：访问 `https://<domain>/static/app.js?v=<timestamp>` 查看最新内容

### MySQL 1067 / Unknown database
- 已修复：`run.py` 自动 `CREATE DATABASE` + `db.create_all()` + `seed_all()`
- `model.py` 已改用 `server_default=CURRENT_TIMESTAMP`

### 服务 30 分钟无访问被回收
- `app/keepalive.py` 每 20 分钟 ping 一次云托管域名

## Data Compliance

- 歌词展示 ≤ 30 字片段，标注词曲作者，不提供完整歌词
- 用户照片仅本地处理，不上云
- 定位仅用于到店核验，不持久化轨迹
- 用户标识使用微信 openid 哈希，不存储手机号/微信号
