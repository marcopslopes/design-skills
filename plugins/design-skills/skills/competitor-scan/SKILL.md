---
name: competitor-scan
description: >-
  Targeted reference pull on what one named competitor does for one
  specific feature or flow. Triggers on: "what does Airbnb do for
  waitlist", "how does Dropbox handle referrals", "how does [competitor]
  handle [flow]", "compare this to [named competitor]". Does NOT trigger
  on a vague "what's out there" sweep (see `benchmark` for scored
  comparison, or a plain `research-agent` sweep for open-ended discovery)
  and does not judge or score the company's own screens (see `benchmark`).
  Sources: Mobbin MCP when a designer has one connected (entirely optional,
  never required), web search otherwise — both are fully valid, not a
  fallback of last resort. Output is factual description only — never a
  "you should copy this" recommendation, and never a verbatim reproduction
  of the competitor's UI or copy.
---

# Competitor Scan

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

A lookup skill, not a judgment call. Answers "what does \[named competitor\]
do for \[feature/flow\]" with a short, factual, sourced summary of their
actual shipped pattern — nothing more.

**Invoke in Cursor:** `Use the competitor scan skill` or `/competitor-scan`

---

## Scope boundary — read this before anything else

- **Fires on:** a **named competitor** + a **specific feature/flow**. "What
  does Airbnb do for waitlist," "how does Dropbox handle referrals," "how
  does Stripe do deposits" — concrete, answerable, one competitor at a
  time.
- **Does not fire on:** "what's out there for waitlist" or "show me some
  booking apps" with no named competitor — that vague-sweep shape belongs
  to a plain `research-agent`-style pass, or to `benchmark` if the intent
  is really "compare this against best-in-class," not "look this one thing
  up."
- **Does not build anything.** No Design Harness page, no prototype, no code —
  that's `ui-agent`.
- **Does not judge the company's own screens.** This skill never says "and here's
  how ours compares" — that comparison, with a rubric and scoring, is
  `benchmark`'s job. If a request asks for both ("what does Airbnb do for
  waitlist, and how do we compare") — hand off: run this skill for the
  lookup half, then explicitly route the comparison half to `benchmark`
  rather than freelancing a verdict here.

---

## MCP usage — Mobbin is optional, never required

This skill can use the **Mobbin** MCP for real shipped-screen references
when a designer happens to have it connected — that's a genuine bonus
(a real screenshot beats a written description), but **it is entirely
opt-in.** Nobody needs to go set up Mobbin to use this skill, this skill
never nags anyone to connect it, and it is **not** part of this repo's
onboarding MCP gate (`docs/setup/cursor-mcp-setup.md` §0b covers only
the work tools (docs, tracker, roadmap, chat) plus Figma and Miro — Mobbin is deliberately not on that list).

**Before running, check whether a Mobbin MCP tool happens to be available
in this session** (list current servers/tools; look for anything
Mobbin-branded) — a quick check, not a gate to clear.

- **If Mobbin is connected:** use it first for the named competitor's
  actual screens for this flow. Pull the specific screen(s) that show the
  named feature, not the whole app.
