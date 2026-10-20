---
name: okr-goal-setting
description: >-
  Writes a measurable design goal (an OKR-shaped objective + key results,
  or a single north-star-style metric) tied to a real business outcome —
  so design work has something concrete to be judged against instead of
  "this feels better." Triggers on: "help me write an OKR for this", "what
  should our goal be for X", "set a goal for this project", "what metric
  should we track", "how do we know if this design worked", "north star
  metric for X". Does not run the research that measures the metric
  (`research-agent` verdict-synthesis mode) or rank existing work against
  the goal (`roadmap-prioritization` — that consumes this skill's output).
  Does not replace `design-kickoff`'s PRD — a goal can feed into one, but
  this skill only produces the goal statement itself.
---

# OKR / Goal Setting

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Writes one measurable objective + the key results (or a single metric)
that would prove design work actually mattered — the thing missing when
a project ships and nobody can say whether it worked beyond "looks
good."

**Invoke in Cursor:** "help me write an OKR for [project]", "what metric
should we track for this"

---

## Scope boundary

- **Fires on:** a project, screen, or initiative needs a stated,
  measurable goal — before or during the work, not after it's already
  shipped with no goal (that's closer to `research-agent` verdict-synthesis
  mode trying to retrofit a verdict).
- **Does not fire on:** ranking multiple already-named backlog items
  (`roadmap-prioritization` — that skill *uses* a goal from here as one
  ranking input, doesn't produce the goal itself) or weighing design
  options for one screen (`ux-pattern` decision framework mode).
- **Never invents a business metric that isn't actually tracked** — if
  the team has no instrumentation for a proposed key result, say so
  plainly rather than writing a goal nobody can ever check.

---

## Step 1 — Name the objective (qualitative, ambitious, one sentence)

Not a metric yet — a statement of the outcome that matters. "Reduce
referral drop-off" not "increase referral CTR to 12%" (that's a key
result). Push back on objectives that are actually just tasks in
disguise ("ship the new entry point" is a task, not an objective — the
objective is what shipping it is supposed to cause).

## Step 2 — Write 2-4 key results (quantitative, falsifiable)

Each key result must be checkable — a number, a threshold, a date. If
the team genuinely has no way to measure a proposed key result (no
analytics event, no tracked metric), say that plainly and either:
- propose the smallest instrumentation change that would make it
  measurable, or
- drop it and say honestly "this objective currently has no measurable
  key result — flag to data/eng before treating this as trackable."

**Never pad with a vanity metric** (e.g. "ship the redesign" as a "key
result") — a KR that's true just by doing the work, with no outcome
signal, isn't a KR.

## Step 3 — Tie to an actual business/team priority

Cross-check against `designer-profile.local.md`'s Active work, a named
epic, or `COMPANY-SQUADS.md`'s stream ownership — a goal
that doesn't connect to anything the team already cares about is
unlikely to get resourced or tracked. If it doesn't connect to anything
stated, say so honestly rather than inventing a connection.

## Step 4 — State the baseline and the timeframe

A key result with no current baseline number and no deadline isn't
falsifiable. If the baseline is genuinely unknown, name that as the
first action item ("baseline unknown — instrument before committing to
a target").

## Step 5 — Sanity-check against Goodhart's law

Ask once, out loud: could this metric be gamed in a way that hurts the
real objective? (E.g. "increase clicks on the referral banner" could be
gamed by making the banner more annoying, not more useful.) Flag any
key result where that risk is real.

---

## Output format

```markdown
## Goal — [project/initiative name]

**Objective:** [one sentence, qualitative, outcome-focused]

**Key results:**
1. [Metric] — from [baseline] to [target], by [date]. Source: [analytics
   event / dashboard / "not yet instrumented"].
2. ...

**Ties to:** [named business priority / squad stream / epic, or
"no existing tie found — flagging"]

**Gaming risk:** [any KR that could be gamed against the real intent, or
"none identified"]

**Not yet measurable:** [any objective/KR with no current instrumentation]
```

---

## Persist

Write into `projects/<slug>/brief.md` (a goal belongs with the PRD it
supports) or `decisions.md` if it's set mid-project. `roadmap-prioritization`
reads this as a goal-fit input when ranking related backlog items.

---

## Never do this

- Never write a key result with no way to actually measure it and
  present it as trackable
- Never treat "ship the thing" as a key result — that's a task, not an
  outcome
- Never invent a business-priority connection that doesn't really exist
- Never skip the Goodhart's-law check on metrics that are easy to game
  (raw click counts, time-on-screen, etc.)

---

## Related files

| File | Role |
|------|------|
| `../roadmap-prioritization/SKILL.md` | Consumes this skill's goal as a ranking input |
| `../research-agent/SKILL.md` § Verdict synthesis mode | Measures whether the metric moved, once data exists |
| `../design-kickoff/SKILL.md` | A goal from this skill can feed into a PRD's success criteria |
| `references/worked-example.md` | Full worked example turning a vague ask into an objective + KRs |
