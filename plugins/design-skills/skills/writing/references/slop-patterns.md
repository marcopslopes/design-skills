# Anti-slop pass — mechanical checklist

Run every draft against this list before returning it. These are the
patterns that make AI-written prose recognizable as AI-written prose,
independent of whether the content itself is any good. Fix by rewriting,
not by softening — cutting the sentence is usually right.

**This file is prose-specific** (rhythm, structure, paragraph-level tells
that assume free-flowing text). The vocabulary/attribution/fake-specificity
rules below also apply to PRDs, Confluence briefs, tickets, and deck
narration — those live in the shared
[`references/shared/anti-ai-writing.md`](./shared/anti-ai-writing.md)
so `design-kickoff`, `confluence-brief`, `ticket-create`, `research-agent`,
and `deck-builder` can run the same checks without duplicating this list
five times. This file adds prose-only rules on top of that shared base —
run both when writing an article/essay/case-study.

**Why this list, not just "sound like the designer":** the patterns below
hold across writers with genuinely different personal styles — reflective
and personal, instructional and consultant-toned, technical and
step-by-step, academic and essayistic. That's the point: avoiding AI tells
is a separate skill from having a personal voice. A piece can pass every
check here and still not sound like the specific designer who asked for
it — that's what `designer-context.local/writing-voice-dna.md` (§ Voice
check below) is for. Do both passes; they catch different things.

## Banned structures

