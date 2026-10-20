# Base skin — copy, don't reinvent

Both reference decks share one chassis: a `:root` token mirror, a
`.deck`/`.slide` absolute-positioned slide stack with fade transitions, a
floating dot/arrow nav bar, and a large library of slide-content
components. **Copy the `<style>` block and the nav `<script>` wholesale
from one of these two files as the starting point for any new deck** —
don't re-derive the CSS from `context/design-system/tokens.css` by hand
each time; that's how the two existing decks already drifted slightly
from each other in small ways.

Canonical sources, in order of preference:

- `projects/settings-ia/artifacts/decks/navigation_ia_case_study_v10.html` —
  the fuller/heavier skin, most complete component inventory.
- `projects/settings-ia/artifacts/decks/navigation_workshop_slides_v3.html` —
  the lighter/faster skin, use as the base for the **workshop** template
  specifically.

## Structural chassis (present in both)

- `:root` — brand/ink/surface/line tokens mirrored from
  `context/design-system/tokens.css` (dark presentation mode — this is
  intentionally the one place in the repo a dark skin is allowed outside
  Design Harness chrome itself, since these are export artifacts, not product
  UI — see `harness/ORCHESTRATOR.md` §7.1 rule 7 for why product
  prototypes themselves must stay light).
- `.deck` / `.slide` / `.slide.active` — absolute-positioned slides,
  opacity-fade transition, one slide visible at a time.
- `.nav`, `.nav-btn`, `.dot`, `.dot.on`, `.counter` — floating bottom nav
  bar with prev/next, dot-per-slide, and a "N / total" counter.
- Keyboard nav script — arrow keys + click-through, reads/writes an
  `active` class and updates the dot state.

## Slide-content component inventory (reuse before inventing new ones)

| Component | Use for |
|---|---|
| `.section-divider`, `.section-divider__copy`, `.section-title`, `.section-inset` | Chapter opener — **big image left**, title right centered |
| `.toc-list`, `.toc-row` | Contents / TOC |
| `.metric-grid`, `.metric-block` | Billboard number blocks |
| `.chart-wrap` | Chart.js host |
| `.photo-quote` | Large photo + quote pair |
| `.word-stack` | Principles / values list |
| `.col-grid`, `.col` | 2- or 3-column ruled text |
| `.timeline-bars`, `.timeline-cards` | Phase bars / numbered roadmap |
| `.feature-grid`, `.feature-card` | “What's inside” pillars |
| `.manifesto` | Thesis / brand-statement slide |
| `.meta-row`, `.meta-item` | Small metadata strip — Who's slide (PM / Design / Status) |
| `.stat-row`, `.stat`, `.stat-num`, `.stat-lbl` | Big number callouts |
| `.data-table` (+ `.td-muted`, `.td-hi`, `.raci-letter`) | Comparisons, option tables, RACI ownership |
| `.badge-teal` / `-amber` / `-red` | Inline status tags |
| `.callout`, `.callout-amber` | Single emphasized takeaway |
| `.card-grid.g2/g3/g4`, `.card`, `.card.hi` | Side-by-side option/summary cards |
| `.scale-wrap` and friends | Rating/scale visualizations |
| `.q-list`, `.q-item`, `.q-num`, `.q-text` | Numbered open-questions list |
| `.agenda-row`, `.agenda-time`, `.agenda-title` | Workshop agenda slide |
| `.not-box` | "What we're not deciding" list |
| `.unlock-grid`, `.unlock-card` | Benefit/outcome tiles |
| `.flip-box` | Reframe / "instead, think of it as" callout |
| `.big-quote`, `.quote-src` | Large pull-quote slide |
| `.lens-stack`, `.lens-row`, `.lens-tag--pm/--design` | Multi-perspective (PM vs design) framing |
| `.quote-stack`, `.quote-card`, `.quote-person`, `.quote-avatar` | Evidence voices — **avatar + name + role required** (not bare bar/block quotes) |
| `.stat-pill` | Inline supporting stat next to a claim |
| `.outcome-grid`, `.outcome-card--neg/--warn/--brand` | Before/after or risk/opportunity outcome slides |
| `.pillar-grid`, `.pillar-card` | Strategy pillar breakdown |
| `.chain-bar` | Cause → effect narrative bar |
| `.mini-stats`, `.mini-stat` | Small inline stat pills |
| `.slide-split`, `.slide-split__copy` | Copy-left, visual-right layout (mockup goes on the right) |
| `.proto-frame-wrap`, `iframe.proto` | Live phone embed — size slot only (~400px), **no card frame**; PhoneShell is the chrome (`live-embed.md`) |
| `aside.notes` | Speaker script — hidden from audience; `S` opens presenter (`presenter-mode.md`) |
| `.proto-compare`, `.proto-phone-col`, `.proto-phone-placeholder` | Side-by-side v1 \| v2 phones on a **separate** compare slide |

