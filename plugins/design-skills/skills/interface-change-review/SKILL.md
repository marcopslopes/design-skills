---
name: interface-change-review
description: >-
  Change-scoped UI craft review of uncommitted work, the current branch, or
  a named commit range — classifies findings as introduced, regression, or
  pre-existing. Triggers on: "review my branch for UI", "interface review
  on this diff", "craft review my uncommitted changes", "design regression
  check on this PR", "review UI changes before I push", "did this branch
  hurt the interface". Does not replace pre-share `audit` (DS/a11y gate).
  Does not review Figma-only work (`ux-pattern` / `figma-ux-audit`). Does
  not invent tokens or run a full six-domain marketplace stack.
---

# Interface change review

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

A diff is not a surface. Review the **UI craft impact of a change** —
what was introduced, what regressed, what was already broken — then stop.
Share readiness still belongs to `audit`.

**Invoke in Cursor:** "review my branch for UI craft", "interface review
on uncommitted changes", "design regression check before I push"

Change-scoped review, house Foundations only.

---

## Scope boundary

| Skill | Job |
|-------|-----|
| **`interface-change-review`** (this) | Git-scoped craft review + introduced/regression/pre-existing |
| **`audit`** | Pre-share DS + a11y **blocking** gate on touched Design Harness files |
| **`ux-pattern` / `figma-ux-audit`** | Design critique / canvas — not git diffs |
| **`taste-feedback` / `motion-choreography` / `responsive-patterns`** | Domain craft rules this review **uses**, does not replace |

- **Fires on:** Design Harness / `src/` / CSS changes with a resolvable git scope.
- **Does not fire on:** empty diff; Figma-only; competitor URLs; "is this
  ready to share" (that's `audit`).
- Never modifies product source. Report only.

---

## Step 0 — Mode

| Mode | Cap | Depth |
|------|-----|-------|
| **quick** (default) | 5 findings | Primary path + HIGH/MEDIUM craft only |
| **full** | 10 findings | Broader surfaces reached by the change |

Parse `quick` / `full` if said; else default `quick`.

---

## Step 1 — Resolve the change scope

With no target, resolve in order and stop at the first match:

1. Branch ahead of merge-base with `main` (or `master`) **plus** dirty
   working tree — state commit count and uncommitted file count separately.
2. Dirty working tree only.
3. **No change** — clean tree, nothing ahead of the merge-base. **Stop
   and ask** (AskQuestion if available): last commit (`HEAD~1..HEAD`,
   named by short SHA + subject), a target they name (PR / branch /
   range), or a whole-surface `audit` / design-critique. **Never** fall
   back to `HEAD~1..HEAD` on your own — that is often a merge or someone
   else's work, and the report is indistinguishable from what they meant.
   If `gh` shows an open PR on this branch, offer that first.

Accept explicit targets: "uncommitted", "this branch", "vs main", a PR
number. For a PR: `git fetch` the ref and review **in place**. Never
`gh pr checkout`, `git checkout`, `git switch`, or `git stash` — those
rewrite the files the designer has open.

**Exclude:** lockfiles, generated output, snapshots, vendored, binaries —
name exclusions. If nothing UI-relevant remains after exclusions, say so
and ask the same way as step 3 — do not report `Approve` on an empty
scope.

Run `git` commands to list changed paths; do not invent the file list.

---

## Step 2 — Expand to surfaces

A changed file is evidence, not the whole subject.

- Default: one hop — direct importers / pages that render the primitive.
- Second hop only for tokens, `ds` primitives, shared Design Harness chrome.
- Cap consumer expansion at **5** surfaces; state what you skipped.

Prefer `src/design-harness/**`, `context/design-system/**`, related CSS.

---

## Step 3 — Review craft (Foundations-bound)

Walk affected surfaces for **UI craft** using rules already in:

- `taste-feedback` craft lines (polish, grouping, type light checks)
- `responsive-patterns` narrow/layout craft (if width/zoom in scope)
- `motion-choreography` restraint (if motion touched)
- `content` only for copy clearly introduced in the diff (optional)

