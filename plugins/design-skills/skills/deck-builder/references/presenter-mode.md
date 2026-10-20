# Presenter mode

Runtime file:
`assets/deck-presenter.js` (mirrored to
`public/deck-builder/deck-presenter.js` for local preview) plus
`presenter.html` (same mirror path).

## Status (2026-08-04)

**Off by default** on the stakeholder deck. Public
`/deck-builder/presenter.html` **redirects back to the deck** so you
can't get stuck in presenter UI. Runtime + notes authoring docs below
remain for when we re-enable.

## Audience vs presenter

| Window | Role |
|--------|------|
| Original tab | **Audience** — full deck chrome, no notes visible |
| Pop-up (`S`) | **Presenter** — Current / Next previews, speaker script, timer |

**Do not** open `about:blank` and `document.write` — Chrome often leaves a
blank NTP. `S` writes a boot payload to `localStorage`, then opens
same-origin `/deck-builder/presenter.html`.

Sync via `BroadcastChannel`. Previews load the same HTML with
`?preview=N` (chrome hidden, one slide only). Slide changes use
`postMessage({type:'preview-goto'})` — no iframe reload.

## Authoring

1. Include the script **after** the deck’s own `show()` / nav script:
   ```html
   <script src="/deck-builder/deck-presenter.js"></script>
   ```
2. Hide notes from the audience:
   ```css
   aside.notes, .notes, .speaker-notes { display: none !important; }
   ```
3. On every `.slide`, add:
   - `data-title="…"` (overview / presenter meta)
   - `<aside class="notes">…</aside>` with **spoken** prompts

### Speaker script rules

1. **Prompt signals, not a script to read** — bold keywords; transitions in their own `<p>`
2. **~150–300 words / 2–3 min per slide** for long talks; shorter prompts OK for stakeholder skims
3. **Speak it** — “so / but / next”, not “therefore / furthermore”
4. **Never** put presenter-only captions on the visible slide

## Keys

| Key | Where | Action |
|-----|--------|--------|
| `S` | Audience | Open presenter window (allow pop-ups) |
| `← →` | Either | Navigate (synced) |
| `R` | Presenter | Reset timer |
| `Esc` | Presenter | Close window |
| `#/N` | Audience URL | Deep-link to slide N |

## Demo

`projects/settings-ia/artifacts/decks/settings-ia-stakeholder-update.html` —
speaker notes remain on slides for later; **presenter UI is off by
default** on that deck (no `S` hint, script not loaded). Re-enable by
adding the script + shortcuts span when needed.
