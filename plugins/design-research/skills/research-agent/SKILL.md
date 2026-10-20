---
name: research-agent
description: "Design discovery kickoff PRD scaffold for product designers. Triggered by: \"tell me everything about X\", \"kick off discovery on X\", \"PRD starter for X\", \"catch me up on X\", \"research X for a new project\", \"what do we know about X\", \"give me ideas for X\". Searches the team's docs tool (Confluence, Notion, or Google Docs), tracker (Jira, Linear, or GitHub Issues), and chat in full depth — plus linked Figma and Miro boards — then writes a structured draft page to the docs tool and returns a short executive summary with confidence rating. Most net-new research requests should route through design-kickoff first, which owns the PRD gate — this skill is typically invoked from within that flow (Step 1b), not called directly."
inputs:
  required:
    - topic                # what to research
  optional:
    - squad                # narrows tracker and roadmap scope
    - date_range           # for chat and docs recency
    - task_folder          # projects/<slug>/ if one exists
  sources:                 # resolved per references/shared/work-tools.md
    - docs                 # Confluence | Notion | Google Docs
    - tracker              # Jira | Linear | GitHub Issues
    - chat                 # Slack | Teams
    
outputs:
  primary: sourced_findings              # insights with dated citations
  side_effects:
    - findings.md_append                 # dated section
    - sources.md_append                  # new URLs discovered
    - log.md_append                      # routing line
  
composability:
  can_run_after: [workload-agent]        # squad context helps narrow search
  can_feed_into: [design-kickoff, ux-pattern, ui-agent, deck-builder]
  runs_independently: true               # can be called standalone
---

# Project Research Agent

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

**Invoke in Cursor:** `Use the research agent skill` or `/research`

