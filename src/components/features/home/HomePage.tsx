
'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, animate, useMotionValue } from 'framer-motion';
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
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import AnimatedHero from '@/components/features/home/AnimatedHero';
import SandesaSection from '@/components/features/home/SandesaSection';
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


// ─── Services Data ────────────────────────────────────────────────────────────

interface ServiceItem {
  badge: string;
  title: string;
  bullets: string[];
  metric?: string;
  ctaLabel: string;
  ctaDesc: string;
  page: string;
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
    page: 'automation',
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
    page: 'custom-software',
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
    page: 'ai-strategy',
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
    page: 'web-development',
  },
];

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({ service, onNavigate, isDark }: { service: ServiceItem; onNavigate: (page: string) => void; isDark: boolean }) {
  const bg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.70)';
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';
  const shadow = isDark ? '0 4px 24px rgba(0,0,0,0.30)' : '0 4px 24px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)';
 const [cardsAnimationKey, setCardsAnimationKey] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    const section = document.getElementById('services-section');

    if (!section) return;

    const rect = section.getBoundingClientRect();
    const isVisible =
      rect.top < window.innerHeight * 0.75 &&
      rect.bottom > window.innerHeight * 0.25;

    if (isVisible) {
      setCardsAnimationKey(prev => prev + 1);
    }
  };

  window.addEventListener('scroll', handleScroll);

  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return (
  <motion.div
    className="svc-card relative flex h-full flex-col overflow-hidden rounded-[20px]"
    initial={{
  opacity: 0,
  x: 70,
  scale: 0.97,
}}
animate={{
  opacity: 1,
  x: 0,
  scale: 1,
}}
transition={{
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1],
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
      <div className="flex h-[7rem] flex-col  justify-start p-6 pb-0">
        <span className="mb-3 w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: '#FF4800', background: 'rgba(255,72,0,0.09)', border: '1px solid rgba(255,72,0,0.15)' }}>
          {service.badge}
        </span>
        <h3 className="text-xl font-bold leading-[1.2] tracking-tight text-gray-900 dark:text-white">
          {service.title}
        </h3>
      </div>

      {/* Divider */}
      <div className="mx-6 my-4 mb-2 h-px" style={{ background: isDark ? 'rgba(255,255,255,0.07)' : 'linear-gradient(90deg, rgba(0,0,0,0.06), rgba(0,0,0,0.03), rgba(0,0,0,0.06))' }} />

      {/* Bullet list */}
      <div className="px-6">
        <ul className="flex flex-col gap-2.5">
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
        <div className="mx-6 mt-2 px-4 py-1 invisible" aria-hidden="true" style={{ minHeight: '3.875rem', display: 'flex', alignItems: 'flex-start' }}>
          <p className="text-[12px] leading-[1.55]">30–60% reduction in manual operations within the first 90 days</p>
        </div>
      )}

      {/* Orange footer strip */}
      <div
        className="relative mt-auto flex items-center justify-between gap-3 px-6 pb-6 pt-4"
        style={{
          background: 'linear-gradient(135deg, rgba(255,72,0,0.18) 0%, rgba(255,72,0,0.11) 60%, rgba(255,72,0,0.07) 100%)',
          borderTop: '1px solid rgba(255,72,0,0.12)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,72,0,0.35), transparent)',
          }}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span
            className="whitespace-nowrap text-[12.5px] font-bold tracking-[0.01em]"
            style={{ color: '#FF4800' }}
          >
            {service.ctaLabel} →
          </span>

          <span
            className="text-[11.5px] font-medium leading-[1.3]"
            style={{ color: 'rgba(255,72,0,0.75)' }}
          >
            {service.ctaDesc}
          </span>
        </div>

        <button
          onClick={() => onNavigate(service.page)}
          aria-label={service.ctaLabel}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-200"
          style={{
            background: '#FF4800',
            boxShadow: '0 4px 12px rgba(255,72,0,0.35)',
          }}
          onMouseEnter={e => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.background = '#e03e00';
            b.style.transform = 'scale(1.1) translateX(1px)';
            b.style.boxShadow = '0 6px 20px rgba(255,72,0,0.45)';
          }}
          onMouseLeave={e => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.background = '#FF4800';
            b.style.transform = '';
            b.style.boxShadow = '0 4px 12px rgba(255,72,0,0.35)';
          }}
        >
          <ArrowRight size={14} color="#fff" strokeWidth={2.5} />
        </button>
      </div>
    </motion.div>
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
      className="relative w-full overflow-hidden py-14 md:py-20 bg-white"
      style={{
        background: isDarkT
          ? '#0a0a14'
          : '#ffffff',
      }}
    >
      {/* ================= HEADING ================= */}
      <div className="relative z-10 mx-auto mb-10 w-full max-w-[800px] px-6 md:mb-12">
        <div className="text-center">
          <p
            className="mb-4 text-[11px] font-medium uppercase tracking-widest"
            style={{ color: '#FF4800' }}
          >
            CLIENT FEEDBACK
          </p>

          <h2
            className="text-black mx-auto font-normal text-[clamp(1.75rem,5vw,3.5rem)]"
            style={{
              lineHeight: 1.05,
              letterSpacing: '-2px',
              color: '#000000',
            }}
          >
            What Our Clients Say
          </h2>
        </div>
      </div>

      {/* ================= SINGLE MARQUEE ROW ================= */}
      <div className="relative z-10 mx-auto w-full max-w-7xl overflow-hidden px-6 md:px-10 lg:px-12">
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
  { question: 'What services does Straveda Tech offer?', answer: 'We provide AI automation, custom software development, cloud & DevOps, cybersecurity, and data analytics solutions built to reduce manual work and scale your operations.' },
  { question: 'How can AI automation benefit my business?', answer: 'AI automation reduces repetitive tasks, lowers costs, and improves decision making. Common use cases include lead qualification, customer support, and workflow automation.' },
  { question: 'Do you build custom solutions and integrate with existing tools?', answer: 'We build fully custom solutions tailored to your workflows, goals, and scalability needs — ensuring better performance and long term ROI.' },
  { question: 'How long does a project take?', answer: 'Small systems: 1 to 2 weeks. Medium projects: 3 to 5 weeks. Large solutions: 6 to 9+ weeks. We follow a structured process from planning to deployment.' },
  { question: 'How secure are your solutions?', answer: 'We follow industry standards like GDPR, ISO, SOC2, and HIPAA to ensure strong data protection and system security.' },
  { question: 'Do you provide post launch support?', answer: 'Yes. We offer ongoing maintenance, optimization, and upgrades to keep your system aligned with business growth.' },
  { question: 'How do I get started?', answer: 'Share your requirements → Get a tailored strategy → Start with a clear execution roadmap. Book a 30 Min call and we\'ll send a proposal within 48 hours.' },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <section
      id="section-faq"
      className="glow-hover py-6 md:py-8 bg-white dark:bg-[#0a0a14] border-t border-black/[0.06] dark:border-white/[0.06]"
    >
      <div className="mt-0 mx-auto max-w-7xl px-6 md:px-10 lg:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.5fr] gap-12 lg:gap-24">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className="mt-0 text-left lg:pt-0"
          >
            <p
              className="mb-2 text-[11px] font-medium uppercase tracking-widest"
              style={{ color: "#FF4800" }}
            >
              FREQUENTLY ASKED QUESTIONS
            </p>

            <h2
              className="font-normal text-black text-[clamp(1.75rem,5vw,3.5rem)]"
              style={{
                lineHeight: 1.02,
                letterSpacing: "-2.5px",
                color: "#000000",
              }}
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
            viewport={{ once: true, margin: "-100px" }}
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
        <h2 className="font-normal text-black" style={{ fontSize: 'clamp(1.6rem, 5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-1px', overflowWrap: 'break-word', color: '#000000' }}>
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

  return (
    <div className="overflow-x-hidden w-full bg-white dark:bg-[#0a0a14]">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .problem-number-fade {
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 85%);
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 85%);
          transition: -webkit-mask-image 0.35s ease, mask-image 0.35s ease;
        }
        .group:hover .problem-number-fade {
          -webkit-mask-image: none !important;
          mask-image: none !important;
        }
      `}</style>

      {/* ── Hero ── */}
      <div id="section-hero">
        <AnimatedHero onNavigate={onNavigate} />
      </div>

      {/* ── Our Expertise / Services Section (2nd Section) ── */}
      <section
        id="section-services"
        className="relative py-14 md:py-20 bg-white dark:bg-[#0a0a14] overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
            className="mb-10 md:mb-14"
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#FF4800]">
              OUR Services
            </p>
             <h2 className="font-normal text-black text-center md:text-left text-[2.5rem]" style={{ color: '#000000' }}>
               Enterprise Software & AI Automation Services
              </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-8xl leading-relaxed">
              We build high performance infrastructure and intelligent automation systems designed for the next generation of enterprise growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                badge: 'AUTOMATION',
                title: 'AI & Business Automation',
                description:
                  'WhatsApp flows, email sequences, and AI agents that remove 30–60% of manual operations within the first 90 days.',
                capabilities: [
                  'WhatsApp Automation',
                  'Email Sequences',
                  'AI Support',
                ],
                route: 'automation',
              },
              {
                icon: Code,
                badge: 'SOFTWARE',
                title: 'Custom Software & Systems',
                description:
                  'AI powered CRMs, real time dashboards, and internal tools built around your exact workflow—not rigid SaaS constraints.',
                capabilities: [
                  'AI Powered CRMs',
                  'Operational Dashboards',
                  'Customer Portals',
                ],
                route: 'custom-software',
              },
              {
                icon: Cpu,
                badge: 'STRATEGY',
                title: 'AI Strategy & Integration',
                description:
                  'GPT class models, custom LLMs, and RAG systems integrated directly into your existing operations stack for measurable ROI.',
                capabilities: [
                  'AI Architecture',
                  'LLM Fine Tuning',
                  'RAG Systems',
                ],
                route: 'ai-strategy',
              },
              {
                icon: Globe,
                badge: 'DIGITAL',
                title: 'Web Design & Experiences',
                description:
                  'High-performance Next.js sites, 3D interactive builds, and conversion funnels deployed to global edge infrastructure.',
                capabilities: [
                  'Next.js Performance',
                  '3D & Interactive',
                  'Conversion Funnels',
                ],
                route: 'web-development',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.4, 0, 0.2, 1],
                }}
                onClick={() => onNavigate(card.route)}
                className="group relative flex flex-col justify-between h-full cursor-pointer select-none bg-white border border-[#eeeeee] shadow-[0_4px_20px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.04)] dark:bg-[#1a1a1a] dark:border-white/[0.06] dark:shadow-none hover:border-[#FF4800]/30 transition-all duration-200 rounded-2xl p-6 sm:p-7"
              >
                <div>
                  {/* Squircle icon container */}
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{
                      background: 'rgba(255, 72, 0, 0.08)',
                      border: '1px solid rgba(255, 72, 0, 0.12)',
                    }}
                  >
                    <card.icon size={22} className="text-[#FF4800]" strokeWidth={1.8} />
                  </div>

                  {/* Badge */}
                  <span className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF4800]">
                    {card.badge}
                  </span>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-bold leading-tight tracking-tight text-[#1a1a2e] dark:text-[#f0f0f5]">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 text-[14px] leading-relaxed text-[#6b7280] dark:text-[#9ca3af]">
                    {card.description}
                  </p>

                  {/* Capabilities bullet list */}
                  <ul className="space-y-2.5">
                    {card.capabilities.map((cap, capIdx) => (
                      <li
                        key={capIdx}
                        className="flex items-center gap-2 text-[12px] text-[#6b7280] dark:text-[#9ca3af]"
                      >
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF4800]"
                          aria-hidden="true"
                        />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sandesa Section ── */}
      <SandesaSection isDark={isDark} />

      {/* ── About / Stats ── */}

      <section
        id="section-about"
        className="relative py-8 md:py-14 bg-white dark:bg-[#0a0a14]"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 md:gap-10 px-4 sm:px-6 lg:px-8 lg:flex-row lg:items-start relative">

          {/* Stats column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="flex w-full flex-col lg:w-[40%]"
          >
            {/* On mobile: centered stats block; on desktop: left-bordered */}
            <div
              ref={statsRef}
              className="grid grid-cols-1 gap-6 md:gap-8 border-l-[3px] border-[#FF4800] pl-6">
              {[
                { val: `${count55}%`, label: 'Manual Work Reduced' },
                { val: `${count3}–${count5}x`, label: 'Operational Efficiency' },
                { val: `${count100}%`, label: 'Code Ownership' },
                { val: 'End-to-End', label: 'Strategy → Build → Deploy' },
              ].map(s => (
                <div key={s.label} className="text-center md:text-left">
                  <p
                    className="text-[#1a1a2e] dark:text-[#f0f0f5]"
                    style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em' }}
                  >
                    {s.label === 'Manual Work Reduced'
                      ? `${count55}%`
                      : s.label === 'Operational Efficiency'
                        ? `3–${count5}x`
                        : s.label === 'Code Ownership'
                          ? `${count100}%`
                          : s.val}
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
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="flex w-full flex-col lg:w-[50%]"
          >
            <p className="-mt-0 mb-5 text-[11px] font-medium uppercase tracking-widest text-center md:text-left" style={{ color: '#FF4800' }}>WHO WE ARE</p>
            <div className="flex items-start gap-4 mb-6 justify-center md:justify-start">
              <h2 className="font-normal text-black text-center md:text-left text-[2.5rem]" style={{ color: '#000000' }}>
                We Get It  Because We've Lived It
              </h2>
            </div>
            <p className="text-base sm:text-[18px] leading-[1.65] text-[#6b7280] dark:text-[#9ca3af] text-justify ">
              Every growing company hits the same wall: scattered tools, disconnected spreadsheets, and wasted manual hours. You don't need another vendor or enterprise bloat—you need a partner who truly understands the problem. At Straveda, we engineer unified, AI-powered systems that replace operational chaos with structure, clarity, and real efficiency.
            </p>
          </motion.div>
        </div>
      </section>

      <TestimonialsCarousel />

      {/* ── Client People / Connection Section ── */}
      <section
        className="hidden relative w-full overflow-hidden bg-white py-8 md:py-10 dark:bg-[#0a0a14]"
      >
        {/* Heading */}
        <div className="relative z-40 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p
            className="mb-4 text-[11px] font-medium uppercase tracking-widest"
            style={{ color: "#FF4800" }}
          >
            OUR CLIENTS
          </p>


          <h2
            className="font-normal text-black text-[clamp(1.75rem,5vw,3.5rem)] mx-auto"
            style={{
              lineHeight: 1.05,
              letterSpacing: "-2px",
              color: "#000000",
            }}
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
      {/* ── Problem Section ── */}
      <section className="relative py-14 md:py-22 bg-white dark:bg-[#0a0a14] overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className="text-center mb-12 md:mb-16"
          >
            <p
              className="mb-4 text-[11px] font-medium uppercase tracking-widest"
              style={{ color: "#FF4800" }}
            >
              THE REAL PROBLEM
            </p>

            <h2
              className="font-normal text-black text-[clamp(1.75rem,5vw,3.5rem)] mx-auto"
              style={{
                lineHeight: 1.05,
                letterSpacing: "-2px",
                color: "#000000",
              }}
            >
              You&apos;re not short on software
              <br />
              You&apos;re drowning in it
            </h2>

            <p className="mt-5 text-base sm:text-[17px] leading-[1.6] text-[#6b7280] dark:text-[#9ca3af] max-w-2xl mx-auto text-center">
              Too many tools and disconnected processes create unnecessary complexity. We simplify your workflow by bringing the right systems together in one practical solution.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease,
            }}
            className="grid w-full grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-10 text-center"
          >
            {[
              {
                num: "01",
                heading: "The Tool Tax",
                body:
                  "You're paying 6 to 14 SaaS subscriptions. Half overlap. None talk to each other. Your team spends 2 hours a day moving data between them manually.",
              },
              {
                num: "02",
                heading: "The Integration Debt",
                body:
                  'Every new tool requires a Zapier hack. Every Zapier hack breaks monthly. IT says a "proper integration" is a 6 Month project. So nothing gets built.',
              },
              {
                num: "03",
                heading: "The Visibility Gap",
                body:
                  "Leadership can't see pipeline health, ops can't see inventory, and finance finds out about problems when it's already too late to Course Correct.",
              },
            ].map((item) => (
              <motion.div
                key={item.num}
                initial="rest"
                whileHover="hover"
                className="group flex flex-col items-center cursor-pointer"
              >

                {/* NUMBER AREA */}
                <div className="relative h-[96px] sm:h-[100px] md:h-[108px] w-full flex items-end justify-center overflow-hidden">

                  <motion.div
                    variants={{
                      rest: {
                        y: 20,
                        opacity: 1,
                        scale: 0.96,
                        color: isDark ? "rgba(255,255,255,0.4)" : "#CBD5E1",
                      },
                      hover: {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        color: "#FF4800",
                      },
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
    problem-number-fade
    absolute
    bottom-2
    text-[78px]
    sm:text-[84px]
    md:text-[90px]
    lg:text-[96px]
    font-semibold
    tracking-[-0.07em]
    leading-[0.72]
    select-none
  "
                  >
                    {item.num}
                  </motion.div>
                </div>

                {/* Heading */}
                <h3 className="mt-3 text-[17px] sm:text-[18px] md:text-[19px] font-semibold leading-tight text-[#1a1a2e] dark:text-[#f0f0f5]">
                  {item.heading}
                </h3>

                {/* Description */}
                <p className="mt-2 max-w-[320px] text-[14px] sm:text-[15px] leading-[1.55] text-[#6b7280] dark:text-[#9ca3af]">
                  {item.body}
                </p>

              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* ── Process Section ── */}
      <section
        className="relative py-16 md:py-28"
        style={{ background: isDark ? '#12121e' : '#ffffff' }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="-mt-20 mb-10 md:mb-16"
          >
            <SectionHeader
              label="HOW WE WORK"
              heading="From Strategy Call to Live System"
            />
          </motion.div>

          <div className="relative isolate">

            {/* Horizontal line */}
            <div
              className="hidden md:block absolute top-10 left-[8%] right-[8%] h-px z-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, rgba(255,72,0,0.15), #FF4800, rgba(255,72,0,0.15))',
              }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5  lg:gap-6 relative z-10 ">

              {[
                {
                  step: '01',
                  label: 'Discovery',
                  desc: '30-min strategy call to analyze workflows, identify bottlenecks, and map high-impact automation with zero sales pitch.',
                  icon: Activity,
                },
                {
                  step: '02',
                  label: 'Architecture',
                  desc: 'We architect the solution, define the tech stack, and deliver a clear fixed-price proposal within 24 hours.',
                  icon: Brain,
                },
                {
                  step: '03',
                  label: 'Build',
                  desc: 'We build in weekly sprints with total visibility. You review progress, give feedback, and stay in full control.',
                  icon: Shield,
                },
                {
                  step: '04',
                  label: 'Automate',
                  desc: 'We wire triggers, workflows, and AI agents so the system runs smoothly without any manual intervention.',
                  icon: Globe,
                },
                {
                  step: '05',
                  label: 'Scale',
                  desc: 'Full handover with documentation and training. Your team owns 100% of the code and operational systems.',
                  icon: Cloud,
                },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 0.6,
                    delay: parseInt(item.step) * 0.08,
                    ease,
                  }}
                  className="relative flex flex-col items-center text-center min-w-0"
                >

                  {/* Icon */}
                  <div
                    className="group/btn relative z-20 flex items-center justify-center w-20 h-20 rounded-full mb-4 border border-[#FF4800] bg-white dark:bg-[#12121e] hover:bg-[#FF4800] dark:hover:bg-[#FF4800] transition-colors duration-200 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                  >
                    <item.icon
                      size={24}
                      strokeWidth={1.8}
                      className="text-[#FF4800] group-hover/btn:text-white transition-colors duration-200"
                    />
                  </div>

                  {/* Step */}
                  <p
                    className="text-[14px] font-semibold uppercase tracking-wide mb-2"
                    style={{ color: '#FF4800' }}
                  >
                    STEP {item.step}
                  </p>

                  {/* Title */}
                  <h3 className="text-[16px] font-semibold mb-2 text-[#1a1a2e] dark:text-[#f0f0f5]">
                    {item.label}
                  </h3>

                  {/* Description */}
                  <p className="w-full text-[13.5px] leading-[1.6] text-[#6b7280] dark:text-[#9ca3af] text-center line-clamp-3">
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
        className="relative py-16 md:py-24 bg-white dark:bg-[#0a0a14] overflow-hidden"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="text-center mb-10 md:mb-16"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-500 dark:text-neutral-400">
              PRICING
            </p>
            <h2
              className="font-normal text-black dark:text-white text-[clamp(1.75rem,5vw,3.5rem)] mx-auto"
              style={{ lineHeight: 1.05, letterSpacing: '-2px' }}
            >
              Flexible Engagement Models
            </h2>
            <p className="mt-4 text-base sm:text-[17px] leading-[1.6] text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
              Tailored systems built around your business goals not predefined packages.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
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
                highlight: false,
              },
            ].map((plan) => (
              <motion.div
                key={plan.tier}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease }}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between bg-white dark:bg-[#12121a] transition-shadow duration-200 ${
                  plan.highlight
                    ? 'border-2 border-black dark:border-white shadow-xl relative'
                    : 'border border-neutral-200 dark:border-neutral-800 shadow-sm'
                }`}
              >
                <div>
                  {/* Top Badge Slot (Uniform height so all 3 card headings start at identical horizontal line) */}
                  <div className="h-7 mb-3 flex items-center">
                    {plan.highlight && (
                      <span className="inline-flex items-center rounded-full bg-orange-500 px-3.5 py-1 text-xs font-semibold text-neutral-900 shrink-0">
                        Most Popular
                      </span>
                    )}
                  </div>

                  {/* Heading Title (Uniform min-height so descriptions & dividers align horizontally) */}
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white leading-tight min-h-[3.5rem] flex items-start">
                    {plan.tier}
                  </h3>

                  {/* Description (Uniform min-height so divider line aligns horizontally) */}
                  <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed min-h-[44px] flex items-start">
                    {plan.coreValue}
                  </p>

                  {/* Horizontal Line & Features Heading (Aligned in exact same horizontal line across all cards) */}
                  <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">
                      Features
                    </p>
                    <ul className="space-y-3.5">
                      {plan.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300"
                        >
                          <span className="text-neutral-900 dark:text-white font-bold leading-none select-none text-base">
                            •
                          </span>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                      {/* Timeline directly under 3 points  */}
                      <li className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                        <span className="leading-snug">
                          <strong className="font-semibold text-neutral-900 dark:text-white">
                            Timeline:
                          </strong>{' '}
                          {plan.timeline}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Button placed directly after points and timeline */}
                <div className="mt-8 pt-2">
                 <button
  onClick={() => onNavigate('contact')}
  className={`w-full rounded-full py-3.5 px-6 text-sm font-semibold transition-all duration-200 cursor-pointer ${
    plan.highlight
      ? 'bg-black text-white hover:bg-neutral-800 shadow-sm dark:bg-white dark:text-black dark:hover:bg-neutral-200'
      : 'border border-neutral-300 bg-white text-neutral-900 hover:bg-black hover:text-white hover:border-black dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-100 dark:hover:bg-white dark:hover:text-black'
  }`}
