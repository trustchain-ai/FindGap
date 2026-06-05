# Dogfood 数据采集规范

> v0.9 版本。在 v0.8 基础上适配 FindGap 输出格式。

---

## 文件命名

```
runs/{NNN}-{type}-{slug}.md
```

- `NNN`：三位编号，单调递增
- `type`：`self`（自扫）/ `ext`（外扫）
- `slug`：场景 kebab-case 短描述

## 必填字段（YAML frontmatter）

```yaml
---
scanId: R-YYYYMMDD-NNN
scannedAt: ISO 8601 UTC
scanner: self | ext
scannerVersion: 0.9.0
strata: E1 | E2
promptType: PRD | tech-spec | one-liner | other
artifact:
  path: <被扫文档引用>
  type: prompt | spec | intent
result:
  gapsFound: N
  fatalCount: N
  blockingCount: N
  deferredCount: N
  tier1EvidenceCount: N
  tier2EvidenceCount: N
  tier3EvidenceCount: N
feedback:
  collected: true | false
  useful: N
  falsePositive: N
  uncertain: N
  optimizationAdopted: N
  raterRole: <判定者角色>
  isIndependentOfAuthor: true | false
---
```

## 正文章节

1. **背景**：为什么扫这个？
2. **FindGap 输出**：完整 Flat List 输出
3. **反馈**：哪些有用、哪些误报、优化方案是否被采纳

## 反馈表格式（v0.9）

```markdown
## 反馈

| # | gap 名 | 判定 | 优化方案是否采纳 | 理由 |
|---|--------|------|-----------------|------|
| 1 | 性能指标缺失 | TP | 已采纳 | 补了 P99 指标 |
| 2 | 术语未对齐 | FP | N/A | 在上下文中含义明确 |
```

## 红线

- ❌ 不得虚构 URL
- ❌ 不得在输出中展示规则代号
- ❌ 不得替用户做最终决策
- ❌ 不得搜不到数据就停——必须用 Tier 2 兜底
