# Cursor agent routing rules

Configure these in Slack via `@Cursor settings` → Routing rules.
Each keyword maps to a default repository so the Cloud Agent loads
**`.cursor/agents.md`** (project briefing agent).

| Keyword | Maps to | Notes |
|---------|---------|-------|
| `checkout` | `github.com/marcopslopes/design-harness` | briefing with checkout context |
| `payments` | same | include payments taxonomy when user pastes it |
| `onboarding` | same | onboarding-focused briefings |
| `search` | same | discovery / search product context |

Replace **same** with your fork URL if not using the canonical `design-harness` repo.

## Channel defaults (set via @Cursor settings in each channel)

| Channel | Default repo | Notes |
|---------|-------------|-------|
| #product-design | `design-harness` | design team's main briefing channel |
| #px_engageme* | `design-harness` | provider experience |

## How to set a routing rule

1. In the target Slack channel, type: `@Cursor settings`
2. Select "Routing rules"
3. Add keyword → repository mapping
4. Confirm
