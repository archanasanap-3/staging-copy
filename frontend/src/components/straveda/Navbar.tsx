'use client';

/**
 * Navbar — Floating Glass Pill
 *
 * Scroll DOWN → pill shrinks 45% from both sides, white glass + faint orange tint
 * Scroll UP   → pill expands back to full, dark glass restored
 * At top      → always full dark glass
 *
 * All transitions are pure CSS on the wrapper padding — no layout reflow,
 * GPU-composited, zero Framer Motion scroll hooks.
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/straveda/ThemeToggle';
import { useCursorStyle } from '@/lib/cursor-context';
import { useTheme } from 'next-themes';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onSearchToggle?: () => void;
}

const NAV_LINKS = [
  { label: 'Home',     page: 'home'     },
  { label: 'Services', page: 'services' },
  { label: 'About',    page: 'about'    },
  { label: 'Insights', page: 'insights' },
  { label: 'Careers',  page: 'careers'  },
  { label: 'Contact',  page: 'contact'  },
] as const;

const EASE = [0.4, 0, 0.2, 1] as const;

// ─── Design tokens ────────────────────────────────────────────────────────
// Light mode — Full state (white + orange warm glass)
const FULL_LIGHT = {
  bg:        'rgba(255, 255, 255, 0.88)',
  border:    'rgba(255, 72, 0, 0.22)',
  shadow:    '0 8px 40px rgba(255,72,0,0.10), 0 2px 12px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.90) inset',
  text:      '#1a1a2e',
  textMuted: '#6b7280',
  ctaBg:     '#FF4800',
  ctaColor:  '#FFFFFF',
} as const;

// Light mode — Compact state (85% transparent faint orange glass)
const COMPACT_LIGHT = {
  bg:        'rgba(255, 72, 0, 0.08)',
  border:    'rgba(255, 72, 0, 0.22)',
  shadow:    '0 4px 32px rgba(255,72,0,0.12), 0 1px 0 rgba(255,255,255,0.18) inset',
  text:      '#1a1a2e',
  textMuted: '#4b5563',
  ctaBg:     '#FF4800',
  ctaColor:  '#FFFFFF',
} as const;

// Dark mode — Full state (dark glass + orange tint)
const FULL_DARK = {
  bg:        'rgba(12, 12, 22, 0.90)',
  border:    'rgba(255, 72, 0, 0.20)',
  shadow:    '0 8px 40px rgba(0,0,0,0.4), 0 2px 12px rgba(255,72,0,0.06), 0 1px 0 rgba(255,255,255,0.06) inset',
  text:      '#f0f0f5',
  textMuted: '#9ca3af',
  ctaBg:     '#FF4800',
  ctaColor:  '#FFFFFF',
} as const;

// Dark mode — Compact state (very transparent dark glass)
const COMPACT_DARK = {
  bg:        'rgba(255, 72, 0, 0.05)',
  border:    'rgba(255, 72, 0, 0.20)',
  shadow:    '0 4px 32px rgba(255,72,0,0.08), 0 1px 0 rgba(255,255,255,0.06) inset',
  text:      '#f0f0f5',
  textMuted: '#9ca3af',
  ctaBg:     '#FF4800',
  ctaColor:  '#FFFFFF',
} as const;

// Legacy aliases kept for SSR skeleton
const DARK = FULL_LIGHT;

const ORANGE = '#FF4800';

// Transition applied to the outer wrapper (width shrink via padding)
const WRAPPER_TRANSITION = 'padding 0.42s cubic-bezier(0.4,0,0.2,1)';

// Transition applied to the pill itself (colours, shadow, backdrop)
const PILL_TRANSITION = [
  'background 0.36s ease',
  'border-color 0.36s ease',
  'box-shadow 0.36s ease',
].join(', ');

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { setCursorStyle } = useCursorStyle();
  const { resolvedTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted,    setMounted]    = useState(false);
  const [compact,    setCompact]    = useState(false);

  // Hydration guard
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Scroll direction → compact toggle
  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if      (y < 60)           setCompact(false);
      else if (y > lastY + 4)    setCompact(true);
      else if (y < lastY - 3)    setCompact(false);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeThenNavigate = useCallback((page: string) => {
    setMobileOpen(false);
    onNavigate(page);
  }, [onNavigate]);

  const isActive = (page: string) => currentPage === page;

  // Derived colours — adapts to both scroll state and dark mode
  const isDarkMode = resolvedTheme === 'dark';
  const T = isDarkMode
    ? (compact ? COMPACT_DARK : FULL_DARK)
    : (compact ? COMPACT_LIGHT : FULL_LIGHT);

  // SSR skeleton
  if (!mounted) {
    return (
      <header
        className="fixed top-4 left-0 right-0 z-50"
        style={{ padding: '0 1rem' }}
      >
        <div
          className="rounded-full"
          style={{
            height:     60,
            background: DARK.bg,
            border:     `1px solid ${DARK.border}`,
            boxShadow:  DARK.shadow,
          }}
        />
      </header>
    );
  }

  return (
    <>
      {/* ══════════════════════════════════════════
          DESKTOP / TABLET NAVBAR
      ══════════════════════════════════════════ */}
      <motion.header
        className="fixed top-4 left-0 right-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        style={{
          /*
           * Compact shrink — desktop only (md+).
           * On mobile keep full-width pill with 1rem gutter on each side
           * so the logo stays at the same left edge as page content.
           */
          paddingLeft:  compact ? 'clamp(1rem, 22.5vw, 22.5vw)' : '1rem',
          paddingRight: compact ? 'clamp(1rem, 22.5vw, 22.5vw)' : '1rem',
          transition:   WRAPPER_TRANSITION,
        }}
      >
        {/* ── Glass pill ─────────────────────────────────────────── */}
        <div
          role="banner"
          className="relative flex items-center justify-between rounded-full"
          style={{
            height:               60,
            padding:              '0 22px',
            background:           T.bg,
            backdropFilter:       compact ? 'blur(28px) saturate(1.6)' : 'blur(16px) saturate(1.2)',
            WebkitBackdropFilter: compact ? 'blur(28px) saturate(1.6)' : 'blur(16px) saturate(1.2)',
            border:               `1px solid ${T.border}`,
            boxShadow:            T.shadow,
            transition:           PILL_TRANSITION,
          }}
          onMouseEnter={() => setCursorStyle('nav')}
          onMouseLeave={() => setCursorStyle('default')}
        >

          {/* ── Orange glass bar — fades in when compact ────────── */}
          {/* Creates the 85% transparent faint orange frosted look  */}
          <span
            aria-hidden="true"
            style={{
              position:     'absolute',
              inset:        0,
              borderRadius: 'inherit',
              pointerEvents:'none',
              opacity:       compact ? 1 : 0,
              transition:    'opacity 0.42s ease',
              // Horizontal orange wash — bright center, fades to edges
              background:    'linear-gradient(90deg, transparent 0%, rgba(255,72,0,0.05) 20%, rgba(255,72,0,0.12) 50%, rgba(255,72,0,0.05) 80%, transparent 100%)',
              // Bottom orange glow line + top white highlight
              boxShadow:     [
                'inset 0 -1px 0 rgba(255,72,0,0.40)',  // bottom orange line
                'inset 0 1px 0 rgba(255,255,255,0.22)', // top white sheen
                '0 0 24px rgba(255,72,0,0.08)',          // outer ambient orange haze
              ].join(', '),
            }}
          />

          {/* ── Wordmark — absolute center on mobile, static left on desktop ── */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
            className="z-10 shrink-0 select-none"
            style={{
              fontFamily:    'Geist, sans-serif',
              fontSize:      15,
              fontWeight:    600,
              letterSpacing: '-0.3px',
              color:         T.text,
              transition:    'color 0.3s ease',
            }}
            onMouseEnter={(e) => { e.stopPropagation(); setCursorStyle('link'); }}
            onMouseLeave={() => setCursorStyle('nav')}
          >
            Str<span style={{ color: ORANGE }}>a</span>veda
          </a>

          {/* ── CENTER: Nav links (always visible) ─────────────── */}
          <nav
            aria-label="Primary navigation"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-7"
          >
            {NAV_LINKS.map(({ label, page }, i) => (
              <motion.a
                key={page}
                href={`#${page}`}
                onClick={(e) => { e.preventDefault(); onNavigate(page); }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.055, ease: EASE }}
                className="relative group text-[13px] whitespace-nowrap"
                style={{
                  fontWeight:  400,
                  color:       isActive(page) ? T.text : T.textMuted,
                  transition:  'color 0.22s ease',
                }}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setCursorStyle('link');
                  (e.currentTarget as HTMLElement).style.color = T.text;
                }}
                onMouseLeave={(e) => {
                  setCursorStyle('nav');
                  (e.currentTarget as HTMLElement).style.color =
                    isActive(page) ? T.text : T.textMuted;
                }}
              >
                {label}
                {/* Active / hover underline */}
                <span
                  className="absolute -bottom-[3px] left-0 h-[1.5px] rounded-full transition-all duration-300 group-hover:w-full"
                  style={{
                    backgroundColor: ORANGE,
                    width: isActive(page) ? '100%' : '0',
                  }}
                />
              </motion.a>
            ))}
          </nav>

          {/* ── RIGHT: ThemeToggle + CTA + Hamburger ───────────── */}
          <div className="relative z-10 flex items-center gap-2">

            {/* Theme toggle */}
            <div
              className="hidden md:block"
              style={{ transition: 'opacity 0.22s ease' }}
              onMouseEnter={(e) => { e.stopPropagation(); setCursorStyle('link'); }}
              onMouseLeave={() => setCursorStyle('nav')}
            >
              <ThemeToggle />
            </div>

            {/* CTA pill — colour adapts with glass mode */}
            <button
              onClick={() => onNavigate('contact')}
              className="hidden md:inline-flex items-center gap-2 rounded-full select-none cursor-pointer"
              style={{
                height:     36,
                padding:    '0 18px',
                fontSize:   13,
                fontWeight: 500,
                background: T.ctaBg,
                color:      T.ctaColor,
                border:     compact ? `1px solid rgba(255,72,0,0.3)` : '1px solid transparent',
                transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.stopPropagation();
                setCursorStyle('link');
                e.currentTarget.style.transform = 'scale(1.04)';
                e.currentTarget.style.background = '#e03e00';
              }}
              onMouseLeave={(e) => {
                setCursorStyle('nav');
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = '#FF4800';
              }}
            >
              Start a project
              <span style={{ color: '#ffffff', fontWeight: 700 }}>→</span>
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-full cursor-pointer"
              style={{
                color:      T.textMuted,
                background: 'rgba(255,72,0,0.07)',
                border:     `1px solid rgba(255,72,0,0.20)`,
                transition: 'background 0.3s ease',
                minWidth:   44,
                minHeight:  44,
              }}
              onClick={() => setMobileOpen((p) => !p)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ══════════════════════════════════════════
          MOBILE FULL-SCREEN DRAWER
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="fixed inset-0 z-[55] md:hidden flex flex-col"
            style={{
              background:           'rgba(14, 12, 28, 0.97)',
              backdropFilter:       'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            {/* Top bar — logo centered, close button absolutely right */}
            <div
              className="relative flex items-center justify-center px-6 pt-6 pb-4"
              style={{ borderBottom: `1px solid rgba(255,255,255,0.08)` }}
            >
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setMobileOpen(false); }}
                className="text-[16px] select-none"
                style={{ fontFamily: 'Geist, sans-serif', fontWeight: 600, color: '#FFFFFF' }}
              >
                Str<span style={{ color: ORANGE }}>a</span>veda
              </a>
              <button
                className="absolute right-6 flex items-center justify-center w-11 h-11 rounded-full cursor-pointer"
                style={{
                  color:      'rgba(255,255,255,0.50)',
                  background: 'rgba(255,255,255,0.05)',
                  border:     '1px solid rgba(255,255,255,0.08)',
                  minWidth:   44,
                  minHeight:  44,
                }}
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-col items-center justify-center flex-1 gap-1 px-6">
              {NAV_LINKS.map(({ label, page }, i) => (
                <motion.a
                  key={page}
                  href={`#${page}`}
                  onClick={(e) => { e.preventDefault(); closeThenNavigate(page); }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.06 + i * 0.06 }}
                  className="relative text-center text-[30px] font-normal py-2.5 transition-colors duration-200"
                  style={{ color: isActive(page) ? '#FFFFFF' : 'rgba(255,255,255,0.50)' }}
                >
                  {label}
                  {isActive(page) && (
                    <span
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 block w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: ORANGE }}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Bottom: theme + CTA */}
            <div className="flex flex-col items-center gap-4 px-6 pb-12">
              <ThemeToggle />
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.42 }}
                className="w-full max-w-xs rounded-full font-normal cursor-pointer transition-all duration-200"
                style={{
                  background: '#FFFFFF',
                  color:      '#000000',
                  padding:    '14px 28px',
                  fontSize:   15,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#f2f2f2'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#FFFFFF'; }}
                onClick={() => closeThenNavigate('contact')}
              >
                Start a project{' '}
                <span style={{ color: ORANGE, fontWeight: 700 }}>→</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
