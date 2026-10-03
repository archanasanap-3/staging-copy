'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface InteractiveServicesProps {
  isDark: boolean;
  onNavigate: (page: string) => void;
}

interface ServiceDetail {
  number: string;
  badge: string;
  title: string;
  description: string;
  ctaLabel: string;
  route: string;
  image: string;
}

const servicesData: ServiceDetail[] = [
  {
    number: '01',
    badge: 'AUTOMATION',
    title: 'AI & Business Automation',
    description:
      'WhatsApp flows, behavior-triggered email sequences, and AI agents that remove 30–60% of manual operations within the first 90 days.',
    ctaLabel: 'Explore AI & Automation',
    route: 'automation',
    image: '/images/services/automation.jpg',
  },
  {
    number: '02',
    badge: 'SOFTWARE',
    title: 'Custom Software & Systems',
    description:
      'AI-powered CRMs, real-time dashboards, and internal tools built around your exact workflow—free from rigid SaaS constraints.',
    ctaLabel: 'Explore Custom Software',
    route: 'custom-software',
    image: '/images/services/custom-software.jpg',
  },
  {
    number: '03',
    badge: 'STRATEGY',
    title: 'AI Strategy & Integration',
    description:
      'GPT-class models, custom fine-tuned LLMs, and enterprise RAG systems integrated directly into your operations stack for measurable ROI.',
    ctaLabel: 'Explore AI Strategy',
    route: 'ai-strategy',
    image: '/images/services/ai-strategy.jpg',
  },
  {
    number: '04',
    badge: 'DIGITAL',
    title: 'Web Design & Experiences',
    description:
      'High-performance Next.js sites, 3D interactive builds, and conversion funnels deployed to global edge infrastructure.',
    ctaLabel: 'Explore Web Experiences',
    route: 'web-development',
    image: '/images/services/web-development.jpg',
  },
];

const AUTO_ROTATE_INTERVAL = 4000; // 4 seconds

export default function InteractiveServices({
  isDark,
  onNavigate,
}: InteractiveServicesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto rotate timer
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % servicesData.length);
    }, AUTO_ROTATE_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex, isPaused]);

  const activeService = servicesData[activeIndex];

  const handleSelectService = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      id="section-services"
      className="relative py-14 md:py-20 bg-white dark:bg-[#0a0a14] overflow-hidden transition-colors duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header (Preserved as requested, (4) removed) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="mb-10 md:mb-14"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#FF4800]">
            OUR Services
          </p>
          <h2
            className="font-normal text-black dark:text-white text-left text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight leading-[1.2]"
            style={{ color: isDark ? '#ffffff' : '#000000' }}
          >
            Enterprise Software &amp; AI Automation Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-full leading-relaxed">
            We build high performance infrastructure and intelligent automation
            systems designed for the next generation of enterprise growth.
          </p>

          {/* Clean separation divider */}
          <div className="mt-8 h-px w-full bg-neutral-200/80 dark:bg-neutral-800" />
        </motion.div>

        {/* ── Main Showcase: Left Names List & Right Direct Image + Info ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* ──── Left Side: Only Numbers + Service Names (Highlight on Active/Hover) ──── */}
          <div className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-6">
            {servicesData.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.number}
                  onClick={() => handleSelectService(index)}
                  onMouseEnter={() => handleSelectService(index)}
                  className="group flex items-center gap-6 sm:gap-9 cursor-pointer select-none py-1.5 transition-all duration-200"
                >
                  {/* Left Number (01, 02, 03, 04) */}
                  <span
                    className={`font-mono text-2xl sm:text-3xl md:text-4xl transition-colors duration-300 w-10 sm:w-12 shrink-0 ${
                      isActive
                        ? 'font-bold text-black dark:text-white'
                        : 'font-normal text-neutral-300 dark:text-neutral-700'
                    }`}
                  >
                    {item.number}
                  </span>

                  {/* Service Title */}
                  <h3
                    className={`text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] tracking-tight transition-all duration-300 leading-snug ${
                      isActive
                        ? 'font-bold text-black dark:text-white'
                        : 'font-semibold text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-500 dark:group-hover:text-neutral-400'
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* ──── Right Side: Direct Image (No outer card) + Info + Button ──── */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end">
            <div className="w-full max-w-md flex flex-col">
              {/* Image Preview Container (Sleek, Compact, No outer card box) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl shadow-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.number}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={activeService.image}
                      alt={activeService.title}
                      fill
                      priority
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 450px"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Info text beneath image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.number}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="mt-3.5 space-y-3.5"
                >
                  <p className="text-[13px] sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {activeService.description}
                  </p>

                  {/* Compact Pill CTA Button */}
                  <div>
                    <button
                      onClick={() => onNavigate(activeService.route)}
                      className="inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 px-5 py-2.5 text-xs sm:text-[13px] font-medium hover:bg-[#FF4800] dark:hover:bg-[#FF4800] dark:hover:text-white transition-all duration-200 shadow-sm cursor-pointer group"
                    >
                      <span>{activeService.ctaLabel}</span>
                      <ArrowRight
                        size={13}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
