# EduHub Admin Mobile Menus, Filters and Dialogs — Validation

**Figma reference:** https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-88972

**Tests:** 38/38 passed across widths **482, 1440, 834, 390 and 320px**. Browser JS errors: 0. No horizontal overflow or unloaded images found in the tested viewports.

**Reference canvas:** 482×5707px; rendered canvas at 482px width: 5707px high.

| Figma section | Target Y (px) | Actual Y (px) | Target height | Actual height |
|---|---:|---:|---:|---:|
| Navigation | 261 | 261 | 483 | 483 |
| Course filters | 776 | 776 | 490 | 490 |
| User filters | 1298 | 1298 | 597 | 597 |
| Payment filters | 1927 | 1927 | 699 | 699 |
| Approval | 2658 | 2658 | 438 | 438 |
| Rejection | 3128 | 3128 | 693 | 693 |
| Deactivation | 3853 | 3853 | 532 | 532 |
| Activation | 4417 | 4417 | 511 | 511 |
| Refund | 4960 | 4960 | 731 | 731 |

**Behaviors checked:** navigation, 44px touch targets, role/status selections, filter apply/reset, valid and invalid date ranges, approval and duplicate prevention, rejection required-reason validation, confirmation cancellation, deactivation/reactivation, refund outcome/duplicate prevention, logout preview.

**Caveats:** The original Figma SQL Server thumbnail could not be downloaded; a local existing EduHub illustration is substituted. Original SVG exports were unavailable; equivalent local SVG icons are used. All actions are frontend-only simulations and must not be treated as real account, course, or financial operations.
