# Roadmap · 照妖镜

> 详细版本规划。每版的设计哲学、实现机制、Day 1 动作、验收标准、退出条件。

---

## 设计哲学（不可违反）

1. **每版可独立验证**：不依赖未发布版本
2. **不严格线性依赖**：允许跳跃路径（如 v0.1 → v0.4 Layer-0）
3. **条件触发的二阶段交付**：每个版本拆 alpha + beta，alpha 必做、beta 看数据决定是否启动
4. **不可被吸收性押在 know-how 上**：差异化建立在领域分类法 + 反共识产品观，不是工程外壳
5. **每版 4-6 周业余时间完成**：超过即砍范围
6. **SKILL.md 体积上限 25KB**：突破即重排或拆子文件
7. **领域 know-how > 工程能力**：能用 prompt 解决就不写代码

---

## v0.1 · Skill 文件（已发布草稿）

**真实状态**：`draft`（已发布、未经生产验证）

### 范围

- 12KB / 302 行 SKILL.md
- 4 阶段流水线：Detect → Decide → Eliminate → Converge
- 8 类 gap（G1-G8）
  - G1 主观锚词未量化 / G2 隐含假设未声明 / G3 角色心智漂移 / G4 未问的关键问题
  - G5 来源缺失 / G6 反例缺失 / G7 不可证伪 / G8 责任真空
- 24 项决策矩阵（8 gap × 3 手段，按 ROI 排序）
- Phase 3 的 6 类执行能力（规则匹配 / web search / 跨域合成 / 反例生成 / Pre-mortem / 领域 checklist）
- Phase 4 收敛规则（severity_score = high×3 + medium×1，3 轮上限）
- 4 类领域 checklist（A1 PRD / A2 技术方案 / A3 代码 PR / A4 决策选型）
- 6 条红线不变量
- 触发/反触发条件 + 标准化输出模板

### 未完成

- examples/ 目录无真实 case 沉淀
- 零用户反馈机制
- 零命中率 / 误报率数据
- 跨会话记忆缺失 → v0.2
- 第三方客户端兼容缺失 → v0.3
- 异源对照缺失 → v0.4
- Phase 3 外部调用上限实测压测
- "合同/协议" / "对话/沟通" / "其他" 三类产物 checklist 缺失

---

## v0.2-alpha · 持久化骨架（4 周）

**设计哲学**：先稳 schema，不做学习闭环。让 v0.3/v0.4 有数据底座，但不被 schema 错误绑死。

### 核心机制

**项目本地存储**（不是全局 `~/.zhaoyaojing/`）：

```
cwd/.zhaoyaojing/
├── SCHEMA.md           # 字段语义冻结 + 保留字段
├── gaps.jsonl          # 按项目累积的 gap 实例
└── archive/            # ≥ 10k 行后归档
    └── gaps.YYYYMM.jsonl
```

**项目根自动检测**（按优先级）：
1. 当前目录到根目录链路上找 `.zhaoyaojing/`
2. 找 `.git/`
3. 找 `package.json` / `pyproject.toml` / `Cargo.toml`
4. 兜底：`$HOME/.zhaoyaojing/`

**Schema 显式版本化**（每行 JSONL 必须含）：

```json
{
  "v": "0.2-alpha",
  "fp_algo": "v1",
  "ts": "2026-06-01T00:00:00Z",
  "session_id": "...",
  "artifact_type": "PRD",
  "gap_id": "G4",
  "severity": "high",
  "hit_evidence": "(前 100 字)",
  "fingerprint": "(sha1 前 8 字符)",
  "accepted": {"ok": null, "signal": null, "confidence": null},
  "extra": {}
}
```

**SKILL.md 新增章节**（≤ 3KB 增量）：

- §A（顶部）：项目根定位伪代码 + no-persist 降级
- Phase 0 Recall：跳过（alpha 不做召回，避免冷启动偏见）
- Phase 1 修改：新增「复发」列，按 `gap_id` 粒度（非 fingerprint）grep -c 统计
- Phase 5 Persist（Phase 4 后）：仅追加 gap，不读、不学习
- 隐私章节：完全本地 + 清理命令 + `--no-memory` 临时禁用

### Day 1 动作

```bash
# 1. 在 SKILL 目录新建 SCHEMA.md，写死字段语义
touch ~/.claude/skills/zhaoyaojing/SCHEMA.md

# 2. 在 SKILL.md 顶部加 §A 项目根定位伪代码（仅伪代码，不动 Phase 流水线）

# 3. 不写任何 append 逻辑（留到 Week 2）
```

