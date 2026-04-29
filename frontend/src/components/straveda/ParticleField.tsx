'use client';

import { useMemo } from 'react';

interface Particle {
  id: number;
  left: string;
  bottom: string;
  size: number;
  duration: string;
  delay: string;
}

const PARTICLE_COUNT = 50;

export default function ParticleField() {
  const particles = useMemo<Particle[]>(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr.push({
        id: i,
        left: `${Math.random() * 100}%`,
        bottom: `${Math.random() * -20}%`,
        size: 2 + Math.random() * 3,
        duration: `${15 + Math.random() * 15}`,
        delay: `${Math.random() * 15}`,
      });
    }
    return arr;
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full particle-dot"
          style={
            {
              left: p.left,
              bottom: p.bottom,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: '#FFFFFF',
              opacity: 0,
              '--particle-duration': `${p.duration}s`,
              '--particle-delay': `${p.delay}s`,
              willChange: 'transform, opacity',
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
