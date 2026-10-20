---
name: deck-builder
description: "Builds self-contained HTML presentation decks (case study, workshop / options review, stakeholder update) from an existing `projects/<slug>/` task folder or a pasted PRD/brief. Triggers on: \"build me a presentation / deck / slides about this project\", \"case study deck\", \"put this PRD into slides\", \"make a deck for the workshop / for leadership\". The case-study deck renders `projects/<slug>/case-study.md` (written by `case-study`, which owns the story) — it never re-tells the story itself. Reuses the dark presentation skin and slide-component library already proven in `projects/settings-ia/artifacts/decks/navigation_ia_case_study_v10.html` and `navigation_workshop_slides_v3.html`. Embeds live, interactive prototype mockups via a chromeless Design Harness route iframe (`?embed=1`) instead of hand-copied lookalike markup, so embedded mockups can't silently drift from the real prototype. Supports a dark (default) or light theme, and an optional Chart.js live-chart primitive for trend/distribution data."
---

# Deck builder

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Turns an existing task folder (or a pasted PRD/brief with no folder yet)
into a **self-contained HTML slide deck** — one file, dark presentation
skin, keyboard/dot navigation, and (when relevant) live interactive phone
mockups embedded mid-slide.

This formalizes a pattern that already existed by hand:
`projects/settings-ia/artifacts/decks/navigation_ia_case_study_v10.html` and
`navigation_workshop_slides_v3.html` are real, previously hand-built decks
in this repo. **Don't reinvent the skin or slide-component CSS** — copy the
`<style>` block and nav script from one of those files as the base chassis
(see `references/base-skin.md`) and extend, rather than writing new CSS
components from scratch.

**Invoke in Cursor:** "build me a deck on the settings-ia project", "make a
workshop deck to review these three options", "put this PRD into slides
for leadership", "turn the referral case study into a presentation".

The story and the look are separate jobs. `case-study` writes what a case
study says (`case-study.md`); this skill decides how it looks as slides.
Workshop and stakeholder decks are built here directly from the folder.

---

## Scope boundary

- **Fires on:** an explicit ask to build a presentation/deck/slides about a
  project, a PRD, or a set of findings.
- **Does not fire on:** requests to *produce* new analysis, critique, or
  research — those are `ux-pattern` / `content` / `research-agent` /
  `design-kickoff`. `deck-builder` composes and presents what those skills
  already wrote to `findings.md` / `decisions.md` / `brief.md`; it never
  generates new judgments of its own.
- **Does not** invent content the source material doesn't support. If a
  template calls for a slide type the source data can't fill (e.g. an
  "outcome" slide with no decision logged yet), say so and either skip the
  slide or flag it as a gap — never fabricate a stat, quote, or outcome.

---

## Hard rules

1. **Tokens/skin, not ad-hoc styling.** The deck's colour, spacing, and
   type values must trace back to `context/design-system/tokens.css`
   (mirrored into the deck's own `:root` block, same as the existing
   decks do) — this is a presentation skin *of* the design system, not a
   generic slide template. Never invent a new brand palette for a deck.
2. **Live embeds, not lookalikes.** Any embedded phone mockup must be a
   real, interactive Design Harness prototype route via the chromeless
   `?embed=1` iframe pattern (`references/live-embed.md`) — never a
   hand-copied HTML/CSS duplicate of the prototype pasted into `srcdoc`.
   If the prototype doesn't exist yet in `src/design-harness/pages/`, that's a
   sign `deck-builder` isn't the right next step — build the prototype
   first (`ui-agent` chain), then the deck.
3. **One task folder = one source of truth.** Pull narrative, decisions,
   and evidence from `projects/<slug>/brief.md` / `findings.md` /
   `decisions.md` — don't re-derive from chat memory when the folder has
   the answer. **Case-study decks read `case-study.md` only**; if it's
   missing, show the §3 PLAN (`case-study` → `deck-builder`) and wait for
   go. If there's no task folder (a pasted PRD with nothing in
   `projects/`), say so and either open a minimal folder or work directly
   from the pasted text — never silently invent a folder's worth of
   backstory.
