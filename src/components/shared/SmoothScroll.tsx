'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      // Smooth natural scroll feel
      duration: 1.2,
      // Smooth cubic-bezier style easing curve (no abrupt stops or jerky jumps)
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Standard wheel sensitivity
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      smoothWheel: true,
      syncTouch: false,
      infinite: false,
    })

    // Sync Lenis scroll position into GSAP ScrollTrigger each tick
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis with standard continuous requestAnimationFrame loop (zero lag or timing drift)
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [])

  return <>{children}</>
}
