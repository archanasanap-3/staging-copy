'use client';

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Zap,
  Target,
  TrendingUp,
  Shield,
  Cpu,
  ArrowRight,
} from 'lucide-react';

interface Props {
  isDark: boolean;
  onNavigate: (page: string) => void;
}

/* ================= CONNECTION LINE ================= */

const ConnectionLine = ({
  x1,
  y1,
  x2,
  y2,
  visible,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  visible: boolean;
}) => {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#FF4800"
      strokeWidth="1.5"
      strokeDasharray="6 6"
      initial={false}
      animate={{
        opacity: visible ? 0.35 : 0,
        pathLength: visible ? 1 : 0,
      }}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
    />
  );
};

/* ================= PILLAR CARD ================= */

const PillarCard = ({
  icon: Icon,
  title,
  description,
  index,
  isDark,
  onHover,
  onLeave,
}: {
  icon: any;
  title: string;
  description: string;
  index: number;
  isDark: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!cardRef.current) return;

    const rect =
      cardRef.current.getBoundingClientRect();

    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePosition({
      x: 0,
      y: 0,
    });

    onLeave();
  };

  const cardBackground = isDark
    ? 'rgba(20,20,32,0.75)'
    : 'rgba(255,255,255,0.9)';

  const cardBorder = isDark
    ? 'rgba(255,255,255,0.08)'
    : 'rgba(15,23,42,0.1)';

  const textColor = isDark
    ? '#f5f5f7'
    : '#111827';

  const mutedColor = isDark
    ? '#9ca3af'
    : '#6b7280';

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
      }}
      whileHover={{
        y: -8,
      }}
      className="group relative overflow-hidden rounded-2xl p-6"
      style={{
        background: cardBackground,
        border: `1px solid ${cardBorder}`,
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Mouse Glow */}

      <motion.div
        className="pointer-events-none absolute h-40 w-40 rounded-full"
        style={{
          left: mousePosition.x - 80,
          top: mousePosition.y - 80,
          background:
            'radial-gradient(circle, rgba(255,72,0,0.15), transparent 70%)',
        }}
      />

      {/* Icon */}

      <div
        className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
        style={{
          background: 'rgba(255,72,0,0.1)',
          border:
            '1px solid rgba(255,72,0,0.2)',
        }}
      >
        <Icon
          className="h-5 w-5"
          style={{
            color: '#FF4800',
          }}
        />
      </div>

      {/* Title */}

      <h3
        className="relative z-10 mb-2 text-lg font-bold"
        style={{
          color: textColor,
        }}
      >
        {title}
      </h3>

      {/* Description */}

      <p
        className="relative z-10 text-sm leading-relaxed"
        style={{
          color: mutedColor,
        }}
      >
        {description}
      </p>

      {/* Number */}

      <div
        className="absolute right-5 top-5 text-xs font-bold"
        style={{
          color: isDark
            ? 'rgba(255,255,255,0.15)'
            : 'rgba(15,23,42,0.1)',
        }}
      >
        0{index + 1}
      </div>
    </motion.div>
  );
};

