# Docs brief — defaults

## Which tool

Resolve per `references/shared/work-tools.md` § Step 1. A pasted URL
settles it: `…atlassian.net/wiki/…` → Confluence, `notion.so/…` → Notion,
`docs.google.com/…` or `drive.google.com/…` → Google Docs.

## Destination

| Tool | Signal | Action |
|------|--------|--------|
| **Confluence** | Folder URL `…/wiki/spaces/<KEY>/folder/<id>` | `spaceId: "<KEY>"` (or numeric from MCP), `parentId: "<id>"` |
| **Confluence** | Page URL `…/wiki/spaces/<KEY>/pages/<id>/…` | Nest under that page as `parentId` |
| **Confluence** | Space key only | Ask once for parent folder/page — don’t invent |
| **Notion** | Page URL | Create as a child page of it |
| **Notion** | Database URL | Create as a row; fill the title property, ask once about required properties |
| **Google Docs** | Folder URL | Create the doc in that folder |
| **Any** | No destination | Ask once (or `AskQuestion`): paste the folder/page URL |

Confluence: `createConfluencePage` accepts a space **key** or numeric space
id; `parentId` may be a **folder** or **page**. Get `cloudId` from
`getAccessibleAtlassianResources`, or pass the site host when the tool
accepts it.

## Status after go

| Designer intent | Confluence | Notion | Google Docs |
|-----------------|------------|--------|-------------|
| Default team-facing page | `status: current` | Create in the team location | Create in the shared folder |
| Explicit “keep it draft / unpublished” | `status: draft` | Create in their private section, move later | Create in their own Drive, share later |

Different from `research-agent`, which defaults to **draft** PRD
scaffolds in the **personal / private** space.

## Body format

Write Markdown. On Confluence prefer `contentFormat: "markdown"`; switch to
`html` only if tables/panels fail to render.

## Related team pages

Once you've used this a few times, useful recurring parent pages/folders
are worth recording in `COMPANY-SOURCES.md` § Destinations (title → URL →
what it's for) — but do not hardcode blindly; confirm from the ask, and
don't invent an ID that isn't real. This repo ships with no such table
checked in since those locations are always org-specific.

## After create

Return the page URL the tool gives back — never build one by hand.
