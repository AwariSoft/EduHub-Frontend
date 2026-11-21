# EduHub — Admin Workspace — Course Review Details

Figma reference: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-85441
Related Figma decision states: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-88267

## Deliverables

- `eduhub-admin-course-review-details.html`: modular responsive HTML5 using Bootstrap 5 + Font Awesome 6, with local style/script references.
- `eduhub-admin-course-review-details-standalone.html`: portable single-file HTML with all CSS, JS and the placeholder course image embedded. Opens directly in a modern browser offline.
- `assets/css/admin-shell.css`: consistent role-specific EduHub Admin shell shared with the previous Admin Dashboard / Course Approvals deliverables.
- `assets/css/admin-course-review-details.css`: route-specific styles including mobile and tablet Figma layout order.
- `assets/css/vendor-offline.css`: Font Awesome Free CSS/font fallbacks bundled as CSS data assets for offline rendering.
- `assets/js/admin-course-review-details.js`: accessible frontend-only interactions.
- `assets/images/course-sql-server-essentials.jpg`: existing local EduHub course illustration used as a fallback. Note: this is *not* the exact Figma source photograph. The Figma asset could not be fetched into the local runtime.
- `previews/`: desktop/tablet/mobile and approval/rejection state previews.
- `VALIDATION.md`: browser and interaction checks.

## Features

- Original SQL Server Essentials (`CRS-028`) review: detailed course overview, prerequisites, learning objectives, 4 sections, all 12 lessons with lengths, submission metadata, and instructor card.
- Four independently expandable/collapsible curriculum sections.
- All 12 `View lesson` controls open an accessible local preview dialog. No actual media source is bundled; the dialog states this explicitly.
- Approve Course: confirmation dialog, result badge and success notice. Approval **does not automatically publish** the course.
- Reject Course: confirmation dialog; mandatory written reason and field error; saved reason displayed on the local result state.
- `Reset demo decision` restores the original Pending state, without any external operation.
- Account dropdown, notifications, mobile menu, workspace search with current-course handling, and instructor detail preview.
- ESC/cancel support and focus wrapping in dialogs.

## Integration

Place the modular HTML and `assets/` in your EduHub frontend structure, merging the shared Admin shell files as needed. The `<!-- INCLUDE: partials/... -->` markers identify integration points; the page includes working fallback markup while the partials are not assembled. The Back to Course Approvals link expects `eduhub-admin-course-approvals.html` to be present alongside this page, from the previously completed screen.

This is a **frontend-only demonstration** using the original Figma sample data. There is no backend API, approval persistence, real student availability change, streaming lesson playback, or account database write. For production integrate with ASP.NET Core role/ownership checks, secured admin APIs, a stable course ID, a course review audit log, storage, and antiforgery controls as appropriate.

### Design note

Pixel layout: Desktop artboard 1440×2799; tablet 834×3954; mobile 390×4198. The mobile rendered page matches 4198px exactly. Differences in image source and font availability can affect exact pixels.
