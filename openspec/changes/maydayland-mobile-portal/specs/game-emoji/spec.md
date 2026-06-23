# Capability: game-emoji

## ADDED Requirements

### Requirement: R0 Emoji 猜歌入口
系统 SHALL 实现「Emoji 猜歌入口」。

#### Scenario: 用户进入 Emoji 猜歌
- Given 用户在门户首页
- When 用户点击「Emoji 猜歌」入口
- Then 页面展示当前题目的 Emoji 组合

### Requirement: R1 Emoji 题目展示
系统 SHALL 实现「Emoji 题目展示」。

#### Scenario: 系统展示题目
- Given 用户进入 Emoji 猜歌
- When 页面初始化
- Then 从 20 组题库中随机展示一组 Emoji（大号 + 浮动动画）

### Requirement: R2 输入与答案判断
系统 SHALL 实现「输入与答案判断」。

#### Scenario: 用户输入歌名
- Given 用户看到 Emoji 题目
- When 输入歌名并提交
- Then 系统判断对错并给出反馈

### Requirement: R3 提示功能
系统 SHALL 实现「提示功能」。

#### Scenario: 用户使用提示
- Given 用户不确定答案
- When 点击提示按钮
- Then 显示一条线索，消耗一次提示次数

### Requirement: R4 反馈动画
系统 SHALL 实现「反馈动画」。

#### Scenario: 用户提交答案
- Given 用户点击提交
- When 答案正确
- Then 播放撒花动画；错误时输入框抖动

### Requirement: R5 战绩持久化
系统 SHALL 实现「战绩持久化」。

#### Scenario: 用户完成题目
- Given 用户答对或跳过
- When 进入下一题或离开
- Then `ml_emoji_stats` 更新已解题数与提示使用数
