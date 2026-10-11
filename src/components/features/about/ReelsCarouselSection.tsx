'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';

export type ReelData =
  | { id: string; kind: 'video'; title: string; videoUrl: string; posterUrl: string }
  | { id: string; kind: 'instagram'; title: string; shortcode: string };

const INSTAGRAM_PROFILE = 'https://www.instagram.com/stravedaofficial/';

/* Self-hosted videos in /public/reels (posters in /public/reels/posters) */
const LOCAL_REELS: ReelData[] = [1, 2, 3, 4, 5].map((n) => ({
  id: `local-${n}`,
  kind: 'video',
  title: `Straveda reel ${n}`,
  videoUrl: `/reels/${encodeURIComponent(`reel ${n}.mp4`)}`,
  posterUrl: `/reels/posters/reel-${n}.jpg`,
}));

/* Instagram shortcodes from instagram.com/stravedaofficial/reel/<shortcode>/ */
const INSTAGRAM_REELS: ReelData[] = [
  'DdTvnt1thlu',
  'DdJZTvkse_V',
  'DdBt2ZENVPa',
  'Dcn0aJxvz2c',
  'DcWc2sfNwGZ',
  'DaPSDmFhXH2',
  'DZhHAmkMqZH',
  'DZAauOEvTh1',
].map((shortcode, i) => ({ id: `ig-${i + 1}`, kind: 'instagram', title: `Straveda Instagram reel ${i + 1}`, shortcode }));

const REELS: ReelData[] = [...LOCAL_REELS, ...INSTAGRAM_REELS];

/* Inline reel player with custom play/pause, mute and progress UI (no native controls) */
function ReelPlayer({ src, onReady, onEnd, ready }: { src: string; onReady: () => void; onEnd: () => void; ready: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  return (
    <div className={`absolute inset-0 transition-opacity duration-300 ${ready ? 'opacity-100' : 'opacity-0'}`}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        playsInline
        loop
        muted={muted}
        onPlaying={() => {
          setPaused(false);
          onReady();
        }}
        onPause={() => setPaused(true)}
        onEnded={onEnd}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (v.duration) setProgress((v.currentTime / v.duration) * 100);
        }}
        onClick={toggle}
        className="absolute inset-0 h-full w-full cursor-pointer object-cover"
      />

      {/* Gradient for control legibility */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Center play indicator when paused */}
      {paused && (
        <button
          type="button"
          onClick={toggle}
          aria-label="Play"
          className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/30 text-white shadow-xl backdrop-blur-md transition-colors hover:bg-[#FF4800]/80"
        >
          <Play size={26} className="ml-1 fill-white text-white" />
        </button>
      )}

      {/* Bottom bar: play/pause, progress, mute */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-3 px-4 pb-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? 'Play' : 'Pause'}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-[#FF4800]"
        >
          {paused ? <Play size={16} className="ml-0.5 fill-white" /> : <Pause size={16} className="fill-white" />}
        </button>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
          <div className="h-full rounded-full bg-[#FF4800]" style={{ width: `${progress}%` }} />
        </div>
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? 'Unmute' : 'Mute'}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-[#FF4800]"
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
}

export default function ReelsCarouselSection({ onNavigate }: { onNavigate?: (page: string) => void } = {}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
    loop: false,
    watchDrag: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  // Only one self-hosted reel plays at a time; the rest show their poster.
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [readyId, setReadyId] = useState<string | null>(null);
  const [openIg, setOpenIg] = useState<string[]>([]);

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

  return (
    <section className="relative bg-[#F6F1E7] dark:bg-[#0a0a14] overflow-hidden py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HEADER (Consistent, Middle Centered & Both Black) ================= */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="mb-3">
            <span className="text-[11px] md:text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800] inline-block">
              FROM OUR INSTAGRAM
            </span>
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-black dark:text-white sm:text-4xl md:text-[2.6rem]">
            Life at Straveda
            <br />
            In Reels
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
          <div ref={emblaRef} className="overflow-hidden rounded-2xl">
            <div className="flex -ml-4 md:-ml-5">
              {REELS.map((reel) => (
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
                  {reel.kind === 'video' ? (
                    <div className="group relative h-[480px] sm:h-[510px] md:h-[530px] select-none overflow-hidden rounded-[28px] border border-black/10 bg-[#0c0c14] shadow-md transition-all duration-300 hover:shadow-2xl dark:border-white/10">
                      {/* Poster always stays underneath; the video fades in only once it is really playing */}
                      <img
                        src={reel.posterUrl}
                        alt={reel.title}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        loading="lazy"
                      />
                      {playingId === reel.id && (
                        <ReelPlayer
                          src={reel.videoUrl}
                          ready={readyId === reel.id}
                          onReady={() => setReadyId(reel.id)}
                          onEnd={() => {
                            setPlayingId(null);
                            setReadyId(null);
                          }}
                        />
                      )}
                      {playingId !== reel.id && (
                        <button
                          type="button"
                          onClick={() => {
                            setReadyId(null);
                            setPlayingId(reel.id);
                          }}
                          aria-label={`Play ${reel.title}`}
                          className="absolute inset-0 h-full w-full cursor-pointer"
                        >
                          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/50 bg-white/30 text-white shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FF4800]/80 sm:h-16 sm:w-16">
                              <Play size={24} className="ml-1 fill-white text-white" />
                            </div>
                          </div>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="relative h-[480px] sm:h-[510px] md:h-[530px] overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-md transition-all duration-300 hover:shadow-2xl dark:border-white/10">
                      {openIg.includes(reel.id) ? (
                        <iframe
                          src={`https://www.instagram.com/reel/${reel.shortcode}/embed/`}
                          title={reel.title}
                          loading="lazy"
                          allowFullScreen
                          scrolling="no"
                          className="absolute inset-0 h-full w-full border-0"
                        />
                      ) : (
                        /* Instagram embeds are heavy: only load one when the visitor asks for it */
                        <button
                          type="button"
                          onClick={() => setOpenIg((prev) => [...prev, reel.id])}
                          aria-label={`Load ${reel.title}`}
                          className="absolute inset-0 flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#FFE9DA] via-[#FFD0B2] to-[#FFB58A] text-[#14110c] dark:from-[#1f1410] dark:via-[#2b1608] dark:to-[#14110c] dark:text-white"
                        >
                          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#FF4800] shadow-lg">
                            <Play size={24} className="ml-1 fill-[#FF4800]" />
                          </span>
                          <span className="text-sm font-bold">Watch on Instagram</span>
                          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-60">@stravedaofficial</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Indicator dots for mobile/tablet */}
        <div className="flex justify-center items-center gap-2 mt-6 lg:hidden">
          {REELS.map((_, i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-black/20 dark:bg-white/20 transition-all duration-300"
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={INSTAGRAM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF4800] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            Follow @stravedaofficial on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
