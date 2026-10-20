---
name: assumption-mapper
description: >-
  Surfaces and organizes team/stakeholder assumptions before research or a
  build begins — separating what's actually known (sourced) from what's
  believed (unsourced), so the work is designed to learn rather than
  confirm a decision already made. Triggers on: "what are our
  assumptions", "map our assumptions", "assumption workshop", "we think we
  know what users want", "before we start, what should we document",
  "how do I challenge this stakeholder's assumption", "hypothesis vs
  assumption", "assumption audit". Runs at `design-kickoff` Step 0/1 (best
  fit — before the PRD is drafted) or standalone on an already-approved
  `projects/<slug>/` task when a new open question surfaces mid-flight.
  Does not run research itself — produces a map that feeds `design-kickoff`'s
  Step 1.5 method recommendation and the PRD's "assumptions & open
  questions" section.
---

# Assumption Mapper

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Makes a team's unexamined beliefs visible **before** research or a build
starts — so effort goes toward learning, not confirming.

**Invoke in Cursor:** "map our assumptions about [topic]", "assumption
audit for [project]"

---

## Scope boundary

- **Fires on:** the start of a new `projects/<slug>/` task (composed into
  `design-kickoff` Step 0/1, before `brief.md` is drafted), a stakeholder
  request that reads like it's designed to confirm a decision already
  made, or a designer explicitly asking to separate known-from-believed
  mid-flight.
- **Does not fire standalone as a net-new project starter** — it maps
  assumptions *about* a topic that `design-kickoff` is already framing;
  if there's no task folder or kickoff in flight, open one first per
  `harness/ORCHESTRATOR.md` §2a.
- **Does not run research** — it produces the research goals that come
  *from* high-risk assumptions; `research-agent` (or
  `usability-test-guide` / a future method skill) does the actual sweep or
  study.
- **Never says "research validated X"** — research explores and
  evaluates assumptions, it never validates them. Use that language
  precisely in any output this skill or a downstream skill produces.

---

## Step 1 — Separate known from believed

Two buckets, every item sourced or it doesn't count as known:

- **What we know (with evidence)** — facts backed by prior
  `projects/*/findings.md`, `org-pack COMPANY-*` docs, analytics, or direct
  user feedback already on record. Cite it (`references/shared/source-links.md`).
- **What we believe (without evidence)** — everything else, including
  things that feel obvious. If you can't cite a source, it goes here.

Check `projects/<slug>/findings.md` and `COMPANY-SOURCES.md` first
— don't invent a "what we know" item without a real citation.

## Step 2 — Write out every assumption, sorted into four buckets

1. **User** — who we think users are, what they want, how they behave
2. **Problem** — how certain/widespread we think the problem is
3. **Solution** — what we think will fix it, before research says so
4. **Business/priority** — why we think this matters now, to whom

For each: state it as "we assume that ___", name where it comes from
(stakeholder opinion / prior research / analytics / support / intuition),
and its category.

## Step 3 — Rate on the 2×2

Confidence (1=unsure → 5=very confident) × Impact if wrong (1=low →
5=fundamental). Plot:

| | Low confidence | High confidence |
|---|---|---|
| **High impact if wrong** | Research these first | Challenge — feels settled, may not be |
| **Low impact if wrong** | Low priority | Probably fine to proceed |

## Step 4 — Turn top-left assumptions into research goals

For each low-confidence/high-impact assumption: "what would we need to
learn to know if this is true?" → that becomes a research goal, fed
forward into `design-kickoff` Step 1.5's method recommendation.

## Step 5 — The business-vs-user-problem check

Before finishing: has the ask been framed entirely as a business metric
("sign-ups are down") with no named user problem behind it? If so, that
framing is itself an assumption — surface it explicitly rather than
letting it pass as a given.

Business problem vs. user problem, side by side:
- Business: "Not enough people are signing up for our subscription."
- User: "Users can't find the information they need to feel confident
  signing up" / "users hit friction in the sign-up funnel they can't
  work through."

Ask directly: is this actually a customer problem, or only a business
metric? Could a technical issue explain it instead of a user problem?
Would solving it actually help customers, and how? Has prior research
already touched this?

## Step 6 — Check against common assumption patterns

Before closing the map, scan every "we believe" item against these six
recurring traps — flag any that match, they're usually the highest-risk
items on the 2×2:

- **"We already know"** — leaning on old research that's aged out as
  context shifted
- **"Users are like us"** — the team's own preferences/mental models
  standing in for the user's, especially across age, tech comfort, or
  domain expertise
- **"Users will tell us what they want"** — users describe problems
  well but don't design solutions; "users asked for X" ≠ "X solves it"
- **"Preference equals behavior"** — stated preference in a session
  rarely predicts actual behavior; past behavior does
- **"Metrics tell the whole story"** — drop-off/bounce/low-CSAT show
  *where*, never *why*
- **"Our users are power users"** — teams that build the product often
  recruit advocates/heavy users whose mental models don't match the
  median user

---

## Output format

```markdown
## Assumption map — [Project]

**What we know (sourced):**
1. [Fact] — Source: [link/date]

**What we believe (no evidence yet):**
- User: we assume ...
- Problem: we assume ...
- Solution: we assume ...
- Business: we assume ...

**Risk matrix — research these first (low confidence, high impact):**
- [Assumption] → research goal: [goal]

**Challenge these (high confidence, high impact — feels settled, may not be):**
- [Assumption]

**Business-vs-user-problem check:** [conflated? yes/no — explanation]
```

---

## Persist

Append to `projects/<slug>/findings.md` (dated, named `assumption-mapper`).
High-risk research goals feed directly into `design-kickoff`'s PRD
"Assumptions & open questions" section and Step 1.5's method
recommendation — hand off explicitly rather than leaving them stranded in
this output alone.

---

## Never do this

- Never call an unsourced belief "known" — if there's no citation, it's
  a "believed" item, full stop
- Never let this replace `design-kickoff`'s Step 0/1 sweep — it organizes
  what the sweep (or the stakeholder's own head) already surfaced, it
  doesn't substitute for checking `findings.md`/`COMPANY-SOURCES.md` first
- Never say research "validated" or "proved" an assumption — explored,
  evaluated, supported, or contradicted

---

## Related files

| File | Role |
|------|------|
| `../design-kickoff/SKILL.md` | Usual caller — Step 0/1, before PRD draft; Step 1.5 consumes this skill's research goals |
| `../research-question-sharpener/SKILL.md` | Turns this skill's research goals into answerable interview/study questions |
| `references/shared/source-links.md` | Citation format for "what we know" items |
| `references/worked-example.md` | Full walkthrough of a mapped assumption set, end to end |
