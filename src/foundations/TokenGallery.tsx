import { useId } from 'react';
import './gallery.css';

const surfaces = ['surface-canvas', 'surface', 'surface-elevated', 'surface-subtle'] as const;
const states = ['success', 'warning', 'error', 'unknown'] as const;
const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
const spaces = [1, 2, 3, 4, 6, 8, 12, 16] as const;

/** Storybook-only review specimen, excluded from the public library entry. */
export function TokenGallery() {
  const notesId = useId();
  return (
    <article aria-label="CLU token gallery" className="clu-gallery">
      <header className="clu-gallery-heading">
        <span className="clu-gallery-eyebrow">CLU / Design foundations / 02</span>
        <h1 className="clu-gallery-title">Cartographic Operations</h1>
        <p className="clu-gallery-copy">Quiet surfaces. Clear signals. Room for the details.</p>
        <p className="clu-gallery-meta">Semantic tokens · visual proposal · system fonts</p>
      </header>
      <section className="clu-gallery-section" aria-label="Surfaces">
        <h2 className="clu-gallery-section-title">01 / Surfaces & hierarchy</h2>
        <div className="clu-gallery-grid">
          {surfaces.map(token => (
            <article key={token} className="clu-gallery-surface" style={{ background: `var(--clu-${token})` }}>
              <span className="clu-gallery-number">01—24</span>
              <strong>{token}</strong>
              <code className="clu-gallery-code">--clu-{token}</code>
              <span className="clu-gallery-meta">Readable supporting information</span>
            </article>
          ))}
        </div>
      </section>
      <section className="clu-gallery-section" aria-label="Typography">
        <h2 className="clu-gallery-section-title">02 / Type & numbers</h2>
        <div className="clu-gallery-type-list">
          {sizes.map(size => (
            <div key={size} className="clu-gallery-type-row">
              <code className="clu-gallery-code">font-size-{size}</code>
              <span style={{ fontSize: `var(--clu-font-size-${size})` }}>Clarity at every scale · 0123456789</span>
            </div>
          ))}
        </div>
      </section>
      <section className="clu-gallery-section" aria-label="Semantic states">
        <h2 className="clu-gallery-section-title">03 / Signals with meaning</h2>
        <div className="clu-gallery-grid">
          {states.map(state => (
            <div key={state} className="clu-gallery-state" style={{ color: `var(--clu-${state})`, background: `var(--clu-${state}-subtle)` }}>
              <strong>{state}</strong><span>Explicit label + semantic color</span>
              <code className="clu-gallery-code">--clu-{state}</code>
            </div>
          ))}
        </div>
      </section>
      <section className="clu-gallery-section" aria-label="Spacing">
        <h2 className="clu-gallery-section-title">04 / A measured rhythm</h2>
        <div className="clu-gallery-spacing">
          {spaces.map(space => (
            <div key={space} className="clu-gallery-space-row">
              <code className="clu-gallery-code">space-{space}</code>
              <span className="clu-gallery-space-bar" style={{ width: `var(--clu-space-${String(space)})` }} />
              <span className="clu-gallery-meta">{space * 4}px at 16px root</span>
            </div>
          ))}
        </div>
      </section>
      <section className="clu-gallery-section" aria-label="Focus and elevation">
        <h2 className="clu-gallery-section-title">05 / Focus, shape & motion</h2>
        <p className="clu-gallery-copy">Tab to the specimens. Hover to inspect the accent. Motion follows your system preference.</p>
        <div className="clu-gallery-actions">
          <button type="button" className="clu-gallery-action clu-focus-ring">Focus specimen</button>
          <a href={`#${notesId}`} className="clu-gallery-link clu-focus-ring">Review notes</a>
        </div>
        <div className="clu-gallery-grid">
          {(['sm', 'md', 'lg', 'pill'] as const).map(radius => (
            <div key={radius} className="clu-gallery-elevation" style={{ borderRadius: `var(--clu-radius-${radius})` }}>
              <code className="clu-gallery-code">radius-{radius}</code><span>shadow-raised</span>
            </div>
          ))}
        </div>
      </section>
      <footer id={notesId} className="clu-gallery-notes">
        <strong>Designed for review</strong>
        <p className="clu-gallery-copy">These are foundation specimens, not shipped components. Contrast checks cover named opaque pairs; actual controls, overrides and system palettes still need review.</p>
      </footer>
    </article>
  );
}
