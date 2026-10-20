---
name: figma-ux-audit
description: >
  Runs a structured UX audit on a Figma page and places colour-coded annotation
  cards directly next to each screen, connected by dotted lines. Triggers on:
  "annotate this Figma", "add annotations to this Figma", "audit this Figma with
  notes on the canvas", "put feedback on the canvas", "Figma canvas annotations",
  "annotation cards on the board". Also the optional follow-up after a written
  design-critique (§2d) when the designer opts in. Cross-references Confluence
  signals when a URL is provided. Does NOT replace written findings.md critique
  (ux-pattern → content) — it visualises audit findings on the canvas. Compose
  the same house ground truth as design-critique; never maintain a separate
  rule set. See ORCHESTRATOR §2 figma-ux-audit row and §2d.
---

# Figma UX Audit

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

You are running a structured UX audit: screenshot screens on a Figma page,
identify UX issues by severity **and basis layer**, and place colour-coded
annotation cards flush next to each screen with connector lines — written
directly into the Figma file via the Figma MCP (`use_figma`).

**Invoke in Cursor:** after an explicit opt-in (drop-time AskQuestion or
post-critique AskQuestion) or a direct annotate trigger. Never auto-run.

---

## Artifact type + framing

This skill only applies to **Figma boards (pre-build / exploratory)**.
Classify via `references/shared/artifact-type-critique.md`:

- Confirmed Figma → exploratory framing; **no Design Harness DS/`audit` code gate**.
- If the drop is live production, Design Harness-only, or a competitor — do **not**
  place House annotation cards on the wrong artifact; redirect (design-critique
  live framing, Design Harness `audit`, or competitor-scan mismatch) instead.
- Before listing cards in chat / `findings.md`, write a **First look**
  holistic paragraph (primary problem + how cards connect as symptoms).

---

## Compose design-critique ground truth (mandatory)

Do **not** invent a parallel house rulebook. Before analysing, load the same
context `design-critique` uses:

1. Read and follow `../ux-pattern/SKILL.md` load list
   (`COMPANY-PATTERNS`, `ARCHETYPES`, `BUSINESS` + Figma fetch).
2. When copy/CTAs are in scope, also follow `../content/SKILL.md`
   (content standards).
3. For visual/token-level issues, check `context/design-system/tokens.css`
   (and Foundations notes when relevant).
4. If a dated `projects/<slug>/findings.md` critique already exists for this
   board, **reuse those findings** as the primary annotation source — do not
   re-derive a conflicting set.

Each annotation card must state which layer it draws from (see Card format).

---

## Workflow

1. **Confirm scope + artifact type** — Figma only; exploratory framing
   (`artifact-type-critique.md`). Plan-then-confirm if multi-skill.
2. **Map the page** — `get_metadata` / `get_screenshot` / `get_design_context`.
3. **Get coordinates** — via `use_figma`, read `absoluteBoundingBox` for each
   screen (essential inside SECTION nodes).
4. **Screenshot each screen** — close analysis.
5. **Analyse** — checklist below + House layers; label every finding;
   draft **First look** (holistic) before placement.
6. **Place cards** — inject `scripts/card-builder.js` helpers, run via
   `use_figma` (Plugin API code). Load `/figma-use` (or
   `skill://figma/figma-use/SKILL.md`) before writing.
7. **Cross-reference signals** (optional) — Confluence URL → embed links.
8. **Summarise** — First look + cards by severity + top themes; log routing;
   append a short note to `projects/<slug>/findings.md` / `log.md` when a
   task folder applies.
9. **Prove placement** — `get_screenshot` of annotated region; paste Figma
   link with node-id in chat.

---

## Card format

Card header: `EMOJI SEVERITY · FIELD · SUBJECT`

| Severity | Colour | When to use |
|---|---|---|
| 🔴 HIGH | Red | Blocks task completion, causes drop-off, or creates trust/transparency issues |
| 🟠 MEDIUM | Orange | Friction or confusion that degrades the experience but doesn't fully block |
| 🔵 LOW | Blue | Polish: copy clarity, visual hierarchy, micro-interactions, a11y nice-to-haves |

**LOW is always blue — never green.**

**FIELD taxonomy** — pick the most specific one:
- `UX` — general interaction or usability
- `COPY` — labels, microcopy, tone, terminology
- `IA` — information architecture, navigation, findability
- `FEEDBACK` — loading, error, success, and empty states
- `FLOW` — task sequencing, step logic, dead ends
- `VISUAL` — hierarchy, contrast, spacing, layout
- `A11Y` — accessibility: touch targets, colour contrast, screen reader support
- `TRUST` — transparency around fees, charges, permissions, data handling

**Basis layer (required in title or first body line — never omit):**

This labeling convention is **shipped and shared** across `figma-ux-audit`,
`harness/agents/product-designer.md`, and `../audit/SKILL.md`.
Do **not** invent alternate shapes (`[Craft/UX]`, `[House standard]`, etc.).

| Layer | Label shape | Source |
|---|---|---|
| Global UX craft / heuristics | `[UX Heuristic: <name>]` e.g. Consistency, Error prevention, Visibility of system status, Recognition over recall, Visual hierarchy, Affordance, Focal point, 60–30–10 | Nielsen (or equivalent) **plus** named craft in `references/shared/ui-craft-rules.md` and senior judgment (typography, hierarchy, spacing, affordance) — universal, not House-specific |
| House rules | `[House: <source> — <rule>]` e.g. content standard — max 1 `!`/screen; archetype — "more visibility" anti-pattern; patterns — Biz vs Client chrome | `ux-pattern` / `content` context files + tokens |

