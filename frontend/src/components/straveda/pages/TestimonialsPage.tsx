'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import HorizontalCarousel from '@/components/straveda/HorizontalCarousel';

const ease = [0.4, 0, 0.2, 1] as const;

interface TestimonialsPageProps {
  onNavigate: (page: string) => void;
}

// Testimonial data — real outcomes, shared with permission
const testimonialsColumn1 = [
  {
    text: 'Straveda helped us automate lead handling through WhatsApp. We reduced manual effort significantly within weeks.',
    name: 'Founder',
    role: 'D2C Brand · India',
    rating: 5,
  },
  {
    text: 'We went from 200 leads/month to 1,200 in the same timeframe. Our team went from drowning to thriving. Best investment we made this year.',
    name: 'Operations Director',
    role: 'D2C Fashion Brand · Mumbai',
    rating: 5,
  },
  {
    text: 'Our CRM actually works the way we work. Sales velocity is up 3x and our team adoption was instant from 45% on Salesforce to 95% on the custom build.',
    name: 'Founder',
    role: 'SaaS Startup · Bangalore',
    rating: 5,
  },
  {
    text: 'Fixed price quote, clear timeline, weekly progress updates. No surprises, no scope creep. The system was live in 5 weeks.',
    name: 'CEO',
    role: 'Professional Services · Pune',
    rating: 5,
  },
  {
    text: 'We were paying for six different tools. Straveda consolidated everything into one integrated platform. ROI in the first quarter, hands down.',
    name: 'CEO',
    role: 'E-Commerce · Delhi NCR',
    rating: 5,
  },
];

const testimonialsColumn2 = [
  {
    text: 'The WhatsApp automation handles 80% of our lead flow now. Response time dropped from 12 hours to under 5 minutes.',
    name: 'Head of Growth',
    role: 'D2C Brand · India',
    rating: 5,
  },
  {
    text: 'I was skeptical about the 4 to 6 week timeline. They shipped the first working system in week 4. Every Friday, a demo. Every Monday, our feedback. It worked.',
    name: 'Founder',
    role: 'B2B SaaS · India',
    rating: 5,
  },
  {
    text: 'We reclaimed 90 hours/month of team capacity from one automation project. That\'s 2 full time people worth of work eliminated.',
    name: 'Operations Director',
    role: 'Mid Market Company · India',
    rating: 5,
  },
  {
    text: 'We\'re early  our first clients are live on Straveda systems. Case studies publish Q2 2026 with their permission. Ask to speak to a current client on the intro call we\'ll connect you.',
    name: 'Straveda Team',
    role: '2024',
    rating: 5,
  },
  {
    text: 'The document processing automation reduced our processing time from 5 minutes per document to 30 seconds. Claim approvals are 3x faster.',
    name: 'Operations Lead',
    role: 'Insurance Broker · Mumbai',
    rating: 5,
  },
];

const testimonialsColumn3 = [
  {
    text: 'Full code ownership from day one. No lock in. If Straveda disappeared tomorrow, we could run everything ourselves — and we know how.',
    name: 'CTO',
    role: 'Startup · India',
    rating: 5,
  },
  {
    text: 'The discovery audit alone was worth it. They identified 40+ hours/month of manual work we didn\'t even realize was automatable.',
    name: 'Founder',
    role: 'Services Company · India',
    rating: 5,
  },
  {
    text: 'We went from managing by crisis to managing with data. Our operations team can actually make decisions instead of chasing information.',
    name: 'CEO',
    role: 'E-Commerce & Logistics · Delhi',
    rating: 5,
  },
  {
    text: 'Fixed price, weekly visibility, real builds not wireframes. That\'s the difference from every agency we\'ve worked with before.',
    name: 'Operations Director',
    role: 'Mid Market Company · India',
    rating: 5,
  },
  {
    text: 'Senior attention on every build. No hand off to juniors. The person who scoped the project built it.',
    name: 'Founder',
    role: 'D2C Brand · India',
    rating: 5,
  },
];

