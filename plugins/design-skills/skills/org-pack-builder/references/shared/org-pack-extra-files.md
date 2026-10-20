# Extra company-pack files (self-describing)

The company pack has eight standard files (`harness/ORCHESTRATOR.md` §0a).
Anything else a team wants skills to know — localisation tables, pricing
rules, legal copy, market notes — goes in as an **extra file** that says what
it is and when to read it. No skill has to be edited to pick it up.

## The header

Every extra `COMPANY-*.md` starts with:

```markdown
---
about: Approved feature names per market, by locale
use-when: copy, translations, content, localisation
---
```

| Key | Rule |
|-----|------|
| `about` | One line, what the file holds. Shown in Design Harness Settings. |
| `use-when` | Comma-separated plain words: skill names (`content`, `ux-pattern`, `ui-agent`) or topics (`pricing`, `checkout`, `copy`). Lowercase. |

Name: `COMPANY-<TOPIC>.md`, uppercase topic, hyphens only
(`COMPANY-PRICING.md`, `COMPANY-LEGAL-COPY.md`). Lives in
`context/org-pack.local/` (real content) — never in `context/org-pack/`.

## How skills use them

At the step where a skill loads its company context:

1. Load the standard files it already names (unchanged).
2. List the other `COMPANY-*.md` files in the resolved pack folder and read
   each header (first ~5 lines only).
3. Read the full file when any `use-when` word matches the running skill's
   name or the task's topic. When unsure, read it — the header is the cost
   of a false positive, a wrong answer is the cost of a false negative.
4. An extra file **without** a header: don't guess. Mention it once in the
   reply ("`COMPANY-X.md` has no header, so I didn't read it — want me to
   add one?") and carry on.

Skills that already name an extra file directly (e.g. `content` →
`COMPANY-LOCALIZATION.md`) keep doing so; the header just makes it
discoverable to every other skill too.

## Adding one

Three equivalent ways, all write the same header:

- **Design Harness → Settings → Company context → Add a file** (running locally).
  Saves into `context/org-pack.local/`, never overwrites.
- **Chat:** "add this to the company pack" + the doc →
  `org-pack-builder` § Add a file (asks merge vs new file first).
- **By hand:** drop the file in `context/org-pack.local/` with the header
  above.
