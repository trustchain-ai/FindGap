# README v0.8 Confirmation and Self-Scan Implementation Plan

> For agentic workers: use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to execute this plan task by task. Track completion with `- [ ]` checkboxes.

**Goal:** update `README.md` so it reflects the strongest 20-run evidence, confirm or refute the current v0.8 direction against the real baseline, and run one repo self-scan that reconciles message drift across the core project surfaces.

**Architecture:** treat the work as three linked documentation workstreams with one evidence spine. First verify the current story from `ROADMAP.md`, `CHECKPOINT.md`, `dogfood/baseline.md`, `dogfood/protocol.md`, and `dogfood/runs/`; then tighten `README.md` around the highest-signal findings; finally run a self-scan across the same surfaces and patch wording conflicts directly in source files instead of creating a side report.

**Tech stack:** Markdown plus shell verification with `ls`, `find`, `rg`, `wc`, and `git diff`

---

## File map

- Current plan file: `docs/superpowers/plans/2026-06-04-readme-v08-selfscan.md`
  - Role: execution plan for the three requested workstreams
- Modify: `README.md`
  - Role: primary promotion surface; should carry the highest-signal 20-run highlights and stay aligned with the project message
- Modify only if contradicted by evidence: `ROADMAP.md`
  - Role: source of record for v0.8 direction, goals, non-goals, and exit criteria
- Modify only if contradicted by evidence: `CHECKPOINT.md`
  - Role: compact current-state summary and packaging-intent snapshot
- Evidence source only unless a literal source contradiction is found: `dogfood/baseline.md`
  - Role: 20-run evidence summary with per-rule precision and aggregate results
- Evidence source only unless a literal source contradiction is found: `dogfood/protocol.md`
  - Role: TP/FP contract for all confirmation and self-scan checks
- Evidence source only: `dogfood/runs/`
  - Role: raw evidence set used to confirm whether baseline conclusions really hold across runs `005-024`

## Editorial guardrails

- Keep all claims anchored to the existing 20-run baseline.
- Do not invent new metrics, user outcomes, or external-user results.
- Do not add a score, ranking, or hype language to `README.md`.
- If a README sentence cannot be traced back to `ROADMAP.md`, `CHECKPOINT.md`, `dogfood/baseline.md`, `dogfood/protocol.md`, or `dogfood/runs/005-024`, delete it or rewrite it.
- If confirmation or self-scan finds a contradiction, fix the wrong source file directly; do not create a separate findings document.
- Do not edit `dogfood/baseline.md` or `dogfood/protocol.md` during normal reconciliation.
- Commit steps are conditional on explicit user request only.

---

## Task 1: Freeze the evidence scope before editing

**Files:**
- Reference: `README.md`
- Reference: `ROADMAP.md`
- Reference: `CHECKPOINT.md`
- Reference: `dogfood/baseline.md`
- Reference: `dogfood/protocol.md`
- Reference: `dogfood/runs/`

- [ ] **Step 1: Verify the exact files exist**

Run:

```bash
ls "README.md" "ROADMAP.md" "CHECKPOINT.md" "dogfood/baseline.md" "dogfood/protocol.md"
```

Expected:
- The five exact files print once each.

- [ ] **Step 2: Verify the run inventory and boundaries**

Run:

```bash
find "dogfood/runs" -maxdepth 1 -type f | sort
```

Run:

```bash
find "dogfood/runs" -maxdepth 1 -type f | rg '/0(0[5-9]|1[0-9]|2[0-4])-' | wc -l
```

Expected:
- The run list includes `005-ext-3ds-iframe-checkout.md` through `024-ext-durianpay-qris-s2s-api.md`.
- The count for runs `005-024` is exactly `20`.

- [ ] **Step 3: Confirm the baseline sample size and aggregate precision values are present at source**

Run:

```bash
rg -n 'runCount \| 20|totalHits \| 154|totalTp \| 151|totalFp \| 3|overall precision \| 0.9805' "dogfood/baseline.md"
```

Expected:
- Matches show the current aggregate baseline numbers directly in `dogfood/baseline.md`.

- [ ] **Step 4: Confirm the protocol still defines the TP/FP contract used by the baseline**

Run:

```bash
rg -n '真阳 \(TP\)|假阳 \(FP\)|判定流程|样本要求|统计口径' "dogfood/protocol.md"
```

Expected:
- Matches show the protocol still defines TP, FP, judgment flow, sample requirements, and counting method.

- [ ] **Step 5: Check whether the current project story already points at v0.8 and the strongest rule families**

Run:

```bash
rg -n 'v0\.8|I-SSOT|V-NAME|R-DOD|V-STAKE|I-ADR|G-NOGO|宣传包 spec 与 implementation plan 已落地' "README.md" "ROADMAP.md" "CHECKPOINT.md"
```

