---
scanId: R-20260604-014
scannedAt: 2026-06-04T13:30:00Z
scanner: self
scannerVersion: 0.7.0
artifact:
  path: prd/日本卷寿司（Netstars）-线上微信二维码支付优化
  type: spec
result:
  rulesTriggered: [I-SSOT, R-DOD, V-STAKE, G-WHY, V-NAME, I-ADR, V-LAYER, S-QUANT, S-NFR]
  sourcesFound: 4
  lowConfidenceItems: 3
feedback:
  collected: true
  useful: 9
  falsePositive: 0
---

## 背景

该 PRD 讨论日本线上收单场景下，Netstars WeChat Pay 需要按 PC / Mobile 终端来源切换产品码，并为 PC 展码补上 30 分钟倒计时，覆盖 checkout 与 S2S 两种接入模式。

## 节点 ① 照

| 命中 | 代号 | urgency | 原形句 |
|------|------|---------|--------|
| ✅ | I-SSOT | 致命 | “S2S 模式：由商户指定终端来源”“checkout 模式：由 PP 识别终端来源” |
| ✅ | R-DOD | 致命 | “根据终端来源适配不同产品码”“wechat 支付展码增加 30 分钟倒计时” |
| ✅ | V-STAKE | 致命 | “若未按要求上传则阻断交易”“PC 端不支持直接拉起 APP，Mobile 端拉起 APP 支付” |
| ✅ | G-WHY | 阻塞 | “现有 wechat 二维码支付无倒计时” |
| ✅ | V-NAME | 阻塞 | “checkout 模式”“S2S 模式”“产品码”“PP” |
| ✅ | I-ADR | 阻塞 | “wechat 支付展码增加 30 分钟倒计时” |
| ✅ | V-LAYER | 阻塞 | “根据终端来源适配不同产品码；PC 展码 / Mobile 拉起 APP” |
| ✅ | S-QUANT | 阻塞 | “若未按要求上传则阻断交易” |
| ✅ | S-NFR | 可延后 | 标题与正文均未定义识别准确率、回调一致性、倒计时误差 |

## 节点 ② 查

- I-SSOT / V-STAKE: Adyen 与 Worldline 都把 WeChat Pay desktop QR 与 mobile app / redirect 作为不同支付流处理，说明终端来源判定若没有统一字段、优先级与冲突规则，接口设计会直接分叉。
- R-DOD / I-ADR: Omise 与 MultiSafepay 公开资料显示 WeChat Pay 过期窗口差异显著，30 分钟倒计时并非行业常识，需要单独定义起点、到期动作与为什么选 30 分钟。
- G-WHY / V-NAME / V-LAYER: 外部资料能证明桌面/移动流语义确实不同，但无法替代本 PRD 对“terminal source / product code / checkout / S2S / PP”的术语钉死与分层定义。
- S-QUANT / S-NFR: 公开材料更多支持“边界与可靠性需要显式定义”，但具体准确率、倒计时漂移和回调 SLA 阈值仍主要依赖内部契约，因此这两项有一定低信心。

## 节点 ③ 亮摘要

致命 3 条：终端来源在 S2S 与 checkout 下分别由商户和 PP 决定，却没有统一字段、枚举与冲突处理（I-SSOT）；产品码映射、倒计时起点、超时后状态与刷新/重试规则未验收化（R-DOD）；未覆盖识别失败、拉起失败、超时后继续支付、晚到回调等交易闭环（V-STAKE）。

阻塞 6 条：未写清业务目标与收益归因（G-WHY）；关键术语无 glossary（V-NAME）；30 分钟阈值与职责分配没有 ADR（I-ADR）；业务规则、终端识别、前端交互、接口职责混写（V-LAYER）；“按要求上传”“PC/Mobile”缺边界（S-QUANT）；未定义识别准确率、状态一致性等非功能判据（S-NFR）。

## 反馈

| 命中 | 代号 | 判定 | 理由 |
|------|------|------|------|
| 1 | I-SSOT | TP | desktop QR 与 mobile app 流在公开 PSP 文档中本就分流，没有统一终端来源口径会直接分叉实现。 |
| 2 | R-DOD | TP | 功能名只描述方向，没有定义产品码映射、过期动作与状态机闭环，无法形成验收。 |
| 3 | V-STAKE | TP | 支付链路存在扫码、跳转与异步完成，缺失败路径会造成真实交易闭环缺口。 |
| 4 | G-WHY | TP | 背景只写现状与渠道约束，没有说明是为合规、成功率还是降流失。 |
| 5 | V-NAME | TP | terminal source、checkout、S2S、product code 等都是强领域词，不定义会跨角色错位。 |
| 6 | I-ADR | TP | 30 分钟过期策略与职责划分都不是通用常识，需要留下 why-not。 |
| 7 | V-LAYER | TP | 文档把渠道规则、识别职责、客户端行为和服务端路由混在同一层。 |
| 8 | S-QUANT | TP | “按要求上传”“PC/Mobile”都缺字段、取值和边界场景说明。 |
| 9 | S-NFR | TP | 识别、倒计时与异步回调相关需求没有可靠性指标，只能测 happy path。 |