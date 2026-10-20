---
name: usability-test-guide
description: >-
  Builds a usability test discussion guide, task script, or session plan —
  quantitative (metrics: task success, time on task, SEQ, SUS) or
  qualitative (TEDW-based screen-by-screen feedback on a mid-fidelity
  design). Triggers on: "write a usability test script", "help me plan a
  usability test", "create tasks for usability testing", "I need to test
  this prototype with users", "build a UT plan", "we're doing usability
  testing next week". Does NOT cover generative 1x1 interviews, concept
  testing, or A/B tests — those need different skills/methods this repo
  doesn't have standalone yet; say so rather than stretching this one.
  Usually fires from `design-kickoff`'s Step 1.5 method recommendation
  (when it recommends "usability test") or standalone on an
  already-approved `projects/<slug>/` task with a Design Harness prototype ready
  to test — never on a net-new topic with no PRD (that's `design-kickoff`'s
  front door first).
---

# Usability Test Guide

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Builds a session-ready usability test guide — the same distinction and
rigor a dedicated UXR would bring — grounded in what the team actually
needs to learn, not a generic testing-101 template.

**Invoke in Cursor:** "write a usability test guide for [feature]",
"help me plan a UT for [prototype]"

---

## Scope boundary — read this before anything else

- **Fires on:** a real testing need against something that exists — a
  Design Harness prototype, a live screen, or a described flow with enough
  fidelity to task someone against. Fires standalone on an approved
  `projects/<slug>/` task, or as the output of `design-kickoff`'s Step
  1.5 method recommendation when it names "usability test."
- **Does not fire on:** generative discovery with no artifact yet (that's
  `research-agent`'s full kickoff pass or a 1x1 interview — this repo has
  no dedicated 1x1-interview skill yet; say so and offer to draft
  something adapted from this skill's TEDW section rather than silently
  running the wrong shape).
- **Does not build the prototype.** If nothing exists yet to test, this
  skill stops and hands off to `ui-agent` first.
- **Does not run the session or synthesize results** — this produces the
  guide only. Results/synthesis goes to `research-agent`'s verdict
  synthesis mode once the study actually runs, using
  `references/from-research-agent/test-plan-template.md`.

---

## Step 1 — Establish the type first

Before writing anything, determine which kind of usability test this is —
the session structure is fundamentally different:

- **Quantitative** — measuring effectiveness/efficiency/satisfaction with
  numbers (task success, time on task, SEQ, SUS). Participant talks
  minimally; you observe and measure. Use when the team needs to prove or
  benchmark something.
- **Qualitative** — experience-feedback session on a mid-fidelity design,
  TEDW-based questions instead of timed tasks. Use when the design isn't
  fully built and the team needs directional feedback, not performance
  data.

If the designer doesn't specify, ask one question: "Is this high-fidelity
with a complete flow to navigate, or mid-fidelity needing directional
feedback?" — not a generic "what do you want to learn" open-ender.

## Step 2 — Collect inputs

1. **Research goals** — what decisions does this need to support? Note
   explicitly what a usability test **can** answer (task completion,
   friction points, bugs) vs. **cannot** (preference between designs,
   statistically significant trends, willingness to pay).
2. **What's being tested** — which Design Harness prototype/route, or described
   flow, and its fidelity.
3. **Session type/length** — moderated/unmoderated, remote/in-person,
   45–90 min.
4. **Participant profile** — who, and how many segments.
5. **Metrics that matter** (quantitative only).

If a `projects/<slug>/brief.md` exists, pull goals and the "how will we
know it worked?" line from there instead of re-asking.

## Step 3 — Sample size (include in output)

- Moderated qualitative: 5/segment minimum, 10–15 for saturation
- Moderated quantitative: 5/segment minimum
- Unmoderated quantitative: 15+/segment
- Always per segment, never total across the whole pool

## Step 4 — Build the guide

### Quantitative structure
Introduction (5 min, think-aloud + consent) → warm-up (3–5 min, low-stakes,
no TEDW) → tasks (bulk of session, one at a time, observe silently, track
success/errors/time, SEQ after each) → optional debrief (after all tasks
only, never mid-task) → closing.

**Task writing framework** — every task needs: a user goal, realistic
context, any info they'd need given to them (don't make them guess), and a
reachable end state. Write as 1–2 plain-language sentences, second person.

Never: use interface wording verbatim in the task, write elaborate
fictional scenarios, use emotionally charged content, use loaded/biased
language, ask for something unreachable in the prototype, ask about
hypothetical future behavior.

