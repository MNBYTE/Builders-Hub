'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)' },
}

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Background image ─ */}
      <div className="absolute inset-0 z-0">
        {/* Plain <img> avoids next/image hostname config entirely */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1800&auto=format&fit=crop&q=80"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          style={{
            /* on mobile: anchor the right side so a person is always visible */
            objectPosition: 'right center',
          }}
        />

        {/* Heavier left-side gradient so text always readable on mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/30 sm:from-ink/90 sm:via-ink/65 sm:to-ink/20" />
        {/* Bottom vignette keeps the category strip legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/15" />
        {/* Subtle dot grid texture */}
        <div className="dot-grid absolute inset-0 opacity-25" />
      </div>

      {/* ── Main content ─ */}
      <div className="relative z-10 flex-1 flex items-center pt-[70px]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 w-full py-16 sm:py-20 lg:py-28">

          {/* Staggered container */}
          <motion.div
            className="max-w-[680px]"
            variants={stagger}
            initial="hidden"
            animate="show"
          >

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-white leading-[0.95] tracking-tightest mb-6 sm:mb-7"
              style={{ fontSize: 'clamp(2.6rem, 7vw, 6rem)' }}
            >
              We design &amp; build
              <br />
              <span className="hero-underline">
                fullstack apps
                <svg viewBox="0 0 400 16" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M4 12 C100 4, 240 14, 396 6" stroke="#F5C52C" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              <span className="text-blue">that drive</span>
              <br />
              growth.
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-body text-white/65 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-[480px]"
            >
              From concept to launch. We partner with ambitious companies to build
              high-converting websites, robust SaaS applications, AI integrations,
              and custom database systems.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-blue text-white font-body font-semibold text-[15px] px-7 sm:px-8 py-3.5 sm:py-4 rounded-full hover:bg-blue-dark transition-all duration-200 shadow-blue hover:shadow-blue-lift hover:-translate-y-0.5"
              >
                Let&apos;s Build Together
                <span className="text-gold font-bold">→</span>
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center gap-2 border border-white/25 bg-white/10 backdrop-blur-sm text-white font-body font-semibold text-[15px] px-7 sm:px-8 py-3.5 sm:py-4 rounded-full hover:bg-white/20 transition-all duration-200"
              >
                View Our Work
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mt-9 sm:mt-10"
            >
              <div className="flex">
                {['#1A5FFF','#F5C52C','#10B981','#A78BFA','#F97316'].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-ink/60 flex-shrink-0"
                    style={{ background: c, marginLeft: i === 0 ? 0 : -8 }}
                  />
                ))}
              </div>
              <div>
                <p className="font-display font-bold text-sm text-white leading-tight">10+ happy clients</p>
                <p className="text-xs text-white/45 leading-tight">★★★★★ 4.9 average rating</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}