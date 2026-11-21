# EduHub — Instructor Workspace / My Students

Responsive HTML5 / Bootstrap 5 / Font Awesome 6 Free / JavaScript implementation of:

- Desktop: [Figma 18:59456](https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=18-59456) — 1440 × 1058
- Tablet: [Figma 18:59628](https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=18-59628) — 834 × 1974
- Mobile: [Figma 18:59785](https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=18-59785) — 390 × 2274

## Run

Open `eduhub-instructor-my-students.html` in a modern browser. CSS and JavaScript are embedded for standalone operation. Bootstrap 5 and Font Awesome 6 are referenced via CDN but matching CSS is embedded as an offline fallback. The Inter font is loaded from Google Fonts when available, otherwise system sans-serif is used.

`css/my-students.css` and `js/my-students.js` contain the page-specific code separately for later integration into EduHub's shared asset architecture. The HTML already embeds these styles and behaviors; avoid loading them twice.

## Features

- Responsive desktop table / tablet and mobile student cards.
- Search by student name, email, or course.
- Course and enrollment month filters, independent and combinable.
- Click, Enter, or Space to select a student and inspect read-only enrollment progress; panel can be dismissed.
- Working sample-data pagination and a clear empty-results state.
- Responsive instructor sidebar, mobile drawer, and account/notification dropdowns.
- Links to existing or planned EduHub pages.

## Important demo-data limits

The first six student records and Sarah Ali's two course enrollments reproduce the Figma sample. The displayed **1,245 historical enrollments** is a Figma illustration, not a live count. Twelve additional **explicitly demo-only** rows support pagination, and must be replaced with real paginated server results. Do not treat fake `@learners.example` addresses as actual user accounts.

This screen is read-only: no server calls, actual student profiles, authenticated permissions, or real progress analytics are included. API integration and access control must be implemented on the backend.

## Validation

Checked with Chromium at 1440, 834, 390, and 320 CSS pixels. No JavaScript page errors or horizontal overflow detected. Search, filter combinations, selection, details close, pagination, account dropdown, mobile menu, and Escape dismissal tested. The precise Figma card/header geometry was checked against metadata at all three source sizes. Icons reuse the project's Font Awesome component pattern rather than exact Figma vectors.

## Project conventions

Original inclusion markers for the shared instructor sidebar/navbar/footer pattern are preserved. Links point at their existing/planned `eduhub-instructor-*.html` routes and should be reconciled with the app router when integrated.
