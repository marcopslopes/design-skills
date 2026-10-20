---
name: figma-token-sync
description: >
  Bidirectional sync between Figma design variables and context/design-system/tokens.css.
  Detects drift, auto-generates token updates, and validates naming conventions.
  Triggers on: "sync tokens from Figma", "update tokens.css from Figma", 
  "check token drift", "Figma variables to CSS", "tokens out of sync",
  "update Figma variables from code". CRITICAL for preventing design system drift.
  Runs after design system updates or before major releases.
---

# Figma Token Sync

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

You are syncing design tokens between Figma variables and the codebase. This
is a CRITICAL maintenance task that prevents design system drift — when
tokens diverge, designers work in one system while engineers build in another.

**Invoke in Cursor:** explicit request or as part of design system audits.

---

## Core principles

1. **Figma is source of truth for values** — when colors/sizes change, Figma leads
2. **CSS is source of truth for structure** — token organization follows code patterns
3. **Naming must be identical** — `category/sub/variant` in Figma → `--category-sub-variant` in CSS
4. **Never auto-commit breaking changes** — report drift, suggest fixes, wait for approval

---

## Workflow

### 1. Get Figma variable definitions

```javascript
// Ask designer for Figma file URL containing design tokens
// Extract fileKey and nodeId (typically the cover/tokens page)
const variables = await get_variable_defs({ fileKey, nodeId });
```

### 2. Parse tokens.css structure

Read `context/design-system/tokens.css` and parse all CSS custom properties:
- Extract token categories (color, spacing, shadow, font, etc.)
- Build map of `--token-name: value`
- Note any commented sections or special groupings

### 3. Compare and detect drift

Build three lists:

**In Figma but not in CSS:**
- New tokens that need adding
- Group by category for readability

**In CSS but not in Figma:**
- Deprecated tokens (maybe intentional)
- Code-only tokens (lab-specific)
- Flag for review — don't auto-delete

**Different values:**
- Token exists in both but values mismatch
- Show: `--kit-brand: #007078 (CSS) vs #007179 (Figma)`
- These are usually intentional Figma changes

### 4. Generate update suggestions

For each drift type, output:

```markdown
## Tokens to add (X new)

Add these to `tokens.css` in the [Category] section:

```css
--kit-new-color: #value;  /* From Figma: Color/New/Color */
--spacing-new: 24px;       /* From Figma: Spacing/New */
```

## Tokens to update (X changed)

```css
- --kit-brand: #007078;
+ --kit-brand: #007179;  /* Updated in Figma YYYY-MM-DD */
```

## Tokens in CSS only (X to review)

These don't exist in Figma — confirm if intentional:
- `--lab-specific-token` (only used in Design Harness lab)
- `--deprecated-old-color` (safe to remove?)
```

### 5. Naming validation

Check all tokens follow convention:
- Figma: `Color/Brand/Primary` → CSS: `--color-brand-primary`
- Flag violations: spaces, underscores, CamelCase in either system
- Suggest corrections

### 6. Update tokens.css (on approval)

When designer approves:
1. Backup current `tokens.css` to `tokens.css.backup-YYYY-MM-DD`
2. Apply changes preserving:
   - Comments and section headers
   - Indentation and formatting
   - Grouped tokens (keep neutrals together, etc.)
3. Add comment noting sync: `/* Synced from Figma YYYY-MM-DD */`

### 7. Reverse sync (CSS → Figma)

When designer requests pushing CSS changes to Figma:
1. Parse `tokens.css` for new/changed tokens since last sync
2. Use `use_figma` to update Figma variables
3. Match collections correctly (Color, Number, String, Boolean)
4. Preserve Figma modes (Light/Dark) if they exist

---

## Naming conventions

### Category mapping

| Figma Collection | CSS Prefix | Examples |
|---|---|---|
| Color | `--kit-`, `--color-` | `--kit-brand`, `--color-text-primary` |
| Number | `--spacing-`, `--size-`, `--radius-` | `--spacing-4`, `--size-button-height` |
| String | `--font-` | `--font-family-body`, `--font-weight-bold` |

### Format rules

**Figma to CSS:**
- `/` → `-` (slashes become hyphens)
- Lowercase everything
- Remove spaces

**CSS to Figma:**
- `--category-sub-variant` → `Category/Sub/Variant`
- Capitalize each part
- Hyphens become slashes

---

## Files to read

1. `context/design-system/tokens.css` — current token definitions
2. `context/design-system/STUDIO-OS-KIT-NOTES.md` — token authority rules
3. `context/design-system/FIGMA-FOUNDATIONS-*.md` — token documentation
4. `../design-system/SKILL.md` § Token rules

---

## Output format

After sync, append to relevant `projects/<slug>/findings.md` or log in
`harness/logs/token-sync-log.md`:

```markdown
### YYYY-MM-DD — figma-token-sync

**Source:** [Figma file name](figma-url)

**Drift detected:**
- 5 new tokens in Figma
- 3 value updates
- 2 CSS-only tokens (lab-specific, kept)

**Actions taken:**
- Added 5 new tokens to `tokens.css`
- Updated 3 changed values
- Preserved CSS-only lab tokens

**Next sync:** Scheduled for [date] or before next release
```

---

## Edge cases

**Multi-mode variables (Light/Dark):**
- Export both modes if they exist
- Use CSS custom properties with media queries or data attributes
- Document mode strategy in tokens.css comments

**Alias/reference tokens:**
- Figma variables can reference other variables
- Preserve references in CSS: `--color-primary: var(--kit-brand);`
- Never flatten aliases to raw values

**Code-only tokens:**
- Lab-specific tokens (--lab-*) stay in tokens.css only
- Component-specific overrides stay in CSS only
- Document in comments why they don't exist in Figma

**Breaking changes:**
- Renamed tokens require code search/replace
- Removed tokens need deprecation period
- Always warn before destructive changes

---

## Integration with other skills

- Called by `design-system` when tokens change
- Called by `audit` before releases
- Feeds into `design-kickoff` when starting token-heavy projects
- Used by `ui-agent` to validate token usage

---

## Forbidden

- Never auto-delete tokens without designer approval
- Never flatten alias references
- Never commit sync changes without showing diff first
- Never sync lab-only tokens to Figma
