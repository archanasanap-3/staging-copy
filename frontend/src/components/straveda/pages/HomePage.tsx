'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  Star,
  ArrowRight,
  Shield,
  Activity,
  Cloud,
  Brain,
  Globe,
  Plus,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import AnimatedHero from '@/components/straveda/AnimatedHero';
import SubscribeSection from '@/components/straveda/SubscribeSection';
import WaveDivider from '@/components/straveda/WaveDivider';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const ease = [0.4, 0, 0.2, 1] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const bentoItems: { title: string; description: string; size: 'large' | 'normal'; icon: LucideIcon }[] = [
  { title: "Weekly Shipping, Not Quarterly Roadmaps", description: "One week sprints with public progress logs. You see builds every Friday, approve Monday, ship Tuesday. No black box discovery phases that last three months.", size: "large", icon: Activity },
  { title: "Automation First, Always", description: "Before we build feature one, we audit what can be removed, integrated, or automated. Most agencies pad scope. We prune it then automate what's left.", size: "normal", icon: Brain },
  { title: "You Own Everything", description: "Full code ownership. Complete documentation. Zero vendor lock in. If we disappear tomorrow, you can run and maintain every system we built. That's non negotiable.", size: "normal", icon: Shield },
  { title: "Priced to ROI in 60 Days", description: "Every proposal includes projected time savings, cost reduction, or revenue lift. If a system doesn't pay for itself in one quarter, we don't recommend building it.", size: "normal", icon: Globe },
  { title: "One Team, End to End", description: "Strategy, AI engineering, design, and deployment under one roof. One Slack channel. One point of accountability. No vendor chains. No handoff loss.", size: "normal", icon: Cloud },
  { title: "Senior Execution", description: "We cap engagements each quarter so we can ship fast and stay accountable. You get senior attention on every build not a deck from partners and delivery from juniors.", size: "normal", icon: Users },
];

// ─── Services Data ────────────────────────────────────────────────────────────

interface ServiceItem {
  badge: string;
  title: string;
  bullets: string[];
  metric?: string;
  ctaLabel: string;
  ctaDesc: string;
}

