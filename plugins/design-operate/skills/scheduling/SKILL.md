---
name: scheduling
description: "Standalone, on-demand meeting-scheduling capability — finds a slot, proposes it, and books only on explicit confirmation, **and** pulls real, sourced context (`projects/<slug>/`, a named ticket, the current conversation) into whatever gets drafted or booked, framed as things to cover rather than invented filler. General-purpose, not manager- specific: callable by any designer, IC or manager, for any scheduling request. Triggers on: \"book a meeting with [name]\", \"find time with [name] tomorrow afternoon\", \"schedule a sync with [name]\", \"when are we both free\", \"propose a time for [meeting]\". **Optional, never mandatory** — Calendar connection is checked only at the moment this fires (`references/calendar-check.md`), not part of the four-MCP onboarding gate, and no other skill's behavior depends on whether Calendar is connected. Never books without the designer explicitly confirming a specific slot first. Reads free/busy only, never event content, of anyone's calendar but its own logged-in account's."
---

# Scheduling

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

A standalone skill for finding and booking meeting time — same shape as
`workload-agent`: its own skill, independently discoverable in the
routing table, that other skills call into rather than re-implement. Not
a builder, not a research sweep, and not a new gate anything else in this
harness has to pass through. It exists purely for the moment someone
actually wants to schedule something.

**Not just logistics.** Whatever this skill drafts or writes — a Slack
message, a calendar invite's description — is grounded in real, sourced
context (`references/meeting-context.md`: the current conversation, a
matched `projects/<slug>/` task folder, a named ticket) whenever that
context actually exists, framed as things to cover rather than a
generic "got time to chat?" Never invents talking points that aren't
actually supported by a real source.

**Invoke in Cursor:** "book a meeting with [name]", "find time with
[name] tomorrow afternoon", "schedule a sync with [name]", "when are we
both free"

**Callable by anyone** — IC or manager, standalone chat or composed from
another skill. This is not gated to a role, unlike `manager-1on1-prep`.

---

## Read this first — optional, never a gate

**Calendar is not part of onboarding.** The onboarding tool setup
(`harness/designer-onboarding/references/mcp-check.md`) covers the work
tools (docs, tracker, roadmap, chat) plus Figma and Miro — this skill does not add to that list,
does not check Calendar during onboarding, `design-kickoff`, or any other
mandatory-path skill, and no other skill's behavior changes based on
whether Calendar is connected.

This skill matters at exactly one moment: **when someone asks to schedule
or find time for something.** If Calendar isn't connected at that moment,
the correct move is to say so plainly and offer to help another way —
never to block the rest of the conversation, and never to nag about
connecting it. See `references/calendar-check.md` for the full
connection-check protocol (deliberately the opposite posture from
`mcp-check.md`'s hard gate).

---

## Hard rule — free/busy only, never event content

**Every calendar read this skill ever performs — the requester's own
calendar included — is a free/busy read: is this block taken or open,
nothing more.** This skill never reads, surfaces, or reasons about an
event's title, description, location, or attendee list, for anyone's
calendar, at any point in its execution.

- This applies to **someone else's calendar** for the obvious reason (no
  legitimate scheduling need requires seeing what a colleague's existing
  meetings are called).
- It applies **just as strictly to the requester's own calendar** the
  moment the read is being used to find time *with someone else* — e.g.
  checking your own availability to propose a slot to a colleague still
  means free/busy blocks only, never "what's this 2pm meeting of mine
  called." The purpose of the read (finding a slot for someone else),
  not whose calendar it is, is what triggers this rule.
- If the calendar API/MCP tool available only offers a combined
  read (event details bundled with the free/busy block, no free/busy-only
  mode), **do not silently use the richer read** — say so, use only the
  busy/free boolean signal from what comes back, and never repeat, quote,
  or paraphrase any event title/description/attendee data in output, logs,
  `projects/` files, or a `manager-1on1-prep` doc it fed into.
- **Never fires automatically** on a calendar sync/webhook — every read
  happens in direct response to a specific scheduling request, not a
  background scan.

If you catch yourself about to write something like "looks like you have
a 1:1 with X at that time" or "there's a 'Payments sync' blocking
Wednesday" — stop. That's event content, not a free/busy signal, and this
skill doesn't get to see or repeat it regardless of whose calendar it
came from.

---

## Hard rule — a drafted Slack message stays a draft until approved

