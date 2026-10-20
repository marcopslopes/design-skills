# case-study — AskQuestion payloads

Use Cursor `AskQuestion` when available. Never auto-run a format skill.

**If `AskQuestion` is absent:** same labels in chat; wait for a typed reply.

## After `case-study.md` is saved

Skip when the designer already named the format in the same ask (then it's
the §3 PLAN's next step).

```json
{
  "title": "Case study saved",
  "questions": [
    {
      "id": "case_study_format",
      "prompt": "case-study.md is written. Show it as something?",
      "allow_multiple": false,
      "options": [
        { "id": "slides", "label": "Slides — deck-builder case-study deck" },
        { "id": "prose", "label": "Prose article — writing, case-study mode" },
        { "id": "stop", "label": "Not now — the file is enough" }
      ]
    }
  ]
}
```

| Choice | Next |
|---|---|
| `slides` | Match `deck-builder`; case-study template reads `case-study.md` |
| `prose` | Match `writing`; case-study mode reads `case-study.md` |
| `stop` | Stop — log decline |
