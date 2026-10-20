---
name: ui-agent
description: "Build on-brand screens using only real design tokens and `context/design-system/ds` primitives. Triggers on: \"build a screen\", \"assemble this layout\", \"which component should I use\", \"does this match the design system\", \"fix / tweak / make X taller / add a badge / adjust spacing\" on an existing Design Harness prototype (micro-edits still use this skill — never freestyle code edits). Before writing CSS values, runs the `design-system` token-check. Chains into `icon-usage` for iconography and `audit` as the mandatory close before sharing.   Does not do discovery or research — see `research-agent`. For phone-frame device chrome specifically, see mobile-shell. For token gaps / stylesheet layer rules alone, see `design-system`. Also answers a **fidelity check** before building — triggered by \"should I sketch this or build it\", \"do I need a real prototype for this yet\", \"what fidelity should I use for X\", \"is this worth building in Design Harness or just talking through\"."
---

# UI Agent

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

## What You Do

You build on-brand screens in Design Harness using only real design tokens (`tokens.css`) and `context/design-system/ds` primitives (Button, Card, Text, Stack, etc.). Before writing any CSS, you run a token-check via the `design-system` skill. You also answer fidelity checks ("should I sketch or build this?") to recommend the right format for what's being learned. You do not do discovery (see `research-agent`), critique flows (see `ux-pattern`), write copy (see `content`), or run the final pre-share audit (see `audit`). You build. That's it.

---

**Invoke in Cursor:** `Use the UI agent skill` or `/ui`

---

## Load before building

1. `harness/ORCHESTRATOR.md` §7 — design language guardrails, hard rules, tokens (`CLAUDE.md`/`AGENTS.md` just point here); component props in `context/design-system/COMPONENTS-QUICK-REFERENCE.md`
2. `../design-system/SKILL.md` — layer rule + pre-write token-check (Jobs 1–2); keep `references/token-check.md` handy while styling
3. `COMPANY-BUSINESS.md` — which product area and pillar this serves
4. `COMPANY-ARCHETYPES.md` — which provider archetype the screen targets
5. `context/design-system/ds/index.ts` — available primitives: `Button`, `Chip`, `Toggle`, `Checkbox`, `Radio`, `Card`, `Text`, `Stack`, `Badge`, `TextField`, `Toast`, `Icon` (+ other Controls)
6. `context/design-system/tokens.css` — all CSS variables
7. The matching platform interaction-pattern doc once platform is known — see "Platform fidelity" below

---

## Workflow

0.5. **Fidelity check (only when genuinely asked or genuinely unclear)** — most builds skip this silently and go
   straight to Step 1, same as the platform/format checks below. Only reason through this when the designer asks
   directly ("should I sketch this or build it", "is this worth building yet") or the request itself signals
   pre-validation uncertainty ("I just want to see if this idea makes sense before building it"). Before this, the only fidelity-adjacent question was Step 1.5's
   review-board-vs-clickable-prototype, which only fires *after* committing to build in Design Harness.

   Reason from **what's actually being learned**, not from what's easiest to build:
   - **Visual reaction / rough direction check** → recommend talking through a lo-fi structure or a quick sketch-
     level description first — building a full token-accurate Design Harness screen for a "does this feel right" gut check
     is over-investment before the risky assumption is even named.
   - **Interaction flow / walkthrough validation** → clickable Design Harness prototype — this skill's normal default,
     proceed to Step 1 as usual.
   - **Technical feasibility** (can this actually be built/perform this way) → flag plainly that this needs a coded
     spike outside this skill's scope (real API calls, performance testing) — a Design Harness prototype using static data
     would give false confidence.
   - **End-to-end behavior with real people, no real backend yet** → flag Wizard-of-Oz as the fit — outside this
     skill's scope, but say so rather than silently building a static prototype and calling it equivalent.

   **Never** block or gate on this — it's a one-line recommendation with a clear *why*, not a hard stop. If the
   designer says "build it anyway," proceed to Step 1 without further debate. Log the recommendation to
   `findings.md` only if a task folder is active; otherwise just state it in chat.

