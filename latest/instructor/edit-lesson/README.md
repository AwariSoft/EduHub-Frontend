# EduHub — Instructor Workspace: Edit Lesson

## Deliverable
`eduhub-instructor-edit-lesson.html` is a single responsive HTML document that integrates Bootstrap 5 styles, Font Awesome 6 icons, and the page's JavaScript. It uses the existing EduHub instructor workspace layout and includes Navbar/Sidebar/Footer inclusion markers.

## Figma screens
- Desktop (1440 × 1856): https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=18-58772
- Tablet (834 × 1860): https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=18-58894
- Mobile (390 × 2280): https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=18-59012

## Features
- Prepopulates the "Variables and Data Types" lesson in "C# Fundamentals" with description, order 1, duration 18:30, and existing lesson video metadata.
- Honors `?lesson=fund0` or `?lessonId=fund0` query parameters to select another lesson from local curriculum data.
- Edit title, description, section, lesson order, duration; validate required fields.
- Saved video state, optional replacement of a local video file (MP4/MOV/WebM up to 500 MB), local browser preview when supported, and remove-video confirmation.
- Displays two existing resource entries, selected-resource removal, and additional resource attachments (PDF/DOCX/PPTX/ZIP, up to 25 MB each).
- Save edits to the existing lesson record (rather than creating another one) using localStorage key `eduhub-instructor-curriculum-csharp-v1`; record the local save in `eduhub-instructor-lesson-edits-csharp-v1`.
- Cancel confirmation, user menu, notification menu, mobile drawer, search route, full desktop sidebar, compact tablet rail and mobile bottom navigation.
- Existing approved content remains a separate backend responsibility; changes made in this screen are **local drafts only**.

## Asset limitation and production integration
The Figma temporary image endpoint was inaccessible in this runtime. The saved-video frame uses a bundled, visually similar illustrative coding image instead of the exact Figma poster. The original video bytes and two resource file bytes are **not available**; the screen displays their metadata and the saved-video play button explains that backend playback is required. New uploaded files stay in the current browser session and must be uploaded to persistent backend storage separately. Neither this screen nor the demo confirmation submits an actual revision for administrator approval.

## Included files
- `eduhub-instructor-edit-lesson.html`: standalone working document.
- `css/edit-lesson.css`: extracted custom page CSS for integrating into the shared project stylesheet.
- `js/edit-lesson.js`: extracted interaction logic for integration into the shared project JS.
- `assets/video-poster-fallback.jpg`: illustrative video placeholder.
- `previews/`: screenshots at 1440, 834, 390, 320 pixels.

## Validation
Chromium browser checks at 1440px, 834px, 390px and 320px: all had `scrollWidth === viewport width` and no page JavaScript errors. Desktop, tablet, and 390px mobile heights match the Figma canvas heights. Tests also exercised resource removal, replacement-video selection, empty-title validation, cancel confirmation, missing-video validation, local save updating the existing lesson, and mobile navigation drawer.
