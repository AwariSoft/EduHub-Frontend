# EduHub — Instructor Workspace: Original Edit Course

**Source:** [Figma frame 16:17891](https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=16-17891)

An HTML5 / Bootstrap 5 / Font Awesome 6 frontend implementation of the original *Edit Course* instructor workspace. This is distinct from the later revised Edit Course design.

## Running locally

- **Standalone:** open `eduhub-instructor-original-edit-course-standalone.html` in a browser. CSS, JavaScript, offline Bootstrap/Font Awesome styling and the image fallback are embedded.
- **Modular:** open `eduhub-instructor-original-edit-course.html` alongside `assets/css/`, `assets/js/` and `assets/images/` using a local server or file URL. CDN references appear as progressive enhancements; `assets/css/vendor-offline.css` supplies offline fallbacks.
- Replace the `<!-- INCLUDE: partials/... -->` markers during integration to use the shared EduHub navbar/sidebar. The modular file includes working fallback markup.
- Navigation links reference the previously built EduHub instructor pages. Those files are not included in this page-specific bundle.

## Reference content and interactions

- Prefilled “JavaScript for Beginners” draft, Programming, $35, Beginner, English.
- Original course description, 3 expanded sections and 6 sample lessons with video durations.
- Existing course thumbnail metadata and uploaded intro-video metadata.
- Change course fields; format the course description; save browser-local edits.
- Replace or remove a thumbnail, select a different introductory video, with file-type/size validation.
- Add or edit sections and lessons. Collapse/expand sections; drag to reorder; use the section order field as a non-drag alternative; open lesson action menus and remove lessons with a confirmation.
- Live course summary and readiness checklist; required-field validation and a safe “Submit for Approval” confirmation demo.
- Responsive sidebar, mobile drawer, profile menu and notifications.

## Important scope limitations

This is a **frontend prototype**. It does not send changes, files, approval requests or account information to a server. The sample instructor and course data come from the Figma frame. Text and curriculum metadata can be saved in browser `localStorage` (key: `eduhub:original-edit-course:javascript-beginners:v1`), but actual selected media file bytes are not persisted. API/ASP.NET backend role and ownership validation will be required before production deployment.

**Visual exception:** The Figma frame uses a photographic laptop thumbnail. The exact image asset was not available as a reusable local file in this environment. The project uses an existing EduHub coding illustration as a local, offline-safe placeholder. Replace `assets/images/javascript-course-thumbnail.jpg` with the original approved project asset for exact imagery.

## Files

- `eduhub-instructor-original-edit-course.html` — modular page
- `eduhub-instructor-original-edit-course-standalone.html` — single-file demo
- `assets/css/main.css` — reusable styles, responsiveness, and state styling
- `assets/css/vendor-offline.css` — offline Bootstrap / Font Awesome stylesheet
- `assets/js/main.js` — frontend interactions
- `assets/images/javascript-course-thumbnail.jpg` — placeholder image
- `previews/*.png` — tested viewport screenshots
- `VALIDATION.md`, `validation-results.json`, `complete-flow-results.json` — test evidence

## Original source geometry

Figma target desktop: 1440 × 1980. The tested implementation placed its main panels at y=219, 855, 1206 (≈1px above target y=220, 856, 1207) and matched their heights exactly: 612, 327, 636 pixels. Responsive variants follow the prior instructor workspace conventions.