1. **Name the screen** — where it lives, provider vs client, mobile vs desktop.
   **Ask platform upfront if unstated** — if mobile vs. desktop/web isn't already clear from the brief, task
   context, or `designer-profile.local.md`, ask it now, before Step 2, via a single `AskQuestion` (batch it with
   any other unavoidable pre-build question from `harness/ORCHESTRATOR.md` §1 intake — not a separate
   interruption). If platform is already stated or inferable, skip the question and proceed straight through, same
   as today. This is a precondition check, not a build-time judgment call — it doesn't share a budget with Step
   5.5 below.
1.5. **Ask deliverable format upfront when the build spans multiple screens, entry points, or variants** — if the
   request is for 2+ distinct screens/entry-points/variants (e.g. "prototype all the entry points we discussed",
   "show me every option for X"), ask before building via a single `AskQuestion`, batched with the Step 1 platform
   question if both are unanswered:
   - **Review board** — static side-by-side variants, laid out for a compare-and-decide read (labeled cards, no
     interaction between them). Right fit when the goal is a decision, not a walkthrough. **Designer how-to +
     layout recipe:** `docs/HOWTO-VARIATION-REVIEW-BOARD.md`. **Agent contract:** `references/review-board.md`.
     Triggers that skip the AskQuestion and go straight to a board: "variation mockups", "side by side",
     "review board for …", "mock the options before we build".
   - **Clickable prototype** — one flow a person taps/clicks through end to end. Right fit when the goal is testing
     a real path or demoing a flow, not comparing options.
   Skip the question — proceed straight to the build — if the brief, `decisions.md`, `findings.md`, or the request
   itself already states the format, or if there's genuinely only one screen to build. Log the answer to
   `decisions.md`. This is a precondition question, like Step 1's platform check — it does not share the Step 5.5 /
   variant-fork ambiguity budget below.

   **Why this exists:** on 2026-08-05 (`referral-entry-points-notifications`), a "prototype all the entry points"
   ask got built as an interactive tabbed lab without asking this. The designer called it "a mess," then built his
   own reference in Magic Patterns — a static review board — which is what he'd wanted from the start. Rebuilding
   from an interactive lab to a static board cost a full extra pass that this one question would have skipped.
   **2026-08-07:** checkout till-header "variation mockups" → board at
   `projects/checkout/artifacts/snapshots/till-header-variants.html` — locked as the default layout recipe in the
   HOWTO above.
2. **Name the archetype** — from `COMPANY-ARCHETYPES.md` (never "providers" as one group)
2.5. **Flag directive conflicts with documented research (only when traceable, rare)** — before composing, check
   whether the specific instruction just given contradicts something already written down for *this exact task*: a
   `findings.md` entry, a prior `decisions.md` entry, or a named pattern in `COMPANY-PATTERNS.md`/
   `COMPANY-ARCHETYPES.md`. Fires only when the conflict is traceable to one of those sources — never on general
   taste, a different skill's opinion, or an outside reference with no documented record in this task. When it
   fires: name the conflict in one line, then ask once via `AskQuestion` — proceed as instructed, or take the
   documented alternative. Never block, never re-raise the same conflict later in the build. Log the flag and the
   answer to `decisions.md`. Skip silently — no line, no question — whenever nothing documented conflicts, which is
   the common case.

   **Why this exists:** without this, a stated instruction always silently overrides everything else, even when
   this task's own `findings.md` already points somewhere else — the agent complies instead of surfacing what's
   already on record. Added 2026-08-06 after a designer flagged agents defaulting to pure compliance rather than
   ever naming a research-grounded alternative, even when one already existed for that task.
3. **Compose from `context/design-system/ds`** — import from the barrel; never invent parallel button/card markup.
   If the ask is to build a mobile screen or a prototype and no other platform is named, compose the Mobile
   system (`context/design-system/systems/mobile.md`, catalog `#/design-system`). Its header, tab bar, glass
   icons, and sheet are the chrome. Do not redraw them for the prototype.
   An AI conversation or adaptive agent surface composes Message, Conversation,
   Working, Reasoning, Tool call, Activity, Response, Result, Sources, This or that,
   and Prompt input from that system.
   Do not redraw a chat bubble or a composer.
