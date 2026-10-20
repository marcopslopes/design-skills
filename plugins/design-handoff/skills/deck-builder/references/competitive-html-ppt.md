# Presenter-mode reuse filter

This note is a **reuse filter**, not a license to import decorative
theme packs into the company decks. Colors still trace to
`context/design-system/tokens.css`.

---

## Decorative kits we do not import

A full AgentSkill for static HTML decks:

| Piece | Count / note |
|-------|----------------|
| Themes | 36 CSS token override files (`tokyo-night`, `rose-pine`, …) |
| Single-page layouts | 31 HTML files with demo data |
| Full-deck templates | 15 (pitch, tech-sharing, weekly-report, presenter-mode, …) |
| CSS animations | 27 (`data-anim`) |
| Canvas FX | 20 (particles, matrix-rain, …) |
| Runtime | `assets/runtime.js` — nav, overview, theme cycle, **presenter mode**, notes, hash deep-links, `?preview=N` |
| Scripts | `new-deck.sh`, `render.sh` (headless Chrome → PNG) |

Philosophy: **copy a layout file → replace demo data → never invent from blank**; tokens not hex; notes never on the visible slide.

---

## What we already have (don't duplicate)

- Dark/light + DS accent picker (better fit for the company than 36 aesthetic themes)
- Rounded deck frame + shortcuts + overview
- Case-study narrative templates + `layouts.md` L01–L25
- Live Design Harness `?embed=1` phone embeds
- Playwright QA loop
- Chart.js on at least one evidence slide

---

## TAKE — high value for deck-builder

1. **Presenter mode (`S`)**  
   Dual window: audience + magnetic cards (current / next / script / timer),
   `BroadcastChannel` sync, `?preview=N` iframe previews, postMessage
   slide-switch without reload. Critical for stakeholder / tech-share talks.

2. **Speaker notes contract**  
   `<aside class="notes">` hidden from audience; 150–300 words; bold keywords;
   spoken language; **never put presenter-only captions on the slide**.

3. **Hash deep-links `#/N`**  
   Shareable slide URLs + clean PNG export loop (pairs with render script).

4. **`new-deck.sh` scaffold**  
   Copy starter chassis into `projects/<slug>/artifacts/decks/` with paths fixed.

5. **Formal PNG export script**  
   Headless Chrome, or wrap our Playwright into
   `scripts/render-deck.mjs`.

6. **Layout snippets we still lack** (adapt to DS tokens, not imported themes):
   - `kpi-grid` with ↑/↓ deltas + `counter-up`
   - `roadmap` NOW / NEXT / LATER / VISION
   - `process-steps`, `pros-cons`, `comparison` (before/after panels)
   - `stat-highlight` (one giant number)
   - `cta` / `thanks` closers
   - `arch-diagram` / `flow-diagram` (for eng/IA decks)
   - `code` / `diff` / `terminal` (tech-sharing only)

7. **`data-title` on every `.slide`**  
   Overview grid labels (we only have overview-num today).

8. **Progress bar** under the deck frame.

9. **Light CSS entry anims only**  
   `fade-up`, `stagger-list`, `counter-up`, `rise-in` + `prefers-reduced-motion`.
   Not a canvas FX pack.

10. **Authoring discipline**  
    Confirm audience / length / starter before writing; always start from a
    layout snippet; one accent animation per slide.

---

## LEARN — process & architecture

- **Single-page files as the unit of reuse** — easier for agents than one
  mega HTML. We should grow `templates/single-page/*.html` (or
  `references/snippets/`) with DS-skinned demos.
- **base.css + theme override files** — we already split dark/light; keep
  accents as our second axis, not 36 skins.
- **Scenario full-decks** (`weekly-report`, `tech-sharing`, `pitch-deck`)
  map loosely to our templates 2–4; a dedicated presenter-mode reveal is a
  fifth mode we don't have.
- **Iframe isolation for theme showcases** — useful if we ever ship a
  layout gallery page for designers.
- **Scoped `.tpl-<name>` CSS** — good if multiple demo decks share a page.

---

## SKIP / reject for the company

| Pattern | Why not |
|-------------|---------|
| 36 decorative themes (Tokyo Night, Rose Pine, Memphis, …) | Violates DS token hard rule — same class of miss we avoided earlier |
| Canvas FX (confetti, matrix-rain, fireworks, …) | Wrong tone for product/stakeholder decks; motion noise |
| Xiaohongshu / consumer pastel as default | Not our audience |
| Copying hex palettes into our `:root` | Invented brand colors |
| Replacing Design Harness live embeds with static lookalikes | Opposite of our hard rule |

---

## Suggested adoption order

1. Speaker notes + presenter window (**off by default** on stakeholder deck)
2. `#/N` deep-links + `data-title` (done)
3. ~~Light CSS entry anims~~ — **done (lean):** `fade-up` / `rise-in` /
   `stagger-list` + reduced-motion in `base-skin.md` (not a large FX pack)
4. Missing layout snippets (kpi deltas, roadmap, process-steps, closers)
5. `new-deck` + `render-deck` scripts under `scripts/`
6. Progress bar under the deck frame
