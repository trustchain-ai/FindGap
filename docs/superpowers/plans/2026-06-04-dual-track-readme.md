# Dual-Track README Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** rewrite `/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md` in place into a mirrored Simplified Chinese / English dual-track README that improves above-the-fold conversion while staying strictly honest about the current 20-run baseline.

**Architecture:** keep this as a single-file structural rewrite of `README.md`, not a multi-file docs expansion. The new README should use the same story in both languages, mirrored section-by-section, with the section order locked to hero, proof, CTA, try-now, trust, method, compressed FAQ, compressed roadmap, contribution/footer. Every claim must stay anchored to the existing baseline link and must not imply external validation, scores, or storage behavior beyond what the current README already states.

**Tech Stack:** Markdown, GitHub-flavored Markdown, shell verification with `rg`, `python3`, `git diff`, and manual browser preview on GitHub or local Markdown preview.

---

## File map

- Modify: `/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md`
  - Role: only implementation file for the approved Dual-Track redesign; contains both Chinese and English content in one mirrored structure.
- Reference only: `/Users/lihu/WorkSpace/ai/zhaoyaojing/dogfood/baseline.md`
  - Role: current source-of-truth evidence link for the 20-run baseline; README wording must stay honest against this file.
- Reference only: `/Users/lihu/WorkSpace/ai/zhaoyaojing/ROADMAP.md`
  - Role: detailed roadmap target; README should compress this into a short summary plus link, not duplicate detail.
- Reference only: `/Users/lihu/WorkSpace/ai/zhaoyaojing/CONTRIBUTING.md`
  - Role: contribution details; README should keep only a short contribution pointer plus link.

## Locked scope

- Only modify `/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md`.
- Do not create `README.en.md`, `README.zh.md`, or any new landing-page file.
- Do not change baseline numbers, rule counts, or confidence framing unless the current README already conflicts with `/Users/lihu/WorkSpace/ai/zhaoyaojing/dogfood/baseline.md`.
- Do not add user testimonials, adoption claims, benchmark claims, or product guarantees.
- Do not add installation variants beyond the current two paths: tell the agent to install, or copy the skill file manually.
- Commit steps are conditional on explicit user request only.

## Editorial guardrails

- Preserve the project name: `照妖镜 · Prompt Mirror`.
- Preserve the bilingual anchor approach using `#zh` and `#en`.
- Preserve the baseline link in the top proof surface.
- Preserve the core honesty language: no rewrites, no scores, no made-up numbers, current result is a first precision baseline rather than final recall or external-validity proof.
- Preserve the existence of the 11 rules table, but move it below trust and method so it supports the decision instead of blocking the decision.
- Compress FAQ and roadmap so they stop competing with the CTA.
- Keep the English track semantically equivalent to the Chinese track; do not let one language sell harder than the other.

---

## Task 1: Freeze the current README structure and evidence constraints

**Files:**
- Reference: `/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md`
- Reference: `/Users/lihu/WorkSpace/ai/zhaoyaojing/dogfood/baseline.md`

- [ ] **Step 1: Verify the exact target and evidence files exist**

Run:

```bash
ls "/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md" "/Users/lihu/WorkSpace/ai/zhaoyaojing/dogfood/baseline.md"
```

Expected:
- Both exact absolute paths print once.

- [ ] **Step 2: Snapshot the current README section order before rewriting**

Run:

```bash
rg -n '^## |^### |^---$|^<a id="zh"></a>|^<a id="en"></a>' "/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md"
```

Expected:
- Output shows the current mixed structure, including the Chinese top section and the shorter English tail section.

- [ ] **Step 3: Confirm the README still points to the baseline source of truth**

Run:

```bash
rg -n '20-run baseline|baseline' "/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md" "/Users/lihu/WorkSpace/ai/zhaoyaojing/dogfood/baseline.md"
```

Expected:
- `README.md` contains the baseline link.
- `dogfood/baseline.md` contains the baseline evidence the README is allowed to summarize.

- [ ] **Step 4: Freeze the honesty constraints that the rewrite must preserve**

Run:

```bash
rg -n '不改写|不打分|不编数字|No rewrites|No scores|made-up numbers|precision baseline|recall|external' "/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md"
```

Expected:
- Matches show the current honesty claims that must survive the rewrite in both languages.

---

## Task 2: Lock the replacement map for each existing README block

**Files:**
- Modify: `/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md`

- [ ] **Step 1: Replace the entire Chinese opening block with a new mirrored hero + proof + CTA surface**

Replace everything from line 3 anchor `<a id="zh"></a>` through the current link row and first horizontal rule with this structure:

