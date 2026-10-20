---
name: design-kickoff
description: "The mandatory front door for ANY new project, feature, initiative, or design request in this repo, no matter how vague. Triggers whenever a designer or PM says they want to start, kick off, work on, explore, look into, design, or build anything that has no PRD yet — a leaderboard, a referral flow, a redesign, a new feature, a one-line idea. ALSO triggers on \"give me ideas for X\" / \"ideas for X\" and on requests for screens, flows, or UI for something with no PRD. Enforces the design process — research first, PRD second, human approval third, design work last. If in doubt whether a request is a project start, it is. Fires before `ui-agent` and before any mockups or prototypes. Does NOT fire when a task folder already has an approved PRD (`projects/[slug]/brief.md` marked approved) or a prototype already exists in `src/design-harness/pages/` — those are iterations, see `harness/ORCHESTRATOR.md` §2's iterating row."
---

# Design Kickoff — the front door

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

You are the process gate. When this skill fires, the person has asked to
start something. Your job is NOT to design it, scope it, or brainstorm
solutions. Your job is to run the kickoff sequence below, **in order,
without skipping**, and to refuse solutioning until the gate is passed.

## The iron rule

**No design work before an approved PRD. No PRD before research.**

If the person asks for screens, flows, ideas, or opinions before the gate:
acknowledge, park the request ("noted for after the PRD"), and continue the
sequence. Do not be seduced by a clear-sounding ask — "city by city
leaderboard" sounds specific but contains zero verified context. Vagueness
is not the trigger; *newness* is.

## Step 0 — Frame (2 minutes, max 3 questions)

Ask ONLY what routing needs, nothing more — this **replaces**
`harness/ORCHESTRATOR.md` §1's intake questions for this request, it does not run
in addition to them:

1. What's the working name / one-line description of the thing?
2. Is there ANY existing material you already know of? (PRD, brief, Jira
   epic, Slack thread, Figma, Miro)
3. Who's the PM / requester?

Do not interview them about the problem — that's what research is for.
Open (or reuse) `projects/<slug>/` immediately using the working name as the
slug, per `harness/ORCHESTRATOR.md` §5.

**Do this atomically, per `harness/ORCHESTRATOR.md` §2b.** Creating the folder and
asking the 3 questions happens in the same turn — never create the folder
and stop before the questions are asked and answered. If the questions
can't be answered right now (designer goes quiet, gets pulled away), say so
explicitly rather than letting the folder sit at `Status: STUB` with no
explanation. `Status: STUB` in `brief.md` means "kickoff never actually
started" — it must not survive past the turn that created it.

## Step 1 — Planning + research sweep (mandatory, automatic)

Step 1 has **two legs** — run both every time, in parallel where possible.
Append each leg's raw output to `projects/<slug>/findings.md` (dated, named
after the skill) as it comes in. **Never skip Leg A** — it catches
in-flight roadmap and designer ownership that Leg B's deep discovery can
miss (proven: Live Activity owned by Tom Becker on `PROJ-154` while
`DES` showed nothing).

**Also read `COMPANY-SOURCES.md`** at the start of Step 1. Open any
linked Docs/Confluence/boards whose topic or “When to open” matches the
project (strategy / planning rows especially). Do not invent quarter
priority from memory — open or list inaccessible URLs honestly.

**Project `sources.md`:** ensure `projects/<slug>/sources.md` exists
(copy from `projects/_template/sources.md` if missing). At Step 0, if the
designer already named material (articles, Docs, boards), append those
URLs as rows. During Step 1, append durable external URLs discovered in
the sweep; keep synthesis in `findings.md`. See
`docs/HOWTO-COMPANY-SOURCES.md`.

### Step 1a — Workload & ownership (Leg A)

Load and execute **`../workload-agent/SKILL.md`** with the
project name + domain from Step 0. Run at minimum:

1. **Roadmap leg** — relevant roadmap board(s) from
   `workload-agent/references/roadmap-boards.md` (infer domain: payments →
   `PAY`, core product → `CORE`, provider growth → `GROW`, etc.). Level 1
   (Opportunities) **and** Level 2 / keyword search when the topic names a
   feature — see `roadmap-check.md`.
