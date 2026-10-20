---
name: design-handoff
description: >-
  Composes one developer-ready spec sheet from a design that is ready
  for engineering. Triggers on: "design handoff this design", "handoff
  spec", "developer-ready specifications", "eng spec from this design",
  "handoff this to developers". Never invents measurements or tokens.
  Not a chat compact (`session-handoff`), not a Jira work order
  (`ticket-create`), not a wiki page (`confluence-brief`), not why we
  chose X (`design-rationale`), not an a11y ADR
  (`accessibility-decisions`), not a standalone state matrix
  (`interaction-design`). Explicit ask only.
---

# Design handoff

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Turns a design that is **ready for engineering** into one reviewable
spec sheet — layout, tokens, components, states, breakpoints, edge
cases, motion, a11y — composed from evidence that already exists.

**Invoke in Cursor:** "design handoff this design", "handoff spec for
this Figma", "write the eng spec"

One-line pitch: drop a ready design → get a **developer spec**, not a
ticket, not a chat compact, not a rationale essay.

---

## Quick Reference

| Category | When to use | Reference |
|----------|-------------|-----------|
| Spec shape | Chat + `handoff-spec.md` | [output-template.md](references/output-template.md) |
| Ambiguous "handoff" | Spec vs session vs ticket | [offer-questions.md](references/offer-questions.md) § A |
| After the spec | Ticket / wiki / stop | [offer-questions.md](references/offer-questions.md) § B |

---

## Scope boundary

| Skill | Job |
|-------|-----|
| **`design-handoff`** (this) | One composed eng spec sheet |
| **`session-handoff`** | Compact *this chat* for a fresh agent |
| **`ticket-create`** | Lean Jira work order (draft → go) |
| **`confluence-brief`** | Wiki page (draft → go) |
| **`design-rationale`** | Why an already-made *decision* sticks |
| **`accessibility-decisions`** | A11y ADR / a11y-only eng criteria |
| **`interaction-design`** | Deep state × SR × keyboard × touch matrix |
| **`motion-choreography`** | Duration / easing / reduced-motion |
| **`audit`** | Design Harness share gate — not a spec sheet |
| **`ux-pattern`** | Critique the work — not a handoff |

- **Fires on:** an explicit ask for a developer / eng / implementation
  spec from a named design (Figma, Design Harness screen, or active
  `projects/<slug>/` surface).
- **Does not fire on:** "handoff this session" / "context is full"
  (`session-handoff`). "Create a ticket" (`ticket-create`). "Put this
  in Confluence" (`confluence-brief`). "Why did we choose X"
  (`design-rationale`). "Accessibility handoff for eng" / "a11y ADR"
  (`accessibility-decisions`). "State matrix" alone
  (`interaction-design`). "Why does this handoff keep breaking"
  (`research-artifacts` Mode 6).
- **Hard rule:** never send the spec to eng, Jira, Confluence, or Slack
  as-is. Banner it **DRAFT — validate before send**. Create / publish
  only if they then match `ticket-create` or `confluence-brief`.

---

## Load before running

1. This file + `references/output-template.md`.
2. `references/shared/anti-ai-writing.md` — the spec is stakeholder-
   facing.
3. Org-pack `COMPANY-BUSINESS.md` + `COMPANY-PATTERNS.md` when they
   exist (resolved per `harness/ORCHESTRATOR.md` §0a).
4. `context/design-system/tokens.css` (or the org-pack style guide if
   that is the named token source) — token names only; never invent hex
   or px.
5. Task folder `brief.md` / `decisions.md` / `findings.md` if an active
   `projects/<slug>/` matches.
6. Already-written sibling artifacts in that folder, if present:
   interaction matrix, motion spec, a11y decision, design rationale.
   **Pull, don't rewrite.**
7. Figma screenshot / metadata (MCP) when a URL is present.
8. The named Design Harness page under `src/design-harness/pages/` when the design
   is a built screen.

---

## Workflow

1. **Route, don't guess.** Explicit design/eng/spec phrasing → this
   skill. Session-compact phrasing → `session-handoff`. Ticket-only
   phrasing → `ticket-create`. Bare "handoff this" with no object →
   `AskQuestion` payload A in `references/offer-questions.md`.
2. **Inputs.** Required: a design — Figma/FigJam URL, named Design Harness
   screen, pasted screenshots, or a clear surface in
   `projects/<slug>/`. If missing → one chat line asking for the
   paste (not a fake menu). Optional: tech stack, named breakpoints,
   which frames.
