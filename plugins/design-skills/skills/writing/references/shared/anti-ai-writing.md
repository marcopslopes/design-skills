# Anti-AI-writing checklist — shared across every stakeholder-facing doc

Any skill that produces text a stakeholder will actually read — a PRD
(`design-kickoff`), a docs brief or discovery page (`docs-brief`,
`research-agent`), a ticket (`ticket-create`), deck narration/copy
(`deck-builder`), a critique presenter script (`critique-prep`), or an
eng spec sheet (`design-handoff`) — runs this
checklist before finalizing. Long-form prose
(articles, essays, case-study writeups) uses this too, but has its **own**
additional rules on top of it — see `references/slop-patterns.md`.

**Why a shared file instead of copying this list into five skills:** these
patterns hold regardless of doc shape — a PRD with "unlock potential" in its
problem statement is exactly as bad as an essay with it. Keeping one file
means fixing a false positive or adding a pattern happens once, not five
times with inevitable drift.

**Scope boundary — what stays in `writing`'s own file, not here:** prose
*rhythm* rules (rule-of-three stacking, tricolon closers, uniform paragraph
length, "listicle creep") assume free-flowing paragraphs. A PRD, brief, or
ticket is *supposed* to be headed and bulleted — that's not a tell in a
structured doc the way it is in an essay. Don't import those rules here.

---

## Banned vocabulary (empty superlatives / hype words)

Same master list `writing` uses — one canonical copy:

game-changing · revolutionize(d) · unlock(s/ing) potential · seamless(ly) ·
robust · cutting-edge · state-of-the-art · elevate · empower(ing) ·
transformative · supercharge · unprecedented · next-level · deep dive ·
at the end of the day · in today's fast-paced world · navigate the
landscape · leverage (as a verb for "use") · utilize · facilitate ·
streamline · synergy · paradigm shift · crucial · pivotal · paramount ·
meticulous(ly) · underscore(s) (as a verb) · testament (to) · tapestry ·
realm · multifaceted · garner · bolstered · enduring · intricate /
intricacies · interplay · vibrant · align with · enhance · fostering ·
highlighting · showcasing · embark · harness (as a verb for "use")

