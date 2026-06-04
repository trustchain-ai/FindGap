---
scanId: R-20260604-012
scannedAt: 2026-06-04T13:10:00Z
scanner: self
scannerVersion: 0.7.0
artifact:
  path: prd/GCS线下QRIS渠道包统一方案-通用
  type: spec
result:
  rulesTriggered: [I-SSOT, V-NAME, V-LAYER, R-DOD, G-WHY, G-NOGO, V-STAKE]
  sourcesFound: 4
  lowConfidenceItems: 4
feedback:
  collected: true
  useful: 7
  falsePositive: 0
---

## 背景

GCS 希望解决同一门店副屏展码与 POS 展码同时调用 Durianpay QRIS 时的渠道包冲突，本期聚焦印尼 QRIS，文中同时提到统一兼容、渠道包合并与场景区分。

## 节点 ① 照

| 命中 | 代号 | urgency |
|------|------|---------|
| ✅ | I-SSOT | 致命 |
| ✅ | V-NAME | 致命 |
| ✅ | V-LAYER | 致命 |
| ✅ | R-DOD | 阻塞 |
| ✅ | G-WHY | 阻塞 |
| ✅ | G-NOGO | 阻塞 |
| ✅ | V-STAKE | 阻塞 |

## 节点 ② 查

- I-SSOT / V-LAYER: Bank Indonesia 官方说明 QRIS 涉及 mode、switching 与 routing，Durianpay 也将 QRIS 作为独立 API 能力发布，说明“统一兼容”“渠道包合并”“业务场景键”不能混成一句话 | Bank Indonesia + Durianpay
- V-NAME: BI 明确区分 MPM 与 CPM；若 POS线下、S2S线上、副屏展码、Checkout 等内部词不映射到官方/通道路径语义，下游会产生不同接口理解 | Bank Indonesia
- R-DOD: “解决无法同时调用”缺少可验证完成态，外部材料能证明集成行为具体，但不能替代本 PRD 的验收定义 | 低信心
- G-WHY / G-NOGO / V-STAKE: 受益方、阶段排除项、失败回退路径都是真问题；公开资料更多强化支付流边界必须明确，细部判断仍以文档内证据为主 | 低信心

## 节点 ③ 亮摘要

致命 3 条：统一兼容/兼容包/渠道包合并/Durianpay vs DurianpayOnsite 没有单一真源（I-SSOT）、POS线下/S2S线上/副屏展码/Checkout 等关键名词无 glossary（V-NAME）、业务目标与路由主键混写（V-LAYER）
阻塞 4 条：没有可验证完成态（R-DOD）、未写清是 KKV 特例止血还是平台化通用能力（G-WHY）、本期/下期与 Checkout/旧逻辑兜底边界不清（G-NOGO）、缺失场景缺参/错传/未迁移时的回退与止损定义（V-STAKE）

## 反馈

| 命中 | 代号 | 判定 | 理由 |
|------|------|------|------|
| 1 | I-SSOT | TP | “统一兼容方案”“渠道包合并”“Durianpay / DurianpayOnsite”会导向两套不同实现。 |
| 2 | V-NAME | TP | QRIS 官方有 MPM/CPM 等明确模式，内部场景名若不映射会造成接口和路由分叉。 |
| 3 | V-LAYER | TP | Why 与 How 混在同一规则表达里，无法判断“业务场景”是需求语义还是系统主键。 |
| 4 | R-DOD | TP | 只说“解决无法同时调用”，没有成功率、兼容性、迁移或灰度验收条件。 |
| 5 | G-WHY | TP | 未明确是单客户止血还是沉淀通用能力，也没有收益锚点。 |
| 6 | G-NOGO | TP | 本期不做什么未写清，Checkout、旧逻辑兜底与适用商户边界都可能被扩写。 |
| 7 | V-STAKE | TP | 缺失败路径、回滚与受影响方定义，上线与客服排障都会各自假设。 |
