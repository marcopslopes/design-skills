---
name: icon-usage
description: >-
  Sources every icon through the `Icon` primitive in `context/design-system/ds` (wrapping
  Tabler Icons) — never hand-drawn SVG. Triggers on: "add an icon", "which
  icon library", or any screen/prototype build that needs iconography.
  Usually rides inside a `ui-agent` chain rather than standing alone.
---

# Icon Usage Agent

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Every icon in this repo renders through the **`Icon`** primitive in `context/design-system/ds`, which wraps **[Tabler Icons](https://tabler.io/icons)** via `@tabler/icons-react` (5,900+ MIT-licensed icons, already installed). Use this skill whenever a prototype, screen, or component needs an icon.

**Invoke in Cursor:** `Use the icon usage skill` or `/icons` — also triggers automatically on "add an icon", "which icon library", or "build a prototype/screen".

---

## Source of truth

**Never hand-draw new inline `<svg>` icon markup.** Find the closest Tabler icon and use it instead. This keeps every prototype visually consistent and avoids re-inventing icon paths per screen.

## How to use it

```tsx
import { IconCalendar } from '@tabler/icons-react'
import { Icon } from '../../../context/design-system/ds' // adjust relative path to context/design-system/ds

<Icon icon={IconCalendar} size="md" />
```

| Prop | Values | Notes |
|------|--------|-------|
| `icon` | any `@tabler/icons-react` export | PascalCase, `Icon`-prefixed, e.g. `IconGift`, `IconSettings`, `IconChevronRight`. Browse [tabler.io/icons](https://tabler.io/icons); most have an outline default and a `...Filled` solid variant. |
| `size` | `xs` \| `sm` \| `md` \| `lg` \| `xl` | Maps to `--size-03`…`--size-07` (16/18/20/24/28px) in `context/design-system/tokens.css` (`context/design-system/FIGMA-FOUNDATIONS-SIZE.md`). Default `md`. Don't pass raw pixel sizes — pick the closest scale step. Desktop and mobile share the same scale (no platform-specific sizing). |
| `stroke` | number, optional override | Auto-scales with `size` by default: `stroke = size ÷ 16` — 1px at 16px (`xs`), 1.25px at 20px (`md`), 1.5px at 24px (`lg`), 2px at 32px. Confirmed by design in Slack — the company icons get heavier as they get bigger, not a fixed weight. Rarely needs overriding. |
| `className` | optional | Icons inherit `currentColor` — set `color` on a wrapping element (or pass a className that sets it) to theme them, e.g. inside a `Text` or a themed button. |

## Picking an icon

1. Think of the semantic action/object (share, calendar, settings, a paint roller for a paint line, coins for rewards, etc.) rather than trying to pixel-match a Figma icon exactly.
2. Search [tabler.io/icons](https://tabler.io/icons) for that word.
3. Prefer the plain outline icon unless the design calls for a solid/filled glyph (e.g. a filled rating star → `IconStarFilled`).
4. If genuinely nothing fits (rare), fall back to the closest conceptual match rather than hand-drawing — one consistent icon system everywhere beats pixel-perfect fidelity per icon.

## Local wrapper pattern (large prototype files)

For screens with many repeated icon usages, define a thin local wrapper per icon so call sites stay short and readable:

```tsx
import { IconGift } from '@tabler/icons-react'
import { Icon } from '../../../context/design-system/ds'

function IconGiftButton({ className }: { className?: string }) {
  return <Icon icon={IconGift} size="md" className={className} />
}
```

See `src/design-harness/pages/NavigationProfilePrototypePage.tsx` for a full worked example (~30 icons migrated from hand-drawn SVGs to this pattern).

## Related files

| File | Role |
|------|------|
| `context/design-system/ds/Icon.tsx` | The `Icon` primitive implementation |
| `context/design-system/ds/ds.css` | `.ds-icon` size-scale styles |
| `context/design-system/tokens.css` | `--size-00`…`--size-12` scale |
| `context/design-system/FIGMA-FOUNDATIONS-SIZE.md` | Source spec for the size scale |
| `harness/ORCHESTRATOR.md` §7 | Component API quick reference (includes `Icon`) |
| `harness/ORCHESTRATOR.md` | The routing table that triggers this skill |
