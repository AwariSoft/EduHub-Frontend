# User Details — Browser validation

## Responsive layouts

| Viewport | Rendered full page height | Figma target height | Horizontal overflow | JavaScript errors |
|---|---:|---:|---|---:|
| 1440px | 1125px | 1125 | None | 0 |
| 834px | 1509px | 1509 | None | 0 |
| 390px | 1546px | 1546 | None | 0 |
| 320px | 1546px | Not specified | None | 0 |

The 1440px, 834px and 390px layouts match the source Figma artboard heights exactly. The 320px check verifies narrow-device overflow and functionality, not pixel-identical Figma dimensions.

## Interaction tests — 15 / 15 passed

- PASS: initial active status
- PASS: deactivate modal details
- PASS: escape cancels without state change
- PASS: cancel preserves status
- PASS: confirm deactivation
- PASS: activate modal details
- PASS: confirm reactivation
- PASS: notification dropdown opens
- PASS: account dropdown closes notification
- PASS: outside click closes menus
- PASS: search this sample profile
- PASS: back destination bundled
- PASS: mobile drawer opens
- PASS: mobile drawer escape
- PASS: mobile search expands

## Scope

- Browser tests render the standalone page with local, inline HTML/CSS/JavaScript.
- Controls are frontend-only; account status changes do not affect actual users or backend data.
- Relative links to other pages must be integrated into the complete EduHub project; a standalone User Management page is included for the back-navigation link.
- Tests do not establish that the full EduHub platform or backend is functioning.
