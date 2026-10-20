---
name: ticket-create
description: >-
  On-demand ticket drafting and creation in the team's tracker (Jira,
  Linear, or GitHub Issues). Triggers on: "create a ticket", "file a Jira",
  "open a Linear issue", "file a GitHub issue", "open a DES / ENG for this",
  "make a design + eng ticket pair". Drafts a lean work-order body first; creates only
  after explicit go. Never dumps chat essays, meeting retellings, or
  findings into the description. Same shape as scheduling: propose →
  confirm → act. Does not replace design-kickoff, research, or eng
  backlog grooming.
---

# Ticket create

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

A thin, on-demand skill for filing **short work-order tickets** — not a
research dump, not a PRD, not a findings paste.

Which tracker the team uses (Jira, Linear, or GitHub Issues) and its tool
names: `references/shared/work-tools.md` § Tracker.

**Invoke in Cursor:** "create a ticket for…", "file this on DES and ENG",
"open a design ticket for…"

Same posture as `scheduling`: **draft → designer go → create.** Never
auto-creates.

---

## Scope boundary

- **Fires on:** explicit ask to create / file / open a ticket or issue (one
  board or a design+eng pair).
- **Does not fire on:** "what's on the board" → `workload-agent`;
  net-new project kickoff → `design-kickoff`; long discovery →
  `research-agent`; "update this ticket's status" (edit/transition is
  out of scope unless the designer explicitly asks after create);
  "design handoff / eng spec" → `design-handoff` (this skill may run
  *after* that spec, linking it — never paste the spec into the body).
- **Does not** invent scope the designer didn't state. Prefer bullets
  from the ask + active `projects/<slug>/` brief/findings **summarized
  tightly** — never paste findings sections.

---

## Hard rules

1. **Draft first.** Show title, container(s) (project, team, or repo), type, team field if used, and the
   lean body in chat. **Create only after explicit go** ("go", "create
   it", "ship it"). Edits → re-draft; cancel → stop.
2. **Lean body only.** Use the template in
   `references/lean-body.md`. Max ~½ screen. Sections: Why · In scope ·
   Out of scope · Links · Done when.
3. **No chat voice.** Forbidden in the ticket body: "imo", "I think",
   "we should maybe", lab path dumps, Mobbin/Trio essays, long meeting
   retellings. One line is OK: `Details: projects/<slug>/findings.md`.
4. **Depth stays in the project folder.** If a `projects/<slug>/` is
   active, append a one-line dated note to `findings.md` + row(s) to
   `sources.md` after create — not the reverse.
5. **No tracker connected → draft only.** Show the ticket in chat (or save
   it to `projects/<slug>/artifacts/`) ready to paste, and say so once —
   never invent ticket keys.

---

## Workflow

### Step 0 — Confirm shape

From the ask, lock:

| Field | Typical |
|-------|---------|
| Container(s) | Design (`DES` in the example) and/or eng (`ENG`) — a Jira project, Linear team, or GitHub repo |
| Type | Design → the team's design type (Jira **UX task**, a `design` label on Linear/GitHub); eng → **Story** / Task, or the eng label |
| Team field | Only if the tracker uses one — see `references/defaults.md` |
| Pair? | If design + eng → draft both; eng **blocked by** design |

If board or pair is ambiguous, ask **one** short clarifying question
(or `AskQuestion` when available) — not a questionnaire.

### Step 1 — Draft in chat

Show for each ticket:

```
Tracker: Jira | Container: DES | Type: UX task | Team: <team or unset> | Assignee: <you or unset>
Title: […]

--- body ---
(lean template)
```

If pair: show both drafts + "ENG blocked by DES".

Before showing the draft, check it against
`references/shared/anti-ai-writing.md` — no bracket placeholders left
in, no hype vocabulary, no vague "improves the experience" filler where a
real acceptance criterion belongs.

### Step 2 — Wait for go

Do **not** call the tracker's create call until the designer confirms.

### Step 3 — Create

| Step | Jira | Linear | GitHub Issues |
|------|------|--------|---------------|
| Create | `createJiraIssue` with Markdown description | `create_issue` with team + Markdown description | `create_issue` with `owner/repo` + Markdown body |
| Pair link (design blocks eng) | `createIssueLink` type **Blocks** (inward = design key, outward = eng key) | Set the eng issue as **blocked by** the design issue | Add "Blocked by #<design>" to the eng body (or a sub-issue / tasklist link) |
| Team field | Per `references/defaults.md` | Team is the container | — |

Return clickable URLs.

### Step 4 — Persist (if project active)

- `findings.md` — one dated line: keys created + one-line purpose.
- `sources.md` — Title / Kind=`Ticket` / Why / Link / Indexed.
- `log.md` + `harness/logs/routing-log.md` — `MATCHED ticket-create`.

---

## Never do this

- Never create without explicit go.
- Never paste `findings.md`, Slack transcripts, or Mobbin catalogs into
  the description.
- Never use "imo" / hedging chat tone in the ticket body.
- Never invent assignees, sprint, or epic links the designer didn't ask
  for (linking a named parent/epic they gave is fine).
- Never silently skip the draft step "to save time."

---

## Related files

| File | Role |
|------|------|
| `references/lean-body.md` | Canonical body template |
| `references/defaults.md` | Containers, types, team field, link convention per tracker |
| `references/shared/work-tools.md` | Which tracker, and its tool names |
| `docs/HOWTO-TICKET-CREATE.md` | Human-readable guide + flow diagram |
| `harness/ORCHESTRATOR.md` §2 | Routing row |
| `../scheduling/SKILL.md` | Same draft→confirm→act posture |
