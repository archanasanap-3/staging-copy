'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowUpRight } from 'lucide-react';

interface ChallengeOption {
  id: string;
  label: string;
  targetId: string;
  serviceTitle: string;
}

const CHALLENGES: ChallengeOption[] = [
  {
    id: 'manual-work',
    label: 'We spend too much time on manual work',
    targetId: 'automation',
    serviceTitle: 'AI & Business Automation',
  },
  {
    id: 'website',
    label: 'We need a professional website',
    targetId: 'web-development',
    serviceTitle: 'Websites That Build Trust and Grow Your Business',
  },
  {
    id: 'software',
    label: 'We need software for our business',
    targetId: 'custom-software',
    serviceTitle: 'Custom Software & Business Systems',
  },
  {
    id: 'customer-management',
    label: 'We want to improve customer management',
    targetId: 'custom-software',
    serviceTitle: 'Customer & Sales Management (Custom Software)',
  },
  {
    id: 'digital-product',
    label: 'We have an idea for a digital product',
    targetId: 'ai-strategy',
    serviceTitle: 'AI Product Development & Strategy',
  },
];

interface ImprovementFinderSectionProps {
  onNavigate?: (page: string) => void;
}

export default function ImprovementFinderSection({
  onNavigate,
}: ImprovementFinderSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [activeFeedback, setActiveFeedback] = useState<string | null>(null);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setActiveFeedback(null);
  };

  const handleFindSolution = () => {
    const selected = CHALLENGES[selectedIndex];
    if (!selected) return;

    setActiveFeedback(selected.serviceTitle);

    const targetElement = document.getElementById(selected.targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      window.history.pushState(null, '', `#${selected.targetId}`);

      // Temporary visual pulse on the target section
      targetElement.classList.add('ring-2', 'ring-[#FF4800]', 'transition-all', 'duration-500');
      setTimeout(() => {
        targetElement.classList.remove('ring-2', 'ring-[#FF4800]');
      }, 2500);
    } else if (onNavigate) {
      onNavigate(selected.targetId);
    }
  };

  return (
    <section className="relative overflow-hidden bg-black py-8 sm:py-10 md:py-12 text-white border-y border-white/10">
      {/* Subtle ambient orange glow in background */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-96 -translate-x-1/2 rounded-full bg-[#FF4800]/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.5rem] leading-[1.2]">
            Tell us what you want to improve.
          </h2>
          <p className="mt-2 text-base text-neutral-300 sm:text-lg md:text-xl">
            Choose the challenge that best describes your business.
          </p>

          {/* Challenge Options List */}
          <div className="mt-6 space-y-3 sm:mt-7 sm:space-y-3.5" role="radiogroup" aria-label="Business Challenges">
            {CHALLENGES.map((challenge, index) => {
              const isSelected = selectedIndex === index;

              return (
                <div
                  key={challenge.id}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onClick={() => handleSelect(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelect(index);
                    }
                  }}
                  className={`group flex cursor-pointer items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-200 select-none sm:gap-4.5 sm:px-6 sm:py-4.5 ${
                    isSelected
                      ? 'border border-[#FF4800] bg-[#1a1a1e] shadow-[0_0_20px_rgba(255,72,0,0.12)]'
                      : 'border border-transparent bg-[#222226] hover:bg-[#2b2b30] hover:border-white/10'
                  }`}
                >
                  {/* Indicator Icon */}
                  {isSelected ? (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#FF4800]">
                      <Check size={13} strokeWidth={3} className="text-[#FF4800]" />
                    </div>
                  ) : (
                    <div className="h-4.5 w-4.5 shrink-0 rounded-full bg-[#808088] transition-colors group-hover:bg-[#a0a0aa]" />
                  )}

                  {/* Label */}
                  <span
                    className={`text-[16px] sm:text-[18px] md:text-[19px] leading-snug transition-colors ${
                      isSelected ? 'font-medium text-white' : 'font-medium text-neutral-200'
                    }`}
                  >
                    {challenge.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="mt-4 sm:mt-5">
            <button
              type="button"
              onClick={handleFindSolution}
              className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-[#e6e6ec] px-6 py-4 text-base font-semibold text-neutral-950 dark:text-neutral-950 transition-all duration-200 hover:bg-white hover:shadow-lg active:scale-[0.99] sm:py-4.5 sm:text-lg md:text-[19px]"
              style={{ color: '#111116' }}
            >
              <span className="font-semibold text-neutral-950 dark:text-neutral-950" style={{ color: '#111116' }}>
                Find the right solution
              </span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-[#3b82f6] text-white shadow-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={13} strokeWidth={3} />
              </span>
            </button>
          </div>

          {/* Active Solution Notice */}
          <AnimatePresence>
            {activeFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-4 flex items-center justify-between rounded-lg border border-[#FF4800]/30 bg-[#FF4800]/10 px-4 py-2.5 text-xs sm:text-sm text-neutral-300"
              >
                <span>
                  Recommended Solution: <strong className="text-white">{activeFeedback}</strong>
                </span>
                <span className="text-[#FF4800] font-medium">Navigating above ↑</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
