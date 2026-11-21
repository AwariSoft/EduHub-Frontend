# EduHub — Instructor Dashboard · New Instructor

Figma source: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=16-16936

Figma reference: 1440 × 1024 desktop new-instructor empty state. The responsive shell follows the previously completed dashboard tablet (834px) and mobile (390px) conventions.

## Open

- Open `eduhub-instructor-dashboard-new-instructor-standalone.html` directly with a browser; it embeds styles and interactions.
- Or open `eduhub-instructor-dashboard-new-instructor.html` alongside `assets/` to reuse separate CSS and JS files. This version includes Bootstrap 5 and Font Awesome 6 CDN links and an offline vendor stylesheet.

## Implemented

- Preserves the shared instructor header/sidebar/footer markers and existing navigation route names.
- Four true zero-data metrics: 0 courses, 0 students, 0 published courses, $0 revenue.
- First-course call to action in the welcome and course empty state; both navigate to `eduhub-instructor-create-course.html` when integrated with earlier pages.
- Three onboarding stages with source-copy explanations and three zero-data activity sections.
- Header account and empty notifications dropdowns, responsive mobile drawer, keyboard-friendly dismissal, working desktop sidebar collapse.
- Course search announces that no courses exist instead of inventing sample results.

## Asset note

The Figma page contains an image fill of a laptop, books and a graduation cap. The original raster could not be reliably downloaded into this local build. An original CSS-based illustration depicting the same subjects is used as a clearly documented approximation, **not the original Figma image asset**. Replace `.learning-art` with the licensed source image when it is available for a pixel-identical match.

## Integration / data

All instructor metrics are Figma reference sample values for a new instructor. The linked destination pages should be supplied by the full EduHub site. Authentication, course creation, review submission and ownership checks require real backend implementation; this ZIP contains a frontend demo only.

Design source: Figma (EduHub link above). CSS library: Bootstrap 5.3.3 (https://getbootstrap.com), Font Awesome Free 6 (https://fontawesome.com).
