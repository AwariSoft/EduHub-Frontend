# EduHub — Admin Workspace / Payments · Table States

**Figma frame:** [Payments · Table states, 26:88081](https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-88081)  
**Figma reference:** 1120 × 1881 px

## Files

- `eduhub-admin-payments-table-states-standalone.html`: single-file, runnable HTML with embedded CSS, JavaScript and local SVG-rendering code.
- `eduhub-admin-payments-table-states.html`: modular HTML with dependencies under `assets/`.
- `assets/css/admin-payments-table-states.css`: responsive styles and reusable state components.
- `assets/js/admin-payments-table-states.js`: frontend filtering, Clear Search and Reset Filters.
- `assets/js/fontawesome-svg-icons.js`: local Font Awesome Free SVG icon paths — **no font binaries**.
- `related/eduhub-admin-payments.html` and its `assets/`: a locally linked copy of the earlier Payments screen.
- `previews/`: screenshot validation at five viewport widths plus recovery states.
- `VALIDATION.md`, `validation-results.json`: Chromium browser test outputs.

## Usage

Open `eduhub-admin-payments-table-states-standalone.html` directly in a browser, or serve the folder locally and open `eduhub-admin-payments-table-states.html`. Bootstrap 5 and Font Awesome 6 CSS are referenced via CDNs as progressive enhancement; the standalone file has its own styling and SVG icon rendering, so it can still render without the CDN.

## Figma states

1. **Loading:** four animated skeleton rows; table headers remain; the filters are disabled.
2. **Empty dataset:** 0 payment records, a payment-card illustration, explanation, and no applied filters.
3. **No search results:** `PAY-2026-9999`, `Completed`, `Oct 01–30, 2026`, no matching payments, recovery actions.

### Interactive recovery

- **Clear Search** removes only the search query; the Completed and October filters are preserved, producing three matching payments from the six supplied examples.
- **Reset Filters** clears the search, date, and status filters, displaying all six supplied payments.
- Search matches payment ID, student, and course (case-insensitive); date and status filters combine. A Reset Filters control remains available after records reappear.
- The empty-data panel remains truly empty regardless of its local filters.

## Important scope boundaries

Figma provides six sample transaction records in the Payments screen and a separate platform count of 1,048. The interactive demonstration uses only the six actual sample records; it does not fabricate the remaining transactions or claim to paginate them. The loading and empty states are visual UI references, not network-backed states. Nothing contacts a payment provider, issues refunds, or modifies real records.

The related Payments page is included for local navigation; its other unrelated routes may need the rest of the EduHub project. Inter uses a system font fallback when unavailable; **font files are not bundled**.
