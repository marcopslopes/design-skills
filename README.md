# Design Skills

69 design workflows for your AI agent: research, UX structure, content,
accessibility, building on a design system, review, and handoff. Install all of
them, or one workflow group.

The skills come from the [Design Harness](https://github.com/marcopslopes/design-harness), a full design
workspace with routing, company context, and a prototype app. This package is
the skills on their own. Browse them at [thedesignharness.com](https://thedesignharness.com/skills.html).

## Install

### Claude Code

```text
/plugin marketplace add marcopslopes/design-skills
/plugin install design-skills@design-skills
```

For one workflow group, install it instead, for example
`/plugin install design-research@design-skills`.

### Codex

```bash
codex plugin marketplace add marcopslopes/design-skills
```

Then open `/plugins`, pick the **Design Skills** marketplace, and install all
skills or one group. Start a new session to use them.

### Cursor, Codex, Claude Code, and other agents (skills CLI)

```bash
npx skills add marcopslopes/design-skills                          # choose skills interactively
npx skills add marcopslopes/design-skills --skill research-synthesis  # one skill
```

## Plugins

| Plugin | Workflow | Skills | Includes |
|---|---|---|---|
| `design-skills` | Design Skills | 69 | `accessibility`, `accessibility-decisions`, `adaptive-interfaces`, `assumption-mapper`, `audit`, `benchmark`, `case-study`, `cognitive-accessibility`, `competitor-scan`, `conceptual-model`, `confluence-brief`, `content`, `critique-prep`, `decision-first-research`, `deck-builder`, `design-debt-tracker`, `design-handoff`, `design-kickoff`, `design-memory`, `design-rationale`, `design-retrospective`, `design-system`, `designer-workload`, `diagnostic`, `figma-asset-sync`, `figma-code-sync`, `figma-effects-catalog`, `figma-library-manager`, `figma-token-sync`, `figma-ux-audit`, `harness-setup`, `ia-methods`, `icon-usage`, `insight-writer`, `inspiration-scouting`, `interaction-design`, `interface-change-review`, `live-page-review`, `manager-1on1-prep`, `mobile-shell`, `motion-choreography`, `okr-goal-setting`, `org-pack-builder`, `people-coaching`, `presenter`, `product-strategy`, `publish-project`, `research-agent`, `research-artifacts`, `research-question-sharpener`, `research-shareout`, `research-summary`, `research-synthesis`, `responsive-patterns`, `review-report`, `roadmap-prioritization`, `scheduling`, `screener-builder`, `session-handoff`, `stakeholder-alignment`, `synthetic-user-testing`, `taste-feedback`, `ticket-create`, `ui-agent`, `usability-test-guide`, `ux-pattern`, `workload-agent`, `workshop-whiteboard`, `writing` |
| `design-understand` | Understand the problem | 10 | `assumption-mapper`, `conceptual-model`, `decision-first-research`, `design-kickoff`, `diagnostic`, `okr-goal-setting`, `product-strategy`, `roadmap-prioritization`, `stakeholder-alignment`, `workload-agent` |
| `design-research` | Research and synthesize | 13 | `benchmark`, `competitor-scan`, `ia-methods`, `insight-writer`, `research-agent`, `research-artifacts`, `research-question-sharpener`, `research-shareout`, `research-summary`, `research-synthesis`, `screener-builder`, `usability-test-guide`, `workshop-whiteboard` |
| `design-shape` | Shape the experience | 8 | `accessibility-decisions`, `adaptive-interfaces`, `cognitive-accessibility`, `content`, `inspiration-scouting`, `interaction-design`, `motion-choreography`, `responsive-patterns` |
| `design-build` | Build and prototype | 9 | `design-system`, `figma-asset-sync`, `figma-code-sync`, `figma-effects-catalog`, `figma-library-manager`, `figma-token-sync`, `icon-usage`, `mobile-shell`, `ui-agent` |
| `design-review` | Review and validate | 9 | `accessibility`, `audit`, `critique-prep`, `figma-ux-audit`, `interface-change-review`, `live-page-review`, `synthetic-user-testing`, `taste-feedback`, `ux-pattern` |
| `design-handoff` | Explain and hand off | 6 | `deck-builder`, `design-handoff`, `design-rationale`, `review-report`, `session-handoff`, `writing` |
| `design-operate` | Run the design practice | 14 | `case-study`, `confluence-brief`, `design-debt-tracker`, `design-memory`, `design-retrospective`, `designer-workload`, `harness-setup`, `manager-1on1-prep`, `org-pack-builder`, `people-coaching`, `presenter`, `publish-project`, `scheduling`, `ticket-create` |

## Using a skill

Ask your agent for the task in plain words ("synthesize these interview notes"),
or name the skill. Each skill says what to bring and what it produces.

Some skills were built around Harness files: company context, a design-system
folder, project folders. Each skill ships `references/standalone-mode.md`,
which tells the agent what to use instead when those files aren't there. For
the complete setup, use the [Design Harness](https://github.com/marcopslopes/design-harness).

## Source

Generated from `harness/skills/` in the Design Harness by
`scripts/build-skills-package.mjs`. Edit skills there, not here.

Version 0.1.0. MIT licensed.
