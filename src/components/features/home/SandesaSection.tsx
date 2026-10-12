'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import SandesaScene, { type SceneKey } from '@/components/features/home/SandesaScenes';

interface Props {
  isDark: boolean;
}

interface SandesaStory {
  id: number;
  highlight: string;
  description: string;
  points: string[];
  scene: SceneKey;
  badge: string;
  ctaText: string;
  ctaLink: string;
}

const sandesaStories: SandesaStory[] = [
  {
    id: 0,
    badge: 'Broadcast Campaigns',
    highlight: 'Reach every customer where they already are',
    description:
      'Send approved templates to your whole audience, schedule them ahead of time and see exactly how each campaign performed.',
    points: ['Import contacts from a CSV', 'Schedule campaigns in advance', 'Track sent, delivered and read'],
    scene: 'campaigns',
    ctaText: 'Explore Campaigns',
    ctaLink: 'https://sandesaai.com/',
  },
  {
    id: 1,
    badge: 'Approved Templates',
    highlight: 'Design once, preview exactly as customers see it',
    description:
      'Build marketing and utility templates with media, buttons and variables, then submit them to Meta without leaving the screen.',
    points: ['Live WhatsApp preview', 'Images, video, buttons and variables', 'One-click submit for approval'],
    scene: 'templates',
    ctaText: 'Explore Templates',
    ctaLink: 'https://sandesaai.com/',
  },
  {
    id: 2,
    badge: 'No-Code Chatbots',
    highlight: 'Bots that answer while you sleep',
    description:
      'Create keyword-triggered flows and FAQ auto-responders with a visual builder, with a human handoff whenever it matters.',
    points: ['Visual flow builder', 'FAQ auto-responders', 'English, Hindi and Marathi'],
    scene: 'bots',
    ctaText: 'Explore Utility Bots',
    ctaLink: 'https://sandesaai.com/',
  },
  {
    id: 3,
    badge: 'AI Agent',
    highlight: 'An AI agent trained on your own documents',
    description:
      'Upload your PDFs, FAQs and policies, choose a tone, and let the agent answer customers around the clock using only what you taught it.',
    points: ['Upload PDFs as its knowledge', 'Set tone and instructions', 'Test it before going live'],
    scene: 'agent',
    ctaText: 'Explore the AI Agent',
    ctaLink: 'https://sandesaai.com/',
  },
  {
    id: 4,
    badge: 'Dashboard & Reports',
    highlight: 'Your whole WhatsApp business in one view',
    description:
      'Leads, conversations, delivery rate and campaign performance update live, with quick actions one click away.',
    points: ['Live connection status', 'Campaign performance charts', 'Quick actions for your team'],
    scene: 'insights',
    ctaText: 'Explore the Dashboard',
    ctaLink: 'https://sandesaai.com/',
  },
];

const EASE = [0.32, 0.72, 0, 1] as const;
const DURATION = 0.85;
const AUTOPLAY_MS = 4500;

// Visual spec per distance from the active slide (0 = main card)
const SIDE_SPEC = {
  1: { w: 94, h: 350, opacity: 0.9, radius: 42 },
  2: { w: 64, h: 260, opacity: 0.55, radius: 34 },
} as const;

function useContainerWidth() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(1100);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.clientWidth);
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, width] as const;
}

export default function SandesaSection({ isDark }: Props) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [trackRef, trackWidth] = useContainerWidth();
  const count = sandesaStories.length;
  const hoverLockUntil = useRef(0);

  // Hover opens a capsule, but ignore hovers while the row is still moving so the
  // pointer landing on a neighbouring capsule mid-animation doesn't cascade.
  const selectOnHover = (i: number) => {
    if (Date.now() < hoverLockUntil.current) return;
    hoverLockUntil.current = Date.now() + DURATION * 1000;
    setActive(i);
  };

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setActive((p) => (p + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused, count, active]);

  // Responsive geometry
  const isMobile = trackWidth < 640;
  const showSide1 = trackWidth >= 640;
  const showSide2 = trackWidth >= 1024;
  const gap = trackWidth < 768 ? 12 : 28;
  const centerW = isMobile ? trackWidth : Math.min(940, trackWidth - (showSide1 ? 2 * (SIDE_SPEC[1].w + gap) : 0));
  const centerH = isMobile ? 700 : 520;

  const centerX = (offset: number) => {
    const sign = Math.sign(offset);
    const abs = Math.abs(offset);
    if (abs === 0) return 0;
    let x = centerW / 2 + gap + SIDE_SPEC[1].w / 2;
    if (abs >= 2) x += SIDE_SPEC[1].w / 2 + gap + SIDE_SPEC[2].w / 2;
    return sign * x;
  };

