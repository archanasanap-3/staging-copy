'use client';

/**
 * GlobalWidgets — mounted once in the root layout.
 *
 * Fixed bottom-right stack (z-9999):
 *   [Straveda AI chatbot button + floating panel]  ← top of stack
 *   [WhatsApp float button]                        ← bottom of stack
 *
 * Survives client-side page navigation because it lives in layout.tsx,
 * outside the AnimatePresence / page-swap boundary.
 */

import WAFloat from '@/components/straveda/WAFloat';
import GroqChatbot from '@/components/straveda/GroqChatbot';

export default function GlobalWidgets() {
  return (
    <div
      style={{
        position:      'fixed',
        bottom:        24,
        right:         24,
        zIndex:        9999,
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'flex-end',
        gap:           12,
      }}
    >
      {/* AI Chatbot trigger + panel */}
      <GroqChatbot />

      {/* WhatsApp float button */}
      <WAFloat />
    </div>
  );
}
