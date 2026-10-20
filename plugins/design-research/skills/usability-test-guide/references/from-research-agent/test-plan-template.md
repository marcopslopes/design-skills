# Test plan — [Project name]

Copy this into `projects/<task-slug>/testing/test-plan.md` when a validation
study is actually planned or run — not before. This closes the PRD's
"how will we know it worked?" question with real evidence instead of
leaving it as a permanent UNKNOWN. Owned by the `researcher` role (see
`harness/agents/researcher.md`); same discipline as `findings.md` — sourced,
dated, honest about sample size and confidence.

**Status:** PLANNED / RUNNING / COMPLETE
**Linked task:** `projects/<task-slug>/brief.md`
**Date opened:** [date]

## What's being validated

[The specific question from `brief.md`'s "How will we know it worked?" —
copy it verbatim so this file stays traceable back to the PRD, don't
restate it loosely.]

## Method

[Usability test / A-B test / survey / other. Tool: e.g. Lyssna, link
below. Why this method fits this question — not every question needs a
moderated study.]

## Success criteria

[Defined **before** the study runs, not adjusted after seeing results.
E.g. "≥70% of participants complete the referral share flow without
assistance" — a number and a threshold, not "people seem to like it."]

## Participants / sample

[Who, how many, how recruited. Note if the sample skews (e.g. only
existing power users) — that's a caveat on any result, not something to
omit.]

## Study links

- [Lyssna / tool link]
- [Any raw data export, if kept outside the tool]

## Results

*Append-only, dated — don't rewrite a prior entry if a later pass
changes the read on it, add a new dated entry instead.*

### [date] — [what ran]

[Findings, with actual numbers where the method produced them. State
sample size and confidence explicitly. If results are inconclusive or
contradict the hypothesis, say so — a null result is still evidence, and
overstating a thin result to look conclusive is worse than reporting
"not enough signal yet."]

**Verdict against success criteria:** met / not met / inconclusive.
**Next action:** [ship as-is / iterate / escalate to PM — whatever's
actually true, not a default.]
