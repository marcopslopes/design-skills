# iOS Interaction Patterns — Reference

Curated, not exhaustive. Behavior layer only — how things *behave* on iOS, not how they look. Applied by
`ui-agent` (Step 6) once platform is known as iOS, strictly under `harness/ORCHESTRATOR.md` §7's hard rules and
`COMPANY-PATTERNS.md`. Never overrides a token, a `context/design-system/ds` component API, or
`COMPANY-VOICE.md` — if this doc's guidance would require that, flag the conflict instead of resolving it
silently.

**Scope boundary:** `../mobile-shell/SKILL.md` still owns visual chrome (bezel, notch, status bar, tab
bar) for phone-frame prototypes. This doc is the interaction layer underneath that chrome — it does not replace
`PhoneShell`, and it does not decide screen content or copy (that's `ui-agent`/`content`).

---

## Platform slop test (iOS)

Quick acceptance bar before calling an iOS-flavored prototype "done"
(Design Harness / house DS prototypes, not a full HIG rewrite):

- **Would a fluent iPhone user trust this, or pause at web-shaped
  controls?** Custom global nav, hover-only affordances, or HTML-button
  metaphors inside `PhoneShell` fail the test.
- **Safe area.** No primary controls under the notch / Dynamic Island /
  home indicator — `PhoneShell` already owns that chrome; don't paint
  interactive content into those regions.
- **Touch targets ≥ ~44×44 pt** for every tappable control (same floor as
  `audit` a11y O4).
- **Edge-swipe back stays conceptually alive.** Don't invent overlays or
  chrome that would block the left-edge back gesture metaphor on a real
  device; keep push vs modal present honest (section below).
- **System navigation metaphors.** Tab bar = top-level sections (never
  actions); sheets for self-contained tasks; no mixed metaphors.

---

## Navigation: push vs. modal present

Two distinct, non-interchangeable transitions:

- **Push (navigate forward in a flow)** — the new screen is part of the same task; back returns to exactly where
  you were. Use for: drilling into a client record, opening a service detail from a list, stepping through a
  multi-screen setup flow.
- **Modal present (a focused, dismissible interruption)** — the new screen is a self-contained task on top of the
  current context; dismissing it returns to an unchanged screen underneath. Use for: a confirmation dialog, a
  single-field edit sheet, a claim/referral flow that isn't part of the underlying screen's own navigation stack.

This already matches `COMPANY-PATTERNS.md` § "Modal and sheet patterns" dismissal rule (chevron-back on push,
×-close on a dismissible modal) — this doc doesn't change that rule, it names which transition class triggers
which button.

**Never do this:** present a multi-step flow as a push stack when it's actually a self-contained task the user can
walk away from with no consequence (should be a modal) — or vice versa, using a × close on a screen that's really
the next step of a flow the user can't skip.

---

## Swipe-to-reveal list actions

iOS list rows commonly reveal secondary actions (delete, archive, more) via a leading or trailing swipe, rather
than putting every action as a persistent visible icon on the row:

- **Trailing swipe (right-to-left):** destructive/primary secondary action first (closest to the edge), e.g.
  delete, cancel. Red background for destructive.
- **Leading swipe (left-to-right):** non-destructive quick actions, e.g. mark complete, pin.
- The swipe action must always have a **visible-on-first-use affordance** for the primary destructive action if
  it's the *only* way to trigger it — a partial reveal hint, or a duplicate access point (e.g. a row's own overflow
  menu) for anything safety-critical. This directly avoids `COMPANY-PATTERNS.md`'s "hidden affordances" anti-pattern
  (providers not recognizing an icon or buried menu item for a core action) — swipe actions are exactly the kind of
  interaction that can silently become a hidden affordance if there's no secondary way in.
- Implement with real interaction (touch/pointer drag), not a fake always-visible "swipe hint" icon that doesn't
  actually swipe.

