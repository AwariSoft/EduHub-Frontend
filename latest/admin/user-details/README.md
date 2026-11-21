# EduHub — Admin Workspace — User Details

## Figma source

- File: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub
- Desktop (1440 × 1125): https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-86636
- Tablet (834 × 1509): node `26:86737`
- Mobile (390 × 1546): node `26:86823`
- Account access confirmations and results: node `26:88399`

## What's included

- `eduhub-admin-user-details-standalone.html` — opens directly in a browser; all page CSS, JavaScript, and supported icon SVG data are embedded. It does not rely on live CDNs.
- `eduhub-admin-user-details.html` — modular HTML5 version with Bootstrap 5 / Font Awesome 6 CDN links, local offline CSS fallback and JavaScript, and `<!-- INCLUDE: partials/... -->` markers.
- `assets/css/admin-shell.css` — reused Admin Workspace navigation and topbar foundation.
- `assets/css/admin-user-details.css` — page-specific responsive layout and dialogs.
- `assets/css/vendor-offline.css` — local offline CSS fallback.
- `assets/js/admin-user-details.js` — interactive user-access demo, navigation, notifications and keyboard support.
- `assets/js/fontawesome-svg-icons.js` — offline Font Awesome Free SVG icons, without bundled font files.
- `eduhub-admin-user-management.html` — working offline copy of the previously completed User Management screen for the **Back to User Management** link.
- `previews/` — screenshots at 1440px, 834px, 390px and 320px, plus both confirmation dialogs.
- `VALIDATION.md` and `validation-results.json` — test observations.

## What this page does

The screen displays the original **Warda Mahmoud** (`USR-1204`) sample record from Figma, including identity, email, role, registration time, account status and sign-in access. The account-access button opens an accessible confirmation dialog. Confirmation toggles status between Active and Inactive, updates sign-in access between Allowed and Blocked, and reverses the action when activated again. Cancel / Escape leave all data unchanged. Other controls include admin mobile navigation, notifications, admin account menu and single-profile search feedback.

### Important limitations

- The sample profile is static Figma content. Account status updates are **in-memory frontend demonstrations** only, and are not sent to any backend, database, or identity provider; they reset on page reload.
- No real user account is activated or deactivated. A production version must use authenticated, authorized admin APIs and audit logging.
- Other Admin Workspace sidebar links target the expected filenames for integration with the other screens. They will work only when those screens are placed alongside this page. The **Back to User Management** link is supported inside this ZIP.
- The original screen contains no photos; iconography reuses the project's Font Awesome 6 Free design language. The included offline SVG helper avoids distributing font files.

## Integration

Use the modular HTML with the other Admin Workspace pages, keeping the `assets/css/` and `assets/js/` paths intact. Wire the record retrieval and account transition actions to your .NET backend using authorization checks, CSRF protection as applicable, server-side validation, and auditable status changes.
