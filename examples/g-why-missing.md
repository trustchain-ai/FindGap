# Example · G-WHY · WHY 缺失 / Output 冒充 Outcome

> **来源**：本仓真实历史命中（v0.5 时期，使用当时的 PASS/FAIL 方法论）。
> 原案例来自 dogfood/runs/002-self-v04-bootstrap.md Finding #1。
> v0.6 已砍掉 PASS/FAIL，输出格式改为三节点（照→查→亮）。下方保留历史原貌。

---

## 场景

照妖镜 v0.4 CHANGELOG 这样描述新增功能：

```
v0.4 重大新增：
- Phase 0 输入门禁
- INVEST-Agent 六要素检查
- readinessScore 0-100 + 三态 verdict
- G15-G18 四维新增
- 结构化补齐卡片
- 机读 JSON 第三通道
- readinessScore 评分体系
```

每一行都是 **Output（做了什么）**，**没有任何一行是 Outcome（解决了谁的什么问题）**。

---

## 照妖镜输出

```
[FAIL] G-WHY WHY 缺失 / Output 冒充 Outcome
  file: CHANGELOG.md (v0.4 段全段)
  原形: "v0.4 重大新增：Phase 0 / INVEST / readinessScore / G15-G18 / 卡片 / JSON ..."
  why : 全段只列 Output（6 个交付物），无 Outcome
        没说：解决谁的什么问题？拦截了什么真实失败？
        实施者无法判断这些功能是不是"对的事"
        v0.5 自照发现：67 信号 + JSON schema 等多数 Output 与"消除 returns 80% 返工"
        没有强因果——是工程化堆砌，不是 Outcome 驱动
  补齐: 在每个 Output 前加一行 Outcome，例如：
        "解决：人给 agent 任务时输入模糊 → 拦截 ~25% '任务定义模糊' 失败
         为此 Phase 0 输入门禁 + INVEST-Agent 检查..."
```

---

## 真实修复

v0.5 把 v0.4 的 Output 清单全部砍掉（Phase 0 引擎 / 67 信号 / JSON 通道 / 评分公式），重新围绕 **Outcome = 消除 80% 返工根因** 设计了 11 条规则。

CHANGELOG v0.5 段每条都强制写 Outcome（"覆盖主观词导致的鸡同鸭讲"等），而非堆 Feature 名词。

---

## 给上游的认知盲点

**"我加了 N 个功能"不是 Outcome，是 Output。**
Feature Factory 模式（Coleman / Cagan）是产品失败 #1 反模式。
评审一个方案时，问 **"这解决了谁的什么问题？"** 比"这做了什么"更能照出 WHY 是否清晰。

**判定方法**：全文 grep `为了|目标指标|outcome|北极星|解决.*问题`——零命中且文档 ≥100 字，疑似 G-WHY。
