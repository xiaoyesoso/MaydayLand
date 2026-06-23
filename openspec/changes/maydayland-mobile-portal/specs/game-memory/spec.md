# Capability: game-memory

## ADDED Requirements

### Requirement: R0 记忆配对入口
系统 SHALL 实现「记忆配对入口」。

#### Scenario: 用户进入记忆配对
- Given 用户在门户首页
- When 用户点击「记忆配对」入口
- Then 页面展示关卡选择与第一关

### Requirement: R1 三关难度
系统 SHALL 实现「三关难度」。

#### Scenario: 用户选择关卡
- Given 用户在记忆配对首页
- When 点击关卡 1/2/3
- Then 分别生成 4×4、4×5、6×6 卡片网格

### Requirement: R2 卡片图案
系统 SHALL 实现「卡片图案」。

#### Scenario: 游戏初始化
- Given 用户进入关卡
- When 页面渲染
- Then 卡片背面统一，正面使用 `assets/MaydayLand/images/games/ten/emoji*.png`

### Requirement: R3 3D 翻转动画
系统 SHALL 实现「3D 翻转动画」。

#### Scenario: 用户点击卡片
- Given 用户看到卡片背面
- When 点击卡片
- Then 卡片以 CSS rotateY 翻转显示正面

### Requirement: R4 配对逻辑
系统 SHALL 实现「配对逻辑」。

#### Scenario: 翻开两张卡片
- Given 用户翻开两张卡片
- When 图案相同
- Then 保持翻开；不同则 1 秒后翻回

### Requirement: R5 计时与最好成绩
系统 SHALL 实现「计时与最好成绩」。

#### Scenario: 用户完成关卡
- Given 用户翻开所有配对
- When 关卡完成
- Then 停止计时，若用时更短则更新 `ml_memory_stats`
