## ADDED Requirements

### Requirement: 评论点赞功能
系统 SHALL 在每条评论右侧提供心形点赞按钮，点击切换点赞状态；点赞数实时 +1/-1，点赞状态持久化到 `localStorage.likedCommentIds`，跨会话保持。

#### Scenario: 用户点赞评论
- **WHEN** 用户点击评论的心形按钮且当前未点赞
- **THEN** 心形 SHALL 变为实心红色，点赞数 +1
- **AND** 评论 ID 写入 `localStorage.likedCommentIds` 数组
- **AND** 评论对象的 `likes` 字段 +1 并持久化

#### Scenario: 用户取消点赞
- **WHEN** 用户再次点击已点赞评论的心形按钮
- **THEN** 心形 SHALL 变回空心灰色，点赞数 -1
- **AND** 评论 ID 从 `localStorage.likedCommentIds` 移除
- **AND** 评论对象的 `likes` 字段 -1 并持久化

### Requirement: 评论回复功能（二级回复）
系统 SHALL 支持用户对任意评论进行二级回复（评论 → 回复，不支持三级嵌套），点击评论项弹出回复输入框，回复以缩进形式挂在父评论下方。

#### Scenario: 用户回复评论
- **WHEN** 用户点击某条评论的"回复"按钮
- **THEN** 系统 SHALL 在该评论下方展开回复输入框，占位符显示 `回复 @用户名：`
- **WHEN** 用户输入文本（≤ 200 字）并点击发送
- **THEN** 回复 SHALL 以缩进 24px 的形式挂在父评论下方
- **AND** 回复对象包含 `id / user / text / time / likes / replies:[]`
- **AND** 父评论的回复数 +1

#### Scenario: 回复的点赞
- **WHEN** 用户点击回复的心形按钮
- **THEN** 回复的 `likes` 字段 SHALL +1/-1，逻辑与评论点赞一致

### Requirement: 评论数据结构
系统 SHALL 采用以下数据结构存储评论与回复，单角落评论本地保留 50 条，超出滚动归档到 `localStorage.comments_archived_{cornerId}`。

```json
{
  "id": "cmt_001",
  "cornerId": "corner_001",
  "user": "倔强的番茄",
  "avatar": "🍅",
  "text": "拿铁拉花超美！",
  "time": "2026-06-18 14:32",
  "likes": 12,
  "liked": false,
  "replies": [
    {
      "id": "rpl_001",
      "user": "明园老板",
      "avatar": "☕",
      "text": "谢谢支持～",
      "time": "2026-06-18 15:10",
      "likes": 3,
      "liked": false
    }
  ]
}
```

#### Scenario: 评论超过 50 条
- **WHEN** 单角落评论数达到 51 条
- **THEN** 系统 SHALL 将最早一条评论移入 `comments_archived_{cornerId}`
- **AND** 当前列表仅保留最近 50 条

### Requirement: 评论被点赞计数（支撑歌单解锁）
系统 SHALL 统计当前用户发表评论累计被点赞次数到 `localStorage.commentLikedCount`，供"歌单解锁"capability 读取以触发《温柔》解锁条件（累计被点赞 10 次）。

#### Scenario: 评论被他人点赞计数
- **WHEN** 任意用户对当前用户发表的评论点击点赞
- **THEN** `localStorage.commentLikedCount` SHALL +1
- **AND** 触发歌单解锁检查（见 song-unlock spec）

### Requirement: 评论展示合并
系统 SHALL 在进入角落详情页或演唱会详情页时，合并展示种子评论（CDN 公共评论）+ 本地评论 + 链接携带评论，按时间倒序排列，去重 by `id`。

#### Scenario: 合并多源评论
- **WHEN** 用户进入角落详情页
- **THEN** 系统 SHALL 加载种子评论（3 条）+ 本地评论（`localStorage.comments_{cornerId}`）+ URL 参数携带评论
- **AND** 按 `time` 倒序合并，相同 `id` 仅保留一条
