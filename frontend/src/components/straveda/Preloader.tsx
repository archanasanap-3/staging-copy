'use client'

import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

const LOAD_DURATION = 1500 // progress fills 0→100
const EXIT_DELAY = 200 // brief hold after load
const EXIT_DURATION = 800 // curtain split

export default function Preloader() {
  const [phase, setPhase] = useState<'loading' | 'exiting' | 'done'>('loading')
  const [count, setCount] = useState(0)
  const progress = useMotionValue(0)

  // Derived motion values
  const brandClipPath = useTransform(
    progress,
    [0, 100],
    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']
  )
  const progressWidth = useTransform(progress, [0, 100], ['0%', '100%'])

  // Animate progress from 0 → 100 over LOAD_DURATION
  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: LOAD_DURATION / 1000,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate(value) {
        setCount(Math.round(value))
      },
    })
    return () => controls.stop()
  }, [progress])

  // Transition: loading → exiting
  useEffect(() => {
    const timer = setTimeout(
      () => setPhase('exiting'),
      LOAD_DURATION + EXIT_DELAY
    )
    return () => clearTimeout(timer)
  }, [])

  // Transition: exiting → done (unmount after curtain animation)
  useEffect(() => {
    if (phase === 'exiting') {
      const timer = setTimeout(() => setPhase('done'), EXIT_DURATION)
      return () => clearTimeout(timer)
    }
  }, [phase])

  if (phase === 'done') return null

  const isExiting = phase === 'exiting'

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
      {/* ── Top curtain ── */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2"
        style={{ background: '#FFFFFF' }}
        initial={{ y: 0 }}
        animate={isExiting ? { y: '-100%' } : { y: 0 }}
        transition={
          isExiting
            ? { duration: EXIT_DURATION / 1000, ease: [0.76, 0, 0.24, 1] }
            : { duration: 0 }
        }
      />

      {/* ── Bottom curtain ── */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{ background: '#FFFFFF' }}
        initial={{ y: 0 }}
        animate={isExiting ? { y: '100%' } : { y: 0 }}
        transition={
          isExiting
            ? { duration: EXIT_DURATION / 1000, ease: [0.76, 0, 0.24, 1] }
            : { duration: 0 }
        }
      />

      {/* ── Centre-line accent (appears on split) ── */}
      <motion.div
        className="absolute left-0 right-0 top-1/2 h-[1px] -translate-y-1/2"
        initial={{ scaleX: 0 }}
        animate={isExiting ? { scaleX: 1 } : { scaleX: 0 }}
        transition={
          isExiting
            ? { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
            : { duration: 0 }
        }
        style={{ backgroundColor: 'rgba(255, 72, 0, 0.35)' }}
      />

      {/* ── Content layer ── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        animate={
          isExiting
            ? { opacity: 0, scale: 0.92, y: -10 }
            : { opacity: 1, scale: 1, y: 0 }
        }
        transition={{ duration: 0.35, ease: [0.4, 0, 1, 1] }}
      >
        {/* Eyebrow text — staggered in after brand reveal begins */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.55,
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="text-[11px] md:text-xs font-medium tracking-[0.35em] uppercase mb-5 md:mb-7"
          style={{ color: 'rgba(0, 0, 0, 0.35)' }}
        >
          Enterprise IT Consulting
        </motion.p>

        {/* Brand name — clip-path wipe reveal synced with progress */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-[3rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extralight tracking-[-0.03em] whitespace-nowrap"
            style={{ clipPath: brandClipPath, color: '#1a1a2e' }}
          >
            STR<span className="text-[#FF4800]">A</span>VEDA
          </motion.h1>
        </div>

        {/* Counter — synced with progress bar */}
        <div className="mt-5 md:mt-8 flex items-baseline gap-0.5">
          <span
            className="text-[3.5rem] sm:text-7xl md:text-[6rem] font-extralight tabular-nums leading-none"
            style={{ color: '#FF4800' }}
          >
            {count}
          </span>
          <span
            className="text-lg sm:text-2xl md:text-3xl font-extralight leading-none translate-y-1 md:translate-y-2"
            style={{ color: 'rgba(255, 72, 0, 0.5)' }}
          >
            %
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-8 md:mt-12 w-[60%] max-w-[320px]">
          <div
            className="h-[2px] w-full rounded-full overflow-hidden"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.06)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ width: progressWidth, backgroundColor: '#FF4800' }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
