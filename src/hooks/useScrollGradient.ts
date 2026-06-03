'use client';

import { useSyncExternalStore, useCallback, useRef } from 'react';

/**
 * useScrollGradient — returns true when page has scrolled past `threshold`.
 *
 * FIX: Previous version called onStoreChange() on EVERY native scroll event,
 * triggering useSyncExternalStore snapshot checks on every Lenis tick even
 * when the boolean result hadn't changed — wasted JS work every frame.
 *
 * New behaviour: only notifies React when the boolean actually flips
 * (scrollY crosses the threshold boundary). Zero overhead mid-scroll.
 */
export function useScrollGradient(threshold = 100): boolean {
  const stateRef = useRef<boolean>(
    typeof window !== 'undefined' ? window.scrollY > threshold : false
  );

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const check = () => {
        const next = window.scrollY > threshold;
        // Only wake React when the boolean flips — no-op while scrolling within a section
        if (next !== stateRef.current) {
          stateRef.current = next;
          onStoreChange();
        }
      };

      window.addEventListener('scroll', check, { passive: true });
      window.addEventListener('page-change', check);
      return () => {
        window.removeEventListener('scroll', check);
        window.removeEventListener('page-change', check);
      };
    },
    [threshold],
  );

  const getSnapshot = useCallback(() => window.scrollY > threshold, [threshold]);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
