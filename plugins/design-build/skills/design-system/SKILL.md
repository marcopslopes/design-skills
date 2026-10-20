---
name: design-system
description: >-
  Governs where style values live and whether a value already exists in
  `tokens.css` before anything is written. Enforces the three-layer rule
  (real DS vs Design Harness catalog chrome vs per-prototype CSS), runs the
  pre-write token check, and owns visible structural DS debt. Triggers on:
  "check this token", "where should this style live", "is this a real
  Foundations token", "design-system skill", or whenever `ui-agent` is about
  to write colour/spacing/radius/type. Does not replace `audit` (reactive
  post-build sweep) — this runs *while* building. Does not own harness
  routing health — see `design-ops` / `harness-audit`.
---

# Design system skill

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Prevents invented tokens and stylesheet-layer drift **while** styles are
being written — the gap `audit` cannot close (audit only runs after the
fact).

**Invoke in Cursor:** `Use the design-system skill` / `/design-system`, or
load automatically from `ui-agent` before any CSS value is written.

**Human guide:** [`docs/HOWTO-DESIGN-SYSTEM.md`](https://github.com/marcopslopes/design-harness/blob/main/docs/HOWTO-DESIGN-SYSTEM.md)
— when it runs, the three layers, token-check examples, and how it differs
from `audit`.

---

## Job 1 — the layer rule (enforce)

Three layers. Do not mix them.

| Layer | Lives in | Rule |
|-------|----------|------|
| **Real design system** | `context/design-system/tokens.css` + `context/design-system/ds/` | Source of truth. Extend only to match Figma — never invent a one-off in Design Harness styles. |
| **Lab tokens (not DS)** | `src/design-harness/styles/tokens.lab.css` | Prototype/phone-shell vars only. Do not treat as Foundations; promote to `tokens.css` only when Figma-backed. |
| **Design Harness catalog chrome** | `src/design-harness/styles/chrome.css` (+ `phone-shell.css`) | Tool UI. Consume tokens. Minimal own styling. |
| **Per-prototype CSS** | `src/design-harness/styles/prototypes/<feature>.css` | Scoped per feature; add `@import` in `styles/index.css`. |

**Flag as:** `[DS-LAYER]` when a change is about to put prototype styles into
catalog chrome, invent Foundations values inside Design Harness chrome, or edit
`tokens.css` / `ds/` casually for a one-off screen.

Full procedure: `references/token-check.md` § Layer check.

**Which system (2026-10-11).** Systems are described in
`context/design-system/systems/*.md` (Mobile — default, Desktop, Brand,
Harness). Before building, match the project brief's **Platform** line to a
system's `platforms` words; no match → the `Default` one (Mobile). A request
to build a mobile screen or a prototype, with no other platform named, uses
Mobile. The catalog at `#/design-system` is that system — header, tab bar,
glass icons, sheet, and the composed screens — not a set of throwaway
templates. Compose those into the prototype; do not redraw the chrome. An AI
conversation composes that system's Message, Conversation, Working, Reasoning,
Tool call, Activity, Response, Result, Sources, This or that, and Prompt input — do not redraw a chat bubble or a composer.
Read that file's
"What it has / What's missing / Rules" and follow them — e.g. Desktop screens
go in `DesktopShell`; Brand is "Not set up", so never invent brand colours or
type — use Mobile/Desktop and say so. Harness is the frame's own system: never
use its styles inside a prototype. When the build fills a "What's missing"
line, update the system file in the same change.

The file's front matter lists `context`, `skills`, `theme`, `assets`, `ai`,
and `components` — Design Harness turns them into that system's sidebar. The
`ai` group is the conversation kit (Message, Conversation, Response, Reasoning,
Tool call, Activity, Prompt input, Conversation screen). Tags:
`[planned]`, `[needs input]`, `[from mobile]`, `[built: <file>]`. When a build
creates one of them, change its tag to `[built: <file>]` (or drop the tag
once it has a catalog page). Never mark something built that isn't, and never
fill a `[needs input]` line without the designer's material. A `## <item>`
section in the file becomes that item's page; in its tables, a cell that is
only `` `var(--token)` `` draws a live swatch. Document tokens the code already
declares — don't add new ones to fill a table.

**When to use / Avoid.** A component section that states a real rule ends
with two lines: **When to use** and **Avoid**. Write them from a spec, a
decision, or behavior the component already has. Do not generate them from
the component's name, and do not add a sidecar metadata file or an
atoms / molecules / organisms taxonomy. A component with no rule yet stays
without those lines.

---

## Job 2 — "does this value already exist?" (before write)

Before any skill (especially `ui-agent`) writes a colour, spacing, radius,
border width, type size, or font weight:

1. Read `context/design-system/tokens.css` (and §7 of `harness/ORCHESTRATOR.md` if needed).
2. **Exists** → use `var(--…)` (or the matching `ds` primitive prop). Stop.
3. **Missing, but a nearest token is close enough** → use the nearest; note the mapping in chat in one line.
4. **Missing and genuinely needed** → **do not invent** a CSS variable name in page or Design Harness prototype CSS. Hard-stop for a human decision (same shape as `ui-agent` `references/variant-fork.md` ambiguity gate):
   - Map to nearest existing token for now, **or**
   - Add a real token to `tokens.css` first (Figma-backed), **or**
   - Defer and log under structural / token debt.

**Flag as:** `[DS-TOKEN-GAP]` when stopping for a human on a missing token.

For values already on disk in a `.css` file, run
`npm run design:detect -- <file>` (`scripts/design-detector`) first — a
deterministic, zero-LLM check of whether a token already exists for a
given raw value. It doesn't replace this job's layer judgment or the
human gate below; it replaces re-deriving "does a token exist" by eye.

Full procedure + output format: `references/token-check.md`.

---

## Surface craft checks

Run these when writing or reviewing a nested rounded surface, a button
with an icon, or a play control. Use tokens that already exist. Do not
add a radius or a spacing step to make the math prettier.

### Concentric radius

When a rounded surface sits inside another and the gap is padding:

`outer radius = inner radius + padding`

Both numbers must be existing `--radius-*` tokens. If the sum is not a
token, use the nearest `--radius-*` and say which one you skipped. Do
not invent a one-off radius.

If the padding is larger than `--radius-04` (24px), the two surfaces are
separate. Pick each radius on its own.

### Optical alignment

Equal padding looks wrong when the content is not symmetric.

- A button with a trailing icon takes one spacing step less on the icon
  side. That step is `--spacing-01` (2px). Example: text side
  `--spacing-05`, icon side `--spacing-05` minus `--spacing-01`.
- A play triangle sits slightly toward its point, not in the geometric
  center of the box. Nudge with `--spacing-01`, or correct the SVG.
- Arrows and carets: correct the SVG once. Do not add a margin on every
  instance.

---

## Job 3 — architectural debt (visible, not chat-only)

This skill owns **design-system structural debt** as a durable list:

1. Canonical log: `KNOWN-ISSUES.md` (repo root) — DS IA / stylesheet entries.
2. Index + how to add items: `references/structural-debt.md`.

When you discover new structural debt (e.g. another shared file mixing
layers) and it is **not** fixed in the current pass, add a `KNOWN-ISSUES.md`
entry and a one-line pointer in `references/structural-debt.md`. Do not
leave it only in chat.

**Not this skill's job:** harness routing drift — that stays
`harness-audit` + `design-ops`.

---

## Relationship to other skills

| Skill | Boundary |
|-------|----------|
| `audit` | Reactive: session files after build. Still mandatory close. This skill does not replace Check 1. |
| `ui-agent` | Must load this skill's token-check **before** writing CSS values (Step 4). New prototype CSS → `src/design-harness/styles/prototypes/<feature>.css`. |
| `icon-usage` | Icons only — does not cover colour/spacing tokens. |
| `design-ops` / `harness-audit` | Harness routing health — not token layers. |

---

## When to run standalone

- Designer asks whether a value is a real token
- Designer asks where a style should live (DS vs chrome vs prototype)
- Reviewing Design Harness catalog chrome for invented values
- Adding or triaging DS structural debt in `KNOWN-ISSUES.md`

---

## Self-improvement loop

After completing this skill run, before ending your turn:

1. **Review execution:** Did any step fail, need a workaround, or require multiple attempts?
2. **Review corrections:** Did the designer correct, reject, or clarify anything meaningful during this run?
3. **Review gaps:** Did you discover a missing token, an ambiguous layer rule, or a structural debt pattern this skill doesn't capture yet?

If **yes** to any:

- Propose **one specific, actionable improvement** to this skill file.
- State what would change and why (reference the job number or section).
- Wait for designer approval before editing the skill.

**Only propose changes that would prevent a real failure or fill a documented gap.** Do not suggest:
- Vague improvements ("could be clearer")
- Taste preferences without evidence
- Changes that belong in a different skill
- Fixes for one-off edge cases unlikely to recur

If nothing meaningful broke or was missing, skip this section silently.
