## ADDED Requirements

### Requirement: 首页城市选择器入口
系统 SHALL 在"发现"页顶部 Banner 下方提供城市选择器入口，显示当前选中城市名称与下拉箭头，点击弹出半屏抽屉式城市选择面板，支持 5 个核心城市（台北 / 上海 / 北京 / 广州 / 成都）之间切换。

#### Scenario: 用户首次进入发现页
- **WHEN** 用户首次进入"发现"页且未设置过城市
- **THEN** 系统 SHALL 调用 `wx.getLocation` 反查城市，命中 5 城之一则自动选中
- **AND** 定位失败或不在 5 城内时默认选中"北京"
- **AND** 城市选择器入口显示 `🏙️ 当前城市：北京 ▾`

#### Scenario: 用户打开城市选择面板
- **WHEN** 用户点击城市选择器入口
- **THEN** 系统 SHALL 从底部滑出半屏抽屉，展示 5 个城市卡片
- **AND** 每张卡片显示城市名、专属色调徽章、该城市角落数量
- **AND** 当前选中城市卡片高亮显示

### Requirement: 城市切换数据联动
系统 SHALL 在用户切换城市后，立即刷新"发现"页的角落列表、地图标记与"演唱会"页的日程，仅展示当前选中城市的数据；切换时列表采用 200ms 淡入动画。

#### Scenario: 切换城市后列表刷新
- **WHEN** 用户在城市选择面板点击"上海"
- **THEN** 系统 SHALL 将 `localStorage.currentCity` 写为"上海"
- **THEN** 角落列表仅展示 `city==='上海'` 的角落，按距离升序排列
- **AND** 地图标记同步刷新为上海角落
- **AND** 列表以 200ms 淡入动画呈现

#### Scenario: 切换到无种子角落的城市
- **WHEN** 用户切换到当前无种子角落的城市
- **THEN** 系统 SHALL 显示空状态插画 + "该城市还没有歌词角落，去推荐一个？"
- **AND** 提供"推荐新角落"CTA 按钮跳转至 UGC 提交页

### Requirement: 城市选择记忆
系统 SHALL 将用户最后选中的城市持久化到 `localStorage.currentCity`，用户下次进入小程序时自动恢复该城市，无需重新选择。

#### Scenario: 重启后恢复城市
- **WHEN** 用户关闭小程序后再次进入"发现"页
- **THEN** 系统 SHALL 读取 `localStorage.currentCity` 并自动选中
- **AND** 列表与地图按记忆城市刷新

### Requirement: 城市徽章配色
系统 SHALL 为 5 个核心城市配置专属色调徽章：台北粉 `#FF6B9D` / 上海蓝 `#3B7DD8` / 北京黄 `#FFD23F` / 广州绿 `#4ECDC4` / 成都紫 `#9B7EDE`，徽章在城市选择面板、顶部状态栏点缀、角落卡片城市标签处统一使用。

#### Scenario: 城市徽章渲染
- **WHEN** 系统渲染任意城市的徽章
- **THEN** 徽章背景色 SHALL 与城市专属色调一致
- **AND** 徽章圆角 12px，内边距 4px 10px，字号 12px

### Requirement: 城市切换计数（支撑歌单解锁）
系统 SHALL 记录用户累计切换城市的次数到 `localStorage.citySwitchCount`，每次切换 +1，供"歌单解锁"capability 读取以触发《离开地球表面》解锁条件。

#### Scenario: 切换城市计数自增
- **WHEN** 用户在城市选择面板成功切换城市
- **THEN** `localStorage.citySwitchCount` SHALL 自增 1
- **AND** 触发歌单解锁检查（见 song-unlock spec）
