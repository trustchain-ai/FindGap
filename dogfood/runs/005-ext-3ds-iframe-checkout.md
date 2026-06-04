---
scanId: R-20260604-005
scannedAt: 2026-06-04T10:00:00Z
scanner: self
scannerVersion: 0.7.0
artifact:
  path: dingtalk-prd/收银台内嵌认证改造方案
  type: spec
result:
  rulesTriggered: [G-NOGO, V-STAKE, R-DOD, V-NAME, I-ADR, G-WHY]
  sourcesFound: 12
  lowConfidenceItems: 0
feedback:
  collected: true
  useful: 0
  falsePositive: 0
---

## 背景

从钉钉多维表"收单产品需求表"拉取的真实 PRD。需求：将 3DS challenge 页面从整页跳转改为 iframe 内嵌展示，商户为海艺互娱（Seaart AI），期望 6.11 投产。

## 节点 ① 照

🎯 受众：评审者 → 先致命项 + 全量详情

| 命中 | 代号 | urgency |
|------|------|---------|
| ✅ | G-NOGO | 致命 |
| ✅ | V-STAKE | 致命 |
| ✅ | R-DOD | 阻塞 |
| ✅ | V-NAME | 阻塞 |
| ✅ | I-ADR | 可延后 |
| ✅ | G-WHY | 可延后 |

## 节点 ② 查

- G-NOGO: Apple Pay 在卡添加时已完成 3DS 认证，通常无需再触发 challenge；Google Pay PAN_ONLY 需走 3DS challenge，CRYPTOGRAM_3DS 不需要 | Ravelin + Paymentspedia
- V-STAKE: 部分发卡行 ACS 设置 X-Frame-Options: DENY 导致 iframe 白屏是已知行业问题 | Trust Payments + Cybersource 文档
- R-DOD: Cybersource 3DS Step-Up 完整流程含 5 步，iframe 展示仅为 Step 4 | Cybersource Developer
- V-NAME: Cybersource 区分 challenge required / challenge display / challenge verification 三阶段 | Cybersource Test Cases

## 节点 ③ 亮

致命 2 条：Pay Button 3DS 归属不清（G-NOGO）、iframe ACS 拒绝时交易闭环缺失（V-STAKE）
阻塞 2 条：验收条件缺失（R-DOD）、challenge 术语多义（V-NAME）
可延后 2 条：iframe vs redirect trade-off 无记录（I-ADR）、"不影响存量客户"缺度量（G-WHY）

## 反馈

| 命中 | 代号 | 判定 | 理由 |
|------|------|------|------|
| 1 | G-NOGO | TP | Pay Button 确实在/不在范围未决，"可能不可控"不是决策 |
| 2 | V-STAKE | TP | iframe 被 ACS X-Frame-Options 拒绝是行业已知问题，兜底标 optional 不合理 |
| 3 | R-DOD | TP | "6.11投产"无验收标准，三方对"投产"理解不同 |
| 4 | V-NAME | TP | challenge 一词在 PRD 中 10+ 处使用，无 glossary |
| 5 | I-ADR | TP | iframe 方案选择过程未留痕 |
| 6 | G-WHY | TP | 受益方明确但"不影响存量"缺度量 |
