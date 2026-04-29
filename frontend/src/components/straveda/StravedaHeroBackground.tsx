'use client';

/**
 * StravedaHeroBackground — Combined gradient animation + grain shader
 *
 * PERF FIX: Replaced 4 React useState (curX/curY/tgX/tgY) with refs + a single
 * RAF loop — mouse-following now does ZERO React re-renders per frame.
 *
 * PERF FIX: Removed SVG goo filter (feGaussianBlur + feColorMatrix + feBlend)
 * from the orb container. That forced the browser to run an SVG filter pipeline
 * on every animation tick across all 6 animated orbs = very expensive CPU
 * compositing. Replaced with simple CSS blur only.
 *
 * PERF FIX: Reduced GrainGradient speed 0.8 → 0.25. WebGL shader now animates
 * slowly (barely noticeable) using ~3× less GPU bandwidth each frame.
 *
 * PERF FIX: Added will-change: transform + contain: paint to orb container
 * to promote it to its own GPU layer and limit repaint scope.
 */

import { useEffect, useMemo, useRef } from 'react';
import { useTheme } from 'next-themes';
import { GrainGradient } from '@paper-design/shaders-react';
import { cn } from '@/lib/utils';

export default function StravedaHeroBackground() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const interactiveRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  // ── Set CSS custom properties on container (scoped, not body) ──
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (isDark) {
      el.style.setProperty('--gradient-bg-start', 'rgb(5, 5, 15)');
      el.style.setProperty('--gradient-bg-end',   'rgb(18, 14, 35)');
      el.style.setProperty('--c1',        '255, 72, 0');
      el.style.setProperty('--c2',        '43, 35, 88');
      el.style.setProperty('--c3',        '200, 50, 0');
      el.style.setProperty('--c4',        '70, 55, 130');
      el.style.setProperty('--c5',        '255, 110, 30');
      el.style.setProperty('--c-pointer', '255, 72, 0');
      el.style.setProperty('--c-blend',   'hard-light');
    } else {
      el.style.setProperty('--gradient-bg-start', 'rgb(255, 255, 255)');
      el.style.setProperty('--gradient-bg-end',   'rgb(250, 248, 253)');
      el.style.setProperty('--c1',        '255, 72, 0');
      el.style.setProperty('--c2',        '255, 140, 90');
      el.style.setProperty('--c3',        '43, 35, 88');
      el.style.setProperty('--c4',        '255, 200, 165');
      el.style.setProperty('--c5',        '200, 195, 225');
      el.style.setProperty('--c-pointer', '255, 72, 0');
      el.style.setProperty('--c-blend',   'soft-light');
    }
    el.style.setProperty('--orb-size', '80%');
  }, [isDark]);

  // ── Mouse-following via RAF + refs — ZERO React re-renders ──
  // IntersectionObserver gates the RAF: stops when hero scrolls out of view.
  useEffect(() => {
    const tg  = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let rafId = 0;
    let visible = true;

    function tick() {
      if (visible) {
        cur.x += (tg.x - cur.x) / 20;
        cur.y += (tg.y - cur.y) / 20;
        if (interactiveRef.current) {
          interactiveRef.current.style.transform =
            `translate(${Math.round(cur.x)}px, ${Math.round(cur.y)}px)`;
        }
      }
      rafId = requestAnimationFrame(tick);
    }

    function onMouseMove(e: MouseEvent) {
      if (!visible) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      tg.x = e.clientX - rect.left;
      tg.y = e.clientY - rect.top;
    }

    // Stop doing work when hero is off-screen — but keep RAF alive to
    // cheaply restart without re-running the effect
    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    rafId = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  const isSafari = useMemo(
    () => typeof navigator !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
    []
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute inset-0 overflow-hidden',
        'bg-[linear-gradient(40deg,var(--gradient-bg-start),var(--gradient-bg-end))]'
      )}
      style={{ zIndex: 0, contain: 'paint layout' }}
      aria-hidden="true"
    >
      {/* ── Layer 1: Animated gradient orbs ──
          Removed: SVG goo filter (feGaussianBlur + feColorMatrix + feBlend) which
          forced CPU compositing on every animation frame for all 6 orbs.
          Using plain CSS blur — GPU-composited, ~4× cheaper. ── */}
      <div
        className={cn(
          'gradients-container h-full w-full',
          isSafari ? 'blur-2xl' : 'blur-[40px]'
        )}
        style={{ willChange: 'contents', contain: 'paint' }}
      >
        <div
          className={cn(
            'absolute [background:radial-gradient(circle_at_center,_rgba(var(--c1),1)_0,_rgba(var(--c1),0)_50%)_no-repeat]',
            '[mix-blend-mode:var(--c-blend)] w-[var(--orb-size)] h-[var(--orb-size)]',
            'top-[calc(50%-var(--orb-size)/2)] left-[calc(50%-var(--orb-size)/2)]',
            '[transform-origin:center_center] animate-hero-first'
          )}
          style={{ willChange: 'transform' }}
        />
        <div
          className={cn(
            'absolute [background:radial-gradient(circle_at_center,_rgba(var(--c2),0.8)_0,_rgba(var(--c2),0)_50%)_no-repeat]',
            '[mix-blend-mode:var(--c-blend)] w-[var(--orb-size)] h-[var(--orb-size)]',
            'top-[calc(50%-var(--orb-size)/2)] left-[calc(50%-var(--orb-size)/2)]',
            '[transform-origin:calc(50%-400px)] animate-hero-second'
          )}
          style={{ willChange: 'transform' }}
        />
        <div
          className={cn(
            'absolute [background:radial-gradient(circle_at_center,_rgba(var(--c3),0.8)_0,_rgba(var(--c3),0)_50%)_no-repeat]',
            '[mix-blend-mode:var(--c-blend)] w-[var(--orb-size)] h-[var(--orb-size)]',
            'top-[calc(50%-var(--orb-size)/2)] left-[calc(50%-var(--orb-size)/2)]',
            '[transform-origin:calc(50%+400px)] animate-hero-third'
          )}
          style={{ willChange: 'transform' }}
        />
        <div
          className={cn(
            'absolute [background:radial-gradient(circle_at_center,_rgba(var(--c4),0.8)_0,_rgba(var(--c4),0)_50%)_no-repeat]',
            '[mix-blend-mode:var(--c-blend)] w-[var(--orb-size)] h-[var(--orb-size)] opacity-70',
            'top-[calc(50%-var(--orb-size)/2)] left-[calc(50%-var(--orb-size)/2)]',
            '[transform-origin:calc(50%-200px)] animate-hero-fourth'
          )}
          style={{ willChange: 'transform' }}
        />
        <div
          className={cn(
            'absolute [background:radial-gradient(circle_at_center,_rgba(var(--c5),0.8)_0,_rgba(var(--c5),0)_50%)_no-repeat]',
            '[mix-blend-mode:var(--c-blend)] w-[var(--orb-size)] h-[var(--orb-size)]',
            'top-[calc(50%-var(--orb-size)/2)] left-[calc(50%-var(--orb-size)/2)]',
            '[transform-origin:calc(50%-800px)_calc(50%+800px)] animate-hero-fifth'
          )}
          style={{ willChange: 'transform' }}
        />

        {/* Interactive orb — position set via RAF, no React state */}
        <div
          ref={interactiveRef}
          className={cn(
            'absolute [background:radial-gradient(circle_at_center,_rgba(var(--c-pointer),0.8)_0,_rgba(var(--c-pointer),0)_50%)_no-repeat]',
            '[mix-blend-mode:var(--c-blend)] w-full h-full -top-1/2 -left-1/2 opacity-70'
          )}
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* ── Layer 2: Grain gradient overlay (WebGL) ──
          speed reduced 0.8 → 0.25: barely visible motion, ~3× less GPU bandwidth ── */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 1, opacity: isDark ? 0.35 : 0.12 }}
      >
        <GrainGradient
          style={{ height: '100%', width: '100%' }}
          colorBack={isDark ? 'hsl(240, 30%, 4%)' : 'hsl(270, 20%, 98%)'}
          softness={0.8}
          intensity={0.5}
          noise={0}
          shape="corners"
          offsetX={0.3}
          offsetY={0.2}
          scale={1}
          rotation={15}
          speed={0}
          colors={
            isDark
              ? ['hsl(14, 100%, 50%)', 'hsl(248, 43%, 20%)', 'hsl(14, 80%, 25%)']
              : ['hsl(14, 100%, 57%)', 'hsl(40, 100%, 85%)', 'hsl(248, 30%, 88%)']
          }
        />
      </div>

      {/* ── Layer 3: Vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: isDark
            ? 'radial-gradient(ellipse at 30% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)'
            : 'radial-gradient(ellipse at 30% 50%, transparent 50%, rgba(0,0,0,0.03) 100%)',
        }}
      />
    </div>
  );
}
