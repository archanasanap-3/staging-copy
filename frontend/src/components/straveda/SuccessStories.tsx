'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react'

const stories = [
  {
    company: 'Accenture',
    quote: 'Straveda transformed our legacy infrastructure, reducing deployment time by 60%.',
    industry: 'Technology',
    metric: '60% faster deployments',
  },
  {
    company: 'Deloitte',
    quote: 'The technology strategy roadmap gave us a clear 3-year vision.',
    industry: 'Consulting',
    metric: '3x faster delivery',
  },
  {
    company: 'IBM',
    quote: 'Their management consulting approach eliminated bottlenecks we\'d struggled with for years.',
    industry: 'Enterprise',
    metric: 'Enterprise partners',
  },
  {
    company: 'JPMorgan',
    quote: 'Zero downtime migration across 200+ microservices in record time.',
    industry: 'Finance',
    metric: '200+ services migrated',
  },
  {
    company: 'Northrop Grumman',
    quote: 'IT investment approach transformed our technology portfolio ROI.',
    industry: 'Defense',
    metric: '45% cost reduction',
  },
  {
    company: 'State of Texas',
    quote: '99.99% uptime achieved across all critical government systems.',
    industry: 'Government',
    metric: '99.99% uptime',
  },
]

const ease = [0.4, 0, 0.2, 1] as const

export default function SuccessStories() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const scrollBy = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const cardWidth = 350
    const gap = 24
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -(cardWidth + gap) : cardWidth + gap,
      behavior: 'smooth',
    })
  }, [])

  // Auto-scroll every 4 seconds, pauses on hover
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      if (!scrollRef.current) return
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      // If at end, reset to start
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        scrollBy('right')
      }
    }, 4000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, scrollBy])

  return (
    <section
      className="py-24"
      style={{ background: '#FFFFFF' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
          className="mb-14"
        >
          <p
            className="mb-4 text-[11px] font-medium uppercase tracking-wider"
            style={{ color: '#FF4800' }}
          >
            SUCCESS STORIES
          </p>
          <h2
            className="text-[42px] font-medium text-[#1a1a2e]"
            style={{ fontWeight: 500 }}
          >
            Trusted by industry leaders
          </h2>
        </motion.div>

        {/* Scroll container with navigation arrows */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scrollBy('left')}
            className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 md:flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-black/5"
            style={{
              background: 'rgba(255,255,255,0.9)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              color: '#6b7280',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FF4800')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
            aria-label="Previous story"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scrollBy('right')}
            className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 md:flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-black/5"
            style={{
              background: 'rgba(255,255,255,0.9)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              color: '#6b7280',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FF4800')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
            aria-label="Next story"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Horizontal scroll container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory',
            }}
          >
            {/* Left spacer for arrow overlap */}
            <div className="hidden md:block w-2 flex-shrink-0" />

            {stories.map((story, index) => (
              <motion.div
                key={story.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease }}
                className="flex-shrink-0"
                style={{ width: '350px', scrollSnapAlign: 'start' }}
              >
                <div
                  className="h-full rounded-xl p-6 transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(20px) saturate(1.8) brightness(1.02)',
                    WebkitBackdropFilter: 'blur(20px) saturate(1.8) brightness(1.02)',
                    borderLeft: '3px solid #FF4800',
                    borderTop: '1.5px solid rgba(255,255,255,0.9)',
                    borderRight: '1.5px solid rgba(255,255,255,0.9)',
                    borderBottom: '1.5px solid rgba(255,255,255,0.9)',
                    boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.05)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = 'inset 0 2px 0 rgba(255,255,255,0.95), 0 12px 40px rgba(255,72,0,0.12), 0 24px 48px rgba(0,0,0,0.08)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'inset 0 2px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.05)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {/* Company name */}
                  <h3
                    className="mb-3 text-[18px] font-semibold text-[#1a1a2e]"
                    style={{ fontWeight: 600 }}
                  >
                    {story.company}
                  </h3>

                  {/* Quote */}
                  <p
                    className="mb-5 text-[15px] leading-relaxed"
                    style={{
                      color: '#6b7280',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    &ldquo;{story.quote}&rdquo;
                  </p>

                  {/* Industry tag badge */}
                  <div className="mb-5 flex items-center gap-3">
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wider"
                      style={{
                        background: 'rgba(255,72,0,0.06)',
                        color: '#FF4800',
                      }}
                    >
                      {story.industry}
                    </span>
                  </div>

                  {/* Divider */}
                  <div
                    className="mb-4 w-full"
                    style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
                  />

                  {/* Metric */}
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" style={{ color: '#FF4800' }} />
                    <span
                      className="text-[14px] font-semibold"
                      style={{ color: '#1a1a2e' }}
                    >
                      {story.metric}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Right spacer for arrow overlap */}
            <div className="hidden md:block w-2 flex-shrink-0" />
          </div>
        </div>
      </div>
    </section>
  )
}
