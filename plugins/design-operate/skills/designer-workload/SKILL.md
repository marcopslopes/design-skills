---
name: designer-workload
description: >-
  **Superseded by `workload-agent`** — use that for all workload and
  roadmap questions. This skill remains for backward-compatible triggers
  only; it delegates to `../workload-agent/SKILL.md` execution
  leg (`DES` query in `workload-agent/references/design-board.md`).
  Triggers on: "what's the design team's workload", "who's working on
  what", "check the DES board".
---

# Designer Workload — superseded

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

**Use `../workload-agent/SKILL.md` instead.** This file was kept
so older prompts and docs that name `designer-workload` still resolve.

For `DES`/`UXR` workload questions, run the execution leg from
`workload-agent/references/design-board.md` — queries both projects.

**2026-08-09 note:** this stub's own justification is now stale. Its
trigger phrases ("what's the design team's workload", "who's working on
what", "check the DES board") are already listed verbatim in
`workload-agent`'s own `ORCHESTRATOR.md` §2 row, and this file has never
had its own §2 row — nothing in the routing table can actually select it.
Two earlier audits (`docs/post-migration-audit.md`,
`docs/skill-naming-audit-2026-08-08.md`) explicitly decided to keep it as
intentional backward-compat, but that was before `workload-agent`'s row
absorbed the same phrases. Flagging rather than deleting unilaterally —
safe to delete next time this is touched, once confirmed nothing external
still names `designer-workload` directly.
