# Worked example — prioritizing a 5-item design backlog

**Request:** "I have five things on my plate and no time this sprint —
help me figure out what actually matters first: (1) referral entry-point
redesign, (2) waitlist notification copy pass, (3) settings sheet a11y
fix, (4) new onboarding illustration set, (5) checkout button tone audit."

## Step 1 — The real list

Five items as named. Checked `workload-agent` — none currently marked
in-flight elsewhere, so no committed-work conflict to flag.

## Step 2 — Score each on three axes

| Item | Evidence | Goal fit | Effort |
|---|---|---|---|
| Referral entry-points redesign | Strong — PROJ-174 findings.md has 3 logged sessions showing users miss the entry point | Referrals is a named active-work item (PROJ-170 adjacent) | Medium — 3-4 days |
| Waitlist notification copy pass | Weak — no logged user complaint or ticket cited, "felt off" in a Slack aside | No stated goal | Small — half day |
| Settings sheet a11y fix | Strong — accessibility skill flagged missing focus states in a prior audit | No named business goal, but a11y is a standing hard rule (§7.1.5) | Small — half day |
| Onboarding illustration set | Weak — no research or ticket, "would look nicer" | No stated goal | Large — 1-2 weeks (asset production) |
| Checkout button tone audit | Moderate — one support-ticket mention, not yet a pattern | Checkout is Engagement's named stream | Small — few hours |

## Step 3 — Rank with visible reasoning

| Rank | Item | Evidence | Goal fit | Effort | Why here |
|---|---|---|---|---|---|
| 1 | Settings sheet a11y fix | Strong | Standing hard rule | Small | Strong evidence + cheap + non-negotiable rule, not optional |
| 2 | Referral entry-points redesign | Strong | Named active work | Medium | Strong evidence + directly tied to active PROJ-170/174 work |
| 3 | Checkout button tone audit | Moderate | Named stream | Small | Real but single-signal evidence; cheap enough to just check |
| 4 | Waitlist notification copy | Weak | None stated | Small | Cheap, but no real evidence behind it — worth a quick pass only if 1-3 are done |
| 5 | Onboarding illustration set | Weak | None stated | Large | Weak evidence + most expensive — hardest to justify first |

**Already committed:** none found via `workload-agent`.

**Close calls / judgment ties:** items 3 and 4 are close on effort; tie
broken by evidence strength (moderate beats weak) per the default rule.

**Missing to firm this up:** no ticket/evidence source cited for items 2
(waitlist) or 4 (illustrations) beyond a verbal mention — flagged as
guesses, not findings.

## What this demonstrates

- Weak-evidence items don't get silently boosted to fill out the list —
  they land honestly low and the report says why.
- Effort alone never wins over evidence — item 5 is small-ish work
  wrapped in a big illustration production cost, correctly ranked last.
- The "close calls" section prevents the rank from claiming more
  precision than the inputs actually support.
