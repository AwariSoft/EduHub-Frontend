# Source reconciliation

- ZIP #7: `edu-hub-course-learning-notes.html`, `edu-hub-course-learning-resources.html`, `edu-hub-course-learning-all-lessons-complete.html`, `edu-hub-course-learning-no-final-quiz-policy.html`.
- ZIP #8: `edu-hub-course-learning-mobile.html`.
- Default state: Variables and Data Types, 35% progress, Overview tab.
- Query `?state=complete`: all nine lessons completed, final quiz required (70% pass).
- Query `?state=no-final-quiz&policy=no-final-quiz`: all nine lessons completed, no final quiz required.
- Notes and Resources are Bootstrap tabs. Course curriculum is a Bootstrap accordion. Mobile content is a Bootstrap offcanvas.
- Source provides a player illustration only, no video file. The player controls are demonstrative; no actual media playback occurs.
- Source lists resource file names/sizes but does not contain those files. Download controls explain the missing files rather than generating fake downloads.
- Source progress is watch-time-based; local Mark as Completed state does not persist to backend.
