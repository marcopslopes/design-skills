---
name: synthetic-user-testing
description: >-
  Walks a prototype through key tasks *as* named personas / the company
  archetypes to surface friction before a real usability test. Triggers
  on: "synthetic user test", "walk through this as [persona]", "persona
  walkthrough", "stress-test this flow as a busy provider", "simulate
  how [archetype] would use this". Never invents personas from vibes —
  uses `research-artifacts` output, `COMPANY-ARCHETYPES.md`, or designer-
  named roles. Never claims to validate or replace a real UT
  (`usability-test-guide` / live sessions). Findings are advisory.
---

# Synthetic user testing

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Closest thing to putting the design in front of people without leaving
the lab — an empathy walkthrough disciplined by specifics. It finds
friction; it does **not** prove the design works.

**Invoke in Cursor:** "walk through this as a busy provider", "synthetic
UT on the referral banner", "persona walkthrough"

---

## Scope boundary

- **Fires on:** a real surface (Design Harness route, Figma node, or clear flow
  description) + at least one named persona/archetype + at least one
  task.
- **Does not fire on:** inventing a persona (`research-artifacts`),
  writing a real UT script (`usability-test-guide`), or claiming
  "validated with users."
- **Honesty line (required in every report):**  
  `Synthetic only — not a substitute for recruiting real participants.`

---

## Step 1 — Gather context

1. Surface under test (link / route / screenshots). If the surface is a
   **localhost Design Harness URL** or a live page the designer named, prefer a
   `live-page-review` capture (screenshot + a11y tree + optional
   click-through) so Step 3 SEES/USING is from the running UI, not from
   source guesswork. If Chromium is missing, continue from screenshots /
   Figma and say so once.
2. Personas / archetypes — from, in order:
   - Designer-named role in the ask
   - `projects/<slug>/` research artifacts
   - `COMPANY-ARCHETYPES.md` (clean match only — never stretch)
3. Key tasks from `brief.md` or the ask — what "done" looks like
4. Assistive / situational context when relevant (one-handed on the go,
   200% zoom, keyboard-only, non-native language, interrupted mid-flow)

If no persona source exists, stop and ask — do not invent.

---

## Step 2 — Scenarios (moments, not test-case IDs)

```markdown
SCENARIO: [Natural situation trigger]
TASK: [What they're trying to do]
PERSONA / ARCHETYPE: [Name] — [key context]
SUCCESS: [What done looks like for them]
```

---

## Step 3 — Walk through in character

For each step:

```markdown
STEP [N]: [Action]
USING: [touch / keyboard / screen reader / …]
SEES: [UI at their context — zoom, device, interruption]
THINKS: [Likely reaction]
RESULT: ✓ succeeds / ⚠ succeeds with difficulty / ✗ fails / ? unclear
FINDING: [If ⚠ ✗ ? — what went wrong]
WHO IS AFFECTED: [This persona + similar]
```

Rules:
1. Stay in character (evaluate what *they* perceive)
2. Include emotional state from the scenario
3. Test one error/recovery path per task
4. Note friction, not only hard failure

---

## Step 4 — Cross-persona patterns

After all scenarios, cluster findings that hit 2+ personas/archetypes.
Single-persona friction stays labelled as such — don't inflate to "all
users."

---

## Output + persist

```markdown
## Synthetic walkthrough — [slug] — YYYY-MM-DD

> Synthetic only — not a substitute for recruiting real participants.

| Scenario | Persona | Result | Top finding |
|---|---|---|---|
| … | … | ⚠ / ✗ / ✓ | … |

### Findings (advisory)
1. …
2. …

### Suggested real-research follow-up
- [Method from usability-test-guide / decision-first-research if a claim needs proof]
```

Append to `projects/<slug>/findings.md`. Offer debt-register logging for
deferred advisories via `project-debt-register.md`. Never mark a KR or
PRD assumption "validated" from synthetic results — only
explored/supported/contradicted in lab.

---

## Never do this

- Never invent personas or archetypes
- Never say the product is "validated" or "user-tested" from this pass
- Never skip the honesty line
- Never treat ✗ findings as `audit` BLOCKING unless a real a11y/DS rule
  is independently violated — then hand off to `accessibility` / `audit`

---

## Related files

| File | Role |
|------|------|
| `../research-artifacts/SKILL.md` | Source of personas |
| `COMPANY-ARCHETYPES.md` | Provider archetypes |
| `../usability-test-guide/SKILL.md` | Real UT next step |
| `../ux-pattern/SKILL.md` | Structure critique (different job) |
| `docs/HOWTO-SYNTHETIC-USER-TESTING.md` | Designer guide |
