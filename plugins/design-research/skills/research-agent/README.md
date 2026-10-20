# Project Briefing Agent

A research agent for product designers and PMs. You tell it a topic — a feature, a flow, a project — and it searches everything your team has written about it across Confluence, Jira, Slack, Figma, and Miro. Then it writes a structured draft page in Confluence and sends you a short summary.

---

## What it does

Most projects have a history: past research, old Jira epics, design explorations, Slack threads where decisions were made. That context is spread across tools and hard to find before a new discovery kickoff. This agent finds it for you.

**For existing projects** — it surfaces everything done before so you know what to reuse and what to ignore. You skip the "did we already research this?" conversation.

**For new projects** — it runs the same search and comes back mostly empty, but *usefully* empty: the output shows you a structured map of what you don't know yet, so you walk into kickoff knowing exactly what questions to answer.

### What it searches

| Source | What it reads |
|--------|--------------|
| Confluence | Full page bodies — PRDs, research summaries, programme docs, linked children |
| Jira | Full issues — status, assignee, components, labels, epics, comments |
| Slack | Public and private messages, threads, canvases — sensitive content is filtered before it reaches you, see Privacy below |
| Figma | Design files and FigJam boards linked from any of the above |
| Miro | Workshop boards linked from any of the above |
| Google Docs | Docs linked from Confluence or Jira, opened in browser when signed in |

### What it produces

**1. A Confluence draft page** — a PRD-style scaffold with 17 sections:

| Section | What it answers |
|---------|----------------|
| Executive summary | Where things stand + confidence rating |
| The opportunity | Why this initiative matters right now |
| Problem statement | What is broken, with evidence |
| Target users & JTBD | Who we're designing for and what job they need done |
| Data & BI | Numbers, funnel rates, metrics — every number cited and dated |
| User research insights | Actual findings from studies, not just titles |
| Design insights & exploration | What design explored, what was validated, what's open |
| Current state — delivery & confirmed problems | What's in flight, what's broken with proof |
| Competitive / market context | Only when requested |
| Open questions & decisions | The decisions the team still needs to make |
| Recommendations | Prioritised actions from sources, not invented |
| Jira tickets index | Every relevant issue from this pass, deduped |
| Who's involved | Who to talk to, with team/squad and recent activity |
| Conflicts, staleness, data gaps | What to verify before treating as current |
| Appendix — relevant links | All sources grouped by tool |

Sections with no data are **not removed** — they get a placeholder row and a fill-in prompt. That tells you exactly what to bring to the kickoff workshop.

**2. A short chat summary** — sent back in Slack or in chat:

```
📋 Discovery kickoff draft: [Topic] · [High/Medium/Low confidence]

• [Most important fact + link]
• [Second fact + link]
• [Third fact + link]

Biggest open question: [one sentence]
Next action: [one sentence]

📄 Draft: [Confluence URL]
```

---

## Privacy — what happens with private Slack content

This agent is allowed to search private Slack channels and DMs, but that
does not mean everything it finds there ends up in your draft or chat
reply. It withholds — never asks permission to include, always defaults to
withholding — anything that looks like compensation, performance/HR,
health, legal, or interpersonal-conflict content, even if it's technically
on-topic. It also never quotes private messages verbatim (paraphrases
instead) and never searches Slack to build a picture of what one named
person has said.

If a Slack channel is configured for team-wide use (Option 1 below), the
agent's reply is posted **into that channel, visible to everyone in it** —
the same filtering applies there, with zero relaxation just because you're
the one who asked.

Full rules: `references/agents.md` § Privacy & sensitive content.

---

## How to use it

No special syntax. Use plain language:

```
tell me everything about checkout flow
catch me up on provider onboarding
kick off discovery on payments
what do we know about no-show protection?
research the booking flow for a new project
```

Or use the slash command (Claude app):

```
/brief-me checkout flow
/brief-me provider onboarding — last 30 days
```

Optional parameters you can add:

| Parameter | Example | Effect |
|-----------|---------|--------|
| `last N days` | `last 30 days` | Limits Slack search window |
| `space [KEY]` | `space DT1` | Saves draft to a team space instead of your personal space |
| `parent [page ID]` | `parent 4643487752` | Sets a parent page in Confluence |
| `chat only` | `chat only` | Skips creating the Confluence page |
| `competitor benchmark` | add to any prompt | Includes a public competitor comparison section |

---

## How to install it

There are three ways depending on which tool you use.

---

### Option 1 — Slack (team-wide, no Cursor needed per person)

Everyone in the configured Slack channel can use `@Cursor` after a one-time admin setup.

**Who does this:** A Cursor account admin.

**Steps:**

