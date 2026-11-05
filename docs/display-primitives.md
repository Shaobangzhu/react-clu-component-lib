# Display primitives (P03)

Import components and props from `react-clu-component-lib` only; internal source paths are not exported. Import `react-clu-component-lib/styles.css` once and place components inside an explicit `<div data-clu-theme="light">` or `dark` host. Styles are precompiled; consumers do not install Tailwind or scan CLU classes. Components do not assign themes or mutate the document.

| Component | Contract and intentional omissions |
| --- | --- |
| Button | Native button attributes and React 19 ref prop; default type button. primary/secondary/quiet/danger; small/medium/large. loading preserves children/name, sets aria-busy and native disabled; callers own async state. No promise handling, link polymorphism or automatic loading announcements. |
| IconButton | Button semantics plus a required, nonblank aria-label. Icon children are decorative and aria-hidden; supply your own icon. No icon/font dependency, tooltip, toggle state or accessible-name inference. |
| Card | Div surface with optional header/footer ReactNode slots and children; native div attributes/ref. Caller supplies meaningful headings and landmarks. No click-to-activate behavior or fetching. |
| Badge | Required string label and neutral/success/warning/error/unknown tone. Text conveys meaning in addition to color; no live role by default. No color-only or icon-only badge API. |
| StatusIndicator | Required explicit operational/degraded/unavailable/not_yet_verified/not_configured enum with fixed readable labels. No custom provider types, probing or inferred state; English labels are intentional in v1. |
| StatCard | Required label and value. 0 renders 0; null renders Not available; undefined renders Not observed. Omission of value is a type error; pass undefined intentionally for an unobserved value. Strings display exactly as supplied (including externally formatted currency); no formatting, rounding, calculations, placeholder coercion or fetching. Optional detail is composition. |
| Alert | Static div by default, including error tone. Explicit announcement=polite opts into role=status; urgent opts into role=alert. Consumer decides urgency and timing; reserve urgent for errors needing immediate attention. No auto-dismiss, portals or alert stack. |
| Skeleton | Static decorative span, aria-hidden, no live role, tabIndex or children. Style can set dimensions. Label and aria-busy belong to the containing loading region, not each placeholder. No pulsing animation or artificial loading duration. |
| EmptyState | Labelled section with h2 title, optional description/action composition, unique React useId anchor. Native section attrs/ref. No inferred empty state, network retry or automatic announcements. Callers may supply an explicit aria-label/labelledby if appropriate. |

Native disabled buttons leave the tab sequence and may lose focus when disabled; caller owns workflow focus recovery. All controls use the opt-in token focus ring. Size small is compact (32px minimum height); choose an appropriate target size/spacing for the actual interaction context. Do not nest interactive controls inside Button/IconButton. Unsupported JavaScript enum values are not normalized into invented observations.

The public CSS contains only theme-scoped CLU selectors and public token references. Classes are styling details; props and token contracts are the public customization interfaces. No global reset or new design tokens are introduced. Rendering without the CSS or explicit theme host preserves native semantics but is not the styled presentation.

Each primitive has Default, Dark, Compact and LongContent stories plus relevant variants. Fixed dark stories use the existing Storybook theme convention. Display/Review matrix shows all nine together. Static specimens should not emit repetitive live announcements. Manual screen-reader, zoom, custom overrides, forced-palette and actual consumer integration checks remain necessary; automated semantics and token contrast checks do not certify WCAG compliance.
