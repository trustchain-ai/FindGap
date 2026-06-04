---
scanId: R-20260604-009
scannedAt: 2026-06-04T12:00:00Z
scanner: self
scannerVersion: 0.7.0
artifact:
  path: dingtalk-prd/V5.1API升级-错误码整合
  type: spec
result:
  rulesTriggered: [I-SSOT, V-NAME, V-STAKE, R-DOD, I-ADR, G-NOGO, G-WHY, S-QUANT, V-LAYER]
  sourcesFound: 13
  lowConfidenceItems: 1
feedback:
  collected: true
  useful: 0
  falsePositive: 0
---

## 背景

整合 V5 API 已上线接口的错误码，将 response body 外层 code 与 platform 统一错误码映射。需求名称写 V5.1 但接口路径全部是 v4。

## 节点 ① 照

| 命中 | 代号 | urgency |
|------|------|---------|
| ✅ | I-SSOT | 致命 |
| ✅ | V-NAME | 致命 |
| ✅ | V-STAKE | 致命 |
| ✅ | R-DOD | 阻塞 |
| ✅ | I-ADR | 阻塞 |
| ✅ | G-NOGO | 阻塞 |
| ✅ | G-WHY | 可延后 |
| ✅ | S-QUANT | 可延后 |
| ✅ | V-LAYER | 可延后 |

## 节点 ② 查

- I-SSOT: API 版本路径配置不当引发 404 生产事故是常见问题，未管理的 API 变更造成 40% 集成失败 | CSDN + Theneo
- V-NAME: "code"一词四义（acq code / result_code / platform code / 文中泛称），支付系统返回码需分三层管理 | 人人都是产品经理 + Adyen
- V-STAKE: 已上线接口改 response body = breaking change，行业最佳实践要求至少两版本并行 + 6个月弃用通知期 | Speakeasy + Redocly + 微信支付

## 节点 ③ 亮

致命 3 条：V5.1 vs v4 版本号矛盾（I-SSOT）、"code"一词四义无 glossary（V-NAME）、已上线接口无迁移/回滚方案（V-STAKE）
阻塞 3 条：无验收条件（R-DOD）、错误码分层无 ADR（I-ADR）、无"不做"列表（G-NOGO）
可延后 3 条：收益不可衡量（G-WHY）、"已上线接口"边界模糊（S-QUANT）、Why/How 混层（V-LAYER）

## 反馈

| 命中 | 代号 | 判定 | 理由 |
|------|------|------|------|
| 1 | I-SSOT | TP | V5.1 vs v4 矛盾客观存在 |
| 2 | V-NAME | TP | code 一词四义确实会导致联调歧义 |
| 3 | V-STAKE | TP | 改已上线接口无迁移方案 = breaking change |
| 4 | R-DOD | TP | 无验收条件 |
| 5 | I-ADR | TP | 200/非200 分治方案无决策记录 |
| 6 | G-NOGO | TP | 5 个接口是否穷举未确认 |
| 7 | G-WHY | TP | "优化体验"无可衡量指标 |
| 8 | S-QUANT | TP | "已上线接口"边界模糊 |
| 9 | V-LAYER | TP | 业务价值混入字段名 |
