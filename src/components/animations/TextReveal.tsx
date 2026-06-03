'use client'

import { motion } from 'framer-motion'

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
}

export default function TextReveal({ children, className = '', delay = 0, stagger = 0.04 }: TextRevealProps) {
  const words = children.split(' ')

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.5,
              delay: delay + i * stagger,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
