---
name: org-pack-builder
description: >-
  Systematically builds `context/org-pack.local/` files (company context,
  domain vocabulary, voice, patterns, squads, archetypes) through three modes:
  MCP extraction (auto-populate from the team's tracker, docs tool, chat, and Figma), guided
  interview, or file upload. Includes domain mapping to capture terminology
  conflicts, bounded contexts, and the domain model that other skills depend on.
  Called automatically during onboarding when org-pack.local/ is missing, or
  explicitly when context needs updating.
---

# Org-pack builder

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

The org-pack is the **company knowledge foundation** that every skill in this
harness depends on — business context, domain vocabulary, voice rules, UX
patterns, team structure, and user archetypes. This skill builds
`context/org-pack.local/` (your real company content, gitignored) from scratch
or updates it when company context changes.

**Prevents: Generic SaaS output** — agents that don't know your product,
users, or terminology will guess, and the guess defaults to meaningless. A
`ux-pattern` critique without `COMPANY-VOCABULARY.md` can't tell you that
"appointment" vs "booking" is a live terminology conflict. A `design-kickoff`
without `COMPANY-ARCHETYPES.md` will invent user types.

**Confidence: SYSTEM-BUILDING — this skill creates the input layer for every
other skill. Test extracted content carefully before trusting it in
production work.**

**Layer 2 (domain mapping) debt** — historically, the harness had no dedicated
vocabulary/domain-mapping artifact or skill to build one. `COMPANY-VOICE.md`
included a small vocabulary table, but no systematic capture of domain
concepts, terminology conflicts, or bounded contexts (the "raw material" that
a conceptual model is built from). This skill closes
that gap by creating `COMPANY-VOCABULARY.md` as a first-class artifact and
systematically extracting it from company tools.

---

## When this fires

**Three paths:**

1. **Onboarding (automatic)** — `harness/designer-onboarding/SKILL.md` Step 3.5
   detects `context/org-pack.local/` is missing and offers to build it via
   `AskQuestion` (MCP extraction / manual setup / skip). If MCP extraction is
   chosen, this skill runs in **Mode B** (see below).
2. **Explicit request** — "build my org-pack", "map our domain", "extract
   company context" — matches `harness/ORCHESTRATOR.md` §2 `org-pack-builder`
   row. Ask which mode to use (MCP extraction / interview / file upload).
3. **Update request** — "refresh my vocabulary", "update company context" —
   same as #2, but preserves existing files and only replaces what's specified.

**Log to `harness/logs/routing-log.md`**: `MATCHED org-pack-builder | mode=X |
built=<files>`.

---

## Three modes

| Mode | When to use | Input source |
|------|-------------|--------------|
| **A. Guided interview** | Designer knows the context, wants to answer questions directly | Plain-text Q&A in chat |
| **B. MCP extraction (recommended)** | Team has a tracker, docs tool, chat, or Figma connected — auto-extract from real artifacts | MCP tool calls |
| **C. File upload** | Designer has existing docs (brand guidelines, wiki pages, glossaries) to import | Designer drops files, agent parses |

**Default (when called from onboarding):** Mode B (MCP extraction) if MCPs are
connected, else Mode A (interview).

**When explicitly called:** Ask which mode with `AskQuestion` unless the
request implies one ("extract from our tools" / "pull from Linear" → B, "I'll answer questions" → A,
"here's my brand guide" → C).

---

## Mode A: Guided interview

Step-by-step plain-text Q&A to build each file. Ask **one section at a time**,
not a giant form. Keep questions concrete and outcome-focused.

### Interview flow

**Before starting:** explain what's about to happen (6 files, ~10 minutes, can
defer any file). Offer to skip files that already exist in
`context/org-pack.local/` (update mode).

**1. COMPANY-BUSINESS.md** (5 questions)

a. "What does your product/company do? (1-2 sentences)" → **§ What [Product]
is**
b. "Who are your primary user types or customer segments?" → **§ User
segments**
c. "What are your 2-3 strategic pillars or product themes?" → **§ Strategic
pillars** (optional)
d. "Which product areas or features are most important to understand?" → **§
Key product areas**
e. "Anything designers should never assume about your product?" → **§ What
[Product] is not** + **§ Never do this**

Write to `context/org-pack.local/COMPANY-BUSINESS.md` following the structure
in `context/org-pack/COMPANY-BUSINESS.md` (Northline example) — same headers
(**Prevents** / **Confidence** / sections), replace facts.

