# EduHub — Admin Workspace — Course Approvals · Table States

Figma source: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-87742

This deliverable is the **supporting-state reference sheet**, not a duplicate Admin shell screen. It follows the original Figma layout with the three states visible together:

1. **Loading**: standard seven-column header, four 82px skeleton rows, 65px filter controls displayed in their loading/disabled state, status copy and a loading footer. No artificial delay or fictitious API response is implemented.
2. **Empty dataset**: zero course submissions, ordinary unfiltered search controls, a centered book illustration, and the message distinguishing a truly empty queue from filtered search results. Filters can be changed, but they cannot conjure records into an empty dataset.
3. **No search results**: original `Rust for Data Science` query, Pending status, October 1–30 date filter, no-results icon and explanatory text. **Clear Search** preserves the other filters and reveals the three matching Pending courses; **Reset Filters** resets all controls and reveals the six sample rows from the existing Course Approvals screen. Further search/status/date filtering works with these six rows only.

## Files

- `eduhub-admin-course-approvals-table-states.html` — modular HTML; links `assets/css/` and `assets/js/` files.
- `eduhub-admin-course-approvals-table-states-standalone.html` — single HTML containing CSS, behavior and SVG icon paths. Internet-free rendering works even if Bootstrap and Font Awesome CDN connections fail.
- `assets/css/admin-course-approvals-table-states.css` — scoped reusable component and responsive styles.
- `assets/js/admin-course-approvals-table-states.js` — safe, testable client-side filter/sample-state behavior.
- `assets/js/fontawesome-svg-icons.js` — Font Awesome 6 Free SVG paths for offline display, **without font binary files**.
- `related/eduhub-admin-course-approvals.html` — optional linked copy of the earlier Course Approvals page, including its local images and dependencies; the displayed sample rows link here.
- `previews/` — screenshots at 1120px Figma reference width, desktop 1440px, tablet 834px, mobile 390px; plus interaction previews.
- `test_browser.py`, `validation-results.json`, `VALIDATION.md` — reproducible tests and verification notes.

## Integration

Open either HTML file in a browser. When integrating into the main EduHub application, lift any `<section data-table-state="...">` into the Course Approvals content area. The three sections deliberately share base field and table styles. Keep the Figma separation between an **empty dataset** (zero records from backend) and **no-results** (records exist but filters return none).

Use `data-table-state="loading"`, `data-table-state="empty"`, and `data-table-state="no-results"` to target the desired state in application logic. The helper `window.EduHubApprovalTableStates` exposes `getMatches()`, `render()`, `reset()`, and the `sampleCount` of six. Replace those six fixture records with actual authorized API data in production.

Bootstrap 5 and Font Awesome 6 CDN references are included per the project's frontend stack. Custom CSS and SVG icons provide a local fallback when offline. No backend calls, account mutations, or approvals are performed by this sheet.

## Design fidelity

At a **1120px wide viewport**, the supporting-state sheet measures **1881px high** exactly. Figma panel geometry is preserved:

| State | Top | Height |
| --- | ---: | ---: |
| Loading | 228px | 605px |
| Empty dataset | 865px | 453px |
| No search results | 1350px | 491px |

The source Figma's two visual icons for the empty/no-results treatments are reproduced as equivalent inline vector outlines. The brand/search icons use Font Awesome 6 Free SVG shapes; this avoids distributing proprietary font files. The original Figma is the design authority.
