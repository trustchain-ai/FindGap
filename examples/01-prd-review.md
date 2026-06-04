# 案例 1：评审一份模糊 PRD

> **来源**：v0.1 历史 case，已按 v0.6 三节点格式重写。原始产物不变，输出格式更新。

---

## 输入 prompt

```
帮我看下这个 PRD：

海外 POS 支持 BNPL

业务描述：
- 海外 POS 也要支持 BNPL（先买后付）
- 类似现有扫码支付，加一个新按钮
- 性能要好，体验要流畅
- 上线时间：尽快
```

## 三节点输出

### 节点 ① 照

11 招逐条扫描，命中 6 条：

| 命中 | 代号 | 原形句 |
|------|------|--------|
| ✅ | S-PERF | "你说'性能要好''体验要流畅'，但快到几毫秒没说" |
| ✅ | S-NFR | "你说'要流畅'，但崩溃率/卡顿率多少算流畅？" |
| ✅ | R-DOD | "你定义了什么叫做完？'尽快'不是验收条件" |
| ✅ | G-WHY | "做了 BNPL 解决谁的什么问题？是提升客单价还是拉新？" |
| ✅ | V-STAKE | "Happy path 写了，BNPL 申请被拒/额度不足/退款场景呢？" |
| ✅ | V-NAME | "你和 AI 说的'BNPL'是同一件事吗？分期数、免息期、风控谁管？" |

### 节点 ② 查

每条命中做 ≥ 3 次 WebSearch，保留 ≥ 2 条互相印证的来源：

**S-PERF "性能要好"**：
- Visa Online Auth SLO: 99th percentile < 500ms
- Adyen Checkout Benchmark: P99 latency 300-600ms for BNPL providers

**R-DOD "尽快"**：
- Klarna merchant integration timeline: 4-8 weeks typical
- Affirm technical integration guide: 6-12 weeks including compliance

**V-STAKE 失败场景**：
- Klarna merchant docs: 必须处理的拒绝码 ≥ 12 种
- BNPL chargeback率：行业均值 1.5-3%，高于普通支付

### 节点 ③ 亮

```
🪞 S-PERF · "你说'性能要好'，但快到几毫秒没说"
   Visa Online Auth SLO | P99 < 500ms
   Adyen Checkout Benchmark | BNPL P99 300-600ms

🪞 S-NFR · "你说'要流畅'，但什么指标算流畅？"
   ⚠️ 无可信公开数据（BNPL 特定体验指标无行业标准），建议你去问熟悉该领域的人

🪞 R-DOD · "你说'尽快'，但没说具体日期"
   Klarna Integration Timeline | 4-8 weeks typical
   Affirm Tech Guide | 6-12 weeks including compliance

🪞 G-WHY · "做了 BNPL 解决谁的什么问题？"
   ⚠️ 无可信公开数据（业务目标属于内部决策），建议你去问业务负责人

🪞 V-STAKE · "Happy path 写了，失败场景呢？"
   Klarna Merchant Docs | 拒绝码 ≥ 12 种必须处理
   BNPL Industry Report | chargeback 率 1.5-3%

🪞 V-NAME · "你和 AI 说的'BNPL'是同一件事吗？"
   ⚠️ 无可信公开数据（术语对齐属于团队内部事项），建议你和团队确认
```

---

## 与 v0.1 输出的区别

| 维度 | v0.1（旧） | v0.6（当前） |
|------|----------|------------|
| 流程 | 4 阶段（Detect→Decide→Eliminate→Converge）| 三节点（照→查→亮）|
| 评分 | severity_score 16→2 | 无评分 |
| 建议 | 替用户决策（"建议下一步"）| 只展示数据，用户自己判断 |
| 数据来源 | 静态 checklist | 每次 WebSearch 现查 |
