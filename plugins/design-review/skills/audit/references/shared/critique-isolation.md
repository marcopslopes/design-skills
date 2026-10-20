# Critique isolation protocol

When one deliverable combines a **written design critique** (`ux-pattern` +
`content` — judgment) with a **mechanical code pre-share sweep** (`audit`'s
Checks 1–2, `scripts/design-detector`, a11y checks — provable evidence), run
the two as genuinely isolated passes, not one agent doing both in sequence in
the same context.

**Why isolation matters, not just thoroughness:** seeing the other
assessment's output first anchors the second pass. A pre-loaded detector
finding biases "does this feel right" toward agreeing with the tool; a
pre-loaded written craft opinion biases which mechanical findings get
soft-pedaled in the report. Two genuinely independent passes, combined
only at the end, catch what either pass alone — or a contaminated
combined pass — would miss or rationalize away.

**When this applies:** specifically the combined case —
`.cursor/rules/figma-critique-harness.mdc`'s "do they also want a code
pre-share sweep on `src/design-harness/pages/...`" branch, or any task that
explicitly asks for both a written critique and an `audit` pass on the
same deliverable. A routine `/audit` run on its own (one skill, one
documented Checks 1–5 workflow) is **not** this — it isn't being combined
with a *separate* written `ux-pattern`/`content` deliverable, so there's
nothing to isolate against.

## The two assessments

- **Assessment A — Design judgment.** `ux-pattern` (+ `content` when copy
  is in scope). Reviews structure, pattern conformance, heuristics, copy
  — see those skills' own `SKILL.md`. Must not read Assessment B's
  output, `scripts/design-detector`'s findings, or the audit report
  before or while forming its own opinion.
- **Assessment B — Mechanical evidence.** `audit`'s Checks 1–2 (DS
  validator via `scripts/design-detector`, a11y checker) plus any
  screenshot/browser evidence. Objective, rule-based — this is exactly
  the layer that's provable without judgment, same discipline as
  `../design-system/`'s human gate. Must not read Assessment
  A's written critique before or while running its checks.

## How to run it

1. Launch both as separate `Task` subagents in the **same message** (two
   parallel tool calls), each given only the target file list — never
   the other assessment's prompt, findings, or reasoning. Prefer
   `fork_context: false` / no shared transcript when the harness allows
   it — a reviewer that inherits the build thread inherits its framing.
2. Wait for both to return. **Do not let Assessment B's detector output
   (or any `[DS-*]` / `[A11Y-*]` draft) enter the parent synthesis
   context until Assessment A has finished returning.** Detector output
   is deterministic, but it still anchors judgment if seen early.
3. Combine into the standard two-layer report format
   (`SKILL.md` § "Two layers" table — that format
   doesn't change; only how the two halves are produced does). Put a
   one-line provenance header on the combined report:
   `Isolation: dual-Task | sequential A→B | DEGRADED (<reason>)`.

### Sequential fallback (only when Task/subagents are unavailable)

Finish and **record** Assessment A completely, then run Assessment B,
then synthesize. Never B-then-A (mechanical findings would contaminate
judgment). Still emit the `⚠️ DEGRADED` banner as the first line.

## When isolation can't be guaranteed

State it — don't silently downgrade to a single-pass combined critique.
Open the combined report with this as the **first line**, not a
footnote:

```
⚠️ DEGRADED — isolation not achieved: <reason, e.g. "no Task tool this
session" / "single-agent pass, no subagent isolation available">
Findings below may be cross-contaminated: [assessment] may have been
anchored by seeing [other assessment]'s reasoning before finishing.
```

Same visibility rule as `figma-ux-audit`'s the company-blocker language never
getting softened by lab tone — a degraded run is reported as degraded,
not quietly presented as a normal one.
