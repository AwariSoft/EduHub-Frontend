# EduHub — Instructor Workspace — Dialogs and Curriculum States

**Figma source:** https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=18-61912  
**Design reference frame:** `18:61912` · 1440 × 1591 px  
**Implementation stack:** HTML5, Bootstrap 5.3.3, Font Awesome 6.7.2, Inter and vanilla JavaScript.

## Quick start

- Open `eduhub-instructor-dialogs-curriculum-states-standalone.html` in a browser: offline demo with bundled visual CSS and JavaScript.
- Alternatively, serve this folder from a local web server, then open `eduhub-instructor-dialogs-curriculum-states.html`. That version uses the CDN versions of Bootstrap, Font Awesome and Inter and the modular `assets/css/main.css` and `assets/js/main.js` files.
- Both pages are reference/component showcases. The existing instructor workspace pages retain shared `partials/instructor-sidebar.html`, `partials/instructor-topbar.html`, and `partials/footer.html` markers. The page does not duplicate those layout components.

## Design states implemented

| Original Figma state | Behavior in frontend demo |
|---|---|
| Delete Course? | Cancel or confirm; no real course removal. |
| Permanently delete your account? | Case-sensitive `DELETE` entry enables the danger action; no actual deletion/sign-out. |
| Add New Section | Required title/order validation; adds a section to the in-browser curriculum preview. |
| Edit Section | Validates title/order, preserves the named 3 lessons, updates the preview display. |
| Change Password | Show/hide all three password fields; required, strength, difference and matching validation; no credential persistence/transmission. |
| Curriculum section · Collapsed | Expand/collapse with accessible `aria-expanded`, 3 preserved lessons, edit entry point, and a deletion confirmation modal. |
| Cancel confirmation | Keep Editing focuses the form; Discard Changes restores unsaved input values. |

## Interaction and safety

This is a **frontend demonstration**. Course deletion, account deletion, password changes and backend persistence require server endpoints, authorization, CSRF protection, optimistic-state handling, and audit logging. This bundle never performs destructive server operations. Section changes exist only within the open browser page; a refresh resets them.

The page dispatches integration events on `document`:

- `eduhub:delete-course-preview`
- `eduhub:delete-account-preview`
- `eduhub:section-added`
- `eduhub:section-updated`
- `eduhub:section-deleted`
- `eduhub:password-validation`
- `eduhub:changes-discarded`

All emitted mutation details identify preview-only operations. For real integration, connect the instructor API at the relevant event handlers and preserve role-based backend authorization.

## Responsive states

The CSS matches the two-column Figma layout at desktop widths and stacks cards at tablet and mobile widths. Built-in labels, keyboard-reachable inputs, expandable sections, visible focus rings, and danger confirmations were retained. The `previews/` directory includes captured 1440px, 834px and 390px screenshots.

## Files

- `eduhub-instructor-dialogs-curriculum-states.html`: editable modular page
- `assets/css/main.css`: scoped CSS and shared UI primitives
- `assets/js/main.js`: UI behavior and validation
- `eduhub-instructor-dialogs-curriculum-states-standalone.html`: single-file offline rendering
- `previews/`: screenshots at three viewport widths
- `VALIDATION.md`, `validation-results.json`, `interaction-results.json`: verification evidence
- `validate.py` and `interaction_tests.py`: reproducible Playwright checks
- `build_standalone.py`: offline bundling helper (uses the local prior EduHub CSS snapshot; optional for runtime)

## Visual references and libraries

- [EduHub Figma source — Dialogs and curriculum states](https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=18-61912)
- [Bootstrap v5.3](https://getbootstrap.com/docs/5.3/)
- [Font Awesome](https://fontawesome.com/docs/web/setup/get-started)
- [Inter](https://rsms.me/inter/)
