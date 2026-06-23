# Capability: tool-gallery

## ADDED Requirements

### Requirement: R0 图库入口
系统 SHALL 实现「图库入口」。

#### Scenario: 用户进入图库
- Given 用户在门户首页
- When 用户点击「图库」入口
- Then 页面展示分类标签与图片网格

### Requirement: R1 分类切换
系统 SHALL 实现「分类切换」。

#### Scenario: 用户切换分类
- Given 用户看到分类标签
- When 点击「年度报告 / 可爱超标 / 蜡笔小新五月天 / AA的物料」
- Then 网格展示对应分类图片

### Requirement: R2 图片懒加载
系统 SHALL 实现「图片懒加载」。

#### Scenario: 用户滚动图库
- Given 页面有大量图片
- When 图片进入视口
- Then 图片才开始加载

### Requirement: R3 Lightbox 预览与滑动
系统 SHALL 实现「Lightbox 预览与滑动」。

#### Scenario: 用户查看大图
- Given 用户点击图片
- When 进入 Lightbox
- Then 可左右滑动切换同分类图片
