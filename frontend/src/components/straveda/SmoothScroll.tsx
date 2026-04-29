'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      // Snappier feel — reduced from 1.05 to 0.8
      duration: 0.8,
      // Quart ease-out: fast initial response, graceful slow finish
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      // Standard wheel sensitivity
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      smoothWheel: true,
      syncTouch: true,
      infinite: false,
    })

    // Sync Lenis scroll position into GSAP ScrollTrigger each tick
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis via GSAP ticker (single unified RAF loop)
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)

    // FIX 3: Re-enable lag smoothing (was 0 — caused scroll snaps on heavy frames).
    // 1000ms tolerance: GSAP catches up gradually instead of snapping.
    gsap.ticker.lagSmoothing(1000, 16)

    // Throttled scroll value updates to reduce layout thrashing
    let lastUpdate = 0;
    lenis.on('scroll', ({
      scroll,
      limit,
      velocity,
      direction,
      progress,
    }: {
      scroll: number
      limit: number
      velocity: number
      direction: number
      progress: number
    }) => {
      const now = performance.now();
      if (now - lastUpdate < 16) return; // Limit to ~60fps
      lastUpdate = now;

      const root = document.documentElement
      root.style.setProperty('--scroll-y', String(Math.round(scroll)))
      root.style.setProperty('--scroll-progress', progress.toFixed(3))
      root.style.setProperty('--scroll-velocity', Math.abs(velocity).toFixed(2))
    })

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
