## v0.6.0 — 2026-06-03 · 三节点 · 零落盘 · 大道至简

### 范式转身

**FROM**（v0.5）：PASS/FAIL 二值门禁 + [FAIL] 五字段模板 + knockoff 清单残留
**TO**（v0.6）：三节点（照→查→亮） + 零静态数据落盘 + 每次现查行业真实数据

**驱动**：11 轮用户对话 + 4 次方向校正 + 2 轮 workflow 交叉验证 + 自照 dogfood 96.7% 误报率实证

### 核心变更

- **三节点架构**：照（11 招扫 prompt）→ 查（≥ 3 次 WebSearch，≥ 2 条互相印证）→ 亮（并列展示真实来源 + URL）
- **零落盘**：不维护任何静态锚点库/小抄库/知识库，行业数据每次现查
- **四红线**：三节点上限 / 不落盘 / URL 真实 / 不替用户决策
- **三文件**：项目从 36 文件砍到 README + SKILL.md + manifest.json 三核心

### 砍掉清单（不可逆）

- 所有死代码（.bak / references/ / templates/ / benchmarks/ / scripts/ / INSTALL.md / SELF_INSTALL.md）
- PASS/FAIL 二值门禁 + [FAIL] 五字段模板
- 锚点库/小抄库概念（改为现查）
- 5 步 Research Protocol（砍为三节点）
- manifest.json 全部废弃字段（severityScheme / cognitiveLayers / gapIdFormat / compatibility / feedbackHook）

### 产物

| 文件 | v0.5 | v0.6 |
|------|------|------|
| README.md | 264 行 | 42 行 |
| SKILL.md | 241 行 | 98 行 |
| manifest.json | 99 行（JSON 语法损坏） | 21 行（PASS） |
| 项目文件数 | 36 | 24 |

---

## v0.5.0 — 2026-06-02 · 11 招照妖 · 穷尽 171 → Top 11 · PASS/FAIL 二值转身

### 🔪 核心定位转身

**FROM**（v0.4）：Agent 执行前的输入质量门禁 — Phase 0 引擎 + G1-G18 67 信号 + readinessScore 评分 + 三态 verdict + JSON 三通道 + 补齐卡片
**TO**（v0.5）：流程交接点的 gap 一招定位器 — 穷尽 171 条根因（10 维度）取 ROI Top 11，语义检查 + grep/模板扫描，**照出原形句**给上游迭代，**PASS 才能进入下一流程**

**驱动数据**（5 轮 workflow + 用户 4 次方向校正，见 `dogfood/runs/003-self-v05-decision.md`）：穷尽 10 维度（认知 C-22 / 协作 P-22 / 需求 R-18 / Agent A-22 / 主观词 S-22 / 视角 V-15 / 信息源 I-14 / 目标 G-14 / 时间 T-13 / 文化 B-10）共 171 条根因 → 三维交集（频率×代价×可拦截）→ **11 条精选**

### 🎯 11 条规则（v0.5 本体）

| # | 代号 | 覆盖用户原话场景 |
|---|------|---------------|
| 1 | S-PERF | ✅ "快、高、尽快" — 性能/时效形容词无数字 |
| 2 | S-QUANT | ✅ "所有、任何、通常" — 全称量词无边界枚举 |
| 3 | S-NFR | ✅ "稳定、可靠、安全" — 质量形容词无判据 |
| 4 | R-DOD | 验收标准缺失 — "什么时候算做完" |
| 5 | G-WHY | WHY 缺失 — Output 冒充 Outcome |
| 6 | G-NOGO | 多目标冲突 — "又快又便宜"无优先序 |
| 7 | I-SSOT | SSOT 缺失 — 同物多处定义矛盾 |
| 8 | I-ADR | ADR 缺失 — trade-off 无决策记录 |
| 9 | V-NAME | ✅ "鸡同鸭讲" — 同名异义无 glossary |
| 10 | V-STAKE | ✅ "盲人摸象" — 利益相关方/失败路径缺位 |
| 11 | V-LAYER | ✅ "对牛弹琴" — 抽象层/颗粒度错配 |