3. **Huge file.** More than about 12 top-level frames and no named
   subset → ask which screens. Do not spec the whole file.
4. **Compose** from `references/output-template.md`. Use token names
   from the loaded token file. Mark anything not in the design as
   **Unknown** and name who to ask — never guess a measurement.
   Figma values that are not tokens: write the observed value and tag
   `[NOT A TOKEN]`. If a sibling skill already wrote a section, link
   or quote it; do not invent a second version.
5. **Anti-slop pass** on the prose (overview, why-notes). Keep tables
   dense. Then run the two **spec prose slivers** below — they are
   this skill only, not the shared checklist.
6. **Persist + log.** Chat + write `projects/<slug>/handoff-spec.md`
   (not `handoff.md` — that file is `session-handoff`). No matching
   folder → chat only, offer to open/create a task folder; do not
   write into `designer-context.local/` unasked. One line each in the
   task `log.md` (if any) and `harness/logs/routing-log.md`
   (`MATCHED design-handoff`).
7. **Offer next** via payload B — ticket, Confluence, or stop. Never
   auto-run those skills.

---

## Quality bar

- Every numeric/token claim is sourced (Figma, tokens.css, or a
  sibling artifact) or marked **Unknown**
- Tokens over raw values
- States that exist in the design are listed; states that don't are
  not invented
- DRAFT — validate before send is the first line
- Anti-slop pass run
- Overview names who acts; no subjectless "is preserved automatically"
- Spec describes current behavior; old-version history stays in
  `decisions.md` / a retro, not in the spec body

---

## Never do this

- Invent spacing, hex, type sizes, durations, or ARIA that aren't in
  the design or a loaded source
- Write `projects/<slug>/handoff.md` (session compact)
- Auto-create Jira or Confluence
- Send the file to eng without the validate banner
- Critique the work (`ux-pattern`) or run Design Harness `audit` unless they
  also asked
- Fire `interaction-design` / `motion-choreography` /
  `accessibility-decisions` in the same turn unless they asked for
  that depth — then §3 PLAN, this skill last (composer)
- Hardcode a company name, product, or token set into this skill
- Rewrite error copy or tickets to active voice (not this skill's job)
- Put "we used to hide this in overflow" in the spec body — that is
  rationale / retro, not the eng sheet

---

## Spec prose slivers (this skill only)

Two checks that **must not** go on
the shared `anti-ai-writing.md` list — they false-flag retros,
`design-rationale`, and `content` error copy.

**Missing actor.** A spec sentence with no one doing the thing:
"Results are preserved automatically." Name the actor and the
trigger: "The spec stores results in the booking session when the
user taps Save." If the actor is the system, say so. Do **not**
rewrite product error strings ("Your booking couldn't be saved") or
ticket deferrals ("was deferred pending eng").

**Current behavior.** The spec says what the design does now, not
what it replaced. "Invite sits on the booking list. Empty state: No
unused invites. Overflow no longer contains it." History
("this screen was added to replace the overflow menu") belongs in
`decisions.md` or a retro. Do **not** run this check on
`design-rationale`, `design-retrospective`, or "what we deferred."

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Bare "handoff this" → this skill | Payload A — spec vs session vs ticket |
| Spec written into `handoff.md` | Use `handoff-spec.md` |
| Guessed 16px / #FF… | Token name, or Unknown, or `[NOT A TOKEN]` |
| Auto-filed a Jira from the spec | Payload B; `ticket-create` only on go |
| Ran `accessibility-decisions` because the spec has an a11y section | Thin a11y notes here; ADR stays that skill |
| Spec opens with "this replaced the old overflow…" | Current behavior in the spec; history in `decisions.md` |
| "Results are preserved automatically" | Name who stores what, and when |

---

## Related files

| File | Role |
|------|------|
| `../session-handoff/SKILL.md` | Chat compact — different `handoff.md` |
| `../ticket-create/SKILL.md` | Lean work order after this spec |
| `../confluence-brief/SKILL.md` | Wiki publish after this spec |
| `../design-rationale/SKILL.md` | Decision why, not the spec sheet |
| `../interaction-design/SKILL.md` | Deep state matrix this may pull |
| `../accessibility-decisions/SKILL.md` | A11y ADR this may pull |
| `documentation/skills/design-handoff.md` | Designer HOWTO |
