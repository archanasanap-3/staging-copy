'use client';

import { useRef, useEffect, useState, useMemo, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedRingProgressProps {
  value: number;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
  duration?: number;
  label: string;
  suffix?: string;
  decimals?: number;
  icon?: ReactNode;
}

export default function AnimatedRingProgress({
  value,
  maxValue = 100,
  size = 140,
  strokeWidth = 10,
  duration = 2,
  label,
  suffix = '',
  decimals = 0,
  icon,
}: AnimatedRingProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / maxValue, 1);

  // Tip dot position (end of progress arc)
  const tipAngle = progress * 2 * Math.PI - Math.PI / 2; // starts at top (-90°)
  const tipX = size / 2 + radius * Math.cos(tipAngle);
  const tipY = size / 2 + radius * Math.sin(tipAngle);

  // Counter animation
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();

    function step(now: number) {
      const elapsed = now - start;
      const elapsedProgress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - elapsedProgress, 3);
      const currentValue = eased * value;
      setCount(decimals > 0 ? parseFloat(currentValue.toFixed(decimals)) : Math.round(currentValue));
      if (elapsedProgress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [inView, value, duration, decimals]);

  // Unique IDs per ring — deterministic from label
  const gradientId = useMemo(() => `ring-grad-${label.replace(/[^a-z0-9]/gi, '').slice(0, 10)}`, [label]);
  const glowId     = useMemo(() => `ring-glow-${label.replace(/[^a-z0-9]/gi, '').slice(0, 10)}`, [label]);
  const outerGlowId = useMemo(() => `ring-outer-${label.replace(/[^a-z0-9]/gi, '').slice(0, 10)}`, [label]);
  const trackId    = useMemo(() => `ring-track-${label.replace(/[^a-z0-9]/gi, '').slice(0, 10)}`, [label]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      {/* SVG Ring */}
      <div className="relative" style={{ width: size, height: size }}>

        {/* Hidden SVG defs — glow filters */}
        <svg width="0" height="0" className="absolute overflow-hidden">
          <defs>
            {/* Tip glow */}
            <filter id={glowId} x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Outer ambient glow */}
            <filter id={outerGlowId} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Track gradient (subtle warm track) */}
            <linearGradient id={trackId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,72,0,0.12)" />
              <stop offset="100%" stopColor="rgba(255,140,0,0.06)" />
            </linearGradient>
            {/* Main arc gradient — deep orange → vivid orange → amber */}
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#FF2400" />
              <stop offset="45%"  stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#FFB347" />
            </linearGradient>
          </defs>
        </svg>

        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
          style={{ overflow: 'visible' }}
        >
          {/* Outer decorative ring — subtle dashes */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius + strokeWidth / 2 + 4}
            fill="none"
            stroke="rgba(255,72,0,0.08)"
            strokeWidth={1}
            strokeDasharray="3 6"
            strokeLinecap="round"
          />

          {/* Background (track) ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${trackId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{ opacity: 0.55 }}
          />
          {/* Fallback solid track for browsers without gradient support */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,72,0,0.10)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Ambient glow arc (thicker, blurred, behind main arc) */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#FF5500"
            strokeWidth={strokeWidth + 6}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: circumference * (1 - progress) } : {}}
            transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.1 }}
            style={{ filter: `url(#${outerGlowId})`, opacity: 0.25 }}
          />

          {/* Main progress arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: circumference * (1 - progress) } : {}}
            transition={{ type: 'spring', stiffness: 70, damping: 18 }}
          />

          {/* Tip dot — glowing cap at end of arc */}
          {progress > 0.02 && (
            <motion.circle
              cx={tipX}
              cy={tipY}
              r={strokeWidth / 2 + 1}
              fill="#FFB347"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.4, ease: 'backOut' }}
              style={{ filter: `url(#${glowId})` }}
            />
          )}
        </svg>

        {/* Center content — counter + icon */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {icon && (
            <div className="mb-1">
              {icon}
            </div>
          )}
          <span
            className="counter-display font-bold tabular-nums"
            style={{
              fontSize: size >= 140 ? '30px' : size >= 120 ? '25px' : '21px',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #FF4800 0%, #FF8C00 60%, #FFB347 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {count}{suffix}
          </span>
        </div>
      </div>

      {/* Label */}
      <span className="mt-4 block text-center text-[13px] md:text-[14px] font-medium text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
