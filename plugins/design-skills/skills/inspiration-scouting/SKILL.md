---
name: inspiration-scouting
description: >-
  Curates aesthetic and interaction references — including cross-domain —
  with explicit "what to take / what to leave" for each. Triggers on:
  "show me inspiration for X", "mood board for this", "aesthetic
  references", "what could this feel like", "cross-domain inspiration".
  Different from `competitor-scan` / `benchmark` (those are named-product
  pattern pulls and scored gap analysis). Does not invent the company brand
  tokens. Does not copy UIs wholesale.
---

# Inspiration scouting

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Competitive research answers "who else solves this." Inspiration answers
"what could this *feel* like" — even when the reference is from another
domain. A booking tool can borrow calm pacing from a meditation app
without borrowing its IA.

**Invoke in Cursor:** "show me inspiration for empty states", "mood board
for this checkout calm", "cross-domain references for trust"

---

## Scope boundary

| Skill | Job |
|-------|-----|
| **`inspiration-scouting`** (this) | Aesthetic / interaction *feel* references; take/leave |
| **`competitor-scan`** | Factual pattern on one *named* competitor + one feature |
| **`benchmark`** | Scored gap analysis of a company screen vs best-in-class |

- **Does not fire on:** "how does Fresha handle tips" → `competitor-scan`.
- **Does not** override Foundations / `ds` tokens when later building.
- **Composes with:** `taste-feedback` (mid-build checks against the chosen
  feel), `ui-agent` (build), `ux-pattern` decision/debate modes.

---

## Step 1 — Inspiration brief

```markdown
## Inspiration brief
**Project / surface:** …
**Feel we're going for:** [2–3 adjectives]
**Feel we're avoiding:** [2–3 adjectives]
**Domain:** …
**Cross-domain openness:** same domain / adjacent / anywhere
**Specific needs:** [e.g. empty states, onboarding pacing, dense tables]
```

Infer from `brief.md` when possible; ask at most one clarifying question
if the feel is genuinely missing.

---

## Step 2 — Search layers

Pull a small set across:

- **Visual** — colour restraint, type pairing, density, imagery mood
- **Interaction** — navigation pacing, feedback, empty states, onboarding
- **Emotional** — trust, delight-with-restraint, personality

Prefer real shipped products / well-documented patterns. Label sources
with links per `references/shared/source-links.md`.

---

## Step 3 — Curate (5 strong > 20 weak)

For each reference:

```markdown
### [Name]
**Source:** [product + URL if available]
**Why relevant:** …
**What to take:** [specific quality]
**What to leave:** [what must not be copied — prevents wholesale cloning]
**Layer:** Visual / Interaction / Emotional
**the company fit note:** [how this coexists with Foundations / archetypes]
```

---

## Step 4 — Persist

Append the mood board to `projects/<slug>/findings.md`. Add durable URLs
to `sources.md`. Do **not** start building until the designer picks what
to take — offer `AskQuestion` if they want to lock 1–2 directions before
`ui-agent`.

---

## Never do this

- Never present references without **what to leave**
- Never treat inspiration as permission to invent off-token styles
- Never the company-critique a competitor when the ask was inspiration
- Never confuse this with `benchmark`'s scored gap analysis

---

## Related files

| File | Role |
|------|------|
| `../competitor-scan/SKILL.md` | Named-competitor factual pull |
| `../benchmark/SKILL.md` | Scored the company gap analysis |
| `../taste-feedback/SKILL.md` | Mid-build checks against chosen feel |
| `docs/HOWTO-INSPIRATION-SCOUTING.md` | Designer guide |
