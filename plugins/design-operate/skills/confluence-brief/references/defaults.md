# Confluence brief — defaults

## Space / parent

| Signal | Action |
|--------|--------|
| Folder URL `…/wiki/spaces/PDS/folder/<id>` | `spaceId: "PDS"` (or numeric from MCP), `parentId: "<id>"` |
| Page URL `…/wiki/spaces/PDS/pages/<id>/…` | Nest under that page as `parentId` |
| Space key only | Ask once for parent folder/page — don’t invent |
| No destination | Ask once (or `AskQuestion`): paste folder/page URL |

`createConfluencePage` accepts a space **key** (e.g. `PDS`) or numeric
space id; `parentId` may be a **folder** or **page**.

## Cloud

Prefer `cloudId` from `getAccessibleAtlassianResources`, or pass the site
host `your-org.atlassian.net` when the tool accepts it.

## Status after go

| Designer intent | `status` |
|-----------------|----------|
| Default team-facing page | `current` |
| Explicit “keep it draft / unpublished” | `draft` |

Different from `research-agent`, which defaults to **draft** PRD
scaffolds in **personal** space.

## Body format

Prefer `contentFormat: "markdown"` for lean pages. Switch to `html` only
if markdown tables/panels fail to render.

## Related team pages

Once you've used this a few times, useful recurring parent pages/folders
are worth noting here as a lookup table (title → page ID → what it's for)
— but do not hardcode blindly; confirm from the ask, and don't invent an
ID that isn't real. This repo ships with no such table checked in since
those IDs are always org-specific; add your own once you have them.

## After create

Return the `webui` URL:
`https://your-org.atlassian.net/wiki/spaces/<KEY>/pages/<id>/<slug>`
