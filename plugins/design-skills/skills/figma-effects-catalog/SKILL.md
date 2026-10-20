---
name: figma-effects-catalog
description: >
  Documentation and cataloging of custom Figma shader effects and fills.
  Uses list_shader_effects, get_shader_effect, list_shader_fills, and get_shader_fill
  to discover and document custom visual effects in the design system. Triggers on:
  "document custom effects", "what shader effects do we have", "catalog Figma shaders",
  "custom fill documentation", "effects library audit". Low priority but valuable
  for advanced design systems with custom visual treatments.
---

# Figma Effects Catalog

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

You are documenting custom shader effects and fills used in the design
system. This makes advanced visual effects reusable and maintainable
instead of one-off magic.

**Invoke in Cursor:** explicit request or during design system documentation.

---

## Core capabilities

1. **Effect discovery** — List all custom shader effects in account
2. **Fill discovery** — List all custom shader fills in account  
3. **Source inspection** — Read shader source code
4. **Documentation** — Write implementation guides
5. **Usage tracking** — Find where effects are used

---

## Workflow: Catalog effects

### 1. List all shader effects

```javascript
const effects = await list_shader_effects();

// Returns array of effects:
// [
//   {
//     id: "effect-id-1",
//     name: "Frosted Glass",
//     description: "Blurred background with transparency"
//   },
//   {
//     id: "effect-id-2",
//     name: "Glow Outline",
//     description: "Soft outer glow effect"
//   },
//   ...
// ]

// Handle pagination if nextCursor exists
let cursor = effects.nextCursor;
while (cursor) {
  const more = await list_shader_effects({ cursor });
  effects.push(...more);
  cursor = more.nextCursor;
}
```

### 2. List all shader fills

```javascript
const fills = await list_shader_fills();

// Returns array of fills:
// [
//   {
//     id: "fill-id-1",
//     name: "Animated Gradient",
//     description: "Smooth color transitions"
//   },
//   {
//     id: "fill-id-2",
//     name: "Noise Texture",
//     description: "Procedural noise pattern"
//   },
//   ...
// ]
```

### 3. Get effect details

For each effect, fetch source:

```javascript
const effectDetails = await get_shader_effect({
  id: "effect-id-1",
  version: "commit-sha"  // Optional: specific version
});

// Returns:
// {
//   id: "effect-id-1",
//   name: "Frosted Glass",
//   description: "Blurred background with transparency",
//   version: "abc123...",  // Current version commit SHA
//   manifest: [
//     {
//       filename: "effect.glsl",
//       bytes: 1234,
//       uri: "figma://shader-effect/..."
//     },
//     {
//       filename: "config.json",
//       bytes: 456,
//       uri: "figma://shader-effect/..."
//     }
//   ]
// }
```

### 4. Read shader source

```javascript
// Read each file from its URI as MCP resource
const shaderSource = await FetchMcpResource({
  server: "user-Figma",
  uri: effectDetails.manifest[0].uri
});
```

### 5. Document effect

Create documentation:

```markdown
## Frosted Glass Effect

**Type:** Shader Effect (post-effect)

**Description:**
Blurred background with transparency, creating a "glass" material effect.
Commonly used for modal overlays, cards on backgrounds, and navigation chrome.

**Source:** Figma shader effect library

**Parameters:**
- Blur radius: 0-100px (default: 20px)
- Opacity: 0-100% (default: 80%)
- Tint color: Optional color overlay

**Technical Details:**
```glsl
// Simplified shader code
uniform float blurRadius;
uniform float opacity;
uniform vec4 tintColor;

void main() {
  // Blur input texture
  vec4 blurred = gaussianBlur(inputTexture, blurRadius);
  
  // Apply tint
  vec4 tinted = mix(blurred, tintColor, tintColor.a);
  
  // Apply opacity
  gl_FragColor = vec4(tinted.rgb, tinted.a * opacity);
}
```

**Usage in Design System:**
- Modal backgrounds
- Sheet overlays
- Card lift effects
- Navigation bars with content behind

**Implementation Guide:**
```css
/* CSS equivalent using backdrop-filter */
.frosted-glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
```

**Browser Support:**
- Chrome/Edge: ✓ (backdrop-filter)
- Safari: ✓ (backdrop-filter)
- Firefox: ✓ (backdrop-filter, enabled by default since v103)
- Fallback: Solid background color with opacity

**Examples:**
- [Figma file with examples](figma-url)
- [Live prototype](design-harness-url)

**Related:**
- See `context/design-system/FIGMA-FOUNDATIONS-DEPTH.md` for elevation system
- Related effect: "Glass Edge Highlight"
```

### 6. Repeat for all effects

Create catalog structure:

```
context/design-system/effects/
├── README.md                          # Index of all effects
├── frosted-glass.md                   # Effect documentation
├── glow-outline.md
├── animated-gradient.md               # Fill documentation
├── noise-texture.md
└── implementation-examples/           # Code snippets
    ├── frosted-glass.css
    ├── frosted-glass.tsx
    └── ...
```

---

## Documentation template

For each effect/fill:

