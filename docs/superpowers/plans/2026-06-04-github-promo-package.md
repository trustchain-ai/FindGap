# GitHub Promo Package Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the repo README into a fast GitHub conversion page and add one concise long-form proof article that gets readers to try `/照` immediately, then optionally star or follow the repo.

**Architecture:** Use a two-layer content package. The README becomes the short conversion surface with one flagship ambiguity-before vs reflection-after case and a visible `/照` CTA above the fold; the long-form article becomes the proof surface with 6 sanitized repo-derived cases, a brief method section, explicit non-claims, and a CTA loop back to `/照`.

**Tech Stack:** Markdown, existing repo content in `README.md`, `examples/*.md`, `docs/superpowers/specs/2026-06-04-github-promo-package-design.md`, shell verification with `rg`, `wc`, and `git diff`

**Working rule:** Do not create intermediate content commits. Make one final local content-only commit after both assets pass the final acceptance checks.

---

## File map

- Modify: `README.md`
  - Role: short GitHub conversion page
  - Keep: one flagship case, install/usage path, minimal proof/method
  - Remove or replace: GitHub Discussion CTAs, extra above-the-fold explanation, oversized 11-rule detail block
- Create: `web-articles/catch-prompt-ambiguity-before-you-hit-enter.md`
  - Role: long-form proof page with 6 sanitized repo-derived cases, 3 full cases + 3 compressed cases, short 11-rule method, explicit “not a rewriter / not a scorer / not a precision claim” boundary, CTA back to `/照`
- Reference only:
  - `docs/superpowers/specs/2026-06-04-github-promo-package-design.md`
  - `examples/01-prd-review.md`
  - `examples/s-perf-vague-target.md`
  - `examples/r-dod-missing.md`
  - `examples/g-why-missing.md`
  - `examples/i-ssot-id-conflict.md`
  - `examples/v-layer-mismatch.md`

## Editorial guardrails

- Never expose local directory names, personal names, internal links, commit hashes, timestamps, or org-specific identifiers.
- Keep all proof framed as **ambiguity-before** and **reflection-after**. Do not present rewritten prompts as the output.
- Do not claim ROI, precision, accuracy, or business impact percentages.
- Keep the README first screen tight and scannable.
- Primary CTA everywhere: try `/照`.
- Secondary CTA: star or follow the repo.
- Run a placeholder scan before handoff: no `TODO`, `TBD`, `XXX`, `placeholder`, `coming soon`, or similar filler.

### Approved sanitized case pool

1. PRD review / vague product ask
2. S-PERF / vague performance target
3. R-DOD / undefined completion
4. G-WHY / output without outcome
5. I-SSOT / one concept, multiple definitions
6. V-LAYER / abstraction layer mismatch

### Approved reusable content snippets

Use these exact sanitized snippets when drafting.

**README flagship case snippet**

```md
Ambiguity-before
- “做一个支持先买后付的结账能力，性能要好，体验要流畅，上线尽快。”

Reflection-after
- `/照` 会先照出："性能要好"没有指标，"体验要流畅"没有验收口径，"上线尽快"不是完成条件。
```

**Short method bullets**

```md
- 用固定 11 条含混规则先照，不先改写你的 prompt
- 相关处再补公共资料或公开基准，不编造数字
- 返回的是 reflection，不是 judgment；要不要改由你决定
```

**Non-claims block**

```md
不是改写器，不打分，不承诺“更高准确率”。
它只是把你还没说清的地方，在发给 AI 前照出来。
```

---

### Task 1: Reshape the README into a short conversion page

**Files:**
- Modify: `README.md`
- Reference: `docs/superpowers/specs/2026-06-04-github-promo-package-design.md`
- Reference: `web-articles/catch-prompt-ambiguity-before-you-hit-enter.md`

- [ ] **Step 1: Replace the top CTA row so it no longer points to GitHub Discussions**

Replace the existing CTA line with this exact block:

```md
<p align="center">
  <a href="https://github.com/290963249/zhaoyaojing/blob/main/LICENSE">MIT</a>
  ·
  <a href="https://github.com/290963249/zhaoyaojing/blob/main/web-articles/catch-prompt-ambiguity-before-you-hit-enter.md">See 6 real cases</a>
  ·
  <a href="https://github.com/290963249/zhaoyaojing/blob/main/CONTRIBUTING.md">Contribute</a>
</p>
```

- [ ] **Step 2: Rewrite the above-the-fold section into a result-first, CTA-first shape**

