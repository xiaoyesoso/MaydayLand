## 0. HTML 交互 Demo（比赛交付物，最高优先级）

### 0.0 评审维度验收标准

| 维度 | 权重 | 验收点 | 状态 |
|------|------|--------|------|
| 创新性 | 30% | Demo 中可验证：12 个角落均有专属歌词+暗号；卡片合成把"歌词+照片+地点"变成唯一分享内容；区别于微博/小红书/大众点评的探店体验 | [x] |
| 实用性 | 30% | Demo 中可验证：2026 真实数据；localStorage 持久化评论/足迹/徽章；Web Share API / 复制文案分享；双击即开无需服务器 | [x] |
| 完成度 | 20% | Demo 中可验证：5 页面核心链路跑通；3 套卡片模板；暗号核销+徽章解锁；无阻塞性 bug | [x] |
| 美观度/设计体验 | 20% | Demo 中可验证：手机外壳容器；五球配色贯穿；启动动画/页面转场/模板切换/暗号弹窗动效；圆角卡片统一 | [x] |

- [x] 0.1 创建单文件 `index.html`：手机外壳（390×844）+ 状态栏 + 底部 TabBar（发现 / 演唱会 / 我的）+ hash 路由页面栈
- [x] 0.2 内联种子数据：12 个真实五迷角落（2026 最新）+ 4 场演唱会 + 5 条官方动态 + 11 条情绪关键词
- [x] 0.3 发现页：LyricBanner（五球配色）+ 标签筛选 + 歌词关键词搜索 + 角落卡片列表（真实地点配图）+ SVG 城市地图
- [x] 0.4 角落详情页：配图 + 匹配歌词 + 推荐语 + 暗号区块 + "我要打卡" / "我要对暗号" + 轻量评论（localStorage）
- [x] 0.5 打卡卡片页：`<input type=file>` 选图 + Canvas 合成 3 套模板（拍立得 / 票根 / 胶片）+ 保存 / 分享
- [x] 0.6 五迷暗号：模拟一次性 token 二维码（Canvas 绘制）+ "模拟商家核销"按钮 + 徽章写入 localStorage
- [x] 0.7 演唱会页：日程轮播 + 官方动态列表 + 场馆周边角落引导
- [x] 0.8 我的页：打卡足迹（按城市分组）+ 徽章墙 + 分享统计
- [x] 0.9 视觉系统：五球配色 / 卜卜圆润几何 / STAYREAL 潮玩贴纸感 + 启动页动画 + 页面转场 + 模板切换动效
- [x] 0.10 Zip 打包 `MaydayLand-HTML-Demo.zip`（含 index.html + app.js + README.txt）上传社区
- [x] 0.11 初赛评审维度对齐：AGENT.md / 需求文档 / openspec 均补充评审维度论证

## 0.v1.1 HTML Demo v1.1 增强（4 个新需求）

### 城市切换（city-switcher）
- [x] 0.12 首页顶部增加城市选择器入口 `🏙️ 当前城市：xx ▾`
- [x] 0.13 实现城市选择半屏抽屉（5 城 + 专属色调徽章 + 角落数量）
- [x] 0.14 城市切换后列表/地图/演唱会联动刷新 + 200ms 淡入动画
- [x] 0.15 `localStorage.currentCity` 记忆 + 定位兜底 + `citySwitchCount` 计数

### 评论增强（comment-enhance）
- [x] 0.16 评论点赞：心形按钮 + `likedCommentIds` 持久化 + 点赞数 +1/-1
- [x] 0.17 评论回复：二级回复输入框 + 缩进展示 + 回复数据结构
- [x] 0.18 评论数据结构升级（replies 数组）+ 50 条上限归档
- [x] 0.19 `commentLikedCount` 统计（支撑歌单解锁）

### 角落详情增强（corner-detail-enhance）
- [x] 0.20 角落数据补充 `description / openingHours / phone / tags / tips` 字段
- [x] 0.21 详情页信息卡渲染（营业时间 / 电话可拨打 / 距离 / 氛围标签）
- [x] 0.22 "查看大地图"按钮 + 全屏地图页（独立 page）
- [x] 0.23 "🧭 导航"按钮（wx.openLocation / Apple Maps / 高德 URL Scheme）
- [x] 0.24 底部三按钮组（导航 / 打卡 / 对暗号）+ 地址长按复制

### 歌单解锁（song-unlock）
- [x] 0.25 定义 24 首精选歌曲数据（按 9 张专辑分组）+ 8 类解锁条件
- [x] 0.26 我的页"歌单解锁"区块渲染（进度统计 + 专辑分组网格 + 锁/解锁状态）
- [x] 0.27 `checkSongUnlock()` 函数 + 5 个触发点（打卡/暗号/分享/切城/点赞）
- [x] 0.28 解锁全屏动画（五球粒子绽放 + 歌名浮入 + 试听按钮）
- [x] 0.29 试听外链（QQ 音乐 / 网易云音乐）+ 下一首解锁提示

