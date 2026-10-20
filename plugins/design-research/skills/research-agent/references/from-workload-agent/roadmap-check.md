# How to check a roadmap board (no cached list)

Deliberately **no hardcoded initiative list here.** A snapshot of "current
initiatives" written into a markdown file goes stale within days — proven
directly: several `CORE` items changed pipeline stage in the same week one
was captured. The only trustworthy source is a **live query, run at
research time**, every time. This file documents the technique, not the
data.

Applies to any board in `references/roadmap-boards.md`, in whichever roadmap
tool the team uses (`references/shared/work-tools.md` § Roadmap).

---

## Why quarter labels aren't the filter to use

Most roadmap tools have a quarter or target-date field (a `Quarters` custom
field in Product Discovery, a target date on Linear projects, a date
property in Notion, an iteration field in GitHub Projects). In practice it
**lags real planning** — e.g. on `CORE`, no item was tagged for the current
quarter while several were already active in `Make`/`Plan` status. Don't
filter on the quarter field alone; check pipeline status first, and treat a
quarter match as a bonus confirmation, not the primary signal.

## The live query — two levels, not one

Run both at the start of any research pass that touches a given board —
not from memory, not from a previous chat's findings. **Skipping the second
level is a real, proven miss** — "Live Activity" push-to-tip work on `PAY`
was invisible at the top level entirely; it only existed as child items
under a differently-named parent.

**Level 1 — initiative names** (what to call things, group by theme):
top-level items that are not in backlog, done, or abandoned.

**Level 2 — is a specific named feature/topic actually being worked**
(never trust Level 1 alone to answer "is X happening" — a feature can be
buried in a child item under an unrelated-sounding parent): child items in
the same active states, optionally with a keyword.

| Tool | Level 1 | Level 2 |
|---|---|---|
| **Jira Product Discovery** (`searchJiraIssuesUsingJql`) | `project = <KEY> AND status NOT IN (Backlog, Done, Abandoned) AND issuetype = Opportunity ORDER BY status ASC, updated DESC` | `project = <KEY> AND status NOT IN (Backlog, Done, Abandoned) AND issuetype in (Solution, Experiment, Idea) ORDER BY status ASC, updated DESC` |
| **Linear** | Initiatives (or projects) not completed or canceled, ordered by updated | Projects under that initiative, or issues inside the project, not completed |
| **Notion** | Database rows whose status is not backlog / done / abandoned | Child rows or linked pages of those items |
| **GitHub Projects** | Items whose status column is not backlog / done | Sub-issues or linked issues of those items |

When you already have a candidate keyword (a feature name, a product term
the designer used), add it to either level — `AND text ~ "<keyword>"` in JQL,
a text query elsewhere — scoped to one board or across all of them.

- Board keys and names come from the org pack's `COMPANY-SOURCES.md`
  § Roadmap boards (Northline example: `CORE`, `PAY`, `CON`, `GROW`,
  `TECH`, `PROMO`, `OPS` — see `references/roadmap-boards.md`).
- **Don't assume the status names above apply everywhere** —
  `references/roadmap-boards.md` has a vocabulary table; `TECH` only has
  `Solution` items, `OPS` uses `Discovery`/`Parking lot`/`Delivery`. A query
  that returns zero means check the vocabulary, not "this team has nothing
  active."
- Anything outside that board's backlog/done/abandoned-equivalent
  statuses is live work right now, regardless of what the quarter field says.
- Read the resulting status values to sort by pipeline stage. In the
  Northline example: `Wonder → Explore → Plan → Make → Launch & Adjust →
  Done`, where `Make` and `Plan` are the closest to "this quarter, for real."
- **When asked "is [named feature] happening?" always run Level 2 (or
  the keyword variant) — never answer from Level 1 titles alone.**

To double-check whether quarter-tagging has caught up (worth trying, not
worth relying on), filter on the quarter field — e.g. JQL
`project = <KEY> AND cf[<id>] = "Q3 '26"`, where the custom field ID
differs per Jira instance.

## How `research-agent` should use this

Before drafting a PRD or briefing on a topic that could touch an
existing roadmap board, run the live query above against the relevant
board(s) and fold the result into the findings — cite the query and the
timestamp of the run, not a cached list. Flag in the executive summary
if the topic overlaps an in-flight `Make`/`Plan` item, so the draft
doesn't propose something already underway.
