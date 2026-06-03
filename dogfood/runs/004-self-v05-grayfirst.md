---
scanId: R-20260602-004
scannedAt: 2026-06-02T03:00:00Z
scanner: self
scannerVersion: 0.5.0
artifact:
  path: GitHub repo *.md（全文扫描，排除 .git/）
  gitSha: 0f06f84 + v0.5 WIP
  type: self-meta
phase0:
  verdict: N/A（v0.5 已砍 Phase 0 引擎）
findings:
  p0: 0
  p1: 0
  p2: 0
  p3: 0
  PASS_or_FAIL: 11 条规则均命中，但含大量误报
feedback:
  collected: true
  conclusions: [accepted: 3（真阳缺陷）, rejected: 5（误报）, deferred: 3（历史文件已不再维护）]
---

# 004-self-v05-grayfirst · v0.5 11 招首次全仓自我灰度

## 背景

v0.5 SKILL.md（236 行 / 11 条规则）刚写完，按"项目自身作为首个灰度"策略，第一时间对本仓所有 `*.md` 跑 11 招。

---

## 真实命中（真阳）— 3 条

### [FAIL] S-PERF 性能/时效形容词无指标
- **file**: `examples/01-prd-review.md:12`
- **原形**：`"- 上线时间：尽快"`
- **why**：这是 v0.1 时期的老 test fixture，"尽快"无日期/截止日
- **状态**：`accepted`（历史文件，不修但标记）

### [FAIL] G-WHY WHY 缺失
- **file**: `CHANGELOG.md` v0.4 段
- **原形**：v0.4 段全段只列 Output（6 个交付物），未列 Outcome
- **why**：v0.4 CHANGELOG 写"Phase 0 输入门禁 + INVEST + readinessScore + G15-G18..."——全是功能名词，没有"解决谁的什么问题"
- **状态**：`accepted`（v0.5 CHANGELOG 段已改为 Outcome 驱动）

### [FAIL] V-STAKE 利益相关方/失败路径缺位
- **file**: `examples/01-prd-review.md` 全段
- **原形**：旧 benchmark 里只讨论了"功能怎么用"，无回滚/客服/合规段
- **why**：v0.1 PRD 示例确实缺 fail path
- **状态**：`accepted`（历史文件，入清理清单）

---

## 误报（假阳）— 5 条集中分析

### 误报根因 #1：SKILL.md 自身包含 grep 模式 → 循环命中

所有 S-PERF / S-QUANT / S-NFR 规则的 `grep` 会 hits 到**规则表的 `| **N** | **S-PERF** | ... | \`grep -nE "快|高效|尽快"...\` |`** 这一行——因为表里有原形句如 "你说要快"。

**grep 原文命中**：
```
skill/照妖镜.skill.md:47:S-PERF 规则行（| **1** | **S-PERF** | ... | `grep -nE "快\|高效\|尽快..."` | "你说要快，但快到几毫秒没说" |
skill/照妖镜.skill.md:97:  原形: "登录要快"
```

修复方向：在 SKILL.md 顶部标注 `<!-- SKIP-SELF-CHECK: 本文件是规则定义，不是被审产物 -->`，或规则表用 CODE-FENCE 包裹避免 grep 命中。

### 误报根因 #2：CHANGELOG 主观词黑名单段落

CHANGELOG.md L298 是历史 v0.2 的主观词黑名单**列出清单**——不是在使用这些词：
```
CHANGELOG.md:298:`好 / 差 / 友好 / 主流 / 合理 / 大致 / 差不多 / 尽快 / ...`
```

修复方向：grep 时排除 CODE-FENCE 块内、列表型上下文。

### 误报根因 #3：references/gap-taxonomy.md 是旧分类文件

该文件 G1-G14 67 信号点，含大量主观词示例。但该文件是 v0.4 旧版分类定义，v0.5 已不再引用——**应纳入清理范围**。

### 误报根因 #4：INSTALL.md 用"所有 profile"描述安装

`"一键装到所有 5 个 profile"` ——这里的"所有"有枚举集合（5 个），不是 S-QUANT 范的"所有用户"型歧义。误报。

### 误报根因 #5：README/SELF_INSTALL.md 使用"任何"在"任何 agent"上下文

`"任何 agent 看到这个文件就能自己装上"`——这里的"任何"是**操作手册的目标受众声明**，不是模糊需求边界。误报。

---

## 历史遗留文件（deferred）— 3 个

以下文件是 v0.3/v0.4 历史积累，v0.5 已不再引用：

| 文件 | 行数 | 与 v0.5 的关系 |
|------|------|---------------|
| `references/gap-taxonomy.md` | 320 行 | G1-G14 67 信号点，全已砍 |
| `benchmarks/` 全目录 | 3 个文件 | v0.3 Tier-1 标杆，不再引用 |
| `skill/照妖镜.skill.md.bak` | 旧 v0.3 版本 | 已由 `.gitignore` 忽略但仍在磁盘上 |

