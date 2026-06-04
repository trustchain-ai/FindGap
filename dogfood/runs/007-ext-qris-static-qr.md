---
scanId: R-20260604-007
scannedAt: 2026-06-04T11:00:00Z
scanner: self
scannerVersion: 0.7.0
artifact:
  path: dingtalk-prd/渠道能力接入-静态码能力-Durianpay
  type: spec
result:
  rulesTriggered: [I-SSOT, V-STAKE, G-WHY, R-DOD, V-NAME, I-ADR, G-NOGO, S-QUANT, V-LAYER]
  sourcesFound: 11
  lowConfidenceItems: 0
feedback:
  collected: true
  useful: 0
  falsePositive: 0
---

## 背景

印尼 QRIS 静态码接入，核心挑战是渠道 webhook 仅回传 MID，平台需要归属到具体终端。PRD 设计了四级归属链路但一期仅做强绑定。

## 节点 ① 照

| 命中 | 代号 | urgency |
|------|------|---------|
| ✅ | I-SSOT | 致命 |
| ✅ | I-SSOT | 致命 |
| ✅ | V-STAKE | 致命 |
| ✅ | G-WHY | 阻塞 |
| ✅ | R-DOD | 阻塞 |
| ✅ | V-NAME | 阻塞 |
| ✅ | I-ADR | 阻塞 |
| ✅ | G-NOGO | 阻塞 |
| ✅ | S-QUANT | 可延后 |
| ✅ | V-LAYER | 可延后 |

## 节点 ② 查

- I-SSOT(1): Durianpay webhook 仅提供 MID，QRIS 静态码 TLV 负载不含 Terminal ID——四级归属链路在 webhook 场景下物理上无法走通 | Durianpay docs + QRIS 规范
- I-SSOT(2): 核心原则定义 ACCID:POS SN = 1:N，一期限制 1:1，建表按哪个？若按 1:1 建唯一约束，二期扩展需改主键 = schema breaking change | ResearchGate + Modern Treasury
- V-STAKE: 异常池无消费机制/超时策略/告警阈值/replay 机制。行业要求 DLQ 定义保留期(7-30天)、深度告警(~10条)、最老事件年龄告警(>1h) | Webhook Reliability 2026 + HookRay

## 节点 ③ 亮

致命 3 条：归属链路模型 vs webhook 实际数据矛盾（I-SSOT）、一期 1:1 vs 原则 1:N 数据模型冲突（I-SSOT）、异常池/补偿流程无定义（V-STAKE）
阻塞 5 条：缺目标量化（G-WHY）、零验收标准（R-DOD）、术语混乱（V-NAME）、决策无记录（I-ADR）、无"不做"列表（G-NOGO）
可延后 2 条：对账复用未论证（S-QUANT）、Why/How 混层（V-LAYER）

## 反馈

| 命中 | 代号 | 判定 | 理由 |
|------|------|------|------|
| 1 | I-SSOT | TP | 四级链路与渠道仅回传 MID 的事实矛盾 |
| 2 | I-SSOT | TP | 1:1 vs 1:N 建模未决 |
| 3 | V-STAKE | TP | 异常池只有一句话，无消费/告警/replay |
| 4 | G-WHY | TP | 无商户数/交易量/资损规模 |
| 5 | R-DOD | TP | 7+ 功能模块零验收标准 |
| 6 | V-NAME | TP | 静态码唯一标识/StaticQrId/TID 三词混用 |
| 7 | I-ADR | TP | "默认取第一条"策略无备选方案记录 |
| 8 | G-NOGO | TP | 一期/二期拆分无技术债务边界 |
| 9 | S-QUANT | TP | 静态/动态码对账复用未论证 |
| 10 | V-LAYER | TP | 需求背景混写业务目标与字段名 |
