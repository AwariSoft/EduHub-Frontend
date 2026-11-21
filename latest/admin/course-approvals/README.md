# EduHub — Admin Workspace: Course Approvals

**Source:** [Figma Course Approvals — Desktop](https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-84906)  
**Tablet:** node `26:85114` · **Mobile:** node `26:85286`

## Run

- Open `eduhub-admin-course-approvals-standalone.html` in any modern browser for a single-file offline demonstration.
- To integrate with the existing EduHub pages, use `eduhub-admin-course-approvals.html` and retain its `assets/` folder at the same relative path.
- Add the page alongside `eduhub-admin-dashboard.html`; navigation uses the same filename and admin-only sidebar conventions as the previous screen.
- CDN declarations for Bootstrap 5.3.3 and Font Awesome 6.7.2 are present in the modular page. Local vendor CSS is included as a fallback.

## Layout and responsive behavior

- Desktop (`1440px`): 232px admin sidebar, three summary cards, seven-column list table.
- Tablet (`834px`): 76px icon rail and two-column course-card list.
- Mobile (`390px`): compact header with mobile sidebar, single-column course list, touch-friendly filters.
- Also checked for overflow at `320px`.

## Implemented UI

- Figma sample platform totals: **6 pending, 38 approved, 3 rejected** (47 submissions; one additional draft excluded from the queue).
- Six visible, named course submissions are reproduced in their exact reference order.
- Search by course title or instructor, global search, status filter, date range filter, custom date range, and no-results state.
- Pagination buttons: the next-page preview explicitly explains that only six of the 47 submissions were supplied by the design. **Additional course records are not fabricated**.
- Review modal presents the selected course's details and status. On pending courses, demo-only approval and rejection confirmations update the visible sample record and summary counts. Rejection requires an explanatory reason (minimum 10 characters). No API request is sent.
- Notifications, account menu, mobile navigation drawer and search overlay, keyboard Escape handling, focusable dialog controls.

## Important limitations

- All sample records and status changes are **frontend-only**; approvals and rejections do not alter any real course. Refreshing resets the demo state.
- The original Figma thumbnail-photo asset URLs could not be fetched from the runtime. Local EduHub illustrations reused from the earlier dashboard are provided as substitutes, not exact photographic matches.
- Exact typography depends on system/browser font availability; fonts are not distributed as separate files.
- Other admin pages (User Management, Payments, Review Course) remain separate deliverables.

## Structure

```
eduhub-admin-course-approvals.html                    Modular page
eduhub-admin-course-approvals-standalone.html         Offline single-file page
assets/css/admin-shell.css                            Shared admin navigation and UI styles
assets/css/admin-course-approvals.css                 Page styles and responsive breakpoints
assets/css/vendor-offline.css                         Bootstrap/Font Awesome fallback styling
assets/js/admin-course-approvals.js                    UI controls and local demo state
assets/images/*.jpg                                    Six course illustrations
previews/{1440,834,390,320}px.png                    Responsive screenshots
validation-results.json                               Browser checks
VALIDATION.md                                         Test summary
```

## Include markers

- `<!-- INCLUDE: partials/admin-sidebar.html -->`
- `<!-- INCLUDE: partials/admin-topbar.html -->`
- `<!-- INCLUDE: partials/admin-footer.html -->`

The page contains functional fallback markup adjacent to these markers. When integrating partials, remove duplicate fallback blocks after replacing markers.
