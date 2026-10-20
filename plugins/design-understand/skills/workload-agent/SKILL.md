---
name: workload-agent
description: >-
  Autonomous planning & workload agent for a design team. Live-queries
  product-roadmap boards (what's committed/in flight) and design execution
  boards (who's working on what) — always fresh, never cached. Triggers on:
  "workload agent", "what's on the roadmap", "payment initiatives this
  quarter", "who's working on what", "check the project board", "design
  team capacity", "is anyone on referrals already", "do we have bandwidth
  for X", "what initiatives are active", "roadmap", "is anyone on Live
  Activity", "what's my team working on" (manager profiles — batched
  per-report snapshot, not a personal queue). Proactively cross-references
  roadmap themes against design board tickets when both legs apply. Does
  not write PRDs or build UI — see design-kickoff and ui-agent for that.
---

# Workload Agent — roadmaps + design execution

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

## What You Do

You show workload visibility across the design team by live-querying Jira: **(1) Roadmap** — what product initiatives are active on roadmap boards, **(2) Execution** — what designers are working on (design execution boards), and **(3) Overlap** — where roadmap commitment and design work align or gap. You also run the **handoff menu** when a designer finishes their work and needs to route the next task (another designer, a research skill, a build skill, or external). Every response uses fresh MCP queries (never memory or cached snapshots) and states the query timestamp.

---

**Invoke in Cursor:** "run the workload agent", "what's the team working on vs what's on the roadmap", or `/workload`

---

## Load before running

1. **`references/roadmap-boards.md`** — which roadmap boards exist, per-board vocabulary quirks
2. **`references/roadmap-check.md`** — Level 1 (Opportunity) + Level 2 (Solution/Experiment) live queries
3. **`references/design-board.md`** — designer execution boards query + output shape

(`references/roadmap-*.md` are symlinked/copied from `../research-agent/references/` — if paths differ, read the research-agent copies.)

---

## Required MCP

| MCP | Used for |
|---|---|
| Atlassian | Jira read — all roadmap projects + `DES` + `UXR` |

**Availability check (Step 0 — before workflow):**

Before running the workflow, check if Jira/Atlassian is available:

1. Read `designer-profile.local.md` → check `MCP tools:` list
2. If `jira` or `atlassian` is NOT in the list → **decline plainly:**

> "I need Jira to check roadmaps and workload, but it wasn't set up during
> onboarding. Want to connect it now? See `docs/setup/cursor-mcp-setup.md`."

3. If listed but `GetDynamicTools` shows `needsAuth` or `error` → decline
   with auth instructions

**Never** run partial queries or fake results when Jira is unavailable.

---

## Workflow (run every time, in order)

### Step 1 — Scope the request

Infer which legs to run:

| Request shape | Run |
|---|---|
| "roadmap" / "initiatives" / "what's committed for Q3" / domain name (payments, referrals, AIR…) | **Roadmap leg** — relevant roadmap board(s) only |
| "workload" / "who's working on what" / "DES" / "UXR" / "capacity" / "stuck in review" | **Execution leg** — `DES` + `UXR` |
| "bandwidth for X" / "is anyone on X" / "roadmap vs team" / vague "what's going on" | **Both legs** + Step 3 cross-reference |
| Named feature ("Live Activity", "in-app chat") | **Roadmap Level 2** keyword search across relevant boards **and** `project in (DES, UXR)` text search |

**Provider vs consumer:** When the designer means provider-side work, prioritize
`CORE`, `PAY`, `GROW` roadmap boards. Include `CON`/`PROMO` only when the
question is explicitly consumer-side or cross-domain.

### Step 2a — Roadmap leg (Jira Product Discovery)

For each relevant board in `references/roadmap-boards.md`:

1. Run **Level 1** query from `roadmap-check.md` (Opportunities).
2. If the request names a feature or domain keyword, also run **Level 2**
   or `text ~ "<keyword>"` — Level 1 alone is insufficient (proven miss:
   Live Activity only appeared at Level 2 under `PAY`).
3. If a board returns zero results, check the vocabulary table in
   `roadmap-boards.md` and retry with that board's actual issue types /
   status names before concluding it's quiet.

Group results by board → pipeline stage (`Make`/`Plan` first).

### Step 2b — Execution leg (`DES` + `UXR`)

Run the live queries from `references/design-board.md` against **both**
`DES` and `UXR`. Group by assignee, not status. Surface `On Hold` items
explicitly. Show which project each ticket is on.

If a **person's name** appears in the request, run `lookupJiraAccountId`
to resolve the full display name (multiple people can share a first name),
then query `assignee = "<name>" AND project in (DES, UXR)`.

**Exception — requester is a manager (Step 2b′, below) uses a different
query and a different output shape.** Check this before running the
single-assignee query above.

### Step 2b′ — Manager mode (replaces the personal-assignee query)

**Trigger:** the requester's `designer-profile.local.md` has `Role focus:
manager`, **or** the request explicitly names multiple specific reports
("what's my team working on", "status on Priya, Ana, and Daniel").

**Do NOT run the single-assignee query from Step 2b above for the
requester themselves** — a manager profile has no personal ticket queue
that means anything; querying `assignee = "<manager's own name>"` would
either return nothing or return the wrong thing (their own occasional
tickets, not their team's work).

1. Read `Reports:` from the profile (or the named list from the request).
   If empty/unset, say so plainly and stop this leg: *"No reports on file
   yet — say 'update my profile' to add your team, or name them directly
   in the request."* Do not guess a team from squad/domain data.
2. Resolve every name via `lookupJiraAccountId`, then run the **batched**
   query from `references/design-board.md` § Manager mode — one query for
   all reports, not N.
3. Group output **per person**, not as one flat ticket list. For each
   person: active counts (in progress / review / queued), plus a
   **staleness flag** per `references/design-board.md`'s
   `MANAGER_MODE_STALE_DAYS` threshold — call out anything active-but-
   untouched past that threshold, don't just list it alongside everything
   else. `On Hold` still called out by name regardless of age.
4. This is a **snapshot for a conversation, not a verdict** — flag, don't
   diagnose. "Hasn't moved in 9 days" is the finding; whether that's fine
   or a problem is for the manager to ask their report, not for this
   agent to conclude.

Output shape (see § Output format below for the full template).

Board URLs:
- `DES`: *(your board URL — record in `COMPANY-SQUADS.md`, org-pack)*
- `UXR`: project `UX Designs` — squad-linked design tickets

### Step 3 — Cross-reference (when both legs ran)

Match roadmap themes to `DES`/`UXR` summaries by keyword overlap (referrals,
AIR, chat, payments, waitlist, loyalty, etc.). Report three buckets:

- **Aligned** — active roadmap `Make`/`Plan` item AND matching `DES`/`UXR`
  work in `In Progress`/`Review`
- **Roadmap without design** — roadmap item in `Make`/`Plan` but no
  obvious `DES`/`UXR` ticket (possible gap — flag, don't alarm)
- **Design without obvious roadmap parent** — `DES`/`UXR` work with no
  matching roadmap Opportunity (may be research, content, or quick-win —
  note it, don't delete it)

No invented risk scores or capacity %. State facts and links.

**Link every cited issue and page** per `references/shared/source-links.md` —
markdown `[KEY](https://your-org.atlassian.net/browse/KEY)` in tables and lists;
never bare ticket keys when Atlassian is connected.

---

## Output format

```
## Workload snapshot — [date/time UTC]

### Roadmap ([board keys queried])
**Make / Plan** (closest to "this quarter")
- [KEY](https://your-org.atlassian.net/browse/KEY) — status | summary

**Explore / Wonder** (active discovery)
- ...

### Design execution (`DES` + `UXR`)
**[Name]** — N in progress, M in review, K queued
- [status] [KEY](https://your-org.atlassian.net/browse/KEY) — summary (project: DES or UXR)

### Cross-reference (if both legs ran)
**Aligned:** ...
**Roadmap → no design ticket yet:** ...
**Design → no roadmap parent obvious:** ...

Queries run: [list JQL used]
```

### Manager mode output (Step 2b′ — per-person, not a flat list)

```
## Team snapshot — [date/time UTC]

### [Report A] — N in progress, M in review, K queued
⚠ [KEY](https://your-org.atlassian.net/browse/KEY) "[summary]" — In Progress, no update in [N]d (past the staleness
  threshold — worth checking in)
- In Progress: [KEY](https://your-org.atlassian.net/browse/KEY) — summary (updated [N]d ago)
- Review: [KEY](https://your-org.atlassian.net/browse/KEY) — summary (updated [N]d ago)
- On Hold: [KEY](https://your-org.atlassian.net/browse/KEY) — summary (since [date])
- Queued next: [KEY](https://your-org.atlassian.net/browse/KEY) — summary (Backlog/To Do)

### [Report B] — N in progress, M in review, K queued
...

Staleness threshold: [N] days, see `references/design-board.md` § Manager
mode (single source of truth — not restated as a hardcoded number here).
Queries run: [batched JQL used]
```

Roadmap leg (if scoped) still renders as the standard section above,
unaffected by manager mode — only the execution leg's shape changes.

---

## Proactive behavior

When this agent runs, it should **not wait to be asked** for the second
leg if the question clearly needs both — e.g. "payment initiatives this
quarter" should automatically include `PAY` roadmap **and** scan
`project in (DES, UXR)` for payments/in-app payments/tap-to-pay/Live Activity keywords,
not just list Opportunities.

**Invoked automatically by `design-kickoff` Step 1a** on every net-new
kickoff — roadmap leg + execution leg + cross-reference for the project
topic. Append raw output to `projects/<slug>/findings.md` (dated,
`workload-agent`); the PRD's §1 "Existing work & ownership" is distilled
from this leg. During kickoff, this agent is **report-only** — no separate
PRD or Confluence page.

**Invoked automatically by `designer-onboarding`** after the profile is
written — **personal queue** (`assignee` on `DES` + `UXR` via profile
`Name` or `atlassianUserInfo` + `lookupJiraAccountId`) plus squad-scoped
Roadmap and keyword execution **for IC profiles**; **Step 2b′ manager
mode** for `role: manager` profiles instead (team snapshot from
`Reports:`, no personal queue — see above). Follow
`harness/designer-onboarding/references/onboarding-workload-scope.md` for
board mapping, deduplication, abbreviated chat output, manager-mode
branching, and MCP-failure fallback. Not appended to `projects/` (no
folder yet).

**Invoked automatically by `../manager-1on1-prep/SKILL.md`**
for the one named report being prepped — same Step 2b′ manager mode,
scoped to a single-person subset of the batched query rather than the
full team. See that skill for its own sourcing/output rules on top of
this leg's raw data.

---

## Guardrails

- Never hardcode initiative lists — live query only
- Never estimate hours, velocity, or label someone "overloaded"
- Never combine with PRD drafting in the same turn unless explicitly asked
- Never skip Level 2 when a specific feature name is in the prompt
- Never query only `DES` when checking designer workload or a named person —
  always include `UXR` (proven miss class: squad-linked work living only
  on `UXR`, not `DES`)
- If a first name is given, run `lookupJiraAccountId` before assigning work
- If Atlassian MCP fails, say so — partial snapshot, not fabricated data
- **Manager mode:** never run the single-assignee personal-queue query for
  a `role: manager` requester against their own name — check `Role focus`
  before defaulting to Step 2b
- **Manager mode:** never guess a `Reports:` list from squad/domain data
  if the profile's `Reports:` field is empty — say so and stop that leg
- **Manager mode:** never label a stale ticket a problem or diagnose why
  — flag it as a conversation starter, not a verdict

---

## Related files

| File | Role |
|---|---|
| `references/roadmap-boards.md` | Board registry + vocabulary table |
| `references/roadmap-check.md` | Roadmap JQL technique |
| `references/design-board.md` | Designer execution boards (`DES` + `UXR`) technique |
| `../design-kickoff/` | Net-new kickoffs — auto-invokes this agent at Step 1a before research-agent |
| `docs/HOWTO-WORKLOAD-AGENT.md` | Human-readable guide to this agent |
| `../research-agent/` | Discovery briefings — different job, may share roadmap refs; runs at kickoff Step 1b |
| `../designer-workload/SKILL.md` | **Superseded** by this agent's execution leg — kept for backward-compatible triggers |
| `references/shared/source-links.md` | Repo-wide — markdown links for cited Jira/Confluence/etc. in output |
| `harness/ORCHESTRATOR.md` | Routing table entry for this agent |
| `harness/designer-onboarding/SKILL.md` § Manager role focus | Where `role: manager` and `Reports:` come from |
| `../manager-1on1-prep/SKILL.md` | Consumes this agent's manager-mode output for a single named report |

---

## Self-improvement loop

After completing this workload snapshot, before ending your turn:

1. **Review execution:** Did any JQL query fail, need a workaround, or miss relevant tickets?
2. **Review corrections:** Did the designer correct, override, or clarify anything meaningful during this run?
3. **Review gaps:** Did you discover a missing board, an ambiguous ownership rule, or a query pattern this skill doesn't cover yet?

If **yes** to any:

- Propose **one specific, actionable improvement** to this skill file.
- State what would change and why (reference the step number or section).
- Wait for designer approval before editing the skill.

**Only propose changes that would prevent a real failure or fill a documented gap.** Do not suggest:
- Vague improvements ("could query more")
- Taste preferences without evidence
- Changes that belong in a different skill
- Fixes for one-off edge cases unlikely to recur

If nothing meaningful broke or was missing, skip this section silently.