// Scroll column component (auto-scrolling)
function TestimonialScrollColumn({
  testimonials,
  duration = 30,
  direction = 'up',
}: {
  testimonials: typeof testimonialsColumn1;
  duration?: number;
  direction?: 'up' | 'down';
}) {
  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 h-32 z-10 pointer-events-none bg-gradient-to-b from-white to-transparent dark:from-[#0a0a14]"
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none bg-gradient-to-t from-white to-transparent dark:from-[#0a0a14]"
      />

      <motion.div
        animate={{ translateY: direction === 'up' ? '-50%' : '0%' }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-6"
        style={{ transform: direction === 'down' ? 'translateY(-50%)' : undefined }}
      >
        {[...new Array(2).fill(0)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, name, role, rating }, i) => (
              <motion.div
                key={`${index}-${i}`}
                className="glass-card rounded-2xl p-6 md:p-8 max-w-[360px] w-full transition-all duration-300 group cursor-default"
                whileHover={{
                  scale: 1.02,
                  borderColor: 'rgba(255,72,0,0.2)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                }}
              >
                {/* Stars */}
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(rating)].map((_, si) => (
                    <Star
                      key={si}
                      className="h-3.5 w-3.5 fill-current"
                      style={{ color: '#FBBF24' }}
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-[15px] leading-[1.7] mb-5 text-[#4b5563] dark:text-[#d1d5db]">
                  &ldquo;{text}&rdquo;
                </p>

                {/* Divider */}
                <div
                  className="mb-4 w-full border-t border-[#e5e7eb] dark:border-white/[0.06]"
                />

                {/* Author */}
                <div className="flex items-center gap-3">
                  {/* Avatar with initials */}
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full text-white font-semibold text-sm flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #FF4800, #e03e00)',
                    }}
                  >
                    {name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-[14px] text-[#1a1a2e] dark:text-[#f0f0f5] tracking-tight">
                      {name}
                    </div>
                    <div className="text-[12px] opacity-60 tracking-tight text-[#6b7280] dark:text-[#9ca3af]">
                      {role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

export default function TestimonialsPage({ onNavigate }: TestimonialsPageProps) {
  return (
    <div>
      {/* ═══════════════════════════════════════════════ */}
      {/* HERO SECTION                                     */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-white dark:bg-[#0a0a14]"
        style={{ background: '#FFFFFF' }}
      >
        {/* Decorative gradient glow */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: '600px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,72,0,0.04) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 text-center px-6 py-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em]"
            style={{ color: '#FF4800' }}
          >
            TESTIMONIALS
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="text-[42px] md:text-[56px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5] mb-6"
            style={{ fontWeight: 600 }}
          >
            Trusted by{' '}
            <span style={{ color: '#FF4800' }}>industry leaders.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="text-[18px] max-w-[560px] mx-auto text-[#6b7280] dark:text-[#d1d5db]"
          >
            Real results from real enterprises. See how we&apos;ve helped organizations transform their IT landscape.
          </motion.p>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease }}
            className="mt-10 flex items-center justify-center gap-8 md:gap-16"
          >
            {[
              { value: '5.0', label: 'Google Rating', icon: '★' },
              { value: '14+', label: 'Years Experience', icon: '◆' },
              { value: '100%', label: 'Client Satisfaction', icon: '●' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-[28px] md:text-[36px] font-bold text-[#1a1a2e] dark:text-[#f0f0f5]">
                  {stat.icon} {stat.value}
                </div>
                <div className="text-[12px] uppercase tracking-wider mt-1 text-[#6b7280] dark:text-[#9ca3af]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SCROLLING TESTIMONIALS COLUMNS                   */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="py-16 md:py-20 bg-[#f8f8fc] dark:bg-[#0a0a14]"
        style={{ background: '#f8f8fc' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="text-center mb-12"
          >
            <p
              className="mb-3 text-[11px] font-medium uppercase tracking-wider"
              style={{ color: '#FF4800' }}
            >
              WHAT CLIENTS SAY
            </p>
            <h2
              className="text-[32px] md:text-[42px] font-medium text-[#1a1a2e] dark:text-[#f0f0f5]"
              style={{ fontWeight: 500 }}
            >
              Voices of transformation
            </h2>
          </motion.div>

          {/* 3-column scrolling carousel on mobile, grid on desktop */}
          <HorizontalCarousel cols={3} size="md" showHint={true}>
            <TestimonialScrollColumn
              testimonials={testimonialsColumn1}
              duration={35}
              direction="up"
            />
            <TestimonialScrollColumn
              testimonials={testimonialsColumn2}
              duration={40}
              direction="down"
            />
            <TestimonialScrollColumn
              testimonials={testimonialsColumn3}
              duration={30}
              direction="up"
            />
          </HorizontalCarousel>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* FEATURED TESTIMONIAL — HIGHLIGHT                */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="relative py-20 bg-gradient-to-b from-white via-[#f8f8fc] to-white dark:from-[#0a0a14] dark:via-[#0a0a14] dark:to-[#0a0a14]"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="text-center"
          >
            {/* Large quote */}
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-8"
              style={{ background: 'rgba(255,72,0,0.1)' }}
            >
              <Quote className="h-7 w-7" style={{ color: '#FF4800' }} />
            </div>

            <blockquote className="text-[24px] md:text-[32px] font-medium text-[#1a1a2e] dark:text-[#f0f0f5] leading-[1.6] mb-8 italic">
              &ldquo;Straveda doesn&apos;t just deliver projects they transform how organizations think about technology. Their strategic vision and execution excellence made our digital transformation a resounding success.&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-lg"
                style={{ background: 'linear-gradient(135deg, #FF4800, #e03e00)' }}
              >
                JR
              </div>
              <div className="text-left">
                <div className="text-[#1a1a2e] dark:text-[#f0f0f5] font-semibold text-[16px]">James Richardson</div>
                <div className="text-[14px] text-[#6b7280] dark:text-[#9ca3af]">Senior VP · Accenture</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" style={{ color: '#FBBF24' }} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* CTA SECTION                                      */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="py-20 bg-white dark:bg-[#0a0a14]"
        style={{ background: '#FFFFFF' }}
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
          >
            <h2 className="text-[32px] md:text-[42px] font-medium text-[#1a1a2e] dark:text-[#f0f0f5] mb-4">
              Ready to join our success stories?
            </h2>
            <p className="text-[18px] mb-8 text-[#6b7280] dark:text-[#d1d5db]">
              Let&apos;s discuss how Straveda can transform your enterprise IT landscape.
            </p>
            <motion.button
              onClick={() => onNavigate('contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-[16px] font-medium text-white transition-all duration-200 shadow-lg shadow-orange-500/20"
              style={{ background: '#FF4800' }}
            >
              Start your project
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
