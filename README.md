# 照妖镜 · Prompt Mirror

> **Catch ambiguity before you hit Enter.** 11 rules scan your prompt, then live-search the web for real industry data — no local storage, no made-up numbers, no judgment. Just reflection.
>
> **按 Enter 之前，让 AI 照一下你刚写的 prompt。** 含混处现查行业数据——不落盘、不编造、不评分。镜子只反射。

<p align="center">
  <a href="https://github.com/290963249/zhaoyaojing/blob/main/LICENSE">MIT</a>
  ·
  <a href="https://github.com/290963249/zhaoyaojing/discussions">Share your case</a>
  ·
  <a href="https://github.com/290963249/zhaoyaojing/blob/main/CONTRIBUTING.md">Contribute</a>
</p>

---

## What it does

You type a prompt. `/照` scans it for 11 common ambiguity patterns before it reaches the AI — vague performance claims ("make it fast"), undefined completion criteria ("when is it done?"), conflicting goals ("cheap AND fast — which wins?"). Then it fetches real industry benchmarks from the web and shows them alongside your prompt.

**No scores. No rewrites. No judgment.** The mirror only reflects — you decide what to fix.

## Why it matters

| Without Mirror | With Mirror |
|---------------|-------------|
| "把搜索改快点" | "把搜索改快点" 🪞 S-PERF<br>Meilisearch P99 22ms · 500K 文档实测<br>Google SRE Book · 必须用 P99 不用平均值 |
| AI guesses what "fast" means | You set a real target, AI hits it |

Every ambiguous word in your prompt is a gamble — the AI fills in the blank, and you may not like what it picks. Zhaoyaojing makes the blank visible **before** you press Enter.

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

- **v0.7** (current): 20 real-world `/照` runs to establish precision baseline
- **v0.8**: Precision tuning + first external users
- **v1.0**: Cross-model verification (Claude / GPT / Gemini)

See [ROADMAP.md](ROADMAP.md) for the detailed plan.

---

MIT · [GitHub](https://github.com/290963249/zhaoyaojing) · v0.7
