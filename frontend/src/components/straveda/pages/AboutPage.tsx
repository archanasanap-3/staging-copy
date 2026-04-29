'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import StatsSectionNew from '@/components/straveda/StatsSection';
import {
  ArrowRight, Zap, Lock, Clock, Eye, TrendingUp, Users,
  Quote, CheckCircle2
} from 'lucide-react';
import MagneticButton from '@/components/straveda/MagneticButton';
import HorizontalCarousel from '@/components/straveda/HorizontalCarousel';

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
  return (
    <section className="relative bg-[#f5f5f0] dark:bg-[#030303] pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div {...fadeUp}>
          <div className="relative pl-8 md:pl-14">
            <div className="absolute left-0 top-0 h-full w-[3px] rounded-full" style={{ background: 'linear-gradient(180deg, #FF4800 0%, rgba(255,72,0,0.15) 100%)' }} />
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FF4800]">
                About Straveda — Pune, India
              </span>
            </div>
            <h1 className="font-bold uppercase" style={{ fontSize: 'clamp(2.2rem, 7vw, 5rem)', lineHeight: 1.05, letterSpacing: '-2.05px' }}>
              <span className="text-[#1a1a2e] dark:text-white">We Get It.</span><br />
              <span className="text-[#1a1a2e] dark:text-white">Because </span>
              <span style={{ color: '#FF4800' }}>We've Lived It.</span>
            </h1>
            <p className="mt-6 md:mt-8 text-base md:text-[17px] text-[#666] dark:text-[#9ca3af] max-w-2xl leading-relaxed">
              A small team of operators and builders who've been through the chaos of scaling.
              We've felt the frustration of bloated software, long implementation timelines, and vendors who don't understand your business.
              So we built Straveda as the antidote.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* 2. Our Story — Compact Narrative & Side-by-Side Cards                  */
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
    <section className="bg-[#f5f5f0] dark:bg-[#030303] py-24 md:py-36 border-y border-black/5 dark:border-white/5 relative overflow-hidden">
      {/* Grid Background Overlay */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none
        [background-image:linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)]
        dark:[background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)]
        [background-size:50px_50px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* TOP: Section Header */}
        <motion.div {...fadeUp} className="mb-14 md:mb-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-[1px] w-6 bg-[#FF4800]" />
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#FF4800]">Our Story</span>
            <span className="h-[1px] w-6 bg-[#FF4800]" />
          </div>

          {/* Big highlighted heading */}
          <h2 className="font-black uppercase leading-[0.95] mx-auto"
            style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', letterSpacing: '-3px' }}>
            <span className="block text-[#1a1a2e] dark:text-white">Two Paths.</span>
            <span className="block" style={{ color: '#FF4800', textShadow: '0 0 80px rgba(255,72,0,0.25)' }}>One Choice.</span>
          </h2>

          {/* Accent line under heading */}
          <div className="mx-auto mt-6 mb-8 h-[3px] w-20 rounded-full" style={{ background: 'linear-gradient(90deg, #FF4800, rgba(255,72,0,0.2))' }} />

          <p className="text-[#888] dark:text-[#9ca3af] text-[15px] md:text-[16px] leading-[1.75] max-w-2xl mx-auto">
            Every growing company eventually hits the same wall. Too many tools. Spreadsheets that don&apos;t sync. Your best people spending Friday afternoons doing work that shouldn&apos;t exist. You don&apos;t need another vendor; you need someone who actually understands the problem. We do. We&apos;ve built companies. We&apos;ve felt the frustration of paying for five tools when you really need one well designed system that your team understands. That&apos;s why Straveda is different building AI powered systems that replace chaos with structure.
          </p>
        </motion.div>

        {/* BOTTOM: Side-by-Side Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

          {/* Chaos Card (The Old Way) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease }}
            className="glass-card relative rounded-2xl overflow-hidden p-7 md:p-9 flex flex-col"
          >
            <div className="mb-6">
              <span className="inline-block text-[8px] font-bold uppercase tracking-[0.4em] text-[#FF4800]/60 border border-[#FF4800]/20 px-2.5 py-1 rounded-full mb-3">
                The Old Way
              </span>
              <h3 className="text-lg font-bold uppercase tracking-tight text-black/70 dark:text-white/60">Chaos</h3>
            </div>

            <div className="space-y-5 flex-1">
              {chaosItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3 opacity-50 hover:opacity-100 transition-opacity">
                  <span className="mt-[5px] w-1.5 h-1.5 rounded-full border border-[#FF4800]/40 shrink-0" />
                  <span className="text-[13px] leading-snug text-black dark:text-white">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Structure Card (The Straveda Way) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15, ease }}
            className="glass-card relative rounded-2xl overflow-hidden p-7 md:p-9 shadow-[0_15px_40px_rgba(255,72,0,0.08)] flex flex-col"
            style={{ background: 'rgba(255,72,0,0.05)', backdropFilter: 'blur(18px) saturate(1.6)', WebkitBackdropFilter: 'blur(18px) saturate(1.6)', border: '1px solid rgba(255,72,0,0.25)' }}
          >
            <div className="mb-6">
              <span className="inline-block text-[8px] font-bold uppercase tracking-[0.4em] text-[#FF4800] bg-[#FF4800]/15 px-2.5 py-1 rounded-full mb-3">
                The Straveda Way
              </span>
              <h3 className="text-lg font-bold uppercase tracking-tight text-black dark:text-white">Structure</h3>
            </div>

            <div className="space-y-5 flex-1">
              {clarityItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={14} className="mt-[2px] text-[#FF4800] shrink-0" />
                  <span className="text-[13px] font-medium leading-snug text-black dark:text-white/90">{item}</span>
                </div>
              ))}
            </div>

            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#FF4800]/15 blur-3xl rounded-full" />
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

function PrinciplesSection() {
  return (
    <section className="bg-[#fcfcf7] dark:bg-[#030303] py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative pl-8 mb-10 md:mb-20">
          <div className="absolute left-0 top-0 h-full w-[2px] bg-[#FF4800]" />
          <h2 className="masked-title text-3xl md:text-4xl font-normal uppercase tracking-[-1.5px]">Our operating principles.</h2>
        </div>
        <HorizontalCarousel cols={3} size="md">
          {principles.map((p, i) => (
            <motion.div key={i} {...fadeUp} className="group glass-card p-6 md:p-10 rounded-2xl hover:border-[#FF4800]/20 transition-all active:scale-95 h-full">
              <div className="text-[#FF4800] mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500">{p.icon}</div>
              <h4 className="text-black dark:text-white text-lg md:text-xl font-bold mb-3 md:mb-4 tracking-tight">{p.title}</h4>
              <p className="text-[#666] dark:text-[#8a8a8a] text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </HorizontalCarousel>
      </div>
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
    <section className="bg-[#030303] py-16 md:py-32 overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10 md:mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FF4800] mb-4 block">
            By The Numbers
          </span>
          <h2 className="text-white text-xl md:text-2xl font-normal tracking-tighter uppercase">
            Measurable Operational Impact
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 items-end border-b border-white/5 pb-1">
          {stats.map((s, i) => (
            <div key={i} className="relative group flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease }}
                className="mb-4 md:mb-5"
              >
                <p className="text-2xl md:text-4xl font-normal text-white tracking-tighter group-hover:text-[#FF4800] transition-colors duration-500 text-center">
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
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-[#555] gap-3 md:gap-0">
          <p>Typical Client Size: <span className="text-[#888]">₹1Cr–₹50Cr Annual Revenue</span></p>
          <p>Location: <span className="text-[#888]">Pune, Maharashtra</span></p>
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
    <section className="bg-white dark:bg-[#030303] py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative pl-8 mb-10 md:mb-20">
          <div className="absolute left-0 top-0 h-full w-[2px] bg-[#FF4800]" />
          <h2 className="masked-title text-3xl md:text-4xl font-normal uppercase tracking-[-1.5px]">Results that speak.</h2>
        </div>
        <HorizontalCarousel cols={3} size="md">
          {testimonials.map((t, i) => (
            <div key={i} className="flex flex-col glass-card rounded-2xl p-6 md:p-8 h-full active:scale-95 transition-transform">
              <Quote className="text-[#FF4800]/20 mb-6" size={36} />
              <p className="text-[#555] dark:text-[#9ca3af] text-base md:text-lg italic leading-relaxed mb-8 flex-grow">&ldquo;{t.quote}&rdquo;</p>
              <div className="border-t border-black/5 dark:border-white/5 pt-6">
                <p className="text-[#FF4800] text-[10px] font-bold uppercase tracking-widest mb-1">{t.impact}</p>
                <p className="text-black dark:text-white text-xs font-medium uppercase tracking-widest opacity-60">— {t.role}, {t.company}</p>
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
    <section className="relative bg-[#fcfcf7] dark:bg-[#030303] py-16 md:py-32 border-t border-black/5 dark:border-white/5 overflow-hidden">
      {/* Background blobs — give backdrop-blur something to work against */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#FF4800]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-orange-100/60 dark:bg-orange-900/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#FF4800]/8 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="masked-title text-3xl md:text-4xl font-normal uppercase tracking-tighter mb-10 md:mb-20">Let's build something that matters.</h2>
        <HorizontalCarousel cols={3} size="md" className="mb-12 md:mb-20">
          {roadmap.map((r, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              className="flex flex-col p-6 md:p-10 rounded-3xl border border-white/80 dark:border-white/10 bg-white/50 dark:bg-white/[0.04] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.06),0_1px_2px_rgba(255,255,255,0.8)_inset] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] active:scale-95 transition-transform h-full"
            >
              <div className="flex justify-end items-start mb-8 md:mb-10">
                <span className="text-[10px] font-bold uppercase text-[#FF4800] bg-[#FF4800]/10 px-3 py-1 rounded-full">{r.meta}</span>
              </div>
              <h4 className="text-black dark:text-white text-lg md:text-xl font-normal mb-3 md:mb-4">{r.title}</h4>
              <p className="text-[#666] dark:text-[#8a8a8a] text-sm leading-relaxed flex-grow">{r.desc}</p>
              {r.cta && (
                <button
                  onClick={() => onNavigate('contact')}
                  className="mt-6 md:mt-8 self-start bg-[#FF4800] text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#e03f00] transition-colors"
                >
                  {r.cta} →
                </button>
              )}
            </motion.div>
          ))}
        </HorizontalCarousel>
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
    <main className="min-h-screen bg-[#f5f5f0] dark:bg-[#030303]">
      <style>{STYLES}</style>
      <HeroSection />
      <StorySection />
      <PrinciplesSection />
      <StatsSectionNew />
      <StatsSection />
      <ResultsSection />
      <WorkWithUsSection onNavigate={onNavigate} />
    </main>
  );
}