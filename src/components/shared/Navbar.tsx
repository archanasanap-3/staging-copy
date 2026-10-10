'use client';

/**
 * Navbar — Floating Glass Pill
 * Refactored for App Router: uses usePathname() for active state, Link for navigation.
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/shared/ThemeToggle';
import { useCursorStyle } from '@/lib/cursor-context';
import { useTheme } from 'next-themes';

interface NavbarProps {
  onSearchToggle?: () => void;
}

const NAV_LINKS = [
  { label: 'Home',       href: '/' },
  { label: 'Services',   href: '/services' },
  { label: 'About',      href: '/about' },
  { label: 'Commerce OS',   href: '/commerce-os' },
  { label: 'Careers',    href: '/careers' },
  { label: 'Contact',    href: '/contact' },
] as const;

const EASE = [0.4, 0, 0.2, 1] as const;

const FULL_LIGHT = {
  bg: 'rgba(255, 255, 255, 0.88)',
  border: 'rgba(255, 72, 0, 0.22)',
  shadow: '0 8px 40px rgba(255,72,0,0.10), 0 2px 12px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.90) inset',
  text: '#000000', textMuted: '#000000', ctaBg: '#FF4800', ctaColor: '#FFFFFF',
} as const;

const COMPACT_LIGHT = {
  bg: 'rgba(255, 255, 255, 0.88)',
  border: 'rgba(200, 200, 200, 0.30)',
  shadow: '0 4px 32px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.90) inset',
  text: '#000000', textMuted: '#000000', ctaBg: '#FF4800', ctaColor: '#FFFFFF',
} as const;

const FULL_DARK = {
  bg: 'rgba(12, 12, 22, 0.90)',
  border: 'rgba(255, 72, 0, 0.20)',
  shadow: '0 8px 40px rgba(0,0,0,0.4), 0 2px 12px rgba(255,72,0,0.06), 0 1px 0 rgba(255,255,255,0.06) inset',
  text: '#f0f0f5', textMuted: '#9ca3af', ctaBg: '#FF4800', ctaColor: '#FFFFFF',
} as const;

const COMPACT_DARK = {
  bg: 'rgba(255, 72, 0, 0.05)',
  border: 'rgba(255, 72, 0, 0.20)',
  shadow: '0 4px 32px rgba(255,72,0,0.08), 0 1px 0 rgba(255,255,255,0.06) inset',
  text: '#f0f0f5', textMuted: '#9ca3af', ctaBg: '#FF4800', ctaColor: '#FFFFFF',
} as const;

const DARK = FULL_LIGHT;
const ORANGE = '#FF4800';

const PILL_TRANSITION = [
  'background 0.36s ease',
  'border-color 0.36s ease',
  'box-shadow 0.36s ease',
].join(', ');

export default function Navbar({ onSearchToggle }: NavbarProps) {
  const { setCursorStyle } = useCursorStyle();
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [compact, setCompact] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setCompact(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMounted(true); }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href) ?? false;

  const isDarkMode = resolvedTheme === 'dark';
  const T = isDarkMode
    ? (compact ? COMPACT_DARK : FULL_DARK)
    : (compact ? COMPACT_LIGHT : FULL_LIGHT);

  if (!mounted) {
    return (
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 md:px-0">
        <div
          className="rounded-full w-full max-w-7xl"
          style={{ height: 60, background: DARK.bg, border: `1px solid ${DARK.border}`, boxShadow: DARK.shadow }}
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
        className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none"
        initial={{ opacity: 0, y: -20, paddingLeft: '0rem', paddingRight: '0rem' }}
        animate={{
          opacity: 1, y: 0,
          paddingLeft:  compact ? (isMobile ? '1rem' : '12%') : (isMobile ? '1rem' : '0rem'),
          paddingRight: compact ? (isMobile ? '1rem' : '12%') : (isMobile ? '1rem' : '0rem'),
        }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <motion.div
          role="banner"
          className="relative flex items-center justify-between rounded-full w-full max-w-7xl pointer-events-auto"
          initial={false}
          animate={{ height: 72, paddingLeft: compact ? 32 : 22, paddingRight: compact ? 32 : 22 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{
            background: T.bg,
            backdropFilter: compact ? 'blur(28px) saturate(1.6)' : 'blur(16px) saturate(1.2)',
            WebkitBackdropFilter: compact ? 'blur(28px) saturate(1.6)' : 'blur(16px) saturate(1.2)',
            border: `1px solid ${T.border}`,
            boxShadow: T.shadow,
            transition: PILL_TRANSITION,
          }}
          onMouseEnter={() => setCursorStyle('nav')}
          onMouseLeave={() => setCursorStyle('default')}
        >

          {/* Wordmark */}
          <Link
            href="/"
            className="z-10 shrink-0 select-none relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4800] rounded-sm"
            style={{ height: 32, width: 120 }}
            onMouseEnter={(e) => { e.stopPropagation(); setCursorStyle('link'); }}
            onMouseLeave={() => setCursorStyle('nav')}
          >
            <Image
              src={isDarkMode ? '/logos/blackmain_logo_cropped.png' : '/logos/main_logo_cropped.png'}
              alt="Straveda"
              fill
              sizes="220px"
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* CENTER: Nav links */}
          <nav
            aria-label="Primary navigation"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center gap-5 xl:gap-8"
          >
            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.055, ease: EASE }}
                className="relative group"
              >
                <Link
                  href={href}
                  className="text-[15px] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4800] rounded-sm"
                  style={{
                    fontWeight: 500,
                    color: isActive(href) ? T.text : T.textMuted,
                    transition: 'color 0.22s ease',
                  }}
                  onMouseEnter={(e) => { e.stopPropagation(); setCursorStyle('link'); (e.currentTarget as HTMLElement).style.color = T.text; }}
                  onMouseLeave={(e) => { setCursorStyle('nav'); (e.currentTarget as HTMLElement).style.color = isActive(href) ? T.text : T.textMuted; }}
                >
                  {label}
                </Link>
                {/* Active/hover underline */}
                <span
                  className="absolute -bottom-[3px] left-0 h-[1.5px] rounded-full transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: ORANGE, width: isActive(href) ? '100%' : '0' }}
                />
              </motion.div>
            ))}
          </nav>

          {/* RIGHT: ThemeToggle + CTA + Hamburger */}
          <div className="relative z-10 flex items-center gap-2">
            <div
              className="hidden lg:block"
              style={{ transition: 'opacity 0.22s ease' }}
              onMouseEnter={(e) => { e.stopPropagation(); setCursorStyle('link'); }}
              onMouseLeave={() => setCursorStyle('nav')}
            >
              <ThemeToggle />
            </div>

            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center gap-2 rounded-full select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4800]"
              style={{
                height: 40, padding: '0 24px', fontSize: 14, fontWeight: 500,
                background: T.ctaBg, color: T.ctaColor,
                border: compact ? '1px solid rgba(255,72,0,0.3)' : '1px solid transparent',
                transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => { e.stopPropagation(); setCursorStyle('link'); (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; (e.currentTarget as HTMLElement).style.background = '#e03e00'; }}
              onMouseLeave={(e) => { setCursorStyle('nav'); (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.background = '#FF4800'; }}
            >
              Start a project <span style={{ color: '#ffffff', fontWeight: 700 }}>→</span>
            </Link>

            {/* Hamburger */}
            <button
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4800]"
              style={{ color: T.textMuted, background: 'rgba(255,72,0,0.07)', border: '1px solid rgba(255,72,0,0.20)', transition: 'background 0.3s ease', minWidth: 44, minHeight: 44 }}
              onClick={() => setMobileOpen(p => !p)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.div>
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
            className="fixed inset-0 z-[55] lg:hidden flex flex-col"
            style={{ background: 'rgba(14, 12, 28, 0.97)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
          >
            {/* Top bar */}
            <div
              className="relative flex items-center justify-center px-6 pt-6 pb-4"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Link
                href="/"
                className="relative select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4800] rounded-sm"
                style={{ height: 48, width: 220 }}
                onClick={() => setMobileOpen(false)}
              >
                <Image
                  src="/logos/blackmain_logo.png"
                  alt="Straveda"
                  fill
                  sizes="220px"
                  className="object-contain object-center"
                  priority
                />
              </Link>
              <button
                className="absolute right-6 flex items-center justify-center w-11 h-11 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4800]"
                style={{ color: 'rgba(255,255,255,0.50)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', minWidth: 44, minHeight: 44 }}
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-col items-center justify-center flex-1 gap-1 px-6">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.06 + i * 0.06 }}
                  className="relative text-center"
                >
                  <Link
                    href={href}
                    className="block text-[30px] font-normal py-2.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4800] rounded-sm"
                    style={{ color: isActive(href) ? '#FFFFFF' : 'rgba(255,255,255,0.50)' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                  {isActive(href) && (
                    <span
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 block w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: ORANGE }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Bottom: theme + CTA */}
            <div className="flex flex-col items-center gap-4 px-6 pb-12">
              <ThemeToggle />
              <Link
                href="/contact"
                className="w-full max-w-xs rounded-full font-normal cursor-pointer transition-all duration-200 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4800]"
                style={{ background: '#FFFFFF', color: '#000000', padding: '14px 28px', fontSize: 15, display: 'block' }}
                onClick={() => setMobileOpen(false)}
              >
                Start a project{' '}
                <span style={{ color: ORANGE, fontWeight: 700 }}>→</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
