---
name: figma-asset-sync
description: >
  Automated asset pipeline between Figma and codebase. Downloads SVGs, PNGs, and
  raw images from Figma component pages using download_assets. Uploads design
  assets to Figma using upload_assets. Generates sprite sheets and icon bundles.
  Triggers on: "download assets from Figma", "export icons from Figma",
  "sync Figma assets", "upload assets to Figma", "generate icon bundle",
  "update design assets". Essential for icon systems and image management.
---

# Figma Asset Sync

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

You are managing the asset pipeline between Figma and the codebase. This
automates the manual export/import workflow that causes version drift,
naming inconsistencies, and missing assets.

**Invoke in Cursor:** explicit request or as part of design system updates.

---

## Core capabilities

1. **Download from Figma** — SVGs, PNGs, source images
2. **Upload to Figma** — Sync code-generated assets back
3. **Bundle generation** — Icon sprites, image atlases
4. **Naming validation** — Consistent kebab-case across systems
5. **Version tracking** — Know what changed since last sync

---

## Workflow: Download assets from Figma

### 1. Identify source

Ask designer for:
- Figma file URL (usually the design system file)
- Node ID of the icon/asset page or component set
- Specific components to export (or "all icons")

### 2. Download assets

```javascript
const assets = await download_assets({
  fileKey: "extracted-from-url",
  nodeId: "page-or-component-id",
  defaultFormat: "svg",  // or "png" for raster assets
  defaultScale: 1        // or 2 for @2x, 3 for @3x
});

// Returns:
// {
//   export: { url, format },         // Exported render of the whole node
//   rawImages: [...],                // Source images (JPEG, PNG, GIF, WebP)
//   svgAssets: [...]                 // Vector layers as SVG
// }
```

### 3. Process and save

For each asset:

**SVGs (icons, logos, illustrations):**
- Save to `context/design-system/assets/icons/` or `/illustrations/`
- Filename: kebab-case from Figma component name
  - `Icon/Navigation/Home` → `icon-navigation-home.svg`
- Optimize SVG: remove Figma IDs, clean up paths
- Validate: check viewBox, ensure fill="currentColor" for icons

**PNGs (raster images):**
- Save to `context/design-system/assets/images/`
- Include scale in filename: `image-name@2x.png`
- Generate WebP versions for web optimization

**Source images (from fills):**
- Save to `context/design-system/assets/source/`
- Preserve original format (JPEG, PNG, GIF, WebP)
- Document where they're used in design system

### 4. Generate manifests

Create `assets/manifest.json`:

```json
{
  "lastSync": "2026-08-27T09:00:00Z",
  "sourceFile": "https://figma.com/design/...",
  "icons": [
    {
      "name": "icon-navigation-home",
      "path": "icons/icon-navigation-home.svg",
      "figmaNodeId": "123:456",
      "category": "navigation"
    }
  ],
  "images": [...],
  "illustrations": [...]
}
```

### 5. Generate bundles (optional)

**Icon sprite sheet:**
```javascript
// Combine all icons into single SVG sprite
// Save to public/assets/icon-sprite.svg
// Update Icon component to use sprite references
```

**Icon TypeScript types:**
```typescript
// Generate from manifest
export type IconName = 
  | 'icon-navigation-home'
  | 'icon-navigation-search'
  | ...;
```

---

## Workflow: Upload assets to Figma

### 1. Identify targets

When code generates assets (programmatic illustrations, data viz, charts):
- Designer specifies target Figma file and page
- Assets to upload (file paths)

### 2. Upload to Figma

```javascript
const result = await upload_assets({
  fileKey: "target-file",
  assets: [
    {
      name: "Generated Chart",
      url: "file:///path/to/chart.png"  // or http:// URL
    }
  ]
});

// Returns references to inserted images
```

### 3. Document in Figma

Use `use_figma` to:
- Create frame with uploaded image
- Add text layer documenting: generated date, source, parameters
- Place in "Code Generated" section

---

## Asset naming conventions

### Figma → Code

