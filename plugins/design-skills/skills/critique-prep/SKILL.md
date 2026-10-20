---
name: critique-prep
description: >-
  Turns Figma (+ brief/BRD/Confluence) into a short presenter script
  for a group design critique — frame, walk order, feedback ask,
  lenses to invite, blank capture sheet. Triggers on: "prep me for
  critique", "critique presenter script", "help me present this in
  UX review", "frame this for design critique", "walkthrough script
  for critique". Never critiques the work (`ux-pattern` /
  `figma-ux-audit`). Not a case-study writeup (`writing`), not slides
  (`deck-builder`), not a research readout (`research-shareout`).
  Explicit ask only — never auto-offered on a Figma drop.
---

# Critique prep

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Helps the **presenter** prepare the show. Reviewers already have
`ux-pattern` / `figma-ux-audit`. This writes a speakable script so the
room hears a frame, walks the right frames, and leaves with decisions
captured.

**Invoke in Cursor:** "prep me for critique", "critique presenter script",
"help me present this Thursday"

One-line pitch: drop Figma (+ brief) → get a critique **presenter
script**, not a critique.

---

## Quick Reference

| Category | When to use | Reference |
|----------|-------------|-----------|
| Script shape | Chat + `findings.md` | [output-template.md](references/output-template.md) |
| Lenses | Stage-matched invite list | [lenses.md](references/lenses.md) |
| Ambiguous ask | Prep vs critique vs both | [offer-questions.md](references/offer-questions.md) § A |

---

## Scope boundary

| Skill | Job |
|-------|-----|
| **`critique-prep`** (this) | Speakable presenter script for a design-critique slot |
| **`ux-pattern` / `content`** | Judge the design — findings for the designer |
| **`figma-ux-audit`** | Annotation cards on the canvas |
| **`review-report`** | HTML article from findings that already exist |
| **`writing`** | Prose case-study / essay |
| **`deck-builder`** | Slides (case study / workshop / stakeholder) |
| **`research-shareout`** | Research readout to stakeholders |
| **`design-rationale`** | Why a *finished* decision sticks |
| **`confluence-brief`** | Handoff page to build, not critique theatre |
| **`synthetic-user-testing`** | Persona walkthrough as validation theatre |

- **Fires on:** an explicit ask to prepare / frame / script a **presentation
  of their own work** in a group design critique or UX review.
- **Does not fire on:** "audit / any thoughts / gut check" (that's
  design-critique). "Write a case study" (that's `writing`). "Make a
  deck" (that's `deck-builder`).
- **Hard rule:** this skill **never critiques the work**. No findings
  disguised as "tips." If they also want a review, that's a separate
  `ux-pattern` ask — or a multi-skill PLAN (prep first, critique after,
  isolated).

---

## Load before running

1. This file + `references/output-template.md` + `references/lenses.md`.
2. `references/shared/anti-ai-writing.md` — the script is spoken in a room.
3. Org-pack `COMPANY-BUSINESS.md`, `COMPANY-ARCHETYPES.md`,
   `COMPANY-PATTERNS.md` when they exist (resolved per
   `harness/ORCHESTRATOR.md` §0a) — company-aware framing, never invented
   metrics.
4. A pasted "How we critique" / UX-review Confluence URL if they gave one;
   else a `COMPANY-SOURCES.md` row that names the critique ritual.
5. Figma screenshot / metadata (MCP) when a URL is present.
6. Linked Confluence / BRD / PRD / Jira if provided.
7. Task folder `brief.md` / `decisions.md` if an active `projects/<slug>/`
   matches.

**Do not** load a recent `ux-pattern` / `content` critique in
`findings.md` to write the script. Isolation: the presenter frames the
work they made; they do not walk in already answering the review.

---

## Workflow

1. **Route, don't guess.** Explicit prep phrasing → this skill. "Audit /
   any thoughts" → design-critique (§2d). "I present Thursday" / "show
   this in critique" + Figma **without** prep or review wording →
   `AskQuestion` payload A in `references/offer-questions.md`. Both →
   §3 PLAN: this skill first, then `ux-pattern` (± `content`); do not
   let either pass read the other's output.
2. **Inputs.** Required: Figma / FigJam URL or a clear frame set. If
   missing → one chat line asking for the paste (not a fake menu).
   Optional: brief/BRD/Confluence/Jira, time budget (default **15–20
   min**), what they think they need feedback on, journey stage if known.
3. **Infer stage** from the file + brief (early concept / mid-fi / final
   check). Ask only if still ambiguous — payload B. Infer the feedback
   ask from what they said; if they didn't say, payload C.
4. **Huge file.** More than about 12 top-level frames and no named
   subset → ask which frames. Do not script the whole file.
5. **Write the script** from `references/output-template.md`. Speakable
   in the time budget. Stage-matched language (early concept ≠
   final-check). Company-aware only from loaded sources. Run the
   anti-slop pass.
6. **Sign-up row.** Draft Presenter / Links / Stage / Feedback wanted /
   Time needed **in chat only**. Never create or edit a Confluence page
   unless they explicitly ask — then `confluence-brief`.
7. **Persist + log.** Chat + append to `projects/<slug>/findings.md`
   titled **Critique presenter script — YYYY-MM-DD**. No matching
   folder → chat only, offer to open/create a task folder; do not write
   into `designer-context.local/` unasked. One line each in the task
   `log.md` (if any) and `harness/logs/routing-log.md`
   (`MATCHED critique-prep`).

---

## Quality bar

- Speakable in the time budget (no essay)
- Stage-matched
- Company-aware when context exists — never invent metrics
- No critique findings disguised as tips
- 3–6 walk beats for a 15–20 min slot
- Capture sheet stays blank (for live notes), except the feedback-ask
  line they will paste into the sign-up

---

## Never do this

- Critique the screens, or sneak findings in as "watch for…"
- Auto-run because someone dropped a Figma URL
- Auto-write Confluence
- Emit slides (`deck-builder`) or an eight-chapter case-study (`writing`)
- Read `ux-pattern` findings to "help them defend the work"
- Script every frame in a large file
- Hardcode a company name, product line, or critique-hub URL into this
  skill — those come from the org-pack / a pasted source

---

## Related files

| File | Role |
|------|------|
| `../ux-pattern/SKILL.md` | Reviewer-side critique — separate ask or isolated PLAN |
| `../figma-ux-audit/SKILL.md` | Canvas annotations — not this script |
| `../review-report/SKILL.md` | HTML report from findings after critique |
| `../writing/SKILL.md` | Prose case study |
| `../deck-builder/SKILL.md` | Slides |
| `../research-shareout/SKILL.md` | Research readout, different room |
| `documentation/skills/critique-prep.md` | Designer HOWTO |
