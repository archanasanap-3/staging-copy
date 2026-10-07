
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

// ─── Interactive Services (Section 2) ─────────────────────────────────────────

interface ServiceDetail {
  number: string;
  badge: string;
  title: string;
  description: string;
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
      'WhatsApp flows, behavior-triggered email sequences, and AI agents that remove 30–60% of manual operations within the first 90 days.',
    ctaLabel: 'Explore AI & Automation',
    route: 'automation',
    image: '/images/services/automation.jpg',
  },
  {
    number: '02',
    badge: 'SOFTWARE',
    title: 'Custom Software & Systems',
    description:
      'AI-powered CRMs, real-time dashboards, and internal tools built around your exact workflow—free from rigid SaaS constraints.',
    ctaLabel: 'Explore Custom Software',
    route: 'custom-software',
    image: '/images/services/custom-software.jpg',
  },
  {
    number: '03',
    badge: 'STRATEGY',
    title: 'AI Strategy & Integration',
    description:
      'GPT-class models, custom fine-tuned LLMs, and enterprise RAG systems integrated directly into your operations stack for measurable ROI.',
    ctaLabel: 'Explore AI Strategy',
    route: 'ai-strategy',
    image: '/images/services/ai-strategy.jpg',
  },
  {
    number: '04',
    badge: 'DIGITAL',
    title: 'Web Design & Experiences',
    description:
      'High-performance Next.js sites, 3D interactive builds, and conversion funnels deployed to global edge infrastructure.',
    ctaLabel: 'Explore Web Experiences',
    route: 'web-development',
    image: '/images/services/web-development.jpg',
  },
];

