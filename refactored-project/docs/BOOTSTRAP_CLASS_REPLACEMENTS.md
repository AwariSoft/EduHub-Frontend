# Bootstrap 5 utility replacements (applied automatically)

These replacements were applied to actual `class` attributes in `pages/` and `partials/`; corresponding redundant declarations were removed from the shared stylesheet. Existing class names were kept if JavaScript or page-specific descendant selectors could still reference them.

| Legacy selector | CSS declaration removed | Bootstrap utility added | File |
|---|---|---|---|
| `.edu-admin__avatar` | `align-items: center` | `align-items-center` | `pages/admin/admin-dashboard.html` |
| `.edu-admin__avatar` | `align-items: center` | `align-items-center` | `partials/admin-topbar.html` |
| `.edu-admin__avatar` | `border-radius: 50%` | `rounded-circle` | `pages/admin/admin-dashboard.html` |
| `.edu-admin__avatar` | `border-radius: 50%` | `rounded-circle` | `partials/admin-topbar.html` |
| `.edu-admin__avatar` | `justify-content: center` | `justify-content-center` | `pages/admin/admin-dashboard.html` |
| `.edu-admin__avatar` | `justify-content: center` | `justify-content-center` | `partials/admin-topbar.html` |
| `.edu-analytics-bars` | `display: grid` | `d-grid` | `pages/instructor/course-analytics.html` |
| `.edu-analytics-bartrack` | `overflow: hidden` | `overflow-hidden` | `pages/instructor/course-analytics.html` |
| `.edu-analytics-donut` | `border-radius: 50%` | `rounded-circle` | `pages/instructor/course-analytics.html` |
| `.edu-analytics-donut` | `position: relative` | `position-relative` | `pages/instructor/course-analytics.html` |
| `.edu-analytics-donut-wrap` | `display: flex` | `d-flex` | `pages/instructor/course-analytics.html` |
| `.edu-analytics-donut-wrap` | `justify-content: center` | `justify-content-center` | `pages/instructor/course-analytics.html` |
| `.edu-analytics-kpi-icon` | `display: grid` | `d-grid` | `pages/instructor/course-analytics.html` |
| `.edu-analytics-legend` | `display: grid` | `d-grid` | `pages/instructor/course-analytics.html` |
| `.edu-analytics-months` | `display: grid` | `d-grid` | `pages/instructor/course-analytics.html` |
| `.edu-analytics-months` | `text-align: center` | `text-center` | `pages/instructor/course-analytics.html` |
| `.edu-analytics-plot` | `display: flex` | `d-flex` | `pages/instructor/course-analytics.html` |
| `.edu-analytics-shell` | `margin-inline: auto` | `mx-auto` | `pages/instructor/course-analytics.html` |
| `.edu-analytics-y` | `display: flex` | `d-flex` | `pages/instructor/course-analytics.html` |
| `.edu-analytics-y` | `flex-direction: column` | `flex-column` | `pages/instructor/course-analytics.html` |
| `.edu-analytics-y` | `justify-content: space-between` | `justify-content-between` | `pages/instructor/course-analytics.html` |
| `.edu-analytics-y` | `text-align: right` | `text-end` | `pages/instructor/course-analytics.html` |
| `.edu-course-details__outcomes` | `display: grid` | `d-grid` | `pages/instructor/course-details.html` |
| `.edu-course-details__outcomes` | `margin: 0` | `m-0` | `pages/instructor/course-details.html` |
| `.edu-course-details__outcomes` | `padding: 0` | `p-0` | `pages/instructor/course-details.html` |
| `.edu-course-details__published` | `align-items: center` | `align-items-center` | `pages/instructor/course-details.html` |
| `.edu-course-details__published` | `gap: .25rem` | `gap-1` | `pages/instructor/course-details.html` |
| `.edu-course-details__shell` | `margin-inline: auto` | `mx-auto` | `pages/instructor/course-details.html` |
| `.edu-home-avatar` | `border-radius: 50%` | `rounded-circle` | `pages/public/home.html` |
| `.edu-home-avatar` | `display: grid` | `d-grid` | `pages/public/home.html` |
| `.edu-home-hero-figure` | `position: relative` | `position-relative` | `pages/public/home.html` |
| `.edu-learning-avatar` | `border-radius: 50%` | `rounded-circle` | `pages/student/course-learning.html` |
| `.edu-learning-avatar` | `display: grid` | `d-grid` | `pages/student/course-learning.html` |
| `.edu-learning-lesson` | `align-items: center` | `align-items-center` | `pages/student/course-learning.html` |
| `.edu-learning-lesson` | `display: flex` | `d-flex` | `pages/student/course-learning.html` |
| `.edu-learning-lesson` | `width: 100%` | `w-100` | `pages/student/course-learning.html` |
| `.edu-learning-player__controls` | `align-items: center` | `align-items-center` | `pages/student/course-learning.html` |
| `.edu-learning-player__controls` | `display: flex` | `d-flex` | `pages/student/course-learning.html` |
| `.edu-lesson-video` | `display: block` | `d-block` | `pages/instructor/add-lesson.html` |
| `.edu-lesson-video` | `width: 100%` | `w-100` | `pages/instructor/add-lesson.html` |
| `.edu-notifications__dot` | `border-radius: 50%` | `rounded-circle` | `pages/student/notifications.html` |
| `.edu-notifications__panel` | `overflow: hidden` | `overflow-hidden` | `pages/student/notifications.html` |
| `.edu-payment-failed__action` | `align-items: center` | `align-items-center` | `pages/student/payment-failed.html` |
| `.edu-payment-failed__action` | `justify-content: center` | `justify-content-center` | `pages/student/payment-failed.html` |
| `.edu-payment-failed__motif` | `display: block` | `d-block` | `pages/student/payment-failed.html` |
| `.edu-payment-failed__motif` | `margin-inline: auto` | `mx-auto` | `pages/student/payment-failed.html` |
| `.edu-payment-failed__notice` | `display: flex` | `d-flex` | `pages/student/payment-failed.html` |
| `.edu-payment-failed__status` | `align-items: center` | `align-items-center` | `pages/student/payment-failed.html` |
| `.edu-payment-success__facts` | `display: grid` | `d-grid` | `pages/student/payment-success.html` |
| `.edu-payment-success__status` | `align-items: center` | `align-items-center` | `pages/student/payment-success.html` |
| `.edu-payment-success__subtitle` | `margin-inline: auto` | `mx-auto` | `pages/student/payment-success.html` |
| `.edu-profile__skill` | `align-items: center` | `align-items-center` | `pages/instructor/my-profile.html` |
| `.edu-quiz-selected` | `margin-left: auto` | `ms-auto` | `pages/student/final-quiz.html` |
| `.edu-review__avatar` | `border-radius: 50%` | `rounded-circle` | `pages/admin/course-review-details.html` |
| `.edu-settings__shell` | `margin-inline: auto` | `mx-auto` | `pages/instructor/settings.html` |
| `.edu-student-profile__avatar` | `border-radius: 50%` | `rounded-circle` | `pages/student/student-profile.html` |
| `.edu-student-profile__avatar` | `display: grid` | `d-grid` | `pages/student/student-profile.html` |
| `.edu-student-profile__role` | `align-items: center` | `align-items-center` | `pages/student/student-profile.html` |
| `.edu-student__avatar` | `border-radius: 50%` | `rounded-circle` | `partials/student-topbar.html` |
| `.edu-student__workspace` | `display: block` | `d-block` | `partials/student-sidebar.html` |
| `.edu-students__shell` | `margin-inline: auto` | `mx-auto` | `pages/instructor/my-students.html` |
| `.edu-user-detail__avatar` | `border-radius: 50%` | `rounded-circle` | `pages/admin/user-details.html` |
| `.edu-user-detail__avatar` | `display: grid` | `d-grid` | `pages/admin/user-details.html` |
| `.edu-users__avatar` | `align-items: center` | `align-items-center` | `pages/admin/user-management.html` |
| `.edu-users__avatar` | `border-radius: 50%` | `rounded-circle` | `pages/admin/user-management.html` |
| `.edu-users__avatar` | `justify-content: center` | `justify-content-center` | `pages/admin/user-management.html` |

No Bootstrap utility was substituted for a source-specific value (for example custom max-width, a bespoke color, or a responsive display override).