1. Go to [cursor.com/dashboard → Integrations](https://cursor.com/dashboard?tab=integrations)
2. Click **Connect** next to Slack → install the Cursor Slack app in your work workspace
3. Enable usage-based pricing when prompted
4. Go to [cursor.com/agents](https://cursor.com/agents) → MCP dropdown → connect:
   - **Atlassian** — authenticate with your work Atlassian account
   - **Slack** — authenticate with your work Slack workspace
   - **Figma** — authenticate with your work Figma account *(optional but recommended)*
   - **Miro** — connect via [miro.com/marketplace/miro-mcp-for-cursor](https://miro.com/marketplace/miro-mcp-for-cursor/) *(optional)*
5. In each Slack channel where the team will use it, type `@Cursor settings` → set **Default repository** to this repo
6. Add routing rules: `@Cursor settings` → Routing rules → add keywords like `checkout`, `onboarding`, `payments`, `design research` pointing to this repo

**Once set up, anyone in those channels types:**

```
@Cursor tell me everything about [topic]
@Cursor catch me up on [topic]
```

No individual Cursor account or installation needed for teammates.

> **Note on Confluence drafts:** In this shared mode the Confluence page is created under the account that owns the Atlassian MCP connection. Add `space DT1, parent [page ID]` to your prompt to route drafts to a shared team space.

---

### Option 2 — Claude app (individual install, no Cursor needed)

**Not currently available.** This repo does not ship a packaged Claude
skill file for this agent — there is no `dist/` folder, and the packaging
scripts referenced by earlier drafts of this doc (`sync-claude-plugin-refs.sh`,
`zip-claude-app-skill.sh`) don't exist in this repo either. Use Option 1
(Slack) or Option 3 (Cursor IDE) below instead. If a Claude app package is
built later, restore install steps here and re-add the `dist/*.skill`
reference to `SKILL.md`.

---

### Option 3 — Cursor IDE (individual, for people who have Cursor)

If you already use Cursor, the skill is built in. The agent reads `SKILL.md` in this repo automatically.

**Steps:**

1. Clone this repo and open it in Cursor
2. Go to [cursor.com/agents](https://cursor.com/agents) → MCP dropdown → connect Atlassian, Slack, Figma, Miro (same as above)
3. Open the Cursor agent panel and type:
   ```
   tell me everything about [topic]
   ```

Confluence drafts land in your own personal space automatically.

Full MCP setup details: [`docs/setup/cursor-mcp-setup.md`](https://github.com/marcopslopes/design-harness/blob/main/docs/setup/cursor-mcp-setup.md)

---

## What MCPs are needed (for all three options)

| MCP | What it does | Required? |
|-----|-------------|-----------|
| Atlassian | Reads Confluence + Jira, writes the draft page | **Yes — onboarding gate** |
| Slack | Searches messages and threads | **Yes — onboarding gate** |
| Figma | Opens linked design files and FigJam boards | **Yes — onboarding gate** |
| Miro | Opens linked workshop boards | **Yes — onboarding gate** |

Google Docs do not need a separate MCP — the agent opens them in the browser if you're signed in, or lists them as inaccessible if not.

---

## File reference

Paths below are relative to `./`, this skill's
actual folder in this repo (see note in Option 2 above — there is no
separate `dist/`, `agents/`, or `.cursor/agents.md` packaging layout here).

| File | What it is |
|------|-----------|
| `SKILL.md` | Full agent specification — workflow, guardrails, MCP requirements |
| `references/agents.md` | Full agent specification detail — guardrails, domain vocabulary, privacy rules |
| `references/confluence-template.md` | Confluence section order and scaffold rules |
| `references/BUILD-BRIEF.md` | Output-structure addenda (priority columns, Jira index rules) |
| `references/routing-rules.md` | Slack channel / domain routing |
| `references/roadmap-boards.md` | Pointer — canonical copy is `references/from-workload-agent/roadmap-boards.md` |
| `references/roadmap-check.md` | Pointer — canonical copy is `references/from-workload-agent/roadmap-check.md` |
| `references/taxonomy-example.md` | Product tagging example |
| `references/test-plan-template.md` | Copy into `projects/<slug>/testing/test-plan.md` once a validation study is planned |
| `commands/brief-me.md` | `/brief-me` slash command definition |
| `setup/cursor-mcp-setup.md` | Pointer to the canonical MCP setup guide, `docs/setup/cursor-mcp-setup.md` |
| `setup/slack-routing-setup.md` | Slack + Cursor routing setup guide |
| `setup/test-prompts.md` | Test prompts to verify the agent works |
| `setup/confluence-large-bodies.md` | How to push large draft pages via REST when MCP hits size limits |
