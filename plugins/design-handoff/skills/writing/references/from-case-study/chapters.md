# Case study chapters

The one definition of a case study's story. `case-study` writes it into
`projects/<slug>/case-study.md`; `deck-builder` (slides) and `writing`
(prose) render that file and never re-derive the story.

**Shape:** research → decision → outcome. Eight chapters in fixed order.
Skip a chapter only when the task folder has nothing real to put in it,
and say so in the outline and in the file.

**Worked source folder:** `projects/settings-ia/` — every chapter below
cites which file to pull from and a concrete settings-ia example.

**Audience default:** stakeholders who need the *story of the decision*
(research → options → call → what shipped), not a workshop vote or a
status skim. Outcome + asks only → `deck-builder` stakeholder update.

For each chapter: **job** (what it must do), **source** (task folder
file — never invent), **write like** (content shape), **settings-ia
example**, **skip when**.

---

## 1. Opening — Framing → Who → Intro → RACI

**Job:** Keep framing, people, lede and status apart. They were jammed
into one block once (live miss 2026-08-04 on the settings-ia stakeholder
deck) and nobody could read it.

| Part | What it holds |
|------|---------------|
| Framing | One headline that says what this work is about. Nothing else. |
| Who | PM, Design / squad, Status. Labels and names only. |
| Intro | What this work *is* — one short heading and one sentence. |
| RACI | Responsible / Accountable / Consulted / Informed. |

**Source:** `brief.md` ownership fields, Case study summary, Constraints
(content / eng consultees). RACI people must already appear in the brief
— don't invent a Consulted row.

**Write like:**
- Framing = `"Stop redesigning X — the problem is Y"` energy in one line.
- Who = labels + names only; no paragraph.
- Intro = one idea; why-now depth belongs in chapter 2.
- RACI = four rows max unless the brief truly lists more consultees.

**Settings-ia example:**
- Framing: *A repeatable header pattern is proven on Calendar. Three tabs to go.*
- Who: Elena (PM) · Daniel / Engagement (Design) · Discovery — pending kickoff gate
- Intro: Contextual settings via a header gear on every primary tab; Calendar first
- RACI: R Daniel · A Elena · C Mia (content) · I this room

**Skip when:** Never skip Framing. Who / Intro / RACI skip only if the
brief has no people or framing beyond the title (rare). A small internal
case study may merge Who + RACI — note it.

---

## 2. Problem / why now

**Job:** Who hurts, what's broken, and why this moment. A reader should
be able to retell the problem in one breath.

**Source:** `brief.md` Problem / Goal / Why are we doing this?; fold in
one "why now" signal from `findings.md` if it exists (phase-1 result,
escalation, timeline).

**Write like:** 2–4 sentences max. Name the user, the failure mode, and
the forcing function. Evidence belongs in chapter 3.

**Settings-ia example:**
- Problem: headers inconsistent across tabs; Settings overloaded;
  contextual controls hard to find.
- Why now: phase 1 bottom tabs at 79.6% success — phase 2 needs a
  consistent header system so providers reach tab settings without
  opening global Settings (`brief.md`).

**Skip when:** Never. If `brief.md` has no problem statement, stop and
ask — don't invent one.

---

## 3. Evidence — numbers, voices, tables

**Job:** Prove the problem (or the opportunity) with material already
logged. Group by type: numbers, voices, tables. One idea per group.

**Source:** `findings.md` only. Quotes must be verbatim and attributed
(live miss 2026-07-29: analysis phrasing was almost used as a quote —
check the source). Every number must already appear in findings or a
research artifact linked from findings.

**Write like:** A short takeaway line, then only the evidence. Every
quote carries a name, role and source line — a person behind each line
(live miss 2026-08-04).

**Settings-ia example:**
- Numbers: **79.6%** / **1/4** / **≥80%**
- Voices: two attributed provider quotes

**Skip when:** `findings.md` has no quotes, numbers or tables yet. Say
so; never fabricate evidence to fill the slot.

---

## 4. Options considered (including rejected)

**Job:** Show the decision wasn't the first idea. Include what was
rejected and why.

**Source:** `decisions.md` (primary). Supplement with option frames
already documented in findings or IA docs only if decisions doesn't list
them yet — still cite the file, never invent a rejected option.

**Write like:** 2–4 options. Each: what it is, why chosen or why not.
Mark the rejected path plainly. Equal weight for rejected and chosen
until chapter 5.

**Settings-ia example:**
- Checkout Close vs Cashier: Idea B (stateful Close → New sale) chosen;
  Idea A (persistent Close | Cashier segment) rejected as primary chrome
  (`decisions.md` 2026-07-29).
- Prototype ownership: disown `NavigationProfilePrototypePage` as IA
  source; rebuild under calendar-settings (`decisions.md` 2026-07-15).

**Skip when:** `decisions.md` logs no real alternatives. Write one line
"no alternatives recorded" in chapter 5, or ask the designer which
options to add to `decisions.md` first — don't invent Option B.

---

