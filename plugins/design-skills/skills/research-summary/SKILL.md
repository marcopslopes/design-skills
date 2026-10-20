---
name: research-summary
description: >-
  Writes scannable research summaries at two altitudes — a post-session
  summary of one interview/UT (quotes, themes, cross-session notes), or
  an executive topline / one-pager for a finished study (3–5
  consequence-focused insights with evidence + recommendation). Triggers
  on: "write a session summary", "summarize this interview", "usability
  test summary", "post-session notes", "write a topline", "executive
  summary for this research", "one-pager for leadership", "key takeaways
  slide". Session mode feeds `research-synthesis`; topline mode feeds
  `research-shareout` / `deck-builder`. Does not write full insights
  (`insight-writer`) or design the share-out format (`research-shareout`).
---

# Research Summary (Session + Topline)

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Two altitudes of the same job: capture what matters in a form someone
will actually read — either one session (before full synthesis), or the
whole study (for people who won't open the full report).

**Invoke in Cursor:** "summarize this session", "write a topline for
[study]"

---

## Scope boundary

- **Fires on:** documenting a just-run session, or distilling a finished
  study into a one-page / one-slide executive summary.
- **Does not fire on:** writing a full key-learning/why/consequence
  insight (`insight-writer`), designing how to present findings live
  (`research-shareout`), or synthesizing across many sessions into
  patterns (`research-synthesis` — this skill's session summaries are
  *inputs* to that).
- **Never invents quotes or findings.** If raw notes/transcripts aren't
  available, say so and ask for them rather than paraphrasing from a
  vague recollection.

---

## Mode 1 — Post-session summary

Write within ~24h of the session. Verbatim quotes only.

**Pre-write (when notes exist):** re-check recording/notes → tag
need/pain/motivation/goal/behavior/bug → mini-cluster 2–4 themes →
note what this session confirms/adds/contradicts vs prior sessions →
pull 3–6 quotes.

### Generative template (hold recommendations — don't anchor synthesis)

```markdown
## Session summary — [Study] / [Participant or code]
**Date:** … · **Segment:** … · **Relevant teams:** …

**Background:** [1–2 sentences — why this research / why this person]

**Notable quotes:**
- "…" — [clip link if any]

**Themes:**
1. **[Name]** — [1–3 sentences]. Cross-session: heard from N prior? …
2. …

**Other tools / workarounds mentioned:** …
**Links:** recording · notes · related findings.md entries
```

### Usability / evaluative template (recommendations required)

```markdown
## UT session summary — [Feature/flow]
**Participants this write-up:** P…

**Insight — Observed by:** P…
- **Issue:** [one sentence]
- **Recommendations:** …
- **Quote:** "…" — [clip]
```

Tag for findability: study type · research area · segment · 3–5 theme
tags · month/year. Append to `projects/<slug>/findings.md`.

## Mode 2 — Executive topline

One page (max two). Test: if someone reads **only** this, do they know
what matters and what to do?

**Not:** a mini report, TOC, methodology abstract, or reward for reading
the full deck.

**Pick 3–5 insights** — brain-dump first (surprising / negative /
decision-relevant), then narrow to what the team must decide **now**.
Aim for ≥1 assumption-challenging, ≥1 urgent friction, rest near-term
decision fuel.

**Each insight — four parts:**
1. **Header (2–6 words)** — consequence / business implication, not
   "users struggled with X" (pass a 3-second non-researcher scan)
2. **Finding (1–2 sentences)** — impact-focused
3. **Evidence** — one quote **or** one number (not three)
4. **Consequence + recommendation** — specific; "improve the experience"
   is not a recommendation

```markdown
## Executive summary — [Study]
**Date:** … · **Audience:** …

[One framing sentence: who / what was explored]

### [Header]
[Finding]
"[Quote]" — P#, [segment]  *or*  [data point]
[Consequence + recommendation]

…

**Links:** full findings · synthesis · clips
```

Leadership variant: digestible in ~5 minutes; link 30s clips where
possible. Product variant: friction + sprint-ready recommendations.

Run finished toplines through `references/shared/anti-ai-writing.md`
before sharing.

---

## Persist

Session summaries → `projects/<slug>/findings.md` (dated,
`research-summary`, session mode). Toplines → same, plus hand off to
`research-shareout` / `deck-builder` when a live readout is next.

---

## Never do this

- Never paraphrase quotes as if they were verbatim
- Never write a topline that is just a shortened full report
- Never put recommendations in a generative session summary that will
  be sent ahead of a synthesis workshop (anchors the room)
- Never ship a topline insight without a recommendation

---

## Related files

| File | Role |
|------|------|
| `../research-synthesis/SKILL.md` | Consumes session summaries as inputs |
| `../insight-writer/SKILL.md` | Full insight writeup when a pattern is ready |
| `../research-shareout/SKILL.md` | Live presentation / engagement format after a topline |
| `references/worked-example.md` | Session + topline examples |
