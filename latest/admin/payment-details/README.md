# EduHub — Admin Workspace / Payment Details

Implementation of the **Payment Details** Figma screen, with desktop, tablet and mobile breakpoints.

## Design references

- Desktop: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-87420
- Tablet: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-87541
- Mobile: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-87649
- Refund outcomes: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-88522

## Files

- `eduhub-admin-payment-details.html`: modular HTML, references local CSS, JS and thumbnail.
- `eduhub-admin-payment-details-standalone.html`: single HTML file with embedded CSS, JS, icon SVG logic and thumbnail; opens locally.
- `assets/css/admin-payment-details.css`: page-specific styles and responsive rules.
- `assets/css/admin-shell.css`: consistent EduHub admin sidebar/topbar/navigation.
- `assets/css/vendor-offline.css`: Bootstrap utility fallback for offline use. Bootstrap 5 CDN is also retained in the modular HTML.
- `assets/js/admin-payment-details.js`: frontend-only interactions.
- `assets/js/fontawesome-svg-icons.js`: inline SVG icons from the prior EduHub Admin workspace.
- `assets/img/course-complete-csharp.jpg`: an existing EduHub fallback illustration, **not the exact photograph from Figma**. Exact Figma image asset could not be retrieved into the container.
- `previews/`: screenshots and refund states.
- `VALIDATION.md`, `validation-results.json`, `test_browser.py`: QA.
- Related earlier screens are included as standalone HTML files to support navigation, including Payments and User Details.

## Run

Open `eduhub-admin-payment-details-standalone.html` in a browser. The modular HTML also runs locally using `assets/` and uses CDN Bootstrap / Font Awesome where available, with offline fallback styling/icons.

## Features

- Figma sample: original payment **PAY-2026-1048** of **$49.00**, paid by **Warda Mahmoud** for **Complete C# Programming**.
- Original payment and student/course details; back navigation to Payments and link to User Details.
- Refund request, full-amount eligibility, accessible confirmation, Cancel/Escape/backdrop close.
- Upon confirmation the *same original payment* becomes Refunded, enrollment becomes Canceled, and refund reference **RF-2026-0013** is shown.
- No duplicate transaction is created; a second refund cannot be initiated in the local demo.
- Notification menu, account dropdown, mobile drawer/search, keyboard interaction.
- Demonstration only; **no payment provider contacted, no money transferred, no backend persistence**. Reload resets the sample to its original Completed state. Dates shown come from the Figma sample (October 2026), not live records.

## Scope and limitations

- Authentication/authorization, server audit logs, API integrations, real refund flows and payment status reconciliation are not included.
- Original Figma raster photograph is unavailable and represented by an existing local EduHub illustration. Image is clearly described in QA.
- External CDN dependencies are not required for the standalone page; the modular page can use them where available.
