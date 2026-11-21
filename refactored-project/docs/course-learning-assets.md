# Course Learning — asset inventory (ZIP #7 and ZIP #8)

Copied original screen-specific graphics to `assets/images/learning/`:
- `Video-play-target@2x.png` — player play target reference
- `Video-seek-track@2x.png` — video seek-track reference

The responsive implementation uses native CSS and Bootstrap controls instead of embedding these static images, enabling keyboard interaction. The original assets remain packaged for fidelity review. `Progress-track@2x.png` and `Progress-track1@2x.png` are replaced by accessible Bootstrap progress components. The exports do not contain a playable video or the three downloadable resource files; the UI makes those limitations explicit. Shared `public/*.svg` navigation and playback icons are replaced by Font Awesome 6 Free.