| Figma Component | Code Filename | Category |
|---|---|---|
| `Icon/Navigation/Home` | `icon-navigation-home.svg` | icons/ |
| `Illustration/Empty State` | `illustration-empty-state.svg` | illustrations/ |
| `Image/Onboarding/Welcome` | `image-onboarding-welcome.png` | images/ |
| `Logo/Brand/Primary` | `logo-brand-primary.svg` | logos/ |

### Rules

- All lowercase, kebab-case
- Category prefix (icon-, illustration-, image-, logo-)
- Slash hierarchy flattened to hyphens
- Remove spaces and special characters

---

## Files structure

```
context/design-system/assets/
├── manifest.json              # Sync metadata
├── icons/                     # SVG icons (fill: currentColor)
│   ├── icon-navigation-home.svg
│   ├── icon-action-edit.svg
│   └── ...
├── illustrations/             # SVG illustrations (multi-color)
│   ├── illustration-empty-state.svg
│   └── ...
├── images/                    # Raster images (PNG, WebP)
│   ├── image-onboarding-welcome.png
│   ├── image-onboarding-welcome@2x.png
│   └── ...
├── logos/                     # Brand logos
│   ├── logo-brand-primary.svg
│   └── ...
└── source/                    # Original uploaded images from Figma
    ├── photo-hero-background.jpg
    └── ...
```

---

## Integration with Icon component

After sync, update `context/design-system/ds/Icon.tsx`:

```typescript
import iconManifest from '../assets/manifest.json';

export type IconName = 
  | 'navigation-home'    // Remove 'icon-' prefix for API
  | 'navigation-search'
  | 'action-edit'
  | ...;

export const Icon = ({ name, size = 24 }: { name: IconName; size?: number }) => {
  // Load from sprite or individual file
  return <svg>...</svg>;
};
```

---

## Validation checks

Before completing sync:

**Naming:**
- All assets follow kebab-case convention
- No spaces, underscores, or special characters
- Category prefix present and correct

**SVG quality (icons):**
- Valid viewBox attribute
- No hardcoded colors (use currentColor)
- No Figma-specific IDs or metadata
- Optimized paths (run SVGO)

**Completeness:**
- All Figma components have matching files
- No orphaned files (in code but not in Figma)
- Manifest up to date

**Performance:**
- SVGs under 5KB each
- PNGs under 100KB each (or provide WebP)
- Total bundle size reasonable

---

## Output format

After sync, log in `harness/logs/asset-sync-log.md`:

```markdown
### YYYY-MM-DD — figma-asset-sync

**Source:** [Figma file name](figma-url)

**Downloaded:**
- 24 icons (SVG)
- 8 illustrations (SVG)
- 5 images (PNG @1x, @2x)

**Changes detected:**
- 3 new icons added
- 2 icons updated
- 1 icon removed (archived)

**Bundles generated:**
- Icon sprite: public/assets/icon-sprite.svg (42KB)
- TypeScript types: context/design-system/ds/Icon.types.ts

**Validation:** All checks passed ✓

**Next sync:** When design system assets change
```

---

## Edge cases

**Multi-scale exports:**
- Icons: usually 1x only (SVG scales)
- Images: export @1x, @2x, @3x
- Save with scale suffix: `image@2x.png`

**Color variations:**
- Figma component variants → separate files
- `icon-star-filled.svg` vs `icon-star-outline.svg`
- Document in manifest

**Animated icons:**
- Export as SVG with SMIL animation preserved
- Or export as video with `export_video` (see motion-choreography)

**Large asset sets:**
- Download in batches (Figma MCP has size limits)
- Process incrementally
- Show progress to designer

**Asset references in code:**
- After sync, check for broken imports
- Update any hardcoded asset paths
- Regenerate sprite if icons changed

---

## Integration with other skills

- Called by `design-system` when assets are updated in Figma
- Used by `ui-agent` to validate Icon component usage
- Feeds `audit` to check for missing/outdated assets
- Supports `figma-library-manager` for asset discovery

---

## Forbidden

- Never overwrite source files without designer approval
- Never upload non-design assets to Figma (code, configs, etc.)
- Never skip naming validation
- Never commit asset changes without showing diff summary
