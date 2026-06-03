'use client';

/**
 * BotpressCustomChat — fully static, zero server code.
 *
 * Why polling instead of SSE:
 *   The Botpress /listen endpoint returns Content-Type: application/json
 *   (not text/event-stream), so browsers buffer the entire body before
 *   delivering it — making real-time streaming impossible via fetch.
 *   Polling /conversations/:id/messages every 2 s is reliable and simple.
 *
 * All calls: browser → Botpress Cloud REST API
 *   POST /users               → create anonymous session
 *   POST /conversations       → create conversation
 *   POST /messages            → send user message
 *   GET  /conversations/:id/messages  → poll for bot replies
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, RotateCcw, MessageCircle } from 'lucide-react';

const API    = 'https://chat.botpress.cloud/9a67f15c-1c98-4537-8673-50ac893e184c';
const K_KEY  = 'bp_user_key';
const K_UID  = 'bp_user_id';
const K_CONV = 'bp_conv_id';

// ── API helpers ───────────────────────────────────────────────────────────────
async function bpFetch(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...opts.headers },
  });
  if (!res.ok) throw new Error(`${path} → ${res.status}`);
  return res.json();
}

async function initSession(): Promise<{ userKey: string; userId: string }> {
  const savedKey = localStorage.getItem(K_KEY);
  const savedUid = localStorage.getItem(K_UID);
  if (savedKey && savedUid) return { userKey: savedKey, userId: savedUid };

  // Fresh start — clear any stale conversation so it won't mismatch
  localStorage.removeItem(K_CONV);
  const data = await bpFetch('/users', { method: 'POST', body: '{}' });
  localStorage.setItem(K_KEY, data.key);
  localStorage.setItem(K_UID, data.user.id);
  return { userKey: data.key, userId: data.user.id };
}

async function initConversation(userKey: string): Promise<string> {
  const saved = localStorage.getItem(K_CONV);
  if (saved) return saved;
  const data = await bpFetch('/conversations', {
    method: 'POST',
    headers: { 'x-user-key': userKey },
    body: '{}',
  });
  localStorage.setItem(K_CONV, data.conversation.id);
  return data.conversation.id as string;
}

async function sendText(userKey: string, convId: string, text: string) {
  await bpFetch('/messages', {
    method: 'POST',
    headers: { 'x-user-key': userKey },
    body: JSON.stringify({ conversationId: convId, payload: { type: 'text', text } }),
  });
}

async function fetchMessages(userKey: string, convId: string) {
  const data = await bpFetch(
    `/conversations/${encodeURIComponent(convId)}/messages`,
    { headers: { 'x-user-key': userKey } },
  );
  return (data.messages ?? []) as Array<{
    id: string; userId: string; createdAt: string;
    payload: Record<string, unknown>;
  }>;
}

function extractText(payload: Record<string, unknown>): string {
  if (payload.type === 'text')     return String(payload.text     ?? '');
  if (payload.type === 'markdown') return String(payload.markdown ?? '');
  if (payload.type === 'choice')   return String(payload.text     ?? '');
  return '';
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface Msg { id: string; role: 'user' | 'bot'; text: string }

const WELCOME: Msg = {
  id: 'welcome', role: 'bot',
  text: "Hi! I'm Straveda AI. Ask me anything about our services, pricing, or how we can help automate your business.",
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function BotpressCustomChat() {
  const [open,      setOpen]      = useState(false);
  const [msgs,      setMsgs]      = useState<Msg[]>([WELCOME]);
  const [input,     setInput]     = useState('');
  const [loading,   setLoading]   = useState(false);
  const [connected, setConnected] = useState(false);
  const [error,     setError]     = useState('');

  const userKeyRef  = useRef('');
  const userIdRef   = useRef('');
  const convIdRef   = useRef('');
  const seenIdsRef  = useRef<Set<string>>(new Set(['welcome']));
  const pollRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const initedRef   = useRef(false);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const inputRef    = useRef<HTMLTextAreaElement>(null);

  // ── Poll for new bot messages ─────────────────────────────────────────────
  const poll = useCallback(async () => {
    if (!userKeyRef.current || !convIdRef.current) return;
    try {
      const messages = await fetchMessages(userKeyRef.current, convIdRef.current);
      // Messages arrive newest-first — reverse for chronological processing
      let gotNew = false;
      for (const m of [...messages].reverse()) {
        if (seenIdsRef.current.has(m.id)) continue;
        seenIdsRef.current.add(m.id);
        if (m.userId === userIdRef.current) continue; // skip user's own echo
        const text = extractText(m.payload);
        if (!text) continue;
        setMsgs(prev => [...prev, { id: m.id, role: 'bot', text }]);
        gotNew = true;
      }
      if (gotNew) setLoading(false);
    } catch { /* silently retry next tick */ }
  }, []);

  function startPolling() {
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(poll, 2000);
  }

  // ── Lazy init — fires once on first open ─────────────────────────────────
  useEffect(() => {
    if (!open || initedRef.current) return;
    initedRef.current = true;

    (async () => {
      try {
        const { userKey, userId } = await initSession();
        userKeyRef.current = userKey;
        userIdRef.current  = userId;

        const convId = await initConversation(userKey);
        convIdRef.current = convId;

        // Seed seenIds with existing messages so we don't replay history
        try {
          const existing = await fetchMessages(userKey, convId);
          existing.forEach(m => seenIdsRef.current.add(m.id));
        } catch { /* ok if no history */ }

        setConnected(true);
        startPolling();
      } catch (e) {
        console.error('[BotpressChat] init:', e);
        setError('Could not connect. Refresh to retry.');
      }
    })();
  }, [open, poll]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => () => {
    if (pollRef.current) clearInterval(pollRef.current);
  }, []);

  // ── Auto-scroll ───────────────────────────────────────────────────────────
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, loading]);

  // ── Focus input ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  // ── Send ──────────────────────────────────────────────────────────────────
  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading || !userKeyRef.current || !convIdRef.current) return;
    setInput('');
    setMsgs(prev => [...prev, { id: `u-${Date.now()}`, role: 'user', text }]);
    setLoading(true);
    try {
      await sendText(userKeyRef.current, convIdRef.current, text);
    } catch (e) {
      console.error('[BotpressChat] send:', e);
      setLoading(false);
    }
  }, [input, loading]);

  // ── Reset ─────────────────────────────────────────────────────────────────
  const reset = useCallback(async () => {
    if (!userKeyRef.current) return;
    localStorage.removeItem(K_CONV);
    try {
      const convId = await initConversation(userKeyRef.current);
      convIdRef.current = convId;
      seenIdsRef.current = new Set(['welcome']);
    } catch (e) { console.error('[BotpressChat] reset:', e); }
    setMsgs([WELCOME]);
    setLoading(false);
    setInput('');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: 'relative' }}>

      <AnimatePresence>
        {open && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', bottom: 64, right: 0,
              width: 'min(390px, calc(100vw - 32px))', height: 560,
              borderRadius: 20, background: 'rgba(10,10,20,0.97)',
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg,#FF4800,#cc3700)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <MessageCircle size={15} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: '#f0f0f5', fontSize: 13, fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
                  Straveda AI
                </p>
                <p style={{ fontSize: 10, margin: 0, color: error ? '#f87171' : connected ? '#4ade80' : '#94a3b8' }}>
                  {error ? '● Error' : connected ? '● Online' : '● Connecting…'}
                </p>
              </div>
              <button onClick={reset} title="New conversation"
                style={{ background:'none', border:'none', cursor:'pointer', padding:6, color:'#64748b', lineHeight:0 }}>
                <RotateCcw size={14} />
              </button>
              <button onClick={() => setOpen(false)} title="Close"
                style={{ background:'none', border:'none', cursor:'pointer', padding:6, color:'#64748b', lineHeight:0 }}>
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} data-lenis-prevent
              style={{
                flex: 1, overflowY: 'auto', padding: '14px 14px 8px',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}
            >
              {error && (
                <p style={{ color:'#f87171', fontSize:12, textAlign:'center', padding:'8px 0' }}>{error}</p>
              )}
              {msgs.map(m => (
                <motion.div key={m.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{ display:'flex', justifyContent: m.role==='user' ? 'flex-end' : 'flex-start' }}
                >
                  <div style={{
                    maxWidth: '82%', padding: '9px 13px',
                    borderRadius: m.role==='user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                    background: m.role==='user' ? '#FF4800' : 'rgba(255,255,255,0.09)',
                    color: '#f0f0f5', fontSize: 13, lineHeight: 1.65,
                    whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                  }}>
                    {m.text}
                  </div>
                </motion.div>
              ))}

              <AnimatePresence>
                {loading && (
                  <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                    style={{ display:'flex', gap:5, padding:'4px 2px' }}>
                    {[0,1,2].map(i => (
                      <motion.div key={i}
                        animate={{ y:[0,-5,0] }}
                        transition={{ duration:0.6, repeat:Infinity, delay: i*0.15 }}
                        style={{ width:7, height:7, borderRadius:'50%', background:'#FF4800' }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div style={{
              padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', gap: 8, alignItems: 'flex-end', flexShrink: 0,
            }}>
              <textarea ref={inputRef} value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder={connected ? 'Ask anything…' : 'Connecting…'}
                disabled={loading || !connected}
                rows={1}
                style={{
                  flex:1, resize:'none',
                  background:'rgba(255,255,255,0.07)',
                  border:'1px solid rgba(255,255,255,0.12)',
                  borderRadius:12, color:'#f0f0f5', fontSize:13,
                  padding:'9px 12px', outline:'none', fontFamily:'inherit',
                  lineHeight:1.5, maxHeight:100, overflowY:'auto',
                }}
              />
              <motion.button onClick={send}
                disabled={!input.trim() || loading || !connected}
                whileTap={{ scale: 0.92 }}
                style={{
                  width:38, height:38, borderRadius:12, flexShrink:0,
                  background: input.trim() && !loading && connected ? '#FF4800' : 'rgba(255,255,255,0.08)',
                  border:'none',
                  cursor: input.trim() && !loading && connected ? 'pointer' : 'default',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  transition:'background 0.2s',
                }}
              >
                <Send size={15} color={input.trim() && !loading && connected ? 'white' : '#475569'} />
              </motion.button>
            </div>

            <p style={{ textAlign:'center', color:'#334155', fontSize:10, padding:'4px 0 8px', margin:0 }}>
              Powered by Botpress · Straveda Tech
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger */}
      <motion.button onClick={() => setOpen(o => !o)}
        whileHover={{ scale:1.06 }} whileTap={{ scale:0.94 }}
        style={{
          width:52, height:52, borderRadius:'50%',
          background:'linear-gradient(135deg,#FF4800,#cc3700)',
          border:'none', cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 8px 24px rgba(255,72,0,0.42)',
        }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x"  initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}}  transition={{duration:0.15}} style={{lineHeight:0,display:'flex'}}><X size={20} color="white"/></motion.span>
            : <motion.span key="ch" initial={{rotate:90,opacity:0}}  animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:0.15}} style={{lineHeight:0,display:'flex'}}><MessageCircle size={20} color="white"/></motion.span>
          }
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