2. **Execution leg** — `project in (DES, UXR)` keyword search for the
   topic; if Step 0 named a person, run `lookupJiraAccountId` first.
3. **Cross-reference** — aligned / roadmap-without-design / design-without-
   roadmap-parent buckets per workload-agent Step 3.

Append to `findings.md` as `workload-agent`. This leg is **report-only** —
no PRD, no Confluence page from workload-agent during kickoff.

### Step 1b — Deep discovery (Leg B)

Load and execute **`../research-agent/SKILL.md`** with the project
name + any pointers from Step 0. The sweep is mandatory even if the person
says "there's nothing written down" — absence of material is itself a
finding that goes in the PRD.

Per `research-agent`'s own checklist, the sweep covers at minimum:
- **Atlassian** — Confluence pages (full bodies) + Jira issues (mandatory)
- **Slack** — public + private threads on the topic (mandatory) — private
  hits are filtered per `research-agent`'s privacy guardrail
  (`references/agents.md` § Privacy & sensitive content) before anything
  from them reaches `findings.md` or the PRD; comp/HR/health/legal/conflict
  content is withheld outright, never surfaced for the requester to decide
- **Figma** — any design files linked from Confluence/Jira bodies
- **Miro** — any workshop boards linked from bodies

While sweeping, collect with source + date on every claim (data hygiene
rule: only verified, cited data). Distinguish: verified facts / stated
opinions / assumptions found in docs / gaps where nothing exists. Append
raw findings to `projects/<slug>/findings.md` (dated, named `research-agent`)
as they come in, per the task-folder append-only rule.

**Leg A vs Leg B:** workload-agent answers *who's already on this and
what's committed on the roadmap*; research-agent answers *what do we know
about the problem from docs and conversations*. Both feed the PRD; neither
replaces the other.

### Step 1c — Assumption map (mandatory, cheap)

Load and execute **`../assumption-mapper/SKILL.md`** against
what Legs A+B actually found — not a second discovery sweep.

- Known vs believed, four buckets (user / problem / solution / business),
  2×2 of confidence × impact-if-wrong.
- Append to `findings.md` as `assumption-mapper`.
- High-impact / low-confidence items become the input to Step 1.5 (don't
  invent a study if the map is empty).
- **Never invent a "known" item** without a citation from 1a/1b or
  `COMPANY-*` files.

This is the composition ORCHESTRATOR already claimed. Do not skip because
the designer didn't say "map our assumptions."

## Step 1.5 — Method recommendation (when the sweep didn't answer it)

**The gap this closes:** Step 1's sweep (Leg A + Leg B) only searches
*existing* material. If it comes back thin — a real open question with no
internal answer — the instinct is "let's do some interviews," picked out of
habit rather than fit.

**Only fires when Step 1 found a genuine gap** — if Leg A/B already answered
the open question, say so and skip this step; don't recommend new primary
research to re-answer something already known.

**Reason from real constraints**, not a generic method list:
1. **Timeline** available before a decision is needed
2. **Access to real users** — none / limited (a few, hard to schedule) / on-demand
3. **Question shape** — exploratory ("we don't know what we don't know") vs.
   validating (testing one specific hypothesis)
4. **Depth vs. scale** — need the *why* from a few people, or a directional
   signal from many
5. **What Step 1 already found** — a thin sweep with *some* signal may only
   need validation, not a full fresh study

**Method menu** (grounded in what's actually run at the company — `UT` appears
repeatedly across this repo's real project history, not a generic UX-101
list):
- **User interviews** — exploratory, depth over scale, needs real user access, slower
- **Usability test (UT)** — validating a specific flow/hypothesis, needs a
  prototype or comp to react to, moderate time
- **Survey** — scale over depth, quick directional signal, needs a
  distribution channel, weak on *why*
