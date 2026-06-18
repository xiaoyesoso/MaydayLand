## ADDED Requirements

### Requirement: 暗号绑定与展示
系统 SHALL 在每个合作角落详情页展示一个"五迷暗号"（一首五月天歌曲名，如`倔强`、`温柔`、`憨人`），暗号由运营在 `corners.json` 的 `passcode` 字段中预配。

#### Scenario: 详情页加载
- **WHEN** 用户进入合作角落详情页
- **THEN** 展示形如 `📌 五迷暗号：倔强` 的提示卡
- **AND** 卡片下方有"我要对暗号"按钮

### Requirement: 一次性 Token 二维码
系统 SHALL 在用户点击"我要对暗号"时，通过云函数 `createPasscodeToken` 生成一次性 token（payload 含 `userOpenidHash + cornerId + iat + exp`，TTL 10 分钟），并在小程序内渲染成二维码。

#### Scenario: 用户生成二维码
- **WHEN** 用户在合作店内点击"我要对暗号"
- **THEN** 云函数返回 `{ token, expiresAt }`
- **AND** 小程序 ≤ 1 秒内渲染出二维码

#### Scenario: Token 过期
- **WHEN** 二维码生成后超过 10 分钟未被核销
- **THEN** 系统 SHALL 自动刷新二维码，**MUST NOT** 提交过期 token

### Requirement: 商家扫码核销
系统 SHALL 提供商家端入口（同一小程序的"商家"分包），店主使用商家账号登录后，通过 `wx.scanCode` 扫描用户二维码并调用云函数 `verifyPasscodeToken` 完成核销。

#### Scenario: 核销成功
- **WHEN** Token 有效且未被使用
- **THEN** 云函数返回 `{ success: true, userId, cornerId }`
- **AND** 用户端收到云开发订阅通知"暗号核销成功"

#### Scenario: Token 已使用
- **WHEN** Token 已经被核销过
- **THEN** 云函数返回 `{ success: false, code: "TOKEN_USED" }`
- **AND** 商家端提示"暗号已使用，请用户刷新"

### Requirement: 单用户日限
系统 SHALL 限制单用户在同一角落每日仅可成功核销 1 次暗号；超出当日限制时返回 `{ success: false, code: "DAILY_LIMIT" }`。

#### Scenario: 同日二次核销
- **WHEN** 用户在同一角落已成功核销过一次
- **THEN** 当日内再次生成的 token SHALL 在校验阶段被拒绝
- **AND** 用户端提示"今日已对过暗号，明天再来吧"

### Requirement: 五迷徽章沉淀
系统 SHALL 为每次成功核销发放对应主题歌徽章（如 `倔强`、`温柔`），存入用户云端档案 `user_badges` 集合，并在个人主页"徽章墙"展示已收集徽章数 / 主题歌覆盖率 / 城市数。

#### Scenario: 首次获得徽章
- **WHEN** 用户首次核销获得"倔强"徽章
- **THEN** 在徽章墙展示徽章并播放轻量动画
- **AND** 推送一条"恭喜解锁徽章：倔强"系统消息
