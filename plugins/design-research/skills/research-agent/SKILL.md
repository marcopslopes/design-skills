---
name: research-agent
description: "Design discovery kickoff PRD scaffold for product designers. Triggered by: \"tell me everything about X\", \"kick off discovery on X\", \"PRD starter for X\", \"catch me up on X\", \"research X for a new project\", \"what do we know about X\", \"give me ideas for X\". Searches Confluence, Jira, and Slack in full depth — plus linked Figma boards, Miro boards, and Google Docs — then writes a structured draft page to Confluence and returns a short executive summary with confidence rating. Most net-new research requests should route through design-kickoff first, which owns the PRD gate — this skill is typically invoked from within that flow (Step 1b), not called directly."
inputs:
  required:
    - topic                # what to research
  optional:
    - squad                # narrows Jira/JPD scope
    - date_range           # for Slack/Confluence recency
    - task_folder          # projects/<slug>/ if one exists
  sources:
    - atlassian            # Jira + Confluence
    - slack
    
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

1. A **Confluence draft page** — PRD-style scaffold with every section filled where sources exist and intentional placeholder rows where they do not.
2. A **short executive summary** in chat — confidence rating + link to the draft.

**Not this skill:** “Add a Confluence page under [folder] about what we’ve done / why” for an already-approved topic → that is **`confluence-brief`** (`docs/HOWTO-CONFLUENCE-BRIEF.md`), the thin draft→go twin of `ticket-create`.

---

## Load before running

1. **`references/agents.md`** — full agent specification, workflow, guardrails, the company vocabulary, Slack reply format
2. **`references/confluence-template.md`** — Confluence section order and scaffold rules
3. **`references/BUILD-BRIEF.md`** — output-structure addenda (§13–§15)
4. **`references/shared/source-links.md`** — link every cited Jira/Confluence/Slack/Figma/Miro/Docs URL in chat and drafts
5. **`docs/setup/cursor-mcp-setup.md`** — MCP configuration (first-time setup)
6. **`COMPANY-SOURCES.md`** — global seed URL list; open rows whose section/topic matches the research ask (same Google Docs open path as in `references/agents.md`)
7. **`projects/<slug>/sources.md`** — when a task folder is in play: read existing project links; append durable URLs found or pasted during the pass (create from template if missing). Synthesis still goes to `findings.md`.

Optional: `references/routing-rules.md`, `references/taxonomy-example.md`, `setup/test-prompts.md`

**Owns `testing/` on any task folder** (`projects/<slug>/testing/`) — once a
PRD's "how will we know it worked?" has a real success metric, this
skill is who plans and reports the validation study that answers it.
Copy `references/test-plan-template.md` into `projects/<slug>/testing/
test-plan.md` when a study is actually planned or run — not before, and
not as a permanent placeholder. See `harness/agents/researcher.md`.

**Always check `references/from-workload-agent/roadmap-boards.md`** before the Jira leg of any topic that could span multiple product domains — it maps every known Jira Product Discovery board across teams, so the search isn't limited to whichever project the designer happened to name. (Canonical copy lives under `workload-agent/`, not here — see `references/roadmap-boards.md` in this folder for the pointer.)

**Always check `references/from-workload-agent/roadmap-check.md`** before claiming to know a roadmap board's "current" initiatives — it has no cached list on purpose (goes stale in days), just the live JQL query to run fresh against the relevant board every time.

---

## Triggers (natural language)

**Full kickoff pass** (net-new topic, produces a Confluence draft — see Workflow below):
- *tell me everything about [topic]*
- *catch me up on [topic]*
- *kick off discovery on [topic]*
- *research [topic] for a new project*
- *what do we know about [topic]*
- *what is [topic] / is there a project on [topic]* — plain lookup phrasing is **not** an exemption from routing; see below

**These all reach this skill through `design-kickoff`'s front door (`harness/ORCHESTRATOR.md` §2a — "net-new, no exceptions"), as Step 1b — never as a standalone bypass that skips the PRD/gate chain.** A designer asking "what is X" on a topic with no approved `projects/<slug>/` task is exactly as net-new as "let's build X"; both hit `design-kickoff` first. The distinction that actually matters is **gap-fill/verdict modes below** (approved task already exists) vs. **everything else** (net-new → `design-kickoff` → this skill's Step 1b). **Never** answer a net-new "what is X" from local repo files alone (`projects/*`, `src/design-harness/pages/*`) — those are this designer's own in-flight work, not verified ground truth about what the company actually has. Only a live Confluence/Jira/Slack sweep (this skill's Step 1b, reached via `design-kickoff`) answers "is this real" / "is there a project on it."

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
1. Read/search only the one named source — not a full Confluence + Jira +
   Slack + Figma + Miro sweep.
