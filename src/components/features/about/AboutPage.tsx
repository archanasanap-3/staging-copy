'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import StatsSectionNew from '@/components/features/common/StatsSection';
import {
  ArrowRight, Zap, Lock, Clock, Eye, TrendingUp, Users,
  Quote, CheckCircle2
} from 'lucide-react';
import MagneticButton from '@/components/features/common/MagneticButton';
import HorizontalCarousel from '@/components/features/common/HorizontalCarousel';
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
            className="mt-8 text-base md:text-lg text-[#374151] dark:text-[#cbd5e1] max-w-2xl leading-relaxed font-light"
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
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || stat.count === null) return;
    const target = stat.count;
    const duration = 1800;
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setCount(isDecimal ? Math.round(current * 10) / 10 : Math.round(current));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [inView, stat.count]);

  if (stat.count === null) return <span ref={ref}>{stat.value}</span>;
  return <span ref={ref}>{stat.prefix}{count}{stat.suffix}</span>;
}

function StatsSection() {
  return (
    <section className="bg-white dark:bg-[#030303] py-16 md:py-24 overflow-hidden border-y border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10 md:mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FF4800] mb-4 block">
            By The Numbers
          </span>
          <h2 className="text-[#0f172a] dark:text-white text-xl md:text-2xl font-normal tracking-tighter uppercase">
            Measurable Operational Impact
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 items-end border-b border-black/10 dark:border-white/5 pb-1">
          {stats.map((s, i) => (
            <div key={i} className="relative group flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease }}
                className="mb-4 md:mb-5"
              >
                <p className="text-2xl md:text-4xl font-normal text-[#0f172a] dark:text-white tracking-tighter group-hover:text-[#FF4800] transition-colors duration-500 text-center">
                  <AnimatedStatValue stat={s} />
                </p>
                <p className="text-[10px] text-[#666] uppercase tracking-widest mt-2 text-center">{s.label}</p>
              </motion.div>

              <div className="relative">
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.1 + 0.2, ease }}
                  style={{
                    originY: 1,
                    background: 'linear-gradient(to bottom, #FF4800 0%, rgba(255,72,0,0.5) 50%, transparent 100%)',
                    boxShadow: '0 0 8px 1px rgba(255,72,0,0.35)',
                  }}
                  className={`w-[2px] ${s.barClass} group-hover:w-[3px] transition-all duration-500`}
                />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FF4800] rounded-full blur-[3px] opacity-60 group-hover:opacity-100 group-hover:blur-[5px] transition-all duration-500" />
              </div>
            </div>
          ))}
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

function PrinciplesSection() {
  return (
    <section className="bg-white dark:bg-[#0a0a14] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative pl-8 mb-10 md:mb-16">
          <div className="absolute left-0 top-0 h-full w-[2px] bg-[#FF4800]" />
          <h2 className="masked-title text-3xl md:text-4xl font-normal uppercase tracking-[-1.5px]">Our operating principles.</h2>
        </div>
        <HorizontalCarousel cols={3} size="md">
          {principles.map((p, i) => (
            <motion.div key={i} {...fadeUp} className="group glass-card p-6 md:p-10 rounded-2xl hover:border-[#FF4800]/20 transition-all active:scale-95 h-full">
              <h4 className="text-[#1a1a2e] dark:text-white text-lg md:text-xl font-bold mb-3 md:mb-4 tracking-tight">{p.title}</h4>
              <p className="text-[#475569] dark:text-[#8a8a8a] text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </HorizontalCarousel>
      </div>
    </section>
  );
}



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
    <section className="bg-white dark:bg-[#0a0a14] py-16 md:py-24 border-y border-black/5 dark:border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        <motion.div {...fadeUp} className="mb-14 md:mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-[1px] w-6 bg-[#FF4800]" />
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#FF4800]">Our Story</span>
            <span className="h-[1px] w-6 bg-[#FF4800]" />
          </div>

          <h2 className="font-black uppercase leading-[0.95] mx-auto text-[#1a1a2e] dark:text-white"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.5rem)', letterSpacing: '-3px' }}>
            Two Paths.
            <br />
            <span style={{ color: '#FF4800' }}>One Choice.</span>
          </h2>

          <div className="mx-auto mt-6 mb-8 h-[3px] w-20 rounded-full" style={{ background: 'linear-gradient(90deg, #FF4800, rgba(255,72,0,0.2))' }} />

          <p className="text-[#475569] dark:text-[#9ca3af] text-[15px] md:text-[16px] leading-[1.75] max-w-2xl mx-auto">
            Every growing company eventually hits the same wall. Too many tools. Spreadsheets that don&apos;t sync. Your best people spending Friday afternoons doing work that shouldn&apos;t exist. You don&apos;t need another vendor; you need someone who actually understands the problem.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease }}
            className="glass-card relative rounded-2xl overflow-hidden p-7 md:p-9 flex flex-col"
          >
            <div className="mb-6">
              <span className="inline-block text-[8px] font-bold uppercase tracking-[0.4em] text-[#FF4800]/60 border border-[#FF4800]/20 px-2.5 py-1 rounded-full mb-3">
                The Old Way
              </span>
              <h3 className="text-lg font-bold uppercase tracking-tight text-[#1a1a2e]/70 dark:text-white/60">Chaos</h3>
            </div>

            <div className="space-y-5 flex-1">
              {chaosItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3 opacity-50 hover:opacity-100 transition-opacity">
                  <span className="mt-[5px] w-1.5 h-1.5 rounded-full border border-[#FF4800]/40 shrink-0" />
                  <span className="text-[13px] leading-snug text-[#1a1a2e] dark:text-white">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15, ease }}
            className="glass-card relative rounded-2xl overflow-hidden p-7 md:p-9 flex flex-col border-[#FF4800]/20"
            style={{ background: 'rgba(255,72,0,0.05)' }}
          >
            <div className="mb-6">
              <span className="inline-block text-[8px] font-bold uppercase tracking-[0.4em] text-[#FF4800] bg-[#FF4800]/15 px-2.5 py-1 rounded-full mb-3">
                The Straveda Way
              </span>
              <h3 className="text-lg font-bold uppercase tracking-tight text-[#1a1a2e] dark:text-white">Structure</h3>
            </div>

            <div className="space-y-5 flex-1">
              {clarityItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={14} className="mt-[2px] text-[#FF4800] shrink-0" />
                  <span className="text-[13px] font-medium leading-snug text-[#1a1a2e] dark:text-white/90">{item}</span>
                </div>
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
  }
];

