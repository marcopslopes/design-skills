# Meeting context — grounded, not generic

**The gap this closes:** a Slack draft or a calendar invite that only
says "got time to chat?" is logistics with no substance — a designer
still has to write the actual message themselves. This file makes
`scheduling` behave like it actually knows what's going on, the same way
`manager-1on1-prep` turns live data into a prep doc instead of a blank
"how's it going?" — pulling real, sourced context into whatever gets
drafted or booked, framed as things to cover, never as invented filler.

**This is a real scope addition** (added 2026-07-19, on top of the
narrower "know the topic" rule this file supersedes) — `scheduling` was
originally just find/propose/book; it now also gathers and surfaces
grounded context about *why* the meeting matters, wherever that context
already exists.

---

## When this runs

Every time `scheduling` is about to produce content for a human to read —
a Slack draft (`calendar-check.md`'s "not connected" alternative), a
calendar invite's description/notes field on booking (Step 4), or the
proposal message itself if it's substantive enough to warrant one. Not a
new step that blocks Steps 0–4's actual logistics — this runs alongside
Step 1 (scoping) and feeds whatever gets drafted later.

---

## Scope — sources, explicitly closed list (same discipline as `manager-1on1-prep`)

This uses exactly these sources, and no others:

1. **The current conversation** — the most immediate, most authoritative
   source. If the scheduling ask followed a discussion of a specific
   ticket, project, decision, or open question, that discussion *is* the
   context — use it directly, and say so plainly when you're drawing on
   it ("that's what we were just discussing").
2. **`projects/<slug>/` task-folder data**, if the topic maps to a known
   task folder — `brief.md`'s open questions, `findings.md`'s most recent
   entries, `decisions.md`'s latest logged decision. Per
   `projects/README.md`, matching a topic to a folder is a **heuristic**
   (name/keyword match, not a structured field) — say "likely" if the
   match isn't a clean one, the same honesty standard
   `manager-1on1-prep` § Scope already applies to its own heuristic
   `projects/` matches.
3. **A single, explicitly named ticket or docs-page reference** — if a ticket
   key or link is already in the request or the conversation, one direct
   lookup (the tracker's get-ticket call / a docs page fetch) for its current
   status is fair game. This is **not** a search or a sweep — only look
   up something that's already been named, don't go hunting for related
   tickets nobody mentioned.

**Explicitly out of scope — do not build a workaround for this, ever:**

- **No Slack search of any kind**, public or private channels, for this
  skill's own context-gathering — stricter than even `manager-1on1-prep`'s
  "public channels only" allowance, because this skill has no standing
  reason to go looking for chatter about a meeting that hasn't happened
  yet. If the requester wants a broader sweep before scheduling
  something, that's `research-agent`'s job — say so and route there
  rather than quietly expanding this skill's reach.
- **No Figma/Miro sweep.** If the meeting is genuinely about a design
  file, the requester can paste the link themselves; this skill doesn't
  go find it.
- **No multi-ticket or cross-project search.** One named ticket, one
  matched project folder — never a `project in (...)` style query. If the
  topic legitimately spans more than that, this skill isn't the right
  tool — say so and point at `research-agent` or `workload-agent`
  instead of forcing a shallow multi-source pull.

---

## Output shape — things to cover, never conclusions or invented filler

Same framing discipline `manager-1on1-prep` uses for its prep docs: **a
grounded talking point is something to raise, not a conclusion already
reached.** "Worth checking whether the [decision logged on DATE] still
holds," not "you decided X" stated as settled fact if it's from a few
lines of `decisions.md` you're inferring current relevance from.

- **1–4 short talking points, each tied to a real source** — a
  conversation moment, a `projects/<slug>/` file + section, or a cited
  ticket or docs-page link (markdown link, per
  `references/shared/source-links.md` — never a bare ticket key when
  the tool is connected).
- **If nothing groundable turns up beyond the stated topic** — say so
  plainly and keep the draft to the topic alone. Do **not** pad with
  generic filler ("catch up," "sync on priorities," "touch base") to
  avoid looking thin — a topic-only draft is honest; a padded one is
  worse than useless because it reads as informed when it isn't.
- **Never present an inferred talking point as something the other
  person already knows or agrees with** — "might be worth raising X,"
  never "X is still an issue for both of you."

### Example — Slack draft with real context

> Hey Leo — got 30 min this week to sync on the checkout redesign?
>
> A few things that might be worth covering:
> - `projects/checkout-redesign/decisions.md` logged going with the
>   card-list layout on [date] — still holding, or has that shifted?
> - [PROJ-482](<ticket URL>) "Checkout
>   error states" is still In Progress — good time to check in on it?
>
> (Pulled from the project folder and that one ticket — nothing beyond
> that, so let me know if there's more you want to add.)

### Example — nothing groundable, honest topic-only draft

> Hey Leo — got 30 min this week to sync on the new referral flow?
>
> (Didn't find anything in `projects/` or a named ticket beyond what you
> told me — keeping this to the topic itself. Let me know if you want me
> to add anything specific.)

**The parenthetical sourcing line is mandatory whenever context is used,
the same way `manager-1on1-prep`'s "Data sources" line is mandatory on
every prep doc** — so the recipient (or the designer re-reading it later)
never has to guess what was actually checked versus assumed.

---

## Applies to booking too, not just the Slack-draft alternative

When Step 4 actually creates the calendar event (Calendar connected
path), the same grounded talking points can go in the event's
description/notes field — this is content on the requester's **own,
newly-created** event, not a read of anyone else's calendar, so it
doesn't touch the free/busy-only hard rule in `SKILL.md`. Same rules
apply: sourced points or an honest "nothing beyond the stated topic,"
never invented filler.

**If there isn't enough real context to draft anything substantive,
book the logistics anyway and say so plainly — don't let a missing
agenda hold up or muddy a booking that's otherwise ready to go:**

> "Booked with Hana, 2pm tomorrow — I didn't have enough context to
> draft talking points, want me to pull from a specific project?"

This keeps the two things separate on purpose: the booking is a done,
confirmed fact (logistics), and the context gap is a plain, undramatic
note plus an actual next step (name a project) — never a vague apology,
and never a reason to delay the booking itself waiting on context that
isn't there yet.

---

## Related files

| File | Role |
|---|---|
| `../scheduling/SKILL.md` | Calls this at Step 1, before any draft or booking that includes content — also owns the "draft stays a draft until approved" hard rule for the Slack-message path |
| `references/from-scheduling/calendar-check.md` | The separate, Calendar-connection-specific check — this file is about content, that one's about access |
| `SKILL.md` | The "questions to ask, not conclusions" framing and the closed-source-list pattern this file borrows |
| `references/shared/source-links.md` | Markdown-link citation rule for any ticket or docs-page reference surfaced here |
| `projects/README.md` | The task-folder schema this file heuristically matches against |
