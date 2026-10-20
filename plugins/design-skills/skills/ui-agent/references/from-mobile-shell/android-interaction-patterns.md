# Android Interaction Patterns — Reference

Curated, not exhaustive. Behavior layer only — how things *behave* on Android, not how they look. Applied by
`ui-agent` (Step 6) once platform is known as Android, strictly under `harness/ORCHESTRATOR.md` §7's hard rules and
`COMPANY-PATTERNS.md`. Never overrides a token, a `context/design-system/ds` component API, or
`COMPANY-VOICE.md` — if this doc's guidance would require that, flag the conflict instead of resolving it
silently.

**Scope boundary:** `../mobile-shell/SKILL.md` still owns visual chrome (bezel, notch, status bar, tab
bar) for phone-frame prototypes. This doc is the interaction layer underneath that chrome — it does not decide
screen content or copy (that's `ui-agent`/`content`).

---

## Platform slop test (Android)

Quick acceptance bar before calling an Android-flavored prototype "done"
(Design Harness / house DS prototypes):

- **Would a fluent Android user trust this, or trip on an iOS port?**
  Cupertino-shaped switches/dialogs, bottom-nav copied unchanged onto a
  tablet canvas, or hijacking "system Back" metaphors fail the test.
- **Touch targets ≥ ~48×48 dp** where the build is explicitly Android-
  flavored (slightly larger than iOS's 44 pt); never go below the shared
  `audit` ~44×44 floor either way.
- **System Back always works conceptually.** Destructive / multi-step
  flows must not trap the user with no way out that maps to Back /
  dismiss.
- **Window insets.** Don't paint primary actions under status / nav /
  keyboard regions — same safe-area discipline as iOS via `PhoneShell`.
- **Adaptivity.** A tablet / wide layout must restructure (rail, master-
  detail), not stretch the phone layout — see
  `references/desktop-web-patterns.md` § Adapt,
  don't scale.
- **One FAB, one primary action.** Never stack FABs (section below).

---

## Bottom sheets vs. dialogs

- **Bottom sheet** — anchored to the bottom edge, can be modal or non-modal, supports partial-height drag (similar
  intent to iOS detents, see `ios-interaction-patterns.md`). Use for: contextual actions tied to a specific list
  item or row (e.g. "more options" on a booking), multi-field forms that don't need a full dedicated screen.
- **Dialog** — centered, small, always modal, always requires an explicit dismiss action (confirm/cancel/close).
  Use for: destructive confirmations ("Cancel this booking?"), short single-decision prompts. Never use a dialog
  for anything with more than 2–3 elements — that's a bottom sheet's job.

Maps onto `COMPANY-PATTERNS.md`'s existing modal/sheet dismissal rules (× vs. back chevron) — a dialog is
effectively always the "can close without consequence" case, so it always gets × or explicit confirm/cancel
buttons, never a back chevron.

**Never do this:** use a full-height bottom sheet for a two-button confirmation (should be a dialog), or a dialog
for a form with several fields (should be a sheet — dialogs that scroll internally are a known bad pattern).

---

## FAB placement and behavior

The Floating Action Button represents the single most important, most frequent action on a screen — not a
dumping ground for secondary actions:

- **Placement:** bottom-right, floating above content, anchored above the tab bar (mirrors `PhoneShell`'s existing
  `floating` prop convention for iOS FABs — same placement rule, platform-agnostic).
- **One FAB per screen.** Never stack multiple FABs, and never use a FAB for anything that isn't the screen's
  primary create/add action (e.g. "add appointment" on a calendar screen — a real example already in
  `NavigationProfilePrototypePage.tsx`'s `floating` slot).
- **Behavior on scroll:** a FAB may shrink to icon-only or hide on scroll-down and reappear on scroll-up, to avoid
  permanently obscuring content — but it must never disappear entirely with no way back without scrolling up.
- **Extended FAB (icon + label)** is appropriate when the action isn't fully obvious from the icon alone, or on a
  screen with otherwise low information density. Prefer icon-only once the user has already learned the action's
  location and the icon is a strong `Icon`/Tabler match.

**Never do this:** use a FAB for a destructive action, or add a second floating button for a "secondary" add
action — that's two competing primary actions on one screen.

---

## Ripple / elevation conventions

Android's touch feedback and layering language:

- **Ripple:** a circular ink-spread from the touch point on tap, for any pressable surface (buttons, list rows,
  cards, icon buttons). This is Android's equivalent of iOS's opacity/scale press states — different feedback
  mechanism, same intent (confirm the tap registered).
- **Elevation:** shadow depth signals z-order and interactivity — higher elevation = "floats above" the content
  below it (FABs highest, then dialogs/bottom sheets, then cards, then the base surface).

Elevation and ripple are **behavior/motion conventions, not new tokens.** Depth must still come from
`context/design-system/tokens.css`'s existing shadow/border tokens and `Card`'s `elevated` prop — never a new
hard-coded `box-shadow` value invented per-platform. If the token set doesn't have enough elevation steps to
express Android's convention faithfully, flag that as a token gap (per `harness/ORCHESTRATOR.md` §7.1 rule 1) —
don't hand-roll a one-off shadow to compensate.

---

## Navigation drawer vs. bottom nav

- **Bottom nav (tabs)** — 3–5 top-level destinations, always visible, each with persistent state. Same role as
  `PhoneShell`'s `tabs` prop on iOS — this is the default for this house's own IA (Calendar, Discovery, Search,
  Bookmarks, per `COMPANY-PATTERNS.md` § "Navigation conventions").
- **Navigation drawer** — a slide-out panel from the edge, typically for a longer list of destinations (settings
  sub-sections, account switching, less-frequent secondary destinations) that would crowd a bottom nav past 5
  items.

**Never do this:** replace an existing bottom-nav IA with a drawer just because it's "more Android-native" —
`COMPANY-PATTERNS.md`'s navigation conventions are the source of truth for the product's actual top-level structure
regardless of platform; a drawer is additive (for overflow/secondary destinations), never a wholesale replacement
of the primary nav.

---

## Android-specific list actions

- Android list rows commonly use a persistent trailing **overflow icon** (⋮, three vertical dots) to reveal a menu
  of row actions, rather than (or in addition to) swipe gestures. This is a more discoverable default than a
  swipe-only pattern — prefer overflow-menu-first for Android unless the row set is long and one action clearly
  dominates.
- If a swipe gesture is used (e.g. for symmetry with an iOS build of the same screen), it must not be the *only*
  way to reach a core action — same "no hidden affordances" requirement as the iOS doc, direct application of
  `COMPANY-PATTERNS.md`'s named anti-pattern #2.
- **Long-press** to enter a multi-select mode (e.g. selecting several clients for a bulk action) is a native
  Android convention with no iOS equivalent to borrow from directly — when used, always show a visible selection
  affordance (checkmarks, highlighted rows) immediately on entering multi-select, never a silent mode change.

---

## Related files

| File | Role |
|------|------|
| `../mobile-shell/SKILL.md` | Owns visual chrome (bezel, status bar, tab bar) — this doc is the layer underneath |
| `SKILL.md` | Applies this doc in Step 6 once platform is known as Android |
| `COMPANY-PATTERNS.md` | Navigation conventions, hidden-affordances anti-pattern this doc cross-references |
| `references/from-mobile-shell/ios-interaction-patterns.md` | The iOS counterpart — read together when a screen ships on both platforms |
