'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, CalendarDays, History, Clock, Tag, type LucideIcon } from 'lucide-react';

const ease = [0.4, 0, 0.2, 1] as const;

interface PrivacyHeroProps {
  effectiveDate: string;
  lastUpdated: string;
  readingTime: string;
  version: string;
}

interface MetaItem {
  label: string;
  value: string;
  icon: LucideIcon;
}

export default function PrivacyHero({ effectiveDate, lastUpdated, readingTime, version }: PrivacyHeroProps) {
  const meta: MetaItem[] = [
    { label: 'Effective Date', value: effectiveDate, icon: CalendarDays },
    { label: 'Last Updated', value: lastUpdated, icon: History },
    { label: 'Reading Time', value: readingTime, icon: Clock },
    { label: 'Policy Version', value: version, icon: Tag },
  ];

  return (
    <section className="relative overflow-hidden border-b border-black/[0.06] bg-[#F6F1E7] px-6 dark:border-white/[0.06] dark:bg-[#0a0a14] pt-32 md:pt-36 pb-12 md:pb-16">
      {/* Ambient gradient backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 gradient-mesh-indigo dark:opacity-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full opacity-[0.15] blur-[20px]"
        style={{ background: 'radial-gradient(circle, #FF4800 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full opacity-[0.12] blur-[20px]"
        style={{ background: 'radial-gradient(circle, #2B2358 0%, transparent 70%)' }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid opacity-40 dark:opacity-[0.06]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Icon badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="glass-card mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl"
        >
          <ShieldCheck className="h-9 w-9 text-[#FF4800]" strokeWidth={1.6} aria-hidden="true" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
          className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800]"
        >
          Legal &middot; Privacy
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="heading-gradient font-bold"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.25rem)', lineHeight: 1.0, letterSpacing: '-2px' }}
        >
          Privacy Policy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
          className="mx-auto mt-7 max-w-2xl text-[16px] leading-[1.75] text-gray-600 dark:text-gray-400 md:text-[18px]"
        >
          We value your trust. This Privacy Policy explains how Straveda collects, uses, protects and
          manages your information while using our software, AI solutions and IT services.
        </motion.p>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {meta.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="glass-card flex items-center gap-2.5 rounded-full px-4 py-2.5 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Icon className="h-4 w-4 text-[#FF4800]" strokeWidth={2} aria-hidden="true" />
              <span className="text-[12px] font-semibold text-gray-500 dark:text-gray-400">{label}:</span>
              <span className="text-[12px] font-bold text-[#1a1a2e] dark:text-white">{value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
