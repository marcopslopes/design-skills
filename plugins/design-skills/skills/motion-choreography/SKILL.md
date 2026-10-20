---
name: motion-choreography
description: "Specs, reviews, and plans purposeful animation for Design Harness / handoff — with frequency gating and mandatory reduced-motion alternatives. Also lists, scans, and applies the three shipped motions: sheet, menu, and segmented pill. Triggers on: \"motion spec for X\", \"animate this transition\", \"prototype this micro-interaction\", \"reduced motion for this\", \"choreograph the loading state\", \"how should this celebrate completion\", \"review these animations\", \"motion review\", \"what could be animated here\", \"find animation opportunities\", \"audit the motion\", \"improve the animations\", \"motion plan for X\", \"what's it called when [motion feel]\", \"animation vocabulary\", \"list the motions\", \"what motions do we have\", \"scan this for motion\", \"apply the sheet motion\", \"apply the menu\", \"apply the pill\", \"add the right motion here\", \"does the system already animate this\", \"custom motion only if the platform doesn't\"."
---

# Motion choreography

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Motion is communication. Every animation answers a question the user
didn't know they had. If it doesn't answer one — or if they'll see it
all day — cut it.

**Invoke in Cursor:** "motion spec for this", "review these animations",
"what could be animated here?", "audit the motion on this screen",
"what's it called when the sheet grows from the button?",
"list the motions", "scan this for motion", "apply the sheet motion".

**Craft bar:** always load
[`references/motion-standards.md`](references/motion-standards.md) before
speccing, reviewing, or planning. Vocabulary mode loads
[`references/animation-vocabulary.md`](references/animation-vocabulary.md).

---

## Scope boundary

- **Fires on:** designing, reviewing, opportunity-finding, or planning
  motion for a named surface / interaction / codebase slice.
- **Does not fire on:** building the full screen (`ui-agent`), full a11y
  audit (`accessibility` / `audit`), taste density (`taste-feedback`),
  or state matrices without motion (`interaction-design`).
- **the company tone:** clean, modern, confident — high trust, low friction.
  Prefer subtle over playful bounce. Never decorative loops without a
  user control to stop them.

---

## Pick a mode

| Ask shape | Mode |
|-----------|------|
| Spec / choreograph / reduced-motion for a named moment | **1 — Spec** (default) |
| Review / critique existing motion or motion code | **2 — Review** |
| "What could / should be animated?" / make it feel more alive | **3 — Opportunities** |
| Audit motion broadly + prioritized fix plans | **4 — Audit → plan** |
| "What's it called when…" / name this motion feel | **5 — Vocabulary** |
| "List the motions" / "what motions do we have" | **6 — List** |
| "Scan this for motion" / "where should a recipe go" | **7 — Scan** |
| "Apply the sheet / menu / pill" / "add the right motion here" | **8 — Apply** |

Ambiguous → ask once which mode, then proceed. Do not run all eight.

---

## Shared gate (Modes 1–4, and Mode 8 before applying a recipe)

Before proposing or keeping any motion, run **all three**:

### A. Frequency gate

| Frequency | Decision |
|-----------|----------|
| 100+ / day | **No animation** |
| Tens / day | Instant or ≤150ms opacity/color |
| Occasional | Standard UI motion |
| Rare / first-time | Delight budget (still calm) |

Keyboard-initiated → **no animation**, always. Full table + curves in
`references/motion-standards.md`.

### B. Purpose + three questions

Name one valid purpose (Feedback / Spatial consistency / State indication /
Preventing jarring change / Explanation / Delight-at-rare-only).

Plus at least one of: **What changed?** / **Where next?** / **How related?**

Fail either half → cut. Record cuts in the output (especially Mode 3).

### C. Already covered

Before a custom spec, name what already moves:

- A catalog recipe: sheet, menu, or segmented pill
- A platform transition: push, sheet presentation, a system control

When that covers the purpose, use it. Custom motion fills the gap it
does not cover. Say which gap. In Mode 8, apply the matching recipe.

---

## Mode 1 — Spec (default)

Write a contract `ui-agent` (or eng) can implement.

1. Run the shared gate.
2. Pull durations / easing / physicality from `motion-standards.md`.
3. Always include a reduced-motion line.
4. Output:

