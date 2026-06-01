## v0.3.0 — 2026-06-01

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

模板与门禁已在 Hermes / Claude Code / Codex CLI 三平台跑通；反馈钩子的离线统计脚本待补。

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
