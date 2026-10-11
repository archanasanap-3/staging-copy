'use client';

import { useEffect } from 'react';
import { getPerfTier } from '@/lib/device';

/** Adds `perf-low` to <html> on weaker devices so CSS can switch off heavy effects. */
export default function PerfClass() {
  useEffect(() => {
    if (getPerfTier() === 'low') document.documentElement.classList.add('perf-low');
  }, []);
  return null;
}
