---
name: accessibility
description: >-
  Blocking pre-share checks for focus order, semantics, contrast, and ARIA.
  Triggers on: "check a11y", "focus order", "aria labels", "contrast",
  "keyboard navigation". Does not run the full pre-share sweep — see
  `../audit/` for design-system + a11y + copy together.
---

# Accessibility Agent

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Validate focus order, semantics, contrast, and ARIA before sharing prototypes. Blocking — critical failures must be fixed before handoff.

**Invoke in Cursor:** `Use the accessibility agent skill` or `/a11y`

**Human guide:** [`docs/HOWTO-ACCESSIBILITY.md`](https://github.com/marcopslopes/design-harness/blob/main/docs/HOWTO-ACCESSIBILITY.md)

For a full pre-share audit (design system + a11y + copy), use `../audit/SKILL.md` (`/audit`).

**Related (do not confuse):**
- **`cognitive-accessibility`** — mental load / wayfinding / COGA (advisory cognitive pass)
- **`adaptive-interfaces`** — `prefers-*` / text-size / density (no the company dark mode)
- **`accessibility-decisions`** — document a11y picks / tradeoffs / eng handoff (not a diagnostic)
- **`interface-change-review`** — git-scoped craft on a diff (not the share gate; not this diagnostic)
- **`live-page-review`** — runtime capture of a live/local URL (a11y tree as evidence for this skill / `audit` Check 2)
- **`research-artifacts` Mode 4** — ability-spectrum coverage map before a decision
- **`interaction-design`** — state × SR × keyboard × touch matrices

**POUR checklist:** `references/from-audit/a11y-pour-checklist.md` — same rules as audit Check 2 (code-evidenced BLOCKING; runtime/manual called out, not guessed).

---

## Blocking checks

### Interactive elements
- Every `<button>` has visible text or `aria-label`
- No `<div onClick>` — use `<button>` or `<a>`
- Icon-only buttons: label on the button, not the SVG

### Images and icons
- `<img>` always has `alt` (`""` if decorative)
- Inline SVGs: `aria-hidden focusable="false"`

### Dialogs
```tsx
role="dialog"
aria-modal="true"
aria-labelledby={titleId}  // must point to visible heading
```

### Forms
- Every input has `<label htmlFor>` or `aria-label` / `aria-labelledby`
- `placeholder` alone is not a label

### Live regions
- Copy confirmations: `role="status"`
- Urgent errors after action: `role="alert"`
- Render conditionally — do not hide with CSS only

### Focus
- Never `outline: none` without a `:focus-visible` replacement
- Preserve keyboard reachability for all CTAs

### POUR (see checklist)

Walk `references/from-audit/a11y-pour-checklist.md`. Standalone `/a11y` uses the same BLOCKING vs advisory vs runtime/manual rules as `audit` Check 2.

### Advisory craft extras (do not promote to BLOCKING)

These close gaps the blocking list doesn't cover. Tag **advisory**
(Major if the task is blocked at runtime; otherwise Minor/Note). House
`[A11Y-*]` blockers still win when the same issue is in code.

- **Hover on touch** — gate hover-only treatments with
  `@media (hover: hover)` (and `pointer: fine` when motion is involved).
  A hover style that sticks after a tap is a finding.
- **Decorative layers** — glows, gradients, and absolutely-positioned
  chrome get `pointer-events: none` and `aria-hidden="true"` so they
  never swallow clicks or sit in the accessibility tree. Never
  `aria-hidden` on a focusable control.
- **Submit stays enabled** — don't `disabled` the submit button until
  the form is "valid." Keep it enabled, validate on submit, mark
  `aria-invalid`, point `aria-describedby` at the inline error, and
  focus the first failing field. Disable with a spinner only while the
  request is in flight.
- **Dialog focus restore** — on open, move focus inside; set `inert` on
  background content; on close, return focus to the trigger. Complements
  POUR O6 (keyboard traps).
- **Skip link** — when repeated chrome precedes the main task, a "Skip
  to content" link should be the first focusable control. Advisory in
  Design Harness unless the prototype claims full-page chrome.
- **Forced colors** — if you restyle `:focus-visible`, verify it still
  shows in `forced-colors` / Windows High Contrast. Don't assume a
  custom ring token survives.
- **Toasts with actions or errors** — stay until dismissed. Timed
  auto-dismiss is only for non-action, non-error confirmations.
- **Paste** — never block paste on password / OTP / account fields.

---

## Output format

```
## Accessibility report — [file]

### Blocking
[A11Y-LABEL] line N: ...
[A11Y-DIALOG] line N: ...

### Result
BLOCKED | PASS
```

---

## Never do this

- Never ship a modal without `aria-labelledby` pointing to its title
- Never leave icon buttons unlabeled
- Never remove focus styles without a token-backed replacement
- Never `aria-hidden` a focusable control
- Never disable submit until the form looks valid — validate on submit
