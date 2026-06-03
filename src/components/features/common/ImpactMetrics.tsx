'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface MetricItem {
  displayValue: string;
  target: number;
  suffix: string;
  decimals: number;
  label: string;
  subtitle: string;
  progress: number;
}

const metrics: MetricItem[] = [
  {
    displayValue: '500+',
    target: 500,
    suffix: '+',
    decimals: 0,
    label: 'Projects Delivered',
    subtitle: 'Across Fortune 500 companies',
    progress: 92,
  },
  {
    displayValue: '99.99%',
    target: 99.99,
    suffix: '%',
    decimals: 2,
    label: 'System Uptime',
    subtitle: 'Enterprise grade reliability',
    progress: 100,
  },
  {
    displayValue: '40%',
    target: 40,
    suffix: '%',
    decimals: 0,
    label: 'Cost Reduction',
    subtitle: 'Average client savings',
    progress: 78,
  },
  {
    displayValue: '14+',
    target: 14,
    suffix: '+',
    decimals: 0,
    label: 'Years of Excellence',
    subtitle: 'Trusted since 2010',
    progress: 100,
  },
];

function AnimatedNumber({
  target,
  suffix,
  decimals = 0,
  inView,
}: {
  target: number;
  suffix: string;
  decimals?: number;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const start = performance.now();

    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // cubic-bezier ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * target;
      setCount(
        decimals > 0
          ? parseFloat(value.toFixed(decimals))
          : Math.round(value),
      );
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [inView, target, decimals]);

  return (
    <span
      className="block font-bold leading-none tracking-tight"
      style={{ fontSize: '56px', color: '#FFFFFF' }}
    >
      {count}
      {suffix}
    </span>
  );
}

function ProgressBar({
  progress,
  delay,
  inView,
}: {
  progress: number;
  delay: number;
  inView: boolean;
}) {
  return (
    <div className="mt-5 h-[3px] w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: '#FF4800' }}
        initial={{ width: '0%' }}
        animate={inView ? { width: `${progress}%` } : { width: '0%' }}
        transition={{
          duration: 1.4,
          delay,
          ease: [0.4, 0, 0.2, 1],
        }}
      />
    </div>
  );
}

function MetricCard({
  metric,
  index,
}: {
  metric: MetricItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{
        y: -4,
        boxShadow: '0 8px 40px rgba(255, 72, 0, 0.25), 0 0 0 1px rgba(255, 72, 0, 0.15)',
      }}
      className="group relative rounded-xl p-6 md:p-8 transition-all duration-300"
      style={{
        background: 'rgba(255, 255, 255, 0.07)',
        border: '1px solid rgba(255, 255, 255, 0.13)',
        backdropFilter: 'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 24px rgba(0,0,0,0.35)',
      }}
    >
      {/* Subtle glow effect on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(255,72,0,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative">
        {/* Animated number */}
        <AnimatedNumber
          target={metric.target}
          suffix={metric.suffix}
          decimals={metric.decimals}
          inView={inView}
        />

        {/* Label */}
        <p
          className="mt-3 text-[16px] font-medium"
          style={{ color: 'rgba(255, 255, 255, 0.9)' }}
        >
          {metric.label}
        </p>

        {/* Subtitle */}
        <p
          className="mt-1 text-[14px]"
          style={{ color: 'rgba(255, 255, 255, 0.5)' }}
        >
          {metric.subtitle}
        </p>

        {/* Progress bar */}
        <ProgressBar
          progress={metric.progress}
          delay={0.3 + index * 0.2}
          inView={inView}
        />
      </div>
    </motion.div>
  );
}

export default function ImpactMetrics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24"
      style={{
        background: '#000000',
      }}
    >
      {/* Decorative background elements */}
      <div
        className="pointer-events-none absolute top-0 left-1/4 h-64 w-64 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(255,72,0,0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="pointer-events-none absolute right-1/4 bottom-0 h-80 w-80 rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(255,72,0,0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Dot grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16 text-center"
        >
          <p
            className="mb-4 text-[11px] font-medium uppercase tracking-widest"
            style={{ color: '#FF4800' }}
          >
            IMPACT
          </p>
          <h2
            className="mx-auto max-w-xl text-[36px] font-medium md:text-[42px]"
            style={{ color: '#FFFFFF', fontWeight: 500 }}
          >
            Results that speak for themselves
          </h2>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
