'use client';

import Script from 'next/script';

declare global {
  interface Window {
    botpress: any;
  }
}

// Botpress renders its widget asynchronously after init.
// We watch the DOM and stamp data-lenis-prevent on the container
// so Lenis stops hijacking scroll events inside the chat panel.
function preventLenisInBot() {
  const SELECTORS = [
    '#bp-web-widget',
    '#botpress-webchat',
    'iframe[src*="botpress"]',
    'iframe[title*="otpress"]',
    '[id*="botpress"]',
    '[class*="bpw-layout"]',
    '[class*="bp-widget"]',
  ].join(', ');

  function stamp(el: Element) {
    el.setAttribute('data-lenis-prevent', '');
  }

  const observer = new MutationObserver(() => {
    const el = document.querySelector(SELECTORS);
    if (el) {
      stamp(el);
      // Also stamp any scrollable children already in the tree
      el.querySelectorAll<HTMLElement>('*').forEach((child) => {
        const { overflowY } = window.getComputedStyle(child);
        if (overflowY === 'auto' || overflowY === 'scroll') stamp(child);
      });
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

export default function BotpressChat() {
  return (
    <Script
      src="https://cdn.botpress.cloud/webchat/v3.6/inject.js"
      strategy="afterInteractive"
      onLoad={() => {
        window.botpress?.init({
          configUrl: 'https://files.bpcontent.cloud/2026/05/03/11/20260503112516-EFP9K7NW.json',
          clientId:  '9a67f15c-1c98-4537-8673-50ac893e184c',
        });
        preventLenisInBot();
      }}
    />
  );
}
