# Dogfood 数据采集规范

> v0.6 版本。历史版本（v0.3-v0.4）的规范已不再适用。

---

## 文件命名

```
runs/{NNN}-{type}-{slug}.md
```

- `NNN`：三位编号，从 `001` 开始单调递增
- `type`：`self`（自照）/ `ext`（外照）
- `slug`：场景 kebab-case 短描述

## 必填字段（YAML frontmatter）

```yaml
---
scanId: R-YYYYMMDD-NNN
scannedAt: ISO 8601 UTC
scanner: self | ext
scannerVersion: 0.6.0
artifact:
  path: <被照 prompt 或产物的引用>
  type: prompt | spec | intent
result:
  rulesTriggered: [S-PERF, V-STAKE, ...]  # 节点 ① 照命中的招
  sourcesFound: N                           # 节点 ② 查找到的来源数
  lowConfidenceItems: N                     # 标注"无可信公开数据"的条数
feedback:
  collected: true | false
  useful: N                                 # 有用命中数
  falsePositive: N                          # 误报数
---
```

## 正文章节

1. **背景**：为什么照这个？(1 段)
2. **节点 ① 照**：11 招扫描结果，列出命中代号 + 原形句
3. **节点 ② 查**：每条命中的 WebSearch 结果 + 来源
4. **节点 ③ 亮**：完整的 `🪞` 格式输出
5. **反馈**：哪些有用、哪些误报、为什么

## 真伪鉴别

- [ ] 被照对象是 prompt/spec/intent（不是代码/PR/对话记录）
- [ ] 节点 ② 查有真实 WebSearch（不是训练数据回忆）
- [ ] 节点 ③ 亮无评分/无建议/无 PASS-FAIL

## 红线

- ❌ 不得虚构 WebSearch 结果
- ❌ 不得给评分/分级/建议（照妖镜只反射）
- ❌ 不得照代码/PR/对话记录（v0.6 只照 prompt/spec/intent）
