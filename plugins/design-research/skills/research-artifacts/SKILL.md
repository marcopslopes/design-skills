---
name: research-artifacts
description: "Turns synthesized research into a shareable understanding artifact — a persona (composite archetype with goals/frustrations/behaviors), an empathy map (Says/Thinks/Does/Feels for one user or segment), a journey map (one persona's end-to-end stages, touchpoints, emotions, pain points), an ability-spectrum map (where a feature breaks across vision/hearing/motor/cognitive ability — permanent, temporary, and situational), job stories (situation → motivation → outcome, plus functional/emotional/social jobs), or a service blueprint (frontstage/ backstage/support-process lanes behind a journey map's touchpoints)."
---

# Research Artifacts (Persona / Empathy Map / Journey Map / Ability Spectrum / Job stories)

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Turns synthesized research (or an existing named archetype) into the
artifact a stakeholder actually looks at — a persona, an empathy map, a
journey map, an ability-spectrum map, or job stories. One family because
they share an input (real research data, never invented) and a purpose
(make user understanding legible to a team fast); pick the shape that
fits the ask.

**Invoke in Cursor:** "build a persona for [segment]", "empathy map this
user", "journey map [flow] for [persona]", "ability spectrum for [feature]",
"job stories for [flow]"

---

## Scope boundary

- **Fires on:** turning real research data (synthesized patterns,
  interview transcripts, or an already-named the company archetype) into one
  of the five artifacts below, on an approved `projects/<slug>/` task
  or standalone. Ability-spectrum mode may also run from a named
  feature/flow when the ask is coverage/breakpoints (not inventing
  disability lived experience). Job-story mode may run from the same
  sources when the ask is the *job*, not the person.
- **Does not fire on:** finding the pattern in the first place
  (`research-synthesis`), writing the insight behind a pattern
  (`insight-writer`), or documenting accessibility *decisions/tradeoffs/
  eng handoff* (`accessibility-decisions`). Multi-channel/backstage
  service delivery across staff and systems is Mode 6 (service
  blueprint) — don't stretch a journey map (Mode 3) to cover it when the
  ask is really about internal handoffs and operational root causes.
- **Never invents a persona/journey from vibes.** If there's no
  synthesized data and no existing the company archetype to ground it, say so
  and route to `research-synthesis` or `research-agent` first — a
  persona built from assumption is exactly the "users are like us" trap
  `assumption-mapper` warns about.
- **Never invents disability lived experience.** Permanent-disability
  details need a real source (research, designer-stated participant, or
  an existing archetype note). Situational impairments may use the company
  busy-pro context (one-handed, bright shop, noisy floor) labeled as
  situational — not as a claim about a named person's disability.
- **the company already has archetypes** (`COMPANY-ARCHETYPES.md`) — check there first before
  building a net-new persona from scratch. This skill's persona mode is
  for a sub-segment or a fresh discovery that doesn't map cleanly onto
  an existing archetype, not a duplicate of what's already documented.
  Disability is a *dimension* of a persona, never a separate "a11y
  persona" slide that only appears when someone remembers.

---

## Mode 1 — Persona

Use when a decision needs a consistent, memorable user reference and no
existing `COMPANY-ARCHETYPES.md` entry fits.

1. Confirm the segment and pull every real data point from
   `research-synthesis` output, `projects/<slug>/findings.md`, or raw
   transcripts — never invent a behavior, quote, or frustration without
   a source.
2. Build 1–2 personas (rarely more; a big persona set gets ignored) with:
   name, one-line quote (a real or representative statement from the
   data), goals (functional/emotional), frustrations (sourced pain
   points), current behaviors/workarounds, and design implications —
   what this means for the decisions in front of the team right now, not
   generic advice.