**A "draft a Slack message" outcome (`references/calendar-check.md`'s
decline flow, or a proposal to someone whose calendar isn't visible) is
always shown in chat first — this skill never calls a Slack-send tool
(e.g. `slack_send_message`) on its own.** Same plan-gate discipline this
harness applies to every other action that sends or commits something on
someone's behalf (`harness/ORCHESTRATOR.md` §3) — a Slack message reaching
someone else's inbox is exactly that kind of action, no different in kind
from a calendar invite.

- Show the full drafted text in chat, exactly as it would be sent.
- Wait for **explicit approval or an edit** before sending anything.
  "Looks good" / "send it" / an edited version they've approved all
  count; silence, a topic change, or moving on to something else in the
  conversation does **not** count as approval.
- If the designer edits the draft, send (or re-show) the edited version
  — never silently revert to the original draft on the theory that it
  was "more complete."
- If no Slack-send tool is available, or the designer never explicitly
  says to send it, that's fine — the draft itself, sitting in chat for
  the designer to copy/send themselves, is a complete and valid outcome
  on its own. Don't chase a "should I send this?" follow-up if the
  conversation has clearly moved on.

---

## Workflow

### Step 0 — Check Calendar, once, silently if possible

Run `references/calendar-check.md`'s probe before anything else in this
skill. Two outcomes:

- **Not connected** → per `references/calendar-check.md`'s exact
  `AskQuestion` payload — three options: draft a Slack message, share
  availability manually in chat, or connect Calendar now — and **stop
  this skill's calendar-specific steps there** until an answer comes
  back. This is not a failure state to apologize for at length; one
  plain question is enough, with no fourth explicit "Other…" option
  layered onto the tool's own built-in one (see that file's note on the
  live-confirmed duplicate-"Other…" rendering bug).
- **Connected** → continue to Step 1.

### Step 1 — Scope the request

Infer from the request, and ask only what's missing (batch into one
`AskQuestion` if more than one gap remains, per
`references/shared/ask-question-ui.md`):

- **Who** — the other person. Resolve via `lookupJiraAccountId` or Slack
  user search if you need an email/handle for an eventual invite. **If
  that lookup returns more than one match on the name given** (same
  first name, multiple people — a known real case, e.g. two different
  Priyas in this org), resolve the ambiguity the same way Step 1's
  topic inference does, in this order, before asking anyone anything:
  1. **The current conversation** — has one of the candidates already
     been named with a distinguishing detail (full name, role, project,
     squad, an earlier message that already disambiguated them)? If so,
     use that match silently — don't re-ask something the conversation
     already answered, the same "never re-ask what's already
     inferable" discipline `harness/ORCHESTRATOR.md` §1 applies
     everywhere else in this repo.
  2. **`designer-profile.local.md` / `COMPANY-SQUADS.md`** — if
     the request's context (a squad, a project, a ticket) points
     at one candidate more plausibly than the other (e.g. a design
     topic naming the Senior Product Designer candidate over the
     Program Manager one), that's a real signal, not a coin flip — but
     see the guardrail below before treating it as settled.
  3. **If still ambiguous after 1–2** — ask, and only then: name both
     candidates with the one distinguishing detail that actually
     separates them (role, title — not a generic "which one?"), batched
     into the same `AskQuestion` as any other missing gap (e.g. topic,
     per below) rather than a separate round-trip.

  **Guardrail — don't let a "plausible" match from step 2 substitute for
  an actual confirmation when the stakes are a real calendar invite.** A
  squad/topic hint is a reasonable tie-breaker for low-stakes inference
  (like topic wording), but sending a meeting invite to the *wrong*
  Priya is a real, external-facing mistake, not just an awkward
  sentence — if step 1's conversation context doesn't already make it
  unambiguous, still ask, even if step 2 has a mild lean.
- **Rough window** — "tomorrow afternoon," "this week," "next 1:1 slot" —
  infer from the phrasing rather than asking the requester to restate it.
