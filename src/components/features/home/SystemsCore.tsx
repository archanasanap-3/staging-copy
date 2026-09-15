'use client';

import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Zap,
  Target,
  TrendingUp,
  Users,
  Shield,
  Cpu,
  ArrowRight,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────── */
/* 1. Types & Constants                                                    */
/* ─────────────────────────────────────────────────────────────────────── */

interface Pillar {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  color: string;
}

/* Cards sit on a true circle around the core: same radius, evenly spaced by
   angle (72° apart, pentagon), in fixed pixels so the spacing is identical
   on every screen instead of drifting with mismatched vw/vh units. */
const ORBIT_SIZE = 680;
const ORBIT_RADIUS = 235;

function orbitPoint(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.round(ORBIT_RADIUS * Math.cos(rad)),
    y: Math.round(ORBIT_RADIUS * Math.sin(rad)),
  };
}

const pillars: Pillar[] = [
  {
    id: '1',
    title: 'Scale Faster',
    desc: 'Break growth ceilings with automated infrastructure.',
    icon: <Zap size={20} />,
    ...orbitPoint(234),
    color: '#FF4800',
  },
  {
    id: '2',
    title: 'Automate Ops',
    desc: 'Remove human bottlenecks from recurring workflows.',
    icon: <Cpu size={20} />,
    ...orbitPoint(306),
    color: '#FF4800',
  },
  {
    id: '3',
    title: 'Reduce Manual',
    desc: 'Replace 40 hours of data entry with 40ms of code.',
    icon: <Users size={20} />,
    ...orbitPoint(162),
    color: '#FF4800',
  },
  {
  id: '4',
  title: 'Reliable Systems',
  desc: 'Build architecture that scales without breaking.',
  icon: <Shield size={20} />,
  ...orbitPoint(18),
  color: '#FF4800',
},
{
  id: '5',
  title: 'Efficiency',
  desc: 'Optimize every micro-interaction in your stack.',
  icon: <Target size={20} />,
  ...orbitPoint(90),
  color: '#FF4800',
},
];

/* ─────────────────────────────────────────────────────────────────────── */
/* 2. Sub-Components                                                       */
/* ─────────────────────────────────────────────────────────────────────── */

function ConnectionLine({
  active,
  x,
  y,
  scrollYProgress,
  range,
}: {
  active: boolean;
  x: number;
  y: number;
  scrollYProgress: MotionValue<number>;
  range: [number, number];
}) {
  const pathLength = useTransform(scrollYProgress, range, [0, 1]);
  const center = ORBIT_SIZE / 2;

  return (
    <svg
      viewBox={`0 0 ${ORBIT_SIZE} ${ORBIT_SIZE}`}
      className="absolute inset-0 m-auto pointer-events-none z-0"
      style={{ overflow: 'visible', width: ORBIT_SIZE, height: ORBIT_SIZE }}
    >
     <motion.line
  x1={center}
  y1={center}
  x2={center + x}
  y2={center + y}
  strokeWidth="1.5"
  strokeDasharray="4 4"
  initial={{
    opacity: 0.35,
    stroke: 'rgba(255, 72, 0, 0.18)',
  }}
  style={{ pathLength }}
  animate={{
    opacity: active ? 1 : 0.35,
    stroke: active
      ? 'rgba(255, 72, 0, 0.5)'
      : 'rgba(255, 72, 0, 0.18)',
  }}
  transition={{
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1],
  }}
/>
    </svg>
  );
}

