# Worked example — assumption map

Illustrative worked example, written for this harness — not a real project transcript.

## Scenario

A stakeholder asks for a redesign of the booking-cancellation flow
because "cancellation rate is too high." No user problem has been named
yet — just a business metric. `design-kickoff` pauses at Step 0/1 and
runs this skill before drafting the PRD.

## Output

```markdown
## Assumption map — Cancellation flow redesign

**What we know (sourced):**
1. Cancellation rate rose 12% quarter-over-quarter — Source: analytics
   dashboard, Q3 report
2. 40% of cancellations happen within 10 minutes of booking — Source:
   analytics dashboard, Q3 report

**What we believe (no evidence yet):**
- User: we assume users cancel because they found a cheaper option
  elsewhere (stakeholder opinion — no interview or support-ticket data
  behind this)
- Problem: we assume the cancellation flow itself is confusing, not the
  underlying booking decision (intuition)
- Solution: we assume adding a "why are you cancelling" survey will fix
  the retention problem (stakeholder opinion)
- Business: we assume reducing cancellations is more valuable right now
  than improving initial booking accuracy (stakeholder priority, untested
  against the Q2 roadmap)

**Risk matrix — research these first (low confidence, high impact):**
- "Users cancel because they found something cheaper" → research goal:
  understand what happens between booking confirmation and cancellation
  for the 40% who cancel within 10 minutes — what are they doing in that
  window?
- "The cancellation flow itself is confusing" → research goal: watch 5
  users attempt a real cancellation and identify where friction or
  confusion actually occurs, vs. assuming it's the flow.

**Challenge these (high confidence, high impact — feels settled, may
not be):**
- "Reducing cancellations matters more than booking accuracy right now"
  — this reprioritizes the roadmap on a stakeholder's read of urgency,
  not on evidence; worth a 15-minute gut-check with the team before it
  quietly becomes the plan.

**Business-vs-user-problem check:** Conflated. "Cancellation rate is too
high" is a business metric with no named user problem behind it yet.
Rewritten user-problem candidates to test: "users book before they're
confident in the price" or "users hit friction between booking and the
service date that makes them bail." Research should confirm which (if
either) is real before design work starts.

**Common-pattern flags:**
- "Users cancel because of price" matches the **"users are like us"**
  trap loosely — no one on the team has actually asked a canceller why;
  it's the most convenient story, not a sourced one.
- "A survey will fix retention" matches **"users will tell us what they
  want"** — a cancellation-reason survey describes symptoms, it doesn't
  design the fix.
```

## What changed once this ran

`design-kickoff`'s PRD "Assumptions & open questions" section pulled the
two Risk-matrix items directly as open questions, and Step 1.5
recommended a short usability/observation study on the live
cancellation flow instead of the survey the stakeholder had already
half-committed to.
