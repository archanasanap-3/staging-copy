'use client';

import { ReactNode, useCallback, useRef, useSyncExternalStore } from 'react';
import { Cursor as PremiumCursor } from '@/components/ui/inverted-cursor';
import { CursorProvider } from '@/lib/cursor-context';

interface CustomCursorProps {
  children: ReactNode;
}

/**
 * Straveda-branded premium custom cursor wrapper.
 *
 * - Only renders the custom cursor on fine-pointer (desktop) devices.
 *   Touch/touchpad devices get children only — no cursor overlay.
 * - Uses the `useSyncExternalStore` pattern for SSR-safe pointer detection.
 * - Ultra-smooth dual-element cursor: outer ring + inner dot.
 * - Lerp-interpolated movement via requestAnimationFrame (60fps+).
 * - GPU-accelerated via translate3d — zero layout thrashing.
 * - Velocity-based stretch/skew on fast mouse movement.
 * - Cursor modes: default (inverted), nav (solid small), link (inverted large),
 *   text (tall thin outline for text selection).
 * - Hides the native cursor on desktop via CSS (see globals.css).
 */
export default function CustomCursor({ children }: CustomCursorProps) {
  // ─── Detect fine-pointer device via external store (SSR-safe) ──────
  const pointerMq = useRef<MediaQueryList | null>(null);

  const subscribeToPointer = useCallback((onStoreChange: () => void) => {
    if (!pointerMq.current) {
      pointerMq.current = window.matchMedia('(pointer: fine)');
    }
    pointerMq.current.addEventListener('change', onStoreChange);
    return () => {
      pointerMq.current?.removeEventListener('change', onStoreChange);
    };
  }, []);

  const getPointerSnapshot = useCallback(() => {
    if (!pointerMq.current) {
      pointerMq.current = window.matchMedia('(pointer: fine)');
    }
    return pointerMq.current.matches;
  }, []);

  const getPointerServerSnapshot = useCallback(() => false, []);

  const isDesktop = useSyncExternalStore(
    subscribeToPointer,
    getPointerSnapshot,
    getPointerServerSnapshot,
  );

  // ─── Mobile / touch: render children only, no cursor ─────────────
  if (!isDesktop) {
    return <>{children}</>;
  }

  // ─── Desktop: cursor context + premium cursor (fixed, no container) ─
  return (
    <CursorProvider>
      <PremiumCursor />
      {children}
    </CursorProvider>
  );
}
