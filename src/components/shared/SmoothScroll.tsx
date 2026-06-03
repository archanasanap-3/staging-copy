'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      // Snappier feel
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

    // FIX: Disable lag smoothing. When using GSAP ticker to drive Lenis, 
    // lagSmoothing MUST be 0 to prevent feeding fake/altered timestamps to Lenis.
    gsap.ticker.lagSmoothing(0)

    // FIX: Removed the lenis.on('scroll') listener that wrote to document.documentElement
    // Writing CSS variables to the root 60 times a second caused severe Layout Thrashing.

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
