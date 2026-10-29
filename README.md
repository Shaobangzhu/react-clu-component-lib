# CLU Component Library

**Reusable, type-safe React UI components for modern operations dashboards.**

CLU is an independently engineered React component library built to explore the full lifecycle of frontend component development: **API design, accessibility, testing, documentation, packaging, and integration**. Its first intended consumer is **Solar Compute Operations Center (SCOC)**, a separate application for monitoring home compute infrastructure.

> **Project status — rebuild in progress.** The current `master` branch contains the earlier React 18 / Create React App learning project. The React 19 library, npm distribution, and SCOC integration described below are **planned**, not yet shipped.

## Engineering Focus

- **React & TypeScript:** composable APIs, strict prop types, native DOM attributes, refs, and controlled/uncontrolled state.
- **Accessible interactions:** semantic HTML, keyboard navigation, focus management, and appropriate ARIA behavior.
- **Design consistency:** Tailwind CSS v4, reusable design tokens, theme support, and isolated library styles.
- **Quality engineering:** Vitest, React Testing Library, user-event, Storybook interaction tests, and consumer smoke tests.
- **Library delivery:** ESM builds, TypeScript declarations, React peer dependencies, semantic versioning, and npm releases.

## Target Stack

| Area                | Technology                                |
| ------------------- | ----------------------------------------- |
| UI                  | React 19, TypeScript (strict)             |
| Styling             | Tailwind CSS v4, CSS custom properties    |
| Development & build | Vite (library mode)                       |
| Testing             | Vitest, React Testing Library, user-event |
| Documentation       | Storybook (React + Vite)                  |
| Distribution        | Versioned npm package (ESM + types + CSS) |

## Component Scope

| Foundation                 | Interactive & data         |
| -------------------------- | -------------------------- |
| Button, Card, Badge        | Input, Select, Tabs        |
| Alert, Spinner, EmptyState | Progress, Table primitives |

The library owns **reusable UI primitives**, not application-specific logic. GPU telemetry, node health, energy metrics, and marketplace workflows belong to SCOC and compose CLU components.

## Architecture

```text
CLU source (React + TypeScript + Tailwind)
        |
        +--> Storybook + component tests
        |
        v
Vite library build --> ESM + types + compiled CSS
        |
        v
Versioned npm package
        |
        v
SCOC (independent React application)
```

**Key design boundary:** SCOC will consume a published CLU package rather than copy component source. Package exports, styling isolation, and a separate consumer build will be tested before release.

## Roadmap

- [ ] **Foundation:** archive the learning baseline; initialize React 19, Vite, Tailwind, Vitest, and Storybook.
- [ ] **Components:** implement and document the small set of primitives required by the SCOC MVP.
- [ ] **Quality & packaging:** add accessibility coverage, declaration generation, `npm pack` validation, and consumer tests.
- [ ] **Release & integration:** publish a versioned package and use it in SCOC.

Setup instructions, live Storybook, CI status, and package installation commands will be added **when those capabilities are available**.

## Project Background

This repository began as a React/TypeScript component-library learning exercise. CLU's new architecture and implementations are being developed as an independent engineering portfolio, with learning-stage history retained for transparency. No employer-proprietary code or internal assets are used.

**Maintainer:** [Chaoran Lu](https://github.com/Shaobangzhu)  
**Repository:** [react-clu-component-lib](https://github.com/Shaobangzhu/react-clu-component-lib)
