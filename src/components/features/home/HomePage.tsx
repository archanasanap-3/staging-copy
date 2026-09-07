'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
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
import AnimatedHero from '@/components/features/home/AnimatedHero';
import SubscribeSection from '@/components/features/common/SubscribeSection';
import WaveDivider from '@/components/animations/WaveDivider';
import SystemsCoreSection from '@/components/features/home/SystemsCore';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

interface Props{
  isDark:boolean;
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
    metric: '',
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
    metric: '',
    ctaLabel: 'View web capabilities',
    ctaDesc: 'Edge Deployed, conversion first',
  },
];

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({ service, onNavigate, isDark }: { service: ServiceItem; onNavigate: (page: string) => void; isDark: boolean }) {
  const bg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.70)';
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
      <div className="flex h-auto min-h-[7rem] flex-1 flex-col justify-start p-6 pb-0">
        <span className="mb-3 w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: '#FF4800', background: 'rgba(255,72,0,0.09)', border: '1px solid rgba(255,72,0,0.15)' }}>
          {service.badge}
        </span>
        <h3 className="text-xl font-bold leading-[1.2] tracking-tight tFext-gray-900 dark:text-white">
          {service.title}
        </h3>
      </div>

      {/* Divider */}
      <div className="mx-6 my-5 h-px" style={{ background: isDark ? 'rgba(255,255,255,0.07)' : 'linear-gradient(90deg, rgba(0,0,0,0.06), rgba(0,0,0,0.03), rgba(0,0,0,0.06))' }} />

      {/* Bullet list */}
      <div className="flex-1 px-6">
        <ul className="flex flex-col gap-3">
          {service.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3 text-[13.5px] font-normal leading-[1.5] text-gray-700 dark:text-gray-300">
              <span className="mt-2 h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: '#FF4800', boxShadow: '0 0 4px rgba(255,72,0,0.4)' }} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Metric or invisible spacer */}
      {service.metric ? (
        <div className="mx-6 mt-5 rounded-[10px] px-4 py-3" style={{ background: 'rgba(255,72,0,0.07)', border: '1px solid rgba(255,72,0,0.13)', minHeight: '3.875rem', display: 'flex', alignItems: 'flex-start' }}>
          <p className="text-[12px] font-semibold leading-[1.55]" style={{ color: '#FF4800' }}>→ {service.metric}</p>
        </div>
      ) : (
        <div className="mx-6 mt-5 px-4 py-3 invisible" aria-hidden="true" style={{ minHeight: '3.875rem', display: 'flex', alignItems: 'flex-start' }}>
          <p className="text-[12px] leading-[1.55]">30–60% reduction in manual operations within the first 90 days</p>
        </div>
      )}

      {/* Orange footer strip */}
      <div className="relative mt-5 flex items-center justify-between gap-3 px-6 pb-6 pt-4" style={{ background: 'linear-gradient(135deg, rgba(255,72,0,0.18) 0%, rgba(255,72,0,0.11) 60%, rgba(255,72,0,0.07) 100%)', borderTop: '1px solid rgba(255,72,0,0.12)' }}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,72,0,0.35), transparent)' }} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="whitespace-nowrap text-[12.5px] font-bold tracking-[0.01em]" style={{ color: '#FF4800' }}>{service.ctaLabel} →</span>
          <span className="text-[11.5px] font-medium leading-[1.3]" style={{ color: 'rgba(255,72,0,0.75)' }}>{service.ctaDesc}</span>
        </div>
        <button
          onClick={() => onNavigate('services')}
          aria-label={service.ctaLabel}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-200"
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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkT = mounted ? resolvedTheme === 'dark' : false;
  const t = testimonials[0];

  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      style={{
        background: isDarkT
          ? 'linear-gradient(135deg, #09042fff 0%, #0d0b15ff 50%, #060606ff 100%)'
          : 'linear-gradient(135deg, #f8f8fc 0%, #ffffff 50%, #f0f0f8 100%)',
      }}
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${isDarkT ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />
      {/* Orange glow orb */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: '700px', height: '400px', background: 'radial-gradient(ellipse at center, rgba(255,72,0,0.07) 0%, rgba(255,72,0,0.02) 40%, transparent 70%)' }} />
      {/* Top rule */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,72,0,0.35) 50%, transparent)' }} />

      {/* Card */}
      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          whileHover={{ scale: 1.04, y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
          className="rounded-2xl px-8 py-10 sm:px-12 sm:py-14 text-center"
          style={{
            background: isDarkT ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.92)',
            border: isDarkT ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.07)',
            boxShadow: isDarkT
              ? '0 8px 40px rgba(0,0,0,0.4)'
              : '0 8px 40px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease }} className="mb-5 text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#FF4800' }}>Client Feedback</motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, delay: 0.1, ease }} className="mb-5 flex items-center justify-center gap-1">
            {[...Array(t.stars)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" style={{ color: '#FBBF24' }} />)}
          </motion.div>

          <motion.span initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, delay: 0.15, ease }} className="block leading-none mb-2" style={{ fontSize: '56px', color: '#FF4800', opacity: 0.5 }}>&#x275D;</motion.span>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="text-[clamp(1rem,2.5vw,1.3rem)] italic leading-[1.8] font-normal"
            style={{ color: isDarkT ? 'rgba(255,255,255,0.85)' : '#1e293b' }}
          >
            {t.quote}
          </motion.p>

          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay: 0.35, ease: [0.4, 0, 0.2, 1] }} className="mx-auto my-7" style={{ width: '3rem', height: '1px', background: 'rgba(255,72,0,0.5)', transformOrigin: 'center' }} />

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.4, ease }} className="flex items-center justify-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #FF4800 0%, #2B2358 100%)' }}>{getInitials(t.name)}</div>
            <div className="text-left">
              <p className="text-[14px] font-semibold" style={{ color: isDarkT ? 'rgba(255,255,255,0.9)' : '#0f172a' }}>{t.name}</p>
              <p className="text-[12px]" style={{ color: isDarkT ? 'rgba(255,255,255,0.4)' : '#64748b' }}>
                {t.role}{t.company && <span> · <span style={{ color: '#FF4800' }}>{t.company}</span></span>}
              </p>
            </div>
          </motion.div>
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
    <section id="section-faq" className="glow-hover py-16 md:py-24 bg-white dark:bg-[#0a0a14] border-t border-black/[0.06] dark:border-white/[0.06]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease }} className="mb-10 md:mb-14 text-center">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>FREQUENTLY ASKED QUESTIONS</p>
          <h2 className="font-normal heading-gradient text-[clamp(1.75rem,5vw,3.5rem)] tracking-tight md:tracking-[-2.05px]" style={{ lineHeight: 1.0 }}>Questions? Here's what teams ask first.</h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }} className="overflow-hidden" style={{ borderLeft: openIndex === index ? '3px solid #FF4800' : '3px solid transparent', transition: 'border-color 0.3s ease' }}>
              <button data-magnetic onClick={() => toggle(index)} className="flex w-full items-center justify-between px-4 pr-12 sm:px-5 sm:pr-14 py-5 text-left transition-colors duration-200 border-b border-black/[0.06] dark:border-white/[0.06] hover:bg-[rgba(255,72,0,0.02)] dark:hover:bg-white/[0.03]" aria-expanded={openIndex === index}>
                <span className="pr-3 text-[15px] sm:text-[16px] font-medium text-[#1a1a2e] dark:text-[#e5e7eb]">{faq.question}</span>
                <motion.span animate={{ rotate: openIndex === index ? 45 : 0 }} transition={{ duration: 0.3, ease }} className={`flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${openIndex === index ? 'bg-[#FF4800] text-white' : 'bg-black/[0.04] dark:bg-white/[0.06] text-[#6b7280] dark:text-[#9ca3af]'}`}><Plus className="h-4 w-4" /></motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease }} style={{ overflow: 'hidden' }}>
                    <p className="px-4 sm:px-5 pb-5 text-[14px] sm:text-[15px] leading-[1.6] text-[#6b7280] dark:text-[#9ca3af]">{faq.answer}</p>
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

