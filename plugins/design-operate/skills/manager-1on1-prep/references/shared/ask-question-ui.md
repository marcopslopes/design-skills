# AskQuestion UI — repo-wide rule for designer-facing questions

**Every question this agent asks the designer must use Cursor's native
`AskQuestion` tool** when the answer is fixed-choice (two or more discrete
options) **and the tool is in the session tool list**. That tool renders
**clickable buttons** in the Cursor UI — not numbered lists, bullets, or
"reply 1/2/3" in chat prose.

Applies to **all** harness flows: onboarding, task intake, plan gates,
handoff menus, skill disambiguation, audit nudges, fallback routing, etc.

Cursor rule (always applied): `.cursor/rules/ask-question-ui.mdc`

---

## When to use `AskQuestion`

| Situation | Use `AskQuestion`? |
|-----------|-------------------|
| Role focus, squad pick, handoff menu, yes/no, platform pick, plan approve/reject | **Yes — mandatory when the tool exists** |
| Intake / fallback with 2–3 known gaps | **Yes** — batch into **one** `AskQuestion` with up to 3 `questions[]` entries |
| Disambiguation ("audit or redesign?") | **Yes** — options for each path |
| `ui-agent` layout/structure variant fork (2–4 DS-compliant options) | **Yes** — semantic labels per variant |
| Designer must paste a URL, ticket key, or long free text with no sensible option set | **No** — one short chat line asking for that paste only (not a fake menu) |

**Default:** if you can name the options, use `AskQuestion`. When in doubt,
prefer buttons over chat prose — **unless the tool is absent** (see below).

**Do not declare your own explicit `"Other…"`/`"Something else"` option in
`options[]`.** Cursor's `AskQuestion` tool automatically appends its own
free-text "Other…" entry on top of whatever you supply — declaring one
yourself renders **two** visually identical "Other…" rows in the same card
(confirmed live regression, see `KNOWN-ISSUES.md`). Only the **plain-text
degrade path** below (when the tool is genuinely absent) needs you to spell
out an "or something else" option yourself, since there's no tool doing it
for you there.

---

## How to call it

1. **Call the `AskQuestion` tool** in the same turn the question should
   appear.
2. **One tool call per assistant message** (batch related questions in one
   call when the orchestrator allows a batch — e.g. §1 intake, max 3).
3. **Do not** write option lists in chat — not as preview, fallback, or
   "for clarity" — **when `AskQuestion` is available**.

### Tool input shape

```json
{
  "title": "<short card title>",
  "questions": [
    {
      "id": "<stable_key>",
      "prompt": "<question text>",
      "allow_multiple": false,
      "options": [
        { "id": "<option_key>", "label": "<UI label>" }
      ]
    }
  ]
}
```

| Field | Required | Notes |
|-------|----------|-------|
| `title` | optional | Card title |
| `questions[].id` | yes | Stable key for the answer |
| `questions[].prompt` | yes | Question above the buttons |
| `questions[].options` | yes | Each `{ id, label }` → one button |
| `questions[].allow_multiple` | no | `true` for multi-select |

If the list might not cover every case, that's fine — the tool's own
built-in "Other…" already handles it. Do **not** add your own `{ "id":
"other", "label": "Other…" }` entry to `options[]` (see the note above).

---

## Forbidden in chat prose (when `AskQuestion` is available)

- Numbered or bulleted option menus
- "Reply with 1 / 2 / 3" or "pick A/B/C"
- Pasting option labels while also calling (or instead of calling)
  `AskQuestion`

---

## If `AskQuestion` is not in the session tool list

**Do not block. Do not tell the designer to switch models or sessions.**

State the miss in one short line, then ask the **same question in plain
text**, with the options spelled out, and wait for a typed reply. This is
the proven degrade path (LIVE-EDGE / fallback turns that asked
`run critique / freestyle / stop` in chat). Prefer it over stopping the
task.

### Required shape

1. One honesty line, e.g. `AskQuestion is not in this session's tool list — reply with one of:`
2. The same prompt you would have put in `AskQuestion`
3. The same options as a short list (labels are fine; ids optional)
4. **Stop substantive work** until they answer — same as waiting on buttons
5. Log as usual (`FALLBACK` / gate / offer) noting `AskQuestion absent — plain-text degrade`

### Forbidden when the tool is absent

- "Switch to Composer / another model, then continue"
- Stopping the entire task because buttons aren't available
- Guessing the answer / auto-picking / silent freestyle while "waiting" for a model switch

### Still required

- Do **not** invent answers (artifact type, freestyle vs skill, annotate vs not)
- Do **not** freestyle §4 substance before they pick
- Prefer `AskQuestion` whenever it **is** available — plain text is degrade-only

See `KNOWN-ISSUES.md` (Grok 4.5 / models without `AskQuestion`).

---

## Skill-specific payloads

Exact copy/paste payloads for scripted flows live next to those flows:

| Flow | Payload location |
|------|------------------|
| Onboarding role focus, manager reports, squad opt-in | `harness/designer-onboarding/references/onboarding-questions.md` |
| Post-onboarding handoff menu | `harness/designer-onboarding/references/handoff-menu-question.md` |
| Figma drop-time mode + post-critique annotate offer | `references/from-figma-ux-audit/offer-questions.md` |
| Artifact type when critique/audit target is ambiguous | `references/shared/artifact-type-critique.md` |

All other skills: build `options[]` from context using the shape above.
When `AskQuestion` is absent, render those same `options[].label` values in
plain text per the degrade section above.

---

## Intake batching (`ORCHESTRATOR.md` §1)

When up to 3 clarifying gaps remain after inference, use **one**
`AskQuestion` with up to three `questions[]` entries — not three separate
messages, not chat prose lists (**when the tool exists**). If absent, ask
the same batch in one plain-text message with each prompt + options listed.

Example (when tool available):

```json
{
  "title": "Quick intake",
  "questions": [
    {
      "id": "platform",
      "prompt": "Which platform is this for?",
      "allow_multiple": false,
      "options": [
        { "id": "ios", "label": "iOS" },
        { "id": "android", "label": "Android" },
        { "id": "web", "label": "Web" }
      ]
    },
    {
      "id": "figma",
      "prompt": "Existing Figma to work from?",
      "allow_multiple": false,
      "options": [
        { "id": "none", "label": "Starting from zero" },
        { "id": "have_link", "label": "I have a Figma link (I'll paste it)" },
        { "id": "unsure", "label": "Not sure yet" }
      ]
    }
  ]
}
```

If a gap truly needs an unpasteable free-form answer only, ask that one
field in a single chat line — still no numbered menu **when buttons work**.
