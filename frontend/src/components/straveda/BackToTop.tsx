'use client'

/**
 * BackToTop — fixed bottom-right scroll-to-top button with SVG progress ring.
 *
 * FIX: Removed native scroll event listener that called setScrollProgress()
 * (a React state float) on every Lenis tick → 60 React re-renders/sec.
 *
 * New approach:
 * - visibility threshold read via useSyncExternalStore (only fires on flip past 300px)
 * - SVG ring progress driven by reading --scroll-progress CSS var in RAF loop
 *   and writing strokeDashoffset directly to the DOM — zero React re-renders mid-scroll
 */

import { useState, useEffect, useRef, useSyncExternalStore, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCursorStyle } from '@/lib/cursor-context'

// ── Scroll-threshold store (only wakes React when crossing 300px) ──
function subscribeToScroll(cb: () => void) {
  window.addEventListener('scroll', cb, { passive: true })
  return () => window.removeEventListener('scroll', cb)
}
function getScrollSnapshot() { return window.scrollY > 300 }
function getScrollServerSnapshot() { return false }

const radius = 18
const strokeWidth = 2
const circumference = 2 * Math.PI * radius
const svgSize = 44
const center = svgSize / 2

export default function BackToTop() {
  const [isHovered, setIsHovered] = useState(false)
  const { setCursorStyle } = useCursorStyle()
  const { resolvedTheme } = useTheme()
  const ringRef = useRef<SVGCircleElement>(null)
  const rafRef = useRef<number>(0)

  // Boolean visibility — only fires React update when crossing 300px threshold
  const visible = useSyncExternalStore(subscribeToScroll, getScrollSnapshot, getScrollServerSnapshot)

  // Drive the SVG ring directly from --scroll-progress CSS var via RAF
  // No React state → no re-renders while scrolling
  useEffect(() => {
    if (!visible) return
    let running = true

    const tick = () => {
      if (!running) return
      const progress = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--scroll-progress') || '0'
      )
      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = String(circumference * (1 - progress))
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
    }
  }, [visible])

  const scrollToTop = useCallback(() => {
    // Use Lenis-compatible instant reset — Lenis will smoothly animate from 0
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  const isDark = resolvedTheme === 'dark'
  const trackColor = isDark ? '#374151' : '#e5e7eb'

  // On hover show full ring — write directly to DOM ref
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    setCursorStyle('link')
    if (ringRef.current) {
      ringRef.current.style.strokeDashoffset = '0'
      ringRef.current.style.transition = 'stroke-dashoffset 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }, [setCursorStyle])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setCursorStyle('default')
    if (ringRef.current) {
      ringRef.current.style.transition = 'stroke-dashoffset 0.1s ease-out'
    }
  }, [setCursorStyle])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          onClick={scrollToTop}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="fixed bottom-6 right-[88px] z-40 flex items-center justify-center cursor-pointer"
          style={{ background: 'transparent', border: 'none', padding: 0 }}
          aria-label="Back to top"
        >
          {/* SVG progress ring — updated directly via ref, no React state */}
          <svg
            width={svgSize}
            height={svgSize}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className="absolute"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            {/* Track */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={trackColor}
              strokeWidth={strokeWidth}
            />
            {/* Progress arc — driven via DOM ref */}
            <circle
              ref={ringRef}
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke="#FF4800"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
                transition: 'stroke-dashoffset 0.1s ease-out',
              }}
            />
          </svg>

          {/* Inner button */}
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{
              background: '#FF4800',
              boxShadow: isHovered
                ? '0 4px 24px rgba(255, 72, 0, 0.4)'
                : '0 4px 20px rgba(255, 72, 0, 0.3)',
            }}
          >
            <ArrowUp className="h-5 w-5 text-white" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