const services: ServiceItem[] = [
  {
    badge: 'Automation',
    title: 'AI & Business Automation',
    bullets: [
      'WhatsApp flows that qualify leads and drive conversions',
      'Behavior Triggered email sequences for engagement and retention',
      'AI agents handling tier 1 customer support',
      'Workflow automation reducing manual operational load',
    ],
    metric: '30 to 60% reduction in manual operations within the first 90 days',
    ctaLabel: 'See automation',
    ctaDesc: 'Book a free strategy call',
  },
  {
    badge: 'Software',
    title: 'Custom Software & Systems',
    bullets: [
      'AI powered CRMs designed for real team adoption',
      'Real time dashboards replacing fragmented monitoring tools',
      'Internal systems built around your workflows (not rigid SaaS tools)',
      'Centralized data systems for better decision making',
    ],
    ctaLabel: 'Explore custom',
    ctaDesc: 'Built around your workflow',
  },
  {
    badge: 'Strategy',
    title: 'AI Strategy & Integration',
    bullets: [
      'Deployment of GPT Class models and advanced AI APIs',
      'Custom LLM integration tailored to business workflows',
      'End To End AI architecture, training, and deployment',
      'Seamless integration into your existing tech stack',
    ],
    ctaLabel: 'Talk AI strategy',
    ctaDesc: 'Embedded in your operations',
  },
  {
    badge: 'Digital',
    title: 'Web Development & 3D Experiences',
    bullets: [
      'High Performance websites built using modern frameworks (e.g., Next.js)',
      '3D interactive experiences for premium brand differentiation',
      'Conversion Focused landing pages (not just visual design)',
      'Fast loading, SEO Ready, Edge Deployed architecture',
    ],
    metric: '2 to 4x improvement in conversion rates compared to Template Based sites',
    ctaLabel: 'View web capabilities',
    ctaDesc: 'Edge Deployed, conversion first',
  },
];

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({ service, onNavigate, isDark }: { service: ServiceItem; onNavigate: (page: string) => void; isDark: boolean }) {
  const bg     = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.70)';
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';
  const shadow = isDark ? '0 4px 24px rgba(0,0,0,0.30)' : '0 4px 24px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)';

  return (
    <div
      className="svc-card relative flex h-full flex-col overflow-hidden rounded-[24px]"
      style={{
        background: bg,
        backdropFilter: 'blur(16px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(16px) saturate(1.8)',
        border: `1px solid ${border}`,
        boxShadow: shadow,
        transition: 'box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease',
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(-6px)';
        el.style.borderColor = 'rgba(255,72,0,0.22)';
        el.style.boxShadow = isDark
          ? '0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,72,0,0.18)'
          : '0 8px 32px rgba(0,0,0,0.09), 0 0 0 1px rgba(255,72,0,0.14), 0 20px 40px rgba(255,72,0,0.08)';
        const glow = el.querySelector('.svc-glow') as HTMLElement | null;
        if (glow) glow.style.opacity = '1';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = '';
        el.style.borderColor = border;
        el.style.boxShadow = shadow;
        const glow = el.querySelector('.svc-glow') as HTMLElement | null;
        if (glow) glow.style.opacity = '0';
      }}
    >
      {/* Top glow line */}
      <div className="svc-glow pointer-events-none absolute inset-x-[10%] top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,72,0,0.6), transparent)', opacity: 0, transition: 'opacity 0.3s ease' }} />

      {/* Badge + Title */}
      <div className="flex min-h-[128px] flex-col justify-start p-[26px] pb-0">
        <span className="mb-[14px] w-fit rounded-full px-[11px] py-[4px] text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: '#FF4800', background: 'rgba(255,72,0,0.09)', border: '1px solid rgba(255,72,0,0.15)' }}>
          {service.badge}
        </span>
        <h3 className="text-[21px] font-bold leading-[1.2] tracking-[-0.035em] text-gray-900 dark:text-white">
          {service.title}
        </h3>
      </div>

      {/* Divider */}
      <div className="mx-[26px] my-[20px] h-px" style={{ background: isDark ? 'rgba(255,255,255,0.07)' : 'linear-gradient(90deg, rgba(0,0,0,0.06), rgba(0,0,0,0.03), rgba(0,0,0,0.06))' }} />

      {/* Bullet list */}
      <div className="flex-1 px-[26px]">
        <ul className="flex flex-col gap-[11px]">
          {service.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-[10px] text-[13.5px] font-normal leading-[1.5] text-gray-700 dark:text-gray-300">
              <span className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: '#FF4800', boxShadow: '0 0 4px rgba(255,72,0,0.4)' }} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Metric or invisible spacer */}
      {service.metric ? (
        <div className="mx-[26px] mt-[20px] rounded-[10px] px-[14px] py-[11px]" style={{ background: 'rgba(255,72,0,0.07)', border: '1px solid rgba(255,72,0,0.13)', minHeight: '62px', display: 'flex', alignItems: 'flex-start' }}>
          <p className="text-[12px] font-semibold leading-[1.55]" style={{ color: '#FF4800' }}>→ {service.metric}</p>
        </div>
      ) : (
        <div className="mx-[26px] mt-[20px] px-[14px] py-[11px] invisible" aria-hidden="true" style={{ minHeight: '62px', display: 'flex', alignItems: 'flex-start' }}>
          <p className="text-[12px] leading-[1.55]">30–60% reduction in manual operations within the first 90 days</p>
        </div>
      )}

      {/* Orange footer strip */}
      <div className="relative mt-[20px] flex items-center justify-between gap-3 px-[26px] pb-[22px] pt-[18px]" style={{ background: 'linear-gradient(135deg, rgba(255,72,0,0.18) 0%, rgba(255,72,0,0.11) 60%, rgba(255,72,0,0.07) 100%)', borderTop: '1px solid rgba(255,72,0,0.12)' }}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,72,0,0.35), transparent)' }} />
        <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <span className="whitespace-nowrap text-[12.5px] font-bold tracking-[0.01em]" style={{ color: '#FF4800' }}>{service.ctaLabel} →</span>
          <span className="text-[11.5px] font-medium leading-[1.3]" style={{ color: 'rgba(255,72,0,0.75)' }}>{service.ctaDesc}</span>
        </div>
        <button
          onClick={() => onNavigate('services')}
          aria-label={service.ctaLabel}
          className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full transition-all duration-200"
          style={{ background: '#FF4800', boxShadow: '0 4px 12px rgba(255,72,0,0.35)' }}
          onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#e03e00'; b.style.transform = 'scale(1.1) translateX(1px)'; b.style.boxShadow = '0 6px 20px rgba(255,72,0,0.45)'; }}
          onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#FF4800'; b.style.transform = ''; b.style.boxShadow = '0 4px 12px rgba(255,72,0,0.35)'; }}
        >
          <ArrowRight size={14} color="#fff" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}


// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    name: 'Rachel M.',
    role: 'Director of Operations',
    company: 'Professional Services',
    quote: 'We had too many manual processes before working with Straveda Tech. Their business process automation streamlined our workflows and reporting. Now everything runs faster with fewer errors and much better visibility.',
    stars: 5,
  },
];

function getInitials(name: string): string {
  return name.split(' ').map((n) => n.charAt(0)).join('').toUpperCase();
}

