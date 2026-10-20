# HOWTO: Use org-pack-builder to auto-build company context

**Skill:** `SKILL.md`

**What it does:** Builds `context/org-pack.local/` (your company's real
context) from scratch via three modes: MCP extraction (auto-extract from
your tracker, docs tool, chat, and Figma — recommended), guided interview, or file upload.
Includes **COMPANY-VOCABULARY.md** (domain mapping), which was historically
missing from the harness.

**When to use:**

- **Onboarding (automatic):** When `context/org-pack.local/` doesn't exist,
  onboarding offers to build it via `AskQuestion` at Step 3.5 (after handoff)
- **Explicit request:** "build org-pack", "map our domain", "extract company
  context", "refresh vocabulary"
- **Update mode:** When company context changes (new terminology, voice
  updates, squad changes)

---

## Quick start: MCP extraction (recommended)

**Fastest path — extracts from tools you already use:**

1. Connect the tools your team uses — a tracker (Jira, Linear, or GitHub),
   a docs tool (Confluence, Notion, or Google Docs), chat (Slack or Teams),
   and Figma. Any one is enough to start.
2. Say: "build org-pack from my tools"
3. Agent calls `org-pack-builder` Mode B (MCP extraction)
4. Wait ~30-60 seconds for extraction
5. Review extraction summary (sources, files created, term counts)
6. Check files in `context/org-pack.local/` and correct errors

**What gets extracted:**

- **COMPANY-BUSINESS.md** — from epic and project descriptions, strategy pages
- **COMPANY-VOCABULARY.md** — from ticket terms (frequency analysis),
  Figma component names, chat channel vocabulary
- **COMPANY-VOICE.md** — from brand pages in the docs tool, chat tone analysis
- **COMPANY-PATTERNS.md** — from bug patterns, Figma component reuse
- **COMPANY-SQUADS.md** — from tracker projects, teams, or repos
- **COMPANY-ARCHETYPES.md** — from user story patterns
- **COMPANY-SOURCES.md** — from linked pages in the docs tool

All extracted content is marked `INFERRED` — review before trusting in
production work.

---

## Alternative: Guided interview

**When MCPs aren't available or you prefer manual input:**

1. Say: "build org-pack manually" or "I'll answer questions for org-pack"
2. Agent calls `org-pack-builder` Mode A (guided interview)
3. Answer 6 sections of questions:
   - Business context (5 questions)
   - Domain vocabulary (5 questions) — terms, conflicts, bounded contexts
   - Voice rules (4 questions)
   - Patterns (3 questions)
   - Squads (2 questions)
   - Archetypes (3 questions)
4. Files written to `context/org-pack.local/`

Takes ~10-15 minutes. Can defer any section and fill in later.

---

## Alternative: File upload

**When you have existing docs to import:**

1. Say: "build org-pack from my files"
2. Upload: brand guidelines PDF, glossary spreadsheet, Notion exports, wiki
   pages
3. Agent parses and maps content to org-pack structure
4. Files written to `context/org-pack.local/`

Fastest when you already have structured docs.

---

## What's new: COMPANY-VOCABULARY.md (Layer 2: Domain mapping)

**Historically missing** — the harness had no dedicated domain vocabulary
artifact. `COMPANY-VOICE.md` included a small vocabulary table, but no
systematic capture of:

- Domain terms and definitions
- Terminology conflicts (e.g. "appointment" vs "booking")
- Bounded contexts (same term, different meanings in different areas)
- Deprecated terms

**Now built automatically** via org-pack-builder using domain mapping
methodology.

**Why it matters:**

- `ux-pattern` can now catch terminology inconsistencies in critiques
- `content` can enforce vocabulary standards in copy
- `design-kickoff` can use canonical domain terms in PRDs
- No more "is it a booking or an appointment?" debates every time

---

## Update mode: Refresh existing org-pack

**When to refresh:**

- Company rebrand or voice change
- New domain terms introduced
- Squad restructure
- Terminology conflicts surface

**How to refresh:**

1. Say: "refresh my org-pack" or "update COMPANY-VOCABULARY.md"
2. Agent asks which files to update (checkbox `AskQuestion`)
3. Choose mode (MCP extraction / interview / file upload)
4. Only selected files are rebuilt, others preserved
5. Review diff summary

---

## Verify: Check that org-pack is gitignored

After building, agent runs:

```bash
git status --porcelain context/org-pack.local/
```

Must return empty — real company data must never reach GitHub.

If files appear, agent adds `context/org-pack.local/` to `.gitignore` and
re-checks.

---

## How other skills use the org-pack

Once built, every skill resolves org-pack files per `harness/ORCHESTRATOR.md`
§0a:

1. Check `context/org-pack.local/COMPANY-*.md` first (your real company)
2. Fall back to `context/org-pack/COMPANY-*.md` (Northline example) if local
   doesn't exist

**Skills that depend on org-pack:**

