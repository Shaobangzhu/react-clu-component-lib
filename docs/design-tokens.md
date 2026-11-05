# Semantic token contract

Cartographic Operations uses warm neutral canvases, clear work surfaces, dark ink and a restrained blue-green accent. Status colors communicate passed meaning; labels must accompany color. These are reviewable CLU choices, not final DGI branding approval.

DGI's four CSS files at `077ae131c324913823bd793105424c5e00a3b389` were read for density, hierarchy, numeric alignment, status and focus demand. `docs/ui.ux.design.png` was inspected as a concept. No class names, CSS implementations, fonts, icons or consumer source were copied.

## Consumer use and isolation

```tsx
import 'react-clu-component-lib/styles.css';

<section data-clu-theme="light" className="my-app-region">
  <button className="clu-focus-ring">Example action</button>
</section>
```

Import CSS once. The attribute defines variables only: it does not paint the host, reset descendants, change global color-scheme, select the OS theme, or mutate document/body. The consumer applies background, typography and colors using the tokens. Empty/unrecognized attribute values use light defaults. A nested explicit host resets every token, so a light region inside a dark region stays light. Avoid assigning the host to html/body or around unrelated third-party widgets when inherited application styles could reach those widgets.

Public contract: `--clu-*` names below, `data-clu-theme="light|dark"`, and opt-in `clu-focus-ring`. Token removals or changes of meaning require a migration/version decision; values may evolve during prerelease visual review. App-specific overrides should follow the CSS import and remain on the host. Internal `clu-gallery-*`, `--clu-gallery-*`, scaffold classes and authoring utilities are private and not package exports. The gallery CSS is Storybook-only.

Surface-canvas is the page backdrop; surface is a working panel; surface-elevated is a raised overlay; surface-subtle is a subordinate region. Text-secondary is descriptive copy; text-muted is readable metadata, not disabled text. Stroke is a control boundary (3:1 target); stroke-subtle is decorative separation and must not be the sole control boundary. Accent/hover pair with accent-text. Semantic foregrounds pair with matching subtle backgrounds. No semantic token represents a domain enum.

Spacing is a 4px step at the default 16px root size, expressed in rem for zoom. Body text starts at 1rem; small metadata should remain legible and never hide essential meaning. Numeric uses tabular lining figures. Shadows express elevation rather than replacing borders. Focus uses a 3px outline and 3px offset, measured against adjacent surfaces. Components must leave space for it and implement visible focus themselves or opt into the class.

## Public inventory

