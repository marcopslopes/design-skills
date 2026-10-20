# critique-prep — AskQuestion payloads

Use Cursor `AskQuestion` when available (`references/shared/ask-question-ui.md`).
One call per assistant message. Do **not** add a custom "Other…" option.

**If `AskQuestion` is absent:** plain-text degrade — same prompts and
`options[].label` values, spelled out in chat; wait for a typed reply.

---

## A. Ambiguous — prep vs critique vs both

Fire when a Figma/FigJam URL (or named frame set) arrives with critique-
room language but **without** a clear prep verb or a clear review verb
— e.g. "I need to show this Thursday", "this is for UX review".

Do **not** fire on explicit "prep me for critique" (run this skill) or
explicit "audit / any thoughts" (run §2d).

```json
{
  "title": "Critique room — which job?",
  "questions": [
    {
      "id": "critique_job",
      "prompt": "Is this prep so you can present, a critique of the work, or both?",
      "allow_multiple": false,
      "options": [
        { "id": "prep", "label": "Prep me to present (script only)" },
        { "id": "critique", "label": "Critique the work" },
        { "id": "both", "label": "Both — script first, then critique" }
      ]
    }
  ]
}
```

| Choice | Next |
|---|---|
| `prep` | This skill |
| `critique` | §2d design-critique (drop-time AskQuestion if a Figma link is present) |
| `both` | §3 PLAN: `critique-prep` first, then `ux-pattern` (± `content`); isolated — script does not read findings |
| tool's built-in "Other…" | one clarifying follow-up |

---

## B. Stage (only if it cannot be inferred)

```json
{
  "title": "Critique stage",
  "questions": [
    {
      "id": "critique_stage",
      "prompt": "What stage is this work at for the room?",
      "allow_multiple": false,
      "options": [
        { "id": "early", "label": "Early concept — direction" },
        { "id": "mid", "label": "Mid-fi — flow and structure" },
        { "id": "final", "label": "Final check — one named area" }
      ]
    }
  ]
}
```

---

## C. Feedback type (only if they did not say)

```json
{
  "title": "Feedback wanted",
  "questions": [
    {
      "id": "feedback_type",
      "prompt": "What kind of feedback do you want from the room?",
      "allow_multiple": false,
      "options": [
        { "id": "directional", "label": "Directional — is this the right bet?" },
        { "id": "detailed", "label": "Detailed — walk the flow" },
        { "id": "one_area", "label": "One area only — I'll name it" }
      ]
    }
  ]
}
```
