'use client';

import { useEffect, useRef } from 'react';

const SNIPPETS = [
  'HTML', 'CSS', 'C++', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Java',
  'SQL', 'Git', 'Docker', 'AWS', 'C#', 'PHP', 'Tailwind', 'Go', 'Rust', 'Swift', 'Kotlin', 'GraphQL',
];

const FONT = '600 12.5px "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif';

/**
 * Orange constellation of drifting nodes. Move the cursor close to a node and a
 * technology name (HTML, CSS, C++…) fades in; that node breaks away from its links.
 */
export default function CodeNetworkBackground({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ORANGE = '255,72,0';
    const LINK = 170;
    const REVEAL = 190;
    const SEP = 85; // nodes closer than this push each other apart
    const MAX_LINKS = 3; // each node links to at most its 3 nearest neighbours

    type Node = { x: number; y: number; vx: number; vy: number; r: number; label: string; rv: number; phase: number };
    const strength = new Map<number, number>();
    let t = 0;
    let nodes: Node[] = [];
    let w = 0, h = 0, raf = 0, visible = true;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.max(26, Math.round((w * h) / 14000)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.4 + 1.2,
        label: SNIPPETS[i % SNIPPETS.length],
        rv: 0,
        phase: Math.random() * Math.PI * 2,
      }));
      strength.clear();
      // shuffle labels so neighbours differ
      nodes.sort(() => Math.random() - 0.5).forEach((n, i) => { n.label = SNIPPETS[i % SNIPPETS.length]; });
    };

    const drawLabel = (n: Node) => {
      ctx.font = FONT;
      const padX = 8, boxH = 22;
      const tw = ctx.measureText(n.label).width;
      const bw = tw + padX * 2;
      // sit to the upper right of the node, flip if it would leave the canvas
      let bx = n.x + 12;
      let by = n.y - boxH - 8;
      if (bx + bw > w - 8) bx = n.x - 12 - bw;
      if (by < 8) by = n.y + 10;

      ctx.globalAlpha = n.rv;
      ctx.fillStyle = isDark ? 'rgba(10,10,20,0.92)' : 'rgba(255,252,246,0.94)';
      ctx.strokeStyle = `rgba(${ORANGE},0.6)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(bx, by, bw, boxH, 7);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = isDark ? '#ffb08a' : '#14110c';
      ctx.textBaseline = 'middle';
      ctx.fillText(n.label, bx + padX, by + boxH / 2 + 0.5);
      ctx.globalAlpha = 1;
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);

      // separation: neighbours that crowd each other drift apart, keeping the web evenly spaced
      if (!reduced) {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[j].x - nodes[i].x, dy = nodes[j].y - nodes[i].y;
            const d = Math.hypot(dx, dy);
            if (d > 0 && d < SEP) {
              const f = ((SEP - d) / SEP) * 0.035;
              nodes[i].vx -= (dx / d) * f; nodes[i].vy -= (dy / d) * f;
              nodes[j].vx += (dx / d) * f; nodes[j].vy += (dy / d) * f;
            }
          }
        }
      }

      for (const n of nodes) {
        if (!reduced) {
          // the cursor gently parts the nodes around it
          const cdx = n.x - mouse.x, cdy = n.y - mouse.y;
          const cd = Math.hypot(cdx, cdy);
          if (cd > 0 && cd < 150) {
            const f = ((150 - cd) / 150) * 0.09;
            n.vx += (cdx / cd) * f; n.vy += (cdy / cd) * f;
          }
          // keep a calm, steady drift speed
          const sp = Math.hypot(n.vx, n.vy);
          if (sp > 0.45) { n.vx = (n.vx / sp) * 0.45; n.vy = (n.vy / sp) * 0.45; }
          else if (sp < 0.12) { const a = Math.random() * Math.PI * 2; n.vx += Math.cos(a) * 0.02; n.vy += Math.sin(a) * 0.02; }
          n.x += n.vx;
          n.y += n.vy;
        }
        if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        n.rv += ((d < REVEAL ? 1 : 0) - n.rv) * 0.14;
      }

      // links: nearest-neighbour candidates; each link fades in/out and also breaks on its own
      // rhythm, so nodes keep separating and re-connecting. Revealed (labelled) nodes break away.
      t += 0.016;
      const nearCursor = (n: Node) => Math.hypot(n.x - mouse.x, n.y - mouse.y) < REVEAL + 40;
      const wanted = new Set<number>();
      for (let i = 0; i < nodes.length; i++) {
        const near: { j: number; d: number }[] = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < LINK) near.push({ j, d });
        }
        near.sort((a, b) => a.d - b.d);
        for (const { j } of near.slice(0, MAX_LINKS)) {
          const a = Math.min(i, j), b = Math.max(i, j);
          const open =
            Math.sin(t * 0.55 + (nodes[a].phase + nodes[b].phase)) > -0.45 && // periodic break
            !nearCursor(nodes[a]) && !nearCursor(nodes[b]); // anything under the cursor cuts loose
          if (open) wanted.add(a * 10000 + b);
        }
      }
      wanted.forEach((k) => { if (!strength.has(k)) strength.set(k, 0); });
      strength.forEach((v, k) => {
        const nv = v + ((wanted.has(k) ? 1 : 0) - v) * (wanted.has(k) ? 0.05 : 0.3);
        if (nv < 0.015 && !wanted.has(k)) { strength.delete(k); return; }
        strength.set(k, nv);
        const i = Math.floor(k / 10000), j = k % 10000;
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (d >= LINK) return;
        ctx.strokeStyle = `rgba(${ORANGE},${(1 - d / LINK) * (isDark ? 0.55 : 0.48) * nv})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      });

      // nodes
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${ORANGE},${0.75 + n.rv * 0.25})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + n.rv * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // code labels on top
      for (const n of nodes) if (n.rv > 0.03) drawLabel(n);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    resize();
    raf = requestAnimationFrame(draw);
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(host);
    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0" />;
}
