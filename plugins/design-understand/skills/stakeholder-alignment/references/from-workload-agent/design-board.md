# Designer execution boards

Design team work often lives in **more than one** tracker container — two
Jira projects, two Linear teams, or a design repo plus a product repo on
GitHub. Checking only one will miss real assignments. Proven miss (example):
a designer's work on one squad's feature area lived on the second design
project, not the main one — always check every design container, don't
assume by squad.

Which tracker the team uses comes from `references/shared/work-tools.md`.
Which containers count as "design work" comes from `COMPANY-SQUADS.md`
§ Design execution boards (org-pack). This harness's worked example uses two
containers, keyed `DES` and `UXR` below — replace them with your own.

| Container | Example key | Who tends to use it |
|---|---|---|
| Design | `DES` | Most designers |
| UX Designs | `UXR` | Squad-linked design tickets |

*(Board URLs and rosters are illustrative — resolve your own via a live
query, never hardcode a real name or board list here.)*

---

## Shared facts

- **Done-equivalent states differ per container.** In the example, `DES`
  closes with `Done` / `Canceled`; `UXR` adds `Closed`. Linear groups these
  as state type `completed` / `canceled`; GitHub uses `closed`. Filter on the
  status **group**, not one status name, wherever the tool supports it.
- **Active work** = in progress or in review. **Queued** = backlog or to do.
  **On hold** = any paused / blocked state the team uses.

## Live query — run **every** design container

Same intent, three trackers. Discover the server's tool names first
(`work-tools.md` § Tracker).

**All open design work:**

| Jira (JQL) | Linear (filters) | GitHub (search) |
|---|---|---|
| `project in (DES, UXR) AND statusCategory != Done ORDER BY assignee ASC, status ASC` | team in design teams · state type not completed or canceled · order by assignee | `is:issue is:open repo:org/design repo:org/ux sort:updated-desc` (or `label:design` across repos) |

**When a person is named**, resolve them in the tracker first (Jira
`lookupJiraAccountId`, Linear `list_users`, GitHub user search) — duplicate
first names happen — then filter **every** design container by that assignee:

| Jira | Linear | GitHub |
|---|---|---|
| `assignee = "<accountId or full name>" AND project in (DES, UXR) AND statusCategory != Done ORDER BY updated DESC` | assignee = resolved user · design teams · not completed | `is:issue is:open assignee:<login> repo:org/design repo:org/ux` |

**Keyword / feature search** (e.g. "Live Activity") — search every container:

| Jira | Linear | GitHub |
|---|---|---|
| `project in (DES, UXR) AND statusCategory != Done AND text ~ "<keyword>"` | text query `<keyword>` · design teams · not completed | `is:issue is:open "<keyword>" repo:org/design repo:org/ux` |

Fields to pull: assignee, status, title, updated, container (project / team /
repo).

## Reporting rules

- Group by **assignee**, not status
- Count active (in progress + review) separately from queued
- Call out on-hold items by name
- When results span containers, show which one each ticket is on
- **Link every ticket** in chat/table output with its real URL — see
  `references/shared/source-links.md`
- **Also check** the team's latest weekly stand-up page in the docs tool
  (location recorded in `COMPANY-SOURCES.md`, if the team keeps one) when the
  tracker returns zero but a designer name is expected — some work is logged
  in stand-ups before (or instead of) a ticket. Cite the page + date; don't
  treat it as a substitute for a ticket when one exists.

## Designer roster hint (not exhaustive — verify in the tracker)

Do not hardcode real names/squads here — resolve live via the tracker and
`COMPANY-SQUADS.md` (org-pack). This section intentionally stays empty in
the public harness.

---

## Manager mode — multiple reports (batched query)

Used by `workload-agent` § Manager mode and `../manager-1on1-prep/`
when the requester's profile has `role: manager` (or the request names
several specific reports directly). Batches all reports into **one**
query instead of N where the tracker allows it:

| Jira | Linear | GitHub |
|---|---|---|
| `assignee in ("A", "B", "C") AND project in (DES, UXR) AND statusCategory != Done ORDER BY assignee ASC, status ASC` | assignee in resolved users · design teams · not completed | one search per person (GitHub search takes a single `assignee:`), then merge |

Resolve every name first (same duplicate-first-name caveat as the
single-assignee case above), then run the query. Group the results by
assignee in the output — same grouping rule as the rest of this file, just
multiple people in one response instead of one.

### ⚙️ Staleness threshold (single source of truth — change here, not inline elsewhere)

```
MANAGER_MODE_STALE_DAYS = 7
```

A ticket is **stale** if it is active (in progress or in review) **and**
its last update is more than `MANAGER_MODE_STALE_DAYS` days old. On-hold
tickets are always called out by name regardless of age — staleness is
specifically about active-but-untouched work, not the already-flagged
on-hold bucket.

**Every other file that talks about "stale" or "queue hygiene" in manager
mode (`workload-agent/SKILL.md`, `manager-1on1-prep/SKILL.md`,
`designer-onboarding/references/onboarding-workload-scope.md`) points back
here instead of restating the number** — if the threshold ever needs to
change (a team decides 7 days is too aggressive, or too lax), this is the
only line to edit.