- **Duration** — default to 30 minutes for a 1:1/check-in/sync, 30–60 for
  an unspecified "meeting," unless the request states one. Confirm only
  if genuinely ambiguous (e.g. a named recurring meeting whose usual
  length isn't obvious).
- **Topic and real context** — run `references/meeting-context.md` now:
  infer the topic, then check its explicitly closed source list (current
  conversation, a matched `projects/<slug>/` folder, a single named
  ticket) for anything groundable enough to turn into 1–4 talking
  points. Do this even on the connected-Calendar path where a bare
  invite doesn't strictly need it — Step 1 is where it's cheapest to
  gather, so it's already on hand whether Step 0's Slack-draft
  alternative or Step 4's event description ends up needing it.

### Step 2 — Check free/busy (see Hard rule above — free/busy signal only)

1. **Requester's own calendar** — read free/busy for the inferred window.
   This is the one read that's reliably available once Calendar is
   connected.
2. **The other person's calendar, if and only if visible** — per
   `calendar-check.md` § Cross-calendar visibility, do not assume this
   works. If a genuine shared/org-wide free-busy read is available, use
   it. If it isn't, **say so honestly** rather than silently proposing as
   if both calendars were checked:

   > "I can only see your calendar, not [name]'s — here's what's open on
   > your side for [window]. Want me to propose these to them directly,
   > or draft a Slack message asking for their availability first?"

3. If the other person's calendar genuinely isn't visible and the
   requester wants to proceed anyway, that's fine — just carry the
   caveat into the proposal in Step 3 rather than dropping it.

### Step 3 — Propose, don't book

Show 1–3 candidate slots and **wait for explicit confirmation before
creating anything.** This is the same plan-gate discipline the rest of
this harness applies to any action that sends or commits something on
someone's behalf (`harness/ORCHESTRATOR.md` §3, `design-kickoff` Step 3)
— a calendar invite is exactly that kind of action.

Use `AskQuestion` for the pick (fixed, small option set, per
`references/shared/ask-question-ui.md`):

```json
{
  "title": "Pick a time",
  "questions": [
    {
      "id": "slot",
      "prompt": "Propose one of these to [name]?",
      "allow_multiple": false,
      "options": [
        { "id": "slot_1", "label": "Tue 2:00–2:30pm" },
        { "id": "slot_2", "label": "Wed 10:00–10:30am" },
        { "id": "slot_3", "label": "Thu 3:30–4:00pm" },
        { "id": "other", "label": "None of these — let me suggest a time" }
      ]
    }
  ]
}
```

**Never create, send, or hold an event before this answer comes back.**
If the other person's calendar wasn't visible (Step 2), restate that
caveat again here, right next to the options — don't let it get lost
between steps.

### Step 4 — Book only on confirmation

Once a slot is explicitly picked:

1. Create the event on the requester's calendar. If Step 1's context
   gathering (`references/meeting-context.md`) turned up real, grounded
   talking points, offer to put them in the event's description/notes
   field — this is content on the requester's own new event, not a read
   of anyone else's calendar, so it's unaffected by the free/busy-only
   hard rule above. Same honesty rule applies: sourced points, or plainly
   nothing beyond the stated topic — never invented filler. **If there
   wasn't enough real context to draft anything substantive, book the
   logistics anyway** — don't hold up a ready booking waiting on context
   that isn't there — and say so plainly in the confirmation (Step 4.3
   below), per `meeting-context.md`'s exact phrasing.
2. Invite the other person if an email/handle is known and the requester
   confirmed that's wanted (asked as part of Step 3's confirmation, not a
   separate silent assumption) — add them as an attendee so they get a
   real calendar invite, not just a note in chat.
3. Confirm back in chat with the actual event time and, if available, a
   link to the created event. State plainly whether an invite was sent to
   the other person or whether they still need to be looped in manually
   (e.g. their calendar wasn't visible, so this is a one-sided hold until
   they accept or you follow up). **If Step 1 found no real context to
   draft talking points from, say so in this same confirmation, plainly
   and with a concrete next step** — e.g. "Booked with Hana, 2pm
   tomorrow — I didn't have enough context to draft talking points, want
   me to pull from a specific project?" — never a vague apology, and
   never a reason to have delayed the booking itself.

If event creation fails partway (e.g. invite send fails but the event
itself was created), say exactly what succeeded and what didn't — never
report a clean success if any part of it wasn't confirmed.

---

## Composed by other skills — same pattern as `workload-agent`

This skill is meant to be **called into**, not duplicated, by anything
that hits a scheduling need mid-task — the same relationship
`manager-1on1-prep` already has with `workload-agent` (composes its
manager-mode output for one report, doesn't re-implement tracker querying
itself).

- **`manager-1on1-prep`** — after producing a prep doc, if Calendar is
  connected and no existing meeting was found for this report, that
  skill may offer "want me to find a time? I can call the scheduling
  skill." On yes, it hands off to this skill's own Steps 0–4 in full —
  see that skill's file for the exact offer wording and gate. If the
  answer is no, or Calendar isn't connected, `manager-1on1-prep` finishes
  exactly as it does today.
- **General chat** — reachable directly any time someone asks to
  schedule or find time with someone, with no other skill involved.
- **Any future caller** should compose the same way: hand off the whole
  request to this skill's Steps 0–4 rather than re-implementing free/busy
  checks, slot proposals, or booking logic locally.
- **Not wired into** `design-kickoff`, onboarding, or any other
  mandatory-path skill. This is intentional — scheduling is a standalone,
  on-demand capability, not a step any build chain waits on.

