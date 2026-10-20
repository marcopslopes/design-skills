<p align="center">
  <img src="assets/logo.png" alt="The Design Harness wizard" width="160">
</p>

<h1 align="center">Design Skills</h1>

<p align="center">
  69 design workflows for your AI agent. Free and open source.<br>
  Research a problem, shape the experience, build on your design system, and check the work before you share it.
</p>

<p align="center">
  <a href="https://thedesignharness.com/skills.html"><strong>Browse the skills</strong></a> ·
  <a href="#install">Install</a> ·
  <a href="https://github.com/marcopslopes/design-harness">The full Design Harness</a>
</p>

---

A skill is a written playbook your agent follows for one kind of design work.
It says what to bring, which steps to take, what to check, and what to hand back.
Instead of a fresh prompt every time, you get the same careful process every time.

These skills come from the [Design Harness](https://github.com/marcopslopes/design-harness),
a complete design workspace. This package is the skills on their own, ready to
drop into the agent you already use.

## What you can do

- **Frame the problem.** Separate what the team knows from what it assumes, define the product's objects before drawing screens, and turn a vague request into a decision brief.
- **Run research.** Write screeners and test guides, synthesize interviews into evidence-backed patterns, and write insights that pass a so-what check.
- **Shape the experience.** Spec interaction states, motion, responsive behaviour, and product copy, with accessibility built in.
- **Build on your design system.** Compose screens from your real tokens and components, and keep Figma and code in sync.
- **Review before you share.** Critique flows against UX patterns, check accessibility, and review live pages and Figma files.
- **Explain and hand off.** Document the rationale, write handoff specs, and turn findings into reports and decks.

## Install

Install all 69 skills, or one workflow plugin. Each plugin is listed in [the catalog](#the-skills) below.

### Claude Code

```text
/plugin marketplace add marcopslopes/design-skills
/plugin install design-skills@design-skills
```

For one workflow, install its plugin instead, for example `/plugin install design-research@design-skills`.

### Codex

```bash
codex plugin marketplace add marcopslopes/design-skills
```

Open `/plugins`, choose the **Design Skills** marketplace, and install the plugins you want. Start a new session to use them.

### Cursor and other agents

```bash
npx skills add marcopslopes/design-skills
```

The installer asks which agent you use. To add a single skill, name it:

```bash
npx skills add marcopslopes/design-skills --skill research-synthesis
```

## Try it

Ask for the work in plain words. Your agent picks the matching skill, or you can name it.

> Map the assumptions behind our new referral feature. Separate what we know from what we believe.

> Synthesize these six interview transcripts. Tag the evidence and show which patterns are strong enough to act on.

> Review this checkout flow against common UX patterns and flag anything that will confuse first-time users.

> Write the handoff spec for this settings screen: states, edge cases, and accessibility notes for engineering.

Each skill tells you what it needs. Most work best with your product context nearby: a brief, research notes, your design tokens, or the screens you're reviewing.

## The skills

### Understand the problem

Frame the problem before designing: assumptions, objects, decisions, strategy, and priorities. Install only this workflow: `design-understand@design-skills`.

| Skill | What it does |
|---|---|
| [`assumption-mapper`](plugins/design-skills/skills/assumption-mapper/SKILL.md) | Separate what the team knows from what it assumes before research or building begins. |
| [`conceptual-model`](plugins/design-skills/skills/conceptual-model/SKILL.md) | Define the product’s objects, relationships, states, and vocabulary before drawing screens. |
| [`decision-first-research`](plugins/design-skills/skills/decision-first-research/SKILL.md) | Turn a research request into a clear decision, the evidence it needs, and the smallest useful study. |
| [`design-kickoff`](plugins/design-skills/skills/design-kickoff/SKILL.md) | Turn a new request into a researched brief, with an approval step before building. |
| [`diagnostic`](plugins/design-skills/skills/diagnostic/SKILL.md) | Find the design bottleneck and decide which workflow to run next. |
| [`okr-goal-setting`](plugins/design-skills/skills/okr-goal-setting/SKILL.md) | Define a measurable design goal connected to a real business outcome. |
| [`product-strategy`](plugins/design-skills/skills/product-strategy/SKILL.md) | Connect user opportunities to business outcomes and solution bets with an opportunity solution tree. |
| [`roadmap-prioritization`](plugins/design-skills/skills/roadmap-prioritization/SKILL.md) | Rank design work using evidence, business goals, and an explicit effort appetite. |
| [`stakeholder-alignment`](plugins/design-skills/skills/stakeholder-alignment/SKILL.md) | Identify who needs to agree, what matters to them, and the decision to ask for. |
| [`workload-agent`](plugins/design-skills/skills/workload-agent/SKILL.md) | Check the live product roadmap and design workload from connected boards. |

### Research and synthesize

Plan, run, and synthesize research: screeners, test guides, synthesis, insights, and share-outs. Install only this workflow: `design-research@design-skills`.

| Skill | What it does |
|---|---|
| [`benchmark`](plugins/design-skills/skills/benchmark/SKILL.md) | Score your own flow against best-in-class examples and name the gaps worth closing. |
| [`competitor-scan`](plugins/design-skills/skills/competitor-scan/SKILL.md) | Find how one competitor handles a specific feature or flow. |
| [`ia-methods`](plugins/design-skills/skills/ia-methods/SKILL.md) | Plan and analyze card sorts and tree tests to check your information architecture. |
| [`insight-writer`](plugins/design-skills/skills/insight-writer/SKILL.md) | Turn research patterns into insights that explain why they matter and what to do next. |
| [`research-agent`](plugins/design-skills/skills/research-agent/SKILL.md) | Gather existing product knowledge and source evidence for a new design task. |
| [`research-artifacts`](plugins/design-skills/skills/research-artifacts/SKILL.md) | Build personas, journey maps, job stories, and service blueprints from real research. |
| [`research-question-sharpener`](plugins/design-skills/skills/research-question-sharpener/SKILL.md) | Rewrite vague research questions so they produce usable answers, and flag the ones research can’t answer. |
| [`research-shareout`](plugins/design-skills/skills/research-shareout/SKILL.md) | Plan how to share research so stakeholders engage and act on it. |
| [`research-summary`](plugins/design-skills/skills/research-summary/SKILL.md) | Summarize a research session or study so the team can see the findings and next steps. |
| [`research-synthesis`](plugins/design-skills/skills/research-synthesis/SKILL.md) | Turn interview notes and transcripts into tagged evidence and pattern candidates. |
| [`screener-builder`](plugins/design-skills/skills/screener-builder/SKILL.md) | Write a recruitment screener that selects participants by behaviour, not demographics. |
| [`usability-test-guide`](plugins/design-skills/skills/usability-test-guide/SKILL.md) | Prepare the tasks, questions, and measures for a usability test. |
| [`workshop-whiteboard`](plugins/design-skills/skills/workshop-whiteboard/SKILL.md) | Run a timed research-scoping board with your team, from problem to plan. |

### Shape the experience

Shape interaction, content, motion, accessibility, and responsive behaviour. Install only this workflow: `design-shape@design-skills`.

| Skill | What it does |
|---|---|
| [`accessibility-decisions`](plugins/design-skills/skills/accessibility-decisions/SKILL.md) | Record accessibility decisions and trade-offs, with handoff criteria engineering can build to. |
| [`adaptive-interfaces`](plugins/design-skills/skills/adaptive-interfaces/SKILL.md) | Spec how a screen responds to reduced motion, contrast, text size, and density preferences. |
| [`cognitive-accessibility`](plugins/design-skills/skills/cognitive-accessibility/SKILL.md) | Check mental load, wayfinding, memory demands, and decision complexity, beyond contrast and ARIA. |
| [`content`](plugins/design-skills/skills/content/SKILL.md) | Write and review interface copy against your product’s voice and terminology. |
| [`inspiration-scouting`](plugins/design-skills/skills/inspiration-scouting/SKILL.md) | Collect visual and interaction references, with what to take and what to leave from each. |
| [`interaction-design`](plugins/design-skills/skills/interaction-design/SKILL.md) | Specify component states and feedback across keyboard, touch, and screen readers. |
| [`motion-choreography`](plugins/design-skills/skills/motion-choreography/SKILL.md) | Spec, review, and plan purposeful animation, always with a reduced-motion alternative. |
| [`responsive-patterns`](plugins/design-skills/skills/responsive-patterns/SKILL.md) | Content-driven breakpoint strategy, reflow, priority shifting, and 200% zoom / WCAG 1.4.10 discipline for multi-width layouts. |

### Build and prototype

Build screens on real design tokens and components, and keep Figma and code in sync. Install only this workflow: `design-build@design-skills`.

| Skill | What it does |
|---|---|
| [`design-system`](plugins/design-skills/skills/design-system/SKILL.md) | Check whether a style value already exists as a token before anything is written. |
| [`figma-asset-sync`](plugins/design-skills/skills/figma-asset-sync/SKILL.md) | Download icons and images from Figma and package them for code. |
| [`figma-code-sync`](plugins/design-skills/skills/figma-code-sync/SKILL.md) | Map Figma components to their code counterparts using Code Connect. |
| [`figma-effects-catalog`](plugins/design-skills/skills/figma-effects-catalog/SKILL.md) | Document the custom shader effects and fills used in your Figma files. |
| [`figma-library-manager`](plugins/design-skills/skills/figma-library-manager/SKILL.md) | Find existing library components before creating new ones in Figma. |
| [`figma-token-sync`](plugins/design-skills/skills/figma-token-sync/SKILL.md) | Find drift between Figma variables and your code tokens, and sync them in either direction. |
| [`icon-usage`](plugins/design-skills/skills/icon-usage/SKILL.md) | Use icons from your icon library through one component, never hand-drawn SVG. |
| [`mobile-shell`](plugins/design-skills/skills/mobile-shell/SKILL.md) | Keep phone-frame prototypes consistent: status bar, navigation, tab bar, and sheets. |
| [`ui-agent`](plugins/design-skills/skills/ui-agent/SKILL.md) | Build a screen using your product’s design tokens and shared components. |

### Review and validate

Critique and check work before sharing: UX patterns, accessibility, live pages, and audits. Install only this workflow: `design-review@design-skills`.

| Skill | What it does |
|---|---|
| [`accessibility`](plugins/design-skills/skills/accessibility/SKILL.md) | Check semantics, labels, contrast, keyboard access, and focus before sharing. |
| [`audit`](plugins/design-skills/skills/audit/SKILL.md) | Check a prototype’s design system, accessibility, and copy before sharing. |
| [`critique-prep`](plugins/design-skills/skills/critique-prep/SKILL.md) | Write a presenter script for a design critique: framing, walk order, and the feedback you want. |
| [`figma-ux-audit`](plugins/design-skills/skills/figma-ux-audit/SKILL.md) | Audit a Figma page and place colour-coded annotation cards next to each screen. |
| [`interface-change-review`](plugins/design-skills/skills/interface-change-review/SKILL.md) | Review only the UI you changed, and separate new issues from regressions and old ones. |
| [`live-page-review`](plugins/design-skills/skills/live-page-review/SKILL.md) | Capture a live page and route its evidence into the right review workflow. |
| [`synthetic-user-testing`](plugins/design-skills/skills/synthetic-user-testing/SKILL.md) | Walk a prototype through key tasks as named personas to find friction before real testing. |
| [`taste-feedback`](plugins/design-skills/skills/taste-feedback/SKILL.md) | Check visual density, weight, and hierarchy mid-build, before a full critique. |
| [`ux-pattern`](plugins/design-skills/skills/ux-pattern/SKILL.md) | Review a flow’s structure against how your product works, not just how it looks. |

### Explain and hand off

Explain decisions and hand work off: rationale, handoff specs, reports, decks, and writing. Install only this workflow: `design-handoff@design-skills`.

| Skill | What it does |
|---|---|
| [`deck-builder`](plugins/design-skills/skills/deck-builder/SKILL.md) | Turn finished findings into a presentation deck, using only evidence from the project. |
| [`design-handoff`](plugins/design-skills/skills/design-handoff/SKILL.md) | Capture layout, components, states, and edge cases in a draft engineering spec. |
| [`design-rationale`](plugins/design-skills/skills/design-rationale/SKILL.md) | Record the options, evidence, and tradeoffs behind a design decision. |
| [`review-report`](plugins/design-skills/skills/review-report/SKILL.md) | Turn a finished design critique into a readable HTML report. |
| [`session-handoff`](plugins/design-skills/skills/session-handoff/SKILL.md) | Save the decisions and open questions so the next agent session can continue. |
| [`writing`](plugins/design-skills/skills/writing/SKILL.md) | Write long-form pieces such as articles, essays, and case-study write-ups, with every claim sourced. |

### Run the design practice

Run the practice around the work: setup, memory, debt, scheduling, tickets, and team coaching. Install only this workflow: `design-operate@design-skills`.

| Skill | What it does |
|---|---|
| [`case-study`](plugins/design-skills/skills/case-study/SKILL.md) | Write a project case study from its brief, findings, and decisions, with every claim sourced. |
| [`confluence-brief`](plugins/design-skills/skills/confluence-brief/SKILL.md) | Draft a short status or decision brief as a Confluence page. |
| [`design-debt-tracker`](plugins/design-skills/skills/design-debt-tracker/SKILL.md) | Standalone triage and review of the per-project design debt register (projects/&lt;slug&gt;/debt.md). |
| [`design-memory`](plugins/design-skills/skills/design-memory/SKILL.md) | Keep a private record of how you tend to design across projects. |
| [`design-retrospective`](plugins/design-skills/skills/design-retrospective/SKILL.md) | Reflect on a shipped project: what worked, what didn’t, and what to carry forward. |
| [`designer-workload`](plugins/design-skills/skills/designer-workload/SKILL.md) | Older version of workload-agent, kept for compatibility. Use workload-agent instead. |
| [`harness-setup`](plugins/design-skills/skills/harness-setup/SKILL.md) | Bring in your design system, brand guidelines, and company context, or start from the examples. |
| [`manager-1on1-prep`](plugins/design-skills/skills/manager-1on1-prep/SKILL.md) | Prepare a 1:1 with a direct report from their live work and recent updates. |
| [`org-pack-builder`](plugins/design-skills/skills/org-pack-builder/SKILL.md) | Gather your company context, vocabulary, voice, and patterns into files your agent can read. |
| [`people-coaching`](plugins/design-skills/skills/people-coaching/SKILL.md) | Prepare feedback, a difficult conversation, or a growth plan for someone you manage. |
| [`presenter`](plugins/design-skills/skills/presenter/SKILL.md) | Choose how to show built screens to a reviewer, then set up that view. |
| [`publish-project`](plugins/design-skills/skills/publish-project/SKILL.md) | Publish a project’s share pages to a public link when you choose to. |
| [`scheduling`](plugins/design-skills/skills/scheduling/SKILL.md) | Find a meeting slot and draft the invite with real context from the project. |
| [`ticket-create`](plugins/design-skills/skills/ticket-create/SKILL.md) | On-demand Jira ticket drafting and creation. |

## Using the skills without the Harness

Some skills were written around Harness files: company context, a design-system
folder, a project folder for findings and decisions. Every skill ships a short
`references/standalone-mode.md` that tells the agent what to use instead when
those files aren't in your project. Usually that means your own design system, a
folder you pick for the work, or a few questions for you.

When you want the whole setup, with routing between skills, company context, and
a prototype app, use the [Design Harness](https://github.com/marcopslopes/design-harness).

## Feedback

This is an early release. Tell me what worked, what broke, and which workflow you
wish existed.

- [Report an issue](https://github.com/marcopslopes/design-skills/issues)
- [The Design Harness site](https://thedesignharness.com)

The skills are generated from `harness/skills/` in the Design Harness. To change
a skill, open an issue or a pull request there.

Created by **[Marco Paulo Lopes](https://github.com/marcopslopes)**. Version 0.1.0.

## License

[MIT](LICENSE). Fork it, adapt it, share it.
