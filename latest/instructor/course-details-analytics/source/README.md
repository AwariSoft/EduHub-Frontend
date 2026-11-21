# EduHub — Instructor Course Details / Analytics

Figma source: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=18-61397

## Run
Open `index.html` directly or serve the folder with a static server. The single-file `eduhub-instructor-course-details-analytics.html` is also provided. Bootstrap 5 and Font Awesome 6 styles are reused from the existing EduHub instructor implementation.

## Interactive features
- All Time, Last 3 Months, and Last Month reporting-period dropdown.
- Enrollment and revenue charts dynamically update with the selected illustrative monthly data.
- Headline enrollment and revenue totals update with period selection.
- Navigation links, instructor account menu, mobile drawer, and search are preserved.

## Data fidelity and limitations
- All Time shows Figma values: 320 enrollments, $1,800 revenue, 72% course completion, 9 lessons.
- Completion by section: 96%, 82%, 72%; status counts: 230 completed, 72 in progress, 18 not started.
- Monthly data are *illustrative* to enable chart interaction. Only the aggregate values and charts are explicitly shown in Figma.
- Completion rate and section status are always all-time statistics even when the period is changed.
- The source Figma photograph was not retrievable in this environment. The existing bundled thumbnail fallback is reused. All UI content is frontend-only; API integrations and access authorization remain to be completed.
- Desktop Figma frame is 1440 × 1685; tablet and mobile are responsive adaptations, not separate Figma frames.
