'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * KeyboardHint — floating pill that appears when Tab is pressed,
 * auto-hides after 3 seconds of no keyboard activity.
 */
export default function KeyboardHint() {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    setVisible(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(false), 3000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show hint on Tab, or any navigation key
      if (['Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
        show();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 select-none"
          role="status"
          aria-live="polite"
        >
          <div
            className="rounded-full px-5 py-2.5 text-center"
            style={{
              background: 'rgba(30, 26, 63, 0.95)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              color: '#A1A1A1',
              fontSize: '11px',
              letterSpacing: '0.02em',
            }}
          >
            <span className="hidden sm:inline">
              &larr; &rarr; Navigate pages&nbsp;&nbsp;|&nbsp;&nbsp;1-5 Jump to page&nbsp;&nbsp;|&nbsp;&nbsp;Esc Close
            </span>
            <span className="sm:hidden">
              &larr; &rarr; Navigate&nbsp;&nbsp;|&nbsp;&nbsp;Esc Close
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
