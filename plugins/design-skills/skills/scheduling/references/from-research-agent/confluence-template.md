# Design discovery kickoff — Confluence draft (PRD scaffold)

Use this structure for every **draft** page the agent creates. The goal is a
**design discovery / kickoff PRD**: enough structure that a designer can walk
into a workshop with a single page — **filled where sources exist**, **blank
slots where they do not** — instead of a ticket index or status-only scan.

**Readable kickoff, not a spreadsheet dump:** each major section leads with a
**short editorial intro** (storytelling / framing), **then** tables and bullets
for evidence. Intros stay tight (about **40–120 words** per section unless the
topic demands more) — they explain *why the section matters* and *how to read
what follows*, without inventing facts that are not sourced below.

**Never publish** without user confirmation.

---

## Scaffold rules (non-negotiable)

1. **Keep every `##` section below** (header line through appendix, **1–17**)
   in the draft, in this order. **Do not delete or renumber headings** because a
   subsection is empty.
2. When sources have **nothing** for a section, **leave the body intentionally
   sparse**: keep the heading, keep the table **column headers**, add **one
   placeholder row** (empty cells or `—`) and a single italic line such as
   `_(Fill in during discovery — no sources found in this pass.)_` or
   `_(Paste link to dashboard / deck / owner.)_`. Never invent metrics or quotes.
3. When sources are **partial**, fill rows you can cite; leave additional
   placeholder rows for the designer to extend.
4. **Insight over catalogue** — but a visible empty slot is more useful than
   skipping the topic entirely.
5. **Top page note** — Put purpose, scope, Confluence **filing** (personal space
   key or team override + “move if needed”), and the “how to open links while
   editing” hint **only** in the **§1 blockquote** (compact). There is **no
   separate “what this page is” section** — that prose belongs in the page note,
   not as an extra heading.
6. **Section intro before every evidence table (required)** — For **§4–§10**,
   **§12–§16**, and **§11** when not skipped: immediately after the `##` heading,
   write **1–3 sentences of prose** *before* the first table in that section.
   The intro **frames** the table (what the reader should take away, how rows
   relate, any caveat such as “Slack-heavy until Jira epic list is attached”).
   **Do not** jump straight from the heading to a table. **§2** may use **0–1**
   sentence only (“Quick programme snapshot.”) before the header table. **§3**
   is already prose-first. **§17** starts with **1–2 sentences** on how to use the
   appendix, then grouped link lists.

---

## 1 · Header line

**Title line (required)** — exactly one line:

`Topic: [Topic] · Design discovery kickoff (draft) · [YYYY-MM-DD] · Sources scanned: Confluence · Jira · Slack [· Miro if used] [· Google Docs/Drive if opened/read] [· Figma if used] [· Web if competitor benchmark]`

**Page note (required)** — immediately under the title line, use **one Markdown blockquote** (lines starting with `>`) for *small, top-of-page* context: what the doc is, in/out scope, filing line, link-editing tip. Keep **≤5 lines** total.

Keep the whole blockquote **short**, for example:

- **What this is** — one sentence: kickoff PRD scaffold from internal sources; blanks are intentional.
- **In / out** — one clause if scope is clear (e.g. “US Nails onboarding only — not consumer HR onboarding”).
- **File** — one italic line: e.g. *File:* Draft in **personal space** `~7120…`
  (agent default) — move under a team parent if needed. If the user overrode
  placement, say so (e.g. parent `4643487752`, space DT1).
- **Confluence UX** — one line: editing vs ⌘/Ctrl+click / open in new tab for links.

Example shape (each line of the draft starts with `>`):

> **Page note** — Starting-point discovery PRD from Confluence, Jira, Slack; gaps are workshop fill-ins.  
> **Scope** — [one line in / out].  
> *File:* Draft in **personal Confluence space** `~7120…` (agent default) — move under a team parent if needed.  
> *Editing:* In Confluence **edit** mode, ⌘/Ctrl+click links (or **Open in new tab**) — normal click often selects the link.

---

## 2 · Discovery kickoff header _(fill blanks if unknown)_

_(Optional one line:)_ One-line snapshot of who owns the kickoff and which surface is in scope — then the table.

| Field | Value |
| --- | --- |
| Product / surface |  |
| Team / squad |  |
| PM |  |
| Design lead |  |
| Eng lead _(if known)_ |  |
| Primary market / segment |  |
| Target milestone / phase |  |

---

## 3 · Executive summary

3–4 sentences:

- Where things stand today
- The single biggest open question
- One concrete next step for discovery or alignment
- **Confidence:** **High** / **Medium** / **Low** for the *whole* page (sources
  density + recency + conflicts)

---

## 4 · The opportunity

**Section intro (required)** — Why this initiative matters for the company *right now*
(1–3 sentences): the gap or upside the sources agree on; who benefits; no
numbers here unless they repeat in the table with full attribution.

| Dimension | What we know | Source |
| --- | --- | --- |
|  |  |  |

_(If empty: one placeholder row + italic “Fill in — no opportunity framing found in sources.”)_

---

## 5 · Problem statement _(for kickoff)_

**Section intro (required)** — One or two sentences that **name the pain in plain
language** (provider / business outcome), still evidence-bound.

Then one tight paragraph or bullet list: what is broken for users or the business,
**only from evidence** in sources. If none: heading stays +

`_(Fill in — no single problem statement found; pull from research or PM brief.)_`

---

## 6 · Target users & jobs to be done

**Section intro (required)** — Who we are designing for in this kickoff and why
their JTBD matters for **this topic** (1–3 sentences).

One subsection per user type when known. Template per type:

**[User type]**

- **Job to be done:**  
- **Behaviour to change:**  
- **What they need:**  
- **Source:**  