return (

<section className="relative z-10 -mt-28 overflow-hidden bg-[#F6F1E7] pt-0 pb-6 transition-colors duration-300 dark:bg-[#0a0a14] sm:-mt-12 sm:pt-4 sm:pb-10 md:-mt-10 md:pt-10 md:pb-16">

    {/* Background Gradient */}
    <div
      className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
      style={{
        background:
          "radial-gradient(circle at 80% 50%, rgba(255, 72, 0, 0.15) 0%, transparent 60%)",
      }}
    />

    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Heading */}
      <div className="text-left w-full mb-6 sm:mb-10 md:mb-14">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="flex h-2 w-2 rounded-full bg-[#FF4800] animate-pulse" />

          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF4800]">
            BUILT BY STRAVEDA • WHATSAPP AI
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-[clamp(1.4rem,2.6vw,2.5rem)] md:whitespace-nowrap font-bold tracking-tight text-neutral-950 dark:text-white leading-tight">
          Meet <span className="text-[#FF4800]">Sandesa</span> WhatsApp Business Platform, Powered by AI
        </h2>

        <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-5xl leading-relaxed">
          Run campaigns, chatbots, an AI agent and your customer conversations from one dashboard, all on WhatsApp.
        </p>
      </div>

      {/* Persistent Story Track */}
      <div
        ref={trackRef}
        className="relative w-full"
        style={{ height: centerH + 40 }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {sandesaStories.map((story, i) => {
          const offset = ((i - active + 2 + count) % count) - 2;

          return (
            <SandesaSlide
              key={story.id}
              story={story}
              index={i}
              offset={offset}
              x={centerX(offset)}
              centerW={centerW}
              centerH={centerH}
              visible={
                offset === 0 ||
                (Math.abs(offset) === 1 && showSide1) ||
                (Math.abs(offset) === 2 && showSide2)
              }
              onSelect={() => setActive(i)}
              onHoverOpen={() => selectOnHover(i)}
            />
          );
        })}
      </div>
    </div>
  </section>
);
}

function SandesaSlide({
  story,
  index,
  offset,
  x,
  centerW,
  centerH,
  visible,
  onSelect,
  onHoverOpen,
}: {
  story: SandesaStory;
  index: number;
  offset: number;
  x: number;
  centerW: number;
  centerH: number;
  visible: boolean;
  onSelect: () => void;
  onHoverOpen: () => void;
}) {
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevOffset = useRef(offset);
  // Item wrapping from one end of the row to the other: don't fly across the track, fade in instead
  const wrapped = Math.abs(offset - prevOffset.current) > 2;
  useEffect(() => {
    prevOffset.current = offset;
  }, [offset]);

  const isCenter = offset === 0;
  const abs = Math.min(Math.abs(offset), 2) as 0 | 1 | 2;
  const spec = abs === 0 ? { w: centerW, h: centerH, opacity: 1, radius: 40 } : SIDE_SPEC[abs];
  const targetOpacity = visible ? spec.opacity : 0;
  const w = visible ? spec.w : 0;

  const move = { duration: wrapped ? 0 : DURATION, ease: EASE };

  return (
    <motion.div
      initial={false}
      animate={{
        width: w,
        height: spec.h,
        x: x - w / 2,
        y: -spec.h / 2,
        opacity: wrapped && visible ? [0, targetOpacity] : targetOpacity,
        borderRadius: spec.radius,
      }}
      transition={{
        width: move,
        height: move,
        x: move,
        y: move,
        borderRadius: move,
        opacity: { duration: wrapped ? 0.6 : DURATION * 0.7, ease: 'easeOut' },
      }}
      onClick={isCenter ? undefined : onSelect}
      onHoverStart={() => {
        if (isCenter || !visible) return;
        hoverTimer.current = setTimeout(onHoverOpen, 120);
      }}
      onHoverEnd={() => {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
      }}
      whileHover={isCenter || !visible ? undefined : { opacity: 1 }}
      role={isCenter ? undefined : 'button'}
      aria-label={isCenter ? undefined : story.badge}
      title={isCenter ? undefined : story.badge}
      className={`absolute left-1/2 top-1/2 overflow-hidden border-white dark:border-neutral-800 bg-white dark:bg-[#14141f] ${
        isCenter
          ? 'border border-black/[0.06] dark:border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]'
          : 'cursor-pointer border-[4px] bg-neutral-100 shadow-xl'
      }`}
      style={{ zIndex: isCenter ? 10 : 5 - abs, pointerEvents: visible ? 'auto' : 'none', willChange: 'transform, width, height' }}
    >
      {/* Capsule face */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: isCenter ? 0 : 1 }}
        transition={{ duration: 0.3, delay: isCenter ? 0 : DURATION * 0.4 }}
      >
        <h3
          className="text-xs font-semibold text-neutral-800 dark:text-white whitespace-nowrap"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {story.badge}
        </h3>
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-xs font-semibold text-neutral-900 dark:text-white">
          {String(index + 1).padStart(2, '0')}
        </span>
      </motion.div>

      {/* Full card face — fixed size, revealed as the capsule opens */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{ width: centerW, height: centerH, x: '-50%', y: '-50%' }}
        animate={{ opacity: isCenter ? 1 : 0 }}
        transition={{ duration: 0.45, delay: isCenter ? DURATION * 0.35 : 0 }}
        aria-hidden={!isCenter}
      >
        <div className="grid h-full grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-5 p-6 sm:p-8 md:p-9 flex flex-col justify-between order-2 md:order-1">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex rounded-full bg-[#FF4800]/10 px-3.5 py-1 text-[11px] font-bold text-[#FF4800] uppercase tracking-wider">
                  {story.badge}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight leading-snug mb-3">
                {story.highlight}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-neutral-600 dark:text-neutral-300 mb-4">
                {story.description}
              </p>
              <ul className="space-y-2">
                {story.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-[13px] leading-snug text-neutral-700 dark:text-neutral-200">
                    <Check size={15} className="mt-0.5 shrink-0 text-[#FF4800]" strokeWidth={3} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-5 mt-4 border-t border-neutral-100 dark:border-neutral-800/80">
              <a
                href={story.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isCenter ? 0 : -1}
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#FF4800] hover:text-[#e03e00] transition-colors group"
              >
                <span>{story.ctaText}</span>
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="md:col-span-7 relative min-h-[300px] md:min-h-full order-1 md:order-2 overflow-hidden">
            {isCenter && <SandesaScene scene={story.scene} />}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
