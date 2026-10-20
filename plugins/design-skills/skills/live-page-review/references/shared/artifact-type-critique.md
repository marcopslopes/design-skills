# Artifact-type classifier — critique / audit front door

**Owns:** how `audit`, design-critique (`ux-pattern` → `content`), and
`figma-ux-audit` classify what was dropped **before** running checks.
Canonical copy lives here; skills point here — do not invent a fourth
convention.

**Additive:** does not replace two-layer labels (`[UX Heuristic:]` /
`[House:]`), Design Harness→full `audit` routing, or itemized finding sections.

---

## Classify first (silent when obvious)

| Type | How you know | Lens |
|---|---|---|
| **Figma board (pre-build)** | `figma.com/design` / FigJam URL, or designer says board/frame | **Exploratory.** Heuristic + pattern + content. **Skip Design Harness `audit` DS/token/code checks** — there is no shipped code yet. Lab tone: cheap to change, “for next iteration / before build.” |
| **Built Design Harness prototype** | `#/playground/…`, `src/design-harness/pages/…`, named lab prototype in an active `projects/<slug>/`, or `http://localhost:…` serving Design Harness | **Full `audit`** when closing a build (Checks 1–5). Design-critique may also run for structure/copy. Lab tone unless they say it’s mirroring production. A localhost URL plus review/click-through → capture first via `live-page-review`, then this lens. |
| **Live production** | Production URL (`yourcompany.com`, app store build, “this is live”), or designer says shipped/prod | **Same judgment bar as a prototype for craft/patterns/content**, but **live-impact framing** (below). Do **not** run Design Harness DS/`audit` code checks on a screenshot alone — no repo files. A fetchable non-Figma URL plus review → **`live-page-review`** captures, then written critique via design-critique; use `audit` only if they also point at built lab code. |
| **External / competitor** | Named competitor (Airbnb, Dropbox, …), Mobbin, or clearly not our own product's UI | **Not** a house critique/`audit`. Match **`competitor-scan`** or **`benchmark`**. Flag mismatch — do not apply House rules to someone else’s product. |

**Obvious → proceed, no AskQuestion.** Figma link, Design Harness playground route, “audit Airbnb’s waitlist,” `yourcompany.com/…` in the chrome — classify and continue.

**Ambiguous → AskQuestion** (one question; don’t guess). Examples: crop with no URL that could be our own live product or a mock; UI that might be ours or a competitor’s; “audit this” with no context. Payload shape:

```json
{
  "title": "What is this artifact?",
  "questions": [{
    "id": "artifact_type",
    "prompt": "How should I treat this before reviewing?",
    "allow_multiple": false,
    "options": [
      { "id": "figma_prebuild", "label": "Figma / pre-build (exploratory)" },
      { "id": "design-harness", "label": "Design Harness prototype in this repo" },
      { "id": "live_prod", "label": "Live production (our own product)" },
      { "id": "external", "label": "Competitor / external reference" }
    ]
  }]
}
```

If `AskQuestion` is missing from the session, **plain-text degrade** per
`references/shared/ask-question-ui.md` (same `artifact_type` options in
chat) — **still do not guess** the artifact type while waiting. Do not tell
the designer to switch models.

---

## Competitor / external mismatch (when they said audit/critique)

If the ask is “audit / critique / review” but the artifact is clearly not
our own product's:

1. **Say so in the first sentence** — e.g. “This looks like **Airbnb**, not
   our own product — I shouldn’t run a house-standards critique on their product.”
2. **Ask** (AskQuestion when available): run **`competitor-scan`** / **`benchmark`**,
   or critique **our** equivalent screen instead, or Other…
3. **Do not** load our own tokens/`COMPANY-PATTERNS` critique against their UI
   as if it were ours.
4. **Do not** second-guess a request that already clearly matches
   `competitor-scan` / `benchmark` (“what does Airbnb do for waitlist”) —
   run that row silently.

---

## Framing: live production vs exploratory

| Artifact | Tone |
|---|---|
| **Live production** | Findings carry **real-user-impact** weight: this is currently live and affecting providers/clients. Prefer “fix / mitigate now” language over “consider for a future iteration.” Still use two-layer labels; still don’t invent blockers for judgment-only craft. |
| **Figma / pre-build** | **Exploratory / lab** tone — cheap to change; “before build,” “next pass.” Do not overcorrect to production urgency. |
| **Design Harness prototype** | Lab / pre-share tone (existing `audit` PASS/BLOCKED language). |

Wrong example (do not repeat): treating a live `yourcompany.com` referral landing
as a sandbox critique (“open questions for GTM”) without stating it is
**already shipping**.

---

## Holistic synthesis (required before itemized findings)

In **written** output for design-critique and `audit`, and in the **chat
summary** (and findings note) for `figma-ux-audit`, **before** the itemized
`[House:]` / `[UX Heuristic:]` / BLOCKING / ADVISORY lists:

1. **One short paragraph** — what an experienced designer notices first on a
   single look. Usually **one** primary problem, not five equal weights.
2. **Connect symptoms** — if multiple itemized findings share a root cause,
   name that connection here (e.g. dual-offer + hierarchy + twin primaries =
   one primary-intent story).
3. **Keep every itemized/labelled section underneath unchanged** — additive
   only. No generic filler; same specificity bar as labelled findings.

Heading: `### First look` (design-critique / audit) or a one-paragraph
lead-in titled **First look** before card placement summary
(`figma-ux-audit`).
