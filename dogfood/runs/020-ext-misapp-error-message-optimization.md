---
scanId: R-20260604-020
scannedAt: 2026-06-04T14:05:00Z
scanner: self
scannerVersion: 0.7.0
artifact:
  path: prd/MISAPP自主收银模式APP交易报错优化
  type: spec
result:
  rulesTriggered: [R-DOD, S-QUANT, I-ADR, V-NAME]
  sourcesFound: 4
  lowConfidenceItems: 2
feedback:
  collected: true
  useful: 4
  falsePositive: 0
---

## 背景

该 PRD 关注 MISAPP 自主收银模式下的交易失败提示优化：一类是 FIUU 渠道按 `channelresultcode` 映射用户可见文案，另一类是终端本地网络异常时统一展示固定英文提示，目标是让前端业务在交易失败时能更快定位原因，而不是只看到笼统失败结果。

## 节点 ① 照

| 命中 | 代号 | urgency | 原形句 |
|------|------|---------|--------|
| ✅ | R-DOD | 致命 | “需求list：1）FIUU 渠道根据 channelresultcode 映射对外文案；2）终端本地网络异常时，对外统一展示固定文案。” |
| ✅ | S-QUANT | 致命 | “异常范围：终端本地网络异常。” |
| ✅ | I-ADR | 阻塞 | “FIUU 渠道根据 channelresultcode 映射对外文案，第一版默认写在本地配置文件。” |
| ✅ | V-NAME | 阻塞 | “交易失败时目前没有直接展示具体失败原因，前端业务排查困难。FIUU 渠道根据 channelresultcode 映射对外文案。” |

## 节点 ② 查

- R-DOD: Adyen POS 与 Stripe 的公开文档都把失败分类、用户展示和重试语义分层处理，不会只写“展示原因”就算闭环。当前 PRD 没说明哪些交易入口生效、哪些错误码必须命中映射、未命中时展示什么、网络恢复后怎样判定流程结束，因此无法直接支撑联调与验收。
- S-QUANT: Clover、Square、Toast 以及 Adyen 的资料都把本地连接、设备通信、外网连通性、超时和渠道拒绝分层处理。现在“终端本地网络异常”没有边界，无法判断是否包含 Wi‑Fi 断开、DNS 失败、TLS 握手失败、POS↔终端断连、终端↔通道断连或超时，会让不同端把不同故障都塞进同一句文案。
- I-ADR: Adobe Commerce 专门提供 error code mapper，Adyen 与 Stripe 也都把原始错误码、归一化条件和用户文案解耦。当前 PRD 直接规定“第一版写本地配置文件”，但没有解释为什么不选远端配置、服务端下发或标准化错误层；这会把热更新、多语言和渠道扩展的 trade-off 留给实现方临场补完。
- V-NAME: Stripe、Adyen、Rebill 等公开资料都把 raw code、normalized condition、customer message、retry hint 分层命名。当前“交易失败原因 / channelresultcode / 本地网络异常”没有说明分别对应原始码、归一化错误还是用户提示文案，前端、终端接入和收单侧很容易读成不同对象。

## 节点 ③ 亮摘要

致命 2 条：需求只列“按码映射文案”和“网络异常展示固定提示”，没有写生效入口、未命中回退、重试语义和网络恢复后的验收口径，联调无法判断 done（R-DOD）；“终端本地网络异常”边界过粗，本地链路故障、外网超时、DNS/TLS 失败与渠道拒绝都可能被混在一起，直接影响错误分类与状态机实现（S-QUANT）。

阻塞 2 条：文档直接拍板“第一版写本地配置文件”，但没记录为何不选远端配置、服务端下发或标准化错误层，这会在热更新、多语言和后续渠道扩展上引发实现分歧（I-ADR）；“交易失败原因 / channelresultcode / 本地网络异常”三个核心名词没有分层定义，容易让接口字段、配置项和用户文案各说各话（V-NAME）。

## 反馈

| 命中 | 代号 | 判定 | 理由 |
|------|------|------|------|
| 1 | R-DOD | TP | 只有动作列表，没有可联调的范围、回退和验收条件，确实不够成规格。 |
| 2 | S-QUANT | TP | “本地网络异常”不封边界时，不同端会把不同层级故障映射成同一类错误。 |
| 3 | I-ADR | TP | 文案映射落在本地配置文件是关键取舍，不写 why 会把后续维护成本留给实现阶段。 |
| 4 | V-NAME | TP | 原始码、归一化错误和用户文案未分层定义，跨团队很容易接口错位。 |
