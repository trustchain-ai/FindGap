---
scanId: R-20260602-002
scannedAt: 2026-06-02T00:30:00Z
scanner: self
scannerVersion: 0.4.0
artifact:
  path: skill/照妖镜.skill.md (v0.4.0) + templates/remediation-card.md + templates/gate-output.schema.json + references/gap-taxonomy.md (G15-G18 新增段)
  gitSha: pending-commit
  type: self-meta
phase0:
  verdict: WARNING
  readinessScore: 76
  blockedCount: 0
  warningCount: 3
findings:
  p0: 0
  p1: 3
  p2: 4
  p3: 1
feedback:
  collected: true
  conclusions: [accepted: 8, rejected: 0, known: 0, fix-applied: 0]
---

# 002-self-v04-bootstrap · v0.4 自照（项目作为首个灰度的第二条真实数据）

## 背景

v0.4 的核心交付物（Phase 0 + G15-G18 + 补齐卡片 + JSON 通道）刚刚完成首版编写。按照"项目自身作为首个灰度用户"的策略，立即对 v0.4 的实现物本身进行自照——验证 Phase 0 门禁是否能在自己身上跑通。

这是 v0.4 启动后的第一次完整 dogfood，也是验证「Phase 0 → finding → 补齐 → 重评」闭环是否真实可用的关键试金石。

## Phase 0 Gate 结果

### INVEST-Agent 六要素

| 维度 | 状态 | 证据 |
|------|------|------|
| **I** Independent | ✓ pass | v0.4 设计自包含，无对外部对话的隐式依赖 |
| **N** Negotiable | ✓ pass | Phase 0 允许 fallback 到 Phase 1（warning/skip-gate） |
| **V** Valuable | ✓ pass | 明确受益方：人（PM/工程师/Tech Lead）+ agent |
| **E** Estimable | ✓ pass | 6.5 周工期 + 周级交付物已拆分 |
| **S** Small | ⚠ partial | 单版本含 5 项交付（Phase 0 + G15-G18 + 卡片 + JSON + Score），G15 信号命中 |
| **T** Testable | ✓ pass | 退出条件 SMART：阻断准确率 ≥80%、成功率 +25pp、误阻断 ≤15% |

5/6 pass，1 partial → 计为 G15 high finding

### readinessScore 计算

```
基础分 = 100
- G15 high (-8): -8（v0.4 单版本交付物 5 项偏多）
- G16 medium (-3): -3（部分新概念未提供领域案例，如 "INVEST-Agent" 落地示例不足）
- G17 medium (-3): -3（JSON Schema 仅提供 1 个 examples，未提供反例样本）
- G6 medium (-3): -3（补齐卡片模板未涉及"如果用户连 D 都不选直接关闭会话"场景）
- INVEST E fail: 0（无 fail）
- INVEST S partial: -2.5（partial 按半权扣分）
- G14.M low (-1): -1（"6.5 周"工期内每周交付物量化但里程碑日期未给绝对日期）
- C 项裕度: -3（部分章节交叉引用未自动校验）

最终 = 100 - 8 - 3 - 3 - 3 - 2.5 - 1 - 3 = 76.5 → 取整 76
```

### Verdict

```
readinessScore = 76 / 100
threshold = 80
60 ≤ 76 < 80 AND 无 critical AND 无 G18 critical
→ verdict = WARNING
```

## Findings 全表

