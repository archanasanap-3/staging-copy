'use client';

import WAFloat from '@/components/features/common/WAFloat';
import BotpressCustomChat from '@/components/features/common/BotpressCustomChat';

export default function GlobalWidgets() {
  return (
    <div style={{
      position:      'fixed',
      bottom:        24,
      right:         24,
      zIndex:        9999,
      display:       'flex',
      flexDirection: 'column',
      alignItems:    'flex-end',
      gap:           12,
    }}>
      {/* Custom chat UI — all API calls go browser → Botpress Cloud, no server code */}
      <BotpressCustomChat />

      {/* WhatsApp float */}
      <WAFloat />
    </div>
  );
}