**When to use vs. a persistent action icon:** swipe actions suit list rows with many items and one dominant
secondary action (e.g. a long waitlist, a long client list). For short lists or safety-critical actions (canceling
a booking, refunding a payment), prefer a persistent, labeled action — don't bury it behind a gesture nobody's
told about.

---

## Sheet detents (small / medium / large)

iOS sheets can rest at multiple heights rather than being all-or-nothing:

- **Small detent** — a quick, single-decision action (confirm/cancel, a short picker). Content should fit without
  scrolling.
- **Medium detent** — the default for most forms and multi-field edits; roughly half the screen, expandable.
- **Large detent** — effectively full-screen; use when the sheet's content is itself a full flow (e.g. a
  multi-step claim journey), not just a quick edit.

Maps onto `COMPANY-PATTERNS.md`'s existing sheet-variant rule (drag handle, hero-then-body layout, `<ol>` for
sequential steps) — detents decide *how much* of the sheet is visible at rest, not what's inside it. A sheet that
starts at medium and can be dragged to large is the right default for anything with more than 2–3 fields; a sheet
that only ever needs one confirmation should start (and stay) at small rather than defaulting to large and wasting
space.

**Never do this:** default every sheet to large regardless of content — that hides the fact that the user can
still see (and interact with) the screen underneath at a smaller detent, which is often the more honest
affordance for a lightweight action.

---

## Segmented controls vs. tabs

Both switch between views, but signal different things:

- **Segmented control** — switches between views of the **same data**, same context, no navigation event (e.g.
  "Upcoming / Past" bookings, "Day / Week / Month" calendar view). Lives inline in the content area, not the tab
  bar.
- **Tabs (bottom nav)** — switches between **top-level sections** of the app, each with its own navigation stack
  and state. This is `PhoneShell`'s `tabs` prop territory — see `../mobile-shell/SKILL.md`.

**Never do this:** use a segmented control for what's actually a top-level section switch (loses the tab bar's
persistent orientation), or add a 5th/6th bottom tab when the extra views are really filters on one section
(should be a segmented control inside that section instead).

---

## Icon weight/style vs. the `Icon` primitive

iOS's native icon language is **SF Symbols** — variable weight (ultralight through black), often paired 1:1 with
system text weight, with filled variants for "selected" states (e.g. a filled tab icon for the active tab, outline
for inactive).

This repo's `Icon` primitive wraps **Tabler Icons** (`context/design-system/ds/Icon.tsx`, see
`../icon-usage/SKILL.md`), which has its own stroke-scaling rule (`stroke = size ÷ 16`, heavier at
larger sizes) — that rule is a **hard rule**, not something this doc overrides for iOS builds.

**Honest note — this is a real gap, not glossed over:** Tabler does not offer true weight-matched SF Symbols
equivalents. There is no attempt to fake SF Symbols' variable-weight system here. What this doc *does* recommend:

- For an active/selected tab or toggle state, use Tabler's `...Filled` variant (e.g. `IconHeartFilled` vs.
  `IconHeart`) where one exists — the closest available approximation to iOS's filled-when-selected convention.
- Where no filled variant exists for a given icon, do not fake weight by hacking `stroke` per-instance — that
  breaks the shared stroke-scaling rule and produces inconsistent icons elsewhere. Use the outline icon at the
  standard weight and rely on color/background (already how `context/design-system/ds` themes active states) to
  signal selection instead.
- Never hand-draw an SF-Symbols-style icon to chase a closer match — that's the same `[DS-ICON]` violation
  `../audit/SKILL.md` flags regardless of platform.

---

## Related files

| File | Role |
|------|------|
| `../mobile-shell/SKILL.md` | Owns visual chrome (bezel, status bar, tab bar) — this doc is the layer underneath |
| `SKILL.md` | Applies this doc in Step 6 once platform is known as iOS |
| `COMPANY-PATTERNS.md` | Modal/sheet dismissal rules, hidden-affordances anti-pattern this doc cross-references |
| `../icon-usage/SKILL.md` | `Icon` primitive + Tabler sourcing rules this doc never overrides |
