---
name: research-shareout
description: >-
  Designs how to share research findings so stakeholders engage and act —
  audience-first presentation structure (TL;DR → findings →
  recommendations → next steps), compelling insight framing, and when
  useful a creative/workshop format (bingo, insight auction, remote
  gallery, etc.). Triggers on: "how do I share these findings",
  "research shareout", "research presentation", "stakeholders aren't
  acting on research", "make this readout engaging", "share research with
  leadership", "usability bingo", "insight auction". Takes finished
  insights/toplines as input (`insight-writer` / `research-summary`);
  does not write the insights themselves. Does not replace `deck-builder`
  for building the HTML deck — this designs the share-out plan; that
  builds slides when asked.
---

# Research Shareout

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Makes findings land — informative, actionable, and memorable enough that
they don't die in a Drive folder.

**Invoke in Cursor:** "plan a shareout for this study", "make this
readout engaging"

---

## Scope boundary

- **Fires on:** planning or structuring how findings get shared —
  audience, format, slide outline, creative engagement format, remote
  plan.
- **Does not fire on:** writing the insights (`insight-writer`), the
  one-page topline (`research-summary` Mode 2), or producing the HTML
  deck file (`deck-builder` — hand off when they want slides built).
- **Never share without a recommendation on every major problem** —
  teams need a starting point even if the rec is directional.

---

## Step 1 — Audience first

| Audience | Lead with |
|---|---|
| Exec / leadership | Business impact (revenue, retention, risk); 20–30 min max; TL;DR they get in 60s |
| PMs | Roadmap / sprint decisions; concrete recommendations |
| Designers | Clips + friction + user expectations; design direction |
| Eng | Bugs / severity / scope; requirement-shaped findings |
| Marketing | Real user language, mental models, messaging gaps |

## Step 2 — Standard presentation spine

1. **TL;DR** — top 3–5 insights + headline rec each + urgent bugs
2. **Findings** — show don't tell (clip / screenshot + one sentence +
   rec); quant beside qual when both exist
3. **Recommendations** — Problem → Recommendation → Expected outcome
4. **Next steps** — who meets when; how it enters roadmap; links to
   full report / clips; how to request follow-up research

## Step 3 — Compelling insight framing

Flat: "80% of users couldn't finish the task."

Compelling: name the **moment**, the **emotion**, a **number**, and the
**consequence** if ignored. Prefer video of struggle over more bullets.

Per insight block: **Headline** (consequence-focused) · **Finding** ·
**Evidence** (clip/quote) · **Recommendation** · **Owner team**.

## Step 4 — Format pick (when standard slides won't land)

Use a creative format when the room is disengaged, remote-only, or needs
ownership of solutions:

| Format | Use when |
|---|---|
| Usability Bingo | Stakeholders observing live UT — keep them watching |
| Insight Auction | Many insights; need forced prioritization |
| Internal hackathon | Turn findings into stakeholder-owned solutions |
| Pin the pain / Hot-seat personas | Assumptions about users are misaligned |
| Data Detective | Want stakeholders to synthesize clues themselves |
| Remote gallery (Miro) | Distributed team; station-based walkthrough |
| GIF / clip reel | Async, under 2 minutes |
| Investigative article | Need executive attention on one sharp finding |

Output a setup guide (materials, timing, debrief questions) when they
pick a game — don't dump all ten unprompted.

## Checklist before share-out

- [ ] Know who's in the room and what they care about
- [ ] TL;DR readable in ~60 seconds
- [ ] Major findings have clip or quote evidence
- [ ] Every problem has a recommendation
- [ ] Main present ≤20–30 minutes
- [ ] Links to deeper materials
- [ ] Last slide has named next steps + dates
- [ ] At least one surprising or emotionally resonant moment

---

## Output format

```markdown
## Shareout plan — [Study]

**Audience:** … · **Format:** standard deck / [creative] · **Length:** …

### TL;DR (60s)
1. [Insight] → [Rec]
…

### Spine
[Slide outline or workshop agenda]

### Insight blocks
[Headline / Finding / Evidence / Rec / Owner]

### Next steps
[Who · when · how it enters backlog]
```

---

## Persist

Append plan to `projects/<slug>/findings.md` (dated, `research-shareout`).
If building slides next, hand the spine to `deck-builder`. Run narration
copy through `references/shared/anti-ai-writing.md`.

---

## Never do this

- Never dump a wall of methodology before the answer
- Never present problems without recommendations
- Never treat a beautiful report as the goal — decisions are
- Never auto-run a creative game format when a standard TL;DR spine is
  enough — ask which format fits the room

---

## Related files

| File | Role |
|------|------|
| `../research-summary/SKILL.md` | Topline often feeds this shareout |
| `../insight-writer/SKILL.md` | Insight quality before share |
| `../deck-builder/SKILL.md` | Builds the HTML deck when asked |
| `../workshop-whiteboard/SKILL.md` | Workshop board for scoping research live with the room |
| `references/worked-example.md` | Worked shareout plan |