If a template genuinely needs a slide shape none of these cover, add one
new component class in the deck's own `<style>` block, named consistently
with this inventory — don't reach for inline styles.

## Themes

The dark `:root` mirror above is the *default* skin, not the only one —
see `themes.md` for the light variant and what breaks if you copy a dark
deck's components onto it without checking.

## Rounded deck frame + shortcuts bar (shipped 2026-08-04)

Don't run the deck edge-to-edge in the browser viewport — wrap it in a
rounded card that floats on a neutral backdrop, with the nav pill and a
keyboard-shortcuts hint bar sitting below the frame, not overlapping it.
This is what `settings-ia-stakeholder-update.html` does now; copy this
structure wholesale, same as the rest of the chassis.

```html
<body>
<div class="stage">
  <div class="deck-frame" id="deck-frame">
    <div class="deck">
      <!-- .slide elements, each wrapping its content in .slide-inner (see below) -->
    </div>
  </div>
  <div class="nav">
    <!-- …dots / counter / arrows… -->
    <button class="theme-toggle" onclick="toggleTheme()" title="Toggle light/dark" aria-label="Toggle light/dark theme">◐</button>
    <button class="tools-toggle" id="tools-toggle" onclick="toggleTools()" title="Hide tools" aria-label="Toggle tools bar" aria-pressed="true">⌨</button>
  </div>
  <div class="shortcuts-bar">
    <span><kbd>←</kbd><kbd>→</kbd> Navigate</span>
    <span><kbd>T</kbd> Theme</span>
    <span><kbd>F</kbd> Font</span>
    <span><kbd>N</kbd> Transition</span>
    <span><kbd>A</kbd> All slides</span>
  </div>
</div>
</body>
```

```css
.stage{
  position:fixed;inset:0;background:#24262a; /* neutral "desk" — NOT a
    design token, stays constant across the deck's own light/dark toggle */
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;
}
.stage[data-tools="off"] .shortcuts-bar{display:none;}
.deck-frame{
  width:min(92vw,1400px);height:min(84vh,860px);
  border-radius:20px;overflow:hidden;position:relative;
  box-shadow:0 24px 64px rgba(0,0,0,.45),0 0 0 1px rgba(255,255,255,.08);
  background:var(--bg);
}
.deck{width:100%;height:100%;position:relative;}
.theme-toggle,.tools-toggle{
  background:none;border:none;color:var(--ink-3);cursor:pointer;font-size:16px;
  padding:0 6px;transition:color .15s,opacity .15s;line-height:1;
}
.theme-toggle:hover,.tools-toggle:hover{color:var(--ink);}
.tools-toggle[aria-pressed="false"]{opacity:.4;}
.shortcuts-bar{
  display:flex;align-items:center;gap:16px;
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
  border-radius:999px;padding:7px 18px;
  font-family:var(--font-mono);font-size:11px;letter-spacing:.04em;text-transform:uppercase;
  color:rgba(255,255,255,.45);
}
.shortcuts-bar kbd{
  background:rgba(255,255,255,.1);color:rgba(255,255,255,.85);
  border-radius:4px;padding:2px 6px;font-family:var(--font-mono);font-size:11px;margin-right:6px;
}
```

**Tools bar toggle (2026-08-04):** `⌨` sits next to `◐` in `.nav`. It
shows/hides `.shortcuts-bar` via `.stage[data-tools="off"]`, persists in
`localStorage` as `deck-tools` (`on`/`off`). Keyboard shortcuts still work
when the bar is hidden.

