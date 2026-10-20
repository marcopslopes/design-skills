---
name: research-question-sharpener
description: >-
  Rewrites, evaluates, and prioritizes vague or unanswerable stakeholder
  research questions into focused, story-based questions that actually
  produce usable data — and flags questions research can't answer at all,
  redirecting to the right method. Triggers on: "rewrite these research
  questions", "are these good questions to ask", "prioritize these
  questions", "a stakeholder sent me a list of questions", "this question
  isn't answerable in an interview", "too many questions for one study",
  "which questions should I actually ask". Usually fires right before
  `usability-test-guide` or a stakeholder-supplied question list lands in
  a `projects/<slug>/` task — sharpens the questions, doesn't run the
  session itself.
---

# Research Question Sharpener

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Turns shallow, jargon-heavy, future-based, leading, or relentlessly
positive stakeholder questions into ones that actually produce rich,
story-based, actionable data — and tells the requester plainly when a
question needs a different method entirely.

**Invoke in Cursor:** "sharpen these research questions", "are these
questions any good"

---

## Scope boundary

- **Fires on:** a real list of questions someone wants to ask in an
  interview, usability session, or similar qualitative moment — a PM's
  list, a stakeholder's ask, or a designer's own draft.
- **Does not fire on:** writing a full guide from scratch with no
  starting questions — that's `usability-test-guide`, which can call this
  skill internally if the questions it drafts need a second pass.
- **Does not run the session** — output is a rewritten/prioritized list,
  not a script. Feed the result into `usability-test-guide` for session
  structure.

---

## Step 1 — Diagnose each question's type

Five problem types, in order of how often they show up:

1. **Shallow** — starts with Do/What/Can/Which/Are; produces yes/no or
   one-word answers. ("Are you satisfied with our product?")
2. **Jargon** — uses product/business language users don't think in
   ("success metrics", "functionality", "jobs the product does").
3. **Future-based** — asks people to predict behavior or intent ("would
   you use this feature?"). Past behavior predicts future behavior far
   better than stated intent.
4. **Leading** — embeds an assumption or steers toward a positive answer
   ("how satisfied are you with X?").
5. **Positive-only** — asks what people love/would miss. Innovation comes
   from friction, not from what's already working.

## Step 2 — Rewrite using the matching transformation

| Type | Rewrite direction |
|---|---|
| Shallow | → Story-based, using TEDW (Tell me / Explain / Describe / Walk me through) |
| Jargon | → Plain language, strip technical terms entirely |
| Future-based | → Past-based — there's always a real past to dig into, even for new behaviors |
| Leading | → Neutral, or ask both extremes explicitly |
| Positive-only | → Negative/pain-focused — flip toward frustration, barriers, disappointment |

Example: "Which feature helps you solve problems the most?" (shallow) →
"Describe a time when our product helped you solve a problem." (story)

Never ask the magic-wand question ("if you could change anything…") —
ask about a real past pain point directly instead. Never ask "how much
would you pay" in a qualitative interview — that's pricing research
(Van Westendorp/conjoint), a different method entirely.

## Step 3 — Assess answerability and method fit

For each question (original + rewrite):

- **Can qualitative research answer this?** Yes / No / Partially. If No,
  redirect: preference-between-designs → A/B test; prevalence → survey;
  willingness-to-pay → Van Westendorp/conjoint; "is this statistically
  significant" → larger quant study.
- **Qual, quant, or mixed?**
- **Complexity** — low (5–10 min), medium (needs a task/stimulus,
  15–20 min), high (multi-session/multi-method).
- **Already answered?** Check `projects/<slug>/findings.md` before
  assuming a fresh study is needed — if it's already known, say so
  instead of manufacturing a new question.

## Step 4 — Prioritize with the requester, not for them

- **High** — must be answered this study, blocks an imminent decision
- **Medium** — important, could be a follow-up
- **Low** — nice-to-have, goes to a cross-project question backlog

Validation mad-lib: "if we can't answer [question], what decision can't
we make?" — if the honest answer is "none," it's not High.

## Step 5 — Session scope

- 60-min interview: 4–6 main questions + follow-up probes
- 90-min hybrid: 3–4 interview questions + 2–3 usability tasks
- 5+ High-priority questions: flag whether one session can realistically
  cover them, or whether this needs a phased (generative → evaluative)
  approach

---

## Output format

```markdown
## Question sharpening — [Project/topic]

| Original | Type | Answerable? | Rewritten (TEDW) | Method | Priority | Notes |
|---|---|---|---|---|---|---|
| ... | Shallow | Yes | ... | Interview | High | ... |

**Redirects (can't be answered as qual questions):**
- "[question]" → [A/B test / survey / pricing study / analytics]

**Session scope recommendation:** [structure + what goes to backlog]
```

---

## Persist

If tied to an approved `projects/<slug>/` task, append the sharpened list
to `findings.md` (dated, named `research-question-sharpener`) and hand the
High-priority rewritten questions to `usability-test-guide` (or whichever
method skill fits) for the actual session structure.

---

## Never do this

- Never accept a question list unexamined and build a guide straight from
  it — shallow input produces shallow data
- Never ask a future-based or magic-wand question in the rewrite
- Never claim a question is answerable by a small qualitative sample when
  it's actually a prevalence/statistical-significance ask — redirect
  honestly

---

## Related files

| File | Role |
|------|------|
| `../usability-test-guide/SKILL.md` | Consumes this skill's High-priority rewrites to structure the actual session |
| `../assumption-mapper/SKILL.md` | Often runs first — its "research goals" are the raw input this skill sharpens into real questions |
| `../design-kickoff/SKILL.md` § Step 1.5 | Method recommendation this skill's redirect table feeds into |
| `references/worked-example.md` | Full before/after sharpening pass on a stakeholder's question list |
