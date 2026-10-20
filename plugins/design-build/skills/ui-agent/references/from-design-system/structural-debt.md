# Design-system structural debt (index)

Durable entries live in repo-root **`KNOWN-ISSUES.md`**. This file is the
index the `design-system` skill reads/updates so debt is not chat-only.

When adding debt: append a section to `KNOWN-ISSUES.md`, then add a one-line
pointer here. When fixed: remove both.

---

## Open

- **No Harness token file** (2026-10-12; components moved to `src/design-harness/ui/` the same day) — `KNOWN-ISSUES.md`; full list in `context/design-system/HARNESS-INVENTORY.md`. Next: Harness tokens and a shared Dialog.

---

## Resolved

| Debt | Resolved | Notes |
|------|----------|--------|
| `src/design-harness.css` mixed three layers (~15k lines) | 2026-07-21 | Chrome → `styles/chrome.css` + `phone-shell.css`; prototypes → `styles/prototypes/*.css`; barrel → `styles/index.css` / thin `src/design-harness.css` |

---

## How to add

1. Confirm it is structural (IA / layering), not a one-line token typo (those get fixed immediately).
2. Write the `KNOWN-ISSUES.md` entry with Found date + why deferred.
3. Add a row to **Open** above.
4. Mention the debt when `ui-agent` is about to append substantial new CSS — prefer `src/design-harness/styles/prototypes/<feature>.css` + an `@import` in `styles/index.css`.