```md
<a id="zh"></a>
**简体中文** | [English](#en)

> **按 Enter 之前，把含混照出来。**
>
> 照妖镜不是帮你重写 prompt，而是先把会让人和 AI 读出不同意思的地方照出来。
>
> 当前结论只建立在首轮 [20-run baseline](https://github.com/290963249/zhaoyaojing/blob/main/dogfood/baseline.md) 上：它更接近一条 precision baseline，不是最终 recall，也不是外部有效性证明。

<p align="center">
  <a href="https://github.com/290963249/zhaoyaojing/blob/main/LICENSE">MIT</a>
  ·
  <a href="https://github.com/290963249/zhaoyaojing/blob/main/dogfood/baseline.md">20-run baseline</a>
  ·
  <a href="https://github.com/290963249/zhaoyaojing/blob/main/CONTRIBUTING.md">Contribute</a>
</p>

## 先看证据，再决定要不要用

在首轮 20 次真实 `/照` 闭环里，最高频的含混不是“模型不够强”，而是需求本身没说清：

- `R-DOD` — 说了要做什么，没说做到什么算完成
- `V-STAKE` — 失败路径、影响对象、错了损失什么经常隐身
- `V-NAME` — 关键名词看起来一样，团队和 AI 实际理解不同
- `I-SSOT` — 同一个字段 / 状态 / 主键在多个地方各自定义

**结论很直接：** 大多数失败不是不会写 prompt，而是默认大家会读成同一个意思。

## 现在就试

如果你本来就要把一个 PRD、任务描述或设计请求发给 AI，先多做一步：用 `/照` 把含混照出来。
```

Success criteria:
- The opening surface becomes conversion-first instead of explanation-first.
- The baseline disclaimer remains visible above the fold.

- [ ] **Step 2: Delete the standalone block `## What 20 real runs made obvious` because its strongest content is absorbed into the new proof section**

Delete this existing section entirely after its content is moved:

```md
## What 20 real runs made obvious
...
**结论很直接：** 大多数失败不是“不会写 prompt”，而是“默认大家会读成同一个意思”。
```

Expected result:
- No duplicate proof section remains later in the README.

- [ ] **Step 3: Compress `## One real pattern` into the new trust/method layer instead of keeping it as an early standalone section**

Delete the standalone section:

```md
## One real pattern
...
That is the job: make hidden ambiguity visible before AI fills in the blanks for you.
```

Reuse its substance later inside the method section with this shorter bilingual-style Chinese snippet:

```md
**例子：** “做一个支持先买后付的结账能力，性能要好，体验要流畅，上线尽快。”

`/照` 不会先替你改写，而是先指出：`性能要好` 没有指标，`体验要流畅` 没有验收口径，`上线尽快` 不是完成条件。
```

- [ ] **Step 4: Replace the current `## What /照 does`, `## Why it feels different`, `## Install`, and `## Usage` sequence with a stricter CTA hierarchy**

Replace those four sections with this exact order and content skeleton:

```md
## 30 秒试一次

告诉你的 AI agent：

> 帮我装上 github.com/290963249/zhaoyaojing 的照妖镜 skill

或手动安装：复制 `skill/照妖镜.skill.md` 到你的 skills 目录。

### 直接这样用

```text
/照 把搜索API的P99延迟降到50ms以内
/照妖镜 做一个支持10万并发的实时消息系统
照一下 这个PRD
```

**适合用在：** 你准备让 AI 帮你构建、设计、评审、决策的时候。

**不适合用在：** 简短追问、闲聊、已经定位到具体报错的调试。
```

Expected result:
- Install comes after the decision to try, not before proof.
- Usage samples are visible without scrolling through method detail first.

- [ ] **Step 5: Replace the early explanatory blocks with a trust section that preserves baseline honesty**

Insert this new Chinese trust section after the try-now block:

```md
## 你得到的不是“评分”，而是 reflection

- 不改写你的 prompt，再假装自己很懂你
- 不打分，让一个虚构分数替你做决定
- 不编数字，相关处只补公共资料或公开基准
- 不把当前结果包装成“已经被外部验证”

现在能说的只有这些：它基于首轮 20 次真实闭环建立了第一条 baseline，说明哪些含混最常见；还不能说它已经覆盖所有 prompt 失败模式。
```

- [ ] **Step 6: Move the 11 rules table under a method section and preserve it rather than rewriting rule names**

Keep the existing rule table content, but change the lead-in to:

```md
## 它怎么照

先用固定 11 条规则照，再在相关处补公共资料或公开基准；返回的是 reflection，不是 judgment。
```

