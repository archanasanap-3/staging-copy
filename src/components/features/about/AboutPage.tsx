'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  ArrowRight, Zap, Lock, Clock, Eye, TrendingUp, Users,
  Quote, CheckCircle2, PhoneCall, FileText, Rocket
} from 'lucide-react';
import MagneticButton from '@/components/features/common/MagneticButton';
import HorizontalCarousel from '@/components/features/common/HorizontalCarousel';
import { StackedCarousel } from '@/components/features/common/StackedCarousel';
import AnimatedLiquidBackground from '@/components/animations/AnimatedLiquidBackground';
import ParticleField from '@/components/animations/ParticleField';
import ReelsCarouselSection from './ReelsCarouselSection';
// import ClientsSection from './ClientsSection';

/* ─────────────────────────────────────────────────────────────────────── */
/* Styles & Brand Constants                                                */
/* ─────────────────────────────────────────────────────────────────────── */

const STYLES = `
  .masked-title {
    background: linear-gradient(125deg, #111111 35%, #FF4800 75%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
  }
  .dark .masked-title {
    background: linear-gradient(125deg, #ffffff 35%, #FF4800 75%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .stroke-text {
    -webkit-text-stroke: 1px rgba(0,0,0,0.12);
    color: transparent;
    letter-spacing: -2.05px;
  }
  .dark .stroke-text {
    -webkit-text-stroke: 1px rgba(255,255,255,0.12);
  }
  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .dark .glass-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
`;

const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease }
};

