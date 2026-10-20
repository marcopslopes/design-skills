# design-handoff — AskQuestion payloads

Use Cursor `AskQuestion` when available (`references/shared/ask-question-ui.md`).
One call per assistant message. Do **not** add a custom "Other…" option.

**If `AskQuestion` is absent:** plain-text degrade — same prompts and
`options[].label` values, spelled out in chat; wait for a typed reply.

---

## A. Ambiguous — spec vs session vs ticket

Fire when the designer says **"handoff this"** / **"write a handoff"**
with **no** design/eng/spec object and **no** session/chat/context
object.

Do **not** fire on explicit "design handoff" / "eng spec" (run this
skill), "handoff this session" / "context is full" (`session-handoff`),
or "create a ticket" (`ticket-create`).

```json
{
  "title": "Which handoff?",
  "questions": [
    {
      "id": "handoff_job",
      "prompt": "What should I write?",
      "allow_multiple": false,
      "options": [
        { "id": "spec", "label": "Developer spec for this design" },
        { "id": "session", "label": "Compact this chat for a fresh session" },
        { "id": "ticket", "label": "A work-order ticket" }
      ]
    }
  ]
}
```

| Choice | Next |
|---|---|
| `spec` | This skill |
| `session` | `session-handoff` |
| `ticket` | `ticket-create` |
| tool's built-in "Other…" | one clarifying follow-up |

---

## B. After the spec (always)

Fire once `handoff-spec.md` (or the chat spec) is written. Never
auto-run the next skill.

```json
{
  "title": "Spec drafted — next?",
  "questions": [
    {
      "id": "handoff_next",
      "prompt": "The spec is a draft. Validate it before anyone builds from it. What next?",
      "allow_multiple": false,
      "options": [
        { "id": "ticket", "label": "Draft a ticket that points at this spec" },
        { "id": "wiki", "label": "Draft a docs page (Confluence, Notion, or Google Docs)" },
        { "id": "stop", "label": "Done — I'll review the spec first" }
      ]
    }
  ]
}
```

| Choice | Next |
|---|---|
| `ticket` | `ticket-create` — lean body; link `handoff-spec.md`; do not paste the spec into the ticket |
| `wiki` | `docs-brief` — draft first, create on go |
| `stop` | stop |
| tool's built-in "Other…" | one clarifying follow-up |
