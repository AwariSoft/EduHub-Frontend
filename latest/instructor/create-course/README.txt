EduHub Instructor Workspace — Create Course
=========================================
Figma desktop node: 18:56939 (1440 × 1781)
Figma tablet node:  18:57097 (834 × 1861)
Figma mobile node:  18:57234 (390 × 2380)

Open eduhub-instructor-create-course.html in your browser. The HTML is self-contained and contains its Bootstrap 5 CSS, Font Awesome 6 Free font glyphs, page CSS, and client JavaScript; it requires no external CDN or web service.

Form behavior:
 - All required fields validated before proceeding (title, short/full description, category, level, paid price).
 - Rich-text formatting: bold, italics, lists, headings and validated http/https links.
 - Course thumbnail picker/drop zone: JPG or PNG, max 5 MB, preview, replace, remove. The file is not uploaded to a server.
 - Free and Paid pricing choices update the amount and currency controls.
 - Save as Draft: saves sample course information in browser localStorage only. No remote persistence or publication. Restore with ?restore=1.
 - Continue to Curriculum: validates, saves locally, then offers navigation to eduhub-instructor-course-curriculum.html. The destination is an upcoming separate page.
 - Cancel: prompts for confirmation before returning to My Courses.

Shared integration:
 - Navbar/sidebar/footer INCLUDE comments are preserved for the eventual multi-page build.
 - The assets/css and assets/js files are provided as standalone integration references. They are already inlined in the HTML, so do not add them again unless you remove the inline equivalents.
 - Course thumbnails are not required by this screen; instructor can add one before submission for review.
 - Preview data and links to not-yet-implemented instructor routes are prototypes, not backend features.

Responsive checks: 1440, 834, 390, 320px; JavaScript interactions tested.
