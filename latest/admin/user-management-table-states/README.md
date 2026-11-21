# EduHub — Admin Workspace: User Management · Table States

Reference: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-87917
Frame: 1120 × 1881px (supporting-states sheet, not a complete Admin screen).

## Files
- `eduhub-admin-user-management-table-states-standalone.html` — single-file, embedded CSS + JavaScript + SVG icon paths. Opens in the browser. CDN stylesheets are optional; base styling runs offline.
- `eduhub-admin-user-management-table-states.html` — modular HTML (references assets).
- `assets/css/admin-user-management-table-states.css` — Figma-aligned reusable styles and responsive adjustments.
- `assets/js/admin-user-management-table-states.js` — live filtering and recovery actions; sample data only.
- `assets/js/fontawesome-svg-icons.js` — locally embedded SVG paths for Font Awesome Free icons, no font binaries.
- `related/eduhub-admin-user-management.html` — self-contained completed User Management page used by the result links.
- `previews/` — initial viewport previews and interaction state previews.
- `VALIDATION.md` and `validation-results.json` — browser checks and scope notes.

## Original Figma states
1. **Loading** — four noninteractive skeleton rows, retained user-table headings and disabled controls.
2. **Empty dataset** — zero registered users, illustration, unchanged blank table and filters; cannot reveal nonexistent data.
3. **No search results** — no match for `Lina Mansour` with role `Student` and status `Active`; action buttons to recover.

## Interactivity
- Clear Search removes only the query; two visible active students remain.
- Reset Filters clears query and selectors and shows all six sample accounts available from the main Figma User Management page.
- Role/status filters and full-name/email case-insensitive search work on the sample accounts.
- A secondary visible Reset Filters control remains available after matching results appear.
- No actual user records are created, changed, or deactivated by this page.
- The full platform includes 1,284 accounts in the Figma sample metrics; **only six sample records are available to filter**.

## Integration
The three state cards can be incorporated into the main Admin User Management data table. Replace `users` with your API response and preserve mutually exclusive loading/empty/no-results states. Use server-side pagination for the full platform data. Do not treat this supporting-state sheet as live authenticated administration.
