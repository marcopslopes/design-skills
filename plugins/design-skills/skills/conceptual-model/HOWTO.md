---
audience: designer
applies-to: conceptual-model
updated: 2026-08-28
---

# How to use conceptual-model

## What this skill does

Defines what your product **recognizes as existing**, how those things
**relate**, what **states** they can be in, and the **vocabulary** for all
of it — before you commit to visual design.

This is the most neglected part of product design. When you skip it,
you'll find yourself redesigning screens because the underlying objects
weren't thought through.

---

## When to use it

**Use conceptual model work between problem definition and screen design:**

Good triggers:
- Design kickoff is done, but you're not sure what the "things" in the
  product are yet
- "Is this one thing or two separate things?"
- Team/users use different words for the same concept
- "What can happen to this thing over time?"
- "How do these connect?"
- You're about to build screens but the objects feel fuzzy

Don't use it when:
- Objects are obvious (e.g., simple CRUD for one well-understood entity)
- You're just iterating visual design on a stable model
- You haven't defined the problem yet (do design-kickoff first)

---

## What it produces

You'll get:
1. **Object definitions** — what exists, its attributes, relationships,
   actions
2. **Vocabulary decisions** — one name per concept across UI/docs/API
3. **State diagrams** — what can happen to objects over time
4. **Temporal decisions** — how time/history/deletion work
5. **Open questions** — what needs engineering input

**Saved to:** `projects/<slug>/conceptual-model.md`

---

## How Muse runs it