**2. COMPANY-VOCABULARY.md** (NEW — Layer 2: domain mapping)

a. "What are the 10-15 most important domain terms in your product? (e.g.
'booking', 'provider', 'checkout')" → collect list
b. For each term: "How do you define [term]? Any alternate names or synonyms
people use?" → **§ Core vocabulary**
c. "Are there any terminology conflicts or naming debates?" (e.g. "appointment
vs booking") → **§ Terminology conflicts**
d. "Do any terms mean different things in different parts of the product?"
(bounded contexts) → **§ Bounded contexts**
e. "Any terms you're deprecating or want to avoid?" → **§ Deprecated terms**

Write to `context/org-pack.local/COMPANY-VOCABULARY.md` with this structure:

```markdown
# [Company] Domain Vocabulary

Domain terms, definitions, and terminology standards for [product]. Use when
writing copy, naming components, or resolving naming conflicts.

**Prevents: Terminology drift** — different terms for the same concept, or the
same term for different concepts.

**Confidence: [SOURCED/INFERRED] — [describe source]**

---

## Core vocabulary

| Term | Definition | Synonyms/alternates | Usage context |
|------|------------|---------------------|---------------|
| [term] | [definition] | [if any] | [where/when used] |

---

## Terminology conflicts

| Conflict | Options | Decision | Rationale |
|----------|---------|----------|-----------|
| [what] | [option A, option B] | [chosen term] | [why] |

---

## Bounded contexts

When a term means different things in different areas:

| Term | Context A meaning | Context B meaning | How to handle |
|------|-------------------|-------------------|---------------|
| [term] | [meaning 1] | [meaning 2] | [resolution] |

---

## Deprecated terms

| Old term | Use instead | Reason |
|----------|-------------|--------|
| [old] | [new] | [why changed] |

---

## Never do this

- Never use [term X] when you mean [term Y] — they have different meanings in [context]
- Never invent new synonyms for core domain terms without content team review
- Never assume a term's definition — check this file first
```

**3. COMPANY-VOICE.md** (4 questions)

a. "How would you describe your brand personality in 3-4 adjectives?" → **§
Brand personality**
b. "What are your 2-3 most important voice/tone rules?" → **§ Voice
principles**
c. "Any specific writing rules? (e.g. sentence case, no exclamation marks)" →
**§ Writing rules**
d. "Show me 2-3 examples of good vs. bad copy for your product." → **§
Do/Don't examples**

Write to `context/org-pack.local/COMPANY-VOICE.md` following Northline example
structure.

**4. COMPANY-PATTERNS.md** (3 questions)

a. "What UX patterns or flows show up repeatedly in your product?" → **§
Recurring patterns**
b. "What edge cases or failure modes appear across multiple features?" → **§
Common edge cases**
c. "Any domain-specific patterns that are unique to your product?" → **§
Domain-specific patterns**

Write to `context/org-pack.local/COMPANY-PATTERNS.md`.

**5. COMPANY-SQUADS.md** (2 questions)

a. "What are your product teams or squads, and what do they own?" → **§ Squad
structure**
b. "Who are the design leads or key stakeholders per squad?" → **§ Design
leadership**

Write to `context/org-pack.local/COMPANY-SQUADS.md` following the table
structure in `context/org-pack/COMPANY-SQUADS.md`.

**6. COMPANY-ARCHETYPES.md** (3 questions)

a. "Who are your 2-4 key user types?" → list
b. For each: "What are their goals, context, and pain points?" → **§
Archetypes**
c. "How do these user types differ in how they use your product?" → **§
Archetype behavior**

Write to `context/org-pack.local/COMPANY-ARCHETYPES.md`.

**7. COMPANY-SOURCES.md** (1 question)

"Any external research sources, competitive analysis docs, or strategy memos
that skills should reference?" → list with links

Write to `context/org-pack.local/COMPANY-SOURCES.md`.

---

### After interview completion

1. **Verify gitignore**: Run `git status --porcelain context/org-pack.local/`
   — must be empty. If files appear, stop and add `context/org-pack.local/` to
   `.gitignore`, then re-run check.
2. **Summary**: Show which files were created, which were skipped (already
   existed in update mode).
3. **What's next**: "Your org-pack is ready. All harness skills will now use
   your company context instead of the Northline example. You can edit these
   files anytime in `context/org-pack.local/`."

---

## Mode B: MCP extraction (recommended)

Auto-populate org-pack files by extracting domain knowledge from company tools.
**This is the primary mode called from onboarding.**

### Prerequisites

Check that required MCPs are connected via `GetDynamicTools`:

Jobs resolve to tools per `references/shared/work-tools.md` — tracker =
Jira, Linear, or GitHub Issues; docs = Confluence, Notion, or Google Docs;
chat = Slack or Teams.

| File to build | Needs (any one) | Fallback |
|---------------|-----------------|----------|
| COMPANY-BUSINESS.md | Tracker or docs | Interview (Mode A) |
| COMPANY-VOCABULARY.md | Tracker + Figma + chat (optional) | Interview (Mode A) |
| COMPANY-VOICE.md | Docs or chat | Interview (Mode A) |
| COMPANY-PATTERNS.md | Tracker + Figma | Interview (Mode A) |
| COMPANY-SQUADS.md | Tracker | Interview (Mode A) |
| COMPANY-ARCHETYPES.md | Tracker or docs | Interview (Mode A) |
| COMPANY-SOURCES.md | Docs | Interview (Mode A) |

If an MCP is missing, **degrade gracefully**: "I can't extract
[COMPANY-X.md] without [MCP] — want me to ask you questions for that file
instead, or skip it for now?"

**Never block the whole flow** because one MCP is missing — build what's
possible, offer interview fallback for the rest.

### Extraction flow

**Step 0: Check which MCPs are available**

1. Read `designer-profile.local.md` → `Work tools:` and `MCP tools:` lines
2. Extract only from the tools actually connected:
   - **Tracker** (Jira, Linear, or GitHub Issues) → extract from tickets
   - **Docs** (Confluence, Notion, or Google Docs) → extract from pages
   - **Figma** → extract from the design system
   - **Chat** (Slack or Teams) → extract from channels
3. If nothing is connected or the profile is missing → **decline MCP extraction**:

> "MCP extraction needs at least one connected tool — a tracker, a docs tool,
> chat, or Figma. Want me to ask you questions manually instead?" → Mode A (interview)

**Step 1: Authenticate available MCPs**

If called from onboarding, selected MCPs are already authenticated (Step 0b
passed). If called explicitly, check each available MCP's auth state via
`GetDynamicTools` → `namespaceStatus`. If `needsAuth`, call `mcp_auth` via
`CallDynamicTool` for that namespace.

**Step 2: Extract company context from available tools**

Run extraction in parallel via `scripts/extract-org-pack-from-mcps.mjs` (see
§ Extraction script below). This script:

1. **Tracker extraction** (Jira, Linear, or GitHub Issues)
   - Search epic / project descriptions, project overviews, custom fields for business
     context → `COMPANY-BUSINESS.md`
   - Extract domain terms from ticket titles, descriptions, labels →
     `COMPANY-VOCABULARY.md` (term frequency analysis + context)
   - Parse project / team / repo structure, components, assignees → `COMPANY-SQUADS.md`
   - Analyze bug reports for recurring edge cases → `COMPANY-PATTERNS.md`
   - Parse user story patterns for archetypes → `COMPANY-ARCHETYPES.md`

2. **Docs extraction** (Confluence, Notion, or Google Docs — if connected)
   - Search for: "glossary", "terminology", "vocabulary", "brand voice",
     "content guidelines", "style guide", "strategy", "OKRs", "about us"
   - Parse glossary pages → `COMPANY-VOCABULARY.md`
   - Parse voice/brand pages → `COMPANY-VOICE.md`
   - Parse strategy docs → `COMPANY-BUSINESS.md`
   - Index research sources → `COMPANY-SOURCES.md`

3. **Figma extraction** (if connected)
   - Search for design system files via `search_design_system`
   - Extract component names → `COMPANY-VOCABULARY.md` (UI terminology)
   - Analyze repeated component patterns → `COMPANY-PATTERNS.md`
   - Parse marketing page copy → `COMPANY-VOICE.md` (tone analysis)

4. **Chat extraction** (Slack or Teams — if connected, optional)
   - Analyze message tone in design/product channels → `COMPANY-VOICE.md`
   - Extract recurring domain terms from high-signal channels →
     `COMPANY-VOCABULARY.md`
   - Identify team structure from channels → `COMPANY-SQUADS.md`

**Step 3: Structure and write files**

Parse extraction results and write to `context/org-pack.local/COMPANY-*.md`
following the template structures from `context/org-pack/*.md` (Northline
examples).

**Confidence tagging**: Mark extracted content as `INFERRED` with source
attribution:

```markdown
**Confidence: INFERRED from 47 Linear issues, 12 Notion pages, 3 Figma
files (2026-08-28) — review and correct before trusting in production work.**
```

**Step 4: Show extraction summary**

Show which tools were used and what was skipped:

```
✓ Built org-pack.local/ from available tools

Extracted from:
- Tracker (Linear): 47 issues, 12 projects, 4 teams
- Figma: Acme Design System (120 components)
- Chat (Slack): 3 channels (tone analysis)

Skipped (not connected):
- Docs tool (glossary and strategy pages would improve vocabulary coverage)

Files created:
→ COMPANY-BUSINESS.md (business context from Linear projects)
→ COMPANY-VOCABULARY.md (89 domain terms from Linear + Figma)
→ COMPANY-VOICE.md (brand personality from Slack tone analysis)
→ COMPANY-PATTERNS.md (12 recurring UX patterns from Linear bugs + Figma)
→ COMPANY-SQUADS.md (team structure from Linear teams)
→ COMPANY-ARCHETYPES.md (4 user types from Linear user stories)
→ COMPANY-SOURCES.md (external sources from Linear/Slack links)

⚠️ These files are INFERRED from available tools — review them in
context/org-pack.local/ and correct any errors before using in production
work. Extraction is a starting point, not ground truth.
```

**Graceful degradation messaging:**
- If only 1 tool available → "Extracting from [tool] only — connecting
  additional tools would improve coverage."
- If 2-3 tools → "Good coverage from [tools] — a docs tool would add glossary
  and strategy context." (when no docs tool is connected)
- If every job is covered → "Complete extraction from all available sources."

**Step 5: Offer review**

"Want me to walk through any file to check if the extraction looks right, or
are you good to review them yourself later?"

- If yes → show each file's content for review, offer to fix errors
- If no → done

**Step 6: Verify gitignore**

Same as Mode A: `git status --porcelain context/org-pack.local/` must be
empty.

---

## Mode C: File upload

Designer drops existing docs (brand guidelines PDF, Notion export, Confluence or Google Docs
pages, glossary spreadsheet) and the agent parses them into org-pack files.

### Upload flow

**Step 1: Collect files**

"Drop your files (brand guidelines, glossaries, strategy docs, wiki exports)
and I'll parse them into the org-pack format."

Wait for designer to upload or paste file paths.

**Step 2: Parse and map**

For each file:
- PDF/Markdown: Extract sections via `Read` tool
- Spreadsheet: Parse tables (glossaries, vocabulary lists)
- Notion export: Parse markdown structure

Map content to org-pack files:
- Brand voice → `COMPANY-VOICE.md`
- Glossary/vocabulary → `COMPANY-VOCABULARY.md`
- Strategy docs → `COMPANY-BUSINESS.md`
- Team structure → `COMPANY-SQUADS.md`
- User research → `COMPANY-ARCHETYPES.md`
- Doesn't fit any of them → its own extra file with the `about:` /
  `use-when:` header (`references/shared/org-pack-extra-files.md`)

**Step 3: Write files**

Same structure as Mode A/B. Mark as:

```markdown
**Confidence: SOURCED from [filename] (uploaded 2026-08-28) — verify for
accuracy.**
```

**Step 4: Summary**

Show which files were created from which uploads. Offer review.

---

## Extraction script (`scripts/extract-org-pack-from-mcps.mjs`)

**Node.js script** that runs MCP extraction logic. Called from this skill via:

```javascript
Shell(`node scripts/extract-org-pack-from-mcps.mjs --mcps=<connected tools, e.g. linear,notion,figma,slack> --output=context/org-pack.local`)
```

**Script responsibilities:**

1. Authenticate MCPs (if needed)
2. Run parallel searches across the connected tracker, docs tool, Figma, and chat
3. Parse and structure findings
4. Write `COMPANY-*.md` files with proper formatting
5. Return summary stats (sources, terms extracted, files created)

**Error handling**: If a search fails (MCP timeout, auth expired), log the
error but continue with other sources. Never block the whole extraction
because one source failed.

**Deduplication**: If the same term appears in the tracker and the docs tool, merge
definitions and note both sources.

See `scripts/extract-org-pack-from-mcps.mjs` for implementation.

---

## Update mode

When `context/org-pack.local/` already exists and the designer wants to refresh
specific files:

1. Ask which files to update: "Which context files need updating?" →
   `AskQuestion` with checkboxes for each `COMPANY-*.md` file
2. For selected files, run the chosen mode (A/B/C) but only for those files
3. Preserve existing files that weren't selected
4. Show diff summary: "Updated COMPANY-VOCABULARY.md (added 12 new terms),
   COMPANY-VOICE.md (refreshed examples). Other files unchanged."

---

## Add a file

"Add this to the company pack" / "the harness should know this" + one doc
(paste, path, or attachment). Smaller than Mode C: one doc, one decision.

1. Read the doc. Decide whether it belongs inside a standard file (new terms
   → `COMPANY-VOCABULARY.md`, tone rules → `COMPANY-VOICE.md`, …) or stands
   on its own (pricing rules, locale tables, legal copy).
2. `AskQuestion` once — merge into `<file>` (Recommended when it fits) /
   save as new extra file `COMPANY-<TOPIC>.md` / Other. Never write before
   the answer.
3. **Merge:** append under the matching section, mark
   `Confidence: SOURCED from <doc> (added <date>)`, show what was added.
4. **New extra file:** write the `about:` / `use-when:` header from
   `references/shared/org-pack-extra-files.md`, propose the `use-when`
   words in the same `AskQuestion` (skills + topics that should pick it up),
   then the doc content. Never overwrite an existing file — pick another
   name or merge.
5. Always into `context/org-pack.local/` (create the folder if missing).
   Never `context/org-pack/`.

Log: `MATCHED org-pack-builder | mode=add | merged=<file>` or
`created=<file>`.

---

## Output checklist

Before marking this skill as complete:

- [ ] All requested `COMPANY-*.md` files exist in `context/org-pack.local/`
- [ ] Each file has **Prevents** / **Confidence** headers
- [ ] `git status --porcelain context/org-pack.local/` returns empty (gitignored)
- [ ] Confidence is marked correctly (SOURCED / INFERRED / EXAMPLE)
- [ ] Summary shown: which files created, from which sources
- [ ] Designer offered review opportunity (Mode B/C only)

---

## Self-improvement loop

After using this skill:

1. **Extraction quality**: Did MCP extraction produce usable domain vocabulary,
   or was it too noisy? Which source (tracker, docs, Figma, or chat) gave the best
   signal?
2. **Interview flow**: Did any question confuse the designer? Which file took
   the longest to build?
3. **Missing context**: Did a later skill fail because org-pack was missing a
   specific type of context? Add that to this skill's interview/extraction.

Log findings to `improvements.md`.

---

## What this skill does NOT do

- Does not edit `context/org-pack/` (public example) — only
  `context/org-pack.local/` (private, gitignored)
- Does not run automatically on every chat — only during onboarding (if
  org-pack missing) or explicit request
- Does not push to GitHub — org-pack.local/ is always gitignored
- Does not guarantee extracted content is correct — always marked INFERRED,
  requires designer review
- Does not replace content team — vocabulary and voice rules should be
  validated by content designers before locking

---

## Related skills

- `harness/designer-onboarding/SKILL.md` — calls this skill at Step 3.5 when
  org-pack is missing
- `../ux-pattern/SKILL.md` — uses `COMPANY-VOCABULARY.md` and
  `COMPANY-VOICE.md` for terminology and copy critique
- `../content/SKILL.md` — uses `COMPANY-VOICE.md` for voice/tone
  rules
- `../design-kickoff/SKILL.md` — uses `COMPANY-BUSINESS.md` and
  `COMPANY-ARCHETYPES.md` for project context
- `../research-agent/SKILL.md` — uses `COMPANY-ARCHETYPES.md` for
  user types

---

## Never do this

- Never write real company facts into `context/org-pack/` (public) — always
  `context/org-pack.local/` (gitignored)
- Never auto-run MCP extraction without the `AskQuestion` gate from onboarding
- Never trust extracted vocabulary as ground truth without designer review —
  mark as INFERRED
- Never block the whole org-pack build because one MCP is missing — degrade
  gracefully per file
- Never skip the gitignore verification check — real company data must never
  reach GitHub
