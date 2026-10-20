---
name: case-study
description: >-
  Writes a project's case study once, as content — the eight-chapter story
  (opening, problem, evidence, options, decision, live prototype, outcome,
  sources) — into `projects/<slug>/case-study.md`, sourced only from that
  task folder's `brief.md`, `findings.md` and `decisions.md`. Triggers on:
  "case study for this project", "build the case study", "tell the story of
  this project", "write up how we got here" (no format named), "case study
  of <slug>", "turn this project into a case study". Owns the story, not the
  look: slides come from `deck-builder` and prose from `writing`, both
  reading this file. Not a critique findings report (`review-report`), not
  the brief / designer PRD (`design-kickoff`), not a crit script
  (`critique-prep`). Never invents quotes, numbers, options or outcomes.
---

# Case study

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

A case study is the story of a decision: what hurt, what we learned, what
we considered, what we chose, how it runs, what changed. This skill writes
that story **once** into `projects/<slug>/case-study.md`. Every format —
slides, a prose article, later a Story page — renders that file instead of
re-telling the story its own way.

**Invoke in Cursor:** "build the case study for settings-ia", "tell the
story of the checkout project", "write up how we got here".

The brief is the start of the project (`design-kickoff`). The case study is
the end: it pulls the frame from the brief, the evidence from findings, and
the call from decisions.

---

## Quick Reference

| Category | When to use | Reference |
|----------|-------------|-----------|
| Chapters + file shape | Always | [chapters.md](references/chapters.md) |
| Format offer after writing | After the file is saved | [offer-questions.md](references/offer-questions.md) |

---

## Scope boundary

| Skill | Job |
|-------|-----|
| **`case-study`** (this) | The story, as content, in `case-study.md` |
| **`deck-builder`** | Slides — renders `case-study.md` with the deck skin and live embeds |
| **`writing`** | Prose article — renders `case-study.md` as a written piece |
| **`review-report`** | One critique's findings as an HTML report — no decision arc |
| **`design-kickoff`** | The brief / designer PRD at the start of a project |
| **`critique-prep`** | What to say in a crit room |

- **Fires on:** an ask for a project's case study or story, or "write up how
  we got here" with no format named. Also the first step when someone asks
  for a case-study **deck** or **article** and `case-study.md` doesn't exist
  yet (§3 PLAN: `case-study` → `deck-builder` / `writing`).
- **After-build mode:** `ui-agent` Step 6.6 runs this once per project, when
  there's no `case-study.md` yet and `decisions.md` holds a chosen
  direction. Same workflow, minus the outline wait in step 2: the build's
  plan already covered it. Skipped chapters are still listed, never filled.
- **Does not fire on:** "make a stakeholder deck" / "workshop deck"
  (`deck-builder` directly); "HTML report of these findings"
  (`review-report`); "start a project" (`design-kickoff`).

---

## Load before running

1. `references/chapters.md` — the eight chapters, their sources, skip rules
   and the file shape.
2. The task folder: `brief.md`, `findings.md`, `decisions.md` in full;
   `log.md` for dates; `screens/` for real prototype routes.
3. `references/shared/anti-ai-writing.md` — before saving.

No task folder → say so. Work from a pasted brief only if the designer
confirms, and label every chapter that has no folder source as skipped.

---

## Workflow

1. **Source.** Read the folder files. Note which chapters each file can
   fill. If `brief.md` has no problem statement, stop and ask.
2. **Outline in chat.** One line per chapter: what goes in it and its
   source file, or **skip — nothing in <file>**. Wait for go or adjust. This
   is the cheap point to catch missing evidence. In after-build mode, show
   the outline and keep going.
3. **Write.** Fill `projects/<slug>/case-study.md` in the file shape from
   `chapters.md`. Every chapter ends with a `Source:` line. Skipped chapters
   go under **Skipped** with the reason. Mark it `Status: DRAFT`.
4. **Anti-slop pass.** Check headings and prose against
   `anti-ai-writing.md`. Quotes stay verbatim.
5. **Offer a format.** `AskQuestion` per `references/offer-questions.md`:
   slides (`deck-builder`), prose (`writing`), or stop. Never auto-run either.
   The project sidebar lists the outputs under **Case study** (Case study,
   Slide deck, Article (draft)) only when they use these names: `case-study.md` at the project
   root, the deck at `artifacts/decks/<slug>-case-study.html`, the article
   at `artifacts/<slug>-case-study.md` (`src/design-harness/projectsIndex.ts`).
6. **Log.** One line in `findings.md`, task `log.md` and
   `harness/logs/routing-log.md` (`MATCHED case-study`).

Existing `case-study.md`: update chapters in place from newer folder
entries, keep the `Source:` lines current, bump the date. Don't fork a v2.

---

## Never do this

- Invent a quote, number, rejected option, decision or shipped outcome
- Re-tell the story from chat memory when the folder answers it
- Build slides or HTML here — this skill writes markdown only
- Fill a chapter to complete the checklist — skip it and say why
- Paraphrase a quote, or turn analysis into a quote
- Auto-run `deck-builder` or `writing` after saving

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| "Case study deck" → straight to slides with no `case-study.md` | PLAN: `case-study` first, then `deck-builder` |
| Treating `review-report` as the case study | A report lists one critique's findings; it can be chapter 3 evidence, nothing more |
| Copying the brief's Case study summary as the whole case study | That's the gallery card (3 lines). The case study is all eight chapters |
| Numbers, quotes and a table in one evidence block | One group per evidence type |
| "Decision" written while everything is still open | `Decision pending` + open questions, or suggest a workshop deck |

---

## Persist + log

Append-only `findings.md` line: `case-study.md` written or updated, chapters
skipped. The file itself is the deliverable; the chat recap is a link plus
the skipped list.
