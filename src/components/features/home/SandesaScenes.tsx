'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, CheckCheck, FileText, Link2 } from 'lucide-react';

export type SceneKey = 'campaigns' | 'templates' | 'bots' | 'agent' | 'insights';

const STAGE_W = 600;
const STAGE_H = 520;

/* ───────────────────── reusable mock pieces ───────────────────── */

function Phone({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="relative h-[500px] w-[250px] rounded-[40px] bg-[#14110c] p-[8px] shadow-[0_30px_70px_rgba(20,17,12,0.35)]">
      <div className="absolute left-1/2 top-[8px] z-20 h-[18px] w-[80px] -translate-x-1/2 rounded-b-2xl bg-[#14110c]" />
      <div className="flex h-full flex-col overflow-hidden rounded-[32px] bg-[#EFE7DD]">
        <div className="flex items-center gap-2.5 bg-[#075E54] px-3.5 pb-2.5 pt-7 text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-[13px] font-bold">
            {name.charAt(0)}
          </span>
          <div className="leading-tight">
            <p className="flex items-center gap-1 text-[12.5px] font-semibold">
              {name}
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#25D366]">
                <Check size={8} strokeWidth={4} />
              </span>
            </p>
            <p className="text-[10px] text-white/70">Business account</p>
          </div>
        </div>
        <div className="relative flex-1 space-y-2 overflow-hidden px-2.5 py-3">{children}</div>
        <div className="flex items-center gap-2 bg-[#F0F0F0] px-2.5 py-2">
          <div className="h-7 flex-1 rounded-full bg-white px-3 text-[10.5px] leading-7 text-neutral-400">Message</div>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366]">
            <ArrowUpRight size={14} className="text-white" />
          </span>
        </div>
      </div>
    </div>
  );
}

function Bubble({
  side = 'in',
  delay = 0,
  time,
  children,
}: {
  side?: 'in' | 'out';
  delay?: number;
  time?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${side === 'out' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[88%] rounded-xl px-2.5 py-1.5 text-[11px] leading-snug text-neutral-800 shadow-sm ${
          side === 'out' ? 'rounded-tr-none bg-[#D9FDD3]' : 'rounded-tl-none bg-white'
        }`}
      >
        {children}
        {time && (
          <span className="mt-0.5 flex items-center justify-end gap-0.5 text-[9px] text-neutral-400">
            {time}
            {side === 'out' && <CheckCheck size={11} className="text-[#34B7F1]" />}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function Float({ className, delay = 0, children }: { className: string; delay?: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5 + delay * 2, repeat: Infinity, ease: 'easeInOut' }}
        className="rounded-2xl border border-black/[0.06] bg-white p-3.5 shadow-[0_18px_45px_rgba(20,17,12,0.14)] dark:border-white/10 dark:bg-[#181824]"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function Pill({ tone, children }: { tone: 'green' | 'amber' | 'blue'; children: React.ReactNode }) {
  const map = {
    green: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400',
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400',
  } as const;
  return <span className={`rounded-full px-2 py-0.5 text-[9.5px] font-bold ${map[tone]}`}>{children}</span>;
}

/* Bold headline text printed straight onto the orange backdrop */
function Hero({ big, caption, size = 'text-[68px]' }: { big: string; caption: string; size?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-[34px] top-[52px] w-[256px] text-white"
    >
      <p className={`${size} font-extrabold leading-[0.95] tracking-[-0.04em]`}>{big}</p>
      <p className="mt-2.5 text-[15px] font-semibold leading-snug text-white/90">{caption}</p>
    </motion.div>
  );
}

/* Frosted card that sits on the orange backdrop */
function Glass({ className, delay = 0, children }: { className: string; delay?: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute left-[34px] w-[256px] rounded-2xl border border-white/30 bg-white/[0.16] p-3.5 text-white shadow-[0_12px_30px_rgba(120,30,0,0.18)] backdrop-blur-md ${className}`}
    >
      {children}
    </motion.div>
  );
}

const glassLabel = 'text-[10px] font-bold uppercase tracking-[0.14em] text-white/70';

const label = 'text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400';

/* ───────────────────────── scenes ───────────────────────── */

