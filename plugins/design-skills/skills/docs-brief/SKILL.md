---
name: docs-brief
description: >-
  On-demand page drafting and creation in the team's docs tool (Confluence,
  Notion, or Google Docs) for a lean status/decision brief — NOT a research
  pass, NOT a PRD. Triggers on: "create a page", "add a wiki page under this
  folder", "put this in Notion", "put this in Confluence", "write this up as a
  Google Doc", "document this for the team", "Confluence brief" (old name).
  Drafts a lean page body from what's already known (the conversation + an
  active projects/<slug>/) and creates only after explicit go. Never dumps
  findings, chat essays, or research catalogs into the page. Same shape as
  ticket-create / scheduling: propose → confirm → act. Does NOT run discovery
  and does NOT replace research-agent / design-kickoff Step 2.5, which search
  docs, tracker, and chat from scratch and write a 17-section PRD scaffold to
  the requester's personal space.
---

# Docs brief

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

A thin, on-demand skill for filing a **scannable page** in a named
space, folder, or parent page of the team's docs tool — status briefs,
decision+why writeups, “what we have / what we did / ideas” docs for a team.
It **publishes what you already know** — it does not go research anything.

Which docs tool the team uses (Confluence, Notion, or Google Docs) and how to
write to it: `references/shared/work-tools.md` § Docs.

**Invoke in Cursor:** "add a page under Referrals about…", "put this why
brief in Notion", "create a wiki page for entry points", "write this up as a
Google Doc"

Same posture as `ticket-create` / `scheduling`: **draft → designer go →
create.** Never auto-creates.

---

## Not the PRD / research path

**This is the single most important thing to get right when routing.**
Two skills write to the docs tool in this repo, and they do opposite jobs:

| | `research-agent` (+ `design-kickoff` Step 2.5) | `docs-brief` (this skill) |
|---|---|---|
| **Job** | *Researches* a topic from zero — live docs/tracker/chat/Figma/Miro sweep | *Publishes* something already decided — no research pass |
| **Output** | 17-section PRD scaffold (`research-agent/references/brief-template.md`) | 1-page lean brief (`references/lean-body.md`) |
| **Destination** | Requester's **personal / private** space, status **draft** | **Team folder or parent page named in the ask**, published |
| **Trigger shape** | "tell me everything about X", "kick off discovery on X", "catch me up on X" | "add a page under [folder] about what we've done" |
| **Work before writing** | Heavy — queries several tools, synthesizes with confidence rating | Light — summarizes conversation + `projects/<slug>/findings.md` |

If the ask is “brief me / kick off / discover / tell me everything about
X” → **not** this skill, route to `research-agent` / `design-kickoff`.
If the ask is “add a page here about what we’ve done / decided” for a
topic that already has a home → **this** skill.

When genuinely ambiguous (rare — most asks name one shape clearly), ask
one clarifying question rather than guessing: *"Do you want a fresh
research sweep, or a short status page from what we already have?"*

---

## Scope boundary

- **Fires on:** explicit ask to create / add / put a **page**, **doc**, or
  **wiki** page (folder URL, space, parent page, or “under Referrals” is
  enough) — in Confluence, Notion, or Google Docs.
- **Does not fire on:** tickets → `ticket-create`; long-form essay /
  LinkedIn → `writing`; discovery/research → `research-agent` /
  `design-kickoff`; “update this existing page” unless they explicitly
  ask to edit after create (out of scope for v1 — draft a new page or
  decline politely).
- **Does not** invent claims. Summarize from the ask + active
  `projects/<slug>/` (brief / findings / artifacts) — **never** paste
  whole findings sections.

---

## Hard rules

1. **Draft first.** Show title, tool, destination (space / parent page /
   folder), status (published vs draft), and lean body in chat. **Create
   only after explicit go** ("go", "create it", "publish it").
2. **Lean body only.** Use `references/lean-body.md`. Scannable — not a
   research dump. Prefer tables for Decision / Why.
3. **No chat voice.** Forbidden: "imo", "I think", "we should maybe",
   Mobbin catalogs, Trio retellings, lab path dumps.
4. **Destination from the ask.** If they pasted a folder/page URL, use it
   as the parent. If missing, ask **one** clarifying question (or
   `AskQuestion`) — do not invent a random space.
5. **Depth stays in the project folder.** After create: one dated line in
   `findings.md` + `sources.md` when a project is active.
6. **No docs tool connected → Markdown.** Write the lean page to
   `projects/<slug>/artifacts/<title-slug>.md` (or show it in chat) and say
   it's ready to paste. Never invent page IDs or URLs.
7. **Never do the research-agent's job.** If mid-draft you find yourself
   about to search docs, tickets, or chat for new facts rather than
   summarizing what's already known, stop — that's a `research-agent`
   ask, say so.

---

## Workflow

### Step 0 — Confirm shape

| Field | Typical |
|-------|---------|
| Tool | From the profile's `Work tools:` line or the pasted URL — see `references/defaults.md` |
| Destination | Space + parent (Confluence), parent page or database (Notion), folder (Google Docs) |
| Title | Short, scannable (e.g. “Referral in-app entry points — status & why”) |
| Status | Default **published** after go (team-facing). Keep it **draft** only if they ask for unpublished. |
| Mode | Status brief (default) — see lean template sections |

### Step 1 — Draft in chat

```
Tool: Notion | Parent: Referrals (team page) | Status: published
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

Do **not** call the docs tool's create call until the designer confirms.

### Step 3 — Create

Use the create call for the resolved tool (`work-tools.md` § Docs; discover
the server's exact tool names first):

| Tool | Create |
|------|--------|
| **Confluence** | `createConfluencePage` with `cloudId`, `spaceId` (key OK), `parentId`, `title`, `body`, `contentFormat: "markdown"`, `status` per Step 0 |
| **Notion** | `notion-create-pages` under the parent page (or as a database row) with the title and Markdown body |
| **Google Docs** | Create a doc in the named folder with the title, then write the body |

Return the clickable page URL.

### Step 4 — Persist (if project active)

- `findings.md` — one dated line: title + URL + one-line purpose.
- `sources.md` — Title / Kind=`Doc` (tool name in Why) / Why / Link / Indexed.
- `log.md` + `harness/logs/routing-log.md` — `MATCHED docs-brief`.

---

## Never do this

- Never create without explicit go.
- Never paste `findings.md`, chat transcripts, or Mobbin catalogs into
  the page body.
- Never route “brief me on X” / kickoff discovery here — that’s
  `research-agent` / `design-kickoff`.
- Never silently put the page in a personal space when they named a team
  folder.
- Never silently skip the draft step “to save time.”
- Never present this as "the PRD skill" or a substitute for one — if the
  designer wants research, redirect.

---

## Related files

| File | Role |
|------|------|
| `references/lean-body.md` | Canonical page body template |
| `references/defaults.md` | Destination / status conventions per docs tool |
| `references/shared/work-tools.md` | Which docs tool, and its tool names |
| `docs/HOWTO-DOCS-BRIEF.md` | Human-readable guide + flow diagram |
| `harness/ORCHESTRATOR.md` §2 | Routing row |
| `../ticket-create/SKILL.md` | Twin posture (tickets) |
| `../research-agent/SKILL.md` | PRD/discovery drafts — the OTHER job, not this one |
