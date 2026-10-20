# Figma File Creation

Extension to `design-kickoff` SKILL.md for programmatically creating Figma
files using `create_new_file` and `whoami`.

---

## When to use

- Design kickoff for new project (wants Figma workspace)
- Designer has no file yet but needs structured starting point
- Batch project setup (create file + brief + folder)

---

## Workflow

### 1. Check if file already exists

Before creating, ask:
- "Do you have a Figma file started for this project?"
- "Should I create a new Figma file, or use an existing one?"

If exists → get URL, skip creation
If doesn't exist → proceed with creation

### 2. Get user's Figma plan

```javascript
const user = await whoami();

// Returns:
// {
//   plans: [
//     {
//       key: "team::1234567890",
//       name: "Design Team",
//       type: "team"
//     },
//     {
//       key: "organization::9876543210",
//       name: "Company Org",
//       type: "organization"
//     }
//   ]
// }
```

### 3. Select plan

**If single plan:**
- Use it automatically

**If multiple plans:**
- Ask designer which team/organization to use
- Present as `AskQuestion` with plan names

### 4. Get project folder (optional)

If designer wants file in specific project folder:

```javascript
// Ask for Figma project URL
// Extract projectId from:
// - figma.com/files/project/:projectId
// - figma.com/files/:orgId/project/:projectId
// - figma.com/files/team/:teamId/project/:projectId
```

### 5. Create file

```javascript
const newFile = await create_new_file({
  fileName: "[Project Name] — Design Exploration",  // From design-kickoff Step 0
  planKey: user.plans[selectedIndex].key,           // From whoami
  editorType: "design",                             // or "figjam" / "slides"
  projectId: extractedProjectId                     // Optional
});

// Returns:
// {
//   fileKey: "new-file-key",
//   url: "https://figma.com/design/[fileKey]/[fileName]"
// }
```

### 6. Structure file with use_figma

After creating blank file, add structure:

```javascript
await use_figma(`
  // Create pages for project phases
  
  const coverPage = figma.createPage();
  coverPage.name = "📄 Cover";
  
  const explorationsPage = figma.createPage();
  explorationsPage.name = "🔍 Explorations";
  
  const iterationsPage = figma.createPage();
  iterationsPage.name = "🔄 Iterations";
  
  const archivePage = figma.createPage();
  archivePage.name = "🗄️ Archive";
  
  // Add cover section with project info
  await figma.setCurrentPageAsync(coverPage);
  
  const titleFrame = figma.createFrame();
  titleFrame.name = "Project Info";
  titleFrame.resize(800, 600);
  
  await figma.loadFontAsync({family:"Inter", style:"Bold"});
  await figma.loadFontAsync({family:"Inter", style:"Regular"});
  
  const titleText = figma.createText();
  titleText.characters = "${projectName}";
  titleText.fontName = {family:"Inter", style:"Bold"};
  titleText.fontSize = 48;
  
  // Add brief/context
  const briefText = figma.createText();
  briefText.characters = "${briefSummary}";
  briefText.fontName = {family:"Inter", style:"Regular"};
  briefText.fontSize = 16;
  
  // Position elements
  titleText.x = 40;
  titleText.y = 40;
  briefText.x = 40;
  briefText.y = 120;
  
  titleFrame.appendChild(titleText);
  titleFrame.appendChild(briefText);
`);
```

### 7. Add to project brief

Update `projects/<slug>/brief.md`:

```markdown
## Sources

- **Figma:** [Project Name — Design Exploration](figma-url)
- **Jira:** [ticket] (if exists)
- **Confluence:** [doc] (if exists)
```

### 8. Share with designer

Return in chat:

```markdown
✓ Created Figma file: [Project Name — Design Exploration](figma-url)

**Structure:**
- 📄 Cover — Project info and brief
- 🔍 Explorations — Early ideas and iterations
- 🔄 Iterations — Refined designs
- 🗄️ Archive — Old versions

**Next:**
- Start exploring in the Explorations page
- Reference existing design system components
- Share with stakeholders when ready for feedback
```

---

## File naming conventions

| Project Type | File Name Format |
|---|---|
| Feature design | `[Feature Name] — Design Exploration` |
| Redesign | `[Surface Name] — Redesign` |
| New product | `[Product Name] — Product Design` |
| Workshop | `[Workshop Name] — FigJam Session` |
| Prototype | `[Feature Name] — Prototype` |

---

## Page structure templates

### Standard project

1. **📄 Cover** — Project brief, status, stakeholders
2. **🔍 Explorations** — Early ideas, low-fidelity sketches
3. **🔄 Iterations** — Refined designs with variants
4. **✅ Final** — Approved designs for handoff
5. **🗄️ Archive** — Old versions, rejected ideas

### Design system

1. **📘 Documentation** — How to use, principles
2. **🎨 Foundations** — Colors, typography, spacing
3. **🧩 Components** — All UI components
4. **📱 Patterns** — Common layouts, templates
5. **🧪 Lab** — Experimental components

### Workshop / FigJam

1. **🎯 Agenda** — Workshop plan
2. **💡 Brainstorm** — Ideas board
3. **🗳️ Voting** — Dot voting area
4. **📝 Synthesis** — Grouped findings
5. **✅ Action Items** — Next steps

---

## Batch project setup

When design-kickoff creates a project, optionally create Figma file:

```markdown
Design Kickoff Checklist:
1. [x] Create project folder: projects/[slug]/
2. [x] Write brief.md
3. [x] Run research sweep
4. [ ] Create Figma file?
```

If yes:
1. Run file creation workflow
2. Link in brief.md Sources
3. Pre-populate cover page with brief content

---

## Integration with design-kickoff

Add to `design-kickoff` Step 2 (PRD draft):

```markdown
### After PRD is drafted:

**Optional: Create Figma file?**

If designer doesn't have a file yet, offer to create one:
- Ask which team/org to create in
- Ask if it should go in specific project folder
- Create with standard structure
- Link in brief.md
```

---

## Edge cases

**Designer has no Figma plan:**
- `whoami` returns empty plans array
- Can't create file (no permission)
- Suggest: create in their personal drafts, or get added to team

**Multiple projects in one file:**
- Don't create new file
- Add new page to existing file
- Use sections to organize

**FigJam vs Design file:**
- For workshops → `editorType: "figjam"`
- For design work → `editorType: "design"`
- For presentations → `editorType: "slides"`

**File naming conflicts:**
- Figma allows duplicate names
- Add date suffix if needed: "Project — YYYY-MM-DD"

**Project folder doesn't exist:**
- If projectId is invalid, file goes to drafts
- Designer can move it later

---

## Forbidden

- Never create file without designer approval
- Never create in wrong team/org (check whoami first)
- Never create when file already exists (duplicate waste)
- Never skip structuring pages (blank file is useless)
