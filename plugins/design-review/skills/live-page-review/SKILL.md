---
name: live-page-review
description: >-
  Front door for reviewing a fetchable live or local URL: capture
  screenshot + DOM + accessibility tree (optional click-through in one
  browser session), classify the artifact, then hand off to the existing
  review skill. Triggers on: "review this live page", "review this local
  URL", "review localhost", "click through this flow on this URL",
  "capture this page and review it", or a non-Figma http(s) URL plus
  review/audit/critique. Does not review Figma (`ux-pattern` /
  `figma-ux-audit`). Does not replace pre-share `audit` on Design Harness code.
  Does not add a Playwright MCP or a fifth onboarding MCP. Playwright
  Chromium is optional — skip capture and say so if browsers are missing.
---

# Live page review

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

A URL is not a screenshot guess. Capture what the page actually is —
pixels, DOM, accessibility tree, and optional clicks — then route the
evidence into the skill that already owns the judgment.

**Invoke in Cursor:** "review this live page", "review http://localhost:3001/#/playground/…", "click through checkout on this URL"

Runtime evidence only. House judgment stays in `ux-pattern` / `content` /
`audit` / `competitor-scan` / `synthetic-user-testing`.

---

## Quick Reference

| Category | When to use | Reference |
|----------|-------------|-----------|
| Capture CLI | One-shot or click-through | [capture-cli.md](references/capture-cli.md) |
| Verified violations | Binary DOM/a11y facts before opinion | [verified-violations.md](references/verified-violations.md) |
| Artifact type | Live prod vs Design Harness vs competitor | `references/shared/artifact-type-critique.md` |

---

## Scope boundary

| Skill | Job |
|-------|-----|
| **`live-page-review`** (this) | Classify URL → capture → hand off. Owns the evidence pack, not the critique. |
| **`ux-pattern` + `content`** | Written critique of **our** live production (live-impact framing) |
| **`audit` / `accessibility`** | Design Harness **code** share gate; this skill only supplies runtime proof for Check 2 POUR rows that need a browser |
| **`competitor-scan` / `benchmark`** | Named competitor facts — never house-critique their UI |
| **`synthetic-user-testing`** | Persona walkthrough; may consume this capture as the surface |
| **`figma-ux-audit` / design-critique on Figma** | Figma URLs never enter this skill |

- **Fires on:** a fetchable `http://` or `https://` URL that is **not** `figma.com`, plus review/audit/critique/click-through intent (or the designer names this skill).
- **Does not fire on:** Figma/FigJam links; git diffs (`interface-change-review`); "ready to share" on Design Harness code with no URL (`audit`); competitor lookup with **no** URL (`competitor-scan` web/Mobbin path).
- Never installs Playwright MCP. Never adds a fifth onboarding MCP. Never ports a five-persona review theatre.

---

## Load before running

1. `references/shared/artifact-type-critique.md`
2. `references/capture-cli.md`
3. `references/verified-violations.md`
4. The **handoff** skill's `SKILL.md` after classify (do not load all of them first)

---

## Step 0 — Classify the URL

Use `artifact-type-critique.md`. Silent when obvious; AskQuestion when ambiguous.

| URL looks like | Type | Handoff after capture |
|---|---|---|
| `localhost` / `127.0.0.1` + Design Harness hash (`#/playground/…`, `#/how-to`, or a named lab route) | Design Harness prototype | Runtime evidence for `audit` Check 2 (manual/runtime rows) and/or `synthetic-user-testing`. Do **not** treat capture as a share PASS. |
| Our own production host (designer says live/shipped, or org-pack product domain) | Live production | `ux-pattern` → (`content` if copy/CTAs in scope) with **live-impact** framing. No Design Harness DS token audit from HTML alone. |
| Named competitor or clearly not our product | External | `competitor-scan` (or `benchmark` if they asked to score **our** equivalent). Never apply House tokens to their UI. |
| Unclear | Ask | Same `artifact_type` options as the classifier |

If the designer also named a click-through / "walk the flow", set mode **click-through**. Otherwise **one-shot**.

