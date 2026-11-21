# Validation — Filters, Profile and Notifications

Source: Figma frame `26:88791` — 1120 × 2139px.

**Browser tests:** 32/32 passed; JavaScript errors: 0.

Viewports tested: 1120px (source), 1440px, 834px, 390px, 320px. All passed without horizontal overflow or script errors.

## Exact 1120px geometry

| Element | Figma x,y | Rendered x,y | Figma size | Rendered size |
|---|---|---|---|---|
| header | 40, 228 | 40, 228 | 1040×390 | 1040×390 |
| course | 40, 650 | 40, 650 | 1040×609 | 1040×609 |
| user | 40, 1291 | 40, 1291 | 1040×365 | 1040×365 |
| payment | 40, 1688 | 40, 1688 | 1040×411 | 1040×411 |
| profile | 40, 228 | 40, 228 | 508×332 | 508×332 |
| notices | 572, 228 | 572, 228 | 508×390 | 508×390 |
| course-status | 40, 650 | 40, 650 | 508×365 | 508×365 |
| course-date | 572, 650 | 572, 650 | 508×609 | 508×609 |
| user-role | 40, 1291 | 40, 1291 | 508×365 | 508×365 |
| user-status | 572, 1291 | 572, 1291 | 508×319 | 508×319 |
| payment-status | 40, 1688 | 40, 1688 | 508×411 | 508×411 |
| payment-date | 572, 1688 | 572, 1688 | 508×375 | 508×375 |

## Tested interactions
- Default highlighted items: Pending, Custom range, Student, Active, Completed.
- Changes and application of course approval status, role, account status and payment status.
- Date presets, disabled/enabled custom date fields, valid date ranges, invalid order blocking and reset.
- Accessible radio controls and notification link existence.
- Admin profile restricted self-deactivation; logout confirmation and cancellation; no false real logout.
- Complete local state reset.

## Known limitations
- Filters apply to a **frontend state demonstration** only, not server-side datasets; use real app router/API integration for filtered results.
- The logout confirmation does **not** terminate a real session.
- The fallback SVG icons are close substitutes for the original Figma assets, which could not be downloaded.
- Source design supplied a standalone supporting-state sheet at 1120px; tablet/mobile layouts are sensible responsive adaptations, not exact separate Figma frames.
