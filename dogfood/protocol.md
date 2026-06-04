# 判定协议 · v0.8

> 本文件定义照妖镜每次 `/照` 的命中项如何判定、如何分层、如何统计。v0.8 在 v0.7 基础上新增：分层灰度、独立判定、覆盖度代理、usefulness signals。

---

## 核心定义

| 术语 | 定义 | 举例 |
|------|------|------|
| **真阳 (TP)** | 命中项指出了 prompt 中真实存在的含混，且该含混会导致下游理解偏差 | prompt 写"要快"，S-PERF 命中——确实没说多快 |
| **假阳 (FP)** | 命中项在上下文中不构成含混：描述性使用、示例引用、已有上下文补充 | 规则表中写"扫描'快/高效'"，S-PERF 命中——这是在定义规则，不是在模糊使用 |
| **UNCERTAIN** | 判定者无法确定 TP 或 FP | 含混真实存在但影响程度不确定 |

## 分层定义（v0.8 新增）

| 层级 | 代号 | 定义 | 回答什么问题 |
|------|------|------|-------------|
| 内部操作者评公开提示词 | E1 | 内部人员使用公开或脱敏后的提示词跑 `/照`，并判定 TP/FP | 可判定性、标注一致性 |
| 真实外部用户 | E2 | 外部用户用自己的真实提示词跑 `/照`，并反馈是否有用 | 真实使用场景下的 usefulness signals |

## 判定流程

对每次 `/照` 的每条命中项：

1. 读命中的原形句
2. 回到原 prompt 上下文中重读该处
3. 问自己：**如果我把这段 prompt 发给一个不了解背景的 AI / 同事，TA 会因为这处含混产生理解偏差吗？**
   - 是 → 真阳
   - 否 → 假阳
   - 不确定 → UNCERTAIN
4. 写下判定理由（1 句话）
5. 标注 judgmentStage：
   - **unaided**：在看到 `/照` 输出之前，独立判定该 prompt 是否存在含混
   - **aided**：在看到 `/照` 输出之后，判定命中项是否准确

## 判定者

| 阶段 | 判定者 | 说明 |
|------|--------|------|
| v0.7 | prompt 作者本人 | 已完成的 20 条基线 |
| v0.8 Phase A | 内部操作者（E1） | 需至少 1 人非 prompt 作者 |
| v0.8 Phase B | 外部用户（E2） | 真实提示词，独立判定 |

## 样本要求

- v0.7 基线：≥ 20 条（已达标）
- v0.8 外部灰度：≥ 9 条有效 E2 记录
- 样本分层：每条记录必须标注 `strata`（E1 / E2）和 `promptType`（PRD / 技术方案 / 一句话需求 / 其他）

## 统计口径

### 计数分母定义（v0.8 新增）

| 分母 | 定义 | 适用场景 |
|------|------|---------|
| perRun | 每条 `/照` 记录算 1 | 覆盖率、命中率 |
| perHit | 每条命中项算 1 | precision、FP rate |
| perActionableHit | 每条被判为 TP 且有可操作修复路径的命中项算 1 | usefulness signals |
| perUniqueRuleOccurrence | 每条规则在每次 run 中最多算 1 | 规则覆盖率 |

### 按规则统计（11 行表）

| 招 | 命中次数 | TP | FP | UNCERTAIN | precision |
|----|---------|----|----|-----------|-----------|
| S-PERF | N | n | m | u | n/(n+m) |
| ... | | | | | |

### 总量聚合（1 行）

| 总命中 | 总 TP | 总 FP | 总 UNCERTAIN | 总 precision | 总 FP share |
|--------|-------|-------|-------------|-------------|------------|
| N | n | m | u | n/N | m/N |

### Usefulness signals（v0.8 新增，与 correctness 分栏展示）

| 信号 | 定义 | 注意 |
|------|------|------|
| isActionableHit | 命中项有可操作的修复路径 | 受判定者经验影响 |
| isAdopted | 用户据此修改了 prompt | 受用户编辑意愿影响 |
| isPromptRewritten | prompt 在 `/照` 后被重写 | 不等于因为 `/照` 才改写 |
| didReduceDisagreement | 改写后分歧减少 | 需要多人对比，v0.8 先做记录 |

**关键约束**：usefulness signals 是 downstream 信号，**不是** detector quality 的证据。禁止用 adoption rate 替代 precision。

### Coverage proxy（v0.8 新增）

分两段：
1. **Unaided miss review**：判定者在看到 `/照` 输出**之前**，独立列出 prompt 中的含混点，记为 `suspectedMissCountUnaided`
2. **Aided miss review**：判定者在看到 `/照` 输出**之后**，补充遗漏的含混点，记为 `suspectedMissCountAided`

两段数据分开统计，禁止合并成单一 recall proxy。

## 记录格式

每条 dogfood/runs/ 记录的反馈章节使用以下格式：

```markdown
## 反馈

| 命中 | 代号 | 判定 | 理由 | judgmentStage |
|------|------|------|------|--------------|
| 1 | S-PERF | TP | prompt 说"要快"确实没给数字 | aided |
| 2 | V-NAME | FP | "部署"在此上下文含义明确 | aided |
```

## v0.8 最小必填字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| runId | string | 是 | |
| strata | E1/E2 | 是 | |
| promptType | string | 是 | PRD / 技术方案 / 一句话需求 / 其他 |
| ruleCode | string | 是 | |
| hitCount | integer | 是 | |
| judgmentLabel | TP/FP/UNCERTAIN | 是 | |
| raterRole | string | 是 | |
| isIndependentOfAuthor | boolean | 是 | |
| judgmentStage | unaided/aided | 是 | |
| metricDenominator | string | 是 | perRun/perHit/perActionableHit/perUniqueRuleOccurrence |
| fieldCompleteness | number | 是 | 已填字段数 / 总字段数 |

### 可选扩展字段

judgmentConfidence, disagreementFlag, disagreementResolution, suspectedMissCountUnaided, suspectedMissCountAided, isActionableHit, isAdopted, isPromptRewritten, didReduceDisagreement, notes