**唯一目标**：SCHEMA.md 内容冻结 + §A 路径定位写完。**今天不允许写持久化代码**。

### 4 周里程碑

- **Week 1**：SCHEMA.md 冻结 + §A 项目根定位
- **Week 2**：Phase 5 Persist append 逻辑 + no-persist 降级 + 健康自检
- **Week 3**：Phase 1 新增「复发」列（gap_id 粒度）+ `.gitignore` 模板
- **Week 4**：5-8 个真实 case 自测拨测 + README + 隐私章节

### 验收标准

1. `gaps.jsonl` 跨会话可读、git diff 友好、append 不丢数据
2. no-persist 模式下行为字节级等同 v0.1（CI / 静默 / 无 cwd 场景）
3. SKILL.md 体积增量 ≤ 3KB
4. 4 周内本人自用积累 ≥ 30 条真实 gap
5. 30 天后导出审计 Phase 5 写入率 ≥ 80%

### 退出条件（触发即停）

- Phase 5 写入率 < 80% → Skill prompt 不可靠，转 hook/MCP 或彻底放弃持久化
- 30 天单项目 gap 实例 < 30 条 **或** 同语义重复 < 5 次 → v0.2-beta 永久搁置

---

## v0.2-beta · 反馈学习（条件触发，+3-4 周）

**触发条件**：v0.2-alpha 30 天后真有重复 pattern（同语义 gap ≥ 5 次）。否则永久停留 alpha。

### 核心机制

- **LLM-as-fingerprint**：用模型直接判定语义等价（替代 sha1 字面匹配）
- **被动批注**：每条 gap 带短 ID（如 `G-7a3`），用户回复中 `!ignore G-7a3` / `!confirm G-7a3` 即解析，不打断对话流
- **双文件**：`blacklist.yaml`（永久忽略）+ `domain-hints.yaml`（项目特定权重）
- **决策矩阵升级**：Phase 2 选手段时，先 read feedback，对每个 (gap_id, means) 算 acceptance_rate；若 < 30% 且样本 ≥ 5，自动降权

### 验收标准

1. 同语义 gap 复发能用 LLM-fingerprint 准确识别 ≥ 80%
2. 被动批注解析率 ≥ 95%（用户用语随机性下）
3. 决策矩阵降权后 acceptance_rate 提升 ≥ 15%

---

## v0.3 · MCP Server（4-5 周）

**定位翻转**：不假装隐式触发，**显式照妖镜**——在 Cursor/Cline 里主动调一次。

### 核心机制

**单一事实源解耦**：

```
prompts/zhaoyaojing-core.md   # 中立 prompt，无 Skill 运行时语法
    │
    ├── ~/.claude/skills/zhaoyaojing/SKILL.md    # Skill 派生
    └── mcp-server/zhaoyaojing_check tool         # MCP 派生
```

**单 tool**：`zhaoyaojing_check(text, domain)` → 8 类 gap + 推荐手段 + checklist 覆盖缺口

**Tier 1 客户端**：仅承诺 Claude Desktop + Cursor，CI 双端 snapshot diff 回归

**部署**：仅 stdio（砍掉 SSE/HTTP，推到 v0.5）

**Schema 版本化**：返回 `schema_version: "0.3"` + 预留 `context: { sessionId, actor, tenant }` 入参（v0.3 不使用）

### Day 1 动作

```bash
# 从 SKILL.md 抽取 prompts/zhaoyaojing-core.md
# 跑 contract test：v0.1 Skill 用新 core 渲染，输出 diff 必须 = 0
```

**只有 diff = 0 才能动 TS server 代码**。

### 4-5 周里程碑

- **Week 1**：抽 core prompt + SemVer 契约 + contract test
- **Week 2**：TS MCP server 骨架 + `zhaoyaojing_check` tool + stdio 调通 Claude Desktop
- **Week 3**：Cursor 接入 + 跨客户端 snapshot diff 回归集（3 个黄金样本）
- **Week 4**：错误处理 / 超时 / 降级 + npx 一键分发
- **Week 5**：文档 + 已知限制声明

### 验收标准

1. Claude Desktop + Cursor 两端 snapshot diff = 0
2. Core prompt 任何 breaking change 触发双端同步发版
3. 输出 JSON schema 稳定字段不变（add-only）
4. 60 天活跃用户 ≥ 50

