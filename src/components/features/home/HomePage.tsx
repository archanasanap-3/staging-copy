
'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, animate, useMotionValueEvent, useMotionValue } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
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
  Zap,
  Code,
  Cpu,
  Check,
} from 'lucide-react';
import {
  BrainCircuit,
  Settings,
  Database,
  Workflow,
  Code2,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from 'lucide-react';
import AnimatedHero from '@/components/features/home/AnimatedHero';
import SandesaSection from '@/components/features/home/SandesaSection';
import ClientProjectsSection from '@/components/features/home/ClientProjectsSection';
import WaveDivider from '@/components/animations/WaveDivider';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

interface Props {
  isDark: boolean;
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

// ─── Interactive Services (Section 2) ─────────────────────────────────────────

interface ServiceDetail {
  number: string;
  badge: string;
  title: string;
  description: string;
  points: string[];
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
      'WhatsApp flows, behavior-triggered email sequences, and AI agents that remove 30–60% of manual operations within the first 90 days. We map your workflow first, then automate what is left.',
    points: ['WhatsApp broadcasts, chatbots and AI agents', 'Triggered email and follow-up sequences', 'Approvals, data entry and reporting on autopilot'],
    ctaLabel: 'Explore AI & Automation',
    route: 'automation',
    image: '/images/services/automation.jpg',
  },
  {
    number: '02',
    badge: 'SOFTWARE',
    title: 'Custom Software & Systems',
    description:
      'AI-powered CRMs, real-time dashboards, and internal tools built around your exact workflow—free from rigid SaaS constraints. You own the code and the roadmap.',
    points: ['Custom CRMs and internal tools', 'Live dashboards across sales, ops and finance', 'Role-based access, secure by design'],
    ctaLabel: 'Explore Custom Software',
    route: 'custom-software',
    image: '/images/services/custom-software.jpg',
  },
  {
    number: '03',
    badge: 'STRATEGY',
    title: 'AI Strategy & Integration',
    description:
      'GPT-class models, custom fine-tuned LLMs, and enterprise RAG systems integrated directly into your operations stack for measurable ROI. Every use case is tied to a number you can track.',
    points: ['AI readiness and use-case audit', 'LLM fine-tuning and enterprise RAG', 'Integration into your existing stack'],
    ctaLabel: 'Explore AI Strategy',
    route: 'ai-strategy',
    image: '/images/services/ai-strategy.jpg',
  },
  {
    number: '04',
    badge: 'DIGITAL',
    title: 'Web Design & Experiences',
    description:
      'High-performance Next.js sites, 3D interactive builds, and conversion funnels deployed to global edge infrastructure. Built to load fast and turn visitors into leads.',
    points: ['Next.js sites built for speed and SEO', '3D and interactive brand experiences', 'Conversion funnels on global edge hosting'],
    ctaLabel: 'Explore Web Experiences',
    route: 'web-development',
    image: '/images/services/web-development.jpg',
  },
  
];


const serviceThemes = [
  { bg: '#FF5A1F', tab: '#E84A12' },
  { bg: '#E8372C', tab: '#C92A20' },
  { bg: '#5B34D9', tab: '#4824BC' },
  { bg: '#16162A', tab: '#0E0E1C' },
];

const serviceTiles: Record<string, { label: string; Icon: LucideIcon }[]> = {
  automation: [
    { label: 'WhatsApp Flows', Icon: Workflow },
    { label: 'AI Agents', Icon: BrainCircuit },
    { label: 'Email Sequences', Icon: Zap },
    { label: 'Ops Automation', Icon: Settings },
  ],
  'custom-software': [
    { label: 'AI CRMs', Icon: Database },
    { label: 'Dashboards', Icon: Activity },
    { label: 'Internal Tools', Icon: Code2 },
    { label: 'Security', Icon: ShieldCheck },
  ],
  'ai-strategy': [
    { label: 'AI Consulting', Icon: BrainCircuit },
    { label: 'LLM Development', Icon: Cpu },
    { label: 'RAG Integration', Icon: Database },
    { label: 'AI Automation', Icon: Workflow },
  ],
  'web-development': [
    { label: 'Next.js Sites', Icon: Code2 },
    { label: '3D Experiences', Icon: Globe },
    { label: 'Edge Hosting', Icon: Cloud },
    { label: 'Conversion Funnels', Icon: Activity },
  ],
};

function InteractiveServicesSection({
  isDark,
  onNavigate,
}: {
  isDark: boolean;
  onNavigate: (page: string) => void;
}) {
  const total = servicesData.length;
  const trackRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });
  // 0 → total-1: integer values mean that card is fully in place
  const stage = useTransform(scrollYProgress, [0, 0.98], [0, total - 1]);

  if (total === 0) return null;

  return (
    <section
      className="rounded-t-[36px] bg-[#F6F1E7] shadow-[0_-30px_60px_rgba(0,0,0,0.12)] transition-colors duration-300 dark:bg-[#0a0a14] md:rounded-t-[56px] pt-6 sm:pt-10 md:pt-16"
    >
      <div className="mx-auto max-w-7xl px-4 pb-4 sm:pb-8 sm:px-6 lg:px-8">
        <p className="mb-2 sm:mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#FF4800]">
          OUR Services
        </p>
        <h2
          className="text-2xl sm:text-3xl md:text-[2.5rem] font-bold leading-tight tracking-tight"
          style={{ color: isDark ? '#ffffff' : '#000000' }}
        >
          Enterprise Software &amp; AI Automation Services
        </h2>
        <p className="mt-2 sm:mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base md:text-lg">
          We build high performance infrastructure and intelligent automation
          systems designed for the next generation of enterprise growth.
        </p>
      </div>

      {/* Scroll track: each service gets one viewport of scroll */}
      <div ref={trackRef} className="relative h-[240vh] md:h-[400vh]">
        <div
          className="sticky top-0 flex h-screen items-start justify-center overflow-hidden px-3 pt-14 sm:pt-20 md:pt-24 sm:px-6 lg:px-8"
          style={{ perspective: '1600px' }}
        >
          <div className="relative mx-auto h-[min(calc(100dvh-12rem),460px)] md:h-[min(calc(100vh-9.5rem),580px)] w-full max-w-6xl">
            {servicesData.map((service, index) => (
              <StackedServiceCard
                key={service.number}
                service={service}
                index={index}
                total={total}
                stage={stage}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StackedServiceCard({
  service,
  index,
  total,
  stage,
  onNavigate,
}: {
  service: ServiceDetail;
  index: number;
  total: number;
  stage: MotionValue<number>;
  onNavigate: (page: string) => void;
}) {
  const theme = serviceThemes[index % serviceThemes.length];
  const tiles = serviceTiles[service.route] ?? [];

  // d < 0: card still below, rising and un-tilting. d > 0: card buried under newer ones.
  const y = useTransform(stage, (v) => {
    const d = v - index;
    return d < 0 ? `${-d * 105}%` : `${-Math.min(d, 3) * 5}%`;
  });
  const rotateX = useTransform(stage, (v) => {
    const d = v - index;
    return d < 0 ? Math.min(-d, 1) * 24 : 0;
  });
  const scale = useTransform(stage, (v) => {
    const d = v - index;
    return d > 0 ? 1 - Math.min(d, 3) * 0.045 : 1;
  });
  // Dim buried cards with an opacity overlay (cheap, GPU-composited) instead of a per-frame CSS filter
  const dim = useTransform(stage, (v) => {
    const d = v - index;
    return d > 0 ? Math.min(d, 3) * 0.14 : 0;
  });

  return (
    <motion.article
      className="absolute inset-0 overflow-hidden rounded-[28px] text-white shadow-2xl md:rounded-[36px]"
      style={{
        y,
        rotateX,
        scale,
        zIndex: index + 1,
        transformOrigin: 'center top',
        backgroundColor: theme.bg,
        willChange: 'transform',
      }}
    >
      <motion.div
        aria-hidden="true"
        style={{ opacity: dim }}
        className="pointer-events-none absolute inset-0 z-30 bg-black"
      />
      <div className="grid h-full grid-cols-1 md:grid-cols-[1.1fr_1fr]">
        <div className="flex min-h-0 flex-col justify-start md:justify-between overflow-y-auto p-5 sm:p-7 md:p-8 lg:p-11 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div>
            <div className="mb-4 sm:mb-6 flex items-center justify-between">
              <span
                className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] sm:text-xs"
                style={{ backgroundColor: theme.tab }}
              >
                {service.badge}
              </span>
              <span className="font-mono text-xs text-white/70 sm:text-sm">
                {service.number} / {String(total).padStart(2, '0')}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.4rem] font-bold leading-[1.1] md:leading-[1.05] tracking-tight">
              {service.title}
            </h3>
            <p className="mt-2.5 sm:mt-4 md:mt-5 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-white/85">
              {service.description}
            </p>

            {/* Bullet Points - visible on all screens */}
            <ul className="mt-3.5 sm:mt-5 max-w-xl space-y-1.5 sm:space-y-2">
              {service.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm font-medium text-white/95 leading-snug">
                  <span className="mt-[2px] flex h-4 w-4 sm:h-[18px] sm:w-[18px] shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Check size={10} strokeWidth={3.5} className="sm:hidden" />
                    <Check size={11} strokeWidth={3.5} className="hidden sm:block" />
                  </span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            {/* Service Feature Tiles on Mobile/Tablet (< md) */}
            <div className="mt-3.5 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-2.5 md:hidden">
              {tiles.map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 sm:gap-2.5 rounded-xl bg-white/10 px-2.5 py-2 sm:px-3 sm:py-2.5 ring-1 ring-white/20 backdrop-blur-sm"
                >
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
                    <Icon size={16} strokeWidth={1.8} className="text-white" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-medium text-white/95 leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate(service.route)}
            className="mt-4 sm:mt-5 md:mt-6 inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-neutral-950 transition-transform hover:scale-105 shadow-md"
          >
            {service.ctaLabel}
            <ArrowRight size={16} />
          </button>
        </div>

        <div
          className="hidden items-center justify-center p-8 md:flex lg:p-12"
          style={{ backgroundColor: theme.tab }}
        >
          <div className="grid w-full max-w-md grid-cols-2 gap-4">
            {tiles.map(({ label, Icon }) => (
              <div
                key={label}
                className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-2xl bg-white/10 text-center ring-1 ring-white/20 backdrop-blur-sm"
              >
                <Icon size={34} strokeWidth={1.6} />
                <span className="px-2 text-xs font-medium text-white/90">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}




// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    name: 'Rachel M.',
    role: 'Director of Operations',
    company: 'Professional Services',
    quote:
      'We had too many manual processes before working with Straveda Tech. Their business process automation streamlined our workflows and reporting. Now everything runs faster with fewer errors and much better visibility.',
    stars: 5,
  },
  {
    name: 'Daniel K.',
    role: 'Head of Operations',
    company: 'Technology Solutions',
    quote:
      'Straveda Tech helped us simplify complex workflows and automate repetitive tasks across our operations. The new systems save our team significant time and give us much better visibility into our daily processes.',
    stars: 5,
  },
  {
    name: 'Sophia R.',
    role: 'Founder & CEO',
    company: 'Growth & Consulting',
    quote:
      'The team understood our business goals and turned them into practical technology solutions. Our workflows are now more efficient, our team spends less time on manual work, and we can scale with much more confidence.',
    stars: 5,
  },

  // Mock testimonials
  {
    name: 'Amit P.',
    role: 'CTO',
    company: 'Product Company',
    quote:
      'Excellent team to work with. Clear communication and practical technology solutions that helped us improve our daily operations.',
    stars: 5,
  },
  {
    name: 'Neha S.',
    role: 'Operations Manager',
    company: 'E-Commerce',
    quote:
      'We have seen a huge improvement in efficiency since implementing their solutions. Our team now spends much less time on repetitive work.',
    stars: 5,
  },
  {
    name: 'Vikram T.',
    role: 'Founder',
    company: 'SaaS Business',
    quote:
      'Reliable, professional, and truly focused on client success. The entire process was smooth and well executed.',
    stars: 5,
  },
  {
    name: 'Priya S.',
    role: 'Business Head',
    company: 'D2C Brand',
    quote:
      'Their automation approach helped us simplify our daily operations and gave our team more time to focus on business growth.',
    stars: 5,
  },
  {
    name: 'Arjun R.',
    role: 'Managing Director',
    company: 'Technology Startup',
    quote:
      'A practical approach to technology with excellent execution. Our new workflow is faster, cleaner, and easier for the team to manage.',
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

  const scrollingTestimonials = [...testimonials, ...testimonials];

  const renderCard = (
    item: (typeof testimonials)[number],
    index: number
  ) => (
    <div
      key={`${item.name}-${index}`}
      className="flex w-[calc(100vw-48px)] sm:w-[340px] shrink-0 flex-col rounded-[22px] p-6 md:p-7"
      style={{
        minHeight: '210px',
        background: isDarkT
          ? 'rgba(255,255,255,0.05)'
          : '#ffffff',
        border: isDarkT
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid rgba(0,0,0,0.07)',
        boxShadow: isDarkT
          ? '0 6px 20px rgba(0,0,0,0.25)'
          : '0 6px 20px rgba(0,0,0,0.08)',
      }}
    >
      {/* Client information */}
      <div className="mb-5 flex items-center gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white"
          style={{
            background: 'linear-gradient(135deg, #FF4800, #e03e00)',
          }}
        >
          {item.name
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')}
        </div>

        <div className="min-w-0">
          <p
            className="text-[15px] font-semibold tracking-tight"
            style={{
              color: isDarkT ? '#ffffff' : '#111827',
            }}
          >
            {item.name}
          </p>

          <p
            className="mt-0.5 text-[12px]"
            style={{
              color: isDarkT
                ? 'rgba(255,255,255,0.55)'
                : '#8a8f98',
            }}
          >
            {item.role} · {item.company}
          </p>
        </div>
      </div>

      {/* Full testimonial text — no line clamp */}
      <p
        className="text-[14px] leading-[1.55]"
        style={{
          color: isDarkT
            ? 'rgba(255,255,255,0.80)'
            : '#1f2937',
        }}
      >
        {item.quote}
      </p>

      {/* Rating */}
      <div className="mt-auto flex items-center gap-1 pt-5">
        {[...Array(item.stars)].map((_, i) => (
          <Star
            key={i}
            className="h-[17px] w-[17px] fill-current"
            style={{ color: '#FFD400' }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <section
      className="hidden w-full overflow-hidden bg-[#F6F1E7] py-12 md:py-16"
      style={{
        background: isDarkT
          ? '#0a0a14'
          : '#F6F1E7',
      }}
    >
      {/* ================= HEADING ================= */}
      <div className="relative z-10 mx-auto mb-10 w-full max-w-[800px] px-5 md:mb-12">
        <div className="text-center">
          <p
            className="mb-4 text-[11px] font-medium uppercase tracking-widest"
            style={{ color: '#FF4800' }}
          >
            CLIENT FEEDBACK
          </p>

          <h2
            className="text-black dark:text-white mx-auto font-bold text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight leading-[1.2]"
          >
            What Our Clients Say
          </h2>
        </div>
      </div>

      {/* ================= SINGLE MARQUEE ROW ================= */}
      <div className="relative z-10 mx-auto w-full max-w-7xl overflow-hidden">
        <motion.div
          className="flex w-max items-stretch gap-5"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {scrollingTestimonials.map((item, index) =>
            renderCard(item, index)
          )}
        </motion.div>
      </div>
    </section>
  );
}


// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faqs = [
  { question: 'What services does Straveda Tech offer?', answer: 'We provide AI automation, custom software development, cloud & DevOps, cybersecurity, and data analytics solutions built to reduce manual work as well We offer ongoing maintenance, optimization, and upgrades to keep your system aligned with business growth.' },
  { question: 'How can AI automation benefit my business?', answer: 'AI automation reduces repetitive tasks, lowers costs, and improves decision making. Common use cases include lead qualification, customer support, and workflow automation.' },
  { question: 'Do you build custom solutions and integrate with existing tools?', answer: 'We build fully custom solutions tailored to your workflows, goals, and scalability needs — ensuring better performance and long term ROI.' },
  { question: 'How long does a project take?', answer: 'Small systems: 1 to 2 weeks. Medium projects: 3 to 5 weeks. Large solutions: 6 to 9+ weeks. We follow a structured process from planning to deployment.Share your requirements → Get a tailored strategy → Start with a clear execution roadmap. Book a 30 Min call and we\'ll send a proposal within 48 hours.' },
  { question: 'How secure are your solutions?', answer: 'We follow industry standards like GDPR, ISO, SOC2, and HIPAA to ensure strong data protection and system security.' },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <section
      id="section-faq"
      className="bg-[#F6F1E7] dark:bg-[#0a0a14] py-12 md:py-16"
    >
      <div className="mt-0 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.5fr] gap-12 lg:gap-24">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-0 text-left lg:pt-0"
          >
            <p
              className="mb-2 text-[11px] font-bold uppercase tracking-widest"
              style={{ color: "#FF4800" }}
            >
              FREQUENTLY ASKED QUESTIONS
            </p>

            <h2
              className="font-bold text-black dark:text-white text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight leading-[1.2]"
            >
              Questions?
              <br />
              Here's what
              <br />
              teams ask first
            </h2>
          </motion.div>


          {/* RIGHT SIDE */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="w-full lg:mt-8"
          >
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 20,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease,
                      },
                    },
                  }}
                  className="overflow-hidden"
                >
                  {/* QUESTION */}
                  <button
                    data-magnetic
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between py-4 sm:py-5 text-left border-b border-black/[0.08] dark:border-white/[0.08]"
                    aria-expanded={isOpen}
                  >
                    <span className="pr-8 text-[15px] sm:text-[16px] font-medium text-[#1a1a2e] dark:text-[#e5e7eb]">
                      {faq.question}
                    </span>

                    <motion.span
                      animate={{
                        rotate: isOpen ? 45 : 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease,
                      }}
                      className={`flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen
                        ? "bg-[#FF4800] text-white"
                        : "bg-black/[0.04] dark:bg-white/[0.06] text-[#6b7280] dark:text-[#9ca3af]"
                        }`}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>

                  {/* ANSWER */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.35,
                          ease,
                        }}
                        style={{
                          overflow: "hidden",
                        }}
                      >
                        <p className="py-5 pr-14 text-[14px] sm:text-[15px] leading-[1.6] text-[#6b7280] dark:text-[#9ca3af]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
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
        <h2 className="font-bold text-black dark:text-white text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight leading-[1.2]">
          {heading}
        </h2>
      </div>
    </div>
  );
}

interface TechnologyPartner {
  name: string;
  srcLight: string;
  srcDark: string;
  width: number;
  height: number;
  className: string;
  classNameLight?: string;
}

const technologyPartners: TechnologyPartner[] = [
  {
    name: 'Next.js',
    srcLight: '/logos/nextjs-light.svg',
    srcDark: '/logos/nextjs-dark.svg',
    width: 110,
    height: 34,
    className: 'h-[38px] md:h-[46px] w-auto object-contain',
    classNameLight: 'h-[42px] md:h-[50px] w-auto object-contain',
  },
  {
    name: 'React',
    srcLight: '/logos/react-light.svg',
    srcDark: '/logos/react-dark.svg',
    width: 135,
    height: 48,
    className: 'h-[42px] md:h-[50px] w-auto object-contain',
  },
  {
    name: 'TypeScript',
    srcLight: '/logos/typescript-light.svg',
    srcDark: '/logos/typescript-dark.svg',
    width: 190,
    height: 48,
    className: 'h-[42px] md:h-[50px] w-auto object-contain',
  },
  {
    name: 'Tailwind CSS',
    srcLight: '/logos/tailwind-light.svg',
    srcDark: '/logos/tailwind-dark.svg',
    width: 210,
    height: 48,
    className: 'h-[42px] md:h-[50px] w-auto object-contain',
  },
  {
    name: 'OpenAI GPT-4o',
    srcLight: '/logos/openai-light.svg',
    srcDark: '/logos/openai-dark.svg',
    width: 235,
    height: 48,
    className: 'h-[42px] md:h-[50px] w-auto object-contain',
  },
  {
    name: 'Claude API',
    srcLight: '/logos/claude-light.svg',
    srcDark: '/logos/claude-dark.svg',
    width: 190,
    height: 48,
    className: 'h-[42px] md:h-[50px] w-auto object-contain',
  },
  {
    name: 'LangChain',
    srcLight: '/logos/langchain-light.svg',
    srcDark: '/logos/langchain-dark.svg',
    width: 185,
    height: 48,
    className: 'h-[42px] md:h-[50px] w-auto object-contain',
  },
  {
    name: 'Vector DBs',
    srcLight: '/logos/vectordb-light.svg',
    srcDark: '/logos/vectordb-dark.svg',
    width: 190,
    height: 48,
    className: 'h-[42px] md:h-[50px] w-auto object-contain',
  },
  {
    name: 'AWS',
    srcLight: '/logos/aws-light.png',
    srcDark: '/logos/aws-dark.png',
    width: 100,
    height: 60,
    className: 'h-[44px] md:h-[52px] w-auto object-contain',
  },
  {
    name: 'Google Cloud',
    srcLight: '/logos/gcp-light.png',
    srcDark: '/logos/gcp-dark.png',
    width: 288,
    height: 48,
    className: 'h-[38px] md:h-[44px] w-auto object-contain',
  },
  {
    name: 'Microsoft Azure',
    srcLight: '/logos/azure-light.png',
    srcDark: '/logos/azure-dark.png',
    width: 190,
    height: 52,
    className: 'h-[38px] md:h-[44px] w-auto object-contain',
  },
  {
    name: 'Docker',
    srcLight: '/logos/docker-light.png',
    srcDark: '/logos/docker-dark.png',
    width: 220,
    height: 52,
    className: 'h-[38px] md:h-[44px] w-auto object-contain',
  },
  {
    name: 'CI/CD',
    srcLight: '/logos/cicd-light.svg',
    srcDark: '/logos/cicd-dark.svg',
    width: 135,
    height: 48,
    className: 'h-[42px] md:h-[50px] w-auto object-contain',
  },
  {
    name: 'Security',
    srcLight: '/logos/security-light.svg',
    srcDark: '/logos/security-dark.svg',
    width: 165,
    height: 48,
    className: 'h-[42px] md:h-[50px] w-auto object-contain',
  },
  {
    name: 'PostgreSQL',
    srcLight: '/logos/postgresql-light.svg',
    srcDark: '/logos/postgresql-dark.svg',
    width: 65,
    height: 60,
    className: 'h-[48px] md:h-[56px] w-auto object-contain',
  },
  {
    name: 'Redis',
    srcLight: '/logos/redis-light.svg',
    srcDark: '/logos/redis-dark.svg',
    width: 135,
    height: 48,
    className: 'h-[42px] md:h-[50px] w-auto object-contain',
  },
  {
    name: 'Node.js',
    srcLight: '/logos/nodejs-light.svg',
    srcDark: '/logos/nodejs-dark.svg',
    width: 160,
    height: 48,
    className: 'h-[42px] md:h-[50px] w-auto object-contain',
  },
  {
    name: 'REST / GraphQL',
    srcLight: '/logos/graphql-light.svg',
    srcDark: '/logos/graphql-dark.svg',
    width: 245,
    height: 48,
    className: 'h-[42px] md:h-[50px] w-auto object-contain',
  },
  {
    name: 'Vercel',
    srcLight: '/logos/vercel-light.svg',
    srcDark: '/logos/vercel-dark.svg',
    width: 130,
    height: 26,
    className: 'h-[28px] md:h-[34px] w-auto object-contain',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage({ onNavigate }: HomePageProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [capActiveIdx, setCapActiveIdx] = useState(0);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const [count55, setCount55] = useState(0);
  const [count3, setCount3] = useState(0);
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
          // Reset counters
          setCount55(0);
          setCount3(0);
          setCount5(0);
          setCount100(0);

          const duration = 1500;
          const start = performance.now();

          const update = (time: number) => {
            const progress = Math.min((time - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            const finalCount55 = progress >= 1 ? 55 : Math.floor(55 * eased);
            const finalCount3 = progress >= 1 ? 3 : Math.floor(3 * eased);
            const finalCount5 = progress >= 1 ? 5 : Math.floor(5 * eased);
            const finalCount100 = progress >= 1 ? 100 : Math.floor(100 * eased);

            setCount55(finalCount55);
            setCount3(finalCount3);
            setCount5(finalCount5);
            setCount100(finalCount100);

            if (progress < 1) {
              animationFrame = requestAnimationFrame(update);
            }
          };

          animationFrame = requestAnimationFrame(update);
        } else {
          // Reset when section leaves viewport
          if (animationFrame) {
            cancelAnimationFrame(animationFrame);
          }

          setCount55(0);
          setCount3(0);
          setCount5(0);
          setCount100(0);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  useEffect(() => {
    const syncServiceFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      const validServices = ['automation', 'custom-software', 'ai-strategy', 'web-development'];

      setActiveService(
        validServices.includes(hash) ? hash : null
      );
    };

    syncServiceFromHash();
    window.addEventListener('hashchange', syncServiceFromHash);

    return () => {
      window.removeEventListener('hashchange', syncServiceFromHash);
    };
  }, []);
  const dragX = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Returns the width of one card + its gap (px), used for snapping math
  const getCardWidth = useCallback(() => {
    const card = trackRef.current?.querySelector<HTMLElement>('[data-cap-card]');
    return card ? card.offsetWidth + 20 : 300; // 20 = gap-5
  }, []);

  // How many cards fit in the visible track at the current breakpoint (1 on
  // mobile, 2 on tablet, 3 on desktop) — drives how far snapping can go so
  // every card stays reachable instead of assuming 3 are always in view.
  const getVisibleCount = useCallback(() => {
    if (!trackRef.current) return 3;
    const cardW = getCardWidth();
    if (!cardW) return 3;
    return Math.max(1, Math.round(trackRef.current.offsetWidth / cardW));
  }, [getCardWidth]);

  const snapToCard = useCallback((idx: number) => {
    const maxIndex = Math.max(0, bentoItems.length - getVisibleCount());
    const clamped = Math.max(0, Math.min(idx, maxIndex));

    animate(dragX, -clamped * getCardWidth(), {
      type: 'spring',
      stiffness: 260,
      damping: 32,
      mass: 0.8,
    });

    setCapActiveIdx(clamped);
  }, [dragX, getCardWidth, getVisibleCount]);

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

  // Last reachable snap index at the current breakpoint — used to disable
  // the "next" arrow once no more cards can scroll into view.
  const maxCapIndex = Math.max(0, bentoItems.length - getVisibleCount());

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

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 700], [1, 0.25]);

  return (
    <div className="overflow-x-clip w-full bg-[#F6F1E7] dark:bg-[#0a0a14]">

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .problem-num-win {
          position: relative;
          width: 100%;
          height: 0.82em;
          font-size: clamp(72px, 7vw, 100px);
          font-weight: 700;
          overflow: hidden;
        }
        .problem-num {
          display: block;
          margin-top: -0.06em;
          line-height: 1;
          letter-spacing: -0.02em;
          color: #bcc3cd;
          transform: translateY(28%);
          transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), color 0.4s ease;
        }
        .problem-num-win::after {
          content: "";
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 50%;
          background: linear-gradient(to bottom, rgba(246,241,231,0) 0%, rgba(246,241,231,0.9) 100%);
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        :is(.dark) .problem-num-win::after {
          background: linear-gradient(to bottom, rgba(10,10,20,0) 0%, rgba(10,10,20,0.9) 100%);
        }
        .problem-step { cursor: pointer; }
        .problem-step:hover .problem-num { transform: translateY(0); color: #FF4800; }
        .problem-step:hover .problem-num-win::after { opacity: 0; }
        .problem-step:hover .problem-title { color: #FF4800; }
        .problem-title { transition: color 0.3s ease; }
      `}</style>

      {/* ── Hero ── */}
      {/* Hero stays pinned (lg+) while the services section slides up and covers it */}
      <div className="relative">
        <motion.div
          id="section-hero"
          className="-mt-4 sm:mt-0 lg:sticky lg:top-0"
          style={{ opacity: heroOpacity }}
        >
          <AnimatedHero onNavigate={onNavigate} />
        </motion.div>

        {/* ── Our Expertise / Services Section (2nd Section) ── */}
        <div id="section-services" className="relative z-10">
          <InteractiveServicesSection isDark={isDark} onNavigate={onNavigate} />
        </div>
      </div>

      {/* ── Sandesa Section ── */}
      <div id="section-sandesa" className="-mt-[34vh] sm:-mt-[20vh] md:mt-0 relative z-20">
        <SandesaSection isDark={isDark} />
      </div>

{/* ── Problem Section ── */}
<section className="relative bg-[#F6F1E7] dark:bg-[#0a0a14] overflow-hidden py-8 sm:py-12 md:py-16">
  <div className="mx-auto max-w-7xl relative z-10 px-5 sm:px-6 lg:px-8">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="text-left mb-6 md:mb-8"
    >
      <p
        className="mb-4 text-[11px] font-bold uppercase tracking-widest"
        style={{ color: "#FF4800" }}
      >
        THE REAL PROBLEM
      </p>

      <h2 className="font-bold text-black dark:text-white text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight leading-[1.2]">
        You&apos;re not short on software.
      
        You&apos;re drowning in it
      </h2>
    </motion.div>

    {/* Problem columns */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5 lg:gap-x-6"
    >
      {[
        {
          heading: "The Tool Tax",
          body: "You're paying 6 to 14 SaaS subscriptions. Half overlap. None talk to each other.",
        },
        {
          heading: "The Integration Debt",
          body: 'Every new tool needs a Zapier hack. IT says a "proper integration" takes 6 months.'
        },
        {
          heading: "The Visibility Gap",
          body: "Leadership lacks pipeline visibility, operations lack inventory insights lacks clarity."
        },
        {
          heading: "The Process Drag",
          body: "Repetitive tasks and manual processes waste your team’s valuable time every day.",
        },
        {
          heading: "The Growth Barrier",
          body: "As your business grows, disconnected systems become harder to manage.",
        },
      ].map(({ heading, body }, i) => (
        <div key={heading} className="problem-step flex flex-col items-center text-center">
          <div className="problem-num-win" aria-hidden="true">
            <span className="problem-num">{String(i + 1).padStart(2, "0")}</span>
          </div>

          <h3 className="problem-title mt-4 text-xl font-bold leading-tight text-[#0b0b14] dark:text-white">
            {heading}
          </h3>

          <p className="mt-4 w-full max-w-[270px] mx-auto text-center text-[15px] leading-[1.6] text-neutral-600 dark:text-neutral-400">
            {body}
          </p>
        </div>
      ))}
    </motion.div>

  </div>
</section>


{/* ── Client Projects ── */}
<ClientProjectsSection />

{/* ── About / Who We Are / Stats Section ── */}
<section
  id="section-about"
  className="relative overflow-hidden bg-[#F6F1E7] transition-colors duration-300 dark:bg-[#0a0a14] py-12 md:py-16"
>
  <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
    {/* Top: editorial statement + supporting copy */}
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800]">
          Who we are
        </p>
        <h2
          className="max-w-3xl text-[2.1rem] font-bold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[3.75rem]"
          style={{ color: isDark ? "#ffffff" : "#0b0b14" }}
        >
          We get it because{" "}
          <motion.span
            initial={{ backgroundSize: "0% 100%", color: isDark ? "#ffffff" : "#0b0b14" }}
            whileInView={{ backgroundSize: "100% 100%", color: "#ffffff" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="box-decoration-clone px-2"
            style={{
              backgroundImage: "linear-gradient(#FF4800, #FF4800)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left center",
            }}
          >
            we&apos;ve lived it.
          </motion.span>
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="self-end text-[15px] leading-[1.8] text-neutral-600 dark:text-neutral-400"
      >
        Every growing company hits the same wall: scattered tools and wasted
        manual hours. At Straveda, we engineer unified, AI-powered systems that
        replace operational chaos with structure, clarity, and real efficiency.
      </motion.p>
    </div>

    {/* Stats row */}
    <motion.div
      ref={statsRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="mt-14 grid grid-cols-2 gap-y-10 border-t border-neutral-300/80 pt-10 dark:border-white/15 md:mt-20 lg:grid-cols-4"
    >
      {[
        { value: `${count55}%`, label: 'Manual work reduced', desc: 'Reduce repetitive work and improve everyday operations.' },
        { value: `3–${count5}x`, label: 'Operational efficiency', desc: 'Build faster workflows with connected systems.' },
        { value: `${count100}%`, label: 'Code ownership', desc: 'Scalable solutions with complete ownership of your codebase.' },
        { value: 'End-to-End', label: 'Strategy → Build → Deploy', desc: 'From strategy and development to deployment and optimization.' },
      ].map((stat, i) => (
        <div
          key={stat.label}
          className={`min-w-0 pl-5 sm:pl-8 ${i > 0 ? 'border-l border-neutral-300/80 dark:border-white/15' : 'border-l border-transparent lg:pl-0'} ${i === 2 ? 'max-lg:border-l-transparent max-lg:pl-0' : ''}`}
        >
          <p
            className="whitespace-nowrap max-sm:whitespace-normal font-bold leading-none tracking-[-0.045em] text-[#FF4800]"
            style={{ fontSize: stat.value === 'End-to-End' ? 'clamp(1.5rem, 3.2vw, 3rem)' : 'clamp(2.75rem, 5vw, 4.5rem)' }}
          >
            {stat.value}
          </p>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-900 dark:text-white">
            {stat.label}
          </p>
          <p className="mt-2 max-w-[240px] text-[13px] leading-6 text-neutral-600 dark:text-neutral-400">
            {stat.desc}
          </p>
        </div>
      ))}
    </motion.div>
  </div>
</section>


      <TestimonialsCarousel />

      {/* ── Client People / Connection Section ── */}
      <section
        className="hidden relative w-full overflow-hidden bg-[#F6F1E7] dark:bg-[#0a0a14] py-12 md:py-16"
      >
        {/* Heading */}
        <div className="relative z-40 mx-auto max-w-7xl px-5 text-center sm:px-6 lg:px-8">
         {/* Small Label */}
<p
  className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em]"
  style={{ color: "#FF4800" }}
>
  our clients
</p>


          <h2
            className="font-bold text-black dark:text-white text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight leading-[1.2] mx-auto"
          >
            Built Together Growing Together
          </h2>
        </div>

        {/* Cards + Rope */}
        <div className="relative mx-auto mt-6 h-[430px] w-full max-w-[1200px]">

          {/* ================================================= */}
          {/* ROPE - BEHIND CARDS BUT CONNECTING TO EVERY PIN */}
          {/* ================================================= */}

          <svg
            className="pointer-events-none absolute inset-0 z-[10] h-full w-full"
            viewBox="0 0 1500 430"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="
          M0 175
          C120 205, 230 205, 350 135
          C480 65, 620 115, 750 150
          C880 185, 1020 65, 1150 135
          C1270 205, 1380 205, 1500 175
        "
              stroke="#d1d5db"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>

          {/* ================================================= */}
          {/* CARDS */}
          {/* ================================================= */}

          {/* ================= DESKTOP CARDS ================= */}
          <div className="absolute inset-0 z-[20] hidden md:block">

            {/* ================= CARD 1 ================= */}
            <motion.div
              initial={{ opacity: 0, y: 25, rotate: -8 }}
              whileInView={{ opacity: 1, y: 0, rotate: -8 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="absolute left-[-5px] top-[175px] z-[20]"
            >
              <div className="relative w-[190px] overflow-visible rounded-[20px] border-[6px] border-white bg-white shadow-[0_14px_35px_rgba(0,0,0,0.10)] dark:border-[#181824] dark:bg-[#181824]">

                <div className="absolute left-1/2 top-[-48px] z-[50] h-[52px] w-[22px] -translate-x-1/2 rotate-[4deg] rounded-[5px] bg-[#FF4800] shadow-[0_3px_8px_rgba(0,0,0,0.15)]">
                  <span className="absolute left-1/2 top-[9px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-white" />
                </div>

                <div className="h-[145px] w-full overflow-hidden rounded-[13px]">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=85"
                    alt="Sarah Mitchell"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-3 py-3">
                  <h3 className="text-[15px] font-semibold leading-tight text-[#282451] dark:text-[#f0f0f5]">
                    Sarah Mitchell
                  </h3>
                  <p className="mt-1 text-[11px] text-[#6b7280] dark:text-[#9ca3af]">
                    Founder & CEO
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ================= CARD 2 ================= */}
            <motion.div
              initial={{ opacity: 0, y: 25, rotate: 5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="absolute left-[22%] top-[115px] z-[30]"
            >
              <div className="relative w-[190px] overflow-visible rounded-[20px] border-[6px] border-white bg-white shadow-[0_14px_35px_rgba(0,0,0,0.10)] dark:border-[#181824] dark:bg-[#181824]">

                <div className="absolute left-1/2 top-[-48px] z-[50] h-[52px] w-[22px] -translate-x-1/2 rotate-[4deg] rounded-[5px] bg-[#FF4800] shadow-[0_3px_8px_rgba(0,0,0,0.15)]">
                  <span className="absolute left-1/2 top-[9px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-white" />
                </div>

                <div className="h-[145px] w-full overflow-hidden rounded-[13px]">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=85"
                    alt="Daniel Carter"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-3 py-3">
                  <h3 className="text-[15px] font-semibold leading-tight text-[#282451] dark:text-[#f0f0f5]">
                    Daniel Carter
                  </h3>
                  <p className="mt-1 text-[11px] text-[#6b7280] dark:text-[#9ca3af]">
                    Operations Director
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ================= CARD 3 ================= */}
            <motion.div
              initial={{ opacity: 0, y: 25, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="absolute left-1/2 top-[150px] z-[40] -translate-x-1/2"
            >
              <div className="relative w-[190px] overflow-visible rounded-[20px] border-[6px] border-white bg-white shadow-[0_14px_35px_rgba(0,0,0,0.10)] dark:border-[#181824] dark:bg-[#181824]">

                <div className="absolute left-1/2 top-[-48px] z-[50] h-[52px] w-[22px] -translate-x-1/2 rotate-[2deg] rounded-[5px] bg-[#FF4800] shadow-[0_3px_8px_rgba(0,0,0,0.15)]">
                  <span className="absolute left-1/2 top-[9px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-white" />
                </div>

                <div className="h-[145px] w-full overflow-hidden rounded-[13px]">
                  <img
                    src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=500&q=85"
                    alt="Olivia Anderson"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-3 py-3">
                  <h3 className="text-[15px] font-semibold leading-tight text-[#282451] dark:text-[#f0f0f5]">
                    Olivia Anderson
                  </h3>
                  <p className="mt-1 text-[11px] text-[#6b7280] dark:text-[#9ca3af]">
                    Growth Lead
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ================= CARD 4 ================= */}
            <motion.div
              initial={{ opacity: 0, y: 25, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="absolute right-[22%] top-[115px] z-[30]"
            >
              <div className="relative w-[190px] overflow-visible rounded-[20px] border-[6px] border-white bg-white shadow-[0_14px_35px_rgba(0,0,0,0.10)] dark:border-[#181824] dark:bg-[#181824]">

                <div className="absolute left-1/2 top-[-48px] z-[50] h-[52px] w-[22px] -translate-x-1/2 rotate-[-4deg] rounded-[5px] bg-[#FF4800] shadow-[0_3px_8px_rgba(0,0,0,0.15)]">
                  <span className="absolute left-1/2 top-[9px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-white" />
                </div>

                <div className="h-[145px] w-full overflow-hidden rounded-[13px]">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=85"
                    alt="James Wilson"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-3 py-3">
                  <h3 className="text-[15px] font-semibold leading-tight text-[#282451] dark:text-[#f0f0f5]">
                    James Wilson
                  </h3>
                  <p className="mt-1 text-[11px] text-[#6b7280] dark:text-[#9ca3af]">
                    Business Head
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ================= CARD 5 ================= */}
            <motion.div
              initial={{ opacity: 0, y: 25, rotate: 8 }}
              whileInView={{ opacity: 1, y: 0, rotate: 8 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="absolute right-[-5px] top-[175px] z-[20]"
            >
              <div className="relative w-[190px] overflow-visible rounded-[20px] border-[6px] border-white bg-white shadow-[0_14px_35px_rgba(0,0,0,0.10)] dark:border-[#181824] dark:bg-[#181824]">

                <div className="absolute left-1/2 top-[-48px] z-[50] h-[52px] w-[22px] -translate-x-1/2 rotate-[-4deg] rounded-[5px] bg-[#FF4800] shadow-[0_3px_8px_rgba(0,0,0,0.15)]">
                  <span className="absolute left-1/2 top-[9px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-white" />
                </div>

                <div className="h-[145px] w-full overflow-hidden rounded-[13px]">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=85"
                    alt="Emma Thompson"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-3 py-3">
                  <h3 className="text-[15px] font-semibold leading-tight text-[#282451] dark:text-[#f0f0f5]">
                    Emma Thompson
                  </h3>
                  <p className="mt-1 text-[11px] text-[#6b7280] dark:text-[#9ca3af]">
                    Product Manager
                  </p>
                </div>
              </div>
            </motion.div>

          </div>


          {/* ================================================= */}
          {/* MOBILE CLIENT CARDS */}
          {/* ================================================= */}

          <div className="relative mt-6 block h-[300px] w-full overflow-hidden md:hidden">

            {/* MOBILE ROPE */}
            <svg
              className="pointer-events-none absolute left-[-10px] top-[72px] z-[5] h-[100px] w-[900px]"
              viewBox="0 0 900 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="
        M0 35
        C120 75, 180 75, 270 45
        C360 15, 450 15, 540 45
        C630 75, 720 75, 900 35
      "
                stroke="#d1d5db"
                strokeWidth="2.5"
                fill="none"
              />
            </svg>

            {/* MOBILE HORIZONTAL SCROLL */}
            <div
              className="relative z-[20] flex h-full w-full gap-5 overflow-x-auto px-5 pb-4 pt-[105px]"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >

              {/* ================= MOBILE CARD 1 ================= */}
              <div className="relative min-w-[145px] shrink-0 rotate-[-5deg]">

                <div className="absolute left-1/2 top-[-43px] z-[50] h-[46px] w-[19px] -translate-x-1/2 rotate-[4deg] rounded-[4px] bg-[#FF4800] shadow-[0_3px_8px_rgba(0,0,0,0.15)]">
                  <span className="absolute left-1/2 top-[8px] h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-white" />
                </div>

                <div className="overflow-hidden rounded-[16px] border-[5px] border-white bg-white shadow-[0_10px_25px_rgba(0,0,0,0.10)]">

                  <div className="h-[110px] w-full overflow-hidden rounded-[10px]">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=85"
                      alt="Sarah Mitchell"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="px-2.5 py-2.5">
                    <h3 className="text-[12px] font-semibold leading-tight text-[#282451]">
                      Sarah Mitchell
                    </h3>
                    <p className="mt-1 text-[9px] text-[#6b7280]">
                      Founder & CEO
                    </p>
                  </div>

                </div>
              </div>


              {/* ================= MOBILE CARD 2 ================= */}
              <div className="relative min-w-[145px] shrink-0 rotate-[4deg]">

                <div className="absolute left-1/2 top-[-43px] z-[50] h-[46px] w-[19px] -translate-x-1/2 rotate-[4deg] rounded-[4px] bg-[#FF4800] shadow-[0_3px_8px_rgba(0,0,0,0.15)]">
                  <span className="absolute left-1/2 top-[8px] h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-white" />
                </div>

                <div className="overflow-hidden rounded-[16px] border-[5px] border-white bg-white shadow-[0_10px_25px_rgba(0,0,0,0.10)]">

                  <div className="h-[110px] w-full overflow-hidden rounded-[10px]">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=85"
                      alt="Daniel Carter"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="px-2.5 py-2.5">
                    <h3 className="text-[12px] font-semibold leading-tight text-[#282451]">
                      Daniel Carter
                    </h3>
                    <p className="mt-1 text-[9px] text-[#6b7280]">
                      Operations Director
                    </p>
                  </div>

                </div>
              </div>


              {/* ================= MOBILE CARD 3 ================= */}
              <div className="relative min-w-[145px] shrink-0 rotate-[-2deg]">

                <div className="absolute left-1/2 top-[-43px] z-[50] h-[46px] w-[19px] -translate-x-1/2 rotate-[2deg] rounded-[4px] bg-[#FF4800] shadow-[0_3px_8px_rgba(0,0,0,0.15)]">
                  <span className="absolute left-1/2 top-[8px] h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-white" />
                </div>

                <div className="overflow-hidden rounded-[16px] border-[5px] border-white bg-white shadow-[0_10px_25px_rgba(0,0,0,0.10)]">

                  <div className="h-[110px] w-full overflow-hidden rounded-[10px]">
                    <img
                      src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=500&q=85"
                      alt="Olivia Anderson"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="px-2.5 py-2.5">
                    <h3 className="text-[12px] font-semibold leading-tight text-[#282451]">
                      Olivia Anderson
                    </h3>
                    <p className="mt-1 text-[9px] text-[#6b7280]">
                      Growth Lead
                    </p>
                  </div>

                </div>
              </div>


              {/* ================= MOBILE CARD 4 ================= */}
              <div className="relative min-w-[145px] shrink-0 rotate-[4deg]">

                <div className="absolute left-1/2 top-[-43px] z-[50] h-[46px] w-[19px] -translate-x-1/2 rotate-[-4deg] rounded-[4px] bg-[#FF4800] shadow-[0_3px_8px_rgba(0,0,0,0.15)]">
                  <span className="absolute left-1/2 top-[8px] h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-white" />
                </div>

                <div className="overflow-hidden rounded-[16px] border-[5px] border-white bg-white shadow-[0_10px_25px_rgba(0,0,0,0.10)]">

                  <div className="h-[110px] w-full overflow-hidden rounded-[10px]">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=85"
                      alt="James Wilson"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="px-2.5 py-2.5">
                    <h3 className="text-[12px] font-semibold leading-tight text-[#282451]">
                      James Wilson
                    </h3>
                    <p className="mt-1 text-[9px] text-[#6b7280]">
                      Business Head
                    </p>
                  </div>

                </div>
              </div>


              {/* ================= MOBILE CARD 5 ================= */}
              <div className="relative min-w-[145px] shrink-0 rotate-[-5deg]">

                <div className="absolute left-1/2 top-[-43px] z-[50] h-[46px] w-[19px] -translate-x-1/2 rotate-[-4deg] rounded-[4px] bg-[#FF4800] shadow-[0_3px_8px_rgba(0,0,0,0.15)]">
                  <span className="absolute left-1/2 top-[8px] h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-white" />
                </div>

                <div className="overflow-hidden rounded-[16px] border-[5px] border-white bg-white shadow-[0_10px_25px_rgba(0,0,0,0.10)]">

                  <div className="h-[110px] w-full overflow-hidden rounded-[10px]">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=85"
                      alt="Emma Thompson"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="px-2.5 py-2.5">
                    <h3 className="text-[12px] font-semibold leading-tight text-[#282451]">
                      Emma Thompson
                    </h3>
                    <p className="mt-1 text-[9px] text-[#6b7280]">
                      Product Manager
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </section>


{/* ── Process Section ── */}
<section
  className="relative py-12 md:py-16"
  style={{ background: isDark ? "#0a0a14" : "#F6F1E7" }}
>
  <div className="mx-auto max-w-7xl relative z-10 px-5 sm:px-6 lg:px-8">
    <div className="relative">

      {/* Connecting Line - Desktop */}
      <div
        className="pointer-events-none absolute left-[10%] right-[10%] top-10 hidden h-px md:block"
        style={{
          background:
            "linear-gradient(to right, rgba(255,72,0,0.15), #FF4800 20%, #FF4800 80%, rgba(255,72,0,0.15))",
        }}
      />

      {/* Process Steps */}
      <div className="flex flex-col md:grid md:grid-cols-5 md:gap-5 lg:gap-7">
        {[
          {
            step: "01",
            label: "Discovery",
            desc: "30-minute strategy call to analyze workflows and identify high-impact opportunities.",
            icon: Activity,
          },
          {
            step: "02",
            label: "Architecture",
            desc: "We architect the solution, define the tech stack, and prepare a clear fixed-price plan.",
            icon: Brain,
          },
          {
            step: "03",
            label: "Build",
            desc: "We build in weekly sprints with full visibility, testing, and control and accurately.",
            icon: Shield,
          },
          {
            step: "04",
            label: "Automate",
            desc: "We connect triggers, workflows, and AI agents so the system runs smoothly.",
            icon: Globe,
          },
          {
            step: "05",
            label: "Scale",
            desc: "We hand over documentation and code, giving your team full ownership.",
            icon: Cloud,
          },
        ].map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="group relative flex min-w-0 flex-col items-center text-center"
          >
            {/* Line Above Circle - Mobile (Connects from previous step to top of circle) */}
            {index > 0 && (
              <div
                className="pointer-events-none mt-4 flex h-12 w-[3px] shrink-0 items-center justify-center rounded-full bg-[#FF4800] md:hidden"
                aria-hidden="true"
              />
            )}

            {/* Icon Circle */}
            <motion.div
              whileHover={{ y: -4, scale: 1.04 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#FF4800] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-colors duration-300 group-hover:bg-[#FF4800] dark:bg-[#12121e] dark:group-hover:bg-[#FF4800] md:mb-5"
            >
              <item.icon
                size={24}
                strokeWidth={1.8}
                className="text-[#FF4800] transition-colors duration-300 group-hover:text-white"
              />
            </motion.div>

            {/* Line Below Circle - Mobile (Connects from bottom of circle to STEP text) */}
            <div
              className="pointer-events-none mb-1.5 flex h-5 w-[3px] shrink-0 items-center justify-center rounded-full bg-[#FF4800] md:hidden"
              aria-hidden="true"
            />

            {/* Step Number */}
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#FF4800]">
              STEP {item.step}
            </p>

            {/* Title */}
            <h3 className="mb-3 text-base font-semibold tracking-tight text-[#1a1a2e] dark:text-[#f0f0f5]">
              {item.label}
            </h3>

            {/* Description */}
            <p className="w-full max-w-[280px] text-center text-sm leading-6 text-[#6b7280] dark:text-[#9ca3af]">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>



      {/* ── Pricing Section ── */}
      <section
        id="pricing"
        className="relative bg-[#F6F1E7] dark:bg-[#0a0a14] overflow-hidden py-12 md:py-16"
      >
        <div className="mx-auto max-w-7xl relative z-10 px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-left mb-10 md:mb-14"
          >
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800]">
              Pricing
            </p>
            <h2 className="font-bold text-neutral-950 dark:text-white text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight leading-[1.15]">
              Flexible Engagement Models
            </h2>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Tailored systems built around your business goals, not predefined packages.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7 items-stretch">
            {[
              {
                tier: 'Focused Automation Builds',
                coreValue: 'Streamline key workflows and reduce manual effort.',
                items: [
                  'One custom automation workflow',
                  'Seamless integration with your tools',
                  'Documentation & handover',
                ],
                timeline: '2-3 weeks',
                cta: 'Start Here',
                highlight: false,
              },
              {
                tier: 'Custom Software & AI Systems',
                coreValue: 'Build scalable, business specific systems.',
                items: [
                  'End To End custom development',
                  'AI workflow integration',
                  'Scalable, ownership ready code',
                ],
                timeline: 'Based on scope',
                cta: 'Get Started',
                highlight: true,
              },
              {
                tier: 'Ongoing Optimization & Scale',
                coreValue: 'Improve, upgrade, and scale your systems.',
                items: [
                  'Performance monitoring',
                  'Feature enhancements',
                  'Continuous optimization',
                ],
                timeline: 'Monthly',
                cta: 'Book a Call',
                highlight: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={plan.tier}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <div
                  className={`relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-7 sm:p-8 ${
                    plan.highlight
                      ? 'bg-[#14110c] text-white shadow-[0_24px_60px_rgba(20,17,12,0.28)] dark:bg-[#1a1a28] dark:ring-1 dark:ring-white/10'
                      : 'bg-white text-neutral-900 border border-black/[0.07] shadow-[0_8px_30px_rgba(20,17,12,0.06)] dark:bg-[#12121a] dark:border-white/10 dark:text-white'
                  }`}
                >
                  <div className="relative">
                    <div className="h-7 mb-4 flex items-center">
                      {plan.highlight && (
                        <span className="inline-flex items-center rounded-full bg-[#FF4800] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shrink-0">
                          Most Popular
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold leading-tight min-h-[3.5rem] flex items-start">
                      {plan.tier}
                    </h3>

                    <p className={`mt-3 text-sm leading-relaxed min-h-[44px] flex items-start ${plan.highlight ? 'text-white/70' : 'text-neutral-600 dark:text-neutral-400'}`}>
                      {plan.coreValue}
                    </p>

                    <div className={`mt-6 pt-6 border-t ${plan.highlight ? 'border-white/15' : 'border-neutral-200 dark:border-white/10'}`}>
                      <ul className="space-y-3.5">
                        {plan.items.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF4800]/15 text-[#FF4800]">
                              <Check size={12} strokeWidth={3} />
                            </span>
                            <span className={`leading-snug ${plan.highlight ? 'text-white/90' : 'text-neutral-700 dark:text-neutral-300'}`}>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <p className={`mt-6 text-xs font-semibold uppercase tracking-[0.16em] ${plan.highlight ? 'text-white/60' : 'text-neutral-500 dark:text-neutral-400'}`}>
                        Timeline
                        <span className={`ml-2 text-sm normal-case tracking-normal font-bold ${plan.highlight ? 'text-white' : 'text-neutral-900 dark:text-white'}`}>
                          {plan.timeline}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-8">
                    <button
                      onClick={() => onNavigate('contact')}
                      className={`group/btn inline-flex w-full items-center justify-between rounded-full py-2 pl-6 pr-2 text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                        plan.highlight
                          ? 'bg-white text-neutral-950 hover:bg-[#FF4800] hover:text-white'
                          : 'bg-[#14110c] text-white hover:bg-[#FF4800] dark:bg-white dark:text-neutral-950 dark:hover:bg-[#FF4800] dark:hover:text-white'
                      }`}
                    >
                      {plan.cta}
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF4800] text-white transition-all duration-300 group-hover/btn:rotate-45 group-hover/btn:bg-white group-hover/btn:text-[#FF4800]">
                        <ArrowRight size={16} />
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Where We Stand / Technology Partners ── */}
      <section
        id="section-partners"
        className="bg-[#F6F1E7] dark:bg-[#0a0a14] overflow-hidden py-12 md:py-16"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center mb-10 md:mb-14">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-widest" style={{ color: '#FF4800' }}>Where we stand</p>
          <h2
            className="font-bold text-black dark:text-white text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight leading-[1.2] mx-auto"
          >
            A Foundation for What&apos;s Next
          </h2>
        </div>

        <div className="relative mx-auto w-full max-w-7xl overflow-hidden">
          {/* Edge gradient masks for seamless floating visual effect */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-8 sm:w-16 bg-gradient-to-r from-[#F6F1E7] to-transparent dark:from-[#0a0a14]" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-8 sm:w-16 bg-gradient-to-l from-[#F6F1E7] to-transparent dark:from-[#0a0a14]" />

          <div
            className="flex w-max items-center hover:[animation-play-state:paused]"
            style={{
              animation: 'marqueeScroll 28s linear infinite',
              willChange: 'transform',
            }}
          >
            {/* First set */}
            <div className="flex shrink-0 items-center gap-8 sm:gap-10 md:gap-14 pr-8 sm:pr-10 md:pr-14">
              {technologyPartners.map((partner) => (
                <div
                  key={`first-${partner.name}`}
                  className="flex h-14 md:h-20 shrink-0 items-center justify-center bg-transparent"
                >
                  <Image
                    src={partner.srcLight}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    className={`${partner.classNameLight ?? partner.className} block dark:hidden`}
                  />
                  <Image
                    src={partner.srcDark}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    className={`${partner.className} hidden dark:block`}
                  />
                </div>
              ))}
            </div>

            {/* Duplicate set for seamless auto-scroll */}
            <div className="flex shrink-0 items-center gap-8 sm:gap-10 md:gap-14 pr-8 sm:pr-10 md:pr-14">
              {technologyPartners.map((partner) => (
                <div
                  key={`second-${partner.name}`}
                  className="flex h-14 md:h-20 shrink-0 items-center justify-center bg-transparent"
                >
                  <Image
                    src={partner.srcLight}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    className={`${partner.classNameLight ?? partner.className} block dark:hidden`}
                  />
                  <Image
                    src={partner.srcDark}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    className={`${partner.className} hidden dark:block`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      <FAQSection />
    </div>
  );
}
