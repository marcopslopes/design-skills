# Review board — static variation mockups

Designer-facing how-to:
[`docs/HOWTO-VARIATION-REVIEW-BOARD.md`](https://github.com/marcopslopes/design-harness/blob/main/docs/HOWTO-VARIATION-REVIEW-BOARD.md)

Use this when `ui-agent` Step 1.5 picks **review board**, or when the designer
asks for variation mockups / side-by-side options **before** wiring Design Harness.

**Not this file:** mid-build structural forks with no prior options →
[`variant-fork.md`](variant-fork.md).

---

## Triggers (natural language)

- “variation mockups” / “variations mockups”
- “show me A B C side by side”
- “review board for …”
- “mock the options before we build”
- “I want to compare directions”

If options were just ideated (`ux-pattern`), prefer mocking **those** options
— don’t invent a fifth.

---

## Output contract

1. **One HTML file** under `projects/<slug>/artifacts/snapshots/<topic>-variants.html`
2. **Dark lab chrome** + **light mock frames** (see checkout reference)
3. **Cards:** ID · title · why · mock · optional footnote
4. **Baseline “Today”** card when improving existing UI
5. **Same seed content** across cards
6. Contested region only + ghost placeholders below
7. Log to `decisions.md`: format = review board; wait for pick before Design Harness edit
8. Optional **Lean** badge on the research-backed recommendation — still wait for designer pick

### Reference layout (keep)

Worked example designers liked:

`projects/checkout/artifacts/snapshots/till-header-variants.html` (2026-08-07)

Do not freestyle a new board aesthetic each time — clone that structure
(page head, 2×2 cards, status bar + toolbar mock, tools row, ghost appts).

---

## Forbidden

- Shipping all variants as live Design Harness routes before a pick
- Building a clickable tabbed lab when the ask was “mockups / compare”
- Different fake data per card (breaks comparison)
- Skipping the Today/baseline card when the ask is “fix this mess”
