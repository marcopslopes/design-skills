---
name: mobile-shell
description: >-
  Wraps every mobile/phone-frame Design Harness prototype in the shared PhoneShell
  component (hardware bezel, notch, iOS status bar, floating pill tab bar,
  home indicator, 16px screen padding) instead of one-off chrome per file.
  Triggers on: "build a mobile screen", "phone prototype", "does this match
  the navigation-profile frame", "why do the prototypes look different",
  "align the phone frames". Rides inside a `ui-agent` chain when the target
  is a phone-frame screen; also runnable standalone as an audit over
  `src/design-harness/pages/` to flag prototypes still using bespoke chrome. Does
  not decide screen content, layout, or copy — see ui-agent.
---

# Mobile Shell Agent

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Every mobile (phone-frame) prototype in this repo renders through the shared **`PhoneShell`** component at `src/design-harness/shared/PhoneShell.tsx` — never a bespoke device frame, status bar, or tab bar built per file. This is the standard set 2026-07-07 after an audit found 10+ different hand-rolled chrome implementations across prototypes (`ref-wallet-proto__chrome`, `cal-proto`, `referral-proto__chrome`, `waitlist-proto`, etc.) that had all drifted from the realistic frame in `NavigationProfilePrototypePage.tsx`.

**Invoke in Cursor:** `Use the mobile shell skill` — also triggers automatically whenever `ui-agent` is building a phone-frame screen, or standalone as a consistency audit over existing prototypes.

## Scope boundary

- Handles **device chrome only**: bezel, notch, iOS status bar, bottom tab bar, home indicator, 16px screen padding, and scroll-container behavior inside the frame.
- Does **not** decide screen content, layout, or copy — that's `ui-agent`.
- Does **not** replace `audit` — this only checks phone-frame consistency, not full design-system/a11y/copy compliance.
- Does **not** decide interaction behavior (gestures, sheet detents, hover, focus order) — see "Interaction pattern layer" below for where that lives.

---

## Hard rule — hide scrollbars inside the phone frame

`.phone-shell__body` must scroll (`overflow-y: auto`) **without a visible scrollbar**.

Desktop scrollbars reserve ~8–15px and **change layout** inside the fixed 375px frame (content reflows, edges look off). Real phones do not show that gutter.

Required on `.phone-shell__body` (in `src/design-harness/styles/phone-shell.css`):

- `scrollbar-width: none` (Firefox)
- `-ms-overflow-style: none` (legacy Edge)
- `::-webkit-scrollbar { display: none; width: 0; height: 0; }` (Chromium / Safari)

**Forbidden:** leaving the default OS scrollbar visible on `.phone-shell__body`, or adding `scrollbar-gutter: stable` on the shell body. Nested scroll regions inside a screen (e.g. horizontal chip rows) may keep thin scrollbars only when intentional for that control — never for the shell body.

---

## Interaction pattern layer (behavior, not chrome — companion docs)

This skill's scope stays chrome-only, as above. The behavior layer underneath it — how things gesture, present,
and respond, not how they look — lives in curated reference docs `ui-agent` applies once a target platform is
known:

- `references/ios-interaction-patterns.md` — push vs. modal present, swipe-to-reveal
  list actions, sheet detents, segmented controls vs. tabs, icon weight vs. the `Icon` primitive.
- `references/android-interaction-patterns.md` — bottom sheets vs. dialogs, FAB
  placement/behavior, ripple/elevation, drawer vs. bottom nav, Android list actions.
- Desktop/web uses `DesktopShell` (`src/design-harness/shared/DesktopShell.tsx`) — browser window + the same pro-app
  tabs as the web nav. Its behavior doc lives at `references/from-ui-agent/desktop-web-patterns.md`.

These docs never override `harness/ORCHESTRATOR.md` §7's tokens/component/voice rules — they sit strictly under
them, same as this skill's own chrome does.

---

## The component

```tsx
import { PhoneShell, type PhoneTab } from '../shared/PhoneShell'
import { Icon } from '../../../context/design-system/ds'
import { IconCalendar, IconGift } from '@tabler/icons-react'

const tabs: PhoneTab[] = [
  { id: 'a', label: 'Tab A', icon: <Icon icon={IconCalendar} size="md" />, active: tab === 'a', onClick: () => setTab('a') },
  { id: 'b', label: 'Tab B', icon: <Icon icon={IconGift} size="md" />, active: tab === 'b', onClick: () => setTab('b') },
]

<PhoneShell tabs={tabs} floating={fabMarkup} overlays={toastOrModalMarkup}>
  <div className="phone-shell__screen">
    {/* screen content — TopBar, lists, cards, etc. */}
  </div>
</PhoneShell>
```

| Prop | Required | Notes |
|------|----------|-------|
| `children` | yes | Scrollable screen content. Wrap the content root in `<div className="phone-shell__screen">` for the standard 16px (`--spacing-05`) side padding + `--spacing-05` gap stack. |
| `tabs` | no | Omit entirely for single-screen flows (modals, onboarding, claim flows) that have no bottom nav — `PhoneShell` just won't render a tab bar. |
| `tabBarLabel` | no | `aria-label` on the `<nav>`, defaults to `"Main"`. |
| `time` | no | Status bar clock text, defaults to `"12:30"` (repo convention). |
| `floating` | no | FABs anchored above the tab bar (e.g. "add appointment"). |
| `overlays` | no | Toasts / modals / sheets rendered above the screen content, inside the device frame. |
| `notch` | no | Defaults `true`. Set `false` only for frames that intentionally have no notch. |