```markdown
# [Effect Name]

**Type:** Shader Effect | Shader Fill

**Description:**
[What it does, when to use it]

**Source:** Figma shader library

**Visual Example:**
![Effect preview](image-url)

**Parameters:**
- [Param 1]: [Type, range, default]
- [Param 2]: [Type, range, default]

**Technical Details:**
```glsl
[Shader source code or pseudocode]
```

**Design System Usage:**
- [Use case 1]
- [Use case 2]

**Implementation Guide:**
```css / typescript / swift
[Code to recreate effect in production]
```

**Browser/Platform Support:**
- [Platform]: [Support status]
- Fallback: [What happens when not supported]

**Performance:**
- GPU intensive: Yes/No
- Recommended usage: [Sparingly on key moments / Safe for repeated use]

**Examples:**
- [Link to Figma file]
- [Link to Design Harness prototype]

**Version History:**
- v1.2 (2026-08-15): Added tint parameter
- v1.1 (2026-07-10): Performance optimization
- v1.0 (2026-06-01): Initial release

**Related:**
- [Related effects]
- [Design system documentation]
```

---

## Effect categories

Group by purpose:

### Depth & Materiality
- Frosted Glass
- Drop Shadow (custom)
- Inner Shadow
- Elevation

### Highlight & Emphasis
- Glow Outline
- Shimmer
- Spotlight

### Texture & Pattern
- Noise Texture
- Grain Overlay
- Halftone Pattern

### Animation & Motion
- Animated Gradient
- Particle System
- Wave Distortion

### Color & Tone
- Color Overlay
- Duotone Filter
- Vignette

---

## Implementation mapping

For each effect, provide code equivalents:

### Web (CSS/SVG)

```css
/* Frosted Glass */
backdrop-filter: blur(20px);

/* Glow Outline */
filter: drop-shadow(0 0 10px rgba(0, 112, 120, 0.6));

/* Animated Gradient */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
```

### React (styled-components)

```typescript
const FrostedCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(${props => props.blurRadius}px);
`;
```

### iOS (SwiftUI)

```swift
// Frosted Glass
.background(.ultraThinMaterial)

// Glow Outline
.shadow(color: .brand, radius: 10)
```

### Android (Jetpack Compose)

```kotlin
// Frosted Glass (approximation)
Modifier.blur(20.dp)
```

---

## Usage audit

Find where effects are used:

1. Search design files for effect usage
2. Search codebase for implementations
3. Document in catalog:

```markdown
**Used in:**
- Settings screen (frosted nav bar)
- Modal dialogs (backdrop)
- Celebration animations (glow on success)
- Empty states (subtle texture)

**Not used in:**
- Data tables (performance)
- Form inputs (accessibility)
```

---

## Performance considerations

Document performance impact:

| Effect Type | GPU Load | CPU Load | When to Use | When to Avoid |
|---|---|---|---|---|
| Blur (backdrop-filter) | High | Low | Rare overlays | Scrolling lists |
| Glow (filter) | Medium | Low | Emphasis moments | Repeated elements |
| Animated gradient | Medium | Medium | Loading states | Always-on backgrounds |
| Noise texture | Low | Low | Safe anywhere | N/A |
| Particle system | High | High | Celebrations only | Any common flow |

---

## Output format

After cataloging, create index in `context/design-system/effects/README.md`:

```markdown
# Custom Effects Catalog

Last updated: YYYY-MM-DD

## Shader Effects (5)

| Effect | Description | Category | Production Ready |
|---|---|---|---|
| [Frosted Glass](frosted-glass.md) | Blurred background overlay | Depth | ✓ |
| [Glow Outline](glow-outline.md) | Soft outer glow | Emphasis | ✓ |
| [Shimmer](shimmer.md) | Animated highlight | Motion | ⚠️ Performance |
| [Elevation Shadow](elevation-shadow.md) | Custom drop shadow | Depth | ✓ |
| [Wave Distortion](wave-distortion.md) | Ripple effect | Motion | ❌ Experimental |

## Shader Fills (3)

| Fill | Description | Category | Production Ready |
|---|---|---|---|
| [Animated Gradient](animated-gradient.md) | Smooth color transitions | Motion | ✓ |
| [Noise Texture](noise-texture.md) | Procedural noise | Texture | ✓ |
| [Halftone Pattern](halftone-pattern.md) | Dot pattern fill | Texture | ⚠️ Safari only |

## Implementation Status

**Web:**
- 6/8 effects have CSS equivalents
- 2/8 require canvas/WebGL

**iOS:**
- 5/8 effects achievable with native APIs
- 3/8 require Metal shaders

**Android:**
- 4/8 effects achievable with Compose
- 4/8 require custom rendering

## Guidelines

1. **Use sparingly** — Effects are expensive, reserve for key moments
2. **Test performance** — Profile on low-end devices
3. **Provide fallbacks** — Ensure graceful degradation
4. **Document usage** — Keep this catalog updated

## Contributing

When adding new effects:
1. Add entry to this index
2. Create dedicated documentation file
3. Provide implementation examples
4. Update design system guidelines
```

---

## Integration with other skills

- Called by `design-system` when documenting advanced features
- Feeds `ui-agent` with implementation patterns
- Supports `audit` by checking effect usage
- Referenced by `motion-choreography` for animated effects

---

## Forbidden

- Never document effects without testing implementation feasibility
- Never recommend GPU-intensive effects for common UI
- Never skip performance considerations
- Never document without browser/platform support matrix