function PillarCard({
  pillar,
  active,
  onHover,
  isDark,
  scrollYProgress,
  range,
}: {
  pillar: Pillar;
  active: boolean;
  onHover: (id: string | null) => void;
  isDark: boolean;
  scrollYProgress: MotionValue<number>;
  range: [number, number];
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const revealOpacity = useTransform(scrollYProgress, range, [0, 1]);
  const revealY = useTransform(scrollYProgress, range, [36, 0]);
  const revealScale = useTransform(scrollYProgress, range, [0.85, 1]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  return (
    <div
  className="absolute left-1/2 top-1/2 z-10 cursor-pointer"
  style={{
    width: '190px',
    height:'190px',
    perspective: '1000px',
    transform: `translate(
      calc(-50% + ${pillar.x}px),
      calc(-50% + ${pillar.y}px)
    )`,
  }}
>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => onHover(pillar.id)}
        onMouseLeave={() => {
          onHover(null);
          setMousePos({ x: 0, y: 0 });
        }}
        style={{
          opacity: revealOpacity,
          y: revealY,
          scale: revealScale,
        }}
      >
       <motion.div
  animate={{
    rotateY: mousePos.x * 20,
    rotateX: -mousePos.y * 20,
    scale: 1,
    boxShadow: active
      ? '0 20px 40px rgba(255, 72, 0, 0.15), 0 0 0 1px rgba(255, 72, 0, 0.3)'
      : '0 10px 30px rgba(0, 0, 0, 0.05)',
  }}
  style={{
    width: '190px',
    height: '190px',
    minHeight: '190px',
    maxHeight: '190px',
    boxSizing: 'border-box',
  }}
  className={`relative overflow-hidden rounded-2xl p-5 transition-colors duration-500 ${
    isDark
      ? 'bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]'
      : 'bg-white/80 backdrop-blur-xl border border-black/[0.05]'
  }`}
>
        <div
          className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${
            isDark ? 'bg-[#FF4800]/15' : 'bg-[#FF4800]/10'
          }`}
        >
          <div className="text-[#FF4800]">{pillar.icon}</div>
        </div>

        <h4
          className={`text-lg font-bold mb-2 tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {pillar.title}
        </h4>

        <p
          className={`text-xs leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {pillar.desc}
        </p>

        <div
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at center, ${pillar.color}10 0%, transparent 70%)`,
          }}
        />
      </motion.div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* 3. Main Section                                                         */
/* ─────────────────────────────────────────────────────────────────────── */

export default function SystemsCoreSection({
  isDark,
}: {
  isDark: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePillar, setActivePillar] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 45]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 1, 0.8]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const smoothOpacity = useSpring(opacity, {
    stiffness: 100,
    damping: 30,
  });

  const smoothScale = useSpring(scale, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <section
      ref={containerRef}
      className="
        relative
        flex
        min-h-screen
        flex-col
        items-center
        justify-start
        overflow-hidden
        py-10
        pb-6
        md:pt-10
        md:pb-6
        lg:pt-12
        lg:pb-8
      "
      style={{
        background: isDark ? '#0a0a14' : '#e8e8f0',
      }}
    >
      {/* HEADER */}

      <div
        className="
          relative
          z-20
          mb-4
          lg:mb-6
          w-full
          max-w-4xl
          px-6
          text-center
        "
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="
            mb-6
            text-[11px]
            font-bold
            uppercase
            tracking-[0.3em]
            text-[#FF4800]
          "
        >
          Systems Core
        </motion.p>

        <h2
          className="
            mb-8
            text-4xl
            font-bold
            uppercase
            tracking-tighter
            leading-[0.9]
            md:text-7xl
            dark:text-white
          "
        >
          {'One Goal: Systems That Run Without You'
            .split(' ')
            .map((word, i) => (
              <motion.span
                key={i}
                initial={{
                  opacity: 0,
                  filter: 'blur(10px)',
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: 0,
                }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-[0.2em]"
              >
                {word}
              </motion.span>
            ))}
        </h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          className="h-px w-24 bg-[#FF4800]/40 mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="
            mx-auto
            max-w-2xl
            text-base
            leading-relaxed
            text-slate-500
            dark:text-slate-400
            md:text-xl
          "
        >
          We build integrated AI-powered architecture that transforms chaotic
          operations into high-velocity engines. Zero manual friction. Infinite
          scalability.
        </motion.p>
      </div>

      {/* INTERACTIVE ORBIT */}

      <motion.div
  style={{
    opacity: smoothOpacity,
    scale: smoothScale,
    width: ORBIT_SIZE,
    height: ORBIT_SIZE,
  }}
  className="
    relative
    z-10
    hidden
    shrink-0
    items-center
    justify-center
    lg:flex
    -mt-10
  "
>
        {/* Background */}

        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at center, #FF480010 0%, transparent 70%)',
            }}
          />
        </div>

        {/* CENTRAL CORE */}

        <motion.div
          style={{ rotate }}
          className="relative z-10 flex items-center justify-center"
        >
          <div className="absolute w-[320px] h-[320px] rounded-full border border-[#FF4800]/10 animate-[spin_20s_linear_infinite]" />

          <div className="absolute w-[400px] h-[400px] rounded-full border border-[#FF4800]/5 animate-[spin_30s_linear_infinite_reverse]" />

          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center overflow-hidden shadow-[0_0_80px_rgba(255,72,0,0.2)]">
            <div className="absolute inset-0 bg-[#FF4800] opacity-10 blur-xl" />

            <div className="absolute inset-0 bg-gradient-to-br from-[#FF4800] to-[#2B2358] opacity-20" />

            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-4 rounded-full bg-[#FF4800]/20 blur-md"
            />

            <Zap
              size={36}
              className="text-[#FF4800] relative z-10"
            />
          </div>
        </motion.div>

        {/* CONNECTION LINES */}

        {pillars.map((p, i) => (
          <ConnectionLine
            key={p.id}
            active={activePillar === p.id}
            x={p.x}
            y={p.y}
            scrollYProgress={scrollYProgress}
            range={[0.22 + i * 0.05, 0.37 + i * 0.05]}
          />
        ))}

        {/* CARDS */}

        {pillars.map((p, i) => (
          <PillarCard
  key={p.id}
  pillar={p}
  active={activePillar === p.id}
  onHover={setActivePillar}
  isDark={isDark}
  scrollYProgress={scrollYProgress}
  range={[0.25, 0.4]}
/>
        ))}
      </motion.div>

      {/* MOBILE / TABLET */}

      <div
        className="
          lg:hidden
          relative
          z-20
          w-full
          max-w-lg
          px-6
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-4
        "
      >
        {pillars.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: '-60px',
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: parseInt(p.id) * 0.08,
            }}
            className={`relative h-[190px] w-full overflow-hidden rounded-2xl p-5 transition-colors duration-500 ${
  isDark
    ? 'bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]'
    : 'bg-white/80 backdrop-blur-xl border border-black/[0.05]'
}`}
            style={{
              boxShadow: isDark
                ? '0 10px 30px rgba(0,0,0,0.3)'
                : '0 10px 30px rgba(0,0,0,0.05)',
            }}
          >
            <div
              className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${
                isDark
                  ? 'bg-[#FF4800]/15'
                  : 'bg-[#FF4800]/10'
              }`}
            >
              <div className="text-[#FF4800]">{p.icon}</div>
            </div>

            <h4
              className={`text-lg font-bold mb-2 tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {p.title}
            </h4>

            <p
              className={`text-xs leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        className="
          relative
          z-20
          mt-3
          lg:mt-4
          flex
          flex-col
          items-center
        "
      >
        <button
          onClick={() => {
            window.location.href = '/contact';
          }}
          className="
            group
            relative
            flex
            items-center
            gap-3
            rounded-2xl
            bg-[#FF4800]
            px-4
            py-2
            text-xs
            font-bold
            uppercase
            tracking-widest
            text-white
            transition-all
            hover:scale-100
            hover:shadow-[0_0_30px_rgba(255,72,0,0.4)]
          "
        >
          Build Your Core System

          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </motion.div>
    </section>
  );
}
