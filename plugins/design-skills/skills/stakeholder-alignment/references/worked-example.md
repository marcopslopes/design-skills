# Worked example — PM and eng disagree on the referral entry-point scope

**Request:** "This keeps stalling — PM wants the full entry-point
redesign now, eng wants to ship a smaller version first. Help me get
alignment."

## Step 1 — Name every stakeholder

PM (named), eng lead (named), plus checked `COMPANY-SQUADS.md`:
Engagement squad also has a PM listed in Notes — confirmed it's the
same person, no additional hidden stakeholder found.

## Step 2 — What each optimizes for

| Stakeholder | Optimizes for | Source |
|---|---|---|
| PM | Hitting the quarterly referral-growth target tied to PROJ-174 | Stated directly in the Jira epic description |
| Eng lead | Not shipping a half-tested change into a payment-adjacent surface again after a past incident | Inferred from a Slack comment referencing "last time" without naming the incident directly — labeled inferred |

## Step 3 — Where the disagreement lives

Not a taste disagreement — this is **risk tolerance** (PM: ship now to
hit the metric window) crossed with **precedent** (eng: burned before on
a similar surface, wants staged rollout). Both are legitimate; neither
side has said the other's concern out loud yet.

## Step 4 — Draft asks

1. **Eng lead:** "Would a staged rollout — same full design, feature-flagged
   to 10% first — address the risk from last time, without blocking the
   full ship?" (speaks to precedent/risk, not to speed)
2. **PM:** "Eng's not against the direction — they want a staged rollout
   given [past incident]. Would hitting the metric with a 10% flag for
   week 1, full rollout week 2, still land inside the quarter window?"
   (speaks to timeline certainty, not asking them to drop urgency)

## Step 5 — Sequence

Eng lead first — their concern is the root blocker (precedent/risk); if
they agree to a staged rollout, the PM ask becomes "does this timeline
still work," which is easier to resolve second.

## Output

```markdown
## Alignment map — Referral entry-point rollout scope

| Stakeholder | What they optimize for | Source | Real objection |
|---|---|---|---|
| PM | Quarterly referral-growth target (PROJ-174) | Jira epic description | Wants full ship now — risk tolerance |
| Eng lead | Avoiding a repeat of a past payment-adjacent incident | Inferred from Slack — not directly named | Wants staged rollout — precedent |

**Root disagreement:** Risk tolerance crossed with precedent — not a
design-quality disagreement. Both sides already agree on the direction.

**Draft asks (sequenced):**
1. Eng lead — propose staged 10% flag rollout as the risk mitigation
2. PM — confirm the staged timeline still lands inside the quarter window

**Not sending until you say go.**
```

## What this demonstrates

- Surfaces that the two sides already agree on the actual design — the
  stall was scope/rollout mechanics, not taste, which changes what
  "alignment" even means here.
- Labels the eng lead's motivation as inferred rather than stating it as
  fact, since it was never said outright.
- Sequences by root blocker, not by whoever's easiest to reach first.
