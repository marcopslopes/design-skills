# Ethical design check (advisory)

A shared reference for checking whether a design or strategy could cause
harm, exclude people, or extract value in ways that only surface later —
`product-strategy`, `audit`, and `ux-pattern` all cite this rather than
each carrying their own copy. **Always advisory** — like
`ooux-failure-modes.md`, `interaction-laws.md`, and
`ui-craft-rules.md`, this never flips an
`audit` PASS to BLOCKED. It's a lens applied while thinking, not a new
gate.

---

## The three-dimension check

| Dimension | Question | Red flag |
|---|---|---|
| **Harm** | Could this cause harm to users, non-users, or communities — even unintentionally? | Dark patterns, addictive loops, data exploitation, exclusion of vulnerable populations |
| **Access** | Who benefits and who is excluded? Are we designing for the people who need this most, or only the most profitable segment? | Product only works well for affluent, tech-savvy, English-speaking, able-bodied users |
| **Sustainability** | Does this contribute to or extract from the broader ecosystem? What happens at scale? | Winner-take-all dynamics, dependency the product profits from, depletion of a shared resource |

**Access** overlaps with `research-artifacts` Mode 4 (ability spectrum)
but is broader — that mode covers permanent/temporary/situational
ability; this dimension also covers affordability, language, literacy,
and infrastructure access.

---

## Quick tests (pick what fits, don't run all five on every review)

| Test | How to run it | What it reveals |
|---|---|---|
| **Pre-mortem** | "It's a year from now and this has caused harm. What happened?" — brainstorm failure modes | Unintended consequences no one considered yet |
| **Worst-case user** | Name the most vulnerable person who might use this. Would the design still hold up for them? | Edge cases that become ethical issues at scale, not just usability gaps |
| **Misuse scenario** | "How could a bad actor exploit this?" — map abuse vectors | Manipulation, privacy, and security risks the happy-path design ignores |
| **Exclusion audit** | List who can't use the product and why (cost, language, infrastructure, literacy — not just ability) | Access barriers that limit both market and impact |
| **Incentive check** | "If this succeeds, what behavior does it incentivize over time?" | Whether success creates a healthy dynamic or an extractive one |

---

## Where this fires

- **`product-strategy`** — when defining a bet or opportunity, especially
  one involving growth loops, notifications, pricing, or anything that
  shapes user behavior at scale. Add at least one ethical consideration
  to the opportunity's assumptions, same posture as a leap-of-faith
  assumption `assumption-mapper` would flag.
- **`audit`** — advisory pass alongside OOUX (Check 6) and surface-vs-
  deeper (Check 7) when the surface has a growth mechanic, a dark-
  pattern-prone element (forced continuity, confirmshaming, disguised
  ads), or a consequential default.
- **`ux-pattern`** — critique mode, when a pattern nudges toward a
  business-favorable choice the user might not actually want (default
  opt-ins, pre-checked upsells, friction asymmetry between signing up
  and cancelling).

## When this does not fire

- Routine visual/copy/structure critique with no growth mechanic,
  consequential default, or scale dynamic in scope — don't force this
  onto every review.
- Don't use this to relitigate a business model decision that's already
  been made above the design team's authority — flag the concern once,
  named clearly, and move on; this is a lens, not a veto.

---

## Output format

When this check surfaces something, label it distinctly from a UX/OOUX
finding:

```markdown
[Ethical: Harm | Access | Sustainability] — [what you noticed] —
[who's affected] — [what a cheaper/fairer alternative could look like]
```

Same severity vocabulary as everywhere else in this harness — Major /
Minor / Note — and it goes through the same
`references/shared/project-debt-register.md` fix-or-log flow as any
other advisory finding. Never silently escalate it to BLOCKING, and
never silently drop it either.

---

## Never do this

- Never present this as a compliance/legal check — it's a design
  judgment lens, not a substitute for legal or trust & safety review
- Never run all five quick tests as a rote checklist on every review —
  pick the one or two that are actually live for this specific design
- Never use this to critique a competitor or an external product when
  the ask was to review the company's own work
- Never let an ethical finding block a PASS — advisory only, same as
  OOUX and surface-vs-deeper checks
