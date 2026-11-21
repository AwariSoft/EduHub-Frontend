# EduHub restoration and integration report

Input: `eduhub-draft.zip` supplied by project owner.

**32 original HTML exports. 31 pages replaced, 1 additional page added.** All original bytes and the 31 previous website pages are retained.

## What changed

- Original screens are now at their existing `website/pages/...` routes.
- Source inline styles and JavaScript are separated into page-specific `website/assets/css/recovered/` and `website/assets/js/recovered/`.
- Static `style=` attributes were promoted to CSS utility classes where present.
- Links between recovered pages are mapped to the consolidated folder structure.
- Original copies are in `restored-originals/`; replaced old pages are in `backups/website-before-restoration/`.
- `latest/` contains historical independently packaged screen versions and has not been deleted.
- `RECOVERED_SCREENS.html` opens the recovered versions in place; `START_HERE.html` still includes all previously implemented screens.

## Important limitations

- This is a frontend integration: auth, payment actions, storage and admin controls may be demonstrations or backend-dependent, as in the supplied source.
- Original images loaded from remote URLs still require network access. Bootstrap and Font Awesome use external CDN links from the original exports; font files are not redistributed.
- Unimplemented destinations from the supplied HTML were not invented; links requiring missing screens are listed in the manifest.
- Page styles are separate, but each page retains its original selectors/declarations to prevent design regressions. Global CSS deduplication would require additional visual regression testing and was not silently applied.

## Screen replacements

