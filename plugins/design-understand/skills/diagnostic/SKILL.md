---
name: diagnostic
description: >-
  Rapid audit across all design layers to identify bottlenecks and recommend
  where to focus next. Front-door triage. Triggers on: "where should I focus",
  "what's the most important thing to do", "where do I start", "diagnostic",
  "what's the bottleneck", "which layer is weak", "where are the gaps". Maps
  current state of decisions across research/strategy/model/structure/surface,
  identifies the lowest layer with unresolved or risky decisions, and
  recommends which skill to run next. Not a deep dive (that's what individual
  skills do) — this answers "which layer deserves attention most urgently?"
---

# Diagnostic

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Rapid audit across all design layers — find the bottleneck and recommend
where to focus.

This is the **front door** for "I'm not sure where to start" or "what's
the most important thing to do next?" It maps the current state of
decisions across your skill landscape, identifies the weakest/most
foundational layer, and tells you which skill to run.

**Invoke in Cursor:** "where should I focus?", "diagnostic", "what's the
bottleneck?"

---

## What this does

Not a deep dive into any layer — that's what individual skills do. This
answers the **prior question**: *which layer deserves attention most
urgently?*

Keeps it fast and light — the output is a short audit table and one
recommendation, not a report.

---

## When to use it

**Use diagnostic when:**
- Starting a new project and unsure where to begin
- Stuck or spinning — not clear what the next move is
- Multiple things feel wrong but can't prioritize
- Want to check if foundations are solid before building up
- Designer asks "where should I focus?" / "what's most important?"

**Don't use it when:**
- Already know exactly what needs work (just run that skill)
- Deep into execution on one layer (not time to step back)
- Problem is tactical/local, not foundational

---

## Design layers (what we audit)

Design framework applied to design-harness skill landscape:

| Layer | What it settles | Harness skills | Weak signals |
|-------|----------------|----------------|--------------|
| **1. Observed behavior / Domain** | What users actually do; domain concepts/vocabulary before any product | `research-agent`, `org-pack-builder`, `research-synthesis` | "We think users...", no research citations, domain terms contested |
| **2. User needs** | What users are trying to achieve and why (jobs, pains, desires) | `research-artifacts` (personas/jobs), user needs from `design-kickoff` | Generic "more bookings", no JTBD, needs trace to strategy not users |
| **3. Product strategy** | Which needs to serve, business outcomes, solution bets | `design-kickoff`, `roadmap-prioritization`, `okr-goal-setting` | No outcome metric, "we're building X because [exec] said so", bets untested |
| **4. Conceptual model** | Objects, relationships, states, vocabulary — what exists independent of UI | `conceptual-model` | "Is this one thing or two?", team uses 3 names for same concept, "what happens when I delete?" |
| **5. Interaction structure** | Places, affordances, flows, edge cases — how users move through objects | `ux-pattern`, `interaction-design` | Missing error states, no breadboard, "where does this button go?" |
| **6. Surface** | Visual design, copy, feedback, hierarchy, accessibility — what users see | `ui-agent`, `design-system`, `content`, `accessibility`, `audit` | Token violations, copy inconsistent, inaccessible, feels wrong |

**Dependency:** Lower layers are foundations for upper ones. Weak lower
layers create UX debt that propagates upward. A missing conceptual model
undermines every screen built on top of it.

---

## Step 1 — Gather context

Before diving into layer questions, understand the situation:

Ask:
1. **What are you working on?** (feature, flow, surface, or project name)
2. **What stage is it at?** (early exploration, active design, fixing
   something live, or not sure)
3. **What prompted this diagnostic?** (stuck, starting fresh, checking
   foundations, or just curious)

Listen for clues about which layers have already been worked through and
which are thin or missing.

---

## Step 2 — Audit layers (1-2 questions each)

Work through each layer with targeted questions. Don't interrogate — keep
it conversational and fast.

Rate each layer as:
- **Strong** — decisions made, evidence-based, documented
- **Partial** — some work done but incomplete or informal
- **Assumed** — treated as decided but not verified (dangerous)
- **Weak** — gaps, conflicts, or clearly missing
- **Not started** — nothing done yet
- **N/A** — genuinely doesn't apply to this work

