---
name: presenter
description: "Picks how to show a project's built screens to someone, from who's looking and what the designer wants back, then writes the small config file beside the screens that turns them into that view: Variants (one screen, a control panel to switch states, platforms and options), Compare (2–4 live frames side by side, numbered, with the chosen one marked), Stage (the prototype alone for research, with a hidden facilitator drawer) or Ideas (an index of independent ideas, one live at a time, with notes). Triggers on: \"how should I show this\", \"present this to <PM / eng / leadership>\", \"let them play with the options\", \"put these side by side\", \"compare these directions live\", \"show the states for review\", \"let them flip through every state\", \"set the prototype up for a research session\", \"give me a participant view\", \"show the team every idea we had\". Uses the screens that already exist in `projects/<slug>/screens/` — never copies or redraws them."
---

# Presenter

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

A built screen can be shown in different ways, and the right one depends on
the room. A PM who has to pick a direction wants the options side by side.
An engineer who has to build every state wants to switch through them. This
skill asks who's looking and what you want back, picks the format, and
writes one config file. The page appears under **Present** in the project
sidebar.

**Invoke in Cursor:** "how should I show the wallet to the PM?", "let
engineering flip through every state", "put balance-first and payout-first
side by side".

Formats are pages in the harness, built on our own stack (`ds` components,
tokens, the project's real screens in `?embed=1` frames). One shared frame
system, many layouts — not one template per format.

---

## Quick Reference

| Category | When to use | Reference |
|----------|-------------|-----------|
| Format chooser + config shapes | Always | [formats.md](references/formats.md) |
| Frame + config types | Writing the config | `src/design-harness/presentation.ts` |
| Worked example | Writing the config | `projects/mobile-banking-dashboard/screens/WalletHome.{variants,compare,stage,ideas}.ts` |

---

## Scope boundary

| Skill | Job |
|-------|-----|
| **`presenter`** (this) | Pick a format for built screens; write its config |
| **`ui-agent`** | Builds the screens, the storyboard, and the static review board of mockups before build |
| **`deck-builder`** | Slides |
| **`case-study`** | The project story (`case-study.md`) |
| **`critique-prep`** | What to say in a crit room |

- **Fires on:** showing, presenting or comparing screens that already exist
  in `projects/<slug>/screens/`.
- **Does not fire on:** "make a deck" (`deck-builder`); "walk me through the
  screen" / storyboard (`ui-agent`); "mock up three directions" before
  anything is built (`ui-agent` review board); "prep me for critique"
  (`critique-prep`).
- **Research:** the test script, tasks and questions are
  `usability-test-guide`. Stage only sets up the prototype the participant
  sees. "Plan the test and set up the prototype" → §3 PLAN:
  `usability-test-guide` → `presenter` (Stage steps from the guide's tasks).
- **No screens yet** → say so; building them is `ui-agent`. A combined ask
  ("build three directions and set up a comparison") → §3 PLAN:
  `ui-agent` → `presenter`.

---

## Load before running

1. `references/formats.md` — the chooser, each format's config shape, and
   what a screen needs to opt in.
2. The task folder: `decisions.md` (what's chosen and rejected — every
   `chosen` mark and decided note cites it), `brief.md` (job stories for
   questions), `screens/` (what exists, and which props each screen takes).
3. `../ui-agent/SKILL.md` — only if a screen needs a new prop.

---

## Workflow

1. **Ask.** One `AskQuestion` (max 2 questions): who's looking, and what you
   want back. Skip what the ask already says ("let the PM pick" answers
   both).
2. **Pick.** Map the answers with the chooser in `formats.md`. Say the pick
   and why in one line. If it's a format that lives elsewhere (slides,
   storyboard, case study), hand off and stop.
3. **Check the screens.** Each frame is a screen file plus string props. If
   a variation isn't reachable through a prop yet (a state, a rejected
   layout), add an optional string prop with today's behavior as the
   default, under the `ui-agent` rules. Never copy a screen to make a
   variant. **Divergence:** each compared direction differs in
   interaction, layout, or motion, and is a direction you could defend
   shipping on its own. Accent, density, or copy alone is a tint of one
   direction — name that and ask for a real alternative before writing
   the config. Every direction still uses Foundations tokens and the
   motion craft bar.
4. **Write the config** beside the screens:
   `screens/<Name>.variants.ts` (export `variants`),
   `screens/<Name>.compare.ts` (`compare`), `screens/<Name>.stage.ts`
   (`stage`) or `screens/<Name>.ideas.ts` (`ideas`). Same seed data in every
   frame. Every `chosen` and every "Decided:" or "Status" note cites
   `decisions.md`; an open question says it's open. Stage steps are tasks
   in the participant's words, each tied to a `brief.md` job story.
5. **Check.** Open `#/playground/<slug>/<variants|compare|stage|ideas>/<name>`.
   Every frame renders, and no frame says "Screen not found". Run the
   typecheck.
6. **Hand over.** The link, the keys (Variants: R reset, P panel. Compare:
   ← → move, R first, P hide bar. Stage: `\` drawer, R reset while open, Esc
   close. Ideas: ← → move, R replay, P hide panels), and what you want them
   to answer.
7. **Log.** `MATCHED presenter` in `harness/logs/routing-log.md` and the
   task `log.md`.

---

## Never do this

- Copy, fork or redraw a screen to make a variant — add a prop
- Mark a frame `chosen` that `decisions.md` doesn't back
- Mix seed data across frames (different names or amounts make the
  comparison about the data, not the design)
- Put more than 4 frames in one comparison — split it
- Show three tints as if they were three directions
- Build a format page or theme per project — configs only; the pages are
  shared
- Copy code from outside template kits into the repo

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Compare used before anything is built | That's the `ui-agent` review board |
| Variants with one control | That's a Compare with two frames, or just the screen |
| A rejected option shown without saying so | Note: "Rejected in review — for comparison" with the `decisions.md` entry |
| Comparing iOS against a different state on Android | Change one thing per comparison |
| Stage step names that tell the participant what to tap | Name the goal ("Your last payout never arrived"); the drawer is for the facilitator only |
| Ideas used for options that compete on one question | That's a Compare |