```markdown
## Motion spec — [surface / interaction]

**Frequency:** [tier] → [implication]
**Purpose:** [named purpose + which of the three questions]
**Already covered:** [catalog recipe or platform motion, or the gap custom motion fills]
**Trigger:** [user action or system event]
**Interruption:** [cancel / reverse / queue, or none and why]
**Standard:**
- Property / from → to
- Duration / easing (exact curve when CSS)
- Origin / stagger (if any)
**Reduced motion:** [alternative]
**Out of scope / cut:** [rejected decorative ideas + gate reason]
```

Append to `projects/<slug>/findings.md` (or `decisions.md` if choosing
between motion directions). Hand implementation to `ui-agent` — do not
freestyle CSS motion outside `ORCHESTRATOR.md` §7 / DS tokens.

---

## Mode 2 — Review

Bias toward **flagging**; approval is earned. Diff, prototype, or named
files — stay on motion; decline general code review.

1. Load `motion-standards.md` escalation triggers.
2. Cite `file:line` (or clear UI locus) when possible.
3. Output **exactly** this shape — a real markdown table, not a Before:/After: list:

```markdown
## Motion review — [surface]

| Before | After | Why |
|--------|-------|-----|
| `…` | `…` | … |

### Verdict
1. **Feel-breaking** — …
2. **Missed simplifications** — …
3. **Performance** — …
4. **Interruptibility & timing** — …
5. **Origin / physicality / cohesion** — …
6. **Accessibility** — …

**Decision:** Block | Approve
```

Omit empty verdict tiers. **Block** on: keyboard/high-frequency motion,
`ease-in` on UI enter, `scale(0)`, feel-breaking regressions, easy GPU
fixes ignored. Remedial order: delete → reduce → fix easing → origin →
interruptible → GPU → polish (see standards).

Persist table + decision to `findings.md` when a task folder is in play.

---

## Mode 3 — Opportunities

Restraint-first: a short high-conviction list beats a wishlist. Cap
**5–7** suggestions for a whole app (fewer for one view), ordered by
leverage.

1. Recon personality + frequency map (provider daily-driver → less motion).
2. Hunt seams: missing press feedback, teleporting state, no spatial story
   from trigger, group entrances on rare views, rare delight moments.
3. Every survivor must pass the shared gate with answers recorded.
4. Output:

```markdown
## Motion opportunities — [surface]

| # | Location | Today | Purpose | Frequency | Suggested motion |
|---|----------|-------|---------|-----------|------------------|
| 1 | … | … | … | … | exact values |

### Rejected candidates (required)
- [locus] — **Rejected: [gate question that killed it]**
- …

### Verdict
[How much motion this surface needs; single highest-leverage row.]
```

**Rejected candidates are mandatory** (at least 2). Saying "nothing should
animate more" is a valid result. Exact values from `motion-standards.md`.
Hand a chosen row to Mode 1 or Mode 4 `plan`, or to `ui-agent` after a spec.

---

## Mode 4 — Audit → plan

Read-only advisor. **Never modify product source** in this mode. Survey
motion → prioritize → **stop and wait** for which findings become plans →
then write self-contained plans another agent can execute without taste.

### Phases

1. **Recon** — stack, where motion lives, existing tokens/curves,
   personality, frequency map.
2. **Audit** categories (from standards): purpose & frequency; easing &
   duration; physicality & origin; interruptibility; performance;
   accessibility; cohesion & tokens; missed opportunities.
3. **Vet** — confirm each finding at `file:line`; drop by-design /
   duplicates. Present one leverage-ordered table:

| # | Severity | Category | Location | Finding | Fix summary |
|---|----------|----------|----------|---------|-------------|

Severity: **HIGH** = feel-breaking / keyboard motion / `scale(0)` /
`ease-in` on UI; **MEDIUM** = wrong origin, non-interruptible, missing
reduced-motion; **LOW** = polish.

List 2–4 **missed opportunities** separately (additive, not fixes).

4. **Wait** — designer picks which rows become plans (AskQuestion when
   available). Non-interactive default: top 3 HIGH/MEDIUM by leverage.
5. **Plans** — one per selected finding, self-contained:

```markdown
## Motion plan — [slug]

**Commit:** [short sha if known]
**Location:** `path:line`
**Current (excerpt):** …
**Target:** exact curve / duration / properties from motion-standards.md
**Steps:** 1. … 2. …
**Out of scope:** …
**Verify:** feel-check (slow-mo / device) + reduced-motion path
**Executor:** `ui-agent` (or eng) — this mode does not implement
```

