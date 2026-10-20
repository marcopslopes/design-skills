# Test prompts — Project briefing agent

Run these in order to verify the workflow before production use.  
All tests run in `#product-design` or a dedicated test channel.

The agent spec lives in **`SKILL.md`** (with
**`references/agents.md`** for full detail). Confluence drafts follow
**`references/confluence-template.md`**. For **large**
kickoff bodies when MCP updates fail, see
**`docs/setup/confluence-large-bodies.md`** and **`npm run confluence:put-draft-body`**.

---

## Test 0 — MCP connectivity smoke test (run this first)

**Prompt:**

```
Search Confluence for "test" and list the first 3 results you find.
Do not create any pages.
```

**Expected:**

- Agent lists 3 Confluence page titles with links
- No errors about authentication or missing tools
- If you see "I don't have access to Confluence" or similar, stop here and complete MCP setup before proceeding

---

## Test 0b — Miro MCP (optional)

**Prerequisites:** [Miro MCP for Cursor](https://miro.com/marketplace/miro-mcp-for-cursor/) installed and OAuth completed.

**Prompt:**

```
Using Miro MCP only: summarise the board at [paste a miro.com board URL you can access] in 5 bullets. Do not create Confluence pages.
```

**Expected:**

- Five bullets grounded in board content, or a clear auth / team-selection error
- If the agent says Miro tools are unavailable, complete Miro MCP setup (see `docs/setup/cursor-mcp-setup.md` §4) before expecting Miro in full briefings

---

## Test 1 — Retrieval only (no Confluence draft)

**Prompt:**

```
@Cursor search Confluence and Jira for anything related to checkout.
Do not create a Confluence page yet. Just list what you find.
```

**Expected:**

- Agent lists pages + issues with titles and links
- No Confluence page created
- Agent explicitly states it is not publishing / not creating a draft

---

## Test 2 — Full briefing, sparse topic (should find little)

**Prompt:**

```
@Cursor tell me everything about placeholder-topic-xyz for a new project.
Use my Confluence personal space (default placement per agents.md).
```

**Expected:**

- Agent reports thin or empty results per source where applicable
- Creates a **minimal** Confluence **draft** using the briefing template (still
  includes confidence rating — likely **Low** — and honest "no documented
  research" style language where appropriate)
- Slack TL;DR reflects sparsity
- Page status is **DRAFT**
- Title pattern like `Design discovery kickoff (draft): placeholder-topic-xyz — [date]` (or `Briefing: …` if the prompt asked for a briefing only)

---

## Test 3 — Full briefing, real topic

**Prompt:**

```
@Cursor catch me up on checkout.
Use my Confluence personal space (default placement per agents.md).
Title: Test briefing run — checkout — 2026-06-19
```

**Expected:**

- Confluence **draft** includes: executive summary **with confidence**, current
  state, research done (or explicit "none found"), relevant links grouped by
  source; **Google Docs/Sheets** linked from cited Confluence/Jira pages are
  summarised when the agent can **open them in the IDE browser** (snapshot) or
  via optional Google MCP / public `fetch`; otherwise listed as blocked (e.g.
  sign-in required)
- Slack reply: short summary + confidence + draft link + key verify links
- Page is **DRAFT** (not published)
- Claims cite sources; conflicts/staleness called out if present

---

## Test 4 — Ambiguous topic (agent should ask clarifying question)

**Prompt:**

```
@Cursor brief me on cards for a new project
```

**Expected:**

- Agent asks one clarifying question — e.g. card reader hardware vs gift cards vs
  card payments
- Agent does **not** start live Confluence/Jira/Slack retrieval until you
  answer (or it reasonably disambiguates)
- "cards" is intentionally ambiguous

---

## Test 5 — Default placement (personal space) when none specified

**Prompt:**

```
@Cursor what's the status of onboarding
```

*(No Confluence URL, space, or parent provided.)*

**Expected:**

- Agent **creates the full briefing draft** in the **authenticated user’s
  personal Confluence space** (resolve with `getConfluenceSpaces` →
  `type: "personal"` per `.cursor/agents.md`), **without** a parent page unless
  the user asked for one
- The page **note** states filing in personal space (space key like `~…`) and
  that the owner may **move** the page under a team parent if needed
- Slack/chat includes the **draft URL**

**Alternate — explicit team parent:**

**Prompt:**

```
@Cursor brief me on referrals — file the draft under parent 4643487752 in space DT1
```

**Expected:** Agent uses **DT1** + that parent (after resolving **spaceId**).

**Alternate — user forbids automatic placement:**

**Prompt:**

```
@Cursor brief me on referrals — do NOT pick a Confluence destination for me; I'll give you the space next
```

**Expected:** Agent asks for personal overview URL or team **space + optional
parent** and **does not** create the page until you reply.

---

## Test 6 — Optional competitor benchmark (off by default)

**Prompt:**

```
@Cursor tell me everything about checkout — no competitor stuff
```

**Expected:**

- No competitor / external web benchmark section (and no fabricated competitor
  claims)

**Counter-prompt (when you want to test opt-in):**

```
@Cursor benchmark checkout against Airbnb and Uber, then brief me.
Use my Confluence personal space (default placement per agents.md).
```

**Expected:**

- Competitor section (7b) present, clearly labeled external / unverified
- Still produces draft + chat summary

---

## Pass criteria

All core tests pass when:

- [ ] Test 0: 3 Confluence results listed, no auth errors
- [ ] Test 0b (optional): Miro board summary works when Miro MCP is installed
- [ ] Test 1: Results listed, no page created
- [ ] Test 2: Sparse results acknowledged, draft created with appropriate
      confidence
- [ ] Test 3: Full briefing draft + Slack TL;DR with links
- [ ] Test 4: Clarifying question before retrieval
- [ ] Test 5: Default = personal space; explicit team parent honoured when asked; agent asks when user forbids auto placement
