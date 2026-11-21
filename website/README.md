# EduHub frontend

Open **index.html** to browse the screen catalogue. Open **pages/public/home.html** to start at the EduHub Homepage. You can also serve this folder with `python -m http.server 8000` and open `http://localhost:8000`.

## Project files

| Path | Contents |
|---|---|
| `pages/public/`, `pages/auth/` | Public site, catalogue, course details, and account screens |
| `pages/student/`, `pages/instructor/`, `pages/admin/` | Role-specific workspaces |
| `pages/system/`, `pages/states/` | System screens and design-state previews |
| `assets/css/`, `assets/js/` | Project styles and client-side interactions |
| `assets/images/` | Dimensioned Placehold.co image copies and the analytics plots included in the design |
| `assets/vendor/` | Bootstrap and Font Awesome fallback files |
| `screen-map.json` | Mapping from 153 top-level Figma frames to their packaged pages |

Desktop, tablet, and mobile frames share responsive HTML routes. The 75 page files include 43 main pages and 32 supporting state previews. Seventy-four files map to top-level Figma frames. The general Course Details page is also included.

Bootstrap 5 and Font Awesome 6 load from versioned CDNs with local fallbacks. Google Fonts supplies Inter when available. The package uses system fonts when Google Fonts is unavailable. Photographic slots use image placeholders so the project can be opened directly from the extracted folder.

## Demo behavior

Search, filters, navigation, and selected forms run in the browser. Sign-in, recovery, payments, refunds, uploads, course administration, and certificate issuance are frontend previews that require backend integration for real transactions. Sample course and quiz content follows the available design data. Course previews without a full details design display the available catalogue information. Policy text and legal links require site content and destinations.

## Design reference

[EduHub Figma](https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub)

The archive reuses the existing EduHub responsive implementation and incorporates the approved Homepage plus the latest course-learning, lesson completion, Resources, Notes, Final Quiz, and passing-result screens.
