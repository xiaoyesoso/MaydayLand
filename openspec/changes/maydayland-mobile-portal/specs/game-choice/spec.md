# Capability: game-choice

## ADDED Requirements

### Requirement: R0 二选一游戏入口
系统 SHALL 实现「二选一游戏入口」。

#### Scenario: 用户进入二选一
- Given 用户在门户首页
- When 用户点击「二选一」入口
- Then 页面展示两首歌曲供选择

### Requirement: R1 歌曲对展示
系统 SHALL 实现「歌曲对展示」。

#### Scenario: 系统展示歌曲对
- Given 用户进入二选一
- When 页面初始化
- Then 从 30 首歌曲池中随机抽取两首展示

### Requirement: R2 投票交互
系统 SHALL 实现「投票交互」。

#### Scenario: 用户选择喜欢的一首
- Given 用户看到 song1 和 song2
- When 点击其中一首
- Then 播放高亮动画，被选项票数 +1

### Requirement: R3 本地排行榜
系统 SHALL 实现「本地排行榜」。

#### Scenario: 用户查看排行榜
- Given 用户累计投票后
- When 进入排行榜
- Then 歌曲按 `ml_choice_rankings` 票数排序

### Requirement: R4 战绩持久化
系统 SHALL 实现「战绩持久化」。

#### Scenario: 用户完成投票
- Given 用户投票结束
- When 离开页面
- Then `ml_choice_stats` 保存累计投票数与最佳连击