Device (default iPhone 14 for phone product surfaces, Desktop Chrome for dashboards): map to a Playwright device name per `references/capture-cli.md`. Ask only if it matters and wasn't stated.

---

## Step 1 — Capture (optional, never a gate)

Need Chromium once: `npx playwright install chromium`. If `error.txt` says browsers are missing, **do not block the review**. Say so once, offer screenshot-only or Figma, and continue the handoff without DOM/a11y proof.

Output directory:

- Task in play → `projects.local/<slug>/artifacts/captures/<YYYY-MM-DD-HHmm>/` if that folder exists, else `/tmp/live-page-review-<timestamp>/`
- No task → `/tmp/live-page-review-<timestamp>/`

**Never commit competitor screenshots or DOM.** Do not copy those files into the public `projects/` tree.

### One-shot

```bash
node scripts/capture-page.mjs --url "URL" --out "OUT" --device "DEVICE"
```

### Click-through (same browser session)

Plan the path from the first a11y tree **or** from the designer ("continue, then pay"):

```bash
node scripts/capture-page.mjs --url "URL" --out "OUT" --device "DEVICE" \
  --step "landing:" \
  --step "after-continue:role=button[name=Continue]" \
  --step "after-pay:text=Pay now"
```

Replay from the start in **one** invocation so SPA state survives. Do not open a new browser per click.

`--headed` only if the designer wants to watch.

If `OUT/error.txt` exists after the run: read it, tell the designer, stop capture. Continue handoff without runtime proof if they still want a visual review.

---

## Step 2 — Read artifacts (do not dump the DOM)

For each captured step:

1. **Read** `screenshot.png` — write a short visual description (what is on screen, hierarchy, competing CTAs). Do not paste competitor UI copy verbatim.
2. **Read** `a11y-tree.txt` in full (usually small).
3. **Do not** embed `dom.html` whole. Skim with offset/limit; summarize structure (buttons vs divs, labels, heading order) as `dom_summary`.

Then run the verified-violations checklist (`references/verified-violations.md`) into a `VERIFIED_VIOLATIONS` block. These are facts, not craft opinions.

---

## Step 3 — Hand off (this skill does not write the critique)

Show a short PLAN for the handoff skill(s) if more than one, then wait for go **unless** this turn already has go for the chain.

| Type | Load and follow |
|---|---|
| Design Harness local | `audit` only if they asked share-ready **and** you have the Design Harness source files. Otherwise attach capture + verified violations as runtime evidence; offer `synthetic-user-testing` if they named a persona/task. Check 2 **runtime/manual** POUR rows may now BLOCK when the tree/DOM proves them. |
| Live production (ours) | `ux-pattern` (+ `content` when copy is in scope). Live-impact tone. First look, then two-layer findings. Persist to `projects/<slug>/findings.md` when a task is in play. |
| External / competitor | `competitor-scan` — facts only. Capture is evidence; still no "copy this" and no House audit of their product. |

Do **not** invent a 0–100 UX health score. Do **not** dispatch named parallel personas. Use `COMPANY-ARCHETYPES.md` only via the handoff skill (synthetic UT / ux-pattern), never hardcoded product archetypes in this file.

After the written critique is in `findings.md`, offer **`review-report`** (scrollable HTML article — not slides). Payload: `references/from-review-report/offer-questions.md`. Never auto-build the report.

---

## Never do this

- Add Playwright MCP, Parallel MCP, or Rams MCP to the four-MCP onboarding gate
- House-critique a competitor because they said "audit this URL"
- Treat a capture PASS as `audit` share PASS
- Embed full `dom.html` in prompts
- Commit competitor captures
- Port multi-persona agent theatre or a generic /100 score from the June UX-review skills
- Click through in separate browser launches (loses SPA state)

---

## Persist + log

Append a routing line (`MATCHED live-page-review`) to `harness/logs/routing-log.md` and the task `log.md` when a task applies. Note capture path, device, step count, and which skill took the handoff. If Chromium was missing, log `capture=skipped`.
