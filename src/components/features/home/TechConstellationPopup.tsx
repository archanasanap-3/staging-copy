'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SNIPPETS = [
  'Rust', 'Kotlin', 'SQL', 'Next.js', 'PHP', 'C++',
  'TypeScript', 'Python', 'React', 'Docker', 'AWS', 'Go',
  'Node.js', 'JavaScript', 'Java', 'Git', 'Tailwind',
  'C#', 'Swift', 'GraphQL', 'HTML', 'CSS',
];

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

interface BurstItem {
  id: string;
  label: string;
  dx: number;
  dy: number;
  delay: number;
}

interface Burst {
  id: string;
  x: number;
  y: number;
  items: BurstItem[];
}

export default function TechConstellationPopup({ isDark }: { isDark: boolean }) {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const nextSnippetIdxRef = useRef(0);

  const spawnBurst = useCallback((clientX: number, clientY: number) => {
    const burstId = `${Date.now()}-${Math.random()}`;
    const count = 5;
    const items: BurstItem[] = [];

    // Select 5 unique snippets per click
    const chosenLabels: string[] = [];
    for (let k = 0; k < count; k++) {
      const idx = (nextSnippetIdxRef.current + k) % SNIPPETS.length;
      chosenLabels.push(SNIPPETS[idx]);
    }
    nextSnippetIdxRef.current = (nextSnippetIdxRef.current + count) % SNIPPETS.length;

    // Distribute smoothly around click position
    const baseRadii = [60, 85, 68, 92, 72];
    for (let i = 0; i < count; i++) {
      const baseAngle = (i * 2 * Math.PI) / count - Math.PI / 4;
      const angleJitter = (Math.random() - 0.5) * 0.2;
      const angle = baseAngle + angleJitter;
      const radius = baseRadii[i % baseRadii.length] + (Math.random() - 0.5) * 8;

      let dx = Math.cos(angle) * radius;
      let dy = Math.sin(angle) * radius;

      // Keep within screen edges
      if (typeof window !== 'undefined') {
        const targetX = clientX + dx;
        const targetY = clientY + dy;
        const maxX = window.innerWidth - 85;
        const maxY = window.innerHeight - 36;
        if (targetX < 18) dx += 18 - targetX;
        else if (targetX > maxX) dx -= targetX - maxX;
        if (targetY < 18) dy += 18 - targetY;
        else if (targetY > maxY) dy -= targetY - maxY;
      }

      items.push({
        id: `${burstId}-${i}`,
        label: chosenLabels[i],
        dx,
        dy,
        delay: i * 0.02,
      });
    }

    const newBurst: Burst = {
      id: burstId,
      x: clientX,
      y: clientY,
      items,
    };

    setBursts((prev) => [...prev.slice(-3), newBurst]);

    // Visibility set to 1 second
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== burstId));
    }, 1050);
  }, []);

  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;

      // Hero section remains untouched and original
      if (target && target.closest('#section-hero')) {
        return;
      }

      let clientX = 0;
      let clientY = 0;
      if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else if (e.touches && e.touches[0]) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        return;
      }

      spawnBurst(clientX, clientY);
    };

    window.addEventListener('click', handlePointerDown);
    return () => {
      window.removeEventListener('click', handlePointerDown);
    };
  }, [spawnBurst]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
    >
      <AnimatePresence>
        {bursts.map((burst) => (
          <div
            key={burst.id}
            className="absolute pointer-events-none"
            style={{ left: burst.x, top: burst.y }}
          >
            {burst.items.map((item) => (
              <motion.div
                key={item.id}
                initial={{
                  scale: 0.65,
                  opacity: 0,
                  x: item.dx * 0.45,
                  y: item.dy * 0.45,
                }}
                animate={{
                  scale: [0.65, 1.04, 1, 1, 0.96],
                  opacity: [0, 1, 1, 1, 0],
                  x: [
                    item.dx * 0.45,
                    item.dx * 0.98,
                    item.dx,
                    item.dx,
                    item.dx + (item.dx >= 0 ? 3 : -3),
                  ],
                  y: [
                    item.dy * 0.45,
                    item.dy * 0.98,
                    item.dy,
                    item.dy,
                    item.dy - 4,
                  ],
                }}
                transition={{
                  duration: 1.0, // Exactly 1 second
                  times: [0, 0.22, 0.32, 0.78, 1],
                  delay: item.delay,
                  ease: SMOOTH_EASE,
                }}
                className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
                style={{ left: 0, top: 0, willChange: 'transform, opacity' }}
              >
                <div
                  className="flex items-center rounded-[8px] border border-[rgba(255,72,0,0.55)] px-2.5 whitespace-nowrap select-none shadow-sm backdrop-blur-[2px]"
                  style={{
                    height: 23,
                    fontFamily: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
                    fontSize: 12.5,
                    fontWeight: 600,
                    lineHeight: '23px',
                    background: isDark
                      ? 'rgba(10, 10, 20, 0.94)'
                      : 'rgba(255, 252, 246, 0.96)',
                    color: isDark ? '#ffb08a' : '#14110c',
                    boxShadow: isDark
                      ? '0 4px 12px rgba(0, 0, 0, 0.5)'
                      : '0 4px 12px rgba(255, 72, 0, 0.15)',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
