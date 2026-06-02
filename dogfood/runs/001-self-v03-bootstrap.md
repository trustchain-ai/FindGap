---
scanId: R-20260602-001
scannedAt: 2026-06-02T00:00:00Z
scanner: self
scannerVersion: 0.3.0
artifact:
  path: skill/照妖镜.skill.md + ROADMAP.md + CHANGELOG.md + manifest.json + dogfood-candidates.md
  gitSha: ec5d2cb
  type: self-meta
phase0:
  verdict: BLOCKED
  readinessScore: 42
  blockedCount: 4
  warningCount: 4
findings:
  p0: 4
  p1: 4
  p2: 2
  p3: 0
feedback:
  collected: true
  conclusions: [accepted: 10, rejected: 0, known: 0, fix-applied: 4]
---

# 001-self-v0.3-bootstrap · 照妖镜 v0.3 自我审视（首次真实 dogfood）

## 背景

v0.3 ROADMAP 声明"dogfood 数据回收中"，但截至 v0.4 启动日（2026-06-02）零条真实记录。本次扫描作为**项目历史上第一条真实 dogfood 数据**，由照妖镜对自身的所有公开产物（SKILL/ROADMAP/CHANGELOG/manifest/dogfood-candidates）进行 G1-G14 全量扫描，输出结果被用于驱动 v0.4 路线。

本次 dogfood 同时验证了"项目自身作为灰度方向"的可行性。

## Phase 0 结果（追溯补算 · v0.3 当时无 Phase 0）

| 维度 | 状态 |
|------|------|
| verdict | BLOCKED |
| readinessScore | 42 / 100（4 个 P0 阻断 + 4 个 P1 警告） |
| 阻断维度 | G14.S / G14.M / G3 / G7 |

## Findings 全表

| # | 维度 | 子项 | 严重度 | 定位 | 命中证据（摘要） |
|---|------|------|--------|------|-----------------|
| 1 | G14 | S | 🔴 P0 | manifest.json:103 vs SKILL.md:397-426 | ID 格式定义两套互不兼容（G1-G14 vs GSEC/GLOGIC） |
| 2 | G14 | M | 🔴 P0 | ROADMAP.md:5 | 终极目标无可操作口径、无基线、无分母 |
| 3 | G3 | — | 🔴 P0 | CHANGELOG.md:113 vs manifest.json:37-39 | Codex CLI 三处描述互相矛盾 |
| 4 | G7 | — | 🔴 P0 | ROADMAP.md:4 + dogfood-candidates.md:1-7 | "dogfood 回收中"但 0 条真实数据，不可证伪 |
| 5 | G14 | T | 🟡 P1 | ROADMAP.md:5,159-166 | 终极目标无限定期限 |
| 6 | G4 | — | 🟡 P1 | benchmarks/_index.md:9-21 | 10 个标杆 8/10 空占位 |
| 7 | G6 | — | 🟡 P1 | SKILL.md:389-551 | 反馈钩子零处提及冷启动策略 |
| 8 | G14 | A | 🟡 P1 | ROADMAP.md:5-6 | 终极目标无阶段性可行性论证 |
| 9 | G14 | M | 🟢 P2 | manifest.json:116 + CHANGELOG.md:127 | 子项计数错（46 / 54 不符） |
| 10 | G1 | — | 🟢 P2 | README.md:268 | "不写代码只写规则"叙事与 manifest 现实矛盾 |

## 关键 finding 详细分析

### Finding #1 · 🔴 P0 · G14.S · Gap ID 体系自相矛盾

- **定位**：`manifest.json:103` vs `skill/照妖镜.skill.md:397-426`
- **三法命中**：
  - [x] 反证法：用户按 manifest 写 `/zhaoyaojing-feedback G14.M-1#a3f91c`，按 SKILL 文档写 `GSEC-1#a3f91c`，两套调用方式都能找到依据
  - [x] 对照法：行业 ID 体系通常单一权威（OWASP A01-A10 / CWE-N / CVE-YYYY-NNNN）
  - [x] 边界法：复扫匹配历史反馈时按哪套 ID 索引？
- **证据**：
  ```
  manifest.json:103
    "gapIdFormat": "G{family}-{idx}#{shortHash} | shortHash=sha1(location+evidence)[0:6]"
  SKILL.md:407
    family: 如 SEC（安全）、PERF（性能）、LOGIC（逻辑）...
  ```
- **影响**：feedback.jsonl 中历史记录 ID 无法跨版本检索；用户被迫学两套规则
- **建议**：统一为 G1-G18 维度码，提供 v0.3 → v0.4 迁移映射
- **复查命令**：
  ```bash
  rg -n "GSEC|GLOGIC|GSCOPE" skill/ manifest.json
  rg -n 'gapIdFormat' manifest.json
  ```
- **反馈结论**：`accepted` → `fix-applied`（v0.4 已统一，详见本 commit）

### Finding #2 · 🔴 P0 · G14.M · 终极目标无可操作口径

- **定位**：`ROADMAP.md:5`
- **三法命中**：
  - [x] 反证法：如何判断"成为默认调用"已达成？无基线无分母
  - [x] 对照法：业界类似目标（DAU/MAU/采纳率）都有具体口径
  - [x] 边界法："默认调用"在 PR 评审中是 100% 触发还是 50% 触发即算？
- **证据**：`让"照一下"成为人类与 AI 协作中被默认调用的反身性环节。`
- **影响**：版本验收无客观尺子，团队对齐困难
- **建议**：替换为含 5 个量化指标 + 截止日期的 SMART 目标（已在 ROADMAP "终极目标 SMART 化" 章节落地）
- **反馈结论**：`accepted` → `fix-applied`

### Finding #4 · 🔴 P0 · G7 · "dogfood 数据回收中"不可证伪

- **定位**：`ROADMAP.md:4` + `dogfood-candidates.md:1-7`
- **三法命中**：
  - [x] 反证法：仓库内 0 条真实 dogfood 记录，回收的边界是什么？回收的产物存在何处？
  - [x] 对照法：开源项目通常用 issue 数 / 用户反馈数 / 文件数据可证伪
  - [x] 边界法：本身就是要照妖镜照的——"回收"无数据等于零
- **证据**：dogfood-candidates.md 自承全部为"抽象化案例模板"
- **影响**：v0.5 数据驱动人格的全部前提悬空；用户对项目状态产生错误预期
- **建议**：建立 `dogfood/` 目录，所有真实记录入仓；本次扫描作为 001
- **反馈结论**：`accepted` → `fix-applied`（本 commit 已建立目录 + 此为 001 号记录）

## 反馈与修复

| Finding ID | 反馈结论 | 修复轨迹 |
|------------|---------|---------|
| #1 G14.S | accepted → fix-applied | SKILL.md L393-465 统一 + 提供 v0.3→v0.4 迁移表 |
| #2 G14.M | accepted → fix-applied | ROADMAP.md 终极目标重写为 SMART 化 |
| #3 G3 | accepted → fix-applied | manifest.json compatibility + CHANGELOG 修正 |
| #4 G7 | accepted → fix-applied | 建立 dogfood/ 目录 + 本次记录 |
| #5-#8 | accepted | 部分入 v0.4，部分入 v0.5 backlog |
| #9-#10 | accepted | 入 v0.4 W2 顺手修正 |

## 下一步驱动的动作

1. ✅ 修复 4 个 P0（本次 commit）
2. ✅ 启动 v0.4 Gate 开发（Task #5-#11）
3. ✅ 本项目作为 v0.4 首个灰度用户，每次 commit 触发自照
4. ⏭ 待 W2 完成 G15-G18，开第二次自照（runs/002）
