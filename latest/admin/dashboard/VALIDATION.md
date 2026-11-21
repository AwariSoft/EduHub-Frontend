# Admin Dashboard — Validation

**Figma source:** `26:84277` (desktop); `26:84503` (tablet); `26:84716` (mobile).

## Browser test setup

Chromium / Playwright, self-contained offline HTML loaded directly without network. All requested assets load from embedded/local sources; no external API requests.

| Width | Horizontal overflow | JavaScript errors | Local image loading |
|---|---|---|---|
| 1440px | None | None | 3/3 |
| 834px | None | None | 3/3 |
| 390px | None | None | 3/3 |
| 320px | None | None | 3/3 |

**31/31 checks passed**, including:

- Six metrics and three source-record rows per content panel.
- Notification open / Escape close.
- Account menu open / mutually exclusive menus.
- Course details preview open, correct course content, and Escape close.
- Real-time search matching approval, user and payment samples; clearing restores the original results.
- Mobile drawer open and close; mobile search open and filtering.
- No Javascript errors, no horizontal overflow, all three local illustrations loading.

## Visual checks

- Desktop resulting height ≈ 1947px vs Figma artboard 1942px.
- Layout follows the source 232px sidebar and 76px header at desktop, 76px compact left rail at tablet, and compact mobile header with drawer.
- Responsive content arrangement follows source: 3×2 summary cards desktop/tablet, 2×3 summary cards mobile, stack community activity on tablet and mobile.
- Original Figma thumbnails were replaced with bundled EduHub illustrations because the exact Figma source media download failed in this runtime. This is a known, documented visual deviation.
- The demo's course review modal and dropdown overlays are interactive enhancements; Figma source was the static dashboard state.

## Boundaries

No connected backend, no real approvals, no user/payment changes, and no other admin pages included in this screen deliverable. Navigation references are integration points for those future screens.
