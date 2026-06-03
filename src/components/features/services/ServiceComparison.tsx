'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Braces, Compass, ClipboardCheck, Server, GitCompareArrows } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const ease = [0.4, 0, 0.2, 1] as const;

interface ServiceData {
  name: string;
  icon: React.ReactNode;
  focus: string;
  duration: string;
  idealFor: string;
  deliverables: string[];
  investment: string;
  successRate: number;
}

const comparisonData: Record<string, ServiceData> = {
  'enterprise-architecture': {
    name: 'Enterprise Architecture',
    icon: <Braces size={16} />,
    focus: 'Application portfolio modernization through adaptive, open-standards architecture',
    duration: '3–12 months',
    idealFor: 'Enterprises with legacy systems needing scalable, maintainable architecture',
    deliverables: [
      'Architecture assessment & roadmap',
      'Microservices migration strategy',
      'Integration blueprint',
    ],
    investment: '$25K+',
    successRate: 94,
  },
  'technology-strategy': {
    name: 'Technology Strategy',
    icon: <Compass size={16} />,
    focus: 'Aligning IT investments with business goals for sustainable digital transformation',
    duration: '2–6 months',
    idealFor: 'Organizations planning digital transformation or cloud migration',
    deliverables: [
      'Digital transformation roadmap',
      'IT investment framework',
      'Cloud strategy document',
    ],
    investment: '$15K+',
    successRate: 91,
  },
  'management-consulting': {
    name: 'Management Consulting',
    icon: <ClipboardCheck size={16} />,
    focus: 'Product, program & project management through agile delivery frameworks',
    duration: '1–6 months',
    idealFor: 'Teams needing delivery governance, stakeholder alignment, or PMO setup',
    deliverables: [
      'Delivery governance model',
      'Agile playbook & PMO framework',
      'Stakeholder alignment report',
    ],
    investment: '$10K+',
    successRate: 97,
  },
  'software-solutions': {
    name: 'Software Solutions',
    icon: <Server size={16} />,
    focus: 'Deploying enterprise middleware and virtualization to maximize application performance',
    duration: '2–8 months',
    idealFor: 'Companies deploying or optimizing Red Hat, container, or integration platforms',
    deliverables: [
      'Platform deployment & config',
      'Performance tuning & optimization',
      'Knowledge transfer & training',
    ],
    investment: '$20K+',
    successRate: 96,
  },
};

const criteria = [
  { label: 'Primary Focus', key: 'focus' as const },
  { label: 'Typical Duration', key: 'duration' as const },
  { label: 'Ideal For', key: 'idealFor' as const },
  { label: 'Key Deliverables', key: 'deliverables' as const },
  { label: 'Success Rate', key: 'successRate' as const },
];

const toggleConfig = [
  { id: 'enterprise-architecture', label: 'Enterprise Architecture', icon: <Braces size={15} /> },
  { id: 'technology-strategy', label: 'Technology Strategy', icon: <Compass size={15} /> },
  { id: 'management-consulting', label: 'Management Consulting', icon: <ClipboardCheck size={15} /> },
  { id: 'software-solutions', label: 'Software Solutions', icon: <Server size={15} /> },
] as const;

/* ------------------------------------------------------------------ */
/*  Success Rate Bar                                                   */
/* ------------------------------------------------------------------ */

