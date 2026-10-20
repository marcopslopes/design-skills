# Presentation formats

Every format reuses the project's real screens through `?embed=1` frames. A
frame is a screen file plus string props; props reach the screen through
its URL, so a screen opts in by taking optional string props with today's
defaults. Types: `src/design-harness/presentation.ts`.

## Chooser

| Who's looking | What you want back | Format | Lives in |
|---------------|--------------------|--------|----------|
| PM, lead, stakeholder | A pick between directions | **Compare** | `presenter` |
| Engineer, QA, another designer | "Did we cover every state?" | **Variants** | `presenter` |
| Anyone exploring a decision space | "Which combination works?" | **Variants** | `presenter` |
| A room, live | Reactions to the flow, step by step | **Storyboard** | `ui-agent` |
| Leadership, a review meeting | Buy-in on the story | **Slides** | `deck-builder` (renders `case-study.md`) |
| Anyone reading later | The whole project story | **Case study** | `case-study` |
| Research participants | Task completion, unprompted | **Stage** | `presenter` |
| A team scanning many ideas | Which ideas to pursue | **Ideas** | `presenter` |

Mockups not built yet, choosing which to build → the `ui-agent` review
board, not Compare.

## Variants

One screen with a control panel. Each control is a segmented choice; the
current values live in the URL, so a link reproduces the exact combination.

```ts
export const variants: Variants = {
  title: '<Screen> · variants',
  subtitle: '<one line>',
  sections: [
    { label: 'Platform', controls: [{ id: 'platform', label: 'Platform', options: [...], default: 'ios', note: '...' }] },
    { label: 'Content', controls: [{ id: 'status', label: 'State', options: [...], default: 'active' }] },
  ],
  frame: (v) => ({ screen: SCREENS[v.platform], props: { status: v.status } }),
  note: (v) => (/* combination that needs a word */ undefined),
}
```

- `default` is the current direction. A control whose options include a
  rejected one says so in its `note`, citing `decisions.md`.
- Use `note(values)` for combinations that do nothing or need context.
- 2–4 controls. More than that and the panel stops being scannable.

## Compare

Several comparisons, one question each, 2–4 frames per comparison.

```ts
export const compare: Compare = {
  title: '<Screen> · compared',
  comparisons: [
    {
      id: 'lead',
      title: 'What leads the screen',
      question: 'Should the home open on the balance or on the next payout?',
      frames: [
        { label: 'Balance first', frame: { screen, props: { lead: 'balance' } }, note: '...' },
        { label: 'Next payout first', frame: { screen }, chosen: true, note: '...' },
      ],
      source: 'decisions.md — <date>, <entry>',
    },
  ],
}
```

- Change one thing per comparison.
- `question` is what you want the viewer to answer, not a description.
- `chosen` only when `decisions.md` records it; while it's open, leave it
  off and say so in the question.
- Frames show numbers, never labels, so the text doesn't bias a first look.
  `label`, `note`, `chosen` and `source` appear behind **Notes** in the bar
  (and `label` names the frame for screen readers).

## Stage

The prototype alone, for research. Nothing on screen tells the participant
what to do, and nothing goes in the URL. The facilitator presses `\` to open
a hidden drawer: jump to a step, reset it (R, only while the drawer is
open), switch scenario, go fullscreen. Esc closes it.

```ts
export const stage: Stage = {
  title: '<Screen> · research session',   // drawer only
  mode: 'linear',                          // or 'concepts' (any order, A/B/C, ticks when seen)
  items: [
    { id: 'how-much', name: 'How much is coming, and when?', note: 'Job story 2. Watch for …', frame: { screen } },
    { id: 'paused', name: 'Payouts have stopped. What now?', frame: { screen, props: { status: 'paused' } } },
  ],
  scenarios: [
    { id: 'ios', label: 'iOS' },
    { id: 'android', label: 'Android', screen: 'screens/<Name>AndroidPage.tsx' },
  ],
}
```

- `name` and `note` are for the facilitator. Write the task as you'd say it
  aloud; `note` says what to watch for and which job story it tests.
- A scenario overrides each item's screen and merges its props.
- Keys pressed inside the prototype still reach the drawer, so `\` works
  after the participant has tapped in.

## Ideas

An index of independent ideas on the left, one prototype at a time in the
middle, its notes on the right. ← → move and wrap, R replays, P hides the
panels; the current idea is in the link.

```ts
export const ideas: Ideas = {
  title: '<Screen> · ideas',
  items: [
    {
      id: 'balance-first',
      title: 'Balance first, then the payout',
      group: 'What leads the screen',
      frame: { screen, props: { lead: 'balance' } },
      prompt: 'Does an Available balance on top work for a provider?',
      notes: [
        { title: 'The idea', body: '…' },
        { title: 'Status', body: 'Rejected. … Source: decisions.md <date>, <entry>.' },
      ],
    },
  ],
}
```

- Items are unordered and independent; use `group` for themes or HMWs.
- A `Status` note cites `decisions.md` when the idea was decided.

## Frame viewports

`viewport: 'phone'` (default) draws the screen at phone size and scales it
to fit; `'desktop'` draws it at desktop size. Phone screens should use the
project's `PhoneShell`.
