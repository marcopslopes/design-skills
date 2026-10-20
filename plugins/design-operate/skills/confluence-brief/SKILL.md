---
name: confluence-brief
description: >-
  On-demand Confluence page drafting and creation for a lean status/decision
  brief — NOT a research pass, NOT a PRD. Triggers on: "create a Confluence
  page", "add a wiki page under this folder", "put this in Confluence",
  "document this on Confluence for the team". Drafts a lean page body from
  what's already known (the conversation + an active projects/<slug>/) and
  creates only after explicit go. Never dumps findings, chat essays, or
  research catalogs into the page. Same shape as ticket-create / scheduling:
  propose → confirm → act. Does NOT run discovery and does NOT replace
  research-agent / design-kickoff Step 2.5, which search Confluence + Jira +
  Slack (+ Figma/Miro) from scratch and write a 17-section PRD scaffold to
  the requester's personal Confluence space.
---

# Confluence brief

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

A thin, on-demand skill for filing a **scannable Confluence page** in a
named space/folder — status briefs, decision+why writeups, “what we have
/ what we did / ideas” docs for a team. It **publishes what you already
know** — it does not go research anything.

**Invoke in Cursor:** "add a Confluence page under Referrals about…",
"put this why brief on Confluence", "create a wiki page for entry points"

Same posture as `ticket-create` / `scheduling`: **draft → designer go →
create.** Never auto-creates.

---

## Not the PRD / research Confluence path

**This is the single most important thing to get right when routing.**
Two skills write to Confluence in this repo, and they do opposite jobs:

| | `research-agent` (+ `design-kickoff` Step 2.5) | `confluence-brief` (this skill) |
|---|---|---|
| **Job** | *Researches* a topic from zero — live Confluence/Jira/Slack/Figma/Miro sweep | *Publishes* something already decided — no research pass |
| **Output** | 17-section PRD scaffold (`research-agent/references/confluence-template.md`) | 1-page lean brief (`references/lean-body.md`) |
| **Destination** | Requester's **personal** Confluence space, status **draft** | **Team folder/parent named in the ask**, status **current** |
| **Trigger shape** | "tell me everything about X", "kick off discovery on X", "catch me up on X" | "add a page under [folder] about what we've done" |
| **Work before writing** | Heavy — queries 5 MCPs, synthesizes with confidence rating | Light — summarizes conversation + `projects/<slug>/findings.md` |

If the ask is “brief me / kick off / discover / tell me everything about
X” → **not** this skill, route to `research-agent` / `design-kickoff`.
If the ask is “add a page here about what we’ve done / decided” for a
topic that already has a home → **this** skill.

When genuinely ambiguous (rare — most asks name one shape clearly), ask
one clarifying question rather than guessing: *"Do you want a fresh
research sweep, or a short status page from what we already have?"*

---

## Scope boundary

- **Fires on:** explicit ask to create / add / put a **Confluence** or
  **wiki** page (folder URL, space key, or “under Referrals” is enough).
- **Does not fire on:** Jira tickets → `ticket-create`; long-form essay /
  LinkedIn → `writing`; discovery/research → `research-agent` /
  `design-kickoff`; “update this existing page” unless they explicitly
  ask to edit after create (out of scope for v1 — draft a new page or
  decline politely).
- **Does not** invent claims. Summarize from the ask + active
  `projects/<slug>/` (brief / findings / artifacts) — **never** paste
  whole findings sections.

---

## Hard rules

1. **Draft first.** Show title, space, parent (folder/page), status
   (`current` vs `draft`), and lean body in chat. **Create only after
   explicit go** ("go", "create it", "publish it").
2. **Lean body only.** Use `references/lean-body.md`. Scannable — not a
   research dump. Prefer tables for Decision / Why.
3. **No chat voice.** Forbidden: "imo", "I think", "we should maybe",
   Mobbin catalogs, Trio retellings, lab path dumps.
4. **Parent from the ask.** If they pasted a folder/page URL, use that
   `parentId`. If missing, ask **one** clarifying question (or
   `AskQuestion`) — do not invent a random space.
5. **Depth stays in the project folder.** After create: one dated line in
   `findings.md` + `sources.md` when a project is active.
6. **Atlassian required.** If Confluence MCP isn’t available, draft in
   chat only — never invent page IDs/URLs.
7. **Never do the research-agent's job.** If mid-draft you find yourself
   about to search Confluence/Jira/Slack for new facts rather than
   summarizing what's already known, stop — that's a `research-agent`
   ask, say so.

---

## Workflow

### Step 0 — Confirm shape

| Field | Typical |
|-------|---------|
| Space | From URL / parent (e.g. `PDS`) — see `references/defaults.md` |
| Parent | Folder or page ID from URL (`…/folder/4550590489` or `…/pages/…`) |
| Title | Short, scannable (e.g. “Referral in-app entry points — status & why”) |
| Status | Default **`current`** after go (team-facing). Use **`draft`** only if they ask for unpublished. |
| Mode | Status brief (default) — see lean template sections |

### Step 1 — Draft in chat

```
Space: PDS | Parent: Referrals folder (4550590489) | Status: current
Title: […]

--- body ---
(lean template)
```

Before showing the draft, check it against
`references/shared/anti-ai-writing.md` — no bracket placeholders left in
("`[INSERT STAKEHOLDER]`"), no hype vocabulary, no unnamed-future
"Next steps" filler. This gets created and read by a team, not iterated
on like a chat message.

### Step 2 — Wait for go

Do **not** call `createConfluencePage` until the designer confirms.

### Step 3 — Create

1. Resolve `cloudId` (`getAccessibleAtlassianResources` or site host).
2. `createConfluencePage` with `spaceId` (key OK), `parentId`, `title`,
   `body`, `contentFormat: "markdown"` (or `html` if tables need it),
   `status` per Step 0.
3. Return the clickable web UI URL.

### Step 4 — Persist (if project active)

- `findings.md` — one dated line: title + URL + one-line purpose.
- `sources.md` — Title / Kind=`Confluence` / Why / Link / Indexed.
- `log.md` + `harness/logs/routing-log.md` — `MATCHED confluence-brief`.

---

## Never do this

- Never create without explicit go.
- Never paste `findings.md`, Slack transcripts, or Mobbin catalogs into
  the page body.
- Never route “brief me on X” / kickoff discovery here — that’s
  `research-agent` / `design-kickoff`.
- Never silently put the page in personal space when they named a team
  folder.
- Never silently skip the draft step “to save time.”
- Never present this as "the PRD skill" or a substitute for one — if the
  designer wants research, redirect.

---

## Related files

| File | Role |
|------|------|
| `references/lean-body.md` | Canonical page body template |
| `references/defaults.md` | Space / parent / status conventions |
| `docs/HOWTO-CONFLUENCE-BRIEF.md` | Human-readable guide + flow diagram |
| `harness/ORCHESTRATOR.md` §2 | Routing row |
| `../ticket-create/SKILL.md` | Twin posture (Jira) |
| `../research-agent/SKILL.md` | PRD/discovery Confluence drafts — the OTHER job, not this one |
