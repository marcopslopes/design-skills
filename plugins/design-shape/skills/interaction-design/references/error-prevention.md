# Error prevention & recovery

Prevention is always cheaper than recovery. This reference orders the
options and gives the undo-vs-confirm decision a real answer instead of
"add a confirm dialog" as the default reflex.

---

## The error-prevention hierarchy

Work top-down. Never design at level 5 when level 1 or 2 is available —
"we'll just add a confirm dialog" is usually a level-5 answer to a
level-1/2 problem.

| Level | Approach | Example | Cost to user |
|---|---|---|---|
| **1. Eliminate** | Remove the possibility of the error entirely | Auto-save eliminates "forgot to save"; a dropdown eliminates a misspelled option | Zero |
| **2. Prevent** | Design the input so the error can't occur | Date picker prevents invalid dates; a slider prevents out-of-range values | Zero |
| **3. Detect early** | Catch it before submission | Inline validation on blur; real-time format checking | Low |
| **4. Recover gracefully** | Make recovery painless when it happens anyway | Undo after delete; "did you mean...?" auto-correct | Medium |
| **5. Explain clearly** | If the user must act, say exactly what to do | Inline error with specific message + highlight + fix suggestion | Medium-High |
| **6. Diagnose** | Help the user understand what went wrong and why | Detailed error state with troubleshooting steps | High |

---

## Undo vs. confirm — the actual decision

**Default to undo, not confirmation.** A confirm dialog ("Are you sure?")
is excise — it interrupts flow, and users learn to click through it
without reading, so it stops preventing anything while still costing
everyone the interruption.

| Instead of this confirm dialog | Do this |
|---|---|
| "Are you sure you want to delete?" | Delete immediately; show an "Undo" toast for 5–10s |
| "Discard unsaved changes?" | Auto-save continuously; there's nothing to discard |
| "Send this message?" | Send immediately; show "Undo send" for a few seconds |
| "Remove team member?" | Remove immediately (soft-deactivate for the undo window); "Removed. Undo" |

**Confirmation is still the right call when the action is:**
- **Truly irreversible** — permanently deleting data (not just moving to
  trash), not a soft-delete with an undo window
- **High-consequence** — publishing to production, sending to a large
  audience, a financial transaction
- **Affects other people** — removing someone else's access, deleting a
  resource others depend on

When confirmation is genuinely warranted, **state the consequence, not
just the question**: "This will permanently delete 23 files. This cannot
be undone." — not a bare "Are you sure?" Wording for the dialog itself
(button labels naming the action, never bare Yes/No) is `content`'s job;
this reference only decides *whether* a confirm step belongs here at all.

---

## Recovery flow templates

Genuinely different situations that get lumped together as "show an
error" — each has a different right answer. Adapt, don't invent from
scratch each time.

### Network error (offline / dropped connection)

```
Action attempted → connection unavailable
  → inline: "Couldn't save. No internet connection."
  → auto-retry silently in background (a few attempts, backoff)
  → reconnected → save + brief success confirmation
  → still offline → "Saved locally. Will sync when you're back online."
```

### Server error (5xx)

```
Action attempted → server error
  → inline: "Something went wrong on our end."
  → offer a retry action
  → one silent auto-retry after a short delay
  → still failing → "We're looking into this. Your work is saved locally."
    (+ support path if this is a critical flow)
```

### Session expiry

```
User returns after timeout
  → attempt token refresh silently
  → succeeds → continue seamlessly, user never notices
  → fails → re-auth overlay
  → after re-auth → return user to the exact state they were in
  → never discard unsaved work because of a session timeout
```

### Concurrent-edit conflict

```
User saves → server reports another user already changed this
  → show both versions side by side
  → let the user choose: keep mine / keep theirs / merge
  → never silently overwrite someone else's work
```

---

## When to use this

Load from `interaction-design`'s state matrix step when the surface has
a **destructive or consequential action** (delete, remove, send, publish,
discard) or a **failure path that isn't just "show an inline error"**
(network drop, server error, session timeout, edit conflict). Skip it for
ordinary form validation — that's already covered by the state matrix's
Error row.
