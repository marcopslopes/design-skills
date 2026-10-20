---
name: audit
description: >-
  The mandatory final gate before sharing any prototype or
  component — scans design-system violations, accessibility failures,
  off-brand copy, house pattern conformance, and global UX craft quality
  across every file touched this session, then (on PASS) prompts to push
  changes to the shared GitHub remote so other designers' clones stay in
  sync. Triggers on: "run the audit", "check before sharing", "is this
  ready to share", or automatically as the last step of any build chain.
  For a standalone deep dive on just one area, see `accessibility` or
  `content` instead. For *pre-write* token checks and stylesheet layer
  rules (while building), see `design-system` — this skill remains the
  reactive post-build gate. For craft review of a git diff/branch
  (introduced vs regression), see `interface-change-review` — that is
  not a share PASS/BLOCK.
---

# Audit Skill

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Run this before sharing any prototype or component with a teammate, PM, or engineer. It scans for design system violations, accessibility failures, off-brand copy, house pattern conformance, and global UX craft quality. Nothing should leave the sandbox with a blocker still open.

**How to invoke:** At the end of a build session, tell the agent: "Run the audit skill on this file" or simply `/audit`.

---

## Artifact type + framing (required first)

Before Checks 1–8, classify the target per
`references/shared/artifact-type-critique.md`.

- **Design Harness prototype** (this skill’s normal path) — full Checks 1–8; lab /
  pre-share tone.
- **Figma-only / no code** — do **not** run this skill as a DS token gate;
  redirect to design-critique / `figma-ux-audit` (exploratory).
- **Live production screenshot alone** — do **not** invent DS line findings
  from pixels; if they asked `audit` on live UI with no repo files, say so and
  run design-critique with **live-impact framing**, or ask them to point at
  the Design Harness files.
- **Competitor / external** — mismatch redirect; do not house-audit their UI.

Obvious Design Harness build close → no AskQuestion. Ambiguous → AskQuestion per
the reference.

---

## Two layers (required on every report)

Same labeling system as `../figma-ux-audit/SKILL.md` and
`harness/agents/product-designer.md` — one convention, not three.

| Layer | Label | Severity in this skill |
|---|---|---|
| House standards | `[House: <source> — <rule>]` plus the existing flag codes (`[DS-*]`, `[A11Y-*]`, `[COPY-*]`, `[PATTERN-*]`) | Checks 1–2 **BLOCKING**; Checks 3–4 **ADVISORY** |
| Global UX craft | `[UX Heuristic: <name>]` | Check 5 — **ADVISORY** (even when strong). Craft is judgment-based; do not promote craft-only findings to BLOCKING. |
| Heuristic pass | `[UX Heuristic: <name>]` (H1–H10 / cognitive load / walkthrough) | Check **5b** — **ADVISORY**. See `references/heuristic-pass.md`. Never flips PASS→BLOCKED. |

**Advisory severity (Checks 3–5 / 5b only):** tag each advisory **Major**, **Minor**, or **Note** alongside the two-layer label. These tags do **not** change PASS/BLOCKED — the share gate stays DS + a11y-in-code blockers only. Major = significant degradation; Minor = deferrable with tracking; Note = observation / future polish.

Neither layer replaces the other. If a finding is both a house violation and
craft-questionable, report the house item under Checks 1–4 (harder call) and
optionally a separate Check 5 note — do not blend into one undifferentiated
line, and do not let craft soften a house blocker.

**If this audit is being combined with a separate written `ux-pattern`/
`content` critique on the same deliverable** (not a routine standalone
`/audit` run), run both as isolated passes — see
`references/shared/critique-isolation.md` before starting. Skipping
isolation and reporting as if it happened is worse than flagging it
degraded.

---

## What you audit

Read every file that was created or modified in this session. Run Checks 1–8
in sequence. Report results at the end.

---

## Check 1 — Design System Validator (BLOCKING)

Look for anything that bypasses `context/design-system/tokens.css` or `context/design-system/ds/`.

### Mechanical pre-check (run first, on any touched `.css` file)

Before manually scanning colour/spacing/radius/border-width/font-size
values by eye, run the deterministic detector:

```bash
npm run design:detect -- <touched .css file(s)>
```

This is `scripts/design-detector` — see its `README.md` for full scope.
It answers one narrow, mechanical question with no LLM judgment: does a
token already exist for this raw value. Use its output as the primary
source for the two subsections below, not a duplicate of your own
reasoning.

