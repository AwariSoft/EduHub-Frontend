# Validation — EduHub Instructor Dashboard · Original Design

## Responsive rendering

| Viewport | Rendered document height | Horizontal overflow | Browser errors | Images loaded |
|---|---:|---|---|---|
| 1440px | 1025px | No | 0 | 4/4 |
| 834px | 1957px | No | 0 | 4/4 |
| 390px | 3190px | No | 0 | 4/4 |
| 320px | 3219px | No | 0 | 4/4 |

## Functional smoke tests

- [x] Course search and clear
- [x] Course search no-results
- [x] Performance chart periods
- [x] Account dropdown and Escape
- [x] Notifications popover
- [x] Collapse/expand sidebar
- [x] Mobile drawer and Escape

## Source and constraints

Original desktop, tablet, and mobile Figma frames: `16:16621`, `16:17076`, and `16:17387`. All four source photos are replaced by local EduHub illustration fallbacks; they are not pixel-identical originals. Navigation links require the rest of the EduHub project pages. Metrics and enrollment records are static demo data. Browser checks were performed with Chromium at four widths using the standalone HTML.
