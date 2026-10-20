# Token check (pre-write)

Run this **before** writing any colour, spacing, radius, border, type size,
or font weight into app code, Design Harness chrome, prototype CSS, or inline
styles. Source of truth: `context/design-system/tokens.css`.

---

## Layer check (first)

Ask: which layer is this value for?

1. **Real DS** (`tokens.css` / `ds/`) — only if extending Foundations or a
   documented component spec. Prefer editing the primitive, not a one-off.
2. **Lab token** (`src/design-harness/styles/tokens.lab.css`) — only for Design Harness
   phone chrome or a documented prototype one-off. Never invent a second
   Foundations colour here and pretend it is DS.
3. **Design Harness catalog chrome** — must use existing Foundations/DS tokens;
   no new semantic colours in chrome for the shell/docs.
4. **Per-prototype** — prefer `src/design-harness/styles/prototypes/<feature>.css`
   (+ `@import` in `styles/index.css`). Do not grow `src/design-harness.css` (it is
   only a thin barrel now).

If the write would violate the layer rule → stop, flag `[DS-LAYER]`, propose
the correct home.

---

## Value lookup

1. **If the value is already on disk in a `.css` file** (reviewing
   existing code, not a value about to be typed fresh), run the
   mechanical check first instead of eyeballing it:
   ```bash
   npm run design:detect -- <file>
   ```
   `scripts/design-detector` (see its `README.md`) answers "does a token
   exist for this value" with zero LLM judgment — a `TOKEN-RAW` finding
   means skip straight to "exact token exists" below; a `TOKEN-GAP`
   finding means skip straight to "gap is real" below. This step is
   mechanical-check-only — it doesn't run for a value you're about to
   write for the first time (nothing to scan yet); for that case, or for
   any value in `.tsx`/inline styles the tool doesn't parse, do the
   manual lookup in steps 2–3.
2. Search `tokens.css` for an exact or semantic match
   (`--color-*`, `--spacing-*`, `--radius-*`, `--border-*`, `--font-*`,
   `--type-*`, `--size-*`, `--ds-*` component tokens).
3. Cross-check `context/design-system/TOKENS-QUICK-REFERENCE.md` tables
   when unsure of the semantic name.
4. Decide:

| Result | Action |
|--------|--------|
| Exact token exists | Use `var(--token-name)`. |
| Nearest token is close enough | Use nearest; one-line note in chat (e.g. "15px → `--font-size-body` 16px"). |
| Gap is real (Figma has it, we don't) | Human gate: add to `tokens.css` first **or** defer + debt entry. Never invent `--my-special-teal` in page CSS. |
| Gap is fake (one-off preference) | Map to nearest; do not extend Foundations. |

### Font weights

Defined in this system: **400** (`--font-weight-regular`), **600**
(`--ds-font-weight-semibold`), **700** (`--font-weight-bold`).  
Never write `500`, `300`, etc.

### Border widths

Foundations today: `--border-01` (1px), `--border-02` (2px).  
There is **no** `--border-03`. Use `--border-02` for a 2px accent, or add a
real Foundations token only if Figma defines a third width.

---

## Output format (paste into chat when checking)

```
### Token check — [value or intent]

Layer: DS | Design Harness chrome | prototype
Lookup: [what you searched for]
Result: EXISTS `var(--…)` | NEAREST `var(--…)` (was …) | GAP — need human
Action: [what will be written / waiting on]
```

---

## Human gate (token gap)

Same discipline as `ui-agent` variant-fork — hard-stop, no silent invent:

Use `AskQuestion` when available, with options like:

- Use nearest existing token (`--…`)
- Add a Figma-backed token to `tokens.css` first (I'll confirm the Figma value)
- Defer — log under DS debt / `KNOWN-ISSUES.md`

If `AskQuestion` is unavailable, plain-text degrade per
`references/shared/ask-question-ui.md` (same three options) — do not invent
the variable, and do not tell the designer to switch models.