| # | 维度 | 严重度 | 定位 | 命中证据（摘要） | 反馈 |
|---|------|--------|------|-----------------|------|
| 1 | G15 | 🟡 P1 | v0.4 整体 | 单版本串联 5 项独立交付（Phase 0 + G15-G18 + 卡片 + JSON + Score），违反 INVEST-S | accepted |
| 2 | G16 | 🟡 P1 | SKILL.md Phase 0 §0.1 | "INVEST-Agent 六要素"作为新概念引入，但 SKILL 中无端到端落地示例（仅 mock 描述） | accepted |
| 3 | G17 | 🟡 P1 | templates/gate-output.schema.json | examples 段仅 1 个示例（BLOCKED 场景）；缺 PASSED / WARNING 反例对照 | accepted |
| 4 | G6 | 🟢 P2 | templates/remediation-card.md | 未讨论"用户既不选 A/B/C 也不显式 D 跳过，直接关闭会话"的边界场景 | accepted |
| 5 | G14.M | 🟢 P2 | ROADMAP.md v0.4 周次表 | "W1/W2/W3..."无绝对日期（仅相对周），W1 对应日期未钉死 | accepted |
| 6 | G4 | 🟢 P2 | SKILL.md Phase 0 §0.3 | readinessScore 公式给出但未明确"权重表"为什么是 -15/-8/-3/-1 这套数字（无引用来源） | accepted |
| 7 | G5 | 🟢 P2 | gap-taxonomy.md G15-G18 | "Salesforce 实测 40%→84%" 引用未给出具体论文/报告链接 | accepted |
| 8 | G13.5 | ⚪ P3 | CHANGELOG v0.4 段 | "拦截 60% 可预防失败" 表述含乐观偏差 — 实际 60% 是理论上限，落地拦截率取决于规则成熟度 | accepted |

## 关键 Finding 详细分析

### Finding #1 · 🟡 P1 · G15 · v0.4 单版本交付物过多

- **定位**：v0.4 范围（ROADMAP + CHANGELOG + SKILL.md 同时改动 5 大块）
- **三法命中**：
  - [x] 反证法：若按 INVEST-S 标准，单版本应聚焦单一价值；v0.4 同时引入门禁机制、新维度、新模板、新输出通道、新评分体系
  - [x] 对照法：v0.3 引入 5 件套（双轨报告 + 严重度色 + ID + 反馈钩子 + 自检）被验证为合理范围；v0.4 类比但更复杂
  - [ ] 边界法：—
- **证据**：CHANGELOG v0.4 "重大新增" 段列出 5 个独立子系统
- **影响**：单次实现复杂度高 → dogfood 验证时难定位回归来源；W3-W4 联调可能频繁返工
- **建议**：保留当前范围（已实现），但 W5-W6 dogfood 时按 5 个子系统**分别**统计阻断准确率/误阻断率，避免聚合掩盖单点问题
- **复查命令**：
  ```bash
  ls dogfood/runs/ | wc -l                 # ≥10 案例
  jq '.findings | length' dogfood/runs/*.md  # 单案例不应集中在某一维度
  ```
- **反馈结论**：`accepted`（不阻断本次发布，但 dogfood 阶段需分维度统计）

### Finding #2 · 🟡 P1 · G16 · INVEST-Agent 无端到端落地示例

- **定位**：`skill/照妖镜.skill.md` Phase 0 §0.1
- **三法命中**：
  - [x] 反证法：用户读到"E Estimable: 含主观词黑名单或 G15 信号"——但"包含" vs "不包含"的判定阈值未示意
  - [x] 对照法：v0.3 中 G14 改写模板均带具体示例，v0.4 INVEST-Agent 未对齐
  - [x] 边界法：用户输入"实现 X 功能"——INVEST 应判 PASS 还是 FAIL？无样本
- **证据**：Phase 0 §0.1 表格 6 行均为抽象描述
- **影响**：实施者（人或 agent）落地时主观裁量空间大，误阻断率可能偏高
- **建议**：W2 末补充 INVEST-Agent 端到端示例（建议附在 references/gap-taxonomy.md G15 段后）
- **反馈结论**：`accepted`（W2 待补，作为本 finding 的 fix-applied 依据）

### Finding #3 · 🟡 P1 · G17 · JSON Schema 缺多场景示例

- **定位**：`templates/gate-output.schema.json` examples 段
- **三法命中**：
  - [x] 反证法：CI 实施者只看到 BLOCKED 示例，无法对照 PASSED / WARNING 场景写校验逻辑
  - [x] 对照法：行业 schema（OpenAPI / JSON Schema 官方）通常含 ≥3 反例
  - [x] 边界法：边界场景（如 readinessScore 恰好等于阈值 80 时）未示意
