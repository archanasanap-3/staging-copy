'use client';

import { useEffect, useMemo, useRef, useSyncExternalStore } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Building2, TrendingDown, Zap, CheckCircle } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import AnimatedLiquidBackground from '@/components/animations/AnimatedLiquidBackground';

// ─── Performance A: Prefetch contact page on first CTA hover ────────────────
// Dynamic import triggers the browser to download ContactPage chunks
// before the user clicks — making the next page feel instant.
function usePrefetchContact() {
  const done = useRef(false);
  return () => {
    if (done.current) return;
    done.current = true;
    import('@/components/features/contact/ContactPage').catch(() => { });
  };
}

// ─── UI B: MetricCard — viewport entry reveal + CSS float loop ───────────────
// Two-layer trick: Framer Motion handles the one-shot entry (opacity + scale),
// a nested div carries an infinitely looping CSS keyframe for the float.
// They don't fight because Framer owns transform on the outer div,
// while CSS animates translateY on the inner div.
function MetricCard({
  children,
  className,
  entryDelay = 0,
  floatDir = 'up',
}: {
  children: React.ReactNode;
  className: string;
  entryDelay?: number;
  floatDir?: 'up' | 'down';
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8, y: floatDir === 'up' ? 18 : -18 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 220, damping: 22, delay: entryDelay }}
    >
      {/* Inner div: CSS float starts after entry animation finishes */}
      <div style={{ animation: `metric-${floatDir} 4s ease-in-out ${entryDelay + 0.9}s infinite` }}>
        {children}
      </div>
    </motion.div>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────
