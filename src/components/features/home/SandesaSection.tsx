'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface Props {
  isDark: boolean;
}

interface SandesaStory {
  id: number;
  highlight: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  badge: string;
  ctaText: string;
  ctaLink: string;
}

const sandesaStories: SandesaStory[] = [
  {
    id: 0,
    highlight: '98% Open Rate on Campaigns',
    quote:
      'Adding verified WhatsApp broadcasts with Sandesa didn\'t just increase reach — it created an instant connection with customers and 4x our conversion rates compared to traditional email marketing.',
    author: 'Aarav Mehta',
    role: 'Growth Lead',
    company: 'Peak Brands',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
    badge: 'Marketing & Drip Flows',
    ctaText: 'Explore WhatsApp Broadcasts',
    ctaLink: 'https://sandesaai.com/',
  },
  {
    id: 1,
    highlight: '100% Instant AI Response',
    quote:
      'Sandesa\'s 24/7 AI agent handles over 75% of our tier-1 customer inquiries in under 2 seconds, resolving support tickets effortlessly in English, Hindi, and regional languages.',
    author: 'Neha Sharma',
    role: 'Head of Support',
    company: 'QuickRetail',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85',
    badge: '24/7 Autonomous AI Agent',
    ctaText: 'Test Live AI Bot',
    ctaLink: 'https://sandesaai.com/',
  },
  {
    id: 2,
    highlight: '3.5x Inbound Lead Conversion',
    quote:
      'Inbound WhatsApp prospects are now scored, qualified, and booked directly into our team\'s calendar in real-time. Our sales pipeline has never moved faster.',
    author: 'Vikram Singhania',
    role: 'Founder & CEO',
    company: 'ScaleMatrix',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
    badge: 'AI Lead Qualification',
    ctaText: 'See Inbound Flows',
    ctaLink: 'https://sandesaai.com/',
  },
  {
    id: 3,
    highlight: '70% Manual Work Reduced',
    quote:
      'Managing thousands of daily customer chats across 8 agents was chaotic. The shared team inbox with automatic routing and CRM sync brought total clarity to operations.',
    author: 'Pooja Verma',
    role: 'Operations Director',
    company: 'MediSync Health',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=85',
    badge: 'Multi-Agent Team Inbox',
    ctaText: 'Explore Team Inbox',
    ctaLink: 'https://sandesaai.com/',
  },
  {
    id: 4,
    highlight: 'Zero-Code CRM Integration',
    quote:
      'Connecting our Shopify store and CRM to WhatsApp took minutes. Abandoned cart reminders, order confirmations, and payment links now dispatch on 100% autopilot.',
    author: 'Rohan Patel',
    role: 'CTO & Co-Founder',
    company: 'CloudCart Tech',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85',
    badge: 'CRM & Webhook Sync',
    ctaText: 'View Integrations',
    ctaLink: 'https://sandesaai.com/',
  },
];

