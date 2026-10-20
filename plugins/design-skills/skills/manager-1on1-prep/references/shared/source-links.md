# Source links — repo-wide rule for cited external IDs

**Whenever chat output, tables, or markdown files cite something that has a
stable URL from a connected source, link it.** Plain ticket keys, page titles,
Figma node names, or channel names alone are not enough — the designer
should be one click away from the source.

Applies to **all** harness flows: onboarding handoff, `workload-agent`,
`research-agent`, `design-kickoff`, `manager-1on1-prep`, cross-squad maps,
findings appendices, and any ad-hoc ticket, docs, or chat summary in chat.
Which tool fills each job comes from `work-tools.md`.

---

## When to link (mandatory)

| Source | Link when you cite… | URL comes from |
|--------|---------------------|----------------|
| **Tracker** (Jira, Linear, GitHub Issues) | Any ticket key (`PROJ-170`, `ENG-42`, `#318`) | The tool's response, or the tracker base URL saved in the profile |
| **Docs** (Confluence, Notion, Google Docs) | Any page or doc you name, quote, or list as a source | The full URL from the tool response or search — never invent paths |
| **Chat** (Slack, Teams) | Any thread or message you reference | Permalink from the tool when available; else channel + date in text, and say there's no link |
| **Figma / FigJam** | Any file or frame you cite | Full `figma.com/design/...` or `figma.com/board/...` URL |
| **Miro** | Any board you cite | Full `miro.com/app/board/...` URL |
| **Code host** | PR, issue, or repo path cited as a deliverable | Full URL |

**Default:** if you fetched it with a tool or the designer pasted a URL,
preserve or reconstruct the link in output. When in doubt, link.

---

## Markdown format

Use standard markdown links — label = the human-readable id, href = full URL:

```markdown
[PROJ-170](https://your-org.atlassian.net/browse/PROJ-170)
[ENG-42](https://linear.app/your-org/issue/ENG-42)
[Onboarding permissions revamp](https://www.notion.so/your-org/Onboarding-permissions-revamp-1234567890)
```

### Tables

- **Key / Ticket column:** always a linked key — never bare `PROJ-170` or `ENG-42`.
- **Summary column:** plain text (truncate ~60 chars); the key column carries the link.
- **Multiple keys in one cell:** link each: `[PROJ-156](…), [PROJ-174](…)`.
- **Docs / chat in Source column:** full markdown link, not title only.

### Lists and prose

- First mention of a ticket in a paragraph: linked key.
- Repeated mentions in the same short block: linked at least once; bare key OK only if linked earlier in the same table row or bullet.

---

## When bare text is OK

| Situation | OK without link |
|-----------|-----------------|
| A query in a "Queries run" footer | Keys inside the query stay literal |
| Ticket key inside a code block | Literal |
| Tool lookup failed / item not found | Say so; do not fabricate a URL |
| Designer pasted a key only and lookup failed | Cite the key + one line that the link couldn't be verified |

Never skip a link **because** "the UI might not support it" — chat renders
markdown links in tables and prose.

---

## Forbidden

- Bare ticket keys in workload tables, cross-squad maps, or research summaries when a tracker is connected
- "Link in chat if the UI supports it" — **obsolete**; always link
- Inventing page paths or ticket keys not returned by search
- Replacing links with "see the tracker" or "on the board" without a URL

---

## Consumers (non-exhaustive)

| File / skill | What to link |
|--------------|--------------|
| `designer-onboarding/references/post-onboarding-handoff.md` | Workload table Key column |
| `designer-onboarding/references/onboarding-workload-scope.md` | All ticket tables in handoff |
| `../workload-agent/SKILL.md` | Roadmap + execution output |
| `references/from-workload-agent/design-board.md` | Ticket lines in reports |
| `references/from-research-agent/BUILD-BRIEF.md` | §14 Ticket column (already required) |
| `references/from-research-agent/agents.md` | § Present and link back |
| `SKILL.md` | Tickets in prep doc |
| `../design-kickoff/SKILL.md` | Findings appended to `projects/` |

If a skill's output rules contradict this file, **this file wins** — update
the skill to point here, not the other way around.