## Storyboard (optional, per screen)

To walk a reviewer through a phone screen step by step, add `screens/**/<Name>.storyboard.ts` next to the screen,
exporting `storyboard` (types in `src/design-harness/storyboard.ts`). Design Harness picks it up automatically: it appears
beside the screen in the project sidebar and opens at `#/playground/<slug>/storyboard/<name>?step=<id>` — steps on
the left, the live screen on the right, a spotlight on each step's target. Point targets at the screen's own
classes or aria-labels. Write each `why` from the project's sources; if there are none, set `evidence` to say it's
an assumption. Never invent numbers. Example: `projects/clients-list-redesign/screens/mobile/ClientsListMobile.storyboard.ts`.

Two optional extras (example: `projects/mobile-banking-dashboard/screens/WalletHome.storyboard.ts`):
- `notes` on a step: one tap deeper, behind "Notes". Review findings, open questions, research quotes, each from
  `findings.md` or `decisions.md`. Paragraphs split by a blank line; `- ` lines are bullets.
- `starts`: a "Start from" list on the first step that replays the tour with the screen seeded by string props
  (`{ id: 'paused', label: 'Payouts paused', props: { status: 'paused' } }`). Keep `{ id: null }` first as the
  default. Use it when a state changes what the steps mean. A step whose target the start hides says so on the
  page, which is a finding, not a bug.

`ui-agent` builds one after a new phone screen (its Step 6.5) — designer decision 2026-10-15, was an offer since
2026-10-10. When Design Harness → Settings turns "Build a storyboard" off (`behaviour.storyboardOffer`), it asks
first instead. Outside that step, only add a storyboard on a direct ask.

CSS lives in `src/design-harness/styles/phone-shell.css` — classes are prefixed `.phone-shell__*`. Never add new one-off device-frame CSS in a page-specific block; extend `PhoneShell` / `phone-shell.css` instead if a new chrome need arises (e.g. Android frame, tablet frame).

---

## When to use it

- **Any new phone-frame prototype** — always start from `PhoneShell`, never copy an existing prototype's inline device markup.
- **Light mode only** — `PhoneShell` applies `.design-harness-proto-surface` on the screen frame so product UI always uses Foundations/DS light tokens, even when Design Harness chrome is dark. Do not add dark-theme variants inside the device screen.
- **Any existing phone-frame prototype not yet migrated** — flag it (see audit checklist below) and migrate before/alongside other changes to that file.
- **Not for**: desktop pages, email template previews (`ReferralEmailTemplatePrototypePage`, `ReferralEmailLinkLivePrototypePage`, `ReferralEmailStatsPrototypePage` are viewport-width email renders, not phone frames), Design Harness component docs pages.

## Standalone audit checklist

Run this over `src/design-harness/pages/*.tsx` when asked "do the prototypes all match" or similar:

1. Search for phone-frame prototypes not importing `PhoneShell` from `../shared/PhoneShell` — grep for `__chrome`, `-proto"` device wrapper classNames, or literal `12:30` / status-bar markup outside `PhoneShell.tsx`.
2. For each hit, confirm: bezel + notch present, `IosStatusBar`-equivalent uses the shared `Icon` primitive (not hand-drawn SVG bars), bottom nav (if any) is the floating pill style, and content padding matches `--spacing-05` (16px).
3. Confirm scrolling shells hide the scrollbar (`.phone-shell__body` rules above) — no visible gutter stealing width.
4. Report drifted files as a flat list with the specific chrome class each one currently uses, so migration can be scoped and parallelized (each file's migration is independent — no shared state between prototypes).

## Related files

| File | Role |
|------|------|
| `src/design-harness/shared/PhoneShell.tsx` | The component: `PhoneShell`, `PhoneStatusBar`, `PhoneTabBar` |
| `src/design-harness/styles/phone-shell.css` | `.phone-shell__*` rules (incl. hidden body scrollbar) |
| `src/design-harness/pages/NavigationProfilePrototypePage.tsx` | Reference consumer — 4-tab pro app flow, FABs, toast, modal overlay, all via `PhoneShell` |
| `../ui-agent/SKILL.md` | Builds screen content; chains into this skill for phone-frame screens; applies the interaction pattern docs below |
| `references/ios-interaction-patterns.md` | iOS behavior layer — push/modal, swipe actions, sheet detents, segmented controls, icon weight |
| `references/android-interaction-patterns.md` | Android behavior layer — bottom sheets/dialogs, FAB, ripple/elevation, drawer/bottom nav |
| `references/from-ui-agent/desktop-web-patterns.md` | Desktop/web behavior layer — content width, hover, keyboard nav, native form controls |
| `../icon-usage/SKILL.md` | `PhoneShell`'s status bar and tab icons source from here |
| `harness/ORCHESTRATOR.md` | The routing table that triggers this skill |
