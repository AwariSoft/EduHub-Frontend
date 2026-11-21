# CSS refactor and interaction audit

## Coverage

- 14 source ZIP archives, 138 source HTML exports
- 74 HTML page files (including 32 QA-only state galleries)
- 5 existing card-variant classes migrated to `edu-ui-card` (five class names)
- 66 applied file/property Bootstrap utility replacements
- 0 adjacent, declaration-identical CSS rule merges
- Reusable `edu-ui-card`, `edu-ui-badge`, `edu-ui-field`, `edu-ui-action`, `edu-ui-lift` components created

## Architecture

The shared `main.css` retains the original token palette and page-specific compatibility rules to avoid breaking previously completed screens. Canonical UI components now own the common card surface and interaction states. Pixel-specific legacy classes are retained where they differ materially from shared tokens. Original CSS is retained as `docs/main.before-refactor.css` for diff and rollback.

### Migrated aliases
- `.edu-curriculum-section` → add `.edu-ui-card` (3 elements across 1 files)
- `.edu-analytics-kpi` → add `.edu-ui-card` (4 elements across 1 files)
- `.edu-analytics-panel` → add `.edu-ui-card` (4 elements across 1 files)
- `.edu-lesson-panel` → add `.edu-ui-card` (3 elements across 1 files)
- `.edu-students__panel` → add `.edu-ui-card` (1 elements across 1 files)

### Consolidation safety

Blindly merging nonadjacent identical CSS blocks can change cascade precedence and break previous screens. This pass merges adjacent declaration-identical rules, factorizes canonical card surfaces, and moves only exact Bootstrap-equivalent declarations into HTML. Specialized card variants, unique badges, and layout-specific hover effects remain as compatibility rules.

## Interactive state coverage

| Target | Hover | Focus-visible | Active | Disabled/reduced motion |
|---|---|---|---|---|
| Links, buttons, Bootstrap `.btn` | Color/brightness or raised state | Primary 3px outline | 1px pressed translation | Bootstrap and `:disabled` |
| Cards (`.edu-ui-card`, `.edu-ui-lift`) | Border/shadow; lift for clickable cards | `:focus-within` primary border | Lift clears on active | Reduced motion supported |
| `.form-control`, `.form-select`, checkboxes | Stronger border | Primary ring / outline | Primary border | Native disabled handling |
| Nav, dropdown, accordion | Bootstrap 5 states plus shared selectors | Primary outline | Bootstrap pressed state | Reduced motion supported |
| Tables and list actions | Soft blue hover | `:focus-within` blue | Blue active state | Parent control semantics |
| Dialogs | Bootstrap modal controls | Keyboard-visible outline | Pressed button | Bootstrap modal focus trap |

**Note:** A CSS pseudo-state audit cannot prove all business interactions are persisted. Authentication, purchase, refund, role changes and profile changes remain backend-neutral demo interactions. They dispatch events for later integration.

## Source fidelity

New screens are semantic, responsive Bootstrap reconstructions from source export text, named headings, media and controls; they are **not pixel-for-pixel recreations** of each Locofy desktop/tablet/mobile export. Exact original HTML/CSS snapshots are in `reference/zip-exports`; text transcripts are in `docs/source-text`. Viewport-only differences are reconciled in the single responsive page, and companion state sheets are attached to their parent pages for QA.

## Navigation audit

Resolved internal link replacements: 28

- `student/my-learning.html → student/dashboard.html#my-learning` (13 occurrence(s))
- `student/my-certificates.html → student/certificate.html` (3 occurrence(s))
- `student/explore-courses.html → public/explore-courses.html` (3 occurrence(s))
- `student/course-details.html → public/explore-courses.html` (4 occurrence(s))
- `student/payment-details.html → admin/payment-details.html` (1 occurrence(s))
- `student/settings.html → student/student-profile.html` (3 occurrence(s))
- `public/help-center.html → public/home.html` (1 occurrence(s))

Unresolved local route references: 1 occurrence(s); see `docs/ROUTE_AUDIT.json` for exact paths. Some remain intentional contract routes awaiting development.

## Compatibility risk and follow-up

1. Run pixel-level checks against the supplied exports before production rollout.
2. Test backend events with authenticated and payment providers; no live mutations are included here.
3. Review any unresolved links in the route audit before deployment.
4. If a migrated rule affects a page variant, compare against `docs/main.before-refactor.css` and use the source snapshots.
