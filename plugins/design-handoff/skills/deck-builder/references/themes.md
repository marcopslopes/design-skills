# Themes — visual skin, independent of template

**Scope note (2026-08-04):** this file covers **dark vs. light mode**
only — the `◐` icon toggle in `.nav`, a direct 2-state switch, no picker.
A separate, independent axis — **accent color**, opened via the `T`
shortcut / "Theme" picker in the shortcuts bar — is documented in
`base-skin.md`'s "Picker menus" section, not here. Don't merge the two:
dark/light changes `--bg`/`--ink`/etc., accent color only changes
`--brand` and its derived tints. A deck can be Dark+Violet, Light+Green,
any combination.

A **template** (`templates.md`) picks *which slide types* a deck has
(stat row, agenda, risks callout, etc.). A **theme** is a separate,
orthogonal choice: *what the `:root` color mirror looks like*. Every
template can render in either theme — don't couple them.

Until 2026-08-04 both reference decks and every deck built by this skill
used **dark** only. Ask which theme the designer wants at Step 0
alongside the template (default to **dark** if they don't care — it's
the proven, higher-component-coverage option per `base-skin.md`).

## Dark (default, existing)

Copy `:root` verbatim from
`projects/settings-ia/artifacts/decks/settings-ia-stakeholder-update.html` (or
either canonical source deck in `base-skin.md`). No changes needed.

## Light

Same variable names, same component classes — only the values change.
Grounded in the same brand color (`--brand`), just against a light
surface instead of translucent-white-on-black:

```css
:root{
  --brand: #00a1cf;
  --brand-hover: #005b74;
  --brand-soft: rgba(0,161,207,.10);
  --brand-soft-border: rgba(0,161,207,.24);

  --bg: #ffffff;
  --bg-2: #f7f8f9;
  --surface: #ffffff;
  --surface-muted: #f3f4f5;
  --ink: #16181a;
  --ink-2: rgba(22,24,26,.85);
  --ink-3: rgba(22,24,26,.65);
  --ink-4: rgba(22,24,26,.45);
  --line: rgba(22,24,26,.12);
  --line-subtle: rgba(22,24,26,.07);

  --radius: 16px;
  --radius-sm: 12px;
  --elevate: 0 0 0 1px rgba(0,0,0,.03), 0 4px 20px rgba(0,0,0,.08);
}
body{background:var(--bg);}
```

**Things that break if copied blindly from a dark deck — check these on
every light-theme build:**

- Any component using `rgba(255,255,255,...)` directly instead of a
  `var(--ink-*)`/`var(--line*)` token (a few callout/badge variants in
  the existing decks do this) — those go invisible or wrong-contrast on
  white. Swap to the token, don't hardcode a new light-mode override.
- `.badge-teal`/`-amber`/`-red` and `.callout-amber` backgrounds are
  often a translucent white-on-dark tint — on light they need a
  translucent *color*-on-white tint instead (e.g.
  `background:rgba(0,161,207,.10)` not `rgba(255,255,255,.08)`).
- The live-embed `iframe.proto` (`live-embed.md`) already renders a
  white Design Harness page inside `PhoneShell` — keep `.proto-frame-wrap`
  **transparent** (no deck card). A dark card around the iframe
  double-frames the phone and looks broken (live miss 2026-08-04).
- Run the Step 2.5 QA render-check same as any other deck — contrast
  bugs are exactly the kind of thing that check catches.
