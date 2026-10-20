# UI variant fork — ambiguous layout decisions

When `ui-agent` hits a **genuine structural fork** with no steer from context,
build **2–4 real variants** (never pad to hit a number), present them via
`AskQuestion`, hard-stop until the designer picks, then log the choice —
including rejected alternatives — in `projects/<slug>/decisions.md`.

Every variant must use real `context/design-system/ds` primitives and
`context/design-system/tokens.css`. This is not open-ended exploration.

---

## Decision tree — fork or proceed?

Check in order. Stop at the first match.

| Check | If true → |
|-------|-----------|
| `decisions.md` already logs this fork | **Proceed** with logged choice — do not re-fork |
| `brief.md` / `findings.md` prescribes the pattern | **Proceed** — one-line skip rationale in chat |
| `COMPANY-PATTERNS.md` or `COMPANY-ARCHETYPES.md` rules it out | **Proceed** |
| Designer said "just pick one" or profile has standing preference | **Proceed** — log preference if first time |
| `behaviour.variantForks` is `false` in `harness.config.local.json` | **Ask one `AskQuestion`** naming the choice, build only the pick, log both to `decisions.md` (`references/shared/harness-settings.md`) |
| Only one the company-idiomatic answer exists | **Proceed** — e.g. primary + ghost button pair |
| Change is token pass, a11y fix, or same UX two ways in code | **Proceed** |
| **2–4 genuinely distinct structural approaches** remain, all DS-compliant | **Fork** — Step 3.5 |

**Skip-rationale example (chat):** *"No variant fork — button hierarchy is prescribed; adding a ghost secondary next to primary is the company pattern."*

---

## Step 3.5 workflow

1. **Name the fork** — one sentence: what's shared, what differs.
2. **Build variants** — same content/data, different structure. Prefer one
   comparison Design Harness route with labeled tabs/sections over N separate routes
   unless variants are too large. **Name each variant by its axis** (e.g.
   Quiet / Dense / Grouped) — never "Option A/B/C". Before building, state
   each axis in a phrase. Each variant differs in interaction, layout, or
   motion, and is a direction you could defend shipping on its own. If two
   variants only differ by accent, density, or copy, they are one direction
   — replace one with a real alternative.
   Show **one variant at a time at full size** in realistic context when
   using a tab/section switcher (postage-stamp grids distort spacing).
3. **Export snapshots** — one HTML (+ optional PNG) per variant:

   ```bash
   npm run export-task-prototype -- \
     --route playground/<comparison-route> \
     --task <slug> \
     --name <fork-name> \
     --views "card-container:" \
     --views "flat-dividers:button[role=tab][data-layout=flat-dividers]" \
     --views "per-row-cards:button[role=tab][data-layout=per-row-cards]" \
     --screenshot
   ```

4. **Present + gate** — summary, artifact paths, then **`AskQuestion`** with
   semantic labels (not "Option A"). End with **Other…**.
5. **Hard stop** — no audit-as-final, no silent pick, no "I'll default to X."
6. **After pick** — promote winner to canonical prototype; demote comparison
   UI (suffix `*-layout-fork` or remove tab switcher).
7. **Log** — `decisions.md` entry (template below) + dated `findings.md` line
   with artifact paths.
8. **Continue** — tokens check → audit → export winner only.

---

## `AskQuestion` payload shape

```json
{
  "title": "Clients list — layout fork",
  "questions": [{
    "id": "clients_list_layout",
    "prompt": "Which list structure should we build against?",
    "allow_multiple": false,
    "options": [
      { "id": "card_container", "label": "Single card, rows with dividers" },
      { "id": "flat_dividers", "label": "Flat row list with hairline dividers" },
      { "id": "per_row_cards", "label": "Individual card per client row" }
    ]
  }]
}
```

Option `label` values must name the **design difference**, not ordinal letters.

---

## `decisions.md` entry template

```markdown
### YYYY-MM-DD — ui-agent variant fork: <fork topic>

**Chosen:** <semantic label of winning variant>
**Rejected:**
- <semantic label> — <why not, from designer or brief inference>
- <semantic label> — <why not>
**Rationale:** <designer quote if given, else agent summary>
**Artifacts:** `artifacts/snapshots/<fork-name>-<variant>.html` (+ `.png` if exported)
**Made by:** Designer, via `AskQuestion` variant-fork gate
```

If the designer picks **Other…**, log their description under **Chosen** and
note which presented variants were rejected.

---

## Anti-patterns

- Forking on every build — most screens have one clear the company answer
- Variants built outside `context/design-system/ds` or with raw hex/px
- "Option A / B / C" labels without naming the design difference / axis
- Variants that only differ by accent color or copy (not a real axis)
- Proceeding on silence or enthusiasm — same bar as `design-kickoff` Step 3
- Skipping `decisions.md` — the rejected-alternatives log is the point
- Running full audit on all variants — audit the winner only

---

## Reference implementation

`projects/clients-list-redesign/` — layout fork comparison at
`#/playground/clients-list-layout-fork`, verified 2026-07-18.