---

## Guardrails

- **Never** books, sends, or holds a calendar invite without explicit
  confirmation of a specific slot first — see Step 3/4.
- **Never** reads anything beyond a free/busy signal from any calendar,
  including the requester's own, when the read is being used to find
  time with someone else — see § Hard rule above. Never surfaces or
  repeats an event title, description, location, or attendee list.
- **Never** treats Calendar as a mandatory MCP, adds it to
  `mcp-check.md`'s four-server gate, or blocks any other skill on it
  being connected.
- **Never** assumes cross-calendar free/busy visibility works — verify
  per `calendar-check.md`, and state plainly when a proposal is based on
  only one calendar.
- **Never** nags about connecting Calendar — one honest sentence plus an
  alternative, once, per request; no repeated prompts in the same
  conversation.
- **Never** fires automatically. Explicit scheduling request only, or an
  explicit hand-off from a composing skill (e.g. `manager-1on1-prep`'s
  optional offer) — never proactively surfaced or run in the background.
- **Never** changes any other skill's behavior based on Calendar's
  connection state.
- **Never** gates on role — unlike `manager-1on1-prep`, any designer can
  call this directly.
- **Never** drafts an outreach/Slack message (or an event description)
  about a meeting without first knowing what it's for — infer from the
  request, a composing skill's context, or the current conversation
  (`references/meeting-context.md`); if none of those give a real
  answer, ask once rather than drafting something content-free.
- **Never** invents a talking point, agenda item, or "action point" that
  isn't actually grounded in `references/meeting-context.md`'s closed
  source list (conversation, a matched `projects/<slug>/` folder, one
  named ticket). A topic-only draft with an honest "nothing else found"
  is always preferred over a padded one that reads as informed when it
  isn't.
