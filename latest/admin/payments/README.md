# EduHub — Admin Workspace / Payments

Pixel-aligned responsive HTML implementation from the original EduHub Figma Payments screen.

## Design references
- [Payments — Desktop](https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-86895) — 1440×1441
- [Payments — Tablet](https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-87100) — 834×1884
- [Payments — Mobile](https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-87268) — 390×3118
- [Refund and payment outcomes](https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-88522)
- [Payments filter controls](https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-88929)

## Open and integrate
- `eduhub-admin-payments-standalone.html` — single-file preview; embedded CSS and JS; no runtime network required, including SVG icon graphics.
- `eduhub-admin-payments.html` — modular HTML5 page. Assets reside under `assets/css/` and `assets/js/`. Includes commented `<!-- INCLUDE: partials/admin-* -->` markers for later extracting shared shell.
- Both pages use Bootstrap 5 and Font Awesome 6 conventions. CDN declarations are retained in the modular page; local compatible styling and Font Awesome Free SVGs provide fallback.
- All files in this package contain no font binaries and no temporary Figma asset URLs.
- Merge the modular file next to the other admin page files to make nav links work. The page's login/dashboard/courses/users links are integration targets and not server-backed in this bundle.

## Supported interactions
- Search payment ID, student name, or course title; optionally search through the workspace header.
- Filter by Completed, Pending, Failed, Refunded; specific sample dates; or a validated custom UTC-inclusive date range.
- Show empty-search state, reset filters, and display an explicit backend-required state when navigating beyond the six supplied sample records.
- View read-only sample payment details in a keyboard-accessible dialog.
- Confirm or cancel Warda Mahmoud's eligible full refund. Only a successful local confirmation updates the existing `PAY-2026-1048` status from **Completed** to **Refunded**, changes aggregate counters from 982/12 to 981/13, and indicates cancellation of the related enrollment. It creates no new payment record and makes no real payment-provider request.
- Pending, Failed, already Refunded, and Completed-without-refund-request rows are ineligible for refund.
- Responsive desktop table, tablet 2-column card grid, mobile stacked cards, mobile drawer, notifications, account dropdown, keyboard Escape, and focus retention.

## Dataset and limits
**Figma sample data, not a real payment system.** The summary represents **1,048** historical payments, but the provided page has six actual sample rows. Searches and filters operate only on those six rows; other pages are intentionally not fabricated. The refund is in-memory only and resets on reload. Real transactions, refund processing, authorization, student consent, audit logging, backend APIs, and refunds require separate implementation.

## Testing
See `VALIDATION.md` and `validation-results.json`. Tested Chromium at 1440, 834, 390 and 320px; responsive screenshots in `previews/`. Test coverage and source script: `test_browser.py`.