3. **Inclusive dimension (when data supports it, or when the ask is
   explicitly inclusive):** weave permanent / temporary / situational
   ability into bio, goals, and frustrations — not a bolted-on
   "Challenges: blind" line. Prefer showing how AT and context shape
   what good/bad looks like. If there's no sourced permanent disability,
   still note 1–2 **situational** the company contexts (chair-side one-handed,
   glare in a salon, interrupted mid-booking) so the persona isn't
   ability-blind by default. Label every ability claim
   Known / Believed / Assumed.
4. Name the primary persona if there's more than one — the one the
   design must satisfy first — and say why.
5. Flag research gaps explicitly: what's asserted vs. what's still
   thin/assumed, same discipline as `assumption-mapper`'s known-vs-believed
   split. Never invent a disability to look inclusive — flag the gap and
   recommend recruiting (`screener-builder`) instead.

## Mode 2 — Empathy map

Use for a fast, low-ceremony snapshot to align a team quickly — lighter
weight than a full persona.

Four quadrants, each sourced:
- **Says** — direct quotes from transcripts/notes
- **Thinks** — beliefs/concerns inferred from behavior and context
  (label as inferred, not a quote)
- **Does** — observed actions and workarounds
- **Feels** — emotional states/anxieties, evidenced by tone or explicit
  statement, not guessed

Plus goals and pain points underneath. Note gaps ("no data on \[X\] yet")
rather than filling a quadrant with assumption.

## Mode 3 — Journey map

Use when a specific persona's end-to-end experience through an existing
or planned flow needs to be visualized — most common ask against
the company's provider/client flows.

1. Confirm the persona (the company archetype or one from Mode 1) and the
   journey's start/end boundary — don't try to map "the whole product."
2. Define 5–7 stages (awareness through post-use), and for each: user
   goal, actions, touchpoints, emotional state (rate positive/negative),
   pain points, and one opportunity.
3. Show the emotional arc across stages — where it dips is usually
   where the design opportunity is.
4. Name the moment(s) of truth — the 1–2 stages that make or break the
   whole journey.
5. Rank opportunities by impact/feasibility; don't hand over an
   unprioritized wish list.
6. Always map current-state first even when the ask is for a future
   redesign — future-state-only journey maps skip the actual pain
   points that justify the redesign.

## Mode 4 — Ability spectrum

Use when the ask is **coverage / breakpoints / who gets excluded** —
not a full persona, but where a feature starts to fail across ability.

Grounded in the Microsoft Inclusive Design spectrum idea (permanent /
temporary / situational) and "Nothing About Us Without Us": this mode
maps *product failure points*, not lived-experience fiction.

1. List the 5–10 core tasks for the feature/flow (House-specific —
   e.g. confirm booking, send reminder, accept referral).