Do **not** blend layers into one generic note. One card = one primary basis.
If both apply, prefer two cards or lead with the stronger layer and mention
the other briefly in the body. House violations stay the harder finding when
both layers apply — craft does not soften house rules.

**Card body** (2–4 sentences):
1. What the problem is
2. Why it matters / user impact
3. Suggested fix
4. (If signals URL was provided) clickable Confluence link at the very end

---

## Analysis checklist

### General UX heuristics / craft (every screen)

- Is the primary action clear, visible, and reachable without scrolling?
- Are all states handled — loading, error, empty, success, edge cases?
- Is copy clear — no jargon, ambiguous labels, missing context, or truncated text?
- Are fees, charges, or irreversible consequences explained before the user commits?
- Is there a clear path back / undo / cancel?
- Does visual hierarchy guide the eye to the right action first?
- Are touch targets large enough (min 44×44px) and well-spaced?
- Do similar actions look and behave consistently across screens?
- Are transitions between steps logical and free of unnecessary friction?
- Are there any trust or transparency gaps?
- Senior craft: does type / spacing / density still feel intentional when tokens are correct? Named terms (focal point, scan path, 60–30–10, type hierarchy, content over chrome) live in `references/shared/ui-craft-rules.md` — cite 1–2, never the full list.

### House-specific (same as design-critique)

- Archetype fit / “get discovered” anti-pattern
- Provider vs client mental model and chrome
- Modal vs push / nav conventions (`COMPANY-PATTERNS`)
- Content standards (exclamation budget, CAPS, CTA verbs)
- Token / Foundations misuse when judging visual issues

Aim for a mix of severity levels. Most screens will have 2–5 cards.
Cross-cutting issues get one shared card in the gap between sections.

---

## Card placement rules

- **Right of screen (default)** — 36px right of the screen’s right edge;
  thin horizontal dotted connector.
- **Above/below** — when screens are packed (< ~400px gap).
- **Cross-cutting gap** — multi-screen issues; no specific connector.
- **Never overlap** screen content.

---

## Using the card builder

Read `scripts/card-builder.js` in full before writing any card placement code.
It defines: `card()`, `cH()`, `cV()`, `ri()`, `ab()`, and `deepDelete()`.

Inject the entire file content as the first block of your `use_figma` code,
then call the helpers. Always:

```javascript
const pg = figma.root.children.find(p => p.id === "PAGE_ID");
await figma.setCurrentPageAsync(pg);
const page = figma.currentPage;

await figma.loadFontAsync({family:"Inter", style:"Regular"});
await figma.loadFontAsync({family:"Inter", style:"Bold"});
await figma.loadFontAsync({family:"Inter", style:"Semi Bold"});

// [paste full card-builder.js]

deepDelete(page);

const node = await figma.getNodeByIdAsync("NODE_ID");
const sc = { x: node.absoluteBoundingBox.x, y: node.absoluteBoundingBox.y,
             w: node.absoluteBoundingBox.width, h: node.absoluteBoundingBox.height };

ri(sc, 0, "high", "UX · Client icon on Biz push",
   "[House: patterns — Biz vs Client chrome] Wrong app identity",
   "Lock-screen uses the Client app icon for a Biz referral push...");
```

Title/body must carry the `[UX Heuristic: …]` or `[House: …]` label.

## Cleaning up before re-run

Always `deepDelete(page)` at the top of any placement script.

## Common pitfalls

- `layoutSizingHorizontal = "FILL"` on TEXT → width 0. Use `resize(TW, 20)` then `textAutoResize = "HEIGHT"`.
- Call `resize()` before `primaryAxisSizingMode = "AUTO"`.
- LOW is blue, never green.
- Font loading mandatory for Inter Regular / Bold / Semi Bold.
- `setRangeHyperlink` uses `value:` not `url:`.
- Large pages → split `use_figma` calls to avoid timeouts.
- Before `use_figma`, load figma-use guidance.

## Asset capture for evidence

After placing annotation cards, capture proof:

### Download annotated screenshots

```javascript
// Download the annotated region
const assets = await download_assets({
  fileKey: "figma-file-key",
  nodeId: "annotated-section-node-id",
  defaultFormat: "png",
  defaultScale: 2  // @2x for clarity
});

// Save to project artifacts
// Save image to: projects/<slug>/artifacts/qa/
// Filename: [screen-name]-annotations-YYYY-MM-DD.png
```

### Document with images

In `projects/<slug>/findings.md`:

```markdown
### YYYY-MM-DD — figma-ux-audit

**Figma board:** [URL with node-id]

**Annotations placed:** 8 cards (3 HIGH, 3 MEDIUM, 2 LOW)

**Visual proof:**

![Annotated homescreen](artifacts/qa/homescreen-annotations-2026-08-27.png)

**First look:**
[Holistic paragraph about primary issues]

**Findings by severity:**
[Card-by-card breakdown]
```

### Comparison workflow

For before/after tracking:

1. Download screenshot before annotations
2. Add annotations
3. Download screenshot after annotations
4. Compare when fixes are implemented

```
projects/<slug>/artifacts/qa/
├── homescreen-before-2026-08-27.png       # Original design
├── homescreen-annotations-2026-08-27.png  # With annotation cards
└── homescreen-after-2026-09-15.png        # After fixes applied
```

---

## AskQuestion payloads

Canonical option sets: `references/offer-questions.md` (drop-time +
post-critique). Orchestrator §2d owns when to fire each offer.
