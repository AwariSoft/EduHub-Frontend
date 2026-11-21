# EduHub — Admin Workspace: User Management

Figma source: [EduHub User Management — Desktop (26:86096)](https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-86096). Also references tablet `26:86301`, mobile `26:86477`, and account-access supporting states `26:88399`.

## Included files

- `eduhub-admin-user-management.html` — modular responsive HTML5 + Bootstrap 5.3.3 and Font Awesome 6.7.2 Free via CDN.
- `eduhub-admin-user-management-standalone.html` — single-file HTML with embedded CSS, JavaScript, and Font Awesome 6 Free **SVG path** fallbacks; no font binaries or other asset downloads required.
- `assets/css/admin-shell.css` — shared EduHub Admin Workspace navigation and topbar.
- `assets/css/admin-user-management.css` — responsive screen-specific design and modal states.
- `assets/css/vendor-offline.css` — compact fallback base CSS; stripped of all `@font-face` rules and embedded font binaries.
- `assets/js/admin-user-management.js` — search, filters, pagination guard, account confirmation flow, menu and dialog interactions.
- `assets/js/fontawesome-svg-icons.js` — Font Awesome Free path SVGs, not font files.
- `previews/` — 1440px / 834px / 390px / 320px full-page screenshots plus account-state examples.
- `validation-results.json`, `VALIDATION.md`, `test_browser.py`, and `build_standalone.py` — development checks and reproducibility.

## Figma content

Six sample user records (three students, two instructors and one current admin); platform-level metrics are displayed from Figma: 1,284 users, 1,200 students, 80 instructors, four admins. The platform total is not a count of locally loaded rows.

The source separates account status from role and uses `Active`/`Inactive`. Account actions switch between `Deactivate Account` and `Activate Account`, while the current administrator has no deactivation button. Supporting confirmation copy is based on the Figma account-access state frame.

## Frontend interactions

- Search by name or email, filter by role and account status; the global search control also filters the six included examples.
- Responsive desktop table, two-column tablet record cards and stacked mobile record list.
- Read-only `View User Details` sample-data dialog; a **separate full User Details screen** is outside the scope of this file.
- Confirm activate/deactivate with focus-aware dialog, cancellation and visible confirmation; changes are local in-memory only and reset on refresh.
- User ownership safeguard: Nour Hassan (current Admin) cannot be deactivated in the sample UI.
- Empty search state and missing-page guard. The next-page button explains that other user records require API-backed pagination rather than generating fake data.
- Admin navigation sidebar, mobile drawer, notifications and account dropdown.

**Important:** This is a frontend prototype. No user accounts are changed on a server, no audit event is submitted, and all authorization and account mutation must be enforced server-side (ASP.NET Core Identity, for example). Route links to future screens assume those files will exist when integrated.

## Design tokens

Background `#F8FAFC`; primary `#2563EB`; text `#0F172A`; muted `#64748B`; border `#E2E8F0`; light-blue `#EFF6FF`. Layout switches at 1200px (sidebar to icon rail) and 640px (mobile drawer). Figma frame heights reproduced at 1440×1275, 834×1675, and 390×2712.

## SVG license/source

The embedded icon paths are Font Awesome Free 6.7.2: https://fontawesome.com/license/free (icons CC BY 4.0; no icon font files distributed). Bootstrap reference: https://getbootstrap.com/docs/5.3/. Original page reference: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-86096.
