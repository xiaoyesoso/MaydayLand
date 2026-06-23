# Capability: game-synthesis

## ADDED Requirements

### Requirement: R0 合成大月天入口
系统 SHALL 实现「合成大月天入口」。

#### Scenario: 用户进入合成大月天
- Given 用户在门户首页
- When 用户点击「合成大月天」入口
- Then 页面加载 Canvas 游戏区与底部下一个图标

### Requirement: R1 图标资源准备
系统 SHALL 实现「图标资源准备」。

#### Scenario: 游戏资源加载
- Given 用户进入游戏
- When 页面初始化
- Then 预加载 `assets/MaydayLand/images/games/synthesis/emoji1.png ~ emoji10.png`

### Requirement: R2 点击释放图标
系统 SHALL 实现「点击释放图标」。

#### Scenario: 用户释放图标
- Given 用户看到下一个图标
- When 点击/触摸屏幕水平位置
- Then 图标从顶部落到该位置

### Requirement: R3 简化物理与合成
系统 SHALL 实现「简化物理与合成」。

#### Scenario: 相同图标碰撞
- Given 场上有两个相同等级图标
- When 它们碰撞
- Then 合成下一级图标，得分 += 等级 × 100

### Requirement: R4 游戏结束判定
系统 SHALL 实现「游戏结束判定」。

#### Scenario: 图标堆到顶部线
- Given 场上图标堆积
- When 任意图标稳定后超过顶部警戒线
- Then 游戏结束，显示分数

### Requirement: R5 帧率降级
系统 SHALL 实现「帧率降级」。

#### Scenario: 低端机运行
- Given 设备性能不足
- When 帧率持续低于 45fps
- Then 自动降级为 30fps

### Requirement: R6 战绩持久化
系统 SHALL 实现「战绩持久化」。

#### Scenario: 游戏结束
- Given 用户获得分数
- When 分数高于历史最高
- Then 更新 `ml_synthesis_stats`
