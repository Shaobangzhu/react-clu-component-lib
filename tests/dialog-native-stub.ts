// jsdom has no top layer, inertness or native Tab/Escape algorithm.
// This local stub checks React lifecycle/event contracts only; see browser evidence.
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
const prototype = HTMLDialogElement.prototype;
const originals = ['showModal', 'close'].map(name => [name, Object.getOwnPropertyDescriptor(prototype, name)] as const);
afterEach(() => { cleanup(); for (const [name, descriptor] of originals) { if (descriptor) Object.defineProperty(prototype, name, descriptor); else Reflect.deleteProperty(prototype, name); } });
export function stubDialog() {
  Object.defineProperties(prototype, {
    showModal: { configurable: true, value: vi.fn(function (this: HTMLDialogElement) { this.open = true; }) },
    close: { configurable: true, value: vi.fn(function (this: HTMLDialogElement) {
      this.open = false;
      queueMicrotask(() => { this.dispatchEvent(new Event('close')); });
    }) },
  });
}
