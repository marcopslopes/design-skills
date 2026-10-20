# Source links — repo-wide rule for cited external IDs

**Whenever chat output, tables, or markdown files cite something that has a
stable URL from a connected source, link it.** Plain ticket keys, page titles,
Figma node names, or Slack channel names alone are not enough — the designer
should be one click away from the source.

Applies to **all** harness flows: onboarding handoff, `workload-agent`,
`research-agent`, `design-kickoff`, `manager-1on1-prep`, cross-squad maps,
findings appendices, and any ad-hoc Jira/Confluence/Slack summary in chat.

---

## When to link (mandatory)

| Source | Link when you cite… | URL pattern |
|--------|---------------------|-------------|
| **Jira** | Any issue key (`PROJ-170`, `PROJ-631`, `PROJ-3232`, …) | `https://your-org.atlassian.net/browse/<KEY>` |
| **Confluence** | Any page you name or quote | Full `https://your-org.atlassian.net/wiki/...` from MCP or search — never invent paths |
| **Slack** | Any thread or message you reference | Permalink from MCP when available; else channel + date in text and note if no link |
| **Figma / FigJam** | Any file or frame you cite | Full `figma.com/design/...` or `figma.com/board/...` URL |
| **Miro** | Any board you cite | Full `miro.com/app/board/...` URL |
| **Google Docs / Sheets** | Any doc you opened or list as a source | Full `docs.google.com/...` or `drive.google.com/...` URL |
| **GitHub** | PR, issue, or repo path when cited as deliverable | Full GitHub URL (this org: `https://github.com/marcopslopes/...`) |

**Default:** if you fetched it via MCP or the designer pasted a URL, preserve
or reconstruct the link in output. When in doubt, link.

---

## Markdown format

Use standard markdown links — label = the human-readable id, href = full URL:

```markdown
[PROJ-170](https://your-org.atlassian.net/browse/PROJ-170)
[Onboarding permissions revamp](https://your-org.atlassian.net/wiki/spaces/DESIGN/pages/1234567890)
```

### Tables

- **Jira Key / Ticket column:** always `[KEY](https://your-org.atlassian.net/browse/KEY)` — never bare `PROJ-170`.
- **Summary column:** plain text (truncate ~60 chars); the key column carries the link.
- **Multiple keys in one cell:** link each: `[PROJ-156](…), [PROJ-174](…), [PROJ-168](…)`.
- **Confluence / Slack in Source column:** full markdown link, not title only.

### Lists and prose

- First mention of an issue in a paragraph: linked key.
- Repeated mentions in the same short block: linked at least once; bare key OK only if linked earlier in the same table row or bullet.

---

## When bare text is OK

| Situation | OK without link |
|-----------|-----------------|
| JQL in a "Queries run" footer | Keys in JQL strings stay literal |
| Issue key inside a code block | Literal |
| Source MCP failed / issue not found | Say so; do not fabricate a URL |
| Designer pasted key only and lookup failed | Cite key + one line that link couldn't be verified |

Never skip a link **because** "the UI might not support it" — Cursor chat
renders markdown links in tables and prose.

---

## Forbidden

- Bare Jira keys in workload tables, cross-squad maps, or research summaries when Atlassian is connected
- "Link in chat if the UI supports it" — **obsolete**; always link
- Inventing Confluence paths or Jira keys not returned by search
- Replacing links with "see Jira" or "on the board" without a URL

---

## Consumers (non-exhaustive)

| File / skill | What to link |
|--------------|--------------|
| `designer-onboarding/references/post-onboarding-handoff.md` | Workload table Key column |
| `designer-onboarding/references/onboarding-workload-scope.md` | All Jira tables in handoff |
| `../workload-agent/SKILL.md` | Roadmap + execution output |
| `references/from-workload-agent/design-board.md` | Ticket lines in reports |
| `references/from-research-agent/BUILD-BRIEF.md` | §14 Ticket column (already required) |
| `references/from-research-agent/agents.md` | § Present and link back |
| `SKILL.md` | Tickets in prep doc |
| `../design-kickoff/SKILL.md` | Findings appended to `projects/` |

If a skill's output rules contradict this file, **this file wins** — update
the skill to point here, not the other way around.
