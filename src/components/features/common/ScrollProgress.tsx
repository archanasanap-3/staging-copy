'use client'

/**
 * ScrollProgress — Custom scroll progress bar at the top of the page.
 *
 * FIX: Switched from reading an expensive DOM computed style variable
 * to using native window.scrollY. This completely eliminates "Layout Thrashing"
 * and fixes the stuttering that occurred when scrolling the page.
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

      // Calculate progress directly from scroll position (zero layout thrashing)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const raw = maxScroll > 0 ? window.scrollY / maxScroll : 0;

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
