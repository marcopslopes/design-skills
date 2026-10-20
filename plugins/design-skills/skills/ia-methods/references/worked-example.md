# Worked example — card sort + tree test

Illustrative worked example, written for this harness — not a real project transcript.

## Scenario

A redesign of the service-category navigation needs both methods in
sequence: card sort to build the structure, tree test to validate it.

## Method 1 output — hybrid card sort

```markdown
## IA study — Service category navigation (Card sort)

**Method + sample:** Hybrid, 35 participants (10 moderated first to
validate the card set, then 25 unmoderated)
**Card set:** 28 cards derived from current primary/secondary nav and
filter list — includes 3 blank cards for missing categories

Card sort results:
| Card | Dominant category | Count | Contested? |
|---|---|---|---|
| "Deep leak check" | Plumbing & Bodywork | 29/35 | No |
| "Cupping therapy" | — | 14/35 Plumbing, 11/35 Alternative/Wellness | Yes — no dominant category |
| "Gel key cutting" | Screws | 33/35 | No |
| (blank card, participant-added) "Mobile / at-home services" | — | 6 participants added this independently | Missing-element signal |

**Recommendation:** "Cupping therapy" is genuinely contested — route to
a tree test with two label variants ("Plumbing & Bodywork" vs. a new
"Alternative & Wellness" category) rather than guessing. The
independently-added "mobile/at-home" card appeared unprompted from 6 of
35 participants — strong enough signal to propose as a new top-level
filter, not just a tag.
```

## Method 2 output — tree test on the contested label

```markdown
## IA study — Cupping therapy placement (Tree test)

**Method + sample:** Unmoderated, 60 participants, two tree variants
(A: cupping under "Plumbing & Bodywork", B: cupping under new
"Alternative & Wellness" category)

Tree test results:
| Task | Success % | Time on task | Directness % | Read |
|---|---|---|---|---|
| Variant A: "See if there's a therapist offering cupping" | 58% | 42s | 39% | Low/Low — real label problem, participants wandered before finding it or gave up |
| Variant B: same task, new category | 81% | 24s | 74% | High/High — working, use as benchmark |

**Recommendation:** Ship the new "Alternative & Wellness" top-level
category rather than nesting cupping under Plumbing & Bodywork — variant
B's directness score alone (74% vs. 39%) confirms this isn't just a
"technically findable" pass, it's an actual fix.
```

## What changed once this ran

Without the tree test, the team would have shipped based on the card
sort's raw placement count alone (29/35 chose Plumbing & Bodywork) and
missed that a meaningful minority had a completely different mental
model that, once tested head-to-head, actually performed better.