interface AnimatedHeroProps {
  onNavigate: (page: string) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function AnimatedHero({ onNavigate }: AnimatedHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const prefetchContact = usePrefetchContact();

  // Controls depth-of-field: image starts blurred, sharpens on first viewport entry
  const imageInView = useInView(imageRef, { once: true, margin: '-60px' });

  const mounted = useSyncExternalStore(
    () => () => { },
    () => true,
    () => false,
  );
  const isDark = mounted && (resolvedTheme === 'dark' || theme === 'dark');

  // ── Color tokens ─────────────────────────────────────────────────────────
  const C = useMemo(() => ({
    headline: isDark ? '#f0f0f5' : '#0f172a',
    // UX B: WCAG AA contrast — #374151 on white = 9.73:1 ratio, passes AA & AAA
    tagline: isDark ? '#cbd5e1' : '#374151',
    badgeText: isDark ? '#e5e5ea' : '#0f172a',
    badgeBg: isDark ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.92)',
    badgeBorder: 'rgba(255,72,0,0.28)',
    badgeDiv: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)',
    cardBg: isDark ? 'rgba(12,12,24,0.92)' : 'rgba(255,255,255,0.97)',
    cardBorder: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.07)',
    cardShadow: isDark ? '0 8px 32px rgba(0,0,0,0.55)' : '0 8px 28px rgba(0,0,0,0.09)',
    cardNum: isDark ? '#f0f0f5' : '#0f172a',
    cardSub: isDark ? '#94a3b8' : '#64748b',
    border: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
    scrollLine: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(43,35,88,0.3)',
    // bgColor used for the laminar gradient fade at image left-edge
    bgColor: isDark ? '#0a0a14' : '#ffffff',
  }), [isDark]);

  // Full tagline (desktop, word-stagger animated)
  const taglineWords = useMemo(
    () => 'AI Powered Business Systems and Custom Software for Mid Market Companies in India. We build the Automation, CRMs, and Workflows that cut manual work by 50%.'.split(' '),
    [],
  );
  // Short tagline (mobile, static — no stagger to avoid long wait on small screens)
  const taglineMobile = 'AI powered systems that eliminate manual work by 50% — custom built for your business in 90 days.';

  // Mouse-following gradient glow
  useEffect(() => {
    const section = containerRef.current?.parentElement;
    const gradient = gradientRef.current;
    if (!section || !gradient) return;
    const el = gradient;
    const move = (e: MouseEvent) => { el.style.left = e.clientX - 192 + 'px'; el.style.top = e.clientY - 192 + 'px'; el.style.opacity = '1'; };
    const leave = () => { el.style.opacity = '0'; };
    section.addEventListener('mousemove', move);
    section.addEventListener('mouseleave', leave);
    return () => { section.removeEventListener('mousemove', move); section.removeEventListener('mouseleave', leave); };
  }, []);

  // Desktop tagline word-stagger
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    c.querySelectorAll<HTMLElement>('.hero-word').forEach((w) => {
      const d = parseInt(w.getAttribute('data-delay') || '0', 10);
      setTimeout(() => { w.style.animation = 'hero-word-appear 0.75s ease-out forwards'; }, d);
    });
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    // Performance 2C: min-h-[100dvh] uses Dynamic Viewport Height units.
    // This accounts for the mobile browser chrome (address bar), preventing
    // the hero from jumping/wiggling as the bar shows and hides on scroll.
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden">

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes hero-word-appear {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0);   }
        }
        /* Metric card float loops — intentionally gentle (±9 px) */
        @keyframes metric-up   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes metric-down { 0%,100%{transform:translateY(0)} 50%{transform:translateY( 9px)} }
        @keyframes pulse-dot   { 0%,100%{opacity:.2;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
      `}</style>

      {/* ── Background ── */}
      <AnimatedLiquidBackground />

      {/* Mouse glow - Removed for performance and cleaner aesthetic */}

      {/* Floating accent dots */}
      {[
        { cls: 'top-[18%] left-[47%] hidden lg:block', delay: '1s', size: 'w-2 h-2' },
        { cls: 'bottom-[28%] left-[6%]', delay: '3s', size: 'w-1.5 h-1.5' },
      ].map((d) => (
        <div key={d.cls} aria-hidden="true"
          className={`absolute rounded-full ${d.cls} ${d.size}`}
          style={{ zIndex: 1, background: '#FF4800', animation: `pulse-dot 4s ease-in-out ${d.delay} infinite` }} />
      ))}

      {/* Vertical border lines */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 3 }}>
        {['left-4 md:left-8', 'right-4 md:right-8'].map((p) => (
          <div key={p} className={`absolute inset-y-0 ${p} w-px`}
            style={{ background: `linear-gradient(to bottom,transparent,${C.border},${C.border})` }} />
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════
          TWO-COLUMN LAYOUT
          Left  → text + CTAs
          Right → image with floating metric cards (lg+ only)
         ══════════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-28 md:pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ─── LEFT: Text content ─────────────────────────────── */}
        <div ref={containerRef} className="flex flex-col text-center lg:text-left">

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center lg:justify-start mb-6"
          >
            <span className={cn('group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 shadow-sm cursor-default transition-shadow duration-300 hover:shadow-md backdrop-blur-sm')}
              style={{ background: C.badgeBg, borderColor: C.badgeBorder }}>
              <Building2 className="size-3 shrink-0" style={{ color: '#FF4800' }} />
              <span className="text-xs font-medium truncate" style={{ color: C.badgeText }}>
                Pune, Maharashtra · Serving clients across India
              </span>
              <span className="block h-5 w-px shrink-0" style={{ background: C.badgeDiv }} />
              <ArrowRight className="size-3 shrink-0 transition-transform duration-150 group-hover:translate-x-1" style={{ color: '#FF4800' }} />
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-bold mb-5"
            style={{ fontSize: 'clamp(2rem,4.5vw,4.25rem)', lineHeight: 1.06, letterSpacing: '-1.5px', wordBreak: 'break-word' }}
          >
            <span className="block" style={{ color: C.headline }}>AI that eliminates work.</span>
            <span className="block" style={{ color: '#FF4800' }}>Software that runs your operations.</span>
          </motion.h1>

          {/* UX B — Desktop tagline: word-stagger, font-medium, WCAG AA color */}
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block max-w-[520px] mx-auto lg:mx-0 text-[16px] leading-[1.8] font-medium"
            style={{ color: C.tagline }}
          >
            {taglineWords.map((word, i) => (
              <span key={i} className="hero-word inline-block opacity-0" data-delay={800 + i * 40}>
                {word}{i < taglineWords.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
          </motion.p>

          {/* UX B — Mobile tagline: shorter copy, immediately readable */}
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:hidden max-w-[400px] mx-auto text-[15px] leading-[1.75] font-medium"
            style={{ color: C.tagline }}
          >
            {taglineMobile}
          </motion.p>

          {/* ── UX A — CTAs with clear visual hierarchy ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
          >
            {/*
              PRIMARY — dominant orange, bold, larger padding, scale on hover.
              onMouseEnter triggers Performance A: silent prefetch of ContactPage.
            */}
            <motion.button
              type="button"
              onClick={() => onNavigate('contact')}
              onMouseEnter={prefetchContact}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-[15px] text-[15px] font-bold text-white"
              style={{ background: '#FF4800', boxShadow: '0 10px 36px rgba(255,72,0,0.44), 0 2px 8px rgba(255,72,0,0.22)' }}
            >
              Book Strategy Call <ArrowRight className="h-4 w-4" />
            </motion.button>

            {/*
              SECONDARY — true ghost: transparent bg, subtle border.
              Smaller padding, regular weight → clearly subordinate.
            */}
            <motion.button
              type="button"
              onClick={() => onNavigate('services')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border px-7 py-[14px] text-[14px] font-normal transition-colors duration-200"
              style={{
                background: 'transparent',
                borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(43,35,88,0.28)',
                color: isDark ? 'rgba(255,255,255,0.7)' : '#334155',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(43,35,88,0.04)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              See What We Build
            </motion.button>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.62 }}
            className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2"
          >
            {['Fixed price quote', 'Weekly delivery', 'Full code ownership'].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: C.tagline }}>
                <CheckCircle className="h-3.5 w-3.5 shrink-0" style={{ color: '#FF4800' }} />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ─── RIGHT: Image + floating metric cards ──────────────
             Mobile  (< lg): stacked below text, flat card, no perspective
             Desktop (≥ lg): side-by-side, 3-D perspective, floating cards
        ────────────────────────────────────────────────────── */}
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.3 }}
          className="relative w-full"
        >
          {/* Glow halo - Removed for performance and cleaner aesthetic */}

          {/* Image card */}
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            initial={{ filter: 'blur(5px)', scale: 0.97 }}
            animate={imageInView ? { filter: 'blur(0px)', scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              /* 3-D tilt on desktop only — looks wrong on narrow screens */
              transform: 'perspective(1200px) rotateY(-3deg) rotateX(2deg)',
              boxShadow: isDark
                ? '0 24px 56px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)'
                : '0 16px 48px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.05)',
            }}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/hero-image.jpg"
                alt="Developer building automation systems at Straveda Tech"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 95vw, (max-width:1280px) 50vw, 600px"
                priority
              />
              {/* Depth overlay */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(135deg,rgba(10,10,20,0.30) 0%,rgba(0,0,0,0.02) 55%,transparent 100%)' }} />
              {/*
                UI A — Laminar gradient: blends the left edge of the image into
                the left-column background color, eliminating the abrupt boundary.
              */}
              <div aria-hidden="true" className="absolute inset-y-0 left-0 w-28 pointer-events-none"
                style={{ background: `linear-gradient(to right,${C.bgColor},transparent)` }} />
            </div>

            {/* Orange accent top line */}
            <div className="absolute top-0 left-0 right-0 h-[3px]"
              style={{ background: 'linear-gradient(90deg,#FF4800,rgba(255,72,0,0.3),transparent)' }} />

            {/* Live system pill */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 backdrop-blur-md"
              style={{ background: 'rgba(0,0,0,0.58)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="h-2 w-2 rounded-full" style={{ background: '#4ade80', boxShadow: '0 0 6px rgba(74,222,128,0.8)' }} />
              <span className="text-[11px] font-semibold text-white tracking-widest uppercase">Live System</span>
            </div>
          </motion.div>

          {/*
            Performance B: All metric "cards" are pure HTML + CSS.
            No images → no bandwidth cost, fully accessible to screen readers,
            indexable text content for SEO.

            UI B: MetricCard = Framer Motion entry (once) + CSS float loop.
          */}

          {/* ── Floating metric cards — desktop only (lg+) ───────── */}
          {/* On mobile these would overflow the card edge, so we show
              the same data as a compact inline row instead (see below). */}

          {/* −50% Manual Work — top-left */}
          <MetricCard className="absolute -top-5 -left-6 hidden lg:block" entryDelay={0.55} floatDir="up">
            <div className="rounded-xl px-4 py-3 backdrop-blur-md"
              style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, boxShadow: C.cardShadow, minWidth: '158px' }}>
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="h-4 w-4 shrink-0" style={{ color: '#FF4800' }} aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#FF4800' }}>Manual Work</span>
              </div>
              <p className="text-[28px] font-black leading-none" style={{ color: C.cardNum, letterSpacing: '-1.5px' }} aria-label="50% reduction">−50%</p>
              <p className="text-[11px] mt-1" style={{ color: C.cardSub }}>First 90 days</p>
            </div>
          </MetricCard>

          {/* 3–5× Efficiency — bottom-right */}
          <MetricCard className="absolute -bottom-5 -right-6 hidden lg:block" entryDelay={0.70} floatDir="down">
            <div className="rounded-xl px-4 py-3 backdrop-blur-md"
              style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, boxShadow: C.cardShadow, minWidth: '158px' }}>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 shrink-0" style={{ color: '#FF4800' }} aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#FF4800' }}>Efficiency</span>
              </div>
              <p className="text-[28px] font-black leading-none" style={{ color: C.cardNum, letterSpacing: '-1.5px' }} aria-label="3 to 5x efficiency gain">3–5×</p>
              <p className="text-[11px] mt-1" style={{ color: C.cardSub }}>Operational output</p>
            </div>
          </MetricCard>

          {/* AI Agent badge — bottom-left */}
          <MetricCard className="absolute bottom-12 -left-5 hidden lg:block" entryDelay={0.85} floatDir="up">
            <div className="rounded-lg px-3 py-2 backdrop-blur-md"
              style={{ background: isDark ? 'rgba(255,72,0,0.16)' : 'rgba(255,72,0,0.09)', border: '1px solid rgba(255,72,0,0.26)' }}>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full shrink-0" style={{ background: '#FF4800', boxShadow: '0 0 6px rgba(255,72,0,0.75)' }} aria-hidden="true" />
                <span className="text-[11px] font-semibold" style={{ color: '#FF4800' }}>AI Agent Active</span>
              </div>
            </div>
          </MetricCard>

          {/* ── Mobile inline metric pills — below the image, lg:hidden ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="lg:hidden mt-4 flex items-center justify-center gap-3 flex-wrap"
          >
            {[
              { icon: <TrendingDown className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />, value: '−50%', label: 'Manual Work' },
              { icon: <Zap className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />, value: '3–5×', label: 'Efficiency' },
            ].map((m) => (
              <div key={m.label} className="flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-sm"
                style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, boxShadow: C.cardShadow }}>
                {m.icon}
                <span className="text-[13px] font-black" style={{ color: C.cardNum, letterSpacing: '-0.5px' }}>{m.value}</span>
                <span className="text-[11px]" style={{ color: C.cardSub }}>{m.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 rounded-full px-3 py-2"
              style={{ background: isDark ? 'rgba(255,72,0,0.14)' : 'rgba(255,72,0,0.08)', border: '1px solid rgba(255,72,0,0.25)' }}>
              <div className="h-1.5 w-1.5 rounded-full" style={{ background: '#FF4800', boxShadow: '0 0 5px rgba(255,72,0,0.7)' }} />
              <span className="text-[11px] font-semibold" style={{ color: '#FF4800' }}>AI Agent Active</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-36"
        style={{ zIndex: 5, background: `linear-gradient(to bottom,transparent,${C.bgColor})` }} />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2">
          <span className="text-[11px] uppercase tracking-widest" style={{ color: '#64748b' }}>Scroll</span>
          <div className="flex h-8 w-5 items-start justify-center rounded-full pt-1.5"
            style={{ border: `1.5px solid ${C.scrollLine}` }}>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-2 w-1 rounded-full" style={{ background: '#FF4800' }} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
