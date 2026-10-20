# Worked example — lightning synthesis

Illustrative worked example, written for this harness — not a real project transcript.

## Scenario

A team ran 8 generative interviews about why customers abandon a
multi-step booking flow, one per day, and wants insight material moving
in real time rather than one marathon synthesis session after
participant 8.

## Output (Mode 2 — lightning synthesis, after participant 5)

```markdown
## Synthesis — Booking abandonment interviews (Mode: lightning)

**Tags used:** Goal, Need, Pain point, Tools, Quick fix

**Clusters:**
| Cluster name | Tag | Participants (n/total) | Pattern? (meets 1/3 rule) |
|---|---|---|---|
| Re-checks price on a second tab before committing | Pain point | 3/5 | Yes (5 participants → 2+ threshold) |
| Wants to save progress and come back later | Need | 2/5 | Not yet — watch through participant 6-9 |
| Confused by which fields are required vs. optional | Quick fix | 4/5 | Yes — flagged for immediate fix, doesn't need full insight treatment |
| Distrust of final price until the very last screen | Pain point | 2/5 | Not yet, but contradicts team assumption |

**Contradicts a team assumption:** The team assumed abandonment was
about price alone. Two participants describe distrust of the price
itself changing between screens — not the price being too high. Worth
flagging even below threshold.

**Ready for insight-writer:** "Re-checks price on a second tab" and
"distrust of final price" together look like enough depth for one
combined insight already, ahead of finishing all 8 sessions — sending
to `insight-writer` now rather than waiting.
```

## What changed once this ran

Because the price-distrust pattern surfaced by participant 5 instead of
being buried until a single end-of-study synthesis session, the team
had a draft insight and a fix candidate (show a locked price early) in
front of eng a week before the original synthesis session would have
even started.
