'use client';

import { motion } from 'framer-motion';

interface PageHeaderProps {
  /** Small all-caps orange label above the title */
  eyebrow: string;
  /** Main heading text — receives heading-gradient class */
  title: string;
  /** Optional paragraph below the heading */
  subtitle?: string;
  /** Whether the accent bar should be shown (default: true) */
  showBar?: boolean;
  className?: string;
}

const ease = [0.4, 0, 0.2, 1] as const;

/**
 * Straveda Standard Page Header
 * ─────────────────────────────
 * Enforces uniform title layout across every page:
 *   eyebrow → [accent bar | heading] → subtitle
 *
 * Typography contract:
 *   font-size: clamp(2rem, 4vw, 3rem)
 *   line-height: 1.0
 *   letter-spacing: -2px
 *   class: heading-gradient
 *
 * Accent bar:
 *   width: 3px  |  height: 52px  |  color: #FF4800 → fade
 *   hidden on mobile, visible md+
 */
export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  showBar = true,
  className = '',
}: PageHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
      className={`w-full ${className}`}
    >
      {/* Eyebrow */}
      <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.4em] text-[#FF4800]">
        {eyebrow}
      </p>

      {/* Accent bar + heading */}
      <div className="flex items-start gap-6">
        {showBar && (
          <div
            className="mt-1 hidden md:block flex-shrink-0 rounded-full"
            style={{
              width: '3px',
              height: '52px',
              background: 'linear-gradient(180deg, #FF4800 0%, rgba(255,72,0,0.15) 100%)',
            }}
            aria-hidden="true"
          />
        )}

        <h1
          className="heading-gradient font-normal"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            lineHeight: 1.0,
            letterSpacing: '-2px',
          }}
        >
          {title}
        </h1>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-6 max-w-2xl text-[16px] leading-[1.75] text-gray-600 dark:text-gray-400"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.header>
  );
}
