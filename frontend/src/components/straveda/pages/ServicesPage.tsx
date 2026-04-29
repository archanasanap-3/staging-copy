'use client';

import { useState, useRef } from 'react';
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
  Workflow
} from 'lucide-react';
import MagneticButton from '@/components/straveda/MagneticButton';
import ServiceComparison from '@/components/straveda/ServiceComparison';
import ServicesHoverModal from '@/components/straveda/ServicesHoverModal';
import PageHeader from '@/components/straveda/PageHeader';
import ServicesSection from '@/components/straveda/ServicesSection';
import HorizontalCarousel from '@/components/straveda/HorizontalCarousel';

/* ------------------------------------------------------------------ */
/* Component-level Styles                                             */
/* ------------------------------------------------------------------ */

function ServicesPageStyles() {
  return (
    <style>{`
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
    `}</style>
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
    ],
    number: '04',
  },
];

/* ------------------------------------------------------------------ */
/* Hero Section                                                       */
/* ------------------------------------------------------------------ */

function HeroSection() {
  return (
    <section className="relative bg-white dark:bg-[#0a0a14] px-6 pt-32 pb-20 overflow-hidden border-b border-black/[0.06] dark:border-white/[0.06]">
      <div className="mx-auto max-w-5xl">
        <PageHeader
          eyebrow="Our Expertise"
          title="Enterprise Software & AI Automation Services"
          subtitle="We build high performance infrastructure and intelligent automation systems designed for the next generation of enterprise growth."
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Service Block                                                      */
/* ------------------------------------------------------------------ */

function ServiceBlock({ service, index }: { service: ServiceBlockData; index: number }) {
  const isEven = index % 2 === 0;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yValue = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <motion.section
      ref={containerRef}
      className={`relative overflow-hidden px-6 py-24 lg:px-16 ${
        isEven ? 'bg-white dark:bg-[#0a0a14]' : 'bg-[#fcfcfd] dark:bg-[#0d0d1a]'
      }`}
    >
      <motion.span 
        style={{ y: yValue }} 
        className={`stroke-text absolute top-0 select-none text-[18rem] font-black leading-none lg:text-[28rem] ${isEven ? '-left-10' : '-right-10'}`}
      >
        {service.number}
      </motion.span>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:items-center">
        <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
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
                letterSpacing: '-2.05px' 
              }}
            >
              {service.title}
            </h2>
          </div>

          <p className="mb-10 text-lg leading-relaxed text-[#6b7280] dark:text-[#9ca3af]">
            {service.body}
          </p>
          <MagneticButton>
            <button className="btn-shine rounded-xl bg-[#FF4800] px-10 py-4 text-[13px] font-bold uppercase tracking-widest text-white shadow-lg">
              Book Strategy Call
            </button>
          </MagneticButton>
        </div>

        <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="grid gap-5 sm:grid-cols-2">
            {service.capabilities.map((cap, i) => {
              const [label, desc] = cap.split(':');
              return (
                <div key={i} className="group glass-card rounded-2xl p-7 transition-colors hover:border-[#FF4800]/30">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF4800]/10 text-[#FF4800]">
                    <ArrowRight size={20} />
                  </div>
                  <h4 className="font-normal tracking-tight text-[#1a1a2e] dark:text-white">
                    {label}
                  </h4>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#6b7280] dark:text-[#9ca3af]">
                    {desc}
                  </p>
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
  const whyCards = [
    {
      icon: <Diamond size={32} className="text-[#FF4800]" strokeWidth={1.5} />,
      title: 'Automation First',
      body: 'We audit what can be removed before we build. We prune scope—then automate what remains.',
    },
    {
      icon: <TrendingDown size={32} className="text-[#FF4800]" strokeWidth={1.5} />,
      title: 'Weekly Shipping',
      body: 'One week sprints with visible builds every Friday. You see working code, not slide decks.',
    },
    {
      icon: <ShieldCheck size={32} className="text-[#FF4800]" strokeWidth={1.5} />,
      title: 'Full Ownership',
      body: 'Zero vendor lock in. You own 100% of the source code and the intellectual property.',
    },
  ];

  return (
    <section className="relative bg-white dark:bg-[#0a0a14] px-6 pb-24">
      <div className="mx-auto max-w-7xl">
        <HorizontalCarousel cols={3} size="md">
          {whyCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card flex flex-col h-full rounded-2xl p-8 active:scale-95 transition-transform"
            >
              <div className="mb-6">{card.icon}</div>
              <h4 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{card.title}</h4>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">{card.body}</p>
            </motion.div>
          ))}
        </HorizontalCarousel>
      </div>
    </section>
  );
}

function TechStackSection() {
  const techCategories = [
    {
      label: 'Frontend',
      items: [
        { name: 'Next.js', icon: <Code size={24} className="text-[#FF4800]" /> },
        { name: 'React', icon: <Layers size={24} className="text-[#FF4800]" /> },
        { name: 'TypeScript', icon: <Code size={24} className="text-[#FF4800]" /> },
        { name: 'Tailwind CSS', icon: <Zap size={24} className="text-[#FF4800]" /> },
      ],
    },
    {
      label: 'AI & Automation',
      items: [
        { name: 'OpenAI GPT-4o', icon: <Network size={24} className="text-[#FF4800]" /> },
        { name: 'Claude API', icon: <Cpu size={24} className="text-[#FF4800]" /> },
        { name: 'LangChain', icon: <Workflow size={24} className="text-[#FF4800]" /> },
        { name: 'Vector DBs', icon: <BarChart3 size={24} className="text-[#FF4800]" /> },
      ],
    },
    {
      label: 'Infrastructure',
      items: [
        { name: 'AWS / GCP', icon: <Cloud size={24} className="text-[#FF4800]" /> },
        { name: 'Docker', icon: <Globe size={24} className="text-[#FF4800]" /> },
        { name: 'CI/CD', icon: <GitBranch size={24} className="text-[#FF4800]" /> },
        { name: 'Security', icon: <Lock size={24} className="text-[#FF4800]" /> },
      ],
    },
    {
      label: 'Data & Backend',
      items: [
        { name: 'PostgreSQL', icon: <Database size={24} className="text-[#FF4800]" /> },
        { name: 'Redis', icon: <Database size={24} className="text-[#FF4800]" /> },
        { name: 'Node.js', icon: <Zap size={24} className="text-[#FF4800]" /> },
        { name: 'REST / GraphQL', icon: <Network size={24} className="text-[#FF4800]" /> },
      ],
    },
  ];

  return (
    <section className="bg-white dark:bg-[#0a0a14] py-24 border-t border-black/[0.06] dark:border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2
          className="masked-title mb-4 font-normal"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', lineHeight: 1.1, letterSpacing: '-2.05px' }}
        >
          Mastered Technologies
        </h2>
        <p className="mb-16 text-sm text-[#6b7280] dark:text-[#9ca3af]">
          A full-stack toolkit — from interface to inference.
        </p>
        <div className="flex flex-col gap-10">
          {techCategories.map((category) => (
            <div key={category.label}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#FF4800]">{category.label}</p>
              <HorizontalCarousel cols={4} size="sm" showHint={false} showDots={false}>
                {category.items.map((tech, i) => (
                  <div key={i} className="glass-card flex flex-col items-center justify-center gap-3 rounded-2xl p-6 sm:p-8 active:scale-95 transition-transform h-full">
                    {tech.icon}
                    <span className="text-[11px] sm:text-sm font-bold uppercase tracking-widest text-[#1a1a2e] dark:text-white text-center">{tech.name}</span>
                  </div>
                ))}
              </HorizontalCarousel>
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

export default function ServicesPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a14]">
      <ServicesPageStyles />
      <HeroSection />
      {/* ── Service card grid/carousel — mobile carousel, desktop grid ── */}
      <ServicesSection />
      <WhyStravedaSection />
      <ServicesHoverModal onNavigate={onNavigate} />
      
      <div className="flex flex-col">
        {services.map((service, index) => (
          <ServiceBlock key={service.id} service={service} index={index} />
        ))}
      </div>

      <TechStackSection />
      <ServiceComparison />
      
    </main>
  );
}