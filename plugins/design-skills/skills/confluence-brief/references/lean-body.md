# Lean Confluence brief body

Copy this structure into every draft. Keep it scannable — a engineering reader
should get the story in one screen, then expand only if they care.

```markdown
**Status:** Draft for engineering · **Owner:** [Name] · **Updated:** YYYY-MM-DD

**Tickets:** [DES-…] · [ENG-…]
**Figma / FigJam:** [link]

## The problem
[2–4 lines. What’s broken and for whom. Cite the metric/ticket if we have one.]

## What we have today
- [Live surface / current state]
- [Live surface / current state]

## What we’ve done so far
- [Dated milestone — design / research / tickets]
- [Dated milestone]
- [Dated milestone]

## Decisions & why
| Decision | Why |
|----------|-----|
| … | … |
| … | … |

## Ideas / next
- [Near-term]
- [Near-term]

## Park for later
| Parked | Why not now |
|--------|-------------|
| … | … |

## Links
- [Related Confluence / Figma / Jira]
```

Optional last line when a project folder exists:

```markdown
Details: `projects/<slug>/findings.md`
```

## Modes (same template, drop empty sections)

| Mode | Keep | Drop if empty |
|------|------|----------------|
| **Status brief** (default) | Problem · Have today · Done so far · Next · Links | — |
| **Why / decision brief** | Problem · Decisions & why · Park · Links | “Done so far” can be short |
| **Hybrid** (status + why) | All sections | — |

## Forbidden in the body

- Chat voice ("imo", "I think", "maybe we should")
- Meeting retellings, Trio notes, research dumps
- Full Mobbin / competitor catalogs (link out instead)
- Pasting entire `findings.md` sections
