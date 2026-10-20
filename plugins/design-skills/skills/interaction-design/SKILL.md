---
name: interaction-design
description: >-
  Specs interactive component/flow states and feedback timing — default,
  hover, focus, active, disabled, error, loading, success — across visual,
  screen reader, keyboard, and touch. Triggers on: "interaction design",
  "map the states for this", "state matrix", "loading and error feedback",
  "what happens on disabled", "interaction spec for this control",
  "should this be a confirm dialog or undo", "destructive action pattern".
  Does not build the UI (`ui-agent`) or replace `motion-choreography`
  (motion specs) or `accessibility` (blocking a11y sweep).
---

# Interaction design

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Interactions are promises. Every control says something will happen.
This skill makes those promises explicit for everyone — not only for
pointer users.

**Invoke in Cursor:** "state matrix for this button", "interaction spec",
"map loading and error feedback"

---

## Scope boundary

| Skill | Job |
|-------|-----|
| **`interaction-design`** (this) | States + feedback matrix |
| **`ui-agent`** | Implements in Design Harness with `ds` |
| **`motion-choreography`** | Duration/easing/reduced-motion |
| **`accessibility`** | Blocking focus/ARIA/contrast |
| **`cognitive-accessibility`** | Mental load across the *flow* |
| **`design-handoff`** | Whole-design spec that may *pull* this matrix |

Platform behaviour (iOS sheets, Android ripples, desktop hover) still
comes from `ui-agent`'s platform refs — this skill asks for the matrix;
those refs fill platform-specific cells.

---

## Step 1 — Inventory interactive elements

List every control / region that responds to input on the surface (primary
CTA, secondary actions, inputs, toggles, dismiss, rows…). Don't invent
controls that aren't in the design.

---

## Step 2 — State matrix (required)

For each interactive element:

| State | Visual | Screen reader | Keyboard | Touch |
|-------|--------|---------------|----------|-------|
| Default | | | | |
| Hover | | n/a (pointer) | n/a | n/a |
| Focus | + focus ring | how announced | how reached | n/a |
| Active / pressed | | | trigger key | gesture |
| Disabled | not colour-only | announcement + reason | in tab order? | |
| Error | + message | announcement + guidance | focus move? | |
| Loading | | live region | blocked? | |
| Success | | announcement | next focus | |

Omit rows that truly don't apply (e.g. no hover on pure phone) — say so,
don't leave silent blanks.

**Hard rules:**

- Disabled is never "just grey" — need a non-colour cue + reason
- Focus is always visible (`:focus-visible` — never remove)
- Error text is associated with the field (not toast-only for form errors)
- Loading >1s needs cancel/navigate-away path when the task allows

---

## Step 3 — Feedback timing

| Latency | Pattern |
|---------|---------|
| <100ms | Immediate visual state change |
| 100ms–1s | Spinner / skeleton + optional live region "Loading" |
| >1s | Progress or honest wait + ability to leave |
| Done | Success or error with next action clear |

Colour alone never carries meaning — pair with text/icon.

---

## Step 3.5 — Error prevention & destructive actions (when applicable)

If any element is **destructive or consequential** (delete, remove,
send, publish, discard) or the surface has a **failure path beyond
ordinary form validation** (network drop, server error, session
timeout, concurrent-edit conflict): load
`references/error-prevention.md`.

Two things to settle, in order:
1. **Which level of the error-prevention hierarchy is this at?** Never
   design a confirm dialog (level 5) when the error could be eliminated
   or prevented (level 1/2) instead.
2. **Undo or confirm?** Default to undo-with-a-toast; reserve confirmation
   for truly irreversible, high-consequence, or others-affecting actions
   — and when you do confirm, state the consequence, not a bare "are you
   sure?" (wording itself is `content`'s job — this step only decides
   whether a confirm step belongs at all).

Skip this step for ordinary form validation — that's already the state
matrix's Error row above.

---

## Step 4 — Empty / edge

Name empty, zero-results, offline/fail, and partial-success if the flow
can hit them. One line each on what the user sees and can do next.

---

## Output

```markdown
## Interaction design — [slug/surface] — YYYY-MM-DD

### Elements covered
- …

### State matrices
#### [Control name]
| State | Visual | SR | Keyboard | Touch |
|---|---|---|---|---|

### Feedback timing
- …

### Error prevention & destructive actions
- [Level in hierarchy chosen, and why] / [Undo or confirm, and why] — omit section if N/A

### Edge / empty
- …

### Hand-offs
- Motion: `motion-choreography` if needed
- Build: `ui-agent`
- Blocking a11y: `accessibility` / `audit`
```

Append to `projects/<slug>/findings.md`.

---

## Never do this

- Never skip focus/disabled/error for "we're just prototyping" on a
  share-bound Design Harness screen
- Never use colour-only disabled or error
- Never invent hover-only affordances as the only path on touch-first flows
- Never replace `audit` with this matrix
- Never reach for a confirm dialog as the first answer to a destructive
  action — check the error-prevention hierarchy for a cheaper level first
- Never silently overwrite another user's work on a concurrent-edit
  conflict, or discard unsaved work on session expiry

---

## Related files

| File | Role |
|------|------|
| `../ui-agent/SKILL.md` | Implements the matrix |
| `../motion-choreography/SKILL.md` | Motion for state changes |
| `../accessibility/SKILL.md` | Blocking a11y |
| `references/error-prevention.md` | Hierarchy, undo-vs-confirm, recovery flow templates |
| `../content/SKILL.md` | Wording for confirm dialogs once the pattern is chosen |
| `docs/HOWTO-INTERACTION-DESIGN.md` | Designer guide |
