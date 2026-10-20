---
name: design-memory
description: >-
  Observe and record how the designer tends to work across projects — a
  read-only mirror, never fed into critique, audit, or build. Triggers on:
  "how do I design", "my design habits", "design record", "show my design
  memory", or at project close when the designer opts in. FORBIDDEN as
  context for ux-pattern, content, audit, ui-agent, or design-kickoff.
---

# Design memory (observational only)

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Records **how this designer decides** across projects — not what a client
brand requires. The record is **descriptive, never prescriptive**: it is
**never** loaded to steer `ux-pattern`, `content`, `audit`, `ui-agent`,
`design-kickoff`, or routing.

Local file only, no shared taste profile. Read-only journal; report on
request.

---

## The one rule

**Observation does not steer work.** Current project direction comes from
`projects/<slug>/brief.md`, the company context files, and the designer's
instructions **now** — not from past habits in the record.

**FORBIDDEN:** Citing `design-record.md` during design-critique, `audit`,
token checks, or PRD kickoff unless the designer explicitly asked for the
**report** in this session.

---

## File location

| File | Scope |
|------|--------|
| `designer-context.local/design-record.md` | This designer only, **gitignored** |
| `references/shared/design-record-template.md` | Copy structure when creating the file |

Create `design-record.md` on first observation or when the designer asks
for the report. Do not commit it.

---

## When to use

| Trigger | Action |
|---------|--------|
| Designer asks "how do I design?" / "design record" / "my habits" | Read record → synthesize **report** (below) |
| End of meaningful `projects/<slug>/` arc (optional) | Offer: "Add observations from this project to your design record?" — only on **yes**, append |
| User override / emphatic correction during work | Note as observation **after** the session, not mid-critique |

**Do not** offer the report at the start of every chat. **Do not** load the
record in `designer-context.local/README.md` "when to read" for normal tasks.

---

## What to observe (evidence required)

| Signal | Record as |
|--------|-----------|
| User override ("use secondary, not primary") | Inclination + what they changed |
| "I always…" / "that's not me" | Quote + project |
| Emphatic approval of a direction | Weak alone — wait for recurrence |
| Client brand requirement in brief | **Do not record** as personal habit |

Phrase as **"tends to…" / "reached for…"** with project name — never
"always use X" as a rule.

---

## Structure

Maintain `design-record.md` using
`references/shared/design-record-template.md`: recurring decisions,
style/process habits, curiosities, moves away from, project history table.

Append-only project history; contradictions are allowed (journal, not contract).

---

## The report (user-facing)

When asked, synthesize across entries:

```markdown
# How you design
_Observed across [N] projects · descriptive, not applied to current work_

## In one line
[Honest characterization]

## How you tend to decide
[3–5 observations with evidence]

## What you reach for
[Recurring choices with counts]

## What you've moved away from
[Reversals]

## Curiosities (low confidence)
[Single-occurrence signals]

## Where the record is thin
[What isn't evidenced yet]
```

Rules: synthesize; cite evidence; describe never prescribe; separate
low-confidence curiosities.

---

## Integration

| Skill | Relationship |
|-------|----------------|
| `design-kickoff` / `brief.md` | Source of **project** truth — not design-record |
| `audit` / design-critique | **Must not** read design-record |
| `designer-profile.local.md` | Routing/onboarding prefs — separate from aesthetic/process journal |
| `projects/<slug>/debt.md` | Project advisories — committed, different scope |

---

## Anti-patterns

| Pattern | Why |
|---------|-----|
| Loading design-record into critique context | Contaminates Ceci/Jon-equivalent work on shared standards |
| Recording client palette as user taste | Client spec ≠ designer habit |
| "Always use X" phrasing | Becomes stealth prescriptive rules |
| Recording every decision | Noise — only habit-revealing signals |
