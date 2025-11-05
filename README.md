# react-clu-component-lib

> A small, from-scratch React 18 + TypeScript component library project with SCSS modules and unit tests.  
> Built to practice library architecture, styling patterns, and testing with React Testing Library.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-modules-CC6699?logo=sass&logoColor=white)
![Jest](https://img.shields.io/badge/Tested%20with-Jest%20%2B%20RTL-99425B?logo=jest)

---

## ✨ What’s inside

- **React 18** + **TypeScript** for strongly-typed components
- **SCSS modules** with partials (`_variables.scss`, `_mixins.scss`) for scalable styles
- **Unit tests** with **Jest** + **@testing-library/react**
- A simple **playground app** (CRA) for local development and manual testing

> Current components (WIP): **Button**, **Menu / MenuItem / SubMenu**, **Alert**  
> Add more by following the same folder conventions.

---

## 🚀 Quick start

```bash
# 1) Install
npm install

# 2) Run the local playground (Create React App)
npm start

# 3) Run unit tests (watch mode)
npm test

# 4) Build the app
npm run build
```

> This repository currently ships as a CRA playground, **not** an npm package.  
> If you plan to publish to npm later, see the “Publishing roadmap” below.

---

## 📦 Project structure

```
react-clu-component-lib/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ Button/
│  │  ├─ Menu/
│  │  │  ├─ MenuItem/
│  │  │  └─ SubMenu/
│  │  └─ Alert/
│  ├─ styles/
│  │  ├─ _variables.scss     # shared tokens (colors, spacing, z-index, etc.)
│  │  └─ _mixins.scss        # helpers (clearfix, truncation, etc.)
│  ├─ App.tsx                # playground usage
│  └─ index.tsx
├─ package.json
└─ README.md
```

> Naming and exact files may vary slightly as you iterate, but the idea is:
> one folder per component with its `.tsx`, `.module.scss`, and tests.

---

## 🧩 Usage (in the local playground)

```tsx
// src/App.tsx
import React from 'react';
// Adjust import paths to match your component locations:
import Button from './components/Button';
import Menu, { MenuItem, SubMenu } from './components/Menu';
import Alert from './components/Alert';

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <h1>CLU Component Library — Playground</h1>

      <section>
        <h2>Button</h2>
        <Button onClick={() => console.log('clicked')}>Primary</Button>
      </section>

      <section>
        <h2>Menu</h2>
        <Menu defaultIndex={0} mode="horizontal" onSelect={(i) => console.log('select', i)}>
          <MenuItem>Home</MenuItem>
          <MenuItem disabled>Disabled</MenuItem>
          <SubMenu title="More">
            <MenuItem>About</MenuItem>
            <MenuItem>Contact</MenuItem>
          </SubMenu>
        </Menu>
      </section>

      <section>
        <h2>Alert</h2>
        <Alert type="success" title="Success">Everything looks good.</Alert>
      </section>
    </div>
  );
}
```

---

## 🎨 Styling conventions

- **SCSS Modules** per component (`Component.module.scss`) to avoid global leaks
- **Design tokens** in `styles/_variables.scss` (colors, spacing, radius, shadows)
- **Mixins** in `styles/_mixins.scss` (media queries, text utilities, etc.)
- Prefer BEM-like naming *inside* each module for clarity, e.g. `.btn`, `.btn--primary`

---

## ✅ Testing

- Framework: **Jest** + **@testing-library/react**
- Goals: render without crashing, respond to user interactions, apply correct classes/variants, and respect disabled/aria attributes

Example (Alert):

```tsx
import { render, fireEvent } from '@testing-library/react';
import Alert from './Alert';

test('renders and closes', () => {
  const onClose = jest.fn();
  const { getByText, queryByText } = render(<Alert title="Notice" onClose={onClose} />);
  expect(getByText('Notice')).toBeInTheDocument();
  fireEvent.click(getByText(/close/i));
  expect(onClose).toHaveBeenCalled();
  expect(queryByText('Notice')).not.toBeInTheDocument();
});
```

Run tests:

```bash
npm test
```

---

## 🛠️ Component checklist (template)

When adding a new component:

- [ ] **API** defined (props, events, accessibility)
- [ ] **Variants** & **sizes** (e.g., `type="primary|default|danger"`, `size="sm|md|lg"`)
- [ ] **Disabled/focus** states & keyboard support
- [ ] **SCSS module** + tokens/mixins
- [ ] **Unit tests** for rendering, interactions, a11y attributes
- [ ] **Docs**: short README snippet and usage example in `App.tsx`

---

## 🗺️ Roadmap

- [ ] Package build for npm (e.g., `rollup`/`tsup` build to `dist/` with `types`)
- [ ] API-level **Storybook** for interactive docs and snapshots
- [ ] **Theming** with CSS variables (light/dark) mapped from SCSS tokens
- [ ] **Accessibility** pass across all components (ARIA roles, keyboard nav)
- [ ] **CI** with GitHub Actions: lint, test, build on PRs; release tagging

---

## 🤝 Contributing

PRs and issues are welcome!  
If you’re adding a component, please follow the **Component checklist** and include tests.

1. Fork & clone
2. Create a feature branch
3. Commit with clear messages
4. Open a PR

---

## 📄 License

No explicit license is set yet. If you plan to open-source, consider adding an MIT license.  
© 2025 Chaoran Lu

---
### Author
**Chaoran Lu (CLU)** — React/TS enthusiast building a personal component library for learning and reuse.