---

## 灰度数据汇总

| 规则 | 原始命中数 | 真阳 | 误报 | 待修文件 | 备注 |
|------|----------|------|------|---------|------|
| S-PERF | 20 | 1 | 19 | 1 | 大量 grep 回环命中规则表自身 |
| S-QUANT | 22 | 0 | 22 | 0 | INSTALL/README 中的使用在合法语义下 |
| S-NFR | 20 | 0 | 20 | 0 | 全部回环命中规则表 + 黑名单清单 |
| R-DOD | 1 | 0 | 1 | 0 | 历史文件已覆盖 |
| G-WHY | 3 | 1 | 2 | — | CHANGELOG v0.4 段真阳 |
| G-NOGO | 4 | 0 | 4 | — | 全部来自旧文件 |
| I-SSOT | 5 | 0 | 5 | — | 全部来自旧 references/ |
| I-ADR | 1 | 0 | 1 | — | 旧文件 |
| V-NAME | 2 | 0 | 2 | — | 旧文件 |
| V-STAKE | 7 | 1 | 6 | — | examples/01-prd-review 真阳 |
| V-LAYER | 5 | 0 | 5 | — | 旧文件 |
| **合计** | **90** | **3** | **87** | — | **误报率 = 87/90 = 96.7%** |

---

## 关键发现（诚实回归）

### 发现 1：grep-only 规则误报率极高

S-PERF / S-QUANT / S-NFR 3 条纯 grep 规则的误报率**近 100%**——因为：
- 规则表本身包含示例词（"你说要快"）→ 回环命中
- CHANGELOG 列出主观词黑名单 → 被当使用
- `references/` 旧文件是 G1-G14 描述，含主观词示例

> **方向判断**：纯 grep 不适合主观词规则——需要**语义判断**（"这处是在**使用**这个词还是**描述**这个词"），这正是 agent 的 LLM 能力可以做的事。v0.5 的设计需要修正：**不是"agent 用 grep 跑"，而是"agent 用 LLM 判断上下文语义"**。

### 发现 2：旧文件污染严重

`references/gap-taxonomy.md` (320 行 / G1-G14 67 信号) 和 `benchmarks/` 3 个文件是 v0.3 历史资产，被 grep 大面积误命中。**v0.5 发布前应清理**（移入 `attic/` 或删除）。

### 发现 3：3 条真阳全是真实历史遗存

`examples/01-prd-review.md` 和 `CHANGELOG v0.4 段` 两条真阳都不是"当前 v0.5 产物的问题"，而是"v0.3/v0.4 历史已修复的缺陷"——说明 11 招**能识别真实 gap**，但灰度覆盖的"活文件"太少。

### 发现 4：模板类规则（G-WHY / V-STAKE）比 grep 类规则精准

G-WHY 在 CHANGELOG v0.4 段的真阳命中**精准**——真正发现了"Output 冒充 Outcome"的问题（该段是功能清单而非 Outcome 驱动）。这与 v0.5 的设计方向一致。

---

## v0.5 实现调整建议（基于灰度数据）

| 调整 | 理由 |
|------|------|
| **S-PERF/S-QUANT/S-NFR 从"grep"改为"语义检查"** | 纯 grep 误报 96%，需要 agent 的 LLM 判断上下文——**agent 自带能力，不需要复杂工程** |
| **清理 references/ + benchmarks/ 旧文件** | 移入 `attic/`（历史资产，不删但不再被 grep 扫到）|
| **grep 排除规则表自身** | 加 CODE-FENCE 包裹或在文件名级白名单 |
| **首批灰度应用在"活文件"上** | README / ROADMAP / CHANGELOG / skill / 而不是历史文件 |

---

## 与 v0.5 退出条件对照

| 退出条件 | 当前进度 |
|---------|---------|
| 11 条规则全部写入 SKILL.md | ✅（grep 可验证 = 11）|
| SKILL.md ≤ 300 行 | ✅（236 行）|
| 沉没成本词砍净 | ✅（skill/ 下无 severity/readinessScore/Phase 0/manifesto）|
| 5 个真实示例齐备 | ✅（examples/ 下 6 个 .md，含 1 个历史 01-prd-review）|

**额外发现（不在退出条件中）**：**首次灰度误报率 96.7%，不是发布阻塞项但必须记录**。grep 类规则需要语义升级——在 SKILL.md 的"给 Agent 的执行指令"中明确标注这些规则**不是用 `grep` 命令，而是让 agent 用 LLM 判断上下文语义**。

---

## 下一步

1. ✅ 本记录入仓
2. ⏭ v0.5-5：版本元数据更新（manifest 0.4→0.5、CHANGELOG v0.5 段、ROADMAP v0.5 段、README）
3. ⏭ v0.5-6：commit + API push
4. ⏭ v0.5.1 patch：清理旧文件到 attic/；S-PERF/S-QUANT/S-NFR 三个 grep 规则升级为语义检查