**The exit code is authoritative, not advisory.** Exit `2` (findings
present) on any touched `.css` file means this audit **cannot** report
PASS for that file until every finding is resolved on disk (fixed, or a
genuinely new gap with a human-approved token added) — do not use
judgment to downgrade a detector finding to advisory, and do not
paraphrase the result. Quote the actual command and its exit code in
the audit report's evidence (see Output format). This mirrors the local
`pre-commit` hook (`scripts/git-hooks/pre-commit.mjs`, installed via
`npm install`'s `prepare` script) that already blocks a commit on the
same exit code for staged files — this check is the same wall, run
across every file touched this session rather than only staged ones, so
neither surface can be the one place a raw value quietly gets through.

- `TOKEN-RAW` findings → flag as `[DS-COLOUR]` / `[DS-SPACING]` /
  `[DS-RADIUS]` exactly as the tool suggests (`use var(--x)`) — mechanical,
  don't re-derive by eye.
- `TOKEN-GAP` findings → flag the same way, but note it's a real gap (no
  matching token), not just a missed `var()` — same human-gate language
  as `references/from-design-system/token-check.md`.
- `TOKEN-INVALID` (font-weight) findings → flag as `[DS-SPACING]`-style,
  citing the weights the tool reports as actually defined.

**The tool does not replace this check for what it doesn't cover**:
inline `style={{ }}` props, invented components/icons, `.tsx` files, and
prototype dark-mode — those subsections below still run by eye, same as
always. If the detector errors or `tokens.css`/config can't be found,
say so and continue with the manual scan — never block the audit on it.

### Hard-coded colour values

Flag any colour value written as a literal — not as a CSS variable:

- Hex values: `#00a1cf`, `#003746`, `#afafaf`, any `#rrggbb` or `#rgb`
- RGB/RGBA literals: `rgb(0, 161, 207)`, `rgba(0,0,0,0.5)`
- HSL literals
- Named colours: `teal`, `black`, `white` (outside of `tokens.css` itself)

**Exception:** `transparent`, `currentColor`, and `inherit` are allowed. Colour values inside `context/design-system/tokens.css` itself are allowed — that's where they're defined.

**Flag as:** `[DS-COLOUR]` — replace with the appropriate `--color-*` token from `context/design-system/tokens.css`.

### Hard-coded spacing / size values

Flag any pixel, rem, or em value written as a literal in a component style or inline style:

- `padding: 16px` → should be `padding: var(--spacing-05)`
- `gap: 8px` → should be `gap: var(--spacing-03)`
- `border-radius: 8px` → should be `border-radius: var(--radius-02)`
- `font-size: 14px` → should be `font-size: var(--font-size-label)`

**Exception:** Values inside `context/design-system/tokens.css` itself. Values of `0` (zero needs no token). `1px` used directly for a single-pixel border when `var(--border-01)` is also `1px` — flag it anyway, consistency matters.

**Flag as:** `[DS-SPACING]` or `[DS-RADIUS]` — replace with the nearest token.

### Invented components

Flag any UI element that replicates functionality already in `context/design-system/ds/` but is built from scratch instead:

- A `<div>` styled to look like a button when `<Button>` exists
- A custom text element with hardcoded font styles when `<Text>` exists
- A custom card/panel with hardcoded border and padding when `<Card>` exists

**Flag as:** `[DS-COMPONENT]` — use the `context/design-system/ds` primitive instead.

### Inline styles

Flag any `style={{ }}` prop on a component that sets colour, spacing, or typography. Inline styles bypass the token system and are not overridable by theme.

**Exception:** Dynamic values that genuinely can't be expressed as a CSS variable (e.g. a calculated width from state). These must be commented explaining why.

**Flag as:** `[DS-INLINE]`

### Invented icons

Flag any hand-drawn inline `<svg>` icon markup, or any icon imported from a source other than `@tabler/icons-react`, used instead of the `Icon` primitive:

- A raw `<svg><path d="..." /></svg>` icon block instead of `<Icon icon={IconX} />`
- An icon pulled from a different package (`react-icons`, `heroicons`, a copy-pasted asset) when a conceptually close Tabler icon exists

**Exception:** `context/design-system/ds/Icon.tsx` itself, and brand/logo marks that are explicitly out of `icon-usage`'s scope (never hand-drawn either — see `../ui-agent/SKILL.md` "Never do this").

**Flag as:** `[DS-ICON]` — replace with `<Icon icon={IconX} size="..." />` via `@tabler/icons-react`; see `../icon-usage/SKILL.md` for picking the closest match.

### Prototype dark mode