/* ================= MAIN SECTION ================= */

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

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.9, 1, 1, 0.9]
  );

  const smoothOpacity = useSpring(opacity, {
    stiffness: 100,
    damping: 30,
  });

  const smoothScale = useSpring(scale, {
    stiffness: 100,
    damping: 30,
  });

  /* ================= PILLARS ================= */

  const pillars = [
    {
      icon: TrendingUp,
      title: 'Scale Faster',
      description:
        'Build systems that grow with your business without adding operational complexity.',
    },
    {
      icon: Zap,
      title: 'Automate Ops',
      description:
        'Replace repetitive workflows with intelligent automation that runs continuously.',
    },
    {
      icon: Target,
      title: 'Reduce Manual',
      description:
        'Eliminate unnecessary human intervention and keep your team focused on growth.',
    },
    {
      icon: Shield,
      title: 'Reliable Systems',
      description:
        'Create resilient infrastructure designed to perform consistently at scale.',
    },
    {
      icon: Cpu,
      title: 'Efficiency',
      description:
        'Connect your technology, data and processes into one high-performance system.',
    },
  ];

  const background = isDark
    ? '#0a0a14'
    : '#e8e8f0';

  const textMuted = isDark
    ? '#9ca3af'
    : '#64748b';

  return (
    <section
      ref={containerRef}
      className="
        relative
        flex
        min-h-[120vh]
        flex-col
        items-center
        justify-start
        overflow-hidden
        py-16
        md:py-20
        lg:py-32
      "
      style={{
        background,
      }}
    >
      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-1/2
            top-20
            h-[500px]
            w-[500px]
            -translate-x-1/2
            rounded-full
            blur-3xl
          "
          style={{
            background: isDark
              ? 'rgba(255,72,0,0.06)'
              : 'rgba(255,72,0,0.05)',
          }}
        />
      </div>

      {/* ================= HEADER ================= */}

      <div
        className="
          relative
          z-20
          mb-12
          w-full
          max-w-5xl
          px-6
          text-center
          lg:mb-24
        "
      >
        {/* Label */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-5 flex items-center justify-center gap-3"
        >
          <span
            className="h-px w-10"
            style={{
              background: '#FF4800',
            }}
          />

          <span
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.25em]
            "
            style={{
              color: '#FF4800',
            }}
          >
            SYSTEMS CORE
          </span>

          <span
            className="h-px w-10"
            style={{
              background: '#FF4800',
            }}
          />
        </motion.div>

        {/* ================= MAIN HEADING ================= */}

        <h2
          className="
            mx-auto
            mb-8
            max-w-5xl
            text-center
            text-4xl
            font-bold
            uppercase
            leading-[0.95]
            tracking-tighter
            md:text-7xl
            dark:text-white
          "
        >
          {'One Goal: Systems That Run Without You.'
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
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mr-[0.2em] inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h2>

        {/* Orange Line */}

        <motion.div
          initial={{
            width: 0,
            opacity: 0,
          }}
          whileInView={{
            width: 80,
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.5,
          }}
          className="
            mx-auto
            mb-7
            h-1
            rounded-full
          "
          style={{
            background: '#FF4800',
          }}
        />

        {/* Description */}

        <motion.p
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
            delay: 0.6,
          }}
          className="
            mx-auto
            max-w-2xl
            text-center
            text-base
            leading-relaxed
            md:text-lg
          "
          style={{
            color: textMuted,
          }}
        >
          We build integrated AI-powered architecture
          that transforms chaotic operations into
          high-velocity engines. Zero manual friction.
          Infinite scalability.
        </motion.p>
      </div>

      {/* ================= DESKTOP ORBIT ================= */}

      <motion.div
        style={{
          opacity: smoothOpacity,
          scale: smoothScale,
        }}
        className="
          relative
          z-10
          hidden
          h-[600px]
          w-full
          items-center
          justify-center
          lg:flex
        "
      >

        {/* ================= SVG CONNECTIONS ================= */}

        <svg
          className="
            pointer-events-none
            absolute
            inset-0
            h-full
            w-full
          "
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Top */}
          <ConnectionLine
            x1={600}
            y1={212}
            x2={600}
            y2={80}
            visible={hoveredCard === 0}
          />

          {/* Top Right */}
          <ConnectionLine
            x1={677}
            y1={265}
            x2={930}
            y2={150}
            visible={hoveredCard === 2}
          />

          {/* Bottom Right */}
          <ConnectionLine
            x1={677}
            y1={335}
            x2={930}
            y2={450}
            visible={hoveredCard === 4}
          />

          {/* Bottom Left */}
          <ConnectionLine
            x1={523}
            y1={335}
            x2={270}
            y2={450}
            visible={hoveredCard === 3}
          />

          {/* Top Left */}
          <ConnectionLine
            x1={523}
            y1={265}
            x2={270}
            y2={150}
            visible={hoveredCard === 1}
          />
        </svg>

        {/* ================= CENTER AI ================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          className="
            relative
            z-20
            flex
            h-44
            w-44
            items-center
            justify-center
            rounded-full
          "
          style={{
            background: isDark
              ? 'rgba(20,20,32,0.95)'
              : 'rgba(255,255,255,0.95)',
            border:
              '2px solid rgba(255,72,0,0.5)',
            boxShadow:
              '0 0 80px rgba(255,72,0,0.15)',
          }}
        >
          <div className="text-center">
            <Cpu
              className="mx-auto mb-3 h-8 w-8"
              style={{
                color: '#FF4800',
              }}
            />

            <div
              className="text-sm font-black uppercase tracking-widest"
              style={{
                color: isDark
                  ? '#ffffff'
                  : '#111827',
              }}
            >
              AI
            </div>

            <div
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
              "
              style={{
                color: textMuted,
              }}
            >
              ENGINE
            </div>
          </div>
        </motion.div>

        {/* ================= DESKTOP CARDS ================= */}

        {/* Top */}

        <div
          className="
            absolute
            left-1/2
            top-0
            w-64
            -translate-x-1/2
          "
        >
          <PillarCard
            {...pillars[0]}
            index={0}
            isDark={isDark}
            onHover={() => setHoveredCard(0)}
            onLeave={() => setHoveredCard(null)}
          />
        </div>

        {/* Top Left */}

        <div
          className="
            absolute
            left-[10%]
            top-[15%]
            w-64
          "
        >
          <PillarCard
            {...pillars[1]}
            index={1}
            isDark={isDark}
            onHover={() => setHoveredCard(1)}
            onLeave={() => setHoveredCard(null)}
          />
        </div>

        {/* Top Right */}

        <div
          className="
            absolute
            right-[10%]
            top-[15%]
            w-64
          "
        >
          <PillarCard
            {...pillars[2]}
            index={2}
            isDark={isDark}
            onHover={() => setHoveredCard(2)}
            onLeave={() => setHoveredCard(null)}
          />
        </div>

        {/* Bottom Left */}

        <div
          className="
            absolute
            bottom-[8%]
            left-[10%]
            w-64
          "
        >
          <PillarCard
            {...pillars[3]}
            index={3}
            isDark={isDark}
            onHover={() => setHoveredCard(3)}
            onLeave={() => setHoveredCard(null)}
          />
        </div>

        {/* Bottom Right */}

        <div
          className="
            absolute
            bottom-[8%]
            right-[10%]
            w-64
          "
        >
          <PillarCard
            {...pillars[4]}
            index={4}
            isDark={isDark}
            onHover={() => setHoveredCard(4)}
            onLeave={() => setHoveredCard(null)}
          />
        </div>
      </motion.div>

      {/* ================= MOBILE / TABLET ================= */}

      <div
        className="
          relative
          z-20
          grid
          w-full
          max-w-lg
          grid-cols-1
          gap-4
          px-6
          sm:grid-cols-2
          lg:hidden
        "
      >
        {pillars.map((pillar, index) => (
          <PillarCard
            key={pillar.title}
            {...pillar}
            index={index}
            isDark={isDark}
            onHover={() => {}}
            onLeave={() => {}}
          />
        ))}
      </div>

      {/* ================= CTA ================= */}

      <motion.div
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
        }}
        transition={{
          duration: 0.7,
          delay: 0.3,
        }}
        className="
          relative
          z-20
          mt-12
          flex
          flex-col
          items-center
        "
      >
       <button
  onClick={() => {
  window.location.href = '/contact';
}}
  className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#FF4800] text-white font-bold uppercase tracking-widest text-xs transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,72,0,0.4)]"
>
  Build Your Core System
  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
</button>
      </motion.div>
    </section>
  );
}