Decision rule:
- If `README.md`, `ROADMAP.md`, and `CHECKPOINT.md` already align with the evidence, preserve their claims.
- If any file omits or contradicts the evidence-backed v0.8 story, mark it for correction in later tasks.

---

## Task 2: Confirm or refute the current v0.8 direction from raw runs

**Files:**
- Reference: `ROADMAP.md`
- Reference: `CHECKPOINT.md`
- Reference: `dogfood/baseline.md`
- Reference: `dogfood/protocol.md`
- Reference: `dogfood/runs/`
- Modify only if contradicted by evidence: `ROADMAP.md`
- Modify only if contradicted by evidence: `CHECKPOINT.md`

- [ ] **Step 1: Confirm there are exactly 20 baseline runs in scope**

Run:

```bash
find "dogfood/runs" -maxdepth 1 -type f | rg '/0(0[5-9]|1[0-9]|2[0-4])-' | wc -l
```

Expected:
- Output is `20`.

- [ ] **Step 2: Check whether the high-frequency rule families in `CHECKPOINT.md` match `baseline.md`**

Run:

```bash
rg -n '^\| (R-DOD|V-STAKE|V-NAME|I-SSOT|I-ADR|G-NOGO) \|' "dogfood/baseline.md"
```

Run:

```bash
rg -n 'I-SSOT|V-NAME|R-DOD|V-STAKE|I-ADR|G-NOGO' "CHECKPOINT.md"
```

Decision rule:
- If `CHECKPOINT.md` names the same high-signal families without contradiction, leave it unchanged.
- If it omits, overstates, or contradicts the baseline, patch `CHECKPOINT.md` to match the evidence.

- [ ] **Step 3: Check whether the low-precision tuning target in `ROADMAP.md` still matches the baseline**

Run:

```bash
rg -n '^\| (G-WHY|V-LAYER) \|' "dogfood/baseline.md"
```

Run:

```bash
rg -n 'V-LAYER|G-WHY|总 FP：从 3 降到 ≤ 2|V-LAYER：FP 从 2 降到 ≤ 1|G-WHY：FP 从 1 降到 0' "ROADMAP.md"
```

Decision rule:
- If `ROADMAP.md` points v0.8 at `V-LAYER` and `G-WHY` with the same FP counts as the baseline, leave it unchanged.
- Otherwise patch `ROADMAP.md` to match the evidence.

- [ ] **Step 4: Spot-check raw runs to confirm the baseline does not overstate its conclusions**

Run:

```bash
rg -n '## 反馈|\| [0-9]+ \| (R-DOD|V-STAKE|V-NAME|I-SSOT|I-ADR|G-NOGO|G-WHY|V-LAYER) \| (TP|FP) \|' "dogfood/runs/005-ext-3ds-iframe-checkout.md" "dogfood/runs/010-ext-cybs-device-fingerprint.md" "dogfood/runs/015-ext-gpay-success-rate.md" "dogfood/runs/020-ext-misapp-error-message-optimization.md" "dogfood/runs/024-ext-durianpay-qris-s2s-api.md"
```

Expected:
- Each sampled run shows TP/FP judgments in the protocol format.
- The sampled runs include repeated appearances of the high-signal rule families and do not undermine the baseline summary.

- [ ] **Step 5: Patch `ROADMAP.md` or `CHECKPOINT.md` only if an evidence check fails**

Apply this rule exactly:

```text
- If any `ROADMAP.md` v0.8 claim disagrees with `dogfood/baseline.md`, fix `ROADMAP.md` to match the baseline numbers and rule priorities.
- If any `CHECKPOINT.md` high-frequency summary disagrees with `dogfood/baseline.md` or the sampled runs, fix `CHECKPOINT.md` to match the evidence.
- If all checks pass, leave both files unchanged.
```

- [ ] **Step 6: Verify the confirmation result left no message drift between roadmap and checkpoint**

Run:

```bash
rg -n 'v0\.8|V-LAYER|G-WHY|R-DOD|V-STAKE|V-NAME|I-SSOT|I-ADR|G-NOGO' "ROADMAP.md" "CHECKPOINT.md"
```

Run:

```bash
git -C "." diff -- ROADMAP.md CHECKPOINT.md
```

Expected:
- The wording across the two files points at the same v0.8 priorities.
- The diff is empty for these files unless evidence required a correction.

---

## Task 3: Rewrite `README.md` around the 20-run highlights

**Files:**
- Modify: `README.md`
- Reference: `ROADMAP.md`
- Reference: `CHECKPOINT.md`
- Reference: `dogfood/baseline.md`
- Reference: `dogfood/protocol.md`
- Reference: `dogfood/runs/`

