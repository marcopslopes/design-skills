# Service blueprint

A journey map shows what the customer/provider experiences. A blueprint
adds **how the organization delivers that experience** — the staff,
systems, and handoffs behind each touchpoint. Use it when a journey
map's pain point needs a root cause, and the root cause is operational,
not just an interface problem.

**Built on top of a journey map** — run `research-artifacts` Mode 3
first (or use an existing one) if it doesn't exist yet.

---

## The five lanes, three lines

```
Physical evidence     (what the user sees/touches at each step)
─────────────────────  Line of interaction
Customer/user actions  (what the user does — verb-first)
─────────────────────  Line of visibility  ← the most important line
Frontstage actions     (staff/system actions the user can see)
─────────────────────  Line of internal interaction
Backstage actions      (staff/system actions the user cannot see)
Support processes      (infrastructure/tools/third parties enabling it all)
```

| Lane | Question that fills it | Sourced from |
|---|---|---|
| **Physical evidence** | What does the user see, touch, or receive at this step? | Screenshots, emails, receipts — walk the flow or ask a real user |
| **Customer/user actions** | What does the user do? (mirrors the journey map's Actions row) | Journey map, or same sourcing as Mode 3 |
| **Frontstage** | What does the org do that the user can see? | Shadow staff, review system messages/scripts |
| **Backstage** | What has to happen internally to make the frontstage action possible? | "Walk me through what happens after the user does X" — ask frontline staff, review process docs |
| **Support processes** | What systems/tools/third parties enable the backstage action? | System owners, internal docs |

**The line of visibility is a design decision, not just a description.**
Ask explicitly: what *should* the user see (transparency builds trust)
vs. what should stay hidden (internal complexity)? Sometimes moving the
line — e.g. exposing fulfillment progress that was previously
backstage — is the actual fix for the pain point.

---

## Same sourced-data-only rule as every mode in this skill

Backstage and support-process lanes are the ones most likely to get
invented ("probably the system does X") because they're invisible to the
designer too. **Don't.** If you don't have a source (frontline interview,
process doc, system owner) for a backstage row, mark it **unknown** and
name who to ask — don't fill it with a plausible guess.

---

## Where root causes hide

When a journey-map pain point exists, the blueprint usually reveals the
operational cause is somewhere the user never sees:

> Pain point: "My order took 5 days instead of the promised 2."
> Frontstage: confirmation email said "2-day delivery."
> Backstage: warehouse flagged item out-of-stock, triggered reorder.
> Support process: inventory system wasn't synced with the storefront.
> **Root cause: a system integration gap, not a shipping problem.**

Trace the chain from the user-visible symptom down through the lanes
until you hit something that's actually fixable — often several lanes
below where the complaint appears.

---

## Annotate, don't just describe

Flag on the blueprint:
- **Pain point** — where the service breaks down for the user
- **Wait time** — where the user or an internal team waits
- **Handoff** — where the work crosses from one team/system to another
  (handoffs are disproportionately where things break)
- **Opportunity** — a candidate fix, tied to a specific lane/step

---

## Common mistakes

| Mistake | Instead |
|---|---|
| Starting with backstage | Always start from customer/user actions — a backstage-first blueprint is an ops diagram, not a service blueprint |
| Mapping every possible step in full detail | Start high-level; zoom into detail only where a pain point already exists |
| Skipping the line of visibility | Draw the three lines first, then fill lanes — the lines are the structure, not decoration |
| Only the happy path | Include the failure/edge paths that actually caused the journey map's pain points |
| Inventing backstage/support rows | Mark **unknown** + who to ask — same rule as every other mode |

---

## Output format

```markdown
## Service blueprint — [flow/scenario] — YYYY-MM-DD

**Built on:** [journey map source — Mode 3 output or existing artifact]
**Scope:** [one specific scenario, not "the whole product"]

### Lanes

| Step | Physical evidence | Customer/user action | Frontstage | Backstage | Support process |
|---|---|---|---|---|---|

### Line of visibility — deliberate calls
- [What we're choosing to expose vs. keep hidden, and why]

### Annotations
- Pain points: …
- Wait times: …
- Handoffs: …

### Root cause chain (if tracing a journey-map pain point)
Pain point → frontstage → backstage → support process → **root cause**

### Unknowns (flagged, not invented)
- [Backstage/support row] — source needed: [who to ask]

### Opportunities (ranked)
- …
```

Persist to `projects/<slug>/findings.md`, same as every other mode in
this skill.