If one of these is the only way to say something specific and true,
replace it with the specific true thing ("this cut review time from 3 days
to 4 hours" beats "this was a game-changer for the review process").

**Banned filler phrases:** "it's important to note that" · "let's delve
into" · "let's dive in" · "let's explore" · "here's what you need to
know" · "without further ado" · "in conclusion" · "it's worth
mentioning" · "moving forward" · "at the end of the day" · "that being
said" · "however, it should be noted" — just state the point. See
**Announce-then-state** below for the casual cousins.

## Copula avoidance

Replacing a plain "is/are/has" with an elaborate verb to sound more
important: "the feature serves as a unified entry point" → *is a unified
entry point*; "this release boasts three new flows" → *has three new
flows*; "the redesign marks the beginning of a new pattern" → *starts a
new pattern*. Extremely common in PRD feature descriptions and deck
narration specifically — "serves as," "features," "boasts," "presents"
padding a sentence that would be clearer as a plain verb. Use the plain
verb.

## Notability name-dropping

Stacking names (research participants, competitors, well-known
companies, tools) as credibility scenery rather than because the
specific name carries information the reader needs: "similar to how
Stripe, Notion, and Linear handle onboarding" in a PRD where none of
those three were actually researched. If a competitor or precedent is
genuinely relevant, name the one that matters and say what specifically
was learned from it; don't stack three or four for the appearance of
being well-researched.

## False concession

"While this approach has some limitations, it's still the right call" —
a hedge that gestures at a tradeoff without naming it, so it reads as
balanced without actually informing the decision. Name the real
tradeoff: "this adds ~200ms to first load; we're accepting that because
[reason]." A risks/tradeoffs section built entirely out of false
concessions gives a stakeholder nothing to actually weigh.

## Unraised objections

A defense of something nobody in the source, the brief, or the room
asked about: "this isn't mainly about the banner color, and I'm not
arguing research doesn't matter — the issue is whether the invite is
reachable from the booking list." If color and research were never in
scope, those clauses are leftover drafting. Keep the real claim; cut
the unsolicited defense.

Different from **False concession** (gestures at a tradeoff without
naming it) and from the overcorrection guardrail's "invented
contrarianism" (do not *add* a foil while cleaning). This one strips
the foil when it is already in the draft.

A named objection stays: "PM asked whether this belongs in overflow;
we kept it on the list because [reason]."

## Unused rejected alternative

A discarded option that appears once, is waved away, and never comes
back: "A tempting approach would be to hide invites in overflow, but
that would bury the action. We put it on the booking list." If
overflow is not in `decisions.md` and is not argued again, it is
leftover drafting — cut it and keep the real constraint.

**Keep it** when the option is a real choice this harness is supposed
to name: `ux-pattern` debate mode, decision-framework mode, a
logged row in `decisions.md`, or a ticket that lists alternatives.
Those skills exist to weigh options. This rule is "if unused, cut,"
not a ban on "we considered X."

## Shallow -ing clauses

A true sentence, then a trailing `-ing` phrase that pretends the fact
means more than it does: "The referral banner sits above the booking
list, highlighting unused invites and reflecting a broader shift toward
growth loops." The banner sits above the booking list. If unused
invites matter, say that in its own sentence with a source. Do not
keep `highlighting` / `reflecting` / `showcasing` / `symbolizing` /
`ensuring` / `contributing to` as a depth costume on a finished fact.

Banned-vocabulary already catches some of these words in isolation.
This rule is the *grammar*: one fact plus a participial clause that
adds no new information.

## False from-X-to-Y ranges

`from X to Y` is honest only when X and Y are ends of a real scale
("from 2s to 8s load time"). Models use it as a prestige list: "the
flow covers everything from first-time onboarding to multi-location
payroll, from SMS reminders to the conceptual model." Those are four
topics, not two ranges. Write the list. Common in deck narration and
PRD scope sections.

## Formatting tells

- **Emoji section headers** ("🚀 Performance," "💡 Scale") in a ticket,
  brief, or PRD section — reads as generated, not as a genuine visual aid.
  Plain text headers.
- **Bold-label-per-bullet overuse** — every single bullet starting with a
  bolded 1-3 word label regardless of whether that item needs one. Fine
  occasionally, a tell when it's every line in every list.
- **Em-dash-chained hedges** — a sentence that uses an em dash to soften
  or qualify a claim instead of just making a clean, direct one.
  **Do not ban dashes.** One em dash, or a voice-DNA habit of using
  them, is not a tell. A full dash ban fights personal voice and
  false-positives on edited prose.

(Note: bullets and headers themselves are not a tell in a PRD/ticket/brief
— see this file's own scope note above. It's the *decoration* on top of
structure — emoji, over-bolding — that's the tell, not structure itself.)

## Vague attributions

"Designers often find...", "teams typically struggle with...", "it's
widely understood that..." with no named source. Either cite the real
source (a person, a doc, a dated finding, a ticket) or drop the claim.
**Especially load-bearing in a PRD's "What we know" section** — an
unsourced claim there is exactly what `design-kickoff`'s own rule already
requires moving to "Assumptions & open questions" instead.

## Faux-insight setups

"What nobody tells you," "Here's what most people get wrong," "The part
everyone misses" — flattery that casts the writer as the lone expert
before the claim. Cut the setup; state the claim. Less common in tickets
than in docs-page narrative or deck narration, but the same tell when
it appears.

## Announce-then-state

A sentence that only announces the next point: "Let's dive into the
risks." / "Here's what you need to know." / "One thing that bit me,
so pay attention:" / "Heads up:" / "Quick note before we continue."
Delete the announcement; start with the content. Formal and casual
register are the same tell — "let's delve into" was already on the
filler list; this is the broader shape, including chatty asides that
do no work.

## Clipped endings

A real clause, then a tacked-on fragment instead of finishing the
sentence: "The options come from the selected item, no guessing."
Write the clause: "…without forcing the user to guess." Sibling of
**It's not just X, it's Y** in `slop-patterns.md`. Common in tickets
and handoff specs that were trimmed mid-thought.

## Chatbot leftover

Assistant residue left in a doc that should stand on its own: "I hope
this helps!" / "Let me know if you'd like me to expand." / "Would you
like examples?" / "Great question!" / "You're absolutely right!" Cut
it. A PRD, brief, ticket, or deck is not a chat turn. This is a
credibility killer — promote it above polish.

## Formulaic sayings

Turning an ordinary claim into a poster line: "X is the Y of Z,"
"symmetry is the language of trust," "efficiency becomes a trap,"
"documentation is not a tool but a mirror." Replace the saying with
the specific claim ("symmetric layouts feel more predictable").
Different from **Portability test** (the sentence could move to
another product) — this is a sentence that sounds deep and names
nothing.

## Performed candor

A staged pause or honesty claim before a routine point: "Honestly?" /
"Look," / "Let's be honest," / "Real talk," / "Here's the thing"
used as a standalone hook. State the point. Mid-sentence "honestly"
in casual voice is fine; the tell is the theatrical opener.

If the draft already has one, strip it — same posture as **Unraised
objections**, not only a "don't add" guard in overcorrection.

## Synonym cycling

Rotating near-synonyms for the same referent across consecutive sentences
for elegance: "The feature opens a new entry point. The capability
surfaces bookings. The solution reduces friction." If the clear word is
right, repeat it — "the feature" three times beats a thesaurus tour.
Especially load-bearing in PRD feature descriptions and deck narration,
where cycling "feature / capability / solution / experience" reads as
generated polish rather than precision.

## Portability test

If a sentence could move unchanged to another product, squad, or company
("this unlocks better workflows for the team," "the redesign improves the
overall experience"), it is probably filler. Cut it or replace it with a
fact, mechanism, consequence, or judgment specific to *this* doc's
subject. Complements Fake specificity below: inventing a detail is wrong;
leaving a portable abstraction is also wrong.

## Fake specificity

- A statistic, date, or quote that isn't traceable to a real source cited
  in the doc. If you can't point to where it came from, cut it or mark it
  `[UNVERIFIED]`.
- Invented "typical" scenarios dressed as fact ("most providers spend hours
  on this") with no source.
- Named tools/people used as generic scenery rather than the real ones from
  the actual conversation/research.

## Knowledge-cutoff guesses

Announce that sources are thin, then fill the hole with a plausible
guess written as fact: "Specifics on why providers abandon the invite
step are limited in available sources. They likely drop off because
the copy feels salesy, suggesting they keep a low profile on growth
tools." `research-agent` already forbids invented findings. This is
the sentence shape that sneaks them back in — "not documented,
therefore probably." Cite a dated source, or write "we don't have
this" and stop. Never present a guess as a finding.

Keep a real limit when it is the answer ("founding date is not in the
sources we searched") without the invented because.

## Generic "Challenges" / "Future Outlook" closers

A section — a PRD's "Risks," a brief's "Next," a deck's closing slide —
that ends by gesturing at unnamed future challenges or "what's next"
without naming a real, specific one from this project. If there's a real
open risk or next step, name it with an owner and a rough timeframe; if
there isn't one yet, say "no open risk identified yet" rather than
manufacturing one for the shape of the ending.

## Significance inflation

Marking a routine PRD problem statement, ticket, or docs-page update as
a "pivotal moment," a "watershed," or a "paradigm shift" when it's an
ordinary feature request or status update. Stakeholders read these words
as a request for outsized attention/resourcing — inflating a routine ask
this way either gets ignored (cried wolf) or over-escalated for the wrong
reason. State the actual scope plainly: "this affects the 12% of providers
on the legacy booking flow," not "this is a critical inflection point for
the platform."

## Hedge-stacked predictions

Stacking two or more hedges on the same forward-looking claim: "could
potentially unlock," "may eventually enable," "this might possibly help."
Each hedge cancels the next, and a reader can't tell if you mean "likely"
or "barely plausible." Pick one confidence level and say it once: "this
should reduce support tickets by ~20%, based on [X]" or "this is
speculative — we don't have data yet."

## Unfilled placeholders shipped in a stakeholder-facing doc

`[INSERT STAKEHOLDER]`, `[TBD]`, `2026-XX-XX`, a ticket key placeholder like
`DES-???` left in a doc that actually gets created/shared. A placeholder
is fine mid-draft; shipping one in a created docs page, a filed
ticket, or a PRD marked ready for the kickoff gate is a real defect, not
a style nit — it reads as unfinished work handed off as done. Before
`docs-brief`/`ticket-create`/`research-agent` actually creates
anything, or `design-kickoff` moves a PRD's `Status:` line past `DRAFT`,
grep the draft for bracket-placeholder patterns and resolve or explicitly
flag every one — never let "creating the page fills in the rest" be the
plan.

## Excessive structure

Five+ headers in a 200-word docs page, a ticket description broken
into "Overview:" / "Context:" / "Key Points:" for three sentences of
actual content, a PRD section that exists only because the template has a
slot for it with nothing real to put there. Structure should compress
information the reader needs to scan; it should not exist for its own
sake. If a section would be one sentence, fold it into the section above
rather than giving it its own header. (This is different from a deck's
mandatory scene structure or a PRD's mandatory three questions — those
have a real reason to always exist; this rule is about the *padding*
sections around them.)

## Heading restated below itself

A heading followed by a sentence that only repeats the heading before
the real content starts:

> ## Risks
>
> Risks remain important to consider.
>
> The SMS reminder can fire after the slot is already taken.

Cut the middle sentence. The heading already did the work. Common in
briefs and PRDs padded to look finished. Different from **Excessive
structure** (a section that should not exist); this is a section that
should exist, with an empty first line.

## Overcorrection guardrail

Removing slop has its own failure mode in a stakeholder doc specifically:
bolting on manufactured urgency or invented specifics to sound more
"decisive." None of the following may be **added** while fixing the
patterns above — adding them is a new way of failing this checklist, not
a fix:

- **Manufactured urgency** — "this needs to ship now," "time-sensitive"
  language the actual timeline doesn't support.
- **Invented specifics** — a number, date, name, or metric that wasn't in
  the source research/conversation. A fabricated data point in a PRD is
  worse than an honest "no data yet" — flag the gap instead.
- **Overstated confidence** — turning "we think this might help" into "this
  will solve X" because the plain hedge read as weak. If the evidence is
  genuinely uncertain, say so; that's information the stakeholder needs,
  not a writing flaw to smooth over.
- **Performed candor** — do not add "let's be honest" / "real talk" while
  cleaning. If it is already in the draft, strip it (see the named
  rule above).

The test for every edit: did the information come from the actual
research/conversation/ticket history? Cutting filler and sharpening an
existing claim is always fine. Adding confidence, urgency, or a fact that
wasn't there is a fabrication problem, not a style fix — and in a PRD or
ticket specifically, it's the exact failure `design-kickoff`'s evidence
rule and this harness's no-invented-findings rule already forbid.

---

## Who runs this, and when

| Skill | When |
|---|---|
| `design-kickoff` | Step 2, before the PRD's `Status:` line moves past `DRAFT` |
| `docs-brief` | Step 1, before showing the draft for go/no-go |
| `ticket-create` | Step 1, before showing the draft for go/no-go |
| `research-agent` | Before the draft page is written |
| `case-study` | Step 4, over headings and chapter prose in `case-study.md` before saving (quotes stay verbatim) |
| `deck-builder` | Step 2/2.5, over any narration/copy text on slides (not the data itself) |
| `writing` | Runs this **plus** its own prose-specific rules — see `slop-patterns.md`. Existing-article pass: paste is the source. |
| `review-report` | Headings and ledes |
| `critique-prep` | Spoken script |
| `design-handoff` | Spec overview/why-notes, plus two slivers that stay on that skill only (missing actor, current behavior) |

This checklist never blocks a human from approving/creating a doc that
still has an issue — same posture as every other advisory check in this
harness. It's something the agent runs on its own draft before showing
it, not a gate the designer has to clear.