- [ ] **Step 1: Replace the roadmap bullets at the bottom of `README.md` only if they do not already match the confirmed story**

Use this target block if replacement is needed:

```md
## Roadmap

- **v0.7**: 20 real `/照` runs to establish the precision baseline
- **v0.8**: strengthen the highest-leverage rules and tighten `V-LAYER` / `G-WHY`
- **v1.0**: stabilize the 11 rules and verify across Claude / GPT / Gemini

See [ROADMAP.md](ROADMAP.md) for the detailed plan.
```

- [ ] **Step 2: Add one short evidence section that promotes only verified patterns**

Insert this section between `## Usage` and `## The 11 Rules` only if the claims remain consistent with the evidence sources:

```md
## What 20 real runs made obvious

Across 20 real `/照` runs, the most repeated ambiguity clusters were:

- `R-DOD`: people say what to build, but not what counts as done
- `V-STAKE`: failure paths and affected roles stay implicit
- `V-NAME`: key terms sound shared, but teams mean different things
- `I-SSOT`: the same field or status gets defined in more than one place

This is why v0.8 is not a generic rewrite. It is a focused pass on the highest-leverage rule families, while tightening the two lower-precision rules: `V-LAYER` and `G-WHY`.
```

- [ ] **Step 3: Tighten the install-to-value path so the README message matches the current positioning**

Replace the current `## What it does` and `## Why it matters` opening only if the existing copy overreaches or misses the current positioning. Use this target structure:

```md
## What it does

`/照` scans your prompt for 11 recurring ambiguity patterns before it reaches the AI, then checks the relevant spots against public references or benchmarks when needed.

It does not rewrite your prompt or score it. It reflects where meaning is still underspecified so you can decide what to fix.

## Why it matters

Most AI misalignment starts before the answer.

A prompt says “fast”, “done”, “default”, “same as before”, or “keep it simple”. The model still has to choose an interpretation. `/照` makes that hidden choice visible before you press Enter.
```

- [ ] **Step 4: Keep the proof section explicit but small**

Add this section directly after `## Why it matters` only if the numbers remain identical to the baseline:

```md
## Why this direction

The current baseline is 20 real runs, 154 total hits, 151 TP, and 3 FP.

The takeaway is not “rewrite all 11 rules”. It is:

- strengthen the high-frequency, high-precision rules
- narrow the two lower-precision rules instead of changing everything
- keep the mirror narrow: catch ambiguity before send
```

- [ ] **Step 5: Verify the README now reflects the confirmed v0.8 story and baseline numbers**

Run:

```bash
rg -n '20 real `/照` runs|154 total hits|151 TP|3 FP|R-DOD|V-STAKE|V-NAME|I-SSOT|V-LAYER|G-WHY|v0\.8' "README.md"
```

Run:

```bash
wc -l "README.md"
```

Run:

```bash
git -C "." diff -- README.md
```

Expected:
- `README.md` contains the baseline numbers only if they still match the evidence.
- The README priorities match the confirmed v0.8 story from `ROADMAP.md`.
- The diff shows only the wording changes needed to tighten positioning and evidence framing.

---

## Task 4: Run the self-scan across the core surfaces and patch drift at source

**Files:**
- Modify if needed: `README.md`
- Modify if needed: `ROADMAP.md`
- Modify if needed: `CHECKPOINT.md`
- Reference: `dogfood/baseline.md`
- Reference: `dogfood/protocol.md`
- Reference: `dogfood/runs/`

- [ ] **Step 1: Run a wording-consistency scan for the core rule families and version story**

Run:

```bash
rg -n 'v0\.7|v0\.8|v1\.0|R-DOD|V-STAKE|V-NAME|I-SSOT|I-ADR|G-NOGO|G-WHY|V-LAYER|20 real|20 次真实|154|151|3 FP|precision baseline|精度基线' "README.md" "ROADMAP.md" "CHECKPOINT.md" "dogfood/baseline.md" "dogfood/protocol.md"
```

Expected:
- Every important claim in `README.md`, `ROADMAP.md`, and `CHECKPOINT.md` can be traced back to the evidence files.

- [ ] **Step 2: Remove or rewrite any README sentence that overreaches the evidence**

Apply these exact rewrite rules:

```text
- Delete any README claim about external users unless `ROADMAP.md` presents it as future work.
- Delete any README claim about ROI, adoption, or accuracy lift.
- Keep “20 real runs”, “154 total hits”, “151 TP”, and “3 FP” only if they remain identical to `dogfood/baseline.md`.
- Keep `V-LAYER` and `G-WHY` as the only named low-precision tuning targets unless `dogfood/baseline.md` changes first.
```

