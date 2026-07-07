'use client'

import { useRef } from 'react'
import { motion, useInView, cubicBezier } from 'framer-motion'
import { SERVICES, type Service } from '../data/constants'

/* ──────────────────────────────────────────────────────────────
   Animation Variants
────────────────────────────────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(5px)',
  },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      delay,
      ease: cubicBezier(0.16, 1, 0.3, 1),
    },
  },
})

const cardVariant = (delay = 0) => ({
  hidden: {
    opacity: 0,
    y: 42,
    scale: 0.985,
    filter: 'blur(6px)',
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.82,
      delay,
      ease: cubicBezier(0.16, 1, 0.3, 1),
    },
  },
})

const iconVariant = (delay = 0) => ({
  hidden: {
    opacity: 0,
    scale: 0.92,
    rotate: -8,
  },
  show: {
    opacity: 0.14,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: cubicBezier(0.16, 1, 0.3, 1),
    },
  },
})

const ctaVariant = (delay = 0) => ({
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay,
      ease: cubicBezier(0.16, 1, 0.3, 1),
    },
  },
})

/* ──────────────────────────────────────────────────────────────
   Theme
────────────────────────────────────────────────────────────── */

const themes: Record<
  Service['theme'],
  {
    wrapper: string
    eyebrow: string
    title: string
    body: string
    check: string
    icon: string
  }
> = {
  dark: {
    wrapper: 'bg-ink',
    eyebrow: 'text-white/30',
    title: 'text-white',
    body: 'text-white/50',
    check: 'bg-gold',
    icon: 'text-white/20',
  },

  blue: {
    wrapper: 'bg-blue',
    eyebrow: 'text-white/50',
    title: 'text-white',
    body: 'text-white/60',
    check: 'bg-white',
    icon: 'text-white/20',
  },

  light: {
    wrapper: 'bg-surface border border-edge',
    eyebrow: 'text-muted',
    title: 'text-body',
    body: 'text-muted',
    check: 'bg-blue',
    icon: 'text-edge',
  },

  'blue-soft': {
    wrapper: 'bg-blue-soft border border-blue/10',
    eyebrow: 'text-blue/60',
    title: 'text-blue',
    body: 'text-blue/70',
    check: 'bg-blue',
    icon: 'text-blue/10',
  },
}

/* ──────────────────────────────────────────────────────────────
   Card
────────────────────────────────────────────────────────────── */

function BentoCard({
  service,
  index,
  inView,
}: {
  service: Service
  index: number
  inView: boolean
}) {
  const t = themes[service.theme]
  const { Icon } = service

  const isLarge = service.bentoClass === 'bento-web'

  return (
    <motion.div
      variants={cardVariant(0.34 + index * 0.12)}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={`card-lift ${t.wrapper} ${service.bentoClass} rounded-xl p-6 sm:p-7 relative overflow-hidden flex flex-col min-h-[200px] lg:min-h-0`}
    >
      {/* Watermark icon */}

      <motion.div
        variants={iconVariant(0.52 + index * 0.12)}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className={`absolute -bottom-2 -right-2 ${t.icon} pointer-events-none`}
        aria-hidden="true"
      >
        <Icon
          size={80}
          strokeWidth={1}
        />
      </motion.div>

      {/* Highlight glow */}

      {service.highlight && (
        <div
          className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background: 'rgba(245,197,66,.08)',
            filter: 'blur(60px)',
          }}
        />
      )}

      {/* Content */}

      <div className="relative z-10 flex flex-col flex-1">

        {/* Eyebrow */}

        <span
          className={`font-mono text-[9px] font-bold tracking-label uppercase ${t.eyebrow}`}
        >
          {service.id} — {service.eyebrow}
        </span>

        {/* Title */}

        <h3
          className={`font-display font-black tracking-tighter leading-[1.08] mt-3 mb-2 ${t.title}`}
          style={{
            fontSize: isLarge
              ? 'clamp(1.45rem,2.4vw,1.9rem)'
              : '1.1rem',
          }}
        >
          {service.title}
        </h3>

        {/* Description */}

        <p
          className={`font-body text-[13px] leading-relaxed ${t.body}`}
          style={{
            maxWidth: isLarge ? 380 : undefined,
          }}
        >
          {service.description}
        </p>

        {/* Checklist */}

        {service.list && (
          <ul className="flex flex-col gap-2 mt-5">
            {service.list.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-sm flex-shrink-0 ${t.check}`}
                />

                <span
                  className={`font-body text-[13px] font-medium ${t.title}`}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Push CTA to bottom */}

        <div className="flex-1" />

        {/* CTA */}

        {service.highlight && (
          <motion.div
            variants={ctaVariant(0.76 + index * 0.12)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="pt-6"
          >
            <div className="inline-flex items-center gap-2 bg-gold text-ink font-body font-bold text-xs px-4 py-2 rounded-pill cursor-pointer hover:scale-105 transition-transform duration-300">
              Explore service →
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function ServicesBento() {
  const ref = useRef(null)

  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  })

  return (
    <section
      id="services"
      ref={ref}
      className="py-20 sm:py-28 bg-base overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">

        {/* ── Header ───────────────────────────────────────────── */}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">

          <div>

            <motion.span
              variants={fadeUp(0.08)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="font-mono text-[10px] font-bold tracking-label uppercase text-blue block mb-3"
            >
              Our services
            </motion.span>

            <motion.h2
              variants={fadeUp(0.18)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="font-display font-black tracking-tightest text-body leading-[1.05]"
              style={{
                fontSize: 'clamp(2rem,5vw,3.2rem)',
              }}
            >
              Everything you need
              <br />

              <span className="relative inline-block">
                to ship a great product.

                <svg
                  viewBox="0 0 180 10"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                  className="absolute left-0 -bottom-1 w-full"
                >
                  <path
                    d="M2 7 C45 2,120 9,178 4"
                    stroke="#F5C52C"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>

              </span>
            </motion.h2>

          </div>

          <motion.p
            variants={fadeUp(0.28)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="font-body text-muted text-sm leading-relaxed max-w-[320px]"
          >
            End-to-end digital solutions—from product strategy and brand
            identity to design, engineering, launch, and long-term growth.
          </motion.p>

        </div>

        {/* ── Bento Grid ──────────────────────────────────────── */}

        <div className="bento-grid">
          {SERVICES.map((service, index) => (
            <BentoCard
              key={service.id}
              service={service}
              index={index}
              inView={inView}
            />
          ))}
        </div>

      </div>
    </section>
  )
}