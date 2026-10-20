---
name: manager-1on1-prep
description: >-
  Prep-doc generator for 1:1s and status checks with a direct report.
  Gated to `role: manager` profiles only — declines politely for anyone
  else, never fires for IC profiles. Triggers on: "help me prep for a 1:1
  with [name]", "what's [name] working on", "prep me for my 1:1 with
  [name]", "status check on [name]", "quick rundown before my sync with
  [name]", "quick check-in with [name]". Sources: `workload-agent`
  manager-mode output for that one report, plus that report's
  `projects/[slug]/` task-folder data — never Slack DMs or private
  channels, public channels only and work-content only if Slack is used at
  all. Output is framed as open questions to ask, never as answers already
  assumed. Never fires automatically — explicit request only.   For general
  "who's working on what" without a specific 1:1/report context, see
  workload-agent. For feedback / difficult conversation / growth plan
  prep, see `people-coaching`.
---

# Manager 1:1 prep

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Turns live tracker data (Jira, Linear, or GitHub) and this repo's own task-folder history into a short
prep doc for a manager's 1:1 with one specific report — questions to ask
in the conversation, not conclusions about what's going on. This skill
never runs on its own; it fires only when a manager explicitly asks for
it, for one named person at a time.

**Invoke in Cursor:** "help me prep for a 1:1 with [name]", "what's
[name] working on", "status check on [name]"

---

## Gate — check this before anything else

Read `designer-profile.local.md`. If `Role focus` is **not** `manager`,
**decline** rather than running anyway:

> "This skill preps 1:1s for managers checking in with a report — looks
> like your profile is set to [role focus]. Did you mean
> `workload-agent` (a live snapshot) or `research-agent` (deep discovery)
> instead?"

Do not run any of the steps below for a non-manager profile, even if the
request sounds like it would technically work. If `Role focus` is
`manager` but the named person isn't in `Reports:`, ask once — don't
silently proceed or silently refuse:

> "[Name] isn't on your reports list — want me to prep for them anyway,
> or did you mean someone else?"

---

## Scope — sources, explicitly closed list

This skill uses exactly these sources, and no others:

1. **`workload-agent` manager mode** (`../workload-agent/SKILL.md`
   § Step 2b′), filtered to the **one named report** — a single-person
   subset of the batched query, not the whole team. Resolve their name
   in the tracker first (`references/shared/work-tools.md` § Tracker → Find a person), same as every other tracker leg in this
   repo.
2. **`projects/<slug>/` task-folder data** for anything that report owns
   or is named in — `brief.md`, `findings.md`, `decisions.md`, `log.md`.
   Per `projects/README.md`, there's no structured "owner" field, so this
   is a **heuristic text match** (name appears in "Requested by," a
   `decisions.md` "Made by:" line, or a dated `findings.md`/`log.md`
   entry) — say so if the match is uncertain, don't present it as a
   confirmed link.
3. **Docs tool / tracker**, same sourcing discipline as every other skill in
   this repo (cite, date, link).
4. **Public Slack channels only**, and only to confirm a work fact already
   implied by 1–3 — never to characterize sentiment or tone. See the hard
   rule below before touching Slack at all.

**Explicitly out of scope — do not build a workaround for this, ever:**
research-agent's general-purpose docs/tracker/chat/Figma/Miro sweep is
*not* this skill's job. If the manager wants that depth on a topic, route
to `research-agent` instead — this skill stays narrow: one report, one
snapshot, one set of questions.

---

## Hard rule — Slack (non-negotiable, stricter than `research-agent`'s guardrail)

`research-agent`'s privacy guardrail
(`references/from-research-agent/agents.md` § Privacy &
sensitive content) searches private Slack and then filters what surfaces.
**This skill does not get that latitude.** For a manager prepping a 1:1
about the specific person being searched, the calculus is different —
there is no legitimate reason for this skill to ever see a report's
private conversations, so it doesn't get to try:

- **Never query Slack DMs or private channels, for any reason, at any
  point in this skill's execution.** Not "search and then withhold" —
  don't search them at all. This is broader than the "no profiling"
  clause in `research-agent`'s guardrail; this skill has no public-topic
  carve-out that would justify a private-channel search in the first
  place.
- **If Slack is used at all, public channels only**, and only to confirm
  a **work fact** already visible in the tracker or task folders (e.g. confirming a
  ticket's context) — never to summarize what someone said, their tone,
  their mood, or anything that reads as sentiment.
- **Never summarize a private conversation back to a manager**, full
  stop — not paraphrased, not "per an internal discussion," not
  attributed generically. `research-agent`'s paraphrase-not-verbatim
  allowance for private sources does **not** apply here; the correct
  handling of private-channel content in this skill is to never have
  touched it.
- If you catch yourself about to write something that reads like "[name]
  seems frustrated with X" or "[name] mentioned Y informally" — stop.
  That's not this skill's output shape (see below) regardless of source.

---

## Output shape — questions to ask, not answers already known

Every finding gets framed as something to **ask the report**, not a
conclusion about them. "Ticket X hasn't moved in [N] days, worth asking
why" (with `[N]` from the live `updated` field, not a restated constant —
the threshold that decides *whether* to flag it at all still lives in
`workload-agent/references/design-board.md` § Manager mode) — never "X said
they're blocked on Y" (that would require Slack sentiment/DM sourcing
this skill doesn't have anyway, but the framing rule holds even for
legitimate tracker/task-folder findings: state the observable fact, not an
inferred cause).

