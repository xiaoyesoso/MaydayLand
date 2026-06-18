## ADDED Requirements

### Requirement: 角落详情增强字段
系统 SHALL 为每个角落补充以下详情字段，并在角落详情页顶部图片下方的信息卡中展示：`description`（200-400 字故事描述）、`openingHours`（营业时间）、`phone`（联系电话）、`tags`（氛围标签数组）、`tips`（到店小贴士）。

#### Scenario: 渲染详情信息卡
- **WHEN** 用户进入角落详情页
- **THEN** 系统 SHALL 在顶部图片下方渲染信息卡，包含：
  - 营业时间图标 + `openingHours` 文本
  - 电话图标 + `phone` 文本（可点击拨打）
  - 距离图标 + 当前距离文本
  - 氛围标签 chips（`#复古 #黑胶 #咖啡香`）
- **AND** 在信息卡下方渲染 `description` 长文本段落
- **AND** 在描述下方渲染 `tips` 小贴士卡片（黄色背景 + 💡 图标）

#### Scenario: 拨打电话
- **WHEN** 用户点击信息卡中的电话号码
- **THEN** 小程序端 SHALL 调用 `wx.makePhoneCall({ phoneNumber })`
- **AND** HTML Demo SHALL 调用 `window.location.href = 'tel:xxx'`

### Requirement: 查看大地图功能
系统 SHALL 在角落详情页提供"查看大地图"按钮，点击打开全屏地图页（独立 page），展示当前角落位置 + 同城市同类角落标记，支持点击标记跳回对应角落详情。

#### Scenario: 打开大地图
- **WHEN** 用户点击详情页"查看大地图"按钮
- **THEN** 系统 SHALL 跳转到 `/pages/map/map?cornerId=xxx&city=xxx`
- **AND** 地图中心定位到当前角落坐标，缩放级别 15
- **AND** 同城市同类角落以不同颜色 marker 标注
- **AND** 当前角落 marker 高亮放大

#### Scenario: 大地图标记跳转
- **WHEN** 用户在大地图点击任意 marker
- **THEN** 系统 SHALL 显示该角落的名称 + 歌词气泡
- **AND** 点击气泡跳转回该角落详情页

### Requirement: 一键导航功能
系统 SHALL 在角落详情页底部固定按钮组提供"🧭 导航"按钮，与"我要打卡""我要对暗号"并列，点击唤起系统地图导航。

#### Scenario: 小程序端导航
- **WHEN** 用户在小程序端点击"导航"按钮
- **THEN** 系统 SHALL 调用 `wx.openLocation({ latitude, longitude, name, address, scale: 18 })`
- **AND** 唤起微信内置地图，展示导航路线

#### Scenario: HTML Demo 导航
- **WHEN** 用户在 HTML Demo 点击"导航"按钮
- **THEN** 系统 SHALL 检测设备类型：
  - iOS：`window.open('maps://maps.apple.com/?ll=lat,lng&q=name')`
  - Android：`window.open('https://uri.amap.com/navigation?to=lng,lat,name')`
  - 桌面：`window.open('https://www.google.com/maps?q=lat,lng')`

### Requirement: 地址复制功能
系统 SHALL 支持用户长按角落地址文本复制到剪贴板，方便分享给好友。

#### Scenario: 长按复制地址
- **WHEN** 用户长按详情页地址文本
- **THEN** 系统 SHALL 调用 `wx.setClipboardData({ data: address })`
- **AND** 显示 toast "地址已复制"

### Requirement: 底部三按钮组
系统 SHALL 将角落详情页底部固定按钮组调整为三按钮布局："🧭 导航" | "📸 我要打卡" | "💬 我要对暗号"，按钮等宽分布，主操作（打卡）高亮。

#### Scenario: 渲染三按钮组
- **WHEN** 角落详情页加载完成
- **THEN** 底部 SHALL 显示三按钮组，按钮等宽（各占 33.3%）
- **AND** "我要打卡"按钮使用五球渐变色高亮
- **AND** "导航"与"对暗号"按钮使用白底描边样式
