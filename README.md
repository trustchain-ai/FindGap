# FindGap

**简体中文** | **English**

> **在你按 Enter 之前，先找 gap。**
> **Find the gaps before you hit Enter.**
>
> FindGap 从下游视角扫描你准备发给 AI 的内容，找出会导致返工的 gap，给出优化方案和决策依据。
> FindGap scans what you're about to send to AI, surfaces gaps that cause rework, and provides optimization suggestions with decision references.

<p align="center">
  <a href="LICENSE">MIT</a> · <a href="dogfood/baseline.md">Baseline</a> · <a href="CONTRIBUTING.md">Contribute</a>
</p>

---

## Find* — 让不可信变得可见 / Make the untrustworthy visible

FindGap 是 Find* 系列的第一站，守护 AI 协作的「事前」环节：
FindGap is the first node in the Find* series, guarding the "before" phase of AI collaboration:

| | FindGap | FindAction | FindMiss |
|---|---|---|---|
| **时机** / When | 发出前 / Before sending | 执行中 / During execution | 交付后 / After delivery |
| **检查什么** / What | 你的输入 / Your input | Agent 的过程 / Agent's process | Agent 的输出 / Agent's output |
| **一句话** / One-liner | 你没说清楚的 / What you didn't clarify | 它正在做的 / What it's doing | 它没做到的 / What it missed |
| **触发** / Trigger | `/fg` | `/fa` | `/fm` |

> 当前仓库只包含 FindGap。FindAction 和 FindMiss 即将独立发布。
> This repo contains FindGap only. FindAction and FindMiss coming soon.

---

## 先看证据 / Evidence first

20 次真实扫描，最高频的 gap 不是模型弱，是需求没说清：
20 real scans — the top gaps were request ambiguity, not model weakness:

| Gap | 说明 / Description |
|-----|---------------------|
| 验收标准缺失 | 说了做什么，没说做到什么算完成 / says what to build, not what counts as done |
| 失败路径隐身 | 只写了正常流程，异常场景缺位 / happy path only, no failure handling |
| 关键术语未对齐 | 同名异义，团队各自理解不同 / same term, different meanings |
| 单一真源缺失 | 同一对象在多处各自定义 / no single source of truth |

**结论：** 大多数返工不是因为不会写，而是默认大家读成同一个意思。
**Takeaway:** most rework is not bad writing but assuming everyone reads the same words the same way.

基于首轮 [20-run baseline](dogfood/baseline.md)（precision 0.9805）。
Grounded in the first [20-run baseline](dogfood/baseline.md) (precision 0.9805).

---

## 现在就试 / Try it now

告诉你的 AI agent / Tell your AI agent:

> 帮我装上 github.com/290963249/FindGap 的 FindGap skill
> Install the FindGap skill from github.com/290963249/FindGap

或手动复制 `skill/FindGap.skill.md` 到 skills 目录。
Or copy `skill/FindGap.skill.md` into your skills directory.

```text
/findgap 把搜索API的P99延迟降到50ms以内
/fg 做一个支持10万并发的实时消息系统
/照 review this PRD
```

**适合：** 你准备让 AI 帮你构建、设计、评审、决策之前。
**Use when:** about to ask AI to build, design, review, or decide.

**不适合：** 闲聊、调试具体报错、检查 AI 已交付的输出（→ FindMiss）。
**Skip when:** casual chat, isolated debugging, or checking AI's delivered output (→ FindMiss).

---

## FindGap 输出长什么样 / What the output looks like

```
FindGap · 发现 2 处 gap 可能导致返工

---

🔴 致命 · 性能指标缺失

原文："性能要好，体验要流畅"

缺口："好"和"流畅"没有量化指标。开发做技术选型时，无法判断
延迟应控制在 300ms 还是 3s。

优化方案：补充一个可量化的延迟指标（如 P99 上限）。行业常见
做法是用 P99 而非平均值，因为平均值会掩盖长尾延迟。

参考依据：
- Visa 线上授权 SLO: P99 < 500ms
  — https://developer.visa.com/capabilities/visa-direct

---

🟠 阻塞 · 关键术语未对齐

原文："支持 BNPL（先买后付）"

缺口："BNPL"在不同市场指代不同产品形态。架构师和风控如果
各自理解不同，接口设计会出现字段冲突。

优化方案：增加 BNPL 定义段，明确分期数范围、免息期规则、
风控主体归属。

参考依据：
- Klarna (欧洲): 4 期免息，平台承担风控
  — https://www.klarna.com/international/business
- ⚠️ 基于文档现状推理：文档写的是"海外 POS"但未指定首站
  市场；如果首站已确定，应直接锁定对应 BNPL 形态
```

---

## 它怎么工作 / How it works

11 条内部规则扫 gap → 联网查行业数据 → 搜不到时基于上下文推理兜底 → 给出优化方案。
11 internal rules scan for gaps → search for industry data → fall back to context reasoning when needed → provide optimization suggestions.

- 不展示规则代号，用人话直说 gap / No rule codes — gaps stated in plain language
- 不替你改写文档 / Does not rewrite your document
- 不替你做最终决策 / Does not make the final decision for you
- 优化方案给方向，附决策依据 / Suggestions give direction with decision references

---

## Roadmap

- **v0.7** — 20-run baseline ✅
- **v0.8** — 测量校准 + 规则边界收窄 ✅
- **v0.9** — FindGap 品牌 + 优化方案 + 三层证据兜底 ✅
- **v1.0** — 跨模型验证 + 规则冻结

详见 / See [ROADMAP.md](ROADMAP.md)

---

## Contribute

FindGap 抓到了真 gap，或漏掉了？→ [Discussions](https://github.com/290963249/FindGap/discussions)
Caught a real gap, or missed one? → [Discussions](https://github.com/290963249/FindGap/discussions)

改规则或加案例 → `skill/FindGap.skill.md` 或 `examples/` → [CONTRIBUTING.md](CONTRIBUTING.md)
Edit rules or add cases → `skill/FindGap.skill.md` or `examples/` → [CONTRIBUTING.md](CONTRIBUTING.md)

---

MIT · [GitHub](https://github.com/290963249/FindGap) · v0.9
