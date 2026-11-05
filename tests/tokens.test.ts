// @vitest-environment node
import { beforeAll, describe, expect, it } from 'vitest';
import { build, loadConfigFromFile } from 'vite';

let css = '';
beforeAll(async () => {
  const loaded = await loadConfigFromFile({ command: 'build', mode: 'production' }, 'vite.config.ts');
  if (!loaded) throw new Error('Missing library configuration');
  const result = await build({ ...loaded.config, configFile: false, logLevel: 'silent', build: { ...loaded.config.build, write: false, minify: false, cssMinify: false } });
  for (const output of Array.isArray(result) ? result : [result]) {
    if (!('output' in output)) throw new Error('Expected bundle output');
    for (const asset of output.output) {
      if (asset.type === 'asset' && asset.fileName.endsWith('.css')) css += String(asset.source);
    }
  }
});

function tokens(selector: string): Record<string, string> {
  const blocks = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
  const block = blocks.find(match => match[1]?.trim() === selector)?.[2];
  if (!block) throw new Error(`Missing built theme: ${selector}`);
  const result: Record<string, string> = {};
  for (const match of block.matchAll(/--clu-([\w-]+):\s*([^;]+);/g)) {
    if (match[1] && match[2]) result[match[1]] = match[2].trim();
  }
  return result;
}
function luminance(hex: string) {
  if (/^#[\da-f]{3}$/i.test(hex)) hex = hex.replace(/[\da-f]/gi, channel => channel + channel);
  if (!/^#[\da-f]{6}$/i.test(hex)) throw new Error(`Expected opaque sRGB token: ${hex}`);
  const channels = [1, 3, 5].map(start => {
    const value = parseInt(hex.slice(start, start + 2), 16) / 255;
    return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
  });
  return (channels[0] ?? 0) * .2126 + (channels[1] ?? 0) * .7152 + (channels[2] ?? 0) * .0722;
}
function ratio(a: string, b: string) {
  const values = [luminance(a), luminance(b)];
  return (Math.max(...values) + .05) / (Math.min(...values) + .05);
}

describe('built consumer CSS contract', () => {
  it('ships required public tokens and only explicitly scoped leaf rules', () => {
    expect(css.length).toBeGreaterThan(1000);
    for (const rule of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      const selector = (rule[1] ?? '').replace(/@layer[\w\s,-]+;/g, '').trim();
      for (const part of selector.split(',')) expect(part.trim()).toMatch(/^\[data-clu-theme(?:="dark")?\]/);
      for (const name of rule[2]?.matchAll(/(--[\w-]+)\s*:/g) ?? []) expect(name[1]).toMatch(/^--clu-/);
    }
    expect(css).not.toMatch(/@import|@property|@font-face|:root|:host|\.card\b|\.table\b|box-sizing/);
    const light = tokens('[data-clu-theme]');
    for (const name of ['surface-canvas', 'text', 'accent', 'stroke', 'success', 'warning', 'error', 'unknown', 'space-4', 'font-sans', 'font-size-md', 'numeric', 'radius-md', 'focus-width', 'shadow-overlay', 'motion-normal']) expect(light[name]).toBeDefined();
  });
  it('includes scoped preference fallbacks and opt-in keyboard focus', () => {
    expect(css).toContain('prefers-reduced-motion: reduce');
    expect(css).toContain('prefers-contrast: more');
    expect(css).toContain('forced-colors: active');
    expect(css).toMatch(/--clu-motion-normal:\s*0(?:ms|s)/);
    expect(css).toContain('HighlightText');
    expect(css).toContain('.clu-focus-ring:focus-visible');
    expect(css).not.toContain('forced-color-adjust: none');
  });
  for (const theme of ['light', 'dark']) {
    it(`${theme}: meets contrast targets for named text, status, accent, boundary and focus pairs`, () => {
      const values = { ...tokens('[data-clu-theme]'), ...(theme === 'dark' ? tokens('[data-clu-theme="dark"]') : {}) };
      const check = (foreground: string, background: string, minimum: number) => {
        expect(ratio(values[foreground] ?? '', values[background] ?? ''), `${theme}: ${foreground}/${background}`).toBeGreaterThanOrEqual(minimum);
      };
      for (const surface of ['surface-canvas', 'surface', 'surface-elevated', 'surface-subtle']) {
        for (const text of ['text', 'text-secondary', 'text-muted']) check(text, surface, 4.5);
        check('focus', surface, 3);
        check('stroke', surface, 3);
      }
      for (const state of ['success', 'warning', 'error', 'unknown', 'accent']) check(state, `${state}-subtle`, 4.5);
      check('accent-text', 'accent', 4.5);
      check('accent-text', 'accent-hover', 4.5);
    });
  }
});
