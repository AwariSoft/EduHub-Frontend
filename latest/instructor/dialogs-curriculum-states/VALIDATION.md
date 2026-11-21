# Validation — EduHub Instructor Dialogs and Curriculum States

## Responsiveness (Chromium + Playwright)

| Viewport | Displayed cards | Horizontal overflow | JS errors |
|---|---:|---|---:|
| 1440px | 7 | No | 0 |
| 834px | 7 | No | 0 |
| 390px | 7 | No | 0 |

Desktop at 1440px matches the source Figma's three primary group start positions (201px, 671px, 1095px) and group heights (438px, 392px, 456px). Responsive tablet and mobile layouts have no sideways scrolling.

## Interaction coverage

**9 checks passed / 0 failed.**

- **PASS** Cancel deletion preserves course
- **PASS** Course delete remains preview only
- **PASS** Account deletion requires exact case-sensitive DELETE
- **PASS** Add section validation and local curriculum update
- **PASS** Edit section prevents duplicate order and preserves lessons
- **PASS** Curriculum expand/collapse accessibility and lesson preservation
- **PASS** Password strength, match, reveal and no backend submission
- **PASS** Keep editing and discard unsaved edits
- **PASS** Delete section modal safe cancel and preview-only deletion

## Scope

The validation covers the standalone page without network dependencies. All destructive actions operate as non-persistent frontend previews, not against an API. Login verification, deletion authorization, real password update and data persistence are not implemented. The source Figma frame has no raster assets, so no image substitution was necessary.
