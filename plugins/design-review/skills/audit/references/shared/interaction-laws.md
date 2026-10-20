# Interaction laws — citable reference

A single shared reference for named cognitive/UX principles as citable
knowledge, not standalone workflow skills with scope boundaries;
`ux-pattern` and `design-rationale` cite these by name instead of each
carrying their own copy. Visual-craft heuristics (hierarchy, scan path,
type, palette mass) live in the sibling file
`references/shared/ui-craft-rules.md` — don't mix the two.

Use this when a critique or a rationale needs a named, defensible
principle instead of "it feels off." Cite the law by name in output
(`[UX Heuristic: Fitts's Law]` style, same convention as `ux-pattern`'s
labelled findings) — don't just apply the reasoning silently.

---

## Fitts's Law — target acquisition

Time to hit a target depends on its **size** and **distance**: bigger
and closer = faster and more accurate. Minimum touch target ~44×44pt
(iOS) / 48×48dp (Material); pointer targets can be smaller but still
generous. Place related actions near the content they act on. Screen
edges/corners are effectively infinite-size targets — good for
persistent nav, not for anything that should be hard to hit
accidentally. Does **not** cover the cognitive cost of deciding what to
tap — a well-sized, badly-labelled button still fails.

## Hick's Law — choice overload

Decision time grows (logarithmically, not linearly) with the number of
simultaneous choices. Fewer options at once = faster decisions; grouping
and progressive disclosure reduce apparent complexity without removing
functionality. Choice *quality* matters as much as count — five distinct
options can be easier to choose from than three vague, overlapping ones.
Don't confuse "fewer options" with "less functionality."

## Jakob's Law — convention

Users spend most of their time on other products and arrive with
pre-built expectations (logo top-left → home, cart icon → checkout,
hamburger → hidden nav, X → close). Departing from a strong convention
costs users a real learning tax, paid repeatedly until they relearn the
pattern — the benefit of the new approach must clearly outweigh that
cost. Deviation is justified when the conventional approach genuinely
fails at your specific use case, or your users have a domain-specific
convention that supersedes the general one — never justified by wanting
to feel differentiated.

## Miller's Law — working memory

People hold roughly 7±2 items in working memory at once (some readings
argue closer to 4 for unrelated items). Group fields, menu items, or
steps into chunks rather than presenting a long flat list — chunking,
not raw reduction, is usually the fix.

## Tesler's Law (conservation of complexity)

Every process has inherent complexity that cannot be removed — only
moved. The choice is whether the **product** or the **user** carries it.
Smart defaults, auto-detection, and sensible pre-fills shift complexity
off the user; stripping a genuinely necessary step without replacing it
just relocates confusion downstream.

## Doherty Threshold — perceived speed

Productivity/engagement rises sharply when system response time stays
under ~400ms. Above that, users perceive lag and disengage, even when
the actual task hasn't changed. Use optimistic UI, skeleton screens, and
immediate micro-feedback (button press states, instant local echo)
to stay under the threshold perceptually even when the real operation
takes longer.

## Peak-End Rule — remembered experience

People judge an experience mostly by its most intense moment (peak,
positive or negative) and how it ends — not by the average of every
moment. Design the ending deliberately (a booking confirmation, a
completed checkout) as a genuine high point; a strong flow that ends
flat or with friction gets remembered as flat.

## Zeigarnik Effect — incomplete tasks

People remember and are pulled back toward *unfinished* tasks more than
completed ones. Progress indicators, saved drafts, and "you're 80%
done" nudges exploit this to bring users back — genuinely useful for
onboarding and multi-step flows, but don't manufacture artificial
incompleteness just to manipulate return visits.

## Serial Position Effect — list memory

Items at the **start** (primacy) and **end** (recency) of a list are
remembered better than items in the middle. Put the most important menu
items, form fields, or steps first or last, not buried mid-list.

---

## When to cite these

- `ux-pattern` critique mode — as a `[UX Heuristic: <law name>]` labelled
  finding when the issue is a named cognitive-load or usability
  mechanism, not a company-specific pattern violation.
- `design-rationale` — as evidence when a decision was informed by one
  of these principles rather than research data; still name it as
  "principle-based reasoning," not user research, in the evidence
  section.
- `audit`'s heuristic pass (`references/heuristic-pass.md`)
  — these complement Nielsen's heuristics rather than replacing them.
- Visual craft (focal point, 60–30–10, type pairing, …) is **not** this
  file — use `references/shared/ui-craft-rules.md`.

## Never do this

- Never cite a law as if it were user research evidence specific to
  the company's users — it's a general cognitive-science principle, label it
  as such
- Never stack all nine as a checklist against every screen — cite the
  1–2 that are actually diagnostic for the specific issue found
- Never use Fitts's Law alone to justify an oversized button without
  weighing visual hierarchy and spacing