Replace the current opening section near the top of the file with this exact structure:

```md
## What it catches

Most prompt failures start before the model answers. `/照` catches ambiguity before you hit Enter.

**Try `/照` on a prompt you were about to send anyway.**

### One real pattern

**Ambiguity-before**
- “做一个支持先买后付的结账能力，性能要好，体验要流畅，上线尽快。”

**Reflection-after**
- `/照` 会先照出："性能要好"没有指标，"体验要流畅"没有验收口径，"上线尽快"不是完成条件。

That is the job: make the hidden ambiguity visible before AI fills in the blanks for you.
```

- [ ] **Step 3: Compress “what it does” and “why it’s different” into two short bullet groups**

Insert these exact bullets after the flagship case:

```md
## What `/照` does

- 用固定 11 条含混规则先照，不先改写你的 prompt
- 相关处再补公共资料或公开基准，不编造数字
- 返回的是 reflection，不是 judgment；要不要改由你决定

## Why it feels different

- No rewrite theater
- No fake numbers
- No scores
- Built from real dogfood cases and example-derived patterns
```

- [ ] **Step 4: Keep install and usage visible, but tighten them**

Make the install/usage section read exactly like this:

```md
## Try now

Tell your AI agent:

> 帮我装上 github.com/290963249/zhaoyaojing 的照妖镜 skill

Or manually copy `skill/照妖镜.skill.md` into your skills directory.

```text
/照 帮我评审这个 PRD
/照 把这个接口做快一点
照一下 这个任务描述
```
```

Then add this exact CTA line directly below the code block so the README has a second trial moment after install/usage:

```md
**Try `/照` on a prompt you were about to send anyway.**
```

- [ ] **Step 5: Replace the oversized 11-rule table with a lighter trust signal and link-out**

Remove the full rule table from the README and replace it with this exact section:

```md
## Proof, not hype

- 1 个 README 旗舰案例
- 6 个脱敏真实模式详解：见 [See 6 real cases](https://github.com/290963249/zhaoyaojing/blob/main/web-articles/catch-prompt-ambiguity-before-you-hit-enter.md)
- 11 条固定含混规则
- 明确边界：不改写、不打分、不虚构精度
```

- [ ] **Step 6: Replace discussion-based sharing language with the approved secondary CTA**

Add this exact footer CTA near the end of `README.md`:

```md
## If this matches how you work

Try `/照` on your next PRD, spec, or task request.

If it resonates, star the repo or follow the project to watch the method evolve.
```

- [ ] **Step 7: Verify README constraints with exact commands**

Run:

```bash
rg -n 'discussions|Discussion|Share your case' "README.md"
wc -l "README.md"
rg -n 'Try now|See 6 real cases|No rewrite theater|No fake numbers|No scores|Try `/照` on a prompt you were about to send anyway\.' "README.md"
git -C "." diff -- "README.md"
```

Expected:
- `rg` for discussion references returns no matches
- `rg` for CTA/proof phrases returns matches
- `git diff` shows one flagship case, article link, a visible above-the-fold CTA, and shorter opening copy

---

### Task 2: Write the long-form proof article with the flagship case and two more full cases

**Files:**
- Create: `web-articles/catch-prompt-ambiguity-before-you-hit-enter.md`
- Reference: `examples/01-prd-review.md`
- Reference: `examples/s-perf-vague-target.md`
- Reference: `examples/r-dod-missing.md`

- [ ] **Step 1: Create the article with the exact title, opening, and first CTA**

Start the file with this exact block:

```md
# Catch Prompt Ambiguity Before You Hit Enter

Most prompt failures start before the model answers.

Not because the model is weak, but because words like “快一点”, “先支持”, “默认”, “上线”, and “做完” mean different things to different readers. `/照` is built for that moment before send: it reflects ambiguity in the prompt before AI confidently runs with the wrong assumption.

**Try `/照` on a prompt you were about to send anyway.**
```

- [ ] **Step 2: Add the flagship case using ambiguity-before vs reflection-after framing only**

Insert this exact section:

```md
## A pattern many teams already write

### Case 1 · 模糊 PRD / vague product ask

**Context**
A product request mixes feature intent, performance adjectives, and a vague deadline in one short brief.

**Ambiguity-before**
- “做一个支持先买后付的结账能力，性能要好，体验要流畅，上线尽快。”

**Reflection-after**
- `/照` reflected that “性能要好” has no metric, “体验要流畅” has no acceptance bar, and “上线尽快” is not a completion definition.
- It also surfaced that failure paths and business purpose were still unstated.

**Why this matters**
When a short PRD leaves speed, acceptance, and failure cases undefined, the model has to invent them.
```