function CampaignScene() {
  const stats: [string, number][] = [
    ['Sent', 100],
    ['Delivered', 98],
    ['Read', 71],
  ];
  return (
    <>
      <div className="absolute right-[34px] top-[10px]">
        <Phone name="Your Brand">
          <Bubble delay={0.25} time="10:30">
            <div className="-mx-1 -mt-0.5 mb-1.5 flex h-[92px] flex-col justify-end rounded-lg bg-gradient-to-br from-[#FF4800] via-[#FF7A33] to-[#FFB066] p-2.5 text-white">
              <p className="text-[9px] font-bold uppercase tracking-widest opacity-80">Festive sale</p>
              <p className="text-[19px] font-extrabold leading-none">Up to 50% off</p>
            </div>
            <p>Hi Aarav 👋 your exclusive festive offer is live. Grab it before Sunday!</p>
            <div className="mt-1.5 flex items-center justify-center gap-1 border-t border-neutral-100 pt-1.5 text-[11px] font-semibold text-[#0A7CFF]">
              <Link2 size={11} /> Shop now
            </div>
          </Bubble>
          <Bubble side="out" delay={1.1} time="10:31">Sending my size now 🙌</Bubble>
        </Phone>
      </div>

      <Hero big="98%" caption="of messages delivered, and 71% read" />

      <Glass className="top-[190px]" delay={0.45}>
        <div className="mb-2.5 flex items-center justify-between">
          <p className="text-[13px] font-bold">Festive Sale</p>
          <span className="rounded-full bg-white px-2 py-0.5 text-[9.5px] font-bold text-emerald-600">Completed</span>
        </div>
        {stats.map(([n, v], i) => (
          <div key={n} className="mb-2 last:mb-0">
            <div className="mb-1 flex justify-between text-[10.5px] text-white/80">
              <span>{n}</span>
              <span className="font-bold text-white">{v}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/25">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${v}%` }}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-white"
              />
            </div>
          </div>
        ))}
      </Glass>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute left-[34px] top-[372px] flex flex-wrap gap-2"
      >
        {['contacts.csv imported', 'Sat · 10:30 AM'].map((c) => (
          <span key={c} className="rounded-full bg-white/20 px-3 py-1.5 text-[10.5px] font-semibold text-white backdrop-blur-sm">
            {c}
          </span>
        ))}
      </motion.div>
    </>
  );
}

