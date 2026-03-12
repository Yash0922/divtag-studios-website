/**
 * Color contrast utilities for WCAG 2.1 AA compliance
 * WCAG 2.1 AA requires:
 * - 4.5:1 contrast ratio for normal text (< 18pt or < 14pt bold)
 * - 3:1 contrast ratio for large text (≥ 18pt or ≥ 14pt bold)
 * - 3:1 contrast ratio for UI components and graphical objects
 */

/**
 * Parse HSL color string to RGB values
 * @param hsl - HSL color string in format "hsl(h s% l%)" or "h s% l%"
 * @returns RGB values as [r, g, b] where each value is 0-255
 */
function hslToRgb(hsl: string): [number, number, number] {
  // Remove "hsl(" and ")" if present, then split by spaces
  const cleaned = hsl.replace(/hsl\(|\)/g, '').trim();
  const parts = cleaned.split(/\s+/);
  
  const h = parseFloat(parts[0]) / 360;
  const s = parseFloat(parts[1].replace('%', '')) / 100;
  const l = parseFloat(parts[2].replace('%', '')) / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Calculate relative luminance of a color
 * @param rgb - RGB values as [r, g, b] where each value is 0-255
 * @returns Relative luminance value between 0 and 1
 */
function getLuminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map(val => {
    const sRGB = val / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors
 * @param color1 - First color in HSL format
 * @param color2 - Second color in HSL format
 * @returns Contrast ratio (1:1 to 21:1)
 */
export function calculateContrastRatio(color1: string, color2: string): number {
  const rgb1 = hslToRgb(color1);
  const rgb2 = hslToRgb(color2);
  
  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if a color combination meets WCAG 2.1 AA standards
 * @param foreground - Foreground color in HSL format
 * @param background - Background color in HSL format
 * @param isLargeText - Whether the text is large (≥ 18pt or ≥ 14pt bold)
 * @returns Object with pass/fail status and actual ratio
 */
export function checkWCAGCompliance(
  foreground: string,
  background: string,
  isLargeText: boolean = false
): { passes: boolean; ratio: number; required: number } {
  const ratio = calculateContrastRatio(foreground, background);
  const required = isLargeText ? 3.0 : 4.5;
  
  return {
    passes: ratio >= required,
    ratio: Math.round(ratio * 100) / 100,
    required
  };
}

/**
 * Color combinations used in the application
 */
export interface ColorCombination {
  name: string;
  foreground: string;
  background: string;
  usage: string;
  isLargeText?: boolean;
}

/**
 * Get all color combinations used in the application
 */
export function getColorCombinations(): ColorCombination[] {
  return [
    // Primary text on background
    {
      name: 'Primary text on white background',
      foreground: '222.2 47.4% 11.2%',
      background: '0 0% 100%',
      usage: 'Main body text, headings',
      isLargeText: false
    },
    // Muted text on background
    {
      name: 'Muted text on white background',
      foreground: '215.4 16.3% 42%',
      background: '0 0% 100%',
      usage: 'Secondary text, descriptions',
      isLargeText: false
    },
    // Primary button
    {
      name: 'Primary button text',
      foreground: '210 40% 98%',
      background: '222.2 47.4% 11.2%',
      usage: 'Button text on primary background',
      isLargeText: false
    },
    // Destructive text (errors)
    {
      name: 'Error text on white background',
      foreground: '0 84.2% 45%',
      background: '0 0% 100%',
      usage: 'Error messages',
      isLargeText: false
    },
    // Success message
    {
      name: 'Success text on green background',
      foreground: '142 71% 25%', // Approximation of text-green-800
      background: '138 76% 97%', // Approximation of bg-green-50
      usage: 'Success messages',
      isLargeText: false
    },
    // Error message background
    {
      name: 'Error text on red background',
      foreground: '0 72% 31%', // Approximation of text-red-800
      background: '0 86% 97%', // Approximation of bg-red-50
      usage: 'Error message backgrounds',
      isLargeText: false
    },
    // Muted text on muted background
    {
      name: 'Muted text on muted background',
      foreground: '215.4 16.3% 42%',
      background: '210 40% 96.1%',
      usage: 'Footer text',
      isLargeText: false
    },
    // Footer background
    {
      name: 'Primary text on muted background',
      foreground: '222.2 47.4% 11.2%',
      background: '210 40% 96.1%',
      usage: 'Footer headings',
      isLargeText: false
    },
    // About section background
    {
      name: 'Primary text on about background',
      foreground: '222.2 47.4% 11.2%',
      background: '210 40% 96.1%', // muted/30 approximation
      usage: 'About section text',
      isLargeText: false
    },
    // Primary icon on light background
    {
      name: 'Primary icon on light background',
      foreground: '222.2 47.4% 11.2%',
      background: '222.2 47.4% 95%', // primary/10 approximation
      usage: 'Service card icons',
      isLargeText: false
    },
    // Link hover states
    {
      name: 'Primary link color on white',
      foreground: '222.2 47.4% 11.2%',
      background: '0 0% 100%',
      usage: 'Navigation links hover',
      isLargeText: false
    },
    // Large text (headings)
    {
      name: 'Large heading text',
      foreground: '222.2 47.4% 11.2%',
      background: '0 0% 100%',
      usage: 'H1, H2, H3 headings',
      isLargeText: true
    }
  ];
}