## 1. 项目脚手架与基础设施（微信小程序原生工程，当前 H5 仓库不实施）

> 注：当前仓库形态为 Flask H5 单页应用 + 微信云托管容器部署，非小程序原生工程。以下任务保留用于未来小程序版本，不在本仓库实施。

- [ ] 1.1 创建小程序工程骨架 `miniapp/`（`app.json` 主包 + `pages/index、discover、corner、checkin、concert、me` + `subpackages/merchant`）
- [ ] 1.2 配置小程序合法域名（CDN 域名 + 微信云开发资源）、隐私协议、`project.config.json` 基础规则
- [ ] 1.3 接入微信云开发（`wx.cloud.init`），创建环境 `mayday-prod` / `mayday-dev`
- [ ] 1.4 创建 4 个云开发集合：`user_corners`、`share_events`、`user_badges`、`checkin_archive`，按 design D4 设置 unique index
- [ ] 1.5 在仓库根新增 `scripts/` 目录与 Python 3.11 venv，更新 `MaydaySkills/AGENTS.md` 索引指向小程序工程

## 2. lyric-data-pipeline（数据底座，当前 H5 仓库不实施）

> 注：当前 H5 版本使用内联 seed 数据。以下 pipeline 任务保留用于未来数据自动化。

- [ ] 2.1 实现 `scripts/sync-lyrics-snippets.py`：读取 `MaydaySkills/mayday-mood/references/lyrics-db/*.json`，抽取 `hook + mood_axes + mood_tags`，输出 `data/lyric-snippets.json`，强制片段 ≤ 30 字
- [ ] 2.2 编写片段超长保护与 stderr 警告（spec scenario "片段超长保护"）
- [ ] 2.3 实现 `scripts/build-corners.py`：读取 `data/corners.raw.csv` + `lyric-snippets.json`，按 `mood_tags` 交集匹配生成 `corners.json`
- [ ] 2.4 实现合规校验（≤ 30 字、必含 `lyric_credit`、敏感词），失败 exit code 2，接入 CI
- [ ] 2.5 实现 `scripts/publish-cdn.sh`：上传 `corners.json / schedule.json / news.json / lyric-snippets.json`，写入 `_meta.version` 与 `_meta.publishedAt`，保留前 5 个历史版本
- [ ] 2.6 运营整理 5 城 × 50 角落 `corners.raw.csv` 种子数据并完成第一次构建发布（`_meta.version=1`）

## 3. lyric-corner-map（发现页 + 角落详情，当前 H5 仓库不实施）

> 注：当前 H5 已实现等价功能，见 0.3 / 0.4 / 0.v1.1。

- [ ] 3.1 实现 `pages/discover/discover` 框架：Tab 切换（地图 / 列表）、顶部搜索框、标签条
- [ ] 3.2 接入 `wx.getLocation` + 拒绝授权降级到"上海·人民广场"（spec scenario "用户拒绝定位"）
- [ ] 3.3 拉取 CDN `corners.json`，本地 1 小时缓存 + `_meta.version` 比对刷新
- [ ] 3.4 `map` 组件 + 自定义气泡 markers，按距离排序前 20 条进入列表
- [ ] 3.5 标签筛选交互（单选）+ 实时刷新地图与列表
- [ ] 3.6 歌词关键词搜索：本地按 `mood_tags` 倒排索引匹配；空结果引导推荐
- [ ] 3.7 `pages/corner/corner` 详情页：照片、匹配歌词（≤ 30 字 + `lyric_credit`）、推荐语、暗号占位、"我要打卡"、"我要对暗号"按钮
- [ ] 3.8 UGC 角落表单页：图片上传、地址、推荐理由、推荐歌词，缺失字段阻止提交
- [ ] 3.9 云函数 `submitUserCorner`：写入 `user_corners` 集合，状态 `pending`，返回 `{ status, id }`

## 4. checkin-card（打卡卡片，当前 H5 仓库不实施）

> 注：当前 H5 已实现等价功能，见 0.5 / 0.v1.1。

