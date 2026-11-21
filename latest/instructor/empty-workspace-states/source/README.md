# EduHub — Instructor Workspace / Empty Workspace States

## Source
Figma state board 18:61646 (1440 × 1140).
https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=18-61646

## Deliverables
- `eduhub-instructor-empty-workspace-states.html`: self-contained responsive HTML with locally embedded Bootstrap 5 and Font Awesome 6 styles/fonts. No internet connection required for core rendering.
- `source/index.html`: HTML5 semantics using linked `style.css`/`app.js` and Bootstrap/Font Awesome CDNs.
- `source/style.css`: reusable extracted Bootstrap/Font Awesome asset foundations plus custom design-matched styles.
- `source/app.js`: demo public-course preview dialog with keyboard focus management.
- `previews/`: full-page 1440/834/390/320 screenshots.
- `validation.json`: measured browser layout and interaction results.

## Four zero-data states
1. My Courses — No courses, with Create Your First Course action.
2. My Students — No enrolled students, with a non-live public course preview notice.
3. Course Analytics — No analytics; 0 enrollments, $0 revenue, 0% completion; Create New Course action.
4. Notifications — No notifications; Back to Dashboard, and Settings link.

## Intended navigation
Open the standalone HTML in a directory containing these previously implemented routes:
- `eduhub-instructor-create-course.html`
- `eduhub-instructor-dashboard.html`
- `eduhub-instructor-settings.html`
- `eduhub-instructor-course-details-overview.html`

The live public course route is not provided by this Figma board; its action opens a clearly labeled preview instead of making a false availability claim.

## Implementation notes
- The original Figma SVG icon assets are inaccessible from this environment; visually similar Font Awesome 6 icons are substituted. Icons are included in the standalone HTML through embedded font CSS.
- These four cards represent independent UI states. They are not actual course/student/backend data, and they do not create demo records or fabricated analytics.
- Original Figma 1440 × 1140 geometry matches: brand y40, heading y106, upper cards y201 (668 × 423 each), lower cards y656 (668 × 438 / 444).
- Tablet and mobile layouts are responsive adaptations, since the Figma board has only a desktop frame.
- All navigation target files must be placed together to work as a multi-screen prototype. Backend integration is separate.
