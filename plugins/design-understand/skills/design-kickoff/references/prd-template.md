# PRD — [Project name]
**Status: DRAFT — pending kickoff gate approval · Author: [designer] + Claude · Date: [date]**
**Sources swept:** [docs tool] [n pages] · [tracker] [n tickets] · [chat] [n threads] · Figma [n files] · Miro [n boards] · workload snapshot [date] — [date of sweep]

## The three questions
- **Why are we doing this?** [answer + source, or UNKNOWN — owner to decide]
- **What problem does it solve, and for whom?** [answer + source, or UNKNOWN]
- **How will we know it worked?** [metric + baseline + source, or UNKNOWN — no metric = no project]

## 1. Existing work & ownership
*From `workload-agent` Step 1a — live roadmap + `DES`/`UXR` cross-ref at kickoff time.*

**Roadmap (in flight):**
| Ticket | Board | Stage | Summary |
|---|---|---|---|
| | | | |

**Design execution (in flight):**
| Ticket | Board | Assignee | Status | Summary |
|---|---|---|---|---|
| | | | | |

**Cross-reference:**
- **Aligned** (roadmap + design both active on this topic):
- **Roadmap without design ticket yet:**
- **Design without obvious roadmap parent:**
- **Recommendation for this kickoff:** extend existing work / coordinate with [name] / net-new lane is clear

If Leg A found nothing, say so explicitly — don't leave this section blank
without stating the query ran.

## 2. Problem & evidence
What we KNOW (every line: claim — source link — date):
-

What we're ASSUMING (found in docs but unverified, or implied by the ask):
-

What's MISSING (and who/what could fill it):
-

## 3. Users & context
Who is this for (segments, with evidence of their behavior today):
User goal:
Business outcome:

**Job stories** (from `research-artifacts` Mode 5, Stage B — drafted at kickoff, not an extra ask. Mechanism stripped from the "When" clause; ranked, not just listed):

| # | When (situation) | I want to (motivation) | So I can (outcome) | Type (F/E/S) | Observed / Inferred / Assumed | Source |
|---|---|---|---|---|---|---|
| 1 | | | | | | |

If every row is Assumed, say so — Step 4 will offer a deeper pass, not pretend jobs are settled.

## 4. History (if any previous attempt exists)
What was tried · why it stopped · what's reusable (tickets, designs, research):

## 5. Scope hypothesis
In (with rationale):
Out (with rationale):
Dependencies & adjacent initiatives (teams, tickets, launches that touch this):

## 6. Success metrics
Primary metric + current baseline + target:
Guardrails (what must not regress):

Once this section has a real metric (not UNKNOWN), a validation study is
`researcher`'s to plan — see `harness/agents/researcher.md` and
`references/from-research-agent/test-plan-template.md`, copied
into `projects/<slug>/testing/test-plan.md` when the study is actually
planned or run.

## 7. Risks & open questions
| # | Question / risk | Owner | Blocks what |
|---|---|---|---|

## 8. Proposed process after approval
Per `design-kickoff` Step 4: check jobs / objects / strategy flags. If any
are missing, AskQuestion (diagnostic / conceptual-model / product-strategy /
skip to screens). If present: `ui-agent` → `icon-usage` (if needed) →
`ux-pattern` (if structure question) → `audit`.

---
**Docs copy:** [link, if created in Step 2.5 — otherwise "none, kept chat-only"]
