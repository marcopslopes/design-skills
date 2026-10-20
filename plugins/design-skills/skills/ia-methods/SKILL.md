---
name: ia-methods
description: >-
  Plans, runs, and analyzes card sorting (how users mentally categorize
  content) and tree testing (whether users can find content in a given
  navigation structure) — the two evaluative/generative methods for
  information architecture and navigation decisions. Triggers on: "card
  sort", "card sorting", "tree test", "tree testing", "information
  architecture research", "IA research", "navigation testing",
  "findability", "how do users categorize this", "can users find things
  in this nav", "site map research", "rainbow chart", "directness
  score". Card sort → tree test → usability test is the recommended
  sequence; this skill covers the first two, `usability-test-guide`
  covers the third.
---

# IA Methods (Card Sorting + Tree Testing)

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Plans and analyzes the two structural IA methods: card sorting (how
users categorize content — generative or evaluative) and tree testing
(whether users can find content in a given hierarchy — evaluative only).
Run in sequence on a redesign: card sort builds the structure, tree test
validates it.

**Invoke in Cursor:** "plan a card sort for this nav", "build a tree test
for this IA", "help me test findability"

---

## Scope boundary

- **Fires on:** navigation/IA questions specifically — mental models of
  categorization, or findability of existing content.
- **Does not fire on:** why users behave a certain way (interviews),
  evaluating a specific interaction's usability (`usability-test-guide`),
  or open-ended generative discovery about needs (`research-synthesis`
  after interviews). Card sorting is structural, not motivational.
- **Card sort before tree test when both are needed** — card sort builds
  the structure from users' mental models; tree test checks whether that
  structure (or the current one) actually works.

---

## Method 1 — Card sorting

**Pick the type:**

| Type | When | Sample |
|---|---|---|
| **Open** | No existing IA, or not confident in current labels/concepts — pure mental-model discovery | 10–15 |
| **Closed** | Concepts/categories already well-defined, want quantifiable validation | 30–50 |
| **Hybrid** (default for redesigns) | Some validated concepts, but likely missing/mislabeled elements — evaluates and discovers at once | 30–50 |

**Build the card set:** derive from the current site map (header/primary/
secondary nav, filters, footer, key content types). Never exceed 40 cards
(decision fatigue → noise); aim for 20–30. Keep items at the same level
of abstraction — don't mix "Filters" with "Blue." Include the items
you're genuinely uncertain about the placement of; those are the most
valuable cards. For hybrid sorts, add blank cards participants can fill
in for anything missing.

**Moderate 10 sessions first, then scale unmoderated 20–30** to validate
patterns at scale — the reasoning behind a placement is often more
valuable than the placement itself, so don't skip straight to
unmoderated at volume.

**Opening script (hybrid/closed):** "Organize these cards into groups
that make sense to you — no right or wrong answer. Think aloud. Set
aside anything confusing — that's useful too." Never suggest where a
card belongs, even when asked — redirect: "where would you expect to
find it?"

**Analyze:**
1. Build a matrix (rows = cards, columns = categories, cells = placement
   counts).
2. Apply a threshold — remove data below ~15% of participant total as
   noise.
3. Highlight the dominant category per card (its strongest mental-model
   home). Flag cards with **no** dominant assignment — contested cards
   needing tree testing, more interviews, or an explicit stakeholder call.
4. For hybrid: review edited/renamed cards (mislabeling signal) and
   added blank cards (missing-element signal).

## Method 2 — Tree testing

**What it measures — and doesn't:** whether users can find content by
labels/hierarchy alone (text-only, no visual design). It does **not**
tell you why they took a path (need moderated sessions for that) or how
to fix the structure (need card sorting for that).

**Build the tree:** text-only hierarchy from the current or proposed
site map, primary → sub-category → third-level items relevant to the
tasks being tested. Most tools (TreeJack/Optimal Workshop, Maze, UserZoom)
accept a pasted spreadsheet structure.

**Write tasks (5–10 max):** realistic scenario, never using the exact
nav label being tested (that tests reading, not navigation).

❌ "Find a wall-hung basin." (leading — uses the label)
✅ "You're considering a bathroom renovation. See if there's a basin
that attaches directly to a wall."

**Sample size:** 50–100 gives reliable 95% confidence for most contexts;
unmoderated online format makes this volume realistic (sessions run
10–20 min).

**The three metrics:**
- **Task success rate** — % who reached the correct destination. Below
  ~70–75% on an important task signals a real findability problem.
- **Time on task** — friction/uncertainty even when they succeed.
- **Directness** — % who reached the answer with zero wrong turns. Often
  more revealing than success: a user who succeeds after 5 wrong turns
  has low directness — a real label problem hiding behind an eventual
  "pass."

**Reading the four combinations:**

| Success | Directness | Means |
|---|---|---|
| High | High | Working — use as benchmark |
| High | Low | Findable, path is confusing — fix the label at the wrong-turn point |
| Low | High | Users confidently pick the *wrong* thing — major label mismatch |
| Low | Low | Significant IA/labeling problem — back to card sorting |

**A/B labels within a tree test:** if card sorting produced mixed
results on a term (e.g. "Basins" vs. "Sinks"), run two tree variants with
separate participant groups and compare directness/success.

---

## Output format

```markdown
## IA study — [Project/topic] (Card sort / Tree test)

**Method + sample:** [type, n, moderated/unmoderated split]
**Card set / tree structure:** [attached or summarized]

Card sort results:
| Card | Dominant category | Count | Contested? |
|---|---|---|---|

Tree test results:
| Task | Success % | Time on task | Directness % | Read |
|---|---|---|---|---|

**Recommendation:** [label/structure changes, or follow-up method —
tree test after this card sort, or back to card sort if tree test failed]
```

---

## Persist

Append results + recommendation to `projects/<slug>/findings.md` (dated,
named `ia-methods`). If this validates or overturns an existing IA
documented elsewhere in the repo, note that cross-reference explicitly.

---

## Never do this

- Never exceed 40 cards in a card sort — it produces noise, not signal.
- Never use the exact navigation label inside a tree-test task — that
  tests reading comprehension, not findability.
- Never treat a low-directness/high-success tree test result as "fine
  because they got there" — that's a real label problem hiding behind a
  technical pass.

---

## Related files

| File | Role |
|------|------|
| `../design-kickoff/SKILL.md` § Step 1.5 | Method menu's "card sort / tree test" line routes here |
| `../decision-first-research/SKILL.md` | Routes structural/IA unknowns to this skill |
| `../usability-test-guide/SKILL.md` | Next step after tree testing validates the structure |
| `references/worked-example.md` | Full card-sort → tree-test sequence on a contested label |
