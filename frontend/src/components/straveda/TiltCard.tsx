'use client';

import React, { useRef, useCallback, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
}

export default function TiltCard({
  children,
  className = '',
  tiltAmount = 15,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);

  const [transform, setTransform] = useState(
    'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
  );
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({});
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      // Cancel any pending RAF
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Normalized position (-1 to 1)
        const normalizedX = (x - centerX) / centerX;
        const normalizedY = (y - centerY) / centerY;

        // Tilt angles — inverted Y so card tilts toward cursor
        const rotateX = normalizedY * -tiltAmount;
        const rotateY = normalizedX * tiltAmount;

        setTransform(
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        );

        // Radial gradient glow following the cursor
        const glowBackground = `radial-gradient(circle at ${x}px ${y}px, rgba(255,72,0,0.08), transparent 60%)`;

        // Dynamic border glow — brightest edge near the cursor
        // Use inset box-shadows to create a border glow that follows the mouse
        const glowIntensity = 0.3;
        const glowSpread = 1;

        // Calculate which edges the cursor is nearest
        const nearLeft = Math.max(0, 1 - normalizedX); // 1 when cursor is at left edge
        const nearRight = Math.max(0, 1 + normalizedX); // 1 when cursor is at right edge
        const nearTop = Math.max(0, 1 - normalizedY); // 1 when cursor is at top edge
        const nearBottom = Math.max(0, 1 + normalizedY); // 1 when cursor is at bottom edge

        const boxShadow = [
          `inset ${nearLeft * 2}px 0 ${(nearLeft * 8 + glowSpread).toFixed(1)}px -${(nearLeft * 4).toFixed(1)}px rgba(255,72,0,${(glowIntensity * nearLeft).toFixed(2)})`,
          `inset ${-nearRight * 2}px 0 ${(nearRight * 8 + glowSpread).toFixed(1)}px -${(nearRight * 4).toFixed(1)}px rgba(255,72,0,${(glowIntensity * nearRight).toFixed(2)})`,
          `inset 0 ${nearTop * 2}px ${(nearTop * 8 + glowSpread).toFixed(1)}px -${(nearTop * 4).toFixed(1)}px rgba(255,72,0,${(glowIntensity * nearTop).toFixed(2)})`,
          `inset 0 ${-nearBottom * 2}px ${(nearBottom * 8 + glowSpread).toFixed(1)}px -${(nearBottom * 4).toFixed(1)}px rgba(255,72,0,${(glowIntensity * nearBottom).toFixed(2)})`,
        ].join(', ');

        setGlowStyle({
          background: glowBackground,
          boxShadow,
        });
      });
    },
    [tiltAmount],
  );

  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    setIsHovering(false);
    setTransform(
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    );
    setGlowStyle({});
    // Cancel any pending RAF on leave
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{
        transform,
        transition: isHovering
          ? 'transform 0.15s ease-out'
          : 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glow overlay — follows cursor, stays within card bounds */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          ...glowStyle,
        }}
      />
      {/* Children content */}
      {children}
    </div>
  );
}
