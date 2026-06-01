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
