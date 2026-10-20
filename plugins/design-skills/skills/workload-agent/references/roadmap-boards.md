# Known Jira Product Discovery boards

Many companies run quarterly initiative intake on **Jira Product Discovery**
(JPD) project boards — `Idea` / `Opportunity` / `Solution` / `Experiment`
issue types — not on regular Jira Software boards. `research-agent`'s
default Jira search only hits the project(s) mentioned in the prompt or
found by free-text search — it will **not** surface sibling teams'
initiative boards unless it knows to look. This file is the technique for
finding and using that map.

**The board list itself lives in the org pack**, not here:
`COMPANY-SOURCES.md` § Roadmap boards (resolved per `harness/ORCHESTRATOR.md`
§0a). Read it first. If that section is missing or older than ~1 quarter,
rebuild it with "Refresh technique" below — teams create/retire these
boards without notice.

JPD URLs still use Atlassian's internal product name:
`https://your-org.atlassian.net/jira/polaris/projects/<KEY>/ideas`.

---

## Board list shape (example — Fernwell pack)

| Project | Key | Ideas view |
|---|---|---|
| Core Product | `CORE` | `/jira/polaris/projects/CORE/ideas` |
| Payments Domain | `PAY` | `/jira/polaris/projects/PAY/ideas` |
| Consumer Domain | `CON` | `/jira/polaris/projects/CON/ideas` |
| Provider Growth | `GROW` | `/jira/polaris/projects/GROW/ideas` |
| Tech Initiatives | `TECH` | `/jira/polaris/projects/TECH/ideas` |
| Consumer Promotions | `PROMO` | `/jira/polaris/projects/PROMO/ideas` |
| Operations - Roadmap | `OPS` | `/jira/polaris/projects/OPS/ideas` |

Record a **domain orientation** line next to the list (which boards are
provider-side, consumer-side, mixed, or neither — e.g. engineering or
internal ops). In the Fernwell example: `CORE` and `GROW` are
provider-only, `PAY` is mixed, `CON` and `PROMO` are consumer-only, `TECH`
and `OPS` are neither — don't include them when a request specifically
means "provider teams."

**Issue-type and status vocabulary is NOT uniform across boards —
verify per-board, don't assume.** Example of what a live check found
(Fernwell keys):

| Project | Issue types present | Status vocabulary |
|---|---|---|
| `CORE`, `PAY`, `CON`, `GROW`, `PROMO` | `Idea`, `Opportunity`, `Solution`, `Experiment` | `Wonder → Explore → Plan → Make → Launch & Adjust → Done` (+ `Backlog`, `Abandoned`) |
| `TECH` | `Solution` only — no `Opportunity`/`Idea` hierarchy | Same stage names as above, minus `Launch & Adjust` seen |
| `OPS` | `Idea` only | `Discovery → Ready for delivery → Delivery → Done`, backlog-equivalent is `Parking lot`, not `Backlog` |

A query hardcoded for `issuetype = Opportunity AND status NOT IN
(Backlog, Done, Abandoned)` silently returns **zero** results on `TECH`
and near-nothing on `OPS` — not because those teams have no active
work, but because the filter doesn't match their vocabulary. Always
run an unfiltered `project = <KEY> ORDER BY updated DESC` spot-check
first if a board returns suspiciously empty, before concluding it's
quiet.

## Likely test/sandbox — treat as noise, don't cite as a team's real board

List these in the org pack too, so they're skipped on purpose rather than
rediscovered every run. Typical tells:

| Example name | Why suspect |
|---|---|
| "My first discovery" (any language) | Reads like a personal onboarding test |
| "Pre-built views 10/07/25 19:05" | Timestamped auto-generated name |

---

## Refresh technique (how this list was built — rerun if stale)

1. Call `getVisibleJiraProjects` (Atlassian MCP) with `action: "browse"`,
   paging through `startAt` in steps of `maxResults: 50` until
   `isLast: true`.
2. For each project, check `issueTypes[].iconUrl` for the substring
   `POLARIS_ISSUETYPE` — that marks a Product Discovery project. (The
   `projectTypeKey` field also reads `product_discovery` for these.)
3. Cross-check each candidate's `name` for obvious test/placeholder
   patterns (timestamps, "test", non-English personal phrasing) before
   listing it as a real team board.
4. Write the result to `COMPANY-SOURCES.md` § Roadmap boards in the
   resolved org pack, with a "Last verified" date.

## How `research-agent` should use this

When researching a topic that could span multiple product domains
(most Q3-initiative or cross-team discovery requests), search Jira
across **every board in the org pack's Roadmap boards list**, not just
the project implied by the prompt — a related idea may be sitting in
`PAY` or `TECH` while the designer only mentioned `CORE`. Flag in the
executive summary if a relevant idea was found on a board other than
the one named in the request.
