# Capability: mobile-portal-home

## ADDED Requirements

### Requirement: R0 门户首页入口
系统 SHALL 实现「门户首页入口」。

#### Scenario: 用户打开移动端门户
- Given 用户访问 `/#mobile-portal`
- When 页面加载完成
- Then 页面展示 Header、Banner、游戏网格、工具列表与底部 TabBar

### Requirement: R1 展示全部 11 个子产品入口
系统 SHALL 实现「展示全部 11 个子产品入口」。

#### Scenario: 用户浏览首页
- Given 用户在门户首页
- When 页面渲染完成
- Then 可见 8 款游戏入口与 3 款工具入口

### Requirement: R2 入口跳转
系统 SHALL 实现「入口跳转」。

#### Scenario: 用户点击游戏或工具
- Given 用户在门户首页
- When 用户点击任意游戏/工具卡片
- Then 页面导航到对应能力视图

### Requirement: R3 昵称修改与持久化
系统 SHALL 实现「昵称修改与持久化」。

#### Scenario: 用户设置昵称
- Given 用户点击设置入口
- When 输入昵称并确认
- Then 昵称写入 `ml_portal_user` 并在首页显示

### Requirement: R4 移动端适配
系统 SHALL 实现「移动端适配」。

#### Scenario: 用户在 iPhone SE 尺寸下访问
- Given 设备宽度 375px
- When 首页加载
- Then 页面无横向滚动，所有元素可见