4. **Template inferred, confirmed in one line.** Infer the template
   (`references/templates.md`) from the ask's phrasing, state the pick in
   one line before building ("Building this as a **workshop** deck — say
   so if you meant case study instead"). Don't run a full `AskQuestion`
   for this unless the ask is genuinely ambiguous between two templates.
5. **Multi-skill chains still show the plan.** If the ask also implies a
   fresh critique/research pass ("audit this and turn it into a deck"),
   that's `ux-pattern`/`research-agent` **first**, `deck-builder` after —
   show the §3 plan per `harness/ORCHESTRATOR.md`, wait for go.

---

## Workflow

### Step 0 — Resolve source + template

1. Match or ask for the `projects/<slug>/` folder (or accept a pasted
   PRD/brief with no folder — flag that state plainly).
2. Read `brief.md`, `findings.md`, `decisions.md` in full — or, for a
   case-study deck, `case-study.md` (missing → PLAN with `case-study` first).
3. Infer the template from the ask's phrasing against
   `references/templates.md`'s trigger table; state the pick in one line.
4. Default to the **dark** theme unless the designer asks otherwise or
   the destination context calls for light (e.g. printing, a
   light-branded external audience) — `references/themes.md` covers the
   light variant and its component gotchas. Template and theme are
   independent choices; state both in the same one-line confirmation.
5. If the deck needs a live prototype embed, confirm the target route
   exists in `src/design-harness/pages/` / `routes.ts` — if not, say so and stop
   short of building a fake mockup.
6. If the ask doesn't already make it obvious, note (don't necessarily
   `AskQuestion` — a one-line assumption stated up front is enough unless
   genuinely ambiguous) two things that shape the draft: **who's the
   audience** (leadership skim vs. a working session vs. an external
   partner — affects tone and how much rationale to include, not just
   template choice) and **roughly how long** ("tight overview" vs. a
   fuller walkthrough — affects how many slide-type slots from
   `references/templates.md`'s checklist actually get used, not the
   template itself). Both default from the task folder's own framing
   when it's already clear (e.g. `findings.md` written for a leadership
   update implies the audience).

### Step 1 — Outline

Draft a slide-by-slide outline in chat first (title only, one line each) —
this is the cheap point to catch "wrong template" or "missing evidence"
before writing any HTML. Wait for a quick go/adjust unless the designer
has a standing "just do it" preference logged in
`designer-profile.local.md` (single-skill plans can skip the full §3 plan
block, per `harness/ORCHESTRATOR.md` §3 — the outline itself still stands
in as the lightweight check).

### Step 2 — Build

1. Copy the base skin (`references/base-skin.md`) into a new file.
2. Compose slides from the template's slide-type checklist
   (`references/templates.md`), reusing the existing component classes
   (`.card`, `.stat-row`, `.callout`, `.data-table`, `.quote-card`, etc. —
   see `references/base-skin.md` for the full inventory) before inventing
   a new one. Reach for the Chart.js live-chart primitive
   (`references/base-skin.md` "Live charts") only when the data is the
   point (a trend, a distribution) — the CSS stat primitives cover most
   decks.
3. For any live prototype slide, embed per `references/live-embed.md`.
4. Use the full chassis from `references/base-skin.md`: the rounded
   `.deck-frame` on a neutral `.stage` backdrop (not edge-to-edge), the
   `.slide` → `.slide-inner` split, the chosen theme's `:root` mirror
   (`references/themes.md`), and the shortcuts bar wired to whichever of
   theme/font/transition-cycle/all-slides-overview the deck actually
   uses — don't hint at a shortcut key that does nothing.
4. Save to `projects/<slug>/artifacts/decks/<slug>-<template>.html`. Do
   **not** auto-mirror to `public/` — publishing a public URL is a separate,
   opt-in step. If the designer wants one, run `publish-project`
   (`../publish-project/SKILL.md`), which copies the picked
   file(s) into `public/projects/<slug>/`.

Before saving, check every slide's narration/copy text (headings, stat
labels, callouts — not the data itself) against
`references/shared/anti-ai-writing.md`. A stakeholder deck is exactly
the "shown to people who weren't in the room" case that vocabulary list
exists for.

### Step 2.5 — QA render-check (mandatory, not optional)

Treat the first build as a draft, not done. Before persisting: open the
saved deck (via the browser tool available in-session), screenshot
**every slide**, and check each one for:

- Clipped or overflowing text (a stat number, heading, or long card body
  running past its container — common with real data that's longer than
  the placeholder text used when the skin was first designed).
- Misaligned or empty live-embed frames (`iframe.proto` failing to load,
  showing a blank white box, or still showing Design Harness chrome that
  `?embed=1` should have stripped — see `references/live-embed.md`'s
  fresh-tab caveat if a check looks wrong).
- Broken component nesting (e.g. a `.card-grid` with mismatched column
  count for its actual card count, a `.data-table` wider than the slide).
