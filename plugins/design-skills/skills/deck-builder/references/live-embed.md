# Live prototype embedding

**Goal:** a slide shows a real, clickable Design Harness prototype — not a
hand-copied lookalike pasted into an `<iframe srcdoc="...">`. The
lookalike-in-`srcdoc` pattern is what `navigation_ia_case_study_v10.html`
and its siblings actually did (see e.g. `id="nav-proto-v1"`,
`id="m1-proto"` in that file) — it works, but every embedded mockup is a
duplicate that can silently drift from `src/design-harness/pages/*PrototypePage.tsx`
the moment that file changes. This reference exists to replace that
pattern going forward, not to describe it as the target.

## Status: shipped (2026-08-04, first `deck-builder` test build)

`?embed=1` chromeless mode is implemented in `src/design-harness/DesignHarnessApp.tsx`
+ `src/design-harness/routes.ts`. Skip straight to "Embedding, once the mode
exists" below for how to use it.

**Implementation notes, for the next person touching this:**

1. This is a **hash-router app** — the flag lives inside the hash
   fragment (`#/playground/x?embed=1`), never in
   `window.location.search`. Read it via
   `getDesignHarnessHashQuery()` (`routes.ts`), not a plain
   `URLSearchParams(window.location.search)` call. A first attempt at
   this used `location.search` and silently never worked — the query was
   just discarded by the browser (a hash-only difference between two
   URLs doesn't even trigger a real navigation in most contexts, which is
   what made this hard to catch visually — see point 3).
2. `routes.ts`'s `normalizeHashKey` **must** strip the query string
   before matching the route table (`raw.split('?')[0]`), or
   `#/playground/x?embed=1` fails every route match and falls back to
   `overview`.
