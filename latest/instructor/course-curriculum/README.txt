EduHub — Instructor Workspace / Course Curriculum
=================================================

Screen: Course Curriculum
Figma frames: Desktop 18:57835 (1440×1908), Tablet 18:58054 (834×1912), Mobile 18:58269 (390×2578)
Source: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub

START HERE
Open eduhub-instructor-course-curriculum.html in a modern browser.
This is a self-contained prototype: the compiled Bootstrap 5 and Font Awesome 6 styles, necessary WOFF2 fonts, page CSS and JavaScript are embedded in that HTML. No build command is required. A web connection is optional for loading Google Inter font; local system fonts are the fallback.

Source helpers:
- assets/css/course-curriculum.css — in-scope styles, for future migration into the shared stylesheet
- assets/js/course-curriculum.js — in-scope interaction code, for future migration
- previews/ — reference screenshots for four viewport widths

Figma-matched sample content:
3 sections, 9 lessons, total 2h 12m 50s.
Introduction to C# — Welcome to the Course, What is C#?, Setting Up the Environment.
C# Fundamentals — Variables and Data Types, Operators, Conditional Statements.
Object-Oriented Programming — Classes and Objects, Inheritance, Polymorphism.

Working demo interactions:
- Collapse/expand individual sections
- Add, rename, delete sections; add, rename, delete lessons
- Reorder sections or lessons via drag handles and keyboard ArrowUp/ArrowDown; touch-drop on supported devices
- Confirmation for destructive deletion
- Live summary of lesson counts/duration
- Persist local draft edits to localStorage (key: eduhub-instructor-curriculum-csharp-v1)
- Instructor account dropdown, notification dropdown, mobile drawer and desktop sidebar collapse
- Links to planned instructor My Courses and Course Details / Add Lesson / Edit Lesson routes

Notes / limitations:
This is a client-side prototype with illustrative records. No API calls, content publication, admin review, student data, or production persistence take place. The original publicly published course is not modified. Figma's original vector icon assets could not be retrieved in this runtime; licensed Font Awesome 6 Free substitutes implement those same interface roles. The UI retains the original layout, visible text, and responsive states.
Bootstrap copyright 2011–2024 The Bootstrap Authors, MIT license. Font Awesome Free by Fonticons, Inc.; icons CC BY 4.0 / fonts SIL OFL 1.1 / code MIT. Inter font is retrieved from Google Fonts if connected.

INTEGRATION
Keep existing <!-- INCLUDE: partials/... --> navigation markers; avoid duplicating shared CSS if integrating into the multi-page EduHub project. Wire Add/Edit Lesson route calls and server-side permission/approval rules when corresponding pages and backend are ready.