**`.nav` loses its own `position:fixed` — it's a flex child of `.stage`
now, not pinned to the viewport corner.** If you're upgrading an older
deck built before this section existed, delete `.nav`'s
`position:fixed;bottom:28px;left:50%;transform:translateX(-50%);` and let
`.stage`'s flex layout place it.

Only wire up the shortcuts that are actually implemented. `T` (theme) is
the cheapest — it's just `toggleTheme()` from `themes.md` bound to a
keydown handler. `F`/`N`/`A` are covered below; skip whichever ones a
given deck doesn't need rather than shipping a hint for a dead key.

## Picker menus (T/F/N open a menu, not a blind cycle)

Don't wire T/F/N to silently cycle to the next value — open an actual
picker overlay showing all options, current one ringed, click to select
and close. This is what the designer asked for after seeing a reference
tool do the same (2026-08-04) and it's a strictly better pattern than
cycling: discoverable, and one click gets you anywhere instead of N
presses.

```html
<!-- inside #deck-frame, as a sibling after .deck -->
<div class="picker-overlay" id="picker-overlay" onclick="if(event.target===this) closePicker()">
  <div class="picker-grid" id="picker-grid"></div>
</div>
```

```css
.picker-overlay{
  position:absolute;inset:0;z-index:200;background:rgba(0,0,0,.4);
  display:none;align-items:center;justify-content:center;backdrop-filter:blur(2px);
}
.picker-overlay.open{display:flex;}
.picker-grid{display:grid;grid-template-columns:repeat(4,minmax(120px,1fr));gap:10px;max-width:640px;padding:10px;}
.picker-item{
  background:rgba(255,255,255,.08);border:2px solid transparent;border-radius:10px;
  padding:14px 16px;color:#fff;font-weight:600;font-size:14px;cursor:pointer;
  display:flex;align-items:center;gap:8px;justify-content:center;
  transition:border-color .15s,background .15s;
}
.picker-item:hover{background:rgba(255,255,255,.16);}
.picker-item.selected{border-color:#fff;}
.picker-swatch{width:13px;height:13px;border-radius:50%;flex-shrink:0;border:1px solid rgba(255,255,255,.3);}
```

```js
// One config object per picker type: an apply fn, a current-value getter,
// and an options list. Add a new picker type by adding one entry here —
// don't hand-roll a fourth bespoke toggle function.
//
// IMPORTANT: "theme" here means ACCENT COLOR (per the design system's
// palette), NOT light/dark. Corrected 2026-08-04 after building it wrong
// once — see "Two separate axes" below before touching either of these.
const pickers = {
  theme: {
    apply: setAccent,
    current: () => document.documentElement.getAttribute('data-accent') || 'teal',
    options: [
      { value: 'teal', label: 'Teal', swatch: '#00a1cf' },
      { value: 'violet', label: 'Violet', swatch: '#731cd8' },
      { value: 'green', label: 'Green', swatch: '#00a34b' },
      { value: 'orange', label: 'Orange', swatch: '#ff9500' },
      { value: 'red', label: 'Red', swatch: '#ff244b' },
      { value: 'pink', label: 'Pink', swatch: '#bd4580' },
    ],
  },
  // font / transition follow the same shape — see the worked example.
};

function openPicker(type){
  const cfg = pickers[type];
  const grid = document.getElementById('picker-grid');
  const cur = cfg.current();
  grid.innerHTML = '';
  cfg.options.forEach(opt => {
    const el = document.createElement('div');
    el.className = 'picker-item' + (opt.value === cur ? ' selected' : '');
    if (opt.swatch){
      const sw = document.createElement('span');
      sw.className = 'picker-swatch'; sw.style.background = opt.swatch;
      el.appendChild(sw);
    }
    el.appendChild(document.createTextNode(opt.label));
    el.onclick = () => { cfg.apply(opt.value); closePicker(); };
    grid.appendChild(el);
  });
  document.getElementById('picker-overlay').classList.add('open');
}
function closePicker(){ document.getElementById('picker-overlay').classList.remove('open'); }
```

Bind `Escape` to close the picker (not the all-slides overview) when one
is open, and swallow other keys while a picker is open so `ArrowRight`/etc
don't fire behind it. `T`/`F`/`N` call `openPicker('theme'|'font'|'transition')`
instead of a toggle/cycle function directly.

**Two separate axes — don't conflate them.** There are two independent
color controls in this chassis, and they must stay independent:

1. **Dark/light mode** — the `◐` icon button inside `.nav` (not the
   shortcuts bar). Calls `toggleTheme()` directly, sets `[data-theme]`.
   **This is a direct toggle, not a picker** — there are only 2 states,
   a menu would be overkill, and the designer explicitly asked to leave
   this one alone (2026-08-04) after an earlier pass mistakenly routed
   it through `openPicker('theme')` too.
2. **Tools visibility** — the `⌨` icon next to `◐` in `.nav`. Shows/hides
   the shortcuts bar under the nav (`toggleTools()` / `data-tools`).
3. **Accent color** — the `T` shortcut / "Theme" label in the shortcuts
   bar. This is what opens the picker, and it's a *design-system palette*
   picker, not a light/dark picker: 6 options (Teal/Violet/Green/Orange/
   Red/Pink), each swatch a real `ds-primitive-*` hex from
   `context/design-system/tokens.css`, swapping only `--brand`/
   `--brand-hover`/`--brand-soft`/`--brand-soft-border`. Sets
   `[data-accent]`, composes with either dark or light mode since it
   never touches `--bg`/`--ink`.

**Background tint is derived from the accent, not invented separately
(2026-08-04).** The designer asked whether accent themes should also
tint the background, not just text/dot-nav — yes, but subtly, and only
via `color-mix()` on the *same* real brand hex already used for
`--brand`, never a hand-picked background color:

```css
/* Default :root AND :root[data-theme='light'] both set -base, not the
   painting property directly, so accent tint math works in either mode
   without duplicating rules per mode: */
:root{ --bg-base: #0c0d0e; --bg-2-base: #1d1f21; --bg: var(--bg-base); --bg-2: var(--bg-2-base); }
:root[data-theme='light']{ --bg-base: #ffffff; --bg-2-base: #f7f8f9; --bg: var(--bg-base); --bg-2: var(--bg-2-base); }

:root[data-accent='violet']{
  --brand: #731cd8; --brand-hover: #5c1ca5;
  --brand-soft: rgba(115,28,216,.12); --brand-soft-border: rgba(115,28,216,.28);
  --bg: color-mix(in srgb, #731cd8 6%, var(--bg-base));
  --bg-2: color-mix(in srgb, #731cd8 9%, var(--bg-2-base));
}
/* repeat per accent option — same 6%/9% mix ratios, same brand hex reused */
```

Give **every** accent option (including the default, Teal) its own
explicit rule and have `setAccent()` always `setAttribute` (never
`removeAttribute` for the "default" option) — otherwise the default
option silently skips the tint while every other option gets one, which
reads as a bug, not a deliberate "no tint" choice. Keep the mix ratio
subtle (6% for `--bg`, 9% for `--bg-2` worked well) — this should read as
"a hint of color," not a colored background.

