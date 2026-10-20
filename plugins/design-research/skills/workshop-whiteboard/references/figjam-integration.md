# FigJam Integration

Extension to `workshop-whiteboard` SKILL.md for creating and reading FigJam
boards using `get_figjam` and `generate_diagram`.

---

## When to use

- "Create a FigJam board for this workshop"
- "Import workshop findings from FigJam"
- "Generate diagram in FigJam"
- Workshop outputs need visual whiteboard format

---

## Workflow: Create FigJam workshop boards

### 1. Plan workshop structure

Before creating board, define:
- Workshop type (brainstorm, affinity, journey map, retrospective)
- Sections needed (problem, ideas, votes, next steps)
- Templates to use (built-in FigJam or custom)

### 2. Generate FigJam board

```javascript
const figjam = await generate_diagram({
  prompt: `Create a FigJam workshop board for [workshop type].
  
  Structure:
  - Title section: "[Workshop Name] — YYYY-MM-DD"
  - Problem statement section
  - Idea generation area (sticky notes)
  - Voting area (dot voting)
  - Action items section
  
  Use FigJam sticky notes, connectors, and sections.`,
  fileKey: "target-file-key",  // Optional: add to existing file
  nodeId: "page-id"             // Optional: specific page
});

// Returns:
// {
//   fileKey: "new-or-existing-file",
//   nodeId: "created-board-section",
//   url: "figma.com/board/..."
// }
```

### 3. Pre-populate content

Add prepared materials:

```javascript
await generate_diagram({
  prompt: `In the FigJam board at [url], add:
  
  Problem Statement:
  "[problem from brief]"
  
  Starter Ideas (3 sticky notes):
  - Idea 1
  - Idea 2
  - Idea 3
  
  Participants section with names:
  - [designer names from team]
  
  Use yellow sticky notes for ideas, blue for problems.`
});
```

### 4. Share board

- Copy FigJam URL
- Add to `projects/<slug>/sources.md`
- Include in workshop invite

---

## Workflow: Read FigJam outputs

After workshop, import findings back to project.

### 1. Get FigJam content

```javascript
const content = await get_figjam({
  fileKey: "figjam-file-key",
  nodeId: "board-or-section-id"  // Optional: specific section
});

// Returns structured data:
// - Sticky notes (text, color, position)
// - Connectors (relationships)
// - Drawings and shapes
// - Comments and reactions
// - Votes (if using FigJam voting)
```

### 2. Parse workshop outputs

Extract by section:

**Problem statements:**
- Find sticky notes in "Problem" section
- Group related notes (by connectors or proximity)

**Ideas:**
- Extract from "Ideas" section
- Note vote counts (dot votes, reactions)
- Identify clusters (connected notes)

**Action items:**
- Find notes in "Next Steps" section
- Check for assigned names
- Note priority (stars, numbers)

### 3. Structure findings

Convert to markdown:

```markdown
## Workshop Findings — [Workshop Name] — YYYY-MM-DD

**FigJam board:** [URL]

**Participants:** [names]

### Problem Statements

1. [Problem from sticky note 1]
2. [Problem from sticky note 2]
3. [Problem from sticky note 3]

### Ideas Generated (15 total)

**Top voted (>3 votes):**
- [Idea 1] — 8 votes
- [Idea 2] — 5 votes
- [Idea 3] — 4 votes

**Clustered themes:**

*Theme: User onboarding*
- [Idea A]
- [Idea B]
- [Idea C]

*Theme: Checkout flow*
- [Idea D]
- [Idea E]

### Action Items

1. [ ] [Action item 1] — Assigned: [name]
2. [ ] [Action item 2] — Assigned: [name]
3. [ ] [Action item 3] — Assigned: [name]
```

### 4. Save to project

Append to `projects/<slug>/findings.md`:

```markdown
### YYYY-MM-DD — workshop-whiteboard (FigJam import)

**FigJam board:** [URL with node-id]

[Structured findings from above]

**Next steps:**
- Prioritize top 3 voted ideas
- Assign action items in the tracker
- Schedule follow-up session
```

---

## FigJam board templates

### Brainstorming

```
┌─────────────────────────────────────────────────┐
│ 🎯 Problem: [What are we solving?]              │
├─────────────────────────────────────────────────┤
│ 💡 Ideas (silent generation, 5 min)            │
│                                                 │
│ [Sticky] [Sticky] [Sticky]                     │
│ [Sticky] [Sticky] [Sticky]                     │
│                                                 │
├─────────────────────────────────────────────────┤
│ 🗳️ Dot Voting (3 votes each)                   │
│                                                 │
│ [Sticky •••] [Sticky ••] [Sticky •]            │
│                                                 │
├─────────────────────────────────────────────────┤
│ ✅ Next Steps                                   │
│                                                 │
│ [ ] Action 1 — @owner                          │
│ [ ] Action 2 — @owner                          │
└─────────────────────────────────────────────────┘
```

