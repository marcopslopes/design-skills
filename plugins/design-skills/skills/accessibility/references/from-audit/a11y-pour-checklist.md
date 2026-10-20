# WCAG 2.2 POUR checklist — Design Harness audit

Shared by **`audit`** Check 2 and standalone **`accessibility`**. WCAG POUR;
House-specific notes inline.

**How to use in `audit`:**

1. Run the **existing Check 2 markup rules** first (they remain the primary BLOCKING source).
2. Walk this checklist for the same session files.
3. For each row, mark outcome: **pass** | **fail (BLOCKING)** | **advisory** | **n/a** | **runtime/manual** (cannot verify from static source alone).

**BLOCKING** only when the failure is **evidenced in code/CSS** with an existing flag (`[A11Y-*]`) or an equivalent clear violation (e.g. `div onClick`). Do not BLOCK on contrast, 200% zoom, or SR behaviour without measurement or runtime proof — log those as **advisory** (tag Major if severe) or **runtime/manual**.

**the company product UI:** Playground prototypes use **light mode only** — do not require dark-mode or `prefers-color-scheme` product themes (`[DS-PROTO-THEME]` if invented). Design Harness lab chrome may be dark.

---

## Perceivable

| # | Criterion | Verifiable from TSX/CSS | If failed in code |
|---|-----------|-------------------------|-------------------|
| P1 | Text alternatives: every `<img>` has `alt` (meaningful or `""`) | Yes | BLOCKING `[A11Y-IMG]` |
| P2 | Decorative images use `alt=""` | Yes | Advisory |
| P3 | Icon-only controls: name on button/link, SVG `aria-hidden` | Yes | BLOCKING `[A11Y-LABEL]` / `[A11Y-SVG]` |
| P4 | Colour is not the **only** cue for state/meaning (pair with text, icon, or pattern) | Partial (structure) | Advisory unless no text/icon at all for critical state |
| P5 | Contrast meets WCAG AA (4.5:1 normal text, 3:1 large text/UI) | Partial (token pairs) | Advisory unless obviously broken in code; note **runtime/manual** if needs render |
| P6 | Text resizable to 200% without loss of function | Rarely from source | **runtime/manual** — advisory if layout uses fixed px traps |
| P7 | Content available to screen readers (semantics, labels, live regions) | Yes | BLOCKING per Check 2 rules |

---

## Operable

| # | Criterion | Verifiable from TSX/CSS | If failed in code |
|---|-----------|-------------------------|-------------------|
| O1 | All functionality operable via keyboard (real `<button>` / `<a>`, not `div onClick`) | Yes | BLOCKING `[A11Y-LABEL]` |
| O2 | Focus order is logical (DOM order vs visual order) | Partial | Advisory; **runtime/manual** if tab order untestable |
| O3 | Focus indicators visible (`:focus-visible` or equivalent; no naked `outline: none`) | Yes | BLOCKING `[A11Y-FOCUS]` |
| O4 | Touch targets at least ~44×44px (min height/width or padding) | Partial | Advisory Major if clearly undersized in styles |
| O5 | Motion respects `prefers-reduced-motion` when animation is used | Yes if `@media (prefers-reduced-motion)` or no motion | Advisory if motion without reduced fallback |
| O6 | No keyboard traps in modals (focus management intent documented or implemented) | Partial | Advisory; BLOCKING only if trap evidenced (e.g. `tabIndex={-1}` on all controls) |
| O7 | Hover-only styles gated with `@media (hover: hover)` so they don't stick after tap | Yes | Advisory |
| O8 | Decorative overlays don't steal hits (`pointer-events: none` + `aria-hidden`) | Yes | Advisory; Major if a glow/gradient swallows a control |

---

## Understandable

| # | Criterion | Verifiable from TSX/CSS | If failed in code |
|---|-----------|-------------------------|-------------------|
| U1 | `lang` on document/root where prototype sets it | Yes | Advisory |
| U2 | Form labels visible and associated (`htmlFor` / `aria-labelledby`) | Yes | BLOCKING `[A11Y-LABEL]` |
| U3 | Errors explain problem + fix (copy in component) | Yes (copy present) | Advisory — content skill |
| U4 | Predictable behaviour (no surprise navigation on focus) | Partial | Advisory |
| U5 | Plain language (provider-facing) | Copy review | Advisory — `content` / Check 3 |
| U6 | Submit not disabled until the form is "valid"; validate on submit and focus first error | Yes | Advisory |

---

## Robust

| # | Criterion | Verifiable from TSX/CSS | If failed in code |
|---|-----------|-------------------------|-------------------|
| R1 | Semantic HTML for structure (`button`, `nav`, `main`, headings) | Yes | Advisory Major if div soup for primary actions |
| R2 | ARIA only when needed; roles on dialogs (`role="dialog"`, `aria-modal`, `aria-labelledby`) | Yes | BLOCKING `[A11Y-DIALOG]` |
| R3 | Valid patterns for live regions (`role="status"` / `role="alert"`) | Yes | BLOCKING `[A11Y-LIVE]` |
| R4 | Works with supported AT (no reliance on title-only tooltips) | Partial | Advisory |
| R5 | Skip-to-content when repeated chrome precedes main; first focusable is the skip link | Partial | Advisory in Design Harness unless the prototype claims full-page chrome |

---

## Audit report snippet (optional)

After Check 2 blocking list, include a short summary:

```markdown
### Check 2 — POUR coverage
- **Verified in source:** [count pass / fail]
- **Runtime/manual (not verified this pass):** [list P/O items e.g. P5 contrast render, P6 200% zoom, O2 tab order]
- **Advisory from POUR:** [bullets with Major/Minor + `[A11Y-POUR]` tag optional]
```

Do not duplicate the same issue twice — if already flagged `[A11Y-LABEL]`, do not add a second line unless the POUR angle adds new information.
