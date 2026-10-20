---
name: figma-library-manager
description: >
  Design system library management using get_libraries and search_design_system.
  Audits what libraries are available, searches for components before creating new ones,
  prevents component duplication, and maintains library hygiene. Triggers on:
  "search Figma design system", "find [component] in libraries", "what libraries do we have",
  "check before creating component", "prevent duplicate components", "library audit".
  Essential for design system consistency and governance.
---

# Figma Library Manager

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

You are managing design system libraries in Figma. This prevents the most
common design system failure: component duplication because someone didn't
know it already existed.

**Invoke in Cursor:** before creating components, during design system audits,
when onboarding new designers.

---

## Core capabilities

1. **Library discovery** — List all available design system libraries
2. **Component search** — Find existing components before creating new ones
3. **Duplicate detection** — Identify redundant components across libraries
4. **Usage tracking** — Monitor which libraries are actually used
5. **Governance** — Enforce library usage policies

---

## Workflow: Search before creating

Designer wants to create a new component. STOP and search first.

### 1. Understand intent

Ask:
- What's the component for? (button, card, modal, etc.)
- What are the key features? (variants, states, etc.)
- Why not use an existing component?

### 2. Search design system

```javascript
// Search by component name
const results = await search_design_system({
  query: "button",
  fileKey: "current-file-key",  // For context
  includeComponents: true,
  includeVariables: false,
  includeStyles: false
});

// Returns matching components from all libraries with:
// - Component name and description
// - Library it belongs to
// - Figma URL to view it
// - Preview image
```

### 3. Expand search

If no exact match, try variations:

```javascript
// Try related terms
await search_design_system({ query: "cta", ... });         // Call to action
await search_design_system({ query: "action button", ... });
await search_design_system({ query: "primary button", ... });

// Try by visual characteristics
await search_design_system({ query: "rounded button", ... });
await search_design_system({ query: "icon button", ... });
```

### 4. Present options

Show designer what exists:

```markdown
## Existing components found:

**Button** (Main Design System)
- Variants: Primary, Secondary, Ghost, Destructive
- Sizes: Small, Medium, Large
- States: Default, Hover, Pressed, Disabled
- [View in Figma](figma-url)

**CTA Button** (Marketing Library)
- Variants: Hero, Inline
- Purpose: Landing pages only
- [View in Figma](figma-url)

**Icon Button** (Mobile Library)
- Round icon-only buttons
- Sizes: 40px, 48px
- [View in Figma](figma-url)

**Recommendation:** Use `Button` from Main Design System with `variant="primary"`
```

### 5. Decide

| Scenario | Action |
|---|---|
| Exact match exists | Use existing component |
| Close match exists | Extend existing component with new variant |
| No match, valid need | Create new component (document why) |
| No match, edge case | Use closest component + overrides |

---

## Workflow: Library audit

Periodic review of design system health.

### 1. Get all libraries

```javascript
const libraries = await get_libraries();

// Returns all libraries the user has access to:
// - Library name
// - File key
// - Published components count
// - Last published date
```

### 2. Categorize libraries

Group by purpose:

**Core libraries (must have):**
- Main Design System
- Brand/Foundations
- Icon Library

**Platform libraries:**
- Mobile Components
- Web Components
- Tablet-specific

**Domain libraries:**
- Marketing Components
- Admin/Internal Tools
- Experimental/Lab

**Deprecated libraries:**
- Old Design System v1
- Legacy Icons
- Superseded Components

### 3. Search for duplicates

For each core component, search across libraries:

```javascript
// Search for "button" across all libraries
const buttonResults = await search_design_system({
  query: "button",
  fileKey,
  includeComponents: true
});

// Group by library
// Flag if component exists in multiple libraries
```

### 4. Report findings

```markdown
## Library Audit — YYYY-MM-DD

### Available Libraries (8)

**Core:**
- Main Design System (123 components, updated 2026-08-20)
- Foundations (colors, type, spacing — 45 variables)
- Icon Library (320 icons, updated 2026-08-15)

**Platform:**
- Mobile Components (67 components)
- Web Components (89 components)

**Deprecated:**
- Old Design System v1 (DO NOT USE — migrate to Main)
- Legacy Icons (replaced by Icon Library)

### Duplicates Found (5)

**Button component:**
- Exists in: Main Design System, Marketing Library, Old Design System v1
- Recommendation: Use Main Design System only, archive others

**Card component:**
- Exists in: Main Design System, Web Components
- Recommendation: Merge Web Components variants into Main

### Gaps (3)

**Missing components:**
- Data Table (requested 3 times, no library component)
- File Upload (implementations inconsistent)
- Loading Skeleton (each team has own version)

### Next Steps:
1. Archive Old Design System v1
2. Consolidate Button and Card duplicates
3. Prioritize Data Table for library
```

