# Ticket-create defaults (the company)

Stable IDs from live creates (2026-08-04). Re-check with
`getJiraIssue` on a known good ticket if create fails.

## Cloud

- Site: `https://your-org.atlassian.net`
- `cloudId`: resolve via `getAccessibleAtlassianResources` each session
  (do not hard-fail on a stale UUID in this file)

## Boards

| Board | Project key | Typical use | Default issue type |
|-------|-------------|-------------|--------------------|
| Design | `DES` | Design / UX task | **UX task** |
| Engagement (ENG) | `ENG` | Eng / product delivery | **Story** (use **Task** for doc/tracking-only) |

## Team field (DES)

Atlassian Team field: `customfield_10001`

| Team | Id (pass as string to create/edit) |
|------|-------------------------------------|
| *(your team)* | *(look up a recent ticket on that team and copy its `customfield_10001.id` — do not guess or invent one)* |

If the designer names a team, look up a recent DES ticket on that team
and copy its `customfield_10001.id`. Record known team-to-ID mappings
here once you have them, same convention as everywhere else in this
file — real values, not fictional examples.

ENG tickets often leave Team unset (field may be unused on that project).

## Design + eng pair

1. Create **DES** first.
2. Create **ENG** with DES URL in Links / "Blocked on design handoff".
3. Link: type **Blocks** — `inwardIssue` = DES key (blocker),
   `outwardIssue` = ENG key (blocked).

## Assignee

Default: leave unset unless the designer asks, or assign the requester
on DES UX tasks when they are clearly owning the design track (common
for Daniel / engagement design).
