'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, X, Send, RotateCcw } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const EASE = [0.4, 0, 0.2, 1] as const;

const WELCOME: Message = {
  role: 'assistant',
  content: "Hi! I'm Straveda AI. Ask me anything about our services, AI automation, or how we can help your business grow.",
};

/* ─── Manual smooth-scroll — works even when Lenis is active ─── */
function smoothScroll(el: HTMLElement, toY: number, duration = 340) {
  const from = el.scrollTop;
  const dist = toY - from;
  if (Math.abs(dist) < 2) return;
  const t0 = performance.now();
  const tick = (now: number) => {
    const p = Math.min((now - t0) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
    el.scrollTop = from + dist * eased;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export default function GroqChatbot() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  /* ── Scroll to bottom of message list ── */
  const scrollToBottom = useCallback((instant = false) => {
    // rAF ensures DOM is fully painted before we read scrollHeight
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (!el) return;
      const target = el.scrollHeight - el.clientHeight;
      if (instant || target <= 0) {
        el.scrollTop = target;
      } else {
        smoothScroll(el, target);
      }
    });
  }, []);

  /* Scroll on every new message */
  useEffect(() => {
    if (open) scrollToBottom(false);
  }, [messages, open, scrollToBottom]);

  /* Instant jump when panel opens, then focus input */
  useEffect(() => {
    if (open) {
      scrollToBottom(true);
      const t = setTimeout(() => inputRef.current?.focus(), 260);
      return () => clearTimeout(t);
    }
  }, [open, scrollToBottom]);

  /* ── Send message ── */
  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next
            .filter((m) => !(m.role === 'assistant' && m.content === WELCOME.content))
            .map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply || 'Sorry, something went wrong.' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Network error. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const reset = () => {
    setMessages([WELCOME]);
    setInput('');
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    });
  };

  /* ── Render ── */
  return (
    <>
      {/* Trigger button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.45, ease: EASE }}
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-center w-[52px] h-[52px] rounded-full cursor-pointer select-none shrink-0"
        style={{
          background: open
            ? 'linear-gradient(135deg, #cc3700 0%, #991a00 100%)'
            : 'linear-gradient(135deg, #FF4800 0%, #cc3700 100%)',
          boxShadow: '0 8px 28px rgba(255,72,0,0.45), 0 2px 8px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        aria-label={open ? 'Close AI assistant' : 'Open Straveda AI assistant'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.16 }}
            >
              <X size={20} color="#fff" />
            </motion.span>
          ) : (
            <motion.span key="cpu"
              initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.16 }}
            >
              <Cpu size={20} color="#fff" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chatpanel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.26, ease: EASE }}
            style={{
              position:      'fixed',
              bottom:        100,
              right:         24,
              width:         'min(390px, calc(100vw - 32px))',
              zIndex:        10000,
              background:    '#121212',
              border:        '1px solid rgba(255,255,255,0.09)',
              borderRadius:  16,
              boxShadow:     '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,72,0,0.10)',
              display:       'flex',
              flexDirection: 'column',
              /* Fixed pixel height so flex-1 children get a real constraint */
              height:        'min(560px, calc(100dvh - 130px))',
              maxHeight:     'calc(100dvh - 130px)',
            }}
          >

            {/* Header — fixed height */}
            <div
              className="flex items-center justify-between px-4 py-3 shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
                  style={{ background: 'rgba(255,72,0,0.15)', border: '1px solid rgba(255,72,0,0.28)' }}
                >
                  <Cpu size={15} color="#FF4800" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white leading-none">Straveda AI</p>
                  <div className="flex items-center gap-1.5 mt-[3px]">
                    <span
                      className="w-[7px] h-[7px] rounded-full inline-block"
                      style={{ background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.6)' }}
                    />
                    <span className="text-[10px] text-[#9ca3af]">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={reset}
                  className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-colors duration-200"
                  style={{ color: '#9ca3af', background: 'rgba(255,255,255,0.05)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FF4800')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RotateCcw size={13} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-colors duration-200"
                  style={{ color: '#9ca3af', background: 'rgba(255,255,255,0.05)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ff4800')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
                  title="Close chat"
                  aria-label="Close chat"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Messages — flex-1 + min-h-0 is the key combo that makes overflow-y work */}
            <div
              ref={scrollRef}
              className="flex-1 min-h-0 overflow-y-auto px-4 py-3 scrollbar-hide"
              /* data-lenis-prevent tells Lenis to not intercept wheel/touch on this element */
              data-lenis-prevent
              style={{ overscrollBehavior: 'contain' }}
            >
              <div className="flex flex-col gap-3">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className="max-w-[85%] px-3.5 py-2.5 text-[13px] leading-relaxed"
                      style={{
                        borderRadius: msg.role === 'user'
                          ? '14px 14px 4px 14px'
                          : '4px 14px 14px 14px',
                        background: msg.role === 'user'
                          ? '#FF4800'
                          : 'rgba(255,255,255,0.07)',
                        color:  '#f0f0f5',
                        border: msg.role === 'assistant'
                          ? '1px solid rgba(255,255,255,0.08)'
                          : 'none',
                      }}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div
                      className="px-4 py-3 flex gap-1.5 items-center"
                      style={{
                        background:   'rgba(255,255,255,0.07)',
                        border:       '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '4px 14px 14px 14px',
                      }}
                    >
                      {[0, 1, 2].map((n) => (
                        <motion.span
                          key={n}
                          animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: n * 0.18 }}
                          className="w-[7px] h-[7px] rounded-full inline-block"
                          style={{ background: '#9ca3af' }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Input — fixed height */}
            <div
              className="px-3 py-3 shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div
                className="flex items-center gap-2 px-3 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border:     '1px solid rgba(255,255,255,0.10)',
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask anything about Straveda…"
                  disabled={loading}
                  className="flex-1 bg-transparent py-3 text-[#f0f0f5] placeholder-[#6b7280] outline-none"
                  style={{ fontSize: 16, minHeight: 44 }}
                />
                <motion.button
                  onClick={send}
                  disabled={!input.trim() || loading}
                  whileTap={{ scale: 0.88 }}
                  className="flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer shrink-0 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: input.trim() && !loading ? '#FF4800' : 'rgba(255,255,255,0.08)',
                  }}
                  aria-label="Send message"
                >
                  <Send size={14} color="#fff" />
                </motion.button>
              </div>
              <p className="text-center text-[10px] text-[#4b5563] mt-2 select-none">
                Powered by Groq · Straveda AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
