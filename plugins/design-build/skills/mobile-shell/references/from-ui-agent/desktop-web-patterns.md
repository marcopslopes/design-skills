# Desktop / Web Interaction Patterns — Reference

Curated, not exhaustive. Behavior and layout-convention layer only — **not a visual device frame.**
`SKILL.md`'s `PhoneShell` is a deliberate visual chrome wrapper (bezel, notch, status
bar) because phones share one hardware form factor worth mimicking; desktop/web has no equivalent single "device"
to frame — a browser window isn't a bezel to draw. This doc is rules for laying out and behaving inside the company's
actual desktop/web provider surfaces (Biz web app), applied by `ui-agent` (Step 6) once platform is known as
desktop/web, strictly under `harness/ORCHESTRATOR.md` §7's hard rules. Never overrides a token, a
`context/design-system/ds` component API, or `COMPANY-VOICE.md`.

**Desktop screens go in `DesktopShell`** (`src/design-harness/shared/DesktopShell.tsx`, CSS in
`src/design-harness/styles/desktop-shell.css`): a browser window with the pro app's web nav down the left, fed the same
`buildProAppPhoneTabs(...)` list the phone uses. Designer decision 2026-10-10 — an unframed desktop screen read as a
loose document next to its `PhoneShell` twin. It is the only desktop chrome: extend it, never add a per-screen
frame. Everything else in this doc is real CSS layout inside it (max-width, grid/flex, breakpoints).

---

## Content width and breakpoint conventions

This repo already has a real content-width token and an established breakpoint in `src/design-harness.css` — use these,
don't invent new ones:

- **`--size-layout-content-max`** (`1240px`, `context/design-system/tokens.css`) — the standard max content width
  for desktop layouts. Wrap desktop page content in a container capped at this token, centered, rather than
  letting content stretch edge-to-edge on wide monitors.
