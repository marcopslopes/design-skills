# Token Format Examples & Conversion

Examples of supported token formats and how to convert them to CSS.

## CSS Variables (Native)

**Input:**
```css
:root {
  --color-brand: #007bff;
  --color-surface: #ffffff;
  --spacing-01: 0.25rem;
  --spacing-02: 0.5rem;
  --radius-sm: 4px;
}
```

**Output:** Copy as-is to `context/design-system/tokens.css`

---

## JSON Tokens

**Input:**
```json
{
  "color": {
    "brand": "#007bff",
    "surface": "#ffffff"
  },
  "spacing": {
    "01": "0.25rem",
    "02": "0.5rem"
  },
  "radius": {
    "sm": "4px"
  }
}
```

**Conversion Logic:**
```javascript
// Flatten nested structure
function jsonToCss(tokens, prefix = '') {
  let css = ':root {\n';
  
  for (const [key, value] of Object.entries(tokens)) {
    if (typeof value === 'object') {
      // Recurse for nested objects
      const nested = jsonToCss(value, `${prefix}${key}-`);
      css += nested.replace(':root {', '').replace('}', '');
    } else {
      // Create CSS variable
      css += `  --${prefix}${key}: ${value};\n`;
    }
  }
  
  css += '}\n';
  return css;
}
```

**Output:**
```css
:root {
  --color-brand: #007bff;
  --color-surface: #ffffff;
  --spacing-01: 0.25rem;
  --spacing-02: 0.5rem;
  --radius-sm: 4px;
}
```

---

## JavaScript/TypeScript Tokens

**Input:**
```javascript
export const tokens = {
  color: {
    brand: '#007bff',
    surface: '#ffffff'
  },
  spacing: {
    '01': '0.25rem',
    '02': '0.5rem'
  },
  radius: {
    sm: '4px'
  }
};
```

**Conversion:** Same as JSON (parse the object, ignore exports)

---

## Style Dictionary Format

**Input:**
```json
{
  "color": {
    "brand": {
      "value": "#007bff",
      "type": "color"
    },
    "surface": {
      "value": "#ffffff",
      "type": "color"
    }
  }
}
```

**Conversion:**
```javascript
// Extract value property
function styleDictionaryToCss(tokens, prefix = '') {
  let css = ':root {\n';
  
  for (const [key, obj] of Object.entries(tokens)) {
    if (obj.value !== undefined) {
      // Direct token
      css += `  --${prefix}${key}: ${obj.value};\n`;
    } else if (typeof obj === 'object') {
      // Nested group
      const nested = styleDictionaryToCss(obj, `${prefix}${key}-`);
      css += nested.replace(':root {', '').replace('}', '');
    }
  }
  
  css += '}\n';
  return css;
}
```

---

## Tailwind Config

**Input:**
```javascript
module.exports = {
  theme: {
    colors: {
      brand: '#007bff',
      surface: '#ffffff'
    },
    spacing: {
      '1': '0.25rem',
      '2': '0.5rem'
    }
  }
}
```

**Conversion:**
```javascript
// Extract theme object
function tailwindToCss(config) {
  const theme = config.theme || {};
  let css = ':root {\n';
  
  // Colors
  if (theme.colors) {
    for (const [key, value] of Object.entries(theme.colors)) {
      css += `  --color-${key}: ${value};\n`;
    }
  }
  
  // Spacing
  if (theme.spacing) {
    for (const [key, value] of Object.entries(theme.spacing)) {
      css += `  --spacing-${key}: ${value};\n`;
    }
  }
  
  css += '}\n';
  return css;
}
```

---

## Figma Tokens Plugin

**Input:**
```json
{
  "$themes": [],
  "global": {
    "color": {
      "brand": {
        "value": "#007bff",
        "type": "color"
      }
    }
  }
}
```

**Conversion:** Similar to Style Dictionary, but extract from `global` object

---

## Conversion Strategy

1. **Detect format:**
   - Check file extension (`.css`, `.json`, `.js`, `.ts`)
   - Parse content
   - Identify structure (flat, nested, Style Dictionary, etc.)

2. **Convert to CSS:**
   - Use appropriate converter function
   - Generate CSS variables
   - Preserve naming conventions

3. **Add metadata:**
   ```css
   /**
    * Imported from: ~/path/to/tokens.json
    * Import date: 2026-08-26
    * Format: Style Dictionary
    * 
    * Original structure preserved below
    */
   ```

4. **Write to file:**
   - Save to `context/design-system/tokens.css`
   - Backup original if exists
   - Validate syntax

---

## Error Handling

### Unsupported Format

```
Warning: Unrecognized token format.

Your file doesn't match any known format:
- CSS variables
- JSON tokens
- JavaScript exports
- Style Dictionary
- Tailwind config
- Figma tokens

You can:
1. Provide a different file
2. Convert manually to CSS variables first
3. Skip and use default tokens

What would you like to do?
```

### Partial Parse

```
Warning: Could only parse some tokens.

Successfully imported:
- Colors (12 tokens)
- Spacing (8 tokens)

Failed to parse:
- Typography (unknown structure)
- Shadows (missing values)

Continue with partial import?
```

### Name Conflicts

```
Warning: Token name conflicts detected.

Your tokens have the same names as existing tokens:
- --color-brand (yours: #007bff, existing: #0066cc)
- --spacing-01 (yours: 4px, existing: 0.25rem)

Replace existing with yours?