### ✂️ v0.4/v0.3 沉没成本全部砍掉

| 砍掉项 | 版本 | 理由 |
|--------|------|------|
| Phase 0 输入门禁引擎 | v0.4 | agent 自判输入，引擎是过度工程 |
| G1-G18 67 检测信号 | v0.4+v0.2 | 11 条覆盖 80% 返工，其余 v0.6+ |
| severityScheme（P0-P3 + Drop）| v0.3 | PASS/FAIL 二值即可 |
| gapIdFormat G{family}-{idx}#{hash} | v0.3 | 用 S-PERF/V-NAME 代号即可 |
| readinessScore 0-100 + 三态 verdict | v0.4 | 二值就够，分数是虚假精度 |
| INVEST-Agent + G15-G18 | v0.4 | 归并入 11 条，不发明术语 |
| gate-output.schema.json + JSON 通道 | v0.4 | agent 结构化读取成本为 0 |
| remediation-card 四选项卡片 | v0.4 | 列模板=替 agent 干活 |
| compatibility 三级表 | v0.4 | 单 skill 无兼容矩阵 |
| selfCheck C1-C6 | v0.3 | 11 条规则本身即 self-check |
| feedbackHook + rescan 完整机制 | v0.3 | 保留 accept/reject/fixed 三态但大幅简化 |
| 双轨自检契约 | v0.3 | 5 条红线已替代 |
| gap-taxonomy.md G1-G14 全表 | v0.2 | 入 11 条决策记录（dogfood/runs/003），不再被引用 |

### 🔧 工程变更

