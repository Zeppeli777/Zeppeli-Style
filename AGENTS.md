# Repository Guidelines

## Project Structure

`design-plan.html` is the entry point for Zeppeli Style, a Chinese-language design prototype for a planned Vue 3 component library. The file contains the component samples, palette, roadmap, CSS, and SVG artwork. Edit it directly when changing a sample. The project has no package manifest, separate asset directory, or test suite.

## Local Development

From the project root, run `Invoke-Item .\design-plan.html` in PowerShell to open the prototype in your default browser. Refresh after saving changes. The page works offline and requires no dependency installation or build step.

## Style and Artwork

Use two spaces for new nested HTML and SVG markup. Give new CSS classes, custom properties, and SVG IDs short, descriptive kebab-case names. Reuse the palette variables in `:root`, such as `--green`, `--purple`, and `--gold`. Keep visible interface copy and accessible labels in Simplified Chinese. No formatter or linter is configured.

The cover and progress marker share the `#steel-ball` SVG symbol. Edit that symbol once and check both sizes. Preserve the large hexagonal groove and the lines extending from its corners when changing the ball’s color or shading.

## Manual Verification

Check the affected samples in a browser. For layout changes, inspect widths on both sides of the 680px breakpoint and check for horizontal overflow. For navigation changes, follow each affected anchor using the keyboard and verify that focus stays visible. For chart or progress changes, check the displayed values against their accessible descriptions.

## Commits and Pull Requests

This directory has no Git history to establish a commit convention. When contributing through Git, use a short imperative subject such as `Refine steel-ball grooves at icon size`. In the pull request, identify the changed sample and describe how you checked it. Include before-and-after screenshots for visual changes and link a related issue when one exists.
