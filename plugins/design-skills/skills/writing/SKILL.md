---
name: writing
description: "Long-form prose writing assistant — articles, essays, case-study writeups, LinkedIn/blog posts, \"how I work\" pieces. Triggers on: \"write an article\", \"write a blog post\", \"turn this into an essay\", \"write up how we got here\" (prose, not slides), \"draft a LinkedIn post\", \"write a case-study writeup\", \"run anti-slop on this\", \"use the writing skill on this article\", \"how will this read after the anti-ai pass\". Every claim must trace to a real dated source in `projects/<slug>/` (findings.md / log.md / decisions.md) or the team's docs, tracker, and chat — or, on an existing-article pass, to the pasted text only. Never invented evidence. Runs an anti-slop pass (`references/slop-patterns.md` + `references/shared/anti-ai-writing.md`) before returning output, and always labels output DRAFT pending a human edit pass. Does NOT do UI/product copy (see `content`) or slide decks (see `deck-builder`). If the ask is actually \"turn this into a deck/presentation,\" redirect to `deck-builder`."
---

# Writing

> **Design Skills package.** This skill comes from the Design Harness and works on its own. If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).

Long-form prose is a different job from UI copy (`content`) or slide
decks (`deck-builder`). This skill exists because neither of those covers
it, and freestyle prose from a model defaults to a generic, hedge-heavy,
superlative-stacked register — "AI slop" — unless something actively
checks for it every time.

**Scope boundary:** if the ask is genuinely "build me a presentation /
deck / slides," that's `deck-builder`, not this skill, even if the content
is case-study shaped. This skill is for standalone prose: articles,
essays, blog/LinkedIn posts, written case-study narratives, retrospective
writeups. An HTML report of a critique (findings, not a ship story) is
`review-report`.

## Step 0 — Scope the piece (skip only what's already answered)

**Existing-article pass:** skip this step (and Step 2.5). The paste
is the piece.

Ask, batched in one `AskQuestion` if more than one is unanswered:

1. **Format/mode** — see the three modes below. Infer from phrasing where
   possible ("case study" / "how we got here" → case-study mode; "my
   take on X" / "how I think about X" → essay mode) and confirm in one
   line rather than asking outright when the phrasing is unambiguous.
2. **Anchor project(s)** — which `projects/<slug>/` is the evidence coming
   from? (Primary case + any supporting mentions.)
3. **Audience / publish target** — internal (can reference real tickets,
   tools, names) vs external (genericize company-sensitive specifics,
   keep real metrics only if not confidential) vs personal notes.
4. **Length/format** — full article, short post, LinkedIn-length.

Never re-ask something already stated in the conversation or answered in
a matched `projects/<slug>/brief.md`.

### Step 0a — Name the actual reader, not just the audience category

"External" or "internal" (Step 0.3) tells you what to redact — it
doesn't tell you how to write. Before drafting, be specific about who
is actually going to read this, in one or two sentences:

- **Who, concretely** — a design peer scrolling LinkedIn? A hiring
  manager? Someone on your own team who lived through the project?
  These need different openings and different levels of explained
  context, even at the same length.
- **What they already believe going in** — do they need convincing that
  AI-assisted design is legitimate at all, or are they already past that
  and want the specific mechanics?
- **What makes them stop reading** — jargon they don't have context for,
  a slow opening, a claim that sounds inflated on first read. Naming this
  up front is what the anti-slop pass (Step 3) actually checks against —
  it's not an abstract "avoid AI slop" rule, it's "avoid the specific
  thing that makes *this* reader bail."

Skip this as a separate question if the designer already answered it
implicitly (e.g. "write this for other product designers who are
skeptical of AI tools" already names reader + belief + skepticism in one
line) — don't turn one clear sentence into three redundant questions.

### The three modes (shared machinery, different shape)

Modes share every rule in this file (evidence-only, voice anchor,
anti-slop pass, DRAFT labeling). They differ only in narrative structure:

1. **Essay / opinion piece** — thesis-first, personal voice, argues a
   point. Loose structure: claim → evidence → what changed → caveat.
   (Example: "how AI changed my design process.")
2. **Case-study writeup** — a fixed arc, not free-form: **problem →
   evidence → options considered → decision → outcome → what's next.**
   The story comes from `projects/<slug>/case-study.md`, written by
   `case-study` (chapters defined in
   `references/from-case-study/chapters.md`). This mode renders
   that file as prose, so a written case study and a slide-deck case study
   about the same project tell the same story. No `case-study.md` yet →
   §3 PLAN: `case-study` first, then this mode. If the designer actually
   wants slides, redirect to `deck-builder` instead of writing this in
   prose.
3. **Short-form / social** (LinkedIn-length) — hook-first, no arc, one
   idea, tight. No chapter structure at all — closer to a strong opening
   paragraph of mode 1 than a full piece.
4. **Existing-article pass** — they paste a full piece and ask to run
   the anti-slop / anti-AI checklist on it ("use the writing skill on
   this", "how will this read after the pass"). Do **not** re-scope
   format, audience, or Step 2.5. The paste is the source. Show a
   short flagged-tells table, then a DRAFT rewrite. Keep deliberate
   beats, named proof, and real lists. Do not invent facts or a new
   argument. Skip voice-DNA unless they asked to sound like them.

## Step 1 — Voice anchor (check before writing, don't skip silently)

**First, name the actual target — these are two different jobs:**

- **"Sound like a fluent human wrote this"** (the default, and the one
  that actually matters for the anti-slop goal) — natural, idiomatic,
  professional register that doesn't read as AI-generated. This is
  independent of the designer's own personal writing quirks.
- **"Sound like me specifically"** — replicate this designer's own
  structural patterns (Step 1a/1b below). Only pursue this when the
  designer has explicitly asked for it, and even then, see the caveat
  below before pulling from spoken/dictated samples.

Default to the first unless told otherwise. Don't assume "make it not
sound like AI" automatically means "make it sound exactly like my own
unedited writing/speech" — those are different requests, and for a
non-native English speaker especially, literally reproducing dictated or
typed-fast English (dropped articles, run-ons from thinking aloud,
grammar slips) does not make a piece read more human — it makes it read
less fluent. **Never mistake a language-fluency artifact for personal
style.** The signal worth keeping from real samples/interviews is
content-level: which opinions this person actually holds, which examples
they reach for, how direct or hedged their reasoning is, what they find
worth saying at all. The signal *not* worth keeping: grammar and fluency
gaps that come from speed or from writing in a non-first language, not
from voice.

"Sound more like me" (when that is genuinely the goal) still doesn't
work as a direct instruction — it's too vague to act on. What works is
extracting **structural** patterns from real samples (how you open, how
you close, punctuation habits, paragraph rhythm, transitions, opinions) —
filtered through the fluency caveat above — rather than a vibe
description like "casual but professional."

Check `designer-context.local/writing-voice-dna.md`.

- **Exists** → read it in full, apply every pattern in it (content-level
  patterns only, per the fluency caveat), not just the vocabulary
  section. Never overwrite silently — extend it when new samples come in
  (see Step 1c).
- **Missing, and the designer wants personal-voice matching** → run Step
  1a or 1b once, then write the file.
- **Missing, and the default (fluent-human, not personal-voice) applies**
  → skip straight to writing with the default voice below — don't run an
  interview/sample-gathering step for a target that isn't being pursued.

### Step 1a — Have real samples? Extract the DNA

Ask for 3-10 pieces of your actual writing (Slack messages, docs, past
posts/articles — mixed formats are fine and better than one). Analyze
them against `references/voice-dna-template.md`'s categories — don't
just skim for tone, actually work through each category (openings,
closings, punctuation, paragraph rhythm, transitions, how opinions get
stated, banned/never-used words). Write the result to
`designer-context.local/writing-voice-dna.md` (gitignored, personal —
never committed).

### Step 1b — No samples yet? Interview instead

Ask 4-5 real questions about how you think through the topic at hand —
not generic "tell me about your writing style" but actual substance
questions ("what's the thing about this project most people get wrong?",
"what would you tell a friend about this in one breath?"). Have the
answers typed in your own words, not polished — the point is capturing
how you naturally phrase things when not trying to "write," which is
closer to your real voice than a self-conscious writing sample would be.
Extract the DNA from those answers the same way as 1a.

### Step 1c — Per-mode variants

Voice differs by mode (Step 0's essay / case-study / short-form) the
same way it differs by format for any writer — don't force one
extraction to cover all three if the samples were clearly one mode
(e.g. all Slack messages → good for short-form, weak signal for a full
essay). Note in `writing-voice-dna.md` which mode(s) each sample set
actually supports; ask for more samples for a mode with no real coverage
rather than guessing.

### Step 1d — Verify, don't assume

After the first full draft, ask directly: **"Does this sound like you?"**
Treat it as a real checkpoint, not a rhetorical close — if the answer is
no, ask what specifically feels off (word choice? sentence length? too
hedged? too blunt?) and fold that back into `writing-voice-dna.md` so the
next piece doesn't repeat the same miss.

**Default voice** (only if the designer explicitly skips both 1a and 1b):
plain sentences, concrete nouns over abstractions, real numbers over
vague adjectives, first person singular, short paragraphs. No corporate
register, no motivational-poster register. This default is a fallback,
not a substitute for real extraction — flag it as such in the output's
"Still needs" line (Step 4).

## Step 2 — Evidence gathering (grounding, not invention)

Before writing a single sentence of the piece itself:

1. Read the anchor project(s)' `brief.md`, `findings.md`, `log.md`,
   `decisions.md` in full.
2. Pull only claims that trace to something real and dated in those
   files (or a linked ticket, docs page, or chat source already cited there).
   Every stat, quote, or timeline claim in the draft must be traceable
   back to one of these — if you can't point to the line it came from,
   cut the claim or mark it `[UNVERIFIED — confirm before publishing]`.
3. Never invent a metric, a quote, a date, or a "typical" outcome to make
   a point land better. If the real evidence is thinner than the
   narrative wants, say so in the piece rather than padding it.
4. For **external** audience pieces: strip internal ticket keys, Slack
   permalinks, and named colleagues (role-only references are fine)
   unless the designer explicitly says to keep them.

## Step 2.5 — Propose structure, wait for go (essay / case-study only)

Before drafting a full essay or case-study (skip for short-form/social —
one idea doesn't need this scaffolding), propose the shape and wait for
explicit approval:

```
Title options: [2-3]
Abstract: [2-3 sentences — what this piece argues or shows]
Outline: [section list, one line each]
```

Do not write the full piece until the designer approves or edits this.
This exists because an unclear brief is exactly when a model defaults to
generic content — forcing a structure decision before prose catches a
vague or unfocused ask at the cheapest possible point, before a full draft
is sunk cost. If something is genuinely unclear at this stage, ask instead
of filling the gap with a plausible-sounding guess.

## Step 3 — Draft, then run the anti-slop pass

**Write the opening on its own first, as a separate mini-pass before the
rest of the piece.** The opening carries more weight than any other
paragraph — it's where a reader decides whether to keep going, and where
generic AI phrasing is most obvious (throat-clearing, "in today's world,"
a runway before the actual point). Check it specifically against Step 0a
(does it work for the *named* reader?) and the "Openings" category in
`writing-voice-dna.md`/`references/voice-dna-template.md` before moving
on to the rest of the draft. If the opening doesn't survive that check,
fix it before writing forward from it — a strong body built on a weak
opening still reads as a weak piece.

Then write the rest of the draft. Before returning it, check the whole
thing against every rule in `references/slop-patterns.md` **and** the
shared `references/shared/anti-ai-writing.md` (vocabulary, attributions,
fake specificity, significance inflation, hedge-stacked predictions,
shallow -ing clauses, false from-X-to-Y ranges, knowledge-cutoff
guesses, heading restated below itself, unraised objections,
announce-then-state, clipped endings, chatbot leftover, formulaic
sayings, performed candor, unused rejected alternative, overcorrection
guardrail) — this is a mechanical pass, not optional judgment.
Rewrite anything that matches a banned pattern.

## Step 4 — Output format

Always return the piece labeled as a draft, never as finished:

```
# [Title]

*Draft — needs your edit pass before publishing.*

[piece body]

---
**Sources used:** [list the projects/<slug>/ files and any external
links the claims traced to]
**Anti-slop pass:** run against references/slop-patterns.md
**Still needs:** [anything marked UNVERIFIED, or a section the designer
should rewrite in their own voice]
```

Never present this skill's output as publish-ready. The mandatory human
edit pass is the point — a skill can enforce grounding and strip
mechanical slop, but it cannot make the piece actually sound like the
designer without them touching at least one section themselves.

## Step 5 — Log

If the piece is anchored to a `projects/<slug>/`, append one line to that
task's `log.md` and to `harness/logs/routing-log.md` (`MATCHED writing`),
naming the file written. Save the piece itself under that project's
`artifacts/` folder unless the designer names a different destination.

## What this is NOT doing

- Not a substitute for `content` (product UI copy — buttons, banners,
  toasts, error states).
- Not a substitute for `deck-builder` (slide decks — even case-study
  shaped ones). Redirect there if the actual ask is a presentation.
- Not a publisher or a final editor. Every draft ships labeled as a draft.
- Not a source of new analysis — like `deck-builder`, it composes and
  narrates what other skills/research already found; it doesn't invent
  findings to make the story better.