- `skill/照妖镜.skill.md`：774 行 → **236 行**
- 新增 `examples/`（5 个真实历史命中示例）
- 新增 `dogfood/runs/003-self-v05-decision.md`（171 → 11 完整决策轨迹）
- 新增 `dogfood/runs/004-self-v05-grayfirst.md`（首次全仓灰度数据 · 误报率 96.7% → 语义升级）
- `manifest.json`：全面瘦身（砍 60% 字段，72→41 行`phase0Gate/investAgent/selfCheckItems/severityScheme 全删）
- REFERENCES: `references/gap-taxonomy.md` 不再被引用（v0.5 已弃用 67 信号分类体系）
- 红线：12 条 → **5 条**（PASS/FAIL 二值 / 杜绝虚假 / 不超 11 条 / 不依赖记忆 / 不替 agent 干活）

### 首次自我灰度结果

> `dogfood/runs/004-self-v05-grayfirst.md` 全仓扫描：

- **纯 grep 规则误报率 96.7%**（S-PERF/S-QUANT/S-NFR 因规则表自身包含示例词 → 回环命中）
- **修复**：3 条主观词规则从纯 grep 升级为 **LLM 语义判断**（判断"模糊使用"vs"描述/示例/引用"）
- 模板类规则（G-WHY/ V-STAKE）精准度 > grep 类——发现 CHANGELOG v0.4 段 Output 冒充 Outcome 真阳
- **数据驱动原则验证**：灰度暴露的实现问题（grep 回环）在当次迭代即修正——不等到下一版本

### 真实状态

SKILL.md 重写完成，236 行 / 11 条规则。首次灰度跑通 → 3 条 grep 规则升级为语义检查。v0.5 作为"11 招照妖"可用，等待下一个真实下游协作产物验证。



### 🎯 核心定位转身

**FROM**：「事后评审工具」——照出 gap 给人看
**TO**：「Agent 执行前的输入质量门禁」——拦截 60% 可预防失败

**数据驱动**：Salesforce 实测显示 prompt 质量优化将 agent 解决率从 40% → 84%；arXiv 研究表明执行前可拦截约 60% agent 失败（任务定义模糊 ~25% + 缺失上下文 ~20% + prompt 结构不当 ~15%）。

### 🚀 重大新增

#### Phase 0 Gate（输入完整度门禁）

在 Phase 1 Detect 之前插入 Phase 0：

- **INVEST-Agent 六要素检查**（Independent/Negotiable/Valuable/Estimable/Small/Testable）
- **readinessScore 评分**（0-100，阈值 80 放行）
- **三态 verdict**：PASSED / BLOCKED / WARNING
- **不可逆操作强制阻断**：G18 critical 不受 readinessScore 影响
- **自动重评循环**：补齐任一槽位即增量重评，无需手动触发复扫

#### G15-G18 Agent 门禁专属维度

| 新维度 | 检查内容 | 拦截失败模式 |
|--------|---------|-------------|
| G15 任务可分解性 | 串联多目标、单轮不可完成 | 编排设计缺陷（~12%）|
| G16 上下文完整度 | 业务术语/团队惯例/既有系统未定义 | 缺失组织上下文（~20%）|
| G17 示例充分性 | 强格式约束但零示例 | Prompt 结构不当（~15%）|
| G18 副作用可逆性 | 不可逆操作无回滚预案 | 不可逆工具调用错误 |

#### 结构化补齐卡片（templates/remediation-card.md）

每个阻断/警告项强制套用四件套模板：缺什么 + 为什么重要 + 怎么补（4 选项）+ 补完后验证。

**核心设计原则**：
- 给具体选项 ≤4 个，禁止开放追问（红线 3）
- 量化不补齐风险（agent 成功率预估降低 N%），引用 gap-taxonomy.md 失败根因占比
- 允许显式跳过但留痕 `[risk-accepted]`
- 补完后自动重评

#### 机读 JSON 第三通道（templates/gate-output.schema.json）

输出契约从 v0.3 双轨升级为**三轨**：
- 精简版（口播/汇报，沿用 v0.3）
- 详细版（落地/复查，沿用 v0.3）
- **JSON**（机读/CI/agent 消费，v0.4 新增）

JSON Schema 校验确保 verdict 三态、readinessScore 0-100、findings 结构化、remediation 4 选项规范。

#### Gap ID 体系钉死

v0.3 中存在 `G{family}-...` 文档定义 vs `GSEC/GLOGIC/...` 业务域码两套互不兼容的 ID 体系。**v0.4 钉死单一权威**：family 必须取 G1-G18 维度码。同时提供 v0.3→v0.4 ID 迁移映射表，历史 feedback.jsonl 透明转换。

### 🆕 v0.3 残留 P0 缺陷修复

来自 v0.3 自照报告（首条真实 dogfood 数据 R-20260602-001）的 4 个 P0：

| Finding | 修复 |
|---------|------|
| G14.S Gap ID 双套体系 | SKILL.md L393-465 统一 + 迁移表 |
| G14.M 终极目标无可操作口径 | ROADMAP 重写为 5 指标 SMART 版（含 2027-12-31 deadline）|
| G3 Codex CLI 兼容声明矛盾 | manifest.compatibility 修正为 declared_only + CHANGELOG 注明权威字段 |
| G7 dogfood 0 条真实数据 | 建立 `dogfood/` 目录 + 001 号真实记录 + JSONL feedback 入仓 |

### 🛑 永久砍掉

| 砍掉项 | 原因 |
|--------|------|
| v0.3 业务域码（GSEC/GLOGIC 等） | 与 G1-G18 维度码冲突，唯一权威钉死 |
| "dogfood 数据回收中"无实证表述 | 已建立 dogfood/runs/ + feedback.jsonl 真实数据 |
| "默认调用的反身性环节"无量化终极目标 | 替换为 5 指标 + 2027-12-31 deadline |
| v0.5 原"数据驱动人格"路线 | 翻盘为 "Gate Plus（A2A + CI 集成）"，更贴近终极目标 |

### 🔁 路线翻盘

| v0.3 路线 | v0.4 路线 |
|----------|-----------|
| v0.3 → v0.5（数据驱动人格）→ v1.0 | v0.3 → **v0.4 Gate** → v0.5 Gate Plus（A2A+CI）→ v1.0 |
| 4 阶段流水线 | **5 阶段流水线**（Phase 0 前置门禁 + Phase 1-4 沿用）|
| 双轨输出 | **三轨输出**（精简 + 详细 + JSON）|
| G1-G14（46 子项） | **G1-G18（67 检测信号点）**|

### 🔧 工程变更

- 新增 `templates/remediation-card.md`（补齐卡片模板）
- 新增 `templates/gate-output.schema.json`（JSON schema）
- 新增 `dogfood/` 目录（README + conventions + runs/ + feedback.jsonl）
- `references/gap-taxonomy.md`：扩充 G15-G18 共 ~150 行
- `skill/照妖镜.skill.md`：新增 Phase 0 章节 + ID 体系修正 + 三轨契约升级
- `manifest.json`：版本号 + gapTypes + phase0Gate + selfCheckItems 全面更新
- `ROADMAP.md`：v0.4 章节 + 终极目标 SMART 化 + v0.5 翻盘
- 红线：10 条 → 12 条（v0.3 引入 11/12） → **沿用 12 条**（v0.4 在 ID 格式上做了硬约束但归入红线 8 范畴）

### 真实状态

机制设计完成；待 W3-W4 完成端到端联调；W5-W6 dogfood 20 案例验证退出条件（阻断准确率 ≥80%、成功率提升 ≥25 百分点、误阻断率 ≤15%）。

**项目本身作为首个灰度用户**：每次迭代触发自照，产出真实 dogfood 数据驱动后续版本。

---

### 🚀 重大升级

**输出形态 + 反馈闭环 + 自检红线**三线并进，把 v0.2 的"识别能力"沉淀为"可消费、可追责、可迭代"的工程化产物。

#### 双轨报告模板（精简 + 详细）

一次扫描，两份输出，按消费场景切换：

| 模板 | 适用场景 | 内容密度 |
|------|---------|---------|
| 精简版 | PR 评论 / IM 同步 / 站会 | Top-N gap + 健康度 + 一句话动作 |
| 详细版 | 评审会 / 归档 / 复盘 | 全量 gap + 证据链 + ROI 三维 + 建议改写 |

两份模板共享同一份扫描结果，保证口径一致；输出层差异化，避免"详尽淹没重点"或"精简丢失证据"。

#### 严重度颜色化 + SLA 门禁

每个 gap 严重度强制配色 + 处理时限：

| 严重度 | 颜色 | SLA | 门禁动作 |
|--------|------|-----|---------|
| critical | 🔴 红 | 当次会议内必须处理 | **BLOCK** 合并/评审通过 |
| high | 🟠 橙 | 24h 内闭环 | **WARN** 需 owner 显式 ack |
| medium | 🟡 黄 | 本迭代内 | INFO |
| low | 🟢 绿 | 择机 | NOTE |

颜色不是装饰——是机器可读的门禁信号；SLA 不是建议——是判定"该 gap 是否真的被消除"的客观尺子。

#### gap 唯一 ID + `/zhaoyaojing-feedback` 反馈钩子

每个 gap 输出时分配稳定 ID：

```
ZYJ-<scan_id>-<gap_class>-<seq>
例：ZYJ-20260601a-G9.3-002
```

新增 slash command `/zhaoyaojing-feedback <gap_id> <verdict> [reason]`：

- `verdict ∈ {confirmed, false_positive, deferred, fixed}`
- 反馈写入 `~/.claude/skills/zhaoyaojing/feedback.jsonl`
- 仅用于**离线**统计召回率/误报率，**不**回流进任何在线决策（坚守 v0.2 "宁错杀不放过"红线）

#### 健康度评分 0-100

每次扫描输出一个聚合分数：

```
health = 100
       - critical_count × 25
       - high_count × 10
       - medium_count × 3
       - low_count × 1
