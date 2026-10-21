'use client';

import { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Network,
  Cpu,
  MessageCircle,
  Mail,
  Bot,
  Users,
  MonitorSmartphone,
  Palette,
  Target,
  Gauge,
  UserRound,
  FileSearch,
  Workflow as WorkflowIcon,
  Rocket,
  type LucideIcon,
} from 'lucide-react';
import ServiceComparison from '@/components/features/services/ServiceComparison';
import ImprovementFinderSection from '@/components/features/services/ImprovementFinderSection';

/* ------------------------------------------------------------------ */
/* Component-level Styles                                             */
/* ------------------------------------------------------------------ */

function ServicesPageStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          html {
            scroll-behavior: smooth;
          }

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

          .capability-title {
            word-spacing: 5px;
          }
        `,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Framer Motion Variants                                             */
/* ------------------------------------------------------------------ */

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stepContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const stepItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

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
    body: 'Automate repetitive tasks, respond to customer enquiries faster, and reduce the manual work that slows your team down.',
    capabilities: [
      {
        title: 'WhatsApp Automation',
        desc: 'Automatically respond to enquiries, collect customer details, answer common questions, and help customers book appointments.',
        icon: MessageCircle,
      },
      {
        title: 'Email Automation',
        desc: 'Send timely emails, follow up with potential customers, and keep people informed without sending every message manually.',
        icon: Mail,
      },
      {
        title: 'AI Customer Support',
        desc: 'Let AI answer common customer questions and pass more complex issues to your team.',
        icon: Bot,
      },
      {
        title: 'Lead Management',
        desc: 'Organize enquiries, identify promising prospects, and help your sales team follow up at the right time.',
        icon: Users,
      },
    ],
    number: '01',
  },
  {
    id: 'custom-software',
    badge: 'SOFTWARE',
    category: 'Software designed around your business',
    title: 'Custom Software & Business Systems”',
    body: 'We build software tailored to your business needs. Manage customers, track performance, connect your tools, and bring your daily operations together in one place.',
    capabilities: [
      {
        title: 'Customer & Sales Management',
        desc: 'Manage leads, customer details, follow-ups, and sales in one organized system.',
        icon: UserRound,
      },
      {
        title: 'Business Dashboards',
        desc: 'See your sales, performance, and key business numbers without checking multiple files.',
        icon: BarChart3,
      },
      {
        title: 'Customer & Employee Portals',
        desc: 'Give customers, employees, or business partners a dedicated place to access information and complete tasks.',
        icon: MonitorSmartphone,
      },
      {
        title: 'Connected Business Systems',
        desc: 'Connect the software you already use and reduce duplicate data entry and disconnected workflows.',
        icon: Network,
      },
    ],
    number: '02',
  },
  {
    id: 'ai-strategy',
    badge: 'STRATEGY',
    category: 'AI tools that work with your business software',
    title: 'AI Solutions for Real Business Needs',
    body: 'We help businesses use AI to find information faster, handle repetitive tasks, and make their software more useful. We connect AI with your business processes to solve practical problems.',
    capabilities: [
      {
        title: 'AI Strategy & Planning',
        desc: 'Identify where AI can save time, reduce costs, or improve your business processes before investing in a solution.',
        icon: Cpu,
      },
      {
        title: 'AI Knowledge Assistants',
        desc: 'Help your team find answers from approved company documents, policies, manuals, and other business information.',
        icon: FileSearch,
      },
      {
        title: 'AI Integration',
        desc: 'Connect AI capabilities to your existing applications and workflows to help automate everyday tasks.',
        icon: WorkflowIcon,
      },
      {
        title: 'AI Product Development',
        desc: 'Turn a business idea into an AI-powered application, assistant, or digital product.',
        icon: Rocket,
      },
    ],
    number: '03',
  },
  {
    id: 'web-development',
    badge: 'DIGITAL',
    category: 'High-performance interactive experiences',
    title: 'Websites That Build Trust and Grow Your Business.',
    body: 'We design and develop fast, modern websites that showcase your business, make it easier for customers to find you, and turn visitors into enquiries.',
    capabilities: [
      {
        title: 'Business Websites',
        desc: 'Present your services, showcase your work, and give customers a professional first impression on every device.',
        icon: MonitorSmartphone,
      },
      {
        title: 'Website Design & UI/UX',
        desc: 'Create clear, easy-to-use website experiences that help visitors understand your business and navigate with confidence.',
        icon: Palette,
      },
      {
        title: 'Landing Pages',
        desc: 'Build focused pages for advertising campaigns, product launches, and lead generation.',
        icon: Target,
      },
      {
        title: 'Speed & Search Visibility',
        desc: 'Improve loading performance, search engine accessibility, and website measurement to help you make better decisions.',
        icon: Gauge,
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
    <section className="relative overflow-hidden bg-[#F6F1E7] pt-32 pb-4 dark:bg-[#0a0a14] md:pt-36 md:pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-full"
        >
          <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800]">
            Our Services
          </p>

          <h1 className="whitespace-nowrap text-2xl font-bold leading-tight tracking-tight text-black dark:text-white max-sm:whitespace-normal sm:text-2xl md:text-4xl lg:text-[2.35rem] xl:text-[2.7rem]">
            Software Solutions Built Around Your Business
          </h1>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Individual Service Block                                           */
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
  const ease = [0.22, 1, 0.36, 1] as const;
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 95%', 'end 5%'],
  });

  const fade = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0, 1, 1, 0.12],
  );

  return (
    <section
      ref={ref}
      id={service.id}
      className={`relative scroll-mt-24 ${
        index > 0
          ? 'border-t border-black/[0.08] py-10 dark:border-white/10 md:py-14'
          : 'pb-10 pt-2 md:pb-14 md:pt-4'
      }`}
    >
      <motion.div
        style={{ opacity: fade }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-14">
          {/* LEFT: Number, Title and Button */}

          <div className="lg:sticky lg:top-32 lg:col-span-5">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 56, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, ease }}
                className="select-none text-7xl font-bold leading-none tracking-tighter text-black dark:text-white sm:text-8xl lg:text-[8.5rem]"
              >
                {service.number}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.75, delay: 0.12, ease }}
              >
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
                  <span>Discuss Your Business Needs</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </motion.div>
            </div>
          </div>

          {/* RIGHT: Service Details and Capability Cards */}

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 56 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
          >
            <div className="rounded-[28px] border border-black/[0.06] bg-white p-6 shadow-[0_18px_50px_rgba(20,17,12,0.07)] dark:border-white/10 dark:bg-[#181824] sm:p-8">
              <p className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base [text-wrap:pretty]">
                {service.body}
              </p>

              <motion.div
                variants={staggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                {service.capabilities.map((cap) => {
                  const Icon = cap.icon;

                  return (
                    <motion.div
                      key={cap.title}
                      variants={staggerItemVariants}
                      className="group flex min-w-0 items-start gap-4 rounded-2xl border border-black/[0.05] bg-[#F6F1E7]/60 p-4 transition-colors duration-300 hover:border-[#FF4800]/40 hover:bg-[#FF4800]/[0.05] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-[#FF4800]/50 dark:hover:bg-[#FF4800]/10 sm:p-5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-black shadow-sm transition-all duration-300 group-hover:bg-[#FF4800] group-hover:text-white dark:bg-white/10 dark:text-white dark:group-hover:bg-[#FF4800] dark:group-hover:text-white">
                        <Icon size={19} strokeWidth={1.8} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="capability-title break-words text-[14px] font-bold leading-[1.5] tracking-[0.015em] text-black dark:text-white sm:text-[15px]">
                          {cap.title}
                        </h3>

                        <p className="mt-2 text-[13px] leading-[1.7] text-neutral-800 dark:text-neutral-300 sm:text-[14px]">
                          {cap.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Services Section                                                   */
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

    const element = document.getElementById(selectedService);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [selectedService]);

  return (
    <div className="relative bg-[#F6F1E7] dark:bg-[#0a0a14]">
      {services.map((service, index) => (
        <ServiceBlock
          key={service.id}
          service={service}
          index={index}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Our Approach Section                                               */
/* ------------------------------------------------------------------ */

function WhyStravedaSection() {
  const steps = [
    {
      number: '01',
      heading: 'Solve the Right Problem',
      body: 'We first understand your business and identify what needs to improve. Then we build only what adds value.',
    },
    {
      number: '02',
      heading: 'See Progress as We Build',
      body: 'Stay involved through regular updates and working demonstrations, so you can share feedback before the final launch.',
    },
    {
      number: '03',
      heading: 'Your Software, Your Control',
      body: "Know what you're paying for, understand the handover process, and retain the ownership rights agreed in your contract.",
    },
  ];

  return (
    <section className="relative bg-[#F6F1E7] py-12 dark:bg-[#0a0a14] md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center md:mb-14"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800]">
            Our Approach
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-[1.2] tracking-tight text-black dark:text-white sm:text-4xl md:text-[2.5rem]">
            A Better Way to Build Software
          </h2>

          <p className="mx-auto mt-4 max-w-4xl text-base leading-7 text-neutral-600 dark:text-neutral-400">
            We focus on what your business needs, keep you involved throughout
            the process, and build solutions you can own.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[16.66%] right-[16.66%] top-6 hidden h-px bg-orange-400 dark:bg-white/10 md:block" />

          <motion.div
            variants={stepContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="relative z-10 flex flex-col md:grid md:grid-cols-3 md:gap-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={stepItemVariants}
                className="group relative flex flex-col items-center text-center"
              >
                {index > 0 && (
                  <div
                    className="pointer-events-none mt-4 flex h-12 w-[3px] shrink-0 items-center justify-center rounded-full bg-[#FF4800] md:hidden"
                    aria-hidden="true"
                  />
                )}

                <div className="relative z-10 mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#FF4800] bg-white text-xs font-bold text-[#FF4800] shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:scale-110 hover:bg-[#FF4800] hover:text-white hover:shadow-[0_10px_30px_rgba(255,72,0,0.25)] dark:bg-[#12121e] dark:hover:bg-[#FF4800]">
                  {step.number}
                </div>

                <div
                  className="pointer-events-none mb-1.5 flex h-5 w-[3px] shrink-0 items-center justify-center rounded-full bg-[#FF4800] md:hidden"
                  aria-hidden="true"
                />

                <div className="relative z-10 mx-auto mt-1 max-w-sm md:mt-8">
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-black dark:text-white md:text-2xl">
                    {step.heading}
                  </h3>

                  <p className="mt-4 text-base font-normal leading-7 text-neutral-600 dark:text-neutral-400 md:text-[17px]">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen scroll-smooth bg-[#F6F1E7] dark:bg-[#0a0a14]"
    >
      <ServicesPageStyles />

      <PageTopHeader />

      <PushNumbersServicesSection
        onNavigate={onNavigate}
        selectedService={selectedService}
      />

      <ImprovementFinderSection onNavigate={onNavigate} />

      <WhyStravedaSection />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <ServiceComparison />
      </motion.div>
    </motion.main>
  );
}