### Affinity Mapping

```
┌─────────────────────────────────────────────────┐
│ 📝 Observations (from research)                 │
│                                                 │
│ [Blue] [Blue] [Blue] [Blue] [Blue]             │
│ [Blue] [Blue] [Blue] [Blue] [Blue]             │
│                                                 │
├─────────────────────────────────────────────────┤
│ 🗂️ Grouped by Theme                            │
│                                                 │
│ ┌─ Theme A ─┐  ┌─ Theme B ─┐  ┌─ Theme C ─┐  │
│ │ [Note]    │  │ [Note]    │  │ [Note]    │  │
│ │ [Note]    │  │ [Note]    │  │ [Note]    │  │
│ │ [Note]    │  │ [Note]    │  │ [Note]    │  │
│ └───────────┘  └───────────┘  └───────────┘  │
│                                                 │
├─────────────────────────────────────────────────┤
│ 🏷️ Theme Names                                  │
│                                                 │
│ Theme A: [Name]                                │
│ Theme B: [Name]                                │
│ Theme C: [Name]                                │
└─────────────────────────────────────────────────┘
```

### Retrospective

```
┌─────────────────────────────────────────────────┐
│ ✅ What Went Well                               │
│                                                 │
│ [Green] [Green] [Green]                        │
│                                                 │
├─────────────────────────────────────────────────┤
│ 🤔 What Could Be Better                         │
│                                                 │
│ [Yellow] [Yellow] [Yellow]                     │
│                                                 │
├─────────────────────────────────────────────────┤
│ 💡 Action Items                                 │
│                                                 │
│ [ ] Action — Owner — Due                       │
│ [ ] Action — Owner — Due                       │
└─────────────────────────────────────────────────┘
```

### Journey Map

```
┌─────────────────────────────────────────────────┐
│ Phases:  Discovery │ Evaluation │ Purchase │ Use│
├──────────┬──────────┬───────────┬──────────────┤
│ Actions  │          │           │              │
│ [Note]   │ [Note]   │ [Note]    │ [Note]       │
├──────────┼──────────┼───────────┼──────────────┤
│ Thoughts │          │           │              │
│ [Note]   │ [Note]   │ [Note]    │ [Note]       │
├──────────┼──────────┼───────────┼──────────────┤
│ Pain pts │          │           │              │
│ [Red]    │ [Red]    │ [Red]     │ [Red]        │
├──────────┼──────────┼───────────┼──────────────┤
│ Opps     │          │           │              │
│ [Green]  │ [Green]  │ [Green]   │ [Green]      │
└──────────┴──────────┴───────────┴──────────────┘
```

---

## Integration with workshop-whiteboard

### During workshop planning

When `workshop-whiteboard` Mode 1 (Planning) runs:
- Offer to create FigJam board
- Pre-populate with agenda and structure
- Add participant names

### During synthesis

When Mode 3 (Synthesis) runs:
- Read FigJam board with `get_figjam`
- Extract and structure findings
- Append to `findings.md`

### For remote workshops

- Create FigJam board before workshop
- Run workshop in Figma (not just planning doc)
- Import results after

---

## generate_diagram vs use_figma

**Use `generate_diagram` when:**
- Creating new FigJam board from scratch
- Adding structured content (sticky grids, sections)
- Prompt can describe layout clearly

**Use `use_figma` (raw Plugin API) when:**
- Precise control over positioning needed
- Complex shapes and connectors
- Modifying existing FigJam content programmatically

---

## Common patterns

### Sticky note colors

| Color | Meaning |
|---|---|
| Yellow | Ideas, neutral observations |
| Blue | Problems, challenges, questions |
| Green | Positives, successes, opportunities |
| Red | Risks, blockers, critical issues |
| Purple | Decisions, action items |

### Voting mechanisms

- Dot voting: Each participant gets N dots (usually 3)
- Star rating: 1-5 stars on each idea
- Emoji reactions: 👍 👎 ❤️ 🎉

### Connectors

- Solid lines: Direct relationships
- Dotted lines: Loose associations
- Arrows: Cause → Effect

---

## Output files

After workshop:

```
projects/<slug>/
├── notes/
│   └── workshop-YYYY-MM-DD.md           # Structured findings
├── sources.md                            # FigJam URL added
└── findings.md                           # Appended summary
```

---

## Forbidden

- Never create FigJam board without designer approval (it's in their account)
- Never modify workshop board while session is running (participants are using it)
- Never lose participant contributions (preserve all sticky notes)
- Never skip documenting FigJam URL in sources.md
