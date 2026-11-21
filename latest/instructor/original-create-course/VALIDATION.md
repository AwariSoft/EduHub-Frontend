# Validation — EduHub Instructor Workspace: Original Create Course

Reference: [EduHub Figma — original Create Course, frame 16:17667](https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=16-17667)

## Responsive browser checks

Automated Chromium rendering was run with the complete standalone HTML provided through `page.set_content`, because this sandbox blocks file:// and localhost navigation. The same CSS and JavaScript ship as separate files and inline in the standalone file.

| Width | Horizontal overflow | JavaScript exceptions | Result |
|---|---|---|---|
| 1440px | No | 0 | PASS |
| 834px | No | 0 | PASS |
| 390px | No | 0 | PASS |
| 320px | No | 0 | PASS |

## Interaction checks

11/11 interaction checks passed, including:

- [x] initial-section
- [x] add-section
- [x] add-lesson
- [x] edit-section
- [x] draft-save
- [x] draft-data
- [x] submission-incomplete-guard
- [x] account-menu
- [x] notifications
- [x] collapsed-sidebar
- [x] no-js-errors

## Complete submission simulation

- 4/4 checklist items satisfied after entering a valid course, uploading a test PNG and adding an MP4 lesson.
- Confirmation modal appeared after all conditions were satisfied.
- Confirmation changed the display to **Ready for review (demo)**; **no backend request was sent**.
- No JavaScript errors were reported.

## Important scope limitations

- Screen data and actions are a browser-only prototype; server-side access control, course persistence and admin review must be implemented in the ASP.NET backend.
- Draft text and curriculum are saved using `localStorage` when available. Binary uploads are deliberately not saved; they must be reselected after reload. Previously selected lesson MP4 flags are reset on restoration.
- Browser-native `contenteditable` editor commands are supported as a simple demonstration, not a production rich-text content pipeline.
- Existing destination pages are links to other EduHub HTML files and work when integrated into the full project.
- The original design uses no external raster illustrations for this frame, so no image substitutions were necessary; icons use Font Awesome 6 equivalents.