function SuccessRateBar({ rate, isDark }: { rate: number; isDark: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-semibold text-sm" style={{ color: isDark ? '#f0f0f5' : '#1a1a2e' }}>{rate}%</span>
      <div className="flex-1 h-2 rounded-full overflow-hidden min-w-[60px]" style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${rate}%` }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="h-full rounded-full bg-[#FF4800]"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Cell Renderer                                                      */
/* ------------------------------------------------------------------ */

function CellContent({
  criterion,
  service,
  isDark,
}: {
  criterion: (typeof criteria)[number];
  service: ServiceData;
  isDark: boolean;
}) {
  if (criterion.key === 'deliverables') {
    return (
      <ul className="flex flex-col gap-1">
        {service.deliverables.map((d, i) => (
          <li key={i} className="flex items-start gap-1.5 text-sm" style={{ color: isDark ? '#f0f0f5' : '#4a4a5a' }}>
            <span className="mt-0.5 text-[#FF4800] text-[10px] leading-none">•</span>
            {d}
          </li>
        ))}
      </ul>
    );
  }

  if (criterion.key === 'successRate') {
    return <SuccessRateBar rate={service.successRate} isDark={isDark} />;
  }

const value = service[criterion.key];

  if (typeof value === 'string') {
    return <span className="text-sm" style={{ color: isDark ? '#f0f0f5' : '#4a4a5a' }}>{value}</span>;
  }

  return null;
}

/* ------------------------------------------------------------------ */
/*  ServiceComparison Component                                        */
/* ------------------------------------------------------------------ */

export default function ServiceComparison() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const toggleService = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    setSelected((prev) => {
      if (prev.size === 4) {
        return new Set();
      }
      return new Set(toggleConfig.map((t) => t.id));
    });
  };

  const allSelected = selected.size === 4;

  return (
    <section className="px-6 py-24" style={{ background: isDark ? '#12121e' : '#f8f8fc' }}>
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease }}
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FF4800]"
          >
            SERVICE COMPARISON
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="masked-title font-normal"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.8rem)', lineHeight: 1.1, letterSpacing: '-2.05px' }}
          >
            Find the right solution for your enterprise.
          </motion.h2>
        </div>

        {/* Toggle Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mb-8 flex flex-wrap items-center gap-3"
        >
          {toggleConfig.map((t) => {
            const isActive = selected.has(t.id);
            return (
              <motion.button
                key={t.id}
                layout
                onClick={() => toggleService(t.id)}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors border"
                style={
                  isActive
                    ? { background: '#FF4800', color: '#ffffff', borderColor: '#FF4800' }
                    : {
                        background: isDark ? '#1a1a2e' : '#FFFFFF',
                        borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                        color: isDark ? '#9ca3af' : '#6b7280',
                      }
                }
              >
                {t.icon}
                <span className="hidden sm:inline">{t.label}</span>
              </motion.button>
            );
          })}

          <motion.button
            layout
            onClick={toggleAll}
            whileTap={{ scale: 0.96 }}
            className={`
              ml-auto flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors
              ${
                allSelected
                  ? 'bg-[#FF4800] text-white'
                  : 'border border-[#FF4800]/40 text-[#FF4800] hover:bg-[#FF4800]/5'
              }
            `}
            style={allSelected ? undefined : { background: isDark ? 'transparent' : '#FFFFFF' }}
          >
            <GitCompareArrows size={15} />
            <span className="hidden sm:inline">Compare All</span>
          </motion.button>
        </motion.div>

        {/* Comparison Content */}
        <AnimatePresence mode="wait">
          {selected.size === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease }}
              className="flex flex-col items-center justify-center rounded-xl py-20 text-center"
              style={{
                background: isDark ? '#12121e' : '#FFFFFF',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
              }}
            >
              <GitCompareArrows size={48} className="mb-4" style={{ color: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)' }} />
              <p className="text-lg" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                Select services above to compare
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease }}
              className="overflow-hidden rounded-xl"
              style={{
                background: isDark ? '#12121e' : '#FFFFFF',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
              }}
            >
              {/* Scrollable wrapper for mobile */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] border-collapse">
                  {/* Header Row */}
                  <thead>
                    <tr style={{ background: isDark ? '#1a1a2e' : '#f3f4f6' }}>
                      <th className="px-5 py-4 text-left text-[12px] font-semibold uppercase tracking-[0.15em] w-[160px]" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                        Criteria
                      </th>
                      {Array.from(selected).map((id) => {
                        const service = comparisonData[id];
                        return (
                          <th
                            key={id}
                            className="px-5 py-4 text-left text-sm font-semibold"
                            style={{ color: isDark ? '#f0f0f5' : '#1a1a2e' }}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-[#FF4800]">{service.icon}</span>
                              <span className="hidden md:inline">{service.name}</span>
                              <span className="md:hidden">
                                {service.name.split(' ').map((w) => w[0]).join('')}
                              </span>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>

                  {/* Body Rows */}
                  <tbody>
                    {criteria.map((criterion, rowIdx) => (
                      <motion.tr
                        key={criterion.key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease, delay: rowIdx * 0.05 }}
                        style={
                          rowIdx % 2 !== 0
                            ? { background: isDark ? 'rgba(26,26,46,0.4)' : 'rgba(250,250,250,1)' }
                            : undefined
                        }
                      >
                        <td className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.1em] align-top whitespace-nowrap" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                          {criterion.label}
                        </td>
                        {Array.from(selected).map((id) => {
                          const service = comparisonData[id];
                          return (
                            <td key={id} className="px-5 py-4 align-top">
                              <CellContent
                                criterion={criterion}
                                service={service}
                                isDark={isDark}
                              />
                            </td>
                          );
                        })}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
