# Validation — Course Approvals · Table States

- Source design: Figma frame `26:87742`, 1120 × 1881.
- Browser: system Chromium via Playwright, 2026-11-21 environment.
- **40/40 automated browser checks passed**.
- Tested widths: **1120px, 1440px, 834px, 390px, 320px**. No horizontal overflow; no JavaScript page errors.
- Exact reference geometry at 1120px: page 1881px, Loading (y=228, h=605), Empty (y=865, h=453), No Results (y=1350, h=491).
- Four loading skeleton rows visible and all loading filters disabled, avoiding misleading user actions.
- Empty dataset remains empty even when search is entered.
- Initial no-results state correctly displays Figma query `Rust for Data Science` with Pending status and October 1–30 date selection.
- Clear Search retains pending status and displays three Figma sample Pending records.
- Reset Filters clears query/status/date and displays all six supplied sample records.
- Status/date filtering and unmatched queries show correct responsive results.
- Available sample records are not presented as the full set of 47 submitted courses.
- No backend API calls, artificial loading timers, live approval decisions, or externally fetched fonts.

## Screenshots

- `previews/1120px.png`: Figma-sized support sheet.
- `previews/1440px.png`: centered desktop sheet.
- `previews/834px.png`: tablet.
- `previews/390px.png`: mobile.
- `previews/clear-search-results.png`: three pending records after clearing the query.
- `previews/reset-filters-results.png`: all six supplied course records after reset.

## Scope

This is a supporting-state sheet, not the complete Admin Course Approvals page. A copy of that page is supplied under `related/` for local navigation from sample results. The controls shown in Loading are non-interactive while loading, and the sample-data filtering is frontend-only. All values and copy come from the source EduHub design or the previously completed Course Approvals sample records.
