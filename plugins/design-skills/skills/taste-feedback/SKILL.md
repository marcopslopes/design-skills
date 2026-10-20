---
name: taste-feedback
description: >-
  Mid-build aesthetic checkpoints on a Design Harness / Figma prototype — catches
  density, weight, emphasis, and hierarchy mismatches early, before a full
  critique. Triggers on: "taste check this", "is this heading in the right
  direction visually", "mid-build visual check", "does this density feel
  right", "is this a persuade or an operate surface", "scale the ambition
  to the surface", "should this be quieter", or when the designer opts into taste checkpoints during a
  `ui-agent` build. Names the surface first: Persuade/Experience can take
  a point of view inside existing tokens; Operate/Read stays restrained.
  Does not invent brand colours or tokens outside
  Foundations / `context/design-system/ds`. Does not replace `ux-pattern`
  critique or `audit`. Does not load `design-memory` to steer the work.
---

# Taste feedback (mid-build)

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Process discipline produces correct design. Mid-build taste checks catch
"technically on-token but feels wrong" before a full screen is done.

**Invoke in Cursor:** "taste check this screen", "is the density right",
"mid-build visual check"

---

## Scope boundary

- **Fires on:** subjective craft decisions *within* house Foundations —
  type weight, spacing density, emphasis hierarchy, illustration/empty-state
  mood, motion intensity (hands off to `motion-choreography` for specs —
  including its frequency gate: 100+/day or keyboard → no animation).
