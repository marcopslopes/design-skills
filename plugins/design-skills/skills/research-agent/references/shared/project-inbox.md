# Project inbox

Raw material the designer hands over for a project — a pasted transcript,
Slack thread text, doc text, an attached file — is saved word for word
before anything summarizes it. `findings.md` keeps the conclusions; the
inbox keeps the original, so "who said that" and "was it decided or just
said" can still be checked weeks later.

## Where

`projects.local/<slug>/inbox/` — **always the gitignored side**, even for a
legacy project whose paperwork sits in `projects/<slug>/`. Raw pastes carry
people's names and words; `projects/` is public. Create the folder on the
first save; never pre-create it.

Legacy hand-made raw folders (e.g. `projects.local/checkout/context/`)
count as that project's inbox — read them, don't move them.

## What gets saved

| Save | Don't save |
|---|---|
| Pasted text: transcripts, thread text, doc excerpts, notes, survey answers | A link the source still holds (Slack permalink, Doc URL) — that's a `sources.md` row |
| An attached file — **copied**, never moved | Anything with no project in play (that's `designer-context.local/` or nothing) |
| A link plus the parts that mattered, when the source may not last | Secrets, credentials, personal DMs the designer didn't ask to use |

## File shape

`YYYY-MM-DD-<what-it-is>.md` (e.g. `2026-10-11-pricing-sync-transcript.md`),
the content verbatim under a short header:

```
---
kind: transcript | thread | doc | note | file
source: pasted | <original path> | <url>
date: <when it happened, or "unknown">
people: [<names that appear>]
filed: YYYY-MM-DD
---
```

## Rules

- **Save first, then summarize**, in the same turn. The `findings.md`
  entry cites the inbox path.
- **Never edit or delete a filed item.** Misfiled → move it and say so.
- **Not loaded by default.** Read an inbox file only when a claim needs
  checking or a skill needs the original — it costs nothing until opened.
- One line in chat when saving: `Saved to inbox/<file>.`
