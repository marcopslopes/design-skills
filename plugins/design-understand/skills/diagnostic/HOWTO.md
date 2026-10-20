---
audience: designer
applies-to: diagnostic
updated: 2026-08-28
---

# How to use diagnostic

## What this skill does

Fast audit across all design layers (research, strategy, model, structure,
surface) to find the **bottleneck** — the weakest foundational layer —
and tell you which skill to run next.

Not a deep dive. This is triage: "where should I focus first?"

---

## When to use it

**Good triggers:**
- "I'm not sure where to start"
- "What's the most important thing to do next?"
- "Something feels off but I can't tell what"
- Starting a new project
- Stuck or spinning
- Want to check foundations before building up

**Don't use it when:**
- You already know exactly what needs work (just do that)
- Deep into execution (not time to step back)
- Problem is tactical, not foundational

---

## What it produces

A **diagnostic table** showing each layer's state (Strong / Partial /
Assumed / Weak / Not started) + a **recommendation** for which skill to
run next.

**Saved to:** Optional — conversation is usually enough; save to
`projects/<slug>/diagnostic.md` if you want a record

---

## How Muse runs it

1. **Gathers context** — what you're working on, what stage, why now

2. **Audits 6 layers** (1-2 questions each, conversational):
   - **Observed behavior / Domain** — user research, domain vocabulary
   - **User needs** — job stories, what users are trying to achieve
   - **Product strategy** — outcome, opportunity→bet, why this
   - **Conceptual model** — objects, relationships, states, vocabulary
   - **Interaction structure** — flows, places, affordances, edge cases
   - **Surface** — screens, design system, copy, accessibility

3. **Identifies bottleneck** — the **lowest** (most foundational) layer
   with gaps

4. **Recommends next skill** — specific skill to run and why

5. **Asks for pushback** — "Sound right, or is there something to
   challenge?"

---

## Example: Referral program (net-new)

**You say:** "I'm starting a referral program. Where should I focus?"

**Muse audits:**

| Layer | State | Notes |
|-------|-------|-------|
| 1. Observed behavior | Weak | No user research on referrals |
| 2. User needs | Not started | Haven't articulated why providers refer |
| 3. Strategy | Partial | Have goal (growth) but no bet |
| 4. Conceptual model | Weak | "Is a referral a person or an action?" |
| 5. Interaction structure | Not started | No flows |
| 6. Surface | Not started | No screens |

**Bottleneck: Layer 1 (Observed behavior)**

No research — building on assumptions. Risk: wrong feature entirely.

**Recommendation: Run `research-agent`** to talk to providers who already
refer informally. Find out why they do it, what stops them, what would
make it easier.

After research → `conceptual-model` to define objects (Referral,
Referrer, Reward) before building flows.

---

## Example: Redesign (something feels off)

**You say:** "The checkout flow feels clunky but I can't tell why."

**Muse audits:**

| Layer | State | Notes |
|-------|-------|-------|
| 1. Observed behavior | Strong | Analytics + user interviews |
| 2. User needs | Strong | Job stories documented |
| 3. Strategy | Strong | Clear outcome (conversion rate) |
| 4. Conceptual model | Assumed | What's an Order vs Booking vs Appointment? |
| 5. Interaction structure | Weak | Edge cases missing (cancellation, rebook) |
| 6. Surface | Partial | Screens exist but inconsistent |

**Bottleneck: Layer 4 (Conceptual model) — flagged as Assumed**

Team thinks objects are clear but they're not. Three different names for
the same thing. "Delete" means different things in different contexts.

**Recommendation: Run `conceptual-model`** to settle objects,
relationships, vocabulary. Once that's stable, `ux-pattern` can fix the
flow, then `ui-agent` rebuilds screens on solid foundation.

---

## The dependency rule

**Lower layers are foundations for upper ones.**

Weak Layer 4 (conceptual model) undermines every screen (Layer 6) built
on it. Fix the foundation before building up, or you'll rebuild
everything later.

That's why the diagnostic picks the **lowest** weak layer as the
bottleneck, not the most obvious one.

---

## Red flags by layer

### Layer 1: Observed behavior / Domain
- Team says "we think users..."
- No research citations
- Domain terms contested ("what does that word mean?")

### Layer 2: User needs
- Generic goals ("more bookings")
- No job stories
- Needs trace to strategy, not users

### Layer 3: Strategy
- No outcome metric
- "We're building X because [exec] said so"
- Bets untested
- Strategy is just a feature list

### Layer 4: Conceptual model (most commonly missed)
- "Is this one thing or two things?"
- Team uses 3 different names for same concept
- "What happens when I delete this?"
- Same object looks different everywhere