- **`899px`** is this repo's existing mobile/desktop breakpoint (`src/design-harness.css`, multiple `@media (max-width:
  899px)` rules) — treat anything below this as the mobile layout, at or above as desktop. Don't introduce a
  second, different breakpoint value for a new screen without a documented reason; consistency across prototypes
  matters more than a screen-specific "better" number.
- `COMPANY-PATTERNS.md` § "Responsive device frames" already establishes that **every prototype provides
  both a mobile and desktop view** — desktop is typically a split layout (hero/image left, content right) or a
  wider single-column canvas with more breathing room, never just the mobile layout stretched wider. Apply that
  existing rule; this doc doesn't change it, it fills in the concrete width/breakpoint numbers that rule was
  missing.
- Within the desktop max-width, use `context/design-system/tokens.css` spacing tokens for gutters (`--spacing-07`
  or `--spacing-08` for page-level side padding is the usual desktop step-up from mobile's `--spacing-05`) — never
  a one-off pixel gutter.

---

## Adapt, don't scale (tablet / hybrid / second breakpoint)

**Adaptation is rethinking the experience for the new context, not
stretching pixels.**

Applies when building or reviewing a tablet / large-phone / hybrid
surface (checkout till, iPad-ish layouts, responsive web between the
899px breakpoint and full desktop):

- **Restructure, don't stretch.** A phone UI scaled up to tablet width is
  a failure mode — use multi-column / master-detail / side panels when
  the width earns them, not a single column with bigger padding.
- **Touch still rules on tablet.** Primary controls stay ≥ ~44×44px
  (`audit` a11y O4); don't rely on hover-only affordances just because
  the canvas is wider (see hover section above).
- **Orientation / posture.** Landscape is a different structure (side-by-
  side panes), not the portrait layout letterboxed. Don't lock
  orientation to dodge a layout bug in a prototype unless the task truly
  demands it.
- **Hide nothing essential.** If a capability matters on phone, it must
  still be reachable on tablet (different chrome OK; missing job is not).

This does **not** invent a third breakpoint. Use the existing 899px /
content-max conventions above unless a documented reason says otherwise.

---

## Genuine hover states — never faked on touch

Desktop/web has a real `:hover` state because a mouse pointer can rest on an element without committing to a
click. Phones and tablets do not have this — there is no equivalent gesture, and CSS `:hover` on touch devices
either never fires or fires unreliably (sticks after tap on some browsers).

- **On desktop/web:** use real `:hover` states for interactive elements — buttons, cards, list rows, links.
  `context/design-system/ds` components should express hover via existing token-based states (e.g.
  `--color-surface-brand-hover` for primary buttons — already defined) rather than inventing a new hover treatment
  per screen.
- **Never simulate a "hover" affordance on a touch build** by, e.g., always showing a hover-only action icon or
  relying on `:hover`-revealed content as the *only* way to reach something on a phone/tablet build. If content or
  an action is hover-revealed on desktop, the mobile/tablet equivalent needs its own always-visible or tap-revealed
  path (this is the same "no hidden affordances" principle `COMPANY-PATTERNS.md` names for mobile, applied to the
  desktop→mobile direction).
- **Never treat `:active`/`:focus` as a substitute for `:hover`, or vice versa.** They're three different states
  with three different triggers (pointer resting, pointer down, keyboard focus) — a real desktop build should be
  able to show all three distinctly, especially `:focus-visible` (see below).

---

## Keyboard navigation and focus order

`harness/ORCHESTRATOR.md` §7.1 rule 5 already makes this a hard rule (`:focus-visible` never removed, semantic
HTML). This section is the desktop-specific behavior that rule implies in practice:

- **Tab order must match visual/reading order.** Don't rely on `tabindex` values other than `0` or `-1` to
  reorder focus — if the DOM order doesn't match the visual order, fix the DOM order, not the tab index.
- **Every custom interactive element needs a visible focus ring** on keyboard focus specifically (`:focus-visible`,
  using `--color-border-focus`), not on mouse click — a mouse user clicking a button shouldn't see the same ring a
  keyboard user tabbing to it sees, but keyboard focus must always be visible. `context/design-system/ds`'s
  `Button`, `TextField`, etc. already implement this — never override it per-screen.
- **Modals and sheets must trap focus** while open (focus can't tab outside to the page behind them) and must
  **return focus** to the element that opened them on close. This is desktop/web-specific in impact — a keyboard
  user who loses their place after closing a dialog has no easy way to relocate it, unlike a touch user who can
  just tap back to where they were.
- **Escape key closes a dismissible modal/sheet** (the desktop equivalent of the × close button
  `COMPANY-PATTERNS.md` already specifies for dismissible modals) — never bind Escape to a modal that represents a
  committed multi-step flow (same push-vs-dismissible distinction the iOS doc makes, applied to keyboard shortcuts).

---

## Native form controls vs. custom-styled equivalents

- **Prefer native `<select>`, `<input type="date">`, `<input type="checkbox">`/`<input type="radio">`** where the
  interaction they provide (native OS picker, native keyboard handling, native accessibility tree) is not
  meaningfully improved by a custom build. Native controls give correct keyboard behavior and screen-reader
  semantics for free — a custom-styled equivalent has to re-earn all of that.
- **Use a custom-styled equivalent (built from `context/design-system/ds` primitives, never hand-rolled markup)**
  only when the native control's interaction model genuinely doesn't fit — e.g. a multi-select with visible chips,
  a combobox with live filtering, a date-range picker with two linked calendars. Even then, the custom version
  must replicate the native control's keyboard support (arrow-key navigation, type-ahead, `Escape` to close) — a
  custom dropdown that only works with a mouse is a regression, not an upgrade.
- **Never restyle a native control to look custom while keeping native behavior partially broken** (e.g. a
  `<select>` with `appearance: none` and a custom chevron icon, but no keyboard-open behavior verified) — pick one
  approach deliberately and verify it end-to-end, don't end up with a control that looks custom but behaves like a
  half-working native one.

---

## Related files

| File | Role |
|------|------|
| `../ui-agent/SKILL.md` | Applies this doc in Step 6 once platform is known as desktop/web |
| `SKILL.md` | The mobile-only visual-chrome counterpart — explicitly not what this doc does |
| `context/design-system/tokens.css` | `--size-layout-content-max` and spacing tokens this doc cites |
| `COMPANY-PATTERNS.md` | § "Responsive device frames" — the existing mobile+desktop rule this doc fills in with concrete numbers |
| `harness/ORCHESTRATOR.md` §7.1 rule 5 | The accessibility hard rule this doc's keyboard-nav section expands on |