```markdown
## 1:1 prep — [Report] — [date]

### Worth asking about
- [KEY](<ticket URL>) "[summary]" — In Progress, no update in [N] days (past the
  staleness threshold — see `workload-agent/references/design-board.md` §
  Manager mode). Worth asking what's blocking it?
- [KEY](<ticket URL>) "[summary]" — On Hold since [date]. Still blocked, or ready to
  pick back up?
- [KEY](<ticket URL>) "[summary]" queued next — does that match what they'd expect to
  pick up, or has priority shifted since this was queued?

### From their task folders
- `projects/<slug>/`: `decisions.md` logged approval on [date], but
  `findings.md` hasn't moved since — anything new since the gate worth
  flagging?
- `projects/<slug>/brief.md` still lists an open question ([quote it]) —
  has that resolved, or still open?

*(Omit this section entirely, with one line saying so, if no task-folder
match was found — don't pad with a weak/uncertain match to fill space.)*

### Roadmap context (for the conversation, not a verdict)
- [Board] shows [initiative] in [stage] — does their current queue
  reflect that priority, or is there a mismatch worth raising?

### Data sources for this prep doc
Tracker ([tickets queried, design containers]) · `projects/<slug>/` task folders
([list, or "none matched"]) · [docs pages, if any] · [public chat
channels, named, if any — work-content only]. **No Slack DMs or private
channels were queried for this doc.**
```

**The "Data sources" line is mandatory, every time, worded plainly enough
that if this doc were ever shown to the report themselves, there's no
ambiguity about what was tracked and what wasn't.** Don't compress it
away even in a short/quick version of this skill's output.

---

## Optional — compose `scheduling`, after the doc, never before

**After** the prep doc above ships in full, this skill may add **one**
optional closing line offering to schedule the actual 1:1, by composing
`../scheduling/SKILL.md` — the exact same relationship this
skill already has with `workload-agent` (calls into it for one report's
data, never re-implements its query logic). This fires only when **both**
are true:

1. **Calendar is connected** — check per
   `references/from-scheduling/calendar-check.md` (a fresh,
   on-demand probe, not an assumption from an earlier turn). If it isn't
   connected, skip this offer entirely and end the doc exactly as it
   would end without this section existing — **do not** mention Calendar
   being unconnected here; that's `scheduling`'s own honest-decline job,
   not something this skill nags about when nobody asked to schedule
   anything yet.
2. **No existing meeting was found** for this report in the data already
   gathered (i.e. nothing in the prep doc already reads as a scheduled
   1:1 — this is meant for the "we haven't actually got time on the
   calendar" case, not a duplicate offer when one's already booked).

When both hold, append exactly one line after the doc:

> "Want me to find a time? I can call the scheduling skill."

If the designer says yes, **hand the whole request off to
`../scheduling/SKILL.md`'s Steps 0–4** — that skill owns
free/busy checks (its own Hard rule: free/busy signal only, never event
titles/descriptions/attendees, on any calendar including the requester's
own), slot proposal, confirmation, and booking. This skill does not
duplicate any of that logic itself, the same way it never re-implements
`workload-agent`'s tracker querying. If the designer declines, or doesn't
respond, or Calendar isn't connected: **this skill's output is unchanged
either way** — the prep doc is already complete and correct without this
line, and nothing about the doc's content, sourcing, or framing depends
on whether this offer fires or is accepted.

**This is genuinely optional, not a soft mandatory step:** never repeat
the offer if declined once for the same prep request, never frame it as
something the designer is missing by saying no, and never let checking
Calendar's connection status slow down or block the prep doc itself — the
doc's own sources (§ Scope above) are entirely independent of Calendar.

---

## Guardrails

- **Never** fires automatically — explicit request only, one report at a
  time. If asked to prep for "the whole team," decline and point to
  `workload-agent` manager mode's team snapshot instead — that's a
  different job (status overview, not 1:1 prep).
- **Never** for non-manager profiles — see § Gate.
- **Never** queries Slack DMs or private channels — see § Hard rule.
- **Never** states a conclusion where a question would do — "worth
  asking why," not "they're blocked because."
- **Never** omits the Data sources line.
- **Never** treats a heuristic `projects/` name match as confirmed
  ownership — say "likely" or "heuristic match" if the link isn't a
  clean field-level join.
- **Never** lets the optional `scheduling` offer (see above) change the
  prep doc's own content, or fire more than once per request, or block
  on Calendar's connection status.

---

## Related files

| File | Role |
|---|---|
| `../workload-agent/SKILL.md` § Step 2b′ | Manager-mode tracker leg this skill filters to one person |
| `references/from-workload-agent/design-board.md` § Manager mode | Batched query technique + `MANAGER_MODE_STALE_DAYS` (single source of truth for the staleness threshold used above) |
| `harness/designer-onboarding/SKILL.md` § Manager role focus | Where `role: manager` and `Reports:` come from |
| `references/from-research-agent/agents.md` § Privacy & sensitive content | The general Slack guardrail this skill's hard rule is stricter than |
| `projects/README.md` | Task-folder schema this skill heuristically matches against |
| `harness/ORCHESTRATOR.md` §2 | Routing table entry — gated to manager profiles in the Notes column |
| `../scheduling/SKILL.md` | Standalone find/propose/book skill this skill's closing line composes into, same pattern as its own use of `workload-agent` — never fires without Calendar connected and an explicit yes |
| `references/from-scheduling/calendar-check.md` | On-demand, non-blocking Calendar connection check used by the optional offer above |
| `../people-coaching/SKILL.md` | Sibling — feedback / difficult conversation / growth plan (same gate/sources) |
| `docs/HOWTO-MANAGER-1ON1-PREP.md` | Designer-facing guide |
