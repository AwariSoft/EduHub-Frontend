# Validation — Admin Course Review Details

Figma screen `26:85441`, companion decision states `26:88267`.

## Browser verification

| Viewport | Reference artboard height | Rendered height | Horizontal overflow | JS errors | Pass |
| --- | ---: | ---: | --- | --- | --- |
| 1440px | 2799px | 2808px | None | 0 | Yes |
| 834px | 3954px | 3964px | None | 0 | Yes |
| 390px | 4198px | 4198px | None | 0 | Yes |
| 320px | not specified | 4215px | None | 0 | Yes |

## Interaction tests — 10/10 passed

1. All curriculum chapters can collapse and expand; ARIA expanded state changes accordingly.
2. A lesson preview dialog opens with the correct lesson title and closes properly.
3. Approval confirmation can be cancelled without changing status.
4. Rejection without a reason displays an accessible validation error and keeps Pending status.
5. A complete rejection reason produces a local Rejected state and retains the reason text.
6. Reset demo restores Pending and the original review controls.
7. Approval confirmation saves an Approved local state, explicitly saying it does not publish the course.
8. Instructor details preview can open and close with Escape.
9. Account and notification dropdowns toggle mutually exclusively and close with Escape.
10. Mobile navigation drawer and search control open and close.

This report covers the standalone HTML run in Chromium headless (via Playwright). Tests use embedded offline assets. Live API calls were not tested because the deliverable intentionally has no server integration.

## Known limitation

The exact Figma SQL Server photograph was unavailable for local download; the bundled course illustration from the prior EduHub screen is used instead. This is a visual asset mismatch and is not claimed as pixel-identical.
