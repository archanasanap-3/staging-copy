'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Building2, Globe, Mail, type LucideIcon } from 'lucide-react';

const ease = [0.4, 0, 0.2, 1] as const;

interface ContactRow {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

const ROWS: ContactRow[] = [
  { icon: Mail, label: 'Privacy Email', value: 'stravedatech@gmail.com', href: 'mailto:stravedatech@gmail.com' },
  { icon: Building2, label: 'Company', value: 'Straveda Technologies' },
  { icon: Globe, label: 'Website', value: 'straveda.com', href: 'https://straveda.com' },
];

export default function PrivacyContactCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease }}
      className="glass-card relative overflow-hidden rounded-3xl p-8 md:p-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #FF4800 0%, transparent 70%)' }}
      />

      <div className="relative z-10">
        <p className="mb-2 text-[11px] font-bold tracking-[0.3em] text-[#FF4800] uppercase">Get in Touch</p>
        <h3 className="mb-2 text-[22px] font-semibold text-[#1a1a2e] dark:text-white md:text-[26px]">
          Questions about your privacy?
        </h3>
        <p className="mb-6 max-w-lg text-[14px] leading-relaxed text-gray-600 dark:text-gray-400">
          Reach out any time — our team responds to every privacy request personally.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {ROWS.map(({ icon: Icon, label, value, href }) => {
            const content = (
              <div className="group flex h-full flex-col gap-3 rounded-2xl border border-black/[0.06] bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF4800]/30 hover:shadow-lg dark:border-white/[0.08] dark:bg-white/[0.03]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF4800]/10 text-[#FF4800]">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    {label}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-[14px] font-semibold break-all text-[#1a1a2e] dark:text-white">
                    {value}
                    {href && (
                      <ArrowUpRight
                        className="h-3.5 w-3.5 flex-shrink-0 text-[#FF4800] opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    )}
                  </p>
                </div>
              </div>
            );

            if (!href) {
              return <div key={label}>{content}</div>;
            }

            const isExternal = href.startsWith('http');
            return (
              <a
                key={label}
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                aria-label={`${label}: ${value}`}
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