- **Does not fire on:** inventing a new brand palette, radius system, or
  component (that's `design-system` / Foundations). Pure structural builds
  with no visual surface yet.
- **Does not** load `designer-context.local/design-record.md` to steer —
  same inert rule as `design-memory`.
- **Composes with:** `ui-agent` (optional checkpoints during build),
  `ux-pattern` (full critique later), `inspiration-scouting` (references
  beforehand). Named hierarchy / density / palette-mass terms:
  `references/shared/ui-craft-rules.md` — cite 1–2 at a checkpoint;
  token proposals stay Foundations-bound.

---

## Step 0 — Bound the taste question (optional, once)

If the designer hasn't named a feel for *this* project, ask once via
`AskQuestion` (or one chat line if no fixed options):

- Emotional target in one phrase (e.g. "calm confidence", "busy-pro efficient")
- Quality bar: exploratory prototype / shareable lab / near-production
- Anti-feel (what this must *not* feel like)

Record the answers in `projects/<slug>/decisions.md` as taste bounds for
this task — not as a global taste profile.

---

## Surface mode (once, before the checkpoints)

Name which kind of surface this is. Ask once via `AskQuestion` when the
screen doesn't make it obvious.

| Mode | Surfaces | Ambition |
|------|----------|----------|
| **Persuade / Experience** | Onboarding hero, empty state, first-run, a marketing moment | A point of view inside existing tokens: type hierarchy, density, imagery, one emphasis |
| **Operate / Read** | Settings, lists, forms, tables, dashboards people use all day | Restraint. Familiar patterns. Precision. |

Glass, type, and colour stay on the tokens the system already uses for
that surface. A point of view is a choice among those tokens. It is
never a new palette, a new type family, or gradient text.

---

## Step 1 — Pick 2–4 checkpoints (not more)

| High value | Why |
|---|---|
| First styled surface (type + colour tokens applied) | Foundational layer |
| Primary layout / density visible | Whitespace and hierarchy |
| First real interaction / state change | Feedback weight |
| Real copy in place | How words sit in the design |

Skip unstyled scaffolds and isolated components with no context.

---

## Step 2 — Ask specific questions (never "does this look good?")

| Bad | Good |
|---|---|
| "Does this look good?" | "Heading is `Text` display / H3 weight — bolder, lighter, or stay?" |
| "Any feedback?" | "Card padding is `--spacing-05`. Tighter (`04`) or more air (`06`)?" |
| "Right direction?" | "Primary CTA is Sea primary on a quiet list — too loud for this job?" |

Stay inside Foundations tokens when proposing alternatives.

### Craft lines (Foundations-bound)

Use as checkpoint prompts, never as license to invent tokens:

1. **Concentric radii** — nested corners should read as
   `outer ≈ inner + padding` using Foundations radius tokens. Same radius
   on parent and padded child often looks pinched.
2. **Optical over geometric** — icon+label buttons, play triangles, and
   asymmetric icons: if centering looks off, nudge optically (still via
   spacing tokens / icon alignment — not new components).
3. **Elevation vs structure** — prefer shadow tokens for depth; keep
   borders for structure/state (dividers, selected, focus). Don't add a
   border only to fake elevation if a Foundations shadow already does it.
4. **Icon weight next to type** — stroke/optical weight should match
   nearby text weight; one icon set per surface (`icon-usage`). Outline
   default, filled only for active/selected when the pattern allows.
5. **Slow the surface down** — when motion or hover is in scope, walk
   hover/focus/active/loading/empty (and replay motion slowly if you can).
   What feels wrong at slow speed is usually wrong at full speed.

### Layout craft lines (Foundations spacing)

Foundations-bound layout craft — express with Foundations spacing tokens
only:

1. **Group with space, not lines** — related items closer; unrelated farther.
   Inter-group gap ≥ ~2× intra-group gap. Separators last resort (dense lists).
2. **Controls ≠ content** — actions need a control cue (fill, border, zone);
   don't style static text like a button or buttons like body copy.
3. **Shared edges** — one leading edge / indent step per column; stray
   padding reads as noise even when nobody names it.
4. **Disclosure needs a cue** — collapsed or off-screen content needs a
   peek, chevron, or "Show N more…" — never hide with zero affordance.

### Type craft lines (Foundations type)

Light checks only — do not invent a second type scale or tracking values:

1. **Hierarchy by role** — heading sizes descend with level; body stays on
   Foundations body tokens (don't invent weights/sizes).
2. **Wrap deliberately** — `text-wrap: balance` on short headings when the
   stack supports it; `text-wrap: pretty` on short descriptions; skip both
   in long-form. Ellipsis/clamp only when full text stays reachable
   (tooltip/expand).
3. **Tabular numbers** — prices, timers, counters that update should not
   shift layout (tabular nums when the font/token stack allows).
4. **Line-height by role** — use Foundations leading tokens; prefer
   unitless values. Headings stay tight; body looser; anything wrapping
   3+ lines needs enough leading to read (don't use `leading-none` on
   wrapping copy).
5. **Weight floor at UI sizes** — UI text below ~18px stays at regular
   (400) or heavier; thin/light weights are display-only on large type.
6. **Inputs at 16px on mobile** — iOS Safari zooms the page when an
   input's text is smaller than 16px. Keep the Foundations body token on
   mobile inputs (or scale with a documented recipe) — don't silently
   shrink fields below that floor.
7. **Keep useful text selectable** — don't `user-select: none` on
   application chrome just to hide highlights; suppress selection only
   on a specific drag/gesture surface where it fights the interaction.
8. **One filled primary per view** — when fill encodes the primary
   action, one control gets it; peer actions stay neutral. Don't invent
   a new accent — use the existing primary token.

Letter-spacing / underline metrics: only if Foundations already has a
tracking or decoration token. Natural-case source copy vs CSS
presentation (`text-transform`) belongs to `content`.

Breakpoint / reflow / zoom → `responsive-patterns`.

---

## Step 3 — Present the checkpoint

```markdown
## Taste check [N of M] — [phase name]

**Visible decisions:**
- …
- …

**Questions:**
1. …
2. …

**Within DS:** alternatives only use existing tokens / `ds` primitives.
```

Prefer a real screenshot of the Design Harness/Figma surface when available.

---

## Step 4 — Record the signal

Append each answered checkpoint to `projects/<slug>/decisions.md`:

```markdown
### Taste check — YYYY-MM-DD — [phase]
- Asked: …
- Designer chose: …
- Rejected: …
```

These are *this project's* signals — never written into design-memory
unless the designer later runs `design-retrospective` and opts to observe
a habit.

---

## Never do this

- Never invent off-token colours, fonts, or radii "for taste"
- Never give an Operate / Read surface a Persuade point of view
- Never treat Persuade as permission to leave Foundations
- Never ask vague approval questions
- Never run more than 4 checkpoints in one build without the designer asking
- Never feed `design-record.md` into the checkpoint
- Never treat taste check as a substitute for `audit` or design-critique

---

## Related files

| File | Role |
|------|------|
| `../ui-agent/SKILL.md` | Build chain that can opt into checkpoints |
| `../design-memory/SKILL.md` | Observational only — never steers here |
| `../inspiration-scouting/SKILL.md` | Pre-build aesthetic references |
| `../motion-choreography/SKILL.md` | When the taste question is motion |
| `references/shared/ui-craft-rules.md` | Named hierarchy / density / palette-mass terms — cite 1–2 |
| `docs/HOWTO-TASTE-FEEDBACK.md` | Designer guide |
