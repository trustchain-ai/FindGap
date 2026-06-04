---
scanId: R-20260604-011
scannedAt: 2026-06-04T13:00:00Z
scanner: self
scannerVersion: 0.7.0
artifact:
  path: prd/Portal1.0-资金对账单更新-增加POS-SN-结算日期字段
  type: spec
result:
  rulesTriggered: [I-SSOT, S-QUANT, V-NAME, R-DOD, V-STAKE]
  sourcesFound: 4
  lowConfidenceItems: 2
feedback:
  collected: true
  useful: 5
  falsePositive: 0
---

## 背景

Portal 1.0 资金对账单计划新增 POS SN、MID、TID 与“结算日期/SettleTime”字段，覆盖日/周/月/自定义账单与多国 POS 交易。

## 节点 ① 照

| 命中 | 代号 | urgency |
|------|------|---------|
| ✅ | I-SSOT | 致命 |
| ✅ | S-QUANT | 致命 |
| ✅ | V-NAME | 致命 |
| ✅ | R-DOD | 阻塞 |
| ✅ | V-STAKE | 阻塞 |

## 节点 ② 查

- I-SSOT: Trust Payments 与 Adyen 都将 settlement date、settlement time、terminal/report 字段拆开定义，支持“结算日期”与 `SettleTime` 不应混写为同一语义 | Trust Payments + Adyen
- V-NAME: Tyro 明确区分 MID、TID，行业文档也常将 terminal serial number 与 terminal ID 分列，说明 POS SN/MID/TID 不是可互换名词 | Tyro + Adyen
- R-DOD: Antom 公开 transaction details schema，印证报表字段新增必须定义输出契约、空值与验收样例，不能只写“加列” | Antom
- S-QUANT / V-STAKE: 多国、多渠道、多历史账单范围与下游消费方影响存在真实风险，但本轮外部证据更多是领域侧佐证，标注低信心 | 低信心

## 节点 ③ 亮摘要

致命 3 条："结算日期" 与 `SettleTime` 同时出现且要求精确到秒（I-SSOT）、"所有新消费商户" 加国家省略号边界未闭合（S-QUANT）、POS SN/MID/TID 无 glossary（V-NAME）
阻塞 2 条：只写加字段与列顺序、未定义空值/历史账单/API/UI 验收（R-DOD）、未覆盖老数据缺字段、POS 信息缺失、跨时区与下游脚本影响（V-STAKE）

## 反馈

| 命中 | 代号 | 判定 | 理由 |
|------|------|------|------|
| 1 | I-SSOT | TP | “结算日期”与 `SettleTime` 混用，date/timestamp 两种实现都会自洽但彼此冲突。 |
| 2 | S-QUANT | TP | “所有”与国家省略号同时出现，无法判断是否含未来国家、历史账单与非 POS 混合场景。 |
| 3 | V-NAME | TP | 行业中 MID、TID、terminal serial number 分属不同标识层级，这里未统一术语。 |
| 4 | R-DOD | TP | 缺少字段空值、历史回补、下载/API/UI 同步与跨时区样例等完成定义。 |
| 5 | V-STAKE | TP | 未说明老账单、缺 POS SN、跨时区 merchant 与下游消费方如何对齐。 |
