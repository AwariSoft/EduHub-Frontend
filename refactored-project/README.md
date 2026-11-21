# EduHub — Consolidated responsive frontend (ZIP #1–#14)

This is a consolidated prototype from 14 uploaded source archives. It contains **75 physical HTML screen files**: 43 main-route/page files (covering the 42-entry main inventory, with an additional public Course Details route) and 32 supporting-state review pages.

## Run locally

```bash
cd dist
python -m http.server 8000
```

Browse http://localhost:8000/ to see the screen catalogue, or navigate to `pages/public/home.html`.

## Where to edit

- `pages/`: readable single-page Bootstrap 5 source with `<!-- INCLUDE: partials/... -->` markers.
- `partials/`: shared Student/Instructor/Admin/Public navigation and footer.
- `assets/css/main.css`: cumulative stylesheet with tokens and reusable UI components (sections 90 and 95).
- `assets/js/main.js`: frontend/demo interactions.
- `scripts/build.py`: resolves partials and `{{BASE}}` tokens, copies assets and compiles to `dist/`.
- `docs/BOOTSTRAP_CLASS_REPLACEMENTS.md`: file-by-file Bootstrap 5 HTML class replacements.
- `docs/CSS_REFACTOR_REPORT.md`: refactor rationale and interactive-state coverage.
- `docs/FINAL_INTEGRATION_AUDIT.md`: fixes, validation and remaining production gaps.
- `docs/FINAL_VALIDATION.json`: output counts and asset checks.
- `docs/master-manifest.json`: source export/viewport mapping.
- `reference/zip-exports/`: exact source exports used as references.

## Status disclaimer

The screens are completed as **runnable frontend prototypes**, not production-ready product features. The 32 supporting-state pages are QA galleries; they have not all been wired into parent workflows. Authentication, payment, enrollment and permission changes require real APIs and role-based authorization. Pixel-level matching for every source export and exhaustive regression testing remain outstanding.

Bootstrap is bundled locally; Font Awesome Free icons are converted to inline SVG in `dist/`. Font files are not redistributed.
