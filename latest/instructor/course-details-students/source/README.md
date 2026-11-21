# EduHub — Instructor Course Details / Students

Figma: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=18-61263

## Files
- `index.html`, `style.css`, `app.js` — separated source version
- `eduhub-instructor-course-details-students.html` — standalone single-file version (provided separately and in ZIP)
- `assets/course-thumbnail-fallback.jpg` — fallback art for the inaccessible Figma source photography

## Features
- Bootstrap 5, Font Awesome 6, accessible sample student directory
- Text search, learning-status filters, read-only student details modal
- Desktop Figma source at 1440x1300; tablet/mobile responsive adaptations
- 320/230/72/18 course totals are Figma demo data; 3 explicitly sample records are displayed, not an API-backed directory
- No pagination navigation is claimed; Figma lists Page 1 of 107 but provides only 3 sample records
- Header, mobile drawer, account controls shared with previous instructor screens
- Real authentication/permissions, full enrollment dataset, and live progress APIs require backend integration

All external CDN references are supplementary. Inline Bootstrap and Font Awesome CSS are included for offline rendering of the standalone version.
