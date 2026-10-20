# Worked example — design rationale

Written for this harness's format, with an evidence-sourcing requirement,
`decisions.md` persistence, and a falsifiability check on the validation
plan.

## Scenario

A designer moved the cancellation policy disclosure from a modal
(shown after tapping "Confirm booking") to inline text above the confirm
button. A teammate asks why, three weeks after it shipped.

## Output

```markdown
## Design rationale — Cancellation policy moved from post-confirm modal to inline text

**Context:** Providers flagged that clients were disputing cancellation
fees, claiming they never saw the policy. The modal appeared only after
tapping "Confirm booking," which analytics showed 22% of users dismissed
without reading (avg. time-on-modal: 0.8s).

**Options considered:**
1. Keep the modal, add a required scroll-to-bottom before the confirm
   button inside it enables
2. Move the policy to inline text above the confirm button, always
   visible before the tap
3. Add a separate mandatory checkbox screen before checkout

**Evidence:**
- Modal dismiss time (0.8s avg, suggesting no real reading) — Source:
  analytics dashboard, cancellation-dispute investigation, 2026-07
- 7/12 interview participants in the manual-tracking provider study
  said they wished clients "actually saw" the policy before booking —
  Source: findings.md, research-synthesis entry 2026-08-09
- the company pattern precedent: `COMPANY-PATTERNS.md` prefers inline
  disclosure over gated modals for non-blocking legal/policy text when
  the content is short enough to scan in place

**Decision:** Option 2 — inline text above the confirm button.

**Reasoning:** The modal's 0.8s dismiss time is evidence people weren't
reading it regardless of gating; a scroll-gate (Option 1) would have
added friction without fixing the actual problem (attention, not
access). A mandatory checkbox screen (Option 3) would have added a full
extra step to every booking for a policy most bookings never trigger.
Inline text keeps the information in the natural reading path at the
exact moment of commitment, with zero added steps, and matches existing
the company precedent for this content type.

**Trade-offs accepted:** Inline text is less visually prominent than a
modal — a provider argued this makes it easier to miss, not harder. We
accepted this because the modal's own read-time data suggests visual
prominence wasn't the mechanism producing attention in the first place;
we're trading a false sense of certainty (a "seen" checkbox) for
placement in the actual decision moment.

**Validation plan:** Track cancellation-fee dispute rate for 4 weeks
post-launch against the pre-change baseline. If disputes citing "didn't
see the policy" don't drop by at least 30%, this decision needs
revisiting — that threshold was agreed with support ops before shipping.
```

## What changed once this ran

When the same question came up again a month later from a different
stakeholder, the designer pointed to `decisions.md` instead of
re-litigating the choice from memory — and the validation plan meant
the team already had an answer (disputes dropped 41%) instead of a
vague "seems better."
