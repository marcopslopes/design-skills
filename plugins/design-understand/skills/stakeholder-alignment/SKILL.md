---
name: stakeholder-alignment
description: >-
  Maps who needs to agree with a design direction, what each of them
  actually cares about, where the real disagreement is, and drafts the
  specific ask/message that would move each one to yes — for any
  designer (IC or manager) who needs cross-functional buy-in on a
  direction, not just a status update. Triggers on: "how do I get buy-in
  on this", "PM and eng disagree on this direction", "how do I convince
  [stakeholder] this is the right call", "I need alignment before I can
  ship this", "who do I need on board for this", "this keeps stalling in
  review". Different from `manager-1on1-prep` (gated to managers, about
  one report's status) and `design-rationale` (documents a decision
  *after* it's final — this skill is about getting to yes *before* it's
  final). Does not draft or send messages on the designer's behalf
  without an explicit go — same posture as `ticket-create`/`confluence-brief`.
---

# Stakeholder Alignment

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Maps the real people who need to say yes to a direction, what each one
actually optimizes for, and where the disagreement really lives —
because most stalled design reviews aren't a taste disagreement, they're
an unnamed incentive mismatch (PM wants speed, eng wants scope
certainty, a stakeholder wants to avoid a repeat of a past incident).

**Invoke in Cursor:** "help me get buy-in on this direction", "how do I
align PM and eng on this"

---

## Scope boundary

- **Fires on:** a direction needs cross-functional agreement and it's
  stalling, contested, or hasn't been sounded out yet — any designer,
  IC or manager.
- **Does not fire on:** a manager's 1:1 prep for one named report
  (`manager-1on1-prep`) or documenting a decision that's already final
  (`design-rationale` — use that once alignment here is reached).
- **Never drafts or sends anything on the designer's behalf without an
  explicit go** — this maps the landscape and drafts the ask; a human
  sends it. Same posture as `ticket-create`/`confluence-brief`.
- **Composes with** `references/shared/source-links.md` when citing
  real Slack/Jira/Confluence threads as evidence of a stated position.

---

## Step 1 — Name every real stakeholder, not just the loud ones

List everyone whose sign-off (or silent veto) actually matters —
including people who haven't spoken up yet but could block later (legal,
a dependent squad, a PM who's been out). Use `COMPANY-SQUADS.md`
to check for a squad/PM/EM the designer might not have thought to name.

## Step 2 — State what each one actually optimizes for

Not a guess dressed as fact — pull from what they've actually said
(a Slack thread, a ticket comment, a past meeting) wherever possible.
If it's genuinely inferred rather than sourced, label it "inferred,"
same honesty standard `assumption-mapper` applies to
known-vs-believed. Common incentive shapes to check for: speed to ship,
scope/timeline certainty, avoiding a repeat incident, user metric
ownership, technical debt exposure, cross-team dependency risk.

## Step 3 — Find where the disagreement actually lives

Most "they don't like the design" disagreements are actually one of:
- **Risk tolerance** — one side wants to move fast, the other wants
  certainty first.
- **Scope** — agreement on the direction, disagreement on how much of
  it ships now vs. later.
- **Precedent** — a past incident/pattern is driving a stated objection
  that isn't really about this screen.
- **Unstated cost** — an engineering or ops cost nobody's said out loud
  yet.

Name which shape this is — a taste disagreement dressed as a "no" is
rare; check for the real shape first.

## Step 4 — Draft the specific ask for each stakeholder

Not one generic pitch — a short, specific ask per person that speaks to
what Step 2 found they actually care about. A PM who cares about
timeline certainty gets a different framing than an engineer who cares
about scope creep, even for the identical design decision.

## Step 5 — Sequence it

Who should hear this first? Usually: whoever has the most leverage to
unblock the others, or whoever's objection is actually the root of
Step 3's real disagreement — not alphabetically, not "whoever's online."

---

## Output format

```markdown
## Alignment map — [decision/direction]

| Stakeholder | What they optimize for | Source | Real objection (if any) |
|---|---|---|---|
| [name/role] | [stated priority] | [Slack thread / ticket / "inferred"] | [Step 3 shape, or "aligned already"] |

**Root disagreement:** [risk tolerance / scope / precedent / unstated
cost / "no real disagreement — just hasn't been asked yet"]

**Draft asks (sequenced):**
1. [Stakeholder] — [specific ask framed to their stated priority]
2. ...

**Not sending until you say go.**
```

---

## Persist

If this ties to an active `projects/<slug>/`, log the alignment map and
final outcome to `decisions.md` once resolved — feeds `design-rationale`
if a formal record is needed after alignment lands.

---

## Never do this

- Never draft or send a message/ask on the designer's behalf without an
  explicit go
- Never label an inferred motivation as a stated one — always mark
  "inferred" vs sourced
- Never treat a stalled review as a taste disagreement before checking
  for risk/scope/precedent/unstated-cost shapes first
- Never skip a real stakeholder because they haven't spoken up yet — a
  silent veto is still a veto

---

## Related files

| File | Role |
|------|------|
| `../manager-1on1-prep/SKILL.md` | Manager-gated, one-report status prep — different shape, different gate |
| `../design-rationale/SKILL.md` | Documents the decision once alignment is reached |
| `../assumption-mapper/SKILL.md` | Same known-vs-inferred honesty discipline applied here to stakeholder motivations |
| `COMPANY-SQUADS.md` | Source for squad/PM/EM names when mapping stakeholders |
| `references/shared/source-links.md` | Link real Slack/Jira threads cited as evidence of a stated position |
| `references/worked-example.md` | Full worked example resolving a PM/eng stalemate |
