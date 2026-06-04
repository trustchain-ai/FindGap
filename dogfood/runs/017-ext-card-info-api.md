---
scanId: R-20260604-017
scannedAt: 2026-06-04T13:45:00Z
scanner: self
scannerVersion: 0.7.0
artifact:
  path: prd/线下卡支付接口返回卡信息（开放API）
  type: spec
result:
  rulesTriggered: [S-QUANT, R-DOD, I-SSOT, V-NAME, I-ADR, V-STAKE, G-WHY, G-NOGO, V-LAYER]
  sourcesFound: 4
  lowConfidenceItems: 3
feedback:
  collected: true
  useful: 7
  falsePositive: 2
---

## 背景

该 PRD 希望让线下卡支付开放 API 对客返回 card brand、境内/境外卡、信用/借记/联营卡与发卡行信息，并声明范围覆盖所有国家，但同时承认各国与渠道在 BIN、发卡行与字段可得性上差异很大。

## 节点 ① 照

| 命中 | 代号 | urgency | 原形句 |
|------|------|---------|--------|
| ✅ | S-QUANT | 致命 | “需求范围覆盖所有国家” |
| ✅ | R-DOD | 阻塞 | “渠道侧获取卡 bin…交易侧根据卡 bin 查询卡信息…对客返回卡信息” |
| ✅ | I-SSOT | 致命 | “目前 issuerBankName 字段里塞了卡组，本期修复” |
| ✅ | V-NAME | 阻塞 | “卡品牌、境内卡/境外卡、信用卡/借记卡/联营卡、发卡行、卡组” |
| ✅ | I-ADR | 致命 | “cardBrand 对客枚举与内部 brand 映射复杂，部分品牌直接透出卡bin库值” |
| ✅ | V-STAKE | 阻塞 | “各国/渠道可获取字段差异很大，例如 HK 场景目前拿不到前6卡号与部分发卡行信息” |
| ✅ | G-WHY | 阻塞 | “客户要求卡支付返回…” |
| ✅ | G-NOGO | 阻塞 | “需求范围覆盖所有国家” |
| ✅ | V-LAYER | 可延后 | “issuerBankName…cardBrand / cardType / issuerBankCountry 为新增字段” |

## 节点 ② 查

- S-QUANT / V-STAKE: Visa、Mastercard、Paya 等公开资料都说明 BIN 元数据可得性受 6/8 位 BIN、网络覆盖和服务等级影响，不可能天然在“所有国家”均匀可用，因此国家边界、缺失字段与降级策略必须显式定义。
- R-DOD / V-NAME: OpenAPI 与 API 兼容性资料明确区分 required、optional、nullable 与 enum 演进，这支持“哪些字段必返、缺失时怎么返回、对客枚举如何定义”必须在 PRD 中定死。
- I-SSOT / I-ADR: 当旧字段语义变更且新增相关字段时，公共 API 设计需要稳定语义源与迁移规则；对客枚举有时映射、有时透传也属于必须记录理由的契约选择。
- G-WHY / V-LAYER: 缺少业务目标与分层表达是文档弱点，但外部证据更多支持契约清晰性要求，因此这两项验证相对偏弱。

## 节点 ③ 亮摘要

致命 3 条：宣称覆盖所有国家，但没有定义国家边界、例外与字段缺失时的统一处理（S-QUANT）；issuerBankName 历史上承载卡组、本期又新增 cardBrand 等字段，却没有唯一真源、兼容期与迁移规则（I-SSOT）；cardBrand 对客枚举有的映射有的透传卡 bin 库值，但没有 ADR 解释为什么这样做（I-ADR）。

阻塞 6 条：没有定义哪些字段必返/选返、缺失时 null/unknown/省略字段如何处理（R-DOD）；卡品牌、卡组、brand、issuerBankCountry 等术语未统一（V-NAME）；字段拿不到、查不到 BIN、命中多条、历史客户端兼容等失败路径未写（V-STAKE）；“客户要求”没有明确业务收益（G-WHY，验证偏弱）；全量国家覆盖与实际可得性冲突时缺少不做项与部分支持规则（G-NOGO）；目标层与字段实现层混写（V-LAYER，验证偏弱）。

## 反馈

| 命中 | 代号 | 判定 | 理由 |
|------|------|------|------|
| 1 | S-QUANT | TP | 卡 BIN 元数据公开上就存在国家、网络和服务等级差异，“所有国家”没有边界不成立。 |
| 2 | R-DOD | TP | API 契约必须定义必返、可选、可空与缺失时行为，否则无法稳定发布。 |
| 3 | I-SSOT | TP | 旧字段语义变更且新增相关字段时，若无迁移规则就会破坏语义一致性。 |
| 4 | V-NAME | TP | issuer country、brand、funding source、product/card type 在公开资料里本就是不同属性。 |
| 5 | I-ADR | TP | 有的品牌映射、有的品牌透传，会改变公共枚举契约，必须记录取舍理由。 |
| 6 | V-STAKE | TP | 公开资料明确允许 issuer 信息缺失或精度受限，因此降级与回滚必须预先定义。 |
| 7 | G-WHY | FP | 缺业务目标是写作弱点，但本次可核证据主要支持契约问题，不足以稳定证明此项。 |
| 8 | G-NOGO | TP | 全球上线前若不允许部分国家/渠道部分支持，实施和测试边界都会失控。 |
| 9 | V-LAYER | FP | 这更像文档结构问题，外部证据不足以证明它单独构成稳定缺陷。 |