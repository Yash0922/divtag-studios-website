'use client';

import { useMemo } from 'react';

const CODE_CHARS = '{}[]()<>;=,.\\/&|!*@#%+0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const TARGET_SPANS = 800;

/**
 * Code matrix background for About and FAQ sections.
 * Renders a grid of coding characters with theme-matched pulse animation.
 */
export function CodeMatrixBackground() {
  const chars = useMemo(() => {
    let s = '';
    while (s.length < TARGET_SPANS) s += CODE_CHARS;
    return s.slice(0, TARGET_SPANS).split('');
  }, []);

  return (
    <div className="section-matrix-pattern" aria-hidden>
      {chars.map((char, i) => (
        <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
      ))}
    </div>
  );
}
