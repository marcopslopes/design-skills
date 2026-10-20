# Menu

Occasional menu that grows from its top edge, under the trigger.

**Reuse:** `ContextMenu` in `.ds-menu-pop`, mounted with `usePresence`. Catalog: `#/design-system/context-menu`. `transform-origin: center top`.

| | Enter | Exit |
| --- | --- | --- |
| Menu | `ds-menu-in`, `--duration-medium`, `--easing-emphasized`. Opacity 0 and `scale(var(--ds-button-press-scale))` → opacity 1 and `scale(1)` | `ds-menu-out`, `--duration-fast`, back to that same scale |

`--ds-button-press-scale` is 0.97. The menu never starts at `scale(0)`.

**Pointer vs keyboard.** Same rule as the sheet: pointer animates, `detail === 0` is instant (`data-motion="off"`).

**Reduced motion.** Fade only, `--duration-fast`, `--easing-standard`. The open menu stays visible.

**Leave alone.** A new origin, blur, bounce, and any scale token other than `--ds-button-press-scale`.
