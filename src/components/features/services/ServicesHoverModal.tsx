'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Braces, Compass, ClipboardCheck, Server, ArrowRight, X } from 'lucide-react';

interface ServiceItem {
  title: string;
  short: string;
  extended: string;
  capabilities: string[];
  icon: React.ElementType;
  investment: string;
  badge: string;
}

const serviceData: ServiceItem[] = [
  {
    title: 'Enterprise Architecture',
    badge: 'ARCHITECTURE',
    short: 'Modernize your application portfolio with adaptive, open standards architecture.',
    extended:
      'We evolve your application portfolio using adaptive, open standards architecture. Our solutions increase reliability, maintainability and interoperability — reducing technical debt while enabling agile practices.',
    capabilities: [
      'Portfolio modernization & rationalization',
      'Open standards & middleware integration',
      'Scalable microservices & API architecture',
      'Technical debt reduction',
    ],
    investment: '₹12L–₹35L',
    icon: Braces,
  },
  {
    title: 'Technology Strategy',
    badge: 'STRATEGY',
    short: 'Align IT investments with business goals for sustainable growth and faster time to market.',
    extended:
      'We align your IT investments with business goals, creating clear roadmaps that accelerate time to market and position you for sustainable growth. Every decision is grounded in ROI, not trends.',
    capabilities: [
      'Digital transformation roadmaps',
      'IT investment & prioritization frameworks',
      'Cloud strategy & vendor assessment',
      'Competitive technology benchmarking',
    ],
    investment: '₹8L–₹20L',
    icon: Compass,
  },
  {
    title: 'Management Consulting',
    badge: 'MANAGEMENT',
    short: 'Expert program and project management through meticulous planning and execution.',
    extended:
      'Expert Product, Program & Project management delivered through meticulous planning and execution. We eliminate bottlenecks and drive enterprise delivery — on time, on budget, and on scope.',
    capabilities: [
      'Product & program management',
      'Agile & PMO delivery frameworks',
      'Stakeholder alignment & governance',
      'Risk identification & mitigation',
    ],
    investment: '₹6L–₹18L',
    icon: ClipboardCheck,
  },
  {
    title: 'Custom Software & AI Systems',
    badge: 'SOFTWARE',
    short: 'Bespoke software and AI powered tools built to fit your exact workflow.',
    extended:
      'We design and build custom software — CRMs, ops dashboards, AI integrated platforms — that replace off the shelf tools and fit your exact business process. Off the shelf is built for average. You\'re not average.',
    capabilities: [
      'AI powered CRM development',
      'Operational dashboards & analytics',
      'LLM & RAG system integration',
      'API integrations & data pipelines',
    ],
    investment: '₹15L–₹50L',
    icon: Server,
  },
];

const ease = [0.4, 0, 0.2, 1] as const;

interface ServicesHoverModalProps {
  onNavigate: (page: string) => void;
}

