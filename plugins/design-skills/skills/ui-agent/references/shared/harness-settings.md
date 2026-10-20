# Harness settings — harness behaviour switches

The designer sets these in Design Harness → **Settings** (`#/settings`, only while
`npm run dev` is running). They're saved to `harness.config.local.json` at the
repo root. The file is gitignored and personal to each clone, like
`designer-profile.local.md`.

**Read the file before deciding any behaviour below.** If the file or a key is
missing, use the default, which is how the harness behaved before settings
existed. Never create or edit the file from a skill unless the designer asks;
the Settings page owns it.

| Key | Default | What it changes |
|-----|---------|-----------------|
| `behaviour.audit` | `after-builds` | `after-builds`: full builds close with `audit`, micro-edits defer it (`references/shared/micro-edit-lane.md`). `on-share`: every build defers `audit` until the designer says share / ready / "before I send this" / "push this", or asks for it. The 3-stacked-micro-edits trigger still applies. |
| `behaviour.storyboardOffer` | `true` | Shown as "Build a storyboard". `true`: `ui-agent` Step 6.5 builds the storyboard after a new phone screen. `false`: ask once first (yes / not now). A direct ask still builds one. |
| `behaviour.caseStudyDraft` | `true` | Shown as "Write the case study". `true`: `ui-agent` Step 6.6 writes `case-study.md` once a project's `decisions.md` holds a chosen direction. `false`: ask once first (write it / not now). A direct ask still writes one. |
| `behaviour.variantForks` | `true` | `false`: at `ui-agent` Step 3.5, don't build variants. Ask **one** `AskQuestion` naming the structural choice, then build only the pick. Still log the choice and the rejected option to `decisions.md`. An explicit "show me options" still forks. |
| `behaviour.tasteCheckpoint` | `true` | `false`: skip `ui-agent` Step 5.5 (mid-build taste checkpoint). An explicit "taste check this" still routes to `taste-feedback`. |
| `behaviour.handoffNudge` | `true` | `false`: don't add the session-length handoff line (`harness/ORCHESTRATOR.md` §5). `session-handoff` still runs on request. |
| `harness.name`, `harness.tagline`, `harness.defaultTheme` | `Design Harness`, the home line, `dark` | Design Harness app only (home page, rail, first-visit theme). No effect on skills. |

A setting never overrides a hard rule: tokens only, `ds` composition, the plan
gate for multi-skill chains, routing logs, or `audit` before anything is
actually shared.

The profile fields on the same page (name, role, squad, platform, experience
level) are the existing lines in `designer-profile.local.md`. Nothing new to
read there.

**Replace with yours** on a system's Context page (any `COMPANY-*.md`, or the
content skill's style guide, vocabulary and localization examples) uses the
same endpoint. It writes only to `context/org-pack.local/COMPANY-<TOPIC>.md`,
refuses when there's no local pack yet (one file alone would be a partial
pack, §0a), and copies the old file to `context/org-pack.local/.backups/`
first. Skills never read `.backups/`. Local pack files are read through the
endpoint, never bundled into a build.

Code: `scripts/harness-settings-plugin.ts` (dev endpoint `/__harness/settings`),
`src/design-harness/harnessSettings.ts` (app defaults), `src/design-harness/pages/SettingsPage.tsx`,
`src/design-harness/components/DocToolbar.tsx`, `src/design-harness/docFiles.ts`.
