# Micro-edit lane

Added 2026-08-12 from a cost-lens `harness-audit` (see
`harness/logs/routing-log.md` and the retrospective in that chat). Purpose:
stop pricing a one-line spacing fix like a small build, without reopening
the settings-ia freestyle-bypass failure mode that made `audit` mandatory
on every iterating chain in the first place.

## What still never changes

- No freestyle `.tsx`/CSS edits. `ui-agent` (+ `design-system`, +
  `mobile-shell`/`icon-usage` as needed) still loads and still owns the
  edit. This lane only changes whether `audit` fires immediately after.
- No skipping the plan/log step for multi-skill chains.
- No silent deferral — the deferral itself is a logged decision
  (`log.md` + `harness/logs/routing-log.md`), same as a fallback or a
  match.

## What qualifies as a micro-edit

All of:
- Touches an existing component/screen already in the repo (not a new
  screen, new state, or new component).
- Single-property or narrow-scope change: spacing, one color/typography
  token swap, copy string, a single style value, toggling an existing
  variant/prop.
- No new interaction, no new a11y surface (no new focus target, no new
  live region, no new keyboard path).

Anything ambiguous (e.g. "add a badge" could be a token-only change or a
new component) defaults to the **full** chain — `audit` included — same
as before this lane existed. When in doubt, don't defer.

## What happens instead of firing `audit`

1. `ui-agent` + `design-system` load and make the edit as normal.
2. Skip the `audit` step. State plainly that `audit` was deferred and why
   (e.g. "single spacing tweak — deferring `audit`; say the word when
   you're ready to share and I'll run it").
3. Log the deferral: `log.md` (task-scoped) + `harness/logs/routing-log.md`
   line, e.g. `MATCHED micro-edit lane (audit deferred) — <1-line desc>`.

## Harness setting: audit only when sharing

When `behaviour.audit` is `on-share` in `harness.config.local.json` (Design Harness →
Settings), full builds defer `audit` the same way micro-edits do. The share and
stacked-edit triggers below still fire it. See
`references/shared/harness-settings.md`.

## When `audit` fires anyway

- The designer says anything share-shaped: "share", "ready", "before I
  send this", "push this", "let's ship it."
- **3 or more** deferred micro-edits have stacked up on the same file in
  one session — treat the 3rd as the trigger, run `audit` once across all
  three instead of one at a time (cheaper than three separate audits, and
  catches interaction effects between the stacked tweaks).
- The designer explicitly asks for `audit` at any point.

## Why this doesn't reopen the settings-ia bypass

The original failure mode (`harness/logs/routing-coverage-audit-2026-07-24.md`
G3) was **skipping `ui-agent`/`design-system` entirely** on "just a quick
fix" asks — freestyle chat edits with no skill load, no token check, no
record. This lane keeps every one of those steps; it only removes the
`audit` re-scan on file(s) that haven't changed shape, deferring it to a
single batched pass before anything actually ships. If a future audit
finds `audit`-deferred work shipping without ever running `audit`, that's
a bug in this lane (fix: tighten the share-language trigger list), not a
reason to remove it.