3. `isEmbed` must be real React state (`useState`), explicitly re-synced
   inside the `hashchange` effect alongside `route` — **not** a plain
   `readIsEmbed()` call at the top of the component body. Reasoning: the
   route string (after point 2's fix) is identical whether or not
   `?embed=1` is present, so React sees no change in `route` and bails
   out of re-rendering when only the embed flag flips — a plain
   per-render read would freeze at whatever was true on first mount.
4. When testing this manually: navigating between two URLs that differ
   **only inside the `#fragment`** does not force a real page reload in
   many browsers/automation contexts (it's treated as an in-page
   fragment jump, keeping whatever JS is already running). Always test
   in a genuinely fresh tab/navigation, not by editing the hash of an
   already-loaded tab.
5. `DesignHarnessApp.tsx` skips rendering the mobile bar header and the
   sidebar `<aside>` entirely when `isEmbed`; `chrome.css` adds
   `.design-harness-ds[data-embed='true']` rules zeroing the site padding/gap
   and the shell-main panel's border/shadow/background so nothing but
   the route's own content remains.

**Known limitation, fixed for Calendar (2026-08-04):** `?embed=1` strips
**Design Harness's own app chrome**. Individual prototype pages that wrap the
phone in a case-study write-up must *also* respect embed and hide those
panels — otherwise the iframe still shows hero / legend / inventory.
`CalendarSettingsPrototypePage` now does this (`cal-settings-proto--embed`
→ phone only). **Any new deck-embeddable prototype page should do the
same** — check `getDesignHarnessHashQuery().get('embed') === '1'` and render
the `PhoneShell` alone.

`NavigationProfilePrototypePage` is already phone-only (no case-study
chrome) — `#/playground/navigation-profile?embed=1` is enough for decks.

**PhoneShell fit in deck iframes (fixed 2026-08-04):** `usePhoneFitScale`
must not subtract playground chrome when `data-embed="true"`, and must
measure the device with `max-width` cleared — otherwise the phone
collapses to ~90px inside a gray body canvas and looks “broken”.

**Default deck pattern — phone only (one phone per walkthrough slide):**
narrow `.proto-frame-wrap` (~400px) as a **size slot only** — no card
border, padding, or fill. `PhoneShell` inside the iframe is the only
device frame (live miss 2026-08-04: a deck “phone card” around the iframe
double-framed the prototype and looked broken). The old scroll-to-phone
trick remains as a fallback for pages that have not added `--embed` yet:

```html
<iframe class="proto" src="/#/playground/calendar-settings?embed=1"
  onload="scrollProtoFrameToPhone(this)" loading="lazy"></iframe>
```

**Comparison pattern — separate slide, two phones side by side** (never
cram v1+v2 onto the walkthrough slide):

```html
<div class="proto-compare">
  <div class="proto-phone-col">
    <div class="proto-phone-label">Proto <em>v1</em></div>
    <div class="proto-frame-wrap proto-frame-wrap--compare">
      <iframe class="proto proto--compare" src="/#/playground/older-route?embed=1" …></iframe>
    </div>
  </div>
  <div class="proto-phone-col">
    <div class="proto-phone-label">Proto <em>v2</em></div>
    <div class="proto-frame-wrap proto-frame-wrap--compare">
      <iframe class="proto proto--compare" src="/#/playground/newer-route?embed=1" …></iframe>
    </div>
  </div>
</div>
```

If only one live route exists, leave the other column as
`.proto-phone-placeholder` rather than duplicating the same phone —
don't invent a second prototype.

In the meantime, for pages that still show write-up around the phone,
use the **scroll-to-phone trick** instead of just sizing the `iframe`
generously (an earlier attempt at that alone made things worse — see
below): give the `iframe` an `onload` handler that polls for
the phone element inside the embedded document and scrolls it into view,
since the target is a client-rendered SPA and the phone isn't in the DOM
yet when the iframe's own `load` event fires:

```html
<iframe class="proto" src="/#/playground/calendar-settings?embed=1"
  onload="scrollProtoFrameToPhone(this)" loading="lazy"></iframe>
<script>
function scrollProtoFrameToPhone(iframe){
  let tries = 0;
  const tick = () => {
    tries++;
    try{
      const doc = iframe.contentWindow.document;
      const target = doc.querySelector('.phone-shell__fit') || doc.querySelector('.phone-shell__device');
      if (target){ target.scrollIntoView({ block: 'start' }); iframe.contentWindow.scrollBy(0, -24); return; }
    }catch(e){ return; }
    if (tries < 20) setTimeout(tick, 150);
  };
  tick();
}
</script>
```

**Don't just make the `iframe` taller to compensate.** The deck's `.slide`
centers content vertically with `body{overflow:hidden}` — a too-tall
`iframe` pushes the slide's own heading/caption off both the top and
bottom of the viewport instead of showing more prototype. Keep the
`iframe` around its normal budget (`min(68vh,640px)` for a single phone,
narrower height for compare) and prefer a true phone-only `--embed`
render over scroll hacks.

## Embedding, once the mode exists

```html
<div class="proto-frame-wrap">
  <iframe
    class="proto"
    src="/#/playground/navigation-profile?embed=1"
    title="Navigation profile — live prototype"
    loading="lazy"
  ></iframe>
</div>
```

Reuse transparent `.proto-frame-wrap` / `iframe.proto` sizing from
`base-skin.md` / the stakeholder deck — **no decorative card around the
iframe**. Only the `src` points at the live route.

## When this doesn't apply

- **The prototype doesn't exist yet.** Don't fake one — build it first
  (`ui-agent` chain), then the deck.
- **The deck must be fully portable/offline** (emailed as a single file
  with no server behind it). This was explicitly ruled out as the default
  for this skill — live-route embedding was chosen over a portable
  snapshot specifically because zero-drift mattered more than offline
  portability. If a specific deck genuinely needs to work with no server,
  say so explicitly and fall back to a static screenshot of the prototype
  (not a hand-authored markup copy) rather than silently reintroducing the
  drift problem this skill exists to avoid.