- **Never** holds up a booking that's otherwise ready because Step 1
  found no real context for talking points — book the logistics, then
  say so plainly with a concrete next step (e.g. "want me to pull from a
  specific project?"), never a vague apology and never a delay.
- **Never** searches Slack, sweeps multiple tickets/projects, or pulls in
  Figma/Miro to gather this context — that's `research-agent`'s job; say
  so and route there if the requester wants that depth before
  scheduling.
- **Never** sends a drafted Slack message on its own — see § Hard rule
  above. A draft is shown in chat and waits for explicit approval or an
  edit before any send tool gets called, exactly like a calendar invite
  waits for an explicit slot confirmation.
- **Never** re-asks who "[first name]" means once the current
  conversation has already disambiguated it — check context first, per
  Step 1 § Who, the same discipline as the topic-inference rule above.
  **Never** silently guess between two real people on a squad/topic hint
  alone when the conversation hasn't actually settled it — a wrong-person
  calendar invite is a real mistake, not a wording nitpick; ask, naming
  both candidates with the one detail that tells them apart.

---

## Example turns

**Calendar connected, other person's calendar visible:**

> Checked both calendars for this week — three options where you're both
> free:
>
> *(`AskQuestion`: Tue 2:00–2:30pm / Wed 10:00–10:30am / Thu 3:30–4:00pm /
> None of these)*
>
> Nothing gets booked until you pick one.

**Calendar connected, other person's calendar not visible:**

> I can only see your calendar, not Leo's — here's what's open on your
> side Tuesday–Thursday this week. Want me to propose one of these to him
> directly (he'd get an invite either way), or draft a Slack message
> asking for his availability first?
>
> *(`AskQuestion`, same shape as above, with the one-sided caveat restated
> in the prompt text.)*

**Calendar connected, booked, but no real context to draft talking points from:**

> Request: *"Book time with Hana tomorrow afternoon."* No prior mention
> of a project or ticket in this conversation; no matching `projects/`
> folder.
>
> "Booked with Hana, 2pm tomorrow — I didn't have enough context to
> draft talking points, want me to pull from a specific project?"
>
> The booking happens regardless — a missing agenda never holds up
> logistics that are otherwise ready. The gap is named plainly, with a
> concrete next step (name a project), not a vague apology or padding.

**Calendar not connected, drafting with real grounded context (not just a topic):**

> Request: *"Find time with Leo this week to sync on the checkout
> redesign — no calendar, draft the message."* `projects/checkout-
> redesign/decisions.md` has a recent entry; a ticket was named
> earlier in the conversation.
>
> "Here's a draft:
>
> Hey Leo — got 30 min this week to sync on the checkout redesign?
>
> A few things that might be worth covering:
> - `projects/checkout-redesign/decisions.md` logged going with the
>   card-list layout on [date] — still holding, or has that shifted?
> - [PROJ-482](<ticket URL>) is still In
>   Progress — good time to check in on it?
>
> (Pulled from the project folder and that one ticket — nothing beyond
> that, so let me know if there's more you want to add.)"

**Same request, but nothing groundable exists beyond the stated topic:**

> "Here's a draft:
>
> Hey Leo — got 30 min this week to sync on the checkout redesign?
>
> (Didn't find anything in `projects/` or a named ticket beyond what you
> told me — keeping this to the topic itself.)"
>
> This is the **correct**, honest output when Step 1's context check
> comes back empty — never pad it with generic filler to look more
> informed than it is.

**Name collision + topic, batched into one question (real live case, confirmed correct):**

> Request: *"Find time with Priya this week, calendar's not connected —
> just draft the Slack message."* First-name lookup returns two matches.
>
> "Before I draft the Slack message — what's this meeting about? I want
> it to say why, not just 'got time to chat?' Also, there are two
> Priyas in Slack: Priya Grant (Program Manager) and Priya
> Hart (Senior Product Designer) — which one, and what's the
> purpose of the meeting?"
>
> This is correct **only when nothing earlier in the conversation already
> settled who's meant** — check Step 1 § Who's context-first order before
> asking. If, say, the conversation had already been discussing a design
> review with Priya Hart by name, this skill should have used
> that match silently instead of re-asking. The longer/more-context a
> conversation gets, the more often step 1 (conversation context) alone
> should resolve this without a question at all — asking is the fallback
> for a genuinely fresh/ambiguous request, not the default for every
> first-name mention.

**Calendar not connected:**

> I don't have calendar access connected — how do you want to handle this?
>
> *(`AskQuestion`: "Draft a Slack message to find a time" / "I'll share my
> availability — propose a few slots in chat" / "I'll connect the
> Calendar MCP now" — three options, no extra literal "Other…" added on
> top of the tool's own built-in one; see `references/calendar-check.md`
> for the exact payload.)*
>
> If "connect it now" is picked: one short pointer to Cursor Settings →
> MCP (or `docs/setup/cursor-mcp-setup.md`'s Calendar row), then stop —
> no gate checklist, no "reply ready," no re-probing until they ask to
> schedule something again.
>
> If "Draft a Slack message" is picked and the topic was already inferred
> at Step 1 (stated, carried from a composing skill, or clear from the
> conversation), draft using that topic directly — no extra question. If
> it genuinely wasn't inferable: "What's this about? I want the message
> to say why, not just 'got time to chat?'" — then draft from the answer.

**Calendar not connected, topic genuinely unclear (a real "before drafting" case):**

> Request: *"Find time with Leo sometime this week."* (no prior context
> in this conversation naming a topic, ticket, or project)
>
> "I don't have calendar access connected — how do you want to handle
> this?"
>
> *(`AskQuestion`, same three options as above.)*
>
> On picking "draft a Slack message": *"What's this about? I want the
> message to actually say why, not just 'got time to chat?'"* — then, once
> answered, draft the message using that answer, not a placeholder.

---

## Related files

| File | Role |
|---|---|
| `references/calendar-check.md` | The Calendar-connection check and cross-calendar visibility honesty rule this skill runs at Step 0/2 |
| `references/meeting-context.md` | What goes **into** a draft or event description — grounded topic + talking points from conversation/`projects/`/one named ticket, never invented filler; runs at Step 1 and again at Step 4 |
| `../manager-1on1-prep/SKILL.md` | Composes this skill after a prep doc, the same way it composes `workload-agent` — see that file's own gate for the exact offer wording |
| `../workload-agent/SKILL.md` | The precedent this skill's "standalone, composed by others" shape follows |
| `references/shared/ask-question-ui.md` | Repo-wide `AskQuestion` contract — used for the slot pick in Step 3 |
| `harness/designer-onboarding/references/mcp-check.md` | The **separate**, mandatory four-MCP gate — Calendar is deliberately not part of it |
| `harness/ORCHESTRATOR.md` §3 | The plan-gate / confirm-before-acting pattern this skill's Step 3 follows |
| `harness/ORCHESTRATOR.md` §2 | Routing table entry — on-demand capability, not a mandatory-chain row |
| `KNOWN-ISSUES.md` | Duplicate-"Other…" `AskQuestion` rendering bug — why this skill's decline payload has exactly 3 options, no explicit fourth "Other…" |
| `docs/HOWTO-SCHEDULING.md` | Human-readable guide to this skill — workflow, meeting-context rules, examples, comparison against `manager-1on1-prep`/`workload-agent` |
