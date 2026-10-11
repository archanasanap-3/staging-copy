'use client';

import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, X, Volume2, VolumeX } from 'lucide-react';

export interface ReelData {
  id: string;
  videoUrl: string;
  posterUrl: string;
  title?: string;
}

const DUMMY_REELS: ReelData[] = [
  {
    id: 'reel-1',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?q=80&w=800&auto=format&fit=crop',
    title: 'Customer Transformation 1',
  },
  {
    id: 'reel-2',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    title: 'Customer Transformation 2',
  },
  {
    id: 'reel-3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    title: 'Customer Transformation 3',
  },
  {
    id: 'reel-4',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    title: 'Customer Transformation 4',
  },
  {
    id: 'reel-5',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
    title: 'Customer Transformation 5',
  },
];

export default function ReelsCarouselSection({ onNavigate }: { onNavigate?: (page: string) => void } = {}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
    loop: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [activeReel, setActiveReel] = useState<ReelData | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Handle ESC key to close video modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveReel(null);
      }
    };
    if (activeReel) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeReel]);

  return (
    <section className="relative bg-white dark:bg-[#0a0a14] py-14 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HEADER (Consistent, Middle Centered & Both Black) ================= */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="mb-3">
            <span className="text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.4em] text-[#FF4800] inline-block">
              EVERLIVE COMMUNITY
            </span>
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-black dark:text-white sm:text-4xl md:text-[2.6rem]">
            Real Stories
            <br />
            Real Transformations
          </h2>
        </div>

        {/* ================= CAROUSEL WRAPPER WITH SIDE ARROWS ================= */}
        <div className="relative group/carousel px-0 sm:px-4">
          
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous reel"
            className={`
              absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 sm:w-11 sm:h-11 rounded-full
              flex items-center justify-center
              bg-white/95 dark:bg-[#141422]/95 backdrop-blur-md
              border border-black/10 dark:border-white/15
              shadow-lg text-black dark:text-white
              transition-all duration-300
              ${canScrollPrev 
                ? 'hover:bg-[#FF4800] hover:text-white hover:border-[#FF4800] hover:scale-105 cursor-pointer opacity-100' 
                : 'opacity-30 cursor-not-allowed'}
            `}
          >
            <ChevronLeft size={22} strokeWidth={2.2} />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next reel"
            className={`
              absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 sm:w-11 sm:h-11 rounded-full
              flex items-center justify-center
              bg-white/95 dark:bg-[#141422]/95 backdrop-blur-md
              border border-black/10 dark:border-white/15
              shadow-lg text-black dark:text-white
              transition-all duration-300
              ${canScrollNext 
                ? 'hover:bg-[#FF4800] hover:text-white hover:border-[#FF4800] hover:scale-105 cursor-pointer opacity-100' 
                : 'opacity-30 cursor-not-allowed'}
            `}
          >
            <ChevronRight size={22} strokeWidth={2.2} />
          </button>

          {/* Embla Viewport (Shows 4 cards initially on desktop) */}
          <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing rounded-2xl">
            <div className="flex -ml-4 md:-ml-5">
              {DUMMY_REELS.map((reel) => (
                <div
                  key={reel.id}
                  className="
                    min-w-0 shrink-0 grow-0
                    basis-full
                    sm:basis-1/2
                    md:basis-1/3
                    lg:basis-1/4
                    pl-4 md:pl-5
                  "
                >
                  {/* Reel Card Container */}
                  <div
                    onClick={() => setActiveReel(reel)}
                    className="
                      group relative
                      h-[480px] sm:h-[510px] md:h-[530px]
                      rounded-[28px] overflow-hidden
                      border border-black/10 dark:border-white/10
                      bg-[#0c0c14] shadow-md
                      transition-all duration-300 hover:shadow-2xl hover:border-black/20 dark:hover:border-white/25
                      cursor-pointer select-none
                    "
                  >
                    {/* Poster Image Background */}
                    <img
                      src={reel.posterUrl}
                      alt={reel.title || 'Reel Transformation'}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

                    {/* Center Frosted Glass Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/30 backdrop-blur-md border border-white/50 shadow-xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FF4800]/80">
                        <Play size={24} className="fill-white text-white ml-1" />
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Indicator dots for mobile/tablet */}
        <div className="flex justify-center items-center gap-2 mt-6 lg:hidden">
          {DUMMY_REELS.map((_, i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-black/20 dark:bg-white/20 transition-all duration-300"
            />
          ))}
        </div>

      </div>

      {/* ================= INTERACTIVE REEL VIDEO MODAL ================= */}
      <AnimatePresence>
        {activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveReel(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[400px] h-[78vh] max-h-[720px] rounded-[28px] overflow-hidden bg-black shadow-2xl flex flex-col border border-white/20"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveReel(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#FF4800] transition-colors"
              >
                <X size={20} />
              </button>

              {/* Sound Toggle Button */}
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                aria-label="Toggle mute"
                className="absolute top-4 left-4 z-30 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#FF4800] transition-colors"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              {/* Video Player */}
              <div className="relative flex-1 w-full bg-black">
                <video
                  src={activeReel.videoUrl}
                  poster={activeReel.posterUrl}
                  autoPlay
                  playsInline
                  controls
                  loop
                  muted={isMuted}
                  className="w-full h-full object-cover"
                />
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
