<<<<<<< HEAD
# EduHub-Frontend
=======
# EduHub — Complete processed frontend screens

**Created:** 2026-11-21  
**Figma:** https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub

## Start here
Open **`START_HERE.html`** in a browser to search and launch the individual screens.

## Contents
- `website/` — integrated EduHub frontend baseline and `website/index.html` (source: earlier `EduHub-Frontend.zip`). Its `screen-map.json` maps **153 Figma frames** to **74 responsive screen destinations**. Desktop/tablet/mobile designs often share one HTML destination.
- `latest/student/` — 6 newer Student/Learning screen HTML files.
- `latest/instructor/` — 23 independently packaged Instructor screens, with their modular and/or standalone HTML, CSS, JS, available images, documentation and previews.
- `latest/admin/` — 15 independently packaged Admin screens, with modular and/or standalone HTML, CSS, JS, available images, docs and previews.
- (Full archive only) `refactored-project/` — the earlier full refactored project, including responsive pages, compiled `dist/` output, reference exports, assets, test previews and audit documentation.
- `SCREEN_INVENTORY.csv` and `manifest.json` — searchable filenames, links, and 153-frame mapping.

The **START_HERE.html** launcher includes **119 browsable HTML entries**: 75 core pages and 44 newer screen implementations.

## Important implementation notes
- Files are packaged by source/version to **avoid overwriting the recent standalone versions with older baseline code**. These are a consolidated handoff, not a newly merged application with a single shared state store.
- Administrative approval, user access changes, refund actions, and uploads are frontend demonstrations without a real backend or payment provider.
- Some images and icons were substituted during previous conversions where exact Figma assets were not available.
- **Font files are intentionally excluded** from the distributable ZIP. Legacy Font Awesome links in `website/` are updated to use the online CDN, so an internet connection may be needed for those icons. Some CSS files in the refactored reference may still refer to online assets.
- For a visual audit of a responsive page, open its `standalone.html` when available; otherwise use the original HTML alongside the included assets.

## File layout
```
START_HERE.html
website/index.html
website/pages/
latest/student/
latest/instructor/
latest/admin/
refactored-project/
manifest.json
SCREEN_INVENTORY.csv
```

This archive contains actual processed implementations rather than just exported screenshots. Original source files are preserved, and newer implementations remain individually editable.


## Owner-restored originals (latest)

The 32 owner-supplied screen exports in `eduhub-draft.zip` are now authoritative for their `website/pages/...` routes. Open `RECOVERED_SCREENS.html`, review `RESTORATION_REPORT.md`, and see `RESTORATION_MANIFEST.json`. Every restored page uses separate CSS and (where supplied) JavaScript. Previous website versions were backed up.
>>>>>>> b91e832 (Initial commit)