- [ ] **Step 3: Reconcile roadmap or checkpoint wording if self-scan finds version drift**

Apply this exact rule:

```text
- If `README.md` says v0.8 is a broad precision rewrite, change `README.md`.
- If `ROADMAP.md` or `CHECKPOINT.md` disagrees with the baseline about rule priorities or FP counts, change the source file that is wrong.
- Do not edit `dogfood/baseline.md` or `dogfood/protocol.md` unless you find a literal contradiction inside the evidence source itself.
```

- [ ] **Step 4: Run a final shell verification pass across all touched files**

Run:

```bash
rg -n '20 real `/照` runs|154 total hits|151 TP|3 FP|R-DOD|V-STAKE|V-NAME|I-SSOT|I-ADR|G-NOGO|V-LAYER|G-WHY' "README.md" "ROADMAP.md" "CHECKPOINT.md"
```

Run:

```bash
rg -n '真阳 \(TP\)|假阳 \(FP\)|判定流程|样本要求|统计口径' "dogfood/protocol.md"
```

Run:

```bash
rg -n 'runCount \| 20|totalHits \| 154|totalTp \| 151|totalFp \| 3|overall precision \| 0.9805|V-LAYER|G-WHY' "dogfood/baseline.md"
```

Run:

```bash
git -C "." diff -- README.md ROADMAP.md CHECKPOINT.md
```

Expected:
- The docs surfaces and evidence surfaces now point to one consistent v0.8 story.
- The diff contains only the source-file wording updates needed to achieve that consistency.

---

## Task 5: Final acceptance and optional git handoff

**Files:**
- Check: `README.md`
- Check if touched: `ROADMAP.md`
- Check if touched: `CHECKPOINT.md`
- Check: `dogfood/baseline.md`
- Check: `dogfood/protocol.md`
- Check: `dogfood/runs/`

- [ ] **Step 1: Run the acceptance checklist in this exact order**

Confirm:

```text
README update
- README reflects the 20-run evidence instead of a generic project pitch.
- README names the strongest repeated ambiguity clusters as R-DOD, V-STAKE, V-NAME, and I-SSOT.
- README names V-LAYER and G-WHY as the v0.8 tuning targets.
- README roadmap bullets match ROADMAP.md.

Multi-workflow v0.8 confirmation
- ROADMAP.md still matches baseline counts and priorities.
- CHECKPOINT.md still matches baseline counts and priorities.
- dogfood/protocol.md remains the judging contract.
- dogfood/runs/005-024 still support the baseline summary.

Self-scan
- No source file over-claims external adoption, ROI, or precision beyond the baseline.
- No source file contradicts the v0.8 direction.
- Any drift was fixed at source, not recorded in a side document.
```

- [ ] **Step 2: Capture the exact final diff for review before any commit discussion**

Run:

```bash
git -C "." status --short
```

Run:

```bash
git -C "." diff -- README.md ROADMAP.md CHECKPOINT.md
```

Expected:
- The working tree output shows exactly which source files changed.
- The diff is ready for review without requiring a commit.

- [ ] **Step 3: Only if the user explicitly asks for a commit, create one local docs commit**

Run only on explicit user request:

```bash
git -C "." add -- README.md ROADMAP.md CHECKPOINT.md && git -C "." commit -m "$(cat <<'EOF'
docs: align README with v0.8 baseline story

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

Expected:
- A single local docs commit is created only if the user explicitly requests it.
- No push is attempted.

---

## Self-review

### Spec coverage

- `README.md` is covered in Task 3 and Task 4.
- `ROADMAP.md` is covered in Task 2 and Task 4 as a source-of-record file that changes only if contradicted.
- `CHECKPOINT.md` is covered in Task 2 and Task 4 as a compact current-state file that changes only if contradicted.
- `dogfood/baseline.md`, `dogfood/protocol.md`, and `dogfood/runs/` are covered in Tasks 1, 2, and 4 as the evidence spine.
- The three requested workstreams are covered explicitly: README update, multi-workflow v0.8 confirmation, and self-scan.
- Commit behavior is marked conditional on explicit user request only.

### Placeholder scan

- No `TODO`, `TBD`, `implement later`, or conversational handoff text remains.
- Every verification step uses an exact command against the exact files in scope.
- Every assumption has been converted into an explicit decision rule.

### Type consistency

- The same rule names are used consistently throughout: `R-DOD`, `V-STAKE`, `V-NAME`, `I-SSOT`, `I-ADR`, `G-NOGO`, `G-WHY`, and `V-LAYER`.
- The same baseline numbers are used consistently throughout: 20 runs, 154 hits, 151 TP, 3 FP, overall precision 0.9805.
- All git diff and git add commands use repo-root-relative pathspecs when paired with `git -C "."`.
