'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { STEPS } from '../data/constants'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  show:   {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  },
})

const cardVariant = (delay = 0) => ({
  hidden: { opacity: 0, y: 56, filter: 'blur(12px)', scale: 0.97 },
  show:   {
    opacity: 1, y: 0, filter: 'blur(0px)', scale: 1,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  },
})

export default function Process() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-base overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="mb-14">
          <motion.span
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="font-mono text-[10px] font-bold tracking-label uppercase text-blue block mb-4"
          >
            How we work
          </motion.span>

          <motion.h2
            variants={fadeUp(0.22)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="font-display font-black tracking-tightest text-body leading-[1.02]"
            style={{ fontSize: 'clamp(2rem,5vw,3.2rem)' }}
          >
            A process built on
            <br />
            <span className="text-blue">clarity</span> and{' '}
            <span className="relative inline-block">
              craft.
              <svg
                viewBox="0 0 160 10"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute -bottom-1 left-0 w-full"
              >
                <path d="M2 7 C40 2, 100 9, 158 4" stroke="#F5C52C" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp(0.36)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="font-body text-muted text-[15px] leading-relaxed mt-5 max-w-[480px]"
          >
            Every project runs through the same battle-tested three phases. We design and code digital products in a competitive development lifecycle. Fully customized, highly responsive, and scale-ready codebases.
          </motion.p>
        </div>

        {/* ── Step cards ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              variants={cardVariant(0.45 + i * 0.18)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className={`relative rounded-xl p-8 sm:p-10 overflow-hidden flex flex-col ${
                step.highlighted
                  ? 'bg-blue'
                  : 'bg-surface border border-edge'
              }`}
            >
              {/* Connector line (desktop only, between cards) */}
              {i < STEPS.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.85 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'left' }}
                  className="hidden md:block absolute top-[4.5rem] -right-[8px] w-4 h-px bg-edge z-10"
                />
              )}

              {/* Watermark number */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.6 + i * 0.18 }}
                className="font-display font-black leading-none select-none pointer-events-none block"
                style={{
                  fontSize: 'clamp(4rem,8vw,6rem)',
                  color: step.highlighted
                    ? 'rgba(255,255,255,0.08)'
                    : 'rgba(26,95,255,0.06)',
                }}
                aria-hidden="true"
              >
                {step.number}
              </motion.span>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, x: -10, filter: 'blur(6px)' }}
                animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.7, delay: 0.6 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                className={`font-display font-black text-2xl tracking-tight -mt-3 mb-4 ${
                  step.highlighted ? 'text-white' : 'text-body'
                }`}
              >
                {step.title}
              </motion.h3>

              {/* Body */}
              <motion.p
                initial={{ opacity: 0, filter: 'blur(6px)' }}
                animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.75, delay: 0.72 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                className={`font-body text-[14px] leading-[1.8] flex-1 ${
                  step.highlighted ? 'text-white/65' : 'text-muted'
                }`}
              >
                {step.body}
              </motion.p>


              {/* Gold badge on highlighted card */}
              {step.highlighted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                  animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.95, ease: [0.34, 1.56, 0.64, 1] }}
                  className="absolute top-6 right-6 w-9 h-9 bg-gold rounded-full flex items-center justify-center text-lg shadow-md"
                >
                  ⚡
                </motion.div>
              )}

              {/* Blue glow on highlighted card */}
              {step.highlighted && (
                <div
                  className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: 'rgba(255,255,255,0.06)', filter: 'blur(24px)' }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}