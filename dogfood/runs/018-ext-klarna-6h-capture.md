---
scanId: R-20260604-018
scannedAt: 2026-06-04T13:50:00Z
scanner: self
scannerVersion: 0.7.0
artifact:
  path: prd/Shopify-Klarna-auth成功后6h强制capture
  type: spec
result:
  rulesTriggered: [I-SSOT, V-STAKE, I-ADR, R-DOD, V-NAME, G-NOGO, S-QUANT, G-WHY]
  sourcesFound: 4
  lowConfidenceItems: 2
feedback:
  collected: true
  useful: 8
  falsePositive: 0
---

## 背景

该 PRD 为缓解 Shopify V2 物流 APP 未上架、商品信息缺失导致的 Klarna partial refund 失败客诉，计划把特定 Shopify Klarna 交易在 auth 成功后、无商品信息且 6 小时未 capture 时强制 capture，并在 V2 物流 APP 上架后再恢复原有节奏。

## 节点 ① 照

| 命中 | 代号 | urgency | 原形句 |
|------|------|---------|--------|
| ✅ | I-SSOT | 致命 | “3 个工作日”“3 自然日”“3 天” |
| ✅ | V-STAKE | 致命 | “提前 capture 会提前结算” |
| ✅ | I-ADR | 致命 | “内部商品信息补偿每 4h 一次…把强制 capture 时间…缩短到 6 小时” |
| ✅ | R-DOD | 阻塞 | “白名单商户中…强制 capture 时间从 3 天缩短到 6h” |
| ✅ | V-NAME | 阻塞 | “支付成功”“auth 成功”“无商品信息”“强制 capture”“白名单商户” |
| ✅ | G-NOGO | 阻塞 | “V2 物流 APP 上架后，再改回 3 自然日” |
| ✅ | S-QUANT | 阻塞 | “来自 Shopify…无商品信息…达到 6h 且未 capture” |
| ✅ | G-WHY | 可延后 | “partial refund 会失败，引发客诉” |

## 节点 ② 查

- V-STAKE: Klarna 官方文档明确把 capture 与发货/履约绑定，且未 capture 时更接近 cancel / release authorization 而非 refund，因此“提前 capture”会直接碰履约、退款与结算边界，不只是时间参数修改。
- I-SSOT / R-DOD / V-NAME: 一旦基线时间在“3 个工作日 / 3 自然日 / 3 天”之间摇摆，定时器窗口、账期理解、命中条件与验收都会落到不同版本；同时“支付成功 / auth 成功 / capture 成功”也必须区分状态节点。
- I-ADR / G-NOGO / S-QUANT: 已知商品补偿每 4h 一次，但没有解释为何阈值选 6h、为何白名单先行、哪些历史单/重试单/人工补录单排除在外，说明该临时方案缺少明确 trade-off 与退出边界。
- G-WHY: 背景确实解释了客诉来源，但量化目标、商户影响范围与预期下降幅度仍未定义，因此该项成立但相对次要。

## 节点 ③ 亮摘要

致命 3 条：同一 capture 基线被写成“3 个工作日 / 3 自然日 / 3 天”，缺少单一事实源（I-SSOT）；提前 capture 改写交易闭环，却没有误捕获处理、退款/取消边界和失败回退（V-STAKE）；商品补偿 4h 一次的已知前提下，6h 阈值与白名单策略没有 ADR（I-ADR）。

阻塞 5 条：验收只写“3 天→6h”，没有时间起点、边界订单、监控与回滚口径（R-DOD）；“支付成功 / auth 成功 / 无商品信息 / 白名单商户”无 glossary（V-NAME）；临时方案何时退出、谁负责收口未写（G-NOGO）；范围缺排除项，如历史单、重试单、人工补录单（S-QUANT）；客诉背景存在但收益目标仍未量化（G-WHY）。

## 反馈

| 命中 | 代号 | 判定 | 理由 |
|------|------|------|------|
| 1 | I-SSOT | TP | 同一时间基线出现三种版本，会直接影响定时任务、账期和验收定义。 |
| 2 | V-STAKE | TP | Klarna capture 与发货/履约约束绑定，误捕获和资金链路边界不能留白。 |
| 3 | I-ADR | TP | 已知补偿周期为 4h，却没有说明为什么阈值是 6h 而不是其他窗口。 |
| 4 | R-DOD | TP | 验收只改一个数字，没有定义起点、样例、监控与撤回条件。 |
| 5 | V-NAME | TP | 支付成功、auth 成功和 capture 成功是不同状态节点，不定义会跨角色错位。 |
| 6 | G-NOGO | TP | “APP 上架后改回 3 自然日”没有退出条件与责任人，容易变长期分叉逻辑。 |
| 7 | S-QUANT | TP | 命中条件虽多，但没有排除历史单、重试单、人工补录单等边界。 |
| 8 | G-WHY | TP | 只写客诉背景，没有写影响商户范围与期望收益口径。 |