**Hard rule — don't let the accent-color list grow into decorative
palettes.** A reference deck the designer found had named aesthetic
themes ("Tokyo Night", "Rose Pine", "Ghibli", "Sakura") that bundle
background + accent together as an invented aesthetic. Don't copy that
shape — every accent option here must trace to an actual
`context/design-system/tokens.css` primitive (see `themes.md` for the
full hex list), never a made-up color. The *font* picker has no such
constraint (typeface choice isn't a token-governed value here) — that's
why it's fine for font to have 6 options with no DS-traceability
requirement, while every accent option must cite its token source.

## Font picker — curated set, loaded via Google Fonts CDN

Same `--font-heading` mechanism as before, now with more values. Load the
non-system faces with one `<link>` in `<head>` (consistent with the
Chart.js CDN precedent below — single external request, no build step):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@600;700&family=Merriweather:wght@700&family=Rubik:wght@600;700&display=swap" rel="stylesheet">
```

```css
:root[data-font='serif']{ --font-heading: Georgia, 'Times New Roman', serif; }
:root[data-font='poppins']{ --font-heading: 'Poppins', var(--font); }
:root[data-font='inter']{ --font-heading: 'Inter', var(--font); }
:root[data-font='rubik']{ --font-heading: 'Rubik', var(--font); }
:root[data-font='merriweather']{ --font-heading: 'Merriweather', Georgia, serif; }
```

```js
function setFont(name){
  const root = document.documentElement;
  if (name === 'default') root.removeAttribute('data-font');
  else root.setAttribute('data-font', name);
}
```

Body text never uses `--font-heading` — only `h1`/`h2` do. If a deck
needs offline portability (see `live-embed.md` "When this doesn't
apply"), drop the Google Fonts `<link>` and cut the picker's option list
down to `Default`/`Serif` (both system-safe, no network needed).

## Slide transitions (3 modes, opened via the N picker)

Every slide's content must live in a `.slide-inner` wrapper (not
directly in `.slide`) — this is also what the all-slides overview grid
below scales down, so it's required infrastructure, not optional
tidiness:

```html
<div class="slide" data-idx="0">
  <span class="overview-num">01</span>
  <div class="slide-inner">
    <!-- all existing slide content goes here, unchanged -->
  </div>
</div>
```

```css
.slide{position:absolute;inset:0;overflow:hidden;opacity:0;pointer-events:none;
  transition:opacity .35s ease,transform .35s ease;}
.slide.active{opacity:1;pointer-events:all;}
.slide-inner{width:100%;height:100%;display:flex;flex-direction:column;
  justify-content:center;align-items:flex-start;padding:56px 72px;}

/* Default (no [data-transition] attr) = lift-in */
.slide{transform:translateY(8px);}
.slide.active{transform:translateY(0);}
.deck-frame[data-transition='slide'] .slide{transform:translateX(48px);}
.deck-frame[data-transition='slide'] .slide.active{transform:translateX(0);}
.deck-frame[data-transition='scale'] .slide{transform:scale(.96);}
.deck-frame[data-transition='scale'] .slide.active{transform:scale(1);}
```

```js
function setTransition(name){
  const frame = document.getElementById('deck-frame');
  if (name === 'fade') frame.removeAttribute('data-transition');
  else frame.setAttribute('data-transition', name);
}
```

Keep every mode subtle (≤48px shift, ~350ms) — this is a stakeholder deck,
not a motion showcase. `setTransition` is the `apply` fn the `transition`
entry in the `pickers` config object (above) calls — don't also keep a
`cycleTransition()` around once the picker exists, it's dead code.

## Entry animations (lean — 3 only)

Lean set. One accent anim per slide; fires when `.slide` becomes `.active`.

| Class | Use on |
|-------|--------|
| `anim-fade-up` | A headline, chart, table, or single hero block |
| `anim-rise-in` | Cover title, section-divider titles, manifesto |
| `anim-stagger-list` | Parent of cards / toc rows / metrics / links |

```css
:root{--anim-dur:.55s;--anim-ease:cubic-bezier(.4,0,.2,1)}
@keyframes kf-fade-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
@keyframes kf-rise{from{opacity:0;transform:translateY(28px) scale(.985)}to{opacity:1;transform:none}}
.anim-fade-up,.anim-rise-in{opacity:0}
.anim-stagger-list > *{opacity:0}
.slide.active .anim-fade-up{animation:kf-fade-up var(--anim-dur) var(--anim-ease) both}
.slide.active .anim-rise-in{animation:kf-rise .7s var(--anim-ease) both}
.slide.active .anim-stagger-list > *{animation:kf-fade-up .5s var(--anim-ease) both}
.slide.active .anim-stagger-list > *:nth-child(1){animation-delay:.04s}
.slide.active .anim-stagger-list > *:nth-child(2){animation-delay:.12s}
.slide.active .anim-stagger-list > *:nth-child(3){animation-delay:.2s}
.slide.active .anim-stagger-list > *:nth-child(4){animation-delay:.28s}
.slide.active .anim-stagger-list > *:nth-child(5){animation-delay:.36s}
.slide.active .anim-stagger-list > *:nth-child(6){animation-delay:.44s}
.slide.active .anim-stagger-list > *:nth-child(n+7){animation-delay:.52s}
.deck-frame.overview .anim-fade-up,
.deck-frame.overview .anim-rise-in,
.deck-frame.overview .anim-stagger-list > *{opacity:1!important;animation:none!important}
@media (prefers-reduced-motion:reduce){
  .anim-fade-up,.anim-rise-in,.anim-stagger-list > *{opacity:1!important;animation:none!important}
}
```

Hard rules: no glitch/neon/3D/canvas FX; always include reduced-motion;
disable anims in overview thumbnails.

## All-slides overview grid (A)

A real slide-sorter, not a list of titles — each thumbnail is the actual
slide, scaled down via CSS `transform`, not a re-rendered summary:

```css
.deck-frame.overview .deck{
  display:flex;flex-wrap:wrap;align-content:flex-start;gap:16px;
  padding:24px;overflow:auto;background:var(--bg-2);
}
.deck-frame.overview .slide{
  position:relative;opacity:1!important;transform:none!important;pointer-events:all;
  width:260px;height:162px;flex:0 0 auto;
  border-radius:10px;border:2px solid var(--line);cursor:pointer;
}
.deck-frame.overview .slide.active{border-color:var(--brand);}
.deck-frame.overview .slide-inner{
  width:1440px;height:900px;transform:scale(.1806);transform-origin:top left;
  pointer-events:none; /* REQUIRED, not optional — without this, a scaled-down
    iframe.proto (or any interactive element) is still the topmost hit-target
    at its screen position and silently eats the click before it reaches the
    .slide click-to-jump listener. Found live 2026-08-04: clicking a thumbnail
    with a live embed did nothing until this was added. */
}
.overview-num{position:absolute;top:6px;left:8px;font-family:var(--font-mono);
  font-size:11px;color:var(--ink-4);z-index:2;display:none;}
.deck-frame.overview .overview-num{display:block;}
```

```js
function toggleOverview(){ document.getElementById('deck-frame').classList.toggle('overview'); }
document.querySelectorAll('.slide').forEach(s => {
  s.addEventListener('click', () => {
    if (document.getElementById('deck-frame').classList.contains('overview')){
      show(Number(s.dataset.idx));
      toggleOverview();
    }
  });
});
```

The `260×162` thumbnail size and `.1806` scale factor are tuned to the
`1440×900` slide canvas this chassis assumes (`260/1440 ≈ .1806`,
`162/900 = .18` — close enough that the thumbnail doesn't visibly
letterbox). If a deck ever changes the base canvas size, recompute both.

## Live charts (Chart.js)

The CSS-only `.stat-row`/`.mini-stats`/`.data-table` primitives cover
most decks — reach for a real chart only when the data itself is the
point (a trend over time, a distribution, more than ~4 comparison
points). Load Chart.js from a CDN (`<script
src="https://cdn.jsdelivr.net/npm/chart.js"></script>`, one `<script>`
tag, no build step — consistent with this skill's "single portable HTML
file" constraint) and wrap the `<canvas>` in a token-styled card:

```html
<div class="chart-card">
  <canvas id="chart-1" height="220"></canvas>
</div>
<script>
new Chart(document.getElementById('chart-1'), {
  type: 'bar',
  data: {
    labels: ['…'],
    datasets: [{ data: [/* real numbers from findings.md/decisions.md only */],
      backgroundColor: 'var(--brand)' /* Chart.js needs a resolved color, not the CSS var literal — read it via getComputedStyle at render time, see below */
    }]
  },
  options: { plugins: { legend: { display: false } }, scales: { /* style axes with --ink-4/--line, not chart.js defaults */ } }
});
</script>
```

```css
.chart-card{
  background:var(--surface);border:1px solid var(--line);
  border-radius:var(--radius);padding:20px;margin-top:20px;
}
```

**Hard rules, same as everywhere else in this skill:**

- Chart.js reads colors as resolved strings, not CSS variable
  references — do `getComputedStyle(document.documentElement).getPropertyValue('--brand')`
  once at the top of the deck's script block rather than passing
  `'var(--brand)'` directly into a `Chart` config object.
- Every number plotted must trace to `findings.md`/`decisions.md`/the
  source PRD — same no-invention rule as any other slide. A chart makes
  fabricated precision *more* convincing, not less risky.
- This is a portable single-file deck loading one external `<script>`
  from a CDN — if the deck must work fully offline (see `live-embed.md`
  "When this doesn't apply"), skip Chart.js and use the CSS primitives
  instead; say so explicitly rather than silently shipping a broken
  chart with no network.
- Cover this in the Step 2.5 QA render-check same as any other slide —
  chart canvases are a common source of layout overflow (fixed
  `height` attribute vs. a `.chart-card` that's narrower than expected).
