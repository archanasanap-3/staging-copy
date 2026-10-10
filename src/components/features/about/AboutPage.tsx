'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
  ArrowRight, Zap, Lock, Clock, Eye, TrendingUp, Users,
  CheckCircle2, PhoneCall, FileText, Rocket
} from 'lucide-react';
import AnimatedLiquidBackground from '@/components/animations/AnimatedLiquidBackground';
import ParticleField from '@/components/animations/ParticleField';

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
  @media (min-width: 768px) {
    .perspective-stage {
      perspective: 1400px;
    }
    .card-3d-left {
      transform: perspective(1400px) rotateY(13deg);
      transform-origin: right center;
    }
    .card-3d-center {
      transform: perspective(1400px) translateZ(24px) scale(1.03);
      z-index: 10;
    }
    .card-3d-right {
      transform: perspective(1400px) rotateY(-13deg);
      transform-origin: left center;
    }
    .card-3d-left:hover {
      transform: perspective(1400px) rotateY(0deg) translateZ(24px) scale(1.04);
      z-index: 20;
    }
    .card-3d-center:hover {
      transform: perspective(1400px) translateZ(36px) scale(1.06);
      z-index: 20;
    }
    .card-3d-right:hover {
      transform: perspective(1400px) rotateY(0deg) translateZ(24px) scale(1.04);
      z-index: 20;
    }
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
      className="relative flex min-h-[85vh] items-center bg-white dark:bg-[#0a0a14] overflow-hidden"
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

      <div className="max-w-7xl mx-auto w-full relative z-10 pt-32 pb-20">
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
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FF4800]">
              About Straveda — Pune, India
            </span>
          </motion.div>

          {/* Cinematic Heading */}
          <h1
            className="font-bold uppercase text-[#0f172a] dark:text-[#f0f0f5]"
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
/* Who We Are Section (Same as Home Page)                                 */
/* ─────────────────────────────────────────────────────────────────────── */

