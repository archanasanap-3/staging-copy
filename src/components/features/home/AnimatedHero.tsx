'use client';

import React, { useRef, useSyncExternalStore } from 'react';
import CodeNetworkBackground from './CodeNetworkBackground';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { useTheme } from 'next-themes';

function usePrefetchContact() {
  const done = useRef(false);
  return () => {
    if (done.current) return;
    done.current = true;
    import('@/components/features/contact/ContactPage').catch(() => { });
  };
}

const EASE = [0.22, 1, 0.36, 1] as const;

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const stats = [
  { value: '−50%', label: 'Manual work in 25 days' },
  { value: '3–5×', label: 'Operational efficiency' },
  { value: '100%', label: 'Code ownership' },
];

/** One headline line, revealed from behind a mask */
function MaskedLine({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className ?? ''}`}
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

interface AnimatedHeroProps {
  onNavigate: (page: string) => void;
}

export default function AnimatedHero({ onNavigate }: AnimatedHeroProps) {
  const prefetchContact = usePrefetchContact();
  const { theme, resolvedTheme } = useTheme();

  const mounted = useSyncExternalStore(
    () => () => { },
    () => true,
    () => false,
  );
  const isDark = mounted && (resolvedTheme === 'dark' || theme === 'dark');

  const bg = isDark ? '#0a0a14' : '#F6F1E7';
  const textPrimary = isDark ? '#f5f2ea' : '#14110c';
  const textMuted = isDark ? '#a29d92' : '#5b5546';
  const line = isDark ? 'rgba(245,242,234,0.16)' : 'rgba(20,17,12,0.16)';
  const lineStrong = isDark ? 'rgba(245,242,234,0.4)' : 'rgba(20,17,12,0.45)';

  return (
    <section
      className="relative flex min-h-[92dvh] sm:min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 pt-20 pb-16 sm:pt-28 sm:pb-28 md:pt-32 md:pb-32 text-center"
      style={{ background: bg }}
    >
      <style>{`
        @keyframes hero-dot { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
      `}</style>

      {/* ── Background: beige paper + orange constellation that reveals code on hover ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <CodeNetworkBackground isDark={isDark} />
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-multiply dark:opacity-[0.1] dark:mix-blend-screen"
          style={{ backgroundImage: GRAIN }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mb-6 sm:mb-8 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.28em]"
          style={{ color: textMuted }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: '#FF4800', animation: 'hero-dot 2.2s ease-in-out infinite' }}
          />
          Business automation experts
        </motion.p>

        {/* Headline */}
        <h1
          className="font-bold"
          style={{
            fontSize: 'clamp(1.9rem, 5vw, 4.4rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.04em',
            color: textPrimary,
          }}
        >
          <MaskedLine delay={0.2}>AI that eliminates work.</MaskedLine>
          <MaskedLine delay={0.34} className="text-[#FF4800]">
            Software that runs your operations.
          </MaskedLine>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
          className="mt-6 sm:mt-8 max-w-2xl text-balance text-base leading-relaxed sm:text-lg"
          style={{ color: textMuted }}
        >
          We build AI-powered business systems and custom software for mid-market
          companies in India, cutting manual work by 50% in 25 days.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          className="mt-8 sm:mt-10 flex flex-col items-center gap-[-1] sm:flex-row sm:gap-4"
        >
          <motion.button
            type="button"
            onClick={() => onNavigate('contact')}
            onMouseEnter={prefetchContact}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-3 rounded-full py-2 pl-7 pr-2 text-[14px] font-semibold uppercase tracking-wider"
            style={{
              background: isDark ? '#f5f2ea' : '#14110c',
              color: isDark ? '#14110c' : '#f5f2ea',
              boxShadow: isDark ? '0 14px 40px rgba(245,242,234,0.1)' : '0 14px 40px rgba(20,17,12,0.25)',
            }}
          >
            Book strategy call
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF4800] text-white transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </motion.button>

          <button
            type="button"
            onClick={() => onNavigate('services')}
            className="group inline-flex items-center gap-2 px-4 py-3 text-[14px] font-semibold uppercase tracking-wider"
            style={{ color: textPrimary }}
          >
            <span className="border-b border-current pb-0.5 transition-opacity group-hover:opacity-60">
              See what we build
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </div>

      {/* Proof strip */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
        className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-5xl px-5 pb-6 sm:pb-10"
      >
        <div className="grid grid-cols-3 border-t pt-5" style={{ borderColor: lineStrong }}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-2 text-center sm:px-6 ${i > 0 ? 'border-l' : ''}`}
              style={{ borderColor: line }}
            >
              <div className="text-xl font-bold tracking-tight sm:text-3xl" style={{ color: textPrimary }}>
                {s.value}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.16em] sm:text-[11px]" style={{ color: textMuted }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        aria-hidden="true"
        className="absolute bottom-40 left-8 z-10 hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] xl:flex"
        style={{ color: textMuted, writingMode: 'vertical-rl' }}
      >
        Scroll
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.span>
      </motion.div>
    </section>
  );
}