- **"It's not just X, it's Y"** and its variants ("this isn't about X, it's
  about Y"). Say the Y directly. Also **clipped endings** — "the options
  come from the selected item, no guessing." Finish the clause. Shared
  rule: `anti-ai-writing.md`.
- **Negative listing** — "Not a X. Not a Y. A Z." Sibling of the binary
  contrast: three beats of negation before the real claim. Just say Z.
- **Rule-of-three adjective/noun stacking** ("faster, smarter, and more
  intuitive"; "clarity, confidence, and control"). Pick the one that's
  actually true and say it plainly.
- **Em-dash-chained hedges** — a sentence that uses an em dash to soften
  or qualify a claim instead of just making a clean, direct claim.
- **Question-as-transition** ("So what does this mean for you?", "But
  here's the thing:"). Cut the question, state the point.
- **Rhetorical setups** — "What if I told you…", "Think about it:",
  "Plot twist:", or a self-answered "Question? Answer." pair. Drop the
  setup and make the point.
- **Faux-insight setups** — "What nobody tells you," "Here's what most
  people get wrong," "The part everyone misses." These flatter the writer
  as the lone expert. Cut the setup; let the claim stand alone.
- **Colon reveals** — a noun phrase, a colon, then a lowercase dramatic
  reveal: "The best part: it learns." "The detail that makes it work: a
  separate agent grades it." Rewrite as a plain sentence. Keep colons for
  lists, labels, and quotes — not fake drama.
- **Synonym cycling** — rotating near-synonyms for the same referent
  across sentences for elegance ("The agent reviews the draft. The
  assistant scores it. The tool suggests fixes."). If the clear word is
  right, repeat it.
- **Repeated sentence openings** — "She noted the door. She noted the
  lock. She filed both away." Repeat the *noun* (that's the synonym-
  cycling fix). Do not repeat the same subject-verb opening three times
  in a row unless the repetition is a deliberate beat ("She came. She
  saw. She conquered."). Merge, change the subject, or start with the
  action. Prose-only — PRDs and tickets may stack parallel lines on
  purpose. Not in the shared file.
- **Formulaic dramatic fragments** — stacked template beats like
  "That's it. That's the whole thing." or "X. And Y. And Z." used as a
  mic-drop shape. Punchy fragments are still fine (see Human patterns
  below); ban the *formula*, not fragments themselves.
- **Tricolon closers** — ending a section on a rhythmic three-beat
  sentence for effect rather than because it's the clearest way to say
  the thing.
- **Copula avoidance** — replacing a plain "is/are" with an elaborate verb
  to sound more important: "serves as a hub" → *is a hub*; "marks the
  beginning of" → *began*; "boasts features" → *has features*. Use the
  plain verb.
- **Generic "Challenges" / "Future Outlook" closers** — a section that
  ends by gesturing at unnamed future challenges or "what's next" without
  naming a real, specific one from this project. If there's a real open
  risk or next step, name it; if there isn't, don't manufacture one for
  the shape of the ending.
- **Vague attributions** — "designers often find...", "teams typically
  struggle with...", "it's widely understood that..." with no named
  source. Either cite the real source (a person, a doc, a dated finding)
  or drop the claim — this is the same rule as § Fake specificity below,
  applied to attributed-but-unsourced claims specifically.
- **Reader-instruction padding** — "As you can see," "The key point is,"
  "In other words" used only to restate or flag emphasis the prose
  already carries. Delete the aside; don't ban short punch lines that
  *are* the point ("That difference matters.").
- **Announce-then-state** — "Let's dive in," "here's what you need to
  know," "one thing that bit me," "heads up." Delete the announcement;
  start with the content. Shared rule: `anti-ai-writing.md`.
- **Formulaic sayings** — "X is the Y of Z," "the language of trust,"
  "efficiency becomes a trap." Replace with the specific claim. Shared
  rule: `anti-ai-writing.md`.
- **Chatbot leftover** — "I hope this helps," "let me know if you'd
  like me to expand," "great question!" A piece is not a chat turn.
  Shared rule: `anti-ai-writing.md`.
- **Shallow -ing clauses** — a true sentence plus a trailing
  `highlighting` / `reflecting` / `showcasing` / `ensuring` phrase that
  adds no new information. Cut the clause; if the extra claim is real,
  make it its own sourced sentence. Shared rule:
  `anti-ai-writing.md`.
- **False from-X-to-Y ranges** — "from onboarding to payroll, from SMS
  to the conceptual model" when those are a list, not a scale. Write
  the list. Shared rule: `anti-ai-writing.md`.
- **Unraised objections** — defending a point nobody in the source
  asked ("this isn't mainly about X, and I'm not arguing Y"). Keep the
  real claim; cut the unsolicited defense. Shared rule:
  `anti-ai-writing.md`.
- **Unused rejected alternative** — "a tempting approach would be…"
  that never returns and is not in `decisions.md`. Cut it. Keep real
  options from debate / decision-framework. Shared rule:
  `anti-ai-writing.md`.

## Banned vocabulary (empty superlatives / hype words)

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

If one of these words is the only way to convey something specific and
true, replace it with the specific true thing instead ("this cut a
week-long process to two days" beats "this was a game-changer").

**Banned filler phrases:** "it's important to note that" · "let's delve
into" · "let's dive in" · "let's explore" · "here's what you need to
know" · "without further ado" · "in conclusion" · "it's worth
mentioning" · "moving forward" · "at the end of the day" · "that being
said" · "however, it should be noted" — just state the point.

## Human patterns to actively use (not just avoid the negative)

These are the flip side of the banned list — a draft that avoids every
banned pattern above can still read flat if it doesn't also *do* these:

- **Start with the point.** First sentence is the insight, not a runway
  to it. If the first sentence could be cut with no loss, cut it.
- **Portability test.** If a sentence could move unchanged to another
  person, company, product, or project, it is probably filler — cut it
  or replace it with a fact, example, mechanism, consequence, or judgment
  specific to *this* subject.
- **Use fragments for punch.** A complete sentence can be three words.
  "That difference matters." "Plausible is not enough." Don't expand
  every fragment into a full clause out of habit. (Different from the
  formulaic dramatic-fragment ban above — earned punch stays; template
  mic-drops go.)
- **Show the thinking, not just the conclusion.** "The more we looked at
  it, the more the numbers didn't add up" beats "analysis revealed a
  discrepancy" — show the path, not just the destination.
- **Take a stance.** If the piece has a recommendation or a lesson, say
  it plainly ("this should not ship as-is") instead of listing pros and
  cons and calling it balanced.
- **Concrete before abstract.** Give the actual example first, then name
  the principle it illustrates — never the reverse.
- **Vary sentence length on purpose.** A short sentence next to a long
  one reads as considered; uniform medium-length sentences read as
  generated.
- **Admit what didn't work.** If two options were tried and one failed,
  say so — "the first version tested badly; here's why" is more credible
  than only narrating the version that shipped.
- **Name the contradiction instead of smoothing it over.** "This felt
  backwards at first, but it was right" beats papering over an
  inconsistency with "while there are trade-offs..."

## Fake specificity

- A statistic, date, or quote that isn't traceable to a real source cited
  in the piece. If you can't point to where it came from, cut it or mark
  it `[UNVERIFIED]`.
- Invented "typical" scenarios dressed as fact ("most designers spend
  hours on this") without a source.
- Named tools/companies/people used as generic scenery rather than the
  actual real ones from the source material.
- **Knowledge-cutoff guesses** — "details are limited in available
  sources" followed by "they likely…" written as fact. Cite a dated
  source or say we don't have it. Shared rule: `anti-ai-writing.md`.

## Structural tells

- **Uniform paragraph length** — every paragraph 3-4 sentences, no
  variation. Real writing has some one-liners and some longer ones.
- **Every section ends on an inspirational note.** Not every section
  needs a bow tied on it — some can just end.
- **Listicle creep in prose** — converting what should be a real
  paragraph into a bulleted list for no reason other than it's easier to
  generate. Bullets are fine when the content is genuinely a list
  (steps, options); not as a default structure for everything.
- **Throat-clearing openers** ("In the world of design, X has always
  been important...") — start with the actual point or the actual
  scene, not a runway to it.
- **Heading restated below itself** — a heading followed by a sentence
  that only repeats the heading. Cut the empty first line. Shared
  rule: `anti-ai-writing.md`.

## Fix priority (when short on time)

Not every entry above is equally damaging. Triage in this order rather than
doing a shallow pass across everything:

1. **Credibility killers** — vague attributions, inflated significance on a
   routine event, chatbot leftover ("I hope this helps!"). These
   make a reader stop trusting the piece outright.
2. **Obvious tells** — banned vocabulary, template phrases, formulaic
   openings, em-dash/bold overuse. The things a reader would point at even
   without knowing the rule.
3. **Polish** — uniform paragraph length, transition-phrase cleanup,
   rule-of-three stacking. Worth doing, but don't spend the only pass here
   before 1 and 2 are clean.

## Don't overcorrect into a different tell

Removing slop has its own failure mode: bolting on a "human" costume
instead of writing like the actual designer. None of the following may be
**added** during a rewrite if the draft didn't already have it — adding
them is a new way of failing this skill, not a fix:

- **Fake first person** — inserting "I've seen this a hundred times" or "in
  my experience" into a draft that had no author voice to begin with.
- **Manufactured stakes** — "in a world where...", "now more than ever" —
  urgency the piece hasn't earned.
- **Invented contrarianism** — "everyone assumes X, but they're wrong" when
  nobody actually argued X. Inventing a foil is inventing a claim. If
  the draft already has that foil, strip it — same as the shared
  **Unraised objections** rule, not only a "don't add" guard.
- **Performed candor** — "let's be honest," "real talk," "Honestly?" as
  a standalone hook — announcing directness instead of just being
  direct. If the draft already has one, strip it (shared
  **Performed candor** rule), not only avoid adding it.
- **Staccato for its own sake** — chopping normal sentences into fragments
  to fake rhythm, rather than varying length because the content calls for
  it.
- **Invented specifics** — a number, name, date, or example that wasn't in
  the source. A fabricated detail is worse than the vague sentence it
  replaced — flag the gap in the draft instead of inventing something to
  fill it.

The test for every edit: did the information come from the source?
Cutting filler and sharpening an existing claim is always fine. Adding
stance, personality, or fact that wasn't there is a fabrication problem,
not a style fix.

## Voice check

- Re-read the draft against `designer-context.local/writing-voice-dna.md`
  (if one exists) — check it category by category (openings, closings,
  punctuation, paragraph rhythm, transitions, opinion-handling,
  vocabulary), not just an overall vibe read. See
  `references/voice-dna-template.md` for what each category means.
- Specifically check the DNA profile's **never-use list** against this
  file's own banned vocabulary above — if a banned-vocabulary word
  slipped in and it's also on the writer's own never-use list, that's a
  double miss, fix it first.
- If the draft reads noticeably more formal, more hedge-y, or more
  "corporate blog" than the profile describes, that's a sign the default
  register leaked through — rewrite the offending passage, don't just
  soften individual words.