function WhoWeAreSection() {
  const [count55, setCount55] = useState(0);
  const [count5, setCount5] = useState(0);
  const [count100, setCount100] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = statsRef.current;
    if (!element) return;

    let animationFrame: number | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCount55(0);
          setCount5(0);
          setCount100(0);

          const duration = 1500;
          const start = performance.now();

          const update = (time: number) => {
            const progress = Math.min((time - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            const finalCount55 = progress >= 1 ? 55 : Math.floor(55 * eased);
            const finalCount5 = progress >= 1 ? 5 : Math.floor(5 * eased);
            const finalCount100 = progress >= 1 ? 100 : Math.floor(100 * eased);

            setCount55(finalCount55);
            setCount5(finalCount5);
            setCount100(finalCount100);

            if (progress < 1) {
              animationFrame = requestAnimationFrame(update);
            }
          };

          animationFrame = requestAnimationFrame(update);
        } else {
          if (animationFrame) {
            cancelAnimationFrame(animationFrame);
          }
          setCount55(0);
          setCount5(0);
          setCount100(0);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <section
      id="section-about"
      className="relative bg-white dark:bg-[#0a0a14] pt-28 pb-16 md:pt-36 md:pb-24 border-b border-black/5 dark:border-white/5"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ───────── LEFT SIDE ───────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className="flex h-full flex-col"
          >
            {/* Small Label */}
            <p
              className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em]"
              style={{ color: "#FF4800" }}
            >
              WHO WE ARE
            </p>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-bold tracking-tight leading-[1.2] text-black dark:text-white">
              We Get It Because
              <br />
              We&apos;ve Lived It
            </h2>

            {/* Paragraph */}
            <p className="mt-8 max-w-[520px] text-[14px] leading-[1.65] text-[#6b7280] dark:text-[#9ca3af] sm:text-[15px] lg:mt-[50px]">
              Every growing company hits the same wall: scattered tools,
              and wasted manual hours. At Straveda, we engineer unified,
              AI-powered systems that replace operational chaos with structure,
              clarity, and real efficiency.
            </p>
          </motion.div>

          {/* ───────── RIGHT SIDE — STATS ───────── */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:gap-x-16"
          >

            {/* ───── STAT 1 ───── */}
            <div className="flex flex-col">
              <div className="h-[48px] flex items-end">
                <p
                  className="font-bold text-black dark:text-white"
                  style={{
                    fontSize: "clamp(2rem, 3.2vw, 2.75rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {count55}%
                </p>
              </div>

              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#555555] dark:text-neutral-400">Manual Work Reduced</p>

              <p className="mt-2.5 text-[13px] sm:text-[14px] leading-relaxed text-[#6b7280] dark:text-[#9ca3af]">
                Reduce repetitive work and improve everyday operations.
              </p>
            </div>

            {/* ───── STAT 2 ───── */}
            <div className="flex flex-col">
              <div className="h-[48px] flex items-end">
                <p
                  className="font-bold text-black dark:text-white"
                  style={{
                    fontSize: "clamp(2rem, 3.2vw, 2.75rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  3–{count5}x
                </p>
              </div>

              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#555555] dark:text-neutral-400">Operational Efficiency</p>

              <p className="mt-2.5 text-[13px] sm:text-[14px] leading-relaxed text-[#6b7280] dark:text-[#9ca3af]">
                Build faster workflows with connected systems.
              </p>
            </div>

            {/* ───── STAT 3 ───── */}
            <div className="flex flex-col">
              <div className="h-[48px] flex items-end">
                <p
                  className="font-bold text-black dark:text-white"
                  style={{
                    fontSize: "clamp(2rem, 3.2vw, 2.75rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {count100}%
                </p>
              </div>

              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#555555] dark:text-neutral-400">Code Ownership</p>

              <p className="mt-2.5 text-[13px] sm:text-[14px] leading-relaxed text-[#6b7280] dark:text-[#9ca3af]">
                Scalable solutions with complete ownership of your codebase.
              </p>
            </div>

            {/* ───── STAT 4 ───── */}
            <div className="flex flex-col">
              <div className="h-[48px] flex items-end">
                <p
                  className="whitespace-nowrap font-bold text-black dark:text-white"
                  style={{
                    fontSize: "clamp(1.75rem, 2.8vw, 2.5rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  End-to-End
                </p>
              </div>

              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#555555] dark:text-neutral-400">Strategy → Build → Deploy</p>

              <p className="mt-2.5 text-[13px] sm:text-[14px] leading-relaxed text-[#6b7280] dark:text-[#9ca3af]">
                From strategy and development to deployment and optimization.
              </p>
            </div>

          </motion.div>

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
    <section className="bg-white dark:bg-[#0a0a14]  pb-8 md:pt-24 md:pb-12 border-y border-black/5 dark:border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        <div className="mb-10 md:mb-16 text-center">
          <div className="mb-8">
  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FF4800]">
    Our Story
  </span>
</div>

          {/* Story Heading */}
          <h2
            className="font-bold uppercase leading-[0.95] mx-auto text-[#1a1a2e] dark:text-white text-3xl sm:text-4xl md:text-5xl tracking-[-2px]"
          >
            Two Paths {" "}
            <span style={{ color: '#FF4800' }}>
              One Choice
            </span>
          </h2>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">

          {/* OLD WAY */}
          <div className="glass-card relative rounded-2xl overflow-hidden p-7 md:p-9 flex flex-col">
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
                <div
                  key={i}
                  className="flex items-start gap-3 opacity-50"
                >
                  <span className="mt-[5px] w-1.5 h-1.5 rounded-full border border-[#FF4800]/40 shrink-0" />

                  <span className="text-[13px] leading-snug text-[#1a1a2e] dark:text-white">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* STRAVEDA WAY */}
          <div
            className="glass-card relative rounded-2xl overflow-hidden p-7 md:p-9 flex flex-col border-[#FF4800]/20"
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
                <div
                  key={i}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={14}
                    className="mt-[2px] text-[#FF4800] shrink-0"
                  />

                  <span className="text-[13px] font-medium leading-snug text-[#1a1a2e] dark:text-white/90">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

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
    subtitle: "Audit & Discover",
    title: "Book a Strategy Call",
    meta: "30 min, free",
    desc: "We audit your operations and biggest bottlenecks, recommend what to build first.",
    badge: "Zero Commitment",
    icon: PhoneCall,
    cta: "Book Now",
  },
  {
    step: "02",
    subtitle: "Fixed Scope & ROI",
    title: "Get a Custom Proposal",
    meta: "48 hours",
    desc: "Fixed Price quote for your project. Timeline and success metrics included.",
    badge: "Fixed Price",
    icon: FileText,
    cta: "Request Proposal",
  },
  {
    step: "03",
    subtitle: "Weekly Sprints",
    title: "Start Building",
    meta: "4–6 weeks",
    desc: "Weekly sprints with visible progress. Go live and reclaim your time.",
    badge: "Full Ownership",
    icon: Rocket,
    cta: "Start Building",
  },
];

function WorkWithUsSection({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <section className="relative bg-[#fafafc] dark:bg-[#0a0a14] pt-16 pb-20 md:pt-24 md:pb-28 border-t border-black/5 dark:border-white/5 overflow-hidden">
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[140px] opacity-40 dark:opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(255,72,0,0.12) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading Left-aligned */}
        <div className="mb-10 md:mb-14 text-left max-w-3xl">
          <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.28em] text-[#FF4800]">
            Work With Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-bold tracking-tight text-black dark:text-white leading-[1.18]">
            Let&apos;s build something that matters
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-xl">
            From operational discovery to production-ready automated systems.
          </p>
        </div>

        {/* 3D Curved Perspective Stage */}
        <div className="perspective-stage mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {roadmap.map((r, i) => {
              const Icon = r.icon;
              const card3dClass = i === 0 ? 'card-3d-left' : i === 1 ? 'card-3d-center' : 'card-3d-right';

              return (
                <div
                  key={r.step}
                  className={`${card3dClass} relative flex flex-col justify-between rounded-[26px] sm:rounded-[28px] bg-white p-6 sm:p-7 shadow-[0_15px_45px_rgba(0,0,0,0.06)] border border-neutral-200/90 dark:bg-[#12121e] dark:border-white/10 dark:shadow-[0_15px_45px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out`}
                >
                  {/* Top Bar: Icon + Step on Left Corner, Duration pill on Right */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      {/* Small Icon in Left Corner */}
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF4800]/10 text-[#FF4800] border border-[#FF4800]/20 shrink-0">
                        <Icon size={16} strokeWidth={2} />
                      </div>

                      {/* Step Number only: 01, 02, 03 */}
                      <span className="text-xs font-mono font-bold tracking-wider text-[#FF4800]">
                        {r.step}
                      </span>
                    </div>

                    <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-600 border border-neutral-200/60 dark:bg-white/10 dark:text-neutral-300 dark:border-white/5">
                      {r.meta}
                    </span>
                  </div>

                  {/* Body: Left-aligned, compact height */}
                  <div className="my-5 text-left">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF4800]/80 mb-1.5 block">
                      {r.subtitle}
                    </span>

                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-black dark:text-white">
                      {r.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                      {r.desc}
                    </p>
                  </div>

                  {/* Bottom: Terms Guarantee & CTA Button */}
                  <div className="pt-4 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-neutral-400">Terms</span>
                      <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">{r.badge}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onNavigate('contact')}
                      className="group inline-flex items-center gap-2 rounded-xl bg-black dark:bg-white py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white dark:text-black hover:bg-[#FF4800] dark:hover:bg-[#FF4800] dark:hover:text-white transition-all duration-300 shadow-sm shrink-0"
                    >
                      <span>{r.cta}</span>
                      <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a14]">
      <style>{STYLES}</style>
      <WhoWeAreSection />
      <StorySection />
      <WorkWithUsSection onNavigate={onNavigate} />
    </main>
  );
}