| Original HTML | Integrated route | Action | CSS | JS |
|---|---|---|---|---|
| `eduhub-homepage.html` | `pages/public/home.html` | replaced | `assets/css/recovered/homepage.css` | `assets/js/recovered/homepage.js` |
| `eduhub-new-student-dashboard.html` | `pages/student/new-student-dashboard.html` | replaced | `assets/css/recovered/new-student-dashboard.css` | `assets/js/recovered/new-student-dashboard.js` |
| `eduhub-notification-states-and-roles.html` | `pages/states/notification-states-roles.html` | replaced | `assets/css/recovered/notification-states-and-roles.css` | `assets/js/recovered/notification-states-and-roles.js` |
| `eduhub-page-not-found.html` | `pages/system/page-not-found.html` | replaced | `assets/css/recovered/page-not-found.css` | `(none)` |
| `eduhub-password-recovery-states.html` | `pages/states/password-recovery-states.html` | replaced | `assets/css/recovered/password-recovery-states.css` | `assets/js/recovered/password-recovery-states.js` |
| `eduhub-password-reset-states.html` | `pages/states/password-reset-states.html` | replaced | `assets/css/recovered/password-reset-states.css` | `assets/js/recovered/password-reset-states.js` |
| `eduhub-payment-failed.html` | `pages/student/payment-failed.html` | replaced | `assets/css/recovered/payment-failed.css` | `assets/js/recovered/payment-failed.js` |
| `eduhub-payment-failed-additional-state.html` | `pages/states/payment-failed-additional-state.html` | added | `assets/css/recovered/payment-failed-additional-state.css` | `assets/js/recovered/payment-failed-additional-state.js` |
| `eduhub-payment-processing.html` | `pages/states/payment-processing.html` | replaced | `assets/css/recovered/payment-processing.css` | `assets/js/recovered/payment-processing.js` |
| `eduhub-payment-success.html` | `pages/student/payment-success.html` | replaced | `assets/css/recovered/payment-success.css` | `assets/js/recovered/payment-success.js` |
| `eduhub-payment-successful.html` | `pages/states/payment-successful-early.html` | replaced | `assets/css/recovered/payment-successful.css` | `assets/js/recovered/payment-successful.js` |
| `eduhub-quiz-result-pass.html` | `pages/states/quiz-result-pass.html` | replaced | `assets/css/recovered/quiz-result-pass.css` | `assets/js/recovered/quiz-result-pass.js` |
| `eduhub-reset-password.html` | `pages/auth/reset-password.html` | replaced | `assets/css/recovered/reset-password.css` | `assets/js/recovered/reset-password.js` |
| `eduhub-sign-in.html` | `pages/auth/sign-in.html` | replaced | `assets/css/recovered/sign-in.css` | `assets/js/recovered/sign-in.js` |
| `eduhub-student-dashboard.html` | `pages/student/dashboard.html` | replaced | `assets/css/recovered/student-dashboard.css` | `assets/js/recovered/student-dashboard.js` |
| `eduhub-student-profile.html` | `pages/student/student-profile.html` | replaced | `assets/css/recovered/student-profile.css` | `assets/js/recovered/student-profile.js` |
| `eduhub-access-denied.html` | `pages/system/access-denied.html` | replaced | `assets/css/recovered/access-denied.css` | `assets/js/recovered/access-denied.js` |
| `eduhub-checkout.html` | `pages/student/checkout.html` | replaced | `assets/css/recovered/checkout.css` | `assets/js/recovered/checkout.js` |
| `eduhub-course-details-already-enrolled.html` | `pages/states/course-details-already-enrolled.html` | replaced | `assets/css/recovered/course-details-already-enrolled.css` | `assets/js/recovered/course-details-already-enrolled.js` |
| `eduhub-course-details-free.html` | `pages/states/course-details-free.html` | replaced | `assets/css/recovered/course-details-free.css` | `assets/js/recovered/course-details-free.js` |
| `eduhub-course-learning.html` | `pages/student/course-learning.html` | replaced | `assets/css/recovered/course-learning.css` | `assets/js/recovered/course-learning.js` |
| `eduhub-course-learning-all-lessons-complete.html` | `pages/states/course-learning-all-lessons-complete.html` | replaced | `assets/css/recovered/course-learning-all-lessons-complete.css` | `assets/js/recovered/course-learning-all-lessons-complete.js` |
| `eduhub-course-learning-no-final-quiz-policy.html` | `pages/states/course-learning-no-final-quiz-policy.html` | replaced | `assets/css/recovered/course-learning-no-final-quiz-policy.css` | `assets/js/recovered/course-learning-no-final-quiz-policy.js` |
| `eduhub-course-learning-notes.html` | `pages/states/course-learning-notes.html` | replaced | `assets/css/recovered/course-learning-notes.css` | `assets/js/recovered/course-learning-notes.js` |
| `eduhub-course-learning-resources.html` | `pages/states/course-learning-resources.html` | replaced | `assets/css/recovered/course-learning-resources.css` | `assets/js/recovered/course-learning-resources.js` |
| `eduhub-create-account.html` | `pages/auth/create-account.html` | replaced | `assets/css/recovered/create-account.css` | `assets/js/recovered/create-account.js` |
| `eduhub-edit-student-profile.html` | `pages/student/edit-student-profile.html` | replaced | `assets/css/recovered/edit-student-profile.css` | `assets/js/recovered/edit-student-profile.js` |
| `eduhub-explore-courses.html` | `pages/public/explore-courses.html` | replaced | `assets/css/recovered/explore-courses.css` | `assets/js/recovered/explore-courses.js` |
| `eduhub-explore-courses-mobile-filters-open.html` | `pages/states/explore-courses-mobile-filters-open.html` | replaced | `assets/css/recovered/explore-courses-mobile-filters-open.css` | `assets/js/recovered/explore-courses-mobile-filters-open.js` |
| `eduhub-final-quiz.html` | `pages/student/final-quiz.html` | replaced | `assets/css/recovered/final-quiz.css` | `assets/js/recovered/final-quiz.js` |
| `eduhub-forgot-password.html` | `pages/auth/forgot-password.html` | replaced | `assets/css/recovered/forgot-password.css` | `assets/js/recovered/forgot-password.js` |
| `eduhub-free-course-learning-database-design-fundamentals.html` | `pages/states/free-course-learning-database.html` | replaced | `assets/css/recovered/free-course-learning-database-design-fundamentals.css` | `assets/js/recovered/free-course-learning-database-design-fundamentals.js` |

## Navigation audit

All mapped source screen links point to existing project routes. The following source links have no supplied destination and remain unresolved:

- `privacy-policy.html` (used by eduhub-create-account.html, eduhub-homepage.html)
- `terms-of-service.html` (used by eduhub-create-account.html, eduhub-homepage.html)
- `eduhub-student-settings.html` (used by eduhub-edit-student-profile.html, eduhub-student-profile.html)

The recovered frontend was checked at widths of **390px, 834px and 1440px**. The 32 restored pages loaded their external CSS and JS without browser runtime errors or horizontal overflow in the test environment (with Bootstrap assets served locally for verification).