- **If Mobbin is not connected (the default — current state of this
  environment, as of this skill's authoring):** say so plainly, once, at
  the top of the output, and go straight to the web-search path. This is a
  normal, fully-supported path for this skill, not a degraded one someone
  needs to fix. Web search (official help docs, changelog/release notes,
  product pages) for the factual description works fine on its own —
  flag only that this particular pass has no real screenshot reference,
  as one honest confidence note, not as a prompt to connect anything.

**Never treat Mobbin's absence as a reason to skip the request, and never
frame it as a problem the designer should solve** — run the web-search
path and be honest about the confidence gap, the same way `research-agent`
reports a failed mandatory leg as partial rather than inventing around it.
The difference here is Mobbin was never mandatory in the first place, so
there's nothing to apologize for or push someone toward.

---

## Workflow

1. **Confirm the ask fits this skill's shape** — one named competitor, one
   named feature/flow. If it's vague ("what's out there"), redirect to
   `benchmark` or a `research-agent` sweep instead of guessing at scope.
2. **Check Mobbin availability** (see above).
3. **Pull the reference:**
   - **Live URL in the ask** (or already captured this turn by
     `live-page-review`) → use that capture (screenshot + a11y tree +
     verified violations) as the primary shipped-pattern evidence. Still
     facts only; never House-critique their UI; never paste their copy
     verbatim. Do not commit competitor capture files.
   - Mobbin available → find the named competitor's app, locate the
     specific flow/screen(s) for the named feature, note structure,
     sequence, and any distinctive interaction choices from the real
     screenshots.
   - Mobbin unavailable and no live URL → web search official docs/help
     center/changelog for the same information; prefer primary sources
     (the competitor's own help center or product page) over secondary
     blog summaries.
4. **Write the summary factually** — what the competitor's flow actually
   does, in your own words, structured as steps/states, not a copy-paste of
   their UI copy. See § Copyright rules below.
5. **Cite sources** — Mobbin screen reference (app + flow name) and/or the
   web URL(s) used, per `references/shared/source-links.md`.
6. **Stop there.** No recommendation, no "we should do this too," no
   critique of the company's own equivalent screen.
7. **Persist to a task folder if — and only if — one is actually in
   play.** Per `harness/ORCHESTRATOR.md` §5's state rules, if this scan is
   part of an existing or currently-opening `projects/<slug>/` (the
   designer named a project, or intake already resolved one), append the
   output verbatim to that project's `findings.md`, dated and named
   `competitor-scan`, same as every other skill in this repo. **Also
   append each durable web/Mobbin-cited URL as a row in
   `projects/<slug>/sources.md`** (create from `projects/_template/sources.md`
   if missing) — Title / Kind=`Competitor` / Why it matters / Link /
   Indexed. **If there's no task folder in play** — a bare, standalone
   "what does Airbnb do for X" with no project context — answer in chat
   only. This skill never creates a new `projects/<slug>/` folder on its
   own just to have somewhere to write; that's `design-kickoff`'s job, and
   a one-off lookup doesn't need one.

---

## Copyright rules — non-negotiable

- **Describe, never reproduce.** Summarize what the flow does structurally
  (steps, states, sequencing, information hierarchy) — never quote their UI
  copy verbatim beyond a short, clearly-attributed phrase if a specific
  wording choice is the actual point being illustrated.
- **Never paste or embed a competitor's screenshot, exported image, or raw
  Mobbin asset into this repo, a prototype, or a task folder.** Mobbin
  references are for reading and understanding a pattern in this session —
  not an asset source. Nothing from Mobbin gets checked into
  `src/design-harness/`, `context/design-system/`, or `projects/<slug>/artifacts/`.
  (Same rule `benchmark` inherits when it calls this skill.)
- **Never hand-draw or recreate their logo, icon set, or brand marks** —
  irrelevant to what this skill is answering, and this repo's hard rule
  against invented/duplicated brand assets (`harness/ORCHESTRATOR.md` §7.1)
  applies here too.
- **Never present the summary as a build spec.** This is reference
  material for a human designer's own judgment, not a copy-this-exactly
  instruction set for `ui-agent`.

---

## Output format

```markdown
## Competitor scan — [Competitor] · [feature/flow]

**Source:** Mobbin ([app name], [flow/screen names]) | Web ([URL(s)])
**Mobbin status:** connected — real screenshots reviewed | not connected
this session — web-sourced only (a fully normal path, not a gap to fix)

### What they do

[Factual, structural description — steps, states, sequencing. Own words.]

1. [Step/state 1]
2. [Step/state 2]
3. [Step/state 3]

### Notable choices

- [Any distinctive interaction/copy/structure choice worth naming — still
  described, not quoted at length]

### Not a recommendation

This is a factual reference, not a suggestion to copy \[Competitor\]'s exact
UI or copy. For a scored comparison against the company's own implementation,
use `benchmark` instead.
```

---

## Never do this

- Never fire on a vague "what's out there" ask — redirect to `benchmark` or
  a `research-agent` sweep.
- Never judge, score, or compare against the company's own screens — that's
  `benchmark`.
- Never build a prototype, page, or component from this output — that's
  `ui-agent`.
- Never silently skip the Mobbin-status disclosure — say plainly whether
  it was used, every time. But never turn that disclosure into a nudge to
  go connect it — Mobbin is opt-in, full stop.
- Never reproduce a competitor's UI, copy, or brand assets verbatim, and
  never check a Mobbin screenshot/export into this repo.
- Never phrase the output as "you should do this too" — describe, don't
  prescribe.

---

## Related files

| File | Role |
|------|------|
| `../benchmark/SKILL.md` | Calls this skill when a named competitor is the relevant comparison point; owns the scoring/gap analysis this skill never does |
| `../live-page-review/SKILL.md` | When the ask includes a competitor **URL**, captures the live page first then hands facts here |
| `../research-agent/SKILL.md` | The right tool for an open-ended, no-named-competitor discovery sweep |
| `references/shared/source-links.md` | Citation format for any web URL used as a fallback source |
| `harness/ORCHESTRATOR.md` §7.1 | Hard rule against invented/reproduced brand assets — extends to competitor assets here |
| `docs/setup/cursor-mcp-setup.md` §5 | Notes Mobbin as an optional, opt-in MCP for this skill and `benchmark` — deliberately not part of the mandatory onboarding gate |
