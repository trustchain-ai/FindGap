# Dogfood 数据采集规范

> 每条 `runs/NNN-*.md` 文件必须遵循此规范。规范本身随 v0.4 启动一同发布，后续如有重大变更需在本文件顶部追加 changelog。

---

## 文件命名

```
runs/{NNN}-{type}-{slug}.md
```

- `NNN`：三位编号，从 `001` 开始单调递增（不复用、不跳号）
- `type`：`self`（自照）/ `ext`（外照）/ `agent`（agent 自动触发）
- `slug`：场景 kebab-case 短描述，≤6 词

示例：
- `001-self-v04-bootstrap.md`
- `002-self-v04-phase0-design.md`
- `015-ext-prd-payment.md`（外部 PRD，已脱敏）

## 必填字段（YAML frontmatter）

```yaml
---
scanId: R-YYYYMMDD-NNN
scannedAt: ISO 8601 UTC
scanner: self | ext | agent
scannerVersion: 0.4.0
artifact:
  path: <相对路径或 URL>
  gitSha: <被扫描时的 git sha，可选>
  type: PRD | tech-spec | code | decision | dialog | self-meta
phase0:                          # v0.4 起必填
  verdict: PASSED | BLOCKED | WARNING
  readinessScore: 0-100
  blockedCount: N
  warningCount: N
findings:
  p0: N
  p1: N
  p2: N
  p3: N
feedback:
  collected: true | false
  conclusions: [accepted: N, rejected: N, known: N, fix-applied: N]
---
```

## 正文章节（推荐顺序）

1. **背景**：为什么扫这个？(1 段)
2. **Phase 0 结果**：门禁判定与阻断项详情
3. **Findings 全表**：v0.3 双轨报告格式
4. **关键 finding 详细分析**：选 P0/P1 的 1-3 条做四件套展开
5. **反馈与修复**：用户对每条 finding 的反馈结论 + 修复痕迹
6. **下一步**：本次扫描驱动了哪些后续动作（commit/issue/PR）

## 真伪鉴别

为防止"造数据交差"，每条 dogfood 记录必须满足：

- [ ] `artifact.path` 指向真实存在文件（CI 可校验）
- [ ] `artifact.gitSha`（若有）在 git history 中真实存在
- [ ] `findings` 计数与文中 finding 个数一致
- [ ] P0/P1 finding 含 file:line:col 或文档锚点
- [ ] feedback 字段如 `collected: true` 则必须有对应 jsonl 条目

`dogfood/feedback.jsonl` 是反馈权威来源；`runs/` 是过程留痕。

## 红线

- ❌ 不得为补数据虚构 finding
- ❌ 不得跨产物迁移历史 finding（违反 SKILL.md 红线 8）
- ❌ 不得删除 runs/ 中已发布记录（必要时改名为 `NNN-*.md.deprecated.md` 并在内容顶部注明驳回理由）
- ✅ 允许在 runs/ 内对同一产物进行多轮扫描（用 `{NNN}-{slug}-r2.md` / `-r3.md` 后缀）
