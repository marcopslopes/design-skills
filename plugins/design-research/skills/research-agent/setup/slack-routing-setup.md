# Slack routing setup — Project briefing agent

---

## Step 1: Connect Slack to Cursor

> ⚠️ **Requires Cursor account admin access.** The steps below include billing configuration. If you cannot access billing settings, ask your Cursor admin to complete Step 1 for you.

1. Go to [cursor.com/dashboard?tab=integrations](https://cursor.com/dashboard?tab=integrations)
2. Click "Connect" next to Slack
3. Install the Cursor Slack app in the company workspace
4. Complete Cloud Agent setup:
   - Connect a repo provider (GitHub)
   - Enable usage-based pricing
   - Confirm privacy settings

---

## Step 2: Set default repo in target channels

In each channel where designers will use the agent:

```
@Cursor settings
```

Select "Default repository" → choose the repo containing `.cursor/agents.md`.

### Channels to configure
- `#product-design`
- `#px_engagement` (or the full channel name)

---

## Step 3: Add routing rules

Still in `@Cursor settings` → "Routing rules":

| Keyword | Repository |
|---------|-----------|
| `checkout` | `github.com/marcopslopes/design-harness` (or your fork) |
| `payments` | same |
| `onboarding` | same |
| `design research` | same |

---

## How to trigger the project briefing agent

In any configured channel, use **plain language** (no special syntax required):

```
@Cursor tell me everything about [topic]
@Cursor what's the status of [topic]
@Cursor catch me up on [topic]
@Cursor research [topic] for a new project
```

### Optional parameters you can add to the message

| Parameter | Example | Effect |
|-----------|---------|--------|
| `last N days` | `last 7 days` | Limits Slack search window |
| `save under [page name]` | `save under "Checkout Kickoff Jun 2026"` | Sets Confluence page title |
| `space [KEY]` | `space DT1` | Overrides default (**personal space** per `.cursor/agents.md`) |
| `parent [page ID]` | `parent 4643487752` | Sets Confluence parent page (use with `space …` for team filing) |

---

## Example prompts

```
@Cursor brief me on checkout flow before I start designs
@Cursor catch me up on onboarding — space DT1, parent 4643487752
@Cursor what do we know about provider payments?
@Cursor tell me everything about checkout, last 30 days
```
