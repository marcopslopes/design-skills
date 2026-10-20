# Animation vocabulary

Reverse-lookup: vague feel → exact term, so designers (and agents) ask for
the right thing. Quote terms from this list; don't invent parallel names.

Curated for the company product UI; marketing-only flourishes omitted.

When the designer says "what's it called when…" or describes a motion
without a name → Mode 5 in `SKILL.md`. Keep answers tight: term first,
one-line definition, alternates only when close.

---

## Entrances & exits

- **Fade in / Fade out** — appear/disappear by opacity.
- **Slide in** — enter from off-screen (edge named).
- **Scale in** — grow from slightly smaller + usually fade (never from
  `scale(0)` — see `motion-standards.md`).
- **Pop in** — slight overshoot into place — **use sparingly**; the company
  prefers calm scale-in without bounce.
- **Reveal** — uncover via clip-path / mask.
- **Enter / Exit** — the pair of animations for add/remove from the tree.

## Sequencing

- **Stagger** — cascade with short delay between items.
- **Orchestration** — several motions timed as one story.
- **Delay / Duration** — wait before start / how long it runs.
- **Stepped animation** — discrete steps (e.g. countdown), not smooth tween.

## Transforms

- **Translate / Scale / Rotate** — move / resize / spin.
- **Transform origin** — anchor for scale/rotate.
- **Origin-aware animation** — grows from its trigger (popover from the
  button), not from its own center.

## State transitions

- **Crossfade** — one fades out as another fades in, same spot.
- **Morph** — one shape becomes another.
- **Shared element transition** — element travels/transforms between
  positions (thumbnail → detail).
- **Layout animation** — size/position change animates instead of snaps.
- **Accordion / Collapse** — height + content show/hide.
- **Direction-aware transition** — forward vs back slide opposite ways.

## Feedback & gesture

- **Press / Tap feedback** — subtle scale-down on press.
- **Hold to confirm** — fill progresses while held (destructive).
- **Swipe to dismiss** — drag off-screen to close.
- **Rubber-banding** — resist + snap-back past a boundary.
- **Shake / Wiggle** — short jitter for error/reject — use rarely.
- **Skeleton / Shimmer** — loading placeholder with moving sheen.
- **Number ticker** — digits roll/count to a value (pair with tabular nums).

## Easing & springs (names)

- **Ease-out** — starts fast, ends slow — default for UI response.
- **Ease-in** — starts slow — usually **wrong** for UI enter.
- **Ease-in-out** — for on-screen A→B movement.
- **Linear** — constant speed — spinners/marquees only.
- **Spring** — physics (stiffness/damping/mass) instead of fixed duration.
- **Bounce** — overshoot settle — **anti-default** for the company product UI.
- **Interruptible animation** — can retarget mid-flight (transitions/
  springs, not one-shot keyframes on rapid UI).

## Performance / a11y terms

- **Jank / Dropped frame** — visible stutter.
- **Compositing** — GPU moves transform/opacity without layout.
- **Reduced motion** — honor `prefers-reduced-motion` (gentler, not zero).

## Principles (useful labels)

- **Purposeful animation** — orients, feedbacks, or relates — not decoration.
- **Frequency of use** — more often → shorter/subtler or none.
- **Spatial consistency** — keep identity/path so users track where things went.
- **Perceived performance** — right motion can make waits feel shorter.
