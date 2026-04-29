'use client';

/**
 * ParallaxShowcase — WHY STRAVEDA dark feature-card section.
 *
 * FIX: Removed Framer Motion useScroll() + 7× useTransform() chains.
 * Those created a native scroll listener that fired every frame independently
 * of Lenis, causing two scroll systems to compete on the same RAF loop.
 * Cards still entrance-animate via whileInView — zero scroll overhead at rest.
 */

import { motion } from 'framer-motion';
import {
  Shield,
  Code,
  Zap,
  Clock,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import MagneticButton from '@/components/straveda/MagneticButton';

interface ParallaxShowcaseProps {
  onNavigate?: (page: string) => void;
}

const ease = [0.4, 0, 0.2, 1] as const;

const featureCards = [
  { title: 'Enterprise Grade', icon: Shield,       description: 'Built for mission-critical workloads at scale' },
  { title: 'Open Standards',   icon: Code,         description: 'No vendor lock in, maximum flexibility' },
  { title: 'Agile Delivery',   icon: Zap,          description: 'Iterative approach with rapid, measurable results' },
  { title: '24/7 Support',     icon: Clock,        description: 'Round the clock enterprise support coverage' },
  { title: 'Cost Effective',   icon: DollarSign,   description: 'Maximum ROI per dollar invested' },
  { title: 'Proven Results',   icon: TrendingUp,   description: '99.9% uptime across all deployments' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.1, ease },
  }),
};

export default function ParallaxShowcase({ onNavigate }: ParallaxShowcaseProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '600px', background: '#000000' }}
    >
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,72,0,0.03) 0%, transparent 70%)' }}
      />

      {/* Background watermark — static, no scroll subscription */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden">
        <span
          className="whitespace-nowrap font-bold uppercase"
          style={{ fontSize: 'clamp(80px, 12vw, 180px)', color: 'rgba(255,255,255,0.03)', letterSpacing: '0.15em', lineHeight: 1 }}
        >
          STRAVEDA
        </span>
      </div>

      {/* Feature cards grid */}
      <div className="relative z-10">
        <div className="mx-auto w-full max-w-7xl px-6 pt-20 lg:px-8 lg:pt-24">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                >
                  <div
                    className="group rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      backdropFilter: 'blur(20px) saturate(1.4)',
                      WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
                      border: '1px solid rgba(255,255,255,0.13)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.3)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.border = '1px solid rgba(255,72,0,0.35)';
                      e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.1), 0 12px 40px rgba(255,72,0,0.12), 0 4px 20px rgba(0,0,0,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.border = '1px solid rgba(255,255,255,0.13)';
                      e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.3)';
                    }}
                  >
                    <Icon className="mb-3 h-5 w-5" style={{ color: '#FF4800' }} />
                    <h4 className="mb-1 text-[15px] font-semibold text-white">{card.title}</h4>
                    <p className="text-[13px] leading-relaxed" style={{ color: '#A1A1A1' }}>{card.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Front content — static wrapper (was useTransform y=0→0, literally no effect) */}
      <div className="relative z-10">
        <div className="mx-auto w-full max-w-3xl px-6 pb-20 text-center lg:px-8 lg:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease }}
            className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em]"
            style={{ color: '#FF4800' }}
          >
            WHY STRAVEDA
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mb-6 text-white"
            style={{ fontWeight: 500, fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.15 }}
          >
            The partner enterprises trust.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mx-auto mb-10 max-w-xl leading-[1.7]"
            style={{ color: '#A1A1A1', fontSize: '18px' }}
          >
            From Fortune 500 financial institutions to government agencies, we
            deliver transformative results with unmatched expertise and dedication.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
          >
            <MagneticButton>
              <button
                onClick={() => onNavigate?.('contact')}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-[14px] font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg btn-shine"
                style={{ background: '#FF4800' }}
              >
                Start a project
              </button>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Bottom edge glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,72,0,0.3) 50%, transparent 100%)' }}
      />
    </section>
  );
}
