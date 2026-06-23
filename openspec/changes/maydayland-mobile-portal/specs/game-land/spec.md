# Capability: game-land

## ADDED Requirements

### Requirement: R0 歌词选择入口
系统 SHALL 实现「歌词选择入口」。

#### Scenario: 用户进入歌词选择
- Given 用户在门户首页
- When 用户点击「歌词选择」入口
- Then 页面展示昵称输入页或直接进入答题页

### Requirement: R1 昵称输入
系统 SHALL 实现「昵称输入」。

#### Scenario: 用户首次进入
- Given 用户未设置昵称
- When 进入歌词选择
- Then 显示昵称输入表单，保存到 `ml_land_stats`

### Requirement: R2 单题展示
系统 SHALL 实现「单题展示」。

#### Scenario: 系统展示题目
- Given 用户已进入答题
- When 加载题目
- Then 显示歌词片段与 4 个歌名选项

### Requirement: R3 左右滑动手势切题
系统 SHALL 实现「左右滑动手势切题」。

#### Scenario: 用户答完一题
- Given 用户选择答案后
- When 向左滑动
- Then 进入下一题并播放滑入动画

### Requirement: R4 得分计算与结果页
系统 SHALL 实现「得分计算与结果页」。

#### Scenario: 用户完成整套题目
- Given 用户答完最后一题
- When 显示结果页
- Then 计算正确率与得分

### Requirement: R5 战绩持久化
系统 SHALL 实现「战绩持久化」。

#### Scenario: 用户刷新最好成绩
- Given 用户完成答题
- When 得分高于历史最高
- Then 更新 `ml_land_stats`
