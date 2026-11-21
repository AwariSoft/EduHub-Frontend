# EduHub — Instructor Workspace: Menus, Uploads and Form States

**Figma source:** [EduHub / Menus, uploads and form states (node `18:61713`)](https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=18-61713)

This deliverable is the **supporting UI-state reference** after *Empty Workspace States*, not an additional instructor navigation route. It reproduces all 12 Figma reference cards in one responsive board and provides vanilla JavaScript interactions for the reusable controls. It follows the project's HTML5, Bootstrap 5, Font Awesome 6, and Inter conventions.

## Open / install

- **Offline, single-file version**: `eduhub-instructor-menus-uploads-form-states-standalone.html`. Open in any modern browser; CSS, icon font, JavaScript, and placeholder illustration are embedded.
- **Project source version**: `eduhub-instructor-menus-uploads-form-states.html`, with `assets/css/main.css`, `assets/js/main.js`, and `assets/images/javascript-beginners-placeholder.jpeg` maintained separately. This version includes Bootstrap 5 and Font Awesome 6 via CDN.
- **Visual references**: `previews/1440px.png`, `previews/834px.png`, `previews/390px.png`.

## Screen contents

1. Profile dropdown — open / closed, instructor-only links.
2. Course action dropdown — course details, edit, curriculum, review-confirmation, delete-confirmation.
3. Pending Approval / Published submission guard states.
4. Notifications empty popover with close/reopen.
5. Course status, category, period, and enrollment-date filters, including custom date range.
6. Video upload progress/cancel and error/file-replacement states; size/type checks (500 MB, MP4/MOV/WebM).
7. Thumbnail preview, file replacement, remove and drag/drop (PNG/JPEG, 5 MB for the demo).
8. Free/Paid pricing conditional controls.
9. Course title validation (`>=5` characters).
10. Saved success guidance and lesson duration validation (`mm:ss`, >00:00).

## Where to integrate individual components

| Existing instructor screen | Reusable states |
|---|---|
| Instructor topbar, My Profile, Settings | Profile dropdown, notifications popover |
| My Courses, Course Details / Overview | Course action menu, submit eligibility, course status filter |
| Dashboard, Course Analytics | Period menu |
| My Students | Enrollment date menu / custom range |
| Create Course, Edit Course | Thumbnail replacement, free/paid pricing, title validation, save confirmation |
| Add Lesson, Edit Lesson | Video upload progress and errors, duration validation |

Retain the established parent-page layout markers:

```html
<!-- INCLUDE: partials/instructor-sidebar.html -->
<!-- INCLUDE: partials/instructor-topbar.html -->
<!-- INCLUDE: partials/footer.html -->
```

The stateboard deliberately does not clone the instructor shell. In production, copy / compose the named `.ed-card`, `.ed-menu`, `.ed-guidance`, `.ed-badge`, and `.ed-input` pieces into the relevant parent screen, merging `assets/css/main.css` and `assets/js/main.js` once at app level.

## Behavioral and fidelity notes

- **Frontend-only behavior**: Modal confirmations, review-submission, delete, filters, and simulated upload progress do not call a backend. They expose the expected frontend state and UI events, suitable for API integration. No deletion or upload is falsely reported as persisted.
- **Thumbnail source limitation**: The Figma board contains a photographic image fill. Its raw binary was not available for this implementation package, so a **local illustration from the previously implemented EduHub Edit Course screen** is used as a placeholder. All thumbnail replacement/drag-and-drop interactions work. Swap `assets/images/javascript-beginners-placeholder.jpeg` for the original approved design asset when available to achieve exact image fidelity.
- **Colors and typography**: Source palette `#f8fafc`, `#ffffff`, `#e2e8f0`, `#2563eb`, `#0f172a`, `#64748b`, plus matching feedback colors; design measures inspected directly in Figma.
- **Accessibility**: Native interactive controls, visible focus indicators, form feedback, ARIA-expanded/pressed/invalid/progress attributes, label associations, and modal focus/escape behavior.
- **Progress UI**: 64% is the intentionally rendered Figma initial sample; selecting a new allowed video starts a clearly labeled local progress simulation.
- **Keyboard interaction**: Enter/Space works for thumbnail dropzone. Ctrl/Cmd+Enter runs demo validation and focuses the first invalid text field.

## Verification

Checked in headless Chromium at **1440**, **834**, and **390** CSS pixels. No horizontal overflow, broken local image, or JavaScript exception was observed. Passed interaction tests for filters, pricing, inputs, notifications, dialogs, upload cancel/reselect, and thumbnail replacement/removal. See `VALIDATION.md` and `validation-results.json`.

## References

- [Figma: original EduHub reference frame](https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=18-61713)
- [Bootstrap 5.3 documentation](https://getbootstrap.com/docs/5.3/)
- [Font Awesome 6 icons](https://fontawesome.com/icons)
- [MDN: Drag and Drop File API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop)
