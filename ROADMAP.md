# Roadmap · 照妖镜

> 详细版本规划。每版的设计哲学、实现机制、Day 1 动作、验收标准、退出条件。

---

## 设计哲学（不可违反）

1. **每版可独立验证**：不依赖未发布版本
2. **不严格线性依赖**：允许跳跃路径
3. **学术证据钉死什么不做**：永久砍掉操作性记忆（Einstellung / Confirmation Bias / Alarm Fatigue / Catastrophic Remembering 四条机制）
4. **不可被吸收性押在 know-how 上**：差异化建立在领域分类法 + 反共识产品观
5. **每版 4-6 周业余时间完成**
6. **SKILL.md 体积上限 25KB**
7. **领域 know-how > 工程能力**：能用 prompt 解决就不写代码

---

## v0.1.0 · Skill 文件（草稿）

### 范围

- 12KB / 302 行 SKILL.md
- 4 阶段流水线：Detect → Decide → Eliminate → Converge
- 8 类 gap（G1-G8）
- 24 项决策矩阵
- 4 类领域 checklist（PRD / 技术方案 / PR / 决策）
- 6 条红线

### 状态

`draft` — 已发布，未经生产验证

---

## v0.2.0 · Gap 识别能力大扩展（当前已发布）⭐

> **核心翻转**：原计划做"记忆机制"被永久砍掉（基于 4 条学术机制证据），重排为"识别能力 + SMART + 平台无关"。

### 范围

- **10.5KB SKILL.md**（精简后，G9-G14 详细信号迁到 `references/gap-taxonomy.md`）
- **G1-G14 共 41 子项 gap**：
  - G1-G8 v0.1 基础逻辑层
  - G9 行业最佳实践（8 子项）
  - G10 历史失败模式（8 子项）
  - G11 跨域类比（7 子项）
  - G12 监管合规（10 子项）
  - G13 认知盲点（8 子项）
  - G14 SMART 双向（5 子项：S/M/A/R/T）
- **认知 3 分法独立扫描**（known-unknown / unknown-unknown / known-flawed-preference）
- **扫描矩阵正交结构**：14 gap × 3 视角 = 42 组合
- **SMART 双向应用**：约束 AI 输出 + 扫描产物 unSMART 表达
- **同行业对标 Tier 1-3**：内置 `benchmarks/` 标杆库（PRD + 技术方案）+ web search 兜底 + 编造禁令
- **ROI 三维评分**：truth_score / importance_score / urgency_score
- **平台无关化**：支持 10+ 平台
- **SELF_INSTALL.md**：任意 agent 自我集成
- **manifest.json**：机器可读元数据
- **10 条红线**（v0.1 6 条 + 新增 4 条）

### 永久砍掉（基于学术证据）

| 砍掉项 | 学术依据 |
|--------|---------|
| 已审产物指纹/去重 | Einstellung 效应（Bilalić 2008） |
| dismiss 黑名单 | Alarm Fatigue（Cvach 2012） |
| 历史 gap 缓存复用 | Confirmation Bias（Nickerson 1998） |
| 优先级权重学习 | Catastrophic Remembering（French 1999） |

### 准确率目标

| 指标 | v0.1 | v0.2 目标 |
|------|------|----------|
| 召回率 | ~45-55% | **85-92%** |
| Critical/High 召回 | — | **≥ 95%** |
| 可接受误报率 | — | 25-30% |

### 状态

✅ **已发布** — GitHub: https://github.com/290963249/zhaoyaojing

---

## v0.3 · Tier-1 标杆库扩展（计划中，3-4 周）

### 核心机制

把 `benchmarks/` 从 2 域扩到 10+ 域，覆盖高频场景：

