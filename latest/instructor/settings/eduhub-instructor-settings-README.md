# EduHub — Instructor Workspace / Settings

One responsive HTML5 + Bootstrap 5 + Font Awesome 6 implementation of the **Settings** screen.

## Figma reference

- Desktop (1440 × 1377): https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=18-60826
- Tablet (834 × 1382): https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=18-60928
- Mobile (390 × 1826): https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=18-61026

## Files

- `eduhub-instructor-settings.html` — runnable standalone HTML page with included styles and scripts.
- `eduhub-instructor-settings.css` — screen-specific stylesheet, also embedded in standalone HTML for ease of use.
- `eduhub-instructor-settings.js` — screen-specific interactions, also embedded in standalone HTML.
- `*-preview.png` — browser-rendered viewport captures at 1440, 834, 390, and 320 pixels.

## Interactions

- Full Name and Email Address validation, Save Changes, and Cancel/Discard confirmation.
- Keyboard-accessible Course Enrollment and Course Approval switches, optional Platform Notifications checkbox.
- Prototype password-change form with client-side validation (12+ characters and confirmation). **Does not change a password**.
- Prototype logout confirmation. Navigates to `eduhub-sign-in.html` when confirmed; **does not end a server session**.
- Delete Account requires typing `DELETE`, but **does not delete anything**. Real account deletion requires server-side authentication, authorization, and deletion logic.
- Settings are saved in the current browser's `localStorage` under `eduhub.instructor.settings.v1`, where enabled.
- Navbar, tablet icon rail, mobile navigation drawer, account dropdown, and course-search shell reused from existing EduHub implementation.

## Integration

- Reuse markers for shared instructor sidebar and header are in HTML comments (`INCLUDE: partials/...`).
- Figma values are demonstration data, not real account settings.
- All authentication, account deletion, password changes, and live notifications require backend integration.
- The HTML contains bundled Bootstrap and Font Awesome styles from the established EduHub shell for offline rendering. It also references the CDNs and Google Font; when offline, it falls back gracefully.
- Icons are Font Awesome alternatives to unavailable original Figma vectors; there are no temporary Figma asset URL dependencies.

## Validation

Browser-rendered with Chromium at 1440 × 1377, 834 × 1382, 390 × 1826 and 320 × 1826. No JavaScript exceptions or horizontal overflow were detected. At the three design widths the heading, cards, actions, footer and mobile navigation positions match Figma frame measurements. Tested form input validation, switch state changes, checkbox, local saving, discard, password validation dialog, delete confirmation dialog, and mobile navigation drawer.
