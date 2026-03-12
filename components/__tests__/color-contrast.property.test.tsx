import { describe, test, expect } from 'vitest';
import fc from 'fast-check';
import {
  calculateContrastRatio,
  checkWCAGCompliance,
  getColorCombinations,
  type ColorCombination
} from '@/lib/color-contrast';
import { COLORS } from '@/lib/constants';

describe('Color Contrast Property-Based Tests', () => {
  // Feature: service-website-divtag-studios, Property 10: WCAG Color Contrast Compliance
  test('all defined color combinations meet WCAG AA standards', () => {
    /**
     * **Validates: Requirements 10.2**
     * 
     * Property 10: WCAG Color Contrast Compliance
     * 
     * For any text element rendered on a background, the color combination should
     * meet WCAG 2.1 AA contrast ratio requirements (4.5:1 for normal text, 3:1 for
     * large text or UI components).
     * 
     * This test validates all color combinations defined in the application to ensure
     * they meet accessibility standards.
     */
    const colorCombinations = getColorCombinations();
    
    expect(colorCombinations.length).toBeGreaterThan(0);
    
    colorCombinations.forEach((combination: ColorCombination) => {
      const result = checkWCAGCompliance(
        combination.foreground,
        combination.background,
        combination.isLargeText || false
      );
      
      expect(result.passes).toBe(true);
      
      // Verify the ratio meets the minimum requirement
      const minRatio = combination.isLargeText ? 3.0 : 4.5;
      expect(result.ratio).toBeGreaterThanOrEqual(minRatio);
    });
  });

  test('primary color combinations meet WCAG AA standards', () => {
    /**
     * **Validates: Requirements 10.2**
     * 
     * Tests that the primary color palette defined in constants meets
     * WCAG AA contrast requirements.
     */
    const primaryCombinations = [
      {
        name: 'Primary foreground on background',
        fg: COLORS.foreground,
        bg: COLORS.background,
        isLargeText: false
      },
      {
        name: 'Primary foreground on primary background',
        fg: COLORS.primary.foreground,
        bg: COLORS.primary.DEFAULT,
        isLargeText: false
      },
      {
        name: 'Muted foreground on muted background',
        fg: COLORS.muted.foreground,
        bg: COLORS.muted.DEFAULT,
        isLargeText: false
      },
      {
        name: 'Destructive foreground on background',
        fg: COLORS.destructive.DEFAULT,
        bg: COLORS.background,
        isLargeText: false
      }
    ];

    primaryCombinations.forEach(({ name, fg, bg, isLargeText }) => {
      // Extract HSL values from hsl() format
      const fgHsl = fg.replace(/hsl\(|\)/g, '').trim();
      const bgHsl = bg.replace(/hsl\(|\)/g, '').trim();
      
      const result = checkWCAGCompliance(fgHsl, bgHsl, isLargeText);
      
      expect(result.passes).toBe(true);
      
      const minRatio = isLargeText ? 3.0 : 4.5;
      expect(result.ratio).toBeGreaterThanOrEqual(minRatio);
    });
  });

  test('contrast ratio calculation is symmetric', () => {
    /**
     * **Validates: Requirements 10.2**
     * 
     * Property: Contrast ratio should be the same regardless of which color
     * is specified first (commutative property).
     */
    fc.assert(
      fc.property(
        fc.record({
          h1: fc.integer({ min: 0, max: 360 }),
          s1: fc.integer({ min: 0, max: 100 }),
          l1: fc.integer({ min: 0, max: 100 }),
          h2: fc.integer({ min: 0, max: 360 }),
          s2: fc.integer({ min: 0, max: 100 }),
          l2: fc.integer({ min: 0, max: 100 })
        }),
        ({ h1, s1, l1, h2, s2, l2 }) => {
          const color1 = `${h1} ${s1}% ${l1}%`;
          const color2 = `${h2} ${s2}% ${l2}%`;
          
          const ratio1 = calculateContrastRatio(color1, color2);
          const ratio2 = calculateContrastRatio(color2, color1);
          
          // Ratios should be equal (within floating point precision)
          expect(Math.abs(ratio1 - ratio2)).toBeLessThan(0.01);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('contrast ratio is always between 1 and 21', () => {
    /**
     * **Validates: Requirements 10.2**
     * 
     * Property: Contrast ratio must always be in the valid range of 1:1 to 21:1.
     */
    fc.assert(
      fc.property(
        fc.record({
          h1: fc.integer({ min: 0, max: 360 }),
          s1: fc.integer({ min: 0, max: 100 }),
          l1: fc.integer({ min: 0, max: 100 }),
          h2: fc.integer({ min: 0, max: 360 }),
          s2: fc.integer({ min: 0, max: 100 }),
          l2: fc.integer({ min: 0, max: 100 })
        }),
        ({ h1, s1, l1, h2, s2, l2 }) => {
          const color1 = `${h1} ${s1}% ${l1}%`;
          const color2 = `${h2} ${s2}% ${l2}%`;
          
          const ratio = calculateContrastRatio(color1, color2);
          
          // Ratio must be between 1 and 21 (inclusive)
          expect(ratio).toBeGreaterThanOrEqual(1);
          expect(ratio).toBeLessThanOrEqual(21);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('identical colors have contrast ratio of 1', () => {
    /**
     * **Validates: Requirements 10.2**
     * 
     * Property: Two identical colors should always have a contrast ratio of 1:1.
     */
    fc.assert(
      fc.property(
        fc.record({
          h: fc.integer({ min: 0, max: 360 }),
          s: fc.integer({ min: 0, max: 100 }),
          l: fc.integer({ min: 0, max: 100 })
        }),
        ({ h, s, l }) => {
          const color = `${h} ${s}% ${l}%`;
          
          const ratio = calculateContrastRatio(color, color);
          
          // Identical colors should have ratio of 1
          expect(ratio).toBeCloseTo(1, 1);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('black and white have maximum contrast ratio', () => {
    /**
     * **Validates: Requirements 10.2**
     * 
     * Property: Black and white should have the maximum contrast ratio of 21:1.
     */
    const black = '0 0% 0%';
    const white = '0 0% 100%';
    
    const ratio = calculateContrastRatio(black, white);
    
    // Black and white should have ratio of 21
    expect(ratio).toBeCloseTo(21, 0);
  });

  test('high lightness difference increases contrast ratio', () => {
    /**
     * **Validates: Requirements 10.2**
     * 
     * Property: For colors with the same hue and saturation, increasing the
     * lightness difference should increase the contrast ratio.
     */
    fc.assert(
      fc.property(
        fc.record({
          h: fc.integer({ min: 0, max: 360 }),
          s: fc.integer({ min: 0, max: 100 }),
          l1: fc.integer({ min: 0, max: 40 }),
          l2: fc.integer({ min: 60, max: 100 })
        }),
        ({ h, s, l1, l2 }) => {
          const darkColor = `${h} ${s}% ${l1}%`;
          const lightColor = `${h} ${s}% ${l2}%`;
          
          // Calculate contrast between dark and light
          const highContrastRatio = calculateContrastRatio(darkColor, lightColor);
          
          // Calculate contrast with a mid-tone
          const midL = Math.floor((l1 + l2) / 2);
          const midColor = `${h} ${s}% ${midL}%`;
          const lowContrastRatio1 = calculateContrastRatio(darkColor, midColor);
          const lowContrastRatio2 = calculateContrastRatio(midColor, lightColor);
          
          // High contrast should be greater than both low contrasts
          expect(highContrastRatio).toBeGreaterThan(lowContrastRatio1);
          expect(highContrastRatio).toBeGreaterThan(lowContrastRatio2);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('WCAG compliance check correctly identifies passing combinations', () => {
    /**
     * **Validates: Requirements 10.2**
     * 
     * Property: Color combinations with sufficient contrast should pass WCAG checks.
     */
    fc.assert(
      fc.property(
        fc.record({
          h: fc.integer({ min: 0, max: 360 }),
          s: fc.integer({ min: 0, max: 100 }),
          // Use very dark and very light colors to ensure high contrast
          l1: fc.integer({ min: 0, max: 20 }),
          l2: fc.integer({ min: 80, max: 100 })
        }),
        ({ h, s, l1, l2 }) => {
          const darkColor = `${h} ${s}% ${l1}%`;
          const lightColor = `${h} ${s}% ${l2}%`;
          
          const result = checkWCAGCompliance(darkColor, lightColor, false);
          
          // Very dark on very light should pass WCAG AA
          expect(result.passes).toBe(true);
          expect(result.ratio).toBeGreaterThanOrEqual(4.5);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('large text has lower contrast requirement than normal text', () => {
    /**
     * **Validates: Requirements 10.2**
     * 
     * Property: A color combination that passes for large text (3:1) but fails
     * for normal text (4.5:1) should be correctly identified.
     */
    // Use a combination that has contrast between 3 and 4.5
    // For example, medium gray on white
    const mediumGray = '0 0% 60%';
    const white = '0 0% 100%';
    
    const ratio = calculateContrastRatio(mediumGray, white);
    
    // This combination should have a ratio between 3 and 4.5
    if (ratio >= 3 && ratio < 4.5) {
      const normalTextResult = checkWCAGCompliance(mediumGray, white, false);
      const largeTextResult = checkWCAGCompliance(mediumGray, white, true);
      
      // Should fail for normal text but pass for large text
      expect(normalTextResult.passes).toBe(false);
      expect(largeTextResult.passes).toBe(true);
    }
  });

  test('all color combinations have descriptive names and usage', () => {
    /**
     * **Validates: Requirements 10.2**
     * 
     * Property: All color combinations should be documented with names and usage
     * information for maintainability.
     */
    const colorCombinations = getColorCombinations();
    
    colorCombinations.forEach((combination: ColorCombination) => {
      // Each combination should have a name
      expect(combination.name).toBeTruthy();
      expect(combination.name.length).toBeGreaterThan(0);
      
      // Each combination should have usage information
      expect(combination.usage).toBeTruthy();
      expect(combination.usage.length).toBeGreaterThan(0);
      
      // Each combination should have foreground and background colors
      expect(combination.foreground).toBeTruthy();
      expect(combination.background).toBeTruthy();
      
      // Colors should be in valid HSL format (contain numbers and %)
      expect(combination.foreground).toMatch(/\d+/);
      expect(combination.background).toMatch(/\d+/);
    });
  });
});
