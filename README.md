# 照妖镜 · Prompt Mirror

**简体中文** | **English**

> **按 Enter 之前，把含混照出来。**
> **Catch ambiguity before you hit Enter.**
>
> 不改写、不打分、不编数字。只把会让人和 AI 读出不同意思的地方照出来。
> No rewrites, no scores, no made-up numbers. Just surfaces the parts humans and AI read differently.
>
> 当前结论基于首轮 [20-run baseline](dogfood/baseline.md)——precision baseline，不是 recall，也不是外部有效性证明。
> Grounded in the first [20-run baseline](dogfood/baseline.md) — a precision baseline, not recall, not external-validity proof.

<p align="center">
  <a href="LICENSE">MIT</a> · <a href="dogfood/baseline.md">Baseline</a> · <a href="CONTRIBUTING.md">Contribute</a>
</p>

---

## 先看证据 / Evidence first

20 次真实 `/照`，最高频含混不是模型弱，是需求没说清：
20 real `/照` runs — the top failures were request ambiguity, not model weakness:

| Rule | 抓什么 / What it catches |
|------|--------------------------|
| `R-DOD` | 没说做到什么算完成 / no definition of done |
| `V-STAKE` | 失败路径和受影响方隐身 / no failure path or affected roles |
| `V-NAME` | 同名异义 / same term, different meanings |
| `I-SSOT` | 同一对象多处各自定义 / no single source of truth |

**结论：** 大多数失败不是不会写 prompt，而是默认大家读成同一个意思。
**Takeaway:** most failures are not bad prompting but assuming everyone reads the same words the same way.

## 现在就试 / Try it now

告诉你的 AI agent / Tell your AI agent:

> 帮我装上 github.com/290963249/zhaoyaojing 的照妖镜 skill
> Install the Prompt Mirror skill from github.com/290963249/zhaoyaojing

或手动复制 `skill/照妖镜.skill.md` 到 skills 目录。
Or copy `skill/照妖镜.skill.md` into your skills directory.

```text
/照 把搜索API的P99延迟降到50ms以内
/照 review this PRD
照一下 这个任务描述
```

**适合：** 构建、设计、评审、决策前。**不适合：** 闲聊、调试已定位的具体报错。
**Use when:** about to build, design, review, or decide. **Skip when:** casual chat or isolated debugging.

## 不是评分，是 reflection / Reflection, not a score

- 不改写 / No rewrites
- 不打分 / No scores
- 不编数字 / No made-up metrics
- 不过度宣称 / No overclaiming external validity

## 怎么照 / How it works

11 条固定规则扫含混 → 相关处补公共资料 → 返回 reflection，不是 judgment。
11 fixed rules scan for ambiguity → public references where relevant → reflection, not judgment.

**例 / Example:**
- **Before:** "性能要好，体验要流畅，上线尽快"
- **After:** `/照` 指出：`好` 没指标，`流畅` 没验收口径，`尽快` 不是完成条件

## 11 条规则 / The 11 rules

| # | Rule | 抓什么 / Catches |
|---|------|-------------------|
| S-PERF | Fast without a number | "快"没数字 |
| S-QUANT | All without a boundary | "所有"没边界 |
| S-NFR | Quality word without metric | "稳定"没判据 |
| R-DOD | No Definition of Done | 没写完成条件 |
| G-WHY | What, not Why | 只说做什么没说为什么 |
| G-NOGO | Conflicting goals, no priority | 目标冲突没优先级 |
| I-SSOT | Same thing defined differently | 多处定义不一致 |
| I-ADR | Decision without rationale | 有结论没 why-not |
| V-NAME | Same word, different meanings | 同名异义 |
| V-STAKE | Happy path only | 失败路径缺位 |
| V-LAYER | Why and How mixed | 决策层级混线 |

## FAQ

**这和"写更好的 prompt"有什么区别？/ How is this different from "write better prompts"?**
不是给抽象建议，而是按固定规则指出可见含混，锚定到真实 baseline。
Not vague advice — it points out visible ambiguity using fixed rules anchored to a real baseline.

**为什么是 skill 不是工具？/ Why a skill, not a tool?**
直接在你的 AI agent 里工作，不用切产品。
Works inside your AI agent — no product switching.

## Roadmap

- **v0.7** — 20-run baseline ✅
- **v0.8** — validate measurement + external gray, then strengthen highest-ROI rules
- **v1.0** — stabilize rules, verify across Claude / GPT / Gemini

详见 / See [ROADMAP.md](ROADMAP.md)

## Contribute

`/照` 抓到了真含混，或漏掉了？→ [Discussions](https://github.com/290963249/zhaoyaojing/discussions)
Caught a real one, or missed one? → [Discussions](https://github.com/290963249/zhaoyaojing/discussions)

改规则或加案例 → 修改 `skill/照妖镜.skill.md` 或 `examples/` → [CONTRIBUTING.md](CONTRIBUTING.md)
Edit rules or add cases → `skill/照妖镜.skill.md` or `examples/` → [CONTRIBUTING.md](CONTRIBUTING.md)

---

MIT · [GitHub](https://github.com/290963249/zhaoyaojing) · v0.8