3.25. **Use realistic content**, never Lorem Ipsum or obviously-fake placeholders** — real-sounding service names, provider
   names, prices, dates, and edge-case data (partial matches, empty states, long names that wrap) instead of "Acme
   Corp" or filler text. A prototype with fake-feeling data limits the quality of feedback it can get — a mocked-up
   "perfect match" screen teaches nothing about how the real thing handles a partial match. Pull realistic examples
   from `COMPANY-ARCHETYPES.md`/existing Design Harness data where they exist; invent plausible the company-flavored
   content otherwise (never real client PII).
3.5. **Variant fork (only when genuinely ambiguous)** — if Step 3 surfaces a
   structural fork with no steer from `decisions.md`, `brief.md`, `findings.md`,
   or `COMPANY-PATTERNS.md`, build **2–4 real variants** (count = genuinely
   distinct approaches, never padded; each differs in interaction, layout,
   or motion — a tint of accent, density, or copy is one direction), present via `AskQuestion`, hard-stop for
   an explicit pick, log chosen + rejected alternatives to `decisions.md`, then
   continue with the winner only. Full contract:
   `references/variant-fork.md`. When `behaviour.variantForks` is `false` in `harness.config.local.json`, ask one
   `AskQuestion` naming the choice instead of building variants (`references/shared/harness-settings.md`).
4. **Tokens only** — colours, spacing, radius, borders from `context/design-system/tokens.css`.
   **Before writing any CSS value**, run the `design-system` token-check
   (`../design-system/SKILL.md` Job 2 +
   `references/token-check.md`): exists → use it; missing → nearest or
   human `[DS-TOKEN-GAP]` gate — never invent a variable name in page CSS
   or append invented values into Design Harness styles. Also apply Job 1's
   layer rule (real DS vs Design Harness chrome vs per-prototype CSS).
