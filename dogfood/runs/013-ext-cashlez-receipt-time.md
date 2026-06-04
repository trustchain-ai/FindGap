---
scanId: R-20260604-013
scannedAt: 2026-06-04T13:20:00Z
scanner: self
scannerVersion: 0.7.0
artifact:
  path: prd/Cashlez-终端功能时间取值优化
  type: spec
result:
  rulesTriggered: [I-SSOT, V-NAME, V-STAKE, R-DOD, I-ADR]
  sourcesFound: 4
  lowConfidenceItems: 2
feedback:
  collected: true
  useful: 5
  falsePositive: 0
---

## 背景

Cashlez 印尼终端出现终端打票时间与服务端查询时间不一致的问题，PRD 要求后续统一按终端本地 Create Time 展示与打印，并对历史订单保留旧逻辑回退。

## 节点 ① 照

| 命中 | 代号 | urgency |
|------|------|---------|
| ✅ | I-SSOT | 致命 |
| ✅ | V-NAME | 阻塞 |
| ✅ | V-STAKE | 致命 |
| ✅ | R-DOD | 阻塞 |
| ✅ | I-ADR | 阻塞 |

## 节点 ② 查

- I-SSOT: AWS Kinesis 与 Timestream 文档都强调 event time、processing time、late-arriving data 需要分开定义，支持 terminal local create time / channel create time / receipt time 不应混写 | AWS Kinesis + AWS Timestream
- V-NAME: Microsoft Style Guide 要求时间表达包含清晰语义与时区上下文，支撑“终端时间/本地时间/Create Time/DateTime/打票时间”不能交替混用 | Microsoft Style Guide
- V-STAKE / R-DOD: Stripe Terminal 离线支付与退款文档都单独讨论收据字段、离线场景与退款流程，说明只写 happy path 不足以覆盖终端票据时间需求 | Stripe Terminal
- I-ADR: ADR 的通行目的就是记录关键方案为何成立；这里直接给出统一口径与回退原则，却没写 trade-off | Martin Fowler

## 节点 ③ 亮摘要

致命 2 条：terminal local Create Time、channel create time、server poll time、receipt print time 未做单一语义定义（I-SSOT）、只定义有值/无值两条 happy path，未覆盖时钟错误、离线补单、退款撤销继承规则等异常（V-STAKE）
阻塞 3 条：终端时间/本地时间/Create Time/DateTime/打票时间等名词无 glossary（V-NAME）、哪些页面/接口/模板必须一致及历史单边界未验收化（R-DOD）、未记录为何统一取终端时间而非渠道时间/双字段并存（I-ADR）

## 反馈

| 命中 | 代号 | 判定 | 理由 |
|------|------|------|------|
| 1 | I-SSOT | TP | 多个时间语义并存但未定义来源、时区与精度，展示与打印口径会直接分叉。 |
| 2 | V-NAME | TP | 关键时间名词交替使用，产品、客户端、服务端和测试会各自按不同含义实现。 |
| 3 | V-STAKE | TP | 未覆盖终端时钟错误、离线/补单、退款撤销等边界，无法形成实现和测试闭环。 |
| 4 | R-DOD | TP | 缺少页面、接口、打印模板、一致性与历史兼容边界的完成定义。 |
| 5 | I-ADR | TP | 已选定统一口径与回退原则，却没有记录为何这样取舍。 |