>
  {plan.tier === 'Focused Automation Builds'
    ? 'Start Here'
    : plan.tier === 'Ongoing Optimization & Scale'
    ? 'Book a Call'
    : 'Get Started'}
</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Where We Stand / Technology Partners ── */}
      <section
        id="section-partners"
        className="py-14 md:py-20 bg-white dark:bg-[#0a0a14] border-t border-black/[0.06] dark:border-white/[0.06] overflow-hidden"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center mb-10 md:mb-14">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>Where we stand</p>
          <h2
            className="font-normal text-black mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-1.5px', overflowWrap: 'break-word', wordBreak: 'break-word', color: '#000000' }}
          >
            A Foundation for What&apos;s Next
          </h2>
        </div>

        <div className="mx-auto w-full max-w-7xl overflow-hidden">
          <motion.div
            className="flex w-max items-center"
            animate={{ x: [0, '-50%'] }}
            transition={{
              duration: 25,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {/* First set */}
            <div className="flex shrink-0 items-center gap-10 md:gap-14 pr-10 md:pr-14">
              {[
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
                  name: 'Docker',
                  srcLight: '/logos/docker-light.png',
                  srcDark: '/logos/docker-dark.png',
                  width: 220,
                  height: 52,
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
  name: "Vercel",
  srcLight: "/logos/vercel-light.svg",
  srcDark: "/logos/vercel-dark.svg",
  width: 130,
  height: 26,
  className: "h-[22px] md:h-[26px] w-auto object-contain",
  style: {
    width: "auto",
  },
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
                  name: 'Next.js',
                  srcLight: '/logos/nextjs-light.svg',
                  srcDark: '/logos/nextjs-dark.svg',
                  width: 110,
                  height: 34,
                  className: 'h-[30px] md:h-[34px] w-auto object-contain',
                  classNameLight: 'h-[42px] md:h-[48px] w-auto object-contain',
                },
              ].map((partner) => (
                <div
                  key={`first-${partner.name}`}
                  className="flex h-16 md:h-20 shrink-0 items-center justify-center bg-transparent"
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
            <div className="flex shrink-0 items-center gap-10 md:gap-14 pr-10 md:pr-14">
              {[
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
                  name: 'Docker',
                  srcLight: '/logos/docker-light.png',
                  srcDark: '/logos/docker-dark.png',
                  width: 220,
                  height: 52,
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
                  name: 'Vercel',
                  srcLight: '/logos/vercel-light.svg',
                  srcDark: '/logos/vercel-dark.svg',
                  width: 130,
                  height: 26,
                  className: 'h-[22px] md:h-[26px] w-auto object-contain',
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
                  name: 'Next.js',
                  srcLight: '/logos/nextjs-light.svg',
                  srcDark: '/logos/nextjs-dark.svg',
                  width: 110,
                  height: 34,
                  className: 'h-[30px] md:h-[34px] w-auto object-contain',
                  classNameLight: 'h-[42px] md:h-[48px] w-auto object-contain',
                },
              ].map((partner) => (
                <div
                  key={`second-${partner.name}`}
                  className="flex h-16 md:h-20 shrink-0 items-center justify-center bg-transparent"
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
          </motion.div>
        </div>
      </section>



      <FAQSection />
    </div>
  );
}
