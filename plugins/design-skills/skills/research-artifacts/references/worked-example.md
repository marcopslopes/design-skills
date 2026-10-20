# Worked example — persona + journey map

Written for this harness's format — requires real data and logs to
`findings.md`, with an explicit scope boundary against neighboring skills.

## Scenario

`research-synthesis` just finished a full tag+affinity pass on 12
interviews with providers who manually track cancellations in a
spreadsheet outside the company. The team wants a persona and a journey map
before designing a cancellation-recovery feature.

## Mode 1 output — persona

```markdown
## Persona — Manual-tracking provider

**Source data:** research-synthesis pattern "tracks cancellations
outside the app" (7/12 participants), findings.md 2026-08-09

**Dana, solo hairstylist** — "I just keep a note on my phone of who
cancelled last-minute so I remember not to give them priority slots."

Goals: protect her calendar from repeat last-minute cancellers without
confronting clients directly.
Frustrations: no visibility into cancellation history inside the company;
manually cross-references her own notes before confirming a new booking
from a repeat client.
Behaviors: keeps a phone notes app list; checks it before every booking
confirmation from a client she doesn't recognize as reliable.
Design implications: a visible, in-app cancellation history per client
would remove a manual step she's already doing unprompted — this isn't
a net-new behavior to design for, it's a workaround to absorb.

Primary persona: yes — 7/12 is the largest single cluster in this study.
Research gaps: no data yet on whether higher-volume providers (multiple
staff) do the same tracking or delegate it differently — flag for a
follow-up interview round before generalizing past solo providers.
```

## Mode 3 output — journey map

```markdown
## Journey map — Booking a repeat client with cancellation history

| Stage | Goal | Actions | Touchpoints | Emotion | Pain points | Opportunity |
|---|---|---|---|---|---|---|
| Client requests rebooking | Decide whether to accept | Checks own notes app | Phone notes app (outside the company) | Neutral, slightly annoyed at the extra step | No in-app record of this client's history | Surface cancellation count on the client profile |
| Confirms or holds the slot | Protect the calendar | Manually recalls or re-checks notes | the company app + notes app | Mild anxiety about forgetting to check | Context-switching between two tools | Same as above |
| Client cancels again | Decide whether to keep booking them | Updates personal note | Notes app | Frustration | No system reinforcement of the pattern she already tracks | In-app flag after N cancellations |

Moments of truth: the "confirms or holds the slot" stage is where the
missing information actually costs her something (a wasted slot) —
that's the highest-leverage point for the feature, not the cancellation
moment itself.

Top opportunities (ranked): 1) surface cancellation count on client
profile (removes the manual cross-check entirely), 2) in-app flag after
a threshold (reinforces what she's already doing manually).
```

## What changed once this ran

The team's first instinct was a "cancellation reasons" feature aimed at
the moment of cancellation. The journey map showed the actual pain
point was one stage earlier — at rebooking, when Dana has to
context-switch to decide. The feature scope moved accordingly.
