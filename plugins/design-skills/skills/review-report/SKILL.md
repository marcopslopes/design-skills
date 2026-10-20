---
name: review-report
description: >-
  Turns an existing design critique into a scrollable HTML report
  (not slides, not a case-study story). Triggers on: "turn this
  critique into a report", "HTML report of this review", "proper
  report of these findings", "write this up as a review report".
  Does not run the critique (`ux-pattern` / `content` /
  `live-page-review`). Does not build decks (`deck-builder`) or
  project case studies (`writing`).
---

# Review report

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

A critique in chat or `findings.md` is the working pass. This skill
packages it as a **scrollable HTML article** so someone who was not in
the room can read it.

**Invoke in Cursor:** "turn this review into an HTML report"

Templates follow the artifact, not a case-study arc (problem → options →
decision → outcome). A live-page review has findings and no ship
decision — that is still a report.

---

## Quick Reference

| Category | When to use | Reference |
|----------|-------------|-----------|
| Templates | live-page / Figma-or-screenshot / flow | [templates.md](references/templates.md) |
| Article chassis | Copy, don't invent a new skin | [report-shell.html](references/report-shell.html) |
| Post-critique offer | After written findings | [offer-questions.md](references/offer-questions.md) |

---

## Scope boundary

| Skill | Job |
|-------|-----|
| **`review-report`** (this) | HTML report from findings that already exist |
| **`live-page-review`** | Capture + classify + hand off |
| **`ux-pattern` / `content`** | Written critique |
| **`figma-ux-audit`** | Cards on the Figma canvas |
| **`deck-builder`** | Slide decks (case study / workshop / stakeholder) |
| **`writing`** | Prose case study / essay / LinkedIn |

- **Fires on:** an explicit ask to package a completed critique as an HTML report, or a yes on the post-critique offer.
- **Does not fire on:** "review this URL" (that's capture + critique first); "make a deck"; "write a case study of this project."

---

## Load before running

1. The task folder `findings.md` (required). If findings only live in this chat, persist them first.
2. `references/templates.md` — pick one template.
3. `references/report-shell.html` — copy the `<style>` + article frame.
4. `references/shared/anti-ai-writing.md` — headings and ledes.

---

## Workflow

1. **Source.** Read `findings.md` for this task. Do not invent findings. If the critique has not run, stop and route to `live-page-review` / design-critique.
2. **Template.** Infer from the artifact (URL capture → live-page; Figma/screenshot → figma-or-screenshot; named click path → flow). Confirm in one line.
3. **Build.** Copy `references/report-shell.html`. Fill from findings + captures using the template **and format guardrails** in `references/templates.md`. Save to `projects.local/<slug>/artifacts/reports/<slug>.html` when the work is real-company (gitignored), else `projects/<slug>/artifacts/reports/`. Relative image paths into `../captures/` or the capture folder named in findings.
4. **Offer localhost.** Serve the `artifacts/` folder (so `../captures/` resolves) — do not run `publish-project` unless asked.
5. **Log.** One line in `findings.md`, task `log.md`, and `harness/logs/routing-log.md` (`MATCHED review-report`).

---

## Never do this

- Invent findings, stats, or a ship decision the folder does not have
- Emit slides (`deck-builder`) or an eight-chapter case-study arc (`writing`)
- Auto-run after critique — wait for the offer or an explicit ask
- Commit competitor captures into public `projects/`
- House-critique a competitor report (facts only, no `[House:]` labels)
- Port a 0–100 UX health score, named parallel personas, or “Flagged by: A, C” from the June `ux-review` skill

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| "Proper report" → stakeholder slides | This skill — scroll article |
| Wrapping a live review in the case-study chapter list | Use the live-page template; skip options/decision/outcome |
| Re-reviewing the URL from memory | Compose `findings.md`; if empty, run the critique first |
| Copying the June report's score / five agents | Steal Top 5 + walkthrough + matrix only |
| Packing the HTML like a metrics dashboard | Format guardrails in `templates.md` — Notion-like, ≤500 lines |

---

## Persist + log

Append-only `findings.md` line: report path + template. Never overwrite the critique entry.

---

## Reporting

This skill's deliverable is the HTML article. Chat recap is a link + template name, not a second write-up of the findings.
