---
name: decision-first-research
description: >-
  Scopes and frames a research request around the actual decision it
  needs to unblock, instead of a method or a vague ask — names the
  decision, the risk if wrong, what's already known, the one blocking
  unknown, and the smallest study that answers it within the deadline.
  Produces a Decision Brief and an evidence-formula sentence ("ship X,
  backed by Y, to reduce Z risk"). Triggers on: "we have a week for
  research", "stakeholder asked for a survey", "how do I scope this
  study", "decision brief", "my research isn't getting used", "our
  research sits on a shelf", "I have one week to do research", "how do
  I say no to a vague research request". Fires before method selection
  — hands off to `design-kickoff` Step 1.5 or `usability-test-guide` once
  the decision and window are locked.
---

# Decision-First Research

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Scopes research around the decision it unblocks, not the method someone
asked for by name — fixes the pattern where good research gets ignored
because it answered a question nobody was actually deciding on.

**Invoke in Cursor:** "help me scope this research request", "write a
decision brief for this"

---

## Scope boundary

- **Fires on:** a vague, time-boxed, or method-first research request
  ("run a survey", "we need research on X") where the actual decision
  hasn't been named yet.
- **Does not fire on:** generative discovery, category/vision work, or
  slow-burn "what jobs are we missing" research — those need open-ended
  exploration without a decision deadline forced onto them. Say so
  explicitly rather than squeezing exploratory work into this frame.
- **Composes with `design-kickoff` Step 1.5** — this skill's output
  (the named decision + blocking unknown + window) is exactly the input
  that step's method-recommendation reasoning needs when time is short.

---

## Step 1 — The four-question knife (run these out loud, in order)

1. **What decision are you making?** "We want to understand user
   preferences" is not a decision. Push: "If we didn't run research,
   what call would you make anyway?" / "By [date], what yes/no do you
   have to give?" If they can't phrase it in one sentence, it's not a
   research brief yet.
2. **What breaks if you're wrong?** Money, trust, compliance, time. If
   the honest answer is "nothing much," the decision doesn't need
   research — it needs a coin flip, and that's fine to say.
3. **What do we already know?** Dashboards, support tickets, old UTs,
   past studies — half the time the answer is already in the building.
   Check `projects/<slug>/findings.md` before recommending a new study.
4. **What single unknown blocks the call?** Not five interesting
   questions — one. If you can't name it in a line, stay here.

## Step 2 — The Decision Brief (one page, ≤200 words)

```
Call on the table: [one sentence]
Risk if wrong: [quantified — money, time, churn, compliance]
Evidence we already have: [links only]
Blocking unknown: [one line]
Research move: [method + sample + threshold]
Date of call: [when the decision gets made]
```

Fill it live with the stakeholder, screen-shared — their words reflected
back, not a researcher's guess at their intent.

## Step 3 — Scope backward from the deadline

1. Study ends before the call date — full stop, not "as close as we can
   get."
2. Hold to the single blocking unknown; ignore bonus hypotheses.
3. Match method to unknown type, not habit:

   | Unknown type | Method |
   |---|---|
   | Behavioral ("can they do it?") | 5–8 task-based sessions, pass/fail threshold |
   | Trade-offs ("which option?") | 8–12 choice-based tasks or lightweight conjoint |
   | Comprehension ("do they understand it?") | Forced-choice test, 10–15 people |
   | Demand ("will they buy/use it?") | Smoke test / pricing mock, click-through + intent |
   | Structural (IA/navigation) | `ia-methods` — card sort or tree test |

4. **Define "good enough" before recruiting** — e.g. "if 5/6 reach value
   unaided in 90s, keep the current design." Agree on the threshold
   before sessions start, not after data lands.
5. Timebox backward from the call date to today; if it doesn't fit, cut
   scope — never extend the timeline instead.

## Step 4 — The evidence formula

Every strong finding fits one line: **"Ship X, backed by Y evidence, to
reduce Z risk."** If you can't fill X/Y/Z, it's a fun fact, not a
finding — feed it to `insight-writer`'s so-what check instead of shipping
it as-is.

---

## Objection handling (borrow these phrases live)

- "We need a bigger sample" → "With this window we can't reach a
  statistically perfect sample — we can get directional evidence that
  makes this call safer, and validate at scale later."
- "We want to explore, not decide" → pin down what call the exploration
  feeds and when; design open-ended work for *that*, or flag this as
  generative work outside this skill's scope.
- "We already know the answer" → "Let's write the decision and the
  threshold that would prove it wrong — if we hit that threshold fast,
  we've saved a sprint."

---

## Output format

Use the Decision Brief template from Step 2, plus:

```markdown
**Evidence sentence (once data lands):** Ship [X], backed by [Y], to
reduce [Z] risk.

**Method handoff:** [design-kickoff Step 1.5 / usability-test-guide /
ia-methods / screener-builder] — [why]
```

---

## Persist

Write the Decision Brief into the feature ticket or `projects/<slug>/brief.md`
— not a standalone doc filed somewhere separate from where the work
happens. Log the decision, risk, evidence, and outcome in a running
Decision Log if the team keeps one.

---

## Never do this

- Never accept "run a survey" as the actual ask without naming the
  decision it feeds first — method-first requests are a symptom, not a
  brief.
- Never extend the timeline to fit a bigger study — cut scope instead;
  the call date is fixed, the study design is not.
- Never force generative/exploratory work into a Decision Brief just
  because someone asked for one — say plainly that this is discovery
  work with a different shape and timeline.

---

## Related files

| File | Role |
|------|------|
| `../design-kickoff/SKILL.md` § Step 1.5 | Consumes this skill's named decision + window when recommending a method |
| `../screener-builder/SKILL.md` | Recruits for the method this skill scopes |
| `../ia-methods/SKILL.md` | The method this skill routes to for structural/IA unknowns |
| `../insight-writer/SKILL.md` | The evidence-formula sentence overlaps with this skill's so-what check |
| `references/worked-example.md` | Full four-question-knife walkthrough and Decision Brief |
