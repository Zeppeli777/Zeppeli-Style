# Repository Guidelines

## Project Structure

`src/` contains the Vue 3 components, their public exports in `index.ts`, the shared stylesheet, and SVG artwork. The Chinese-language showcase lives in `demo/`; browser checks live in `tests/`. Keep `design-plan.html` as the standalone design reference.

## Local Development

Run `npm ci` and `npm run dev` from the project root. Use `npm run build` to type-check and emit the library, and `npm run build:demo` to build the showcase. For the offline design reference, run `Invoke-Item .\design-plan.html` in PowerShell.

## Style and Artwork

Use two spaces for new nested HTML and SVG markup. Name Vue components with the `Zp` prefix, use `zp-` for library classes, and reuse palette variables such as `--zp-green`, `--zp-purple`, and `--zp-gold`. Keep visible interface copy and accessible labels in Simplified Chinese. No formatter or linter is configured.

The showcase cover and progress marker share `src/assets/steel-ball.svg`. Edit that asset once and check both sizes. Preserve the large hexagonal groove and the lines extending from its corners when changing the ball’s color or shading.

## Verification

Install Chromium with `npx playwright install chromium`, then run `npm test` for the desktop and mobile flows. Name browser tests `*.spec.ts`.

Check the affected samples in a browser. For layout changes, inspect widths on both sides of the 680px breakpoint and check for horizontal overflow. For navigation changes, follow each affected anchor using the keyboard and verify that focus stays visible. For chart or progress changes, check the displayed values against their accessible descriptions.

## Commits and Pull Requests

Use a short imperative subject such as `Refine steel-ball grooves at icon size`. In the pull request, identify the changed sample and describe how you checked it. Include before-and-after screenshots for visual changes and link a related issue when one exists.
