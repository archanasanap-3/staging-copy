'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ServiceCardProps {
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
  capabilities: string[];
  index: number;
  isActive?: boolean;
}

export default function ServiceCard({
  icon: Icon,
  badge,
  title,
  description,
  capabilities,
  index,
  isActive,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1] as const,
      }}
      className={[
        /* ── Base ── */
        'group relative flex flex-col h-full cursor-pointer select-none',

        /* ── Light mode card ──
           White surface, 1px #eee border, soft brand shadow */
        'bg-white border border-[#eeeeee]',
        'shadow-[0_4px_20px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.04)]',

        /* ── Dark mode card ──
           #1A1A1A is slightly lighter than the #0a0a14 / #121212 page bg
           creating perceived depth without harsh contrast */
        'dark:bg-[#1a1a1a] dark:border-white/[0.06] dark:shadow-none',

        /* ── Hover ── */
        'hover:border-[#FF4800]/25 transition-all duration-200',
        'dark:hover:border-[#FF4800]/20',
        'dark:hover:shadow-[0_0_0_1px_rgba(255,72,0,0.18),0_8px_32px_rgba(255,72,0,0.08)]',

        /* ── Touch / tap tactile feedback ── */
        'active:scale-95',

        /* ── Layout ── */
        'rounded-2xl p-6 sm:p-7',
      ].join(' ')}
    >
      {/* ── Squircle icon container ──────────────────────────── */}
      <div
        className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{
          background: 'rgba(255, 72, 0, 0.08)',
          border: '1px solid rgba(255, 72, 0, 0.12)',
        }}
      >
        <Icon size={22} className="text-[#FF4800]" strokeWidth={1.8} />
      </div>

      {/* ── Badge ────────────────────────────────────────────── */}
      <span className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF4800]">
        {badge}
      </span>

      {/* ── Title (text-xl bold, tight tracking) ─────────────── */}
      <h3 className="mb-3 text-xl font-bold leading-tight tracking-tight text-[#1a1a2e] dark:text-[#f0f0f5]">
        {title}
      </h3>

      {/* ── Description (leading-relaxed for mobile readability) ─ */}
      <p className="mb-5 flex-1 text-[14px] leading-relaxed text-[#6b7280] dark:text-[#9ca3af]">
        {description}
      </p>

      {/* ── Capabilities bullet list ──────────────────────────── */}
      <ul className="space-y-2">
        {capabilities.map((cap, i) => {
          const [label] = cap.split(':');
          return (
            <li
              key={i}
              className="flex items-center gap-2 text-[12px] text-[#6b7280] dark:text-[#9ca3af]"
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF4800]"
                aria-hidden="true"
              />
              {label}
            </li>
          );
        })}
      </ul>

      {/* ── Footer CTA ────────────────────────────────────────── */}
      <div className="mt-5 pt-4 border-t border-[#f0f0f4] dark:border-white/[0.06] flex items-center gap-1.5 text-[12px] font-medium text-[#FF4800]">
        <span>Explore service</span>
        <ArrowRight
          size={12}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </div>

      {/* ── Active indicator for carousel context ─────────────── */}
      {isActive && (
        <span
          className="absolute top-4 right-4 h-2 w-2 rounded-full bg-[#FF4800]"
          style={{ boxShadow: '0 0 6px rgba(255,72,0,0.65)' }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}
