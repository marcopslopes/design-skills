# Calendar connection check — on-demand, non-blocking

**Not part of onboarding tool setup.** The onboarding list
(`harness/designer-onboarding/references/mcp-check.md`) covers the work
tools (docs, tracker, roadmap, chat) plus Figma and Miro, full stop — Calendar is never added to that list,
never checked during onboarding, and never blocks any other skill. This
file exists so `scheduling` (and `manager-1on1-prep`'s optional offer
into it) have one shared place to check Calendar availability,
instead of each re-inventing the probe or, worse, copying `mcp-check.md`'s
blocking language onto something that must never block.

**When this runs:** only at the moment a scheduling request actually
fires — never proactively, never as part of a chat's opening turns, never
re-probed automatically later unless the designer asks about scheduling
again.

---

## How to check

1. Call `GetMcpTools` with no arguments (or a pattern search for
   `calendar`/`google`) and read `serverStatus` for anything that looks
   like a Calendar MCP server.
2. **As of this repo's current environment, no Calendar MCP server ships
   by default** — the catalog available to this harness does not include
   one. Treat Calendar as **not connected** unless a probe this session
   actually shows a connected server. Don't assume one exists because
   other MCPs (a tracker, docs tool, chat, Figma) do.
3. If a Calendar MCP server is found and connected, confirm it actually
   works with one cheap read (e.g. a free/busy or "list my calendars"
   call) before relying on it for a real proposal — same "listed ≠
   authenticated" discipline `mcp-check.md` §A already applies to
   every work tool.

## If connected

Proceed with `../scheduling/SKILL.md`'s workflow. Still apply
the **cross-calendar visibility** rule below before promising anything
about a second person's calendar — and that skill's own **Hard rule —
free/busy only** before running any read at all: every check this
protocol enables is a free/busy signal only, never event titles,
descriptions, or attendees, on any calendar including the requester's
own.

## If not connected, `needsAuth`, or erroring

**Say so plainly, once, in the same breath as alternatives — never a
blocker, never a nag, never an install checklist.** This is the opposite
posture from `mcp-check.md`'s hard gate on purpose: Calendar being
unconnected is a normal, expected state that should change nothing about
how the rest of the harness behaves.

This is a fixed, discrete-option decision, so per
`references/shared/ask-question-ui.md` it renders as `AskQuestion`, not
chat prose — **three** options, one of them being "connect it yourself"
so the designer isn't only offered workarounds when what they actually
want is real Calendar access:

```json
{
  "title": "No calendar access yet",
  "questions": [
    {
      "id": "no_calendar_path",
      "prompt": "I don't have calendar access connected — how do you want to handle this?",
      "allow_multiple": false,
      "options": [
        { "id": "slack_draft", "label": "Draft a Slack message to find a time" },
        { "id": "manual_share", "label": "I'll share my availability — propose a few slots in chat" },
        { "id": "connect_now", "label": "I'll connect the Calendar MCP now" }
      ]
    }
  ]
}
```

**Do not also add a fourth explicit "Other…" option to this payload.**
Cursor's `AskQuestion` UI already renders its own free-text "Other…" entry
automatically — adding a literal `{ "id": "other", "label": "Other…" }`
alongside it produces two visually identical "Other…" rows in the
rendered card (confirmed live, 2026-07-19 — see `KNOWN-ISSUES.md`). The
three options above already cover the realistic paths; let the tool's
own built-in "Other…" handle anything outside them.

- **If "I'll connect the Calendar MCP now" is picked:** respond with one
  short, unpressured pointer — where to connect it (Cursor Settings → MCP,
  or the Calendar row in `docs/setup/cursor-mcp-setup.md`) — and stop
  there. **Do not** switch into `mcp-check.md`'s gate language ("reply
  ready and I'll check off...") — that checklist-and-reply-ready pattern
  is reserved for the mandatory four-MCP install; this is a designer
  choosing to go set something up on their own time, not a blocker being
  tracked. Don't re-probe automatically after this either — wait for them
  to come back and ask to schedule again.
- **If "Draft a Slack message" is picked — know what it's about, and
  what real context should go with it, before drafting**, per
  `references/meeting-context.md`. A generic "want to grab some time?"
  message isn't a useful draft; a topic with no substance is barely
  better — pull in whatever's actually groundable first. **Show the
  draft in chat and stop there** — per `SKILL.md`'s Hard rule on drafts
  staying drafts, this skill never calls a Slack-send tool without
  explicit approval or an edited version to send instead.
- **Never** print a four-row status checklist or "connect this, then
  reply ready" language for Calendar — that pattern belongs to the
  mandatory gate only.
- **Never** re-probe on every message in the same conversation once the
  answer is "not connected" — ask again only if the designer brings up
  scheduling in a later, separate request.
- **Never** let the absence of Calendar block or slow down whatever else
  the designer asked for in the same turn (e.g. a `manager-1on1-prep` doc
  still ships in full; the scheduling offer just doesn't get made).

## Know what it's about before drafting anything

**Before drafting any Slack message (or writing a calendar event's
description) on someone's behalf, know what the meeting is actually
about — and, where it exists, what real context should go with it.** A
scheduling request rarely states this explicitly ("find time with Leo
tomorrow afternoon" says who and when, not why) — this is now its own
dedicated file: `references/meeting-context.md`, covering topic
inference **and** the richer "pull in grounded talking points from
`projects/`, a named ticket, or the conversation itself" capability added
2026-07-19. Run it before this file's Slack-draft alternative produces
any output, and before `SKILL.md` Step 4 writes an event description.

This applies equally to the "propose to them directly" framing under
§ Cross-calendar visibility below, whenever that path also results in an
outreach message rather than a direct calendar invite.

## Cross-calendar visibility — honesty rule

Checking the **requester's own** free/busy is a straightforward read once
a Calendar MCP is connected and authenticated as them. Checking **someone
else's** availability is a different, separate capability that depends on
that MCP/provider actually exposing shared or org-wide free/busy data —
**do not assume this works just because the requester's own calendar
does.**

- If a probe (or the MCP's own tool list/description) confirms
  cross-calendar or org-wide free/busy is actually available, use it, and
  say so in the proposal ("checked both your calendar and [name]'s").
- If it isn't available, is unclear, or the other person's calendar isn't
  shared with this account, **say so plainly on every proposal that
  involves a second person** — don't silently propose times as if both
  calendars were checked. Frame it as: "Here's what's open on my/your
  calendar — I don't have visibility into [name]'s, so you'll want to
  confirm with them" (or offer to draft an outreach message instead, per
  `scheduling/SKILL.md` § Step 2 and `references/meeting-context.md`).
- Never infer that cross-calendar visibility works from Calendar being
  connected at all — connection and visibility scope are two different
  facts, and only one of them is guaranteed by a successful probe.

---

## Related files

| File | Role |
|---|---|
| `../scheduling/SKILL.md` | The skill that uses this check before proposing or booking anything — also owns the free/busy-only hard rule |
| `references/from-scheduling/meeting-context.md` | What goes **into** a draft or event description — grounded topic + talking points, never invented filler |
| `SKILL.md` | Composes `scheduling` after a prep doc, the same way it composes `workload-agent` — same check applies |
| `harness/designer-onboarding/references/mcp-check.md` | The **separate**, mandatory four-MCP gate — Calendar is deliberately not part of it |
| `docs/setup/cursor-mcp-setup.md` | Human setup guide — lists Calendar as optional, same optional tier as Calendar |
| `KNOWN-ISSUES.md` | Logs the live-confirmed duplicate-"Other…" `AskQuestion` rendering bug this file's payload works around |
