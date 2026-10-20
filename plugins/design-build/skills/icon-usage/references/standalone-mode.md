# Using this skill outside the Design Harness

This skill was written for the [Design Harness](https://github.com/marcopslopes/design-harness),
a full design workspace with routing, company context, and a prototype app.
In the Design Skills package it runs on its own. Some paths in the skill
point at Harness files your project may not have. Use this table when a
path doesn't exist.

| The skill mentions | When it's missing |
|---|---|
| `harness/ORCHESTRATOR.md`, routing rows, §2 / §3 / §4 | Skip routing. Do the work this skill describes. If the task needs another skill first, say which one and ask. |
| `harness/logs/…`, routing-log lines | Skip logging. |
| `designer-profile.local.md`, onboarding | Skip. Ask the user directly for anything the profile would have told you. |
| `COMPANY-*.md`, `context/org-pack/`, `context/org-pack.local/` | Look for the user's own product, brand, voice, or pattern docs in the project. If there are none, ask for the few facts the step needs. Label anything you assume. Never invent company facts. |
| `context/design-system/…`, `tokens.css`, `ds/` primitives | Use the project's own design tokens and components. If none exist, ask where they live before writing any styles. |
| `src/design-harness/…`, Design Harness pages or phone shell | Use the project's own app, prototype, or component folder. |
| `projects/<slug>/…` (`brief.md`, `findings.md`, `decisions.md`, `log.md`) | Write to the same file names in a folder the user picks. Suggest `design-work/<slug>/` if they don't mind. |
| `scripts/…`, `npm run …` Harness commands | Not included. Do the check by reading the files, and say the automated check was skipped. |
| `../<other-skill>/SKILL.md` | Another Design Skill. Use it if it's installed. If it isn't, finish this skill's part and name the other skill as a next step. |
| `references/shared/…`, `references/from-<skill>/…` | Bundled with this skill. Read them as the skill says. |

Harness-only gates, like required question buttons or a plan before
multi-skill work, are good practice here too. Use them when your tool
supports them. Don't block on them when it doesn't.