- **证据**：examples 数组长度 = 1
- **影响**：CI 集成早期可能出现"未覆盖 PASSED/WARNING 路径"的 bug
- **建议**：W3 联调时补 PASSED 和 WARNING 各 1 个示例 + readinessScore=80 边界示例
- **反馈结论**：`accepted`

## 反馈与修复

| Finding ID | 状态 | 计划修复时点 |
|------------|------|------------|
| #1 G15 单版本交付多 | accepted | W5-W6 dogfood 按 5 子系统分别统计 |
| #2 G16 INVEST 无示例 | accepted | W2 末补示例 |
| #3 G17 JSON Schema 示例不足 | accepted | W3 联调时补 |
| #4-#8 P2/P3 | accepted | 入 v0.4 patch (v0.4.1) 或顺手修正 |

## 双轨输出（v0.4 三轨契约自验）

### 精简版

```
照妖镜门禁结论：v0.4 实现物 readinessScore 76/100 → WARNING（可放行）
🔴 P0 × 0   🟡 P1 × 3   🟢 P2 × 4   ⚪ P3 × 1
Top 警告：
1. 🟡 G15 单版本交付 5 子系统偏多，dogfood 需分维度统计
2. 🟡 G16 INVEST-Agent 无端到端示例
3. 🟡 G17 JSON Schema 仅 1 示例，缺 PASSED/WARNING 反例
下一步：W2 末补 INVEST 示例 + W3 联调补 JSON 多场景示例，先放行进入 W3。
```

### JSON 通道（节选，符合 schema 0.4.0）

```json
{
  "schemaVersion": "0.4.0",
  "verdict": "WARNING",
  "readinessScore": 76,
  "threshold": 80,
  "investAgent": {"I": true, "N": true, "V": true, "E": true, "S": false, "T": true},
  "counts": {"p0": 0, "p1": 3, "p2": 4, "p3": 1, "drop": 0},
  "passCondition": "Acknowledge 3 P1 warnings or resolve to reach score ≥80",
  "meta": {
    "scanId": "R-20260602-002",
    "artifactType": "self-meta",
    "artifactPath": "skill/照妖镜.skill.md + templates/* + references/gap-taxonomy.md",
    "timestamp": "2026-06-02T00:30:00Z",
    "skillVersion": "0.4.0",
    "feedbackPath": "dogfood/feedback.jsonl"
  }
}
```

## 关键验证：v0.4 是否在自己身上跑通？

| 验证项 | 结果 |
|--------|------|
| Phase 0 能识别自身 v0.4 实现物为可评分输入 | ✅ |
| readinessScore 公式产出合理分值（不是 100 也不是 0） | ✅ 76 |
| INVEST-Agent 6 维独立判定 | ✅ 5 pass + 1 partial |
| G15-G18 至少 1 维命中（G15/G16/G17 各 1 条） | ✅ |
| 三轨输出（精简 + 详细 + JSON）格式齐全 | ✅ |
| ID 格式符合 v0.4 标准（G1-G18 维度码） | ✅ 全部 G15/G16/G17/G6/G14.M/G4/G5/G13.5 均合规 |
| dogfood/feedback.jsonl 追加成功 | ⏭ 待写入（本记录提交后） |

**结论**：v0.4 的核心机制在自己身上跑通，验证了"项目自身作为首个灰度用户"策略可行。WARNING 状态意味着可放行进入 W3 联调，但 3 个 P1 需要在 dogfood 阶段前修复（不阻断本次 v0.4 发布）。

## 下一步驱动的动作

1. ✅ 本记录 commit 后写入 dogfood/feedback.jsonl
2. ⏭ W2 末：补 INVEST-Agent 端到端示例（修复 #2）
3. ⏭ W3：JSON Schema examples 扩充到 ≥3 个场景（修复 #3）
4. ⏭ W5-W6 dogfood 20 案例：分 5 子系统统计阻断准确率（响应 #1）
5. ⏭ runs/003 起：用真实外部产物（非自照）验证门禁
