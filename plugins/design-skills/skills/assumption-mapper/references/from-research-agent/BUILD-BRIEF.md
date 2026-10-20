# Project briefing — BUILD brief

Authoritative **headings, tables, and scaffold rules** for each output block live in
[`confluence-template.md`](./confluence-template.md).
**Workflow** and **Guardrails** live in [`agents.md`](./agents.md).

## Output structure

Items **not** listed below follow the template and `agents.md` unchanged.

### 9 · Recommendations _(from sources only)_ (template **§13**)

**Table columns (required):** `Action` · `Rationale` · `Owner` · `When` · **`Priority`**

- **Priority** — **High** / **Medium** / **Low** (severity / urgency for that row).
  **When** stays calendar or sequencing intent; do not collapse the two.
- **Always fill Priority** — even on thin source material: infer a conservative
  **Low** or **Medium** from what exists; do **not** default to `TBD`, leave the
  cell blank, or write vague non-ranks to dodge the call.
- **If a confident rank is impossible**, say so **in the Priority cell**, e.g.
  `Priority: unclear — source material doesn't support a confident call` (stated
  limitation on the **ranking**, not a blank column).

### 14 · Jira tickets _(this retrieval pass)_ (template **§14**)

**Table (required):** `Ticket` (markdown link — see `references/shared/source-links.md`) · `Summary` · `Status` · `Assignee` · `Team / squad`

- List **every** issue judged **relevant to the topic** during retrieval (after
  narrowing noisy JQL), **deduped by key** — a **scannable index**, not prose and
  **not** “only tickets already mentioned in §4–§10.”
- **Team / squad:** infer from **project**, **components**, **labels**, or Slack
  / programme context when Jira does not state a squad — mark **`(inferred)`** in
  the cell; never present a guess as a confirmed fact without that marking.

### 15 · Who's involved (template **§15**)

**Table (required):** `Name` · `Team / squad` · `Role / relation to topic` ·
`Most recent activity` · `Source`

- Same **`(inferred)`** discipline for **Team / squad** when not explicit in
  sources — answers “who do I go talk to,” not only “who was named once.”
