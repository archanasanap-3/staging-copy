'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Diamond,
  TrendingDown,
  ShieldCheck,
  ArrowRight,
  Cloud,
  Database,
  Code,
  Network,
  Cpu,
  Globe,
  Lock,
  GitBranch,
  Layers,
  Zap,
  BarChart3,
  Workflow,
  MessageCircle,
  Mail,
  Bot,
  Users
} from 'lucide-react';
import MagneticButton from '@/components/features/common/MagneticButton';
import ServiceComparison from '@/components/features/services/ServiceComparison';
import ServicesHoverModal from '@/components/features/services/ServicesHoverModal';
import PageHeader from '@/components/shared/PageHeader';
import ServicesSection from '@/components/features/services/ServicesSection';
import HorizontalCarousel from '@/components/features/common/HorizontalCarousel';

/* ------------------------------------------------------------------ */
/* Component-level Styles                                             */
/* ------------------------------------------------------------------ */

function ServicesPageStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
      .btn-shine {
        position: relative;
        overflow: hidden;
      }

      .btn-shine::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(
          45deg,
          transparent,
          rgba(255, 255, 255, 0.2),
          transparent
        );
        transform: rotate(45deg);
        transition: 0.6s;
      }

      .btn-shine:hover::after {
        left: 120%;
      }

      .stroke-text {
        -webkit-text-stroke: 2px rgba(255, 72, 0, 0.08);
        color: transparent;
      }

      .dark .stroke-text {
        -webkit-text-stroke: 2px rgba(255, 72, 0, 0.12);
      }

      .masked-title {
        background: linear-gradient(
          to right,
          #ffffff 0%,
          #ffffff 50%,
          rgba(255, 72, 0, 0.8) 85%,
          rgba(255, 72, 0, 0.2) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      .light .masked-title {
        background: linear-gradient(
          to right,
          #1a1a2e 0%,
          #1a1a2e 50%,
          rgba(255, 72, 0, 0.9) 85%,
          rgba(255, 72, 0, 0.3) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

interface ServiceBlockData {
  id: string;
  badge: string;
  title: string;
  body: string;
  capabilities: string[];
  number: string;
}

const services: ServiceBlockData[] = [
  {
    id: 'automation',
    badge: 'AUTOMATION',
    title: 'AI & Business Automation',
    body: ' WhatsApp flows that qualify leads and drive conversions. Behavior Triggered email sequences for engagement and retention. AI agents handling tier 1 customer support. Workflow automation reducing manual operational load. 30 to 60% reduction in manual operations within the first 90 days',
    capabilities: [
      'WhatsApp Automation: AI powered lead qualification & instant booking',
      'Email Sequences: Behavioral triggers that run without touching your CRM',
      'AI Support: Tier 1 handled by AI, complex issues auto escalate',
       'Lead Qualification: AI powered lead scoring and qualification',
    ],
    number: '01',
  },
  {
    id: 'custom-software',
    badge: 'SOFTWARE',
    title: 'Custom Software & Systems',
    body: "AI powered CRMs designed for real team adoption. Real time dashboards replacing fragmented monitoring tools. Internal systems built around your workflows (not rigid SaaS tools). Centralized data systems for better decision making.",
    capabilities: [
      'AI Powered CRMs: Built around your specific sales process',
      'Operational Dashboards: Real time visibility into your core metrics',
      'Customer Portals: Reduce support volume with intelligent self service',
       'Data Integration: Connect your systems into one workflow',
    ],
    number: '02',
  },
  {
    id: 'ai-strategy',
    badge: 'STRATEGY',
    title: 'AI Strategy & Integration',
    body: 'Deployment of GPT class models and advanced AI APIs. Custom LLM integration tailored to business workflows. End To End AI architecture, training, and deployment. Seamless integration into your existing tech stack.',
    capabilities: [
      'AI Architecture: Phased roadmap to deploy where it creates real ROI',
      'LLM Fine Tuning: Models trained on your specific business context',
      'RAG Systems: AI that answers questions using your private secure data',
        'AI Deployment: Production ready AI systems integrated into your stack',
    ],
    number: '03',
  },
  {
    id: 'web-development',
    badge: 'DIGITAL',
    title: 'Web Design & Experiences',
    body: 'High Performance websites built using modern frameworks (e.g., Next.js). 3D interactive experiences for premium brand differentiation. Conversion focused landing pages (not just visual design). Fast loading, SEO Ready, edge deployed architecture. 2–4x improvement in conversion rates compared to template based sites',
    capabilities: [
      'Next.js Performance: Sub second loads and global edge deployment',
      '3D & Interactive: Make your brand unforgettable with immersive builds',
      'Conversion Funnels: A/B testing and analytics built into the core',
      'SEO & Analytics: Search optimized with measurable performance tracking',
    ],
    number: '04',
  },
];

/* ------------------------------------------------------------------ */
/* Hero Section                                                       */
/* ------------------------------------------------------------------ */

function HeroSection() {
  return (
   <section className="relative bg-white dark:bg-[#0a0a14] px-6 pt-32 pb-8 overflow-hidden">
  <div className="mx-auto w-full max-w-7xl px-6">
        <PageHeader
  eyebrow="Our Expertise"
  title="Enterprise Software & AI Automation Services"
  subtitle={
    <span className="block w-full max-w-full whitespace-normal break-words">
          We build high performance infrastructure and intelligent automation
          systems designed for the next generation of enterprise growth.
        </span>
  }
/>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Service Block                                                      */
/* ------------------------------------------------------------------ */

function ServiceBlock({
  service,
  index,
  onNavigate,
}: {
  service: ServiceBlockData;
  index: number;
  onNavigate: (page: string) => void;
}) {
  const isEven = index % 2 === 0;

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yValue = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <motion.section
      id={service.id}
      ref={containerRef}
      className={`relative overflow-hidden px-6 py-24 lg:px-16 ${
        isEven
          ? 'bg-white dark:bg-[#0a0a14]'
          : 'bg-[#fcfcfd] dark:bg-[#0d0d1a]'
      }`}
    >
      {/* Background Number */}
      <motion.span
        style={{ y: yValue }}
        className={`stroke-text absolute top-0 select-none text-[18rem] font-black leading-none lg:text-[28rem] ${
          isEven ? '-left-10' : '-right-10'
        }`}
      >
        {service.number}
      </motion.span>

      {/* Main Grid */}
      <div className="relative z-10 mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:items-center">

        {/* LEFT CONTENT */}
        <div
          className={`lg:col-span-5 ${
            isEven ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <span className="mb-6 inline-block rounded-full bg-[#FF4800]/15 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#FF4800]">
            {service.badge}
          </span>

          <div className="relative pl-8">
            <div className="absolute left-0 top-0 h-full w-[2px] bg-[#FF4800]" />

            <h2
              className="masked-title mb-8 font-normal"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-2.05px',
              }}
            >
              {service.title}
            </h2>
          </div>

        <p className="mb-10 w-full max-w-[600px] text-left text-[16px] leading-[1.8] text-[#6b7280] dark:text-[#9ca3af] [text-wrap:pretty]">
  {service.body}
</p>

         <button
  type="button"
  onClick={() => onNavigate('contact')}
  className="rounded-xl bg-[#FF4800] px-10 py-4 text-[13px] font-bold uppercase tracking-widest text-white shadow-lg"
>
  Book Strategy Call
</button>
        </div>

        {/* RIGHT ICONS */}
{/* RIGHT ICONS */}
<div
  className={`lg:col-span-7 ${
    isEven ? 'lg:order-2' : 'lg:order-1'
  }`}
>
  <div className="grid grid-cols-2 gap-x-12 gap-y-12">
    {service.capabilities.map((cap, i) => {
      const [label] = cap.split(':');

      const Icon =
        service.id === 'automation'
          ? [MessageCircle, Mail, Bot, Users][i]
          : service.id === 'custom-software'
          ? [Database, BarChart3, Globe, Network][i]
          : service.id === 'ai-strategy'
          ? [Cpu, Workflow, Network, Zap][i]
          : [Zap, Layers, TrendingDown, BarChart3][i];

      return (
        <div
          key={i}
          className="group flex flex-col items-center text-center"
        >
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FF4800]/10 text-[#FF4800] transition-transform duration-300 group-hover:scale-105">
            <Icon
              size={32}
              strokeWidth={1.5}
            />
          </div>

          <h4 className="text-lg font-normal tracking-tight text-[#1a1a2e] dark:text-white">
            {label}
          </h4>
        </div>
      );
    })}
  </div>
</div>

      </div>
    </motion.section>
  );
}
/* ------------------------------------------------------------------ */
/* Expertise & Tech Stack                                             */
/* ------------------------------------------------------------------ */

function WhyStravedaSection() {
  const steps = [
    {
      number: '01',
      title: 'AUTOMATION FIRST',
      heading: 'Automation First',
      body: 'We audit what can be removed before we build. We prune scope—then automate what remains.',
    },
    {
      number: '02',
      title: 'WEEKLY SHIPPING',
      heading: 'Weekly Shipping',
      body: 'One week sprints with visible builds every Friday. You see working code, not slide decks.',
    },
    {
      number: '03',
      title: 'FULL OWNERSHIP',
      heading: 'Full Ownership',
      body: 'Zero vendor lock in. You own 100% of the source code and the intellectual property.',
    },
  ];

  return (
    <section className="relative bg-white dark:bg-[#0a0a14] px-6 py-24">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADING ================= */}
        <div className="-mt-30 mb-8 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#FF4800]">
            Our Approach
          </span>

         <h2
  className="masked-title mt-4 font-normal"
  style={{
    fontSize: 'clamp(2.5rem, 5vw, 3.25rem)',
    lineHeight: 1.1,
    letterSpacing: '-2.05px',
  }}
>
  Built for How You Work
</h2>
        </div>

        {/* ================= STEPPER ================= */}
        <div className="relative">

          {/* Horizontal Line */}
          <div className="absolute left-[16.66%] right-[16.66%] top-6 hidden h-px bg-gray-200 dark:bg-white/10 md:block" />

          <div className="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative text-center"
              >
                {/* Step Number */}
                <div
  className="
    relative z-10 mx-auto flex h-12 w-12
    cursor-pointer items-center justify-center
    rounded-full
    border border-[#FF4800]/30
    bg-white
    text-xs font-bold text-[#FF4800]
    transition-all duration-300 ease-out
    hover:scale-110
    hover:border-[#FF4800]
    hover:bg-[#FF4800]
    hover:text-white
    hover:shadow-[0_10px_30px_rgba(255,72,0,0.25)]
    dark:bg-[#0a0a14]
    dark:hover:bg-[#FF4800]
  "
>
  {step.number}
</div>
                {/* Step Title */}
               <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400"></p>

                {/* Description */}
                <div className="mx-auto mt-8 max-w-sm">
                  <h3 className="text-xl font-normal tracking-[-0.02em] text-gray-900 dark:text-white md:text-2xl">
                    {step.heading}
                  </h3>

                  <p className="mt-4 text-[16px] leading-7 font-normal text-gray-600 dark:text-gray-400 md:text-[17px]">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function TechStackSection() {
  const techCategories = [
    {
      label: 'Frontend',
      items: [
        {
          name: 'Next.js',
          logo: 'https://cdn.simpleicons.org/nextdotjs',
        },
        {
          name: 'React',
          logo: 'https://cdn.simpleicons.org/react',
        },
        {
          name: 'TypeScript',
          logo: 'https://cdn.simpleicons.org/typescript',
        },
        {
          name: 'Tailwind CSS',
          logo: 'https://cdn.simpleicons.org/tailwindcss',
        },
      ],
    },

    {
      label: 'AI & Automation',
      items: [
        {
          name: 'OpenAI GPT-4o',
          icon: Network,
        },
        {
          name: 'Claude API',
          logo: 'https://cdn.simpleicons.org/anthropic',
        },
        {
          name: 'LangChain',
          logo: 'https://cdn.simpleicons.org/langchain',
        },
        {
          name: 'Vector DBs',
          icon: Database,
        },
      ],
    },

    {
      label: 'Infrastructure',
      items: [
        {
          name: 'AWS / GCP',
          icon: Cloud,
        },
        {
          name: 'Docker',
          logo: 'https://cdn.simpleicons.org/docker',
        },
        {
          name: 'CI/CD',
          logo: 'https://cdn.simpleicons.org/githubactions',
        },
        {
          name: 'Security',
          logo: 'https://cdn.simpleicons.org/cloudflare',
        },
      ],
    },

    {
      label: 'Data & Backend',
      items: [
        {
          name: 'PostgreSQL',
          logo: 'https://cdn.simpleicons.org/postgresql',
        },
        {
          name: 'Redis',
          logo: 'https://cdn.simpleicons.org/redis',
        },
        {
          name: 'Node.js',
          logo: 'https://cdn.simpleicons.org/nodedotjs',
        },
        {
          name: 'REST / GraphQL',
          logo: 'https://cdn.simpleicons.org/graphql',
        },
      ],
    },
  ];

  return (
    <section className="border-t border-black/[0.06] bg-white pt-10 pb-24 dark:border-white/[0.06] dark:bg-[#0a0a14]">
      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* Heading */}
        <h2
  className="masked-title mb-4 font-normal"
  style={{
    fontSize: 'clamp(2.5rem, 5vw, 3.25rem)',
    lineHeight: 1.1,
    letterSpacing: '-2.05px',
  }}
>
  Mastered Technologies
</h2>

        {/* Description */}
        <p className="mx-auto mb-16 max-w-2xl text-[15px] leading-7 text-[#6b7280] dark:text-[#9ca3af]">
          A full-stack toolkit — from interface to inference.
        </p>

        {/* Categories */}
        <div className="flex flex-col gap-12">
          {techCategories.map((category) => (
            <div key={category.label}>
              {/* Category Label */}
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF4800]">
                {category.label}
              </p>

              {/* Technology Cards */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {category.items.map((tech) => {
                  const Icon = 'icon' in tech ? tech.icon : null;

                  return (
                    <div
                      key={tech.name}
                      className="
                        glass-card
                        flex
                        min-h-[150px]
                        flex-col
                        items-center
                        justify-center
                        gap-5
                        rounded-2xl
                        p-6
                        transition-transform
                        duration-300
                        active:scale-[0.98]
                      "
                    >
                      {/* Logo / Fallback Icon */}
                      <div className="flex h-12 w-12 items-center justify-center">
                        {'logo' in tech ? (
                          <img
                            src={tech.logo}
                            alt={`${tech.name} logo`}
                            className="h-10 w-10 object-contain sm:h-11 sm:w-11"
                          />
                        ) : Icon ? (
                          <Icon
  size={40}
  strokeWidth={1.5}
  className="text-[#1a1a2e] dark:text-white"
/>
                        ) : null}
                      </div>

                      {/* Technology Name */}
                      <span
  className="
    text-center
    text-[15px]
    leading-7
    font-normal
    text-[#6b7280]
    dark:text-[#9ca3af]
  "
>
  {tech.name}
</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
/* ------------------------------------------------------------------ */
/* Main Page Export                                                   */
/* ------------------------------------------------------------------ */

export default function ServicesPage({
  onNavigate,
}: {
  onNavigate: (page: string) => void;
}) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

 useEffect(() => {
  const updateService = () => {
    const hash = window.location.hash.substring(1).split('#')[0] || null;
    setSelectedService(hash);
  };

  updateService();

  window.addEventListener('hashchange', updateService);

  return () => {
    window.removeEventListener('hashchange', updateService);
  };
}, []);

useEffect(() => {
  if (!selectedService) return;

  const timer = setTimeout(() => {
    const element = document.getElementById(selectedService);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, 200);

  return () => clearTimeout(timer);
}, [selectedService]);
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a14]">
      <ServicesPageStyles />

      <HeroSection />

      {/* ── Service card grid/carousel — mobile carousel, desktop grid ── */}
      <ServicesSection />

      <WhyStravedaSection />

     

      <div className="flex flex-col">
  {services.map((service, index) => (
   <ServiceBlock
  key={service.id}
  service={service}
  index={index}
  onNavigate={onNavigate}
/>
  ))}
</div>

      <TechStackSection />

      <ServiceComparison />
    </main>
  );
}