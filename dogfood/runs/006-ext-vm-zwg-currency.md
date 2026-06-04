---
scanId: R-20260604-006
scannedAt: 2026-06-04T10:30:00Z
scanner: self
scannerVersion: 0.7.0
artifact:
  path: dingtalk-prd/VM卡组直连新增交易币种ZWG
  type: spec
result:
  rulesTriggered: [R-DOD, I-SSOT, V-STAKE, G-NOGO, V-NAME, I-ADR, S-QUANT, V-LAYER, S-PERF]
  sourcesFound: 14
  lowConfidenceItems: 1
feedback:
  collected: true
  useful: 0
  falsePositive: 0
---

## 背景

P0 紧急需求，为沐瞳科技新增津巴布韦币（ZWG）交易支持。涉及交易/退款/拒付/风控/清结算/账务六大模块。

## 节点 ① 照

🎯 受众：评审者 → 先致命项 + 全量详情

| 命中 | 代号 | urgency |
|------|------|---------|
| ✅ | I-SSOT | 致命 |
| ✅ | R-DOD | 致命 |
| ✅ | V-STAKE | 致命 |
| ✅ | G-NOGO | 阻塞 |
| ✅ | V-NAME | 阻塞 |
| ✅ | I-ADR | 阻塞 |
| ✅ | S-QUANT | 阻塞 |
| ✅ | V-LAYER | 可延后 |
| ✅ | S-PERF | 可延后 |

## 节点 ② 查

- I-SSOT: ZWL 于 2024.9.1 被 ISO 4217 正式退役（Amendment 177），Visa 不再接受 ZWL/932 授权请求 | RBZ 官方 + ISO + Visa Developer
- V-STAKE: ZWG 上线 5 个月贬值 42.55%，2025 预期再贬 52%，汇率波动极端 | Serrari Group + Equity Axis
- R-DOD: 跨境支付新币种接入需覆盖 AML/KYC 合规、FX 管理、结算对账、失败路由四维度验收 | Cross-Border Compliance Checklist + Kani Payments

## 节点 ③ 亮

致命 3 条："保留 ZWL"与 ISO/Visa 退役事实矛盾（I-SSOT）、六模块零验收条件（R-DOD）、高波动货币无降级/熔断/告警（V-STAKE）
阻塞 4 条：ZWL/ZWG 并行无优先序（G-NOGO）、术语歧义（V-NAME）、决策无记录（I-ADR）、回归范围不明（S-QUANT）
可延后 2 条：Why/How 混层（V-LAYER）、P0 无 deadline（S-PERF）

## 反馈

| 命中 | 代号 | 判定 | 理由 |
|------|------|------|------|
| 1 | I-SSOT | TP | ZWL 已退役是客观事实，"保留避险"与退役矛盾 |
| 2 | R-DOD | TP | 六模块无一条验收标准 |
| 3 | V-STAKE | TP | ZWG 极端波动无任何风控预案 |
| 4 | G-NOGO | TP | 保留 ZWL + 新增 ZWG 无优先序 |
| 5 | V-NAME | TP | VM/TS/s2s 等术语无定义 |
| 6 | I-ADR | TP | 保留 ZWL 的决策理由未记录 |
| 7 | S-QUANT | TP | "回归其他渠道"范围不明 |
| 8 | V-LAYER | TP | 背景段混用战略与实现 |
| 9 | S-PERF | TP | P0 无具体 deadline |
