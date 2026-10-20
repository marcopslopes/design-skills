---
name: benchmark
description: >-
  Scored gap analysis comparing the company's own existing implementation of a
  flow against best-in-class examples — a judgment call, not a reference
  pull. Triggers on: "how does our X compare", "benchmark our Y", "is our Z
  any good compared to what's out there". Pulls comparison points via
  `competitor-scan` (named competitors) and/or Mobbin/web (general best
  practice), scores against an explicit rubric, and cross-checks every
  flagged gap against `COMPANY-PATTERNS.md` /
  `COMPANY-ARCHETYPES.md` before calling it a gap — deliberate
  the company differences are named as such, never "fixed." Never fires
  automatically; explicit request only.
---

# Benchmark

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Compares a real the company screen/flow against best-in-class examples and
produces a scored gap analysis — what we do well, what's genuinely behind,
and what looks like a gap but is actually a documented, intentional the company
choice.

**Invoke in Cursor:** `Use the benchmark skill` or `/benchmark`

---

## Scope boundary — read this before anything else

- **Fires on:** "how does our X compare," "benchmark our Y," "is our Z any
  good compared to what's out there" — an explicit, requested audit against
  external reference points.
- **Does not fire automatically.** Not on every `ui-agent` build, not as
  part of the `audit` chain, not because a screen happens to resemble a
  competitor's. Someone has to actually ask for this.
- **Does not do the reference pull itself when a named competitor is in
  scope** — calls `../competitor-scan/SKILL.md` for that half
  and uses its output as one input among the 2–3 comparison points, rather
  than re-deriving competitor detail from scratch.
- **Does not recommend copying a competitor's exact UI or copy** — same
  copyright discipline as `competitor-scan` (§ Copyright rules there
  applies here too, since this skill's output can quote or lean on that
  skill's findings).
- **Does not flag a documented, intentional the company difference as a gap.**
  This is the single most important rule in this file — see § The
  intentional-difference check below.

---

## Process

### 1. Identify the real the company screen/flow

Name the actual thing being benchmarked — an existing Design Harness prototype
under `src/design-harness/pages/` or `projects/<slug>/screens/`, or a production
reference if one's cited. Never benchmark a hypothetical or an idea that
hasn't been built — if nothing exists yet, that's a `design-kickoff`
question, not a `benchmark` one.

### 2. Pull 2–3 comparison points

- **A specific competitor is relevant** → call `competitor-scan` for that
  competitor + the matching feature/flow. Use its factual output as one
  comparison point — don't re-fetch or re-describe what it already
  produced.
- **No specific competitor named, or the ask is about general best
  practice** → go to Mobbin (only if it happens to be connected — entirely
  optional, see `competitor-scan`'s § MCP usage for the same check; this
  skill inherits that logic rather than duplicating it) or web search
  directly for 2–3 strong, named examples. Web search alone is a fully
  valid path here, not a downgrade to disclaim at length. Don't invent an
  anonymous "industry standard" — name who you're comparing against, every
  time.
- **2–3 points, not one and not ten.** One comparison point is anecdote;
  ten is a research-agent sweep this skill isn't scoped for. If good
  material only turns up for 1, say so and note the gap analysis is
  thinner than usual rather than padding it with a weak fourth example.

### 3. Score against the rubric

Use this rubric unless the request specifies a different one. Score each
dimension `strong` / `adequate` / `behind` — never a vague "good/bad":

| Dimension | What it measures |
|---|---|
| **Clarity** | Can a first-time user tell what to do next without hunting? |
| **Speed-to-complete** | How many steps/taps/decisions to get through the flow? |
| **Visual polish** | Does it look finished and considered, or rough/inconsistent? |
| **Accessibility** | Keyboard/screen-reader reachable, labeled, focus-visible — same bar as `../accessibility/SKILL.md` |

Score the company's screen and each comparison point on the same four
dimensions, side by side — a table, not prose paragraphs, so the comparison
is scannable.

### 4. The intentional-difference check (mandatory, before writing any gap)

**Before writing any single line under "what's genuinely behind," check it
against `COMPANY-PATTERNS.md` and `COMPANY-ARCHETYPES.md`
first.** If what looks like a shortfall is actually a documented the company
choice, it does not go in the gaps list — it goes in its own
"intentionally different" section, with the specific document and passage
that justifies it.

Known patterns already documented that commonly get mistaken for gaps —
**check these first**, and treat this list as a starting point, not
exhaustive (always check the source files directly for anything not listed
here):

- **Custom-styled WhatsApp/channel-specific share buttons** —
  `COMPANY-PATTERNS.md` § Button hierarchy in CTAs documents that
  WhatsApp "gets its own styled button in most prototypes (green or
  outline) — not a standard `ds Button`." A benchmark that flags this as a
  design-system inconsistency against a competitor's uniformly-styled share
  buttons is wrong — it's a named, intentional exception, not drift.
