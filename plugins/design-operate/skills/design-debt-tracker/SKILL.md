---
name: design-debt-tracker
description: >-
  Standalone triage and review of the per-project design debt register
  (`projects/<slug>/debt.md`). Triggers on: "show me the design debt",
  "what did we defer", "triage the debt register", "escalate this debt",
  "what open advisories do we still owe", "clean up debt.md". Owns review /
  escalate / resolve flows. Does not replace the fix-or-log AskQuestion that
  `audit` / design-critique already run via
  `references/shared/project-debt-register.md` — that protocol still writes
  rows; this skill reads and manages them. Never routes project critique
  debt into `KNOWN-ISSUES.md` (DS structural only).
---

# Design debt tracker

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Makes deferred critique/audit advisories visible across iterations — every
"fix if time allows" stays a tracked promise instead of disappearing into
chat history.

**Invoke in Cursor:** "show me the design debt", "what did we defer on
[project]", "triage debt.md"

---

## Scope boundary

- **Fires on:** reviewing, triaging, escalating, or resolving rows in an
  existing (or just-created) `projects/<slug>/debt.md`.
- **Does not fire on:** the post-`audit` / post-critique **fix-or-log**
  prompt itself — that stays inside `audit` / `ux-pattern` / `content` via
  `references/shared/project-debt-register.md`. This skill is the
  *standalone* follow-up.
- **Does not fire on:** DS / harness structural debt → `KNOWN-ISSUES.md`
  + `design-system` skill.
- **Composes with:** `roadmap-prioritization` (debt items can become
  backlog candidates once named), `audit` / design-critique (writers of
  rows).

---

## File of record

| File | Role |
|------|------|
| `projects/<slug>/debt.md` | Living register — committed, shared via GitHub |
| `projects/_template/debt.md` | Starter when the first row is logged |
| `references/shared/project-debt-register.md` | Column / status / AskQuestion contract |

If `debt.md` is missing and the designer asks to triage, say so plainly and
offer to create it from the template (empty register) or to pull open
advisories from the latest `findings.md` audit/critique block.

---

## Modes

### 1. Review (default)

Read `debt.md`. Report:

```markdown
## Design debt — [slug]

_Items: N | Open: N | Oldest open: YYYY-MM-DD_

| ID | Severity | Finding (short) | Who's affected | Status | Age |
|---|---|---|---|---|---|
| DD-00N | Minor | … | … | Open | Nd |

**Suggested next:** [1–3 Open items worth picking up now, with why]
**Accepted (conscious skip):** [IDs + one-line rationale each]
**Escalated:** [IDs needing PM/design-lead attention]
```

### 2. Capture (from findings, when asked)

When the designer points at a past critique/audit in `findings.md` and
says "log these as debt," append complete rows per
`project-debt-register.md` (all columns, sequential `DD-NNN`). Never invent
findings that aren't in the source.

### 3. Resolve / Accept / Escalate

On explicit ask ("mark DD-003 resolved", "accept DD-004 — one-time setup"):

| Status | Requires |
|--------|----------|
| **Resolved** | What fixed it (commit, PR, or session note) |
| **Accepted** | Explicit designer acknowledgement + one-line rationale |
| **Escalated** | Why it outgrew Minor/Note (accumulated evidence, new persona impact, ship date) |

Update the row in place; never delete history.

### 4. Aged-debt nudge

If any **Open** row is older than **14 days**, surface it at the top of
Review with an honest "this promise is aging" line. Accessibility-sourced
rows (`Source: audit` with `[A11Y-*]` / a11y-framed finding) need explicit
acknowledgement before **Accepted** — never quiet-accept a11y debt.

---

## Persist / log

- Edits go only to `projects/<slug>/debt.md` (and a one-line note in
  `log.md` when status changes).
- Routing line in `harness/logs/routing-log.md` + task `log.md`.

---

## Never do this

- Never move project critique debt into `KNOWN-ISSUES.md`
- Never auto-Accept without the designer saying so
- Never invent Who's affected / Suggested fix when the source finding
  didn't name them — leave the cell honest ("unspecified in source")
- Never delete Resolved/Accepted rows

---

## Related files

| File | Role |
|------|------|
| `references/shared/project-debt-register.md` | Format + fix-or-log AskQuestion |
| `../audit/SKILL.md` Step 3.25 | Writes rows after PASS |
| `../ux-pattern/SKILL.md` | Writes rows after design-critique |
| `../roadmap-prioritization/SKILL.md` | Can rank named debt items as backlog |
| `docs/HOWTO-DESIGN-DEBT-TRACKER.md` | Designer guide |
