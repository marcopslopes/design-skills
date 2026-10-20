---
description: Run a full design discovery kickoff briefing on a topic — searches your docs tool, tracker, and chat in depth, then writes a structured draft page and returns an executive summary.
argument-hint: "[topic, feature, or project name]"
---

# /brief-me

Run the research-agent skill on the given topic.

## Steps

1. **Read spec** — Load `references/agents.md` (full workflow, guardrails, the company vocabulary), `references/brief-template.md` (section order), and `references/shared/work-tools.md` (which tool fills each job).
2. **Resolve topic** — Live search the docs tool (Confluence, Notion, or Google Docs), the tracker (Jira, Linear, or GitHub Issues), and chat (Slack or Teams) using the topic plus close synonyms. Retry with broader phrasing if first pass is empty.
3. **Retrieve in parallel** — Fetch full page bodies, full tickets, and message threads. For every `figma.com` or `miro.com` URL found in those bodies, fetch via Figma/Miro MCP (up to 5 Figma files, 4 Miro boards). Extract and open linked Google Docs in the browser where possible.
4. **Synthesise** — Resolve conflicts (most recent source wins, discrepancies surfaced), rate confidence High / Medium / Low.
5. **Write the draft** — All 17 sections from the template; placeholder rows where sources are empty; draft status only. No docs tool connected → write it as Markdown in the project folder.
6. **Reply** — Executive summary (3–4 sentences + confidence rating) + link to the draft, in the format defined in `SKILL.md`.

## Output

Draft page + chat summary:

```
📋 Discovery kickoff draft: [Topic] · [High/Medium/Low confidence]

• [Fact 1 + link]
• [Fact 2 + link]
• [Fact 3 + link]

**Biggest open question:** [one sentence]
**Next action:** [one sentence]

📄 Draft: [draft URL]
```