- **Card sort / tree test** — structural/IA questions specifically (the
  `settings-ia` project's shape is the canonical example) → `ia-methods`
- **Diary study** — longitudinal behavior over time, high time cost, rare —
  only when the question genuinely can't be answered any faster way
- **Competitive teardown only** — when the real question is "how do others
  solve this," not "what do our own users think" → routes to
  `competitor-scan` instead of primary research
- **No new research** — when Step 1's sweep already answered it; say so
  plainly rather than manufacturing a study

**Output:** one recommended method + one clear sentence of *why* + which
constraint ruled out the alternatives — not a menu dump of all six options.
Append to `findings.md` (dated, named `design-kickoff`).

**If the request itself is still vague or aggressively time-boxed** ("we
have a week," "just run a survey") before this step's reasoning can even
start, run `decision-first-research` first — it names the actual decision
and deadline this step then recommends a method against.

**Standalone use (outside a full kickoff):** on an already-approved
`projects/<slug>/` task with one open question, this mode is directly
callable without re-running Step 0-1 — same reasoning, same output shape,
appended to that task's existing `findings.md` instead of a fresh kickoff
sweep.

## Step 2 — Draft the PRD (from evidence, not imagination)

Write the PRD into **`projects/<slug>/brief.md`**, using the structure in
`references/prd-template.md` — this supersedes the lighter default
`brief.md` template for kickoff-gated tasks; it's the same file, richer
content. Set the top `Status:` line to `DRAFT — pending kickoff gate
approval` as part of this write — this is what lets a future resume (per
`harness/ORCHESTRATOR.md` §2b) know Step 0-2 actually completed, versus a folder
that only got stubbed out. Rules:

- Every claim carries a source link + date. No source = goes in
  "Assumptions & open questions", never in "What we know".
- **Jira keys and other source IDs:** markdown links per
  `references/shared/source-links.md` in chat, `findings.md`, and the PRD —
  never bare `PROJ-123` when Atlassian is connected.
- The three questions must have answers or explicit "UNKNOWN — needs
  decision/research": Why are we doing this? What problem does it solve?
  How will we know it worked?
- Every section needs a user goal AND a business outcome — if either is
  missing from the evidence, say so loudly.
- Keep it dense and comprehensive. Compare boxes over prose where options
  exist.
- If research found a previous attempt at this project (old tickets,
  abandoned boards), include a "History" section — what was tried, why it
  died, what's reusable.
- **Step 1a's workload cross-reference must land in §1 "Existing work &
  ownership"** — who owns in-flight design (`DES`/`UXR`), what's on the
  roadmap (`Make`/`Plan`), and whether this kickoff duplicates or
  extends existing work. If Leg A found an owner, name them and link the
  ticket — never leave §1 empty when Leg A returned results.
- **Step 1c's assumption map must land in §2** (KNOWN vs ASSUMING) — don't
  draft a PRD whose "what we're assuming" is a blank because 1c was skipped.
- **Job stories (mandatory, `research-artifacts` Mode 5):** in §3 Users &
  context, write 3–7 stories in When / I want to / so I can form, from
  Step 1 evidence. Kickoff writes directly to Mode 5's **Stage B** (the
  prioritized set) for speed — but still **strip the mechanism** from
  each "When" clause (the moment must be picturable independent of any
  specific feature/tool), and still rank by importance × how poorly
  served today. Label each Observed / Inferred / Assumed. Follow Mode 5
  rules in `../research-artifacts/SKILL.md` (no feature-as-job,
  no invented quotes, mechanism stripped). If the sweep found **no** user
  evidence, still write 1–3 stories inferred from the ask, all tagged
  **Assumed**, and say "no sourced jobs yet." Append the same table to
  `findings.md` as `research-artifacts` (job stories). Do **not** expand
  into an opportunity-solution tree here — that's `product-strategy`,
  offered at Step 4 if strategy is still empty.
- **Before `Status:` moves past `DRAFT`,** check the PRD text against
  `references/shared/anti-ai-writing.md` (banned hype vocabulary,
  significance inflation, hedge-stacked predictions, unfilled
  placeholders, excessive structure). A PRD stakeholders actually read
  gets the same scrutiny published prose does — "this is a pivotal
  moment for the platform" in a problem statement is exactly as bad as
  the same line in an article.

**Gallery card enrichment (proactive, first eligibility):** once the
structured Ownership block in `brief.md` has a real `Designer:` and
`Gallery: visible`, and that designer is **not** yet in
`src/design-harness/galleryData.ts`, run
`references/shared/gallery-card-enrichment.md` in the same turn (title +
focusAreas + avatar). Success → write the enriched designer entry (+ route);
the project itself appears from `brief.md` automatically once its case study
lines are filled — never copy it into `galleryData.ts`. Failure → `[GALLERY-ENRICHMENT]`
flag, leave unlisted, never invent, never block the kickoff gate. Audit
Step 3.5 is the safety net.

## Step 2.5 — Offer Confluence (optional, private space only, never a gate)

After drafting the PRD, ask **once**: *"Want this as a page in your private
Confluence space too, so [PM/stakeholder] can comment there instead of
here?"*

- **If yes:** create the page in the **requester's private space only** —
  never a shared/team space pre-gate. Title matches the project name,
  marked **`Status: DRAFT — pending kickoff gate`** at the top, linked back
  to the source task folder (`projects/<slug>/`).
- **If no, or no response:** proceed straight to Step 3. This step never
  blocks the gate either way.
- If the PRD gets revised after a "fill gaps first" loop back from Step 3,
  ask **once more** whether to update the Confluence copy (if one exists).
  Don't let it go silently stale — but don't re-ask if they declined the
  first time.

Log the choice in `projects/<slug>/decisions.md`: Confluence created (yes/no),
link if yes. This is what lets `harness-audit` and a future resume know
where the reference copy lives without re-asking.

**Confluence is a comment/reference surface for stakeholders — it is never
a second gate.** It is never polled, checked, or treated as an approval
source. If the person says "they commented on Confluence, it's good," take
that as their verbal confirmation at the Step 3 gate — same as any other
input — not as a reason to skip Step 3 or check the page for a reaction.

## Step 3 — THE GATE (hard stop, chat-only, regardless of Confluence)

The approval conversation always happens here, in chat — whether or not a
Confluence copy exists from Step 2.5 makes no difference to this step.

Present the PRD to the human with exactly this framing:
- **Existing work & ownership** (from Step 1a — overlaps, gaps, named owners)
- What we know (with sources)
- What we're assuming (unverified)
- What's missing (and who/what could fill it)
- The three questions and their current answers

Then STOP and ask: **"Is this PRD good enough to design against, or do we
fill gaps first?"**

Do not proceed on silence. Do not proceed on enthusiasm about the solution.
Proceed only on explicit approval of the PRD. If gaps are chosen: route to
filling them (more research, a stakeholder question list, or data
requests), then return to this gate.

Log the approval (or gap-filling detour) as a dated entry in
`projects/<slug>/decisions.md`, **and** update `brief.md`'s `Status:` line to
`APPROVED` — this is what lets `harness/ORCHESTRATOR.md` §2/§2b detect "already has
an approved PRD" on a future resume and skip re-gating. A gap-filling
detour keeps `Status: DRAFT` (still pending gate) until approval actually
happens.

## Step 4 — Route into this repo's design process

Only after gate approval, hand off using the **iterating** row — research
is done, PRD is approved.

**Do not jump straight to screens.** Check three cheap flags from the
approved PRD + task folder:

| Flag | Present if |
|------|------------|
| **Jobs** | ≥1 job story tagged Observed or Inferred (Assumed-only = not present) |
| **Objects** | `projects/<slug>/conceptual-model.md` exists, or §3 names objects/states that were settled |
| **Strategy** | Success metrics are not UNKNOWN, **or** `projects/<slug>/strategy.md` exists |

- **All three present** → `ui-agent` → (`icon-usage` if needed) →
  (`ux-pattern` if the PRD raises a structure/archetype question) →
  `audit` (mandatory close; OOUX + layer tags ride along).
- **Any flag missing** → **AskQuestion once** (do not auto-run the heavy
  skills). Options:
  - Run `diagnostic` (recommend the bottleneck)
  - Run `conceptual-model` (objects / states / vocabulary)
  - Run `product-strategy` (outcome → opportunities → bets)
  - Skip — build screens now (`ui-agent` chain)
  - Other…
  After they pick, run **that one skill**, then return to this check
  (or proceed to `ui-agent` if they skipped). Never silently start
  `conceptual-model` or an OST because a box was empty.

Parked design requests from Step 0 can now be honored — in the order the
approved PRD's scope dictates, not the order they were asked.

## Wayfinding mode

**The gap this closes:** the full sequence turns one effort into one
PRD. Some efforts are still fog — several decisions, no destination
you could hand to a build. This mode charts that way and stays in
planning.

**When this fires:** the ask uses wayfinding language ("wayfind",
"map the decisions", "too big for one session", "plan, don't build",
"the way isn't clear"). "Explore X" or "let's start on X" is the full
sequence above, starting at Step 0.

**Do this instead of Steps 0–4.** Do not sweep, do not draft a PRD,
do not build screens.

1. Name the destination in one line: a spec to hand off, a decision
   to lock, or a change to make once the way is clear. The name shapes
   every decision under it.
2. Open `projects/<slug>/` if it exists. If it does not, create the
   folder and write `wayfinding.md` only. Do not create `brief.md`.
   A missing brief is what keeps the build skills from starting.
3. Write the map. It is an index. When a decision actually settles,
   write the text once in `decisions.md` under that name, and gist it
   on the map. Refer to every decision by its name.
4. The next reply works the frontier — one open decision — then
   updates the map. The pull to just build means the map is done.
   Hand off to the full sequence when no approved PRD exists, or to
   `ui-agent` when one does.

```markdown
# Wayfinding — [destination name]

**Destination:** [what "done" means]
**Status:** mapping | clear

## Decisions so far
- **[Name]** — one-line gist. Detail lives in decisions.md under this name.

## Open
- **[Name]** — the question. A decision, not a build task.

## Frontier
Next: **[Name]**
```

---

## Anti-patterns (refuse these politely)

- "Just give me some quick screens first" → screens before PRD are
  decoration for assumptions. Park it.
- "Wayfind this" used to skip research on a vague "explore X" → that
  ask is the full sequence. Wayfinding mode only runs on the explicit
  phrases in § Wayfinding mode.
- "We already know the problem" → then research will be fast and the PRD
  short. Run it anyway; "known" problems with no sources are folklore.
- "The PM said it's approved" → approval of the *idea* is not approval of
  the *PRD*. Gate stands.
- Skipping Slack/Jira because "there's probably nothing" → the sweep is
  cheap; missed context is not.
- "Check if they've approved it on Confluence" → Confluence is never
  polled or treated as an approval source. The gate is a chat question;
  if someone tells you what was said there, that's their verbal input at
  Step 3, not a substitute for asking it.

## Related files

| File | Role |
|---|---|
| `references/prd-template.md` | The PRD structure used in Step 2, with the Confluence-link footer from Step 2.5 |
| `../workload-agent/SKILL.md` | Mandatory Step 1a — roadmap + designer ownership cross-ref |
| `../research-agent/SKILL.md` | Mandatory Step 1b — deep discovery sweep |
| `../assumption-mapper/SKILL.md` | Mandatory Step 1c — known vs believed from 1a/1b; feeds Step 1.5 |
| `../research-artifacts/SKILL.md` | Mode 5 job stories — drafted in Step 2 from Step 1 evidence |
| `COMPANY-SOURCES.md` | Step 1 — open matching global strategy / planning (and other) source links |
| `projects/<slug>/sources.md` | Step 0/1 — project link catalog; append pasted / discovered durable URLs |
| `harness/ORCHESTRATOR.md` §2 | Where this skill sits as the front door, ahead of the build row |
| `projects/<slug>/brief.md` | Where the PRD is written and later marked approved |
| `projects/<slug>/decisions.md` | Where gate approval is logged, plus the Step 2.5 Confluence choice (yes/no, link) |

---

## Self-improvement loop

After completing this kickoff, before ending your turn:

1. **Review execution:** Did any step fail, need a workaround, or require multiple attempts?
2. **Review corrections:** Did the designer correct, reject, or clarify anything meaningful during this run?
3. **Review gaps:** Did you discover a missing research leg, an ambiguous approval criteria, or a kickoff pattern this skill doesn't cover yet?

If **yes** to any:

- Propose **one specific, actionable improvement** to this skill file.
- State what would change and why (reference the step number or section).
- Wait for designer approval before editing the skill.

**Only propose changes that would prevent a real failure or fill a documented gap.** Do not suggest:
- Vague improvements ("could be more thorough")
- Taste preferences without evidence
- Changes that belong in a different skill
- Fixes for one-off edge cases unlikely to recur

If nothing meaningful broke or was missing, skip this section silently.
