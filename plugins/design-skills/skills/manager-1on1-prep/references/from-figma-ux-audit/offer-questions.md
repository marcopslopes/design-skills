# figma-ux-audit — AskQuestion payloads

Use Cursor `AskQuestion` when available (see `references/shared/ask-question-ui.md`).
Never auto-run annotations — wait for an explicit choice, then show a plan
if the run still needs multi-skill analysis.

**If `AskQuestion` is absent:** plain-text degrade — same prompts and
`options[].label` values below, spelled out in chat; wait for a typed
reply. Do not tell the designer to switch models.

---

## A. Drop-time (Figma / board shared, before critique)

Fire when the designer pastes a Figma/FigJam URL or board and the intent
is review/critique/feedback **or** the link arrives without a clear mode.
Do **not** skip this and jump straight to written critique.

```json
{
  "title": "Figma review mode",
  "questions": [
    {
      "id": "figma_review_mode",
      "prompt": "Want a design critique on this — written findings, annotations directly on the Figma canvas, or both?",
      "allow_multiple": false,
      "options": [
        { "id": "written", "label": "Written findings (findings.md)" },
        { "id": "annotations", "label": "Figma canvas annotations" },
        { "id": "both", "label": "Both" }
      ]
    }
  ]
}
```

| Choice | Next |
|---|---|
| `written` | §2d design-critique chain (`ux-pattern` → `content`); after complete, fire **payload B** |
| `annotations` | `figma-ux-audit` only (still loads ux-pattern/content context); plan if multi-skill |
| `both` | design-critique first → then `figma-ux-audit` (one PLAN covering both; wait for go) |
| tool's built-in "Other…" | one clarifying follow-up |

---

## B. Post design-critique (written-only path)

Fire **after** `ux-pattern`/`content` findings are appended, when drop-time
was `written` or critique ran without canvas annotations yet.

```json
{
  "title": "Add Figma annotations?",
  "questions": [
    {
      "id": "post_critique_annotate",
      "prompt": "Want these findings added as annotation cards directly on the Figma canvas too?",
      "allow_multiple": false,
      "options": [
        { "id": "yes_annotate", "label": "Yes, add Figma annotations" },
        { "id": "no_findings", "label": "No, findings.md is enough" }
      ]
    }
  ]
}
```

| Choice | Next |
|---|---|
| `yes_annotate` | Match `figma-ux-audit` row; show PLAN if needed; place cards from findings |
| `no_findings` | Stop — log decline |
| `other` | one clarifying follow-up |
