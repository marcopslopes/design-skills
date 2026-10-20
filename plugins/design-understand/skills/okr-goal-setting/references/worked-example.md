# Worked example — writing a goal for the referral entry-points work

**Request:** "What should our goal be for the referral entry-points
project?"

## Step 1 — Objective

"Make the referral entry point discoverable enough that users who would
benefit from referring actually find and use the feature" — not "ship
the redesigned entry point" (that's a task).

## Step 2 — Key results

1. Referral entry-point engagement rate (tap-through from the surfaces
   it appears on) — baseline unknown, needs instrumentation before a
   target can be set.
2. % of eligible users (post-booking, no active referral sent) who send
   at least one referral within 7 days — from unknown baseline to a
   target once measured for 2 weeks.
3. Drop-off rate between "sees entry point" and "starts a referral" —
   from current ~unmeasured to a stated reduction target once
   instrumented.

## Step 3 — Tie to priority

Ties directly to PROJ-174 (referrals — journey per category), an active
item on the designer's own profile. Confirmed connection, not invented.

## Step 4 — Baseline and timeframe

All three KRs currently have **no baseline** — flagged as the first
action: instrument the three events above before committing to numeric
targets. Timeframe proposed as "review after 2 weeks of instrumented
data, set real targets then."

## Step 5 — Goodhart check

KR1 (raw tap-through) could be gamed by making the entry point more
visually loud/annoying rather than more genuinely useful — flagged.
Recommend KR2 (actual referral sends) as the primary KR since it's
harder to game with noise alone.

## Output

```markdown
## Goal — Referral entry-points

**Objective:** Make the referral entry point discoverable enough that
eligible users actually find and use it.

**Key results:**
1. Referral entry-point tap-through rate — baseline unknown, needs
   instrumentation. Source: not yet instrumented.
2. % of eligible users sending ≥1 referral within 7 days — baseline
   unknown, target set after 2 weeks of data. Source: not yet
   instrumented.
3. Entry-point-to-referral-start drop-off rate — baseline unknown.
   Source: not yet instrumented.

**Ties to:** PROJ-174 (referrals — journey per category), active on this
designer's profile.

**Gaming risk:** KR1 alone could reward a louder/more annoying entry
point rather than a more useful one — treat KR2 as primary, KR1 as a
supporting signal only.

**Not yet measurable:** all three KRs — instrumentation is the first
action item before targets can be committed.
```

## What this demonstrates

- Refuses to invent baseline numbers or targets that don't exist yet —
  names instrumentation as the real first step instead of faking
  precision.
- Catches a gameable metric (KR1) before it becomes the team's primary
  success signal.
- Ties to a real, already-active piece of work rather than inventing a
  business justification.
