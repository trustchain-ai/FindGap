---
scanId: R-20260604-023
scannedAt: 2026-06-04T14:20:00Z
scanner: ext
scannerVersion: 0.7.0
artifact:
  path: prd/Portal1.0账单通用能力-按最细支付粒度展示
  type: spec
result:
  rulesTriggered: [R-DOD, V-NAME, I-SSOT, G-NOGO, G-WHY, V-STAKE, V-LAYER]
  sourcesFound: 4
  lowConfidenceItems: 3
feedback:
  collected: true
  useful: 7
  falsePositive: 0
---

## 背景

该 PRD 片段希望面向 GCS 商户优化 Portal 账单展示：拆分 fee 明细、把 payment method 展示到更细支付粒度，并补充交易日与账单日等信息。但文本只给出事项清单和少量范围说明，没有把字段口径、适用面、历史兼容与父子交易归属写清，因此适合沉淀为一条完整的 v0.7 外照记录。

## 节点 ① 照

| 命中 | 代号 | urgency | 原形句 |
|------|------|---------|--------|
| 1 | R-DOD | 致命 | “拆分 fee 明细，新增多字段；payment method 细化到最小颗粒度；给商户清晰的交易日、账单日信息。” |
| 2 | V-NAME | 致命 | “最细支付粒度”“卡组-卡种-卡国家”“交易日”“账单日”“原交易”“子交易” |
| 3 | I-SSOT | 致命 | “新增字段对原交易填写，子交易默认空。” |
| 4 | G-NOGO | 阻塞 | “fee 明细改 1.0，计费颗粒度改 1.0+2.0，调账备注不在本需求范围。” |
| 5 | G-WHY | 阻塞 | “仅针对 GCS 商户。” |
| 6 | V-STAKE | 阻塞 | “新增字段对原交易填写，子交易默认空。” |
| 7 | V-LAYER | 可延后 | “仅针对 GCS 商户；fee 明细改 1.0，计费颗粒度改 1.0+2.0；新增字段对原交易填写。” |

## 节点 ② 查

- Shift4 的 merchant statement glossary 与 statement breakdown 文档表明，账单/报表系统通常会把 statement terms、fee sections、date semantics 单独定义，支持 R-DOD / V-NAME：如果不先定义粒度、日期口径和字段边界，页面、导出与对账报表会各自实现。
- Reach 的 settlement-report glossary 进一步支持 V-NAME：transaction date、settlement date、statement date 这类时间字段通常是不同语义对象，不能只写“清晰的交易日、账单日”。
- Bank of America 的 statement reconciliation 指南把 statement clarity 与 sales、deposits、disputes、adjustments、fees 的对账闭环绑定，支持 G-WHY：账单展示需求通常需要明确要解决哪类 reconciliation 成本，而不只是“展示增强”。
- Finix 的 split-transactions 资料说明父子交易或拆分交易需要明确 reporting behavior 与字段归属，支持 I-SSOT / V-STAKE：若新增字段只填原交易、子交易默认空，却不说明查询、展示、导出如何消费，口径会直接分叉。部分“版本范围为什么这样切”仍主要属于内部决策缺失，公共资料只能弱佐证。

## 节点 ③ 亮摘要

致命 3 条：'按最细支付粒度展示' 没定义最细到哪一级、在哪些页面/账单/导出中生效，数据模型和接口无法稳定收敛（R-DOD）；payment method 粒度、交易日/账单日、原交易/子交易都缺单一口径，不同团队会实现成不同字段体系（V-NAME）；前文要求细化到最小颗粒度，后文又规定新增字段只填原交易、子交易默认空，原子级信息到底挂在哪一层并不明确（I-SSOT）。

阻塞 4 条：范围里同时写了“fee 明细改 1.0”与“计费颗粒度改 1.0+2.0”，但没说明历史兼容、覆盖关系与 Portal1.0 实际展示范围（G-NOGO）；只写面向 GCS 商户，没写要消除哪类对账分歧、申诉成本或账单理解成本（G-WHY）；卡国家缺失、子交易为空、历史账单无新字段、1.0 与 2.0 粒度冲突时，Portal 展示和导出行为都未说明（V-STAKE）；业务范围、版本策略和字段落点混写在一段里，Why / Scope / How 三层来回切换（V-LAYER）。

## 反馈

| 命中 | 代号 | 判定 | 理由 |
|------|------|------|------|
| 1 | R-DOD | TP | 文本只列 desired changes，没有 granularity、affected surfaces、date semantics 等可测试验收条件。 |
| 2 | V-NAME | TP | payment-method granularity、card brand/type/country、transaction date、statement date、original/child transaction 都是行业里通常会单独定义的域词。 |
| 3 | I-SSOT | TP | 细粒度字段被要求新增，但又只填原交易、子交易留空，确实形成了字段归属的双读法。 |
| 4 | G-NOGO | TP | 1.0 与 1.0+2.0 并存，却不说明 precedence、coexistence 或 history compatibility，实现路径会分叉。 |
| 5 | G-WHY | TP | PRD 说明了 대상商户与要做什么，但没说明具体业务问题与成功指标。 |
| 6 | V-STAKE | TP | 片段没有定义缺失 country、空子交易、历史账单无新字段、冲突版本时的回退或默认行为。 |
| 7 | V-LAYER | TP | 业务范围、版本策略与实现/数据放置规则被揉在一起，是直接可见的结构问题。 |
