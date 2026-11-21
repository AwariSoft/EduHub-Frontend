# Validation — User Management · Table States

- Figma source: frame `26:87917` (1120 × 1881 px).
- Browser: Chromium / Playwright, local in-memory HTML rendering. Network CDN references removed during testing; bundled SVG icons and CSS are self-contained.
- **58/58 automated checks passed**.
- Widths: **1120px, 1440px, 834px, 390px, 320px**.
- No horizontal overflow or JavaScript exceptions at tested widths.
- Exact reference geometry at 1120px: page **1881px**, Loading **y=228, h=605**, Empty **y=865, h=453**, No Results **y=1350, h=491**, panel width **1040px**.
- Six original Figma table headers and four loading skeleton rows verified.
- All loading filters disabled; empty-dataset state remains empty during input.
- Initial no-results state: Lina Mansour + Student + Active, matching Figma.
- Clear Search preserves Student+Active and displays **2** sample user accounts.
- Reset Filters clears all fields and shows **6** sample user accounts.
- Search by exact email is case-insensitive; role and status filters compose correctly.
- Functional recovery state includes a second reset control after matches appear.
- Sample data is not misrepresented as all **1,284** platform accounts.
- No backend calls or live account mutation actions.
- The source figure uses Inter; local environment falls back to system font when the font is unavailable; no font binaries are distributed.

## Screenshots
- `previews/1120px.png`: original-size supporting-state sheet.
- `previews/1440px.png`: centered desktop sheet.
- `previews/834px.png`: tablet.
- `previews/390px.png`: mobile.
- `previews/320px.png`: narrow mobile.
- `previews/clear-search-results.png`: two active student accounts.
- `previews/reset-filters-results.png`: all six Figma sample users.
