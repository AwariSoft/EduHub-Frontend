# EduHub — Instructor Course Details: Curriculum

Source: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=18-61119
Figma Desktop viewport: 1440 × 1770.

## Open
- Open `eduhub-instructor-course-details-curriculum.html` directly for a standalone version (Bootstrap and Font Awesome are bundled inline in CSS).
- Or open `index.html` in this ZIP, using `css/styles.css` and `js/main.js` for the same functionality.

## Screen content
- Published C# course hero and instructor navigation (shared with Course Details Overview)
- Curriculum tab, 3 sections, 9 video lessons, 2h 12m 50s total video duration
- Keyboard accessible independent accordion controls, lesson details dialog, course management actions and responsive navigation

## Limitations
- Demo data. Real course, lesson and authentication APIs are not connected.
- `View Public Course` is an honest placeholder notice, not a pretend working student page.
- This read-only published view does not mutate lessons. Reordering/editing belongs to the existing Manage Curriculum page.
- The original Figma course photo asset could not be downloaded in the current environment; an existing bundled fallback thumbnail from the EduHub Course Details Overview implementation is included instead.
- Other tabs depend on their separate screen implementations.

## Existing linked routes
- eduhub-instructor-course-details-overview.html
- eduhub-instructor-course-curriculum.html
- eduhub-instructor-edit-course.html
- eduhub-instructor-edit-lesson.html
- eduhub-instructor-course-details-students.html (upcoming)
- eduhub-instructor-course-details-analytics.html (upcoming)

## Viewport testing
Desktop: 1440px; Tablet: 834px; Mobile: 390px and 320px.