Preserve exactly:
- Rule IDs: `S-PERF`, `S-QUANT`, `S-NFR`, `R-DOD`, `G-WHY`, `G-NOGO`, `I-SSOT`, `I-ADR`, `V-NAME`, `V-STAKE`, `V-LAYER`
- The existing table structure and examples.

- [ ] **Step 7: Compress FAQ into two high-signal questions and remove the storage claim from the primary conversion path**

Replace the current three-question FAQ block with this exact Chinese FAQ:

```md
## FAQ

**Q: 这和“把 prompt 写得更好”有什么区别？**
A: 它不是给你抽象建议，而是按固定规则把当前 prompt 里可见的含混指出来，并把结论锚定到真实 baseline，而不是空泛话术。

**Q: 为什么它是 skill，不是单独工具？**
A: 因为它直接工作在你的 AI agent 里，不要求你先切到另一个产品再回来。
```

Delete from the FAQ:
- The standalone storage question.

Reason:
- The user asked for compressed FAQ, and the storage answer is less important than decision and workflow fit.

- [ ] **Step 8: Compress roadmap into one sentence plus link**

Replace the current roadmap bullet list with:

```md
## Roadmap

当前重点不是继续加规则数量，而是先验证测量、扩外部灰度，再收紧高 ROI 规则的 precision 与表达边界。

详见 [ROADMAP.md](ROADMAP.md)。
```

Expected result:
- README stops duplicating roadmap milestones that belong in `ROADMAP.md`.

- [ ] **Step 9: Preserve contribution and discussion links, but compress them into footer-level content**

Keep both intents from the existing `## Share your case` and `## Contribute` blocks, but rewrite them into this shorter footer pattern:

```md
## Share a case or contribute

如果 `/照` 抓到了一个真实含混，或者漏掉了一个真实含混，欢迎到 [Discussions](https://github.com/290963249/zhaoyaojing/discussions) 贴出 before / after。

这是一个 Markdown skill 项目；如果要贡献规则或案例，请直接修改 `skill/照妖镜.skill.md` 或 `examples/`，再按 [CONTRIBUTING.md](CONTRIBUTING.md) 提交 PR。
```

---

## Task 3: Build the mirrored English track instead of a short English summary tail

**Files:**
- Modify: `/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md`

- [ ] **Step 1: Replace the current short English tail with a full mirrored structure**

Replace everything from `<a id="en"></a>` to the end of file with this section order:

```md
<a id="en"></a>
[简体中文](#zh) | **English**

## Catch ambiguity before you hit Enter
## See the evidence first
## Try it now
## What you get is reflection, not a score
## How it works
## FAQ
## Roadmap
## Share a case or contribute
```

Expected result:
- English is no longer a compressed afterthought.
- Both language tracks use the same section order.

- [ ] **Step 2: Write the English hero and proof blocks as a semantic mirror of the Chinese track**

Use this exact English content:

```md
## Catch ambiguity before you hit Enter

Prompt Mirror does not rewrite your prompt for you first. It surfaces the parts that humans and AI are likely to read differently.

The current claim is intentionally narrow: it is grounded in the first [20-run baseline](https://github.com/290963249/zhaoyaojing/blob/main/dogfood/baseline.md). That gives us a precision baseline, not final recall and not external-validity proof.

## See the evidence first

Across the first 20 real `/照` runs, the most repeated failures were not model weakness but request ambiguity:

- `R-DOD` — no clear definition of done
- `V-STAKE` — no failure path, affected-role framing, or downside visibility
- `V-NAME` — the same key term means different things to different readers
- `I-SSOT` — the same field or status is defined in more than one place

**The takeaway is simple:** most failures are not “bad prompting” but “assuming everyone reads the same words the same way.”
```

- [ ] **Step 3: Write the English CTA and usage blocks as a mirror of the Chinese track**

Use this exact English content:

```md
## Try it now

Tell your AI agent:

> Install the Prompt Mirror skill from github.com/290963249/zhaoyaojing

Or install manually by copying `skill/照妖镜.skill.md` into your skills directory.

### Use it like this

```text
/照 review this PRD
/照 make this API faster
照一下 这个任务描述
```

**Use it when:** you are about to ask AI to build, design, review, or decide something.

**Skip it when:** you are sending a short follow-up, casual chat, or debugging a specific error that is already isolated.
```

- [ ] **Step 4: Write the English trust and method blocks, including the compressed example and preserved rule table**

Use this exact English trust section:

