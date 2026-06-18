## ADDED Requirements

### Requirement: 打卡卡片作为分享封面
系统 SHALL 在用户成功合成打卡卡片后，将卡片图 `tempFilePath` 设为 `onShareAppMessage` 与 `onShareTimeline` 的 `imageUrl`；分享标题统一格式为：`我在 {城市} {角落名}，遇见一句"{歌词}"`。

#### Scenario: 用户分享给微信好友
- **WHEN** 用户在打卡结果页点击"分享给好友"
- **THEN** 调用 `onShareAppMessage` 返回带 `imageUrl` 的对象
- **AND** 微信会话内展示卡片图作为封面

#### Scenario: 分享朋友圈
- **WHEN** 用户点击"分享到朋友圈"
- **THEN** 调用 `onShareTimeline` 返回带 `query` 与 `imageUrl` 的对象
- **AND** 朋友圈分享卡片含小程序二维码

### Requirement: 分享链接携参
系统 SHALL 在所有分享路径中携带 `userId`（openid 哈希）与上下文 ID（如 `cornerId` 或 `concertId`），供后续追踪 attribution。

#### Scenario: 分享角落详情
- **WHEN** 用户从角落详情页发起分享
- **THEN** 分享 `path` 形如 `/pages/corner/corner?cornerId=xxx&userId=yyy`
- **AND** 新用户点击后直达该角落详情页

### Requirement: 新用户落地页
系统 SHALL 在新用户通过分享链接首次进入小程序时，识别 `userId`（来源用户）与上下文 ID，跳转至对应详情页并弹出"来自 {昵称} 的推荐"提示卡。

#### Scenario: 新用户从分享进入
- **WHEN** 新用户首次打开小程序且 `query.userId` 存在
- **THEN** 直接跳转至 `cornerId` 详情页
- **AND** 顶部弹出推荐人提示卡，2 秒后自动收起

### Requirement: 分享数据观测
系统 SHALL 在用户每次发起分享时，通过云函数 `logShareEvent` 记录 `{ userId, ctx, ctxId, channel, ts }`；同时依赖微信小程序原生「分享分析」面板获取打开率与新用户增量。

#### Scenario: 分享统计
- **WHEN** 用户分享行为发生
- **THEN** 云函数异步写入 `share_events` 集合
- **AND** **MUST NOT** 阻塞前端分享流程
