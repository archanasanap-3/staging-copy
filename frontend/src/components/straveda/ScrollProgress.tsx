'use client'

/**
 * ScrollProgress — reads Lenis's --scroll-progress CSS custom property
 * directly via RAF instead of using Framer Motion's useScroll() + useSpring().
 *
 * FIX: Removed useScroll() + two useSpring() chains that were racing Lenis's
 * GSAP ticker on every frame. Now driven by the same CSS var that Lenis writes,
 * so it's always in sync with no double-subscription or 1-frame lag.
 */

import { useEffect, useRef, useState } from 'react'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [pageKey, setPageKey] = useState(0)
  const rafRef = useRef<number>(0)
  // Track previous progress for lerp smoothing (avoids spring lag)
  const prevProgress = useRef(0)

  useEffect(() => {
    const handleReset = () => setPageKey((k) => k + 1)
    window.addEventListener('page-change', handleReset)
    return () => window.removeEventListener('page-change', handleReset)
  }, [])

  useEffect(() => {
    let running = true
    prevProgress.current = 0

    const tick = () => {
      if (!running) return

      // Read Lenis's scroll progress (0–1) directly — no React state, no re-render
      const raw = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--scroll-progress') || '0'
      )

      // Gentle lerp so the bar doesn't snap on page load
      const p = prevProgress.current + (raw - prevProgress.current) * 0.18
      prevProgress.current = p

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p})`
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = String(Math.min(p * 4, 0.7))
      }
      if (wrapRef.current) {
        // Slide from 64px to 0px once user scrolls even slightly
        const top = p > 0.005 ? 0 : 64
        wrapRef.current.style.top = `${top}px`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
    }
  }, [pageKey])

  return (
    <div
      key={pageKey}
      ref={wrapRef}
      className="fixed left-0 right-0 z-[60] h-[3px] pointer-events-none"
      style={{ top: '64px', transition: 'top 0.3s ease' }}
    >
      {/* Progress fill */}
      <div
        ref={barRef}
        className="h-full w-full origin-left"
        style={{
          background: 'linear-gradient(90deg, #FF4800, #FF6B33)',
          boxShadow: '0 0 8px rgba(255, 72, 0, 0.5), 0 0 20px rgba(255, 72, 0, 0.2)',
          transform: 'scaleX(0)',
        }}
      />
      {/* Ambient glow beneath */}
      <div
        ref={glowRef}
        className="absolute -bottom-[2px] left-0 right-0 h-[7px] rounded-full"
        style={{
          background: 'linear-gradient(90deg, #FF4800, #FF6B33)',
          opacity: 0,
          filter: 'blur(6px)',
        }}
      />
    </div>
  )
}
