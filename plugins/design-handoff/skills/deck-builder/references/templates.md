# Deck templates

Three templates, inferred from the ask's phrasing (confirm in one line, per
`SKILL.md` Step 0). Each lists the slide types a full deck of that kind
should have — skip a slide type if the source genuinely has nothing to fill
it with (never fabricate to complete the checklist), and note the skip in
the outline step so it's a visible decision, not a silent gap.

## 1. Case study

**Trigger phrasing:** "case study deck", "turn the case study into slides",
"present the case study", "case study presentation".

**Source:** `projects/<slug>/case-study.md`, written by the `case-study`
skill. The story — what each chapter says, where it comes from, when it is
skipped — is defined once in
`references/from-case-study/chapters.md`. This section only says
how each chapter becomes slides. **No `case-study.md` yet** → §3 PLAN:
`case-study` first, then this template. Never re-derive the story from the
task folder here.

**Reference decks:**
- Long-form / scroll narrative:
  `projects/settings-ia/artifacts/decks/navigation_ia_case_study_v10.html`
  (structure + component precedent; pre-`?embed=1` mockups are
  superseded — use `references/live-embed.md` for new embeds).
- Slide chassis + live embed precedent:
  `projects/settings-ia/artifacts/decks/settings-ia-stakeholder-update.html`
  (rounded frame, pickers, `?embed=1` Calendar prototype).

### Chapter → slides

Components come from `references/base-skin.md` — reuse before inventing.

| Chapter | Slides | Components |
|---------|--------|------------|
| 1. Opening | **Four light slides:** Cover → Who's → Intro → RACI | Cover: eyebrow + `h1` only. Who's: `.meta-row`. Intro: `h2` + `.lede`. RACI: `.data-table` + `.raci-letter` badge |
| 2. Problem / why now | One slide | Short body + optional `.callout` labelled "Why now" |
| 3. Evidence | **One slide per evidence group** | Numbers: `.stat-row` / `.stat`. Voices: 2–3 `.quote-card` with `.quote-avatar` + name + role. Table: one `.data-table`. Chart.js only when the shape of a trend is the point |
| 4. Options considered | One slide, 2–4 options | `.card-grid` of option cards or `.data-table` (Option / What it is / Why not). Rejected path visibly marked (muted card, "Rejected" tag, or `.outcome-card--neg`) |
| 5. The decision | One slide | One `.callout` (`The decision` / `What we locked`), optional one-line why. `.callout-amber` "Decision pending" when none exists |
| 6. Live prototype | One or more slides | Embed per `references/live-embed.md` (`?embed=1`) — patterns below |
| 7. Outcome | One slide | `.outcome-grid` / `.outcome-card`, `.agenda-row` with Done / Next tags, or `.stat-row` for measured lifts. `.callout-amber` only for residual risk |
| 8. Sources | One slide | `.link-list` / `.link-item` — human labels, not raw URLs |

### Slide rules

- **Never jam the opener.** Cover carries the framing headline only — no
  lede, no meta row (live miss 2026-08-04). A tiny internal skim deck may
  merge Who's + RACI into one ownership slide; note it in the outline.
- **One idea per slide.** Never stack a long `h2` + `.stat-row` +
  `.quote-stack` (+ footnote) on one slide — that reads as a document.
  Proof and voice are two slides, not one denser slide. Cut body copy;
  the number or the quote *is* the content.
- **Every quote card shows a person** — avatar, name, role. Never a bare
  colored-bar block quote (live miss 2026-08-04).
- Chapters 3 and 4 may span several slides; chapters 5 and 8 stay one
  slide each.

### Live prototype slide patterns

**Phone only** — never the whole Design Harness / case-study page. The
prototype page must hide write-up panels when embed is on (Calendar
already does).

| Pattern | When | Layout |
|---------|------|--------|
| **Single phone** | Walkthrough / "see it live" | One narrow `.proto-frame-wrap` (~420px) + one `iframe.proto` |
| **Compare v1 \| v2** | Options / before-after | Separate slide — `.proto-compare` with two `.proto-phone-col`s side by side. Never stack two phones under a long essay on the walkthrough slide |

Eyebrow + short `h2` + one tap hint, then the phone frame(s). The phone is
the content — no inventory tables beside it. Optional
`.proto-phone-placeholder` when only one live route exists for a compare
slide. Never paste lookalike HTML into `srcdoc`.

### Case study — slide checklist (quick)

1. Opening — Cover → Who's → Intro → RACI (four light slides)
2. Problem / why now
3. Evidence — Numbers / Voices / Table, one slide each
4. Options considered (incl. rejected)
5. The decision + why — one clear callout
6. Live prototype — 1+ `?embed=1` slides
7. Outcome / expected change
8. Sources / links

Chapters listed under **Skipped** in `case-study.md` stay skipped in the
deck — never fill them from the folder here.

## 2. Workshop / options review

**Trigger phrasing:** "workshop deck", "review these options with the
team", "compare these variants", "gather feedback on".

**Shape:** shorter, faster-moving, built to be presented live and
discussed. Reference: `navigation_workshop_slides_v3.html`.

Slide checklist:
1. Title + agenda (agenda-row component)
2. What we're deciding / not deciding (not-box component)
3. Option A / B / C — one slide each, live mockup embed where applicable
4. Comparison table (data-table)
5. Open questions (q-list component)
6. Next steps

## 3. Stakeholder / status update

**Trigger phrasing:** "stakeholder deck", "leadership update", "status
update deck", "prep something for leadership", "put this PRD into slides".

**Shape:** short, outcome-first, minimal process detail. Source: `brief.md`
Status + Case study summary, `findings.md`, `decisions.md`. Build from the
same base skin. A PRD-into-slides ask uses this template with the brief as
the main source — there is no separate PRD walkthrough template (the brief
already renders at `#/playground/<slug>/facts`).

Slide checklist:
1. Opening — Cover → Who's → Intro → RACI (same split as the case study opener)
2. Where things stand (stat row / mini-stats)
3. What shipped / what's next (agenda-row or outcome-grid)
4. Risks or asks, if any (callout-amber)
5. Links / where to go for more detail

Aim for ~8–12 slides once the opener is split — still short, just not
cramped on slide 1.

Hard rule (same as the rest of this skill): **no invented status** — early
experiment signals stay “early / not conclusive” unless findings say
otherwise. There is no narrated or timed video mode; a "status video" ask
gets this deck and a one-line note that narration isn't offered.