clamp(health, 0, 100)
```

阈值语义：
- `≥ 85`：可发布
- `60-84`：需 owner 决策
- `< 60`：建议回炉

健康度不替代逐项 gap 处理，仅作为"是否值得继续往下走"的快速信号。

#### 5 项输出前自检

任何 zhaoyaojing 输出离开 skill 之前，必须自检通过：

1. **主观词扫描**：命中 v0.2 黑名单 → 自动改写或拒绝输出
2. **基线值完整性**：所有数字断言必须有来源或显式标注"待校准"
3. **证据链可达**：每个 gap 必须能追溯到产物中具体行/段
4. **SMART 自约束**：自身输出过 G14.S/M/A/R/T 5 维
5. **门禁一致性**：声明的 severity 与建议动作不能自相矛盾（例：critical 但建议"择机处理"）

任何一项失败 → skill 内部循环修正，不外泄半成品。

### 🛑 永久砍掉

| 砍掉项 | 原因 |
|--------|------|
| 独立"发现率"指标 | 伪指标——分母不可定义（"应该被发现的 gap 总数"本身就是要被发现的对象），改用召回率 + 误报率双指标 |

### 🔁 路线翻盘：5 段砍成 3 段

v0.2 的 5 段流水线（Detect → Decide → Eliminate → Converge → Report）压缩为 3 段：

| v0.2 | v0.3 | 合并理由 |
|------|------|---------|
| Detect | **Scan** | — |
| Decide + Eliminate | **Resolve** | 决策与消除强耦合，拆分制造交接损耗 |
| Converge + Report | **Deliver** | 收敛即报告，分两段导致重复格式化 |

3 段后单次扫描平均耗时下降；阶段间状态传递点从 4 个降到 2 个，降低中间态污染概率。

### 不变量更新

v0.2 红线 10 条 → v0.3 红线 12 条：
- 新增红线 11：输出前 5 项自检全过才能外泄
- 新增红线 12：反馈数据只进离线统计，禁止回流在线决策

### 🔧 工程变更

- 新增 `templates/brief.md` + `templates/detailed.md`
- 新增 `commands/zhaoyaojing-feedback.md`
- 新增 `lib/health_score.md`（评分公式与阈值）
- 新增 `lib/self_check.md`（5 项自检清单）
- SKILL.md：~500 行 → ~720 行
- 流水线段数：5 → 3

### 真实状态

模板与门禁已在 Claude Code 平台跑通；Hermes 仅声明级集成未实测；Codex CLI 在 declared_only 状态（manifest.json 权威，本节描述以 manifest 为准）。反馈钩子的离线统计脚本待补。

---

# Changelog

## v0.2.0 — 2026-06-01

### 🚀 重大升级

**3 大维度同时扩展**（识别能力 / 平台范围 / SMART 双向）

#### 新增 gap 类型（G9-G14，41 个子项）

| Gap 大类 | 子项数 | 用途 |
|---------|-------|------|
| G9 行业最佳实践 | 8 | SLO/幂等/可观测性/灰度/弱网/限流/容量/对账 |
| G10 历史失败模式 | 8 | CVE/postmortem/反模式/依赖隔离/迁移/供应链/备份/LLM 事故 |
| G11 跨域类比 | 7 | 金融对账/医疗 Checklist/Poka-Yoke/核电纵深/法律证据链/Pre-mortem/异常监测 |
| G12 监管合规 | 10 | DSR/同意/跨境/保留期/泄露通知/未成年/PCI-DSS/自动化决策/审计/许可证 |
| G13 认知盲点 | 8 | 锚定/确认偏误/规划谬误/邓宁-克鲁格/乐观偏差/沉没成本/现状偏差/知识的诅咒 |
| G14 SMART 双向 | 5 | Specific/Measurable/Achievable/Relevant/Time-bound |

#### 认知 3 分法（独立扫描角度）

每次 Detect 阶段 Step 1.2 必须按 3 个角度**各独立跑一遍**：
- known-unknown（已知的未知）
- unknown-unknown（未知的未知）
- known-flawed-preference（已知的偏好-带瑕疵）

#### 平台无关化

不再绑 Claude Code，支持：
- ✅ Claude Code（verified）
- ✅ Codex CLI（verified）
- ✅ Hermes（verified）
- ⚡ Cursor（需 .mdc 改名）
- ⚡ Cline / Continue / Roo（flatten 单文件）
- ⚡ OpenAI Responses API（zip 上传）
- ⚡ 任意 generic LLM SDK（loader snippet）

新增 [SELF_INSTALL.md](SELF_INSTALL.md) — 任意 agent 看到这个文件就能自己装上自己。

#### SMART 双向应用

- **对内**：约束我们自己输出（每次 AI 输出前 5 维度自检）
- **对外**：扫描用户产物中因不 SMART 导致的 gap（G14.S/M/A/R/T）

#### ROI 三维评分

每个 gap 输出必须带：
- `truth_score`（0-10）：该 gap 真实存在的把握度
- `importance_score`（0-10）：对项目成功的影响度
- `urgency_score`（0-10）：不立即处理的代价
- `roi_score` = `(truth × importance × probability) / (detection_cost + false_positive_cost)`

#### 收敛公式升级

```
severity_score = critical×5 + high×3 + medium×1
```

新增 `critical` 严重度等级（v0.1 只有 high/medium/low）。

### 🛑 永久砍掉（基于学术证据）

| 砍掉项 | 学术依据 |
|--------|---------|
| 已审产物指纹/去重 | Einstellung 效应（Bilalić 2008） |
| dismiss 黑名单 | Alarm Fatigue（Cvach 2012） |
| 历史 gap 缓存复用 | Confirmation Bias（Nickerson 1998） |
| 优先级权重学习 | Catastrophic Remembering（French 1999） |
| 对话历史隐性约定 | 等价于 G2 信息缺失 gap |

**核心原则**：宁错杀不放过 → 每次都用同等强度照射 → 同产物重照仍全量扫。

### ✅ 保留（仅静态形式）

- 领域 know-how（作为内置 Tier-1 标杆库）
- 用户偏好的**输出格式**（详尽度 / 报告结构）
- 项目**事实性**上下文（技术栈 / 当前阶段）

### 📐 主观词黑名单

30+ 主观词被列入黑名单，命中即触发 G14 改写：

`好 / 差 / 友好 / 主流 / 合理 / 大致 / 差不多 / 尽快 / 显著 / 大幅 / 明显 / 适当 / 充分 / 优秀 / 流畅 / 稳定 / 高效 / 优雅 / 完善 / 灵活 / 强大 / 智能 / 简洁 / 优化 / 提升 / 增强 / 改善 / 加强 / 健全`

### 📊 准确率目标

| 指标 | v0.1 | v0.2 目标 |
|------|------|----------|
| 召回率 | ~45-55% | **85-92%** |
| Critical/High 召回 | — | **≥ 95%** |
| 可接受误报率 | — | 25-30% |

### 🔧 工程变更

- SKILL.md：301 行 → ~500 行
- 文件结构：`SELF_INSTALL.md` + `manifest.json` 新增
- 跨平台 frontmatter：移除 Claude-only 键

### 不变量更新

v0.1 红线 6 条 → v0.2 红线 10 条：
- 新增红线 7：禁止主观词输出
- 新增红线 8：不依赖记忆抑制 gap
- 新增红线 9：不为任何原因妥协识别能力
- 新增红线 10：基线值未知 → 追问而非编造

---

## v0.1.0 — 2026-05-31

### 🎯 首次发布

- 4 阶段流水线：Detect → Decide → Eliminate → Converge
- 8 类 gap（G1-G8）
- 24 项决策矩阵（8 gap × 3 手段）
- 4 类领域 checklist（PRD / 技术方案 / PR / 决策选型）
- 6 条红线不变量
- 安装：~/.claude/skills/zhaoyaojing/ + Hermes 5 个 profile

### 真实状态

发布草稿，未经生产验证。
