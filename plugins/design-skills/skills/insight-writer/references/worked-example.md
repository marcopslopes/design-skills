# Worked example — insight write + so-what check

Illustrative worked example, written for this harness — not a real project transcript.

## Scenario 1 — writing the insight

`research-synthesis` flagged a pattern: 5 of 12 interview participants
described re-checking a price on a second tab before completing a
booking, and 3 of those also expressed distrust that the price shown
would hold through checkout.

## Output

```markdown
## Insight — Booking price distrust

**Key learning:** Users don't trust that the price shown early in the
flow is the price they'll actually pay, so they leave the flow to
verify it elsewhere before committing.

**The why:** Past experience — with this product or others in the
category — where a displayed price changed by the final screen (fees,
taxes, or availability shifts appearing late) trained users to treat
early prices as provisional.

**The consequence:** Every trip to a second tab is a moment where the
user can get distracted, compare a competitor, or simply not come back
— this is a plausible driver of the 40%-within-10-minutes cancellation
pattern already logged in `findings.md`, not just a UI annoyance.

**Full insight (combined):** Users re-check prices on a second tab
before committing because past experience has taught them displayed
prices aren't final, which puts every booking at risk of abandonment
during that verification trip — independent of whether the price is
actually competitive.

**So-what check:**
| Question | Pass? | Fix if no |
|---|---|---|
| Specific enough? | Yes | — |
| Says why? | Yes | — |
| Consequence named? | Yes | — |
| Recommendation present? | Yes | "Show a locked, final price by the second screen, and label it as final" |
| Actionable by next week? | Yes | — |

**Classification:** Insight (meets the "negates a team assumption"
bar — the team assumed abandonment was pure price sensitivity)
```

## Scenario 2 — so-what check catching a weak insight

A draft insight reads: "Users found the onboarding flow frustrating and
wanted it to be easier." Run through the check:

- Specific enough? **No** — "frustrating" and "easier" say nothing a
  new PM could act on; could describe any product's onboarding.
- Says why? **No** — no underlying cause named.
- Consequence named? **No.**

**Rewrite:** "3 of 8 first-time users abandoned onboarding at the
permissions screen because the ask (location access) arrived before
they'd seen any value from the app, which reads as a trust ask with no
context — recommend moving the permission request to the point where
its value is obvious (e.g. right before the first location-based
result)."
