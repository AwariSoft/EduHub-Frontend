# Course Approvals — Browser Validation

**Figma reference:** desktop 26:84906, tablet 26:85114, mobile 26:85286.

Browser automation ran Chromium in headless mode against the standalone HTML using local embedded assets and with external network requests blocked.

| Viewport | Horizontal overflow | JavaScript errors | Images | Approx. page height |
| --- | --- | --- | --- | ---: |
| 1440px desktop | None | None | All loaded | 1394px |
| 834px tablet | None | None | All loaded | 1696px |
| 390px mobile | None | None | All loaded | 2478px |
| 320px narrow mobile | None | None | All loaded | 2439px |

**51/51 checks passed** (`validation-results.json`). Checks cover six sample rows, three totals, search, no-results/clear filters, status filter, 7-day and custom date filters, pagination placeholders, notifications, account menu, accessible modal opening and closing, rejection validation, approval and rejection local state, and mobile drawer/search controls.

**Design comparison:** Figma desktop artboard height 1392px; implemented desktop screenshot ~1394px. Tablet and phone use the same grouping and breakpoints as the original responsive references. The mobile implementation is somewhat more compact vertically; image assets are local substitutes and not pixel-identical to the Figma originals.

**Scope and safeguards:** Review status changes happen only inside the local page memory, never against live backend APIs. The counts are Figma sample data from October 2026, not current platform records.
