# How to check a Jira Product Discovery board (no cached list)

Deliberately **no hardcoded initiative list here.** A snapshot of "current
initiatives" written into a markdown file goes stale within days — proven
directly: several `CORE` items changed pipeline stage in the same week one
was captured. The only trustworthy source is a **live query, run at
research time**, every time. This file documents the technique, not the
data.

Applies to any board in `references/roadmap-boards.md` — not just `CORE`
(Core Product).

---

## Why quarter labels aren't the filter to use

Every JPD project has a `Quarters` field (a custom field — its
`cf[<id>]` differs per Jira instance) intended to tag which quarter an idea/opportunity
targets. In practice it **lags real planning** — e.g. on `CORE`, no item
was tagged for the current quarter while several were already active in
`Make`/`Plan` status. Don't filter on `Quarters` alone; check pipeline
status first, and treat a populated `Quarters` match as a bonus
confirmation, not the primary signal.

## The live query — two levels, not one

Run both via `searchJiraIssuesUsingJql` (Atlassian MCP) at the start of
any research pass that touches a given board — not from memory, not
from a previous chat's findings. **Skipping the second level is a real,
proven miss** — "Live Activity" push-to-tip work on `PAY` was invisible
at the Opportunity level entirely; it only exists as child
Solutions/Experiments under a differently-named parent Opportunity.

**Level 1 — initiative names** (what to call things, group by theme):

```
project = <KEY> AND status NOT IN (Backlog, Done, Abandoned)
  AND issuetype = Opportunity
ORDER BY status ASC, updated DESC
```

**Level 2 — is a specific named feature/topic actually being worked**
(never trust Level 1 alone to answer "is X happening" — a feature can be
buried in a child Solution/Experiment under an unrelated-sounding
Opportunity):

```
project = <KEY> AND status NOT IN (Backlog, Done, Abandoned)
  AND issuetype in (Solution, Experiment, Idea)
ORDER BY status ASC, updated DESC
```

— or, when you already have a candidate keyword (a feature name, a
product term the designer used): `AND text ~ "<keyword>"` on either
level, project-scoped or dropped entirely to search across boards.

- `<KEY>` = the JPD project key from the org pack's `COMPANY-SOURCES.md`
  § Roadmap boards (Fernwell example: `CORE`, `PAY`, `CON`, `GROW`,
  `TECH`, `PROMO`, `OPS` — see `references/roadmap-boards.md`).
- **Don't assume `Backlog`/`Done`/`Abandoned`/`Opportunity` apply
  everywhere** — `references/roadmap-boards.md` has a vocabulary table;
  `TECH` only has `Solution` issues, `OPS` uses `Discovery`/`Parking
  lot`/`Delivery` instead. A query that returns zero on one of these
  means check the vocabulary, not "this team has nothing active."
- Anything outside that board's backlog/done/abandoned-equivalent
  statuses is live work right now, regardless of what `Quarters` says.
- Read the resulting `status` values to sort by pipeline stage:
  `Wonder → Explore → Plan → Make → Launch & Adjust → Done`. `Make` and
  `Plan` are the closest to "this quarter, for real."
- **When asked "is [named feature] happening?" always run Level 2 (or
  the keyword variant) — never answer from Level 1 titles alone.**

To double-check whether quarter-tagging has caught up (worth trying, not
worth relying on):

```
project = <KEY> AND cf[<id>] = "Q3 '26"
```

## How `research-agent` should use this

Before drafting a PRD or briefing on a topic that could touch an
existing roadmap board, run the live query above against the relevant
board(s) and fold the result into the findings — cite the query and the
timestamp of the run, not a cached list. Flag in the executive summary
if the topic overlaps an in-flight `Make`/`Plan` item, so the draft
doesn't propose something already underway.
