# Capability: tool-scratch

## ADDED Requirements

### Requirement: R0 刮刮乐入口
系统 SHALL 实现「刮刮乐入口」。

#### Scenario: 用户进入 DIY 刮刮乐
- Given 用户在门户首页
- When 用户点击「DIY 刮刮乐」入口
- Then 页面展示文字输入、模板选择与预览区

### Requirement: R1 文字与模板选择
系统 SHALL 实现「文字与模板选择」。

#### Scenario: 用户制作刮刮卡
- Given 用户在刮刮乐页面
- When 输入文字并选择背景模板
- Then Canvas 绘制涂层覆盖在文字/背景之上

### Requirement: R2 涂抹刮开
系统 SHALL 实现「涂抹刮开」。

#### Scenario: 用户在涂层上涂抹
- Given 用户看到灰色涂层
- When 手指或鼠标在涂层上移动
- Then 涂层被擦除，露出下方内容

### Requirement: R3 自动揭开
系统 SHALL 实现「自动揭开」。

#### Scenario: 刮开面积过半
- Given 用户持续涂抹
- When 已刮开像素比例 ≥ 50%
- Then 自动清除全部涂层

### Requirement: R4 生成分享图
系统 SHALL 实现「生成分享图」。

#### Scenario: 用户完成刮刮卡
- Given 用户刮开内容
- When 点击生成分享图
- Then 导出 Canvas 为 PNG 供保存/分享