- [ ] **Step 3: Add two more fully expanded proof cases from the approved set**

Insert these exact sections after Case 1:

```md
## Two more ambiguity patterns that show up in practice

### Case 2 · S-PERF / vague performance target

**Context**
A prompt asks for a system or workflow to be “fast” or “default” without naming a measurable target.

**Ambiguity-before**
- “把这个接口做快一点。”
- “让这个检查步骤变成默认动作。”

**Reflection-after**
- `/照` reflected that “快一点” still needs a target such as latency threshold, percentile, scope, and measurement window.
- It also reflected that “默认动作” sounds concrete but still hides frequency, scenario scope, and deadline.

**Why this matters**
If the target is not measurable, implementation quality becomes a matter of interpretation.

### Case 3 · R-DOD / undefined completion

**Context**
A roadmap or task request says work is “in progress”, “回收中”, or “尽快上线” without a falsifiable exit condition.

**Ambiguity-before**
- “这个版本先推进，数据持续回收中。”
- “这周尽快把它做完。”

**Reflection-after**
- `/照` reflected that status words are not Definition of Done.
- It surfaced the missing finish line: how many records, which checks, and by when count as done.

**Why this matters**
Without a clear completion test, downstream people cannot tell whether the milestone is real or just still moving.
```

- [ ] **Step 4: Verify the article opening still drives trial before method explanation**

Run:

```bash
rg -n 'Try `/照`|Case 1|Case 2|Case 3' "web-articles/catch-prompt-ambiguity-before-you-hit-enter.md"
wc -w "web-articles/catch-prompt-ambiguity-before-you-hit-enter.md"
```

Expected:
- Trial CTA appears near the top of the file
- The file contains the opening plus 3 full cases before any method or boundary section is added

---

### Task 3: Complete the article with the remaining three compressed cases, brief method, non-claims, and CTA loop

**Files:**
- Modify: `web-articles/catch-prompt-ambiguity-before-you-hit-enter.md`
- Reference: `examples/g-why-missing.md`
- Reference: `examples/i-ssot-id-conflict.md`
- Reference: `examples/v-layer-mismatch.md`

- [ ] **Step 1: Add the remaining three approved cases in compressed form**

Append this exact block after Case 3:

```md
## Three more patterns behind avoidable misalignment

### Case 4 · G-WHY / output without outcome

**Context**
A change list explains what will be shipped, but not which user problem it solves.

**Ambiguity-before**
- “新增输入检查、结构化卡片、JSON 输出、规则扩展。”

**Reflection-after**
- `/照` reflected that the list names outputs, not outcomes.
- It surfaced the missing question: which failure becomes less likely for which user once these additions exist?

**Why this matters**
A model can help produce output lists all day; it still cannot prioritize correctly without the underlying why.

### Case 5 · I-SSOT / one concept, multiple definitions

**Context**
The same term appears in two places but carries different meanings.

**Ambiguity-before**
- “用户 ID 走现有定义。”

**Reflection-after**
- `/照` reflected that “现有定义” is unsafe when multiple files, teams, or prompts may already define the same concept differently.

**Why this matters**
If one name maps to two meanings, both humans and models can follow different “authoritative” interpretations.

### Case 6 · V-LAYER / abstraction layer mismatch

**Context**
A request asks for alignment on the goal, but the response jumps straight into implementation form.

**Ambiguity-before**
- “先把协作里的误解降下来。”

**Reflection-after**
- `/照` reflected that the conversation is mixing why-level intent with how-level implementation details.

**Why this matters**
When the request and the response live at different layers, both sides can sound reasonable and still miss each other.
```

- [ ] **Step 2: Add the short method explanation and explicit boundary section**

Append this exact block after the six cases:

```md
## What `/照` actually does

- Scan the prompt with a fixed 11-rule ambiguity lens
- When relevant, look up public references or public benchmarks instead of inventing numbers
- Return reflection, not judgment

## What it does not do

- It does not rewrite your prompt into a “correct” version
- It does not assign a fake score
- It does not claim benchmarked precision or ROI that the repo has not established
```

- [ ] **Step 3: Add the agent-workflow explanation, narrow-scope note, and final CTA**

Append this exact block:

