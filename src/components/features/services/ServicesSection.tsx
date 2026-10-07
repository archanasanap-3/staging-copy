'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

import { motion } from 'framer-motion';

import { Zap, Code, Cpu, Globe } from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

import ServiceCard from '@/components/features/services/ServiceCard';

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const cardCount = CARD_DATA.length;

  /* ── Track active card by measuring scroll position ── */

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;

    if (!el) return;

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

    el.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section className="relative bg-white dark:bg-[#0a0a14] pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">

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

      {/* ════════════════════════════════════════════════════════
          CAROUSEL (mobile) → GRID (md+)
          ════════════════════════════════════════════════════════ */}

      <div
  ref={scrollRef}
  className="
    grid
    grid-cols-1
    gap-6
    px-4
    md:grid-cols-2
    md:gap-5
    md:px-6
    xl:grid-cols-4
    xl:gap-6
    md:mx-auto
    md:max-w-7xl
  "
>

        {CARD_DATA.map((card, i) => (
         <div
  key={i}
  className="w-full"
>

            <ServiceCard
              icon={card.icon}
              badge={card.badge}
              title={card.title}
              description={card.description}
              capabilities={card.capabilities}
              index={i}
              isActive={activeIndex === i}
              route={`#${['automation', 'custom-software', 'ai-strategy', 'web-development'][i]}`}
              
            />

          </div>
        ))}

      </div>

      {/* ── Pagination dots — only visible on mobile ─────────── */}


      {/* ── Swipe hint label — mobile only ─────────── */}

    </section>
  );
}