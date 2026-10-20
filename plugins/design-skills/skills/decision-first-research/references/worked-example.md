# Worked example — decision brief

Illustrative worked example, written for this harness — not a real project transcript.

## Scenario

A stakeholder says: "We have one week — can you run a survey on our
new pricing page?" No decision has been named yet.

## Running the four-question knife live

1. **What decision are you making?** Pushed past "understand pricing
   perception" to: "By Friday, we need to decide whether the new
   pricing page ships as-is or gets one more round of copy changes
   before the launch."
2. **What breaks if you're wrong?** If it ships with a comprehension
   problem, expect a support-ticket spike and a possible pause on a
   marketing push already scheduled for launch week.
3. **What do we already know?** Checked `findings.md` — a prior study
   found users skim pricing pages and rarely read fine print; nothing
   on this specific new layout yet.
4. **What single unknown blocks the call?** Do people understand what's
   included at each tier from the page alone, without asking support?

## Output

```markdown
Call on the table: Ship the new pricing page as-is by Friday, or hold
for a copy revision.
Risk if wrong: Support ticket spike + timing conflict with a scheduled
marketing push if comprehension fails post-launch.
Evidence we already have: Prior study — users skim pricing pages,
rarely read fine print (link: findings.md, 2026-03 pricing study).
Blocking unknown: Can users correctly state what's included in each
tier after viewing the page, unaided?
Research move: Forced-choice comprehension test, 12 people (6 per
tier confusion candidate), unmoderated, 2 days turnaround.
Date of call: Friday EOD.

**Evidence sentence (once data lands):** Ship the current page, backed
by 10/12 participants correctly identifying tier inclusions unaided, to
reduce the risk of a post-launch support spike.

**Method handoff:** Straight to a forced-choice comprehension test
(unmoderated) — no need for `usability-test-guide`'s full task-based
session structure, this is a comprehension check, not a task-completion
one.
```

## What changed once this ran

The stakeholder's original ask ("run a survey") would have produced
attitudinal opinion data by Thursday with no clear yes/no for Friday's
call. The decision-first framing swapped it for a 2-day comprehension
test that answered the actual blocking unknown in time.