- Dot-nav count matching the actual number of `.slide` elements (a slide
  added/removed without updating the nav script's expectations — the nav
  script self-counts via `document.querySelectorAll('.slide')`, so this
  is usually fine, but confirm the counter renders `"N / total"` correctly
  on the first and last slide).
- If the all-slides overview grid is in use: click a thumbnail and
  confirm it actually jumps (not just that overview mode opens) — a
  scaled-down interactive element inside `.slide-inner` (a live-embed
  `iframe.proto` especially) will silently eat the click unless
  `.slide-inner` has `pointer-events:none` in overview mode
  (`references/base-skin.md` has the exact rule; found missing live
  2026-08-04).

Fix anything found, then re-check the fixed slide(s) — don't re-screenshot
the whole deck again unless the fix could plausibly affect layout
elsewhere (e.g. a base-skin CSS change).

**If the in-session interactive browser tool (`cursor-ide-browser` /
`browser-use`) is unavailable,** don't skip straight to asking the
designer to check manually — first try driving a headless browser
directly via the shell. This repo already has Playwright as a
dependency (confirmed working 2026-08-04): a short Node script that
`chromium.launch({headless:true})`, calls the deck's own `window.show(n)`
to step through slides, screenshots each, and checks each
`.slide.active` subtree's `getBoundingClientRect()` against the viewport
for overflow gets you the same signal without any interactive tool. For
a live-embed slide, reach into `iframe.contentFrame()` and assert
`#design-harness-site-nav` / `.design-harness-ds-mobile-bar` counts are `0` to confirm
chromeless mode actually worked, not just that the iframe loaded. Only if
this genuinely isn't possible (e.g. no Node/Playwright available at all)
say so plainly and hand the designer the exact slide-by-slide checklist
above to verify manually — never silently skip this step and call the
deck done.

### Step 3 — Persist

- `findings.md` — one dated line: deck built, template, path.
- `log.md` + `harness/logs/routing-log.md` — `MATCHED deck-builder`.
- This skill does not edit `galleryData.ts`; gallery projects come from
  `brief.md` (see `../audit/SKILL.md` Step 3.5).

---

## Never do this

- Never hand-copy a prototype's markup into an iframe `srcdoc` when the
  real route exists — that's the exact drift problem this skill exists to
  fix.
- Never skip the Step 2.5 QA render-check and call a deck done on the
  first build — treat the first render as a draft, same posture
  Anthropic's own `pptx` skill takes (screenshot-verify before done).
- Never invent stats, quotes, or "outcome" slides the task folder doesn't
  actually support.
- Never skip the one-line template confirmation and just start building.
- Never treat this skill as a substitute for `ux-pattern`/`content`/
  `research-agent` — if the ask needs new analysis, run those first.
- Never treat “proper report” / “HTML report of this review” as slides —
  that is `review-report` (scroll article). This skill is decks only.
- Never write or rewrite case-study chapters here — that's `case-study`.
  A deck that disagrees with `case-study.md` is a bug in the deck.

---

## Related files

| File | Role |
|------|------|
| `references/layouts.md` | Master template layout catalog (section dividers, columns, metrics, timelines, photo quotes, …) |
| `references/presenter-mode.md` | `S` presenter window + speaker notes + `?preview=N` |
| `assets/deck-presenter.js` | Presenter runtime — mirror to `public/deck-builder/` for local serve |
| `references/competitive-html-ppt.md` | Reuse filter — presenter mode, notes, layouts to take; decorative themes and canvas FX to skip |
| `references/base-skin.md` | Base CSS/JS chassis — copy from the two reference decks, reusable slide-component inventory |
| `references/templates.md` | The 3 templates; case study = chapter → slide mapping (the story itself lives in `references/from-case-study/chapters.md`) |
| `../case-study/SKILL.md` | Writes `case-study.md`, the source for case-study decks |
| `references/live-embed.md` | Chromeless `?embed=1` Design Harness route embedding — the one-time app change this skill depends on |
| `references/themes.md` | Dark (default) vs light `:root` theme — orthogonal to template choice |
| `projects/settings-ia/artifacts/decks/navigation_ia_case_study_v10.html` | Reference deck — case study skin + live-mockup precedent (pre-`?embed=1`, uses `srcdoc` lookalikes — superseded pattern, kept as the CSS/structure reference only) |
| `projects/settings-ia/artifacts/decks/navigation_workshop_slides_v3.html` | Reference deck — lighter workshop skin |
| `harness/ORCHESTRATOR.md` §2 | Routing row |
| `../ticket-create/SKILL.md` | Same draft-outline-first → build posture |