If no users found: keep one block with all bullets empty or `—` and the italic
fill-in line.

---

## 7 · Data & BI we know

**Section intro (required)** — What we measured, over what period, and how
confident we are in the pipeline (1–3 sentences). Call out if metrics were
historically unreliable.

**Every number needs a named source and date.** Conflicting sources → two rows +
note in Notes.

| Metric | Value | Source | Date | Notes |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

_(If empty: placeholder row + “Fill in — link dashboard / query / owner.”)_

---

## 8 · User research insights

**Section intro (required)** — Which studies or channels shaped this section and
the **main behavioural story** they tell (1–3 sentences).

Actual findings (not just study titles). Quote lightly when the source supports
it. Prefer a **Link** column when pasting into Confluence so rows stay scannable.

| Artifact | Type | Who / when | Key findings | Link |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

_(If empty: placeholder row + “Fill in — paste study links or Miro summary.”)_

---

## 9 · Design insights & exploration

**Section intro (required)** — Where design is converging vs still exploring
(1–3 sentences); point to Figma/Miro when they anchor the narrative.

Decisions, hypotheses, Figma / FigJam links, what is validated vs open.

| Surface / decision | Status | Insight or rationale | Link |
| --- | --- | --- | --- |
|  |  |  |  |

_(If empty: placeholder row + “Fill in — link Figma / crit notes.”)_

---

## 10 · Current state — delivery & confirmed problems

**Section intro (required)** — One short paragraph on **what is in flight** vs
**what is broken with proof** (2–4 sentences total across this §10 intro only;
subsections below stay structured).

### 10a · Active work

| Theme | Status | Owner | Source |
| --- | --- | --- | --- |
|  |  |  |  |

### 10b · Confirmed problems _(evidence-based)_

| Problem | Evidence | Source |
| --- | --- | --- |
|  |  |  |

_(If 10b empty: placeholder row + “Fill in — link support theme, research quote, or metric.”)_

---

## 11 · Competitive / market context _(optional)_

**Only when** the user asked for external benchmark **or** sources already
contain a benchmark section:

**Section intro (required)** — Why these comparators matter for the company’s choices
(1–2 sentences), then the table.

| Product | Pattern | Relevance | Link |
| --- | --- | --- | --- |
|  |  |  |  |

**Otherwise** keep the heading and write only (no intro, no table):

`_(Skipped — not requested. Add competitor rows in kickoff if needed.)_`

## 12 · Open questions & decisions _(kickoff board)_

**Section intro (required)** — The **one theme** the team must decide in the next
workshop (1–2 sentences); the table expands into explicit questions.

| Question | Owner | Status | Source |
| --- | --- | --- | --- |
|  |  |  |  |

_(If empty: placeholder row + “Fill in — workshop parking lot.”)_

---

## 13 · Recommendations _(from sources only)_

**Section intro (required)** — How to use this list (e.g. “sequenced by
dependency”) in 1–2 sentences — still **only** actions grounded in sources.

**Priority column (required):** Every row **must** include a **Priority** cell
(**High** / **Medium** / **Low**) — severity / urgency for the recommendation,
distinct from **When** (timing or sequencing). **Do not** leave Priority blank,
default to `TBD`, or use vague placeholders to avoid ranking: **attempt** High /
Medium / Low even when sources are thin (weak evidence → conservative **Low** or
**Medium**, not an empty cell). If ranking confidence is genuinely too low, state
that **in the Priority cell**, e.g. `Priority: unclear — source material doesn't
support a confident call` — never omit the column.

| Action | Rationale | Owner | When | Priority |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

_(If empty: placeholder row + “Fill in after kickoff.”)_

---

## 14 · Jira tickets _(this retrieval pass)_

**Section intro (required)** — This block is the **scannable Jira index** for the
topic: **every** issue judged **relevant** during discovery (narrowed JQL,
linked epics/children, and tickets surfaced in Confluence/Slack), **deduped by
key** — not a prose summary, not “only tickets already quoted above,” and not a
random subset. If Jira returned nothing relevant after retries, keep the heading
and one placeholder row + italic fill-in.

**Team / squad column (honesty):** When Jira does **not** state a squad explicitly,
**infer** from **project name or key**, **components**, **labels**, or **known
Slack / programme context** — and mark the cell so readers know, e.g.
`Marketing [MKT] (inferred from project)` or `— (inferred from component: …)`.
Never present an inference as a confirmed org fact without that marking.

| Ticket | Summary | Status | Assignee | Team / squad |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

_(If empty: placeholder row + “No Jira issues matched this topic after search — paste programme filter or epic.”)_

---

## 15 · Who's involved

**Section intro (required)** — Who to **talk to** (not only who was mentioned once):
core vs extended, and how to read the **team / squad** column vs Jira §14.

**Team / squad (honesty):** Same inference rules as **§14** — when not explicit in
sources, infer from project/components/labels/channel context and suffix
`(inferred)` in the cell.

| Name | Team / squad | Role / relation to topic | Most recent activity | Source |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

---

## 16 · Conflicts, staleness, or data gaps

**Section intro (required)** — How to read contradictions or thin legs (1–2
sentences): e.g. “Slack is rich; Jira needs epic-scoped second pass.”

If nothing: keep heading + one row:

| Topic | Conflict / gap | Preferred source (recency) | Notes |
| --- | --- | --- | --- |
| — | No conflicts flagged in this pass | — | — |

If something was found, replace with real rows.

---

## 17 · Appendix — relevant links

**Section intro (required)** — What to open first (1–2 sentences); then grouped
lists.

Grouped: **Confluence** · **Jira** · **Slack** · **Figma** · **Other**. Note
searches that returned thin noise (helps the next pass).