2. Synthesize it against what's already in that task's `findings.md` —
   what's new, what confirms existing findings, what contradicts them.
3. Append a dated entry to `findings.md` (skill = `research-agent`) and any
   durable URL to `sources.md` — **no Confluence draft, no PRD scaffold.**
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

## Required MCPs

| MCP | Used for | If unavailable |
|-----|----------|----------------|
| Atlassian | Confluence read + write · Jira read | **Decline** — can't run without Jira/Confluence |
| Slack | Search public + private messages — private results are filtered per the privacy guardrail below before anything is surfaced | **Decline** — can't search team knowledge without Slack |
| Miro (optional) | Board scans for links found in Jira/Slack | **Degrade** — skip Miro scans, continue with Jira/Slack/Figma only |

**Availability check (Step 0 — before workflow):**

Before running the workflow, check which MCPs are available:

1. Read `designer-profile.local.md` → check `MCP tools:` list
2. **If Jira/Atlassian is missing** → **decline plainly:**

> "I need Jira and Confluence to run research sweeps, but Jira wasn't set up
> during onboarding. Want to connect it now? See
> `docs/setup/cursor-mcp-setup.md`."

3. **If Slack is missing** → **decline plainly:**

> "I need Slack to search team knowledge, but it wasn't set up during
> onboarding. Want to connect it now? See `docs/setup/cursor-mcp-setup.md`."

4. **If Miro is missing** → **continue with degraded mode:**

> ⚠️ Miro wasn't set up — I'll skip board scans and search Jira, Confluence,
> Slack, and Figma only.

**Never** run partial searches without explaining what's skipped.
| Figma | Linked design files / FigJam boards |
| Miro | Linked workshop boards |

Google Docs linked from Confluence/Jira: open in IDE browser when signed in.

**Mandatory legs:** Atlassian + Slack on every full briefing. Miro + Figma when tools respond — fetch every cited board/file URL from fetched bodies, not link-only.

---

## Workflow

1. **Search in parallel** — Confluence (full page bodies), Jira (full issues, sweeping every board in `references/from-workload-agent/roadmap-boards.md` when the topic could span domains, running the live roadmap query from `references/from-workload-agent/roadmap-check.md` against any board the topic touches), Slack threads; then Miro/Figma for URLs found in bodies
2. **Synthesise** — confidence rating (High / Medium / Low), conflict handling, no fabrication
3. **Write Confluence draft** — full PRD scaffold from `references/confluence-template.md`; blank placeholders where sources are missing; **draft only**, never auto-publish
4. **Reply in chat** — executive summary + biggest open question + next action + draft link

**Default filing:** authenticated user's **personal Confluence space** (`getConfluenceSpaces` → `type: "personal"`).

**Large bodies:** compose full draft in `drafts/_confluence-draft-<topic-slug>-body.md`, then sync with `npm run confluence:put-draft-body` (see `setup/confluence-large-bodies.md`).

---

## Output (chat reply)

```
📋 Discovery kickoff draft: [Topic] · [High/Medium/Low confidence]

• [Most important current-state fact + link]
• [Second fact + link]
• [Third fact + link]

Biggest open question: [one sentence]
Next action: [one sentence]

📄 Draft: [Confluence draft URL]
```

---

## Guardrails

- Never fabricate names, links, ticket keys, or dates
- Deep Atlassian: full page bodies and full Jira issues — search snippets alone are not enough
- If a mandatory leg fails, say so explicitly and mark the draft as partial
- Do not skip the Confluence draft because results are thin — thin passes still get honest gaps
- **Privacy (BLOCKING):** searching private Slack is mandatory; surfacing everything found there is not. Never paste comp, HR, health, legal, or interpersonal-conflict content into the draft or chat reply — even as a paraphrase — and never search Slack to profile a named individual. Full rules: `references/agents.md` § Privacy & sensitive content. When in doubt, withhold and say so rather than asking permission to include it.

---

## File map (this repo)

| File | Role |
|------|------|
| `references/agents.md` | Full agent specification |
| `references/confluence-template.md` | Confluence section order |
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
