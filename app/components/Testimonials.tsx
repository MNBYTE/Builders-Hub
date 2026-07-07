'use client'

import { useState, useEffect, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useInView,
} from 'framer-motion'
import { TESTIMONIALS } from '../data/constants'

const fadeUp = (delay = 0) => ({
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(6px)',
  },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  },
})

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  })

  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5500)

    return () => clearInterval(timer)
  }, [])

  const cur = TESTIMONIALS[active]

  return (
    <section
      ref={ref}
      className="py-20 sm:py-28 bg-subtle overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <motion.div
          variants={fadeUp(0.08)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="text-center mb-14"
        >
          <span className="font-mono text-[10px] font-bold tracking-label uppercase text-blue">
            What clients say
          </span>
        </motion.div>

        <div className="max-w-[760px] mx-auto text-center">

          <motion.p
            variants={fadeUp(0.18)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="font-display font-black text-blue leading-none select-none mb-8"
            style={{ fontSize: '3.25rem' }}
          >
            &ldquo;
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{
                opacity: 0,
                y: 22,
                filter: 'blur(5px)',
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
              }}
              exit={{
                opacity: 0,
                y: -16,
                filter: 'blur(4px)',
              }}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p
                className="font-display font-medium tracking-tighter text-body leading-[1.7] mb-10"
                style={{
                  fontSize: 'clamp(1.1rem,2.5vw,1.45rem)',
                }}
              >
                {cur.quote}
              </p>

              <div className="flex flex-col items-center">

                <motion.div
                  initial={{
                    scale: 0.8,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-14 h-14 rounded-full bg-blue text-white font-display font-bold text-sm flex items-center justify-center mb-3 shadow-lg"
                >
                  {cur.avatar}
                </motion.div>

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: 0.15,
                  }}
                  className="font-display font-bold text-[15px] text-body"
                >
                  {cur.author}
                </motion.p>

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: 0.22,
                  }}
                  className="font-body text-sm text-muted"
                >
                  {cur.role}
                </motion.p>

              </div>

            </motion.div>
          </AnimatePresence>

          <motion.div
            variants={fadeUp(0.35)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="flex justify-center gap-2 mt-12"
            role="tablist"
            aria-label="Testimonials"
          >
            {TESTIMONIALS.map((_, i) => (
              <motion.button
                key={i}
                whileHover={{
                  scale: 1.2,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                transition={{
                  duration: 0.25,
                }}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className="h-2 rounded-full cursor-pointer"
                style={{
                  width: i === active ? 26 : 8,
                  background:
                    i === active
                      ? '#1A5FFF'
                      : '#D1D5DB',
                }}
              />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}