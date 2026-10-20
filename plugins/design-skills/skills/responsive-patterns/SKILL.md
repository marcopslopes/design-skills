---
name: responsive-patterns
description: >-
  Content-driven breakpoint strategy, reflow, priority shifting, and 200%
  zoom / WCAG 1.4.10 discipline for multi-width layouts. Triggers on:
  "responsive patterns", "breakpoint strategy", "does this reflow", "200%
  zoom check", "mobile and desktop layout for this", "container queries",
  "what collapses at narrow widths". Does not invent the company type/spacing
  scales — uses Foundations tokens. Does not replace `ui-agent` (build) or
  `mobile-shell` (phone chrome). the company prototypes stay light mode.
---

# Responsive patterns

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Responsive design is not "make it fit on a phone." It is designing for
every context — one-handed on a bus, zoomed to 200% on a desktop, tablet
in bright light — with content deciding breakpoints, not device folklore.

**Invoke in Cursor:** "breakpoint strategy for this", "200% zoom check",
"what collapses on narrow widths"

---

## Scope boundary

| Skill | Job |
|-------|-----|
| **`responsive-patterns`** (this) | Breakpoints, reflow, priority, zoom |
| **`ui-agent`** | Builds the screens with `ds` + tokens |
| **`mobile-shell`** | Phone *chrome* (bezel/tab bar), not layout strategy |
| **`adaptive-interfaces`** | User prefs (text size, contrast, motion) |

Design Harness phone prototypes are often single-width by design — still run
this when the ask spans web/desktop or when zoom/reflow is in question.

---

## Step 1 — Content-driven breakpoints

1. Start narrow (~320 CSS px)
2. Widen until the layout *breaks* (that's the breakpoint)
3. Name by **behaviour**, not device (`stack` → `sidebar` → `columns`)

Do **not** default to "768 = tablet" without a content reason.

Document:

```markdown
| Breakpoint name | Min width | What changes |
|---|---|---|
| stack | 0 | … |
| … | … | … |
```

---

## Step 2 — Priority shifting (narrow)

For each non-essential block, choose one:

| Strategy | Meaning |
|----------|---------|
| **Kept** | Essential for the task |
| **Collapsed** | Behind disclosure / tab |
| **Deferred** | Lower in scroll order |
| **Hidden** | Last resort — say why |

Never hide the primary task CTA.

### Layout craft at narrow (Foundations-bound)

Foundations-bound layout craft:

1. **Collapse with a cue** — if priority = Collapsed, require a visible
   disclosure ("Show more", chevron, peek of next card 16–32px) — never
   silent hide.
2. **Breathing room between targets** — bordered/filled controls need
   clear gap; icon-only / text-only need *more* clearance than filled
   peers (space is the boundary). Stay on Foundations spacing steps.
3. **Inset actions from the viewport edge** — primary CTAs sit inside
   layout margins / safe-area; edge-to-edge only when intentional phone
   chrome (`mobile-shell`).
4. **Group rhythm survives reflow** — inter-group spacing still reads
   ≥ ~2× intra-group after stack; don't flatten everything to one gap.
5. **Logical properties for localizable layout** — `padding-inline-start`
   / `margin-inline-end`, not `padding-left` / `margin-right`, unless the
   geometry is genuinely physical (a notch, a drag handle on a fixed
   side).
6. **Content bleeds, controls float** — backgrounds and media may go
   edge-to-edge; text and actions stay inside layout margins and
   `env(safe-area-inset-*)`. Sticky chrome floats above content; it
   doesn't dam the scroll.
7. **Plan for string growth** — no fixed widths/heights on text
   containers; rows wrap. Test that critical actions aren't parked where
   resize or a longer locale clips them.

---

## Step 3 — Type, measure, touch

- Body ≥ 16px equivalent; prefer Foundations type tokens
- Line length ~45–75 characters where reading is primary
- Touch targets ≥ 44×44 CSS px; spacing that prevents mis-taps
- Prefer fluid type only if it still maps to token steps — no rogue `clamp` that invents a second type scale
- Truncation: ellipsis/clamp only when full content remains reachable

---

## Step 4 — 200% zoom / reflow (WCAG 1.4.10)

At 320 CSS px width **or** 200% zoom on a desktop-width layout:

- No essential content clipped or requiring **two-dimensional** scrolling
  (vertical scroll alone is OK)
- No overlapping interactive controls
- Forms and CTAs remain operable

Record pass/fail with what broke.

---

## Step 5 — Container vs media queries

| Use | Prefer |
|-----|--------|
| Page-level layout regions | `@media` / viewport breakpoints |
| Component that lives in varied hosts | Container queries when the host width, not the viewport, should drive layout |

Note the choice in the spec so eng doesn't guess.

---

## Output

```markdown
## Responsive patterns — [slug/surface] — YYYY-MM-DD

### Breakpoints
| Name | Min | Behaviour change |
|---|---|---|

### Narrow priority map
| Block | Kept / Collapsed / Deferred / Hidden | Why |
|---|---|---|

### 200% zoom / reflow
- Result: Pass / Fail
- Issues: …

### Implementation notes
- Tokens / `ds` constraints: …
- Hand off to `ui-agent`: …
```

Append to `projects/<slug>/findings.md` (or `decisions.md` if locking
breakpoint names). Hand implementation to `ui-agent`.

---

## Never do this

- Never invent off-token spacing/type for "fluid" looks
- Never invent prototype dark mode
- Never hide the primary task on narrow
- Never treat phone chrome (`mobile-shell`) as a responsive strategy
- Never use physical left/right properties in a layout that will
  localize, unless the geometry is actually physical

---

## Related files

| File | Role |
|------|------|
| `../ui-agent/SKILL.md` | Implements the layout |
| `references/from-ui-agent/desktop-web-patterns.md` | Desktop behaviour layer |
| `../adaptive-interfaces/SKILL.md` | Text-size / contrast prefs |
| `docs/HOWTO-RESPONSIVE-PATTERNS.md` | Designer guide |
