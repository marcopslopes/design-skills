# Worked example — accessibility decisions (referral accept sheet)

Illustrative the company-shaped record. Not a claim about a shipped decision.

## Accessibility decisions — referral-entry-points — 2026-08-09

### Mode: document + handoff

#### Inline error on Accept referral phone field (no top-of-sheet summary)

**Date / author:** 2026-08-09 / Daniel  
**Context:** Accept-referral bottom sheet; providers often one-handed
chair-side. Prior pattern used a summary banner at the top of the sheet;
UT notes (synthetic + prior findings) showed errors missed when focus
stayed on the field.  
**Decision:** Validation errors render immediately below the invalid
field; associate via `aria-describedby`; announce on submit failure. No
summary banner on this sheet.  
**Alternatives:** (A) summary-only banner, (B) banner + inline, (C)
inline only ← chosen.  
**Impact:** Helps low vision + screen-reader users (error in context),
cognitive load (don't scroll/search), situational one-handed (less
travel).  
**Risks / tradeoffs:** Multi-field forms won't show a single "N errors"
count; acceptable on this short sheet (≤3 fields). Revisit if the sheet
grows.  
**Evidence:** Judgment + prior form UT pattern; WCAG 3.3.1 / 3.3.3
alignment intended — not a formal conformance claim.  
**WCAG:** 3.3.1 Error Identification; 3.3.3 Error Suggestion (partial).

### Spec (handoff excerpt)

| Element | Role/HTML | Keyboard | Focus | SR | Visual states |
|---|---|---|---|---|---|
| Phone | `input type="tel"` | Tab in/out | On submit error, keep focus on field | Error text via `aria-describedby`; `aria-invalid="true"` | Default / focus / error |
| Accept | `button` | Enter/Space | After success → confirmation region | Name "Accept referral" | Default / disabled while submitting |

### Tests

1. Keyboard: Tab to phone → Tab to Accept → Enter with empty phone →
   focus remains on phone; error text visible.
2. SR: On submit failure, error associated with field is announced
   (exact string TBD with content pass).
3. Zoom 200%: sheet content reflows; error remains adjacent to field;
   no horizontal scroll.
