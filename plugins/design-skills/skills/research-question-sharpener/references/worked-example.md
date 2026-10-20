# Worked example — question sharpening pass

Illustrative worked example, written for this harness — not a real project transcript.

## Scenario

A PM drops a list of questions for an upcoming interview round about a
new loyalty-points feature, unedited:

1. "Do you like the idea of loyalty points?"
2. "Would you use a rewards program if we built one?"
3. "How satisfied are you with our current booking experience?"
4. "What's your favorite part of using the app?"
5. "How much would you pay for premium rewards?"

## Output

```markdown
## Question sharpening — Loyalty points interview round

| Original | Type | Answerable? | Rewritten (TEDW) | Method | Priority | Notes |
|---|---|---|---|---|---|---|
| "Do you like the idea of loyalty points?" | Shallow | Yes | "Describe the last time you felt rewarded for being a repeat customer somewhere — what did that look like?" | Interview | High | Story-based, no yes/no trap |
| "Would you use a rewards program if we built one?" | Future-based | Partially | "Tell me about a rewards program you've actually used. Walk me through what made you keep using it or stop." | Interview | High | Past behavior over predicted intent |
| "How satisfied are you with our current booking experience?" | Leading | Yes | "Walk me through the last time booking felt frustrating or slower than you expected." | Interview | Medium | Flips to pain, avoids satisfaction-scale framing |
| "What's your favorite part of using the app?" | Positive-only | Yes | "Describe the most annoying part of using the app right now." | Interview | Low | Innovation comes from friction, not favorites |
| "How much would you pay for premium rewards?" | Not qual | No | — | Van Westendorp / pricing study | — | Redirect — small qualitative sample can't answer willingness-to-pay |

**Redirects (can't be answered as qual questions):**
- "How much would you pay for premium rewards?" → Van Westendorp price
  sensitivity study or conjoint analysis, run separately

**Session scope recommendation:** 60-minute interview, 3 High/Medium
questions with TEDW follow-up probes; the Low-priority favorite-part
question goes to the cross-project question backlog rather than
consuming session time.
```

## What changed once this ran

The PM's original list would have produced five polite, low-signal
answers. The sharpened version produced two concrete stories about past
loyalty-program use in the actual interviews, which fed directly into
`research-synthesis` afterward.
