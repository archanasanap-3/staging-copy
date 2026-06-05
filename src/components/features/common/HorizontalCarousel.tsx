'use client';

import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type CarouselSize = 'sm' | 'md' | 'lg';
type CarouselCols = 2 | 3 | 4;

export interface HorizontalCarouselProps {
  children: React.ReactNode;
  cols?: CarouselCols;
  size?: CarouselSize;
  showDots?: boolean;
  showHint?: boolean;
  autoScrollInterval?: number;
  className?: string;
  containerClassName?: string;
}

// Embla requires each slide to have flex-[0_0_auto] and a specific width.
// We map our desired columns and sizes to tailwind width classes.
const getSlideClasses = (cols: CarouselCols, size: CarouselSize) => {
  // Mobile uses size to determine peek
  const mobileWidth = size === 'sm' ? 'w-[72vw]' : size === 'lg' ? 'w-[85vw]' : 'w-[82vw]';
  
  if (cols === 2) {
    return `${mobileWidth} md:w-[calc(50%-10px)] flex-[0_0_auto] min-w-0`;
  }
  if (cols === 4) {
    return `${mobileWidth} md:w-[calc(50%-10px)] xl:w-[calc(25%-18px)] flex-[0_0_auto] min-w-0`;
  }
  // cols = 3 (default)
  return `${mobileWidth} md:w-[calc(50%-10px)] lg:w-[calc(33.333%-13.333px)] flex-[0_0_auto] min-w-0`;
};

export default function HorizontalCarousel({
  children,
  cols = 3,
  size = 'md',
  showDots = true,
  showHint = true,
  autoScrollInterval = 0,
  className = '',
  containerClassName = '',
}: HorizontalCarouselProps) {
  
  // Configure Embla with dynamic slidesToScroll based on breakpoints
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: cols >= 2 ? 2 : 1 },
      '(min-width: 1024px)': { slidesToScroll: cols === 4 ? 4 : cols === 3 ? 3 : 2 }
    }
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (autoScrollInterval <= 0 || !emblaApi || isPaused) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, autoScrollInterval);
    return () => clearInterval(interval);
  }, [emblaApi, autoScrollInterval, isPaused]);

  const items = React.Children.toArray(children);
  const count = items.length;

  if (count === 0) return null;

  const slideClass = getSlideClasses(cols, size);

  return (
    <div 
      className={`relative group/carousel ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Embla Viewport */}
      <div className={`overflow-hidden ${containerClassName}`} ref={emblaRef}>
        <div className="flex gap-4 md:gap-5 lg:gap-5 px-4 md:px-0 py-4">
          {items.map((child, i) => (
            <div key={i} className={slideClass}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows (Desktop only, positioned outside the overflow) */}
      {count > 1 && (
        <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 w-[calc(100%+4rem)] -left-8 justify-between pointer-events-none z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
          <button 
            onClick={scrollPrev}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white dark:bg-[#1a1a2e] border border-black/10 dark:border-white/10 flex items-center justify-center text-black dark:text-white hover:scale-105 transition-transform shadow-xl"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={scrollNext}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white dark:bg-[#1a1a2e] border border-black/10 dark:border-white/10 flex items-center justify-center text-black dark:text-white hover:scale-105 transition-transform shadow-xl"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* Pagination Dots */}
      {showDots && scrollSnaps.length > 1 && (
        <div
          className="flex items-center justify-center gap-[7px] mt-4 md:mt-8"
          role="tablist"
          aria-label="Carousel navigation"
        >
          {scrollSnaps.map((_, i) => (
            <motion.button
              key={i}
              role="tab"
              aria-selected={activeIndex === i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              animate={{
                width: activeIndex === i ? 24 : 8,
                backgroundColor: activeIndex === i ? '#FF4800' : 'rgba(156, 163, 175, 0.4)',
              }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="h-[8px] rounded-full cursor-pointer shrink-0"
              style={{ minWidth: 8 }}
            />
          ))}
        </div>
      )}
      
      {/* Swipe Hint (Mobile only) */}
      {showHint && count > 1 && (
        <motion.p
          initial={{ opacity: 0.5 }}
          animate={{ opacity: activeIndex > 0 ? 0 : 0.5 }}
          transition={{ duration: 0.35 }}
          className="flex md:hidden items-center justify-center gap-1 mt-3 text-[11px] tracking-wide text-[#9ca3af] select-none"
          aria-hidden="true"
        >
          swipe to explore <span aria-hidden="true">→</span>
        </motion.p>
      )}
    </div>
  );
}