## 5. The decision + why

**Job:** One clear call. After this chapter nobody wonders what was
chosen.

**Source:** The decisive entry in `decisions.md`, cross-checked against
`brief.md` Goal.

**Write like:** Label it (`The decision` / `What we locked`). One
sentence decision, one sentence why. Don't restate the options.

**Settings-ia example:** ship a **repeatable two-row header** (identity +
contextual settings gear) across primary tabs, **Calendar first**; other
tabs follow the same pattern (`brief.md` Goal + Intent).

**Skip when:** No decision exists yet. Write "Decision pending" and the
open questions — never a fake locked decision. If everything is still
open, this is a workshop, not a case study (`deck-builder` workshop).

---

## 6. Live prototype

**Job:** Show the decision running. Interactive, never a screenshot
collage.

**Source:** A real Design Harness route for the project (settings-ia:
`#/playground/calendar-settings`). List the route(s) and what to tap.
`deck-builder` embeds them with `?embed=1`; `writing` links them.

**Write like:** Route + one line telling the reader what to try. For
before / after, list both routes and say which is which.

On the case study page, write screens and formats as project paths, not
routes; the page resolves them:
- `![Label](screens/<Name>Page.tsx)` on its own line embeds the screen live.
  Add string props after it for a state or a rejected option:
  `screens/<Name>Page.tsx?lead=balance`. One embed per paragraph.
- `[Label](screens/<Name>.compare.ts)` links to that format; same for
  `.storyboard.ts`, `.variants.ts`, `.stage.ts`, `.ideas.ts`. List each
  format that exists, with one line on what it's for.
- Chapter 4 may embed a rejected option beside its "Rejected." line when a
  prop still reaches it.

Renderers (`deck-builder`, `writing`) turn each path into its route: the
screen or format's page in the project sidebar.

**Settings-ia example:**
- Walkthrough: `#/playground/calendar-settings` — open the header gear
- Compare: Proto v1 (no route yet) | Proto v2 Calendar header

**Skip when:** No prototype exists yet. Note the gap (build it with the
`ui-agent` chain first). Never describe a UI that doesn't exist.

---

## 7. Outcome / expected change

**Job:** Close the arc. Shipped results if you have them; otherwise the
honest expected change and how you'll know.

**Source:** `findings.md` post-ship / validation notes; otherwise
`brief.md` "How will we know it worked?" and Status.

**Write like:** Past tense for shipped ("phase 1 hit 79.6%"). Future
tense for expectations ("target ≥80% on header tasks"). Never present a
hope as a measured result. Residual risk gets one line, not the chapter.

**Settings-ia example:**
- Expected: providers complete top config from the tab gear without
  opening global Settings; validation target ≥80% (`brief.md`).
- Progress: Calendar built; Clients / Checkout / Business next; kickoff
  gate still open.

**Skip when:** Nothing to say about outcome or expectation (rare). Prefer
an expectation over silence if the brief has success criteria.

---

## 8. Sources / links

**Job:** Hand-off. Where to go for the ticket, IA doc, research or live
prototype, so the case study isn't the only artifact.

**Source:** `brief.md` Sources + ticket keys; task-folder doc paths;
gallery or public deck URLs.

**Write like:** 3–6 links with human labels (`Design ticket`, `IA
detail`), not raw URL walls. Drop designer-only scratch paths.

**Settings-ia example:** PROJ-169, PROJ-151 · `calendar-settings-prd-and-ia.md`
· Nav phase 1 validation wiki · live prototype route

**Skip when:** Never entirely — at minimum the ticket key from `brief.md`.
If Sources is empty, fix the brief first.

---

## Hard content rules

- Pull the story from the task folder; never re-derive it from chat
  memory when `brief.md` / `findings.md` / `decisions.md` answer it.
- Never fabricate a quote, number, rejected option, or shipped outcome.
- One idea per group inside a chapter: numbers, voices and tables stay
  apart.
- Prototypes = real routes only.

---

## File shape — `projects/<slug>/case-study.md`

```markdown
# Case study — <project title>

Status: DRAFT — <YYYY-MM-DD> · Sources: brief.md, findings.md, decisions.md

## 1. Opening
- **Framing:** …
- **Who:** …
- **Intro:** …
- **RACI:** R … · A … · C … · I …
Source: brief.md (Ownership, Case study summary)

## 2. Problem / why now
…
Source: brief.md (Problem); findings.md 2026-07-24

## 3. Evidence
### Numbers
…
### Voices
> "…" — Name, role (findings.md 2026-07-29)
Source: findings.md

## 4. Options considered
…
## 5. The decision
…
## 6. Live prototype
![<Screen>](screens/<Name>Page.tsx)
What to try.
- [<Format>](screens/<Name>.<format>.ts): what it's for
## 7. Outcome / expected change
…
## 8. Sources
…

## Skipped
- Chapter N — why (nothing in <file>)
```

Every chapter ends with a `Source:` line. A chapter with no source is a
skipped chapter, listed under **Skipped**.
