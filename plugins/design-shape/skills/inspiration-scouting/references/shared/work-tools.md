# Work tools — one contract, whichever tool the team uses

Skills never assume a specific docs tool or tracker. They name a **job**
(docs, tracker, roadmap, chat) and resolve it to the tool this designer
actually has, using this file. Brand-specific steps live here, not in skills.

**Rule for skill authors:** write "your docs tool", "the tracker", "the
roadmap" in a skill. Link here for how to search, read, and write. Never
hardcode one vendor's query language or tool name in a skill's main steps.

---

## The four jobs

| Job | What skills use it for | Tools covered |
|-----|------------------------|---------------|
| **Docs** | Read PRDs, briefs, research pages; write briefs and reports | Confluence, Notion, Google Docs |
| **Tracker** | Read and create tickets, find a designer's assigned work | Jira, Linear, GitHub Issues |
| **Roadmap** | Find upcoming ideas and initiatives before they become tickets | Jira Product Discovery, Linear projects, a Notion database, GitHub Projects |
| **Chat** | Read feedback threads, find discussion behind a decision | Slack, Microsoft Teams |

A team can mix tools — Notion for docs and Jira for tickets is common. Resolve
each job separately.

---

## Step 1 — Resolve which tool fills each job

In order, stop at the first that answers:

1. **Designer profile.** `designer-profile.local.md` → `Work tools:` line, e.g.
   `Work tools: docs=notion, tracker=linear, roadmap=linear, chat=slack`.
2. **Connected tools.** List dynamic tool namespaces (`GetDynamicTools`) and
   match by name: `atlassian` → Confluence + Jira (+ Product Discovery);
   `notion` → Notion; `linear` → Linear; `github` → GitHub Issues/Projects;
   `google-drive` / `gdrive` / `google-workspace` → Google Docs; `slack`,
   `teams` → chat. Only count a namespace whose status is connected.
3. **Ask once.** If two tools could fill the same job and the profile doesn't
   say, ask with `AskQuestion` ("Where do your team's docs live?"), then offer
   to save the answer to the profile's `Work tools:` line.
4. **None connected.** Use the fallback for that job (below). Never block.

Tool names inside each server vary by version. **Discover them** with
`GetDynamicTools` for the namespace before calling; the names below are
typical, not guaranteed.

---

## Docs

| Tool | Search | Read | Write a new page | Update a page |
|------|--------|------|------------------|---------------|
| **Confluence** | `searchConfluenceUsingCql` (CQL: `text ~ "checkout" AND space = DES`) or the Atlassian cross-product `search` | `getConfluencePage` | `createConfluencePage` (pass draft status where supported) | `updateConfluencePage` |
| **Notion** | `notion-search` | `notion-fetch` | `notion-create-pages` under a parent page | `notion-update-page` |
| **Google Docs** | Drive search by name/full text | Read the doc's text | Create a doc in a chosen folder | Append or replace body |

**Writing defaults (all tools):**
- Create as a **draft** or in a private/personal space first when the tool
  supports it. Never publish to a shared space without the designer's go.
- Ask for the destination once (space, parent page, or folder) and offer to
  save it to `COMPANY-SOURCES.md` § Destinations.
- Return the page URL and link it in chat (`source-links.md`).

**Fallback (no docs tool):** write the document as Markdown in the project
folder (`projects/<slug>/artifacts/`) and say it's ready to paste.

---

## Tracker

| Tool | Find tickets | Read one | Create | Query language |
|------|--------------|----------|--------|----------------|
| **Jira** | `searchJiraIssuesUsingJql` | `getJiraIssue` | `createJiraIssue` | JQL, e.g. `assignee = currentUser() AND statusCategory != Done` |
| **Linear** | `list_issues` with filters | `get_issue` | `create_issue` (needs a team) | Filters: assignee `me`, state type not `completed`, team key |
| **GitHub Issues** | `search_issues` / `list_issues` | `get_issue` | `create_issue` (needs `owner/repo`) | Search syntax, e.g. `is:issue is:open assignee:@me repo:org/app` |

**Same intent, three tools — "my open design work":**

| Jira | Linear | GitHub |
|------|--------|--------|
| `assignee = currentUser() AND statusCategory != Done ORDER BY updated DESC` | assignee: me, state type: not completed, order by updated | `is:issue is:open assignee:@me sort:updated-desc` |

**Ticket fields that map across tools:**

| Concept | Jira | Linear | GitHub |
|---------|------|--------|--------|
| Container | Project (`PROJ`) | Team (`ENG`) | Repository |
| Key | `PROJ-123` | `ENG-123` | `#123` |
| Type | Issue type | Label | Label |
| Status group | Status category | State type | Open / closed |
| Epic / parent | Epic / parent | Project or parent issue | Milestone or parent issue |
| Find a person | `lookupJiraAccountId` | `list_users` | User search (login) |

Resolve a named person to their tracker identity **before** filtering by
assignee — first names collide.

**Fallback (no tracker):** write the ticket as Markdown (title, context,
acceptance criteria) for the designer to paste, and say which fields to fill.

---

## Roadmap

| Tool | Where ideas live |
|------|------------------|
| **Jira Product Discovery** | Product Discovery projects (ideas view) |
| **Linear** | Projects and initiatives |
| **Notion** | A roadmap database (ask which one, then save it) |
| **GitHub** | Projects boards |

Which boards to search first per squad lives in `COMPANY-SQUADS.md` and
`COMPANY-SOURCES.md` § Roadmap boards. If the company has no roadmap tool,
**skip the roadmap step and say so** — never treat it as an error.

---

## Chat

| Tool | Search | Read a thread |
|------|--------|---------------|
| **Slack** | `slack_search_public` / `slack_search_public_and_private` | `slack_read_thread` |
| **Microsoft Teams** | Message search | Read the conversation |

**Fallback:** ask the designer to paste the relevant messages.

---

## Links

Every cited item gets its real URL — the rules are in `source-links.md`.
Never build a URL by hand from a key unless the base URL is known from the
profile or a previous tool response.

---

## Saving the answer

When a job is resolved by asking, offer once to save it:

```markdown
- Work tools: docs=notion, tracker=linear, roadmap=linear, chat=slack
```

Valid values: `docs` = `confluence` | `notion` | `google-docs` | `none`;
`tracker` = `jira` | `linear` | `github` | `none`; `roadmap` =
`jira-product-discovery` | `linear` | `notion` | `github` | `none`; `chat` =
`slack` | `teams` | `none`.

---

## Never do this

- Never name one vendor as the default in a skill's main steps.
- Never block a skill because a specific tool is missing — use the fallback.
- Never publish to a shared docs space without the designer's go.
- Never guess a tool's name or query syntax — discover the server's tools first.
- Never invent ticket keys, page paths, or URLs.