// ─── Shared section-header helper ─────────────────────────────────────────────
// Renders the orange label + optional accent bar + h2, centered on mobile.

function SectionHeader({
  label,
  heading,
  align = 'left',
}: {
  label: string;
  heading: React.ReactNode;
  align?: 'left' | 'center';
}) {
  const isCenter = align === 'center';
  return (
    <div className={isCenter ? 'text-center' : 'text-center md:text-left'}>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: '#FF4800' }}>{label}</p>
      <div className={`flex gap-4 ${isCenter ? 'justify-center' : 'justify-center md:justify-start'}`}>
        {/* Accent bar — desktop only */}
        <h2 className="font-normal heading-gradient" style={{ fontSize: 'clamp(1.6rem, 5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-1px', overflowWrap: 'break-word' }}>
          {heading}
        </h2>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage({ onNavigate }: HomePageProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [capActiveIdx, setCapActiveIdx] = useState(0);
  const dragX = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Returns the width of one card + its gap (px), used for snapping math
  const getCardWidth = useCallback(() => {
    const card = trackRef.current?.querySelector<HTMLElement>('[data-cap-card]');
    return card ? card.offsetWidth + 20 : 300; // 20 = gap-5
  }, []);

  const snapToCard = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(idx, bentoItems.length - 1));
    animate(dragX, -clamped * getCardWidth(), {
      type: 'spring', stiffness: 260, damping: 32, mass: 0.8,
    });
    setCapActiveIdx(clamped);
  }, [dragX, getCardWidth]);

  const handleDragEnd = useCallback(
    (_: unknown, info: { velocity: { x: number } }) => {
      const cardW = getCardWidth();
      const vel = info.velocity.x;
      let idx: number;
      if (vel < -400) idx = Math.min(capActiveIdx + 1, bentoItems.length - 1);
      else if (vel > 400) idx = Math.max(capActiveIdx - 1, 0);
      else idx = Math.max(0, Math.min(Math.round(-dragX.get() / cardW), bentoItems.length - 1));
      snapToCard(idx);
    },
    [capActiveIdx, dragX, getCardWidth, snapToCard],
  );

  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  useEffect(() => {
    const updateConstraints = () => {
      if (trackRef.current) {
        setConstraints({
          right: 0,
          left: -(trackRef.current.scrollWidth - trackRef.current.offsetWidth + 40),
        });
      }
    };
    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

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
      <motion.section
        id="section-partners"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease }}
        className="py-14 md:py-24 bg-white dark:bg-[#0a0a14] relative border-t border-black/[0.06] dark:border-white/[0.06] overflow-hidden"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>Where we stand</p>
          <h2
            className="font-normal heading-gradient mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-1.5px', overflowWrap: 'break-word', wordBreak: 'break-word' }}
          >
            A Strong Foundation for Scalable Growth
          </h2>
          <p className="mt-4 text-base leading-[1.7] text-[#6b7280] dark:text-[#9ca3af] max-w-2xl mx-auto">
            We take on a limited number of engagements each quarter so we can ship fast and stay accountable. Our current clients are in D2C, B2B SaaS, and professional services.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { label: 'Fixed price after discovery', icon: '✓' },
              { label: 'Weekly progress updates', icon: '✓' },
              { label: 'Full code ownership', icon: '✓' },
              { label: 'No long term lock in', icon: '✓' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 rounded-full px-3 sm:px-4 py-2" style={{ background: 'rgba(255,72,0,0.06)', border: '1px solid rgba(255,72,0,0.12)' }}>
                <span className="text-[13px] font-semibold" style={{ color: '#FF4800' }}>{item.icon}</span>
                <span className="text-[12px] sm:text-[13px] font-medium text-[#6b7280] dark:text-[#9ca3af]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Technology Partners ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease }}
        className="py-12 md:py-16 lg:py-20 bg-white dark:bg-[#0a0a14] border-t border-black/[0.06] dark:border-white/[0.06]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center md:text-left">
            <div className="flex items-start gap-3">
              <h2 className="my-2 block text-left" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.1, letterSpacing: '-1.5px', overflowWrap: 'break-word'}}>
                Built on enterprise grade infrastructure
              </h2>
            </div>
            <p className="text-[15px] leading-[1.65] text-[#6b7280] dark:text-[#9ca3af] max-w-lg mx-0 ml-0 text-left">
              We use proven, scalable technologies not experimental tools. Your systems will be maintainable and upgradable for years.
            </p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {[
              { name: 'AWS', brandColor: '#FF9900', src: '/logos/aws.png', w: 80, h: 40 },
              { name: 'Google Cloud', brandColor: '#4285F4', src: '/logos/gcp.png', w: 100, h: 40 },
              { name: 'Docker', brandColor: '#2496ED', src: '/logos/docker.png', w: 90, h: 40 },
              { name: 'Microsoft Azure', brandColor: '#0078D4', src: '/logos/azure.png', w: 90, h: 40 },
              { name: 'Vercel', brandColor: '#000000', src: '/logos/vercel.png', w: 90, h: 40 },
              { name: 'PostgreSQL', brandColor: '#336791', src: '/logos/postgresql.jpg', w: 90, h: 40 },
              { name: 'Next.js', brandColor: '#000000', src: '/logos/nextjs.svg', w: 90, h: 40 },
            ].map((partner) => (
              <motion.div
                key={partner.name}
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.25, ease }}
                className="group relative flex flex-col items-center justify-center gap-2 sm:gap-3 rounded-xl px-3 sm:px-6 py-4 sm:py-6 overflow-hidden cursor-default"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(20px) saturate(1.8) brightness(1.02)',
                  WebkitBackdropFilter: 'blur(20px) saturate(1.8) brightness(1.02)',
                  border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1.5px solid rgba(255,255,255,0.9)',
                  boxShadow: isDark ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.45)' : 'inset 0 2px 0 rgba(255,255,255,0.95), 0 8px 24px rgba(0,0,0,0.08)',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${partner.brandColor}88`;
                  e.currentTarget.style.boxShadow = isDark
                    ? `inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 40px ${partner.brandColor}22`
                    : `inset 0 2px 0 rgba(255,255,255,0.95), 0 12px 40px ${partner.brandColor}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.9)';
                  e.currentTarget.style.boxShadow = isDark
                    ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.45)'
                    : 'inset 0 2px 0 rgba(255,255,255,0.95), 0 8px 24px rgba(0,0,0,0.08)';
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" style={{ backgroundColor: partner.brandColor }} />
                <div className="relative h-8 sm:h-10 w-full grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                  <Image src={partner.src} alt={partner.name} fill sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 14vw" className="object-contain" />
                </div>
                <span className="relative text-[10px] sm:text-[11px] font-medium tracking-wide text-[#9ca3af] dark:text-[#6b7280]">{partner.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── What We Build ── */}
      <section className="py-10 md:py-16 bg-white dark:bg-[#0a0a14]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
          >
            <SectionHeader
              label="WHAT WE BUILD"
              heading={
                <>
                  One Goal: Systems That <span style={{ color: '#FF4800' }}>Run Without You.</span>
                </>
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {services.map((service, i) => (
              <ServiceCard key={i} service={service} onNavigate={onNavigate} isDark={isDark} />
            ))}
          </motion.div>
        </div>
      </section>

      <div id="section-services">
        <SystemsCoreSection isDark={isDark} onNavigate={onNavigate} />
      </div>

      {/* ── Wave divider ── */}
      <WaveDivider color={isDark ? '#12121e' : '#f8f8fc'} flip />

      {/* ── Capabilities (Bento) ── */}
      <section id="section-capabilities" className="py-12 md:py-24 section-glow-top relative" style={{ background: isDark ? '#12121e' : '#f8f8fc' }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern" />
        <div className="pointer-events-none absolute inset-0 dot-grid-dense" />
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="mb-8 md:mb-16"
          >
            <SectionHeader
              label="WHY STRAVEDA"
              heading="Enterprise Grade Execution, Without the Complexity."
            />
          </motion.div>

          {/* Drag-to-swipe carousel — Framer Motion, no native scroll */}
     <div
  className="relative overflow-hidden"
  style={{
    maskImage:
      'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
  }}
>
            <motion.div
              ref={trackRef}
              style={{ x: dragX }}
              drag="x"
              dragConstraints={constraints}
              dragMomentum={false}
              dragElastic={0.05}
              onDragEnd={handleDragEnd}
              className="flex gap-5 cursor-grab active:cursor-grabbing px-4 sm:px-6 lg:px-8 pb-6 select-none"
            >
              {bentoItems.map((item,index) => (
                <div
                  key={item.title}
                  data-cap-card
                  className="group relative flex-shrink-0 overflow-hidden rounded-2xl flex flex-col"
                  style={{
                    // FIX: Mathematically calculates width to fit exactly 3 cards in view on desktop/tablet,
                    // accounting for 40px gaps and responsive container padding, with a 20px safety buffer for scrollbars.
                    width: 'clamp(280px, calc((100vw - 124px) / 3), 385px)',
                    minHeight: '18.75rem',
                    padding: 'clamp(1.25rem, 5vw, 2.5rem) clamp(1rem, 4vw, 2.25rem)',
                    background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(20px) saturate(1.8) brightness(1.02)',
                    WebkitBackdropFilter: 'blur(20px) saturate(1.8) brightness(1.02)',
                    border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1.5px solid rgba(0,0,0,0.08)',
                    boxShadow: isDark
                      ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.45)'
                      : '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = 'rgba(255,72,0,0.35)';
                    el.style.boxShadow = isDark
                      ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 40px rgba(255,72,0,0.15), 0 24px 48px rgba(0,0,0,0.4)'
                      : '0 12px 40px rgba(255,72,0,0.12), 0 24px 48px rgba(0,0,0,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)';
                    el.style.boxShadow = isDark
                      ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.45)'
                      : '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)';
                  }}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, rgba(255,72,0,0.04) 0%, transparent 55%)' }} />
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: isDark ? 'rgba(255,72,0,0.12)' : 'rgba(255,72,0,0.08)' }}>
                    <item.icon className="h-7 w-7" style={{ color: '#FF4800' }} />
                  </div>
                  <h3 className="mb-3 font-semibold text-slate-900 dark:text-[#f0f0f5]" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', lineHeight: 1.2, letterSpacing: '-0.3px' }}>
                    {item.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.7] flex-grow text-slate-600 dark:text-[#9ca3af]">
                    {item.description}
                  </p>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl" style={{ background: 'linear-gradient(90deg, #FF4800, rgba(255,72,0,0.15))' }} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Pagination arrows */}
<div className="mt-8 md:mt-10 flex items-center justify-center gap-3">
  <button
    type="button"
    onClick={() => snapToCard(Math.max(0, capActiveIdx - 1))}
    aria-label="Previous card"
    className="flex items-center justify-center transition-all duration-300"
    style={{
      width: '2.25rem',
      height: '2.25rem',
      borderRadius: '50%',
      border: `1.5px solid ${
        isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'
      }`,
      background: 'transparent',
      color: isDark ? '#f0f0f5' : '#1a1a2e',
      padding: 0,
      cursor: 'pointer',
      fontSize: '1.5rem',
      lineHeight: 1,
    }}
  >
    ‹
  </button>

  <button
    type="button"
    onClick={() =>
      snapToCard(Math.min(bentoItems.length - 1, capActiveIdx + 1))
    }
    aria-label="Next card"
    className="flex items-center justify-center transition-all duration-300"
    style={{
      width: '2.25rem',
      height: '2.25rem',
      borderRadius: '50%',
      border: `1.5px solid ${
        isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'
      }`,
      background: 'transparent',
      color: isDark ? '#f0f0f5' : '#1a1a2e',
      padding: 0,
      cursor: 'pointer',
      fontSize: '1.5rem',
      lineHeight: 1,
    }}
  >
    ›
  </button>
</div>
        </div>
      </section>

      {/* ── About / Stats ── */}
      <section id="section-about" className="relative py-12 md:py-24 bg-[#f8f8fc] dark:bg-[#0a0a14]">
        <div className="pointer-events-none absolute inset-0 grid-pattern" />
        <div className="pointer-events-none absolute inset-0 dot-grid-dense" />
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 md:gap-16 px-4 sm:px-6 lg:px-8 lg:flex-row relative">

          {/* Stats column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="flex w-full flex-col justify-center lg:w-[40%]"
          >
            {/* On mobile: centered stats block; on desktop: left-bordered */}
            <div className="grid grid-cols-1 gap-8 md:gap-10 border-l-[3px] border-[#FF4800] pl-6">
              {[
                { val: '55%', label: 'Manual Work Reduced' },
                { val: '3–5x', label: 'Operational Efficiency' },
                { val: '100%', label: 'Code Ownership' },
                { val: 'End-to-End', label: 'Strategy → Build → Deploy' },
              ].map(s => (
                <div key={s.label} className="text-center md:text-left">
                  <p
                    className="text-[#1a1a2e] dark:text-[#f0f0f5]"
                    style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em' }}
                  >
                    {s.val}
                  </p>
                  <p className="mt-1.5 text-[13px] sm:text-[14px] font-normal tracking-wide" style={{ color: '#6b7280', letterSpacing: '0.01em' }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="flex w-full flex-col justify-center lg:w-[60%]"
          >
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest text-center md:text-left" style={{ color: '#FF4800' }}>WHO WE ARE</p>
            <div className="flex items-start gap-4 mb-6 justify-center md:justify-start">
              <h2 className="font-normal heading-gradient text-center md:text-left text-[2.5rem]">
                  We Get It. Because We've Lived It.
              </h2>
            </div>
            <p className="text-base sm:text-[18px] leading-[1.65] text-[#6b7280] dark:text-[#9ca3af] text-left">
              Every growing company hits the same wall. Too many tools. Spreadsheets that don't sync. Your best people spending Friday afternoons doing work that shouldn't exist. You don't need another vendor; you need someone who actually understands the problem. We do. We've built companies. We've watched smart founders lose momentum to operational drag. We've felt the frustration of paying for five tools when you really need one well designed system that your team understands. That's why Straveda is different. We're focused on one thing: building AI Powered systems that replace chaos with structure. Not another platform. Not enterprise bloat. Just technology that actually reduces complexity. We move fast. We're completely transparent. And we measure success the only way that matters—by what changes in your business: hours reclaimed, decisions accelerated, operations that scale without proportional headcount growth.
            </p>
          </motion.div>
        </div>
      </section>

      <TestimonialsCarousel />

      {/* ── Problem Section ── */}
      <section className="relative py-12 md:py-16 bg-[#f8f8fc] dark:bg-[#0a0a14] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-pattern" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="text-center mb-10 md:mb-16"
          >
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>THE REAL PROBLEM</p>
            <h2
              className="font-normal heading-gradient text-[clamp(1.75rem,5vw,3.5rem)] mx-auto"
              style={{ lineHeight: 1.05, letterSpacing: '-2px' }}
            >
              You&apos;re not short on software.<br />You&apos;re drowning in it.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="grid w-full grid-cols-7 gap-4 sm:gap-6"
          >
            {[
              { num: '01', heading: 'The Tool Tax', body: "You're paying 6 to 14 SaaS subscriptions. Half overlap. None talk to each other. Your team spends 2 hours a day moving data between them manually." },
              { num: '02', heading: 'The Integration Debt', body: "Every new tool requires a Zapier hack. Every Zapier hack breaks monthly. IT says a \"proper integration\" is a 6 Month project. So nothing gets built." },
              { num: '03', heading: 'The Visibility Gap', body: "Leadership can't see pipeline health, ops can't see inventory, and finance finds out about problems when it's already too late to Course Correct." },
            ].map((item) => (
              <div key={item.num} className="glass-card rounded-xl p-5 sm:p-6 md:p-8" style={{ backdropFilter: 'blur(18px) saturate(1.6)', WebkitBackdropFilter: 'blur(18px) saturate(1.6)' }}>
                <p className="text-[36px] sm:text-[40px] font-light mb-4" style={{ color: 'rgba(255,72,0,0.25)', lineHeight: 1 }}>{item.num}</p>
                <h3 className="text-[17px] sm:text-[18px] font-medium mb-3 text-[#1a1a2e] dark:text-[#f0f0f5]">{item.heading}</h3>
                <p className="text-[14px] sm:text-[15px] leading-[1.6] text-[#6b7280] dark:text-[#9ca3af]">{item.body}</p>
              </div>
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="mt-8 md:mt-10 text-center text-base sm:text-[17px] leading-[1.6] text-[#6b7280] dark:text-[#9ca3af] max-w-2xl mx-auto"
          >
            Straveda exists to fix this. We audit first, eliminate what&apos;s redundant, automate what remains, and build only what genuinely can&apos;t be bought off the shelf.
          </motion.p>
        </div>
      </section>

      {/* ── Process Section ── */}
      <section className="relative py-16 md:py-28" style={{ background: isDark ? '#12121e' : '#ffffff' }}>
        <div className="pointer-events-none absolute inset-0 dot-grid-dense" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="mb-10 md:mb-16"
          >
            <SectionHeader
              label="HOW WE WORK"
              heading="From Strategy Call to Live System."
            />
          </motion.div>
          <div className="relative">
            <div className="hidden md:block absolute top-6 left-6 right-6 h-px" style={{ background: 'linear-gradient(to right, #FF4800, rgba(255,72,0,0.1))' }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 relative">
              {[
                { step: '1', label: 'Discovery', desc: '30-min strategy call to analyze your workflows, identify bottlenecks, and define high impact automation opportunities. You leave with a clear action plan not a sales pitch.' },
                { step: '2', label: 'Architecture', desc: 'We design your custom solution, define the tech stack, and scope the build. You receive a fixed price proposal within 24 hours no hidden costs or ambiguity.' },
                { step: '3', label: 'Build', desc: 'We develop your system in weekly sprints with full visibility. You review progress regularly, give feedback, and stay in control no black box development.' },
                { step: '4', label: 'Automate', desc: 'We wire in the automation layer — triggers, workflows, AI agents. The system starts running without human intervention before we hand over.' },
                { step: '5', label: 'Scale', desc: "Full handover with documentation. Your team owns it. We're available for retainer support if you need us but you won't need us to operate it." },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: parseInt(item.step) * 0.08, ease }}
                  className="flex flex-col items-center md:items-start text-center md:text-left"
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full mb-4 text-white text-[14px] font-semibold flex-shrink-0 relative z-10"
                    style={{ background: '#FF4800' }}
                  >
                    {item.step}
                  </div>
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="text-center mb-10 md:mb-16"
          >
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>PRICING</p>
            <h2
              className="font-normal heading-gradient text-[clamp(1.75rem,5vw,3.5rem)] mx-auto"
              style={{ lineHeight: 1.05, letterSpacing: '-2px' }}
            >
              Flexible Engagement Models
            </h2>
            <p className="mt-4 text-base sm:text-[17px] leading-[1.6] text-[#6b7280] dark:text-[#9ca3af] max-w-xl mx-auto">
              Tailored systems built around your business goals not predefined packages.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { tier: 'Focused Automation Builds', coreValue: 'Streamline key workflows and reduce manual effort.', items: ['One custom automation workflow', 'Seamless integration with your tools', 'Documentation & handover'], timeline: '2-3 weeks', cta: 'Start here', highlight: false },
              { tier: 'Custom Software & AI Systems', coreValue: 'Build scalable, business specific systems.', items: ['End To End custom development', 'AI workflow integration', 'Scalable, ownership ready code'], timeline: 'Based on scope', cta: 'Book a call', highlight: true },
              { tier: 'Ongoing Optimization & Scale', coreValue: 'Improve, upgrade, and scale your systems.', items: ['Performance monitoring', 'Feature enhancements', 'Continuous optimization'], timeline: 'Monthly', cta: 'Book a call', highlight: false },
            ].map((plan) => (
              <motion.div
                key={plan.tier}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease }}
                className={`rounded-xl p-5 sm:p-6 md:p-8 border flex flex-col ${plan.highlight ? 'border-[#FF4800]/40' : 'border-black/[0.06] dark:border-white/[0.08]'}`}
                style={{
                  background: plan.highlight
                    ? isDark ? 'rgba(255,72,0,0.08)' : 'rgba(255,72,0,0.04)'
                    : isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.68)',
                  backdropFilter: 'blur(18px) saturate(1.6)',
                  WebkitBackdropFilter: 'blur(18px) saturate(1.6)',
                  boxShadow: plan.highlight
                    ? '0 8px 32px rgba(255,72,0,0.12), inset 0 1px 0 rgba(255,72,0,0.1)'
                    : '0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
                }}
              >
                <div className="h-6 mb-4 flex items-start">
                  {plan.highlight && (
                    <span className="inline-block rounded-full px-3 py-1 text-[10px] font-medium text-white" style={{ background: '#FF4800' }}>
                      Most Popular
                    </span>
                  )}
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-2 text-[#FF4800]">{plan.tier}</p>
                <p className="text-[15px] font-medium leading-[1.5] mb-5 text-[#1a1a2e] dark:text-[#f0f0f5] min-h-[3rem]">{plan.coreValue}</p>
                <div className="border-t border-black/[0.06] dark:border-white/[0.08] pt-4 mb-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider mb-3 text-[#6b7280] dark:text-[#9ca3af]">Deliverables</p>
                  <ul className="flex flex-col gap-2 flex-1">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] text-[#6b7280] dark:text-[#9ca3af]">
                        <span className="mt-1 flex-shrink-0 text-[10px]" style={{ color: '#FF4800' }}>●</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-2 mb-6 mt-auto">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6b7280] dark:text-[#9ca3af]">Timeline:</span>
                  <span className="text-[13px] text-[#6b7280] dark:text-[#9ca3af]">{plan.timeline}</span>
                </div>
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full rounded-lg py-3 text-[14px] font-medium transition-all duration-200"
                  style={{
                    background: plan.highlight ? '#FF4800' : 'transparent',
                    color: plan.highlight ? '#ffffff' : '#FF4800',
                    border: plan.highlight ? 'none' : '1px solid rgba(255,72,0,0.3)',
                  }}
                  onMouseEnter={(e) => { if (!plan.highlight) e.currentTarget.style.background = 'rgba(255,72,0,0.06)'; }}
                  onMouseLeave={(e) => { if (!plan.highlight) e.currentTarget.style.background = 'transparent'; }}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-center text-[13px] text-[#9ca3af]">
            All engagements include full source code ownership and zero vendor lock in. Fixed price quote after a 30-min discovery call.
          </p>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: isDark ? '#12121e' : '#1a1a2e' }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,72,0,0.12) 0%, transparent 70%)' }} />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease }}>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>GET STARTED</p>
            <h2
              className="text-white font-normal text-[clamp(1.75rem,5vw,3.75rem)] mb-6"
              style={{ lineHeight: 1.05, letterSpacing: '-2px' }}
            >
              Stop paying a monthly tax on manual work.
            </h2>
            <p className="text-base sm:text-[17px] leading-[1.6] mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Book a 30 Minute strategy call. You&apos;ll walk away with a working hypothesis for what to automate first. If it&apos;s a fit, we send a proposal within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('contact')}
                className="glow-hover w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-[15px] font-medium text-white shadow-lg shadow-orange-500/20"
                style={{ background: '#FF4800' }}
              >
                Book a 30-min working call <ArrowRight className="h-4 w-4" />
              </motion.button>
              <button
                onClick={() => onNavigate('services')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-[15px] transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
              >
                See how we work
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <SubscribeSection />
      <FAQSection />
    </div>
  );
}