### Layer 5: Interaction structure
- "Where does this button go?"
- Missing error states
- Can't narrate the journey
- Edge cases as afterthought

### Layer 6: Surface
- Token violations
- Copy inconsistent
- Inaccessible
- "It just doesn't feel right"

---

## Assumed vs Weak

**Weak** = you know it's missing (Known gap)
**Assumed** = you think it's done but it's not (Hidden gap)

Assumed is often **more dangerous** because it's invisible. The diagnostic
flags both.

Example:
- **Weak:** "We haven't defined the objects yet" (honest, clear what to do)
- **Assumed:** "Of course we know the objects" (but team uses 3 different
  names and debates "is this one thing or two?")

---

## What if I disagree with the bottleneck?

**Push back!** The diagnostic is a map, not a mandate. You have context
Muse doesn't.

Valid reasons to pick a different layer:
- Hard deadline means skip foundation
- Political constraint (can't do research right now)
- You already have evidence Muse didn't see

If you push back, Muse will adjust the recommendation.

---

## What if multiple layers are weak?

The diagnostic picks the **lowest** (most foundational) weak layer. Work
from the bottom up.

But if there's a constraint (deadline, blocker), it might recommend a
higher layer with "flag the debt."

---

## What if nothing is weak?

Rare, but possible. If all layers are Strong or Partial, the diagnostic
will say "foundations are solid — time to execute" and point you to the
next build/iteration skill.

---

## Common mistakes

### Mistake 1: Treating it as a gate
❌ "Can't build until diagnostic passes"
✅ Diagnostic is advice. You decide whether to follow it.

### Mistake 2: Ignoring assumed layers
❌ "We already did Layer 4" (but can't articulate the objects)
✅ Check: can you name the objects, relationships, states, vocabulary?

### Mistake 3: Fixing the symptom, not the cause
❌ "Layer 6 (surface) feels wrong → redesign screens"
✅ Check Layer 4 (model) first — screens often feel wrong because objects
are unclear

### Mistake 4: Running diagnostic mid-execution
❌ Running diagnostic while actively building screens
✅ Run diagnostic at project start, when stuck, or to check foundations —
not mid-sprint

---

## FAQ

**Q: How long does this take?**
A: 5-10 minutes. It's deliberately fast.

**Q: Do I need to save the output?**
A: Usually no — the conversation is enough. Save to
`projects/<slug>/diagnostic.md` if you want a record.

**Q: What if I'm already building screens?**
A: The diagnostic will likely flag weak foundations. Decision: stop and
fix them, or keep building and log the debt. Your call.

**Q: Can I run this multiple times?**
A: Yes. Run it at project start, then again when stuck or after major
changes.

**Q: What if research isn't possible right now?**
A: Tell Muse. The diagnostic will acknowledge the constraint and recommend
next-best move: "Ideal: research. Realistic given [constraint]: build on
assumptions and document the risk."

**Q: What's the most commonly missed bottleneck?**
A: **Layer 4 (Conceptual model)**. Teams jump straight to screens without
defining objects/relationships. Then wonder why screens feel wrong or
require constant rework.

**Q: Is this the same as design-kickoff?**
A: No. `design-kickoff` is for net-new projects (runs research, writes
PRD, waits for gate approval). `diagnostic` is triage across any
situation — new, stuck, redesign, checking foundations.

**Q: What if the bottleneck is obvious?**
A: Skip diagnostic, run that skill. Diagnostic is for "not sure where to
start."

---

## What comes after

Designer either:
1. **Runs the recommended skill** — bottleneck addressed
2. **Runs a different skill** — they have context you don't; respect it
3. **Flags constraints** — deadline, can't do research, etc. — Muse
   adjusts

The diagnostic is a **starting point**, not a prescription.

---

## Real use cases

**"I'm starting a new project"** → Diagnostic finds research gap →
`research-agent` → `conceptual-model` → `ui-agent`

**"Something feels off but can't tell what"** → Diagnostic finds
conceptual model assumed → `conceptual-model` → objects settled, flow
makes sense

**"Should I build this or sketch it?"** → Diagnostic finds objects
undefined → "Sketch first to learn what must persist, then
`conceptual-model`, then build"

**"Team disagrees on direction"** → Diagnostic finds strategy weak (no
outcome) → `okr-goal-setting` → outcome explicit, disagreement resolves

---

For deeper background, see:
- `SKILL.md` — full skill protocol
- `references/shared/design-thinking-model.md` — how layers fit the
  design process