function TemplateScene() {
  const rows: [string, string, string, 'green' | 'amber', string][] = [
    ['festive_offer', 'Hi {{1}}, our festive offer…', 'MARKETING', 'green', 'Approved'],
    ['order_confirmed', 'Your order {{1}} is confirmed…', 'UTILITY', 'green', 'Approved'],
    ['cart_reminder', 'You left something behind…', 'MARKETING', 'amber', 'Pending'],
  ];
  return (
    <>
      <div className="absolute right-[34px] top-[10px]">
        <Phone name="Your Brand">
          <Bubble delay={0.25} time="2:14">
            <p className="mb-1 text-[11.5px] font-bold">Order confirmed ✅</p>
            <p>Hi Neha, your order #1042 is confirmed and will arrive on 14 Oct.</p>
            <div className="mt-1.5 flex items-center justify-center gap-1 border-t border-neutral-100 pt-1.5 text-[11px] font-semibold text-[#0A7CFF]">
              <Link2 size={11} /> Track order
            </div>
          </Bubble>
        </Phone>
      </div>

      <Hero big="1 click" caption="from design to Meta approval" size="text-[58px]" />

      <Glass className="top-[170px]" delay={0.45}>
        <p className={`${glassLabel} mb-2`}>Templates</p>
        <div className="space-y-1.5">
          {rows.map(([name, , cat, , st], i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.15 }}
              className="flex items-center justify-between rounded-xl bg-white/15 px-2.5 py-2"
            >
              <div className="leading-tight">
                <p className="text-[11.5px] font-bold">{name}</p>
                <p className="text-[9px] font-semibold uppercase tracking-wider text-white/70">{cat}</p>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[9.5px] font-bold ${
                  st === 'Approved' ? 'bg-white text-emerald-600' : 'bg-white/25 text-white'
                }`}
              >
                {st}
              </span>
            </motion.div>
          ))}
        </div>
      </Glass>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="absolute left-[34px] top-[394px] flex items-center gap-2 text-[12px] font-semibold text-white/90"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#FF4800]">
          <Check size={12} strokeWidth={3.5} />
        </span>
        Preview matches WhatsApp exactly
      </motion.p>
    </>
  );
}

function BotScene() {
  const nodes = [
    { t: '01 · Customer Message', v: '“I need information about your services.”' },
    { t: '02 · Automatic Reply', v: '“Of course! Choose a service to learn more.”' },
    { t: '03 · Next Action', v: 'Share details or connect to team' },
  ];
  return (
    <>
      <div className="absolute right-[34px] top-[10px]">
        <Phone name="Sandesa Assistant">
          <Bubble side="out" delay={0.2} time="9:02">I need information about your services.</Bubble>
          <Bubble delay={0.9} time="9:02">
            <p>Of course! Choose a service to learn more.</p>
            <div className="mt-1.5 space-y-1 border-t border-neutral-100 pt-1.5 text-center text-[10.5px] font-semibold text-[#0A7CFF]">
              <p>Explore services</p>
              <p>Connect to our team</p>
            </div>
          </Bubble>
          <Bubble side="out" delay={1.8} time="9:03">Connect to our team</Bubble>
          <Bubble delay={2.5} time="9:03">Connecting you to our team…</Bubble>
        </Phone>
      </div>

      <Hero big="24/7" caption="Every question. A smarter response." size="text-[58px]" />

      <Glass className="top-[200px]" delay={0.45}>
        <div className="mb-2 flex items-center justify-between">
          <p className={glassLabel}>WhatsApp Chat Flow</p>
          <span className="rounded-full bg-white px-2 py-0.5 text-[9.5px] font-bold text-emerald-600">● Active</span>
        </div>
        {nodes.map((n, i) => (
          <React.Fragment key={n.t}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.3 }}
              className="rounded-xl bg-white/15 px-2.5 py-1.5"
            >
              <p className="text-[9px] font-bold uppercase tracking-wider text-white/70">{n.t}</p>
              <p className="text-[11.5px] font-semibold">{n.v}</p>
            </motion.div>
            {i < nodes.length - 1 && <div className="mx-auto h-2.5 w-px bg-white/50" />}
          </React.Fragment>
        ))}
      </Glass>
    </>
  );
}

function AgentScene() {
  return (
    <>
      <div className="absolute right-[34px] top-[10px]">
        <Phone name="AI Customer Agent">
          <Bubble side="out" delay={0.2} time="10:15">What are your business hours?</Bubble>
          <Bubble delay={1.0} time="10:15">
            <p>Our business hours are Monday to Saturday, 9 AM to 6 PM. How else can I help you?</p>
            <p className="mt-1 flex items-center gap-1 text-[9.5px] text-neutral-400">
              <FileText size={10} /> company-faq.pdf
            </p>
          </Bubble>
          <Bubble side="out" delay={2.1} time="10:16">Do you offer customer support?</Bubble>
          <Bubble delay={2.8} time="10:16">Yes! Our team is available to assist you anytime during working hours.</Bubble>
        </Phone>
      </div>

      <Hero big="AI Agent" caption="Your business knowledge. Ready to answer." size="text-[48px]" />

      <Glass className="top-[200px]" delay={0.45}>
        <div className="mb-2 flex items-center justify-between">
          <p className={glassLabel}>Business knowledge</p>
          <span className="rounded-full bg-white px-2 py-0.5 text-[9.5px] font-bold text-emerald-600">Ready</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl bg-white/15 p-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#FF4800]">
            <FileText size={15} />
          </span>
          <div className="leading-tight">
            <p className="text-[11.5px] font-bold">company-faq.pdf</p>
            <p className="text-[10px] text-white/75">Business knowledge document</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11.5px]">
          <span className="font-semibold">Tone</span>
          <span className="rounded-md bg-white/20 px-2 py-0.5 font-semibold">Friendly</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11.5px]">
          <span className="font-semibold">Status</span>
          <span className="flex h-5 w-9 items-center justify-end rounded-full bg-white px-0.5">
            <span className="h-4 w-4 rounded-full bg-[#FF4800]" />
          </span>
        </div>
      </Glass>
    </>
  );
}

function InsightsScene() {
  const bars = [38, 62, 48, 80, 66, 92, 74];
  const kpis: [string, string][] = [
    ['Customer enquiries', '128'],
    ['Conversations', '76'],
    ['Messages sent', '540'],
    ['Delivery rate', '96%'],
  ];
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[24px] right-[24px] top-[44px] rounded-3xl border border-black/[0.06] bg-white p-5 shadow-[0_28px_70px_rgba(20,17,12,0.16)] dark:border-white/10 dark:bg-[#181824]"
      >
        <div className="flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3 dark:bg-emerald-500/10">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <div className="leading-tight">
              <p className="text-[13px] font-bold text-neutral-900 dark:text-white">WhatsApp Connection</p>
              <p className="text-[10.5px] text-neutral-500 dark:text-neutral-400">Monitor your account connection</p>
            </div>
          </div>
          <span className="rounded-lg bg-white px-2.5 py-1 text-[10.5px] font-semibold text-emerald-600 shadow-sm dark:bg-white/10 dark:text-emerald-400">
            Connected
          </span>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2.5">
          {kpis.map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="rounded-xl border border-neutral-100 p-2.5 dark:border-white/10"
            >
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400">{k}</p>
              <p className="mt-0.5 text-[18px] font-extrabold text-[#FF4800]">{v}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-3 rounded-2xl border border-neutral-100 p-3.5 dark:border-white/10">
          <div className="mb-2.5 flex items-center justify-between">
            <p className="text-[12px] font-bold text-neutral-900 dark:text-white">Campaign performance</p>
            <div className="flex gap-2.5 text-[9.5px] text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-1"><i className="h-1.5 w-1.5 rounded-full bg-blue-500" />Sent</span>
              <span className="flex items-center gap-1"><i className="h-1.5 w-1.5 rounded-full bg-amber-400" />Delivered</span>
              <span className="flex items-center gap-1"><i className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Read</span>
            </div>
          </div>
          <div className="flex h-[110px] items-end justify-between gap-2.5">
            {bars.map((h, i) => (
              <div key={i} className="flex h-full flex-1 items-end gap-[3px]">
                {[h, h * 0.86, h * 0.62].map((v, j) => (
                  <motion.div
                    key={j}
                    initial={{ height: 0 }}
                    animate={{ height: `${v}%` }}
                    transition={{ delay: 0.5 + i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex-1 rounded-t-[3px] ${['bg-blue-500', 'bg-amber-400', 'bg-emerald-500'][j]}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          {['Create campaign', 'Add lead', 'Open inbox'].map((q) => (
            <span
              key={q}
              className="rounded-lg bg-neutral-100 px-2.5 py-1.5 text-[10.5px] font-semibold text-neutral-700 dark:bg-white/10 dark:text-neutral-200"
            >
              {q}
            </span>
          ))}
        </div>
      </motion.div>

      <Float className="right-[6px] top-[0px] w-[150px]" delay={0.7}>
        <p className={label}>Delivery rate</p>
        <p className="text-[22px] font-extrabold leading-tight text-neutral-900 dark:text-white">96%</p>
        <p className="text-[9px] text-neutral-400">Sandesa AI metrics</p>
      </Float>
    </>
  );
}

const scenes: Record<SceneKey, React.ReactNode> = {
  campaigns: <CampaignScene />,
  templates: <TemplateScene />,
  bots: <BotScene />,
  agent: <AgentScene />,
  insights: <InsightsScene />,
};

/* ─────────── scaled stage: fills its parent and shrinks the 600×520 design to fit ─────────── */

export default function SandesaScene({ scene }: { scene: SceneKey }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(Math.min(el.clientWidth / STAGE_W, el.clientHeight / STAGE_H));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#FF7A33] via-[#FF4800] to-[#D93B00]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.28) 1px, transparent 1px)', backgroundSize: '22px 22px' }}
      />
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#FFB066]/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-white/20 blur-3xl" />

      {scale > 0 && (
        <div
          className="absolute left-1/2 top-1/2 origin-center"
          style={{
            width: STAGE_W,
            height: STAGE_H,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        >
          {scenes[scene]}
        </div>
      )}
    </div>
  );
}
