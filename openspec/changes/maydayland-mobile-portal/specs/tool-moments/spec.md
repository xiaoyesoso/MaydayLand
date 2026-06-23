# Capability: tool-moments

## ADDED Requirements

### Requirement: R0 朋友圈入口
系统 SHALL 实现「朋友圈入口」。

#### Scenario: 用户进入朋友圈
- Given 用户在门户首页
- When 用户点击「朋友圈」入口
- Then 页面展示动态信息流

### Requirement: R1 动态信息流
系统 SHALL 实现「动态信息流」。

#### Scenario: 用户浏览动态
- Given 用户进入朋友圈
- When 页面加载
- Then 展示 10 条示例动态卡片（头像、昵称、文字、图片/音乐、点赞数）

### Requirement: R2 图片 Lightbox
系统 SHALL 实现「图片 Lightbox」。

#### Scenario: 用户点击图片
- Given 用户看到动态中的图片
- When 点击图片
- Then 弹出全屏 Lightbox 预览

### Requirement: R3 主题切换
系统 SHALL 实现「主题切换」。

#### Scenario: 用户切换主题
- Given 用户点击主题切换按钮
- When 切换亮色/暗色
- Then 页面配色跟随变化，状态持久化到 `ml_moments_theme`