| 新增标杆 | 用途 |
|---------|------|
| `code-review-checklist.md` | 代码 PR 审查 |
| `api-design.md` | REST/GraphQL/版本演进 |
| `payment-pos.md` | 支付/POS 幂等/对账/PCI-DSS |
| `im-push.md` | IM/推送 弱网/离线/重连 |
| `upload-sync.md` | 数据上传/同步 断点续传/去重 |
| `scheduling.md` | 任务调度 幂等/失败重试/锁 |
| `threat-model.md` | STRIDE/数据流图 |
| `data-schema.md` | Schema 演进/兼容/约束 |
| `observability.md` | metrics/logs/traces |
| `_meta/failure-modes.md` | Knight Capital / AWS S3 等 30+ 范式 |
| `_meta/compliance-checklists.md` | PCI-DSS / GDPR / PIPL / SOC2 反向清单 |

### 验收标准

1. 10 个新标杆文件，每个 ≥ 30 条具体检查项
2. SKILL.md 体积保持 ≤ 25KB
3. 在 10-15 份历史真实产物 dogfood，召回率达标

---

## v0.4 · 反向审视协议（计划中，2 周，零依赖）

### 核心机制

**5 种敌对人格** + 三层差异输出（零外部 API 依赖）：

| 人格 | 视角 |
|------|------|
| 怀疑论者 | 一切反向假设 |
| 极端用户 | 边界 case |
| 历史失败者 | 同类方案失败过 |
| 跨域专家 | 其他领域类比 |
| 监管者 | 合规视角 |

**三层差异输出**：
```
[HIGH-CONFIDENCE]  所有 5 种人格一致认可的
[LIKELY]           ≥ 3 种人格认可的
[DIVERGENT]        < 3 种人格认可的（强制呈现，不合并）
```

### 验收标准

1. 零配置下产出三层差异输出
2. 三层 gap 重合度 < 10%
3. 30-50 条历史真实 case baseline 测试通过

### Day 1 动作

```bash
mkdir evals/
# 准备 30-50 条历史真实 case + 人工标注 ground-truth gap 列表
```

**没有 baseline 数据，不写 v0.4 代码**。

---

## v0.5 · 异源对照（条件触发，+3 周）

**触发条件**：v0.4 baseline 实验显示，单副模型对 Claude 二轮自审的召回率提升 **≥ 15%**。否则永久砍掉。

### 核心机制

- **单副模型**：GPT-4o（JSON mode 最稳）
- **显式触发**：仅 `/zhaoyaojing --cross-check`
- **预算上限**：$5/月硬上限
- **降级**：超限自动降回 v0.4 并打印通知

### 退出条件

- baseline 召回率提升 < 15% → 砍掉 v0.5
- Anthropic / Cursor 推官方 multi-model second-opinion → deprecate

---

## 全局风险红线（任一触发即停）

| # | 触发 | 行动 |
|---|------|------|
| 1 | v0.2 上线 60 天用户数 < 50 | 暂停 v0.3 扩展，先优化文档/分发 |
| 2 | v0.4 baseline 副模型召回提升 < 15% | 砍掉 v0.5 |
| 3 | Anthropic / Cursor 推官方 multi-model | v0.5 deprecate |
| 4 | SKILL.md 突破 25KB | 立即拆 references/ 或 benchmarks/ |
| 5 | 用户反馈误报率 > 35% | 暂停新 gap 扩展，先调阈值 |

---

## 永久不会做的事

| 永远不做 | 原因 |
|---------|------|
| 操作性记忆（指纹/dismiss 黑名单/学习权重） | 4 条独立学术机制证伪 |
| MCP Server（动态执行型） | Skill 形态零部署优势更稳 |
| 自动 PR 提交 | 照妖镜不写代码，只识别 gap |
| 跨用户数据聚合 | 隐私 + 合规 + 用户主权 |

---

## 一句话总结

> **照妖镜把"识别能力"作为唯一主线，把"记忆/MCP/异源"等工程外壳全部砍到非核心位置，押在领域 know-how + 反共识产品观上——这是 v0.2 之后所有版本演进的不变定盘星。**
