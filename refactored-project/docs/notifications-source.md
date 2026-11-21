# Source reconciliation

Merged `edu-hub-notifications-desktop.html`, `-tablet.html`, `-mobile.html` and corresponding CSS from ZIP #13.

All six notifications and original timestamps, descriptions, read statuses, and action labels preserved. The source provides no persistence API; read actions dispatch integration events. Destination links target proposed student routes and require route verification when those screens are implemented.

Course-details actions currently link to the existing course-learning page; certificate actions link to the existing certificate page. My Learning and student Payment Details destination pages are not yet present in this cumulative project and require route integration.
