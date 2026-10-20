---
name: publish-project
description: >-
  On-demand publishing of a project's share pages to a public deploy URL —
  NOT the default behavior of any build/export step. Triggers on: "publish
  this project", "deploy this / make it public", "give me a share URL for
  [project]", "put this online". Copies the picked file(s) from
  `projects/<slug>/artifacts/decks/` (occasionally `artifacts/snapshots/` if
  named explicitly) into `public/projects/<slug>/`, fixing any sibling
  asset paths so the copy is self-contained, then confirms the resulting
  URL. Requires the project has already passed `audit` at least once —
  declines and points at `audit` first if not. Never auto-picks which
  artifact(s) to publish when more than one candidate exists; never
  auto-fires after `ui-agent`/`deck-builder` — publishing is always a
  separate, explicit ask.
---

# Publish project

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Turns a local `projects/<slug>/artifacts/` export into a public URL under
`public/projects/<slug>/` — the only folder Vite/nginx/Cloud Run actually
serve project share pages from. Everything under `projects/<slug>/` stays
local/sandbox by default (see `projects/README.md`); this skill is the one
explicit, opt-in bridge from that sandbox to a deployable public copy.

**Invoke in Cursor:** "publish this to a share URL", "deploy the settings-ia
case study", "make the entry-points board public"

**Never fires automatically.** Not after `ui-agent` finishes a build, not
after `deck-builder` saves a deck, not on an `audit` PASS. All three of
those stay local-only until the designer explicitly asks for this.

---

## Preconditions

1. **Resolve `<slug>`** from the conversation or the active `projects/`
   folder. If ambiguous, ask which project.
2. **Require a passed `audit`.** Check `findings.md`/`decisions.md` for a
   dated `audit` PASS entry on the artifact(s) being published. If none
   exists, decline plainly:

   > "This hasn't been through `audit` yet — publishing unaudited work to a
   > public URL skips the share gate. Want me to run `audit` first?"

   Do not publish BLOCKED work, ever.

## Steps

1. **Pick the file(s).** List what's in `projects/<slug>/artifacts/decks/`
   (and `artifacts/snapshots/` if the designer named a specific snapshot
   explicitly, e.g. "publish the entry-points board"). If there's exactly
   one obvious candidate, confirm it in one line rather than asking. If
   there are 2+ with no clear single pick, ask via `AskQuestion`
   (plain-text degrade per `references/shared/ask-question-ui.md` if the
   tool is absent) — options named by content ("Case study v10", "Workshop
   slides v3", "Stakeholder update"), never "Option A/B".
2. **Copy into `public/projects/<slug>/`** — same filename, same relative
   folder shape as the source (e.g. a `decks/navigation-ia/` sub-hub stays
   `public/projects/<slug>/navigation-ia/`). Create the destination folder
   if it doesn't exist yet.
3. **Fix internal links.** Any absolute path inside the copied HTML that
   pointed at another file in the same publish set (e.g.
   `href="/navigation_ia_prototypes.html"`) must be rewritten to the new
   `/projects/<slug>/...` location. Relative same-folder references (e.g.
   a deck's own sibling `.jpg`s) need no change — they moved together.
4. **Log.** One dated line in `projects/<slug>/log.md` ("published X to
   `public/projects/<slug>/`") and, if this is the project's first publish,
   a line in `decisions.md` noting the public URL now exists.
5. **State the result plainly** — the local path copied, the resulting
   `public/projects/<slug>/...` path, and the reminder below. Don't imply
   the site is live on the internet from this step alone.

## What this does *not* do

- **Does not deploy.** Copying into `public/` makes the file part of the
  next `npm run build` / container image — it does not push, build, or
  restart anything. If the designer wants it actually live, that's a
  separate infra step (see `Dockerfile` / the Terraform repo it references
  in its header comment), not owned by this skill.
- **Does not touch `artifacts/snapshots/` or `artifacts/qa/` by default.**
  Those stay local working copies — QA screenshots and raw prototype-state
  exports are not deliverables, even if they happen to be `.html`.
- **Does not re-run `audit`.** If the artifact changed since the last PASS,
  say so and offer to re-run `audit` before publishing the new version —
  don't silently publish over a stale PASS.

## Removing a public page

If asked to un-publish / take something down: delete the file(s) under
`public/projects/<slug>/`, log the removal the same way as a publish
(dated line in `log.md`), and note that a prior deploy may still be live
until the next build ships — this only affects the next build.