- `ux-pattern` — uses `COMPANY-VOCABULARY.md` and `COMPANY-VOICE.md` for
  terminology and copy critique
- `content` — uses `COMPANY-VOICE.md` for voice/tone rules
- `design-kickoff` — uses `COMPANY-BUSINESS.md` and `COMPANY-ARCHETYPES.md`
  for project context
- `research-agent` — uses `COMPANY-ARCHETYPES.md` for user types
- `workload-agent` — uses `COMPANY-SQUADS.md` for squad-scoped queries

Without org-pack.local/, these skills use generic Northline examples — correct
patterns, wrong facts.

---

## Example: MCP extraction on first clone

```
You: build org-pack from my tools

Agent:
🔍 Extracting company context from MCPs...

✓ Linear: 47 issues, 12 projects, 4 teams
✓ Notion: 8 pages (glossary, brand voice, strategy)
✓ Figma: Acme Design System (120 components)
✓ Slack: 3 channels (tone analysis)

📦 Built org-pack.local/ from your tools

Files created:
→ COMPANY-BUSINESS.md (business context, strategic pillars)
→ COMPANY-VOCABULARY.md (89 domain terms, 5 terminology conflicts)
→ COMPANY-VOICE.md (brand personality, voice rules, examples)
→ COMPANY-PATTERNS.md (12 recurring UX patterns)
→ COMPANY-SQUADS.md (team structure, ownership)
→ COMPANY-ARCHETYPES.md (4 user types)
→ COMPANY-SOURCES.md (external research sources)

⚠️ These files are INFERRED — review them in context/org-pack.local/ and
correct any errors before using in production work.

Want me to walk through any file to check if the extraction looks right?
```

---

## Example: Update vocabulary only

```
You: refresh COMPANY-VOCABULARY.md

Agent:
Which files do you want to update?

[x] COMPANY-VOCABULARY.md
[ ] COMPANY-VOICE.md
[ ] COMPANY-BUSINESS.md
[ ] COMPANY-PATTERNS.md
[ ] COMPANY-SQUADS.md
[ ] COMPANY-ARCHETYPES.md
[ ] COMPANY-SOURCES.md

[Update selected] [Cancel]

---

You: [Update selected]

Agent: How do you want to update?

○ Extract from my tools (recommended)
○ I'll answer questions manually
○ I'll upload files

---

You: Extract from tools

Agent:
✓ Extracted 12 new terms from recent tickets
✓ Updated 5 existing definitions from Notion glossary
✓ Detected 2 new terminology conflicts

Updated COMPANY-VOCABULARY.md:
- Added 12 terms
- Updated 5 definitions
- Added 2 conflicts to resolve

Other files unchanged.
```

---

## Troubleshooting

**"I don't have any tools connected"**

- Use Mode A (guided interview) or Mode C (file upload) instead
- Or connect MCPs first: see `docs/setup/cursor-mcp-setup.md`

**"Extraction produced generic/wrong content"**

- Extraction is INFERRED, not ground truth — always review and correct
- Try Mode A (interview) for more control
- Some companies don't have structured glossaries in Notion → interview works
  better

**"Can I edit org-pack files manually later?"**

- Yes — they're just markdown files in `context/org-pack.local/`
- Edit anytime, no special skill needed
- Or say "update COMPANY-VOCABULARY.md" to refresh via extraction/interview

**"org-pack files show up in git status"**

- Agent should auto-fix this by adding to `.gitignore`
- If not, manually add: `echo "context/org-pack.local/" >> .gitignore`

**"How do I know if skills are using my org-pack vs the example?"**

- Check file paths in skill responses — should reference
  `context/org-pack.local/`
- Or: delete a key term from `context/org-pack.local/COMPANY-VOCABULARY.md`
  and run a critique — if the term still appears, skills are using the example

---

## Related docs

- **Skill reference:** `SKILL.md`
- **Onboarding integration:** `harness/designer-onboarding/SKILL.md` § Org-pack
  setup
- **Org-pack resolution:** `harness/ORCHESTRATOR.md` §0a
- **Example org-pack:** `context/org-pack/` (Northline fictional company)
- **Design methodology resources:** Product design frameworks and domain
  modeling approaches

---

## Quick reference

| Task | Command | Mode |
|------|---------|------|
| Build from scratch (auto) | "build org-pack from my tools" | Mode B (MCP extraction) |
| Build from scratch (manual) | "build org-pack manually" | Mode A (interview) |
| Build from files | "build org-pack from my files" | Mode C (file upload) |
| Update specific file | "refresh COMPANY-VOCABULARY.md" | Update mode |
| Update all files | "refresh org-pack" | Update mode |
| Check if org-pack exists | Check `context/org-pack.local/` folder | — |
| Review extracted content | Open files in `context/org-pack.local/` | — |

---

**Remember:** org-pack is the foundation for every other skill. Without it,
skills use generic examples. With it, every critique, PRD, and prototype uses
your real company context.
