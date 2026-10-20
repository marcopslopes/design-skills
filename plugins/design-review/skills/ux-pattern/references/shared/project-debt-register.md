# Project debt register (`projects/<slug>/debt.md`)

**Scope:** Per-project advisories from **`audit`** and **design-critique** (`ux-pattern` ± `content`) that are **not fixed in the current pass**.

**Not this file:** Repo / harness / DS structural debt → **`KNOWN-ISSUES.md`** only. Never route critique advisories there.

---

## When to write

After **`audit` PASS** with open advisories (Checks 3–5), or after **design-critique** completes with open labelled findings — **ask once** (see below). Do not auto-append rows without the designer's choice.

**BLOCKING semantics unchanged.** `[DS-*]` / `[A11Y-*]` blockers must be fixed before PASS. Major / Minor / Note apply **only** to advisories.

---

## Fix-or-log prompt (required once per run with open advisories)

Use Cursor **`AskQuestion`** when available (`references/shared/ask-question-ui.md`). Do **not** declare an explicit `"Other…"` option — the tool adds its own.

| `title` | Open advisories |
|---|---|
| `prompt` | These advisories aren't blocking. Fix now, log to the project debt register, or mark not worth tracking? |
| Options | **Fix now** (`fix_now`) · **Log to debt register** (`log_debt`) · **Not worth tracking** (`accept_not_tracking`) |

- **fix_now** — address in the same session; only register if still deferred after the fix attempt.
- **log_debt** — append one row per deferred advisory to `projects/<slug>/debt.md` (all columns filled).
- **accept_not_tracking** — one **`Accepted`** row per item with a one-line rationale in **Finding** or a short note after the table; do not silently drop from `findings.md` without this.

If `AskQuestion` is absent: plain-text degrade per `references/shared/ask-question-ui.md` (same three options) — do not guess fix vs log; do not tell the designer to switch models.

---

## File format

Create `debt.md` from `projects/_template/debt.md` when the first row is logged. **Committed** (shared via GitHub), unlike `designer-profile.local.md`.

### Advisory severity (advisories only)

| Tag | Use when |
|---|---|
| **Major** | Significantly degrades experience; should fix before external handoff if possible |
| **Minor** | Real issue; safe to defer with tracking |
| **Note** | Observation or future polish; low urgency |

Keep two-layer labels in **Finding**: `[House: …]` / `[UX Heuristic: …]` plus the severity tag.

### Status

| Status | Meaning |
|---|---|
| **Open** | Deferred; promise to revisit |
| **Resolved** | Fixed later — keep row, update status |
| **Accepted** | Consciously not fixing — requires explicit designer acknowledgement |
| **Escalated** | Was Minor/Note; now needs PM/design lead decision |

### ID

Sequential per project: `DD-001`, `DD-002`, … never reuse.

---

## Table columns

| ID | Date | Source | Severity | Finding | Who's affected | Suggested fix | Status |

- **Source:** `audit` | `ux-pattern` | `content` | `figma-ux-audit` (if advisories only)
- **Who's affected:** provider archetype, persona, or user group — specific, not "users"

---

## Integration

| Skill | Action |
|---|---|
| `../audit/SKILL.md` | Step 3.25 on PASS + open advisories |
| `SKILL.md` | After critique output appended to `findings.md` |
| `../content/SKILL.md` | Same when chained in design-critique |
| `../design-debt-tracker/SKILL.md` | **Standalone** review / triage / escalate / resolve of `debt.md` — "show me the design debt", aged-debt nudge. Does not replace the fix-or-log AskQuestion above. |
| `harness/docs/critique-system.md` | Scope distinction vs `KNOWN-ISSUES.md` |
| `docs/HOWTO-DESIGN-DEBT-TRACKER.md` | Designer-facing guide for the standalone skill |
