# review-report — AskQuestion payloads

Use Cursor `AskQuestion` when available. Never auto-build a report.

**If `AskQuestion` is absent:** same labels in chat; wait for a typed reply.

## Post written critique

Fire after `ux-pattern` / `content` findings are in `findings.md` (or the
chat critique just finished and a task folder exists). Skip when they
already asked for a report in the same turn.

```json
{
  "title": "HTML report?",
  "questions": [
    {
      "id": "post_critique_report",
      "prompt": "Package these findings as a scrollable HTML report (not slides, not a case study)?",
      "allow_multiple": false,
      "options": [
        { "id": "yes_report", "label": "Yes, build the HTML report" },
        { "id": "no_chat", "label": "No, chat / findings.md is enough" }
      ]
    }
  ]
}
```

| Choice | Next |
|---|---|
| `yes_report` | Match `review-report`; one-line template; build |
| `no_chat` | Stop — log decline |
