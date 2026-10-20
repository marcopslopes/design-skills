# Object failure modes (advisory)

Shared table for `conceptual-model` (model audit), `audit` (screen
pre-share), and `ux-pattern` (structure critique). **Always ADVISORY** —
these never flip an `audit` PASS → BLOCKED. Do not treat them as a
colour/spacing fix.

Load this file when checking whether the *same thing* is one object,
two objects, or a missing relationship.

| Failure mode | What it looks like | Where it roots | Don't | Do |
|--------------|-------------------|----------------|------|-----|
| **Shapeshifter** | Same object appears in significantly different forms across screens/contexts | Unclear object definition, or no view-composition rules | Restyle each instance independently | Settle core attributes; define context-specific views as subsets. Hand off to `conceptual-model` if the object isn't defined yet. |
| **Masked** | Different object types look identical in the UI | Model doesn't differentiate, or surface ignores the model | Add a colour/icon "to tell them apart" without naming the types | Clarify object types in the model; ensure the surface honors the distinction |
| **Broken object** | Attributes and actions for one object are scattered with no cross-linking | Interaction structure, not tokens | A denser card that still doesn't link the pieces | Flag for `ui-agent` / `interaction-design` / breadboarding |
| **Isolated object** | Objects exist with no visible relationship to other objects | Relationships missing in the model, or present but not surfaced | A new screen that still treats them as orphans | Add the relationship in `conceptual-model`, or surface an existing one in the flow |

If more than one mode fires, say which is primary. If the object model
was never written (`projects/<slug>/conceptual-model.md` missing) and
the screen is arguing about "is this one thing or two," stop painting
and offer `conceptual-model` — don't invent objects in an audit note.
