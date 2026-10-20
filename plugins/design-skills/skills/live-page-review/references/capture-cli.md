# Capture CLI

`scripts/capture-page.mjs` — Node Playwright, same dependency as
`export-task-prototype.mjs`. Not a Playwright MCP. Not `@playwright/cli`.

One browser session. Click-through is extra `--step` flags, not a new process per click.

## Install browsers (once per machine)

```bash
npx playwright install chromium
```

If this has not been run, the script writes `error.txt` and exits 1. The skill degrades (screenshot-only / skip capture) — it does not `playwright install` on its own.

## Flags

| Flag | Required | Notes |
|------|----------|--------|
| `--url` | yes | Live `https://…` or local `http://localhost:3001/#/playground/…` |
| `--out` | yes | Directory; created if missing |
| `--device` | no | Playwright device name. Default `Desktop Chrome`. Phone product → `iPhone 14`. Front desk → `iPad Pro 11`. Android → `Pixel 7`. |
| `--timeout` | no | Navigation timeout ms (default 30000) |
| `--headed` | no | Show the window so the designer can watch |
| `--step` | no | Repeatable `label:` or `label:<click>`. Default one step `page` |

## Click specs

| Spec | Meaning |
|------|---------|
| *(empty after colon)* | Capture current page, no click |
| `text=Continue` | `getByText('Continue')` |
| `role=button[name=Continue]` | `getByRole('button', { name: 'Continue' })` |
| `role=link` | First link |
| `button.primary` | CSS locator |

## Click-through protocol (agent)

1. Capture landing (`--step "landing:"`) **or** ask the designer for the path.
2. Read `steps/00-landing/a11y-tree.txt`.
3. Name the remaining clicks from the tree (accessible name + role), not from pixels.
4. Re-run **from the original URL** with the full `--step` list in one command so client state is built in order.
5. Cap at **8 steps**. If the flow is longer, ask which stretch matters.

Do not keep a headed browser open as a chat REPL. Do not add Playwright MCP for this.

## Outputs

```
OUT/
  metadata.json
  error.txt                 # only on failure
  steps/
    00-landing/
      screenshot.png
      a11y-tree.txt
      dom.html
    01-after-continue/
      …
```

`export-task-prototype.mjs` stays the Design Harness **static snapshot** exporter. This CLI is review evidence only.
