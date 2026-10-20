---
name: research-synthesis
description: >-
  Turns raw interview/UT recordings and transcripts into tagged data,
  affinity clusters, and pattern candidates — either as a per-session
  30-minute debrief run right after each interview, or a full tagging +
  affinity-diagramming pass across a completed study. Triggers on: "run a
  research debrief", "post-session debrief", "lightning synthesis", "how
  do I synthesize these interviews", "affinity diagram this data", "find
  patterns in these transcripts", "synthesis is taking too long", "I have
  all this data now what", "tag these transcripts", "cluster these
  findings". Produces patterns and clusters, not finished insights — hand
  the output to `insight-writer` for the key-learning/why/consequence
  writeup.
---

# Research Synthesis

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Turns raw session data into tagged clusters and pattern candidates —
either fast (a 30-minute debrief right after each session) or full (tag →
affinity diagram → pattern-threshold a completed study). This skill
stops at "here's what's emerging and how strong the signal is." Writing
the actual insight is `insight-writer`'s job.

**Invoke in Cursor:** "run a debrief for this session", "synthesize these
interviews", "what patterns are in this data"

---

## Scope boundary

- **Fires on:** synthesizing real session data — a transcript, a set of
  notes, or a live debrief right after a session — for an approved
  `projects/<slug>/` task or a standalone ask.
- **Does not fire on:** writing the finished insight from a pattern
  (`insight-writer`), planning which method to run in the first place
  (`design-kickoff` Step 1.5 or `decision-first-research`), or building
  the usability test itself (`usability-test-guide`).
- **Never invents a pattern.** A cluster with one data point is an
  anecdote, not a pattern — say so explicitly rather than rounding up.

---

## Mode 1 — Post-session debrief (run right after a session, 30 min)

For teams new to synthesis, or when stakeholders observed the session
live and momentum matters more than depth.

1. **Topics (pick 3–4, define each in one sentence):** Pain points (where
   the user struggled/was confused), Surprises (challenged an assumption),
   Key takeaways (feels important for the project), Parking lot (anything
   else, including questions).
2. **Per topic:** 5 min individual silent brainstorm (no discussion — this
   preserves perspectives that get lost once people anchor on what others
   already wrote) → 3 min group discussion clustering similar notes.
3. **One board per participant** — never one combined board for multiple
   sessions; combined boards lose the per-participant signal the final
   synthesis pass needs.
4. **Calendar-invite trick:** block the debrief in the same invite as the
   session (e.g. session 10–11am, invite reads 10–11:30am) — dramatically
   raises attendance since stakeholders don't decide in the moment.
5. Share the board afterward; leave open 24–48h for additions from people
   who couldn't attend.

## Mode 2 — Lightning synthesis (run right after a session, 35 min)

For time-pressured studies wanting to go further than observations —
tag, cluster, and draft insight material in one pass per participant.

**Lean tag set (5 tags, not the full 6–7):** Goal, Need, Pain point,
Tools, **Quick fix** (something small and annoying the team can act on
immediately, without waiting for a full insight).

**Per-participant session structure (35 min total):** ~3 min brainstorm +
3 min cluster per tag (Goals → Needs → Pain points → Quick fixes), then
5 min looking back across previous participants' boards for emerging
patterns (starting from participant 3), then 5 min drafting rough
insight material + next steps on anything that already meets the pattern
threshold below.

By participant 5–6 there's often enough signal for a first draft
insight — hand it to `insight-writer` immediately rather than waiting for
the study to finish; a rough insight written at the moment of discovery
beats a polished one written too late.

## Mode 3 — Full tagging + affinity diagram (completed study)

1. **Transcribe within 24 hours** of each session (memory fades fast;
   notes carry interpretation, transcripts carry what was actually said).
   Auto-transcription (Otter/Rev/Descript) is fine — speed matters more
   than method here.
2. **Tag deductively first** using the global set below, adding inductive
   tags only for themes that don't fit. Keep it to 4–7 tags total — more
   makes clustering unwieldy.

   | Tag | Captures |
   |---|---|
   | Goal | What the person is trying to accomplish |
   | Motivation | Why they're trying to accomplish it |
   | Need | Something required to fulfill the goal |
   | Task | Something they do to achieve the goal |
   | Pain point | A barrier to accomplishing the goal |
   | Tools | A tool they use toward the goal |

   A line can carry two tags (a statement can be both a pain point and a
   motivation) — tag both rather than forcing a single label. Not every
   line needs a tag.
3. **One data point per post-it, participant number on every one.**
   Never combine two observations on one note — you lose the ability to
   trace a finding back to source.
4. **Group by tag first, then cluster within each tag** for similar
   sub-themes. Name each cluster with a short label capturing the shared
   theme — that label is the seed of a finding or insight.
5. **For 15+ participant studies:** run mini-synthesis every 5–7
   participants rather than one marathon session at the end.

## Pattern threshold (all modes)

A cluster is a **pattern** once roughly 1/3 of the sample (rounded up)
raised it — a starting heuristic, not a hard rule. One-off comments with
a genuinely severe consequence are still worth flagging, just labeled as
a single data point, not a pattern.

| Sample size | Pattern threshold |
|---|---|
| 6 | 2+ |
| 9 | 3+ |
| 15 | 5+ |
| 20 | 7+ |
| 25 | 9+ |

Flag patterns in real time as the study progresses — don't wait for the
last session. Note low-frequency clusters that directly contradict a
stated team assumption even below threshold; they're often the most
valuable signal in the whole study.

---

## Output format

```markdown
## Synthesis — [Project/topic] (Mode: debrief / lightning / full tag+affinity)

**Tags used:** [list]

**Clusters:**
| Cluster name | Tag | Participants (n/total) | Pattern? (meets 1/3 rule) |
|---|---|---|---|
| ... | Pain point | 5/12 | Yes |

**Contradicts a team assumption:** [note any, even below threshold]

**Ready for insight-writer:** [which clusters have enough depth for a
full key-learning/why/consequence writeup vs. which are still findings]
```

---

## Persist

Append clusters + pattern table to `projects/<slug>/findings.md` (dated,
named `research-synthesis`). Per-participant debrief/lightning boards
persist as their own artifact (Miro/FigJam link or a markdown snapshot)
referenced from `findings.md`, not pasted inline.

---

## Never do this

- Never merge individual participant boards into one before the final
  synthesis pass — the per-participant signal is the input the final
  pass needs.
- Never round a 1–2-person comment up to a "pattern" — call it what it
  is and let `insight-writer` decide if the consequence is severe enough
  to report anyway.
- Never skip synthesis because the team already watched most sessions —
  unsynthesized data reliably regresses to whatever the team assumed
  before the study started.

---

## Related files

| File | Role |
|------|------|
| `../insight-writer/SKILL.md` | Turns this skill's patterns into finished key-learning/why/consequence insights |
| `../usability-test-guide/SKILL.md` | Produces the sessions this skill synthesizes |
| `../research-agent/SKILL.md` | Verdict synthesis mode composes with this skill for a full study writeup |
| `references/shared/anti-ai-writing.md` | Run on any synthesis writeup that gets shared, same as other stakeholder docs |
| `references/worked-example.md` | Full lightning-synthesis pass with clusters and a mid-study insight handoff |
