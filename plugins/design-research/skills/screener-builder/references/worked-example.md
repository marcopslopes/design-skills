# Worked example — recruitment screener

Illustrative worked example, written for this harness — not a real project transcript.

## Scenario

A team needs 8 participants for a usability test on a new "book a
recurring appointment" feature. The stakeholder's first instinct was to
recruit "women 25-45 who use the app" — pure demographics, no behavior.

## Output

```markdown
SCREENER SURVEY: Recurring appointment booking UT
Target: has booked the same type of service at least twice in the last
3 months, currently doing it manually each time (not aware of any
recurring/auto-book option)
Length: 7 questions (~3 min)
Knockout logic: Q1 (no relevant booking in 3 months), Q4 (works in UX
research or for a competitor)

PARTICIPANT CRITERIA
1. Has booked the same category of service (e.g. paint mix, cleaning,
   fitness class) at least twice in the past 3 months
2. Has NOT used a "repeat/recurring booking" feature on this or a
   competitor's app before
3. Books primarily via mobile app, not phone/walk-in

QUESTIONS
Q1. In the last 3 months, how many times have you booked the same type
of service again with the same provider?
☐ 0 times ✗ (knockout)  ☐ 1 time — maybe (flag)  ☐ 2-3 times ✓  ☐ 4+ times ✓

Q2. Thinking about the last time you rebooked, how did you do it?
☐ Searched and booked again from scratch ✓  ☐ Used a "book again" or
"repeat" button ✗ (knockout — already familiar with the pattern)
☐ Called or messaged the provider directly — maybe (flag, different
booking channel)

Q3. On a typical week, how do you usually book appointments?
☐ Mobile app ✓  ☐ Website on desktop — maybe (flag)  ☐ Phone call or
in person ✗ (knockout)

Q4. Do you currently work in user research, product design, or for a
scheduling/booking app company?
☐ No ✓  ☐ Yes ✗ (knockout)

OPEN-ENDED
Q5. Walk me through what it's like the last time you had to rebook the
same appointment. What did you do, step by step? (long text — assesses
articulation and confirms real behavior, not a guess)

DEMOGRAPHICS (only if required)
None required — geography/age not relevant to this study design.

KNOCKOUT LOGIC SUMMARY
- Q1: no qualifying booking in 3 months → out
- Q2: already uses a repeat-booking pattern → out (they're not the
  target for a UT on a feature they haven't experienced friction
  without)
- Q3: doesn't book via the app → out
- Q4: research/industry conflict of interest → out
```

## What changed once this ran

The original "women 25-45" brief would have recruited people with no
guarantee they'd ever rebooked anything, let alone hit friction with
manual rebooking — the actual thing under test. The behavior-first
screener produced 8 participants who could speak concretely to the real
workaround the feature is meant to replace.
