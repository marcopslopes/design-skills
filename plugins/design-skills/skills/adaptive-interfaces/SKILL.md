---
name: adaptive-interfaces
description: >-
  Specs how a surface respects user/system preferences — reduced motion,
  contrast, text sizing, transparency, density — without inventing product
  dark mode. Triggers on: "adaptive interfaces", "prefers-reduced-motion",
  "high contrast mode", "does this respect system text size", "density
  preference", "prefers-contrast". Complements `motion-choreography`
  (motion specs) and `accessibility` (blocking checks). Forbidden: shipping
  or prototyping product dark mode (this harness's products have none — ORCHESTRATOR §7.1).
---

# Adaptive interfaces

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Good interfaces adapt to the person and their system settings — not as
polish later, as requirements up front.

**Invoke in Cursor:** "adaptive interface check", "respect reduced motion
and text size", "high contrast pass"

---

## Scope boundary

| Skill | Job |
|-------|-----|
| **`adaptive-interfaces`** (this) | Prefers-* + density / text-size adaptation map |
| **`motion-choreography`** | Concrete motion + reduced-motion alternatives |
| **`responsive-patterns`** | Breakpoints / reflow / 200% zoom layout |
| **`accessibility`** | Blocking focus/ARIA/contrast in code |

### House hard rule — no product dark mode

Do **not** add `prefers-color-scheme: dark` product UI, dark prototype
themes, or theme toggles inside Design Harness product surfaces. Design Harness chrome
may be dark; prototypes stay Foundations light (`ORCHESTRATOR.md` §7.1
rule 7). If the designer asks for dark mode, decline and explain.

---

## Step 1 — Map adaptable properties

| Property | Signal | House note |
|----------|--------|-------------|
| Motion | `prefers-reduced-motion` | Required — pair with `motion-choreography` |
| Contrast | `prefers-contrast` | Support higher contrast; stay on Foundations tokens |
| Transparency | `prefers-reduced-transparency` | Avoid critical UI on heavy blur alone |
| Text size | user/system scaling (`rem`) | Layout must not clip at larger text |
| Density | compact / comfortable (product choice) | Optional; document if offered |
| Colour scheme | `prefers-color-scheme` | **Do not implement dark product UI** |

---

## Step 2 — Motion

- Non-essential motion gated behind reduced-motion
- Essential motion (e.g. progress) gets a simpler alternative
- No autoplay of video/carousel without pause **and** reduced-motion respect

Defer detailed durations to `motion-choreography`; this skill confirms
the preference wiring exists.

---

## Step 3 — Contrast & transparency

- Semantic colour pairs still meet WCAG AA at minimum (same bar as
  `accessibility` / `audit`)
- Critical controls must work if translucency is reduced or removed
- Never convey state by colour alone

---

## Step 4 — Text size & density

- Prefer relative units that survive system text scaling
- At larger text: no clipped labels, no overlapping controls, primary
  CTA still reachable
- If density modes exist, define what each changes (spacing tokens only —
  not a second type scale)

---

## Output

```markdown
## Adaptive interfaces — [slug/surface] — YYYY-MM-DD

### Preference map
| Property | Supported? | How | Gaps |
|---|---|---|---|

### Reduced motion
- Status: …
- Alternatives: … (or → motion-choreography)

### Text size / density
- …

### Explicitly out of scope
- Product dark mode (declined per house rule)

### Hand-offs
- …
```

Append to `projects/<slug>/findings.md`.

---

## Never do this

- Never invent product dark mode
- Never treat "we'll add reduced motion later" as done for share-bound work
- Never invent off-token high-contrast colours — extend Foundations first
  via `design-system` if a real gap exists
- Never replace `accessibility` / `audit`

---

## Related files

| File | Role |
|------|------|
| `../motion-choreography/SKILL.md` | Motion alternatives |
| `../responsive-patterns/SKILL.md` | Reflow / zoom |
| `../accessibility/SKILL.md` | Blocking a11y |
| `harness/ORCHESTRATOR.md` §7.1 rule 7 | Light-mode prototypes |
| `docs/HOWTO-ADAPTIVE-INTERFACES.md` | Designer guide |
