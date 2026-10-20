# Temporal decisions checklist

Objects exist in time. These decisions are frequently overlooked but have
major UX impact. Work through this checklist for any object where time
matters.

---

## Conceptual model layer temporality

### 1. Intermediate action states

**Question:** Does this object pass through transitional states (saving,
processing, pending approval) before resolving to a stable state?

**Why it matters:** These are model **states**, not just loading
spinners. They affect what users can do and see.

**Examples:**
- Appointment: Draft → Pending → Confirmed → Completed
- Payment: Initiated → Processing → Settled → Refunded
- Document: Editing → Saving → Saved

**Document:**
- State names
- What each means to the user
- What actions are available/forbidden in each
- How long they typically last

---

### 2. Read model lag

**Question:** Is there a gap between when data is written and when it's
visible to the user?

**Why it matters:** Users expect to see what they just did. When there's
lag, they think it failed.

**Examples:**
- Search index updates (eventual consistency)
- Reporting dashboards (batch processing)
- Cross-system sync (third-party API delay)

**Document:**
- That lag exists
- Typical duration
- Whether to show "saving..." or optimistic update
- Flag as engineering constraint if duration is uncertain

---

### 3. Relationship temporality

**Question:** When we say "all X in group Y," do we mean the group
**now**, or membership **as it changes over time**?

**Why it matters:** Affects whether calculations/lists are point-in-time
snapshots or live views.

**Examples:**
- "All providers in London" → changes as providers move
- "All appointments in March" → fixed once March ends
- "Team members on this project" → could be current or historical

**Document:**
- Point-in-time (snapshot) vs. live view
- Whether history matters (who **was** in the group)

---

### 4. Deletion semantics

**Question:** What does "delete" actually mean?

**Options:**
- **Archive** — hide from view, keep in database, user can restore
- **Soft delete** — mark as deleted, keep for auditing/billing, not
  user-restorable
- **Hard delete** — remove from database entirely
- **Regulatory delete** — compliance-driven removal (GDPR, etc.)

**Why it matters:** Each has different implications for history,
referential integrity, billing, compliance.

**Examples:**
- Appointment cancellation → Soft delete (billing needs history)
- Draft service → Hard delete (never published, no dependencies)
- User account → Regulatory delete (GDPR right to erasure)

**Document:**
- Which delete type for each object
- What happens to related objects (cascade? orphan? prevent?)
- Whether "deleted" items are ever shown (trash folder, audit log)

---

### 5. History / audit trail

**Question:** Does it matter what this object **was** in the past?

**Why it matters:** If yes, history is part of the model, not an
afterthought.

**Examples:**
- Price changes (billing disputes require historical rates)
- Address changes (different from typo corrections)
- Status changes (who approved what, when)

**Document:**
- What changes need to be tracked
- Who needs to see history (users? admins? support?)
- How far back history is kept

---

### 6. Optimistic vs. pessimistic updates

**Question:** After a user action, do we show the assumed result
immediately (optimistic), or wait for server confirmation (pessimistic)?

**Why it matters:** Affects perceived speed vs. error-handling complexity.

**Examples:**
- Like button → Optimistic (instant feedback, rarely fails)
- Payment → Pessimistic (must wait for confirmation)
- Editing shared document → Optimistic with conflict resolution

**Document:**
- Preferred approach per action type
- Flag as engineering constraint if implementation is uncertain
- Error-rollback plan for optimistic updates

---

### 7. Concurrent edits / version conflicts

**Question:** What happens if two people edit the same thing at the same
time?

**Options:**
- **Last write wins** — simple, can lose data
- **Pessimistic lock** — first person to open locks it
- **Optimistic lock** — both can edit, collision detected on save
- **Merge** — both changes preserved (complex)

**Why it matters:** Collaborative features need this decided up front.

**Document:**
- Which approach per object type
- How conflicts are shown to users
- Whether merge is needed or simple overwrite is acceptable

---

### 8. Validity periods / expiration

**Question:** Does this object expire or become invalid after a time?

**Examples:**
- Promotional codes (valid until date)
- Session tokens (timeout after inactivity)
- Cached data (stale after N minutes)

**Document:**
- Expiration rules
- What happens on expiry (auto-delete? mark expired? extend?)
- Whether users can see expiration status

---

### 9. Scheduled actions / future state

**Question:** Can users schedule things to happen later?

**Examples:**
- Scheduled posts (publish at specific time)
- Recurring appointments (repeat weekly)
- Auto-renewal (subscription extends unless cancelled)

**Document:**
- What can be scheduled
- How users see/manage future scheduled items
- Whether scheduled items can be edited/cancelled

---

## Interaction structure layer temporality

These are workflow/flow concerns, not model-level, but they're commonly
missed so they're listed here for completeness. Route these to
`interaction-design` or `ux-pattern` instead.

### Post-action state
After submitting, what does the user see? Does a redirected list
immediately reflect the change?

### Empty, loading, partial states
Every screen has a temporal lifecycle — what do users see while waiting,
when there's nothing yet, when there's an error?

### Error and failure paths
Validation failure, server error, network disconnection, timeout,
concurrent edit conflict — required design steps, not afterthoughts.

---

## How to use this checklist

1. **Don't force it.** Only answer questions that genuinely apply to your
   objects. Many objects won't need most of these.

2. **Mark N/A clearly.** If a decision doesn't apply, write "N/A" so it's
   clear you considered it and ruled it out.

3. **Defer to engineering when entangled.** Some of these (like lag
   duration, optimistic vs pessimistic) depend on technical constraints.
   Articulate the **user need**, flag the question, and carry it into an
   engineering conversation.

4. **Document decisions, not just constraints.** "We chose soft delete to
   preserve billing history" (decision) is better than "Database keeps
   deleted records" (constraint).

---

## When temporal decisions bite

You'll know you skipped temporal decisions when:

- Users complain "I just changed this, where did it go?" (lag, optimistic
  update)
- Support asks "How do I see what this appointment used to be?" (history
  missing)
- Engineers say "We built cascade delete, hope that's OK" (deletion
  semantics never discussed)
- QA finds "Two people editing same thing causes data loss" (concurrent
  edit never modeled)
- Product asks "Can we add a trash folder?" (soft vs hard delete decided
  at database layer, not product layer)

An hour spent on temporal decisions saves weeks of retrofit work.

---

## Sources

Temporal decision categories informed by:
- Product design frameworks — proactive temporal decision checklist
- **Event Sourcing / CQRS** patterns (Martin Fowler, Greg Young) — read
  model lag, audit trail
- **Domain-Driven Design** (Eric Evans) — temporal relationships, bounded
  context temporality
- **Optimistic UI** patterns (Relay, Apollo) — optimistic vs pessimistic
  updates
