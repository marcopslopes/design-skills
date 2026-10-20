# Domain mapping

Maps what exists in the real world **independently of any product** — the
concepts, terminology, processes, relationships, and mental models users
bring with them. This is observation, not design. It comes *before*
`conceptual-model`'s object decisions and feeds them the raw material.

---

## Why this is a separate step from conceptual modeling

`conceptual-model`'s noun-foraging technique already sorts nouns into
objects / attributes / instances-or-values — but that sorting assumes
you're deciding what the *product* will recognize. Domain mapping is
earlier and looser: it just records how the *domain* actually talks about
itself, contradictions included, before anyone commits to a product
decision.

**The core discipline: don't resolve contradictions — record them.**
Messy, inconsistent domain language is *data*. It signals where
communities have diverged and where the product will later have to
choose. That choice belongs to `conceptual-model`, not here. If you find
yourself picking a winner between two terms while doing domain work,
you've slipped into conceptual modeling — stop and just log both.

---

## The decisions this layer makes

- What the key concepts in this domain are, and how they relate
- What language people use — and where it conflicts or diverges
- Where the natural seams are: communities that use the same words
  differently
- What events and processes structure the domain's activity over time

If the domain is already well understood and uncontested, skip straight
to `conceptual-model` — this step doesn't earn its keep on obvious ground.

---

## Disciplines — what keeps domain work honest

- **Don't resolve contradictions — record them.** Capture **synonyms**
  (same thing, different names) and **polysemy** (same name, different
  things in different contexts) as findings, not problems to fix.
- **Stay in the real world.** Push back whenever answers drift toward
  product or interface decisions ("so in the app we'd call it..."). The
  question is always how the domain works *before* your product enters
  it.
- **Real objects vs instances (for the noun harvest).** A true object is
  *instanceable* (you can have many), *structured* (has its own
  attributes), and *useful* (people care about it in its own right).
  Watch for instances mistaken for objects: "CAC", "ROAS", "LTV" aren't
  objects — they're instances of one object, **Metric**. Mark each noun
  *object / attribute / instance-or-value / unclear* — don't filter
  aggressively; `conceptual-model` does the final sorting.
- **Beliefs vs reality.** If you're mapping what the team believes
  rather than researched fact, say so throughout — it's the team's model,
  not necessarily how users experience the domain.

---

## Techniques

Pick what fits the live question — concept mapping plus a terminology
audit is the usual core. Don't run every technique on every domain.

| Technique | Use it when |
|---|---|
| **Concept maps / bubble diagrams** (Mermaid `graph TD`/`LR`) | The domain is complex and poorly understood. Informal nodes-and-lines show how concepts relate without forcing premature structure. |
| **Terminology audit** | Capture, per concept: the names used, who uses which and when, and whether the conflict is synonymy or polysemy. Don't pick a winner. |
| **Bounded-context mapping** | Communities share vocabulary internally but diverge across groups. Name and describe each seam — it will matter when the model is defined. |
| **Noun harvest** | Compile every noun surfaced, marked object / attribute / instance-or-value / unclear. Raw material for `conceptual-model`. |
| **Domain event storming** | Process-heavy domain. Name significant events in past tense on a timeline; note triggers and results. Objects with events clustered around them likely need state diagrams later. |
| **Expert interviews** | Domain knowledge lives in people, not documents — surfaces tacit knowledge and contested terms. |
| **Document & artifact analysis** | The domain produces contracts, forms, invoices, reports that reveal natural structure and vocabulary. |
| **Competitive analysis** | Entering an established domain — existing products reveal how others modeled it, and where they disagree. Hand off to `competitor-scan` for the structured version. |
| **Shadowing** | Workflows are hard to articulate; watching reveals what people actually do. Hand off to `research-agent` / contextual inquiry for the structured version. |

### Terminology audit format

| Concept (informal) | Names used | Who uses which | Synonym or polysemy? | Notes |
|---|---|---|---|---|
| [what the concept is, in plain English] | [term A / term B / term C] | [team / users / which segment] | [same thing, different names / same name, different things] | [seam this reveals] |

### Domain event storming format

Timeline of past-tense events:

```
[Event 1] → [Event 2] → [Event 3] → ...
```

For each event, note: what triggered it, what resulted, which object(s)
cluster around it (candidate for a state diagram later).

### Noun harvest format

| Noun | Object / Attribute / Instance-or-value / Unclear | Reasoning |
|---|---|---|
| | | |

---

## Working with the designer

1. Open by asking **what domain** you're mapping, **who operates in it**,
   and **what they're trying to accomplish** — before any product exists.
2. Surface concepts — listen for nouns (candidate objects), verbs
   (processes), and the natural vocabulary, including what people
   *actually call* things (not the internal team term).
3. Offer the technique that fits the live question: a concept map when
   relations are unclear, a terminology audit when language is contested,
   event storming when the domain is process-heavy. Do the next useful
   thing, not all of them.
4. Capture only the residue — the concept map if it earned its place, the
   documented terminology conflicts and bounded contexts, any key events,
   and the noun harvest. This is raw material, not a finished document.

---

## What happens next

The noun harvest is the starting point for `conceptual-model`'s Step 1
(noun foraging + OOUX technique) — hand the sorted-but-undecided nouns
there to become object definitions, relationships, states, and
ubiquitous language.

---

## Output format

```markdown
## Domain map — [domain/segment] — YYYY-MM-DD

**Source:** [research / expert interview / team belief — label which]

### Concept map (if used)
[Mermaid graph, or prose relationship list]

### Terminology audit
| Concept | Names used | Who uses which | Synonym or polysemy | Notes |
|---|---|---|---|---|

### Bounded contexts (if found)
- [Community A] calls it [X] / [Community B] calls it [Y] — seam: [why it matters]

### Domain events (if process-heavy)
[Timeline]

### Noun harvest
| Noun | Object / Attribute / Instance-or-value / Unclear | Reasoning |
|---|---|---|

### Open contradictions (deliberately unresolved)
- [Term/concept disagreement] — resolve in `conceptual-model`, not here
```
