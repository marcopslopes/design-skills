# Domain Taxonomy Example — Payments (fictional pack)

Use this as a reference for how to define product/domain taxonomy when
asking the agent to focus on a specific product area. **Confidence:
EXAMPLE — fictional codes/products, not real ones. Replace with your
own product's real taxonomy once you have one; do not treat these codes
as real feature names.**

When prompting the agent, include a taxonomy block like this if you want
signal tagging by product:

---

## Payments taxonomy (example)

- PP (Prepayment): upfront charge at booking. Methods: cards, wallets,
  bank transfer. All countries.
- CF (Cancellation Fee): retroactive charge on no-show or late-cancel. All countries.
- PBA (Pay By App): saved card auto-charged after service. All countries.
- OGC (Online Gift Card): digital gift card. Subset of markets.
- CR (Card Reader): physical POS terminal. Subset of markets.
- TTP (Tap To Pay): NFC smartphone-as-POS. Subset of markets.
- GC (Gift Cards): stored-value digital voucher. Subset of markets.
- KIP (Keyed In Payment): card-not-present manual entry. Subset of markets.
- IAP (In-App Payments): full in-app suite — cards, wallets, BNPL,
  1-click tips. Subset of markets.

---

For other domains (e.g. checkout flow, onboarding, search), create a
similar list with short codes, descriptions, and market availability.