export default function SandesaSection({ isDark }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState(false);
  const count = sandesaStories.length;

  // 3-second automatic scroll
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % count);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, count]);

  const goToSlide = (idx: number) => {
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  // Indexes for flanking side capsules
  const left2Idx = (activeIndex - 2 + count) % count;
  const left1Idx = (activeIndex - 1 + count) % count;
  const right1Idx = (activeIndex + 1) % count;
  const right2Idx = (activeIndex + 2) % count;

  const currentStory = sandesaStories[activeIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring' as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    }),
  };

  return (
    <section className="relative z-10 py-14 md:py-20 overflow-hidden bg-gradient-to-br from-[#fff6f0] to-[#ffffff] dark:from-[#110c0a] dark:to-[#0a0a14] transition-colors duration-300">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
        style={{
          background:
            'radial-gradient(circle at 80% 50%, rgba(255, 72, 0, 0.15) 0%, transparent 60%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* LEFT-ALIGNED HEADER (SINGLE-LINE HEADING & PARAGRAPH)               */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="text-left w-full mb-10 md:mb-14">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF4800]/10 border border-[#FF4800]/20 mb-3.5 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-[#FF4800] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF4800]">
              BUILT BY STRAVEDA • WHATSAPP AI
            </span>
          </div>

          {/* Heading (One Single Line) */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-neutral-950 dark:text-white leading-tight">
            Meet <span className="text-[#FF4800]">Sandesa</span> — WhatsApp Automation, Powered by AI
          </h2>

          {/* Paragraph (One Clean Line / Full Width) */}
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-5xl leading-relaxed">
            Automate customer support, trigger verified broadcasts, and qualify high-intent leads 24/7 on WhatsApp.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* 3D CAROUSEL TRACK (INCREASED HEIGHT, NO HORIZONTAL LINE, CLEAN IMG) */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div
          className="relative flex items-center justify-center min-h-[480px] md:min-h-[520px] w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative z-10 flex items-center justify-center w-full gap-3 sm:gap-5 md:gap-7">
            
            {/* ──── LEFT CAPSULE 2 (Farthest Left) ──── */}
            <div
              onClick={() => goToSlide(left2Idx)}
              className="hidden lg:flex flex-col items-center justify-center w-[54px] xl:w-[64px] h-[220px] xl:h-[260px] rounded-[34px] overflow-hidden cursor-pointer opacity-50 hover:opacity-95 transition-all duration-300 transform hover:scale-105 border-[3.5px] border-white dark:border-neutral-800 shadow-lg bg-neutral-100 shrink-0"
              title={sandesaStories[left2Idx].highlight}
            >
              <div className="relative w-full h-full flex items-center justify-center p-2">
  <h3
    className="text-xs font-semibold text-neutral-900 dark:text-white whitespace-nowrap"
    style={{
      writingMode: 'vertical-rl',
      transform: 'rotate(180deg)',
    }}
  >
    {sandesaStories[left1Idx].badge}
  </h3>
  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-xs font-semibold text-neutral-900 dark:text-white">
  {String(left2Idx + 1).padStart(2, '0')}
</span>
</div>
            </div>

            {/* ──── LEFT CAPSULE 1 (Immediate Left) ──── */}
            <div
              onClick={() => goToSlide(left1Idx)}
              className="hidden sm:flex flex-col items-center justify-center w-[68px] md:w-[82px] xl:w-[94px] h-[300px] md:h-[350px] rounded-[42px] overflow-hidden cursor-pointer opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-105 border-[4px] border-white dark:border-neutral-800 shadow-xl bg-neutral-100 shrink-0"
              title={sandesaStories[left1Idx].highlight}
            >
              <div className="relative w-full h-full flex items-center justify-center p-1">
  <h3
    className="text-[10px] font-semibold text-neutral-700 dark:text-white text-center leading-tight"
    style={{
      writingMode: 'vertical-rl',
      transform: 'rotate(180deg)',
    }}
  >
    {sandesaStories[left2Idx].badge}
  </h3>
  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-xs font-semibold text-neutral-900 dark:text-white">
  {String(left1Idx + 1).padStart(2, '0')}
</span>
</div>
            </div>

            {/* ──── ACTIVE CENTER CARD (INCREASED HEIGHT) ──── */}
            <div className="relative w-full max-w-[650px] min-h-[380px] md:min-h-[400px] shrink-0">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentStory.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full bg-white dark:bg-[#14141f] rounded-[32px] sm:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-black/[0.06] dark:border-white/[0.08] overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px] md:min-h-[400px]">
                    
                    {/* Left Details Column */}
                    <div className="md:col-span-7 p-7 sm:p-9 md:p-11 flex flex-col justify-between order-2 md:order-1">
                      <div>
                        {/* Highlight Badge */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="inline-flex rounded-full bg-[#FF4800]/10 px-3.5 py-1 text-[11px] font-bold text-[#FF4800] uppercase tracking-wider">
                            {currentStory.badge}
                          </span>
                        </div>

                        {/* Title Highlight */}
                        <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight leading-snug mb-4">
                          {currentStory.highlight}
                        </h3>

                        {/* Customer Quote */}
                        <p className="text-[14px] sm:text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300 italic mb-6">
                          &ldquo;{currentStory.quote}&rdquo;
                        </p>
                      </div>

                      {/* Author Info & Direct CTA */}
                      <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-base font-bold text-neutral-900 dark:text-white">
                            {currentStory.author}
                          </p>
                          <p className="text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                            {currentStory.role} • {currentStory.company}
                          </p>
                        </div>

                        <a
                          href={currentStory.ctaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#FF4800] hover:text-[#e03e00] transition-colors group"
                        >
                          <span>{currentStory.ctaText}</span>
                          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>

                    {/* Right Clean Image Column */}
                    <div className="md:col-span-5 relative min-h-[260px] md:min-h-full order-1 md:order-2 bg-neutral-100 dark:bg-neutral-900">
                      <Image
                        src={currentStory.image}
                        alt={currentStory.author}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ──── RIGHT CAPSULE 1 (Immediate Right) ──── */}
            <div
              onClick={() => goToSlide(right1Idx)}
              className="hidden sm:flex flex-col items-center justify-center w-[68px] md:w-[82px] xl:w-[94px] h-[300px] md:h-[350px] rounded-[42px] overflow-hidden cursor-pointer opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-105 border-[4px] border-white dark:border-neutral-800 shadow-xl bg-neutral-100 shrink-0"
              title={sandesaStories[right1Idx].highlight}
            >
              <div className="relative w-full h-full flex items-center justify-center p-2">
  <h3
    className="text-xs font-semibold text-neutral-800 dark:text-white text-center leading-tight"
    style={{
      writingMode: 'vertical-rl',
      transform: 'rotate(180deg)',
    }}
  >
    {sandesaStories[right1Idx].badge}
  </h3>
  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-xs font-semibold text-neutral-900 dark:text-white">
  {String(right1Idx + 1).padStart(2, '0')}
</span>
</div>
            </div>

            {/* ──── RIGHT CAPSULE 2 (Farthest Right) ──── */}
            <div
              onClick={() => goToSlide(right2Idx)}
              className="hidden lg:flex flex-col items-center justify-center w-[54px] xl:w-[64px] h-[220px] xl:h-[260px] rounded-[34px] overflow-hidden cursor-pointer opacity-50 hover:opacity-95 transition-all duration-300 transform hover:scale-105 border-[3.5px] border-white dark:border-neutral-800 shadow-lg bg-neutral-100 shrink-0"
              title={sandesaStories[right2Idx].highlight}
            >
              <div className="relative w-full h-full flex items-center justify-center p-1">
  <h3
    className="text-[10px] font-semibold text-neutral-700 dark:text-white text-center leading-tight"
    style={{
      writingMode: 'vertical-rl',
      transform: 'rotate(180deg)',
    }}
  >
    {sandesaStories[right2Idx].badge}
  </h3>
  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-xs font-semibold text-neutral-900 dark:text-white">
  {String(right2Idx + 1).padStart(2, '0')}
</span>
</div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