---

## Workflow: Prevent duplication

Before `ui-agent` builds a new component in `context/design-system/ds/`:

### 1. Search Figma libraries

```javascript
await search_design_system({
  query: "[component name]",
  fileKey,
  includeComponents: true
});
```

### 2. Search codebase

```bash
grep -r "export.*[ComponentName]" context/design-system/ds/
```

### 3. Decision matrix

| In Figma? | In Code? | Action |
|---|---|---|
| ✓ | ✓ | Use existing (Code Connect should link them) |
| ✓ | ✗ | Build from Figma design |
| ✗ | ✓ | Add to Figma library (code-to-design) |
| ✗ | ✗ | Is this really needed? Challenge assumption |

---

## Search strategies

### By component type

**UI primitives:**
- button, input, checkbox, radio, toggle, select, dropdown

**Layout:**
- card, list, grid, stack, divider, spacer

**Navigation:**
- header, footer, navbar, tabs, breadcrumb, pagination

**Feedback:**
- alert, toast, banner, modal, dialog, loading, skeleton

**Data:**
- table, chart, graph, badge, tag, avatar, stat

### By visual characteristics

**Shape:**
- rounded, square, circle, pill

**Emphasis:**
- primary, secondary, ghost, destructive

**Size:**
- small, medium, large, compact, comfortable

**Content:**
- text, icon, image, avatar

### By use case

**Action:**
- submit, cancel, delete, save, next, back

**Status:**
- success, error, warning, info, pending

**Domain:**
- booking, payment, calendar, messaging, settings

---

## Library governance

### Naming conventions

**Components:**
- PascalCase: `Button`, `DataTable`, `AvatarGroup`
- Descriptive: `IconButton` not `IB`
- No abbreviations unless universal (CTA, FAQ)

**Variants:**
- Lowercase: `primary`, `secondary`, `ghost`
- Descriptive properties: `variant`, `size`, `state`
- Avoid generic: `type1`, `style2`

**Variables:**
- Slash hierarchy: `Color/Brand/Primary`
- CSS mapping: `--color-brand-primary`
- Documented in tokens.css

### Usage policies

**Must use library when:**
- Component exists in core library
- Use case matches documented purpose
- No blocking bugs or missing features

**Can extend when:**
- Library component is close but missing 1-2 variants
- Propose variant addition back to library
- Document extension in code

**Can create new when:**
- No library equivalent exists
- Valid design system need (not one-off)
- Contributes back to library after validation

---

## Integration with other skills

- Called by `ui-agent` before building new components
- Called by `design-system` during library maintenance
- Feeds `figma-code-sync` for Code Connect setup
- Supports `figma-token-sync` for variable discovery

---

## Output format

After library search, log in `harness/logs/library-search-log.md`:

```markdown
### YYYY-MM-DD — figma-library-manager

**Search:** "[component name]"

**Results:**
- Found 2 matching components
- 1 exact match (Main Design System)
- 1 similar match (Marketing Library)

**Recommendation:**
Use `Button` from Main Design System with `variant="primary"`

**Rationale:**
Existing component handles 90% of use cases. Remaining 10% can be
achieved with size prop adjustment. Creating new component would
fragment button patterns across codebase.
```

---

## Edge cases

**Multiple teams, multiple libraries:**
- Each team may have their own library
- Establish core library as authority
- Federate platform-specific extensions

**Library permissions:**
- Some designers can't publish to core library
- Workflow: design in team file → submit for core review
- Gate: library maintainers approve before publishing

**Version conflicts:**
- Component exists in v1 (deprecated) and v2 (current)
- Always search in current library only
- Migrate legacy usage when found

**Experimental components:**
- Lab/beta components not ready for core
- Keep in separate "Experimental" library
- Graduate to core when validated

---

## Forbidden

- Never create component without searching first
- Never use deprecated library components
- Never assume "it doesn't exist" without comprehensive search
- Never duplicate component just because it's in different library
