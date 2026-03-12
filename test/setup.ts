import '@testing-library/jest-dom';
import { vi, expect } from 'vitest';
import * as axeMatchers from 'vitest-axe/matchers';

// Extend Vitest expect with axe matchers
expect.extend(axeMatchers);

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  root = null;
  rootMargin = '';
  thresholds = [];
  takeRecords = vi.fn(() => []);

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    // Store callback if needed for testing
  }
}

global.IntersectionObserver = MockIntersectionObserver as any;

// Polyfill for hasPointerCapture (needed for Radix UI Select in jsdom)
if (typeof Element !== 'undefined') {
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = function () {
      return false;
    };
  }
  if (!Element.prototype.setPointerCapture) {
    Element.prototype.setPointerCapture = function () {};
  }
  if (!Element.prototype.releasePointerCapture) {
    Element.prototype.releasePointerCapture = function () {};
  }
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = function () {};
  }
}
