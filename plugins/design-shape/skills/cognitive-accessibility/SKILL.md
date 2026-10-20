---
name: cognitive-accessibility
description: >-
  Evaluates mental load, wayfinding, working-memory demand, and decision
  complexity — COGA-style cognitive accessibility, not just contrast/ARIA.
  Triggers on: "cognitive accessibility", "cognitive load check", "is this
  too much to process", "wayfinding check", "mental load on this flow",
  "COGA review", "can a stressed provider finish this". Complements
  `accessibility` (focus/ARIA/contrast) and `audit` Check 5b heuristics —
  does not replace either. Findings are advisory unless they also violate
  a blocking a11y rule (then hand off to `accessibility` / `audit`).
---

# Cognitive accessibility

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

The hardest barriers to see are cognitive ones. A missing label fails
loudly; an interface that overloads working memory just loses people.
This skill makes cognitive demand visible and reducible.

**Invoke in Cursor:** "cognitive load check", "COGA review this flow",
"is this too much to process"

---

## Scope boundary

| Skill | Job |
|-------|-----|
| **`cognitive-accessibility`** (this) | Mental load, wayfinding, memory, decision complexity |
| **`accessibility`** | Focus order, ARIA, contrast, keyboard (blocking) |
| **`adaptive-interfaces`** | System prefs (reduced motion, contrast, text size) |
| **`ux-pattern` / Check 5b** | Structure + Nielsen heuristics |

- Prefer the company archetypes / busy-pro context (interrupted, one-handed,
  time pressure) when naming who's affected.
- Does **not** invent personas — use `research-artifacts` /
  `COMPANY-ARCHETYPES.md` or designer-named roles.

---

## Step 1 — Assess three loads

For each screen / step in the flow:

| Load | Question |
|------|----------|
| **Intrinsic** | How many concepts/decisions must land at once for the real task? |
| **Extraneous** | What did *design* add — scattered info, hidden instructions, inconsistency? |
| **Germane** | Can someone learn a pattern once and reuse it, or does every step reinvent rules? |

Flag **extraneous** load first — that's design debt you can cut.

---

## Step 2 — Reduce extraneous load

Check and recommend concretely:

1. **Show, don't make them remember** — later steps restate what they chose earlier
2. **Progressive disclosure** — only what's needed now
3. **Consistent patterns** — same action looks/behaves the same
4. **Clear defaults** — safe choice is the easy choice
5. **Chunking** — ~3–5 related fields/sections per beat

---

## Step 3 — Wayfinding (three questions, always)

At every major surface, can the user answer:

1. **Where am I?**
2. **Where can I go?**
3. **Where have I been?** (progress, visited, completed steps)

Fail any → finding with a specific fix.

---

## Step 4 — Stress / divided-attention pass

Walk the primary task as a **busy the company provider** (interrupted mid-flow,
returns later). Note recovery cost: can they resume without re-reading
everything?

---

## Output

```markdown
## Cognitive accessibility — [slug/surface] — YYYY-MM-DD

### Load summary
| Screen/step | Intrinsic | Extraneous | Germane | Notes |
|---|---|---|---|---|

### Findings (advisory)
1. [House: …] / [UX Heuristic: …] — Major|Minor|Note — …
2. …

### Wayfinding gaps
- …

### Suggested cuts (extraneous load)
- …
```

Append to `projects/<slug>/findings.md`. Offer debt-register logging for
deferred items via `project-debt-register.md`. If a finding is also a
blocking a11y violation, hand off to `accessibility` / `audit`.

---

## Never do this

- Never claim WCAG conformance from this pass alone
- Never invent cognitive personas
- Never skip the company busy-pro / archetype context when the surface is provider-facing
- Never treat this as a substitute for `accessibility` or `audit`

---

## Related files

| File | Role |
|------|------|
| `../accessibility/SKILL.md` | Blocking technical a11y |
| `../adaptive-interfaces/SKILL.md` | Prefers-* adaptations |
| `references/from-audit/heuristic-pass.md` | Nielsen / cognitive-load checklist (compose, don't duplicate blindly) |
| `docs/HOWTO-COGNITIVE-ACCESSIBILITY.md` | Designer guide |
