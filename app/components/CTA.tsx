'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const container = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.985,
    filter: 'blur(6px)',
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      when: 'beforeChildren',
      staggerChildren: 0.12,
    },
  },
}

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 26,
    filter: 'blur(6px)',
  },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const button = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
    filter: 'blur(4px)',
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
}

export default function CTA() {
  const ref = useRef(null)

  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  })

  return (
    <section
      ref={ref}
      id="contact"
      className="px-4 sm:px-8 pb-16 bg-base overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="relative bg-ink rounded-2xl px-8 sm:px-16 py-16 sm:py-20 overflow-hidden"
        >
          {/* Blue Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={
              inView
                ? {
                    opacity: 0.08,
                    scale: 1,
                  }
                : {}
            }
            transition={{
              duration: 1.2,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 500,
              height: 500,
              top: -180,
              right: -120,
              background: '#1A5FFF',
            }}
          />

          {/* Blue Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              inView
                ? {
                    opacity: 0.05,
                    scale: 1,
                  }
                : {}
            }
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 360,
              height: 360,
              bottom: -150,
              right: 60,
              background: '#1A5FFF',
            }}
          />

          {/* Gold Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              inView
                ? {
                    opacity: 0.06,
                    scale: 1,
                  }
                : {}
            }
            transition={{
              duration: 1.2,
              delay: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 200,
              height: 200,
              top: 40,
              left: -60,
              background: '#F5C52C',
            }}
          />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            {/* Left */}
            <div>
              <motion.span
                variants={fadeUp}
                className="font-mono text-[10px] font-bold tracking-label uppercase text-white/25 block mb-4"
              >
                Ready to build?
              </motion.span>

              <motion.h2
                variants={fadeUp}
                className="font-display font-black tracking-tightest text-white leading-[0.97] mb-4"
                style={{
                  fontSize: 'clamp(2.2rem,5vw,3.8rem)',
                }}
              >
                Your next product
                <br />
                starts here.
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="font-body text-[15px] text-white/50 leading-relaxed max-w-[420px]"
              >
                Tell us what you&apos;re building. We&apos;ll tell you exactly how we can
                help, no pitch deck, lengthy proposals, or unnecessary meetings.
              </motion.p>
            </div>

            {/* Right */}
            <div className="flex flex-col items-start lg:items-end gap-4 flex-shrink-0">
              <motion.a
                variants={button}
                href="/contact"
                className="inline-flex items-center gap-2 bg-blue text-white font-body font-bold text-[15px] px-10 py-5 rounded-pill hover:bg-blue-dark transition-all duration-200 shadow-blue hover:shadow-blue-lift hover:-translate-y-0.5"
              >
                Start a project →
              </motion.a>

              <motion.span
                variants={fadeUp}
                className="font-mono text-[11px] text-white/25 tracking-wide"
              >
                buildershub@gmail.com
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}