- [ ] 4.1 `pages/checkin/checkin` 入口：调用 `wx.getLocation`，按 design D5 双圈策略校验距离
- [ ] 4.2 `wx.chooseMedia` 单图选择 / 拍摄；**MUST NOT** 触发 `wx.uploadFile`
- [ ] 4.3 实现 3 套 Canvas 模板（拍立得 / 票根 / 胶片），抽取通用绘制函数 `renderCard(template, ctx, payload)`
- [ ] 4.4 模板切换时 Canvas 重绘 ≤ 200ms；`wx.canvasToTempFilePath` 输出 750×1000 PNG ≤ 1.5s
- [ ] 4.5 卡片合成 payload 包含小程序码（`getUnlimitedQRCode` 携带 `cornerId`）
- [ ] 4.6 "保存到相册" + 权限失败引导设置页（不反复弹窗）
- [ ] 4.7 打卡足迹：本地 `checkinLog` 限 50 条 + 第 51 条迁移到 `checkin_archive`（仅登录用户）
- [ ] 4.8 个人主页"足迹"按城市分组渲染缩略图

## 5. fan-passcode（五迷暗号，当前 H5 仓库不实施）

> 注：当前 H5 已实现等价功能，见 0.6 / 0.v1.1。

- [ ] 5.1 角落详情页"暗号"区块（合作角落显示 `passcode`，非合作角落隐藏入口）
- [ ] 5.2 云函数 `createPasscodeToken`：生成 `payload = { userOpenidHash, cornerId, iat, exp }`，TTL 600s，签名后返回
- [ ] 5.3 用户端二维码渲染（`wx.canvasToTempFilePath` + 二维码库）+ 10 分钟自动刷新
- [ ] 5.4 创建商家分包 `subpackages/merchant`，首页 `wx.scanCode` 扫码核销入口
- [ ] 5.5 云函数 `verifyPasscodeToken`：原子幂等校验（unique index `userOpenidHash + cornerId + dateKey`）；返回成功/`TOKEN_USED`/`DAILY_LIMIT`/`EXPIRED`
- [ ] 5.6 核销成功后向用户推送订阅消息"暗号核销成功"，写入 `user_badges`
- [ ] 5.7 个人主页"徽章墙"：徽章数 / 主题歌覆盖率 / 城市数；首次解锁播放轻量动画

## 6. concert-hub（演唱会信息聚合，当前 H5 仓库不实施）

> 注：当前 H5 已实现等价功能，见 0.7 / 0.v1.1。

- [ ] 6.1 `pages/concert/concert` Tab：日程 / 动态切换；拉取 `schedule.json` + `news.json` 缓存 1 小时
- [ ] 6.2 网络失败时使用上一次缓存并显示"已缓存：{时间}"
- [ ] 6.3 演唱会详情页 `map` 组件：场馆主标记 + 周边 1km 内角落副标记（最多 20 个）
- [ ] 6.4 副标记点击直跳 `pages/corner/corner?cornerId=xxx`
- [ ] 6.5 "今晚同场"按钮：演出窗口 17:00 当日 - 次日 02:00 内可发表 ≤ 200 字短评
- [ ] 6.6 留言本地 `wx.setStorage`（每页面上限 10 条）+ 分享链接合并机制

## 7. share-growth（分享裂变，当前 H5 仓库不实施）

> 注：当前 H5 已实现等价功能，见 0.8 / 0.v1.1。

- [ ] 7.1 在 `pages/checkin` 与 `pages/corner` 实现 `onShareAppMessage`，标题模板 `我在 {城市} {角落}，遇见一句"{歌词}"`，`imageUrl` 使用合成卡片图
- [ ] 7.2 实现 `onShareTimeline`，`query` 携带 `cornerId + userId`
- [ ] 7.3 `app.js` 启动逻辑：解析 `options.query.userId / cornerId`；新用户首次进入时弹"来自 {昵称} 的推荐"提示卡（2s 自动收起）
- [ ] 7.4 云函数 `logShareEvent`：异步写入 `share_events` 集合（不阻塞前端）
- [ ] 7.5 配置微信原生「分享分析」面板，关注分享 PV / UV / 新增用户

## 8. 跨功能与质量（当前 H5 仓库部分已实施）

- [x] 8.1 主包体积控制 ≤ 2MB（图片 webp、模板按需加载）；分包加载策略评审（H5 零依赖单文件已满足）
- [ ] 8.2 隐私协议页 + 首次启动弹窗（位置、相册、用户信息授权）
- [x] 8.3 全局错误边界 + 客服反馈入口（`open-type="contact"`），角落详情底部"信息有误"快捷入口（H5 已有错误处理与反馈入口）
- [ ] 8.4 真机测试矩阵（iOS：iPhone 13 / 15 Pro / SE3；Android：华为 Mate 60 / 小米 14 / OPPO Reno）
- [ ] 8.5 接入微信小程序原生分析 + 异常监控；定义 7 项核心指标看板（DAU/MAU、打卡率、UGC 数、暗号兑换率、评论率、分享率、新增占比）
- [x] 8.6 安全合规自查：歌词片段 ≤ 30 字、用户照片不上云、商家协议归档、敏感词库

