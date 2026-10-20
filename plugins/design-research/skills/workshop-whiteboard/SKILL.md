---
name: workshop-whiteboard
description: >-
  Runs a timed research-scoping whiteboard in a design workshop (or
  practice run) — given a vague prompt, maps problem → business impact →
  goals → method → recruitment → sample questions → synthesis →
  outcomes → timeline → next steps on a board the room can scan. Triggers
  on: "whiteboard this research ask", "workshop research plan on a
  board", "scope this study live with the team", "research planning
  workshop", "practice a research whiteboard", "30-minute research
  framing exercise". Workshop facilitation, not job-interview prep. Does
  not replace
  `decision-first-research` (Decision Brief) or `design-kickoff` Step
  1.5 (method rec once the decision is clear) — this is the live board
  exercise that often feeds those skills.
---

# Workshop Whiteboard (Research Scoping)

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

A timed board exercise for workshops: turn a vague "we need research on
X" into a coherent research approach the room can see, challenge, and
own — in ~25–30 minutes of board time, then present/discuss.

**Invoke in Cursor:** "whiteboard this research ask for the workshop",
"run a research scoping board on [prompt]"

---

## Scope boundary

- **Fires on:** live or practice workshop facilitation — mapping a
  research approach on a board from a vague prompt, with the team in the
  room (or simulating that).
- **Does not fire on:** hiring-interview prep as the primary goal (this
  skill's output is a workshop artifact + handoff to harness skills).
  Pure Decision Briefs
  without a board exercise → `decision-first-research`. Settled decision
  needing only a method pick → `design-kickoff` Step 1.5.
- **Companies / rooms are not expecting a perfect solution** — they
  need a coherent thought process. Same rule in a workshop: logic over
  polish.

---

## Facilitation setup

- **Timebox:** 25–30 min board, then 15–30 min walkthrough + pushback
- **Board sections in order** (leave space under each to add)
- **Facilitator role:** keep the room on problem→method alignment; call
  out when a "goal" is actually a solution in disguise
- **Output after:** photograph/export board → paste structured markdown
  into `findings.md` → offer handoff to `decision-first-research` /
  `screener-builder` / `usability-test-guide` / `research-question-sharpener`

---

## The 10-step board (core)

### 1. Define the problem
Prompts usually hand you a goal or a solution. Reframe to a research
problem.

Model: "We want to better understand how users [think about / decide /
interact with] [X] in order to [create / improve] [Y]."

Example: "make people buy travel insurance" → "understand mental models
and barriers around travel insurance purchase."

### 2. Business impact
Which KPIs / risks? (conversion, retention, churn, support volume, SUS,
SEQ…). Note you'd align metrics with stakeholders before locking scope.

### 3. Research goals (max 3)
Answerable by end of study. Discovery / pain / tools / meaning /
evaluate-usage — pick what fits; don't stack six goals.

### 4. Method + reasoning
Generative vs evaluative (or both). ≤3 methods. Always say **why**.
Common hybrid: 60-min 1x1 (talk + walk-the-product) + follow-up survey
to validate patterns.

### 5. Recruitment
Behavior first, demographics last. Sample sizes as starting points:
generative 10–15/segment; UT 5–7/segment; survey 25+ floor. Channel +
incentive sketch.

### 6. Sample questions or tasks
TEDW for interviews (Tell / Explain / Describe / Walk me through). For
UT: 2–3 tasks that avoid UI wording.

### 7. Analysis
Post-session debriefs; affinity; stakeholder involvement; mini-synthesis
every 5–7 if large. Name tools if relevant (FigJam, etc.).

### 8. Expected outcomes
Not "a report" — what it contains and which decisions it unlocks
(insights + clips, personas, journey map, prioritization matrix,
ideation workshop).

### 9. Timeline
Aim ~4 weeks end-to-end as a default board; show what you'd cut if the
window shrinks. If genuinely too short for real research: say so and
propose competitive scan + prior-findings review instead.

### 10. Next steps
Follow-up studies (concept → UT → benchmark); survey validation; how
you'll check whether findings were acted on.

**Optional if time:** assumptions/biases; clarifying questions you'd ask
stakeholders in intake.

---

## Workshop practice prompts (pick one)

Use the company-adjacent or product prompts; examples:

1. Usage of a secondary feature is low; team wants more paid conversions
   from it — approach?
2. New concept (e.g. AI try-on / smart lock / cash payments) — needs +
   concerns in four weeks?
3. Retention drop after first few uses — why, and how to improve?
4. Redesign a surface before a hard launch date — what's researchable
   vs what isn't?
5. Research maturity / mindset in the org — how would you approach
   improving it?

Timer on. Walk the 10 steps. Then invite pushback: "only two weeks?",
"B2B not B2C?", "unexpected findings?"

## What "good" looks like in the room

Score the board on: problem framing · goal–method alignment ·
participant thinking · synthesis fluency · business connection ·
clarity for non-researchers · intellectual honesty about unknowns —
**not** whether the solution is perfect.

---

## Output format

```markdown
## Workshop whiteboard — [Prompt]

**Problem (reframed):** …
**Business impact / KPIs:** …
**Goals (≤3):** …
**Methods + why:** …
**Recruitment:** …
**Sample Qs / tasks:** …
**Analysis plan:** …
**Outcomes:** …
**Timeline:** …
**Next steps:** …

**Handoff:** [decision-first-research / design-kickoff 1.5 /
screener-builder / …]
```

---

## Persist

Append to `projects/<slug>/findings.md` (dated, `workshop-whiteboard`).
If the workshop locked a decision + window, run
`decision-first-research` next; if only method is open, Step 1.5.

---

## Never do this

- Never start with methods before the problem is reframed
- Never use demographic-only recruitment criteria on the board
- Never pretend a 1-week window can carry a full generative study —
  say what you'd do instead
- Never treat this as a substitute for `decision-first-research`'s
  written Decision Brief when the ask needs a durable ticket artifact

---

## Related files

| File | Role |
|------|------|
| `../decision-first-research/SKILL.md` | Durable Decision Brief after the board |
| `../design-kickoff/SKILL.md` § Step 1.5 | Method pick once decision is clear |
| `../research-shareout/SKILL.md` | Later: how findings get shared |
| `references/worked-example.md` | Full board walkthrough |
