# Capability: game-wordle

## ADDED Requirements

### Requirement: R0 猜词游戏入口
系统 SHALL 实现「猜词游戏入口」。

#### Scenario: 用户进入猜词游戏
- Given 用户在门户首页
- When 用户点击「猜词 / 猜歌名」入口
- Then 页面进入 `#game-wordle` 并开始一局新游戏

### Requirement: R1 题库与题目生成
系统 SHALL 实现「题库与题目生成」。

#### Scenario: 系统生成题目
- Given 用户进入猜词游戏
- When 游戏初始化
- Then 从 4–6 字歌名题库中随机抽取一首

### Requirement: R2 虚拟键盘输入
系统 SHALL 实现「虚拟键盘输入」。

#### Scenario: 用户使用虚拟键盘
- Given 用户看到虚拟键盘
- When 点击字母或退格或确认
- Then 输入框内容正确更新

### Requirement: R3 颜色反馈算法
系统 SHALL 实现「颜色反馈算法」。

#### Scenario: 用户提交猜测
- Given 用户输入一首歌曲名
- When 点击确认
- Then 每个字符显示绿色（位置正确）、黄色（存在但位置不对）或灰色（不存在）

### Requirement: R4 翻转动画
系统 SHALL 实现「翻转动画」。

#### Scenario: 用户提交猜测后
- Given 猜测有效
- When 系统比对完成
- Then 每个字符卡片播放翻转动画

### Requirement: R5 胜负判定与战绩
系统 SHALL 实现「胜负判定与战绩」。

#### Scenario: 游戏结束
- Given 用户用完 5 次机会或猜对
- When 游戏结束
- Then 显示战绩弹窗，并更新 `ml_wordle_stats`
