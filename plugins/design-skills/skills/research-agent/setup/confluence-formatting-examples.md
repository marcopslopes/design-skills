# Confluence formatting examples (briefing pages)

Use this as a **copy-paste reference** for kickoff pages: **info blocks**, **lists**, **tables**, **status-style callouts**, and **metadata lines** — similar to what you see in the company discovery docs (bold labels, blue info panels, yellow warning panels, tables with grey headers, inline `code`, links).

**Two authoring paths**

| Path | When to use |
| --- | --- |
| **Markdown** | Working from `references/confluence-template.md` and pasting into Confluence’s markdown-capable editor, or for human-readable draft files. |
| **HTML fragment** | `createConfluencePage` / `updateConfluencePage` with `contentFormat: "html"`, or `npm run confluence:put-draft-body` — see [confluence-large-bodies.md](./confluence-large-bodies.md). |

Valid HTML for the API must follow **ADF nesting rules** (no block elements inside inline-only wrappers, etc.). When in doubt, keep structures **flat**: `p`, `h2`, `ul`/`ol`, `table`, macros/panels as siblings.

---

## 1 · Metadata lines (Owner, Status, Target)

**Markdown**

```markdown
**Owner:** Daniel Okafor (Engagement)  
**Co-lead:** Ines Varga (Payment Rails)  
**Status:** DISCOVERY IN PROGRESS  
**Target:** Q3 2026
```

**Tip:** In the **Confluence UI**, type `/status` to insert a real **status lozenge** (colour + label). In **HTML via API**, you can approximate emphasis with **bold** + caps, or use the **status macro** (see §8).

---

## 2 · Page note (blockquote) — top-of-doc “compact context”

The briefing template uses a **single short blockquote** for filing, scope, and link tips. Same idea as a light callout without a macro.

**Markdown**

```markdown
> **Page note** — Source of truth for checkout discovery; update as work moves.  
> **Scope** — Provider checkout only; out of scope: consumer payments app.  
> *File:* Draft in personal space — move under team parent when ready.  
> *Editing:* In edit mode, ⌘/Ctrl+click links to open in a new tab.
```

---

## 3 · Info panel (blue “i” block)

**In the Confluence UI:** Type `/info` and choose **Info**, then add bold labels and body text inside the panel.

**Markdown fallback** (no blue panel — use a blockquote so the agent/human draft still reads clearly before UI polish):

```markdown
> **Connectors required:** Slack · Atlassian — both must be enabled in **Settings → Connectors**.
```

For **API-uploaded** pages, use the **info macro HTML** in §8 so Confluence renders the real blue panel.

---

## 4 · Warning / note panel (yellow with caution icon)

**In the Confluence UI:** Type `/note` or `/warning`.

**Markdown-style content** (what goes inside the panel):

```markdown
**Data hygiene note:** Numbers above are from Ines’s doc dated Jan 23, 2026. Some figures may have evolved — verify before stakeholder materials. See [26W19 delivery review](https://your-org.atlassian.net/wiki/...) for updates.
```

---

## 5 · Headings, italics, links

**Markdown**

```markdown
## Ownership

_Sources: [Current State doc](https://...) for team split · org_map.md for people · checkout_context.md for PM/research contacts_
```

Use `##` / `###` for section titles to match the briefing scaffold (`## 1 · Header line`, etc.).

---

## 6 · Bullets and numbered lists

**Unordered**

```markdown
- First item with **bold** and a [link](https://example.com).
- Second item with inline `code` or `DT1` style keys.
- Third item — use an em dash for asides.
```

**Ordered** (e.g. “Get the skill” steps)

```markdown
1. Download `slack-feedback-scan.skill`.
2. In Cursor, open **Settings → MCP** and enable **Slack** and **Atlassian**.
3. Reload the workspace — the briefing skill reads `.cursor/agents.md`.
4. Nothing is published without your approval.
```

---

## 7 · Tables (grey header row)

**Markdown**

```markdown
| What | Required? | Tips |
| --- | --- | --- |
| Slack channel name + ID | REQUIRED | Right-click channel → **Copy link** for ID |
| Topic focus | REQUIRED | Be specific — `payment checkout` beats `payments` |
| Confluence space key | REQUIRED | From URL (e.g. `DT1`) |
| Market scope | RECOMMENDED | `US only` / `all markets` |
```

**In the Confluence UI:** `/table` — toggle **header row** for the grey style.

For **REQUIRED / RECOMMENDED** badges: use `/status` per cell, or bold + caps in markdown until you polish in the UI.

---

## 8 · HTML fragments — panels & status (API / `put-draft-body`)

Use these **inside** the HTML file you upload (no `<html>` / `<head>` wrapper; fragment only). Namespaces may be required depending on Confluence version — if the API rejects a fragment, paste once via the UI or simplify to `blockquote` / tables only.

**Info panel** (structured macro — storage-style)

```html
<ac:structured-macro ac:name="info" ac:schema-version="1">
  <ac:rich-text-body>
    <p><strong>Connectors required:</strong> Slack · Atlassian — both must be enabled.</p>
  </ac:rich-text-body>
</ac:structured-macro>
```

**Warning panel**

```html
<ac:structured-macro ac:name="warning" ac:schema-version="1">
  <ac:rich-text-body>
    <p><strong>Data hygiene note:</strong> Verify figures before stakeholder materials.</p>
  </ac:rich-text-body>
</ac:structured-macro>
```

**Note panel** (yellow “note” style in many themes)

```html
<ac:structured-macro ac:name="note" ac:schema-version="1">
  <ac:rich-text-body>
    <p>Numbers above are from Jan 23, 2026 — may have evolved.</p>
  </ac:rich-text-body>
</ac:structured-macro>
```

**Status lozenge** (example: yellow “in progress”)

```html
<ac:structured-macro ac:name="status" ac:schema-version="1">
  <ac:parameter ac:name="title">DISCOVERY IN PROGRESS</ac:parameter>
  <ac:parameter ac:name="colour">Yellow</ac:parameter>
</ac:structured-macro>
```

**Paragraph + list**

```html
<p>Claude reads the channel, categorises signals, and saves a structured <strong>draft</strong> Confluence page.</p>
<ol>
  <li>Download <code>skill.zip</code>.</li>
  <li>Open <strong>Settings → Connectors</strong>.</li>
  <li>Enable <strong>Slack</strong> and <strong>Atlassian</strong>.</li>
</ol>
```

**Table**

```html
<table>
  <tbody>
    <tr>
      <th>Area</th>
      <th>Owner</th>
      <th>Team</th>
    </tr>
    <tr>
      <td>E2E checkout experience</td>
      <td>Daniel Okafor</td>
      <td>Engagement / Core Product</td>
    </tr>
  </tbody>
</table>
```

---

## 9 · Quick slash commands (Confluence UI)

| You want | Type |
| --- | --- |
| Info panel | `/info` |
| Note / warning | `/note`, `/warning` |
| Status badge | `/status` |
| Table | `/table` |
| Code block | `/code` |
| Divider | `/divider` |

---

## 10 · See also

- [confluence-large-bodies.md](./confluence-large-bodies.md) — full HTML body, MCP vs REST.
- [`references/confluence-template.md`](../references/confluence-template.md) — required section order for kickoff drafts.
