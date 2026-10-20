# Report templates

Pick **one**. Infer from the artifact; confirm in one line.

None of these is the case-study arc (problem → options → decision → outcome).
Skip a section when `findings.md` has nothing real for it.

Do **not** use a /100 score, named personas, or “Flagged by: A, C”.

**Effort** (Low / Medium / High) is inferred from the finding type, not an
eng estimate in the folder — say so once in the Top 5 intro.

**Priority** (without persona votes):

| Priority | Rule |
|----------|------|
| **P1** | Major that blocks the primary job on this artifact |
| **P2** | Other Majors, or Minors that are Low effort |
| **P3** | Remaining Minors / Notes |

## Format guardrails

The report should read like a clean Notion doc, not a dashboard.

- **`<article>` body ≤ 500 lines.** If over, cut pattern-gap N/A rows and
  merge duplicate findings — do not drop Top 5 or the walkthrough.
- Skip a whole section when `findings.md` has nothing real for it.
- Lists: at most two nested levels.
- No score gauges, spark lines, persona columns, or emoji on every line.
  Risk/priority uses the shell’s text badges (`P1` / High), not 🔴.
- First look: one short paragraph. Each Top 5 item: Why + Fix + Effort
  only — no extra subsections.
- Tables: walkthrough 4 columns; findings stay labelled prose plus
  Location, not a 10-column grid.

---

## live-page

**When:** capture pack exists (screenshot / a11y tree / verified violations) or the critique was of a live/local URL.

**Article sections (in order):**

1. Title + meta header (date, URL, mode=Live URL, device, captured path)
2. First look
3. Top 5 Priority Fixes — Why / Fix / Effort (compose from Major findings; do not invent a sixth issue)
4. Cognitive walkthrough — one row per **captured** step: Step / Action / Risk / Issue
5. Evidence shots (above-the-fold crops; caption the step)
6. Verified violations (FAIL / PASS / N/A table — copy from findings, do not rescore)
7. Findings — two-layer labels, Major first; add **Location** when the finding names a region
8. Copy findings if `content` ran
9. Design pattern gaps — only patterns the capture actually spoke to; else **Not captured** or **N/A**
10. Priority matrix — every remaining labelled finding, not only the Top 5
11. Asks / open questions
12. Record paths

## figma-or-screenshot

**When:** Figma frames or pasted screenshots. No Playwright pack required.

**Article sections:**

1. Title + meta (mode=Figma or Screenshot, file/frame)
2. First look
3. Top 5 Priority Fixes
4. Screens reviewed table
5. Evidence images
6. Findings (two-layer + Location)
7. Design pattern gaps (design-time only; mark unverified WCAG as such)
8. Priority matrix
9. Asks
10. Record paths

Skip walkthrough unless the ask named a path through frames.

## flow

**When:** the critique is a click path or named journey (search → listing, checkout, onboarding).

**Article sections:**

1. Title + First look (the extra step / broken promise)
2. Meta + path
3. Top 5 Priority Fixes
4. Cognitive walkthrough (required — this template's spine)
5. Per-step evidence
6. Findings that span the path
7. Priority matrix
8. Asks
9. Record paths
