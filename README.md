# FindGap

> **交接前最后一道认知校对。**
>
> FindGap helps you catch the expensive gaps that usually surface only **after** an artifact has already been handed to the next person or agent.

<p align="center">
  <a href="LICENSE">MIT</a> · <a href="dogfood/baseline.md">Baseline</a> · <a href="CONTRIBUTING.md">Contribute</a>
</p>

---

## What it is

FindGap is a **handoff-time gap checker**.

It is for the moment when the current owner already believes the artifact is good enough, and is about to hand it to the next person or the next agent. At that moment, FindGap helps expose the still-unseen gaps that are cheap to ignore now and expensive to fix later.

**It is not:**
- a per-turn prompt checker
- a generic writing improver
- a PASS / FAIL scorer
- a tool that rewrites the artifact for you

---

## Who it is for

FindGap is most useful for people who frequently hand work across a workflow boundary:

- **Product / solution owners** — before handing a PRD, proposal, or task package to engineering
- **Engineers / architects** — before handing a spec, interface contract, or implementation plan to the next builder or reviewer
- **Agent-workflow users** — before passing an artifact to the next agent in a multi-step workflow

---

## Why it matters

Most costly rework does **not** come from "bad writing."
It comes from hidden assumptions that survive until handoff:

- acceptance criteria were never locked
- failure paths were never made explicit
- key terms meant different things to different people
- constraints and dependencies were assumed, not stated

By the time these issues are discovered downstream, the team is no longer fixing wording — it is fixing **wasted execution**.

---

## Evidence you can trust

FindGap is grounded in real dogfooding, not generic advice.

- **20 real handoff-style prompts** were used to establish the first baseline
- Overall measured **precision = 0.9805**
- The highest-cost gaps repeatedly clustered around:
  - completion / acceptance
  - boundary / failure path
  - terminology / definition
  - method / constraints / dependencies

In plain language: most of the gaps FindGap flagged in the baseline were real rework risks, not noisy suggestions.

See the underlying data in [`dogfood/baseline.md`](dogfood/baseline.md).

---

## Handoff workflow at a glance

```mermaid
flowchart LR
    A[Owner thinks<br/>"this is ready"] --> B{Run FindGap}
    B --> C[Self-check<br/>owner reviews hidden assumptions]
    B --> D[Receiver-check<br/>next person checks execution blockers]
    C --> E[Clarify acceptance / terms / boundaries]
    D --> E
    E --> F[Handoff with shared understanding]
    F --> G[Less downstream rework]
```

FindGap is not designed to interrupt every interaction. It is designed to intervene at the **handoff point**, where hidden ambiguity becomes expensive.

---

## Two modes

### Self-check

Use this when **you are the current owner** and want one last review before handoff.

Self-check helps surface:
- assumptions that only exist in your head
- places where you think the artifact is clear but the next person may read it differently
- gaps that have already moved outside your awareness, so you would no longer think to ask for improvement

### Receiver-check

Use this when **you are the next person or next agent** about to take over the artifact.

Receiver-check helps surface:
- what blocks execution if you start cold
- where you would be forced to fill in the blanks yourself
- what is likely to turn into downstream rework during implementation, integration, or acceptance

---

## See it in action

### Input artifact

```text
支持 BNPL 结账能力。
范围：先做印尼。
上线尽快。
```

### What FindGap exposes

```text
FindGap · 所有者自检 · 发现 2 处 gap 可能导致返工
> If I hand this off now, what will the next person misunderstand?

---

🔴 completion-acceptance-gap
原文："支持 BNPL 结账能力。"
缺口：缺少可观察的完成定义或验收标准。
下游风险：下游会在不同完成标准下继续推进，导致返工。

---

🟠 terminology-definition-gap
原文："支持 BNPL 结账能力。"
缺口：关键术语未定义，存在同名异义风险。
下游风险：下游可能按不同理解推进，导致接口或流程返工。
```

The point is not to generate more text.
The point is to catch the hidden gaps **before the next person starts building on the wrong understanding**.

---

## Quickstart

Load FindGap into your agent environment, then run it at the handoff moment.

```text
/findgap 这是准备交给下一个 agent 的支付接入方案，先帮我做 self-check
/fg 我准备把这份 PRD 交给实现同学，做一下 receiver-check
/照 在 handoff 前看看这段技术方案还有哪些高成本 gap
```

You can also manually copy `skill/FindGap.skill.md` into your skills directory.

**Best use cases:**
- before handing a plan to another engineer
- before passing a task to another agent
- before asking someone else to implement, review, or accept an artifact

**Skip it for:**
- casual conversation
- normal coding without a handoff artifact
- checking an already-delivered output

---

## How it works

1. **Scan** the artifact with the internal rule set to find likely handoff gaps
2. **Check evidence** using public references when available, and contextual reasoning when not
3. **Show the gaps** in a fixed flat-list format with anchor text, missing information, downstream risk, and fill-in direction

Core principles:
- three-node flow only — scan, check, show
- never invent URLs or evidence
- no runtime static knowledge base
- direction, not decisions

---

## Docs

For deeper material, see:

| Doc | Content |
|-----|---------|
| [`docs/user-manual.md`](docs/user-manual.md) | Software-style usage guide |
| [`docs/architecture.md`](docs/architecture.md) | Engine, CLI, and eval pipeline |
| [`docs/originality.md`](docs/originality.md) | Originality and dependency notes |
| [`dogfood/baseline.md`](dogfood/baseline.md) | Baseline evidence (20 runs) |
| [`ROADMAP.md`](ROADMAP.md) | Version history and direction |

---

## Contribute

Caught a real gap, or found one that FindGap missed?

- Skill contract: `skill/FindGap.skill.md`
- Verification: `tests/verify-skill.md`
- Dogfood evidence: `dogfood/`
- Guide: [`CONTRIBUTING.md`](CONTRIBUTING.md)

---

MIT · [GitHub](https://github.com/trustchain-ai/FindGap) · v1.0.0
