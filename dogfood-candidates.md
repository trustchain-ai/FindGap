# v0.3 Dogfood 10 候选案例

> 覆盖度检查：G1: ✓ (BNPL PRD, Self-Help PRD, AI 护栏方案, BNPL 拉通会) | G2: ✓ (BNPL PRD, Self-Help PRD, 子线程 PR, AI 护栏, BNPL 拉通会, 发版评审) | G3: ✓ (BNPL PRD, Self-Help PRD, AI 护栏, 发版评审) | G4: ✓ (BNPL/MQTT/Self-Help PRD, auto-settle PR, AI 护栏, BNPL 拉通会) | G5: ✓ (BNPL PRD, channelRequestId PR, auto-settle PR, 子线程 PR, device-scan 方案, BNPL 拉通会) | G6: ✓ (MQTT PRD, channelRequestId PR, 子线程 PR, device-scan, BNPL 拉通会) | G7: ✓ (BNPL/MQTT/Self-Help PRD, channelRequestId PR, auto-settle PR, 子线程 PR) | G8: ✓ (MQTT PRD, auto-settle PR, device-scan, channelRequestId PR) | G9: ✓ (MQTT PRD, device-scan, 发版评审) | G10: ✓ (BNPL PRD, Self-Help PRD, auto-settle PR, device-scan, AI 护栏, BNPL 拉通会, 发版评审) | G11: ✓ (MQTT PRD, Self-Help PRD, auto-settle PR, device-scan, AI 护栏, BNPL 拉通会, 发版评审) | G12: ✓ (MQTT PRD, Self-Help PRD, channelRequestId PR, auto-settle PR, 子线程 PR, device-scan, AI 护栏, BNPL 拉通会, 发版评审) | G13: ✓ (Self-Help PRD, channelRequestId PR, 子线程 PR, device-scan, 发版评审) | G14: ✓ (BNPL/MQTT PRD, auto-settle PR, device-scan, AI 护栏, BNPL 拉通会, 发版评审) — 14/14 全部覆盖至少 1 次。分布满足 PRD×3/PR×3/技术方案×2/对话×2。

## 候选清单

### 1. [PRD] BNPL（先买后付）渠道接入 PRD：支持 Atome/Akulaku 在收银台作为支付方式

- **选材理由**：BNPL 涉及第三方分期渠道接入、状态机扩展、退款/部分退款规则、合规与风控。典型会暴露：目标用户与适用门店范围不清（G1/G2/G3）、收单状态机与原支付状态合并方式没说（G5）、退款/超时回退规则没量化（G4/G7）、接口幂等与回调时序没定义（G6/G8）、与现有结算/对账上下游影响（G14）、合规与商户准入（G10）。POS 类 PRD 极易遗漏小票打印、断网弱网场景。
- **预期触发 gap**：G1, G2, G3, G4, G5, G7, G10, G14
- **预期严重度分布**：P0×2, P1×4, P2×2
- **难度**：medium

### 2. [PRD] 阻塞模式 MQTT 下单 PRD：下单链路从 HTTP 切换为 MQTT 同步等待

- **选材理由**：把异步消息当同步用是高风险设计。容易暴露：超时阈值/重试次数没量化（G4/G7）、消息丢失/重复消费幂等（G8）、断线重连与离线下单回退（G7/G11）、QoS 与 broker 容量评估（G9）、灰度切换与回滚开关（G11）、上下游订单系统对消息格式契约（G6/G14）、监控指标与告警阈值（G12）。
- **预期触发 gap**：G4, G6, G7, G8, G9, G11, G12, G14
- **预期严重度分布**：P0×3, P1×3, P2×1
- **难度**：high

### 3. [PRD] 自助式错误恢复（Error Self-Help）PRD：收银异常时引导店员一键自愈

- **选材理由**：面向收银员的容错引导，需求易飘。会触发：目标价值（减少呼叫客服？提升订单成功率？）不明（G1）、覆盖哪些错误码/场景（G2/G3/G7）、'自愈成功'如何度量（G4）、误操作/二次扣款风险（G7/G10）、日志埋点与上报（G12）、与原有错误弹窗的兼容（G11）、测试策略覆盖弱网/设备异常（G13）。
- **预期触发 gap**：G1, G2, G3, G4, G7, G10, G12, G13
- **预期严重度分布**：P0×1, P1×4, P2×3
- **难度**：medium

### 4. [PR] PR：channelRequestId 增加判空（feature/BNPL 上的小补丁）

