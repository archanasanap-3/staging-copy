'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '@/components/features/common/MagneticButton';

const ease = [0.16, 1, 0.3, 1] as const;

interface StatItem {
  value: number | null;
  display?: string;
  suffix?: string;
  label: string;
}

const statItems: StatItem[] = [
  { value: 55, suffix: '%', label: 'Manual Work Reduced' },
  { value: null, display: '3–5×', label: 'Operational Efficiency' },
  { value: 100, suffix: '%', label: 'Code Ownership' },
  { value: null, display: 'End-to-End', label: 'Strategy → Build → Deploy' },
];

function CharReveal({ text, delay = 0, className = "" }: { text: string; delay?: number, className?: string }) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: '110%', opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: delay + i * 0.02,
            ease
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

function StatCard({ stat, index, inView }: { stat: StatItem; index: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || stat.value === null) return;
    const duration = 2000;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * stat.value!));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, stat.value]);

  const displayValue = stat.value !== null ? `${count}${stat.suffix ?? ''}` : stat.display;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.2 + index * 0.15, ease }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group p-8 rounded-[32px] bg-white/40 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-xl shadow-sm hover:shadow-2xl hover:border-[#FF4800]/20 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF4800]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[32px]" />

      <div className="relative z-10">
        <div className="text-4xl md:text-5xl font-bold tracking-tighter text-[#1a1a2e] dark:text-white mb-3 tabular-nums">
          {displayValue}
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF4800]">
          {stat.label}
        </div>
      </div>

      {/* Hover Indicator */}
      <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-[#FF4800] opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-500 shadow-[0_0_15px_rgba(255,72,0,0.8)]" />
    </motion.div>
  );
}

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 bg-white dark:bg-[#0a0a14] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* Orbs */}
        <div className="absolute top-1/4 -right-24 w-[500px] h-[500px] bg-[#FF4800]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -left-24 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

          {/* LEFT SIDE: Stats Cards */}
          <div className="lg:col-span-5 relative">
            {/* Vertical Glowing Line */}
            <div className="absolute -left-12 top-0 bottom-0 w-px bg-black/5 dark:bg-white/5 hidden xl:block">
              <motion.div
                className="w-full bg-gradient-to-b from-transparent via-[#FF4800] to-transparent shadow-[0_0_15px_rgba(255,72,0,0.5)]"
                style={{ height: '30%', top: '0%' }}
                animate={{ top: ['0%', '70%', '0%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <StatCard stat={statItems[0]} index={0} inView={inView} />
                <StatCard stat={statItems[2]} index={2} inView={inView} />
              </div>
              <div className="space-y-6 md:mt-12">
                <StatCard stat={statItems[1]} index={1} inView={inView} />
                <StatCard stat={statItems[3]} index={3} inView={inView} />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Heading Section */}
              <div className="mb-12">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="inline-block text-[10px] font-bold uppercase tracking-[0.5em] text-[#FF4800] mb-8 px-4 py-2 rounded-full border border-[#FF4800]/20 bg-[#FF4800]/5 backdrop-blur-sm"
                >
                  Operations Reimagined
                </motion.span>

                <h6 className="text-[#1a1a2e] dark:text-white text-4xl md:text-7xl font-black uppercase leading-[1.05] tracking-tighter mb-10">
                  <CharReveal text="We Get It . Because We've Lived It." delay={0.2} />
                </h6>

                {/* Animated Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 1, ease }}
                  style={{ originX: 0 }}
                  className="h-px w-32 bg-gradient-to-r from-[#FF4800] to-transparent mb-12"
                />
              </div>

              {/* Body Content */}
              <div className="max-w-xl space-y-8">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1.2, ease }}
                  className="text-xl md:text-2xl font-light leading-relaxed text-[#475569] dark:text-[#9ca3af]"
                >
                  A small team of operators and builders who&apos;ve been through the chaos of scaling. We built Straveda as the <span className="text-[#FF4800] font-medium italic underline decoration-[#FF4800]/30 underline-offset-8">antidote</span> engineering first partners who measure success in outcomes.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1.4, ease }}
                  className="pt-8 flex items-center gap-8"
                >
                  <MagneticButton>
                    <button className="group relative flex items-center gap-4 bg-[#FF4800] text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-[11px] overflow-hidden shadow-2xl transition-all hover:scale-105 active:scale-95">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      Our Approach <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </MagneticButton>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF4800]">Strategy First</span>
                    <span className="text-xs text-[#64748b] dark:text-[#666]">No Slide Decks. Just Code.</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
