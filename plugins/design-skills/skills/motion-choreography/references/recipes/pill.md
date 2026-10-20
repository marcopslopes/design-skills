# Pill

The segmented control’s thumb slides to the selected option. A few times a session, not on every tap in the product.

**Reuse:** `SegmentedControl`. Catalog: `#/design-system/controls`. The thumb already transitions.

| What | How |
| --- | --- |
| Thumb | `translateX` on `.ds-segment__thumb`, `--duration-medium`, `--easing-emphasized` |
| Label colour | `--duration-fast`, `--easing-standard` |

**Pointer vs keyboard.** Pointer animates. Keyboard, and `detail === 0`, sets `data-motion="off"` so the thumb jumps, then clears that flag on a later frame so the next pointer move can still animate.

**Reduced motion.** The thumb snaps. The selected option stays filled.

**Leave alone.** The phone tab bar. It changes tabs with no animation, all day. Do not add a sliding indicator there.
