# UI craft rules — citable reference

A single shared reference for **named visual-craft heuristics** — layout,
type, colour balance, imagery, novelty. Not a workflow skill; `ux-pattern`,
`figma-ux-audit`, `taste-feedback`, and `design-rationale` cite these by
name instead of each carrying their own copy.

Cognitive mechanisms (Fitts's, Hick's, Jakob's, …) stay in
`interaction-laws.md`. House rules stay in `COMPANY-PATTERNS.md`. Nielsen
H1–H10 stay in `references/heuristic-pass.md`. This
file is the craft layer those three do not name.

Use this when a critique or rationale needs a named, defensible craft
rule instead of "it feels off." Cite the rule by name in output
(`[UX Heuristic: Focal point]` style, same convention as `ux-pattern`'s
labelled findings) — don't just apply the reasoning silently.

---



## Negative space

Empty space is a ranking tool, not leftover canvas. Air around the
primary action and the main content makes them readable; stuffing every
gap with chrome makes everything equal weight. If the designer has to
add a border or a louder colour because the job isn't landing, try
spacing first.

## Focal point

One thing should win the first look — usually the primary task or CTA.
Two equal-weight heroes (hero image + hero button + hero badge) is no
focal point. Size, contrast, and isolation beat decoration.

## Scan path

People don't read interfaces; they scan. Text-dense surfaces follow an
**F** (top and left first). Marketing / sparse screens follow a **Z**
(corners and the path between them). Put the title, key value, and
primary action on that path — not in the leftover middle. Checkable
form on a key-task pass: heuristic-pass cognitive-load **Scan path**.

## Grid

Alignment is a trust signal. A shared column, baseline, and gutter make
a surface feel intentional even when density is high. One element
sitting off-grid reads as a mistake, not as emphasis — if you need
emphasis, use hierarchy, not drift.

## Visual hierarchy

Rank with **size, colour, and spacing** together, not one of them
alone. The most important thing should still win when you squint.
Don't use a brand accent on secondary chrome; don't use display type on
helper copy. Distinct from house button-hierarchy rules — this is
ranking on the canvas, not which button variant the pattern file names.

## Type hierarchy

Roles first, decoration second. One display / heading / body / meta
ladder; each step should be obviously a step. If two levels look the
same, they aren't a hierarchy. Stay on Foundations type tokens in Harness
OS — this rule is about *using* the scale, not inventing a second one.

## Limit typefaces

Two families is usually the ceiling (one for UI, one for display if
needed); a handful of weights, not a catalogue. Extra faces and italic /
bold / all-caps combinations read as noise and fight brand mood. Pair
for contrast of role (display vs body), not for novelty.

## Reading measure

Line length, line-height, and letter-spacing decide whether body copy
is actually readable. Over-long lines, cramped leading, and tight
tracking on paragraphs all tax reading even when the typeface is "on
brand." Headings stay tighter; body stays looser. Foundations leading
tokens first; don't invent tracking values.

## 60–30–10

Rough colour mass: **~60%** surface / dominant, **~30%** secondary
structure, **~10%** accent (actions, alerts, brand spark). When accent
takes over the canvas, nothing is an accent. House palettes still win
on *which* colours; this rule is only *how much* of each.

## Color as action

Colour should point at what to do next — primary actions, links, status
— not decorate every card equally. If every chip is the accent, none of
them is a cue. Semantic status colours (error / success / warning) stay
semantic; don't recolour them for taste. Contrast / WCAG still belong
to `accessibility`, not this file.

## Content over chrome

The job and the content outrank UI chrome. Extra cards, gradients,
dividers, and ornamental illustration that don't carry meaning make the
task slower to find. If removing a layer wouldn't change the task, it
was chrome.

## Purposeful imagery

Photos, illustration, and video should carry meaning the copy isn't
already saying — product, mood the brand actually owns, or explanation.
Generic stock faces and unrelated lifestyle shots add noise and can
clash with archetype (a calm, low-pressure surface for an overbooked provider with hustle stock is
a mismatch). Empty decorative slots are worse than no image.

## MAYA (most advanced, yet acceptable)

Novelty should sit just ahead of what this audience already knows —
advanced enough to feel current, familiar enough to use without a
tutorial. A control nobody recognises is not "innovative"; it's a
learning tax. Pair with Jakob's Law when the issue is a broken
convention; use MAYA when the issue is *how far* a justified departure
should go.

## Earned novelty

A new pattern has to make the task better — faster, clearer, or
possible — not merely different. If the novel bit can come off and the
task still works the same, it didn't earn its keep. Heuristic-pass
cognitive-load **No novelty tax** is the checkable form on a key-task
pass.

## Visual rhythm

Repeat a spatial beat (same card measure, same inset, same gap between
siblings) so the eye can predict where the next thing is. Rhythm
directs attention; breaking it should be deliberate (a featured row, a
destructive zone), not accidental leftover padding.

---



## When to cite these

- `ux-pattern` critique mode — as a `[UX Heuristic: <rule name>]`
labelled finding when the issue is visual craft, not a company-specific
pattern violation and not a named cognitive law.
- `figma-ux-audit` canvas cards — same `[UX Heuristic: …]` craft layer.
- `taste-feedback` mid-build — named terms for density / hierarchy /
palette-mass checkpoints; token proposals stay Foundations-bound.
- `design-rationale` — as evidence when a decision was informed by one
of these rules; label it **principle-based reasoning**, not user
research.
- `audit` Check 5b — complements H8 / scan path / density; never a
second H1–H10 table.



## Never do this

- Never cite a craft rule as if it were user research evidence specific
to the company's users — it's a general visual heuristic, label it as
such
- Never stack all fifteen as a checklist against every screen — cite the
1–2 that are actually diagnostic for the issue found
- Never use these to override house patterns, Foundations tokens, or
accessibility contrast
- Never put these in `COMPANY-PATTERNS.md` or the org-pack — they are
not company-specific



## Related


| File                                                | Role                                                     |
| --------------------------------------------------- | -------------------------------------------------------- |
| `references/shared/interaction-laws.md`            | Named cognitive laws (sibling; don't mix into this file) |
| `references/heuristic-pass.md` | Nielsen H1–H10 + cognitive-load checklist                |
| `COMPANY-PATTERNS.md`                               | House interaction/nav/button rules                       |
| `../design-system/SKILL.md`             | Token / composition enforcement                          |