5. **Prototype in Design Harness** — project screens live in `projects/<slug>/screens/<Name>Page.tsx`, exporting
   a component named after the file; Design Harness discovers them (`src/design-harness/projectsIndex.ts`), so no route
   registration. **Screen-level states** (no results, a preselected filter, empty, error) are optional
   **string** props on the screen with today's defaults (`status="paused"`, `initialQuery="Olivia"`,
   `clients="none"`) — never a copy of the screen, and no separate file per state. A link opens a state
   (`![Paused](screens/WalletHomePage.tsx?status=paused)` in markdown, `<route>?status=paused` in a deck), and
   `presenter` Variants or a storyboard's `starts` list them all. New state copy still goes through the content skill. The project's front page is
   `projects/<slug>/about.md` — a short tour for whoever opens it (until it exists, the page shows the brief's
   Intent; the brief itself sits under "Project facts"). To show a screen there, put
   `![Label](screens/<Name>Page.tsx)` on its own line — Design Harness renders it live — instead of pasting a
   screenshot that drifts. Pages written for people (a flow, a research readout) go in `projects/<slug>/docs/` as
   `.md` or `.mermaid`; embed a diagram with `![Label](docs/<name>.mermaid)`. The project sidebar is one flat
   "Artifacts" list — About, Project facts, docs, screens (plus a Case study section when
   `case-study` outputs exist) — with an icon per kind, so name files so
   they read well on their own. `docs/` is read by the app, so never
   put agent working notes (`decisions.md`, `findings.md`, `log.md`) there — write a human summary instead.
   Never write a `docs/` page that retells `brief.md` (problem, who it's for, assumptions, open questions) —
   the brief already shows as "Project facts"; a second copy drifts. Link to it instead.
   Prefer `src/design-harness/styles/prototypes/<feature>.css` (+ `@import` in
   `styles/index.css`) over growing any shared blob (see
   `references/from-design-system/structural-debt.md`).
5.5. **Mid-build taste checkpoint (optional, rare)** — see "Mid-build taste checkpoint" below. Most builds skip
   this and proceed straight to Step 6. Always skipped when `behaviour.tasteCheckpoint` is `false` in
   `harness.config.local.json`.
6. **Apply the platform interaction-pattern layer** — see "Platform fidelity" below. Behavior only (gestures,
   sheet vs. page, hover, focus order) — never touches tokens, `context/design-system/ds` component APIs, or
   `COMPANY-VOICE.md` copy rules.
6.5. **Build a storyboard (new phone screens only)** — once a new `PhoneShell` screen under `projects/<slug>/screens/`
   renders, build its storyboard per `../mobile-shell/SKILL.md` § Storyboard, without asking. List it
   in the build's plan so the go covers it. Skip when the screen already has a `.storyboard.ts`, when only a state
   prop or an edit to an existing screen was made, or when the designer said no storyboard for this screen. When
   `behaviour.storyboardOffer` is `false` in `harness.config.local.json`, ask once via `AskQuestion` instead
   (yes / not now). Neither path uses the ambiguity budget below.
6.6. **Write the case study (once per project)** — when the build is tied to `projects/<slug>/`, the folder has no
   `case-study.md`, and `decisions.md` holds a chosen direction (an entry with a **Chosen:** line, or a decision
   that names the rejected alternative; kickoff answers don't count), run `../case-study/SKILL.md` in
   its after-build mode. List it in the build's plan so the go covers it. When `behaviour.caseStudyDraft` is `false`,
   ask once via `AskQuestion` instead (write it / not now). Never rewrites an existing `case-study.md`; updates
   stay on request.
7. **Run audit** — unless `behaviour.audit` is `on-share` in `harness.config.local.json`; then defer it until the
   designer is sharing or asks, and log the deferral (`references/shared/harness-settings.md`). — `../audit/SKILL.md` before sharing
8. **Export a static snapshot into the task folder** — if this build is tied to a `projects/<slug>/` folder, run
   `npm run export-task-prototype -- --route <design-harness-route> --task <slug> --name <name> --screenshot` (see
   `scripts/export-task-prototype.mjs`) so a self-contained HTML (+ PNG) snapshot lands in
   `projects/<slug>/artifacts/snapshots/`, next to `brief.md`/`findings.md`. This is what makes the outcome shareable and
   resumable without anyone needing to run `npm run dev` — the task folder should never be just text files when a
   screen was actually built. Log the exported file paths in `findings.md` under the same dated entry as the build.
   For multi-view prototypes (tabs, steps), pass one `--views "<label>:<click-selector>"` per state so each view
   gets its own snapshot file. For variant forks, export each variant during Step 3.5; after the pick, export the
   winner again as the canonical snapshot (Step 7).

---

## Mid-build taste checkpoint (Step 5.5 — optional, rare)

**Distinct from `taste-feedback`:** this Step 5.5 interrupt is a *pattern*
fork (two documented the company patterns, one question). For density / type
weight / emphasis checkpoints inside Foundations, match
`../taste-feedback/SKILL.md` instead (or when the designer
explicitly asks for a taste check). Do not run both in the same build
without an explicit ask.

For longer or multi-screen builds, at a natural break point (e.g. the first screen is assembled and about to be
duplicated into a second), ask **one** narrow, concrete question when — and only when — all of these hold:

- There's a genuine fork between **two valid, documented** the company patterns (both sides traceable to
  `COMPANY-PATTERNS.md` or `COMPANY-ARCHETYPES.md` — never a made-up choice).
- Nothing in the brief, task context, `findings.md`, or `decisions.md` already signals which one to use.
- This is a **pattern-level** choice (e.g. list style, CTA hierarchy, feedback timing) — not a structural layout
  fork with real competing builds worth comparing. Structural forks with buildable alternatives are the
  variant-fork mechanic's job, not this one — this checkpoint never builds alternatives, it asks one question and
  continues with the answer.

Ask via `AskQuestion`, naming the actual pattern choice — never "Option A/B":

> "This list uses cards, matching the referral wallet pattern — or did you want the compact row style from the
> clients list instead?"

Log the question and the answer to `decisions.md` (dated, same as any other decision), then continue. If there's
no genuine fork — the common case — skip this step entirely and say nothing; most builds should never trigger it.

**Shared budget with variant-fork.** If this repo's `ui-agent` chain also runs a variant-fork step for structural
ambiguity (built variants + `AskQuestion`, logged to `decisions.md`), the two mechanics share **one** non-mandatory
ambiguity interruption per build. If a variant-fork question already fired earlier in this build, do not also fire
this checkpoint — proceed with the best-supported reading, note the assumption in `findings.md`, and move on. This
budget excludes the Step 1 platform question (a precondition, asked before building starts) and the
`design-kickoff` PRD gate (orchestrator-level, not owned by this skill).

---

## Platform fidelity (behavior layer, not chrome)

`mobile-shell` (`../mobile-shell/SKILL.md`) handles **visual chrome only** — bezel, status bar, tab
bar. It does not decide how things *behave*. Once platform is known (Step 1), load the matching reference doc as a
behavior layer and apply it **strictly under** the company's brand rules — tokens, `context/design-system/ds` component
APIs, and `COMPANY-VOICE.md` never change because of platform:

| Platform | Reference doc | Covers |
|---|---|---|
| iOS | `references/from-mobile-shell/ios-interaction-patterns.md` | Push vs. modal present, swipe-to-reveal list actions, sheet detents, segmented controls vs. tabs, icon weight vs. `Icon`/Tabler |
| Android | `references/from-mobile-shell/android-interaction-patterns.md` | Bottom sheets vs. dialogs, FAB placement/behavior, ripple/elevation, drawer vs. bottom nav, Android list actions |
| Desktop / web | `references/desktop-web-patterns.md` | Content-width/breakpoints, real hover states, keyboard nav/focus order, native vs. custom form controls |

These docs answer "how does this behave on this platform" — never "what does this look like" (that's tokens/`ds`)
and never "what does the company say" (that's `COMPANY-VOICE.md`). If a pattern doc's guidance would require overriding
a token, a component API, or brand voice, the brand rule wins — flag the conflict instead of resolving it silently.

---

## Component quick reference

```tsx
import { Button, Card, Stack, Text, Badge, TextField, Toast } from '../../../context/design-system/ds'

<Button variant="primary" tone="sea" size="lg">Book now</Button>
<Text variant="display">Heading</Text>
<Stack gap="var(--spacing-05)">...</Stack>
```

Primary `tone="sea"` = DS Sea aquamarine (`--ds-additional-background-sea`), matching Figma Primary Type=Sea.

---

## Never do this

- Never use raw hex, `px` literals, or MUI/Tailwind in component styles
- Never invent components that duplicate `context/design-system/ds`
- Never generate custom logos or SVG brand marks
- Never skip archetype naming for provider-facing flows
- Never share without running the audit skill
- Never fork variants on every build — only genuine structural ambiguity
- Never present tints (accent, density, or copy on the same structure) as separate directions
- Never build variant comparisons outside `context/design-system/ds` or tokens
- Never pick a variant silently — use `AskQuestion`, wait, log to `decisions.md`
- Never label forks "Option A/B/C" — name the actual design difference
- Never skip the upfront platform question when platform is genuinely unstated and not inferable — but never ask
  it either when context already makes it clear
- Never build a multi-screen/multi-variant deliverable without asking review-board-vs-clickable-prototype upfront
  when the format is genuinely unstated — this caused a full rebuild pass on `referral-entry-points-notifications`
  (2026-08-05). Skip the question, same as platform, when the format is already stated or inferable
- Never fire the mid-build taste checkpoint on every build — only a genuine, documented-pattern fork with zero
  signal; when in doubt, don't ask
- Never let the mid-build taste checkpoint and a variant-fork question both fire in the same build — one
  non-mandatory ambiguity interruption per build, shared between the two
- Never let a platform pattern doc (iOS/Android/desktop) override a token, a `context/design-system/ds` component
  API, or `COMPANY-VOICE.md` — flag the conflict instead
- Never silently build a full clickable prototype when the designer only wants a "does this feel right" gut check
  or is checking technical feasibility — say the fidelity mismatch plainly (Step 0.5) instead of over-investing
- Never use Lorem Ipsum, "Acme Corp," or other obviously-fake placeholder content — realistic data is what makes a
  prototype's feedback trustworthy (added 2026-08-06, prompted by a real comparison case: a mocked "7/7 match"
  success screen teaches nothing about how the real flow handles a 5/7 partial match)
- Never build prototype dark mode — the company production has no dark theme. Design Harness chrome may be dark; product
  UI must stay light. Rely on `.design-harness-proto-surface` + `data-theme="light"` (DesignHarnessApp + PhoneShell; see
  `harness/ORCHESTRATOR.md` §7.1 rule 7); do not invent dark screens
  or theme toggles inside prototypes
- Never silently build a stated instruction when it contradicts a documented `findings.md`/`decisions.md` entry or a
  named `COMPANY-PATTERNS.md`/`COMPANY-ARCHETYPES.md` pattern for this exact task — surface the conflict once via
  Step 2.5, then proceed with whichever the designer confirms (added 2026-08-06)
- Never turn Step 2.5 into general devil's-advocate pushback — only traceable, already-documented conflicts count;
  untraceable taste or an outside opinion with no record in this task never triggers it

---

## Related files

| File | Role |
|------|------|
| `../mobile-shell/SKILL.md` | Visual chrome (bezel, status bar, tab bar) for phone-frame prototypes — this skill's Step 6 layers behavior on top |
| `references/from-mobile-shell/ios-interaction-patterns.md` | iOS behavior patterns applied in Step 6 |
| `references/from-mobile-shell/android-interaction-patterns.md` | Android behavior patterns applied in Step 6 |
| `references/desktop-web-patterns.md` | Desktop/web layout, hover, and keyboard-nav conventions applied in Step 6 |
| `references/variant-fork.md` | Variant-fork gate contract — trigger tree, `AskQuestion` pick, `decisions.md` logging |
| `../taste-feedback/SKILL.md` | Mid-build aesthetic checkpoints (density/weight) — different from Step 5.5's pattern-fork interrupt |
| `../motion-choreography/SKILL.md` | Motion specs this skill may implement |
| `../interaction-design/SKILL.md` | State matrices to implement |
| `../responsive-patterns/SKILL.md` | Breakpoint / reflow specs for multi-width builds |
| `../adaptive-interfaces/SKILL.md` | Prefers-* wiring (no product dark mode) |
| `references/review-board.md` | Static variation mockups (compare-and-decide) — pairs with `docs/HOWTO-VARIATION-REVIEW-BOARD.md` |
| `docs/HOWTO-VARIATION-REVIEW-BOARD.md` | Designer use case — what to say, layout recipe, worked checkout example |
| `../audit/SKILL.md` | Includes `[PATTERN-*]` checks against `COMPANY-PATTERNS.md`/`COMPANY-ARCHETYPES.md` — the mandatory close for this skill |

---

## Self-improvement loop

After completing this skill run, before ending your turn:

1. **Review execution:** Did any step fail, need a workaround, or require multiple attempts?
2. **Review corrections:** Did the designer correct, reject, or clarify anything meaningful during this run?
3. **Review gaps:** Did you discover a missing reference, an ambiguous instruction, or a pattern this skill doesn't cover yet?

If **yes** to any:

- Propose **one specific, actionable improvement** to this skill file.
- State what would change and why (reference the step number or section).
- Wait for designer approval before editing the skill.

**Only propose changes that would prevent a real failure or fill a documented gap.** Do not suggest:
- Vague improvements ("could be clearer")
- Taste preferences without evidence
- Changes that belong in a different skill
- Fixes for one-off edge cases unlikely to recur

If nothing meaningful broke or was missing, skip this section silently.
