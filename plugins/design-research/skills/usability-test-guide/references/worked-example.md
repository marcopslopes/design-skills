# Worked example — quantitative usability test guide

Illustrative worked example, written for this harness — not a real project transcript.

## Scenario

`design-kickoff` Step 1.5 recommended a quantitative usability test on
the live "book a service" flow to benchmark before/after a checkout
redesign. Fidelity is high (live product), so quant is the right call —
not the mid-fidelity qualitative session.

## Output

```markdown
## Usability test guide — Book-a-service checkout

**Type:** Quantitative
**Session length:** 60 min · **Sample:** 8 per segment (new vs.
returning customer) · **Mode:** Moderated, remote

### Research goals
1. Measure task success and time on task for completing a booking,
   pre- vs. post-redesign
2. Identify where in the flow errors or hesitation cluster

### Introduction (~5 min)
"Hi, thanks for joining. Today we're looking at how people book a
service on [product] — I'll ask you to complete a few tasks and think
out loud as you go. This isn't a test of you, it's a test of the
product, so if something is confusing that's genuinely useful for us.
Any questions before we start?"

### Warm-up (~3 min)
"When was the last time you booked an appointment for a service, on
any app?"

### Tasks
Task 1 — Goal: complete a booking within a price constraint /
Scenario: "You want a paint mix before a weekend trip. Find an advisor
available this Saturday who charges less than $60. Start from the home
screen." / End state: booking confirmation screen / Metrics: task
success, time on task, SEQ

Task 2 — Goal: modify an existing booking / Scenario: "You already
booked an appointment but need to move it to a different day. Reschedule
it to sometime next week." / End state: rescheduled confirmation /
Metrics: task success, time on task, errors, SEQ

### Wrap-up / debrief (~5 min, after all tasks only)
- "Talk me through your overall impression of booking just now."
- "Describe the most confusing part, if any."

### Closing (~2 min)
"Thanks — this was really helpful. You'll get [incentive] within [X]
days. Any questions for me?"

### End-of-session survey
UMUX-Lite: "[Product]'s capabilities meet my requirements" (1–7) /
"[Product] is easy to use" (1–7)

### Researcher reminders
- Define pass/fail/struggle criteria with the team before session 1
- Never help during tasks — redirect "am I doing this right?" to "what
  would you do if I weren't here?"
- Same tasks, same wording, same metrics pre/post redesign — any change
  invalidates the benchmark comparison
```

## Reporting once the sessions run

Stoplight grid: participant columns, task rows, green/orange/red per
cell with time on task, averages in the summary row/column. Tie the
result to a business number in the writeup, the same way the source
material framed ROI: "we cut time-to-book by 40% and reduced task
failures from 3/8 to 0/8, which should reduce checkout abandonment on
the live funnel." Hand that framing to `insight-writer` before this
goes in front of stakeholders.
