import { describe, test, expect } from 'vitest';
import {
  calculateContrastRatio,
  checkWCAGCompliance,
  getColorCombinations
} from '../color-contrast';

describe('Color Contrast Utilities', () => {
  describe('calculateContrastRatio', () => {
    test('calculates correct ratio for black on white', () => {
      const ratio = calculateContrastRatio('0 0% 0%', '0 0% 100%');
      expect(ratio).toBeCloseTo(21, 0);
    });

    test('calculates correct ratio for white on black', () => {
      const ratio = calculateContrastRatio('0 0% 100%', '0 0% 0%');
      expect(ratio).toBeCloseTo(21, 0);
    });

    test('calculates ratio of 1 for same colors', () => {
      const ratio = calculateContrastRatio('0 0% 50%', '0 0% 50%');
      expect(ratio).toBeCloseTo(1, 0);
    });
  });

  describe('checkWCAGCompliance', () => {
    test('passes for high contrast normal text', () => {
      const result = checkWCAGCompliance('0 0% 0%', '0 0% 100%', false);
      expect(result.passes).toBe(true);
      expect(result.required).toBe(4.5);
    });

    test('passes for high contrast large text', () => {
      const result = checkWCAGCompliance('0 0% 20%', '0 0% 100%', true);
      expect(result.passes).toBe(true);
      expect(result.required).toBe(3.0);
    });

    test('fails for low contrast normal text', () => {
      const result = checkWCAGCompliance('0 0% 80%', '0 0% 100%', false);
      expect(result.passes).toBe(false);
    });
  });

  describe('WCAG 2.1 AA Compliance for Application Colors', () => {
    const combinations = getColorCombinations();

    test('all color combinations meet WCAG 2.1 AA standards', () => {
      const failures: Array<{
        name: string;
        ratio: number;
        required: number;
      }> = [];

      combinations.forEach(combo => {
        const result = checkWCAGCompliance(
          combo.foreground,
          combo.background,
          combo.isLargeText
        );

        if (!result.passes) {
          failures.push({
            name: combo.name,
            ratio: result.ratio,
            required: result.required
          });
        }
      });

      if (failures.length > 0) {
        const failureMessages = failures.map(
          f => `  - ${f.name}: ${f.ratio}:1 (required: ${f.required}:1)`
        ).join('\n');
        
        throw new Error(
          `The following color combinations do not meet WCAG 2.1 AA standards:\n${failureMessages}`
        );
      }

      expect(failures).toHaveLength(0);
    });

    test('primary text on white background meets AA standard', () => {
      const result = checkWCAGCompliance(
        '222.2 47.4% 11.2%',
        '0 0% 100%',
        false
      );
      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThanOrEqual(4.5);
    });

    test('muted text on white background meets AA standard', () => {
      const result = checkWCAGCompliance(
        '215.4 16.3% 42%',
        '0 0% 100%',
        false
      );
      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThanOrEqual(4.5);
    });

    test('primary button text meets AA standard', () => {
      const result = checkWCAGCompliance(
        '210 40% 98%',
        '222.2 47.4% 11.2%',
        false
      );
      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThanOrEqual(4.5);
    });

    test('error text on white background meets AA standard', () => {
      const result = checkWCAGCompliance(
        '0 84.2% 45%',
        '0 0% 100%',
        false
      );
      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThanOrEqual(4.5);
    });

    test('footer text on muted background meets AA standard', () => {
      const result = checkWCAGCompliance(
        '215.4 16.3% 42%',
        '210 40% 96.1%',
        false
      );
      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThanOrEqual(4.5);
    });

    test('large text has lower contrast requirement', () => {
      // A combination that might fail for normal text but pass for large text
      const result = checkWCAGCompliance(
        '222.2 47.4% 11.2%',
        '0 0% 100%',
        true
      );
      expect(result.passes).toBe(true);
      expect(result.required).toBe(3.0);
    });
  });

  describe('Individual color pair tests', () => {
    test.each([
      ['Primary on background', '222.2 47.4% 11.2%', '0 0% 100%', 4.5],
      ['Muted on background', '215.4 16.3% 42%', '0 0% 100%', 4.5],
      ['Primary foreground on primary', '210 40% 98%', '222.2 47.4% 11.2%', 4.5],
      ['Foreground on muted', '222.2 47.4% 11.2%', '210 40% 96.1%', 4.5],
    ])('%s meets minimum contrast ratio', (_, fg, bg, minRatio) => {
      const ratio = calculateContrastRatio(fg, bg);
      expect(ratio).toBeGreaterThanOrEqual(minRatio);
    });
  });
});
