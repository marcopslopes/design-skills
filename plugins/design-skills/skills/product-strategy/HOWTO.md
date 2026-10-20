---
audience: designer
applies-to: product-strategy
updated: 2026-08-29
---

# How to use product-strategy

## What this skill does

Builds **Opportunity Solution Trees** (OST) to connect user needs →
business outcomes → solution bets → experiments.

Makes strategy explicit and testable before you build anything.

---

## When to use it

**Good triggers:**
- "Which user opportunities should we pursue?"
- "What bets should we make?"
- "How do we connect needs to outcomes?"
- "Test assumptions cheaply before building"
- Strategy feels like "exec said so"

**Don't use it when:**
- Still gathering research (do `research-agent` first)
- Outcome unclear (do `okr-goal-setting` first)
- Already know what to build (do `roadmap-prioritization`)
- Deep into building/iterating

---

## What it produces

**Opportunity Solution Tree** showing:
1. **Outcome** — business metric to move (e.g., "40% → 60% activation")
2. **Opportunities** — user needs/pains grouped by journey moment
3. **Solution bets** — multiple ways to serve each opportunity (2-4 per)
4. **Experiments** — cheapest tests of each bet's core assumption (days,
   not months)
5. **Priority** — which opportunity to pursue first and why

**Saved to:** `projects/<slug>/strategy.md`

---

## How Muse runs it

1. **Step 0 — Settle outcome**
   - What metric? Current baseline? Target? By when?
   - If unclear → routes to `okr-goal-setting` first

