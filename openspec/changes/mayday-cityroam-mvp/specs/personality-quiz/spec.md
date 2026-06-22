## ADDED Requirements

### Requirement: 首页入口卡片
系统 SHALL 在「发现」页 Hero 横幅下方、搜索栏上方展示「五月天全曲库人格测评」入口卡片，使用五色吉祥物动画 + 渐变背景，点击进入测评页。

#### Scenario: 渲染首页入口
- **WHEN** 用户进入"发现"页
- **THEN** 系统 SHALL 在 Hero 下方渲染 quiz-entry-card
- **AND** 卡片左侧展示 5 个吉祥物（红/粉/黄/蓝/绿）叠放浮动动画
- **AND** 卡片右侧展示标题「五月天全曲库人格测评 🎤」+ 副标题「20 道题，测出你的人生代表曲」
- **AND** 点击卡片调用 `navigate('quiz')` 进入测评页

#### Scenario: 入口不出现在「我的」页
- **WHEN** 用户进入"我的"页
- **THEN** 系统 SHALL NOT 在"我的"页展示测评入口卡片
- **AND** 测评入口唯一位置是首页"发现"

### Requirement: 20 道题情景选择
系统 SHALL 提供 20 道情景选择题，每题 4 个选项，每个选项映射 ABCDE 中的一个维度，选中后给该维度加 10 分。

#### Scenario: 完整 20 题
- **WHEN** 用户开始测评
- **THEN** 系统 SHALL 渲染 PRD §3.3.1 表中列出的 20 题
- **AND** 每题 4 个选项，每选项 type 为 A/B/C/D/E 之一
- **AND** 每题选项 type 集合覆盖至少 3 个不同维度

#### Scenario: 选项计分
- **WHEN** 用户选中某选项
- **THEN** 系统 SHALL 将 `scores[option.type] += 10`
- **AND** 若先前已选过则先 `scores[oldType] -= 10` 再加新分
- **AND** 自动跳转下一题（最后一题除外）

#### Scenario: 上一题返回修改
- **WHEN** 用户在第 2-20 题点击「上一题」
- **THEN** 系统 SHALL 回退 step，保留已选答案
- **AND** 用户可重新选择，分数差值正确计算

### Requirement: 5 大维度人格档案
系统 SHALL 定义 5 大人格维度，每个维度对应一位五月天成员、一首人生代表曲、一种主题色和一个吉祥物图。

#### Scenario: 维度档案完整性
- **THEN** 系统 SHALL 包含以下 5 大维度：
  - A 追梦者（热血/倔强）· 怪兽 · 《成名在望》· 橙 #dc3320 · red.png
  - B 治愈者（温柔/遗憾）· 阿信 · 《温柔》· 粉 #e86ca5 · pink.png
  - C 燃烧者（狂欢/当下）· 玛莎 · 《离开地球表面》· 黄 #efce3e · yellow.png
  - D 思想家（豁达/哲思）· 冠佑 · 《人生海海》· 蓝 #29a7e1 · blue.png
  - E 探索者（宿命/深邃）· 石头 · 《如烟》· 绿 #22a93a · green.png
- **AND** 每个档案 SHALL 包含 name/title/coreTag/song/album/color/member/archetype/lyric/subtitlePool/desc/traits/songs 字段

### Requirement: 主+副人格结算
系统 SHALL 在用户完成 20 题后计算主副人格，并展示复合标题、人生代表曲、人格解读和同频歌单。

#### Scenario: 主副人格判定
- **WHEN** 用户答完第 20 题
- **THEN** 系统 SHALL 按 `scores` 降序取前两个维度
- **AND** `primary = scores[0]` 为主人格
- **AND** `secondary = scores[1]` 为副人格
- **AND** 复合标题格式为「{secondary.coreTag修饰} 的 {primary.name}」（如「平凡的伟大」+「追梦者」→「平凡的追梦者」）

#### Scenario: 结果页展示
- **WHEN** 系统计算出主副人格
- **THEN** 系统 SHALL 渲染结果页包含以下区块：
  - Hero：主题色渐变 + 人生代表曲名 + 歌词金句
  - 人格描述：主人格 desc 长文
  - 特质 chips：3 个 trait 标签（traits 数组）
  - 同频歌单：5 首推荐歌曲（songs 数组）
  - 对应成员卡：member 字段（成员/姓名/角色）
- **AND** 主题色 SHALL 应用到 hero 背景、按钮、特质 chips 颜色

#### Scenario: 解锁人生代表曲
- **WHEN** 用户首次完成测评
- **THEN** 系统 SHALL 将 `primary.song` 加入 `unlockedSongs`
- **AND** 通过 `api.post('/songs/unlock', {song, action:'quiz'})` 同步到后端

### Requirement: 结果持久化与后端同步
系统 SHALL 将每次测评结果同时写入 localStorage 和后端 `QuizResult` 表，便于历史回看。

#### Scenario: 写入 localStorage
- **WHEN** 结果页渲染完成
- **THEN** 系统 SHALL 调用 `ls.set('quizResult', {type, song, personality, date})`

#### Scenario: 写入后端
- **WHEN** 结果页渲染完成
- **THEN** 系统 SHALL 调用 `api.post('/quiz/result', {type, song, personality, answers})`
- **AND** 后端 SHALL 写入 `QuizResult(user_id, result_type, song, personality, answers, created_at)`

### Requirement: 结果分享
系统 SHALL 提供「分享结果」按钮，调用 Web Share API 或回退到剪贴板，并将 shareCount +1 同步到后端。

#### Scenario: 触发分享
- **WHEN** 用户点击「分享结果」按钮
- **THEN** 系统 SHALL 优先调用 `navigator.share({title, text, url})`
- **AND** 若不支持，则 fallback 到 `navigator.clipboard.writeText` + toast 提示
- **AND** `shareCount` SHALL +1 并同步到 `/api/user/stat`
- **AND** 触发 `checkSongUnlock('share')` 判断是否解锁《知足》

### Requirement: 重新测评
系统 SHALL 提供「重新测评」按钮，重置 quizState 并回到第 1 题。

#### Scenario: 重置答题状态
- **WHEN** 用户点击「重新测评」
- **THEN** 系统 SHALL 调用 `startQuiz()`
- **AND** `quizState` SHALL 重置为 `{step:0, answers:[], scores:{A:0,B:0,C:0,D:0,E:0}}`
- **AND** 历史 `quizResult` 在 localStorage 中保留
