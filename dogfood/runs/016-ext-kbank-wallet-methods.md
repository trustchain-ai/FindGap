---
scanId: R-20260604-016
scannedAt: 2026-06-04T13:40:00Z
scanner: self
scannerVersion: 0.7.0
artifact:
  path: prd/Kbank新增支付方式
  type: spec
result:
  rulesTriggered: [G-WHY, R-DOD, V-NAME, I-SSOT, V-STAKE, G-NOGO, S-QUANT, I-ADR, V-LAYER]
  sourcesFound: 4
  lowConfidenceItems: 4
feedback:
  collected: true
  useful: 10
  falsePositive: 0
---

## 背景

该 PRD 希望在泰国 Kbank 渠道一次性新增 WeChat、Alipay+、ShopeePay、LinePay 等支付方式，并同时覆盖 APP 拉起、PC 展码、S2S 与收银台，以及 refund / void / cancel / auth 等显著不同的能力集合。

## 节点 ① 照

| 命中 | 代号 | urgency | 原形句 |
|------|------|---------|--------|
| ✅ | G-WHY | 阻塞 | “Kbank 渠道新增 Wechat / Alipay+ / Shopeepay / LinePay 等支付方式” |
| ✅ | R-DOD | 阻塞 | “覆盖 APP 拉起、PC 展码、S2S、收银台” |
| ✅ | V-NAME | 阻塞 | “secret key / KYC / VA / 商户余额 / 返佣 / refund / void / cancel / auth” |
| ✅ | I-SSOT | 致命 | “Wechat / Alipay+ / Shopeepay / LinePay 等支付方式” |
| ✅ | V-STAKE | 致命 | “expiry、refund validity、refund 能力、cancel 能力差异很大” |
| ✅ | G-NOGO | 阻塞 | “新增多种支付方式，覆盖 APP 拉起、PC 展码、S2S、收银台” |
| ✅ | S-QUANT | 阻塞 | “多种支付方式”“多钱包”“差异很大” |
| ✅ | I-ADR | 致命 | “每个商户一个独立 secret key…邮件进件…月度返佣给渠道” |
| ✅ | V-LAYER | 阻塞 | “背景约束…需求范围…能力差异很大” |
| ✅ | V-STAKE-TODO | 致命 | “文档中有多处 todo / ???” |

## 节点 ② 查

- I-SSOT: 已检索到的 KBank 一方公开材料能明确确认 Alipay / Alipay+ 与 WeChat Pay，但对 ShopeePay、LINE Pay 没有找到同等强度的一方确认，说明支付方式清单与能力范围缺少单一真源。
- V-STAKE / V-STAKE-TODO / R-DOD: Alipay+、LINE Pay Thailand、Opn Thailand 等公开资料显示 refund validity、到账时效、PC 支持与退款能力都存在明显渠道差异，因此“差异很大”不能代替矩阵化定义，TODO 也不能留在定稿里。
- V-NAME / S-QUANT / G-NOGO: 外部资料能证明支付方式与能力边界高度异构，但无法替代本 PRD 自己钉死“多钱包”“首期范围”“哪些端必须支持”“哪些能力允许例外”。
- I-ADR / V-LAYER / G-WHY: 文档把密钥托管、KYC、结算返佣、技术能力与终端形态混写，且没有记录为何采用当前运营与清结算模型，这会让商务、技术与风控各自读成不同目标。

## 节点 ③ 亮摘要

致命 4 条：支付方式范围与能力矩阵没有单一真源，尤其 ShopeePay / LINE Pay 的 KBank 范围确认不足（I-SSOT）；支付失败、超时、取消、异步成功、退款失败、部分退款、auth/void 等状态闭环缺失（V-STAKE）；每商户独立 key、邮件 KYC、VA 结算与月返佣等关键选择没有 ADR（I-ADR）；PRD 内部仍留有 Alipay 环境、退款时效、PC 说明缺失等 TODO，直接卡住联调与上线（V-STAKE-TODO）。

阻塞 6 条：未写清为什么做这批支付方式与谁受益（G-WHY）；没有支付方式 × 终端 × 能力的完成定义（R-DOD）；结算与能力术语无 glossary（V-NAME）；同一期范围过宽却无首期优先序和不做项（G-NOGO）；“多种支付方式 / 多钱包 / 差异很大”边界不清（S-QUANT）；商务、准入、技术能力与终端形态混写（V-LAYER）。

## 反馈

| 命中 | 代号 | 判定 | 理由 |
|------|------|------|------|
| 1 | G-WHY | TP | PRD 只说新增支付方式，没有写清是扩支付覆盖、满足合作方要求还是提升转化。 |
| 2 | R-DOD | TP | 没有按支付方式 × 终端 × 能力给出验收矩阵，无法联调和测试。 |
| 3 | V-NAME | TP | VA、多钱包、refund/void/cancel/auth 都是跨团队高歧义词。 |
| 4 | I-SSOT | TP | 公开一方材料未充分支撑全部支付方式范围，清单本身就需要单一真源。 |
| 5 | V-STAKE | TP | “差异很大”只说明存在复杂性，没有定义状态机、失败路径和补偿闭环。 |
| 6 | G-NOGO | TP | 同期覆盖多方式、多端、多能力，却没给 phase-1 边界和不做项。 |
| 7 | S-QUANT | TP | “多种”“多钱包”“差异很大”都是开放型表述，没有数量和边界。 |
| 8 | I-ADR | TP | 密钥、KYC、清结算链路和返佣模型都属于后续会反复追问的关键取舍。 |
| 9 | V-LAYER | TP | 商务规则、准入流程、技术能力和终端形态被混在同一层表达。 |
| 10 | V-STAKE-TODO | TP | 环境联通、退款到账时效和 PC 端覆盖仍是 TODO，会直接影响实现与用户文案。 |