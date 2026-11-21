# Validation — Payments · Table States

- **Source:** Figma frame `26:88081`, 1120 × 1881 px.
- **Browser:** Chromium / Playwright; in-memory HTML rendering with external stylesheet links disabled during testing.
- **Automated checks:** 58/58 passed.
- **Tested widths:** 1120, 1440, 834, 390, 320 px.
- **Horizontal overflow:** none at any tested width.
- **JavaScript exceptions:** none at any tested width.
- **Reference geometry at 1120px:** page 1881px; Loading `y=228, h=605`; Empty dataset `y=865, h=453`; No search results `y=1350, h=491`; every panel 1040px wide.
- **Table content:** all eight exact payment headers, four loading skeleton rows, and three unique states.
- **Loading state:** all three filter inputs disabled.
- **Initial no-results example:** `PAY-2026-9999`, Completed, Oct 01–30, 2026.
- **Clear Search:** preserves Completed and October filters and shows three matching sample payments.
- **Reset Filters:** restores six original sample payments from the Payments screen.
- **Additional tests:** pending-only, exact date matching, case-insensitive payment-ID/course search, conjunction of filters, persistent empty-dataset semantics, local SVG geometry and accessibility roles.
- **Data/API:** read-only sample records; no payment provider, financial action or network data mutation.

## Preview screenshots

- `previews/1120px.png` — original Figma reference size.
- `previews/1440px.png` — desktop.
- `previews/834px.png` — tablet.
- `previews/390px.png`, `previews/320px.png` — mobile.
- `previews/clear-search-results.png` — Completed payments returned after clearing search.
- `previews/reset-filters-results.png` — all six records after reset.
