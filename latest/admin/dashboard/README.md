# EduHub — Admin Dashboard

**Reference Figma:** https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-84277

| Variant | Figma node | Target reference artboard |
|---|---|---|
| Desktop | `26:84277` | 1440 × 1942 |
| Tablet | `26:84503` | 834 × 2428 |
| Mobile | `26:84716` | 390 × 2792 |

## Start

- Open `eduhub-admin-dashboard-standalone.html` directly. This single file embeds styles, JavaScript, and three sample thumbnail illustrations.
- For a maintainable project, open `eduhub-admin-dashboard.html` in the EduHub codebase. The referenced local files live under `assets/css`, `assets/js`, and `assets/images`.
- Both HTML variants use Bootstrap 5 utility classes and Font Awesome 6, with an included offline vendor CSS fallback; the modular page also declares the public CDN stylesheets.

## Contents

- `eduhub-admin-dashboard.html` — modular standalone page markup and include markers for sidebar/topbar/footer.
- `eduhub-admin-dashboard-standalone.html` — portable, offline, single-file version.
- `assets/css/admin-dashboard.css` — Figma-matched design tokens, components, layout and responsive overrides.
- `assets/css/vendor-offline.css` — offline Bootstrap/Font Awesome fallback. Font Awesome Free and Bootstrap retain their respective upstream licenses.
- `assets/js/admin-dashboard.js` — dashboard record search, profile/notification popovers, mobile drawer, course review preview dialog, focus handling.
- `assets/images/` — three offline thumbnail illustrations reused from previous EduHub work.
- `previews/` — rendered PNG screenshots at 1440px, 834px, 390px, and 320px.
- `validation-results.json`, `VALIDATION.md`, `test_browser.py` — test details.

## Figma data reproduced

- Admin Nour Hassan, 6 pending submissions, 1,284 users, 1,200 students, 80 instructors, 48 courses, 1,048 payments.
- Recent approval queue: SQL Server Essentials / Mohamed Hassan / $39; JavaScript for Beginners / Omar Khaled / $35; Git & GitHub Essentials / Nour Ahmed / $19.
- Three recent registrations and three recent payment transactions, including state badges and source wording.
- Figma data shown is illustrative **as of October 30, 2026**, not live production data.

## Behavior and integration

- Search filters the nine visible preview rows client-side (not full platform records).
- Each `Review` control opens an accessible, local detail preview; **no approve/reject action is performed**.
- Admin quick actions and menu links point toward future pages: `eduhub-admin-course-approvals.html`, `eduhub-admin-user-management.html`, `eduhub-admin-payments.html`. These pages are not bundled with this deliverable.
- Role safety must be enforced by backend authentication/authorization; front-end links alone are not access controls.
- The three exact original Figma photographic thumbnails could not be downloaded in the working environment; the included local EduHub course illustrations are substitutions. All three images load offline.

## Accessibility

- Heading hierarchy, accessible search, keyboard-closable menus, modal focus containment and restoration, `aria` expanded states, responsive admin drawer and reduced-motion styles.

This is a frontend demonstration; real users, approvals, payment records, and notifications require API integration.
