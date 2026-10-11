'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Database,
  BarChart3,
  Globe,
  Network,
  Cpu,
  Workflow,
  Zap,
  Layers,
  TrendingDown,
  MessageCircle,
  Mail,
  Bot,
  Users,
  type LucideIcon,
} from 'lucide-react';
import ServiceComparison from '@/components/features/services/ServiceComparison';

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
    `,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

interface CapabilityItem {
  title: string;
  desc: string;
  icon: LucideIcon;
}

interface ServiceBlockData {
  id: string;
  badge: string;
  category: string;
  title: string;
  body: string;
  capabilities: CapabilityItem[];
  number: string;
}

const services: ServiceBlockData[] = [
  {
    id: 'automation',
    badge: 'AUTOMATION',
    category: 'Business strategy & workflows',
    title: 'AI & Business Automation',
    body: 'WhatsApp flows that qualify leads and drive conversions. Behavior Triggered email sequences for engagement and retention. AI agents handling tier 1 customer support. Workflow automation reducing manual operational load. 30 to 60% reduction in manual operations within the first 90 days.',
    capabilities: [
      {
        title: 'WhatsApp Automation',
        desc: 'AI powered lead qualification & instant booking',
        icon: MessageCircle,
      },
      {
        title: 'Email Sequences',
        desc: 'Behavioral triggers that run without touching CRM',
        icon: Mail,
      },
      {
        title: 'AI Support',
        desc: 'Tier 1 handled by AI, complex issues auto escalate',
        icon: Bot,
      },
      {
        title: 'Lead Qualification',
        desc: 'AI powered lead scoring and smart qualification',
        icon: Users,
      },
    ],
    number: '01',
  },
  {
    id: 'custom-software',
    badge: 'SOFTWARE',
    category: 'Enterprise systems & data architecture',
    title: 'Custom Software & Systems',
    body: 'AI powered CRMs designed for real team adoption. Real time dashboards replacing fragmented monitoring tools. Internal systems built around your workflows (not rigid SaaS tools). Centralized data systems for better decision making.',
    capabilities: [
      {
        title: 'AI Powered CRMs',
        desc: 'Built around your specific sales process',
        icon: Database,
      },
      {
        title: 'Operational Dashboards',
        desc: 'Real time visibility into your core metrics',
        icon: BarChart3,
      },
      {
        title: 'Customer Portals',
        desc: 'Reduce support volume with intelligent self service',
        icon: Globe,
      },
      {
        title: 'Data Integration',
        desc: 'Connect your systems into one unified workflow',
        icon: Network,
      },
    ],
    number: '02',
  },
  {
    id: 'ai-strategy',
    badge: 'STRATEGY',
    category: 'Model inference & intelligent deployment',
    title: 'AI Strategy & Integration',
    body: 'Deployment of GPT class models and advanced AI APIs. Custom LLM integration tailored to business workflows. End To End AI architecture, training, and deployment. Seamless integration into your existing tech stack.',
    capabilities: [
      {
        title: 'AI Architecture',
        desc: 'Phased roadmap to deploy where it creates real ROI',
        icon: Cpu,
      },
      {
        title: 'LLM Fine Tuning',
        desc: 'Models trained on your specific business context',
        icon: Workflow,
      },
      {
        title: 'RAG Systems',
        desc: 'AI that answers questions using private secure data',
        icon: Network,
      },
      {
        title: 'AI Deployment',
        desc: 'Production ready AI systems integrated into your stack',
        icon: Zap,
      },
    ],
    number: '03',
  },
  {
    id: 'web-development',
    badge: 'DIGITAL',
    category: 'High-performance interactive experiences',
    title: 'Web Design & Experiences',
    body: 'High Performance websites built using modern frameworks (e.g., Next.js). 3D interactive experiences for premium brand differentiation. Conversion focused landing pages (not just visual design). Fast loading, SEO Ready, edge deployed architecture. 2–4x improvement in conversion rates compared to template based sites.',
    capabilities: [
      {
        title: 'Next.js Performance',
        desc: 'Sub second loads and global edge deployment',
        icon: Zap,
      },
      {
        title: '3D & Interactive',
        desc: 'Make your brand unforgettable with immersive builds',
        icon: Layers,
      },
      {
        title: 'Conversion Funnels',
        desc: 'A/B testing and analytics built into the core',
        icon: TrendingDown,
      },
      {
        title: 'SEO & Analytics',
        desc: 'Search optimized with measurable performance tracking',
        icon: BarChart3,
      },
    ],
    number: '04',
  },
];

/* ------------------------------------------------------------------ */
/* Page Top Header                                                    */
/* ------------------------------------------------------------------ */

function PageTopHeader() {
  return (
    <section className="relative overflow-hidden bg-[#F6F1E7] dark:bg-[#0a0a14] pt-32 md:pt-36 pb-4 md:pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-full"
        >
          {/* Eyebrow Badge - Renamed to Our Services */}
          <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800]">
            Our Services
          </p>

          {/* Heading - Strictly in ONE SINGLE LINE */}
          <h1 className="whitespace-nowrap max-sm:whitespace-normal text-xl font-bold tracking-tight text-black sm:text-2xl md:text-3xl lg:text-[2.35rem] xl:text-[2.7rem] leading-tight dark:text-white">
            Enterprise Software &amp; AI Automation Services
          </h1>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceBlock({
  service,
  index,
  onNavigate,
}: {
  service: ServiceBlockData;
  index: number;
  onNavigate: (page: string) => void;
}) {
  const ease = [0.22, 1, 0.36, 1] as const;
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 95%', 'end 5%'] });
  // Soft fade as a service enters and as it leaves, fully clear in the middle
  const fade = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0, 1, 1, 0.12]);

  return (
    <section
      ref={ref}
      id={service.id}
      className={`relative scroll-mt-24 ${
        index > 0 ? 'border-t border-black/[0.08] py-10 dark:border-white/10 md:py-14' : 'pb-10 pt-2 md:pb-14 md:pt-4'
      }`}
    >
      <motion.div style={{ opacity: fade }} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-14">
          {/* ── LEFT: number + title stacked, pinned while the card scrolls past ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease }}
            >
              <div className="select-none text-7xl font-bold leading-none tracking-tighter text-black dark:text-white sm:text-8xl lg:text-[8.5rem]">
                {service.number}
              </div>

              <span className="mt-5 inline-block text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800]">
                {service.badge}
              </span>

              <h2 className="mt-2 text-2xl font-bold leading-[1.18] tracking-tight text-black dark:text-white sm:text-3xl lg:text-4xl">
                {service.title}
              </h2>

              <p className="mt-3 text-sm font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
                {service.category}
              </p>

              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="group mt-6 inline-flex items-center gap-3 rounded-full bg-black px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#FF4800] dark:bg-white dark:text-black dark:hover:bg-[#FF4800] dark:hover:text-white"
              >
                <span>Book Strategy Call</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>

          {/* ── RIGHT: boxed detail card ── */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 56 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
          >
            <div className="rounded-[28px] border border-black/[0.06] bg-white p-6 shadow-[0_18px_50px_rgba(20,17,12,0.07)] dark:border-white/10 dark:bg-[#181824] sm:p-8">
              <p className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base [text-wrap:pretty]">
                {service.body}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {service.capabilities.map((cap, i) => {
                  const Icon = cap.icon;
                  return (
                    <motion.div
                      key={cap.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.55, delay: 0.25 + i * 0.08, ease }}
                      className="group flex items-start gap-3.5 rounded-2xl border border-black/[0.05] bg-[#F6F1E7]/60 p-4 transition-colors duration-300 hover:border-[#FF4800]/40 hover:bg-[#FF4800]/[0.05] dark:border-white/10 dark:bg-white/[0.04]"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-black shadow-sm transition-all duration-300 group-hover:bg-[#FF4800] group-hover:text-white dark:bg-white/10 dark:text-white">
                        <Icon size={17} strokeWidth={1.8} />
                      </div>
                      <div>
                        <h3 className="text-[14px] font-bold leading-snug tracking-tight text-black dark:text-white">
                          {cap.title}
                        </h3>
                        <p className="mt-1 text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                          {cap.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Services Section with Pure Sticky Touch & Push Numbers             */
/* ------------------------------------------------------------------ */

function PushNumbersServicesSection({
  onNavigate,
  selectedService,
}: {
  onNavigate: (page: string) => void;
  selectedService: string | null;
}) {
  useEffect(() => {
    if (!selectedService) return;
    const el = document.getElementById(selectedService);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedService]);

  return (
    <div className="relative bg-[#F6F1E7] dark:bg-[#0a0a14]">
      {/* ── 4 Sequential Service Blocks with Reduced Gaps & Touching Sticky Numbers ── */}
      {services.map((service, i) => (
        <ServiceBlock key={service.id} service={service} index={i} onNavigate={onNavigate} />
      ))}

    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Approach Section                                                   */
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
    <section className="relative bg-[#F6F1E7] dark:bg-[#0a0a14] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADING ================= */}
        <div className="mb-14 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800]">
            Our Approach
          </span>

          <h2
            className="mt-4 font-bold text-black dark:text-white text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight leading-[1.2]"
          >
            Built for How You Work
          </h2>
        </div>

        {/* ================= STEPPER ================= */}
        <div className="relative">

          {/* Horizontal Line */}
          <div className="absolute left-[16.66%] right-[16.66%] top-6 hidden h-px bg-gray-200 md:block dark:bg-white/10" />

          <div className="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-8">
            {steps.map((step) => (
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

                {/* Description */}
                <div className="mx-auto mt-8 max-w-sm">
                  <h3 className="text-xl font-normal tracking-[-0.02em] text-black md:text-2xl dark:text-white">
                    {step.heading}
                  </h3>

                  <p className="mt-4 text-base font-normal leading-7 text-neutral-600 md:text-[17px] dark:text-neutral-400">
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

  return (
    <main className="min-h-screen bg-[#F6F1E7] dark:bg-[#0a0a14]">
      <ServicesPageStyles />

      {/* ── Top Header: Our Services / Enterprise Software & AI Automation Services (One Line, No paragraph) ── */}
      <PageTopHeader />

      {/* ── Services Section with Reduced Gaps & Touching Sticky Numbers (01 touches 02) ── */}
      <PushNumbersServicesSection
        onNavigate={onNavigate}
        selectedService={selectedService}
      />

      {/* ── Approach Section ── */}
      <WhyStravedaSection />

      {/* ── Service Comparison ── */}
      <ServiceComparison />
    </main>
  );
}