- **Restrained "get more bookings" messaging for archetypes
  that want less exposure** — `COMPANY-ARCHETYPES.md` § Anti-pattern
  documents which providers want *less* accessibility and
  *more* control, not more visibility. If the company screen being
  benchmarked targets that archetype and a competitor pushes acquisition
  messaging harder, that's not a gap to close — it would be actively wrong
  for that archetype.
- **`role="status"` (not `role="alert"`) for copy-confirmation feedback** —
  documented in `COMPANY-PATTERNS.md` § Copy-to-clipboard feedback
  pattern. A competitor using a more urgent-feeling confirmation pattern
  isn't automatically "ahead" here.
- **Modal × close vs. push ‹ back distinction** — documented in
  `COMPANY-PATTERNS.md` § Modal and sheet patterns. A competitor
  collapsing this distinction is not a reason to collapse it in the company's
  pattern.

**If a flagged item isn't covered by an existing documented pattern**, it's
a real, reportable gap — don't invent a justification for it. The rule is
"cross-check first," not "assume everything is intentional."

### 5. Write the output

See § Output format below. Every gap must survive the intentional-
difference check before it appears in the gaps section.

### 6. Persist to a task folder if — and only if — one is actually in play

Same rule `competitor-scan` follows, per `harness/ORCHESTRATOR.md` §5's
state rules: if this benchmark is part of an existing `projects/<slug>/`
(the screen being benchmarked already has a project folder, or the
designer named/opened one for this request), append the full output
verbatim to that project's `findings.md`, dated and named `benchmark`. If
the screen being benchmarked has **no** project folder — most of
`src/design-harness/pages/` doesn't (see `projects/README.md` § Prototype
screens) — this skill does **not** create one just to have somewhere to
write. Answer in chat only in that case. Never let the absence of a task
folder become a reason to skip or shorten the analysis itself.

## Output format

```markdown
## Benchmark — [our screen/flow] vs. [comparison points]

**Our reference:** [file path or production link]
**Comparison points:** [Competitor A via competitor-scan] · [Competitor B
via Mobbin/web] · [general best-practice example, if used]

### Score

| Dimension | the company | [Comparison A] | [Comparison B] |
|---|---|---|---|
| Clarity | strong/adequate/behind | ... | ... |
| Speed-to-complete | ... | ... | ... |
| Visual polish | ... | ... | ... |
| Accessibility | ... | ... | ... |

### What the company does well

- [Specific, evidenced strength]

### What's genuinely behind

- [Specific gap — survived the intentional-difference check]

### Intentionally different, not a gap

- [Thing that looked like a gap] — **not flagged as a gap.**
  Per `COMPANY-PATTERNS.md` § [section] / `context/COMPANY-ARCHETYPES.md` § [section]: "[the actual documented passage]." [One
  sentence on why this makes the apparent gap intentional.]

### Not a recommendation to copy

Comparison points are factual reference (via `competitor-scan` and/or
direct Mobbin/web lookup), not a directive to reproduce their UI or copy.
```

---

## Never do this

- Never fire without an explicit request.
- Never pull competitor detail from scratch when `competitor-scan` should
  own that half — call it, don't duplicate it.
- Never score with a vague "good/bad" — use the four-dimension rubric (or
  the requester's own, if one was specified) every time.
- Never flag an intentional the company difference as a gap without checking
  `COMPANY-PATTERNS.md` and `COMPANY-ARCHETYPES.md` first —
  and never claim something is "intentionally different" without citing
  the actual passage that says so. A guess dressed up as a citation is
  worse than an honest gap.
- Never recommend copying a competitor's exact UI, copy, or brand assets.
- Never merge a Mobbin screenshot or export into a prototype — reference
  only, same rule as `competitor-scan`.

---

## Related files

| File | Role |
|---|---|
| `../competitor-scan/SKILL.md` | Owns the named-competitor reference pull this skill calls into rather than re-deriving |
| `COMPANY-PATTERNS.md` | Mandatory cross-check before flagging any gap — documented interaction conventions and named exceptions |
| `COMPANY-ARCHETYPES.md` | Mandatory cross-check before flagging any gap — archetype-driven intentional differences |
| `../accessibility/SKILL.md` | Same accessibility bar used for this skill's Accessibility rubric dimension |
| `../ux-pattern/SKILL.md` | Structure/archetype-fit review without the external comparison — use when there's no "compare to X" ask |
| `harness/ORCHESTRATOR.md` §2 | Routing table entry |
