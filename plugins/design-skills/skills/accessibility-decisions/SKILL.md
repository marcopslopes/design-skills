---
name: accessibility-decisions
description: >-
  Documents accessibility decisions, tradeoffs, and engineering handoff
  specs so inclusive choices survive redesigns and staff changes. Triggers
  on: "accessibility decision", "document this a11y tradeoff", "a11y ADR",
  "accessibility handoff for eng", "why is a11y like this", "we can't do
  both for accessibility", "accessibility decision record", "who do we
  exclude if we ship this". Different from `design-rationale` (general
  design decisions — this is a11y-specific impact, WCAG mapping, and
  implementable eng criteria). Different from `accessibility` /
  `cognitive-accessibility` (those *find* issues — this *records* a pick).
  Different from `design-debt-tracker` (open advisories — this is a closed
  decision with rationale). Ability coverage mapping without a decision
  yet → `research-artifacts` Mode 4.
---

# Accessibility decisions

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Record accessibility decisions so future teams know not just *what* was
chosen, but *who benefits, who is harmed, and how to implement/test it*
— the usual failure mode is a good choice getting reversed because nobody
remembered why.

**Invoke in Cursor:** "document this a11y decision", "accessibility
handoff for eng", "we can't do both — analyze the a11y tradeoff"

---

## Scope boundary

| Skill | Job |
|-------|-----|
| **`accessibility-decisions`** (this) | Decision record + tradeoff analysis + eng handoff |
| **`design-rationale`** | General already-made design decisions (not a11y-specific) |
| **`accessibility` / `audit`** | Find blocking focus/ARIA/contrast issues |
| **`cognitive-accessibility`** | Advisory mental-load / wayfinding pass |
| **`research-artifacts` Mode 4** | Ability-spectrum coverage map *before* a pick |
| **`design-debt-tracker`** | Open deferred advisories in `debt.md` |
| **`design-handoff`** | Whole-design eng spec (may *link* this ADR) |

- **Fires on:** an accessibility choice that is made or about to be
  locked (tradeoff analysis may run while options are still open), or an
  eng handoff that needs implementable a11y criteria — not "make it
  accessible."
- **Does not fire on:** routine DS-compliant defaults with no real
  alternative ("used semantic button") — reserve for decisions someone
  could ask "why not the other way?" about.
- **Never invents evidence or disability impact.** If the pick was gut
  feel, say so. If impact on a group is unknown, label Assumed and note
  what research would close it.

---

## Mode 1 — Decision documentation

Use when a specific accessibility choice needs a durable record.

For each decision:

1. **Title** — searchable, specific ("Inline field errors instead of
   summary banner on booking form").
2. **Date + author** — who decided (designer name from profile if known).
3. **Context** — what prompted it; constraints (timeline, platform,
   the company pattern debt).
4. **Decision** — what was chosen, concretely (behavior, ARIA, content).
5. **Alternatives considered** — real options only; say if only one was
   ever on the table.
6. **Accessibility impact** — who benefits / how (permanent, temporary,
   situational — the company contexts welcome).
7. **Risks and tradeoffs** — what was sacrificed; severity (blocked vs
   friction).
8. **Evidence** — research, UT, WCAG SC, spectrum map, or "no evidence —
   judgment call."
9. **WCAG map** — which success criteria this satisfies or risks.

---

## Mode 2 — Tradeoff analysis

Use when accessibility needs conflict, or a11y competes with deadline /
performance / scope.

For each tradeoff:

1. Who benefits from Option A vs B (groups + estimated severity).
2. Who is harmed by each — **blocked** beats **friction**; permanent
   disability usually outranks situational when both can't be served
   (situational users often have another moment/device; permanent may not).
3. Reversibility — can we fix later cheaply? If yes, document the
   remediation date/owner; if no, prefer the more inclusive option.
4. Precedent — does this become "how we always do X"?
5. Record the chosen path via Mode 1 (required — analysis without a
   written decision is theater).

Never launder "we'll fix later" into silence — if deferred, either write
the decision + remediation, or log an Open row in `debt.md` via the
existing fix-or-log / `design-debt-tracker` path and say which.

---

## Mode 3 — Engineering handoff

Use when design is ready for implementation and "make it accessible" is
not a spec.

Compile Mode 1 decisions (and Mode 2 outcomes) into:

1. **Element requirements** — for each interactive control: role/HTML,
   keyboard keys, focus management after actions, SR name/role/state,
   visual states (default/hover/focus/active/disabled/error).
2. **Content requirements** — heading levels, alt strategy, link text,
   language notes.
3. **Adaptive behaviour** — relevant `prefers-*` / zoom / reflow
   expectations (coordinate with `adaptive-interfaces` /
   `responsive-patterns` if those passes already ran).
4. **Executable test cases** — keyboard, screen reader announcement
   strings (exact where known), contrast, zoom — specific enough to
   fail a PR checklist.
5. **Risks / dependencies** — custom keyboard, third-party gaps,
   framework defaults that aren't enough.

Handoff is advisory for eng process in this lab; still write it as if a
real ticket body will paste it (`ticket-create` can consume later).

---

## Output format

```markdown
## Accessibility decisions — [feature/slug] — YYYY-MM-DD

### Mode: [document | tradeoff | handoff]

[Mode 1 — each decision:]
#### [Title]
**Date / author:** …
**Context:** …
**Decision:** …
**Alternatives:** …
**Impact:** …
**Risks / tradeoffs:** …
**Evidence:** …
**WCAG:** …

[Mode 2 — each tradeoff:]
#### Tradeoff: [A vs B]
**Benefits A / B:** …
**Harm A / B (blocked vs friction):** …
**Reversibility / remediation:** …
**Precedent risk:** …
**Chosen:** … → recorded in Mode 1 above / debt.md [id]

[Mode 3 — handoff:]
### Spec
| Element | Role/HTML | Keyboard | Focus | SR | Visual states |
|---|---|---|---|---|---|
### Tests
1. …
### Risks
- …
```

---

## Persist

Append to `projects/<slug>/decisions.md` under a clear
`## Accessibility decisions — YYYY-MM-DD` heading (same log as
`design-rationale` / `ux-pattern` decision framework — one place for
"why," not a parallel file). If Mode 2 defers work, also ensure an Open
row exists in `debt.md` per `project-debt-register.md`.

Run stakeholder-facing prose through
`references/shared/anti-ai-writing.md`.

---

## Never do this

- Never invent WCAG compliance claims or user-impact numbers
- Never treat "we'll make it accessible in QA" as a documented decision
- Never reverse a prior a11y decision in this skill without citing why
  the old record no longer holds
- Never replace `accessibility` / `audit` — finding bugs is their job
- Never speak for disabled users without sourced evidence — label gaps

---

## Related files

| File | Role |
|------|------|
| `../design-rationale/SKILL.md` | General decision records |
| `../research-artifacts/SKILL.md` Mode 4 | Ability spectrum before a pick |
| `../accessibility/SKILL.md` | Blocking a11y diagnostic |
| `../cognitive-accessibility/SKILL.md` | Mental-load advisory |
| `../interaction-design/SKILL.md` | State matrices that often feed Mode 3 |
| `references/shared/project-debt-register.md` | Deferred Open items |
| `references/worked-example.md` | Worked the company-shaped example |