## 9. 上线与灰度（当前 H5 仓库不实施）

> 注：以下任务依赖微信小程序工程与商家合作，不在本 H5 仓库实施。

- [ ] 9.1 5–10 家首批合作店铺洽谈完成，商家分包灰度账号下发
- [ ] 9.2 提交微信审核（首版 v0.1.0），通过后内部灰度 7 天
- [ ] 9.3 5 城 × 50 角落第一版数据冷启动，运营群组建立
- [ ] 9.4 KOL 五迷投放分享文案 A/B 测试启动
- [ ] 9.5 第 14 天复盘：分享率 / 打卡率 / UGC 量是否达 §5 验证目标，决定是否扩城

## 10. 后续阶段（v1.1+ 占位，本次 MVP 不交付）

- [ ] 10.1 同城约伴 citywalk 调研（依赖 R-1 阶段数据）
- [ ] 10.2 演唱会现场轻量弹幕同步评估
- [ ] 10.3 接入 SK9 mayday-radio 输出"角落电台" tie-in 玩法

## 11. v1.2 — 五月天全曲库人格测评（personality-quiz）

### 11.1 数据建模与种子
- [x] 11.1.1 在 `app/static/app.js` 定义 `quizQuestions[20]`（按 PRD §3.3.1）
- [x] 11.1.2 定义 `quizPersonalities` 5 维度档案（A 追梦者 / B 治愈者 / C 燃烧者 / D 思想家 / E 探索者）
- [x] 11.1.3 每档案包含：name / title / coreTag / song / album / color / mascot / member / archetype / lyric / subtitlePool / desc / traits / songs
- [x] 11.1.4 后端 `app/model.py` 已有 `QuizResult` 表（user_id / result_type / song / personality / answers / created_at）
- [x] 11.1.5 后端 `app/views.py` 已有 `GET/POST /api/quiz/result` 端点

### 11.2 入口位置
- [x] 11.2.1 在 `page-discover`（首页）Hero 横幅下方、搜索栏上方放置 `.quiz-entry-card`
- [x] 11.2.2 从 `page-mine`（我的）移除测评入口卡片
- [x] 11.2.3 入口卡片左侧展示 5 个吉祥物（red/pink/yellow/blue/green）叠放浮动动画
- [x] 11.2.4 入口卡片点击调用 `navigate('quiz')`

### 11.3 答题流程
- [x] 11.3.1 `quizState = {step, answers, scores:{A,B,C,D,E}}`
- [x] 11.3.2 进度条 + 题序文字（如「第 8 / 20 题」）
- [x] 11.3.3 4 选项卡片，选中后 `scores[type] += 10`
- [x] 11.3.4 自动跳转下一题（400ms 延迟）
- [x] 11.3.5 「上一题」「下一题」导航，第 1 题禁用上一题
- [x] 11.3.6 修改答案时正确撤销旧分加新分
- [x] 11.3.7 题目切换时滑入滑出动画
- [x] 11.3.8 每题随机展示 5 色吉祥物中的一只在题卡侧边

### 11.4 结果页
- [x] 11.4.1 按 scores 降序取 primary + secondary
- [x] 11.4.2 结果页 Hero 主题色背景 + 人生代表曲名 + 歌词金句
- [x] 11.4.3 人格描述长文 + 3 个特质 chips
- [x] 11.4.4 同频歌单 5 首（点击 playSong）
- [x] 11.4.5 复合标题（「{副.coreTag} 的 {主.name}」）
- [x] 11.4.6 副人格档案 + 五月天成员卡（member 字段）
- [x] 11.4.7 共鸣 Top3（按 scores Top3 各取主代表曲）
- [x] 11.4.8 互补推荐（取 scores 最低维度的代表曲，作为「互补型」）

### 11.5 持久化与分享
- [x] 11.5.1 写 localStorage `ls.set('quizResult', ...)`
- [x] 11.5.2 写后端 `api.post('/quiz/result', ...)`
- [x] 11.5.3 首次完成解锁 primary.song（写 unlockedSongs + 后端）
- [x] 11.5.4 分享按钮触发 navigator.share / clipboard fallback
- [x] 11.5.5 分享 shareCount +1 同步后端
- [x] 11.5.6 「保存海报」按钮（Canvas 合成测评卡）

### 11.6 验证
- [x] 11.6.1 浏览器跑通 20 题全流程
- [x] 11.6.2 5 种结果至少出现 3 种（手动构造极端答案集）
- [x] 11.6.3 后端 `/api/quiz/result` POST 200 OK
- [x] 11.6.4 重新测评后 scores 重置正确
- [x] 11.6.5 入口卡片在首页可见、「我的」页不可见
