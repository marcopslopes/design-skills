# Heuristic pass (Check 5b) — advisory only

Compact Nielsen H1–H10 + one-task cognitive walkthrough. Share-gate
semantics unchanged.

**Severity:** Always **ADVISORY** (Major / Minor / Note). Never promotes a
finding to BLOCKING. If the same issue is also a Check 1–2 code failure,
report the blocker under Check 2 and optionally cross-reference here.

**Labels:** Keep `[UX Heuristic: <name>]` — use the heuristic short name
(e.g. Visibility of system status, User control and freedom) so Check 5
and Check 5b share one convention.

---

## When to run

| Context | Rule |
|---------|------|
| **`audit`** | Run Check 5b on every Design Harness pre-share audit **when** a key task can be named (from `brief.md` or an obvious single-purpose screen). If no key task is identifiable, skip with one line: `Check 5b: skipped — no key task in brief / scope`. |
| **design-critique** (`ux-pattern`) | Optional — run when the designer says the flow “feels confusing,” or when First look is primarily a usability/orientation problem (not only archetype/copy). |
| **BLOCKED audit** | Still run 5b if useful; findings stay advisory and do not change PASS/BLOCKED. |

Do **not** pad: if H1–H10 all pass for the scoped task, say so in one line and skip the walkthrough detail.

---

## Step 1 — Name one key task

1. Prefer `projects/<slug>/brief.md` (problem / success / primary task).
2. Else infer from the screen under audit (one sentence: “Provider shares referral link from profile”).
3. If still unclear, ask once (plain text if `AskQuestion` unavailable) — do not invent a multi-task suite.

Only **one** primary task per pass unless the designer explicitly asks for a second.

---

## Step 2 — H1–H10 table (compact)

Evaluate against the built/reviewed artefact. Mark **Pass** / **Fail** / **N/A**.
Only expand Fail rows into advisory findings (and optional Note for borderline).

| # | Heuristic | Verdict | Evidence (one line if Fail) |
|---|-----------|---------|-------------------------------|
| H1 | Visibility of system status | | |
| H2 | Match between system and real world | | |
| H3 | User control and freedom | | |
| H4 | Consistency and standards | | |
| H5 | Error prevention | | |
| H6 | Recognition rather than recall | | |
| H7 | Flexibility and efficiency of use | | |
| H8 | Aesthetic and minimalist design | | |
| H9 | Help users recognise, diagnose, recover from errors | | |
| H10 | Help and documentation | | |

**the company note:** Prefer the company vocabulary under H2 when Check 3 already
covers house terms — avoid duplicating `[COPY-VOCAB]` as a second H2 line
unless the usability angle is distinct (e.g. jargon that blocks the task).

**Callouts (still advisory):** Strong H1 (lost / no status) or H3 (destructive
with no undo/confirm) should appear in **First look** and tag **Major** —
they never flip the audit to BLOCKED by themselves.

---

## Step 2b — Cognitive load (quick checklist)

Keep only the **checkable** bits. Run after
H1–H10 when the surface has choices, forms, or dense chrome; skip with
one line when the scoped artefact is a single-purpose read (e.g. a
static deck slide).

Mark each item **ok** / **fail**. Count fails:

| Fail count | Load |
|------------|------|
| 0–1 | Low |
| 2–3 | Moderate |
| 4+ | High — call out in First look as Major advisory |

Checklist:

1. **Working memory** — at any one decision point, ≤4 visible competing
   choices (primary actions / nav destinations / form paths). 5–7 is a
   mild fail; 8+ is a hard fail.
2. **One job in view** — the first viewport / sheet / modal has one
   primary task, not several equal-weight jobs competing for attention.
3. **Labels before recall** — controls name their action; icons alone
   are not the only way to a core action (same spirit as the company's hidden-
   affordances anti-pattern).
4. **Progress visible** — multi-step flows show where you are and how to
   back out without guessing.
5. **Errors recoverable** — destructive / irreversible actions have a
   confirm or undo path before the user is stuck.
6. **No novelty tax** — standard tasks use familiar the company / platform
   affordances (sheet vs modal, tab vs segmented control); invented
   controls for standard jobs count as a fail.
7. **Scan path** — hierarchy still reads when you squint (primary action
   and title land first; secondary chrome doesn't outrank them).
8. **Density with purpose** — dense layouts are allowed when the task
   needs it (till, calendar); density that adds optional chrome without
   helping the key task is a fail.

Report as one line under Check 5b: `Cognitive load: Low|Moderate|High
(N fails) — [failed item ids if any]`. Findings still use
`[UX Heuristic: …]` (usually H8 / H6 / H3) — do not invent a parallel
label system.

---

## Step 3 — Cognitive walkthrough (one task)

Four questions per step. Stop after the critical path (typically 3–6 steps).
Also glance at one **error/dead-end** path if the UI has dismiss, cancel, or
destructive actions.

```
TASK: [from Step 1]
ARTIFACT: [Design Harness route / Figma / screen]

Step N: [User action]
  - Will try the right effect? yes/no — why
  - Correct action visible? yes/no — why
  - Action matches expectation? yes/no — why
  - Feedback on progress? yes/no — why
  → Finding (if any): [UX Heuristic: …] Major|Minor|Note — …
```

---

## Report shape (under audit / critique)

```markdown
### Check 5b — Heuristic pass (advisory)

**Key task:** [one sentence]

| # | Heuristic | Verdict | Evidence |
|---|-----------|---------|----------|
| H1 | … | Pass / Fail / N/A | … |
| … | | | |

**Walkthrough:** [pass with notes | findings below]

**Cognitive load:** Low|Moderate|High (N fails) — [failed items or "skipped"]

- [UX Heuristic: User control and freedom] Major — …
- [UX Heuristic: Visibility of system status] Minor — …

_Or:_ Check 5b: all applicable heuristics Pass for key task; walkthrough clear; cognitive load Low.
```

Findings from 5b join the same **fix-or-log** debt prompt as other
advisories (`references/shared/project-debt-register.md`) when deferred.

---

## What this is not

- Not a third agent / parallel swarm
- Not a replacement for Check 5 craft judgment (hierarchy, rhythm, polish)
- Not a replacement for Check 2 POUR / markup a11y
- Not a way to argue craft should block share
- Not a replacement for `references/shared/ui-craft-rules.md` — named
  visual-craft findings (focal point, 60–30–10, scan path, type pairing)
  cite that file; they complement H8 / Scan path / Density, and must not
  become a second H1–H10 table