### 退出条件

- 60 天 DAU < 50 → deprecate v0.3，不投入扩 Tier 2 客户端，不投入 SSE/HTTP

---

## v0.4 Layer-0 · 反向审视协议（2 周，零依赖）

**主轴翻转**：从「调多家模型」改为「**拒绝合并、拒绝投票、强制把分歧端到用户面前**」。

### 核心机制

**5 种敌对人格**（SKILL.md 新增 prompt）：
- 怀疑论者（一切反向假设）
- 极端用户（边界 case）
- 历史失败者（同类方案失败过）
- 跨域专家（其他领域类比）
- 监管者（合规视角）

**三层差异输出**：

```
[HIGH-CONFIDENCE]  所有 5 种人格一致认可的
[LIKELY]           ≥ 3 种人格认可的
[DIVERGENT]        < 3 种人格认可的（强制呈现，不合并）
```

**零外部依赖**：纯 Claude，无 API key，无成本。

### Day 1 动作

```bash
# 建 evals/ 目录
mkdir evals/

# 准备 30-50 条历史真实 case + 人工标注 ground-truth gap 列表
# Week 1 内完成 baseline 实验脚本（Python，一次性，不进 Skill）
```

**没有这份 baseline 数据，不写一行 v0.4 代码**。

### 2 周里程碑

- **Week 1**：evals/ + baseline 实验 + Go/No-Go 决策
- **Week 2**：SKILL.md 新增 §V0.4-L0 章节（5 人格 + 三层呈现）

### 验收标准

1. 在零配置下产出三层差异输出
2. 三层呈现的 gap 重合度（HIGH ∩ LIKELY ∩ DIVERGENT）< 10%
3. baseline 实验数据公开

---

## v0.4 Layer-1 · 异源对照（条件触发，+3 周）

**触发条件**：v0.4 Layer-0 baseline 实验显示，副模型对 Claude 二轮自审的召回率提升 **≥ 15%**。否则砍掉。

### 核心机制

- **单副模型**：GPT-4o 优先（JSON mode 最稳），砍 Gemini 和 DeepSeek
- **显式触发**：仅 `/zhaoyaojing --cross-check`（**砍掉** confidence 自动升级和语义识别二次触发）
- **预算上限**：$5/月硬上限（不是 $10）
- **降级**：超限自动降回 Layer-0 并打印通知
- **兼容**：`--legacy-output` 兼容 v0.3 单源输出

### 验收标准

1. Layer-1 关闭时与 v0.3 输出字节级等同
2. baseline 实验召回率提升 ≥ 15% 才发布
3. 月度预算硬上限触顶自动降级，永不静默超支

### 退出条件

- baseline 召回率提升 < 15% → 砍掉 Layer-1，只发 Layer-0
- Anthropic / Cursor 推出官方 multi-model second-opinion → 立即 deprecate Layer-1

---

## 全局风险红线（任一触发即停）

| # | 触发 | 行动 |
|---|------|------|
| 1 | v0.2-alpha 4 周后 Phase 5 写入率 < 80% | Skill prompt 持久化不可靠，转 hook/MCP 或彻底放弃持久化 |
| 2 | v0.2-alpha 30 天后单项目 gap < 30 或同语义重复 < 5 | v0.2-beta 永久搁置，预算转 v0.4 Layer-0 |
| 3 | v0.3 上线 60 天 Tier 1 DAU < 50 | deprecate v0.3，不扩 Tier 2 客户端 |
| 4 | v0.4 baseline 副模型召回率提升 < 15% | 砍掉 Layer-1，只发 Layer-0 |
| 5 | Anthropic / Cursor 推出官方 project-scoped persistent memory | v0.2 存储层迁移到官方 API，回归"纯方法论 Skill" |
| 6 | Anthropic / Cursor 推出官方 multi-model second-opinion | v0.4 Layer-1 立刻 deprecate |
| 7 | 任何一版 SKILL.md 突破 25KB | 立即停止增章节，先压缩重排或拆子文件 |

---

## 一句话总结

> **v0.2 做持久化骨架不锁 schema、v0.3 做单 tool 显式照妖镜不假装隐式触发、v0.4 主轴是"拒绝合并、强制呈现分歧"而非"调多家模型"——三版都用条件触发的二阶段交付绑死止损线，把照妖镜的不可被吸收性押在领域 know-how 和反共识产品观上，而不是工程外壳上。**
