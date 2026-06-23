# Capability: game-ten

## ADDED Requirements

### Requirement: R0 十秒猜歌入口
系统 SHALL 实现「十秒猜歌入口」。

#### Scenario: 用户进入十秒猜歌
- Given 用户在门户首页
- When 用户点击「十秒猜歌」入口
- Then 页面展示歌词与倒计时

### Requirement: R1 歌词题目展示
系统 SHALL 实现「歌词题目展示」。

#### Scenario: 系统展示题目
- Given 用户进入十秒猜歌
- When 页面初始化
- Then 从 20 组歌词题库中随机展示一段 ≤ 30 字歌词

### Requirement: R2 小球倒计时动画
系统 SHALL 实现「小球倒计时动画」。

#### Scenario: 倒计时开始
- Given 用户看到题目
- When 游戏开始
- Then 14 个小球排成一行，每秒消失 1 个并伴随缩小/透明动画

### Requirement: R3 输入与倒计时结束判定
系统 SHALL 实现「输入与倒计时结束判定」。

#### Scenario: 用户提交或超时
- Given 用户在倒计时内
- When 提交答案或时间耗尽
- Then 系统判断对错并显示正确答案

### Requirement: R4 得分计算
系统 SHALL 实现「得分计算」。

#### Scenario: 用户答对
- Given 用户在倒计时内答对
- When 提交正确答案
- Then 得分 = 剩余秒数 × 10

### Requirement: R5 战绩持久化
系统 SHALL 实现「战绩持久化」。

#### Scenario: 用户完成一局
- Given 一局结束
- When 显示结果页
- Then `ml_ten_stats` 更新总局数、总分与最高分