Write plans into `projects/<slug>/findings.md` (and optionally
`projects/<slug>/artifacts/motion-plans/NNN-short-slug.md` when the
designer wants files). Never create a repo-root `plans/` folder.

---

## Mode 5 — Vocabulary

Load `references/animation-vocabulary.md`. Map the designer's feel-words
to the glossary term(s). Lead with the term; one-line definition; 1–2
alternates only when disambiguating. Stay inside the glossary — if nothing
fits, say so and approximate with listed words. No essay, no freestyle
motion spec unless they also ask for Mode 1.

---

## Mode 6 — List

The catalog is three motions. Load each recipe and print them. Do not
invent a fourth.

1. [`references/recipes/sheet.md`](references/recipes/sheet.md)
2. [`references/recipes/menu.md`](references/recipes/menu.md)
3. [`references/recipes/pill.md`](references/recipes/pill.md)

```markdown
## Motions

1. **Sheet** — rises from the bottom edge. Enter `--duration-medium`. Exit `--duration-fast`.
2. **Menu** — grows from the top edge at `--ds-button-press-scale`. Same durations.
3. **Pill** — the segmented thumb slides. `--duration-medium`. Keyboard snaps.

Phone tab bar: no animation.
```

Point at the catalog pages named in each recipe. Read-only.

---

## Mode 7 — Scan

Read-only. Search the named files, or the task folder when one is in
play, for hardcoded durations, `transition: all`, `scale(0)`, `ease-in`
on enter, and keyframes other than `ds-sheet-*`, `ds-scrim-*`, and
`ds-menu-*`.

Match a hit to sheet, menu, or pill only when the surface is that
surface. Anything else goes under **No recipe**, with the gate reason
(too frequent, keyboard, or not one of the three).

```markdown
## Motion scan — [scope]

| # | File | What I found | Recipe | Why |
|---|------|--------------|--------|-----|
| 1 | `…` | … | Sheet / Menu / Pill | … |

### No recipe
- [locus] — [gate reason]

Read-only. Nothing edited.
```

---

## Mode 8 — Apply

Propose one recipe, then stop until the designer confirms. Naming the
motion skips detection. It does not skip the confirm.

1. Run the shared gate. Fail → say so and do not apply.
2. Load that recipe. Reuse the component and the keyframes it names.
3. Output:

```markdown
## Apply — [Sheet / Menu / Pill]

**Why this one:** …
**Frequency:** [tier]
**Will reuse:** [component + existing animation names]
**Reduced motion:** [line from the recipe]
**Confirm to edit.**
```

After a yes, hand the edit to `ui-agent`. This mode does not write CSS
or TSX itself. Do not add tokens. Do not copy an outside motion library.

---

## Never do this

- Never ship or recommend motion without a reduced-motion alternative
  (Modes 1–4 and 8)
- Never animate keyboard / 100+/day actions "for polish"
- Never use playful bounce that fights the company tone without an explicit
  designer ask
- Never skip the Rejected candidates section in Mode 3
- Never implement product CSS/TSX inside Mode 4 — plan only
- Never install or dual-route `npx ui-skills` / Emil packs beside the
  orchestrator
- Never treat this skill as a substitute for `accessibility` or `audit`
- Never copy an outside motion library’s CSS, durations, blur, or bounce
- Never add a fourth catalog motion without a Mode 1 spec that passes the gate
- Never edit files in Mode 6 or Mode 7
- Never edit files in Mode 8 before the designer confirms

---

## Related files

| File | Role |
|------|------|
| `references/motion-standards.md` | Frequency, curves, hard blocks, remediation |
| `references/animation-vocabulary.md` | Mode 5 glossary |
| `references/recipes/sheet.md` | Mode 6–8 sheet |
| `references/recipes/menu.md` | Mode 6–8 menu |
| `references/recipes/pill.md` | Mode 6–8 segmented pill |
| `../ui-agent/SKILL.md` | Implements specs / plans |
| `../interaction-design/SKILL.md` | State matrix without motion timing |
| `../taste-feedback/SKILL.md` | Mid-build intensity (defers motion specs here) |
| `../accessibility/SKILL.md` | Broader a11y diagnostic |
| `docs/HOWTO-MOTION-CHOREOGRAPHY.md` | Designer guide |
