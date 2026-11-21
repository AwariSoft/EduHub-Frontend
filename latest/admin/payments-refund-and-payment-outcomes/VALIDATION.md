# EduHub Refund and Payment Outcomes — Validation

Figma frame: https://www.figma.com/design/CTtIqTcIqCn11h7d4XDOGC/EduHub?node-id=26-88522

**Result: 49/49 browser checks passed.**

## Viewport checks

Tested Chromium at: **1120, 1440, 834, 390, 320px**. All have zero horizontal overflow and zero JavaScript errors.

## Figma reference geometry

Original sheet: **1120 × 4435px**, exact.

| Region | Reference x | Reference y | Width | Height | Browser result |
|---|---:|---:|---:|---:|---|
| Refund confirmation | 40 | 249 | 1040 | 695 | exact |
| Refund dialog | 40 | 288 | 512 | 656 | exact |
| Student refund request | 576 | 288 | 504 | 425 | exact |
| Refunded payment details | 40 | 976 | 1040 | 1254 | exact |
| Failed payment | 40 | 2262 | 1040 | 1080 | exact |
| Pending payment | 40 | 3374 | 1040 | 1021 | exact |

Payment record, course-information and outcome-card heights also match the Figma original.

## Interaction tests

Confirmed: default Completed/Active, cancel leaves both unchanged, Close leaves status unchanged, Confirm Refund sets Refunded/Canceled, transaction ID remains, duplicate confirm disabled, refund success highlights, failure and pending records remain unchanged, reset restores initial values, Escape dismisses feedback, local images display in standalone, no missing assets.

## Limitations

The exact Figma course photographs were unavailable for local export, so equivalent EduHub illustrations were reused. The refund action and outcome are local demonstrations with no financial activity, provider integration, backend persistence, or live account data. The heading and section sizes are verified at the original reference viewport; lower-width layouts are adapted responsively rather than being Figma-specified pixel replicas.
