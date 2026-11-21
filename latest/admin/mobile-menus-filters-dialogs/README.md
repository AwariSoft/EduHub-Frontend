# EduHub Admin Workspace — Mobile: Menus, Filters and Dialogs

Implemented from the Figma supporting-state frame: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-88972

## Files
- `eduhub-admin-mobile-menus-filters-dialogs-standalone.html`: Single-file HTML with embedded CSS and JavaScript plus data-URI course-thumbnail fallback; opens without a server.
- `eduhub-admin-mobile-menus-filters-dialogs.html`: Modular HTML referencing `assets/css` and `assets/js`, with Bootstrap 5 and Font Awesome 6 CDN references, plus local styling to remain usable offline.
- `assets/css/admin-mobile-menus-filters-dialogs.css`: Design tokens, responsive layout, menus, dialogs, hover/focus styles.
- `assets/js/admin-mobile-menus-filters-dialogs.js`: Local interactive demo state for navigation, filtering, approval/rejection, activation/deactivation and refunds.
- `assets/icons/`: Local Lucide-style SVG fallbacks (the original Figma SVG files could not be downloaded).
- `assets/images/`: Existing EduHub SQL Server course illustration used as an offline fallback to the unavailable original Figma photo.
- `related/`: Seven previously built Admin Workspace standalone screens for functional local navigation.
- `previews/`: Reference-width, desktop, tablet, mobile, extra-small, and nine state-specific screenshots.
- `test-results.json` / `VALIDATION.md`: Browser checks and measured Figma comparison.

## Reference-size design
The Figma supporting-state sheet measures **482×5707 px**. Its content cards are 450px wide with a 16px outer margin. The mobile design uses 44px buttons and stacked actions.

Panels: Navigation menu; Course filters; User filters; Payment filters; Approve course confirmation; Reject course required reason; Deactivate account; Activate account; Refund payment.

## Frontend behavior
- Filter selection is available via click and keyboard arrows; Apply and Reset produce visible demo feedback; payment dates are validated in UTC.
- Approval marks the course eligible for listing, not published. Rejection requires a nonblank reason.
- Account deactivation/reactivation changes only local demo state, retaining account identity and role.
- Refund changes only local demo status to Refunded and enrollment to Canceled; the original payment ID `PAY-2026-1048` remains intact and duplicate refunds are blocked.
- Confirmation cancellation keeps state unchanged. The close X and Reopen buttons provide an interactive view-state demonstration. Escape dismisses feedback.
- The logout control is a front-end modal and does **not** end a real session.

## Integration
All payment, account, course, and filter actions are **frontend simulations**. Replace `assets/js` demo handlers with real API integration, authentication/authorization and audit logging when integrating. The example records are Figma sample data, not current/live transactions. Do not use the frontend alone to authorize refunds or administrative decisions.

## Source design
EduHub Figma: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-88972
