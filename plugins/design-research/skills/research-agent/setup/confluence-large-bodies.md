# Confluence — rich briefings without shrinking content

Design discovery kickoff pages are **supposed to be dense**: many tables, links,
and evidence rows. Payloads of **~10–50k+ characters** (JSON or HTML) are normal.

**Do not** remove template sections, collapse tables, or drop sourced detail
**only** because the Atlassian MCP `updateConfluencePage` call is awkward in chat
or hits a tool/message ceiling. Instead, **change the delivery path** while
keeping the **same** synthesized content in the repo and on the page.

---

## Order of operations (agent)

1. **Compose the full briefing in the workspace first** — write or overwrite
   `drafts/_confluence-draft-<topic-slug>-body.md` (or `.html`) with the
   **complete** scaffold from `references/brief-template.md`:
   all `##` sections **1–17**, **section intros** (1–3 sentences) before each
   evidence table where the template requires them, placeholders where needed.
   **This file must match what readers should see in Confluence** — not a longer
   “shadow” draft than the page.
2. **Create or resolve the draft page** — `createConfluencePage` (minimal body is
   acceptable **only** as a shell) or reuse an existing `pageId`.
3. **Sync file → page (mandatory)** — run **`npm run confluence:put-draft-body`**
   with `CONFLUENCE_PAGE_ID` and `CONFLUENCE_BODY_FILE`. The script accepts
   **`.md`** (canonical briefing: converted with `marked` to HTML, then PUT as
   `body.storage`) or **`.html`** (pre-built storage-style fragment). That keeps
   Confluence aligned with the repo **without** shrinking content for MCP
   limits. Alternatively, MCP **`updateConfluencePage`** with `contentFormat:
   "markdown"` and the **entire** file works when the tool channel accepts the
   payload (~20–50k JSON is often fine); if it fails, use the npm script instead
   of publishing a “compact” page.
4. **If MCP fails** mid-sync: **do not** shrink the file in step 1. Fix transport
   (REST, paste fallback) until the Confluence body equals the workspace file.
5. **Optional retry:** after a successful REST sync, open the page in Confluence
   to confirm tables and intros rendered as expected.

**Anti-pattern:** publishing a “compact” Confluence version while a richer `.md`
lives only in the repo — readers will rightly ask why Confluence looks weaker.

---

## `npm run confluence:put-draft-body`

One-shot sync of a **local file** to an existing page’s **storage** HTML body.

### Prerequisites

- [Atlassian API token](https://id.atlassian.com/manage-profile/security/api-tokens)
  for your company account (same account that can edit the space).
- Page already exists (e.g. created as a **draft** in your **personal space** via
  MCP per `.cursor/agents.md`, or any space you chose); you have its **numeric
  page ID** from the Confluence URL or MCP.

### Environment

| Variable | Required | Description |
|----------|----------|-------------|
| `ATLASSIAN_EMAIL` | yes | Your Atlassian login email |
| `ATLASSIAN_API_TOKEN` | yes | API token (not your account password) |
| `CONFLUENCE_HOST` | no | Default `your-org.atlassian.net` |
| `CONFLUENCE_PAGE_ID` | yes* | Target page ID |
| `CONFLUENCE_BODY_FILE` | yes* | Path to **`.html`** (storage fragment) or **`.md`** (converted server-side with `marked`) |

\*You can pass `--page-id` and `--body-file` on the command line instead of env
vars (see script `--help`).

### Example

```bash
export ATLASSIAN_EMAIL='you@yourcompany.com'
export ATLASSIAN_API_TOKEN='your_token'
export CONFLUENCE_PAGE_ID='4708761726'
export CONFLUENCE_BODY_FILE='agents/research/_confluence-draft-packages-body.html'

npm run confluence:put-draft-body
```

Or explicit args:

```bash
npm run confluence:put-draft-body -- \
  --page-id 4708761726 \
  --body-file agents/research/_confluence-draft-packages-body.html
```

The script **GETs** the current page (for `version`, `title`, `space`, `status`),
then **PUTs** an incremented version with the file contents as `body.storage`.

### HTML notes

- **Markdown vs this REST script:** `confluence-put-page-body.mjs` PUTs
  **`body.storage`**. Paths ending in **`.md`** are converted with **`marked`**
  to HTML first (same family of output as `npx marked` on the briefing). Paths
  ending in **`.html`** are sent as-is. For native Confluence **markdown** body
  (editor parity), MCP **`updateConfluencePage`** with `contentFormat: "markdown"`
  and the full file is also fine when the payload fits the tool channel.
- Rich text patterns (info/warning panels, lists, tables, status macros): **[confluence-formatting-examples.md](./confluence-formatting-examples.md)**.
- Prefer the same **HTML fragment** style as the Atlassian MCP: no outer
  `<html>`, `<head>`, or `<body>` unless Confluence rejects the fragment (then
  try a single wrapper Confluence accepts).
- Very large pages may still hit **Confluence product** limits; that is rare for
  internal kickoffs. If it happens, split into a **parent + child pages** by
  **topic section** (IA change), not by deleting evidence from the narrative.

---

## Legacy reference

Some generated JSON in `agents/research/` may mention
`docs/setup/confluence-avoid-large-mcp-payloads.md`. That filename implied
“avoid” by shrinking; this doc **replaces** that idea: **avoid only the MCP
transport bottleneck**, not the briefing depth.
