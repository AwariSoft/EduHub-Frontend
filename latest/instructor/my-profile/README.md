# EduHub — Instructor Workspace / My Profile

Source: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub
Figma frame IDs: Desktop 18:60424, Tablet 18:60563, Mobile 18:60697.

## How to run

Open `eduhub-instructor-my-profile.html` in a browser. This standalone HTML contains Bootstrap 5 styles, Font Awesome icon fallback, page styles, and JavaScript inline. Inter font may fall back to a system font offline.

## Responsive layout

- Desktop 1440px: 232px instructor sidebar, two-column form and public preview.
- Tablet 834px: 80px instructor icon sidebar and stacked form/preview.
- Mobile 390px: 149px header, stacked inputs and buttons, fixed bottom navigation.
- Small phones 320px: extra bottom scroll padding to keep content reachable above navigation.

## Functionality

- Prefilled example account (Ahmed Mohamed). The `*.example` URLs and email are synthetic Figma placeholders.
- Upload JPG or PNG (max 2 MB); local preview uses FileReader and persists with localStorage when possible.
- Live public profile preview updates full name, biography, title, expertise tags, and picture.
- Required full name/email validation and optional HTTP(S) URL validation.
- Save Changes writes to `eduhub.instructor.profile.v1` in localStorage only.
- Cancel shows a discard confirmation when there are unsaved changes.
- Example social link controls show the illustrative URL without opening a fake website.
- Instructor sidebar, mobile drawer, notification and account menus come from the shared shell.
- Links to other instructor pages assume the corresponding HTML files are placed together.

## Production integration

Actual authentication, instructor record updates, server-side image uploads, public profile publishing, and access control require backend integration. The profile preview and counts are illustrative.

## Files

- Standalone HTML includes styles and scripts inline.
- css/instructor-my-profile.css and js/instructor-my-profile.js contain the screen-specific code for migration to a shared project structure.
- previews/ contains the tested screenshots at 1440, 834, 390, and 320 pixels.
- validation.txt summarizes browser results.
