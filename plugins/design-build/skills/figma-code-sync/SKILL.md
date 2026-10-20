---
name: figma-code-sync
description: >
  Automated Code Connect mapping between Figma components and codebase components.
  Uses list_file_components_for_code_connect for bulk discovery, 
  get_code_connect_suggestions for AI-suggested mappings, and
  send_code_connect_mappings for bulk save. Triggers on: "map Figma components to code",
  "Code Connect setup", "link design system to Figma", "connect components",
  "bulk Code Connect mapping". Essential for keeping design and code in sync.
---

# Figma Code Connect Sync

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

You are automating Code Connect mappings between Figma design components and
codebase React/TypeScript components. This closes the gap in Dev Mode —
when engineers inspect a design, they see the actual code to implement it.

**Invoke in Cursor:** explicit request or as part of design system setup.

---

## Core capabilities

1. **Bulk component discovery** — Find all published Figma components
2. **Smart matching** — AI-suggested mappings based on naming
3. **Template generation** — Full Code Connect templates with props
4. **Validation** — Check mappings are accurate and complete
5. **Batch operations** — Map entire libraries at once

---

## Workflow

### 1. Discover Figma components

```javascript
const components = await list_file_components_for_code_connect({
  fileKey: "design-system-file-key"
});

// Returns all published components with:
// - nodeId, name, description
// - Variant properties and defaults
// - Dependencies (other components used inside)
// - Instance count
```

### 2. Discover codebase components

Scan `context/design-system/ds/` for all exported components:

```bash
grep -r "^export (const|function|class)" context/design-system/ds/*.tsx
```

Build inventory:
```typescript
{
  "Button": "context/design-system/ds/Button.tsx",
  "Badge": "context/design-system/ds/Badge.tsx",
  "Card": "context/design-system/ds/Card.tsx",
  ...
}
```

### 3. Match components

For each Figma component, find best code match:

**Exact name match:**
- Figma: `Button` → Code: `Button.tsx` ✓

**Name variations:**
- Figma: `Button/Primary` → Code: `Button` (variant: `variant="primary"`)
- Figma: `Card Component` → Code: `Card`
- Figma: `NavButton` → Code: `NavigationButton` or `Button`

**Unmatched:**
- Figma components with no code equivalent
- Code components not in Figma library

### 4. Get AI suggestions

For ambiguous matches, use Code Connect AI:

```javascript
const suggestions = await get_code_connect_suggestions({
  fileKey: "design-system-file-key",
  nodeId: "component-node-id"
});

// Returns suggested mappings based on:
// - Component name similarity
// - Props analysis
// - Usage patterns
```

### 5. Generate Code Connect templates

For each matched pair, create mapping:

**Simple mapping (component_browser type):**
```javascript
await add_code_connect_map({
  nodeId: "figma-node-id",
  fileKey: "design-system-file-key",
  source: "context/design-system/ds/Button.tsx",
  componentName: "Button",
  label: "React"
});
```

**Full template (figmadoc type):**
```javascript
await add_code_connect_map({
  nodeId: "figma-node-id",
  fileKey: "design-system-file-key",
  source: "context/design-system/ds/Button.tsx",
  componentName: "Button",
  label: "React",
  template: `
    import { Button } from './Button';
    
    <Button 
      variant={figma.enum("Variant", {
        Primary: "primary",
        Secondary: "secondary",
        Ghost: "ghost"
      })}
      size={figma.enum("Size", {
        Small: "sm",
        Medium: "md",
        Large: "lg"
      })}
      disabled={figma.boolean("Disabled")}
    >
      {figma.string("Label")}
    </Button>
  `,
  templateDataJson: JSON.stringify({
    imports: ["Button"],
    nestable: false,
    props: {
      variant: "enum",
      size: "enum",
      disabled: "boolean",
      children: "string"
    }
  })
});
```

### 6. Bulk save mappings

Use `send_code_connect_mappings` to save multiple at once:

```javascript
await send_code_connect_mappings({
  fileKey: "design-system-file-key",
  mappings: [
    { nodeId: "1:23", component: "Button", ... },
    { nodeId: "1:24", component: "Badge", ... },
    { nodeId: "1:25", component: "Card", ... },
    ...
  ]
});
```

---

## Mapping strategies

### By component type

**Atoms (simple components):**
- Button, Badge, Avatar, Icon, Text
- Usually 1:1 mapping
- Full template with prop mappings