```md
## Why this shape matters for agent workflows

Agent workflows often fail early, when the request still sounds clear to the person who wrote it but leaves too much unstated for the model or the next reviewer. A reflection step before send is cheap, visible, and easier to inspect than a silent rewrite layer.

## Why the project is intentionally narrow

Zhaoyaojing is not trying to be a general AI evaluation platform. It focuses on one intervention point: prompt ambiguity before send.

## Try it on the next prompt you have not sent yet

Use `/照` before asking AI to build, decide, or review.

If this matches how you work, star the repo or follow the project to watch the method evolve.

*Trust note: the repo intentionally avoids external precision claims and ROI claims until a documented baseline exists.*
```

- [ ] **Step 4: Run sanitization, placeholder, and non-claim verification commands**

Run:

```bash
rg -n --no-filename 'dogfood/runs|commit hash|Discussion|discussions|精准|precision|ROI|accurate|accuracy|better prompts|guaranteed|TODO|TBD|XXX|placeholder|coming soon' "web-articles/catch-prompt-ambiguity-before-you-hit-enter.md"
rg -n 'Ambiguity-before|Reflection-after|What `/照` actually does|What it does not do|Try it on the next prompt' "web-articles/catch-prompt-ambiguity-before-you-hit-enter.md"
wc -l "web-articles/catch-prompt-ambiguity-before-you-hit-enter.md"
git -C "." diff -- "web-articles/catch-prompt-ambiguity-before-you-hit-enter.md"
```

Expected:
- No matches for internal-path remnants, discussion references, unsupported claim language, or placeholders
- Matches exist for ambiguity-before, reflection-after, method, non-claims, and CTA sections
- `git diff` shows all 6 sanitized cases and two CTA moments

---

### Task 4: Tighten both assets against the spec before handoff

**Files:**
- Modify if needed: `README.md`
- Modify if needed: `web-articles/catch-prompt-ambiguity-before-you-hit-enter.md`
- Reference: `docs/superpowers/specs/2026-06-04-github-promo-package-design.md`

- [ ] **Step 1: Run final copy-density, CTA, and placeholder checks**

Run:

```bash
rg -n 'Try `/照`|star the repo|follow the project|See 6 real cases|rewrite|judgment|fake score' "README.md" "web-articles/catch-prompt-ambiguity-before-you-hit-enter.md"
rg -n --no-filename 'TODO|TBD|XXX|placeholder|coming soon' "README.md" "web-articles/catch-prompt-ambiguity-before-you-hit-enter.md"
wc -l "README.md" "web-articles/catch-prompt-ambiguity-before-you-hit-enter.md"
git -C "." diff -- "README.md" "web-articles/catch-prompt-ambiguity-before-you-hit-enter.md"
```

Expected:
- Both files contain the primary CTA
- Both files contain the secondary star/follow CTA
- No placeholder text remains
- README diff reads shorter and denser than the original

- [ ] **Step 2: Do a manual acceptance pass against the spec**

Confirm, in order:

```text
README
- one flagship case only
- above-the-fold CTA visible
- second trial CTA appears after the Try now block
- no GitHub Discussion references
- minimal method, minimal proof, clear trial path

Article
- exact file path under web-articles/
- 6 sanitized repo-derived cases total
- 3 full cases + 3 compressed cases
- short 11-rule method
- explicit non-claims and non-rewrite framing
- CTA back to /照 plus star/follow

Package-level
- no local directory exposure in published copy
- no personal name exposure in published copy
- no fabricated precision or ROI
- no placeholder text
- before/after framing is ambiguity-before vs reflection-after
```

- [ ] **Step 3: Make final wording trims if either file drifts from concise, information-dense copy**

Apply these rules during the trim pass:

```text
- Delete any sentence that only repeats the previous line
- Prefer one bullet over one paragraph when the meaning is unchanged
- Keep only one flagship case in README even if more examples feel tempting
- In the article, keep 3 full cases and 3 compressed cases; do not expand all 6 equally
- Keep the phrase “reflection, not judgment” exactly once per file unless removal hurts clarity
```

- [ ] **Step 4: Create the final content-only commit without pushing**

Run:

```bash
git -C "." add -- "README.md" "web-articles/catch-prompt-ambiguity-before-you-hit-enter.md"
git -C "." commit -m "$(cat <<'EOF'
docs: tighten README and proof article for /照 trial
EOF
)"
```

Expected:
- Commit succeeds locally
- No push is attempted
- Final `git -C "." diff --stat HEAD~1 HEAD` shows only `README.md` and `web-articles/catch-prompt-ambiguity-before-you-hit-enter.md` changed