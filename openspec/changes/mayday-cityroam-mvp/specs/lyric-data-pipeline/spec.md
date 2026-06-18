## ADDED Requirements

### Requirement: 歌词片段抽取
系统 SHALL 提供 `scripts/sync-lyrics-snippets.py`，从 `MaydaySkills/mayday-mood/references/lyrics-db/` 的 9 张专辑 JSON 中抽取每首歌的 `锚句（hook）`字段（≤ 30 字），合并情绪三轴（`mood_axes`）与情绪标签（`mood_tags`），输出至 `data/lyric-snippets.json`。

#### Scenario: 全量抽取
- **WHEN** 执行 `python scripts/sync-lyrics-snippets.py`
- **THEN** 脚本读取 9 张专辑共 120 首歌
- **AND** 每首至少输出一条 ≤ 30 字片段，并标注 `词/曲：作者`
- **AND** 输出文件中无任何完整歌词

#### Scenario: 片段超长保护
- **WHEN** 源数据 hook 字段意外超过 30 字
- **THEN** 脚本 SHALL 截断到前 30 字并附 `…`
- **AND** 在 stderr 输出警告便于运营审查

### Requirement: 角落–歌词匹配字典
系统 SHALL 提供 `scripts/build-corners.py`，输入运营整理的 `data/corners.raw.csv`（含店铺基础信息 + 候选情绪标签），输出最终 `corners.json`；每个角落 SHALL 关联唯一一条 `lyric-snippets.json` 中的片段。

#### Scenario: 标签匹配命中
- **WHEN** 角落候选标签与某首歌的 `mood_tags` 交集非空
- **THEN** 选择交集最多的歌曲对应片段作为 `lyric` 字段
- **AND** 同步写入 `song`、`lyric_credit` 字段

#### Scenario: 标签匹配未命中
- **WHEN** 没有任何歌曲 `mood_tags` 与角落标签命中
- **THEN** 脚本 SHALL 标记为 `lyric: null` 并在 stderr 输出待人工补录列表
- **AND** 该角落 **MUST NOT** 进入最终 `corners.json` 输出

### Requirement: 合规校验
系统 SHALL 在构建产物时运行合规校验：所有片段长度 ≤ 30 字、必须含 `lyric_credit`、不含敏感词；任一校验失败时 SHALL 退出非零状态并阻断 CI。

#### Scenario: 片段超长导致 CI 失败
- **WHEN** 任一角落片段 > 30 字
- **THEN** `scripts/build-corners.py` 以 exit code 2 退出
- **AND** 输出违规角落 ID 列表

### Requirement: 数据发布
系统 SHALL 通过 `scripts/publish-cdn.sh` 将 `corners.json / schedule.json / news.json / lyric-snippets.json` 上传至 CDN，并在每个文件中写入 `_meta.version` 与 `_meta.publishedAt`，供小程序端做版本对比与缓存失效。

#### Scenario: 发布新版本
- **WHEN** 运营执行发布命令
- **THEN** 文件 `_meta.version` 自增
- **AND** 小程序端在下一次冷启动时检测到版本变化，强制刷新本地缓存
