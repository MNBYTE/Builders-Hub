'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, easeOut } from 'framer-motion'
import Logo from './Logo'
import { FOOTER_LINKS } from '../data/constants'

const fadeUp = (delay = 0) => ({
  hidden: {
    opacity: 0,
    y: 32,
    filter: 'blur(6px)',
  },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      delay,
      ease: easeOut,
    },
  },
})

const column = (delay = 0) => ({
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(6px)',
    scale: 0.985,
  },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.85,
      delay,
      ease: easeOut,
    },
  },
})

const LEGAL_LINKS = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Cookies', href: '/cookies' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  const ref = useRef(null)

  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  })

  return (
    <footer
      ref={ref}
      className="bg-ink border-t border-white/5 pt-16 pb-8 overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">

        {/* ================= TOP ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10 pb-12 border-b border-white/8">

          {/* Brand */}

          <motion.div
            variants={column(0.1)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <Logo inverted />

            <motion.p
              variants={fadeUp(0.22)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="font-body text-[13px] text-white/35 leading-[1.8] max-w-[240px] mt-5"
            >
              A full-stack digital agency designing, building, and growing
              products that lead their market.
            </motion.p>
          </motion.div>

          {/* Footer columns */}

          {Object.entries(FOOTER_LINKS).map(([heading, links], i) => (
            <motion.div
              key={heading}
              variants={column(0.32 + i * 0.12)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
              <h3 className="font-display font-bold text-[11px] uppercase tracking-[0.08em] text-white mb-5">
                {heading}
              </h3>

              <ul className="flex flex-col gap-3">
                {links.map((link) => {
                  const external = link.href.startsWith('http')

                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        {...(external
                          ? {
                              target: '_blank',
                              rel: 'noopener noreferrer',
                            }
                          : {})}
                        className="font-body text-[13px] text-white/35 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ================= BOTTOM ================= */}

        <motion.div
          variants={fadeUp(0.88)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8"
        >
          <p className="font-body text-[12px] text-white/20">
            © {year} Builders Hub. All rights reserved.
          </p>

          <div className="flex gap-6">

            {LEGAL_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-body text-[12px] text-white/20 hover:text-white/40 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>

      </div>
    </footer>
  )
}