1. **Finds the live decisions** — which of the conceptual model decisions
   are actually open for your situation (doesn't force all steps)

2. **Picks a technique** — based on what you have:
   - Have research transcripts? → Noun foraging
   - Know the objects, need to pin down details? → Object definitions
   - Uncertain if something should be persistent? → Sketch flow first
   - Need to see relationships? → ERD diagram
   - Object has a lifecycle? → State diagram
   - Vocabulary contested? → Ubiquitous language list

3. **Applies the disciplines** throughout:
   - Real objects only (not attributes pretending to be objects)
   - Instances vs types (CAC/ROAS aren't objects; Metric is)
   - Named roles (User as provider vs User as client)
   - Verb precision (Edit address vs Register move)
   - No speculation (every object traces to a user need)

4. **Checks temporal decisions** — intermediate states, deletion, history,
   lag, relationships over time

5. **Audits for failure modes** — shapeshifters, masked objects, broken
   objects, isolated objects

6. **Captures only the residue** — the decisions made, not a transcript of
   the conversation

---

## Example: Referral program

**Without conceptual model** (straight to screens):
- Team debates: "Is a referral a person or an action?"
- PM says "referral link," designer models a Link object, eng builds a
  code system
- Three weeks later: "Wait, we need to track who referred whom"
- Redesign everything because the model was never explicit

**With conceptual model** (before screens):
```
Object: Referral
What it is: A relationship between two Users where one introduced the other
to the platform

Relationships:
- belongs to one User (as referrer)
- belongs to one User (as referred)

States:
- Pending (invited, not signed up)
- Active (signed up, not converted)
- Completed (converted, reward earned)

Actions:
- Create referral (send invite)
- Track referral status
- Claim reward

Vocabulary decision:
- Chosen: "Referral" for the relationship
- Rejected: "Invite" (that's the action), "Link" (that's the mechanism)
- Why: "Referral" matches both user mental model and business language
```

Now everyone knows what they're building. Screens design themselves.

---

## Red flags (when to revisit)

- **"Same thing looks different everywhere"** → Shapeshifter (object
  definition unclear)
- **"Different things look identical"** → Masked (model doesn't
  differentiate)
- **"I can't find related data when I need it"** → Broken/Isolated object
  (relationships missing or not surfaced)
- **"Team uses 3 different names for this"** → Vocabulary undecided
- **"What happens when I delete this?"** → Temporal decisions skipped
- **"Is this draft/pending/approved?"** → States undefined

---

## Common mistakes

### Mistake 1: Treating it as database design
❌ "The referrals table has a foreign key to users_id"
✅ "A Referral belongs to one User as referrer, one User as referred"

Talk about what users see and do, not how it's stored.

### Mistake 2: Modeling before knowing the problem
❌ Starting with "what objects should we have?"
✅ Start with design-kickoff (user needs + strategy), then model what
those needs require

### Mistake 3: Inventing objects for unvalidated features
❌ Adding "Loyalty Points" object when loyalty program is still a bet
✅ Mark it **provisional** and don't build on it until bet validates

### Mistake 4: Ignoring temporal decisions
❌ "User can delete an appointment" (but what about history? billing?
referential integrity?)
✅ "Cancel (soft delete, preserves history for billing), or Admin Delete
(compliance/GDPR, hard remove)"

### Mistake 5: Skipping vocabulary decisions
❌ UI says "Client", API says "Customer", team says "User"
✅ Pick one, document why, use it everywhere (ubiquitous language)

---

## FAQ

**Q: Isn't this what engineers do with database design?**
A: No. Conceptual model is user-facing — what the product presents to
users as "things that exist." Database schema is implementation. The gap
between them is where bugs and UX debt hide.

**Q: Do I always need diagrams?**
A: No. Use diagrams when they clarify relationships (ERD) or lifecycles
(state diagram). Skip them when prose is clearer.

**Q: How detailed should I go?**
A: Enough to answer the open questions, no more. "Capture decisions, not
transcripts."

**Q: What if engineering already built a schema?**
A: Compare it to the conceptual model. Gaps = potential UX issues or
technical debt. Document them; decide together what to reconcile.

**Q: When do I validate the model?**
A: Mark provisional objects if they depend on unvalidated bets. Test the
bet (prototype, fake door, user interview) before building the full
interaction layer on top.

**Q: Can I change the model later?**
A: Yes, but changing objects after screens are built is expensive
(ripples up through interaction structure and surface). Better to spend
time here first.

**Q: What about objects from third-party APIs?**
A: Model how **your product** presents them to users, not how the API
structures them. Your model can abstract/combine/rename as needed for user
clarity.

---

## What comes after

Once objects, relationships, states, and vocabulary are stable:

1. **Interaction structure** — design how users navigate and act on these
   objects (ux-pattern, interaction-design)
2. **Screen design** — build the UI that surfaces these objects
   (ui-agent)
3. **Engineering conversation** — align on open questions and implementation
   constraints

If the model is provisional (depends on bets), validate first before
building on it.

---

## When it feels like overkill

Sometimes it is. Skip conceptual model when:
- Objects are genuinely obvious (e.g., simple "Edit my profile" screen)
- You're doing visual iteration on a stable model
- The problem itself isn't clear yet (do design-kickoff first)

But if you're debating "what is this thing, really?" — that's the signal
you need this layer.

The cost of getting objects wrong compounds at every layer above. An hour
spent here saves days of rework later.

---

## Real examples from this repo

**Design Harness design system catalog** (this repo's `src/design-harness/`):
- Objects: Token, Component, Pattern, Page
- Relationships: Components use Tokens, Pages use Components
- Vocabulary: "Token" not "Variable" (matches CSS custom properties)
- States: N/A (catalog is static)

**Referral program** (providers refer other providers):
- Objects: Referral, User, Reward
- Relationships: Referral belongs to User (as referrer) and User (as
  referred)
- States: Pending → Active → Completed
- Vocabulary: "Referral" (the relationship), not "Invite" (the action) or
  "Link" (the mechanism)

Both: defined before building screens. Result: consistent, predictable
interfaces that match how users think.

---

For deeper background on why this layer matters, see:
- `references/shared/design-thinking-model.md` — where conceptual model
  fits in the design process
- `harness/ORCHESTRATOR.md` §2 — when conceptual-model skill fires in the
  routing table
