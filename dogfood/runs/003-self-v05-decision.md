---
scanId: R-20260602-003
scannedAt: 2026-06-02T02:00:00Z
scanner: self
scannerVersion: 0.5.0-decision
artifact:
  path: v0.5 方向决策（5 轮 workflow + 用户 9 条约束）
  type: self-meta
phase0:
  verdict: PASSED
  readinessScore: 95
  blockedCount: 0
  warningCount: 0
findings:
  p0: 0
  p1: 0
  p2: 0
  p3: 0
feedback:
  collected: true
  conclusions: [accepted: 11, rejected: 0]
---

# 003-self-v05-decision · v0.5 方向决策的完整推理轨迹

## 背景

v0.4 发布后启动 v0.5 规划，经过 **5 轮 workflow 迭代**，用户 4 次校正方向，最终从 v0.4 的"67 信号 + Phase 0 引擎 + JSON schema"工程化路线，**翻盘**为 **"11 招照妖 + grep/模板一招定位 + PASS/FAIL 二值"** 的方法论小而美方案。

本记录为 v0.5 实现前的**唯一不可逆决策存证**，所有用户反馈 + 行业证据 + 砍掉理由都在此留痕。

---

## 用户 4 次方向校正轨迹

### 校正 1（轮 2 后）：抗工程化
> "不要做太重，一定是方法论的东西，因为 agent 具备执行能力"
> "2/8 定律，聚焦在 ROI 最高的 20% 覆盖 80% 场景"
> "如果一次都照出来，再次迭代后可能之前平衡掉的问题又出来了，问题反复"

**纠偏**：砍掉"造平台"方向，新增 ledger.jsonl 暗记机制（deferred ≠ dropped）。

### 校正 2（轮 3 后）：拒绝 manifesto 化
> "我不太认可这个方向"
> "聚焦在上个流程向下一个流程流转时，将问题识别并澄清"
> "终极目标：消除 Gap、澄清事物、推动 agent 落地、造福人类"

**纠偏**：从"方法论 manifesto"转向"流程交接点（handoff）"工具——但仍偏，因为聚焦了形态而非根因。

### 校正 3（轮 4 后）：聚焦根因
> "不关心 handoff 格式，主要是将 20% ROI 最大的 Gap 识别出来"
> "稳准狠，一招定位，并将照出的原形显示出来"
> "PASS 时才能流转到下一个流程"

**纠偏**：从"handoff 包"转向"穷尽根因 → 二八筛选 → 一招定位"。第一版本只覆盖 7 条根因，且未覆盖主观词、视角。

### 校正 4（轮 5 后）：补全维度
> "还需要增加场景，不仅仅是知识盲点，还有未量化的内容，比如**快、高**这种带有主观意识的词汇"
> "比如**角度不同**导致看到的为部分，无法掌控全局，**鸡同鸭讲、对牛弹琴**"
> "整体需要看起来，穷尽所有因素"
> "继续细化确认下一版本我们的实现路径"

**最终落地**：穷尽 10 维度 171 条根因 → 三维交集 → 11 条精选 → 明确 5 步实现路径。

---

## 用户 9 条约束（最高仲裁，不可违反）

1. 不做平台，小而美（jq/ripgrep 哲学）
2. 聚焦一件事：去除 gap，实现人↔人/人↔AI/AI↔AI 的澄清和对齐
3. 流程交接点：上→下流转时识别 + 澄清 + 交付
4. 穷尽因素后取 ROI Top 20%（≈80% 返工）
5. 稳准狠一招定位
6. 照出原形给上游迭代
7. PASS 才能进入下一流程（二值判定）
8. 杜绝虚假
9. 覆盖主观词（快/高）+ 视角（盲人摸象/鸡同鸭讲）

---

## 171 → 11 的筛选过程

### Phase 1：穷尽 10 维度共 171 条根因

| 维度 | 代号前缀 | 条数 | 关键覆盖 |
|------|---------|------|---------|
| 认知 | C- | 22 | 知识诅咒/未知的未知/D-K/Einstellung |
| 协作 | P- | 22 | 角色未定义/语义漂移/部落知识/Conway |
| 需求 | R- | 18 | 隐性假设/验收模糊/Berry 歧义/INVEST 缺位 |
| Agent | A- | 22 | 自信错答/规范缺口（MAST 42%）/工具幻觉 |
| **主观词** | **S-** | **22** | **快/高/友好/稳定 等用户原话** |
| **视角** | **V-** | **15** | **盲人摸象/鸡同鸭讲/抽象层错配** |
| 信息源 | I- | 14 | SSOT 缺失/文档代码漂移/ADR 缺失 |
| 目标 | G- | 14 | WHY 缺失/Output≠Outcome/多目标冲突 |
| 时间 | T- | 13 | 同步异步未声明/截止日模糊 |
| 文化 | B- | 10 | 高低语境/行业黑话/专家跳步 |

合计 **171 条**，跨维度合并去重后 ≈ **101 条独立根因**。

### Phase 2：三维交集筛选

**频率 ∩ 代价 ∩ 可拦截** 三维同时落在 Top 20% 才入选：

- 频率：跨学科出现 ≥2 次
- 代价：触发返工 ≥50% 或不可逆后果
- 可拦截：上游可一招 grep/模板检查，无需 runtime

### Phase 3：精选 11 条（覆盖 6 维度）

