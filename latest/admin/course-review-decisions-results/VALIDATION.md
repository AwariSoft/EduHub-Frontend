# Validation — Course Review: Decisions and Results

Source: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-88267

- Browser engine: headless Chromium via Playwright.
- Tests: **16/16 passed**, no JavaScript errors and no horizontal overflow.
- Figma canvas at 1120px: **1120 × 2088px**, exact.
- Positions at 1120px: brand y=40, introduction y=106; approval row y=228 (688px); rejection row y=948 (657px); saved decision y=1637 (411px).
- Approval modal: 508 × 363px; approval result card: 508 × 649px.
- Rejection modal: 508 × 581px; validation card: 508 × 618px.

## Viewport measurements

| Viewport width | Rendered height | Horizontal overflow | JS errors |
|---:|---:|---|---|
| 1120px | 2088px | No | None |
| 1440px | 2088px | No | None |
| 834px | 2077px | No | None |
| 390px | 3174px | No | None |
| 320px | 3250px | No | None |

## Interactions verified

- Required rejection reason is enforced and whitespace-only input stays invalid.
- Adding text enables the rejection action and removes the invalid flag.
- Both rejection form versions update the *local* saved-reason result.
- The approval action shows a success result but never publishes or calls a backend.
- Cancel does not submit a decision; Escape dismisses the feedback message.
- Reset restores the Figma reason and clears local selection.
- The linked Course Approvals file exists inside `related/`.

## Notes

This is a Figma supporting-state visualization with independent alternative scenarios, not a single real course review transaction. The source's photographic thumbnail was not accessible for download; an existing EduHub illustration is used in its place.