2. **Step 1 — Map opportunities**
   - Extract from research, job stories, analytics
   - Group by journey moment
   - Apply flip test (can't be restated as feature)

3. **Step 2 — Generate solution bets**
   - Multiple per opportunity (2-4)
   - "We could X because we believe Y"
   - Resist early convergence on one idea

4. **Step 3 — Name riskiest assumption**
   - Per bet: what must be true for this to work?
   - Usually about user behavior or technical feasibility

5. **Step 4 — Design experiments**
   - Cheapest test of assumption
   - Days, not months
   - Fake door, concierge, interviews, prototype, data analysis

6. **Step 5 — Prioritize**
   - Size, outcome connection, evidence strength, bet clarity, experiment
     cost
   - Show reasoning, not just scores

---

## Example: Provider activation

**Outcome:** Increase signup → first booking from 40% to 60% (90 days)

**Opportunities (journey moment: Setup):**
1. "I don't know what to charge" (60% cite as blocker)
2. "I'm not sure how to describe my services" (40% edit 3+ times)
3. "I don't have photos yet" (25% leave empty)

**Solution bets (for pricing uncertainty):**
1. **Show market rates** — display avg rates for similar services
   - Assumption: Providers trust crowd-sourced data
   - Experiment: Fake door + 5 interviews (5 days)

2. **Price calculator** — guided questions → suggested rate
   - Assumption: Providers can self-assess experience accurately
   - Experiment: Wizard of Oz with 10 users (1 week)

3. **Competitive insights** — show where their price sits vs competitors
   - Assumption: Providers care about positioning vs absolute profit
   - Experiment: Interview 10 providers (3 days)

**Priority:** #1 (pricing) — highest size + outcome connection + testable
bets

**Next:** Run fake door experiment (5 days) before building anything

---

## The OST disciplines

### 1. Outcome is measurable, meaningful, bounded

❌ "Improve onboarding"
✅ "Increase signup → first booking from 40% to 60% within 90 days"

Must have: number, baseline, target, timeframe, business connection

### 2. Opportunities are user needs, not features

❌ "We need a price calculator" (that's a solution)
✅ "I don't know what to charge" (that's a need)

**Apply flip test:** Can this be restated as a feature? If yes, it's a
solution in disguise.

### 3. Group opportunities by journey moment

Forces you to surface:
- Vague opportunities that don't tie to a moment
- Moments with no opportunities (gaps)
- Opportunities in the wrong order

```
Signup → Setup → First booking → Delivery
```

### 4. Multiple bets per opportunity

Early convergence skips better alternatives. Aim for 2-4 bets before
picking.

Don't settle on the first idea.

### 5. Name the riskiest assumption

What must be true for this bet to work? That's what the experiment tests.

Usually: "Users will..." or "We can build..."

### 6. Experiments test assumptions, not features

Not a full build. Not an MVP. The smallest thing that gets evidence.

Days, not months. Fake door, concierge, prototype, interviews, data.

---

## Common mistakes

### Mistake 1: Treating OST as a feature list

❌ Outcome → Features to build → Roadmap
✅ Outcome → User needs → Multiple bets → Experiments → Then decide

OST is about making choices defensible, not listing features.

### Mistake 2: Skipping multiple bets

❌ One opportunity → one bet → build it
✅ One opportunity → 2-4 bets → test assumptions → then pick

Early convergence on one idea skips better alternatives.

### Mistake 3: Treating experiments as builds

❌ "Let's build the calculator and see if users like it" (weeks/months)
✅ "Let's Wizard of Oz a calculator with 10 users and see if the value
prop works" (1 week)

Experiments = evidence, not features.

### Mistake 4: Inventing opportunities without research

❌ "I think users need..."
✅ "60% of stalled signups cited pricing as blocker (survey, 2026-08)"

Opportunities must trace to user evidence.

### Mistake 5: Vague outcome

❌ "Grow the product"
✅ "Increase weekly active providers by 20% (from 1000 to 1200) within Q3"

Can't connect opportunities to outcome if outcome isn't measurable.

---

## Red flags

- **"We already know what to build"** → Why use OST? If strategy is
  settled, just build. If it's not settled, OST makes it explicit.
- **"We don't have time for experiments"** → Experiments save time by
  preventing wrong builds. Days of research beats months of wrong features.
- **"Let's test everything"** → Prioritize. Pick the highest-value
  opportunity first.
- **"The assumption is obvious"** → State it anyway. Often "obvious"
  assumptions are wrong.

---

## FAQ

**Q: When does OST run — before or during design-kickoff?**
A: Often during. `design-kickoff` Step 1/2 may call `product-strategy` to
build the OST as part of the PRD.

**Q: What if we don't have user research yet?**
A: Run `research-agent` first. OST needs real user needs, not assumptions.

**Q: What if the outcome is unclear?**
A: Run `okr-goal-setting` first. OST works backward from a measurable
outcome.

**Q: How many opportunities should we map?**
A: Aim for 5-10. More than 10 suggests you haven't grouped by journey
moment or some are too granular.

**Q: How many bets per opportunity?**
A: 2-4. One bet = early convergence. Ten bets = analysis paralysis.

**Q: How long should experiments take?**
A: Days, not months. 3-7 days for most. If it takes longer, the experiment
is too big.

**Q: What if the experiment fails?**
A: Good! You just saved weeks/months building the wrong thing. Try another
bet or abandon the opportunity.

**Q: Do we always build the highest-priority opportunity?**
A: Usually. But constraints matter (technical blockers, dependencies, team
capacity). OST shows the priority; you decide whether to follow it.

**Q: What's the difference between OST and roadmap-prioritization?**
A: OST = which opportunities to pursue (strategy). Roadmap = when to build
them (sequencing). OST feeds roadmap.

**Q: Can we update the OST later?**
A: Yes. OST is a living artifact. Update as you learn from experiments or
new research.

---

## What comes after

After building OST:

1. **Run experiments** (starting with highest-priority opportunity)
2. **Evaluate** — did the assumption hold? What did we learn?
3. **Decide:**
   - Build the bet (if assumption validated)
   - Pivot to another bet (if assumption failed but opportunity still
     valid)
   - Abandon the opportunity (if opportunity itself doesn't hold)
4. **If building:**
   - `conceptual-model` — define objects the bet requires
   - `ui-agent` — build screens
   - `audit` — check before sharing

OST makes strategy explicit. Experiments make it testable. Then you build.

---

## Real use cases

**"We want to grow activation"** → OST maps opportunities that connect to
activation → experiments test assumptions → build the validated bet

**"Exec wants feature X but users haven't asked for it"** → OST makes the
assumption explicit ("we believe users need X") → experiment tests it →
data settles the debate

**"We have 5 ideas, can't decide which"** → OST treats them as bets for
one opportunity → name assumptions → run cheapest tests → pick based on
evidence

**"Team converged on one solution too early"** → OST forces multiple bets
→ surfaces alternatives → prevents premature commitment

---

For deeper background, see:
- `SKILL.md` — full skill protocol
- `references/shared/design-thinking-model.md` — where strategy fits in
  design process
- OST methodology (Teresa Torres) — industry-standard product discovery
  framework
