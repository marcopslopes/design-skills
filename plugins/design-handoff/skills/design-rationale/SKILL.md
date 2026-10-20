---
name: design-rationale
description: "Writes down why a design decision was made — the options considered, the evidence behind the pick, and the trade-offs accepted — so it survives being questioned weeks or months later. Triggers on: \"write the rationale for this decision\", \"why did we choose this\", \"document why we went with [X]\", \"defend this decision in writing\", \"explain the trade-offs on this choice\", \"this will get questioned later, write it down\". Different from `ux-pattern`'s decision framework mode (that weighs already-generated options *before* a pick is made — this documents the pick *after*, for a record that outlives the conversation).   Different from `ticket-create`/`docs-brief` (those hand off work to be built — this defends a choice that's already final). Different from `design-handoff` (full eng spec sheet — this is why we chose X). Does not weigh options itself — if no decision has been made yet, route to `ux-pattern`'s decision framework mode first."
---

# Design Rationale

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Writes the reasoning behind a design decision down, in a form specific
enough to still make sense to someone reading it in three months with no
memory of the conversation that produced it.

**Invoke in Cursor:** "write the rationale for [decision]", "document
why we chose [X] over [Y]"

---

## Scope boundary

- **Fires on:** a decision that's already been made (in this session, in
  `ux-pattern`'s decision framework mode, or by the designer outside the
  harness) and needs a written record — usually because it departs from
  precedent, was debated, or is likely to be revisited.
- **Does not fire on:** accessibility-specific decisions, a11y tradeoffs,
  or eng a11y handoff specs — that's `accessibility-decisions` (same
  `decisions.md` log, different structure: impact / WCAG / implementable
  criteria).
- **Does not fire on:** weighing options that haven't been decided yet —
  that's `ux-pattern`'s decision framework mode; hand off there first if
  asked to "help me decide," then come back here once the pick is final.
- **Does not fire on:** routine, uncontested decisions with no real
  alternative considered — writing rationale for "used the standard
  primary button" wastes the read. Reserve this for decisions someone
  could reasonably ask "why not the other way?" about.
- **Never invents evidence.** If a decision was made on gut feel with no
  research/data/precedent behind it, say that plainly — "no evidence
  cited, decision made on [stated reasoning]" — rather than
  backfilling a research citation that doesn't exist.

---

## Step 1 — Name the decision precisely

Not "we redesigned the checkout" — "we moved the cancellation policy
disclosure from a modal to inline text above the confirm button." Vague
decisions produce vague rationale nobody can act on later.

## Step 2 — State the context and constraints

What problem or need prompted this? What constraints shaped the options
(technical, timeline, existing pattern debt)? Pull from
`projects/<slug>/brief.md` if one exists rather than re-describing from
memory.

## Step 3 — List the real alternatives considered

Brief description of each option that was actually on the table — not a
strawman. If only one option was ever considered, say so; don't invent
alternatives to make the process look more rigorous than it was.

## Step 4 — Cite the evidence

What informed the pick — user research (`findings.md` entries,
`research-synthesis`/`insight-writer` output), analytics, competitive
precedent (`competitor-scan`/`benchmark`), `COMPANY-PATTERNS.md`/
`COMPANY-ARCHETYPES.md` conformance, technical feasibility, or business
goal alignment (only if written down somewhere, never invented). Cite
each with a source, same discipline as `assumption-mapper`'s
known-vs-believed rule — no source, it's not evidence, it's opinion.
Named cognitive laws (`references/shared/interaction-laws.md`) and
visual-craft rules (`references/shared/ui-craft-rules.md`) are
**principle-based reasoning**, never a substitute for user research —
label them as such in the Evidence list.

## Step 5 — State the reasoning and trade-offs

Why this option over the alternatives — connect explicitly to the
evidence above, not to preference. Then name what was deprioritized and
why: every real decision costs something; naming the cost is what makes
the rationale defensible instead of one-sided.

## Step 6 — Name the validation plan

How will the team know if this was the right call? A metric, a planned
follow-up test, or an explicit "we won't know until \[X\] ships and we
see \[signal\]." A rationale with no way to be proven wrong isn't
falsifiable — flag that honestly if it's genuinely the case.

---

## Output format

```markdown
## Design rationale — [decision, stated precisely]

**Context:** [problem/need + constraints]

**Options considered:**
1. [Option A] — [brief description]
2. [Option B] — [brief description]

**Evidence:**
- [Evidence item] — Source: [findings.md entry / research-synthesis /
  competitor-scan / COMPANY-PATTERNS / etc.]

**Decision:** [Option chosen]

**Reasoning:** [why this option over the alternatives, tied explicitly
to the evidence above]

**Trade-offs accepted:** [what was deprioritized, and why that's an
acceptable cost]

**Validation plan:** [metric / planned test / "won't know until X"]
```

---

## Persist

Append to `projects/<slug>/decisions.md` — the same file and shape
`ux-pattern`'s decision framework mode and `ui-agent`'s variant-fork
already write to (chosen + rejected alternatives + why). One record for
"how did we decide," not a competing one. Run the finished rationale
through `references/shared/anti-ai-writing.md` before it goes in front
of a stakeholder — this skill checks substance, that file checks prose.

---

## Never do this

- Never write rationale for a decision that hasn't actually been made
  yet — that's a decision-framework job, not this one
- Never cite evidence that doesn't exist to make a gut-feel call look
  more researched than it was
- Never omit the trade-offs section because the decision "feels
  obviously right" — that's exactly the rationale most likely to get
  challenged later with no defense ready
- Never invent alternatives that were never really considered, just to
  pad the "options considered" section

---

## Related files

| File | Role |
|------|------|
| `../ux-pattern/SKILL.md` § Decision framework mode | Weighs options *before* a pick — this documents *after* |
| `../accessibility-decisions/SKILL.md` | A11y-specific decisions / tradeoffs / eng handoff |
| `projects/<slug>/decisions.md` | Shared decision log this skill writes to |
| `../insight-writer/SKILL.md` | Source of research evidence when a decision is research-driven |
| `references/shared/anti-ai-writing.md` | Prose check once the rationale is drafted |
| `references/shared/interaction-laws.md` | Named cognitive principles — cite as principle-based reasoning |
| `references/shared/ui-craft-rules.md` | Named visual-craft heuristics — same evidence label as laws |
| `references/worked-example.md` | Full worked rationale for a real decision |
