# 技术方案 / 设计文档 / RFC — Tier-1 标杆

> 行业认可的技术方案必含章节 + 反模式清单。SKILL.md G4/G9.x/G10.x 扫描会引用本文件。

## 必含章节（缺一即触发 G4）

- [ ] 背景与问题（解决什么，不解决什么）
- [ ] 关键技术决策 + 替代方案对比（至少列 3 个备选）
- [ ] 架构图 + 数据流（图示，不只文字）
- [ ] 容量规划 / 性能预估（QPS / 数据量 / 存储增长）
- [ ] 失败模式 + 回滚方案
- [ ] 监控 / 告警 / 日志（三件套齐全）
- [ ] 安全设计（认证 / 授权 / 加密 / 输入验证）
- [ ] 灰度发布策略（1% → 10% → 50% → 100%）
- [ ] 影响范围 + 向后兼容性
- [ ] 风险清单 + 缓解措施

## 可观测性三件套（G9.3）

| 维度 | 必须实现 | 工具示例 |
|------|---------|---------|
| Metrics | counter/gauge/histogram + RED method | Prometheus / Datadog |
| Logs | 结构化 JSON / trace_id 关联 / 分级 | ELK / Splunk |
| Traces | 跨服务 traceparent / sampling ≥ 1% | Jaeger / OpenTelemetry |

任一缺失 → G9.3 标 critical。

## 防御性设计三板斧（G9.6）

引入任何外部依赖必须有：

| 机制 | 默认配置 |
|------|---------|
| Timeout | 全链路超时累加 < 上游超时；同步调用默认 3s |
| Retry | 指数退避 + 上限（3 次），幂等接口才能重试 |
| Circuit Breaker | 错误率 > 50% 5s 内熔断，Half-Open 探测 |
| Rate Limit | 令牌桶 / 漏桶，按用户/IP/接口三维度 |
| Fallback | 降级返回缓存 / 默认值 / 静默失败 |

## 幂等设计（G9.2）— 关键路径必查

```
涉及 {下单, 支付, 退款, 上报, retry, MQTT QoS≥1, at-least-once}
→ 必须有 idempotency_key + 服务端去重表 + TTL（24h-7d）
```

反模式（G10.3）：

- ❌ `SETNX + EXPIRE`（非原子，crash 可能锁残留）
- ❌ 客户端时间戳做唯一键（时钟漂移会撞）
- ❌ MD5(请求体) 做幂等键（含时间戳/随机数会失败）

正确模式：

- ✅ 客户端生成 UUID + 服务端 `INSERT ... ON CONFLICT DO NOTHING`
- ✅ Redis `SET key value EX 86400 NX` 一行原子

## 已知反模式横扫（G10）

| 反模式 | 触发关键词 | 推荐替代 |
|--------|---------|---------|
| 阻塞 IO 在主线程 | "MQTT 阻塞模式"/"同步等待回调" | 异步 + 本地队列 + 超时 |
| 重试风暴 | "失败重试"无退避 | 指数退避 + jitter + 上限 |
| 缓存雪崩 | "全部失效时间相同" | 随机过期 + 多级缓存 |
| 大事务 | "for 循环里调外部接口" | 拆分 / 异步队列 |
| 单点故障 | "唯一一台"/"master only" | HA / 主从 / 多活 |

## 主观词高频位置（G14 重点扫描）

| 章节 | 常见主观词 | SMART 改写方向 |
|------|----------|-------------|
| 性能 | "高性能/快/低延迟" | P99 < X ms + 测试方法 |
| 可靠 | "稳定/可靠/健壮" | SLO + 故障恢复时间 |
| 扩展 | "易扩展/可扩展" | 水平扩展 N 倍 + 测试报告 |
| 维护 | "好维护/清晰" | 圈复杂度 / 文档覆盖率 |

## 灰度 / 回滚（G9.4）

每个发布必须明确：

- 灰度比例阶梯：1% → 5% → 25% → 50% → 100%
- 每个阶段观察时长：≥ 30 分钟
- 回滚触发条件：错误率 > X% / P99 涨 > Y%
- Kill switch：feature flag 一键关闭
- 回滚验证：上次发布的回滚路径是否还能跑通

## 引用来源

- Google SRE Book / SRE Workbook
- AWS Well-Architected Framework
- Microsoft Azure Architecture Center
- 阿里《Java 开发手册》/ 字节《Tech Spec 规范》
- Martin Kleppmann《Designing Data-Intensive Applications》
- Release It! (Michael Nygard)
