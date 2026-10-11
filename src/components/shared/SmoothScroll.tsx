'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { getPerfTier } from '@/lib/device'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Native scrolling is smoother than JS-driven smoothing on touch and low-power devices
    if (getPerfTier() === 'low') return

    // Light, responsive smoothing: a high lerp follows the wheel closely instead of trailing behind it
    const lenis = new Lenis({
      lerp: 0.14,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
      infinite: false,
    })

    let rafId = 0
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
