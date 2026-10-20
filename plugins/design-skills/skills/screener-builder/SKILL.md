---
name: screener-builder
description: >-
  Builds a recruitment screener survey that filters for the right
  participants by behavior, not demographics — criteria list, 5–10
  questions with knockout logic, ordered so unqualified people are
  screened out early. Triggers on: "write me a screener", "help me
  recruit participants", "screener survey", "screener questions",
  "participant criteria", "who should I recruit", "build a recruitment
  screener". Feeds into `usability-test-guide` or `research-synthesis`
  once participants are being recruited for a real session.
---

# Screener Builder

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Builds the survey that filters for the right participants before a study
starts — behavior first, demographics last (or never).

**Invoke in Cursor:** "write a screener for this study", "help me recruit
the right people"

---

## Scope boundary

- **Fires on:** any real recruit for an approved `projects/<slug>/` task
  or standalone research ask.
- **Does not fire on:** designing the session itself (`usability-test-guide`)
  or deciding which method to run in the first place (`design-kickoff`
  Step 1.5 / `decision-first-research`) — this skill assumes the method
  is already chosen and now needs the right people in the room.
- **Never leads with demographics.** Age/gender/location tell you almost
  nothing about whether someone can give useful data — behavior does.

---

## Step 1 — Collect the inputs

Before writing a question: research goal, study type (interview / UT /
concept test / diary / survey), the specific target behavior and how
recently it must have occurred, current-user vs. non-user vs. both, and
whether distinct segments need separate screeners.

## Step 2 — Define criteria (before touching questions)

"I need to speak with someone who: has [behavior] within [timeframe] /
works as [role] at [company type] / uses [tool or workaround] / has
experienced [need/frustration] with [task]."

List behavioral criteria first. Only add demographics if genuinely
required by the study design (e.g. an in-person study needs geography).

## Step 3 — One question per criterion (5–10 total)

Each question: answerable in 1–2 seconds, no leading language, hides the
"correct" answer, includes a knockout option, uses precise numbers/
timeframes (never vague language).

**Avoid:** yes/no questions (easy to game), future-based questions
("will you buy X next month?" — ask about past behavior instead),
leading questions, overlapping number ranges (1–100 / 100–150 traps
anyone at exactly 100 — use 1–100 / 101–150).

**Mix:** ~60% closed / 40% open-ended. One-word answers on an open-ended
screener question are a warning sign about session depth, not just a
screening signal.

**Non-user recruiting** (JTBD, onboarding research, new-market entry)
needs extra criteria: unfamiliar with the brand, uses a competitor,
recently churned from a competitor, or has adjacent category experience
— someone loyal to a competitor is more useful than someone with zero
relationship to the category.

## Step 4 — Order with knockouts first

1. Broadest qualifying criterion (eliminates the most unqualified people)
2. Progressively narrower behavioral criteria
3. Product/tool usage
4. Open-ended (articulation/engagement check)
5. Demographics last, only if needed

---

## Output format

```markdown
SCREENER SURVEY: [Study name]
Target: [ideal participant, one sentence]
Length: [N questions] (~[X] min)
Knockout logic: [which answers disqualify]

PARTICIPANT CRITERIA
1. [...]

QUESTIONS
Q1. [question]
☐ [option] ✓  ☐ [option] ✓  ☐ [option] — maybe (flag)  ☐ [option] ✗ (knockout)  ☐ Other: ___

OPEN-ENDED
Q[X]. [question to assess articulation] (long text)

DEMOGRAPHICS (only if required)
[...]

KNOCKOUT LOGIC SUMMARY
- Q1: screen out [...]
```

---

## Persist

Append the screener to `projects/<slug>/findings.md` or a dedicated
`projects/<slug>/screener.md` (dated, named `screener-builder`) so it's
traceable to which study round it recruited for.

---

## Never do this

- Never send a screener with overlapping number ranges — fix before
  sending, it's a data-quality error not a style nit.
- Never skip the "None of the above" / "Other" knockout options — a
  participant with no valid option to select will guess, and the guess
  becomes bad data.
- Never recruit exactly to target — over-recruit ~20% for no-shows.

---

## Related files

| File | Role |
|------|------|
| `../usability-test-guide/SKILL.md` | Consumes recruited participants for the actual session |
| `../decision-first-research/SKILL.md` | Determines the sample size/method this screener recruits for |
| `references/worked-example.md` | Full behavior-first screener, knockout logic included |
