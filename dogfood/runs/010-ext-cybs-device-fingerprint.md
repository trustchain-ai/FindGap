---
scanId: R-20260604-010
scannedAt: 2026-06-04T12:30:00Z
scanner: self
scannerVersion: 0.7.0
artifact:
  path: dingtalk-prd/原生SDK集成CYBS设备信息采集SDK
  type: spec
result:
  rulesTriggered: [R-DOD, G-WHY, V-STAKE, G-NOGO, I-SSOT, I-ADR, V-NAME, S-NFR, V-LAYER, S-QUANT]
  sourcesFound: 6
  lowConfidenceItems: 3
feedback:
  collected: true
  useful: 0
  falsePositive: 0
---

## 背景

补齐原生 SDK 风控信息采集能力，接入 CyberSource 设备指纹 SDK（Android + iOS）。PRD 业务价值章节为空白。

## 节点 ① 照

| 命中 | 代号 | urgency |
|------|------|---------|
| ✅ | R-DOD | 致命 |
| ✅ | G-WHY | 致命 |
| ✅ | V-STAKE | 致命 |
| ✅ | G-NOGO | 阻塞 |
| ✅ | I-SSOT | 阻塞 |
| ✅ | I-ADR | 阻塞 |
| ✅ | V-NAME | 阻塞 |
| ✅ | S-NFR | 阻塞 |
| ✅ | V-LAYER | 可延后 |
| ✅ | S-QUANT | 可延后 |

## 节点 ② 查

- G-WHY: Visa/CyberSource 公开数据显示 Decision Manager 结合设备指纹可降低欺诈率 30-50%，但 PRD 未给出己方基线 | 行业常识（来源不足，标注低信心）
- V-STAKE: CyberSource 收到空 fingerprintSessionId 时风控模型降级评估，可能导致更多交易被标记高风险或直接拒绝——"传空值"不是无害降级 | CyberSource Decision Manager 文档
- I-SSOT: Session ID 生成时机在两段描述中矛盾——"页面载入"是 Web 概念，原生 SDK 场景应为"初始化"或"打开支付页面" | 行业常识

## 节点 ③ 亮

致命 3 条：无验收条件 + 6组件不知做几个（R-DOD）、业务价值空白（G-WHY）、失败路径仅"传空值"但空值可能导致交易被拒（V-STAKE）
阻塞 5 条：6组件无优先序（G-NOGO）、session ID 生成时机矛盾（I-SSOT）、为什么选 CYBS 无记录（I-ADR）、术语多义（V-NAME）、"采集失败"无判据（S-NFR）
可延后 2 条：信息流混层（V-LAYER）、"一次性"边界未定义（S-QUANT）

## 反馈

| 命中 | 代号 | 判定 | 理由 |
|------|------|------|------|
| 1 | R-DOD | TP | 6 组件无一标注必选/可选 |
| 2 | G-WHY | TP | 业务价值章节物理上为空 |
| 3 | V-STAKE | TP | 空 session ID 进 CYBS 可能导致交易被拒 |
| 4 | G-NOGO | TP | 隐私权限组件是否本期做未决 |
| 5 | I-SSOT | TP | "页面载入"vs 原生 SDK 初始化 |
| 6 | I-ADR | TP | 为什么选 CYBS 无记录 |
| 7 | V-NAME | TP | 设备指纹/设备信息/session 多义 |
| 8 | S-NFR | TP | "采集失败"无判定条件 |
| 9 | V-LAYER | TP | Why/How 混层 |
| 10 | S-QUANT | TP | "一次性发送"无重试策略 |