function ResultsSection() {
  return (
    <section className="bg-white dark:bg-[#0a0a14] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative pl-8 mb-10 md:mb-16">
          <div className="absolute left-0 top-0 h-full w-[2px] bg-[#FF4800]" />
          <h2 className="masked-title text-3xl md:text-4xl font-normal uppercase tracking-[-1.5px]">Results that speak.</h2>
        </div>
        <HorizontalCarousel cols={3} size="md" autoScrollInterval={3000}>
          {testimonials.map((t, i) => (
            <div key={i} className="flex flex-col glass-card rounded-2xl p-6 md:p-8 h-full active:scale-95 transition-transform">
              <p className="text-[#475569] dark:text-[#9ca3af] text-base md:text-lg italic leading-relaxed mb-8 flex-grow">&ldquo;{t.quote}&rdquo;</p>
              <div className="border-t border-black/5 dark:border-white/5 pt-6">
                <p className="text-[#FF4800] text-[10px] font-bold uppercase tracking-widest mb-1">{t.impact}</p>
                <p className="text-[#1a1a2e] dark:text-white text-xs font-medium uppercase tracking-widest opacity-60">— {t.role}, {t.company}</p>
              </div>
            </div>
          ))}
        </HorizontalCarousel>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* 6. Work With Us Section                                                 */
/* ─────────────────────────────────────────────────────────────────────── */

const roadmap = [
  { step: "01", title: "Book a Strategy Call", meta: "30 min, free", desc: "We audit your operations and biggest bottlenecks, recommend what to build first.", cta: "Book Now" },
  { step: "02", title: "Get a Custom Proposal", meta: "48 hours", desc: "Fixed Price quote for your project. Timeline and success metrics included.", cta: "Request Proposal" },
  { step: "03", title: "Start Building", meta: "4–6 weeks", desc: "Weekly sprints with visible progress. Go live and reclaim your time.", cta: "Book a Strategy Call" },
];

function WorkWithUsSection({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <section className="relative bg-white dark:bg-[#0a0a14] py-16 md:py-24 border-t border-black/5 dark:border-white/5 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="masked-title text-3xl md:text-4xl font-normal uppercase tracking-tighter mb-10 md:mb-16">Let's build something that matters.</h2>
        <div className="flex flex-col gap-12 md:gap-16 mb-16 md:mb-20">
          {roadmap.map((r, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              className="flex flex-col items-start"
            >
              <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <h4 className="text-[#1a1a2e] dark:text-white text-xl md:text-2xl font-bold">{r.title}</h4>
                <span className="text-[10px] font-bold uppercase text-[#FF4800] bg-[#FF4800]/10 px-3 py-1 rounded-full">{r.meta}</span>
              </div>
              <p className="text-[#475569] dark:text-[#8a8a8a] text-base leading-relaxed max-w-2xl mb-6">{r.desc}</p>
              {r.cta && (
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-[#FF4800] text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#e03f00] transition-colors"
                >
                  {r.cta} →
                </button>
              )}
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <MagneticButton>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#FF4800] text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-[#e03f00] transition-colors"
            >
              Consult Now →
            </button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a14]">
      <style>{STYLES}</style>
      <StatsSectionNew />
      <StatsSection />
      <StorySection />
      <PrinciplesSection />
      <ResultsSection />
      <WorkWithUsSection onNavigate={onNavigate} />
    </main>
  );
}