# EduHub — Admin Workspace — Filters, Profile and Notifications

Original Figma screen: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-88791

## Files
- `eduhub-admin-filters-profile-notifications-standalone.html`: single portable HTML with inline CSS and JavaScript; no network needed for the interface.
- `eduhub-admin-filters-profile-notifications.html`: modular HTML referencing `assets/css/admin-filters-profile-notifications.css` and `assets/js/admin-filters-profile-notifications.js`; Bootstrap 5 and Font Awesome 6 CDN references are included, but the page has complete local CSS and inline SVG rendering fallbacks.
- `assets/icons/`: local outline SVG icon fallbacks; no font files are bundled.
- `related/`: six previously completed EduHub Admin screens, linked from notifications and filter action feedback.
- `previews/`: responsive and interaction screenshots.
- `VALIDATION.md` and `test-results.json`: test details and geometry.

## Screen composition
Eight visible reference cards: (1) Admin profile, (2) notifications, (3) Course Approvals — approval status, (4) Course Approvals — submission date, (5) User Management — role, (6) User Management — account status, (7) Payments — status, (8) Payments — payment date.

All default options and notifications match the Figma example. The sheet is a visual reference for open controls, not a production dashboard route. At 1120px width, layout dimensions and all card positions match the 1120 × 2139px original frame.

## Interactions
- Click or use arrow keys on filter options. The selected row and checkmark update immediately. The Apply Filters button records the selected filter in the local demo and displays feedback with a navigation link to the corresponding bundled admin screen.
- Course date options: All dates, Last 7 days, Last 30 days, or Custom range. The custom date inputs validate ordering and accepted format (`Oct 01, 2026`), and calendar icons open the browser's native date picker where supported.
- Payment date: editable custom range, Reset and Apply Filters.
- Profile Logout opens an explanatory confirmation. Because no authentication backend is connected, it never claims to terminate a real session.
- Notifications link to existing bundled course, payment, and refund-related pages.
- Use `window.EduHubAdminFilters.getSelected(id)`, `.getApplied()`, `.apply(id)`, and `.reset()` for local demo integration/testing.

## Integration guidance
The filter component states are not wired into real queries or persisted across routes. Replace the `notify()` and `apply()` implementations with your router/store/API actions, and bind date filters to UTC-inclusive server queries. Provide back-end authorization for logout and any admin-only operations. Do not use demo-only status messages as evidence of server success.

## Design fidelity
Color tokens: #0F172A, #64748B, #2563EB, #F8FAFC, #E2E8F0. Inter/system sans-serif; light cards and original spacing. The original Figma SVG icon exports could not be downloaded in this environment; compatible local outline SVG substitutes are included. The source design contains no photographs.
