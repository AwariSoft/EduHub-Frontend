# EduHub — Instructor Course Analytics

## Design reference

- Desktop: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=18-59937 — 1440 × 1404
- Tablet: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=18-60103 — 834 × 2265
- Mobile: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=18-60266 — 390 × 2521

## Files

- `eduhub-instructor-course-analytics.html`: Self-contained HTML with inlined styles/scripts, Bootstrap 5, Font Awesome 6 Free and the EduHub instructor shell. Runs in a modern browser.
- `eduhub-instructor-course-analytics.css`: Screen-specific CSS for consolidation into a shared stylesheet.
- `eduhub-instructor-course-analytics.js`: Shell interactions and sample analytics controller for consolidation.
- `previews/`: Full-page screenshots captured at Desktop, Tablet, Mobile, and narrow Mobile widths.

## Implemented features

- Instructor navigation, account menu, notifications, mobile drawer, responsive sidebars, and bottom navigation.
- Four KPI tiles, two inline SVG line charts, six course comparison bars, and three-category completion distribution.
- Working reporting period selector (All Time, Last 3 Months, Last Month) with consistent sample-data aggregations. Course count, average course completion, course comparison and completion breakdown remain all-time metrics (clearly indicated when a different period is selected).
- Keyboard-accessible native period selector, labelled charts, and chart point tooltips.

## Data semantics

All source figures are illustrative Figma data and must be replaced with data returned from an authenticated instructor-scoped backend. The sample monthly series were chosen to sum to the Figma all-time totals (1,245 enrollments and $4,850 net revenue). The per-period figures are illustrative, not sourced from production analytics.

- `1,245` denotes historical enrollments, not unique students.
- `$4,850` denotes instructor earnings after discounts/platform adjustments, not list price multiplied by enrollments.
- `71.2%` is the Figma all-time unweighted average completion rate across five published courses.
- Completion categories: Completed 870, In Progress 300, Not Started 75.

## Integration notes

- Navigation to upcoming Instructor Workspace screens uses named local HTML files. Those pages must exist in the integrated project for every link to resolve.
- Exact Figma vector/icon files could not be downloaded in this environment. The existing project's Font Awesome 6 equivalents are used for navigation; dynamic chart paths are constructed as semantic inline SVG rather than embedding Figma screenshots or hotlinking temporary asset URLs.
- The standalone HTML includes prebundled Bootstrap and Font Awesome CSS from earlier EduHub instructor work, plus CDN references for normal browser usage. Inter font falls back to system sans-serif when remote font service is unavailable.
- Backend APIs, role checks, query persistence and production analytics have not been implemented.

## Verification

Local Chromium / Playwright visual and interaction checks:

- 1440 × 1404, 834 × 2265, 390 × 2521, and 320-pixel width: no horizontal overflow, no JavaScript console exceptions.
- The section geometry at 1440/834/390 matches the key Figma x/y and component heights; full page heights were 1411, 2272, and 2521 respectively (minor bottom whitespace difference for Desktop and Tablet).
- Period filter: All Time = 1,245 / $4,850; Last 3 Months = 855 / $3,400; Last Month = 350 / $1,600.
- Account menu opens and closes on Escape; mobile drawer opens and closes on Escape.
