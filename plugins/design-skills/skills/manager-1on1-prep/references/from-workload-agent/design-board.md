# Designer execution boards (`DES` + `UXR`)

Design team work is split across **two** Jira Software projects — checking
only one will miss real assignments. Proven miss (example): a designer's
work on one squad's feature area lived on `UXR`, not `DES` — always check
both, don't assume by squad.

*(`DES` / `UXR` are this harness's own worked-example project keys —
replace with your org's real design-team Jira project key(s), recorded in
`COMPANY-SQUADS.md` org-pack, once you know them. Board URL and roster
below are illustrative — resolve your own via live Jira query, never
hardcode a real name/board list here.)*

| Project | Key | Board (known) | Who tends to use it |
|---|---|---|---|
| Design | `DES` | *(your board URL — record in `COMPANY-SQUADS.md`)* | Most designers |
| UX Designs | `UXR` | (legacy/squad-linked board) | Payments-squad designers, financial-services squads |

**Last verified:** 2026-07-14

---

## Shared facts

- **Issue types:** `UX task` (majority), `Story`, `Epic`, `Task`, `Bug`, `Copy`, `Sub-task`, `UX`
- **`DES` statuses:** `Backlog`, `To Do`, `In Progress`, `Review`, `Done`, `On Hold`, `Canceled`
- **`UXR` statuses:** same family, plus `Closed` as done-equivalent — treat `Closed` like `Done` when filtering active work

## Live query — run **both** projects

**DES:**

```
project = DES AND status NOT IN (Done, Canceled)
ORDER BY assignee ASC, status ASC
```

**UXR:**

```
project = UXR AND status NOT IN (Done, Closed, Canceled)
ORDER BY assignee ASC, status ASC
```

**When a person is named**, resolve the full display name via
`lookupJiraAccountId` first — duplicate first names happen — then query
**both** projects:

```
assignee = "<Full Display Name>" AND project in (DES, UXR) AND status NOT IN (Done, Closed, Canceled)
ORDER BY updated DESC
```

**Keyword / feature search** (e.g. "Live Activity") — search **both**:

```
project in (DES, UXR) AND status NOT IN (Done, Closed, Canceled) AND text ~ "<keyword>"
ORDER BY updated DESC
```

Fields: `assignee`, `status`, `summary`, `updated`, `project`

## Reporting rules

- Group by **assignee**, not status
- Count `In Progress` + `Review` separately from `Backlog`/`To Do`
- Call out `On Hold` by name
- When results span `DES` and `UXR`, show which project each ticket is on
- **Link every issue key** in chat/table output:
  `[PROJ-151](https://your-org.atlassian.net/browse/PROJ-151)` — see
  `references/shared/source-links.md`
- **Also check** the latest DT1 weekly stand-up (`Confluence` space `DT1`,
  title pattern `*Weekly Stand-up*`) when Jira returns zero but a designer
  name is expected — some work is logged in standups before (or instead of)
  a ticket. Cite the standup page + date; don't treat it as a substitute
  for a ticket when one exists on `UXR`.

## Designer roster hint (not exhaustive — verify in Jira)

Do not hardcode real names/squads here — resolve live via Jira and
`COMPANY-SQUADS.md` (org-pack). This section intentionally stays empty in
the public harness.

---

## Manager mode — multiple reports (batched query)

Used by `workload-agent` § Manager mode and `./`
when the requester's profile has `role: manager` (or the request names
several specific reports directly). Batches all reports into **one**
query instead of N — cheaper against the real API and the source of the
"whichever is cheaper" call from the manager-role spec:

```
assignee in ("Name A", "Name B", "Name C") AND project in (DES, UXR)
AND status NOT IN (Done, Closed, Canceled)
ORDER BY assignee ASC, status ASC
```

Resolve every name via `lookupJiraAccountId` first (same duplicate-first-
name caveat as the single-assignee case above), then run the batched
query once. Group the results by assignee in the output — same grouping
rule as the rest of this file, just multiple people in one response
instead of one.

### ⚙️ Staleness threshold (single source of truth — change here, not inline elsewhere)

```
MANAGER_MODE_STALE_DAYS = 7
```

A ticket is **stale** if its `status` is `In Progress` or `Review` **and**
its `updated` field is more than `MANAGER_MODE_STALE_DAYS` days old. `On
Hold` tickets are always called out by name regardless of age (existing
rule, unchanged) — staleness is specifically about active-but-untouched
work, not the already-flagged on-hold bucket.

**Every other file that talks about "stale" or "queue hygiene" in manager
mode (`workload-agent/SKILL.md`, `manager-1on1-prep/SKILL.md`,
`designer-onboarding/references/onboarding-workload-scope.md`) points back
here instead of restating the number** — if the threshold ever needs to
change (a team decides 7 days is too aggressive, or too lax), this is the
only line to edit.
