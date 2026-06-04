---
scanId: R-20260604-008
scannedAt: 2026-06-04T11:30:00Z
scanner: self
scannerVersion: 0.7.0
artifact:
  path: dingtalk-prd/渠道拒付映射码对客逻辑更新
  type: spec
result:
  rulesTriggered: [I-SSOT, V-STAKE, R-DOD, S-QUANT, G-WHY, S-PERF, V-LAYER]
  sourcesFound: 12
  lowConfidenceItems: 0
feedback:
  collected: true
  useful: 0
  falsePositive: 0
---

## 背景

渠道拒付映射码存在同一 code 被多个渠道使用但含义不同的问题。需改造为 PayMethod+Channel+Reason code 三重校验。

## 节点 ① 照

| 命中 | 代号 | urgency |
|------|------|---------|
| ✅ | I-SSOT | 致命 |
| ✅ | V-STAKE | 致命 |
| ✅ | R-DOD | 阻塞 |
| ✅ | S-QUANT | 阻塞 |
| ✅ | G-WHY | 阻塞 |
| ✅ | S-PERF | 可延后 |
| ✅ | V-LAYER | 可延后 |

## 节点 ② 查

- I-SSOT: "6字段均要填写"但未列出具体字段；Reason code 数据类型未定义（Visa 十进制 10.4 / Mastercard 四位数 4837 / Amex 字母数字 F14）| Chargebacks911 + Shoplazza
- V-STAKE: 三重校验匹配不到时无降级路径；Verifi 对返回空值/格式错误会拒绝，争议直接升级为拒付 | Chargeback.io + Corepay
- S-QUANT: "目标商户：all"——LPM 商户不使用卡组织原因码体系 | Stripe + Chargebacks911

## 节点 ③ 亮

致命 2 条：复合主键字段格式未定义（I-SSOT）、匹配失败无降级路径（V-STAKE）
阻塞 3 条：无验收条件（R-DOD）、"all"边界不清（S-QUANT）、痛点无量化（G-WHY）
可延后 2 条：效率提升无数字（S-PERF）、Why/How 混层（V-LAYER）

## 反馈

| 命中 | 代号 | 判定 | 理由 |
|------|------|------|------|
| 1 | I-SSOT | TP | "6字段"未列出，Reason code 格式跨卡组织差异大 |
| 2 | V-STAKE | TP | 匹配失败 = 争议升级为拒付，是 P0 场景 |
| 3 | R-DOD | TP | 无验收条件 |
| 4 | S-QUANT | TP | "all"含义模糊，LPM 商户不在同一体系 |
| 5 | G-WHY | TP | 不准确导致的后果未量化 |
| 6 | S-PERF | TP | "极大提升效率"无数字 |
| 7 | V-LAYER | TP | 业务价值段混入实现方案 |
