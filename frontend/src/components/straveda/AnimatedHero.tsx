'use client';

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Building2, Star, X, Quote } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import MagneticButton from '@/components/straveda/MagneticButton';
import StravedaHeroBackground from '@/components/straveda/StravedaHeroBackground';

const ease = [0.4, 0, 0.2, 1] as const;

interface AnimatedHeroProps {
  onNavigate: (page: string) => void;
}

/**
 * Premium Hero with Combined Gradient Animation + Grain Shader Background
 * Fully theme-aware: Light (white/orange) and Dark (black/orange/purple) modes.
 *
 * Visual layers (bottom → top):
 *   z-0  StravedaHeroBackground (gradient orbs + grain shader + vignette)
 *   z-[1] Floating decorative dots
 *   z-[2] Mouse-following gradient glow
 *   z-[3] Decorative side borders (inner lines)
 *   z-10 Content (text, CTAs, social proof)
 *   z-[5] Bottom gradient fade
 *   z-10 Scroll indicator
 */
export default function AnimatedHero({ onNavigate }: AnimatedHeroProps) {
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();

  // SSR-safe client detection
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const isDark = mounted && (resolvedTheme === 'dark' || theme === 'dark');

  // ── Color tokens ──
  const colors = useMemo(() => ({
    headline: isDark ? '#f0f0f5' : '#1a1a2e',
    headlineHover: '#FF4800',
    tagline: isDark ? '#a1a1aa' : '#4a4a5a',
    badgeText: isDark ? '#e5e5ea' : '#1a1a2e',
    badgeBg: isDark ? 'rgba(0, 0, 0, 0.55)' : 'rgba(255, 255, 255, 0.92)',
    badgeBorder: 'rgba(255, 72, 0, 0.25)',
    badgeDivider: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)',
    ratingNum: isDark ? '#f0f0f5' : '#1a1a2e',
    ratingLabel: isDark ? '#9ca3af' : '#6b7280',
    scrollText: isDark ? '#6b7280' : '#6b7280',
    scrollBorder: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(43, 35, 88, 0.3)',
    statLine: 'rgba(255, 72, 0, 0.5)',
    secondaryBtnBorder: isDark ? 'rgba(255, 72, 0, 0.35)' : 'rgba(43, 35, 88, 0.3)',
    secondaryBtnText: isDark ? '#f0f0f5' : '#2B2358',
    secondaryBtnBg: isDark ? 'rgba(255, 72, 0, 0.08)' : 'rgba(255, 255, 255, 0.7)',
    borderLine: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
  }), [isDark]);

  const taglineWords = useMemo(
    () =>
      'AI  Powered  Business  Systems  and  Custom Software  for  Mid Market Companies in India. We build the Automation, CRMs, and Workflows that cut manual work by 50%.'.split(
        ' '
      ),
    []
  );

  // Mouse-following gradient glow — scoped to hero section
  useEffect(() => {
    const section = containerRef.current?.parentElement;
    const gradient = gradientRef.current;
    if (!section || !gradient) return;

    const el = gradient;

    function onMouseMove(e: MouseEvent) {
      el.style.left = e.clientX - 192 + 'px';
      el.style.top = e.clientY - 192 + 'px';
      el.style.opacity = '1';
    }

    function onMouseLeave() {
      el.style.opacity = '0';
    }

    section.addEventListener('mousemove', onMouseMove);
    section.addEventListener('mouseleave', onMouseLeave);

    return () => {
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  // Word stagger animation for tagline
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const words = container.querySelectorAll<HTMLElement>('.hero-word');
    words.forEach((word) => {
      const delay = parseInt(word.getAttribute('data-delay') || '0', 10);
      setTimeout(() => {
        word.style.animation = 'hero-word-appear 0.8s ease-out forwards';
      }, delay);
    });
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Inline CSS animations */}
      <style>{`
        @keyframes hero-word-appear {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.15; }
          33% { transform: translateY(-14px) rotate(3deg); opacity: 0.25; }
          66% { transform: translateY(6px) rotate(-2deg); opacity: 0.18; }
        }
        @keyframes hero-float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.12; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.2; }
        }
        @keyframes hero-float-3 {
          0%, 100% { transform: translate(0, 0); opacity: 0.1; }
          25% { transform: translate(5px, -10px); opacity: 0.18; }
          50% { transform: translate(-3px, -18px); opacity: 0.14; }
          75% { transform: translate(8px, -8px); opacity: 0.16; }
        }
      `}</style>

      {/* ═══ HERO BACKGROUND — Gradient Orbs + Grain Shader ═══ */}
      <StravedaHeroBackground />

      {/* Mouse-following gradient glow */}
      <div
        ref={gradientRef}
        className="fixed pointer-events-none w-96 h-96 rounded-full opacity-0"
        style={{
          zIndex: 2,
          background:
            'radial-gradient(circle, rgba(255,72,0,0.08) 0%, transparent 100%)',
          transition: 'opacity 0.5s ease-out',
          filter: 'blur(32px)',
        }}
        aria-hidden="true"
      />

      {/* Floating decorative dots */}
      <div
        className="absolute top-[22%] right-[14%] w-2 h-2 rounded-full"
        style={{
          zIndex: 1,
          background: '#FF4800',
          animation: 'hero-float-1 6s ease-in-out infinite',
          animationDelay: '1s',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-[58%] right-[9%] w-1.5 h-1.5 rounded-full"
        style={{
          zIndex: 1,
          background: isDark ? '#FF4800' : '#2B2358',
          animation: 'hero-float-2 8s ease-in-out infinite',
          animationDelay: '2.5s',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[28%] left-[7%] w-1.5 h-1.5 rounded-full"
        style={{
          zIndex: 1,
          background: '#FF4800',
          animation: 'hero-float-3 7s ease-in-out infinite',
          animationDelay: '4s',
        }}
        aria-hidden="true"
      />

      {/* Decorative Side Borders */}
      <div
        aria-hidden="true"
        className="absolute inset-0 mx-auto hidden min-h-screen w-full max-w-[860px] lg:block"
        style={{ zIndex: 3 }}
      >
        <div
          className="absolute inset-y-0 left-0 h-full w-px"
          style={{
            background: colors.borderLine,
            maskImage: 'linear-gradient(to bottom, black 80%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)',
          }}
        />
        <div
          className="absolute inset-y-0 right-0 h-full w-px"
          style={{
            background: colors.borderLine,
            maskImage: 'linear-gradient(to bottom, black 80%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)',
          }}
        />
      </div>

      {/* Content Faded Borders — inner gradient lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 size-full overflow-hidden"
        style={{ zIndex: 3 }}
      >
        <div
          className="absolute inset-y-0 left-4 w-px md:left-8"
          style={{ background: `linear-gradient(to bottom, transparent, ${colors.borderLine}, ${colors.borderLine})` }}
        />
        <div
          className="absolute inset-y-0 right-4 w-px md:right-8"
          style={{ background: `linear-gradient(to bottom, transparent, ${colors.borderLine}, ${colors.borderLine})` }}
        />
        <div
          className="absolute inset-y-0 left-8 w-px md:left-12"
          style={{ background: `linear-gradient(to bottom, transparent, ${colors.borderLine}80, ${colors.borderLine}80)` }}
        />
        <div
          className="absolute inset-y-0 right-8 w-px md:right-12"
          style={{ background: `linear-gradient(to bottom, transparent, ${colors.borderLine}80, ${colors.borderLine}80)` }}
        />
      </div>

      {/* ═══ CONTENT ═══ */}
      <div
        ref={containerRef}
        className="relative z-10 mx-auto w-full max-w-[860px] px-4 sm:px-6 lg:px-8 pt-24 pb-14 sm:pt-28 sm:pb-20 md:py-28 text-left"
      >
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease }}
        >
          <span
            className={cn(
              'group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 shadow-sm',
              'cursor-default transition-all duration-300 hover:shadow-md',
              'backdrop-blur-sm max-w-full'
            )}
            style={{
              background: colors.badgeBg,
              borderColor: colors.badgeBorder,
            }}
          >
            <Building2
              className="size-3 shrink-0"
              style={{ color: '#FF4800' }}
            />
            <span
              className="text-xs font-medium min-w-0 truncate"
              style={{ color: colors.badgeText }}
            >
              Pune, Maharashtra · Serving clients across India
            </span>
            <span
              className="block h-5 w-px shrink-0"
              style={{ background: colors.badgeDivider }}
            />
            <ArrowRight
              className="size-3 shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-1"
              style={{ color: '#FF4800' }}
            />
          </span>
        </motion.div>

        {/* Animated Headline with rotating words + cursor proximity */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="mt-6 mb-6 font-normal w-full"
          style={{
            fontSize: 'clamp(2rem, 8vw, 5.125rem)',
            lineHeight: 1.05,
            letterSpacing: '-1.5px',
            color: colors.headline,
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          <span
            className="block cursor-default"
            style={{ color: colors.headline }}
          >
            AI that eliminates work.
          </span>
          <span
            className="block cursor-default"
            style={{ color: '#FF4800' }}
          >
            Software that runs your operations.
          </span>
        </motion.h1>

        {/* Tagline with word stagger */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="w-full max-w-[600px] text-left text-[16px] font-normal leading-relaxed md:text-[20px]"
          style={{ color: colors.tagline, overflowWrap: 'break-word' }}
        >
          {taglineWords.map((word, i) => (
            <span
              key={i}
              className="hero-word inline-block opacity-0"
              data-delay={800 + i * 50}
            >
              {word}
              {i < taglineWords.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton>
            <motion.button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-medium text-white shadow-lg shadow-orange-500/25 transition-all duration-200 hover:scale-[1.03] hover:shadow-xl"
              style={{ background: '#FF4800' }}
            >
              Book Strategy Call
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </MagneticButton>
          <motion.button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] px-7 py-3.5 text-[14px] font-medium transition-all duration-200 hover:scale-[1.02] hover:border-[#FF4800]/50 backdrop-blur-sm"
            style={{
              borderColor: colors.secondaryBtnBorder,
              color: colors.secondaryBtnText,
              background: colors.secondaryBtnBg,
            }}
          >
            See What We Build
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease }}
          className="mt-10"
        >
          
          <div className="flex items-center gap-3">
            <span className="text-[13px]" style={{ color: colors.ratingLabel }}>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade to blend into next section */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        style={{
          zIndex: 5,
          background: isDark
            ? 'linear-gradient(to bottom, transparent, #0a0a14)'
            : 'linear-gradient(to bottom, transparent, var(--background))',
        }}
      />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span
            className="text-[11px] uppercase tracking-widest"
            style={{ color: colors.scrollText }}
          >
            Scroll
          </span>
          <div
            className="flex h-8 w-5 items-start justify-center rounded-full pt-1.5"
            style={{ border: `2px solid ${colors.scrollBorder}` }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-2 w-1 rounded-full"
              style={{ background: '#FF4800' }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* ── Google Reviews Modal ── */}
      <AnimatePresence>
        {reviewsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
            onClick={() => setReviewsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-2xl overflow-hidden"
              style={{
                background: isDark ? '#13131f' : '#ffffff',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" style={{ color: '#FF4800' }} />
                    ))}
                  </div>
                  <div>
                    <span className="text-[15px] font-semibold" style={{ color: isDark ? '#f0f0f5' : '#1a1a2e' }}>
                      5.0
                    </span>
                    <span className="ml-1.5 text-[13px]" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                      · Google Reviews
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setReviewsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200"
                  style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', color: isDark ? '#9ca3af' : '#6b7280' }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Reviews */}
              <div className="px-6 py-5 flex flex-col gap-5">
                {[
                  {
                    name: 'James Whitfield',
                    role: 'VP of Engineering, FinServ Corp',
                    avatar: 'JW',
                    date: 'March 2024',
                    text: 'Straveda transformed our entire infrastructure strategy. Their enterprise architecture expertise is second to none we modernized our core platform in under 6 months with zero disruption.',
                  },
                  {
                    name: 'Priya Nambiar',
                    role: 'CTO, HealthBridge Systems',
                    avatar: 'PN',
                    date: 'January 2024',
                    text: 'Outstanding team. They aligned our IT roadmap with business goals in ways we couldn\'t achieve internally. The ROI was evident within the first quarter. Highly recommend Straveda.',
                  },
                ].map((review) => (
                  <div
                    key={review.name}
                    className="rounded-xl p-5"
                    style={{ background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)', border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.05)' }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white"
                        style={{ background: 'linear-gradient(135deg, #FF4800, #ff7040)' }}
                      >
                        {review.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-semibold" style={{ color: isDark ? '#f0f0f5' : '#1a1a2e' }}>
                          {review.name}
                        </p>
                        <p className="text-[12px]" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
                          {review.role}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" style={{ color: '#FF4800' }} />
                        ))}
                      </div>
                    </div>
                    <Quote size={14} className="mb-1.5 opacity-30" style={{ color: '#FF4800' }} />
                    <p className="text-[13px] leading-relaxed" style={{ color: isDark ? '#9ca3af' : '#4a4a5a' }}>
                      {review.text}
                    </p>
                    <p className="mt-2 text-[11px]" style={{ color: isDark ? '#4b5563' : '#d1d5db' }}>
                      {review.date}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer CTA */}
              <div
                className="px-6 py-4 flex items-center justify-between"
                style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)' }}
              >
                <p className="text-[12px]" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
                  Verified reviews via Google
                </p>
                <a
                  href="https://www.google.com/search?q=Straveda+reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
                  style={{ background: '#FF4800' }}
                >
                  View on Google
                  <ArrowRight size={13} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