function InteractiveServicesSection({
  isDark,
  onNavigate,
}: {
  isDark: boolean;
  onNavigate: (page: string) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto rotate timer every 4s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % servicesData.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const activeService = servicesData[activeIndex];

  const handleSelectService = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      id="section-services"
      className="relative py-12 md:py-16 bg-white dark:bg-[#0a0a14] overflow-hidden transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="mb-10 md:mb-14"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#FF4800]">
            OUR Services
          </p>
          <h2
            className="font-bold text-black dark:text-white text-left text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight leading-[1.2]"
            style={{ color: isDark ? '#ffffff' : '#000000' }}
          >
            Enterprise Software &amp; AI Automation Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-full leading-relaxed">
            We build high performance infrastructure and intelligent automation
            systems designed for the next generation of enterprise growth.
          </p>
        </motion.div>

        {/* ── Main Showcase: Left Names List & Right Direct Image + Info ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* ──── Left Side: Only Numbers + Service Names (Highlight on Active/Hover) ──── */}
          <div className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-6">
            {servicesData.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.number}
                  onClick={() => handleSelectService(index)}
                  onMouseEnter={() => handleSelectService(index)}
                  className="group flex items-center gap-6 sm:gap-9 cursor-pointer select-none py-1.5 transition-all duration-200"
                >
                  {/* Left Number (01, 02, 03, 04) */}
                  <span
                    className={`font-mono text-2xl sm:text-3xl md:text-4xl transition-colors duration-300 w-10 sm:w-12 shrink-0 ${
                      isActive
                        ? 'font-bold text-black dark:text-white'
                        : 'font-normal text-neutral-300 dark:text-neutral-700'
                    }`}
                  >
                    {item.number}
                  </span>

                  {/* Service Title */}
                  <h3
                    className={`text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] tracking-tight transition-all duration-300 leading-snug ${
                      isActive
                        ? 'font-bold text-black dark:text-white'
                        : 'font-semibold text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-500 dark:group-hover:text-neutral-400'
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* ──── Right Side: Direct Image (No outer card) + Info + Button ──── */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end">
            <div className="w-full max-w-md flex flex-col">
              {/* Image Preview Container (Sleek, Compact, No outer card box) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl shadow-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.number}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={activeService.image}
                      alt={activeService.title}
                      fill
                      priority
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 450px"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Info text beneath image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.number}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="mt-3.5 space-y-3.5"
                >
                  <p className="text-[13px] sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {activeService.description}
                  </p>

                  {/* Compact Pill CTA Button */}
                  <div>
                    <button
                      onClick={() => onNavigate(activeService.route)}
                      className="inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 px-5 py-2.5 text-xs sm:text-[13px] font-medium hover:bg-[#FF4800] dark:hover:bg-[#FF4800] dark:hover:text-white transition-all duration-200 shadow-sm cursor-pointer group"
                    >
                      <span>{activeService.ctaLabel}</span>
                      <ArrowRight
                        size={13}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
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
      className="hidden w-full overflow-hidden py-14 md:py-20 bg-white"
      style={{
        background: isDarkT
          ? '#0a0a14'
          : '#ffffff',
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
            className="text-black mx-auto font-bold text-[clamp(1.75rem,5vw,3.5rem)]"
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
      className="glow-hover py-12 md:py-16 bg-white dark:bg-[#0a0a14] border-t border-black/[0.06] dark:border-white/[0.06]"
    >
      <div className="mt-0 mx-auto max-w-7xl">

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
              className="font-bold text-black text-[clamp(1.75rem,5vw,3.5rem)]"
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
        <h2 className="font-bold text-black dark:text-white" style={{ fontSize: 'clamp(1.6rem, 5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-1px', overflowWrap: 'break-word' }}>
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
      <div id="section-services">
        <InteractiveServicesSection isDark={isDark} onNavigate={onNavigate} />
      </div>

      {/* ── Sandesa Section ── */}
      <div id="section-sandesa">
        <SandesaSection isDark={isDark} />
      </div>
{/* ── About / Stats ── */}
<section
  id="section-about"
  className="relative bg-white py-12 md:py-16"
>
  <div className="mx-auto w-full max-w-7xl">

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
        <h2
          className="text-[clamp(2.2rem,4.5vw,4rem)] font-bold text-black dark:text-white"
          style={{
            lineHeight: 1.05,
            letterSpacing: "-2.5px",
          }}
        >
          We Get It Because
          <br />
          We&apos;ve Lived It
        </h2>

        {/* Paragraph */}
        <p className="mt-8 max-w-[520px] text-[14px] leading-[1.65] text-[#6b7280] sm:text-[15px] lg:mt-[50px]">
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

          <span
            className="mt-3 inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide bg-[#F1F1F1] text-[#555555] dark:bg-white/10 dark:text-neutral-300"
          >
            Manual Work Reduced
          </span>

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

          <span
            className="mt-3 inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide bg-[#F1F1F1] text-[#555555] dark:bg-white/10 dark:text-neutral-300"
          >
            Operational Efficiency
          </span>

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

          <span
            className="mt-3 inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide bg-[#F1F1F1] text-[#555555] dark:bg-white/10 dark:text-neutral-300"
          >
            Code Ownership
          </span>

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

          <span
            className="mt-3 inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide bg-[#F1F1F1] text-[#555555] dark:bg-white/10 dark:text-neutral-300"
          >
            Strategy → Build → Deploy
          </span>

          <p className="mt-2.5 text-[13px] sm:text-[14px] leading-relaxed text-[#6b7280] dark:text-[#9ca3af]">
            From strategy and development to deployment and optimization.
          </p>
        </div>

      </motion.div>

    </div>
  </div>
</section>
      <TestimonialsCarousel />

      {/* ── Client People / Connection Section ── */}
      <section
        className="hidden relative w-full overflow-hidden bg-white py-8 md:py-10 dark:bg-[#0a0a14]"
      >
        {/* Heading */}
        <div className="relative z-40 mx-auto max-w-7xl px-0 text-center">
          <p
            className="mb-4 text-[11px] font-medium uppercase tracking-widest"
            style={{ color: "#FF4800" }}
          >
            OUR CLIENTS
          </p>


          <h2
            className="font-bold text-black dark:text-white text-[clamp(1.75rem,5vw,3.5rem)] mx-auto"
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
<section className="relative py-12 md:py-16 bg-white dark:bg-[#0a0a14] overflow-hidden">
  <div className="mx-auto max-w-7xl relative z-10">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease }}
      className="text-left mb-12 md:mb-16"
    >
      <p
        className="mb-4 text-[11px] font-medium uppercase tracking-widest"
        style={{ color: "#FF4800" }}
      >
        THE REAL PROBLEM
      </p>

      <h2
        className="font-bold text-black dark:text-white text-[clamp(1.75rem,5vw,3.5rem)] whitespace-nowrap"
        style={{
          lineHeight: 1.05,
          letterSpacing: "-2px",
        }}
      >
        You&apos;re not short on software
        <span className="mx-3">·</span>
        You&apos;re drowning in it
      </h2>
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
      className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 text-center"
    >

      {[
        {
          num: "01",
          heading: "The Tool Tax",
          body:
            "You're paying 6 to 14 SaaS subscriptions. Half overlap. None talk to each other.",
        },
        {
          num: "02",
          heading: "The Integration Debt",
          body:
            'Every new tool requires a Zapier hack.  IT says a "proper integration" is a 6 Month project.',
        },
        {
          num: "03",
          heading: "The Visibility Gap",
          body:
            "Leadership can't see pipeline health, ops can't see inventory, and finance.",
        },
        {
          num: "04",
          heading: "The Process Drag",
          body:
            "Manual approvals, repetitive data entry, and scattered workflows slow your team down.",
        },
        {
          num: "05",
          heading: "The Growth Barrier",
          body:
            "As your business grows, disconnected systems become harder to manage.",
        },
      ].map((item) => (
        <motion.div
          key={item.num}
          initial="rest"
          whileHover="hover"
          className="group flex flex-col items-center cursor-pointer"
        >

          {/* NUMBER AREA */}
          <div className="relative h-[100px] sm:h-[110px] md:h-[118px] w-full flex items-end justify-center overflow-hidden">

            <motion.div
              variants={{
                rest: {
                  y: 20,
                  opacity: 1,
                  scale: 0.96,
                  color: isDark
                    ? "rgba(255,255,255,0.4)"
                    : "#CBD5E1",
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
                font-extrabold
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


          {/* Description — 3 lines */}
          <p className="mt-2 max-w-[320px] h-[72px] text-[16px] sm:text-[15px] leading-[1.55] text-[#6b7280] dark:text-[#9ca3af] text-center line-clamp-3 overflow-hidden">
            {item.body}
          </p>

        </motion.div>
      ))}
    </motion.div>

  </div>
</section>

      {/* ── Process Section ── */}
      <section
        className="relative py-12 md:py-16"
        style={{ background: isDark ? '#12121e' : '#ffffff' }}
      >
        <div className="mx-auto max-w-7xl relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="mb-10 md:mb-16"
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
                  desc: '30-min strategy call to analyze workflows, and map high-impact automation.',
                  icon: Activity,
                },
                {
                  step: '02',
                  label: 'Architecture',
                  desc: 'We architect the solution, define the tech stack, and deliver a clear fixed-price.',
                  icon: Brain,
                },
                {
                  step: '03',
                  label: 'Build',
                  desc: 'We build in weekly sprints with total visibility & stay in full control.',
                  icon: Shield,
                },
                {
                  step: '04',
                  label: 'Automate',
                  desc: 'We wire triggers, workflows, and AI agents so the system runs smoothly .',
                  icon: Globe,
                },
                {
                  step: '05',
                  label: 'Scale',
                  desc: 'Full handover with and  documentation, Your team owns 100% of the code.',
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
                  <p className="w-full text-[16px] leading-[1.6] text-[#6b7280] dark:text-[#9ca3af] text-justify line-clamp-4">
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
        className="relative py-12 md:py-16 bg-white dark:bg-[#0a0a14] overflow-hidden"
      >
        <div className="mx-auto max-w-7xl relative z-10">
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
              className="font-bold text-black dark:text-white text-[clamp(1.75rem,5vw,3.5rem)] mx-auto"
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
        className="py-12 md:py-16 bg-white dark:bg-[#0a0a14] border-t border-black/[0.06] dark:border-white/[0.06] overflow-hidden"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center mb-10 md:mb-14">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>Where we stand</p>
          <h2
            className="font-bold text-black dark:text-white mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-1.5px', overflowWrap: 'break-word', wordBreak: 'break-word' }}
          >
            A Foundation for What&apos;s Next
          </h2>
        </div>

        <div className="mx-auto w-full max-w-7xl overflow-hidden">
          <motion.div
            className="flex w-max items-center"
            animate={{ x: [0, '-50%'] }}
            transition={{
              duration: 40,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {/* First set */}
            <div className="flex shrink-0 items-center gap-10 md:gap-14 pr-10 md:pr-14">
              {technologyPartners.map((partner) => (
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
              {technologyPartners.map((partner) => (
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