### Layer 1: Observed behavior / Domain

*"What user research do you have? Have you spoken to users, observed
them, or have analytics? Or is this mostly based on what the team
believes users do?"*

*"How well do you understand the domain this product operates in — the
real-world concepts, terminology, and how users think before your product
enters the picture?"*

**Strong signals:** Research citations, transcripts, analytics, domain
vocabulary documented (COMPANY-VOCABULARY or task `sources.md`)

**Weak signals:** "We think users...", no research links, domain terms
contested, team debate about what things mean

### Layer 2: User needs

*"Can you articulate what users are trying to achieve — not in features,
but the underlying job and why it matters? Do you have job stories or
equivalent?"*

**Strong signals:** Job stories (When/I want/So I can), personas with
sourced needs, emotional/social jobs named

**Weak signals:** Generic "more bookings", needs trace back to strategy
not users, no JTBD, conflating features with needs

### Layer 3: Product strategy

*"Do you know which specific user need this work targets and what
business outcome it's meant to move? Is the connection between
opportunity and business goal explicit?"*

**Strong signals:** Named outcome metric, opportunity→bet chain,
experiments planned, connects to OKR

**Weak signals:** No outcome, "building X because [exec] said so", bets
untested, strategy is just a feature list

### Layer 4: Conceptual model

*"Does the product have a clear model of the objects it works with — the
things that exist, how they connect, and what vocabulary you use? Is this
shared across the team?"*

*"For objects with states — do you know what states they can be in and
what transitions matter?"*

**Strong signals:** Object definitions documented, ubiquitous language
settled, state diagrams, temporal decisions made (deletion, history)

**Weak signals:** "Is this one thing or two?", 3 different names for same
concept, "what happens when I delete?", shapeshifter objects, vocabulary
inconsistent

### Layer 5: Interaction structure

*"Do you have a clear picture of the key user journeys — places, steps,
decision points? A breadboard, rough flow, working code, or a description
you can narrate?"*

*"What happens on failure paths, empty states, and edge cases?"*

**Strong signals:** Breadboard or flow diagram, edge cases documented,
affordances have destinations, error paths designed

**Weak signals:** No flow diagram, "where does this go?", missing error
states, can't narrate the journey, edge cases as afterthought

### Layer 6: Surface

*"Is there an existing design system, visual language, or component
library this needs to fit into?"*

*"Are the screens built? How do they feel — solid, or does something feel
off?"*

**Strong signals:** Design system used, tokens followed, copy consistent,
accessible, passes `audit`

**Weak signals:** Token violations, copy inconsistent, inaccessible,
archetypes ignored, "it just doesn't feel right"

---

## Step 3 — Output the audit table

```markdown
## Design diagnostic — [feature/slug] — YYYY-MM-DD

**Context:** [One line — what they're working on and stage]

### Layer audit

| Layer | State | Notes |
|-------|-------|-------|
| 1. Observed behavior / Domain | [Strong/Partial/Assumed/Weak/Not started/N/A] | [Key observation] |
| 2. User needs | [State] | [Key observation] |
| 3. Product strategy | [State] | [Key observation] |
| 4. Conceptual model | [State] | [Key observation] |
| 5. Interaction structure | [State] | [Key observation] |
| 6. Surface | [State] | [Key observation] |
```

---

## Step 4 — Identify bottleneck

Find the **bottleneck layer**: the **lowest** (most foundational) layer
with **Weak, Assumed, or Not started** state.

Lower layers are more foundational. A weak Layer 4 (conceptual model)
undermines every screen (Layer 6) built on it. Fix the foundation before
building up.

**Also flag assumed layers** — layers treated as decided but not
verified. Those are often where the most dangerous decisions hide. "We
assume users want X" is riskier than "We know we don't know X."

**Consider constraints:** If the designer has a deadline or constraint
that changes the calculus, acknowledge it. Sometimes the right move isn't
the most foundational one — name that tradeoff explicitly.

---

## Step 5 — Recommend next skill

Based on the bottleneck, recommend **which skill to run next and why:**

