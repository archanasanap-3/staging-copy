'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

const ease = [0.4, 0, 0.2, 1] as const;

interface PrivacySectionProps {
  id: string;
  number: string;
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export default function PrivacySection({ id, number, title, icon: Icon, children }: PrivacySectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease }}
      aria-labelledby={`${id}-heading`}
      className="card-glow group relative scroll-mt-28 overflow-hidden rounded-3xl border border-black/[0.06] bg-white/70 p-6 backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.02] md:p-10"
    >
      <span aria-hidden="true" className="section-number pointer-events-none absolute top-4 right-6 hidden select-none md:block">
        {number}
      </span>

      <div className="relative flex items-start gap-4 md:gap-5">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#FF4800]/10 text-[#FF4800] transition-transform duration-300 group-hover:scale-110 dark:bg-[#FF4800]/15 md:h-12 md:w-12">
          <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.75} aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h2
            id={`${id}-heading`}
            className="text-[22px] leading-tight font-bold text-black dark:text-white md:text-[26px]"
          >
            {title}
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-[1.8] text-gray-600 dark:text-gray-400">
            {children}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