```md
## What you get is reflection, not a score

- No prompt rewrites that pretend to know your intent better than you do
- No scores that collapse a nuanced request into a fake number
- No made-up metrics; public references or public benchmarks only when relevant
- No claiming the current result is already externally validated

What we can say today is narrower: the first 20 real closed-loop runs establish an initial baseline for which ambiguity patterns show up most often. They do not prove coverage of every prompt-failure mode.
```

Then add this method lead-in before the existing rules table:

```md
## How it works

It checks your request against 11 fixed ambiguity rules first, then pulls in public references only where relevant. The output is reflection, not judgment.

**Example:** “Build a buy-now-pay-later checkout flow. Performance should be good, the experience should feel smooth, and launch should happen quickly.”

`/照` does not start by rewriting that request. It first points out that `good` has no metric, `smooth` has no acceptance bar, and `quickly` is not a definition of done.
```

Preserve:
- The existing rule table itself, translated only if you are already translating the whole table consistently in this edit.
- If full table translation would introduce drift, keep the current bilingual-friendly rule table unchanged in both tracks.

- [ ] **Step 5: Write the English compressed FAQ, roadmap, and footer**

Use this exact content:

```md
## FAQ

**Q: How is this different from “just write better prompts”?**
A: It does not give vague advice. It points out visible ambiguity in the current request using fixed rules and anchors the framing to a real baseline.

**Q: Why is this a skill instead of a standalone tool?**
A: Because it works inside your AI agent, so you can check ambiguity before you send the request instead of switching to another product first.

## Roadmap

The near-term focus is not adding more rules. It is validating the measurement, expanding external gray traffic, and tightening the precision and wording boundaries of the highest-ROI rules.

See [ROADMAP.md](ROADMAP.md) for details.

## Share a case or contribute

If `/照` caught a real ambiguity, or missed one, open a [discussion](https://github.com/290963249/zhaoyaojing/discussions) and paste the before / after.

This is a Markdown skill project. To contribute rules or examples, edit `skill/照妖镜.skill.md` or `examples/`, then follow [CONTRIBUTING.md](CONTRIBUTING.md).
```

---

## Task 4: Verify block-level preserve, delete, compress, and replace decisions

**Files:**
- Modify: `/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md`

- [ ] **Step 1: Verify preserved blocks stayed preserved**

Preserve exactly or semantically preserve without expanding:
- Project title `# 照妖镜 · Prompt Mirror`
- Language anchors `#zh` and `#en`
- Baseline link in the top proof surface
- MIT / baseline / contribute link row
- 11-rule table content and rule IDs
- Links to `CONTRIBUTING.md` and `ROADMAP.md`

Run:

```bash
rg -n '^# 照妖镜 · Prompt Mirror$|<a id="zh"></a>|<a id="en"></a>|20-run baseline|MIT|CONTRIBUTING.md|ROADMAP.md|S-PERF|V-LAYER' "/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md"
```

Expected:
- All preserved elements remain present.

- [ ] **Step 2: Verify deleted blocks are gone as standalone sections**

Delete as standalone sections:
- `## What 20 real runs made obvious`
- `## One real pattern`
- the old `## What /照 does`
- the old `## Why it feels different`
- the old expanded `## Contribute` block

Run:

```bash
rg -n '^## What 20 real runs made obvious$|^## One real pattern$|^## What `/照` does$|^## Why it feels different$|^## Contribute$' "/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md"
```

Expected:
- No matches.

- [ ] **Step 3: Verify compressed blocks are shorter and lower in the page**

Compress:
- FAQ from three questions to two questions per language
- Roadmap from milestone bullets to one short paragraph per language
- Contribution/discussion from two separate sections into one combined footer section per language

Run:

```bash
python3 - <<'PY'
from pathlib import Path
text = Path('/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md').read_text()
for marker in ['## FAQ', '## Roadmap', '## Share a case or contribute', '## Share your case']:
    print(marker, text.count(marker))
PY
```

Expected:
- `## FAQ` appears twice.
- `## Roadmap` appears twice.
- `## Share a case or contribute` appears twice.
- `## Share your case` appears zero times.

---

## Task 5: Verify conversion-first structure and bilingual mirroring

**Files:**
- Modify: `/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md`

- [ ] **Step 1: Verify the section order in both languages matches the approved dual-track structure**

Run:

```bash
rg -n '^## ' "/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md"
```

Expected order for Chinese:
1. `## 先看证据，再决定要不要用`
2. `## 现在就试`
3. `## 30 秒试一次`
4. `## 你得到的不是“评分”，而是 reflection`
5. `## 它怎么照`
6. `## FAQ`
7. `## Roadmap`
8. `## Share a case or contribute`

