# Dogfood 聚合统计

> 截至 2026-06-04 v0.8 口径

## 历史统计（v0.3-v0.4 时期，归档保留）

以下数据来自 v0.3-v0.4 时期的自照，使用的是已废弃的方法论（4 阶段流水线 / G1-G18 / P0-P3 严重度）。保留为项目演进轨迹，不作为 v0.7+ 基线。

| 指标 | 数值 |
|------|------|
| Total runs | 4（全部自照）|
| 外照 runs | 0 |
| 使用方法论 | v0.3 4 阶段 / v0.4 Phase 0 / v0.5 PASS/FAIL |

详见 `runs/001-004` 各记录。

## v0.7 / v0.8 基线统计（截至 2026-06-04）

| 指标 | 数值 |
|------|------|
| 三节点真实记录 | 20 |
| 已完成编号 | 005-024 |
| 外部用户记录（E2） | 0 |
| 当前阶段 | baseline 已产出，进入 v0.8 测量校准 |

## 分母定义

| 分母 | 定义 |
|------|------|
| perRun | 每条 `/照` 记录算 1 |
| perHit | 每条命中项算 1 |
| perActionableHit | 每条被判为 TP 且有可操作修复路径的命中项算 1 |
| perUniqueRuleOccurrence | 每条规则在每次 run 中最多算 1 |

## Correctness（按 strata 分层展示）

### E1：内部操作者评公开提示词

| 指标 | 数值 |
|------|------|
| 样本数 | 20 |
| totalHits | 154 |
| totalTp | 151 |
| totalFp | 3 |
| overall precision | 0.9805 |

### E2：真实外部用户

| 指标 | 数值 |
|------|------|
| 样本数 | 0 |
| totalHits | 0 |
| totalTp | 0 |
| totalFp | 0 |
| overall precision | N/A |

## Usefulness signals（与 correctness 分栏）

> 当前 v0.7 样本只稳定支持 correctness，不支持把 adoption / rewrite 当作 detector quality 证据。

| 信号 | 当前状态 |
|------|----------|
| isActionableHit | 待 v0.8 记录 |
| isAdopted | 待 v0.8 记录 |
| isPromptRewritten | 待 v0.8 记录 |
| didReduceDisagreement | 待 v0.8 记录 |

## 高频模式（20 条样本）

- I-SSOT：字段/主键/路由/时间/状态语义的单一真源问题最频繁
- V-NAME：术语未定义，产品/研发/测试/运营容易各自脑补
- R-DOD：字段新增、支付方式矩阵、关单、自动退款、账单口径等需求缺少可测完成态
- V-STAKE：超时、晚到回调、空值、历史兼容、迁移、退款/争议/客服/财务边界常未写
- I-ADR：阈值和策略选择经常直接给结论，没有 why-not
- G-NOGO / S-QUANT：阶段边界与排除项缺失，范围容易膨胀

## 下一里程碑

- 先补 `protocol.md` / `conventions.md` 的 v0.8 计量协议
- 首批 E1 样本验证字段完整率与独立判定可操作性
- 再进入 E2 外部灰度
- 最后根据 E1/E2 结果决定是否强化高 ROI 规则