/* ─────────────────────────────────────────────────────────────────────── */
/* 1. Hero Section                                                         */
/* ─────────────────────────────────────────────────────────────────────── */

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.current = (clientX / innerWidth - 0.5) * 20;
      mouseY.current = (clientY / innerHeight - 0.5) * 20;

      const gradient = document.getElementById('hero-spotlight');
      if (gradient && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        gradient.style.transform = `translate(${clientX - rect.left - 256}px, ${clientY - rect.top - 256}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const titleWords = "Built by Operators.".split(" ");

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[85vh] items-center bg-[#F6F1E7] dark:bg-[#0a0a14] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatedLiquidBackground />
        <ParticleField />

        {/* Animated Gradient Mesh / Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-20">
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[120px]"
            style={{ background: 'radial-gradient(circle, rgba(255,72,0,0.08) 0%, transparent 70%)' }}
          />
          <motion.div
            animate={{
              x: [0, -40, 0],
              y: [0, 60, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full blur-[140px]"
            style={{ background: 'radial-gradient(circle, rgba(255,72,0,0.05) 0%, transparent 70%)' }}
          />
        </div>

        {/* Mouse Spotlight */}
        <div
          id="hero-spotlight"
          aria-hidden="true"
          className="absolute pointer-events-none w-[512px] h-[512px] rounded-full opacity-0 z-[2] transition-opacity duration-700 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(255,72,0,0.06) 0%, transparent 70%)',
            opacity: isHovered ? 1 : 0,
            filter: 'blur(40px)',
            willChange: 'transform'
          }}
        />

        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-[3]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        {/* Vertical border lines */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 3 }}>
          {['left-4 md:left-8', 'right-4 md:right-8'].map((p) => (
            <div key={p} className={`absolute inset-y-0 ${p} w-px opacity-20 dark:opacity-10`}
              style={{ background: `linear-gradient(to bottom, transparent, #FF4800, transparent)` }} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 relative z-10 pt-32 pb-20">
        <div className="relative pl-8 md:pl-16">
          {/* Vertical Accent Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-0 w-[2px] rounded-full"
            style={{ background: 'linear-gradient(180deg, #FF4800 0%, rgba(255,72,0,0.05) 100%)' }}
          />

          {/* Top Tag */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="h-px w-8 bg-[#FF4800]/40" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800]">
              About Straveda — Pune, India
            </span>
          </motion.div>

          {/* Cinematic Heading */}
          <h1
            className="font-bold uppercase text-black dark:text-white"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', lineHeight: 1, letterSpacing: '-2.5px' }}
          >
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="inline-block mr-[0.2em] last:mr-0"
              >
                {word === "Operators." ? (
                  <span className="relative inline-block">
                    <span style={{ color: '#FF4800' }}>{word}</span>
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1, delay: 1.2 }}
                      className="absolute bottom-[-5px] left-0 h-[3px] bg-[#FF4800]/20 rounded-full"
                    />
                  </span>
                ) : word}
              </motion.span>
            ))}
          </h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-base md:text-xl text-[#374151] dark:text-[#cbd5e1] max-w-2xl leading-relaxed font-light"
          >
            Built by people who&apos;ve handled operations, growth, and execution firsthand—not just consultants giving advice from the outside.
          </motion.p>
        </div>
      </div>

      {/* Dynamic Bottom Transition */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, white)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 z-10 hidden dark:block"
        style={{ background: 'linear-gradient(to bottom, transparent, #0a0a14)' }} />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* 4. Company Stats                                                        */
/* ─────────────────────────────────────────────────────────────────────── */

const stats = [
  { label: "Clients", value: "15+", count: 15, suffix: "+", prefix: "", barClass: "h-12 md:h-32" },
  { label: "Projects", value: "20+", count: 20, suffix: "+", prefix: "", barClass: "h-24 md:h-56" },
  { label: "Avg ROI", value: "3–5x", count: null, suffix: "", prefix: "", barClass: "h-20 md:h-44" },
  { label: "Retention", value: "88%+", count: 88, suffix: "%+", prefix: "", barClass: "h-28 md:h-64" },
  { label: "Impl. Time", value: "4-5w", count: null, suffix: "", prefix: "", barClass: "h-20 md:h-48" },
  { label: "Uptime", value: "99.5%", count: 99.5, suffix: "%", prefix: "", barClass: "h-16 md:h-36" },
];

function AnimatedStatValue({ stat }: { stat: typeof stats[0] }) {
  const ref = useRef<HTMLSpanElement>(null);
const inView = useInView(ref, {
  once: false,
  margin: "-60px",
});
 const [count, setCount] = useState(0);

 useEffect(() => {
  if (!inView || stat.count === null) {
    if (stat.count !== null) {
      setCount(0);
    }
    return;
  }

  const target = stat.count;
  const duration = 1800;
  const start = performance.now();
  const isDecimal = target % 1 !== 0;

  function step(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;

    setCount(
      isDecimal
        ? Math.round(current * 10) / 10
        : Math.round(current)
    );

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}, [inView, stat.count]);

  if (stat.count === null) return <span ref={ref}>{stat.value}</span>;
  return <span ref={ref}>{stat.prefix}{count}{stat.suffix}</span>;
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Who We Are Section                                                      */
/* ─────────────────────────────────────────────────────────────────────── */

const whoWeAreStats = [
  { value: 55, suffix: "%", label: "Manual Work Reduced", desc: "Less repetitive work, more time to grow." },
  { value: 100, suffix: "%", label: "Code Ownership", desc: "Every system we build is yours to keep." },
  { value: null, display: "3–5×", label: "Operational Efficiency", desc: "Connected workflows that run faster." },
];

function AnimatedWhoWeAreStat({
  target,
  suffix = "",
  display,
}: {
  target: number | null;
  suffix?: string;
  display?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || target === null) return;
    const num = target;
    const duration = 1600;
    const start = performance.now();
    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * num));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [inView, target]);

  if (target === null) return <span ref={ref}>{display}</span>;
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function WhoWeAreSection() {
  return (
    <section className="relative bg-[#F6F1E7] dark:bg-[#0a0a14] overflow-hidden pt-32 md:pt-36 pb-12 md:pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Headline + intro */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800]">Who we are</p>
            <h2 className="max-w-3xl text-[2.1rem] font-bold leading-[1.08] tracking-[-0.035em] text-black dark:text-white sm:text-5xl lg:text-[3.75rem]">
              Built by operators,
              <br />
              <motion.span
                initial={{ backgroundSize: "0% 100%" }}
                whileInView={{ backgroundSize: "100% 100%", color: "#ffffff" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: 0.4, ease }}
                className="box-decoration-clone px-2"
                style={{
                  backgroundImage: "linear-gradient(#FF4800, #FF4800)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left center",
                }}
              >
                driven by outcomes.
              </motion.span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="self-end text-[15px] leading-[1.8] text-neutral-600 dark:text-neutral-400"
          >
            Every growing business hits the same wall: disconnected tools and wasted manual hours. We engineer
            unified systems that replace operational chaos with clarity and speed, built from the ground up for
            resilience, scale, and high-velocity teams.
          </motion.p>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mt-14 grid grid-cols-1 gap-y-10 border-t border-neutral-300/80 pt-10 dark:border-white/15 sm:grid-cols-3 md:mt-20"
        >
          {whoWeAreStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`min-w-0 ${
                i > 0 ? "sm:border-l sm:border-neutral-300/80 sm:pl-8 dark:sm:border-white/15 lg:pl-12" : ""
              }`}
            >
              <p
                className="whitespace-nowrap font-bold leading-none tracking-[-0.045em] text-[#FF4800] tabular-nums"
                style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
              >
                <AnimatedWhoWeAreStat target={stat.value} suffix={stat.suffix} display={stat.display} />
              </p>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-900 dark:text-white">
                {stat.label}
              </p>
              <p className="mt-2 max-w-[260px] text-[13px] leading-6 text-neutral-600 dark:text-neutral-400">
                {stat.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StatsSection() {
  const { resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const isDark = mounted && (resolvedTheme === 'dark' || theme === 'dark');

  return (
    <section className="bg-[#F6F1E7] dark:bg-[#0a0a14] overflow-hidden py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-10 md:mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800] mb-4 block">
            By The Numbers
          </span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="text-3xl font-bold leading-tight tracking-tight text-black dark:text-white sm:text-4xl md:text-[2.5rem]"
            style={{ color: isDark ? "#ffffff" : "#000000" }}
          >
            Measurable Operational Impact
          </motion.h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 items-end border-b border-black/10 pb-1">

          {stats.map((s, i) => (
            <div
              key={i}
              className="relative group flex flex-col items-center"
            >

              {/* Number + Label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.12,
                  ease,
                }}
                className="mb-4 md:mb-5"
              >
                <p className="text-2xl md:text-4xl font-semibold text-[#1a1a1a] dark:text-white tracking-tighter text-center">
                  <AnimatedStatValue stat={s} />
                </p>

                <p className="text-[10px] text-[#666] uppercase tracking-widest mt-2 text-center">
                  {s.label}
                </p>
              </motion.div>

              {/* Animated Vertical Line */}
              <div className="relative">
                <motion.div
                  initial={{
                    scaleY: 0,
                    opacity: 0,
                  }}
                  whileInView={{
                    scaleY: 1,
                    opacity: 1,
                  }}
                  viewport={{
                    once: false,
                    amount: 0.4,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    transformOrigin: "bottom center",
                    backgroundColor: "#FF4800",
                  }}
                  className={`w-[3px] ${s.barClass} bg-[#FF4800]`}
                />
              </div>

            </div>
          ))}

        </div>

        {/* Bottom Information */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-[#777]">
            Typical client size: ₹1Cr–₹50Cr annual revenue
          </span>

          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-[#777]">
            Location: Pune, Maharashtra
          </span>
        </div>

      </div>
    </section>
  );
}
/* ─────────────────────────────────────────────────────────────────────── */
/* 3. Operating Principles                                                 */
/* ─────────────────────────────────────────────────────────────────────── */

const principles = [
  { title: "Automation First", desc: "Before we build feature one, we ask: 'What can we eliminate?' We prune scope then automate what's left.", icon: <Zap size={20} /> },
  { title: "You Own Everything", desc: "Full code ownership. Complete documentation. Zero vendor lock in. If we disappear, your team runs the system.", icon: <Lock size={20} /> },
  { title: "Speed Over Perfection", desc: "Shipping fast beats planning perfectly. Weekly sprints. Friday builds. Working software by week 4.", icon: <Clock size={20} /> },
  { title: "Transparency", desc: "No black boxes. No 'trust us' architecture. We document as we build, not after. You know the 'why'.", icon: <Eye size={20} /> },
  { title: "Priced for ROI", desc: "If a project doesn't pay for itself in 90 days, we don't build it. We'd rather lose the deal than waste your time.", icon: <TrendingUp size={20} /> },
  { title: "Senior Execution", desc: "We cap engagements so you get senior attention on every build not kickoff with partners and delivery from juniors.", icon: <Users size={20} /> },
];



/* ─────────────────────────────────────────────────────────────────────── */
/* 2. Our Story                                                            */
/* ─────────────────────────────────────────────────────────────────────── */

const chaosItems = [
  "Paying for 5 tools. None of them talk.",
  "Fridays spent on reports that should write themselves.",
  "A decision needs 2 days just to get the data.",
  "Implementation started 6 months ago. Still setting it up.",
  "Your best hire is doing data entry.",
];

const clarityItems = [
  "One platform, built for how you actually work.",
  "Reports run overnight. Your Fridays are yours again.",
  "Every decision backed by live data instantly.",
  "You're live in 5 weeks. Paying back in 90 days.",
  "Your best hire is doing their best work.",
];

function StorySection() {
  return (
    <section className="bg-[#F6F1E7] dark:bg-[#0a0a14] relative overflow-hidden py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        <div className="mb-10 md:mb-16 text-left">
          <div className="mb-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800]">
              Our Story
            </span>
          </div>

          {/* Story Heading */}
          <h2
            className="text-3xl font-bold leading-tight tracking-tight text-black dark:text-white sm:text-4xl md:text-[2.5rem]"
          >
            Two Paths{" "}
            One Choice
         
          </h2>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">

          {/* OLD WAY */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card relative rounded-2xl overflow-hidden p-7 md:p-9 flex flex-col transition-all duration-300 hover:shadow-xl"
          >
            <div className="mb-6">
              <span className="inline-block text-[8px] font-bold uppercase tracking-[0.4em] text-[#FF4800]/60 border border-[#FF4800]/20 px-2.5 py-1 rounded-full mb-3">
                The Old Way
              </span>

              <h3 className="text-xl font-bold uppercase tracking-tight text-[#1a1a2e]/70 dark:text-white/60">
                Chaos
              </h3>
            </div>

            <div className="space-y-5 flex-1">
              {chaosItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.55 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-[5px] w-1.5 h-1.5 rounded-full border border-[#FF4800]/40 shrink-0" />

                  <span className="text-[13px] leading-snug text-[#1a1a2e] dark:text-white">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* STRAVEDA WAY */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card relative rounded-2xl overflow-hidden p-7 md:p-9 flex flex-col border-[#FF4800]/20 transition-all duration-300 hover:shadow-xl"
            style={{ background: 'rgba(255,72,0,0.05)' }}
          >
            <div className="mb-6">
              <span className="inline-block text-[8px] font-bold uppercase tracking-[0.4em] text-[#FF4800] bg-[#FF4800]/15 px-2.5 py-1 rounded-full mb-3">
                The Straveda Way
              </span>

              <h3 className="text-xl font-bold uppercase tracking-tight text-[#1a1a2e] dark:text-white">
                Structure
              </h3>
            </div>

            <div className="space-y-5 flex-1">
              {clarityItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={14}
                    className="mt-[2px] text-[#FF4800] shrink-0"
                  />

                  <span className="text-[13px] font-medium leading-snug text-[#1a1a2e] dark:text-white/90">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}


/* ─────────────────────────────────────────────────────────────────────── */
/* 5. Results Section                                                      */
/* ─────────────────────────────────────────────────────────────────────── */

const testimonials = [
  {
    quote: "We were drowning in manual lead qualification work. Straveda built a WhatsApp bot that handles 80% of our lead flow now.",
    impact: "80% manual work reduction / 6x lead throughput",
    company: "D2C Fashion Brand, Mumbai",
    role: "Operations Director"
  },
  {
    quote: "Our CRM was killing us it didn't match our sales process. Straveda built us a custom CRM in 8 weeks. Team adoption was instant.",
    impact: "3x sales velocity / 90% team adoption",
    company: "SaaS Startup, Bangalore",
    role: "Founder"
  },
  {
    quote: "We were paying for six different tools. Straveda consolidated everything into one integrated platform. ROI in first quarter.",
    impact: "50% cost reduction / Unified data",
    company: "E-Commerce, Delhi NCR",
    role: "CEO"
  },
  {
    quote:
      "Straveda automated our repetitive workflows and gave the team more time to focus on growth.",
    impact: "50% LESS MANUAL WORK",
    role: "Operations Head",
    company: "SaaS Company, Pune",
  },
  {
    quote:
      "The custom system was much easier for our team to adopt than the tools we were using before.",
    impact: "2× FASTER OPERATIONS",
    role: "Founder",
    company: "Technology Startup, Mumbai",
  },
  {
    quote:
      "We finally have one connected workflow instead of switching between multiple disconnected tools.",
    impact: "40% FASTER REPORTING",
    role: "Business Director",
    company: "Enterprise, Bangalore",
  },
  {
    quote:
      "The automation reduced repetitive tasks and helped our team concentrate on higher-value work.",
    impact: "60% TASK AUTOMATION",
    role: "COO",
    company: "Growth Company, Hyderabad",
  },
];

function ResultsSection() {
  // Duplicate cards for seamless single-line infinite scrolling
  const scrollingResults = [...testimonials, ...testimonials];

  return (
    <section className="bg-[#F6F1E7] dark:bg-[#0a0a14] overflow-hidden py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-8 md:mb-10">
          <h2 className="masked-title text-3xl md:text-4xl font-bold tracking-tight">
            Results that speak
          </h2>
        </div>

        {/* ================= SINGLE HORIZONTAL ROW ================= */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex w-max items-stretch gap-5"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {scrollingResults.map((item, i) => (
              <div
                key={`results-${i}`}
                className="
                  glass-card
                  w-[280px]
                  md:w-[320px]
                  flex-shrink-0
                  rounded-[22px]
                  p-6
                  min-h-[200px]
                  flex
                  flex-col
                "
              >
                {/* Description */}
                <p className="text-[#475569] dark:text-[#cbd5e1] text-sm leading-6 italic">
                  “{item.quote}”
                </p>

                {/* Impact + Client */}
                <div className="mt-auto border-t border-black/5 dark:border-white/10 pt-4">
                  <p className="text-[#FF4800] text-[11px] font-bold uppercase tracking-[0.22em] mb-2">
                    {item.impact}
                  </p>

                  <p className="text-[#64748b] dark:text-[#888] text-[9px] font-medium uppercase tracking-[0.12em]">
                    — {item.role}, {item.company}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* 6. Work With Us Section                                                 */
/* ─────────────────────────────────────────────────────────────────────── */

const roadmap = [
  {
    step: "01",
    title: "Book a Strategy Call",
    meta: "30 MIN, FREE",
    desc: "We audit your operations and biggest bottlenecks, recommend what to build first. Get an actionable roadmap tailored for your business.",
    cta: "Book Now",
    icon: PhoneCall,
  },
  {
    step: "02",
    title: "Get a Custom Proposal",
    meta: "48 HOURS",
    desc: "Fixed Price quote for your project. Timeline and success metrics included. Transparent scope with zero hidden costs or surprises.",
    cta: "Request Proposal",
    icon: FileText,
  },
  {
    step: "03",
    title: "Start Building",
    meta: "4–6 WEEKS",
    desc: "Weekly sprints with visible progress. Go live and reclaim your time. Fast deployment with production-ready systems delivered.",
    cta: "Book a Strategy Call",
    icon: Rocket,
  },
];

function WorkWithUsSection({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <section className="relative bg-[#F6F1E7] dark:bg-[#0a0a14] overflow-hidden py-12 md:py-16">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10 md:mb-16 text-left">
          <div className="mb-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800]">
              Lets connect
            </span>
          </div>

          <h2
            className="text-3xl font-bold leading-tight tracking-tight text-black dark:text-white sm:text-4xl md:text-[2.5rem]"
          >
            Let&apos;s build something{" "}
              that matters
           
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-20">
          {roadmap.map((r, i) => {
            const Icon = r.icon;
            const isFeatured = i === 0;

            return (
              <motion.div
                key={i}
                {...fadeUp}
                className={`rounded-[28px] p-7 md:p-8 flex flex-col justify-between min-h-[360px] transition-all duration-300 active:scale-95 ${
                  isFeatured
                    ? 'bg-[#0f172a] text-white dark:bg-[#141422] dark:border dark:border-white/10 shadow-2xl hover:shadow-[0_20px_40px_rgba(255,72,0,0.15)]'
                    : 'bg-[#f8f9fa] text-[#1a1a2e] dark:bg-[#0e0e18] dark:text-white border border-black/5 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-[#FF4800]/20'
                }`}
              >
                <div>
                  {/* Top: Icon + Meta Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isFeatured
                          ? 'bg-white/10 text-[#FF4800]'
                          : 'bg-[#FF4800]/10 text-[#FF4800]'
                      }`}
                    >
                      <Icon size={24} strokeWidth={1.8} />
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        isFeatured
                          ? 'bg-white/15 text-white/90'
                          : 'bg-[#FF4800]/10 text-[#FF4800]'
                      }`}
                    >
                      {r.meta}
                    </span>
                  </div>

                  {/* Title */}
                  <h4
                    className={`text-xl md:text-2xl font-bold leading-tight mb-3 text-left ${
                      isFeatured ? 'text-white' : 'text-[#1a1a2e] dark:text-white'
                    }`}
                  >
                    {r.title}
                  </h4>

                  {/* Description */}
                  <p
                    className={`text-sm leading-relaxed mb-6 text-left ${
                      isFeatured
                        ? 'text-gray-300 dark:text-gray-400'
                        : 'text-[#475569] dark:text-[#9ca3af]'
                    }`}
                  >
                    {r.desc}
                  </p>
                </div>

                {/* Pill CTA Button */}
                {r.cta && (
                  <div className="mt-auto pt-2">
                    <button
                      onClick={() => onNavigate('contact')}
                      className={`w-full py-3.5 px-6 rounded-full font-bold uppercase tracking-widest text-[11px] transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${
                        isFeatured
                          ? 'bg-white text-[#0f172a] hover:bg-[#FF4800] hover:text-white dark:bg-[#FF4800] dark:text-white dark:hover:bg-[#e03f00]'
                          : 'bg-[#0f172a] text-white hover:bg-[#FF4800] dark:bg-white dark:text-black dark:hover:bg-[#FF4800] dark:hover:text-white'
                      }`}
                    >
                      <span>{r.cta}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <main className="min-h-screen bg-[#F6F1E7] dark:bg-[#0a0a14]">
      <style>{STYLES}</style>
      <WhoWeAreSection />
      <StatsSection />
      <StorySection />
      <ReelsCarouselSection onNavigate={onNavigate} />
      {/* Hidden for now: <ClientsSection /> */}
      <WorkWithUsSection onNavigate={onNavigate} />
    </main>
  );
}