# Sheet

Occasional overlay that comes from the bottom edge and leaves by that same edge.

**Reuse:** `Sheet` inside `.ds-pattern__overlay`, mounted with `usePresence` from `context/design-system/ds`. Catalog: `#/design-system/sheet-screen`. CSS already in `context/design-system/ds/ds.css`.

| | Enter | Exit |
| --- | --- | --- |
| Sheet | `ds-sheet-in`, `--duration-medium`, `--easing-emphasized`. `translateY(100%)` → `translateY(0)`, opacity 0 → 1 | `ds-sheet-out`, `--duration-fast`, same easing, back to `translateY(100%)` |
| Scrim | `ds-scrim-in`, fade only | `ds-scrim-out`, fade only |

`data-state` is `from`, then `open`, then `closed`. Unmount when the exit animation name ends in `-out`.

**Pointer vs keyboard.** Pointer (`event.detail !== 0`) animates. Keyboard, and any click whose `detail` is 0, sets `motion` false: show and hide on the next frame.

**Reduced motion.** Sheet travel becomes the scrim fade at `--duration-fast` and `--easing-standard`. The open sheet stays visible.

**Leave alone.** Phone tab bar, blur, bounce, `scale(0)`, and any duration that is not already in `tokens.css`.
