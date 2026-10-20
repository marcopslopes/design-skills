# Motion standards (the company)

Shared craft bar for `motion-choreography` modes. Values are defaults —
extend project tokens when they exist; do not invent a parallel motion
language.

the company tone always wins on bounce / playfulness.

**Shipped catalog.** Sheet, menu, and segmented pill already have
recipes in `references/recipes/`. When a spec is one of those three,
the recipe’s tokens win over the generic curves below (`--easing-emphasized`,
`--duration-medium`, `--duration-fast`, `--ds-button-press-scale`).
Do not introduce `--ease-sheet` or a second duration scale.

---

## Frequency gate (answer before any motion)

| Frequency | Decision |
|-----------|----------|
| 100+ / day (core nav, keyboard shortcuts, command-like toggles) | **No animation.** Instant state. |
| Tens / day (list row hover, frequent toggles) | Instant or ≤150ms opacity/color only |
| Occasional (sheets, toasts, modals, settings) | Standard UI motion (below) |
| Rare / first-time (onboarding, empty success, celebration) | Delight budget — still calm/confident, not playful bounce |

**Never animate keyboard-initiated actions.** Repeated shortcuts must feel
instant; motion makes them feel delayed.

---

## Purpose (must name one)

Valid purposes only:

- **Feedback** — confirm the interface heard the user
- **Spatial consistency** — show where something came from / went
- **State indication** — make a state change legible
- **Preventing a jarring change** — bridge appear / disappear / swap
- **Explanation** — rare; marketing/onboarding only
- **Delight** — only at Rare/first-time frequency

"It looks cool" is not a purpose. Can't name one → cut.

Also answer at least one of the three questions:

1. What changed?
2. What should I look at next?
3. How are these related?

---

## Duration budgets

| Element | Duration |
|---------|----------|
| Press / tap feedback | 100–160ms |
| Micro (toggle, small control) | 100–200ms |
| Tooltip / small popover | 125–200ms |
| State change (expand, tab) | 200–300ms |
| Sheet / modal enter | 200–400ms |
| Complex staged choreography | ≤700ms total |
| Indeterminate loader | uncapped only if user can cancel |

UI motion over **300ms** needs an explicit reason in the spec. Nothing
over **1s** unless it's a cancellable loader.

**Stagger:** 50–80ms between items; max 5 staggered; rest appear together;
reading order. Only for infrequent staged entrances — never every list
hover. Never stagger a title word by word.

---

## Easing

Prefer strong custom curves when writing CSS (built-in `ease` is weak):

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-sheet: cubic-bezier(0.32, 0.72, 0, 1); /* sheet / drawer feel */
```

| Situation | Easing |
|-----------|--------|
| Entering / exiting UI | `ease-out` / `--ease-out` |
| Moving / morphing already on-screen | `ease-in-out` / `--ease-in-out` |
| Hover / color only | short `ease` |
| Constant motion (spinner, marquee) | `linear` |
| Sheet / drawer | `--ease-sheet` |

**Hard block:** `ease-in` on UI enter/exit — feels sluggish (delays the
moment the user watches). Prefer `ease-out` for both enter and exit as
the company-safe default; exits stay softer (smaller travel / opacity).

---

## Physicality & origin

- **Never `scale(0)`** — start from `scale(0.95–0.97)` + opacity. Nothing
  in the world appears from nothing. `scale(0.25)` on an icon swap is the
  same failure. Icon state changes cross-fade with opacity, or scale from
  `--ds-button-press-scale`.
- **No blur on enter or exit.** Do not animate `filter: blur()`.
- **Popovers / menus / tooltips** scale from their **trigger**
  (`transform-origin`), not center. Modals/sheets stay centered (exempt).
- **Symmetric enter/exit paths** for dismissible surfaces (toast exits
  the same edge it entered).
- **Press feedback (optional):** `scale(0.96–0.97)` on `:active`, never
  below `0.95`; skip when DS already covers press. Gate hover motion with
  `@media (hover: hover) and (pointer: fine)`.

---

## Interruptibility & performance

- Prefer **CSS transitions** (or interruptible springs) for hover / press /
  toggles / toasts — so rapid re-triggers retarget. Reserve **keyframes**
  for one-shot staged moments.
- Animate **`transform` and `opacity`** (cautiously `filter`). Avoid
  animating layout props (`width`/`height`/`top`/`left`/`margin`/`padding`)
  on hot paths.
- **Never `transition: all`** — name properties.
- Never animate text colour for emphasis (photosensitivity risk).

---

## Accessibility

`prefers-reduced-motion: reduce` means **reduce, not remove**:

| Standard | Reduced alternative |
|----------|---------------------|
| Slide / translate | Fade (opacity) |
| Scale + bounce | Instant or short fade |
| Staggered reveal | Simultaneous fade |
| Continuous pulse | Static end state |
| Parallax | Static |

Motion is **never the only cue** — every animated state also needs a
static signal (color, icon, label).

---

## Escalation triggers (flag on sight in Review / Audit)

- `transition: all`
- `scale(0)`, `scale(0.25)`, or any enter scale below `0.95`
- `blur()` on enter or exit
- Word-by-word title stagger
- Pure-fade with no initial transform on enter
- `ease-in` on UI interaction
- Animation on keyboard / 100+/day actions
- UI duration >300ms with no reason
- `transform-origin: center` on a trigger-anchored popover/menu
- Keyframes on rapidly re-triggered UI (toasts, toggles)
- Layout-property animation on hot paths
- Missing reduced-motion handling on movement
- Ungated `:hover` motion on touch-first surfaces
- Playful bounce / springy overshoot fighting the company calm tone

---

## Remedial preference (when fixing)

1. **Delete** (high-frequency / no purpose / keyboard)
2. **Reduce** (shorter, smaller transform, fewer props)
3. **Fix easing** (`ease-in` → `ease-out` / custom)
4. **Fix origin / physicality**
5. **Make interruptible** (keyframes → transitions)
6. **Move to GPU** (layout → transform/opacity)
7. **Polish** (stagger, soft exit) — last
