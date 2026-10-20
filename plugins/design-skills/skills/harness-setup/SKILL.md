---
name: harness-setup
description: "Guides the designer through customizing the harness with their existing design system, brand guidelines, and company context."
---

# Harness Setup & Customization

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Guides the designer through customizing the harness with their existing design system, brand guidelines, and company context.

**When to use:**
- First-time setup after installing the plugin
- Importing existing design system
- Updating company/brand guidelines
- Switching to a new project context

**What it does:**
- Asks about existing files (design tokens, brand docs, patterns, etc.)
- Imports their files into the harness structure
- Falls back to defaults (Northline/Design Harness kit) for missing files
- Creates customized `org-pack.local/` folder
- Verifies everything works
- Shows what's using custom vs. default

---

## Prerequisites

**Must exist:**
- Harness repo cloned locally (if plugin-only, prompt to clone)
- `npm install` completed (for Design Harness preview)

**Check first:**
```bash
# Check if repo exists
ls ~/Documents/design-harness

# If not, offer to clone:
cd ~/Documents
git clone https://github.com/marcopslopes/design-harness.git
cd design-harness
npm install
```

---

## Onboarding Questions

Ask each question in sequence. For each "Yes", ask for file path and import. For each "No", use defaults.

### 1. Design System / Tokens

**Question:**
> "Do you have an existing design system with tokens (colors, spacing, typography, etc.)?"

**If Yes:**
1. Ask: "What's the path to your tokens file? (CSS, JSON, or JS)"
2. Read their file
3. Parse tokens (handle CSS variables, JSON, JS exports)
4. Write to `context/design-system/tokens.css` (convert if needed)
5. Confirm: "✓ Imported your design tokens. Preview at http://localhost:3001/design-system"

**If No:**
1. Confirm: "✓ Using Design Harness kit tokens (teal + plum palette with warm paper)"
2. Note: "You can import your tokens later by running /harness-setup again"

---

### 2. Brand Voice / Guidelines

**Question:**
> "Do you have brand voice or writing guidelines?"

**If Yes:**
1. Ask: "What's the path to your brand/voice doc?"
2. Read their file
3. Parse relevant sections:
   - Voice attributes (professional, friendly, technical, etc.)
   - Tone guidelines
   - Word preferences
   - Examples
4. Create `context/org-pack.local/COMPANY-VOICE.md` following the template structure
5. Confirm: "✓ Imported your brand voice. Skills will now use YOUR voice."

**If No:**
1. Confirm: "✓ Using Northline example voice (friendly B2B SaaS)"
2. Copy `context/org-pack/COMPANY-VOICE.md` as reference
3. Note: "Skills will use the example voice. You can customize later."

---

### 3. User Personas / Archetypes

**Question:**
> "Do you have user personas, archetypes, or customer profiles?"

**If Yes:**
1. Ask: "What's the path to your personas doc?"
2. Read their file
3. Parse personas:
   - Name/role
   - Goals
   - Pain points
   - Behaviors
4. Create `context/org-pack.local/COMPANY-ARCHETYPES.md`
5. Confirm: "✓ Imported your user personas. UX patterns will reference these."

**If No:**
1. Confirm: "✓ Using Northline example personas (Provider, Client, Admin)"
2. Note: "Skills will use example personas for UX decisions."

---

### 4. UX Patterns / Design Patterns

**Question:**
> "Do you have documented UX patterns or design patterns?"

**If Yes:**
1. Ask: "What's the path to your patterns doc?"
2. Read their file
3. Parse patterns:
   - Pattern name
   - When to use
   - Structure
   - Examples
4. Create `context/org-pack.local/COMPANY-PATTERNS.md`
5. Confirm: "✓ Imported your UX patterns. /ux-pattern will validate against these."

**If No:**
1. Confirm: "✓ Using generic UX patterns (forms, navigation, tables, etc.)"
2. Note: "Skills will use standard patterns."

---

### 5. Company Context / Business

**Question:**
> "Do you have company/product context documented? (what you build, who for, key differentiators)"

**If Yes:**
1. Ask: "What's the path to your company/product doc?"
2. Read their file
3. Parse context:
   - Product/service description
   - Target market
   - Key features
   - Differentiators