**Do not** re-run full `audit` Checks 1–5 here. If you spot a likely
**blocking** DS/a11y issue in changed code, flag it as
`[Escalation → audit/accessibility]` and keep going — don't pretend this
skill is the share gate.

For each finding, try to **falsify** against Foundations / `ds` / the
diff. Prefer no finding to an unsupported one.

### Incomplete vs. stated intent

Read the PR title/body, linked ticket, or commit subjects. Flag when the
**interface** does not deliver what they claim — this is the incomplete
change a surface review misses because the state is absent:

- A new variant, size, or token applied to some states but not hover /
  focus / active / disabled / loading / selected
- A new user-facing string with no entry in the translation catalogue
  the project actually maintains
- A new component with no empty, loading, error, disabled, or
  narrow-width treatment
- A control added to one surface but not to siblings that already carry
  its peers

Do **not** report scope creep (whether the change does too much).

---

## Step 4 — Classify every finding

| Status | Meaning |
|--------|---------|
| **Introduced** | New craft problem created by this change |
| **Regression** | Was better on the base side of the diff; worse now |
| **Pre-existing** | Still true on the base; change didn't create it |

Read both sides of the hunk when classifying. Removals matter (deleted
focus style, removed spacing, stripped label). A removal is a
**Regression** only when nothing in the change replaces it — otherwise
it is not a finding.

Status by what the **diff touched**, not by which file it sits in: a
line the change never touched is **Pre-existing** even three lines from
a hunk. Confirm with `git blame` against the base ref when it matters.

Order: Introduced → Regression, then a separate **Pre-existing** section
(at most **three**, highest severity first). Caps count **Introduced +
Regression only**. Pre-existing sits outside the cap and outside the
verdict — touching a legacy file is not a full-file audit, and a change
whose only findings are pre-existing is craft-safe to keep iterating.

Consolidate repeated systemic issues into one row with multiple
locations.

---

## Output format

```markdown
## Interface change review — [quick|full] — YYYY-MM-DD

**Scope:** [uncommitted / branch…main / …]
**Files (UI-relevant):** …
**Surfaces reviewed:** …
**Excluded:** …

### Findings
| # | Status | Severity | Location | Problem | Evidence | Suggested fix (Foundations) |
|---|---|---|---|---|---|---|

Status here is **Introduced** or **Regression** only. If none, write
"No actionable interface findings in this change."

### Pre-existing (not this change)
| Severity | Location | Issue |
|---|---|---|
(At most three. Omit the section when there are none.)

### Considered but rejected
| Location | Candidate | Rejected because |
|---|---|---|
(1–3 real candidates in `quick`, 2–5 in `full` — not filler. Omit only
when the scope genuinely had none.)

### Escalations (blocking suspects)
- … → run `audit` / `accessibility`

### Verdict
[One paragraph on **Introduced / Regression** only: is the change
craft-safe to keep iterating, or should share wait on `audit` + those
fixes?]
```

Severity: **HIGH** (misleading / unusable craft), **MEDIUM** (noticeable),
**LOW** (polish). Caps count Introduced + Regression only. Omit LOW in
`quick` mode.

Persist optional dated note to `projects/<slug>/log.md` or `findings.md`
when a task slug is clear — default chat-only.

---

## Never do this

- Never claim `audit` PASS/BLOCKED from this skill alone
- Never expand into a whole-repo polish wishlist outside the change
- Never invent off-token "premium" fixes
- Never skip Status classification
- Never query private Slack or invent product intent
- Never fall back to `HEAD~1..HEAD` when there is no change
- Never check out a PR / stash / switch branches to review — fetch only
- Never mutate the working tree

---

## Related files

| File | Role |
|------|------|
| `../audit/SKILL.md` | Pre-share gate after this review |
| `../taste-feedback/SKILL.md` | Craft rules reused here |
| `../responsive-patterns/SKILL.md` | Narrow/layout craft |
| `../ux-pattern/SKILL.md` | Non-git design critique |
| `docs/HOWTO-INTERFACE-CHANGE-REVIEW.md` | Designer guide |