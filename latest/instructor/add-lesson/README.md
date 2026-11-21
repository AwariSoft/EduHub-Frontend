# EduHub — Instructor Workspace / Add Lesson

Source design: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub
- Desktop frame: node 18:58461 (1440 × 1614)
- Tablet frame: node 18:58569 (834 × 1618)
- Mobile frame: node 18:58673 (390 × 2003)

## How to run
Open `eduhub-instructor-add-lesson.html` in your browser. This is a standalone HTML page with bundled Bootstrap 5 / Font Awesome 6 CSS and inline behavior. Links to other instructor screens use relative `eduhub-instructor-*.html` routes.

The `css/` and `js/` files are extracted modular copies of this screen's custom styles and scripts for integration. The standalone HTML already includes them; do not load both the embedded and modular versions simultaneously.

## Features
- Desktop full sidebar; tablet icon rail; mobile header, drawer and fixed bottom nav
- Required title, section, order, duration validation
- MP4, MOV or WebM upload (maximum 500 MB), drag/drop, local video preview and duration detection when browser supports it
- Optional PDFs, DOCX, PPTX and ZIP attachments (maximum 25 MB per file); ability to remove selected resources
- Cancel confirmation and keyboard-accessible save dialog
- On successful save, lesson **metadata** is stored to browser localStorage under the shared `eduhub-instructor-curriculum-csharp-v1` key and will appear on the Course Curriculum screen under the relevant section

## Important integration boundaries
The video and resource *files* are not persisted or transmitted: object URLs are only in-memory browser previews. Only filenames, sizes and lesson metadata are saved locally. Actual upload storage, backend save, admin review/publishing, authentication and persistence across devices must be implemented server-side. Published lessons should remain unchanged until any requisite review occurs.

Using an iframe or a strict browser sandbox where localStorage is unavailable can prevent local draft persistence. The page will report this error rather than silently claiming success.

Shared partial markers are included:
- `<!-- INCLUDE: partials/instructor-sidebar.html -->`
- `<!-- INCLUDE: partials/instructor-topbar.html -->`
- `<!-- INCLUDE: partials/instructor-mobile-navigation.html -->`

## Validation
Checked in Chromium at 1440px, 834px, 390px and 320px: no horizontal overflow, no runtime script errors. Verified required-field errors, upload selection, cancel dialog, mobile drawer and local save with test storage.
