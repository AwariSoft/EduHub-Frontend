# EduHub — Instructor Dashboard · Original Design

Figma source: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=16-16621

Reference frames:
- Desktop: `16:16621` (1440 × 1024)
- Tablet: `16:17076` (834 × 1971)
- Mobile: `16:17387` (390 × 3190)

## Open

- Open `eduhub-instructor-dashboard-original-design-standalone.html` in any modern browser for a complete offline demo.
- Or open `eduhub-instructor-dashboard-original-design.html` and retain its accompanying `assets/` folder.

The normal version references Bootstrap 5 and Font Awesome 6 via CDN and includes a local vendor fallback stylesheet for offline rendering. It retains `<!-- INCLUDE: partials/... -->` markers for integration with the other instructor screens.

## Functional behavior

- Course search filters the four visible cards, updates the count and empty state.
- Course Performance selector changes chart points, headings and labels (sample data).
- Instructor profile and notification menus toggle, close via outside click and Escape.
- Desktop sidebar collapses; tablet and mobile navigation operate through the responsive shell.
- Primary actions link to the corresponding instructor pages previously created (filenames match the earlier EduHub deliverables).

## Visual assets

The original frame contains four photographic thumbnails. Figma's asset service returned time-limited raw image URLs but they were not accessible from the local build environment. The bundled 320×240 illustrated thumbnail fallbacks are extracted from the earlier EduHub My Courses implementation. These make the page display fully offline, but they are **not exact matches** to the Figma photographs. Original photographic source URLs are retained as `data-figma-photo-source` attributes for reference only.

The dashboard's values are **design sample data**, not live totals. Authentication and role/ownership authorization must be enforced server-side.

## Files

- `eduhub-instructor-dashboard-original-design.html`: modular HTML page
- `eduhub-instructor-dashboard-original-design-standalone.html`: offline, self-contained HTML page
- `assets/css/main.css`: reusable design styling
- `assets/css/vendor-offline.css`: offline Bootstrap and icon font fallback
- `assets/js/main.js`: interactions
- `assets/images/*.jpg`: local illustrative fallback thumbnails
- `previews/`: responsive browser captures
- `VALIDATION.md`: browser test report