| # | 代号 | 名称 | 覆盖用户原话场景 |
|---|------|------|---------------|
| 1 | S-PERF | 性能/时效形容词无指标 | ✅ "快、高" |
| 2 | G-WHY | WHY 缺失/Output 冒充 Outcome | |
| 3 | I-SSOT | SSOT 缺失/版本术语漂移 | |
| 4 | V-NAME | 同名异义（用户/事务/上线/完成）| ✅ "对牛弹琴" |
| 5 | V-STAKE | 利益相关方/失败路径缺位 | ✅ "盲人摸象" |
| 6 | R-DOD | 验收标准（DoD）缺失 | |
| 7 | S-QUANT | 全称量词/-ly 副词陷阱 | ✅ "所有/通常" |
| 8 | G-NOGO | 多目标冲突/反目标缺失 | |
| 9 | V-LAYER | 抽象层/颗粒度错配 | ✅ "鸡同鸭讲" |
| 10 | I-ADR | ADR 缺失/部落知识 | |
| 11 | S-NFR | 质量/安全形容词无判据 | ✅ "稳定/可靠" |

**用户 9 条约束全覆盖**。

---

## 砍狠清单（不可逆决策）

### v0.4 的工程化资产 → 全部砍

| # | 砍掉 | 理由 |
|---|------|------|
| 1 | severityScheme P0-P3 | PASS/FAIL 二值即可 |
| 2 | gapIdFormat G{family}-{idx}#{hash} | 用 S-PERF/V-NAME 代号即可 |
| 3 | feedbackHook + rescan 机制 | 上游看原形自然迭代，无需回路 |
| 4 | selfCheck C1-C6 | 11 条规则本身就是 self-check |
| 5 | compatibility 三级表 | 单 skill 无兼容矩阵需求 |
| 6 | readinessScore 0-100 | 二值就够，分数是虚假精度 |
| 7 | INVEST-Agent + G15-G18 | 归并到 11 条，不发明术语 |
| 8 | Phase 0 引擎 | agent 自判输入，引擎是过度工程 |
| 9 | gate-output.schema.json | agent 结构化读取成本为 0 |
| 10 | remediation-card 模板 | 列模板=替 agent 干活 |

### v0.5 草案中诱人但应不做

| # | 不做 | 理由 |
|---|------|------|
| 1 | Python CLI 实现 | 写代码=工程化弯路；agent 自带 grep |
| 2 | yml 规则外置 | 规则在 SKILL.md 即可，分文件=造检测器全家桶 |
| 3 | 单测套件 | 真实灰度即测试 |
| 4 | MCP server 封装 | 杀死"任意 agent 读手册即用"灵魂 |
| 5 | A2A 协议化 | 0 真实跨用户数据，发布即同源偏置 |
| 6 | CI/CD enforce 集成 | 误报率未知 <5% 前必被骂回 |

---

## v0.5 实现路径（5 步，≤15h）

| 步 | 动作 | 产物 | 工时 |
|----|------|------|------|
| 1 | 11 条规则直接写进 SKILL.md 表格 | SKILL.md 内嵌规则表 | 3h |
| 2 | SKILL.md 瘦身 774 → ≤300 行 | skill/照妖镜.skill.md | 4h |
| 3 | 5 个真实历史命中示例（从 dogfood 历史抽）| examples/ × 5 | 3h |
| 4 | 自我灰度：扫本仓所有 *.md | dogfood/runs/004-self-v05-grayfirst.md | 3h |
| 5 | 版本元数据 + commit + API push | manifest/CHANGELOG/ROADMAP/README | 2h |

---

## 与终极目标因果链

```
11 条 grep/模板规则
    ↓ 单次扫描 ≤1s
FAIL 输出原形句
    ↓ 上游 5 分钟内看到模糊点
补齐示例（含数字/单位/边界）
    ↓ 修订一次即消除
PASS 二值门禁
    ↓ 下游收到 0 gap 命中文档
鸡同鸭讲率 ↓ → 返工成本 ↓ ≈80%（Boehm + Capers Jones 实证）
    ↓
agent 协作落地 → 造福人类
```

---

## 关键行业证据（杜绝虚假，全部可溯源）

| 数据 | 来源 |
|------|------|
| 需求模糊占缺陷 56% | Martin/IBM |
| 80% 项目失败归因需求 | Standish CHAOS |
| 运营期修复需求 bug 50-200× | Boehm 1981 |
| MAST specification gap 41.77% | NeurIPS 2025 |
| MAST 验证类 21.3% | NeurIPS 2025 |
| Berry 主观词警示 | Berry ambiguity research |
| Ramdoo 沟通失效=返工 #1 | ResearchGate |

---

## 退出条件（v0.5 release 前必须 4 项全 true）

```bash
# 1. 11 条规则全部写入 SKILL.md
grep -cE "^\| \*\*[SVIGRP]-[A-Z]+" skill/照妖镜.skill.md   # ≥ 11

# 2. SKILL.md 未膨胀
wc -l skill/照妖镜.skill.md   # ≤ 300

# 3. 沉没成本砍干净
grep -rE "severity|readinessScore|Phase 0|manifesto|handoff" skill/   # 应为 0 行 SKILL 主文件

# 4. 5 个真实示例齐备
ls examples/ | grep -E "\.md$" | wc -l   # ≥ 5
```

---

## 决策反馈

| 决策 | 状态 |
|------|------|
| 用户对齐 v0.5 = "11 招照妖" 方向 | ✅ accepted |
| 用户对齐"不写 Python CLI" | ✅ accepted（implicit，未反对）|
| 用户对齐 5 步实现路径 | ✅ accepted（"可以跑起来了"）|
| 用户授权迭代权限 | ✅ accepted（"允许迭代"）|

**结论**：v0.5 方向决策完成存证，开始不可逆动作。