Expected order for English:
1. `## Catch ambiguity before you hit Enter`
2. `## See the evidence first`
3. `## Try it now`
4. `## What you get is reflection, not a score`
5. `## How it works`
6. `## FAQ`
7. `## Roadmap`
8. `## Share a case or contribute`

Note:
- The Chinese hero remains in the opening blockquote above the first `##` section, so the first listed Chinese `##` is proof.

- [ ] **Step 2: Verify above-the-fold conversion focus**

Check the first 80 lines manually or with command output.

Run:

```bash
python3 - <<'PY'
from pathlib import Path
for i, line in enumerate(Path('/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md').read_text().splitlines(), 1):
    if i <= 80:
        print(f'{i:>3} {line}')
PY
```

Expected:
- The opening 80 lines contain all of these before the rules table:
  - project name
  - language switch
  - hero claim
  - baseline disclaimer
  - proof bullets
  - one clear CTA
  - install sentence
  - usage examples
- The rules table should not appear in the first 80 lines.

- [ ] **Step 3: Verify bilingual mirroring by comparing heading counts and CTA presence**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
text = Path('/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md').read_text()
checks = {
    'zh_cta': '## 现在就试' in text and '## 30 秒试一次' in text,
    'en_cta': '## Try it now' in text,
    'zh_trust': '## 你得到的不是“评分”，而是 reflection' in text,
    'en_trust': '## What you get is reflection, not a score' in text,
    'zh_method': '## 它怎么照' in text,
    'en_method': '## How it works' in text,
}
for name, value in checks.items():
    print(name, value)
PY
```

Expected:
- Every printed value is `True`.

- [ ] **Step 4: Verify baseline honesty and CTA hierarchy**

Run:

```bash
rg -n 'precision baseline|recall|external-validity|不改写|不打分|不编数字|Try it now|30 秒试一次|reflection, not a score|reflection，不是 judgment' "/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md"
```

Expected:
- Honesty framing appears in both language tracks.
- CTA sections appear before trust, method, FAQ, and roadmap sections.

- [ ] **Step 5: Verify the README does not overclaim unsupported behavior**

Run:

```bash
rg -n 'best|guarantee|proven|scientifically|validated|stores your prompts|saves your prompts|会保存|存储你的 prompt|评分' "/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md"
```

Decision rule:
- `评分` may appear only inside the trust section as something the tool does not do.
- `validated` or `proven` may appear only in negated honesty framing.
- `stores your prompts` and equivalent storage claims should not appear in the compressed README.

---

## Task 6: Review the final diff and stop before any commit

**Files:**
- Modify: `/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md`

- [ ] **Step 1: Inspect the final README diff only for the target file**

Run:

```bash
git -C "/Users/lihu/WorkSpace/ai/zhaoyaojing" diff -- "/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md"
```

Expected:
- The diff shows only the intended README structural/content rewrite.
- No unrelated files are included.

- [ ] **Step 2: Perform a final manual checklist pass**

Confirm all of the following are true:
- [ ] The Chinese and English tracks tell the same story in the same order.
- [ ] The first screen prioritizes decision and action over exhaustive explanation.
- [ ] The baseline disclaimer is still visible before heavy detail.
- [ ] The 11 rules table is preserved but moved lower.
- [ ] FAQ and roadmap are compressed.
- [ ] No new README files were created.
- [ ] No commit or push was performed.

- [ ] **Step 3: Stop and ask for approval before any git commit**

Use this exact handoff text after the file is ready:

```text
README rewrite is complete in `/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md` and verified against the dual-track plan. I have not committed anything. If you want, I can now prepare a commit message and create a commit.
```

---

## Self-review against the request

- Spec coverage: this plan covers the only implementation file, the exact approved order `hero -> proof -> CTA -> try-now -> trust -> method -> footer`, mirrored bilingual structure, block-level replace/delete/compress/preserve instructions, and verification for above-the-fold conversion focus, bilingual mirroring, baseline honesty, and CTA hierarchy.
- Placeholder scan: no `TODO`, `TBD`, or “write tests later” placeholders remain. All edit targets, section names, commands, and snippets are concrete.
- Consistency check: every file path is absolute, every block action refers to `/Users/lihu/WorkSpace/ai/zhaoyaojing/README.md`, and git steps are explicitly conditional on user request only.

Plan complete and saved to `docs/superpowers/plans/2026-06-04-dual-track-readme.md`. Two execution options:

1. Subagent-Driven (recommended) - I dispatch a fresh subagent per task, review between tasks, fast iteration

2. Inline Execution - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