- **选材理由**：看似一行式 NPE 修复，但暴露根因思考缺失。能触发：为什么会为空（G5 数据模型）、上游契约谁该保证非空（G6）、判空后走默认值还是抛错（G7）、并发场景下是否还有竞态（G8）、是否需要补埋点观测多少调用为空（G12）、补丁式修复是否需要单测/回归用例（G13）。难度低但很真实。
- **预期触发 gap**：G5, G6, G7, G12, G13
- **预期严重度分布**：P0×0, P1×2, P2×3
- **难度**：low

### 5. [PR] PR：自动结算能力（auto-settlement）首版实现

- **选材理由**：定时跑批+金额结算，是金融敏感模块。能触发：触发时机与时区（G4/G8）、断电/重启的幂等（G8）、并发店员操作冲突（G8）、失败重试与人工兜底（G7）、金额一致性校验（G5）、审计日志（G10/G12）、灰度门店开关（G11）、与对账系统上下游（G14）。
- **预期触发 gap**：G4, G5, G7, G8, G10, G11, G12, G14
- **预期严重度分布**：P0×2, P1×4, P2×1
- **难度**：high

### 6. [PR] PR：容错增加 UI 线程转换 + 防止子线程调用对话框

- **选材理由**：Android 经典子线程 UI 崩溃修复。能触发：为什么之前会子线程调用（G5 状态/G6 调用契约）、是否所有调用点都迁移完（G2 范围）、Handler/Main looper 选择理由（G6）、Activity 销毁后回调的内存泄漏（G7）、是否需要 lint/静态检查兜底（G13）、崩溃监控验证（G12）。
- **预期触发 gap**：G2, G5, G6, G7, G12, G13
- **预期严重度分布**：P0×1, P1×3, P2×2
- **难度**：low

### 7. [技术方案] 技术方案：设备扫码（device-scan）能力统一抽象 — 内置摄像头/外置扫码枪/蓝牙扫码三合一

- **选材理由**：docs/device-scan-technical-design.md 已存在，是真实方案。能触发：抽象接口契约（G6）、多设备热插拔状态机（G5/G8）、不同设备性能与超时（G9）、权限申请与隐私（G10）、老设备兼容矩阵与灰度（G11）、扫码失败的可观测性（G12）、自动化测试如何在 CI 里跑（G13）、与收银/库存模块的上下游（G14）。
- **预期触发 gap**：G5, G6, G8, G9, G10, G11, G12, G13, G14
- **预期严重度分布**：P0×2, P1×4, P2×2
- **难度**：high

### 8. [技术方案] 技术方案：AI 代码生成护栏（ai-codegen-guardrails）在 mispos 的落地

- **选材理由**：docs/ai-codegen-guardrails.md 是真实方案。元层面方案易飘。能触发：目标与可量化指标（G1/G4）、护栏覆盖范围 — 模块/语言/MR 大小（G2）、对哪些角色生效（G3）、违规如何上报与申诉（G12）、与现有 lint/CI 冲突（G14）、合规与代码版权（G10）、灰度推广与回退（G11）。
- **预期触发 gap**：G1, G2, G3, G4, G10, G11, G12, G14
- **预期严重度分布**：P0×1, P1×3, P2×3
- **难度**：medium

### 9. [对话/会议纪要] 对话纪要：BNPL 接入与现有支付状态机融合的拉通会（产品/支付/收银/对账四方）

- **选材理由**：跨团队拉通会是 gap 高发区。能触发：达成的'共识'其实没量化（G4）、各方对状态机口径不一致（G5/G6）、退款责任划分不清（G2/G14）、合规问题被'会后再说'（G10）、未指定 owner 与 deadline（G1/G2）、对监控/告警谁负责没定（G12）、缺乏决策记录与回滚预案（G11）。
- **预期触发 gap**：G1, G2, G4, G5, G6, G10, G11, G12, G14
- **预期严重度分布**：P0×2, P1×4, P2×2
- **难度**：high

### 10. [对话/会议纪要] 对话纪要：版本 1.0.37 发版评审 — 包含 BNPL/MQTT 阻塞/自动结算/错误自愈四项大特性

- **选材理由**：发版评审是范围与风险压缩点。能触发：发版范围与依赖关系（G2/G14）、灰度门店清单与切流比例（G11）、回滚预案与数据回滚（G11）、关键指标与告警阈值（G12）、性能压测是否覆盖（G9）、安全合规复检（G10）、测试覆盖与遗留缺陷（G13）、各特性 owner 与 on-call（G3）。
- **预期触发 gap**：G2, G3, G9, G10, G11, G12, G13, G14
- **预期严重度分布**：P0×2, P1×4, P2×2
- **难度**：medium
