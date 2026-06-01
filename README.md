# 照妖镜 · Mirror Skill

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Skill](https://img.shields.io/badge/Claude_Code-Skill-blueviolet)](skill/照妖镜.skill.md)
[![Version](https://img.shields.io/badge/version-v0.1-blue)](README.md)

> 在 Claude Code / Codex / 任意 Agent 与人之间，**识别 gap → 推荐最优消除手段 → 多轮收敛**的 Skill。
>
> 不是平台、不是治理系统、不是 7 层架构——**一份 Skill 文件 + Claude 自带能力**就能跑通。

## ⚡ 30 秒安装

```bash
git clone https://github.com/<your-org>/zhaoyaojing.git
mkdir -p ~/.claude/skills/zhaoyaojing
cp zhaoyaojing/skill/照妖镜.skill.md ~/.claude/skills/zhaoyaojing/SKILL.md
```

打开新的 Claude Code 会话，输入 "**帮我照一下这个 PRD：...**" 即可触发。

详细安装见 [INSTALL.md](INSTALL.md)。

---

## 1. 它解决什么问题

每次你和 AI 协作时，本质都在面临 **3 类 gap**：

| Gap 类型 | 具体表现 | 现状 |
|---------|---------|------|
| **人-AI gap** | 你以为说清楚了，AI 在乱猜；AI 给的答案你不知道对不对 | 无人治理 |
| **人-人 gap** | 需求/PR/方案在不同角色之间语义漂移 | 靠会议补救 |
| **AI-AI gap** | 多 Agent 编排时上下文丢失、互相覆盖 | 靠手动粘贴 |

**照妖镜的核心承诺**：
1. **识别**：自动找出当前对话/产物里有哪些 gap
2. **选手段**：根据 gap 类型自动推荐最优消除策略（不是给一堆选项让人选）
3. **多轮收敛**：一轮没消除完，下一轮继续，直到 gap 降到阈值以下

---

## 2. 为什么是 Skill 不是平台

| 形态 | 复杂度 | 边际成本 | 用户接入 |
|------|-------|---------|---------|
| 治理平台（旧思路） | 6 模块 / 20 能力 / 数月 | 高 | 改流程 |
| 7 层架构（昨天的） | 7 层 / 4 子模块 / 数周 | 中 | 装服务 |
| **Skill（现在）** | **1 个 md 文件** | **≈ 0** | **Claude 自动加载** |

**核心判断**：Claude 已经有 web search / 多模型调用 / 工具调用 / 长上下文 —— 99% 的能力照妖镜需要的 Claude 都有。**我们要做的不是"再写一遍"，而是"教 Claude 怎么用它已有的能力"**。

这就是 Skill 的本质：**一份给 Claude 看的"操作手册 + 决策树"**。

---

## 3. 设计原则

| 原则 | 含义 |
|------|------|
| **能用规则就不用 LLM** | 70% 决策走 keyword/regex/glob 匹配，瞬时完成 |
| **能用 Claude 已有能力就不写代码** | web search / read / grep / glob 全用 Claude built-in |
| **必须有兜底默认值** | 任何分支不能停在"请用户选择"，必须有 sensible default |
| **多轮收敛** | 一次照不清的，下一轮继续；不是一锤子买卖 |
| **可解释** | 每次推荐的手段必须给"为什么选这个" |

---

## 4. 运行原理（一图说清）

```
用户输入产物（PRD / PR diff / 方案 / 对话）
       ↓
[Phase 1: 识别 - Detect]
   规则扫描（关键词/正则/结构匹配）
   → 输出 gap 候选列表（带类型 + 严重度）
       ↓
[Phase 2: 决策 - Decide]
   按 gap 类型 → 查 "gap × 手段 决策矩阵"
   → 输出推荐手段（Top 1，带理由）
       ↓
[Phase 3: 执行 - Eliminate]
   调用手段（web search / 异源对照 / 反问 / 锚点验证）
   → 输出消除报告（gap 是否真消除）
       ↓
[Phase 4: 收敛 - Converge]
   若 gap 残留 > 阈值 → 回 Phase 1（最多 3 轮）
   若 gap < 阈值 → 输出最终对齐报告
```

---

## 5. 项目目录

```
zhaoyaojing/
├── README.md                    本文件
├── skill/
│   └── 照妖镜.skill.md          Claude Code Skill 主文件
├── examples/                    实战 case
│   ├── 01-prd-review.md         案例 1：评审 PRD
│   ├── 02-pr-review.md          案例 2：评审 PR
│   └── 03-tech-spec.md          案例 3：评审技术方案
└── tests/                       验证脚本
    └── verify-skill.md          Skill 装载与触发测试
```

---

## 6. 安装与使用

### 装入 Claude Code

```bash
# 将 skill/照妖镜.skill.md 复制到 Claude Code 的 skills 目录
mkdir -p ~/.claude/skills
cp skill/照妖镜.skill.md ~/.claude/skills/
```

### 使用

```
方式 1：显式调用
你：/照妖镜 帮我审一下这个 PRD
Claude：[加载 Skill] [4 阶段流水线] [输出报告]

方式 2：关键词触发（Skill 自动加载）
你：这个方案有什么没想到的吗？
Claude：[检测到关键词，加载照妖镜] [自动开跑]

方式 3：手动加载 + 多轮收敛
你：照一下 → [第 1 轮] → 继续 → [第 2 轮] → 收敛
```

---

## 7. 与旧资产的关系

| 旧资产 | 关系 |
|--------|------|
| `agent-governance-request-card.md` | 治理框架——**不复用**，但其"通过证据治理"原则被照妖镜继承 |
| `agent_native_gap_elimination_research.md` | gap 消除方法论库——**作为决策矩阵的参考**，但 Skill 只取 5-10 个最高 ROI 的手段 |
| `agent-governance-architecture.drawio` | 平台架构图——**完全不用**，照妖镜是 Skill 不是平台 |
| `HermesControl / OpenTower / openhive / openspine` | 平行项目——**独立运行**，未来可作为 Skill 的"可选后端"接入 |

**核心区别**：旧资产是"造平台"，照妖镜是"教 Claude 用它已有能力"。**前者重型、后者最小集**。

---

## 8. 版本规划

| 版本 | 范围 | 状态 |
|------|------|------|
| **v0.1**（当前）| Skill 文件 + 4 阶段流水线 + 5 个核心 gap 类型 + 决策矩阵 | 进行中 |
| v0.2 | 增加历史 gap 记忆（用 Claude built-in memory）+ 反馈学习 | 规划 |
| v0.3 | MCP Server 形态，让 Cursor / Cline / Codex 也能调 | 规划 |
| v0.4 | 异源对照（Claude 调 GPT / Gemini 做独立审查） | 规划 |

---

## 9. 一句话总结

> **照妖镜 = 一份让 Claude 在你和 AI 协作每个关键节点自动识别 gap、推荐最优消除手段、多轮收敛到对齐的操作手册。**
>
> **不写代码，只写规则。不造平台，只教 Claude。**
