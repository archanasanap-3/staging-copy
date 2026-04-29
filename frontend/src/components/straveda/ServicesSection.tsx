'use client';

/**
 * ServicesSection
 *
 * Mobile  (< 768px): Horizontal snap-carousel — cards are 85vw wide so the
 *                     second card "peeks" from the right edge, signalling swipe.
 *                     Animated brand-orange pagination dots track the active card.
 *
 * Desktop (≥ 768px): Standard 2-col → 4-col grid at xl.  No carousel mechanics.
 */

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Code, Cpu, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import ServiceCard from '@/components/straveda/ServiceCard';

const ease = [0.4, 0, 0.2, 1] as const;

/* ─── Service data ─────────────────────────────────────────────── */

interface CardDatum {
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
  capabilities: string[];
}

const CARD_DATA: CardDatum[] = [
  {
    icon: Zap,
    badge: 'AUTOMATION',
    title: 'AI & Business Automation',
    description:
      'WhatsApp flows, email sequences, and AI agents that remove 30–60% of manual operations within the first 90 days.',
    capabilities: [
      'WhatsApp Automation: AI powered lead qualification & booking',
      'Email Sequences: Behavioral triggers without touching your CRM',
      'AI Support: Tier 1 handled by AI, complex issues auto escalate',
    ],
  },
  {
    icon: Code,
    badge: 'SOFTWARE',
    title: 'Custom Software & Systems',
    description:
      'AI powered CRMs, real time dashboards, and internal tools built around your exact workflow—not rigid SaaS constraints.',
    capabilities: [
      'AI Powered CRMs: Built around your specific sales process',
      'Operational Dashboards: Real time visibility into core metrics',
      'Customer Portals: Intelligent self service that cuts support load',
    ],
  },
  {
    icon: Cpu,
    badge: 'STRATEGY',
    title: 'AI Strategy & Integration',
    description:
      'GPT class models, custom LLMs, and RAG systems integrated directly into your existing operations stack for measurable ROI.',
    capabilities: [
      'AI Architecture: Phased roadmap for real world ROI deployment',
      'LLM Fine Tuning: Models trained on your private business context',
      'RAG Systems: AI that answers using your secure internal data',
    ],
  },
  {
    icon: Globe,
    badge: 'DIGITAL',
    title: 'Web Design & Experiences',
    description:
      'High-performance Next.js sites, 3D interactive builds, and conversion funnels deployed to global edge infrastructure.',
    capabilities: [
      'Next.js Performance: Sub second loads and global edge deployment',
      '3D & Interactive: Immersive builds that make brands unforgettable',
      'Conversion Funnels: A/B testing and analytics baked in from day one',
    ],
  },
];

/* ─── Main component ───────────────────────────────────────────── */

export default function ServicesSection() {
  const scrollRef  = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardCount  = CARD_DATA.length;

  /* ── Track active card by measuring scroll position ── */
  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Card width = first child offsetWidth + gap (16px)
    const firstCard = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard
      ? firstCard.offsetWidth + 16
      : window.innerWidth * 0.85 + 16;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(idx, cardCount - 1)));
  }, [cardCount]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateActiveIndex, { passive: true });
    return () => el.removeEventListener('scroll', updateActiveIndex);
  }, [updateActiveIndex]);

  /* ── Programmatic scroll to a dot-clicked card ── */
  const scrollToCard = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard
      ? firstCard.offsetWidth + 16
      : window.innerWidth * 0.85 + 16;
    el.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
  }, []);

  return (
    <section className="relative bg-white dark:bg-[#0a0a14] py-16 sm:py-24 overflow-hidden">

      {/* ── Subtle engineering grid background ────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 dark:opacity-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(0,0,0,0.035) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 dark:opacity-100"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* ── Section header ────────────────────────────────────── */}
      <div className="relative z-10 px-4 sm:px-6 mb-10 sm:mb-14 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease }}
          className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF4800]"
        >
          What We Build
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="text-[26px] sm:text-[34px] md:text-[42px] font-bold tracking-tight leading-tight text-[#1a1a2e] dark:text-[#f0f0f5]"
        >
          Four Disciplines.{' '}
          <span className="text-[#FF4800]">One</span> Engineering Team.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mt-4 text-[14px] sm:text-[15px] text-[#6b7280] dark:text-[#9ca3af] max-w-xl mx-auto"
        >
          Swipe to explore on mobile. Each discipline ships real outcomes, not slide decks.
        </motion.p>
      </div>

      {/* ════════════════════════════════════════════════════════
          CAROUSEL (mobile) → GRID (md+)

          The same element switches display mode via Tailwind
          responsive prefixes:
            mobile : flex + overflow-x-auto + snap-x
            md+    : grid + overflow-visible
          ════════════════════════════════════════════════════════ */}
      <div
        ref={scrollRef}
        className={[
          /* ── Mobile carousel ── */
          'flex overflow-x-auto snap-x snap-mandatory scrollbar-hide',
          'gap-4 px-4 scroll-pl-4 pb-3',

          /* ── Desktop grid — overrides flex ── */
          'md:grid md:grid-cols-2 md:overflow-visible md:snap-none',
          'md:gap-5 md:px-6 md:pb-0 md:scroll-pl-0',

          /* ── XL: 4-column ── */
          'xl:grid-cols-4 xl:gap-6',

          /* ── Constrain grid max-width on desktop ── */
          'md:max-w-7xl md:mx-auto',
        ].join(' ')}
      >
        {CARD_DATA.map((card, i) => (
          /*
           * Wrapper div handles carousel-specific sizing:
           *   mobile : w-[85vw] flex-shrink-0 snap-start  (peek effect)
           *   desktop: w-auto   flex-shrink   snap-none   (grid fills column)
           */
          <div
            key={i}
            className="w-[85vw] flex-shrink-0 snap-start md:w-auto md:flex-shrink md:snap-none"
          >
            <ServiceCard
              icon={card.icon}
              badge={card.badge}
              title={card.title}
              description={card.description}
              capabilities={card.capabilities}
              index={i}
              isActive={activeIndex === i}
            />
          </div>
        ))}
      </div>

      {/* ── Pagination dots — only visible on mobile ──────────── */}
      <div
        className="flex md:hidden items-center justify-center gap-2 mt-5 px-4"
        role="tablist"
        aria-label="Service card pagination"
      >
        {CARD_DATA.map((_, i) => (
          <motion.button
            key={i}
            role="tab"
            aria-selected={activeIndex === i}
            aria-label={`Service ${i + 1} of ${cardCount}`}
            onClick={() => scrollToCard(i)}
            animate={{
              width:           activeIndex === i ? 24 : 8,
              backgroundColor: activeIndex === i
                ? '#FF4800'
                : 'rgba(0,0,0,0.12)',
              scale: activeIndex === i ? 1.1 : 1,
            }}
            transition={{ duration: 0.25, ease }}
            className="h-2 rounded-full cursor-pointer dark:bg-white/20"
            style={{ minWidth: 8 }}
          />
        ))}
      </div>

      {/* ── Swipe hint label — mobile only, fades out ─────────── */}
      <motion.p
        initial={{ opacity: 0.6 }}
        animate={{ opacity: activeIndex > 0 ? 0 : 0.6 }}
        transition={{ duration: 0.4 }}
        className="flex md:hidden items-center justify-center gap-1.5 mt-3 text-[11px] text-[#9ca3af] dark:text-[#6b7280]"
        aria-hidden="true"
      >
        <span>swipe to explore</span>
        <span>→</span>
      </motion.p>
    </section>
  );
}
