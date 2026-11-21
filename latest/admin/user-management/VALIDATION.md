# EduHub User Management — Browser validation

## Responsive viewports

| Viewport | Document height | Figma frame height | Horizontal overflow | JavaScript exceptions |
|---|---:|---:|---|---|
| 1440px desktop | 1275px | 1275px | No | None |
| 834px tablet | 1675px | 1675px | No | None |
| 390px mobile | 2712px | 2712px | No | None |
| 320px small mobile | 2738px | Flexible extrapolation | No | None |

## Interaction verification

All **20 of 20** interaction checks passed in headless Chromium:

1. Search user name
2. Restore the unfiltered sample list
3. Filter by instructor role
4. Combined role and inactive filters with no results
5. Clear all filters
6. Filter by active status
7. Open read-only user details
8. Escape to close dialog
9. Cancel account deactivation without mutation
10. Confirm account deactivation in memory
11. Re-activate account in memory
12. Hide deactivation action for current admin
13. Next page exposes missing backend dataset
14. Return to the sample page
15. Open notification dropdown
16. Filter inactive sample users from notification action
17. Open account dropdown
18. Open mobile navigation drawer
19. Close mobile drawer with backdrop
20. Open mobile search

No failed interactions, no page-level JavaScript errors, and no horizontal overflow. Tests read and render the self-contained HTML in browser context; file URL navigation is not permitted in this specific test environment.

## Scope and fidelity

The screen uses the six literal user rows and the exact platform totals appearing in Figma. No unprovided user records or backend results were invented. All user state mutations are local UI demonstrations. The tablet and mobile layouts preserve the Figma visual hierarchy and full-page height; pixel-level icon/border antialiasing can vary by browser and available system font.

Reference: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-86096.
