# Tier-1 内置标杆库索引

> 同行业最佳实践的内置参考。SKILL.md Step 1.4 会按产物类型查询本目录。
>
> 命中 → 直接用作 gap 检测的标杆；未命中 → 触发 Tier-2 web search。

## 索引

| 产物类型 | 标杆文件 | 覆盖维度 | 状态 |
|---------|---------|---------|------|
| PRD / 需求 | `prd-saas.md` | SLO/AC/用户研究/合规 | ✅ |
| 技术方案 / 设计文档 | `tech-spec-rfc.md` | 架构/容量/可观测/降级 | ✅ |
| 代码 PR | `code-review-checklist.md` | 安全/性能/兼容性 | 🚧 v0.2.1 |
| API 设计 | `api-design.md` | REST/GraphQL/versioning | 🚧 v0.2.1 |
| 支付 / POS | `payment-pos.md` | 幂等/对账/PCI-DSS | 🚧 v0.2.1 |
| IM / 推送 | `im-push.md` | 弱网/离线/重连 | 🚧 v0.2.1 |
| 数据上传 / 同步 | `upload-sync.md` | 断点续传/去重/限速 | 🚧 v0.2.1 |
| 任务调度 | `scheduling.md` | 幂等/失败重试/锁 | 🚧 v0.2.1 |
| 威胁建模 | `threat-model.md` | STRIDE/数据流图 | 🚧 v0.2.1 |
| 数据 Schema | `data-schema.md` | 演进/兼容/约束 | 🚧 v0.2.1 |
| 可观测性 | `observability.md` | metrics/logs/traces | 🚧 v0.2.1 |

## 失败模式横扫库

| 文件 | 覆盖 |
|------|------|
| `_meta/failure-modes.md` | Knight Capital / AWS S3 / GitLab / Therac-25 等 30-40 个范式 | 🚧 v0.2.1 |
| `_meta/compliance-checklists.md` | PCI-DSS / GDPR / PIPL / SOC2 反向清单 | 🚧 v0.2.1 |

## 用户私有覆盖

`_user-overrides.md` — 用户/团队私有标杆条目（不会被升级覆盖）。

## 查询契约

Step 1.4 按以下顺序查：
1. 精确匹配：产物类型 → 对应文件
2. 模糊匹配：产物关键词 hit → 多个文件取并集
3. 全部未命中 → 输出 `[Tier-1 miss, triggering Tier-2 web search]`，调 web search 查同行业 SLO/最佳实践/失败案例
4. Tier-2 也无命中 → 标 `[no benchmark available]`，**不编造数字**
