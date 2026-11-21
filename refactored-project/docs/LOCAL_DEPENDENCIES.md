# Offline runtime and licensing

- Bootstrap **5.3.6** CSS and bundled JS are vendored in `assets/vendor/bootstrap/` from the system's licensed MIT distribution. These assets are not fonts.
- The project source uses Font Awesome 6 Free icon classes. On compilation, matching **Font Awesome 6 Free SVG icon shapes** are inlined into the compiled HTML. They are icons, **not font files**. Original Font Awesome Free SVG icon licensing: CC BY 4.0; https://fontawesome.com/license/free.
- Original source HTML retains an optional online Font Awesome CSS reference as a development fallback. Core navigation, form controls, tabs and modals in `dist/` do not depend on that CDN.
- Inter is loaded from Google Fonts when online; the documented font stack falls back to Arial when offline. No font binaries are packaged.
- There is no live authentication, database, or payment provider.
