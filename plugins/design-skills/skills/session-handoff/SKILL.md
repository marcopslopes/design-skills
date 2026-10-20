---
name: session-handoff
description: >-
  Compacts the current chat into a durable handoff so a fresh agent
  session can continue without re-asking, re-discovering, or repeating
  mistakes. Triggers on: "handoff this session", "session handoff",
  "compact this chat for a new session", "context is full, write a
  handoff", "continue in a fresh chat", "write a handoff for the next
  agent". State-first (what is true), not a command list. Different from
  designer-onboarding's post-profile handoff menu (that routes *next
  work*, this captures *this session*). Different from
  `design-retrospective` (post-ship learning, not chat continuity).
  Different from `design-handoff` (eng spec → `handoff-spec.md`).
  Does not invent project status — points at `projects/<slug>/` files.
---

# Session handoff

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Write a complete handoff that lets a **fresh agent** — with zero memory
of this chat — continue the work without re-asking, re-discovering, or
repeating traps.

**Invoke in Cursor:** "handoff this session", "write a handoff for a
fresh chat", "context is full — compact this"

---

## Scope boundary

| This skill | Not this skill |
|---|---|
| Compact **this chat** into transferable state | Onboarding **handoff menu** (`designer-onboarding`) — pick next work after profile setup |
| Continue an in-flight task across sessions | `design-retrospective` — post-ship/milestone learning |
| Point at existing `brief` / `findings` / `decisions` / `log` | Re-run `design-kickoff` or rewrite the PRD |
| One handoff artifact + short "paste this" prompt | Stakeholder shareout (`research-shareout` / `deck-builder`) |
| Writes `projects/<slug>/handoff.md` | **`design-handoff`** — eng spec → `handoff-spec.md` |

**On-demand only.** Never auto-fires when context gets long — but per
`harness/ORCHESTRATOR.md` §5's session-length nudge (2026-08-12, cost
audit), once a chat hits ~15–20 turns on one task the agent may *suggest*
a handoff in one short line. That's a suggestion, not this skill firing:
this skill only runs, and only writes `handoff.md`, on the designer's
explicit go.

---

## Load before writing

1. Active `projects/<slug>/` if one applies — especially `brief.md`,
   `decisions.md`, recent `findings.md` / `log.md` tails (do **not**
   paste those files into the handoff).
2. Prior `projects/<slug>/handoff.md` if it exists — **update** it
   rather than starting from scratch.
3. `harness/ORCHESTRATOR.md` / `AGENTS.md` only enough to avoid
   restating standing rules already in repo config.

---

## Core principles

1. **State, not instructions.** "Auth sheet is done; logout not started"
   — never "Implement logout next." The fresh agent decides actions.
2. **Reference, don't duplicate.** Point to paths/URLs already in the
   task folder. Handoffs that re-embed findings go stale.
3. **Capture the why.** Decisions and rejected approaches are the
   highest-value, least recoverable content.
4. **Verify framing.** Treat claims as context to check against files —
   not facts to trust blindly.
5. **Redact secrets.** No tokens, passwords, PII. Say where credentials
   live (e.g. `.env.local`, not committed) — never values.
6. **Ruthless.** Every line must be something the next agent cannot
   trivially get by reading the code or project config.

---

## Workflow

1. **Match the task.** If an active `projects/<slug>/` is clear, use it.
   If ambiguous, ask once (AskQuestion when available) which slug — or
   proceed as **no-task** handoff (chat-only continuity).
2. **Fill every section** of the template below. Empty sections → `None`.
3. **Output** the filled template in **one fenced code block** in chat
   (easy copy).
4. **Save** the same content:
   - Task known → `projects/<slug>/handoff.md` (overwrite/update; keep
     a one-line dated note in `log.md`: `session-handoff written`).
   - No task → `designer-context.local/session-handoff.md` if that
     folder exists, else tell the designer the chat block is the
     artifact (do not commit a root `HANDOFF.md`).
5. **Tell the designer** the path + the one-line paste for a fresh chat:
   `Read <path>, verify claims against the listed files, then wait for
   my instructions.`

---

## Output template

```
# HANDOFF: <short title>
Generated: <YYYY-MM-DD> · Session focus: <one line>
Task: <projects/<slug>/ | none>

## 1. Goal
<What we are ultimately trying to accomplish. 1–3 sentences.>

## 2. Why this matters / background
<Motivation and constraints. Skip anything already in AGENTS.md /
ORCHESTRATOR / brief.md — point there instead.>

## 3. Current state
- DONE: …
- PARTIAL: …
- NOT STARTED: …

## 4. Key decisions (and why)
- <choice> — <reasoning>
(Point to decisions.md entries when they exist.)

## 5. Traps & dead ends
- <tried and failed>
- Do NOT <tempting wrong move>

## 6. Relevant files & pointers
- <path:L?–L?> — <what specifically is there>
- <URL / ticket> — <role>

## 7. Open work (status + dependencies)
- <remaining work as state, not commands>
- <what blocks what>

---
## Prompt for the fresh agent
Before responding, read every file listed under "Relevant files &
pointers" above. Do not summarize or claim you already have context —
actually read each file. Treat every claim in this handoff as context
to verify against the files, not facts to trust blindly. Then wait for
my instructions before taking any action.
```

---

## Never do this

- Never write imperatives for the next agent ("Build X", "Fix Y")
- Never paste full `findings.md` / PRD / Slack dumps into the handoff
- Never invent DONE/PARTIAL status that isn't backed by files or this
  session's real work
- Never auto-run after unrelated skills; designer must ask (or clearly
  ask to "compact / handoff")
- Never confuse with onboarding handoff menu or `design-retrospective`
- Never put secrets in the handoff or commit them

---

## Related files

| File | Role |
|------|------|
| `docs/HOWTO-SESSION-HANDOFF.md` | Designer-facing guide |
| `harness/ORCHESTRATOR.md` §2 | Routing row |
| `projects/<slug>/handoff.md` | Preferred durable artifact |
| `harness/designer-onboarding/SKILL.md` | Different "handoff" — next-work menu |
| `../design-retrospective/SKILL.md` | Post-ship learning, not chat continuity |
