'use client';

import { useEffect, useRef } from 'react';

const CODE_CHARS = '{}[]()<>;=,.\\/&|!*@#%+0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

interface Cell {
  char: string;
  alpha: number;
  baseAlpha: number;
  isPulsing: boolean;
  pulseStep: number;
}

/**
 * CodeMatrixBackground component.
 * Renders a full-bleed, responsive matrix of code characters on an HTML5 canvas.
 * Seamlessly covers 100% of any container from top to bottom on mobile, tablet, and desktop
 * without blank bands, clipping, or DOM overload.
 */
export function CodeMatrixBackground({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let grid: Cell[][] = [];
    let cols = 0;
    let rows = 0;
    let cellW = 36;
    let cellH = 36;
    let fontSize = 13;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const initGrid = (w: number, h: number) => {
      // Mobile-friendly scale
      const isMobile = w < 640;
      cellW = isMobile ? 26 : 36;
      cellH = isMobile ? 26 : 36;
      fontSize = isMobile ? 11 : 13;

      cols = Math.ceil(w / cellW) + 1;
      rows = Math.ceil(h / cellH) + 1;

      grid = [];
      for (let r = 0; r < rows; r++) {
        const rowCells: Cell[] = [];
        for (let c = 0; c < cols; c++) {
          const char = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
          const baseAlpha = 0.06 + Math.random() * 0.05; // 6% to 11% opacity
          rowCells.push({
            char,
            alpha: baseAlpha,
            baseAlpha,
            isPulsing: false,
            pulseStep: 0,
          });
        }
        grid.push(rowCells);
      }
    };

    const handleResize = () => {
      if (!container || !canvas || !ctx) return;
      const rect = container.getBoundingClientRect();
      const w = Math.max(rect.width, 100);
      const h = Math.max(rect.height, 100);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr);

      initGrid(w, h);
      drawStatic();
    };

    const drawStatic = () => {
      if (!ctx || !canvas) return;
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = grid[r]?.[c];
          if (!cell) continue;
          ctx.fillStyle = `rgba(168, 85, 247, ${cell.alpha})`;
          ctx.fillText(cell.char, c * cellW + cellW / 2, r * cellH + cellH / 2);
        }
      }
    };

    let lastPulseTrigger = 0;

    const animate = (timestamp: number) => {
      if (!ctx || !container) return;
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);
      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Trigger random new pulses every 100ms
      if (timestamp - lastPulseTrigger > 100) {
        lastPulseTrigger = timestamp;
        const count = Math.min(Math.floor((cols * rows) / 70), 8);
        for (let i = 0; i < count; i++) {
          const r = Math.floor(Math.random() * rows);
          const c = Math.floor(Math.random() * cols);
          const cell = grid[r]?.[c];
          if (cell && !cell.isPulsing) {
            cell.isPulsing = true;
            cell.pulseStep = 0;
            if (Math.random() > 0.4) {
              cell.char = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
            }
          }
        }
      }

      // Draw and update pulses
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = grid[r]?.[c];
          if (!cell) continue;

          if (cell.isPulsing) {
            cell.pulseStep += 0.04;
            if (cell.pulseStep >= Math.PI) {
              cell.isPulsing = false;
              cell.alpha = cell.baseAlpha;
            } else {
              const highlight = Math.sin(cell.pulseStep) * 0.28;
              cell.alpha = cell.baseAlpha + highlight;
            }
          }

          if (cell.isPulsing) {
            ctx.fillStyle = `rgba(216, 180, 254, ${cell.alpha})`;
            ctx.shadowColor = 'rgba(168, 85, 247, 0.4)';
            ctx.shadowBlur = 4;
          } else {
            ctx.fillStyle = `rgba(168, 85, 247, ${cell.alpha})`;
            ctx.shadowBlur = 0;
          }

          ctx.fillText(cell.char, c * cellW + cellW / 2, r * cellH + cellH / 2);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
}
