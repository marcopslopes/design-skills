---
name: people-coaching
description: >-
  Manager-gated coaching prep for one named report: feedback delivery
  (SBI), difficult-conversation prep, or a co-created growth plan. Triggers
  on: "help me give feedback to [name]", "SBI for [name]", "prep a
  difficult conversation with [name]", "hard conversation with [name]",
  "growth plan for [name]", "development plan for [name]", "help me coach
  [name]". Gated to `role: manager` profiles — declines for ICs. Same
  source and privacy rules as `manager-1on1-prep` (tracker + task folders;
  never Slack DMs). Does not replace 1:1 status prep (`manager-1on1-prep`)
  or team snapshots (`workload-agent`). Never invents performance claims.
---

# People coaching (feedback / difficult conversation / growth plan)

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Prep docs that help a manager coach one named report — specific feedback,
a hard conversation, or a growth plan — grounded in observable work
evidence, never vibes or private Slack.

**Invoke in Cursor:** "help me give feedback to [name]", "prep a difficult
conversation with [name]", "growth plan for [name]"

---

## Gate — check this before anything else

Read `designer-profile.local.md`. If `Role focus` is **not** `manager`,
**decline** rather than running anyway:

> "This skill preps coaching conversations for managers with a report —
> looks like your profile is set to [role focus]. For your own growth
> notes, freestyle or update your profile to `manager` if that's your
> role. For work status, try `workload-agent`."

Do not run any steps below for a non-manager profile. If `Role focus` is
`manager` but the named person isn't in `Reports:`, ask once — don't
silently proceed or refuse:

> "[Name] isn't on your reports list — want me to prep for them anyway,
> or did you mean someone else?"

Never fire automatically. One named report per request. If asked for
"the whole team," decline and point to `workload-agent` manager mode.

---

## Scope — sources (same closed list as `manager-1on1-prep`)

1. **`workload-agent` manager mode** filtered to the one named report.
2. **`projects/<slug>/`** heuristic name match — say so if uncertain.
3. **Docs tool / tracker** with cite/date/link discipline.
4. **Public Slack only**, and only to confirm a work fact already implied
   by 1–3 — never sentiment.

**Hard rule — Slack:** Never query DMs or private channels. Never
summarize private conversations. Same non-negotiable rule as
`manager-1on1-prep` § Hard rule — do not weaken it here.

**Never invent performance, attitude, or ability claims.** If evidence is
thin, say so and prep questions that gather facts — do not fill gaps with
assumed stories about the person.

---

## Pick a mode

| Ask shape | Mode |
|-----------|------|
| Feedback, SBI, "how do I tell them…" about specific work | Mode 1 — Feedback |
| Hard / difficult conversation, underperformance, conflict, bad news | Mode 2 — Difficult conversation |
| Growth plan, development plan, stretch goals, coaching plan | Mode 3 — Growth plan |

Ambiguous ("help me coach [name]") → ask which mode (one question), then
proceed. Do not run all three unless asked.

---

## Mode 1 — Feedback delivery (SBI)

1. Pull 1–3 **observable** work facts (ticket movement, decision log,
   shipped artifact, dated finding) — label each with source.
2. Draft **one** primary feedback message using SBI:
   - **Situation** — when/where (sourced)
   - **Behaviour** — what was observed, factual (not character)
   - **Impact** — effect on product/team/process (honest; don't inflate)
3. Add: invite their view → one concrete next step (proposed, not ordered
   as a verdict).
4. If reinforcing (positive) feedback: praise the specific behaviour to
   repeat; note whether public praise is appropriate (default private
   draft).
5. Bias check: no character labels, no pile-on list (one clear message).

If there are **no** sourced behaviours, stop and say so — ask the manager
what they observed, or route to gather facts first. Do not invent SBI.

---

## Mode 2 — Difficult conversation

1. **Purpose** — outcome the manager is aiming for (ask if unclear).
2. **Facts vs story** — two columns from sources: Known (cited) vs Story
   (manager's interpretation — label explicitly; don't present Story as
   Known).
3. **Their possible view** — questions that surface missing context (not
   mind-reading conclusions).
4. **Opening line** — clear, kind, direct; no burying the message.
5. **Must change / by when** — only if grounded; otherwise "clarify
   expectation in the conversation."
6. **Follow-up outline** — short written summary shape for after (facts +
   next step) — draft only; never send.

Hard stop: if zero Known facts and the manager won't supply any, decline
to script a performance confrontation from vibes.

---

## Mode 3 — Growth plan

1. Start from **their** aspiration if known (stated by report/manager);
   if unknown, draft questions to learn it — don't invent a career path.
2. **Strengths to amplify** — only from sourced evidence; else "unknown —
   ask."
3. **1–2 growth areas** max — tied to real upcoming work (tickets /
   projects), not a laundry list.
4. **Experiences** — stretch assignments on live work + support
   (mentoring vs sponsorship named).
5. **Checkpoints** — suggested cadence (e.g. monthly in 1:1s).
6. Frame ownership: growth is the report's; manager enables.

---

## Output format

```markdown
## People coaching — [Feedback | Difficult conversation | Growth plan] — [Report] — YYYY-MM-DD

### Mode notes
[one line on which mode and why]

### Evidence on file
- [fact] — Source: [ticket KEY / projects/slug / …]
- (or: thin — only questions below)

[Mode 1:]
### SBI draft (private)
**Situation:** …
**Behaviour:** …
**Impact:** …
**Invite their view:** …
**Proposed next step:** …

[Mode 2:]
### Purpose
…
### Facts (Known) vs Story
| Known (sourced) | Story (interpretation) |
|---|---|
### Opening line
…
### Clarify / must-change
…
### After — follow-up outline
…

[Mode 3:]
### Aspiration
…
### Strengths / gaps (sourced or Ask)
…
### Stretch work + support
…
### Checkpoints
…

### Worth asking them
- …

### Data sources for this prep doc
Tracker (…) · `projects/…` (…) · … **No chat DMs or private channels were
queried for this doc.**
```

The **Data sources** line is mandatory every time (same bar as
`manager-1on1-prep`).

---

## Persist

Optional: if a `projects/<slug>/` clearly matches and the manager wants a
record, append a short dated note to that folder's `log.md` or
`decisions.md` **only on explicit go** — default is chat-only prep (these
docs are sensitive). Never write performance judgments into a shared
task folder without asking.

---

## Never do this

- Never run for IC profiles
- Never invent behaviours, motives, or performance ratings
- Never query Slack DMs / private channels
- Never send messages, book meetings, or create tickets unless the
  manager explicitly chains another skill (`scheduling`, `ticket-create`)
- Never replace `manager-1on1-prep` for routine status 1:1s
- Never ambush: if Mode 1/2 content would surprise someone in a formal
  review with no prior conversation, flag that risk in the prep doc

---

## Related files

| File | Role |
|------|------|
| `../manager-1on1-prep/SKILL.md` | Status 1:1 prep — sibling; same gate/sources |
| `../workload-agent/SKILL.md` § Step 2b′ | Manager tracker leg |
| `../stakeholder-alignment/SKILL.md` | Cross-functional buy-in — not people coaching |
| `references/worked-example.md` | Worked feedback + growth sketches |
| `docs/HOWTO-PEOPLE-COACHING.md` | Designer-facing guide |
| `docs/HOWTO-MANAGER-1ON1-PREP.md` | Sibling status 1:1 guide |
