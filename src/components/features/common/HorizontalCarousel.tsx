'use client';

/**
 * HorizontalCarousel
 *
 * A responsive snap carousel that converts any grid into a swipeable
 * horizontal carousel on mobile, then reverts to a standard grid on desktop.
 *
 *   Mobile (< 768px):  flex · overflow-x-auto · snap-x mandatory
 *                       Cards use .hcarousel-item CSS class for vw-based widths.
 *                       Peek effect: 82vw card width leaves 18vw visible of next card.
 *
 *   Desktop (≥ 768px): display:grid · configurable column count
 *                       No scroll, no snap. Completely grid-native.
 *
 * Usage:
 *   <HorizontalCarousel cols={3}>
 *     <Card />
 *     <Card />
 *     <Card />
 *   </HorizontalCarousel>
 */

import { useRef, useState, useCallback, useEffect } from 'react';
import React from 'react';
import { motion } from 'framer-motion';

/* ─── Types ────────────────────────────────────────────────────── */

type CarouselSize = 'sm' | 'md' | 'lg';
// sm → 72vw  (stats, icons, compact chips)
// md → 82vw  (standard cards — default)
// lg → 85vw  (large feature cards, stronger peek)

type CarouselCols = 2 | 3 | 4;

export interface HorizontalCarouselProps {
  children: React.ReactNode;
  cols?: CarouselCols;
  size?: CarouselSize;
  showDots?: boolean;
  showHint?: boolean;
  /** Extra Tailwind classes on the outer wrapper */
  className?: string;
  /** Extra Tailwind classes on the grid/scroll container */
  containerClassName?: string;
}

/* ─── Desktop grid column map ──────────────────────────────────── */
const colsMap: Record<CarouselCols, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-2 xl:grid-cols-4',
};

/* ─── Card width CSS-class map ─────────────────────────────────── */
const sizeMap: Record<CarouselSize, string> = {
  sm: 'hcarousel-item-sm',
  md: 'hcarousel-item',
  lg: 'hcarousel-item-lg',
};

const ease = [0.4, 0, 0.2, 1] as const;

/* ─── Component ────────────────────────────────────────────────── */

export default function HorizontalCarousel({
  children,
  cols = 3,
  size = 'md',
  showDots = true,
  showHint = true,
  className = '',
  containerClassName = '',
}: HorizontalCarouselProps) {
  const scrollRef  = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const items = React.Children.toArray(children);
  const count = items.length;

  /* ── Track which card is snapped into view ── */
  const updateActive = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    // gap-4 = 16px; we measure the first child for accuracy
    const cardW = first ? first.offsetWidth + 16 : window.innerWidth * 0.82 + 16;
    setActiveIndex(Math.max(0, Math.min(Math.round(el.scrollLeft / cardW), count - 1)));
  }, [count]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateActive, { passive: true });
    return () => el.removeEventListener('scroll', updateActive);
  }, [updateActive]);

  /* ── Programmatic scroll when a dot is tapped ── */
  const scrollToCard = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const cardW = first ? first.offsetWidth + 16 : window.innerWidth * 0.82 + 16;
    el.scrollTo({ left: idx * cardW, behavior: 'smooth' });
  }, []);

  const itemClass = sizeMap[size];

  return (
    <div className={className}>

      {/* ════════════════════════════════════════════════════════
          SCROLL CONTAINER (mobile) → GRID (md+)
          display:flex overridden to display:grid at md breakpoint.
          ════════════════════════════════════════════════════════ */}
      <div
        ref={scrollRef}
        className={[
          /* Mobile: snap carousel */
          'flex overflow-x-auto snap-x snap-mandatory scrollbar-hide',
          'gap-4 px-4 scroll-pl-4 pb-3',
          /* Desktop: regular grid */
          `md:grid ${colsMap[cols]} md:overflow-visible md:snap-none`,
          'md:gap-5 md:px-0 md:pb-0 md:scroll-pl-0 xl:gap-6',
          containerClassName,
        ].filter(Boolean).join(' ')}
      >
        {items.map((child, i) => (
          /* Each item gets the responsive vw width on mobile, auto on md+ */
          <div key={i} className={itemClass}>
            {child}
          </div>
        ))}
      </div>

      {/* ── Pagination dots — mobile only ────────────────────── */}
      {showDots && count > 1 && (
        <div
          className="flex md:hidden items-center justify-center gap-[7px] mt-4"
          role="tablist"
          aria-label="Carousel navigation"
        >
          {items.map((_, i) => (
            <motion.button
              key={i}
              role="tab"
              aria-selected={activeIndex === i}
              aria-label={`Item ${i + 1} of ${count}`}
              onClick={() => scrollToCard(i)}
              animate={{
                width:           activeIndex === i ? 20 : 7,
                backgroundColor: activeIndex === i ? '#ff4d00' : 'rgba(0,0,0,0.14)',
              }}
              transition={{ duration: 0.22, ease }}
              className="h-[7px] rounded-full cursor-pointer shrink-0 dark:!bg-white/20"
              style={{ minWidth: 7 }}
            />
          ))}
        </div>
      )}

      {/* ── "Swipe to explore" hint — fades out after first swipe ── */}
      {showHint && count > 1 && (
        <motion.p
          initial={{ opacity: 0.5 }}
          animate={{ opacity: activeIndex > 0 ? 0 : 0.5 }}
          transition={{ duration: 0.35 }}
          className="flex md:hidden items-center justify-center gap-1 mt-2 text-[11px] tracking-wide text-[#9ca3af] dark:text-[#6b7280] select-none"
          aria-hidden="true"
        >
          swipe to explore <span aria-hidden="true">→</span>
        </motion.p>
      )}
    </div>
  );
}
