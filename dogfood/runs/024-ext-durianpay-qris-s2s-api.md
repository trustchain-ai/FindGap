---
scanId: R-20260604-024
scannedAt: 2026-06-04T14:25:00Z
scanner: ext
scannerVersion: 0.7.0
artifact:
  path: prd/DurianPay QRIS S2S对客API展码优化
  type: spec
result:
  rulesTriggered: [R-DOD, I-SSOT, V-STAKE, I-ADR, G-NOGO, V-LAYER, V-NAME]
  sourcesFound: 4
  lowConfidenceItems: 3
feedback:
  collected: true
  useful: 7
  falsePositive: 0
---

## 背景

该 PRD 讨论 DurianPay QRIS 的 S2S 对客接口优化。现状是 GCS 商户请求展码时无法正确解析二维码，导致无法复用现有代码系统，因此希望对外稳定返回 `qr_code`、`paymentRedirectUrl`、`qrUrl` 三个字段，并在渠道不返完整字段时由 PP 侧解析或包装补齐。

## 节点 ① 照

| 命中 | 代号 | urgency | 原形句 |
|------|------|---------|--------|
| 1 | R-DOD | 致命 | “线上商户和线下商户都确认可直接变更。” |
| 2 | I-SSOT | 致命 | “实际对客返回必须包含 qr_code、paymentRedirectUrl、qrUrl 三种字段。qr_code/qrUrl 如渠道不返回，PP 自行解析组装；paymentRedirectUrl 由 PP 包装。” |
| 3 | V-STAKE | 致命 | “qr_code/qrUrl 如渠道不返回，PP 自行解析组装；paymentRedirectUrl 由 PP 包装。” |
| 4 | I-ADR | 阻塞 | “方案一图片识别，研发不建议；方案二定制解析渠道返回数据。” |
| 5 | G-NOGO | 阻塞 | “缺少 qr_code 导致客户无法复用现有代码系统，不愿继续推进。” |
| 6 | V-LAYER | 阻塞 | “影响…字段要求…PP 自行解析组装…线上商户和线下商户都确认可直接变更。” |
| 7 | V-NAME | 阻塞 | “GCS 商户调用 S2S 接口请求 QRIS 展码时，无法正确解析二维码。” |

## 节点 ② 查

- EMVCo Merchant-Presented QR 的公开资料区分 QR Code image 与 payload data，并提供独立校验入口，支持 I-SSOT / V-NAME / V-STAKE：这里必须先说清“解析二维码”到底是解析图片、payload 字符串还是渠道返回对象，以及 PP 补齐后的校验与失败路径。
- TemanQRIS 文档同时给出 qris、qr_image、payment_link.url，并单列 webhook_url 与 callback_url，支持 R-DOD / I-SSOT：QR 串、图片 URL、跳转 URL、异步通知通常是分开的契约对象，不能只写“补三个字段”。
- NICEPAY QRIS 文档区分 redirect payment URL、callback 参数与 QR image 下载，支持 V-STAKE / V-LAYER：字段契约、异步流程与失败回退通常需要分层描述，而不是揉在一段里。
- Bank Indonesia QRIS 官方页说明 QRIS 属于标准化互通体系，支持 I-ADR：更接近行业方向的是解析结构化返回而非做图片识别，但“不建议 OCR”的具体原因仍需内部准确率、时延、成本或运维复杂度数据补充。

## 节点 ③ 亮摘要

致命 3 条：'可直接变更' 没有对应验收口径，三字段是否都必返、为空时如何处理、解析失败返回码、兼容窗口都未出现，联调双方会各自定义 done（R-DOD）；“必须包含 qr_code、paymentRedirectUrl、qrUrl”却未定义三字段的唯一语义与来源边界，`qr_code` 是码串、解码文本还是图片内容，`qrUrl` 是图片地址还是临时链接，`paymentRedirectUrl` 是跳转页还是查询页都不清楚（I-SSOT）；只写了补齐字段的 happy path，未写图片不可识别、payload 非标准、PP 组装后校验失败、线上/线下商户回滚降级等失败闭环（V-STAKE）。

阻塞 4 条：方案一与方案二只给结论，不写为什么不选图片识别、为什么接受定制解析的维护成本，决策不可追溯（I-ADR）；目标是让客户继续推进，但没有写本次只覆盖 DurianPay QRIS 还是所有渠道，只补字段还是顺带改状态查询与通知流，范围边界不清（G-NOGO）；业务推进目标、商户诉求与字段实现手段混在同一层，缺少从业务问题到接口契约的承接层（V-LAYER）；“解析二维码”“展码”“对客返回”“包装”等词都未建 glossary，不同团队会把它们映射到不同层次对象（V-NAME）。

## 反馈

| 命中 | 代号 | 判定 | 理由 |
|------|------|------|------|
| 1 | R-DOD | TP | 公开 QRIS 文档通常把可交付契约写成可验证字段与流程，而原文没有完成口径、异常处理或兼容窗口。 |
| 2 | I-SSOT | TP | qr string、qr image、redirect/payment link 在行业里常是不同契约对象，若不定义唯一语义与来源边界，极易形成同名异义。 |
| 3 | V-STAKE | TP | 支付类公开文档普遍把异步通知、回调、状态变化单列为一等流程，原文没写解析失败、校验失败、降级/回滚。 |
| 4 | I-ADR | TP | 公共材料能支持“优先解析结构化 payload 而非识图”的方向，但 PRD 没写准确率、时延、成本或维护性 trade-off。 |
| 5 | G-NOGO | TP | 不同 QRIS 提供方字段集合与流程差异较大，不写范围与非目标，单渠道优化很容易膨胀成通用改造。 |
| 6 | V-LAYER | TP | 该段把业务目标、商户诉求和实现手段揉在一起，是典型的文档分层问题。 |
| 7 | V-NAME | TP | EMVCo 与 TemanQRIS 都区分 QR image 与 payload/string，原文只说“解析二维码”确实术语含混。 |
