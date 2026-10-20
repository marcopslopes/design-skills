# Gallery card enrichment (shared)

**Single source of truth** for resolving designer card profile fields
(`title`, `focusAreas`, `avatarUrl`) before writing a new
`GalleryDesigner` entry in `src/design-harness/galleryData.ts`.

Called by:

1. **Primary (proactive)** — `task-intake` Step 4 and `design-kickoff`
   Step 2, the moment Ownership is written with a real `Designer:` and
   `Gallery: visible`, *if* that designer is not yet in `galleryData.ts`.
2. **Safety net** — `audit` Step 3.5 on PASS, for anything that slipped
   through or is missing fields on an existing entry.

Do **not** duplicate this lookup elsewhere. Do **not** invent values. Do
**not** read `designer-profile.local.md` (local-only, never pushed).

---

## When to run

Run only when **all** of these hold:

- `brief.md` has `Designer:` resolved to a real name (not `UNKNOWN — flagged`)
- `Gallery: visible` (not `hidden`)
- Either:
  - this designer has **no** `GalleryDesigner` entry yet (first eligibility), or
  - an existing entry is missing `title` / `focusAreas` / `avatarUrl` (backfill)

If the designer is already fully enriched, skip silently.

---

## Resolution procedure (in order)

### A. Slug

`slug` = lowercase hyphenated name (e.g. `Jane Doe` → `jane-doe`).
Must match a new or existing entry in `GALLERY_DESIGNER_ROUTES`
(`src/design-harness/routes.ts`) — add both in the same pass.

### B. Title (required)

1. Look the designer up in a connected directory that exposes job titles —
   the Atlassian user profile (`lookupJiraAccountId`), the Slack or Teams
   profile, or the Google Workspace directory.
2. Prefer the profile's job title field.
3. Fallback: a team people page in the docs tool (location recorded in
   `COMPANY-SOURCES.md`) titled with their name — look for a Roles / title line.
4. If neither yields a job title → **FAIL** (see Failure).

### C. Focus areas (required, 2–4 labels)

1. Search the docs tool for the designer + their squad/domain (e.g. domain
   reference pages, people pages).
2. Extract **2–4 short public focus labels** (e.g. `Referrals`,
   `Navigation`, `Design system`).
3. Allowed sources: domain reference pages, people pages, squad directory
   blurbs that name their focus.
4. **Forbidden sources:** weekly stand-ups, 1:1 notes, blockers, metrics
   dumps, `designer-profile.local.md`, `decisions.md` / `findings.md` /
   `log.md`.
5. If you cannot find at least **one** honest public focus label → **FAIL**.
   Prefer 2–4; one is acceptable only when the public record truly only
   names one area. Never pad with invented labels.

### D. Avatar (required for real designers)

1. From the same directory profile's picture URL (Atlassian, Slack, Teams, or Google).
2. Download into `public/design-harness/avatars/<slug>.png` (commit the file).
3. Set `avatarUrl: '/design-harness/avatars/<slug>.png'`.
4. **Do not** hotlink profile-picture URLs (auth / expiry).
5. Verification fixtures only may omit `avatarUrl` (UI shows initials).
   Real designers: missing avatar after a failed download → **FAIL**.

### E. Squad (optional)

From `brief.md`'s `Squad:` only if it cleanly matches
`COMPANY-SQUADS.md`. Never invent a squad from the directory just
to fill the card.

---

## Success — write the entry

Write / update `GalleryDesigner` with:

```ts
{
  slug,
  name,           // from brief Designer:
  title,          // resolved
  squad?,         // optional, from brief only
  focusAreas,     // resolved string[]
  avatarUrl,      // '/design-harness/avatars/<slug>.png'
  projects: []    // fictional examples only — real projects come from brief.md
}
```

Also add `gallery/<slug>` to `GALLERY_DESIGNER_ROUTES` if new.

Projects are **not** written here. Design Harness attaches each committed
`brief.md` whose `Designer:` matches `name` (case-insensitive), whose
`Gallery:` isn't `hidden`, and whose three case-study lines are filled. So
`name` must match the brief's `Designer:` spelling. A designer with no such
brief doesn't render — never add an empty designer “for layout.”

---

## Failure — do not invent

If title, focus areas, or avatar cannot be resolved:

1. **Do not** add or update the `GalleryDesigner` entry with blanks or guesses.
2. **Do not** list the designer in the gallery until enrichment succeeds.
3. Flag explicitly in chat (and in the audit report when this is Step 3.5):

   ```
   [GALLERY-ENRICHMENT] Could not resolve card profile for "<Name>"
   from the directory / docs tool (title / focusAreas / avatar).
   Left unlisted — fix sources or re-run after profile exists; never invent.
   ```

4. Continue the rest of the skill (intake / kickoff / audit) — enrichment
   failure must **not** block project creation. It only blocks the gallery
   card.

---

## Speed / UX

Keep this invisible when it works: one profile lookup + one docs
search + one avatar download. Only surface `[GALLERY-ENRICHMENT]` when
resolution genuinely fails.