Production apps here have no dark mode (see `harness/ORCHESTRATOR.md` §7.1 / `COMPANY-BUSINESS.md` for your org's actual policy). Flag any prototype screen that invents a dark theme, dark-only product chrome, or a theme toggle inside product UI. Design Harness lab chrome may be dark; playground prototypes must render light Foundations/DS tokens via `.design-harness-proto-surface`.

**Flag as:** `[DS-PROTO-THEME]` — remove dark product UI; keep light mode only.

---

## Check 2 — Accessibility Checker (BLOCKING)

Look for failures that would prevent a screen reader user or keyboard user from operating the interface.

### Buttons and interactive elements

- Every `<button>` must have either visible text content OR an `aria-label`. Flag any button that has only an icon and no label.
- Every `<a>` link must have descriptive text — not "click here" or "read more".
- Flag any `<div onClick>` or `<span onClick>` — use a real `<button>` or `<a>` instead.

**Flag as:** `[A11Y-LABEL]`

### Images

- Every `<img>` must have an `alt` attribute.
- Decorative images (heroes, mood photos, illustrations): `alt=""`
- Informational images (charts, screenshots, content images): `alt="description of what it shows"`
- Never `alt="image"` or `alt="photo"` — these are meaningless.

**Flag as:** `[A11Y-IMG]`

### SVG icons

Every inline SVG must have both:
```tsx
aria-hidden
focusable="false"
```
If the SVG is the only content of an interactive element (icon button), the parent element needs the `aria-label` — not the SVG.

**Flag as:** `[A11Y-SVG]`

### Dialogs and modals

Every modal must have:
```tsx
role="dialog"
aria-modal="true"
aria-labelledby={titleId}  // pointing to the modal's heading
```

**Flag as:** `[A11Y-DIALOG]`

### Form inputs

Every `<input>`, `<textarea>`, and `<select>` must have an associated `<label>`:
- Either `<label htmlFor={id}>` + `id` on the input
- Or `aria-label` directly on the input
- Or `aria-labelledby` pointing to a visible label element

`placeholder` text alone is not a label — it disappears when the user types.

**Flag as:** `[A11Y-LABEL]`

### Feedback / live regions

- Clipboard copy confirmations: must use `role="status"` (non-urgent, polite)
- Error messages that appear after an action: must use `role="alert"` (urgent, assertive)
- Never suppress these with CSS `display: none` — render them conditionally instead

**Flag as:** `[A11Y-LIVE]`

### Focus styles

Flag any CSS that removes focus styles without replacing them:
```css
/* These are violations: */
outline: none;
outline: 0;
:focus { outline: none }

/* This is acceptable if a custom focus style is provided: */
:focus-visible { outline: 2px solid var(--color-border-focus); }
```

**Flag as:** `[A11Y-FOCUS]`

### POUR pass (same session files)

After the markup rules above, walk
`references/a11y-pour-checklist.md` for the files touched this session.

- **BLOCKING** only when a POUR row fails **with code evidence** and maps to
  an existing `[A11Y-*]` flag (or equivalent clear violation).
- **runtime/manual** rows (contrast render, 200% zoom, tab order in browser):
  list under `### Check 2 — POUR coverage` — do not BLOCK without proof.
  **Proof:** a `live-page-review` capture from this session (`a11y-tree.txt` /
  `dom.html` / `VERIFIED_VIOLATIONS`) counts. Without a capture, leave
  runtime rows unblocked. Do not invent browser behaviour from source alone.
- Other POUR gaps → **advisory** (Major/Minor) with `[House: a11y — …]` or
  note in POUR summary; optional tag `[A11Y-POUR]` if not already covered.

Do not duplicate findings already listed as BLOCKING above.

---

## Check 3 — Content Reviewer (ADVISORY)

Look for copy that sounds generic, off-brand, or violates house writing rules. These are advisory — flag them but don't block. The designer decides.

### Exclamation marks

Flag any exclamation mark that isn't attached to a genuine milestone (first booking, first payment received, referral reward earned).

- `"Your profile is live!"` → flag (routine action)
- `"Your first booking is in!"` → acceptable (genuine milestone)

**Flag as:** `[COPY-EXCLAIM]`

### Emoji in product copy

Flag any emoji in UI text, button labels, notification copy, or error messages.

**Flag as:** `[COPY-EMOJI]`

### Off-brand vocabulary

Flag these specific words/phrases when used in provider-facing copy:

| Found | Preferred | Flag |
|-------|-----------|------|
| "customer" | "client" | `[COPY-VOCAB]` |
| "appointment" (as default) | "booking" | `[COPY-VOCAB]` |
| "user" (for provider's clients) | "client" | `[COPY-VOCAB]` |
| "Manage" as CTA verb | specific action verb | `[COPY-VOCAB]` |
| "business owner", "merchant" | "provider" | `[COPY-VOCAB]` |
| "discount", "cash back" (for referral reward) | "reward", "gift card" | `[COPY-VOCAB]` |

### Generic SaaS phrases

Flag copy that could appear in any SaaS product — it has no house specificity:

- "Unlock your potential"
- "Revolutionize your workflow"
- "Seamless experience"
- "Leverage your data"
- "Maximize your synergy"
- "Take your business to the next level"

**Flag as:** `[COPY-GENERIC]`

### Title case in body copy

Flag any sentence that uses Title Case where Sentence case is expected. House style uses sentence case everywhere except product names (see `COMPANY-VOICE.md` / `COMPANY-STYLE-GUIDE.md`, org-pack, for your org's actual rule).

- `"Add Your Photos"` → flag
- `"Add your photos"` → correct
- `"Northline Holds"` → correct (product name)

**Flag as:** `[COPY-CASE]`

### Missing next action in notifications / insights

Flag any notification or insight copy that states a fact without giving the provider a next action:

- `"Your rebooking rate is low."` → flag (no next action)
- `"5 clients are overdue for a follow-up. Start a campaign."` → correct

**Flag as:** `[COPY-ACTION]`

---

## Check 4 — House Pattern Conformance (ADVISORY)

Look for output that follows correct tokens/components/a11y but still doesn't *behave* like your product — layout, flow, or positioning choices with no basis in documented house interaction conventions. These are advisory, same as Check 3 — a genuine judgment call the designer makes, not a blocker. This check exists because Checks 1–2 catch wrong *materials* (raw hex, missing `aria-label`) but not wrong *shape* (a pattern that's internally consistent but generic, or one this repo has already named and rejected).

### Reintroducing a documented anti-pattern

`COMPANY-PATTERNS.md` § "Known anti-patterns" documents known, already-rejected problems (the example pack ships four invented ones; your real pack replaces them). Flag any new flow that repeats one:

- A fee or deposit the client only learns about after booking (the surprise charge)
- A feature that only works once the provider finds a buried setting, with no prompt where the need arises (settings as storage)
- A quick path that looks as valid as the proper path but silently skips something needed later (two roads, one hidden cost)
- A greyed-out feature with no reason or way to unlock it (locked with no reason)

**Flag as:** `[PATTERN-ANTIPATTERN]` — name which of the four it matches and point to the alternative the flow should take instead.

### Value prop mismatched to archetype

`COMPANY-ARCHETYPES.md` § "Anti-pattern to flag" flags "more visibility / more bookings" messaging pushed at a provider who doesn't want it. Flag any screen that leads with acquisition/visibility framing (e.g. "get discovered", "boost your bookings") without the screen's target archetype being named, or where the named archetype is Elite/Sustainer (who want less exposure and more control, not more bookings).

**Flag as:** `[PATTERN-ARCHETYPE]` — ask which archetype this is for; if it wants less exposure (e.g. Waitlist Guardian in the example pack), the value prop likely needs to flip to control and time-protection framing.

### Layout or navigation pattern with no basis in `COMPANY-PATTERNS.md`

Flag a structural choice (modal vs. push, sheet vs. page, button hierarchy, stack gaps, step lists, feedback pattern) that matches nothing documented in `COMPANY-PATTERNS.md` — a sign the flow was assembled from generic instinct rather than an existing house convention.

**Before flagging, check `COMPANY-PATTERNS.md` § "Open gaps" first.** If the choice falls in an area that file already lists as an open gap (navigation IA, form validation timing, loading states, drawer vs. modal decision rule), do **not** flag it — that's an honestly-undocumented area, not drift. Only flag when the pattern *contradicts* something the file does document (e.g. a back chevron on a fully-dismissible modal, `<ul>` for numbered steps, `role="alert"` on a routine copy confirmation — these overlap with Checks 1–2 in some cases and should be flagged once, under whichever check is more specific).

**Flag as:** `[PATTERN-DRIFT]` — name the documented convention it should follow instead, with a `COMPANY-PATTERNS.md` section reference.

When reporting Checks 3–4, prefix with the House-layer label, e.g.
`[House: content — max 1 !/screen] [COPY-EXCLAIM] …` or
`[House: patterns — anti-pattern #3] [PATTERN-ANTIPATTERN] …`.
Checks 1–2 use `[House: tokens|ds|a11y — …]` alongside the existing code.

---

## Check 5 — Global UX craft (ADVISORY)

Does the **built result** hold up as design quality — not only “uses the right
tokens”? This is senior craft judgment (15+ years framing), **not** a rigid
checklist that pretends to be objective. Write specific, reasoned findings
with a clear *why*, same tone as a good design-critique pass.

Look for issues such as (prompts, not a pass/fail rubric):

- Primary action unclear, competing, or buried below the fold when the task is single-purpose
- Weak visual hierarchy — eye lands on chrome or secondary content first
- Affordance ambiguity — looks tappable but isn’t, or vice versa
- Inconsistent interaction within the same flow (same action, different treatment)
- Spacing / type rhythm that is token-correct but still cramped, sparse, or uneven to the eye
- Missing or awkward empty / loading / error states that leave the user stranded
- Density or noise that hurts scanability on a phone frame

**Flag as:** `[UX Heuristic: <name>]` — e.g. `[UX Heuristic: Visual hierarchy]`,
`[UX Heuristic: Affordance]`, `[UX Heuristic: Consistency]`. Always ADVISORY.
Severe craft issues stay ADVISORY unless they also trip a Check 1–2 blocker
(then the blocker is House/technical finding).

Do **not** pad this section with vague filler to look complete. If craft is
genuinely strong, say so in one line under Check 5 and move on.

---

## Check 5b — Heuristic pass (ADVISORY)

Usability lens: Nielsen H1–H10 + cognitive-load checklist + one-task
cognitive walkthrough. Distinct from Check 5 craft judgment and from
Check 2 a11y.

Follow **`references/heuristic-pass.md`** in full:

1. Name **one** key task (`brief.md` or obvious screen purpose).
2. Compact H1–H10 table (Pass / Fail / N/A).
3. Cognitive-load checklist (Low / Moderate / High) when the surface has
   choices or dense chrome; skip with one line on single-purpose reads.
4. Four-question walkthrough on that task (+ one error/dismiss path if relevant).

**Always ADVISORY** (Major / Minor / Note). H1/H3-class issues go in **First look**
as Major advisories — they do **not** flip PASS → BLOCKED unless Check 1–2
already blocks. Skip only when no key task can be named (one-line skip note).

Do not duplicate Check 5 craft lines; if a hierarchy issue is already under
Check 5, Check 5b cites H8 only when the usability angle adds something new.
Named visual-craft findings (focal point, 60–30–10, scan path) cite
`references/shared/ui-craft-rules.md` — complement, never a second table.

---

## Check 6 — Object failure modes (ADVISORY)

Load **`references/shared/ooux-failure-modes.md`**. Look at the built
screens (not only the object-model file) for shapeshifter / masked /
broken / isolated objects.

**Always ADVISORY** (Major / Minor / Note). Label
`[UX Heuristic: Consistency]` or `[House: conceptual-model — <mode>]`.
Never flips PASS → BLOCKED. Never recommend a token/colour tweak as the
fix.

If `projects/<slug>/conceptual-model.md` is missing and the UI is arguing
"is this one thing or two," say so and offer `conceptual-model` — don't
invent the object model inside this audit.

Skip with one line when the surface has no repeating objects (a single
static marketing block, a token-only tweak).

---

## Check 7 — Surface fix vs deeper layer (ADVISORY)

For **each** Check 3–6 advisory (not Check 1–2 blockers — those are
house/technical on this file), tag the layer the fix actually lives on:

| Tag | Meaning | Primary next skill (don't paint) |
|-----|---------|----------------------------------|
| `[Layer: surface]` | Copy, hierarchy, affordance, tokens already in this file | Stay in `audit` / `ui-agent` / `content` |
| `[Layer: interaction]` | States, flow, missing link between objects | `interaction-design` / breadboarding / `ui-agent` |
| `[Layer: objects]` | Vocabulary, one-vs-two things, deletion/history | `conceptual-model` |
| `[Layer: jobs]` | Wrong or missing job; screen solves a feature not a job | `research-artifacts` Mode 5 |
| `[Layer: strategy]` | No outcome / bet; "we built it because someone said so" | `product-strategy` |
| `[Layer: unknown]` | Can't tell which layer is weak | `diagnostic` |

If the finding is **not** `[Layer: surface]`, the first recommended action
must be the deeper skill — not a CSS/spacing change. One line in
**First look** when several advisories are symptoms of one deeper layer.

Do **not** pad this section. If everything is honestly surface, say so in
one line and move on.

---

## Check 8 — Ethical design (ADVISORY, conditional)

**Only fires** when the surface has a growth mechanic (referral loop,
streaks, notifications tuned for re-engagement), a dark-pattern-prone
element (forced continuity, confirmshaming, disguised ads, pre-checked
upsells), or a consequential default (auto-renew, data sharing opt-out
instead of opt-in). **Skip silently** on routine screens with none of
these — don't force this check onto every audit.

Load **`references/shared/ethical-design-check.md`**. Check the three
dimensions (harm / access / sustainability) against what's actually
built, not the abstract feature.

**Always ADVISORY** (Major / Minor / Note). Label `[Ethical: Harm | Access
| Sustainability]`. Never flips PASS → BLOCKED — this is a lens, not a
compliance gate, and it never the-company-critiques a business-model
decision made above the design team's authority.

---

## Output format

Report findings in this format:

```
## Audit report — [filename] — [date]

**Artifact:** Design Harness prototype | live production (n/a for code audit) | …
**Framing:** lab / pre-share

### First look

[One short paragraph: what a senior designer notices first on a single look.
Name the primary problem. If several advisories below are symptoms of one
root (e.g. dual offer + badge hierarchy + twin primaries = primary-intent
competition), say that connection here. Specific — no filler.]

### BLOCKING issues (House / technical)

[House: tokens — colour] [DS-COLOUR] Line 47: `color: #00a1cf` — replace with `var(--color-surface-brand)`
[House: a11y — label] [A11Y-LABEL] Line 112: `<button><IconClose /></button>` — add `aria-label="Close dialog"`
[House: a11y — svg] [A11Y-SVG] Line 88: SVG missing `aria-hidden focusable="false"`

### ADVISORY issues — House standards

[House: content — max 1 !/screen] [COPY-EXCLAIM] Line 203: "Your link is ready!" — remove exclamation mark
[House: content — vocab] [COPY-VOCAB] Line 218: "customer" — use "client"
[House: patterns — anti-pattern #3] [PATTERN-ANTIPATTERN] Line 140: manual "record a cash payment" button skips saving the client's card with no warning — matches "two roads, one hidden cost" anti-pattern (COMPANY-PATTERNS.md § Known anti-patterns #3)

### ADVISORY issues — Global UX craft

[UX Heuristic: Visual hierarchy] Primary CTA competes with a dense stats strip above the fold — eye lands on numbers first; demote or move secondary metrics.
[UX Heuristic: Affordance] Dismiss control reads as decorative chrome — increase hit clarity or pair with an explicit “Not now” text action.

### Check 5b — Heuristic pass (advisory)

**Key task:** Provider shares referral link from profile.

| # | Heuristic | Verdict | Evidence |
|---|-----------|---------|----------|
| H1 | Visibility of system status | Pass | |
| H3 | User control and freedom | Fail | No dismiss on banner — trapped until CTA |
| H8 | Aesthetic and minimalist design | Fail | Dual full-width primaries compete |
| … | (other rows Pass / N/A) | | |

**Walkthrough:** Step 1 share intent — secondary booking CTA equally weighted → finding below.

- [UX Heuristic: User control and freedom] Major — …
- [UX Heuristic: Aesthetic and minimalist design] Minor — …

### Check 6 — Object failure modes (advisory)

- [House: conceptual-model — shapeshifter] Major `[Layer: objects]` — "Referral" is a person on the list and an action on the CTA. Run `conceptual-model` before restyling the row.

### Check 7 — Surface vs deeper (advisory)

Deeper-layer findings above already tagged. Surface-only remainder: 1 copy note.

### Check 8 — Ethical design (advisory)

[Ethical: Access] Minor — referral reward tier only pays out in-app credit, not cash; excludes providers who need liquidity now over a discount later. Flag as a business-model note, not a redesign ask.

or

All advisories are `[Layer: surface]` — no deeper-skill handoff.

### Result

BLOCKED — fix 3 blocking issues before sharing.

or

PASS — 2 house advisory + 1 craft + 2 heuristic (5b) advisory noted. Designer to review before sharing.
```

### Typed verdict (required, every run)

End every audit report with one fenced JSON block — a machine-checkable
verdict, not a restatement of the prose above. This is what
`scripts/verify-audit-verdict.mjs` validates, and what Step 3.4's
`skill-benchmarking.md` line should match field-for-field:

```json
{
  "verdict": "PASS",
  "blocking_count": 0,
  "advisory_count": 5,
  "categories": ["COPY-EXCLAIM", "UX Heuristic: Visual hierarchy"],
  "artifact_type": "studio_os_prototype",
  "detector_exit_code": 0
}
```

Allowed values — `verdict`: `PASS` or `BLOCKED` (never `PARTIAL`,
`MOSTLY_PASS`, or any other word — a verdict that isn't one of these two
is not a verdict, it's an escalation: stop and say so instead of
inventing a third state). `artifact_type`: `studio_os_prototype`,
`figma_only`, `live_production`, or `external` (matches the
classification step at the top of this skill). `detector_exit_code`:
the literal exit code from Check 1's mechanical pre-check, or `null` if
no `.css` file was touched this session. `blocking_count` must be `0`
whenever `verdict` is `PASS`, and `> 0` whenever it's `BLOCKED` — the two
fields must agree; if you catch yourself writing `PASS` with a non-zero
`blocking_count` "because the rest is fine," that is exactly the failure
class this block exists to catch. Validate before trusting your own
output: `echo '<the JSON above>' | node scripts/verify-audit-verdict.mjs`.

---

## Pass criteria

- **PASS:** Zero blocking issues. Advisory issues are noted and the designer decides.
- **BLOCKED:** One or more blocking issues. Fix them, then re-run the audit.

A BLOCKED prototype does not get shared — not with a PM, not with an engineer, not as a Design Harness link. The audit exists so that what leaves the sandbox always represents the system correctly.

---

## Step 3.25 — Project debt register (PASS only, open advisories)

Skip on **BLOCKED**. Skip when Checks 3–5 produced **no** open advisories.

When **PASS** and there are open advisories (Checks 3–5), follow
`references/shared/project-debt-register.md`:

1. List the open advisories in the audit report (already required).
2. **Ask once** via `AskQuestion`: fix now, log to `projects/<slug>/debt.md`, or not worth tracking (`Accepted` with rationale). Never auto-log without the designer's choice.
3. If **log_debt**: ensure `projects/<slug>/debt.md` exists (copy from `projects/_template/debt.md` if new). Append one **complete** row per deferred advisory (ID `DD-NNN`, all columns — no placeholders). Update the summary line (`Items` / `Open` / `Oldest`).
4. If **accept_not_tracking**: same table with **Status: Accepted** and explicit rationale — not silent deletion from `findings.md`.
5. **Never** append critique advisories to `KNOWN-ISSUES.md` — different scope (repo/DS structural debt only).

Note in the audit report under **### Project debt** what was logged, accepted, or fixed this session.

## Step 3.4 — Log to the skill-benchmarking history (every run, PASS or BLOCKED)

**The gap this closes:** `audit` produces a per-run pass/fail, but
nothing tracked whether a given skill's *output quality* was trending up
or down across many runs over time — see
`docs/HOWTO-SKILL-BENCHMARKING.md` for the full proposal. (Called
"skill-benchmarking," not "audit-history," to avoid colliding with this
skill's own name — and distinct from `../benchmark/SKILL.md`,
which is a competitor comparison, not a trend log.) This piggybacks on
data this skill already produces — no new instrumentation, no telemetry,
no CI.

Append one line to `harness/logs/skill-benchmarking.md` (append-only,
same shape as `harness/logs/routing-log.md`) for **every** run, before
Step 3.5's gallery check:

```
YYYY-MM-DD | <skill(s) that built this> | <task slug or —> | PASS/BLOCKED | <blocking count>/<advisory count> | <categories, e.g. DS-COLOUR, A11Y-LABEL>
```

Categories are the same bracket tags this skill's own checks already
use (`[DS-*]`, `[A11Y-*]`, `[COPY-*]`, `[PATTERN-*]`) — reuse them,
don't invent a parallel taxonomy. If zero issues, write `—` for
categories.

This is passive logging only — no rollup, no trend report, no dashboard
runs automatically. When a designer wants the trend (e.g. "is
`ui-agent` output getting cleaner since the `design-system` tightening"),
read `skill-benchmarking.md` directly and summarize the requested slice
on demand — same manual, no-CI trust model as `harness-audit`.

---

## Step 3.5 — Team Gallery check (only on PASS, only if gallery-eligible)

Design Harness's Team Gallery (`#/gallery`) reads **projects** straight from each
committed `projects/<slug>/brief.md` at build time
(`src/design-harness/projectsIndex.ts` → `galleryData.ts`) — only the Ownership
and Case study summary fields, never `decisions.md`/`findings.md`/`log.md`.
**Designer profiles** (title / focusAreas / avatar) are the only gallery data
written by hand, in `src/design-harness/galleryData.ts`. There is no project
entry to copy.

**Primary enrichment** (title / focusAreas / avatar for a *new* designer)
should already have run at first eligibility via `task-intake` or
`design-kickoff` using `references/shared/gallery-card-enrichment.md`.
**This step is the safety net** — catch designers who became gallery-eligible
without that pass and backfill missing card fields. Run it here, before
Step 4's push, so any designer entry rides along in the *same* commit/push.

**Run this only on PASS** (skip entirely on BLOCKED — an unfinished
prototype doesn't belong in the gallery either).

1. Run `npm run -s harness:context -- <slug>` — its `Team Gallery:` line
   answers this step (shows, or the exact reason it doesn't) using the same
   parsing as Design Harness; use it rather than reading the brief by eye.
   Check this task's `projects/<slug>/brief.md` — does it have a `Designer:`
   resolved to a real name (not `UNKNOWN — flagged`), and `Gallery: visible`
   (not `hidden`)? If either is missing/unresolved/hidden, **skip silently**
   in the normal case — but if `Designer:` is `UNKNOWN`, say so in the audit
   report (e.g. "Team Gallery: skipped — Designer unresolved, see
   brief.md's Ownership section") so the gap has a visible reason on record,
   not silent absence. Never guess a name here to make the project appear.
   Also check the three Case study summary lines are filled — a brief
   missing any of them doesn't render in the gallery; say so in the report.
   **Never** read `designer-profile.local.md` for this step — gallery data is
   committed/shared; the local profile is never pushed.
2. If eligible, check `src/design-harness/galleryData.ts` for a `GalleryDesigner`
   whose `name` matches the brief's `Designer:` (case-insensitive — the
   gallery attaches projects by this match):
   - **New designer** (no matching entry) — run
     `references/shared/gallery-card-enrichment.md` **before** writing.
     - Enrichment OK → add the designer **on this first eligible project**
       (one project is enough). Include `title`, `focusAreas`, `avatarUrl`
       (from enrichment), `name` (same spelling as the brief), `slug`,
       optional `squad` from brief only (never invent from
       `COMPANY-SQUADS.md`), `projects: []`, and add `gallery/<slug>` to
       `GALLERY_DESIGNER_ROUTES`.
     - Enrichment FAIL → emit `[GALLERY-ENRICHMENT]`, **do not** add a blank
       or guessed card, leave unlisted. Note it in the audit report.
     **Never** add empty placeholder designer entries "for layout."
   - **Existing designer, incomplete card** — if `title` / `focusAreas` /
     `avatarUrl` are missing, run the same enrichment reference and backfill
     before finishing. On failure, flag `[GALLERY-ENRICHMENT]` and do not
     invent.
   - **Existing designer, complete card** — nothing to write; the project
     shows from its brief.
3. Report the outcome in the audit output, e.g.:
   ```
   ### Team Gallery
   `city-referral-leaderboard` shows under Jane Doe (from brief.md).
   ```
   or, if a designer was added: `Added designer Jane Doe — galleryData.ts + routes.ts updated.`
   or, if skipped: `Team Gallery: skipped — Gallery: hidden in brief.md.`
   or enrichment fail: `[GALLERY-ENRICHMENT] … Left unlisted.`

`GALLERY_DESIGNER_ROUTES` ↔ `galleryData.ts`'s designer slugs is still kept
in sync by hand.

---

## Step 4 — Prompt to sync with the shared remote (only on PASS)

This repo has no hosted/shared instance — every designer runs their own local clone (see `README.md`). The only thing keeping `projects/`, `harness/logs/routing-log.md`, and any guardrail edits (`CLAUDE.md`, `AGENTS.md`, `harness/skills/**`) in sync across designers is the shared GitHub remote (`marcopslopes/design-harness`, see `REPOSITORY-GUIDE.md`). Nothing pushes there automatically — so a PASSing audit is the point to ask.

**On PASS only** (never on BLOCKED — don't prompt to publish unfinished work):

1. Run `git status` to see what changed this session.
2. If there are uncommitted changes, tell the designer what would be pushed, distinguishing:
   - **Harness/system files** — `projects/<slug>/**`, `harness/logs/routing-log.md`, `CLAUDE.md`, `AGENTS.md`, `harness/skills/**` — these affect every other designer's clone once pushed, so call them out explicitly.
   - **Prototype/output files** — `src/design-harness/pages/**`, `src/design-harness/galleryData.ts`, `src/design-harness/routes.ts`, `context/design-system/ds/**`, `context/design-system/tokens.css`, `projects/<slug>/artifacts/**` — the actual build output, including any Step 3.5 designer entry.
3. Ask one direct question: *"Push this to `origin` so other designers get it too? (commit message will be `<skill(s)>: <task slug>`)"*
4. **Never push without an explicit yes.** If the designer says no or doesn't answer, leave the changes local and move on — this is a nudge, not a gate.
5. If yes: `git add`, commit with a message naming the skill chain and task slug (e.g. `ui-agent+audit: clients-list-redesign`), then `git push`. Report the result (pushed / conflict / needs pull first).

If `git status` shows nothing to commit, skip this step silently — no need to report "nothing to push."

---

## Self-improvement loop

After completing this audit run, before ending your turn:

1. **Review execution:** Did any check fail, need a workaround, or require multiple attempts?
2. **Review corrections:** Did the designer correct, override, or clarify anything meaningful during this run?
3. **Review gaps:** Did you discover a missing audit check, an ambiguous failure criteria, or a pattern that slipped through?

If **yes** to any:

- Propose **one specific, actionable improvement** to this skill file.
- State what would change and why (reference the check number or step).
- Wait for designer approval before editing the skill.

**Only propose changes that would prevent a real failure or fill a documented gap.** Do not suggest:
- Vague improvements ("could be stricter")
- Taste preferences without evidence
- Changes that belong in a different skill
- Fixes for one-off edge cases unlikely to recur

If nothing meaningful broke or was missing, skip this section silently.
