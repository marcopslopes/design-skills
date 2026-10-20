# Ticket-create defaults

Record your team's real values here once you have them, from a live create —
not fictional examples. If a create fails, re-check against a known good
ticket in the same container.

## Which tracker

Resolve per `references/shared/work-tools.md` § Step 1. A pasted URL settles
it: `…atlassian.net/browse/…` → Jira, `linear.app/…` → Linear,
`github.com/<owner>/<repo>/issues/…` → GitHub.

## Containers

The worked example uses a design container `DES` and an eng container `ENG`.

| Role | Jira | Linear | GitHub Issues | Default type |
|------|------|--------|---------------|--------------|
| Design | Project `DES` | Team `DES` | Repo `org/design` (or a `design` label) | Jira **UX task** · `design` label |
| Eng | Project `ENG` | Team `ENG` | Repo `org/app` | Jira **Story** (Task for doc/tracking-only) · `eng` label |

## Jira specifics

- `cloudId`: resolve via `getAccessibleAtlassianResources` each session — do
  not hard-fail on a stale value.
- **Team field:** many Jira sites use a custom field for Team (often
  `customfield_10001`, but check). If the designer names a team, look up a
  recent design ticket on that team and copy its Team field id — never
  guess or invent one. Eng tickets often leave Team unset.

## Linear specifics

- Every issue needs a **team**; the team is the container, so there is no
  separate Team field.
- Use labels for type, and a project for the epic equivalent when the
  designer names one.

## GitHub specifics

- Every issue needs `owner/repo`. Use labels for type and team.
- There is no native "blocks" link — write "Blocked by #<n>" in the body, or
  use sub-issues if the repo has them enabled.

## Design + eng pair

1. Create the **design** ticket first.
2. Create the **eng** ticket with the design URL in Links / "Blocked on
   design handoff".
3. Link design **blocks** eng with the tracker's mechanism (see the table in
   `SKILL.md` § Step 3).

## Assignee

Default: leave unset unless the designer asks, or assign the requester on
design tickets when they are clearly owning the design track.