Task count: 5–7 for 45–60 min, 8–12 for 90 min (15 is the ceiling for
long sessions — beyond that both participant and researcher fatigue).

**Weak vs. strong task, side by side** (weight this before writing your
own):
- Weak: "Find a service provider you'd love to book." — no context, no
  constraints, no end state, relies on personal preference.
- Strong: "You want to get a paint mix before a weekend trip. Find a
  advisor available this Saturday who charges less than $60. Start from
  the home screen." — context + constraint (price, day) + starting point
  + reachable end state (booking confirmation screen).

### End-of-session survey (quantitative only)

Default to UMUX-Lite over full SUS for session brevity, unless the team
specifically needs SUS for cross-study benchmarking:

- "[This product]'s capabilities meet my requirements." (1–7, agree)
- "[This product] is easy to use." (1–7, agree)

### Issue severity (apply when writing up stoplight findings)

- **Critical (red)** — prevents task completion or causes abandonment;
  fix immediately
- **Important (orange)** — causes real frustration/errors but the
  participant eventually completes; fix soon
- **Minor** — small friction or cosmetic; fix when capacity allows

### Qualitative structure
Introduction + TEDW warm-up (prime for story answers) → one-sentence
overarching scenario (orientation, not a task) → screen-by-screen TEDW
questions (customize per screen; don't force every question onto every
screen) → wrap-up → closing.

Core TEDW question bank to draw from: "talk me through the last time you
used something like this", "walk me through the number one problem you
notice here", "describe something that feels confusing / missing",
"describe how this compares to [alternative]", "tell me what you're
trying to achieve here."

### Metrics reference (quantitative only)
Effectiveness: task success (pass/fail or 3-point struggle scale), errors,
SEQ (7-point, after each task), confidence rating. Efficiency: time on
task, SMEQ. Satisfaction: SUS (10 questions, industry avg 68).

**Report format:** stoplight grid — participant columns, task rows,
green/orange/red, time per cell, averages in summary rows.

## Step 5 — Researcher reminders (always include in output)

- Never help during tasks — silence is data; redirect "am I doing this
  right?" to "what would you do if I weren't here?"
- Never ask preference questions in a usability session
- Never interrupt quantitative tasks with qualitative probes
- Track abandonment, not just completion
- Rotate prototype/task order across participants if comparing options
- Dry-run the guide once before the first real session

---

## Output format

```markdown
## Usability test guide — [Feature/prototype]

**Type:** Quantitative | Qualitative
**Session length:** [X] min · **Sample:** [N] per segment · **Mode:** [moderated/unmoderated, remote/in-person]

### Research goals
1. ...
2. ...

### Introduction (~5 min)
[Script]

### Warm-up (~3–5 min)
[Questions]

### [Tasks | Screen-by-screen questions]
Task 1 — Goal: ... / Scenario: ... / End state: ... / Metrics: ...
(or)
Screen 1: [name] — [TEDW questions]

### Wrap-up / debrief (~5–10 min)
[Questions — quant: after all tasks only]

### Closing (~2 min)
[Script]

### Researcher reminders
[From Step 5 above, tailored to this session]
```

---

## Persist

If run against an approved `projects/<slug>/` task: save the guide under
`projects/<slug>/testing/` (create `test-plan.md` from
`references/from-research-agent/test-plan-template.md` if one
doesn't exist yet, set Method + Success criteria from this guide's goals),
and append a dated entry to `findings.md` naming this skill. If there's no
task folder, return the guide in chat only — this skill never creates a
`projects/<slug>/` folder on its own.

---

## Never do this

- Never write a guide before establishing quant vs. qual — they are not
  interchangeable
- Never mix qualitative probing into a quantitative session
- Never fire on a net-new topic with no prototype/PRD — that's
  `design-kickoff`
- Never claim this skill ran the session or produced results — it writes
  the guide only

---

## Related files

| File | Role |
|------|------|
| `../design-kickoff/SKILL.md` § Step 1.5 | Usually the caller — recommends this skill when "usability test" is the right method |
| `references/from-research-agent/test-plan-template.md` | Where this guide's method/criteria land once a study is actually planned |
| `../research-agent/SKILL.md` § Verdict synthesis mode | Where results get synthesized after the session runs |
| `../ui-agent/SKILL.md` | Builds the prototype first if nothing exists to test yet |
| `references/worked-example.md` | Full quantitative guide example with tasks, metrics, and stoplight setup |
