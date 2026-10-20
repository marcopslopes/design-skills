# Master template — layout catalog

Reusable **slide structures** for `deck-builder`. Steal the *composition*
from good decks (section openers, columns, stats, timelines, photo quotes)
— not their decorative palettes. Every color still traces to
`context/design-system/tokens.css` via the deck `:root` (see
`base-skin.md` + `themes.md`).

**Reference mood (structure only):** section-title + inset photo, 2/3-col
ruled columns, word-stack values, big metric blocks, pie/line charts,
horizontal timelines, numbered timeline cards, photo+quote pair,
feature “what's inside” grid, manifesto / brand-statement spread.

**Hard rules:**
- One idea per slide (same density rule as Evidence Numbers vs Voices).
- No invented brand colors (no random coral/forest themes) — use
  `--brand`, `--warn`, `--pos`, `--neg`, surfaces from the skin.
- Imagery = real people / product / place when possible; avatars on
  voice slides are required (not bare bar quotes).
- Live phones = phone-only embeds (`live-embed.md`); compare = separate
  dual-phone slide.

---

## Layout inventory

| ID | Name | Job | Key classes |
|----|------|-----|-------------|
| L01 | **Cover punch** | One framing headline | eyebrow + `h1` only |
| L02 | **Section divider** | Open a chapter | Big `.section-inset` **left** + `.section-title` **right** (centered) |
| L03 | **Contents / TOC** | Orient the room | `.toc-list` / `.toc-row` |
| L04 | **Who's / meta** | Ownership strip | `.meta-row` |
| L05 | **RACI** | Roles | `.data-table` + `.raci-letter` |
| L06 | **Intro lede** | What this is | `h2` + `.lede` |
| L07 | **Problem callout** | Why now | body + `.callout` |
| L08 | **Stat row** | 2–4 big numbers | `.stat-row` |
| L09 | **Metric blocks** | Billboard numbers | `.metric-grid` / `.metric-block` |
| L10 | **Chart** | Trend / mix | Chart.js canvas in `.chart-wrap` |
| L11 | **Person quotes** | Voices with faces | `.quote-card` + `.quote-avatar` |
| L12 | **Photo quote** | One voice, large | `.photo-quote` (image + quote) |
| L13 | **Word stack** | Principles / values | `.word-stack` + side note |
| L14 | **2-col text** | Compare two ideas | `.col-grid.col-grid--2` |
| L15 | **3-col text** | Three equal beats | `.col-grid.col-grid--3` |
| L16 | **Option cards** | Chosen + rejected | `.card-grid` |
| L17 | **Decision callout** | The lock | one `.callout` |
| L18 | **Timeline bars** | Sequence / phases | `.timeline-bars` |
| L19 | **Timeline cards** | Numbered steps | `.timeline-cards` |
| L20 | **Phone walkthrough** | Live proto | narrow `.proto-frame-wrap` |
| L21 | **Phone compare** | v1 \| v2 | `.proto-compare` |
| L22 | **Outcome grid** | Shipped / expected / open | `.outcome-grid` |
| L23 | **Feature grid** | What's inside / pillars | `.feature-grid` |
| L24 | **Manifesto** | Brand / thesis statement | `.manifesto` (split or stacked) |
| L25 | **Sources** | Links out | `.link-list` |

---

## When to use which (case study arc)

| Chapter | Preferred layouts |
|---------|-------------------|
| Opening | L01 → L04 → L06 → L05 (+ L03 Contents after Who's) |
| Problem | L02 divider → L07 |
| Evidence | L02 → L08 or L09 (numbers) → L11 or L12 (voices) → L10 if a chart earns it |
| Options | L16 (or L14/L15 if text-heavy) |
| Decision | L17 |
| Prototype | L20 → optional L21 |
| Outcome | L18/L19 timeline and/or L22 |
| Close | L25; optional L23 “what's next” / L24 thesis |

---

## Markup sketches

### L02 — Section divider
Big photo **left**, chapter title **right** (vertically centered).

```html
<div class="slide">
  <div class="slide-inner section-divider">
    <img class="section-inset" src="…" alt="" />
    <div class="section-divider__copy">
      <div class="eyebrow">Chapter</div>
      <h1 class="section-title">Evidence.</h1>
    </div>
  </div>
</div>
```

### L09 — Metric blocks
```html
<div class="metric-grid">
  <div class="metric-block metric-block--brand"><b>79.6%</b><span>Phase 1 success</span></div>
  <div class="metric-block metric-block--warn"><b>1 / 4</b><span>Tabs with header</span></div>
  <div class="metric-block metric-block--pos"><b>≥80%</b><span>Target bar</span></div>
</div>
```

### L12 — Photo quote
```html
<div class="photo-quote">
  <img class="photo-quote__img" src="…" alt="" />
  <div class="photo-quote__copy">
    <p class="photo-quote__text">“…”</p>
    <div class="photo-quote__who"><b>Name</b> · Role</div>
  </div>
</div>
```

### L18 — Timeline bars
```html
<div class="timeline-bars">
  <div class="timeline-bar" style="--w:40%"><span>Phase 1 tabs</span></div>
  <div class="timeline-bar timeline-bar--brand" style="--w:70%"><span>Calendar header</span></div>
  …
</div>
```

---

## Worked demo

`projects/settings-ia/artifacts/decks/settings-ia-stakeholder-update.html` is the
**master template demo deck** — case-study narrative using these layouts.
Copy its `<style>` + nav script when starting a new deck, then swap content.
