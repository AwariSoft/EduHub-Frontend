# EduHub — Instructor Course Approval States

Reference: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=18-61572

State board (desktop 1440 × 1144). The design contains 4 states: Draft, Pending Approval, Rejected, Published. At smaller viewports, 2-column grid stacks vertically.

`index.html` references `style.css` and `app.js`; the standalone HTML at parent level embeds the complete CSS and JS including Bootstrap 5 & Font Awesome 6 styling for offline appearance. CDN stylesheets are included for standard integration. No font files are bundled.

Navigation:
- Continue Editing, Edit Course route to existing instructor edit-course screen. `?course=` identifies a target course but the current editor uses sample data until application routing is integrated.
- Manage Curriculum routes to existing instructor curriculum screen.
- View Public Course opens a clearly marked prototype modal (no live public link established).
- Submit for Review and Resubmit for Review are correctly disabled per the Figma state board.

State data and dates are illustrative. Only backend/admin approval can publish courses. The branded cap and guidance icons use embedded Font Awesome equivalents because Figma asset URLs were unreachable from the file environment; original design vectors are not bundled.
