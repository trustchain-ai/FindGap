# 照妖镜 · Prompt Mirror

<a id="zh"></a>
**简体中文** | [English](#en)

> **按 Enter 之前，把含混照出来。** 照妖镜基于首轮 **20 条真实闭环 baseline**：在这批样本里，最常见的问题不是模型不够强，而是 prompt / PRD 里没把“做完算什么、错了谁受影响、同一个词到底指什么”说清楚。
>
> **不改写、不打分、不编数字。** 只把会让人和 AI 读出不同意思的地方照出来。当前得到的是首轮 **precision baseline**，不是最终的 recall / 外部有效性证明。

<p align="center">
  <a href="https://github.com/290963249/zhaoyaojing/blob/main/LICENSE">MIT</a>
  ·
  <a href="https://github.com/290963249/zhaoyaojing/blob/main/dogfood/baseline.md">20-run baseline</a>
  ·
  <a href="https://github.com/290963249/zhaoyaojing/blob/main/CONTRIBUTING.md">Contribute</a>
</p>

---

## What 20 real runs made obvious

Across this first 20-run `/照` baseline, the highest-frequency ambiguity clusters were:

- `R-DOD` — 20/20：说了要做什么，没说做到什么算完成
- `V-STAKE` — 20/20：失败路径、影响对象、错了损失什么经常隐身
- `V-NAME` — 19/20：关键名词听起来一样，团队和 AI 理解却不一样
- `I-SSOT` — 18/20：同一个字段 / 状态 / 主键被多个地方各自定义

**结论很直接：** 大多数失败不是“不会写 prompt”，而是“默认大家会读成同一个意思”。

## One real pattern

**Ambiguity-before**
- “做一个支持先买后付的结账能力，性能要好，体验要流畅，上线尽快。”

**Reflection-after**
- `/照` 会先照出：`性能要好` 没有指标，`体验要流畅` 没有验收口径，`上线尽快` 不是完成条件。

That is the job: make hidden ambiguity visible before AI fills in the blanks for you.

## What `/照` does

- 用固定 11 条规则先照，不先改写你的 prompt
- 相关处再补公共资料或公开基准，不编造数字
- 返回的是 reflection，不是 judgment；要不要改由你决定

## Why it feels different

- No rewrite theater
- No fake numbers
- No scores
- Built from a 20-run baseline, not a toy demo

## Install

Tell your AI agent:

> 帮我装上 github.com/290963249/zhaoyaojing 的照妖镜 skill

Or manually: copy `skill/照妖镜.skill.md` into your skills directory.

## Usage

```
/照 把搜索API的P99延迟降到50ms以内
/照妖镜 做一个支持10万并发的实时消息系统
照一下 这个PRD
```

**When to use:** before sending a prompt that describes what you want built, designed, or decided.

**When not to:** short follow-ups, casual chat, debugging a specific error.

**Try `/照` on a prompt you were about to send anyway.**

## The 11 Rules

| # | Rule | What it catches |
|---|------|----------------|
| S-PERF | "Fast" without a number | "Make it fast" → how fast? |
| S-QUANT | "All" without a boundary | "All users" → excluding which ones? |
| S-NFR | Quality adjective without a metric | "Reliable" → crash rate? uptime? |
| R-DOD | No Definition of Done | What exactly means "finished"? |
| G-WHY | What, not Why | What problem does this solve for whom? |
| G-NOGO | Conflicting goals, no priority | "Fast AND cheap" → pick one as primary |
| I-SSOT | Same thing defined differently | "User" means admin on page 1, visitor on page 3 |
| I-ADR | Key decision without rationale | "We chose X" — why not Y? |
| V-NAME | Same word, different meanings | Do you and the AI agree on what "complete" means? |
| V-STAKE | Happy path only | Wrote the success flow — what about the failure? |
| V-LAYER | Why and How mixed together | Strategy language next to field names |

## Share your case

Found a real ambiguity that `/照` caught — or missed? [Open a discussion](https://github.com/290963249/zhaoyaojing/discussions) and paste your before/after. These cases directly shape the next version.

## FAQ

**Q: What makes this different from just writing better prompts?**
A: It doesn't tell you to "write better" — it shows what's ambiguous using real data. The difference is concrete benchmarks vs. vague advice.

**Q: Why is this a skill and not a tool?**
A: Skills work inside your AI agent — no separate app, no API key, no config. Install with one sentence.

**Q: Does it store my prompts?**
A: No. The mirror reads your prompt, searches the web, shows results — nothing is saved.

## Contribute

This is a Markdown skill file, not a code project. To contribute:

1. Fork and create a branch
2. Edit `skill/照妖镜.skill.md` or add a case to `examples/`
3. Open a PR

See [CONTRIBUTING.md](CONTRIBUTING.md) for details. Every rule change must come with a real case that proves it works.

## Roadmap

- **v0.7**: 20 real `/照` runs to establish the baseline
- **v0.8**: validate measurement + external gray first, then strengthen the highest-ROI rules and tighten `V-LAYER` / `G-WHY`
- **v1.0**: stabilize the 11 rules and verify across Claude / GPT / Gemini

See [ROADMAP.md](ROADMAP.md) for the detailed plan.

---

<a id="en"></a>
[简体中文](#zh) | **English**

## Prompt Mirror

Catch ambiguity before you hit Enter.

Across this first 20-run `/照` baseline, the most repeated failures were not model weakness but request ambiguity:

- `R-DOD` — no clear definition of done
- `V-STAKE` — no failure path or affected-role framing
- `V-NAME` — the same term means different things to different readers
- `I-SSOT` — the same field or status is defined in more than one place

`/照` uses 11 fixed ambiguity rules, checks public references when relevant, and returns reflection — not judgment.

**No rewrites. No scores. No made-up numbers.**

### Try now

```text
/照 review this PRD
/照 make this API faster
照一下 这个任务描述
```

If this matches how you work, star the repo and follow the project.

---

MIT · [GitHub](https://github.com/290963249/zhaoyaojing) · v0.7
