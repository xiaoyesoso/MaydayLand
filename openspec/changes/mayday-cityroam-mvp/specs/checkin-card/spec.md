## ADDED Requirements

### Requirement: 到店核验
系统 SHALL 在用户点击"我要打卡"时，通过 `wx.getLocation` 获取当前位置，并校验与目标角落经纬度直线距离 ≤ 200 米；若失败可降级至 1km 宽松校验，并在卡片上标记"附近打卡"。

#### Scenario: 距离 ≤ 200m
- **WHEN** 用户实际距离角落 ≤ 200m
- **THEN** 进入照片选择 / 拍摄环节
- **AND** 卡片标记为"现场打卡"

#### Scenario: 距离 > 200m 但 ≤ 1km
- **WHEN** 用户距离 > 200m 且 ≤ 1km
- **THEN** 系统 SHALL 提示"附近打卡（不计入精确足迹）"，并允许继续

#### Scenario: 距离 > 1km
- **WHEN** 用户距离 > 1km
- **THEN** 系统 SHALL 阻止打卡，并提示"请走近 {角落名称} 后再打卡"

### Requirement: 照片上传与本地处理
系统 SHALL 调用 `wx.chooseMedia({ count: 1, mediaType: ['image'] })` 选择/拍摄一张照片；照片仅在本地处理与合成，**MUST NOT** 上传到云端服务器或对象存储。

#### Scenario: 用户拍照成功
- **WHEN** 用户拍照或选择本地照片
- **THEN** 系统将 `tempFilePath` 存入页面 `data.userPhoto`
- **AND** 不发起任何 `wx.uploadFile` 请求

### Requirement: Canvas 卡片合成
系统 SHALL 使用 `canvas 2d` 在前端合成 750×1000 px 卡片图，包含背景模板、用户照片、歌词字幕（≤ 30 字）、地点徽章、日期、小程序码；通过 `wx.canvasToTempFilePath` 输出为本地图片。

#### Scenario: 合成成功
- **WHEN** 用户照片就绪且选定模板
- **THEN** 在 ≤ 1.5 秒内返回 `tempFilePath`
- **AND** 卡片底部含小程序码（path 携带 `cornerId`）

### Requirement: 三套主题模板
系统 SHALL 提供至少 3 套打卡卡片主题：`复古拍立得 / 演唱会票根 / 极简胶片`，用户在合成前可切换；每套模板的字体与色板需与五月天专辑视觉一致。

#### Scenario: 切换模板
- **WHEN** 用户在合成预览页点击"票根"
- **THEN** Canvas 立即重绘为票根样式
- **AND** 历史合成卡片不受影响

### Requirement: 保存与分享
系统 SHALL 提供"保存到相册"与"分享给朋友 / 朋友圈"两种出口；保存调用 `wx.saveImageToPhotosAlbum`，分享通过 `onShareAppMessage` 携带卡片图作为 `imageUrl`。

#### Scenario: 保存到相册
- **WHEN** 用户点击"保存"且授权相册权限
- **THEN** 系统将卡片写入相册并提示"已保存"

#### Scenario: 用户拒绝相册权限
- **WHEN** 用户拒绝授权
- **THEN** 系统 SHALL 引导用户至设置页开启权限，**MUST NOT** 反复弹窗

### Requirement: 打卡足迹
系统 SHALL 记录用户打卡角落清单（cornerId、日期、卡片缩略图）至本地 `wx.setStorage` 的 `checkinLog`，并在用户主页展示按城市分组的徽章列表；本地记录上限 50 条，超出时滚动归档至云开发数据库（仅当用户登录）。

#### Scenario: 第 51 次打卡
- **WHEN** 本地已存 50 条且用户继续打卡
- **THEN** 系统 SHALL 将最旧的 1 条迁移至云端 `checkin_archive` 集合
- **AND** 本地始终保持最新 50 条
