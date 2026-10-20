# Voice DNA extraction template

Used by `SKILL.md` Step 1a/1b to turn real writing samples (or interview
answers) into `designer-context.local/writing-voice-dna.md`. Work through
every category below against the actual samples — don't skim for a vibe
and call it done. The whole point is replacing "sound more like me" with
specific, checkable patterns.

**Fluency vs. style — do not conflate these.** If the samples are
dictated, typed fast, or written in a non-first language, they'll carry
fluency artifacts (dropped articles, run-ons from thinking aloud,
non-native grammar patterns) alongside real style signal. Only the
content-level patterns below (openings, opinion-handling, what examples
get reached for, hedging vs. directness) are actual voice. Grammar/
fluency gaps are not style and should never be written into the DNA
profile as if they were — carrying them into a final published piece
would read as *less* human, not more, since it reads as broken rather
than as a deliberate choice.

For each category: name the pattern **and** quote 1-2 short examples
from the real samples that show it. A category with no example from the
samples is a guess, not an extraction — mark it `[unconfirmed]` instead
of inventing one.

## 1. Openings

How do pieces typically start? Pick the real pattern(s), not a category
that sounds plausible:
- Personal anecdote / scene-setting
- Direct claim or thesis, no runway
- A question
- A concrete number or fact
- **Never** — what do samples consistently avoid opening with? (e.g.
  "In today's post I'll cover..." is a common thing real writers avoid —
  confirm whether that's true here too, don't assume it.)

## 2. Closings

- Ends on a question vs. a summary vs. a call to action vs. just... stops
- Does it tie a bow on things, or leave something open?

## 3. Punctuation habits

- Em dash vs. parentheses vs. semicolons for asides — which does the
  writer actually reach for?
- Ellipses, exclamation points — used at all? How often?
- Oxford comma, sentence fragments used deliberately, etc.

## 4. Paragraph and sentence rhythm

- Short punchy paragraphs vs. longer developed ones — or a deliberate mix?
- Sentence length variation — all similar length, or short-long-short
  patterning?
- One-line paragraphs used for emphasis? How often?

## 5. Transitions

How does the writer move from one idea to the next? Direct restatement,
a connecting question, a flat "and" or "but" to start a sentence,
no explicit transition at all (just a new paragraph)?

## 6. How opinions get stated

- Hedged ("I think maybe...") vs. direct ("This doesn't work.")
- Does the writer show their reasoning or just state the conclusion?
- First person singular vs. plural vs. avoided entirely?

## 7. Vocabulary

- Words/phrases that show up repeatedly and feel authentic to this
  writer (not generic — the actual recurring words).
- **Never-use list** — words the writer's real samples conspicuously
  avoid that a generic AI draft would reach for (check this against
  `slop-patterns.md`'s banned vocabulary list — the overlap is usually
  large, which is exactly why that list exists).

## 8. Formatting habits

- Bullets vs. prose by default?
- Bold/italic used for emphasis, or restructured sentences instead?
- Code blocks, blockquotes, or other structural devices the writer
  reaches for?

## 9. Per-mode notes

Which of Step 0's modes (essay / case-study / short-form) does this
sample set actually support? A batch of Slack messages is strong
evidence for short-form voice, weak evidence for a full essay's opening/
closing patterns — say so explicitly rather than stretching thin
evidence across a mode it doesn't cover.

---

## Output shape for `writing-voice-dna.md`

```markdown
# Voice DNA — [name]

Last updated: YYYY-MM-DD · Built from: [N samples / interview, dated]

## Openings
[pattern + example]

## Closings
[pattern + example]

## Punctuation
[pattern + example]

## Paragraph/sentence rhythm
[pattern + example]

## Transitions
[pattern + example]

## Opinions
[pattern + example]

## Vocabulary
**Recurring:** [...]
**Never-use:** [...]

## Formatting
[pattern + example]

## Mode coverage
- Essay: [strong / weak / unconfirmed]
- Case-study: [strong / weak / unconfirmed]
- Short-form: [strong / weak / unconfirmed]
```

## Verification loop (Step 1d in `SKILL.md`)

After the first draft written against this profile, ask "Does this sound
like you?" directly. If no, get specific about what's off and append a
dated correction note under the relevant category above — this file is
meant to sharpen over time, not be written once and treated as final.