**Claude app:** not currently packaged in this repo — no `dist/*.skill` build exists yet (see `README.md`'s Option 2). Use `/brief-me` from Cursor instead.

---

## What this skill does

When a designer or PM asks about a topic, this skill runs a full research pass across internal tools and produces:

1. A **draft page in the team's docs tool** — PRD-style scaffold with every section filled where sources exist and intentional placeholder rows where they do not. No docs tool connected → the same scaffold as Markdown in the project folder.
2. A **short executive summary** in chat — confidence rating + link to the draft.

**Not this skill:** “Add a page under [folder] about what we’ve done / why” for an already-approved topic → that is **`docs-brief`**, the thin draft→go twin of `ticket-create`.

---

## Load before running

1. **`references/agents.md`** — full agent specification, workflow, guardrails, the company vocabulary, Slack reply format
2. **`references/brief-template.md`** — draft section order and scaffold rules
3. **`references/BUILD-BRIEF.md`** — output-structure addenda (§13–§15)
4. **`references/shared/work-tools.md`** — which docs tool, tracker, roadmap, and chat this team uses, and how to search, read, and write each
5. **`references/shared/source-links.md`** — link every cited ticket, page, thread, Figma, and Miro URL in chat and drafts
6. **`docs/setup/cursor-mcp-setup.md`** — MCP configuration (first-time setup)
7. **`COMPANY-SOURCES.md`** — global seed URL list; open rows whose section/topic matches the research ask (same Google Docs open path as in `references/agents.md`)
8. **`projects/<slug>/sources.md`** — when a task folder is in play: read existing project links; append durable URLs found or pasted during the pass (create from template if missing). Synthesis still goes to `findings.md`.

Optional: `references/routing-rules.md`, `references/taxonomy-example.md`, `setup/test-prompts.md`

**Owns `testing/` on any task folder** (`projects/<slug>/testing/`) — once a
PRD's "how will we know it worked?" has a real success metric, this
skill is who plans and reports the validation study that answers it.
Copy `references/test-plan-template.md` into `projects/<slug>/testing/
test-plan.md` when a study is actually planned or run — not before, and
not as a permanent placeholder. See `harness/agents/researcher.md`.

**Always check `references/from-workload-agent/roadmap-boards.md`** before the tracker leg of any topic that could span multiple product domains — it maps every known roadmap board across teams (Jira Product Discovery projects, Linear projects, a Notion roadmap database, or GitHub Projects), so the search isn't limited to whichever project the designer happened to name. (Canonical copy lives under `workload-agent/`, not here — see `references/roadmap-boards.md` in this folder for the pointer.)

**Always check `references/from-workload-agent/roadmap-check.md`** before claiming to know a roadmap board's "current" initiatives — it has no cached list on purpose (goes stale in days), just the live query to run fresh against the relevant board every time.

---

## Triggers (natural language)

**Full kickoff pass** (net-new topic, produces a docs draft — see Workflow below):
- *tell me everything about [topic]*
- *catch me up on [topic]*
- *kick off discovery on [topic]*
- *research [topic] for a new project*
- *what do we know about [topic]*
- *what is [topic] / is there a project on [topic]* — plain lookup phrasing is **not** an exemption from routing; see below

**These all reach this skill through `design-kickoff`'s front door (`harness/ORCHESTRATOR.md` §2a — "net-new, no exceptions"), as Step 1b — never as a standalone bypass that skips the PRD/gate chain.** A designer asking "what is X" on a topic with no approved `projects/<slug>/` task is exactly as net-new as "let's build X"; both hit `design-kickoff` first. The distinction that actually matters is **gap-fill/verdict modes below** (approved task already exists) vs. **everything else** (net-new → `design-kickoff` → this skill's Step 1b). **Never** answer a net-new "what is X" from local repo files alone (`projects/*`, `src/design-harness/pages/*`) — those are this designer's own in-flight work, not verified ground truth about what the company actually has. Only a live sweep of the team's docs, tracker, and chat (this skill's Step 1b, reached via `design-kickoff`) answers "is this real" / "is there a project on it."

**Lightweight gap-fill mode** (one named source, on an already-approved `projects/<slug>/` task — see § below):
- *check Slack [channel/thread] for [topic]*
- *what should I reply to this thread*
- *does this Google Doc/Drive file add anything new to [topic/case study]*
- *here's a meeting transcript, capture the decisions*

---

## Lightweight gap-fill mode (single source, approved task only)

**The gap this closes:** before this, an ad-hoc "read this one Slack thread"
or "does this doc add anything new" on a task that was **already approved and
in flight** had no dedicated match — it either got silently inferred as
`research-agent` (inconsistent) or logged as a bare `FALLBACK` even though the
work itself was legitimate and already happening (Slack-read, Google
Doc/Drive, and meeting-transcript asks on `projects/<slug>` tasks that
already existed).

**When this fires instead of the full kickoff pass:**
- The task already has an approved `projects/<slug>/brief.md` (`Status:
  APPROVED`, or a dated gate-approval in `decisions.md`) — see
  `harness/ORCHESTRATOR.md` §2b for how to check this.
- The designer names **one concrete source** (a Slack thread/channel, a
  pasted Doc/Drive link, a pasted or attached meeting transcript) rather than
  asking to open a topic from scratch.

**What it does, instead of the full Workflow below:**
0. If the source was pasted or attached (not a link the source still
   holds), save it verbatim to `projects.local/<slug>/inbox/` first —
   `references/shared/project-inbox.md`. The `findings.md` entry cites
   that path.
1. Read/search only the one named source — not a full docs + tracker +
   chat + Figma + Miro sweep.
2. Synthesize it against what's already in that task's `findings.md` —
   what's new, what confirms existing findings, what contradicts them.
3. Append a dated entry to `findings.md` (skill = `research-agent`) and any
   durable URL to `sources.md` — **no docs draft, no PRD scaffold.**
4. If asked to draft a reply (e.g. "what should I reply"), draft it grounded
   in the synthesis — do not send without explicit go, same posture as
   `scheduling`/`ticket-create`.
5. Same privacy guardrail as the full pass applies to any private Slack
   content surfaced.

**Never** promotes itself into the full kickoff pass mid-conversation just
because a source turned out to be rich — if the designer wants a full PRD
scaffold from what was found, that's a new, explicit ask.

---

## Verdict synthesis mode (qual + quant → "did this work")

**The gap this closes:** this skill already **owns `testing/`** (above) —
planning and reporting a formal validation study once a PRD has a real
success metric. But real usage is often looser than a formal study: a
usability-test note here, a Slack-reported click metric there, no single
planned study tying them together. A real logged case (`settings-ia`,
"Calendar settings multi-click A/B numbers") had exactly this shape: a
quant number arrived via Slack with no formal `test-plan.md` to attach a
verdict to.

**What it does:**
1. Gather the **qualitative** signal that exists — usability notes, direct
   feedback, quotes already in `findings.md`, or a newly pasted/described
   source.
2. Gather the **quantitative** signal that exists — a metric, an A/B
   result, a click/completion number. **If none exists, say so plainly** —
   "no quant signal available yet" is a valid, honest answer, never padded
   with a qual-only stat, dressed up to look quantitative.
3. Synthesize into:
   ```
   ## Verdict — [what's being evaluated]

   **What we expected:** [from the brief/PRD's success criteria, if one exists]
   **What we saw (qual):** [notes/feedback/quotes, sourced]
   **What we saw (quant):** [the number, sourced — or "no quant signal available"]
   **Verdict:** worked / partially worked / didn't work / inconclusive
   **Recommended next iteration:** [one concrete next step]
   ```
4. **If `projects/<slug>/testing/test-plan.md` already exists** for this
   question, append this as a new dated entry under its own `## Results`
   section — reuse that file's existing verdict shape, don't create a
   second parallel record.
5. **If no formal test plan exists** (the common ad-hoc case), append
   directly to `findings.md` with the same shape — this does not force a
   `testing/test-plan.md` into existence retroactively just to hold one
   verdict.

**Never** invents a quantitative signal to make a verdict feel more
conclusive than the evidence supports — an honest "inconclusive, thin
signal" is a valid verdict, same discipline `test-plan-template.md`
already enforces for formal studies.

---

## Tools by job

Resolve each job to this team's tool with `references/shared/work-tools.md`
(profile `Work tools:` line first, then connected tools, then ask once).

| Job | Tools | Used for | If none is connected |
|-----|-------|----------|----------------------|
| **Docs** | Confluence, Notion, Google Docs | Read PRDs and research pages · write the draft | Read pasted docs · write the draft as Markdown in the project folder |
| **Tracker** | Jira, Linear, GitHub Issues | Read tickets, epics, and comments | Ask the designer to paste the relevant tickets |
| **Roadmap** | Jira Product Discovery, Linear projects, Notion database, GitHub Projects | Upcoming ideas and initiatives | Skip the roadmap leg and say so |
| **Chat** | Slack, Teams | Search public + private messages — private results are filtered per the privacy guardrail below before anything is surfaced | Ask the designer to paste the threads that matter |
| Figma (optional) | — | Linked design files / FigJam boards | Skip and say so |
| Miro (optional) | — | Linked workshop boards | Skip and say so |

**Availability check (Step 0 — before workflow):**

1. Read `designer-profile.local.md` → `Work tools:` and `MCP tools:`.
2. For each job with no tool, use the fallback above and **say what's
   skipped** in one line before starting:

> ⚠️ No tracker is connected — I'll search your docs and chat, and you can
> paste any tickets you want included.

3. If **no docs tool and no chat** are connected, a full sweep has nothing to
   search. Say so plainly and offer to connect one (`docs/setup/cursor-mcp-setup.md`)
   or to work from pasted material.

**Never** run partial searches without explaining what's skipped.

Docs linked from other sources (a Google Doc linked from a ticket, a Notion
page linked from Slack): open them with the matching tool, or in the IDE
browser when signed in.

**Mandatory legs:** every connected docs tool, tracker, and chat on every full
briefing. Miro + Figma when tools respond — fetch every cited board/file URL
from fetched bodies, not link-only.

---

## Workflow

1. **Search in parallel** — the docs tool (full page bodies), the tracker (full tickets, sweeping every board in `references/from-workload-agent/roadmap-boards.md` when the topic could span domains, running the live roadmap query from `references/from-workload-agent/roadmap-check.md` against any board the topic touches), chat threads; then Miro/Figma for URLs found in bodies
2. **Synthesise** — confidence rating (High / Medium / Low), conflict handling, no fabrication
3. **Write the draft** — full PRD scaffold from `references/brief-template.md` in the docs tool; blank placeholders where sources are missing; **draft only**, never auto-publish
4. **Reply in chat** — executive summary + biggest open question + next action + draft link

**Default filing:** the designer's **personal or private space** in the docs tool — a personal Confluence space, a private Notion page, or their own Google Drive. Ask once for a shared destination if they want one, and save it to `COMPANY-SOURCES.md` § Destinations.

**Large bodies (Confluence only):** the Atlassian MCP can reject very large page bodies. Compose the full draft in `drafts/_draft-<topic-slug>-body.md`, then sync with `npm run confluence:put-draft-body` (see `setup/confluence-large-bodies.md`).

---

## Output (chat reply)

```
📋 Discovery kickoff draft: [Topic] · [High/Medium/Low confidence]

• [Most important current-state fact + link]
• [Second fact + link]
• [Third fact + link]

Biggest open question: [one sentence]
Next action: [one sentence]

📄 Draft: [draft URL]
```

---

## Guardrails

- Never fabricate names, links, ticket keys, or dates
- Go deep: full page bodies and full tickets — search snippets alone are not enough
- If a mandatory leg fails, say so explicitly and mark the draft as partial
- Do not skip the draft because results are thin — thin passes still get honest gaps
- **Privacy (BLOCKING):** searching private Slack is mandatory; surfacing everything found there is not. Never paste comp, HR, health, legal, or interpersonal-conflict content into the draft or chat reply — even as a paraphrase — and never search Slack to profile a named individual. Full rules: `references/agents.md` § Privacy & sensitive content. When in doubt, withhold and say so rather than asking permission to include it.

---

## File map (this repo)

| File | Role |
|------|------|
| `references/agents.md` | Full agent specification |
| `references/brief-template.md` | Draft section order |
| `references/BUILD-BRIEF.md` | Output-structure addenda |
| `references/routing-rules.md` | Slack channel / domain routing |
| `references/roadmap-boards.md` | Pointer — canonical copy is `references/from-workload-agent/roadmap-boards.md` |
| `references/roadmap-check.md` | Pointer — canonical copy is `references/from-workload-agent/roadmap-check.md` |
| `references/taxonomy-example.md` | Product tagging example |
| `references/test-plan-template.md` | Copy into `projects/<slug>/testing/test-plan.md` once a validation study is planned |
| `docs/setup/cursor-mcp-setup.md` | Canonical MCP setup guide |
| `setup/test-prompts.md` | Verification prompts |
| `commands/brief-me.md` | `/brief-me` slash command definition |

---

## Self-improvement loop

After completing this research run, before ending your turn:

1. **Review execution:** Did any search leg fail, need a workaround, or miss relevant sources?
2. **Review corrections:** Did the designer correct, reject, or clarify anything meaningful during this run?
3. **Review gaps:** Did you discover a missing source type, an ambiguous search rule, or a privacy edge case this skill doesn't cover yet?

If **yes** to any:

- Propose **one specific, actionable improvement** to this skill file.
- State what would change and why (reference the step number or section).
- Wait for designer approval before editing the skill.

**Only propose changes that would prevent a real failure or fill a documented gap.** Do not suggest:
- Vague improvements ("could search deeper")
- Taste preferences without evidence
- Changes that belong in a different skill
- Fixes for one-off edge cases unlikely to recur

If nothing meaningful broke or was missing, skip this section silently.
