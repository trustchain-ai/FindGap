# 验证：照妖镜 v0.8 行为验证 + 流程检查

## A. Skill 行为验证

### 1. 安装验证

```bash
head -6 ~/.claude/skills/zhaoyaojing/SKILL.md | grep version
# 应输出：version: "0.8.0"
```

### 2. 触发验证

输入：
```text
/照 做一个支持先买后付的结账能力，性能要好，体验要流畅，上线尽快
```

### 3. 输出行为验证

Claude 输出**必须包含**：

- [ ] 节点 ① 照：11 招逐条扫描，命中项列出代号 + 原形句
- [ ] 节点 ② 查：每条命中做 ≥ 3 次 WebSearch，保留 ≥ 2 条互相印证的来源；若不足则标“无可信公开数据”
- [ ] 节点 ③ 亮：双段输出（决策卡 + 其余发现）
- [ ] urgency 前缀：🔴 / 🟠 / 🟡

### 4. 边界验证（v0.8）

#### 4.1 V-LAYER 收窄验证
输入：
```text
/照 先把这次改动的业务目标写清楚，再落到字段设计
```

预期：
- 不因单纯同时出现 Why / How 词就误报
- 只有在**同一决策点**层级冲突且未声明当前权威层时才命中 `V-LAYER`

#### 4.2 G-WHY suppression 验证
输入：
```text
/照 这个改动要在本周完成，因为如果继续拖，客服会继续手工处理退款，影响商户体验；完成标准是退款时延降到 1 天内
```

预期：
- 因为受影响对象、stakes、DoD 已给出，`G-WHY` 不应轻易触发

#### 4.3 相邻规则边界验证
输入：
```text
/照 做一个退款能力，优先解决重复支付，失败时要自动原路退；上线标准是 3 个场景联调通过
```

预期：
- `G-WHY` / `V-STAKE` / `G-NOGO` / `R-DOD` 各自命中时，理由必须对应不同问题
- 不得一处缺口被 4 条规则重复命中成同义句

### 5. 红线验证

输出**不得**包含：

- [ ] ❌ 评分 / 分级 / severity
- [ ] ❌ 改写建议 / 替用户决策
- [ ] ❌ PASS / FAIL 判定
- [ ] ❌ 静态锚点库 / 静态 benchmark 冒充现查

## B. 流程 / 运营检查

> 这部分不是自动行为验证，而是对 v0.8 记录与灰度流程的检查。

### 1. 记录 schema 检查

抽查一条 v0.8 记录，必须能看到：

- [ ] `strata`
- [ ] `promptType`
- [ ] `raterRole`
- [ ] `isIndependentOfAuthor`
- [ ] `judgmentStage`
- [ ] `metricDenominator`
- [ ] `fieldCompleteness`

### 2. correctness / usefulness 分栏检查

统计页必须分开展示：

- [ ] correctness（TP / FP / precision）
- [ ] usefulness signals（isAdopted / isPromptRewritten / didReduceDisagreement）

### 3. miss review 分段检查

- [ ] `suspectedMissCountUnaided` 单列
- [ ] `suspectedMissCountAided` 单列
- [ ] 禁止合并成单一 recall 值

### 4. 失败信号

- ❌ README 或 ROADMAP 把 external gray 写成 external validity
- ❌ 把 adoption / rewrite 当成 detector quality 证据
- ❌ `V-LAYER` 仍然因为任何 Why / How 同段共现就误报
- ❌ `G-WHY` 在 stakes / DoD 已足够解释目标时仍频繁误报
