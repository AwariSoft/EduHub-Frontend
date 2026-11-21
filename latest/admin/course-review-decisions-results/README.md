# EduHub Admin — Course Review: Decisions and Results

**Figma source:** https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-88267

This is the original **supporting-state sheet** (`1120 × 2088px`), not a separate dashboard route. It illustrates five independent variants for the SQL Server Essentials course (CRS-028):

- Approval confirmation (interactive Cancel and Approve Course)
- Approval success (eligible for public listing; not automatically published)
- Rejection confirmation with a populated required reason
- Rejection with an empty reason (validation; submit disabled until reason entered)
- Rejected course showing the locally saved reason and decision metadata

## Deliverables

- `eduhub-admin-course-review-decisions-results-standalone.html`: opens offline, embeds CSS/JS/thumbnail fallback; no font files distributed.
- `eduhub-admin-course-review-decisions-results.html`: modular HTML with Bootstrap 5 and Font Awesome 6 CDN links, local styles, scripts and image.
- `assets/css/admin-course-review-decisions-results.css`: Figma tokens and responsive layouts, including hover/focus/active states.
- `assets/js/admin-course-review-decisions-results.js`: local state demo and validation, no API calls.
- `assets/images/sql-server-essentials.jpg`: **existing EduHub SQL Server illustration fallback**, not the exact Figma server-room photograph.
- `related/eduhub-admin-course-approvals.html`: previously implemented standalone Course Approvals for local navigation.
- `previews/`: full-size and responsive screen captures, plus individual state previews.
- `test_browser.py`, `validation-results.json`, `VALIDATION.md`: browser testing and results.

## Behavior

The Figma sheet intentionally displays *alternative* approval and rejection outcomes simultaneously for design comparison. Activating its controls changes only **local browser state** and scrolls to the associated result. A rejection requires nonempty trimmed text; cancel never submits, and the Reset demo action restores the reference sample. An approval marks the course **eligible for public listing**, not published. No server connection, audit log, user notification or real course state is changed.

## Use in EduHub

Link the approval/rejection confirmation pattern into the Course Review Details page; use the result cards after a successful authorized backend mutation. Keep backend transitions idempotent and audited. Do **not** use the local demo as a production approval endpoint.

## Design fidelity

At the Figma reference width of 1120px, all five state-panel positions and heights and total page height match their original Figma measurements exactly. The only material asset difference is the course photograph, which could not be retrieved from the short-lived design asset URL in this runtime and is represented by the existing local project illustration.
