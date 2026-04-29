'use client';

import gsap from 'gsap';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Service Project Data                                                */
/* ------------------------------------------------------------------ */

interface Project {
  color: string;
  src: string;
  title: string;
  subtitle: string;
}

const projects: Project[] = [
  {
    color: '#1a1a2e',
    src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=500&fit=crop&q=80',
    title: 'AI & Business Automation',
    subtitle: 'Workflows · Agents · 24/7 Operations',
  },
  {
    color: '#2B2358',
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=500&fit=crop&q=80',
    title: 'Custom Software & AI Systems',
    subtitle: 'CRMs · Dashboards · AI Platforms',
  },
  {
    color: '#3d3475',
    src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=500&fit=crop&q=80',
    title: 'AI Strategy & Model Integration',
    subtitle: 'LLMs · RAG · Predictive Analytics',
  },
  {
    color: '#0f0f23',
    src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=500&fit=crop&q=80',
    title: 'Web Development & Digital Experiences',
    subtitle: 'Next.js · 3D · Conversion-Optimized',
  },
];

/* ------------------------------------------------------------------ */
/*  Scale Animation Variants                                           */
/* ------------------------------------------------------------------ */

const scaleAnimation = {
  closed: {
    scale: 0,
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
    x: '-50%',
    y: '-50%',
  },
  enter: {
    scale: 1,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
    x: '-50%',
    y: '-50%',
  },
  initial: { scale: 0, x: '-50%', y: '-50%' },
};

/* ------------------------------------------------------------------ */
/*  Project Row Component                                              */
/* ------------------------------------------------------------------ */

interface ProjectRowProps {
  index: number;
  title: string;
  subtitle: string;
  setModal: React.Dispatch<React.SetStateAction<{ active: boolean; index: number }>>;
}

function Project({ index, title, subtitle, setModal }: ProjectRowProps) {
  return (
    <div
      className="group flex w-full cursor-pointer items-center justify-between border-t border-[rgb(201,201,201)] px-6 py-10 transition-all duration-300 last:border-b hover:opacity-50 md:px-16 lg:px-20"
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
    >
      <div className="flex flex-col gap-1">
        <h2 className="m-0 font-normal text-3xl tracking-tight text-[#1a1a2e] transition-all duration-300 group-hover:translate-x-2.5 sm:text-5xl md:text-6xl">
          {title}
        </h2>
        <span className="text-sm font-medium text-[#9ca3af] transition-all duration-300 group-hover:translate-x-2.5 md:text-base">
          {subtitle}
        </span>
      </div>
      <div className="flex items-center gap-2 transition-all duration-300 group-hover:translate-x-2.5">
        <span className="hidden text-sm font-light text-[#6b7280] md:block">
          Explore
        </span>
        <ArrowRight
          size={18}
          className="text-[#FF4800] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Modal Component (GSAP mouse-following + Framer Motion scale)       */
/* ------------------------------------------------------------------ */

interface ModalProps {
  modal: { active: boolean; index: number };
  projects: Project[];
  containerRef: React.RefObject<HTMLDivElement | null>;
}

function Modal({ modal, projects, containerRef }: ModalProps) {
  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Move Container
    const xMoveContainer = gsap.quickTo(modalContainer.current, 'left', {
      duration: 0.8,
      ease: 'power3',
    });
    const yMoveContainer = gsap.quickTo(modalContainer.current, 'top', {
      duration: 0.8,
      ease: 'power3',
    });
    // Move cursor
    const xMoveCursor = gsap.quickTo(cursor.current, 'left', {
      duration: 0.5,
      ease: 'power3',
    });
    const yMoveCursor = gsap.quickTo(cursor.current, 'top', {
      duration: 0.5,
      ease: 'power3',
    });
    // Move cursor label
    const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, 'left', {
      duration: 0.45,
      ease: 'power3',
    });
    const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, 'top', {
      duration: 0.45,
      ease: 'power3',
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      // Desktop: offset modal image to the right of the cursor
      const isDesktop = window.innerWidth >= 768;
      const containerOffsetX = isDesktop ? 250 : 0;

      xMoveContainer(relativeX + containerOffsetX);
      yMoveContainer(relativeY);
      xMoveCursor(relativeX);
      yMoveCursor(relativeY);
      xMoveCursorLabel(relativeX);
      yMoveCursorLabel(relativeY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [containerRef]);

  return (
    <>
      <motion.div
        animate={active ? 'enter' : 'closed'}
        className="pointer-events-none absolute z-50 flex h-[245px] w-[280px] items-center justify-center overflow-hidden rounded-xl shadow-2xl md:h-[61vw] md:max-h-[350px] md:w-[70vw] md:max-w-[420px]"
        initial="initial"
        ref={modalContainer}
        variants={scaleAnimation}
      >
        <div
          className="absolute h-full w-full transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ top: `${index * -100}%` }}
        >
          {projects.map((project) => (
            <div
              className="flex h-full w-full items-center justify-center"
              key={project.title}
              style={{ backgroundColor: project.color }}
            >
              <Image
                alt={project.title}
                className="h-auto w-auto object-cover"
                height={500}
                src={project.src}
                width={400}
              />
            </div>
          ))}
        </div>
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
      </motion.div>
      <motion.div
        animate={active ? 'enter' : 'closed'}
        className="pointer-events-none absolute z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#FF4800] font-light text-sm text-white md:h-20 md:w-20"
        initial="initial"
        ref={cursor}
        variants={scaleAnimation}
      >
        <ArrowRight size={18} className="text-white" />
      </motion.div>
      <motion.div
        animate={active ? 'enter' : 'closed'}
        className="pointer-events-none absolute z-50 flex h-16 w-16 items-center justify-center rounded-full bg-transparent font-light text-sm text-white md:h-20 md:w-20"
        initial="initial"
        ref={cursorLabel}
        variants={scaleAnimation}
      >
        <span className="text-xs font-semibold uppercase tracking-wider md:text-sm">View</span>
      </motion.div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Export — Animated Hover Modal Section                         */
/* ------------------------------------------------------------------ */

export function Component() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative overflow-hidden bg-[#f9f9f9] py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-0">
        {/* Section header */}
        <div className="mb-10 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-2 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FF4800]">
              Our Services
            </span>
            <h2 className="text-4xl font-semibold tracking-tight text-[#1a1a2e] md:text-6xl lg:text-7xl">
              Services.
            </h2>
          </div>
          <p className="max-w-md text-sm font-medium text-[#6b7280] md:text-base">
            Our solutions are tailored to meet the unique challenges of modern
            enterprises, providing speed, reliability, and flexibility at
            every stage of the journey.
          </p>
        </div>

        {/* Project rows + Modal */}
        <div ref={containerRef} className="relative flex min-h-[50vh] items-center justify-center md:min-h-screen">
          <div className="flex w-full flex-col items-center justify-center">
            {projects.map((project, index) => (
              <Project
                index={index}
                key={project.title}
                setModal={setModal}
                subtitle={project.subtitle}
                title={project.title}
              />
            ))}
          </div>
          <Modal containerRef={containerRef} modal={modal} projects={projects} />
        </div>
      </div>
    </section>
  );
}

export default Component;
