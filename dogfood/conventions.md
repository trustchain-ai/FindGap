# Dogfood 数据采集规范

> v0.8 版本。在 v0.6 基础上新增：分层标识、判定阶段、计数分母、最小必填键。

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
scannerVersion: 0.8.0
strata: E1 | E2
promptType: PRD | tech-spec | one-liner | other
artifact:
  path: <被照 prompt 或产物的引用>
  type: prompt | spec | intent
result:
  rulesTriggered: [S-PERF, V-STAKE, ...]
  sourcesFound: N
  lowConfidenceItems: N
feedback:
  collected: true | false
  useful: N
  falsePositive: N
  uncertain: N
  raterRole: <判定者角色>
  isIndependentOfAuthor: true | false
  judgmentStage: unaided | aided
  metricDenominator: perRun | perHit | perActionableHit | perUniqueRuleOccurrence
  fieldCompleteness: N
---
```

### v0.8 新增必填键说明

| 键 | 说明 |
|----|------|
| strata | E1 = 内部操作者评公开提示词；E2 = 真实外部用户 |
| promptType | 样本类型分层，避免频次被单一领域绑架 |
| raterRole | 判定者身份，如 author / internal-reviewer / external-user |
| isIndependentOfAuthor | 是否由非 prompt 作者判定 |
| judgmentStage | unaided = 看 `/照` 输出前判定；aided = 看后判定 |
| metricDenominator | 本条记录的统计分母口径 |
| fieldCompleteness | 已填字段数 / 总字段数 |
| uncertain | 判定为 UNCERTAIN 的命中数 |

## 正文章节

1. **背景**：为什么照这个？(1 段)
2. **节点 ① 照**：11 招扫描结果，列出命中代号 + 原形句
3. **节点 ② 查**：每条命中的 WebSearch 结果 + 来源
4. **节点 ③ 亮**：完整的输出
5. **反馈**：哪些有用、哪些误报、判定阶段标注

## 反馈表格式（v0.8）

```markdown
## 反馈

| 命中 | 代号 | 判定 | 理由 | judgmentStage |
|------|------|------|------|--------------|
| 1 | S-PERF | TP | prompt 说"要快"确实没给数字 | aided |
| 2 | V-NAME | FP | "部署"在此上下文含义明确 | aided |
```

## 真伪鉴别

- [ ] 被照对象是 prompt/spec/intent（不是代码/PR/对话记录）
- [ ] 节点 ② 查有真实 WebSearch（不是训练数据回忆）
- [ ] 节点 ③ 亮无评分/无建议/无 PASS-FAIL
- [ ] strata 和 promptType 已标注
- [ ] judgmentStage 已标注

## 红线

- ❌ 不得虚构 WebSearch 结果
- ❌ 不得给评分/分级/建议（照妖镜只反射）
- ❌ 不得照代码/PR/对话记录（只照 prompt/spec/intent）
- ❌ 不得把 usefulness signals 当作 detector quality 证据
