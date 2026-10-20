# Breadboarding

Text-based flow notation from Shape Up (Basecamp) — settle interaction
logic before visual design makes changes expensive.

---

## What it is

Breadboarding is a **text notation** for describing interaction flows
without committing to visual form. It forces you to name:
- **Places** (screens/states the user moves through)
- **Affordances** (actions the user can take)
- **Connections** (where each affordance leads)
- **Content** (what's shown in each place)

**Not wireframes. Not mockups.** Text only — deliberately low-fidelity so
changes are cheap.

---

## When to use it

**Use breadboarding when:**
- Interaction logic is unclear but visual design would be premature
- Need to communicate flow to PM/eng without committing to UI
- Iterating on structure — visual mockups would slow you down
- Want to settle "where does this go?" before "what does it look like?"

**Don't use it when:**
- Flow is obvious (simple CRUD)
- Already have working prototype (iterate that instead)
- Visual/spatial relationships are the open question (sketch instead)

---

## Notation

```
Place Name
- affordance → destination
- affordance → destination
[ content shown ]
```

**Three components:**

1. **Places** — Distinct screens/states (descriptive names, not generic)
2. **Affordances** — Actions user can take (verb-first: "Share link", not
   "Link")
3. **Content** — What's shown (square brackets, brief)

**Every affordance has a named destination.** If you can't name where it
goes, it's an unmade decision.

---

## Example: Referral flow

```
Referral Dashboard
- [Share referral link] → Copy Confirmation
- [View referrals] → Referral List
- [Track rewards] → Rewards Summary
[ Shows: total referrals sent, pending rewards, claimed rewards ]

Copy Confirmation
- [Done] → Referral Dashboard
[ Shows: "Link copied! Share with other providers." + the actual link ]

Referral List
- [Referral item] → Referral Detail
- [Filter by status] → (filters in place)
- [Back] → Referral Dashboard
[ Shows: list of referrals with name, status, date. Empty state: "No 
referrals yet. Share your link to get started." ]

Referral Detail
- [Contact referral] → (opens messaging)
- [Back] → Referral List
[ Shows: referral name, status (Pending/Active/Completed), date sent, 
reward earned if completed ]

Rewards Summary
- [Claim reward] → (if eligible) → Rewards Claimed Confirmation
- [Back] → Referral Dashboard
[ Shows: total earned, available to claim, claimed history ]
```

---

## Disciplines — what keeps breadboarding honest

### Every affordance has a named destination

**Bad:** "Submit → ?"
**Good:** "Submit → Confirmation" or "Submit → Error (validation)"

If you can't name where it goes, you haven't decided yet. Don't guess —
flag it as open.

### Edges are required steps, not afterthoughts

Breadboard the **failure paths** alongside the happy path:
- Validation errors
- Server errors
- Empty states (no data yet)
- Loading states
- Cancel/back paths
- Offline/timeout

Each gap is an unmade design decision.

### No broken objects

For each **conceptual-model object** in this flow (if model exists), its
attributes and actions should be available together — not scattered across
places with no cross-linking.

If you breadboarded "Appointment" but can't get to its provider/time/notes
from one place, the flow broke the object.

### No isolated objects

Each **model relationship** should be visible and navigable in the flow, or
there should be a deliberate decision that it needn't be.

If Referral belongs-to User (as referrer), can you navigate referrer →
referrals? If not, why?

### Vocabulary matches the conceptual model

Use the **ubiquitous language** from `conceptual-model` (if it exists). If
the model calls it "Referral", don't call it "Invite" in the breadboard.

### Naming places is a design decision

**Bad:** "Screen 1", "Page 2", "Modal 3"
**Good:** "Referral Dashboard", "Rewards Summary", "Copy Confirmation"

Descriptive, user-meaningful names. If you can't name it, you don't know
what it is yet.

### Keep it minimal

More than 5-6 places for a single job story is a signal to look for what
can be collapsed.

Simple flows are better flows.

---

## Working with the designer

1. **Settle which job story** the flow serves, where the user starts, and
   what success looks like.

2. **If redesigning,** describe the current flow first — it reveals
   decisions already made (many unintentionally).

3. **Name the places.** What are the distinct screens/states in this flow?

4. **Map affordances and destinations.** For each place: what can the user
   do, and where does each action go?

5. **Walk the flow including edges.** Narrate: "I'm a user who [situation].
   I arrive at [place], I see [content], I want to [motivation], so I
   [affordance]..." Walk happy path, then every edge case.

6. **Apply the disciplines** above. Look for unmade decisions (affordances
   with no destination, missing edges, broken/isolated objects).

---

## Conditional logic

Use **parenthetical notes** for conditions:

```
Service Details
- [Edit service] → (if owner) → Service Editor
- [Edit service] → (if not owner) → Error: "Not authorized"
- [Book this service] → (if available) → Booking Flow
- [Book this service] → (if fully booked) → Waitlist
```

Keep conditions explicit. "Sometimes X, sometimes Y" is not a breadboard —
that's an unmade decision.

---

## When to stop breadboarding

Stop when:
1. Every affordance has a named destination
2. All edge cases are covered (errors, empty, loading, cancel)
3. You can narrate the full flow without hitting "I don't know"
4. Objects and relationships from conceptual model are intact

**Don't gold-plate.** Breadboard defines interaction logic. Visual form
comes later (that's `ui-agent`).

---

## What comes after

Once the breadboard is stable:
- **If conceptual model underneath isn't stable:** fix that first
  (`conceptual-model`)
- **If building screens:** `ui-agent` implements the breadboard
- **If motion/timing matters:** `motion-choreography` specs transitions
- **If state complexity matters:** `interaction-design` adds state matrices

Breadboard = interaction logic without visual form. It's a decision-making
tool, not a build spec.

---

## Output format

Save breadboards to `projects/<slug>/breadboard.md` or inline in
`brief.md`:

```markdown
## Breadboard — [flow-name] — YYYY-MM-DD

**Job story:** When [situation], I want to [motivation], so I can
[outcome]

**Entry point:** [Where user starts]
**Success state:** [Where user ends when successful]

---

### Places

Place Name
- affordance → destination
- affordance → destination
[ content ]

Another Place
- affordance → destination
[ content ]

---

### Open decisions

- [Unmade decision about X]
- [Edge case Y not yet designed]
- [Conditional logic Z needs PM input]

---

### Changes from current

<If redesign: what's different from existing flow and why>
```

---

## Breadboarding vs other techniques

| Technique | When to use |
|-----------|-------------|
| **Breadboarding** | Interaction logic unclear; visual form premature |
| **Sketch** | Spatial relationships or visual hierarchy unclear |
| **Wireframe** | Need to communicate layout, not just flow |
| **Prototype** | Need to test with users or feel interaction timing |
| **User story mapping** | Planning incremental releases across many stories |
| **Task analysis** | Redesigning; need to understand current task decomposition |

Breadboarding is fastest when the question is "where does this go?" not
"what does it look like?"

---

## Example: Empty state → first item

```
Service List (empty)
- [Add first service] → Service Creator
[ Shows: "No services yet. Add your first service to start accepting 
bookings." + illustration ]

Service Creator
- [Save service] → (if valid) → Service List (one item)
- [Save service] → (if invalid) → Error Message (inline)
- [Cancel] → Service List (empty)
[ Shows: Service name, description, duration, price. Required fields 
marked. ]

Service List (one item)
- [Service item] → Service Details
- [Add another service] → Service Creator
[ Shows: one service card with name, price, duration ]
```

Notice:
- Empty state explicitly breadboarded (not assumed)
- Validation error path explicit
- Cancel path goes back to empty (doesn't create a ghost item)
- State change (empty → one item) is a different place

---

## Integration with ux-pattern

This is `ux-pattern`'s **breadboard mode** (see `SKILL.md` § Breadboard
mode) — directly triggerable, not only reachable through critique. Fires
on: "breadboard this flow", "map the interaction structure for X", "where
does this go", "structure this flow" (when drafting, not reviewing an
existing screen), or when a critique finds "where does this go?" gaps and
the fix is a flow redesign rather than a visual tweak.

Then `ui-agent` can build screens from the breadboard.

---

## Source

Breadboarding notation from Shape Up (Basecamp, Ryan Singer) — text-based
shaping before visual commitment.

Applied to design-harness:
- Integration with `conceptual-model` (objects, relationships, vocabulary)
- Disciplines for edges, objects, relationships
- Template in `projects/_template/breadboard.md`