export default function ServicesHoverModal({ onNavigate }: ServicesHoverModalProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [panelOffset, setPanelOffset] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleLearnMoreClick = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
      return;
    }
    const card = cardRefs.current[index];
    const grid = gridRef.current;
    if (card && grid) {
      const gridRect = grid.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      setPanelOffset(cardRect.left - gridRect.left);
    }
    setActiveIndex(index);
  };

  const activeService = activeIndex !== null ? serviceData[activeIndex] : null;
  const ActiveIcon = activeService?.icon;

  return (
    <section className="bg-white dark:bg-[#0a0a14] py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease }}
            className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FF4800]"
          >
            OUR EXPERTISE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="mt-3 masked-title font-normal"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.8rem)', lineHeight: 1.1, letterSpacing: '-2.05px' }}
          >
            Explore our service capabilities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="mt-3 text-sm text-[#6b7280] dark:text-[#9ca3af]"
          >
            Click <span className="text-[#FF4800] font-semibold">Learn more</span> on any service to see full details
          </motion.p>
        </div>

        {/* Service Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {serviceData.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease }}
                className={`card-premium group relative flex flex-col items-start gap-4 rounded-xl p-6 transition-all duration-300 ${
                  isActive
                    ? 'border border-[#FF4800]/40 bg-[#FF4800]/[0.03] shadow-[0_8px_30px_rgba(255,72,0,0.12)]'
                    : 'glass-card hover:[border-color:rgba(255,72,0,0.2)] hover:-translate-y-1'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl bg-gradient-to-r from-[#FF4800] to-[#FF4800]/40" />
                )}

                <span className="inline-block rounded-full bg-[#FF4800]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#FF4800]">
                  {service.badge}
                </span>

                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{ background: 'linear-gradient(145deg, rgba(255,72,0,0.1), rgba(255,72,0,0.04))' }}
                >
                  <Icon size={28} className="text-[#FF4800]" strokeWidth={1.5} />
                </div>

                <h3 className="text-lg font-semibold text-[#1a1a2e] dark:text-[#f0f0f5]">
                  {service.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#6b7280] dark:text-[#9ca3af]">
                  {service.short}
                </p>

                <div className="mt-auto pt-2 w-full">
                  <button
                    onClick={() => handleLearnMoreClick(index)}
                    className={`group/btn w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-[#FF4800] text-white shadow-[0_4px_14px_rgba(255,72,0,0.35)]'
                        : 'bg-[#FF4800]/10 text-[#FF4800] hover:bg-[#FF4800] hover:text-white hover:shadow-[0_4px_14px_rgba(255,72,0,0.3)]'
                    }`}
                  >
                    {isActive ? (
                      <>Close details <X size={14} /></>
                    ) : (
                      <>Learn more <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" /></>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Expanded Detail Panel */}
        <AnimatePresence mode="wait">
          {activeIndex !== null && activeService && ActiveIcon && (
            <motion.div
              key={`panel-${activeIndex}`}
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease }}
              className="overflow-hidden mt-4"
            >
              <div className="glass-card rounded-xl overflow-hidden relative">
                <div
                  className="absolute top-0 h-[3px] bg-gradient-to-r from-[#FF4800] to-[#FF4800]/20 hidden md:block"
                  style={{ left: `${panelOffset}px`, width: '180px' }}
                />
                <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-[#FF4800]" />

                <div className="p-6 lg:p-10 pl-8 lg:pl-12">
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    <div className="flex-shrink-0 flex flex-col gap-4">
                      <div
                        className="flex h-20 w-20 items-center justify-center rounded-2xl"
                        style={{ background: 'linear-gradient(145deg, rgba(255,72,0,0.12), rgba(255,72,0,0.04))' }}
                      >
                        <ActiveIcon size={40} className="text-[#FF4800]" strokeWidth={1.5} />
                      </div>
                      <div className="rounded-lg bg-white dark:bg-white/[0.06] border border-[#e5e7eb] dark:border-white/[0.08] px-4 py-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9ca3af] mb-1">Investment</p>
                        <p className="text-base font-bold text-[#FF4800]">{activeService.investment}</p>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="text-2xl lg:text-3xl font-semibold text-[#1a1a2e] dark:text-[#f0f0f5]">
                          {activeService.title}
                        </h3>
                        <button
                          onClick={() => setActiveIndex(null)}
                          className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#e5e7eb] dark:bg-white/[0.08] text-[#6b7280] hover:bg-[#FF4800] hover:text-white transition-all duration-200"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <p className="text-[15px] leading-relaxed text-[#6b7280] dark:text-[#9ca3af] mb-6 max-w-2xl">
                        {activeService.extended}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {activeService.capabilities.map((cap, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#FF4800]/10">
                              <ArrowRight size={11} className="text-[#FF4800]" />
                            </div>
                            <span className="text-sm text-[#4b5563] dark:text-[#9ca3af] font-medium">{cap}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => onNavigate('contact')}
                          className="rounded-lg bg-[#FF4800] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#e03e00] hover:shadow-[0_6px_20px_rgba(255,72,0,0.3)] btn-shine"
                        >
                          Start a project
                          <ArrowRight size={14} className="inline ml-2" />
                        </button>
                        <button
                          onClick={() => setActiveIndex(null)}
                          className="rounded-lg border border-[#e5e7eb] dark:border-white/[0.12] bg-white dark:bg-white/[0.04] px-6 py-3 text-sm font-semibold text-[#1a1a2e] dark:text-[#f0f0f5] transition-all hover:border-[#FF4800]/30 hover:text-[#FF4800]"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