| Token | Light/default | Dark |
| --- | --- | --- |
| `--clu-font-sans` | `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` |
| `--clu-font-mono` | `ui-monospace, SFMono-Regular, Consolas, monospace` | `ui-monospace, SFMono-Regular, Consolas, monospace` |
| `--clu-font-size-xs` | `.75rem` | `.75rem` |
| `--clu-font-size-sm` | `.875rem` | `.875rem` |
| `--clu-font-size-md` | `1rem` | `1rem` |
| `--clu-font-size-lg` | `1.25rem` | `1.25rem` |
| `--clu-font-size-xl` | `1.5rem` | `1.5rem` |
| `--clu-font-size-2xl` | `2rem` | `2rem` |
| `--clu-font-weight-regular` | `400` | `400` |
| `--clu-font-weight-medium` | `500` | `500` |
| `--clu-font-weight-semibold` | `600` | `600` |
| `--clu-font-weight-bold` | `700` | `700` |
| `--clu-line-height-tight` | `1.25` | `1.25` |
| `--clu-line-height-body` | `1.5` | `1.5` |
| `--clu-numeric` | `tabular-nums lining-nums` | `tabular-nums lining-nums` |
| `--clu-radius-sm` | `.25rem` | `.25rem` |
| `--clu-radius-md` | `.5rem` | `.5rem` |
| `--clu-radius-lg` | `.75rem` | `.75rem` |
| `--clu-radius-pill` | `999px` | `999px` |
| `--clu-focus-width` | `3px` | `3px` |
| `--clu-focus-offset` | `3px` | `3px` |
| `--clu-motion-fast` | `120ms` | `120ms` |
| `--clu-motion-normal` | `200ms` | `200ms` |
| `--clu-motion-ease` | `cubic-bezier(.2, 0, 0, 1)` | `cubic-bezier(.2, 0, 0, 1)` |
| `--clu-space-0` | `0px` | `0px` |
| `--clu-space-1` | `0.25rem` | `0.25rem` |
| `--clu-space-2` | `0.5rem` | `0.5rem` |
| `--clu-space-3` | `0.75rem` | `0.75rem` |
| `--clu-space-4` | `1rem` | `1rem` |
| `--clu-space-6` | `1.5rem` | `1.5rem` |
| `--clu-space-8` | `2rem` | `2rem` |
| `--clu-space-12` | `3rem` | `3rem` |
| `--clu-space-16` | `4rem` | `4rem` |
| `--clu-surface-canvas` | `#f5f4ef` | `#111d1f` |
| `--clu-surface` | `#ffffff` | `#19292c` |
| `--clu-surface-elevated` | `#ffffff` | `#223538` |
| `--clu-surface-subtle` | `#eeeee7` | `#293d40` |
| `--clu-text` | `#182c2d` | `#edf2ec` |
| `--clu-text-secondary` | `#405858` | `#c1d1cb` |
| `--clu-text-muted` | `#596e6c` | `#a2b8b2` |
| `--clu-stroke` | `#758581` | `#829d95` |
| `--clu-stroke-subtle` | `#d6dcd6` | `#3d5552` |
| `--clu-stroke-strong` | `#405858` | `#c1d1cb` |
| `--clu-accent` | `#12645f` | `#8ed9c9` |
| `--clu-accent-hover` | `#0a4d49` | `#b2eddf` |
| `--clu-accent-text` | `#ffffff` | `#102c28` |
| `--clu-accent-subtle` | `#e1f0eb` | `#21443e` |
| `--clu-focus` | `#12645f` | `#8ed9c9` |
| `--clu-success` | `#246540` | `#a1dbaf` |
| `--clu-success-subtle` | `#e5f1e7` | `#233e2e` |
| `--clu-warning` | `#78500d` | `#f2d18e` |
| `--clu-warning-subtle` | `#fff0d1` | `#453921` |
| `--clu-error` | `#a23138` | `#ffb4b8` |
| `--clu-error-subtle` | `#ffeaeb` | `#4b292f` |
| `--clu-unknown` | `#526367` | `#b9cdd2` |
| `--clu-unknown-subtle` | `#eaf0f1` | `#2c3e43` |
| `--clu-shadow-raised` | `0 2px 8px #182c2d0d` | `0 2px 8px #00000033` |
| `--clu-shadow-overlay` | `0 16px 48px #182c2d26` | `0 16px 48px #00000066` |

## User preferences and accessibility limits

`prefers-contrast: more` strengthens strokes and secondary/muted text to primary text. `forced-colors: active` uses Canvas/CanvasText and Highlight/HighlightText, and removes shadows; native forced-color adjustment remains enabled. Status labels remain essential because system colors collapse semantic hues. Reduced motion sets both duration tokens to zero only inside the explicit host. Future components must consume these durations and avoid essential animation; the gallery provides a transition-only demonstration.

Automated sRGB checks cover opaque text/surface pairs (4.5:1), state/subtle pairs (4.5:1), accent-text against normal/hover accent (4.5:1), and focus/control boundaries against surfaces (3:1), in both themes. Decorative stroke-subtle is excluded by design. Ratios do not prove rendered contrast under transparency, imagery, custom overrides, OS forced palettes or antialiasing, nor keyboard usability or WCAG compliance. Review real controls, zoom, focus clipping, and user-specific system palettes separately.

Storybook's Theme toolbar wraps each story in a local host; it never changes html/body or localStorage. Fixed Light and Dark gallery stories ignore the toolbar for reproducible review. Compare shows independent, nested theme hosts. No public component API is introduced in P02.

Contrast references: [W3C text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