4. Create `context/org-pack.local/COMPANY-BUSINESS.md`
5. Confirm: "✓ Imported your company context. Skills will understand your product."

**If No:**
1. Confirm: "✓ Using Northline example (appointment booking SaaS)"
2. Note: "Skills will use the example company context."

---

### 6. Vocabulary / Glossary

**Question:**
> "Do you have a company vocabulary, glossary, or terminology guide?"

**If Yes:**
1. Ask: "What's the path to your glossary?"
2. Read their file
3. Parse terms:
   - Term
   - Definition
   - Usage notes
4. Create `context/org-pack.local/COMPANY-VOCABULARY.md`
5. Confirm: "✓ Imported your terminology. Content skill will use these terms."

**If No:**
1. Confirm: "✓ Using generic vocabulary"
2. Note: "Skills will use standard terminology."

---

## After All Questions

### Create org-pack.local structure

```bash
mkdir -p context/org-pack.local

# Create only the files they provided
# Leave others to fall back to context/org-pack/ defaults
```

### Verify Setup

1. Check files exist:
   ```bash
   ls context/org-pack.local/
   ls context/design-system/tokens.css
   ```

2. Test Design Harness preview:
   ```bash
   npm run dev
   ```

3. Confirm it opens at `http://localhost:3001`

### Show Summary

```
Setup Complete! Here's your configuration:

📦 Design System
   ✓ Using YOUR tokens (imported from ~/path/to/tokens.css)
   Preview: http://localhost:3001/design-system

📝 Brand Voice
   ○ Using default (Northline example)
   You can add yours by running /harness-setup again

👥 User Personas
   ✓ Using YOUR personas (imported from ~/path/to/personas.md)

🎨 UX Patterns
   ✓ Using YOUR patterns (imported from ~/path/to/patterns.md)

🏢 Company Context
   ○ Using default (Northline example)

📚 Vocabulary
   ○ Using default

Legend:
✓ = Your custom content
○ = Default/example content

You can update any of these anytime by running:
/harness-setup

Your harness is ready! Try:
- /ui-agent - Build screens with YOUR tokens
- /audit - Quality check against YOUR patterns
- /content - Content review with YOUR voice
```

---

## Error Handling

### Repo Not Cloned

```
Error: Harness repo not found.

To use the full harness with preview, let me clone the repo:

cd ~/Documents
git clone https://github.com/marcopslopes/design-harness.git
cd design-harness
npm install

This will take 2-3 minutes. Proceed? (yes/no)
```

### File Not Found

```
Error: Could not find file at ~/path/to/tokens.css

Please check:
1. Path is correct
2. File exists
3. You have read permissions

Try again? (yes/no/skip)
```

### Parse Error

```
Warning: Could not fully parse your [tokens/voice/patterns] file.

I was able to import some parts, but some sections may be incomplete.

What was imported:
- [List what worked]

What was skipped:
- [List what failed]

Continue with partial import? (yes/no)
```

---

## File Format Support

### Design Tokens

**Supported formats:**
- CSS (`:root { --color-brand: #007bff; }`)
- JSON (`{ "color": { "brand": "#007bff" } }`)
- JS/TS (`export const tokens = { ... }`)

**Conversion:**
- Always output to `context/design-system/tokens.css`
- Convert JSON/JS to CSS variables
- Preserve original structure in comments

### Markdown Files

**Expected structure:**
```markdown
# Title

## Section 1
Content...

## Section 2
Content...
```

**Handling:**
- Preserve structure
- Extract key sections
- Keep examples
- Maintain formatting

---

## Self-Improvement Loop

After completing setup, review:

1. **Import failures:** Did any file imports fail or need manual intervention?
2. **Format issues:** Did we encounter unsupported file formats?
3. **User confusion:** Did the user need clarification on any questions?
4. **Missing questions:** Should we ask about other company assets?

If issues occurred, suggest improvements to:
- Question phrasing
- File format support
- Error messages
- Fallback handling

---

## Related Skills

- `/designer-onboarding` - First-time designer profile setup
- `/design-system` - Validate design token usage
- `/audit` - Quality gate using imported patterns
- `/content` - Content review using imported voice
