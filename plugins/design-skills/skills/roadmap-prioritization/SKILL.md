---
name: roadmap-prioritization
description: >-
  Turns a flat list of design tickets/tasks into a ranked order, using
  explicit evidence (research, usage, business goal) and honest effort
  ("appetite") instead of gut feel or whoever asked loudest. Triggers on:
  "help me prioritize this backlog", "which of these should I do first",
  "rank these tickets", "what should I work on next", "we have 5 things
  and no time, which matters most", "is this actually more important than
  that". Does not run `workload-agent` (that reports what exists — this
  ranks it) or `benchmark`/`competitor-scan` (those are evidence inputs,
  not the ranking method itself). Does not replace `design-kickoff`'s
  human-approval gate for net-new work — this ranks already-scoped items.
---

# Roadmap Prioritization

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Ranks a backlog of design tasks against explicit criteria — evidence
strength, business goal fit, and honest effort — so the order is
defensible when someone asks "why is X above Y," instead of silently
reflecting whoever asked last or loudest.

**Invoke in Cursor:** "help me prioritize this backlog", "rank these
tickets", "what should I work on first"

---

## Scope boundary

- **Fires on:** a designer has 2+ concrete, already-named items (tickets,
  requests, ideas) and needs a defensible order — not "what should we
  build" (that's `design-kickoff`'s front door for net-new work) and not
  "help me choose between two directions for one screen" (that's
  `ux-pattern`'s decision framework mode — one artifact, multiple
  designs, not multiple backlog items).
- **Does not fire on:** ranking research methods (`decision-first-research`)
  or OKRs/goals themselves (`okr-goal-setting` — that skill sets the goal
  this one ranks work *against*).
- **Composes with:** `workload-agent` (pulls what's already in flight so
  ranking doesn't ignore committed work), `okr-goal-setting` (uses a
  stated goal/metric as one ranking input when one exists), `research-agent`
  verdict-synthesis mode and `insight-writer` (evidence inputs).

---

## Step 1 — Get the real list

Pull from, in order:
1. What the designer pastes/names directly in the request.
2. `projects/<slug>/brief.md` or `decisions.md` if items map to an
   active task folder.
3. `workload-agent`'s live snapshot if the ask is "prioritize what's on
   my plate" rather than a named list — never silently invent items.

Never pad the list with items the designer didn't actually name or that
`workload-agent` didn't actually surface.

## Step 2 — Score each item on three axes (not a single number)

For every item, state a short line on each axis — resist collapsing to
one opaque score before the reasoning is visible:

| Axis | Question | What counts as evidence |
|---|---|---|
| **Evidence strength** | Is there real signal this matters, or is it a guess? | `findings.md` entries, `insight-writer` insights, analytics, support-ticket volume, named user complaints — not "seems important" |
| **Goal fit** | Does it move a stated business/design goal? | An OKR from `okr-goal-setting`, a named business priority, or explicitly "no stated goal — flag this" |
| **Effort (appetite)** | Is this a day, a sprint, or a quarter — realistically? | Rough sizing only; if unknown, say "unsized" rather than guessing a number to look complete |

**Never invent evidence to make an item look better-justified than it
is.** An item with genuinely weak evidence should be scored weak — that's
useful information, not a flaw in the method.

## Step 3 — Rank, and show the reasoning that produced the rank

Order is: strong evidence + clear goal fit + low effort first; weak
evidence + no goal fit + high effort last. Ties break on effort (cheaper
first) unless the designer states a different tie-break rule.

**Never output a bare ranked list with no visible reasoning** — the
whole point is that the order survives "why is this above that."

## Step 4 — Name what's not on the list

State explicitly what's committed/in-flight already (from
`workload-agent`, if pulled) so the ranking doesn't silently compete
against work that's already been promised — flag the tension instead of
quietly reordering it away.

## Step 5 — Flag the honest uncertainty

If two items are close and the "right" order genuinely depends on a
judgment call (risk tolerance, timing, a stakeholder relationship), say
so — don't force false precision. A defensible "these two are close,
here's the tiebreaker we're using" beats a confident-looking rank that
hides a coin flip.

---

## Output format

```markdown
## Prioritization — [list name/context]

| Rank | Item | Evidence | Goal fit | Effort | Why here |
|---|---|---|---|---|---|
| 1 | [item] | [strong/moderate/weak — source] | [goal name or "none stated"] | [size] | [1 line] |
| 2 | ... |

**Already committed (not re-ranked):** [items from workload-agent, if any]

**Close calls / judgment ties:** [any items where the order is genuinely
debatable, and the tiebreaker used]

**Missing to firm this up:** [e.g. "no evidence for item 3 — flagging as
a guess, not a finding"]
```

---

## Persist

Append to `projects/<slug>/decisions.md` when the ranking ties to an
active task folder (same "chosen + reasoning" shape `design-rationale`
and `ui-agent`'s variant-fork already use) — this is the record for "why
did we do X before Y."

---

## Never do this

- Never produce a ranked list with no visible per-item reasoning
- Never invent evidence, business goals, or effort sizing to make the
  method look more rigorous than the actual inputs support
- Never silently reorder items that are already committed/in-flight —
  name the tension instead
- Never collapse three axes into one opaque score before showing the
  per-axis reasoning

---

## Related files

| File | Role |
|------|------|
| `../workload-agent/SKILL.md` | Source of what's already committed/in-flight |
| `../okr-goal-setting/SKILL.md` | Source of the goal this skill ranks work against, when one exists |
| `../insight-writer/SKILL.md`, `../research-agent/SKILL.md` | Evidence-strength inputs |
| `../design-rationale/SKILL.md` | Twin pattern for defensible written reasoning — use for a single big decision instead of a ranked list |
| `references/worked-example.md` | Full worked example ranking a real-shaped backlog |