2. For each relevant dimension (vision, hearing, motor, cognitive —
   skip dimensions that don't matter for this surface), define 4–5
   points from full capability → no capability. Example motor:
   full dexterity → reduced precision → keyboard-only → switch/voice →
   no hand use.
3. For each task × ability point, rate: **Works well** / **Friction** /
   **Workaround** / **Fails**. Prefer situational the company contexts when
   permanent disability data is thin (one-handed chair-side = motor
   friction; noisy floor = hearing situational).
4. Name the **breakpoints** — where rating shifts to Fails. Everything
   past that boundary is excluded. Goal: push the boundary right.
5. Hand off: spectrum findings that need an eng-spec or tradeoff record
   go to `accessibility-decisions`; cognitive-load-only asks go to
   `cognitive-accessibility`; blocking focus/ARIA/contrast stays
   `accessibility` / `audit`.

## Mode 5 — Job stories (JTBD)

Use when the ask is **what the user is trying to get done**, not who they
are (persona) and not which bet to place (`product-strategy`). Diagnostic
Layer 2 (user needs) routes here when job stories are missing.

Format each story as:

> When **[situation]**, I want to **[motivation]**, so I can **[outcome]**.

Then name the job types that actually showed up in the data (skip any
that didn't):

- **Functional** — the practical progress (book the gap, get paid, see
  who referred me)
- **Emotional** — how they want to feel (in control, not embarrassed,
  done for the day)
- **Social** — how they want to be seen (competent to staff, fair to
  clients)

### Two stages — don't collapse them

This mode runs in **two stages**. Skipping straight to Stage B (picking
the 1–2 "important" jobs before you've written down everything the data
actually surfaced) is how a team's favorite feature masquerades as a
user need.

**Stage A — Candidate jobs (from the raw data, unprioritized)**

1. Pull every situation/motivation/outcome pattern out of the source
   data — don't filter for importance yet, just get every candidate down.
2. Label each **observed** (a specific quotable moment happened),
   **inferred** (behavior implies it, no direct quote), or **assumed**
   (team belief, no evidence) — same discipline as `assumption-mapper`'s
   known/believed/assumed split, applied per-story.
3. This is a **list, not a report** — don't polish prose per candidate,
   just get the raw set visible before ranking anything.

**Stage B — Prioritized jobs (the 1–2 this decision must satisfy)**

1. **Strip the mechanism.** If the "When" clause names your specific
   solution ("when I need a report, I want to export to CSV") you're
   describing the current system, not the need. Re-state independent of
   who or what currently serves it: *what's true about the user at the
   moment they need this?* Push until the "When" is picturable — specific
   enough to see the moment happen (an event, a feeling, a rhythm, a
   threshold crossed) — not "sometimes users want more control."
2. **Rough prioritization:** rank by importance × how poorly currently
   served. A need that matters a lot and is served badly is the highest-
   value opportunity — a need that matters but is already served well
   isn't where the design work is. Keep this rough; precise scoring is
   `product-strategy` work, not this mode's job.
3. Narrow Stage A's candidates to **3–7 stories** for one flow or
   decision — not a catalogue of every job in the product.
4. Name the **primary** job(s) — the 1–2 this decision must satisfy first.

Rules:

1. Same sourced-data-only rule as Mode 1. No candidate without a
   transcript quote, finding, or named archetype behavior behind it.
2. **Not a persona.** "Busy provider" is who; "when a last-minute
   cancellation lands, I want to fill the slot same-day so I don't eat
   the loss" is the job.
3. **Not strategy.** Prioritized job stories feed `product-strategy`
   (opportunities on the tree) and `ux-pattern` decision-framework
   (JTBD-fit axis). This mode stops at the jobs. Don't invent bets or
   experiments here.
4. If there's no data, say so and route to `research-synthesis` /
   `research-agent` — same as a persona with no source.

## Mode 6 — Service blueprint

Use when a journey map's pain point needs a **root cause**, and the root
cause is operational — staff, systems, or a handoff between them — not
an interface problem. Different from Mode 3 (journey map): a journey map
shows what the user experiences; a blueprint adds how the organization
delivers it.

**Load `references/service-blueprint.md`**
for the full five-lane / three-line method, root-cause tracing, and
output format. Requires a journey map underneath (run Mode 3 first if
one doesn't exist).

**Same sourced-data-only rule, extra sharp here:** backstage and
support-process lanes are invisible to a designer by default, which
makes them the easiest lanes in this whole skill to accidentally invent
("probably the system does X"). Mark unsourced rows **unknown** + who to
ask — never fill them with a plausible guess.

---

## Output format

```markdown
## [Persona | Empathy map | Journey map | Ability spectrum | Job stories] — [Project/segment]

**Source data:** [research-synthesis output / findings.md entries / named
COMPANY-ARCHETYPES entry — link or cite]

[Persona mode:]
**[Name]** — "[quote]"
Goals: ... / Frustrations: ... / Behaviors: ... / Design implications: ...
Ability / context: [permanent | temporary | situational — sourced or labeled Assumed]
Primary persona: [yes/no + why, if multiple]
Research gaps: [what's thin or assumed]

[Empathy map mode:]
Says: ... / Thinks: ... / Does: ... / Feels: ...
Goals: ... / Pain points: ...
Gaps: ...

[Journey map mode:]
| Stage | Goal | Actions | Touchpoints | Emotion | Pain points | Opportunity |
|---|---|---|---|---|---|---|
Moments of truth: [...]
Top opportunities (ranked): [...]

[Ability spectrum mode:]
### Tasks
1. …
### Spectrum ratings
| Task | Dimension point | Rating | Notes |
|---|---|---|---|
### Breakpoints (excluded past here)
- …
### Recommended next
- [accessibility-decisions / cognitive-accessibility / accessibility / recruit]

[Job stories mode:]
### Stage A — Candidate jobs (unprioritized)
| # | When (situation) | I want to (motivation) | So I can (outcome) | Type (F/E/S) | Observed / Inferred / Assumed | Source |
|---|---|---|---|---|---|---|

### Stage B — Prioritized jobs
| Rank | Job story (mechanism stripped) | Importance | How well served today | Type (F/E/S) | Why this rank |
|---|---|---|---|---|---|
Primary: [top 1–2 jobs this decision must satisfy]
Feeds: [product-strategy opportunities / ux-pattern JTBD axis — only if asked]

[Service blueprint mode:]
| Step | Physical evidence | User action | Frontstage | Backstage | Support process |
|---|---|---|---|---|---|
Line of visibility calls: [...]
Root cause chain (if tracing a journey-map pain point): [...]
Unknowns (flagged, not invented): [...]
```

---

## Persist

Append the artifact to `projects/<slug>/findings.md` (dated, named
`research-artifacts`). If it's a persona or journey map likely to be
reused across projects, flag to the designer whether it belongs in
`COMPANY-ARCHETYPES.md` instead of staying task-local — this
skill doesn't edit that file itself, it only recommends.

---

## Never do this

- Never fabricate a quote, behavior, emotional beat, or disability with
  no source — say "no data yet" instead of filling the gap
- Never build a net-new persona that duplicates an existing
  `COMPANY-ARCHETYPES.md` entry without checking first
- Never create a separate "accessibility persona" that only exists to
  represent disability — weave ability into real personas, or use Mode 4
- Never skip current-state mapping in a journey map because the ask was
  framed as "map the future" — the pain points that justify the future
  state have to come from somewhere real
- Never treat this as a substitute for `research-synthesis` — if the
  underlying data hasn't been synthesized yet, run that first
- Never claim to speak for disabled users without research or
  participation — flag the gap and recommend recruiting
- Never write a job story that is actually a feature ("I want a
  dashboard") — rewrite to the progress the user is hiring for
- Never skip Stage A to jump straight to "the important jobs" — write the
  candidate set down first, or a team favorite quietly becomes the need
- Never leave the mechanism in a prioritized "When" clause ("when I need
  a report" instead of "when month-end billing is due") — strip it before
  ranking
- Never expand job stories into an opportunity-solution tree — hand off
  to `product-strategy`
- Never invent a backstage or support-process row in a service blueprint
  — mark it unknown and name who to ask
- Never blueprint without an underlying journey map (run Mode 3 first)

---

## Related files

| File | Role |
|------|------|
| `../research-synthesis/SKILL.md` | Usual source of the patterns this skill turns into artifacts |
| `../insight-writer/SKILL.md` | Different output — the insight behind a pattern, not the user-understanding artifact |
| `../assumption-mapper/SKILL.md` | Same known-vs-believed discipline applied to persona/journey content |
| `../accessibility-decisions/SKILL.md` | Documents a11y decisions, tradeoffs, and eng handoff after spectrum finds a breakpoint |
| `../cognitive-accessibility/SKILL.md` | Mental-load / wayfinding pass — complementary, not a persona |
| `COMPANY-ARCHETYPES.md` | Check before building a net-new persona — the company's existing archetype set |
| `references/worked-example.md` | Full worked persona + journey map example |
| `references/service-blueprint.md` | Mode 6 full method — lanes, lines, root-cause tracing |
| `../product-strategy/SKILL.md` | Consumes job stories as opportunities — does not write them |