function TestimonialsCarousel() {
  const t = testimonials[0];
  return (
    <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0e0c1c 0%, #1a1535 50%, #0e0c1c 100%)' }}>
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: '700px', height: '400px', background: 'radial-gradient(ellipse at center, rgba(255,72,0,0.10) 0%, rgba(255,72,0,0.03) 40%, transparent 70%)' }} />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,72,0,0.4) 50%, transparent)' }} />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease }} className="mb-6 text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#FF4800' }}>Client Feedback</motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, delay: 0.1, ease }} className="mb-6 flex items-center justify-center gap-1">
          {[...Array(t.stars)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" style={{ color: '#FBBF24' }} />)}
        </motion.div>
        <motion.span initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, delay: 0.15, ease }} className="block leading-none mb-2" style={{ fontSize: '64px', color: '#FF4800', opacity: 0.6 }}>&#x275D;</motion.span>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: 0.2, ease }} className="text-[clamp(1.1rem,2.5vw,1.45rem)] italic leading-[1.75] font-light" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.quote}</motion.p>
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay: 0.35, ease: [0.4, 0, 0.2, 1] }} className="mx-auto my-8" style={{ width: '48px', height: '1px', background: 'rgba(255,72,0,0.6)', transformOrigin: 'center' }} />
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.4, ease }} className="flex items-center justify-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #FF4800 0%, #2B2358 100%)' }}>{getInitials(t.name)}</div>
          <div className="text-left">
            <p className="text-[14px] font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>{t.name}</p>
            <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{t.role}{t.company && <span> · <span style={{ color: 'rgba(255,72,0,0.8)' }}>{t.company}</span></span>}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faqs = [
  { question: 'What services does Straveda Tech offer?', answer: 'We provide AI automation, custom software development, cloud & DevOps, cybersecurity, and data analytics solutions built to reduce manual work and scale your operations.' },
  { question: 'How can AI automation benefit my business?', answer: 'AI automation reduces repetitive tasks, lowers costs, and improves decision making. Common use cases include lead qualification, customer support, and workflow automation.' },
  { question: 'Do you build custom solutions or use ready made tools?', answer: 'We build fully custom solutions tailored to your workflows, goals, and scalability needs — ensuring better performance and long term ROI.' },
  { question: 'How long does a project take?', answer: 'Small systems: 1 to 2 weeks. Medium projects: 3 to 5 weeks. Large solutions: 6 to 9+ weeks. We follow a structured process from planning to deployment.' },
  { question: 'Is AI automation suitable for startups?', answer: 'Yes. Startups use it to scale faster, while enterprises use it to optimize operations. We tailor solutions to your growth stage.' },
  { question: 'How secure are your solutions?', answer: 'We follow industry standards like GDPR, ISO, SOC2, and HIPAA to ensure strong data protection and system security.' },
  { question: 'Do you provide post launch support?', answer: 'Yes. We offer ongoing maintenance, optimization, and upgrades to keep your system aligned with business growth.' },
  { question: 'Can you integrate with existing tools?', answer: 'Yes. We integrate with CRMs, ERPs, payment systems, and third party APIs without disrupting your current setup.' },
  { question: 'Which industries do you work with?', answer: 'We serve healthcare, finance, retail, manufacturing, education, and tech startups.' },
  { question: 'What makes Straveda Tech different?', answer: 'We focus on outcomes not just development. Our approach is AI First, fully custom, and built for scalability and ROI.' },
  { question: 'How do I get started?', answer: 'Share your requirements → Get a tailored strategy → Start with a clear execution roadmap. Book a 30 Min call and we\'ll send a proposal within 48 hours.' },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index);
  return (
    <section id="section-faq" className="glow-hover py-24 bg-white dark:bg-[#0a0a14] border-t border-black/[0.06] dark:border-white/[0.06]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease }} className="mb-14 text-center">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>FREQUENTLY ASKED QUESTIONS</p>
          <div className="flex items-start gap-5 justify-center">
            <div className="mt-2 hidden lg:block flex-shrink-0 w-1 rounded-full" style={{ height: '52px', background: 'linear-gradient(180deg, #FF4800 0%, rgba(255,72,0,0.15) 100%)' }} />
            <h2 className="font-normal heading-gradient text-[clamp(2rem,5vw,3.5rem)]" style={{ lineHeight: 1.0, letterSpacing: '-2.05px' }}>Questions? Here's what teams ask first.</h2>
          </div>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }} className="overflow-hidden" style={{ borderLeft: openIndex === index ? '3px solid #FF4800' : '3px solid transparent', transition: 'border-color 0.3s ease' }}>
              <button data-magnetic onClick={() => toggle(index)} className="flex w-full items-center justify-between px-5 py-5 text-left transition-colors duration-200 border-b border-black/[0.06] dark:border-white/[0.06] hover:bg-[rgba(255,72,0,0.02)] dark:hover:bg-white/[0.03]" aria-expanded={openIndex === index}>
                <span className="pr-4 text-[16px] font-medium text-[#1a1a2e] dark:text-[#e5e7eb]">{faq.question}</span>
                <motion.span animate={{ rotate: openIndex === index ? 45 : 0 }} transition={{ duration: 0.3, ease }} className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${openIndex === index ? 'bg-[#FF4800] text-white' : 'bg-black/[0.04] dark:bg-white/[0.06] text-[#6b7280] dark:text-[#9ca3af]'}`}><Plus className="h-4 w-4" /></motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease }} style={{ overflow: 'hidden' }}>
                    <p className="px-5 pb-5 text-[15px] leading-[1.5] text-[#6b7280] dark:text-[#9ca3af]">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage({ onNavigate }: HomePageProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const capScrollRef = useRef<HTMLDivElement>(null);
  const [capActiveIdx, setCapActiveIdx] = useState(0);

  const handleCapScroll = () => {
    const el = capScrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / bentoItems.length;
    setCapActiveIdx(Math.round(el.scrollLeft / cardWidth));
  };

  const scrollCapTo = (i: number) => {
    const el = capScrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / bentoItems.length;
    el.scrollTo({ left: cardWidth * i, behavior: 'smooth' });
  };

  return (
    <div className="overflow-x-hidden w-full">
<style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ── Hero ── */}
      <div id="section-hero">
        <AnimatedHero onNavigate={onNavigate} />
      </div>

      {/* ── Honest Proof Strip ── */}
      <motion.section id="section-partners" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease }} className="py-14 md:py-24 bg-white dark:bg-[#0a0a14] relative border-t border-black/[0.06] dark:border-white/[0.06] overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>Where we stand</p>
          <div className="flex items-start gap-5 justify-center">
            <div className="mt-2 hidden lg:block flex-shrink-0 w-1 rounded-full" style={{ height: '52px', background: 'linear-gradient(180deg, #FF4800 0%, rgba(255,72,0,0.15) 100%)' }} />
            <h2 className="font-normal heading-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-1.5px', overflowWrap: 'break-word', wordBreak: 'break-word' }}>A Strong Foundation for Scalable Growth.</h2>
          </div>
          <p className="mt-4 text-[16px] leading-[1.7] text-[#6b7280] dark:text-[#9ca3af] max-w-2xl mx-auto">We take on a limited number of engagements each quarter so we can ship fast and stay accountable. Our current clients are in D2C, B2B SaaS, and professional services.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {[{ label: 'Fixed price after discovery', icon: '✓' }, { label: 'Weekly progress updates', icon: '✓' }, { label: 'Full code ownership', icon: '✓' }, { label: 'No long term lock in', icon: '✓' }].map((item) => (
              <div key={item.label} className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: 'rgba(255,72,0,0.06)', border: '1px solid rgba(255,72,0,0.12)' }}>
                <span className="text-[13px] font-semibold" style={{ color: '#FF4800' }}>{item.icon}</span>
                <span className="text-[13px] font-medium text-[#6b7280] dark:text-[#9ca3af]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Technology Partners ── */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease }} className="py-14 md:py-20 bg-white dark:bg-[#0a0a14] border-t border-black/[0.06] dark:border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-start gap-5 mb-3">
              <div className="mt-2 hidden lg:block flex-shrink-0 w-1 rounded-full" style={{ height: '52px', background: 'linear-gradient(180deg, #FF4800 0%, rgba(255,72,0,0.15) 100%)' }} />
              <h2 className="font-normal heading-gradient" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.1, letterSpacing: '-1.5px', overflowWrap: 'break-word' }}>Built on enterprise grade infrastructure</h2>
            </div>
            <p className="text-[15px] leading-[1.65] text-[#6b7280] dark:text-[#9ca3af] max-w-lg lg:ml-6">We use proven, scalable technologies not experimental tools. Your systems will be maintainable and upgradeable for years.</p>
            <div className="mt-6 h-px" style={{ width: 'min(340px, 50%)', background: 'linear-gradient(to right, #FF4800, rgba(255,72,0,0.15))' }} />
          </div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { name: 'AWS', brandColor: '#FF9900', src: '/logos/aws.png', w: 80, h: 40 },
              { name: 'Google Cloud', brandColor: '#4285F4', src: '/logos/gcp.png', w: 100, h: 40 },
              { name: 'Docker', brandColor: '#2496ED', src: '/logos/docker.png', w: 90, h: 40 },
              { name: 'Microsoft Azure', brandColor: '#0078D4', src: '/logos/azure.png', w: 90, h: 40 },
              { name: 'Vercel', brandColor: '#000000', src: '/logos/vercel.png', w: 90, h: 40 },
              { name: 'PostgreSQL', brandColor: '#336791', src: '/logos/postgresql.jpg', w: 90, h: 40 },
              { name: 'Next.js', brandColor: '#000000', src: '/logos/nextjs.svg', w: 90, h: 40 },
            ].map((partner) => (
              <motion.div key={partner.name} variants={cardVariants} whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.25, ease }} className="group relative flex flex-col items-center justify-center gap-3 rounded-xl px-6 py-6 overflow-hidden cursor-default" style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.75)', backdropFilter: 'blur(20px) saturate(1.8) brightness(1.02)', WebkitBackdropFilter: 'blur(20px) saturate(1.8) brightness(1.02)', border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1.5px solid rgba(255,255,255,0.9)', boxShadow: isDark ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.45)' : 'inset 0 2px 0 rgba(255,255,255,0.95), 0 8px 24px rgba(0,0,0,0.08)', transition: 'border-color 0.3s ease, box-shadow 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${partner.brandColor}88`; e.currentTarget.style.boxShadow = isDark ? `inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 40px ${partner.brandColor}22` : `inset 0 2px 0 rgba(255,255,255,0.95), 0 12px 40px ${partner.brandColor}22`; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.9)'; e.currentTarget.style.boxShadow = isDark ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.45)' : 'inset 0 2px 0 rgba(255,255,255,0.95), 0 8px 24px rgba(0,0,0,0.08)'; }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" style={{ backgroundColor: partner.brandColor }} />
                <div className="relative h-10 w-full grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                  <Image src={partner.src} alt={partner.name} fill sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 14vw" className="object-contain" />
                </div>
                <span className="relative text-[11px] font-medium tracking-wide text-[#9ca3af] dark:text-[#6b7280]">{partner.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SECTION — SERVICES GRID (Glass Cards — updated design)        */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section
        id="section-services"
        className="py-12 md:py-24 px-4 sm:px-6 section-glow-top"
        style={{
          background: isDark
            ? `radial-gradient(at 15% 80%, rgba(255,72,0,0.06) 0%, transparent 50%),
               radial-gradient(at 85% 15%, rgba(43,35,88,0.08) 0%, transparent 50%),
               #0a0a14`
            : `radial-gradient(at 15% 80%, rgba(255,72,0,0.09) 0%, transparent 50%),
               radial-gradient(at 85% 15%, rgba(43,35,88,0.10) 0%, transparent 50%),
               radial-gradient(at 50% 50%, rgba(255,72,0,0.04) 0%, transparent 60%),
               #e8e8f0`,
          borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div className="mx-auto max-w-[1280px]">
          {/* Header — Straveda Standard */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="mb-8 md:mb-14"
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: '#FF4800' }}>WHAT WE BUILD</p>
            <div className="flex items-start gap-5">
              <div className="mt-1 hidden lg:block flex-shrink-0 rounded-full" style={{ width: '3px', height: '52px', background: 'linear-gradient(180deg, #FF4800 0%, rgba(255,72,0,0.15) 100%)' }} />
              <h2 className="font-normal heading-gradient" style={{ fontSize: 'clamp(1.6rem, 5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-1px', overflowWrap: 'break-word' }}>
                One Goal: Systems That Run Without You.
              </h2>
            </div>
          </motion.div>

          {/* Glass Cards */}
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((service, i) => (
              <motion.div key={i} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }} className="h-full">
                <ServiceCard service={service} onNavigate={onNavigate} isDark={isDark} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Wave divider ── */}
      <WaveDivider color={isDark ? '#12121e' : '#f8f8fc'} flip />

      {/* ── Capabilities (Bento) ── */}
      <section id="section-capabilities" className="py-12 md:py-24 section-glow-top relative" style={{ background: isDark ? '#12121e' : '#f8f8fc' }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern" />
        <div className="pointer-events-none absolute inset-0 dot-grid-dense" />
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease }} className="mb-8 md:mb-16">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>WHY STRAVEDA</p>
            <div className="flex items-start gap-5">
              <div className="mt-2 hidden lg:block flex-shrink-0 w-1 rounded-full" style={{ height: '52px', background: 'linear-gradient(180deg, #FF4800 0%, rgba(255,72,0,0.15) 100%)' }} />
              <h2 className="font-normal heading-gradient text-[clamp(2rem,5vw,3.5rem)]" style={{ lineHeight: 1.0, letterSpacing: '-2.05px' }}>Enterprise Grade Execution, Without the Complexity.</h2>
            </div>
          </motion.div>
          <div className="relative -mx-6 lg:-mx-8 overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
            <motion.div ref={capScrollRef} onScroll={handleCapScroll} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="flex gap-5 overflow-x-auto pb-6 px-4 sm:px-6 lg:px-8 no-scrollbar snap-x snap-mandatory">
              {bentoItems.map((item) => (
                <motion.div key={item.title} variants={cardVariants} className="group relative flex-shrink-0 snap-center overflow-hidden rounded-2xl transition-all duration-300 cursor-default flex flex-col" style={{ width: 'clamp(260px, 78vw, 440px)', minHeight: '300px', padding: 'clamp(24px, 5vw, 40px) clamp(20px, 4vw, 36px)', background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.75)', backdropFilter: 'blur(20px) saturate(1.8) brightness(1.02)', WebkitBackdropFilter: 'blur(20px) saturate(1.8) brightness(1.02)', border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1.5px solid rgba(255,255,255,0.9)', boxShadow: isDark ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.45)' : 'inset 0 2px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08)' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,72,0,0.35)'; e.currentTarget.style.boxShadow = isDark ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 40px rgba(255,72,0,0.15), 0 24px 48px rgba(0,0,0,0.4)' : 'inset 0 2px 0 rgba(255,255,255,0.95), 0 12px 40px rgba(255,72,0,0.12), 0 24px 48px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-6px)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.9)'; e.currentTarget.style.boxShadow = isDark ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.45)' : 'inset 0 2px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, rgba(255,72,0,0.04) 0%, transparent 55%)' }} />
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300" style={{ background: isDark ? 'rgba(255,72,0,0.12)' : 'rgba(255,72,0,0.08)' }}>
                    <item.icon className="h-7 w-7" style={{ color: '#FF4800' }} />
                  </div>
                  <h3 className="mb-4 font-normal" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)', lineHeight: 1.15, letterSpacing: '-0.4px', color: isDark ? '#f0f0f5' : '#1a1a2e' }}>{item.title}</h3>
                  <p className="text-[15px] leading-[1.7] flex-grow" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>{item.description}</p>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl" style={{ background: 'linear-gradient(90deg, #FF4800, rgba(255,72,0,0.15))' }} />
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="mt-10 flex items-center justify-center gap-3">
            {bentoItems.map((_, i) => (
              <button key={i} onClick={() => scrollCapTo(i)} aria-label={`Go to card ${i + 1}`} className="transition-all duration-300 flex items-center justify-center" style={{ width: capActiveIdx === i ? '36px' : '8px', height: capActiveIdx === i ? '36px' : '8px', borderRadius: '50%', border: capActiveIdx === i ? `1.5px solid ${isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'}` : 'none', background: capActiveIdx === i ? 'transparent' : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.18)'), padding: 0, cursor: 'pointer' }}>
                {capActiveIdx === i && <div className="w-2 h-2 rounded-full" style={{ background: isDark ? '#f0f0f5' : '#1a1a2e' }} />}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── About / Stats ── */}
      <section id="section-about" className="relative py-12 md:py-24 bg-[#f8f8fc] dark:bg-[#0a0a14]">
        <div className="pointer-events-none absolute inset-0 grid-pattern" />
        <div className="pointer-events-none absolute inset-0 dot-grid-dense" />
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 md:gap-16 px-6 lg:flex-row lg:px-8 relative">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease }} className="flex w-full flex-col justify-center lg:w-[40%]">
            <div className="flex flex-col gap-8 pl-6" style={{ borderLeft: '4px solid #FF4800' }}>
              {[
                { val: '55%',         label: 'Manual Work Reduced' },
                { val: '3–5x',        label: 'Operational Efficiency' },
                { val: '100%',        label: 'Code Ownership' },
                { val: 'End-to-End',  label: 'Strategy → Build → Deploy' },
              ].map(s => (
                <div key={s.label}>
                  <p
                    className="text-[#1a1a2e] dark:text-[#f0f0f5]"
                    style={{
                      fontSize: 'clamp(36px, 5.5vw, 64px)',
                      fontWeight: 700,
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {s.val}
                  </p>
                  <p
                    className="mt-2 text-[14px] font-normal tracking-wide"
                    style={{ color: '#6b7280', letterSpacing: '0.01em' }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease }} className="flex w-full flex-col justify-center lg:w-[60%]">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>WHO WE ARE</p>
            <div className="flex items-start gap-5 mb-6">
              <div className="mt-2 hidden lg:block flex-shrink-0 w-1 rounded-full" style={{ height: '52px', background: 'linear-gradient(180deg, #FF4800 0%, rgba(255,72,0,0.15) 100%)' }} />
              <h2 className="font-normal heading-gradient" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', lineHeight: 1.1, letterSpacing: '-1px' }}>We Get It. Because We've Lived It.</h2>
            </div>
            <p className="text-[18px] leading-[1.7] text-[#6b7280] dark:text-[#9ca3af] text-justify hyphens-auto">
              Every growing company hits the same wall. Too many tools. Spreadsheets that don't sync. Your best people spending Friday afternoons doing work that shouldn't exist. You don't need another vendor; you need someone who actually understands the problem. We do. We've built companies. We've watched smart founders lose momentum to operational drag. We've felt the frustration of paying for five tools when you really need one well designed system that your team understands. That's why Straveda is different. We're focused on one thing: building AI Powered systems that replace chaos with structure. Not another platform. Not enterprise bloat. Just technology that actually reduces complexity. We move fast. We're completely transparent. And we measure success the only way that matters—by what changes in your business: hours reclaimed, decisions accelerated, operations that scale without proportional headcount growth.
            </p>
          </motion.div>
        </div>
      </section>

      <TestimonialsCarousel />
      <FAQSection />

      {/* ── Problem Section ── */}
      <section className="relative py-16 md:py-28 bg-[#f8f8fc] dark:bg-[#0a0a14] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-pattern" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease }} className="text-center mb-12 md:mb-16">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>THE REAL PROBLEM</p>
            <div className="flex items-start gap-5 justify-center">
              <div className="mt-2 hidden lg:block flex-shrink-0 w-1 rounded-full" style={{ height: '52px', background: 'linear-gradient(180deg, #FF4800 0%, rgba(255,72,0,0.15) 100%)' }} />
              <h2 className="font-normal heading-gradient text-[clamp(2rem,5vw,3.5rem)]" style={{ lineHeight: 1.05, letterSpacing: '-2px' }}>You&apos;re not short on software.<br />You&apos;re drowning in it.</h2>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, delay: 0.1, ease }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '01', heading: 'The Tool Tax', body: "You're paying 6 to 14 SaaS subscriptions. Half overlap. None talk to each other. Your team spends 2 hours a day moving data between them manually." },
              { num: '02', heading: 'The Integration Debt', body: "Every new tool requires a Zapier hack. Every Zapier hack breaks monthly. IT says a \"proper integration\" is a 6 Month project. So nothing gets built." },
              { num: '03', heading: 'The Visibility Gap', body: "Leadership can't see pipeline health, ops can't see inventory, and finance finds out about problems when it's already too late to Course Correct." },
            ].map((item) => (
              <div key={item.num} className="glass-card rounded-xl p-8" style={{ backdropFilter: 'blur(18px) saturate(1.6)', WebkitBackdropFilter: 'blur(18px) saturate(1.6)' }}>
                <p className="text-[40px] font-light mb-4" style={{ color: 'rgba(255,72,0,0.25)', lineHeight: 1 }}>{item.num}</p>
                <h3 className="text-[18px] font-medium mb-3 text-[#1a1a2e] dark:text-[#f0f0f5]">{item.heading}</h3>
                <p className="text-[15px] leading-[1.6] text-[#6b7280] dark:text-[#9ca3af]">{item.body}</p>
              </div>
            ))}
          </motion.div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, delay: 0.25, ease }} className="mt-10 text-center text-[17px] leading-[1.6] text-[#6b7280] dark:text-[#9ca3af] max-w-2xl mx-auto">
            Straveda exists to fix this. We audit first, eliminate what&apos;s redundant, automate what remains, and build only what genuinely can&apos;t be bought off the shelf.
          </motion.p>
        </div>
      </section>

      {/* ── Process Section ── */}
      <section className="relative py-16 md:py-28" style={{ background: isDark ? '#12121e' : '#ffffff' }}>
        <div className="pointer-events-none absolute inset-0 dot-grid-dense" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease }} className="mb-12 md:mb-16">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>HOW WE WORK</p>
            <div className="flex items-start gap-5">
              <div className="mt-2 hidden lg:block flex-shrink-0 w-1 rounded-full" style={{ height: '52px', background: 'linear-gradient(180deg, #FF4800 0%, rgba(255,72,0,0.15) 100%)' }} />
              <h2 className="font-normal heading-gradient text-[clamp(2rem,5vw,3.5rem)]" style={{ lineHeight: 1.05, letterSpacing: '-2px', overflowWrap: 'break-word' }}>From Strategy call to Live System.</h2>
            </div>
          </motion.div>
          <div className="relative">
            <div className="hidden md:block absolute top-6 left-6 right-6 h-px" style={{ background: 'linear-gradient(to right, #FF4800, rgba(255,72,0,0.1))' }} />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              {[
                { step: '1', label: 'Discovery', desc: '30-min strategy call to analyze your workflows, identify bottlenecks, and define high impact automation opportunities. You leave with a clear action plan not a sales pitch.' },
                { step: '2', label: 'Architecture', desc: 'We design your custom solution, define the tech stack, and scope the build. You receive a fixed price proposal within 24 hours no hidden costs or ambiguity.' },
                { step: '3', label: 'Build', desc: 'We develop your system in weekly sprints with full visibility. You review progress regularly, give feedback, and stay in control no black box development.' },
                { step: '4', label: 'Automate', desc: 'We wire in the automation layer  triggers, workflows, AI agents. The system starts running without human intervention before we hand over.' },
                { step: '5', label: 'Scale', desc: "Full handover with documentation. Your team owns it. We're available for retainer support if you need us but you won't need us to operate it." },
              ].map((item) => (
                <motion.div key={item.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: parseInt(item.step) * 0.08, ease }} className="flex flex-col">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full mb-4 text-white text-[14px] font-semibold flex-shrink-0 relative z-10" style={{ background: '#FF4800' }}>{item.step}</div>
                  <h3 className="text-[16px] font-semibold mb-2 text-[#1a1a2e] dark:text-[#f0f0f5]">{item.label}</h3>
                  <p className="text-[14px] leading-[1.6] text-[#6b7280] dark:text-[#9ca3af]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing Section ── */}
      <section className="relative py-16 md:py-28 bg-[#f8f8fc] dark:bg-[#0a0a14] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-pattern" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease }} className="text-center mb-12 md:mb-16">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>PRICING</p>
            <div className="flex items-start gap-5 justify-center">
              <div className="mt-2 hidden lg:block flex-shrink-0 w-1 rounded-full" style={{ height: '52px', background: 'linear-gradient(180deg, #FF4800 0%, rgba(255,72,0,0.15) 100%)' }} />
              <h2 className="font-normal heading-gradient text-[clamp(2rem,5vw,3.5rem)]" style={{ lineHeight: 1.05, letterSpacing: '-2px' }}>Flexible Engagement Models</h2>
            </div>
            <p className="mt-4 text-[17px] leading-[1.6] text-[#6b7280] dark:text-[#9ca3af] max-w-xl mx-auto">Tailored systems built around your business goals not predefined packages.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tier: 'Focused Automation Builds', coreValue: 'Streamline key workflows and reduce manual effort.', items: ['One custom automation workflow', 'Seamless integration with your tools', 'Documentation & handover'], timeline: '2-3 weeks', cta: 'Start here', highlight: false },
              { tier: 'Custom Software & AI Systems', coreValue: 'Build scalable, business specific systems.', items: ['End To End custom development', 'AI workflow integration', 'Scalable, ownership ready code'], timeline: 'Based on scope', cta: 'Book a call', highlight: true },
              { tier: 'Ongoing Optimization & Scale', coreValue: 'Improve, upgrade, and scale your systems.', items: ['Performance monitoring', 'Feature enhancements', 'Continuous optimization'], timeline: 'Monthly', cta: 'Book a call', highlight: false },
            ].map((plan) => (
              <motion.div key={plan.tier} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease }} className={`rounded-xl p-8 border flex flex-col ${plan.highlight ? 'border-[#FF4800]/40' : 'border-black/[0.06] dark:border-white/[0.08]'}`} style={{ background: plan.highlight ? isDark ? 'rgba(255,72,0,0.08)' : 'rgba(255,72,0,0.04)' : isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.68)', backdropFilter: 'blur(18px) saturate(1.6)', WebkitBackdropFilter: 'blur(18px) saturate(1.6)', boxShadow: plan.highlight ? '0 8px 32px rgba(255,72,0,0.12), inset 0 1px 0 rgba(255,72,0,0.1)' : '0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)' }}>
                {plan.highlight && <span className="inline-block mb-4 self-start rounded-full px-3 py-1 text-[10px] font-medium text-white" style={{ background: '#FF4800' }}>Most Popular</span>}
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-2 text-[#FF4800]">{plan.tier}</p>
                <p className="text-[15px] font-medium leading-[1.5] mb-5 text-[#1a1a2e] dark:text-[#f0f0f5]">{plan.coreValue}</p>
                <div className="border-t border-black/[0.06] dark:border-white/[0.08] pt-4 mb-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider mb-3 text-[#6b7280] dark:text-[#9ca3af]">Deliverables</p>
                  <ul className="flex flex-col gap-2 flex-1">
                    {plan.items.map((item) => <li key={item} className="flex items-start gap-2 text-[13px] text-[#6b7280] dark:text-[#9ca3af]"><span className="mt-1 flex-shrink-0 text-[10px]" style={{ color: '#FF4800' }}>●</span>{item}</li>)}
                  </ul>
                </div>
                <div className="flex items-center gap-2 mb-6"><span className="text-[11px] font-semibold uppercase tracking-wider text-[#6b7280] dark:text-[#9ca3af]">Timeline:</span><span className="text-[13px] text-[#6b7280] dark:text-[#9ca3af]">{plan.timeline}</span></div>
                <button onClick={() => onNavigate('contact')} className="w-full rounded-lg py-3 text-[14px] font-medium transition-all duration-200 mt-auto" style={{ background: plan.highlight ? '#FF4800' : 'transparent', color: plan.highlight ? '#ffffff' : '#FF4800', border: plan.highlight ? 'none' : '1px solid rgba(255,72,0,0.3)' }} onMouseEnter={(e) => { if (!plan.highlight) e.currentTarget.style.background = 'rgba(255,72,0,0.06)'; }} onMouseLeave={(e) => { if (!plan.highlight) e.currentTarget.style.background = 'transparent'; }}>{plan.cta}</button>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-center text-[13px] text-[#9ca3af]">All engagements include full source code ownership and zero vendor lock in. Fixed price quote after a 30-min discovery call.</p>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: isDark ? '#12121e' : '#1a1a2e' }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,72,0,0.12) 0%, transparent 70%)' }} />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease }}>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>GET STARTED</p>
            <h2 className="text-white font-normal text-[clamp(2rem,5vw,3.75rem)] mb-6" style={{ lineHeight: 1.05, letterSpacing: '-2px' }}>Stop paying a monthly tax on manual work.</h2>
            <p className="text-[17px] leading-[1.6] mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>Book a 30 Minute strategy call. You&apos;ll walk away with a working hypothesis for what to automate first. If it&apos;s a fit, we send a proposal within 48 hours.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => onNavigate('contact')} className="glow-hover flex items-center gap-2 rounded-lg px-8 py-4 text-[15px] font-medium text-white shadow-lg shadow-orange-500/20" style={{ background: '#FF4800' }}>
                Book a 30-min working call <ArrowRight className="h-4 w-4" />
              </motion.button>
              <button onClick={() => onNavigate('services')} className="flex items-center gap-2 rounded-lg px-8 py-4 text-[15px] transition-colors duration-200" style={{ color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}>See how we work</button>
            </div>
          </motion.div>
        </div>
      </section>

      <SubscribeSection />
    </div>
  );
}
