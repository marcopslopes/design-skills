---
name: insight-writer
description: >-
  Writes and pressure-tests user research insights using the key
  learning + why + consequence framework, distinguishes real insights
  from findings/observations/bugs/opinions, and runs a stakeholder
  "so-what" check on a draft insight or full report before it ships.
  Triggers on: "write insights from this data", "is this an insight or
  a finding", "my insights feel shallow", "so-what check this report",
  "will this land with stakeholders", "pressure test my findings", "is
  this actionable", "review before presenting", "insight formula". Takes
  patterns from `research-synthesis` as input; does not run sessions or
  build affinity diagrams itself.
---

# Insight Writer

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Turns a pattern or cluster into a real insight, and checks whether a
draft insight (or a whole report) actually gives a stakeholder something
to act on. Two halves of the same job: writing the thing, and checking
whether it landed.

**Invoke in Cursor:** "write this up as an insight", "so-what check this",
"is this actually an insight"

---

## Scope boundary

- **Fires on:** turning a pattern/cluster into an insight, or reviewing a
  draft insight/report for actionability, on an approved
  `projects/<slug>/` task or standalone.
- **Does not fire on:** finding the pattern in the first place
  (`research-synthesis`), the mechanical anti-AI-writing prose pass
  (`references/shared/anti-ai-writing.md` — different axis: that's
  about *how it's worded*, this is about *whether it says anything*).
- **Insights come from generative research, not usability tests.** Don't
  force a UT finding into insight shape — call it a finding and move on;
  a handful of real insights per generative study is normal and good.

---

## Mode 1 — Write the insight

Every insight has three parts. Missing the third one is the single most
common failure:

1. **Key learning** — the unexpected attitude, behavior, need, or pain
   point. The thing that made you say "that's interesting."
2. **The why** — the motivation or underlying reason behind it.
3. **The consequence** — what happens, to the user and to the business,
   if this goes unaddressed. **If you can't write this part, you
   probably have a finding, not an insight** — that's a useful signal,
   not a failure.

**Before writing, check it's actually insight-level** (yes to at least
one):
- Gives new understanding of attitudes/pain points/needs not obvious
  before?
- Negates or changes a team assumption?
- Reveals a mental model — how users believe the world should work?
- Genuinely surprising — "wow, I had no idea"?

If none apply, it's a finding — still worth reporting, just don't dress
it up as more than it is.

**What an insight is NOT** — catch these before they get written up as
one: an **observation** (saw it happen, no why), a **quant trend** (what,
not why), a **fact** (no context/consequence), a **bug** (product
defect, route to the ticket, not the report), a **finding** (solves
something today, no deeper consequence), a **feature wish** ("I'd love
X" — dig into *why* they want it instead), an **opinion** (no context, no
consequence).

**The formula:** [Key learning — what, for whom] + [The why — what's
driving it] + [The consequence — for user and business, if possible].

## Mode 2 — So-what check (before anything ships)

Run every insight/finding through five questions. Any "no" or "unclear"
means it needs work before it goes out.

1. **Specific enough to be believed?** Could this have come from any
   product at any company? If yes, too vague. Add who/when/how many;
   replace adjectives ("frustrating") with what actually happened.
2. **Says why, not just what?** A behavior without a why is a finding,
   not an insight — the wrong fix gets built without it.
3. **Consequence named?** For user, business, or risk — this is the most
   commonly missing piece. Ask "so what?" twice; the second answer is
   usually the consequence.
4. **A recommendation, even directional?** "Recommend..." or "Consider
   investigating..." — never leave a stakeholder to translate a finding
   into an action alone.
5. **Could a stakeholder act on this by next week?** Read it aloud and
   ask "what do I do with this?" If the honest answer is "not sure," it
   needs a sharper consequence or a clearer recommendation.

**Rewrite formula when a check fails:** [specific behavior + frequency]
+ [because/which means] + [underlying cause] + [which leads to] +
[consequence] + [recommend/consider].

### Report-level checks (run once per report/readout, not per insight)

- **Leads with the answer** — most important finding first, not buried
  after methodology (Pyramid Principle: could someone read only the
  first slide/paragraph and know the point?).
- **Has a TL;DR** — top 2–4 insights in plain language + the action for
  each + urgent flags, readable in under 60 seconds. Executives read
  only this.
- **Findings and insights are labeled, not mixed** — mixing them without
  distinction gets findings over-actioned and insights under-actioned.
- **Plain language** — could a new PM read it without asking "what does
  that mean?"
- **Format matches the audience** (exec → 1-page + 5 slides max; PM →
  ticket-per-insight; design → Figma-embedded with clips; eng →
  bug-style with severity).

### 10-point checklist verdict

8–10 pass → ready to share. 6–7 → strengthen the weakest insights first.
Under 6 → needs a real revision pass, possibly another synthesis session.

---

## Output format

```markdown
## Insight — [Project/topic]

**Key learning:** [...]
**The why:** [...]
**The consequence:** [...]
**Full insight (combined):** [...]

**So-what check:**
| Question | Pass? | Fix if no |
|---|---|---|
| Specific enough? | | |
| Says why? | | |
| Consequence named? | | |
| Recommendation present? | | |
| Actionable by next week? | | |

**Classification:** Insight / Finding / Observation / Bug (route
elsewhere) / Opinion (drop unless sourced)
```

---

## Persist

Append the finished insight + so-what verdict to `projects/<slug>/findings.md`
(dated, named `insight-writer`). Insights feeding a PRD or docs
draft still pass through `references/shared/anti-ai-writing.md` before
that doc ships — substance (this skill) and prose tells (that file) are
checked separately.

---

## Never do this

- Never write a "consequence" as a guess when there's no data behind it
  — say "consequence unclear, needs more data" rather than inventing
  business impact.
- Never let "good," "important," "easy," or "actionable" stand in for an
  actual description — they're subjective and mean nothing to a
  stakeholder trying to decide something.
- Never skip the so-what check because the insight "feels obviously
  good" — that's exactly the insight most likely to be too vague to act
  on.

---

## Related files

| File | Role |
|------|------|
| `../research-synthesis/SKILL.md` | Produces the patterns/clusters this skill turns into insights |
| `references/shared/anti-ai-writing.md` | Separate prose-tells pass — run both before a report ships |
| `../design-kickoff/SKILL.md` | PRD's "What we know" / evidence rule overlaps with this skill's finding-vs-insight distinction |
| `references/worked-example.md` | Full insight write-up plus a so-what check catching a weak draft |
