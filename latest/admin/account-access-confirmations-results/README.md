# EduHub — Admin Workspace · Account Access — Confirmations and Results

**Figma source:** https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-88399

This project recreates the **1120 × 1506 px** Figma supporting-state sheet, including the full-height reference layout and smaller responsive widths. The sheet is not a full Admin page: it deliberately shows four side-by-side desktop states without the sidebar.

## Files

- `eduhub-admin-account-access-confirmations-results-standalone.html` — self-contained HTML, CSS, JavaScript, and vector icons, usable without a server.
- `eduhub-admin-account-access-confirmations-results.html` — modular HTML with Bootstrap 5 / Font Awesome 6 CDN declarations and local CSS / JS.
- `assets/css/admin-account-access-confirmations-results.css` — responsive styles, Figma colors and dimensions, button/focus states.
- `assets/js/admin-account-access-confirmations-results.js` — frontend interactions; exposes `window.EduHubAccountAccessStates` for integration and testing.
- `assets/icons/` — local SVG icon approximations matching the Figma icon subjects, with no font files.
- `related/` — previously implemented User Management and User Details standalone pages for reference/integration.
- `previews/` — screenshots at 1120, 1440, 834, 390 and 320 px plus four isolated state panels.
- `validation-results.json`, `VALIDATION.md` — automated browser test records.

## Reference states

1. Active → Deactivate confirmation (Warda Mahmoud, USR-1204, Student)
2. Deactivation success · Inactive details
3. Inactive → Activate confirmation
4. Activation success · Active details

## Behavior

The sheet preserves both illustrative result panels as designed. Clicking **Deactivate Account** updates an in-memory demo state to Inactive, highlights the corresponding result, and shows accessible feedback. Clicking **Activate Account** restores Active. These actions are idempotent, and Cancel or the close icon never modifies the status. Buttons in result panels bring the relevant confirmation into view instead of making the change without confirmation. The Reset demo control restores the initial Active state; Escape closes the feedback message. No live account data, permission checks, audit logs, API calls or persistence are performed.

The displayed timestamps are Figma sample values (not real execution timestamps). Name, email, Student role and user ID are unchanged throughout the demonstration.

## Figma asset note

The environment could not resolve the temporary Figma asset host to download the source vector icons. This bundle therefore includes offline-friendly Lucide-style SVG outlines depicting the same icons; they are visual approximations, not the original vector paths. The screen itself uses no photographs. No fonts are redistributed.

## Integration

Use the modular HTML with the stylesheet and script under `assets/`, or open the standalone HTML directly. The standalone file does not need Bootstrap, Font Awesome, a network connection, or external assets to render. To connect to actual account APIs, replace the demo transitions in `change(kind)` with an authenticated, audited backend request and refresh account details from the server. Account status updates should remain subject to authorization and confirmation in production.