**Molecules (composed components):**
- Card, ListItem, SearchBar
- May map to multiple code components
- Template shows composition pattern

**Organisms (complex layouts):**
- Navigation, Header, EmptyState
- Often no direct code equivalent
- Link to pattern documentation instead

### By framework

Set `label` based on codebase:
- `"React"` — React + TypeScript (this codebase)
- `"SwiftUI"` — iOS SwiftUI
- `"Compose"` — Android Jetpack Compose

---

## Prop mapping patterns

### Variants → enum props

Figma variant → code prop with enum:

```typescript
// Figma: Button component with "Variant" property (Primary, Secondary, Ghost)
// Code: Button.tsx with variant prop

figma.enum("Variant", {
  "Primary": "primary",    // Figma label → code value
  "Secondary": "secondary",
  "Ghost": "ghost"
})
```

### Boolean properties

Figma boolean layer visibility → code boolean prop:

```typescript
// Figma: Layer named "Disabled" (visible/hidden)
// Code: disabled prop

disabled={figma.boolean("Disabled")}
```

### Text content

Figma text layers → code children/text props:

```typescript
// Figma: Text layer named "Label"
// Code: Button children

<Button>
  {figma.string("Label")}
</Button>
```

### Instance swap

Figma instance swap → code composition:

```typescript
// Figma: "Icon" instance swap property
// Code: icon prop or leftIcon composition

icon={figma.instance("Icon")}
```

---

## Validation checks

After creating mappings:

**Completeness:**
- All published Figma components have mappings
- All main design system components are mapped
- Dependencies are mapped (nested components)

**Accuracy:**
- Prop names match between Figma and code
- Variant values are correct
- Templates compile and render

**Performance:**
- Templates are concise (no redundant code)
- Imports are minimal
- No circular dependencies

---

## Output format

After sync, log in `harness/logs/code-connect-log.md`:

```markdown
### YYYY-MM-DD — figma-code-sync

**Source:** [Figma file name](figma-url)
**Target:** `context/design-system/ds/`

**Mappings created:**
- 42 components mapped
- 28 with full templates
- 14 with simple mappings

**Coverage:**
- Figma: 42/45 published components (93%)
- Code: 42/48 exported components (88%)

**Unmapped:**

*Figma components without code:*
- `LoadingSpinner` (deprecated)
- `OldButton` (superseded)
- `ExperimentalCard` (not shipped)

*Code components without Figma:*
- `InternalDebugPanel` (dev-only)
- `LabPrototypeShell` (Design Harness-only)

**Next sync:** When new components are published
```

---

## Integration with design-system

After mapping, enhance `context/design-system/ds/index.ts`:

```typescript
/**
 * Design system components — Design Harness kit
 * 
 * Code Connect mappings: All components below are mapped to their
 * Figma equivalents in [design-system-file-name](figma-url).
 * View mappings in Figma Dev Mode.
 * 
 * Last synced: YYYY-MM-DD
 */

export { Button } from './Button';  // Figma: Button (nodeId: 1:23)
export { Badge } from './Badge';    // Figma: Badge (nodeId: 1:24)
export { Card } from './Card';      // Figma: Card (nodeId: 1:25)
...
```

---

## Edge cases

**Multi-variant components:**
- Figma component set with many variants
- Code: single component with multiple props
- Template maps variant combinations to prop combinations

**Nested components:**
- Figma: Button with Icon instance
- Code: Button with icon prop
- Template shows composition: `<Button icon={<Icon name="..." />}>`

**Platform-specific:**
- Same Figma component → different code per platform
- Create separate mappings with different `label` values
- React vs SwiftUI vs Compose

**Deprecated components:**
- Don't map deprecated Figma components
- Add comment in Figma: "Deprecated - use [NewComponent] instead"
- Remove mappings when components are archived

**Dynamic content:**
- Figma: Static example content
- Code: Dynamic data from props
- Template shows realistic example with placeholders

---

## Integration with other skills

- Called by `design-system` when components are updated
- Used by `audit` to verify design-code consistency
- Supports `ui-agent` by showing correct component usage
- Feeds `figma-library-manager` for component discovery

---

## Forbidden

- Never map internal/private components (dev-only utilities)
- Never create mappings for deprecated Figma components
- Never guess prop names — inspect actual code
- Never map to the wrong framework (React vs SwiftUI)
