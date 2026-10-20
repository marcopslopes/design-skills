# design-handoff — output template

Write this shape in chat and in `projects/<slug>/handoff-spec.md`.
Leave a section in only if the design has something to say; otherwise
keep the heading and write **Unknown — [who to ask]**.

Do not invent rows to look complete.

```markdown
> **DRAFT — validate before send.** Check every measurement, token,
> state, and edge case against the design. Do not forward this file
> to engineering until you have.

# Handoff spec: [Feature / screen name]
**Source:** [Figma URL / Design Harness route / screenshot set]
**Task:** `projects/<slug>/`
**Date:** YYYY-MM-DD
**Stack (if named):** [e.g. React + Foundations tokens]

## Overview
[2–4 sentences: what this screen/feature does *now*, who it is for,
the one job. Name who acts (user / system / API). Do not narrate
what this replaced — that is `decisions.md`. Company-aware only from
loaded sources. No invented metrics.]

## Layout
- Grid / column structure: […]
- Page / sheet / modal chrome: […]
- Responsive behavior: [what changes, or Unknown]

## Design tokens used

| Token | Role in this screen | Source |
|-------|---------------------|--------|
| `--…` | [CTA fill / heading / gap] | tokens.css / Figma variable |

Raw observed values that are not tokens:

| Value | Where | Note |
|-------|-------|------|
| [16px / #…] | [element] | `[NOT A TOKEN]` — promote or ask DS |

## Components

| Component | Variant | Props / content | Notes |
|-----------|---------|-----------------|-------|
| [Button / Input / …] | [primary / …] | [label, icon] | [special behavior] |

Use house / Foundations names when the design uses them. Do not
rename a custom control as a DS component it isn't.

## States and interactions

| Element | State | Behavior | Source |
|---------|-------|----------|--------|
| [CTA] | Default | […] | design / `interaction-design` |
| [CTA] | Hover / focus / disabled / loading / error / empty | […] or **Unknown** | |

If `interaction-design` already wrote a matrix in this task folder,
link it here and do not duplicate.

## Responsive behavior

| Width / condition | What changes |
|-------------------|--------------|
| Wide | [default] |
| Narrow | [stack / hide / priority] |
| 200% zoom | [reflow, or Unknown] |

Do not default "768 = tablet" unless the design or
`responsive-patterns` already said so.

## Edge cases

- **Empty:** […]
- **Long / translated text:** […]
- **Loading:** […]
- **Error:** […]
- **Many items:** […]
- **Missing data:** […]

## Motion

| Element | Trigger | Motion | Duration | Easing | Reduced motion |
|---------|---------|--------|----------|--------|----------------|
| […] | […] | […] or **Unknown** | | | |

If `motion-choreography` already wrote a spec, link it.

## Accessibility

- Focus order: […]
- Names / roles / labels: […]
- Keyboard: […]
- Contrast notes: […] (measure only if you have values)

If `accessibility-decisions` already recorded a pick, link the ADR.
Do not turn this section into a new ADR.

## Open questions
- [Anything an engineer would otherwise guess]
```
