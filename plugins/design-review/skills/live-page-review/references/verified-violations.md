# Verified violations (runtime facts)

Run **after** capture, **before** handing off to a critique skill. Binary
PASS / FAIL / N/A from the accessibility tree + a skim of `dom.html`.
These are ground-truth facts agents must not contradict. They are not
craft opinions and they are not a `/100` score.

Skip this whole file when capture was skipped (no DOM / no tree).

## Checks

| # | Check | FAIL when |
|---|--------|-----------|
| 1 | Images without dimensions | Informational `<img>` missing width or height (layout shift). Skip decorative (`alt=""`, `aria-hidden`). |
| 2 | Images without alt | Informational `<img>` with no `alt` at all. `alt=""` on decorative is PASS. |
| 3 | Inputs without labels | Input/select/textarea with no `<label>`, `aria-label`, or `aria-labelledby` (confirm in the tree). |
| 4 | Icon buttons without name | Button that is only an image/SVG, empty accessible name in the tree. |
| 5 | Div/span as control | Clickable `div`/`span` (`role=button`/`link` or cursor:pointer) instead of `button`/`a`. |
| 6 | Wrong input type | Email/phone/URL field using `type="text"`. |
| 7 | Missing autocomplete | Name/email/phone/address fields where autocomplete would help. |
| 8 | Zoom disabled | Viewport `user-scalable=no` or `maximum-scale=1`. |
| 9 | Missing lang | `<html>` has no `lang`. |
| 10 | Outline removed | `outline: none` / `0` with no `:focus` / `:focus-visible` replacement. N/A if CSS is external and not in the DOM. |
| 11 | Empty links | `a` with empty href/name in the tree. |
| 12 | Missing touch-action | No `touch-action: manipulation` detectable. N/A if CSS not in DOM. |
| 13 | Looks clickable, isn't | Pointer/underline/pill styling with no href, button role, or handler. Cross-check the tree. |

## Output block

```
VERIFIED_VIOLATIONS (confirmed facts from DOM / a11y tree — not opinions):
  FAIL [4]: Icon buttons without accessible name — header search, location
  FAIL [13]: Looks clickable, isn't — "Sign in" is a styled span
  PASS [8]: Viewport does not disable zoom
  PASS [9]: html lang="en"
  N/A [10]: External CSS not in DOM
```

Rules:

- FAIL / PASS / N/A only — no severity theatre
- FAILs first, then PASS, then N/A
- Name the control when failing
- Handoff skills may promote a FAIL to `[A11Y-*]` **BLOCKING** only when the artifact is **our Design Harness code** and Check 2 allows runtime proof. On live production, FAILs are live-impact findings, not a Design Harness share BLOCK. On competitor pages, FAILs stay factual notes inside `competitor-scan` — never House labels.
