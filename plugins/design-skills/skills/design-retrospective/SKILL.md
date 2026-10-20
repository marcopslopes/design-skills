---
name: design-retrospective
description: >-
  Structured post-ship (or milestone) reflection — what worked, what
  didn't, what to carry forward. Optionally appends *observational*
  notes to design-memory. Triggers on: "design retrospective", "retro
  this project", "what did we learn from [slug]", "reflect on this
  launch", "close out this project". Does not steer the next build from
  the record (`design-memory` stays inert). Does not replace
  `research-agent` verdict synthesis for "did the change help users."
---

# Design retrospective

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

A retrospective examines the whole process — wins, misses, surprises —
and turns hindsight into a clearer next start. It is not a blame post-
mortem and not a verdict on product metrics.

**Invoke in Cursor:** "retro this project", "what did we learn from
referrals entry-points", "design retrospective"

---

## Scope boundary

- **Fires on:** after a meaningful close (ship, share, abandoned spike,
  end of phase) when the designer asks to reflect.
- **Does not fire on:** "did this move the metric" → `research-agent`
  verdict mode; "document why we chose X" → `design-rationale`; weekly
  team process retros outside a `projects/<slug>/`.
- **design-memory:** may *offer* to append observational habit notes;
  never auto-writes; never loads the record to steer a future skill.

---

## Step 1 — Gather evidence

Read, in order:
1. `projects/<slug>/brief.md` (status, goal)
2. `decisions.md`, `findings.md`, `log.md`
3. `debt.md` if present (what stayed open)
4. Latest `audit` / critique outcomes if any

Do not invent wins or failures that aren't evidenced in those files.

---

## Step 2 — Facilitate (short)

Ask at most 3 questions via `AskQuestion` / plain text if needed — only
gaps the files can't answer (e.g. "what would you do differently on day
one?"). Infer the rest.

---

## Step 3 — Write the retro

```markdown
## Design retrospective — [slug] — YYYY-MM-DD

### What we set out to do
[From brief]

### What worked
- [Evidence-backed]

### What didn't / surprised us
- [Evidence-backed]

### Decisions that still look right
- [Pointers into decisions.md]

### Decisions we'd reopen
- [With why]

### Open debt we still owe
- [From debt.md — or "none"]

### Carry forward (for humans, not auto-applied)
- [1–5 practical notes for the next similar project]

### Optional — design-memory observations
[Only if designer opts in: descriptive habit signals, never "always do X"]
```

---

## Step 4 — Persist

1. Append the retro to `projects/<slug>/findings.md` (dated).
2. One line in `log.md` + `harness/logs/routing-log.md`.
3. If the designer opts in: append observational entries to
   `designer-context.local/design-record.md` per `design-memory` rules
   (descriptive, habit-revealing, never prescriptive).

---

## Never do this

- Never auto-apply carry-forward notes to the next `ui-agent` /
  `design-kickoff` run
- Never invent metrics outcomes ("conversion improved") without a sourced
  verdict
- Never skip open `debt.md` items — name them
- Never write "always use X" into design-memory

---

## Related files

| File | Role |
|------|------|
| `../design-memory/SKILL.md` | Optional observation sink |
| `../design-debt-tracker/SKILL.md` | Open promises to surface |
| `../research-agent/SKILL.md` | Product/outcome verdict (different job) |
| `docs/HOWTO-DESIGN-RETROSPECTIVE.md` | Designer guide |
