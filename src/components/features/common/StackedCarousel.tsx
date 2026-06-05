'use client';

import * as React from "react"
import { motion, PanInfo } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

export interface Testimonial {
  quote: string;
  impact: string;
  company: string;
  role: string;
}

interface StackedCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Testimonial[]
  showArrows?: boolean
  showDots?: boolean
  autoScrollInterval?: number
}

export const StackedCarousel = React.forwardRef<HTMLDivElement, StackedCarouselProps>(
  ({ className, items, showArrows = true, showDots = true, autoScrollInterval, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [exitX, setExitX] = React.useState<number>(0)
    const [isHovered, setIsHovered] = React.useState(false)

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (Math.abs(info.offset.x) > 100) {
        setExitX(info.offset.x)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % items.length)
          setExitX(0)
        }, 200)
      }
    }

    const nextCard = React.useCallback(() => {
      setExitX(-200);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length)
        setExitX(0)
      }, 200)
    }, [items.length]);

    const prevCard = () => {
      setExitX(200);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
        setExitX(0)
      }, 200)
    };

    React.useEffect(() => {
      if (!autoScrollInterval || isHovered) return;
      const timer = setInterval(() => {
        nextCard();
      }, autoScrollInterval);
      return () => clearInterval(timer);
    }, [autoScrollInterval, nextCard, currentIndex, isHovered]);

    return (
      <div 
        ref={ref} 
        className={`w-full flex flex-col items-center justify-center ${className || ''}`} 
        {...props}
      >
        {/* Adjusted width and min-height to accommodate longer text content safely */}
        <div 
          className="relative w-full max-w-[340px] md:max-w-[450px] h-[360px] md:h-[320px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {items.map((item, index) => {
            const isCurrentCard = index === currentIndex
            const isPrevCard = index === (currentIndex + 1) % items.length
            const isNextCard = index === (currentIndex + 2) % items.length

            if (!isCurrentCard && !isPrevCard && !isNextCard) return null

            return (
              <motion.div
                key={index}
                className={`absolute w-full h-full rounded-2xl cursor-grab active:cursor-grabbing bg-white dark:bg-[#15151a] flex flex-col overflow-hidden border border-black/5 dark:border-white/5 shadow-lg`}
                style={{
                  zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1,
                }}
                drag={isCurrentCard ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                initial={{
                  scale: 0.95,
                  opacity: 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                  rotate: isCurrentCard ? 0 : isPrevCard ? -2 : -4,
                }}
                animate={{
                  scale: isCurrentCard ? 1 : 0.95,
                  opacity: isCurrentCard ? 1 : isPrevCard ? 0.6 : 0.3,
                  x: isCurrentCard ? exitX : 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                  rotate: isCurrentCard ? exitX / 20 : isPrevCard ? -2 : -4,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {/* Arrow Navigation inside card (visible only on current card) */}
                {showArrows && isCurrentCard && (
                  <div className="absolute top-4 left-0 right-0 flex justify-between px-6 z-10 pointer-events-none">
                    <button onClick={prevCard} className="pointer-events-auto text-[#9ca3af] hover:text-[#FF4800] transition-colors p-2" aria-label="Previous">
                      <ArrowLeft size={20} />
                    </button>
                    <button onClick={nextCard} className="pointer-events-auto text-[#9ca3af] hover:text-[#FF4800] transition-colors p-2" aria-label="Next">
                      <ArrowRight size={20} />
                    </button>
                  </div>
                )}

                {/* Inner Card Content matching original Results card */}
                <div className="flex flex-col p-6 md:p-8 h-full pt-20 pointer-events-none">
                  <p className="text-[#475569] dark:text-[#9ca3af] text-[15px] md:text-lg italic leading-relaxed mb-6 flex-grow select-none text-center px-2">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="border-t border-black/5 dark:border-white/5 pt-5 mt-auto select-none text-center">
                    <p className="text-[#FF4800] text-[10px] font-bold uppercase tracking-widest mb-1">{item.impact}</p>
                    <p className="text-[#1a1a2e] dark:text-white text-[11px] md:text-xs font-medium uppercase tracking-widest opacity-60">
                      — {item.role}, {item.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {/* Pagination Dots below stack */}
        {showDots && (
          <div className="flex justify-center gap-2 mt-10">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-[#FF4800]"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)
StackedCarousel.displayName = "StackedCarousel"