| Bottleneck layer | Recommended skill | Why |
|------------------|-------------------|-----|
| **Observed behavior / Domain** | `research-agent` or `org-pack-builder` | Need user research or domain vocabulary before building anything |
| **User needs** | `design-kickoff` Step 1 (if net-new) or `research-artifacts` | Can't pick strategy without knowing what users need |
| **Product strategy** | `design-kickoff` (if net-new) or `roadmap-prioritization` or `okr-goal-setting` | Can't decide what to build without outcome + opportunity |
| **Conceptual model** | `conceptual-model` | Can't design flows or screens if objects/relationships/states undefined |
| **Interaction structure** | `ux-pattern` or `interaction-design` | Can't design surface if flow/places/affordances unclear |
| **Surface** | `ui-agent`, `design-system`, `content`, `accessibility`, `audit` | Foundations solid — time to build/fix the UI |

Close with: *"Want to run [skill] now, or is there something in this
picture to push back on first?"*

---

## Output format

```markdown
## Design diagnostic — [slug] — YYYY-MM-DD

**Context:** [Stage, what prompted this]

### Layer audit

| Layer | State | Notes |
|-------|-------|-------|
| 1. Observed behavior / Domain | Weak | No user research; team assumptions only |
| 2. User needs | Not started | Haven't articulated jobs |
| 3. Product strategy | Partial | Have outcome metric but no opportunity→bet chain |
| 4. Conceptual model | Not started | Objects undefined |
| 5. Interaction structure | Not started | No flows |
| 6. Surface | Partial | Mockups exist but built on unstable foundation |

### Bottleneck analysis

**Bottleneck: Layer 1 (Observed behavior / Domain)**

No user research — everything above is built on team assumptions. Risk:
we build the wrong thing entirely, or build it for the wrong reasons.

Also flagging **Layer 4 (Conceptual model)** as Assumed — team is
building screens without defining objects/relationships. This will create
rework when object boundaries become contested.

### Recommendation

Run **`research-agent`** first — gather user evidence before deciding
strategy or building anything.

After research: revisit this diagnostic or go straight to
**`conceptual-model`** to define objects before building screens.

Want to run `research-agent` now, or is there something in this picture
to push back on first?
```

---

## Constraints and tradeoffs

**If there's a hard deadline:**
Acknowledge it. Sometimes "ship the weak foundation and document the debt"
is the right call. Name the tradeoff explicitly:

*"Ideal move: fix Layer X first. Fastest move given [deadline]: build
Layer Y knowing it's on shaky ground, log the risk in `debt.md`, plan to
revisit."*

**If multiple layers are weak:**
Pick the **lowest** (most foundational) weak layer as the bottleneck.
Work from the bottom up.

**If assumed layers exist:**
Call them out. "Assumed Strong" is often riskier than "Known Weak"
because it's invisible.

---

## Forbidden

- Deep-diving into any layer (that's what the individual skills do)
- Recommending "fix all layers" (pick one bottleneck)
- Skipping the recommendation (always close with a specific next skill)
- Recommending skills that don't exist in the harness
- Treating this as a gate (it's advice, not a blocker)

---

## What happens next

Designer either:
1. **Runs the recommended skill** — you've identified the bottleneck
2. **Pushes back** — "actually, we already did X" or "deadline means we
   skip X" — refine the diagnostic
3. **Picks a different layer** — they have context you don't; respect it

This is a **map, not a mandate**. The diagnostic shows where the gaps
are; the designer decides what to do about them.

---

## Related skills

- **All skills** — this is the front door that routes to them
- **design-kickoff** — often the recommended skill for net-new work
- **conceptual-model** — often the most neglected bottleneck
- **research-agent** — often the foundational bottleneck

---

## Self-improvement loop

After running this skill, reflect:

1. **Which layer was the actual bottleneck?** (vs what you initially
   guessed)
2. **What signal revealed it?** (for faster diagnosis next time)
3. **Did the recommended skill address it?** (or should you have routed
   differently)
4. **What almost got missed?** (assumed layers, hidden gaps)

Capture in `learnings.md`
