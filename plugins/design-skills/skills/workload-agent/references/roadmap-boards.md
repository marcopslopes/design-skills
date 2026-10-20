# Known roadmap boards

Many companies run initiative intake somewhere other than the everyday
tracker: **Jira Product Discovery** projects (`Idea` / `Opportunity` /
`Solution` / `Experiment`), **Linear** projects and initiatives, a **Notion**
roadmap database, or **GitHub Projects** boards. `research-agent`'s default
tracker search only hits the containers mentioned in the prompt or found by
free-text search — it will **not** surface sibling teams' roadmap boards
unless it knows to look. This file is the technique for finding and using
that map.

Which roadmap tool the team uses comes from `references/shared/work-tools.md`
§ Roadmap. If the team has none, **skip the roadmap leg and say so**.

**The board list itself lives in the org pack**, not here:
`COMPANY-SOURCES.md` § Roadmap boards (resolved per `harness/ORCHESTRATOR.md`
§0a). Read it first. If that section is missing or older than ~1 quarter,
rebuild it with "Refresh technique" below — teams create/retire boards
without notice.

---

## Board list shape (example — Northline pack, Jira Product Discovery)

| Project | Key | Ideas view |
|---|---|---|
| Core Product | `CORE` | `/jira/polaris/projects/CORE/ideas` |
| Payments Domain | `PAY` | `/jira/polaris/projects/PAY/ideas` |
| Consumer Domain | `CON` | `/jira/polaris/projects/CON/ideas` |
| Provider Growth | `GROW` | `/jira/polaris/projects/GROW/ideas` |
| Tech Initiatives | `TECH` | `/jira/polaris/projects/TECH/ideas` |
| Consumer Promotions | `PROMO` | `/jira/polaris/projects/PROMO/ideas` |
| Operations - Roadmap | `OPS` | `/jira/polaris/projects/OPS/ideas` |

(Product Discovery URLs still use Atlassian's internal product name,
`polaris`.) On Linear the same list is project or initiative names with
their team; on Notion it's one database URL plus the property that holds the
team; on GitHub it's the Projects board URLs.

Record a **domain orientation** line next to the list (which boards are
provider-side, consumer-side, mixed, or neither — e.g. engineering or
internal ops). In the Northline example: `CORE` and `GROW` are
provider-only, `PAY` is mixed, `CON` and `PROMO` are consumer-only, `TECH`
and `OPS` are neither — don't include them when a request specifically
means "provider teams."

**Item-type and status vocabulary is NOT uniform across boards — verify
per board, don't assume.** Example of what a live check found (Northline
keys, Product Discovery):

| Project | Issue types present | Status vocabulary |
|---|---|---|
| `CORE`, `PAY`, `CON`, `GROW`, `PROMO` | `Idea`, `Opportunity`, `Solution`, `Experiment` | `Wonder → Explore → Plan → Make → Launch & Adjust → Done` (+ `Backlog`, `Abandoned`) |
| `TECH` | `Solution` only — no `Opportunity`/`Idea` hierarchy | Same stage names as above, minus `Launch & Adjust` seen |
| `OPS` | `Idea` only | `Discovery → Ready for delivery → Delivery → Done`, backlog-equivalent is `Parking lot`, not `Backlog` |

The same trap exists everywhere: Linear project statuses, Notion select
options, and GitHub Projects status columns are all team-defined. A filter
hardcoded for one board's vocabulary silently returns **zero** on another —
not because that team has no active work, but because the filter doesn't
match. Always run an unfiltered "most recently updated" spot-check first if
a board returns suspiciously empty, before concluding it's quiet.

## Likely test/sandbox — treat as noise, don't cite as a team's real board

List these in the org pack too, so they're skipped on purpose rather than
rediscovered every run. Typical tells:

| Example name | Why suspect |
|---|---|
| "My first discovery" (any language) | Reads like a personal onboarding test |
| "Pre-built views 10/07/25 19:05" | Timestamped auto-generated name |

---

## Refresh technique (how this list was built — rerun if stale)

| Tool | How to list every roadmap board |
|---|---|
| **Jira Product Discovery** | `getVisibleJiraProjects` with `action: "browse"`, paging `startAt` in steps of `maxResults: 50` until `isLast: true`. Keep projects whose `projectTypeKey` is `product_discovery` (or whose `issueTypes[].iconUrl` contains `POLARIS_ISSUETYPE`). |
| **Linear** | List projects (and initiatives, if the workspace uses them) with their team and status. |
| **Notion** | Search for the roadmap database by name; ask once if there's more than one, and save the URL. |
| **GitHub Projects** | List the organisation's Projects boards and keep the ones used for roadmap planning. |

Then, for any tool:

1. Cross-check each candidate's name for obvious test/placeholder patterns
   (timestamps, "test", non-English personal phrasing) before listing it as
   a real team board.
2. Write the result to `COMPANY-SOURCES.md` § Roadmap boards in the
   resolved org pack, with a "Last verified" date.

## How `research-agent` should use this

When researching a topic that could span multiple product domains
(most quarterly-initiative or cross-team discovery requests), search
**every board in the org pack's Roadmap boards list**, not just the one
implied by the prompt — a related idea may be sitting in `PAY` or `TECH`
while the designer only mentioned `CORE`. Flag in the executive summary if
a relevant idea was found on a board other than the one named in the request.
