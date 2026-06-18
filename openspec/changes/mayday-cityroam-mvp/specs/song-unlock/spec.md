## ADDED Requirements

### Requirement: 歌单墙展示
系统 SHALL 在"我的"页新增"歌单解锁"区块，按五月天 9 张专辑分组展示 24 首精选歌曲，未解锁歌曲显示锁图标 + 模糊歌名，已解锁歌曲高亮显示并可点击试听。

#### Scenario: 渲染歌单墙
- **WHEN** 用户进入"我的"页
- **THEN** 系统 SHALL 在徽章墙下方渲染"歌单解锁"区块
- **AND** 顶部显示进度统计 `已解锁 X / 24 首`
- **AND** 按 9 张专辑分组展示歌曲网格（每行 3 首）
- **AND** 已解锁歌曲显示专辑配色背景 + 歌名 + 试听图标
- **AND** 未解锁歌曲显示灰色锁图标 + 模糊歌名

#### Scenario: 点击未解锁歌曲
- **WHEN** 用户点击未解锁歌曲
- **THEN** 系统 SHALL 显示 tooltip 提示解锁条件（如"首次打卡任意角落解锁"）
- **AND** tooltip 2 秒后自动消失

#### Scenario: 点击已解锁歌曲试听
- **WHEN** 用户点击已解锁歌曲
- **THEN** 系统 SHALL 弹出试听选项面板：
  - "在 QQ 音乐中试听" → `window.open('https://y.qq.com/n/ryqq/search?w=歌名')`
  - "在网易云音乐中试听" → `window.open('https://music.163.com/#/search/m/?s=歌名')`
- **AND** 小程序端使用 `wx.navigateToMiniProgram` 跳转对应音乐 App 小程序

### Requirement: 多维度解锁条件
系统 SHALL 定义以下 8 类解锁条件，并在用户完成对应行为时自动检查并解锁：

| 解锁动作 | 解锁歌曲 | 触发条件 |
| :--- | :--- | :--- |
| 首次打卡任意角落 | 《任意门》 | `footprints.length >= 1` |
| 对暗号成功 1 次 | 对应暗号歌曲 | `passcodeLog.length >= 1` |
| 分享卡片 1 次 | 《知足》 | `shareCount >= 1` |
| 切换城市 3 次 | 《离开地球表面》 | `citySwitchCount >= 3` |
| 累计打卡 5 个角落 | 《干杯》 | `footprints.length >= 5` |
| 累计打卡 5 个城市 | 《人生海海》 | 去重城市数 >= 5 |
| 评论被点赞 10 次 | 《温柔》 | `commentLikedCount >= 10` |
| 完成 1 次附近打卡 | 《突然好想你》 | 存在 `mode==='loose'` 的足迹 |

#### Scenario: 首次打卡解锁任意门
- **WHEN** 用户完成首次打卡保存卡片
- **THEN** 系统 SHALL 检查 `footprints.length === 1`
- **AND** 解锁《任意门》并写入 `unlockedSongs`
- **AND** 弹出全屏解锁动画

#### Scenario: 对暗号解锁对应歌曲
- **WHEN** 用户成功核销暗号
- **THEN** 系统 SHALL 解锁该角落的 `song` 字段对应歌曲
- **AND** 若该歌曲已解锁则不重复触发动画

### Requirement: 解锁动画
系统 SHALL 在歌曲解锁时弹出全屏动画：五球粒子从中心绽放 + 歌名从下浮入 + 试听按钮，持续 2 秒后自动关闭或用户点击关闭。

#### Scenario: 播放解锁动画
- **WHEN** 任意解锁条件被触发且歌曲未解锁
- **THEN** 系统 SHALL 显示全屏遮罩 + 五球粒子绽放动画（800ms）
- **AND** 歌名从底部浮入中心（400ms 延迟）
- **AND** 显示"🎉 解锁《歌名》"文本 + 试听按钮
- **AND** 2 秒后自动关闭，或用户点击任意位置关闭

### Requirement: 解锁数据持久化
系统 SHALL 将已解锁歌曲列表与解锁日志持久化到 `localStorage`，结构如下：

```json
{
  "unlockedSongs": ["任意门", "倔强", "知足"],
  "unlockLog": [
    { "song": "任意门", "action": "first_checkin", "cornerId": "corner_001", "time": "2026-06-18" }
  ]
}
```

#### Scenario: 解锁后持久化
- **WHEN** 任意歌曲被解锁
- **THEN** 系统 SHALL 将歌名写入 `localStorage.unlockedSongs` 数组（去重）
- **AND** 将解锁记录写入 `localStorage.unlockLog`（保留最近 100 条）
- **AND** 下次进入"我的"页时歌单墙读取该数据渲染

### Requirement: 解锁检查触发点
系统 SHALL 在以下行为完成后自动调用 `checkSongUnlock()` 函数检查所有解锁条件：

- 打卡保存卡片后（`saveCard` 函数末尾）
- 暗号核销成功后（`verifyPasscode` 函数末尾）
- 分享卡片后（`shareCard` 函数末尾）
- 切换城市后（`switchCity` 函数末尾）
- 评论被点赞后（`toggleCommentLike` 函数末尾）

#### Scenario: 行为触发解锁检查
- **WHEN** 用户完成上述任意行为
- **THEN** 系统 SHALL 调用 `checkSongUnlock()`
- **AND` 该函数遍历 8 类解锁条件，对未解锁歌曲逐一检查
- **AND** 满足条件的歌曲立即解锁并播放动画（多首同时解锁时依次播放）

### Requirement: 下一首解锁提示
系统 SHALL 在歌单墙顶部进度统计下方显示"下一首解锁提示"，告诉用户距离下一首歌还需做什么。

#### Scenario: 显示下一首解锁提示
- **WHEN** 歌单墙渲染且已解锁数 < 24
- **THEN** 系统 SHALL 找到下一个最接近解锁的歌曲
- **AND** 显示提示文本如"再打卡 2 个角落即可解锁《干杯》"
- **AND** 已全部解锁时显示"🎉 已解锁全部 24 首五月天精选！"
