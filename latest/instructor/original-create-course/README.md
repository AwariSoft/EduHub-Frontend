# EduHub — Instructor Workspace: Original Create Course

Implemented from the original Figma artboard **16:17667**, not the later redesigned Create Course frame 18:56939.

Figma reference: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=16-17667

## How to open

- **Standalone:** open `eduhub-instructor-original-create-course-standalone.html` in a browser. It has inline CSS, Font Awesome font data, and JavaScript.
- **Modular:** open `eduhub-instructor-original-create-course.html` with the `assets/` directory beside it. It uses Bootstrap 5 and Font Awesome 6 CDNs, as requested, with offline-safe CSS and Font Awesome data bundled.
- **Integrating:** point your app's `Create Course` route to the modular HTML file. Replace the `<!-- INCLUDE: partials/... -->` markers with your template includes if your build system uses a shared sidebar and topbar.

## Features

- 232px desktop sidebar, 72px header, breadcrumb, 784px form column, 336px review rail and original Figma card hierarchy.
- Course title, category, USD price, rich-text description, level and language.
- JPG/PNG thumbnail chooser and drag/drop: maximum 5 MB, preview, replace/remove.
- Optional introductory MP4 selection: maximum 500 MB.
- Add, edit, reorder and remove curriculum sections; add and remove lessons with durations and MP4 file metadata.
- Live checklist and submission validation, accessible dialog confirmation, field errors and focus handling.
- Local draft save via localStorage, without pretending to save data to a server.
- Responsive 1440px, 834px, 390px and 320px layouts; account and notification menus, mobile drawer, collapsible sidebar and focus-visible states.

## Important

**All actions are frontend-only demonstrations.** The app neither uploads files to a server nor creates/submits a course in the actual EduHub backend. LocalStorage preserves text and curriculum metadata only; uploaded files must be selected again on reload. Server-side validation, ownership enforcement and upload persistence are required in production.

## Contents

`eduhub-instructor-original-create-course.html` — modular page

`eduhub-instructor-original-create-course-standalone.html` — single-file demo

`assets/css/main.css` — responsive page styling

`assets/css/vendor-offline.css` — original Font Awesome Free offline stylesheet

`assets/js/main.js` — UI behavior

`previews/` — tested responsive screenshots

`VALIDATION.md`, `validation-results.json` — browser test results
