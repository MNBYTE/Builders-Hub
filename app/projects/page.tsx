'use client'

import { useRef } from 'react'
import { motion, useInView, cubicBezier } from 'framer-motion'
import Link from 'next/link'
import Nav    from '../components/Nav'
import Footer from '../components/Footer'
import { PROJECTS } from '../data/constants'
import { ArrowUpRight } from 'lucide-react'

/* ── Animation helpers ─ */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 36, filter: 'blur(10px)' },
  show:   {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.85, delay, ease: cubicBezier(0.16, 1, 0.3, 1) },
  },
})

const cardVariant = (delay = 0) => ({
  hidden: { opacity: 0, y: 48, filter: 'blur(12px)', scale: 0.975 },
  show:   {
    opacity: 1, y: 0, filter: 'blur(0px)', scale: 1,
    transition: { duration: 0.9, delay, ease: cubicBezier(0.16, 1, 0.3, 1) },
  },
})

/* ── Animated section wrapper ────────────────────────────────────────── */
function InViewSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <div ref={ref} data-inview={inView} className={className}>
      {/* Pass inView down via context would be cleaner, but for co-located use we clone */}
      {typeof children === 'function' ? (children as (v: boolean) => React.ReactNode)(inView) : children}
    </div>
  )
}

/* ── Project card ────────────────────────────────────────────────────── */
function ProjectCard({ project, index, inView }: {
  project: typeof PROJECTS[number]
  index:   number
  inView:  boolean
}) {
  const col   = index % 3
  const delay = 0.15 + col * 0.14 + Math.floor(index / 3) * 0.08

  return (
    <motion.article
      variants={cardVariant(delay)}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className="bg-surface border border-edge rounded-2xl overflow-hidden group cursor-pointer flex flex-col"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}
      whileHover={{ y: -5, boxShadow: '0 20px 56px rgba(26,95,255,.11)', transition: { duration: 0.25 } }}
    >
      {/* ── Preview area ───────────────────────────────────────── */}
      <div className="relative h-56 flex-shrink-0 overflow-hidden" style={{ background: project.bg }}>

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Radial glow behind name */}
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 50% 60%, ${project.accent}22 0%, transparent 70%)` }}
        />

        {/* Project name */}
        <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
          <p
            className="font-display font-black tracking-tightest leading-none"
            style={{ color: project.accent, fontSize: 'clamp(2.2rem,5vw,3rem)' }}
          >
            {project.name.split(' ')[0]}
          </p>
          {project.name.split(' ').length > 1 && (
            <p className="font-display font-light text-lg mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
              {project.name.split(' ').slice(1).join(' ')}
            </p>
          )}
        </div>

        {/* Top row meta */}
        <div className="absolute top-4 left-4">
          <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
            {project.year}
          </span>
        </div>

        {/* Arrow link */}
        <Link
          href={`/projects/${project.slug}`}
          className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/50 hover:bg-white hover:text-ink transition-all duration-200 group/arrow"
          aria-label={`View ${project.name}`}
        >
          <ArrowUpRight size={14} className="group-hover/arrow:scale-110 transition-transform" />
        </Link>

        {/* Metric badge — bottom left */}
        <div className="absolute bottom-4 left-4">
          <span
            className="font-display font-black text-[11px] px-2.5 py-1 rounded-full"
            style={{ background: `${project.accent}22`, color: project.accent, border: `1px solid ${project.accent}33` }}
          >
            {project.metric}
          </span>
        </div>
      </div>

      {/* ── Card body ──────────────────────────────────────────── */}
      <div className="p-6 flex flex-col flex-1">
        {/* Name + type */}
        <div className="mb-3">
          <h2 className="font-display font-black text-[17px] text-body tracking-tight mb-1 group-hover:text-blue transition-colors duration-200">
            {project.name}
          </h2>
          <p className="font-mono text-[10px] text-muted/60 tracking-label uppercase">{project.type}</p>
        </div>

        {/* Summary */}
        <p className="font-body text-[13.5px] text-muted leading-relaxed flex-1 mb-5">
          {project.summary}
        </p>

        {/* Tags + CTA */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-edge">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="font-mono text-[9px] text-blue bg-blue-soft border border-blue/12 rounded-full px-2.5 py-1 tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>


          {/* Card arrow — top right of preview */}
            <a  href={project.slug}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/50 hover:bg-white hover:text-ink transition-all duration-200"
              aria-label={`Visit ${project.name}`}
            >
              <ArrowUpRight size={14} />
            </a>

            {/* Card bottom "View →" link */}

            <a  href={project.slug}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 font-body font-semibold text-[12px] text-blue hover:text-blue-dark flex items-center gap-1 transition-colors"
            >
              View <ArrowUpRight size={12} />
            </a>


        </div>
      </div>
    </motion.article>
  )
}

/* ── Page ────────────────────────────────────────────────────────────── */
export default function ProjectsPage() {
  /* Header section */
  const headerRef    = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  /* Grid section */
  const gridRef    = useRef(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' })

  /* CTA section */
  const ctaRef    = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' })

  return (
    <>
      <Nav />
      <main className="bg-base">

        {/* ══ Page header ═══════════════════════════════════════════ */}
        <section className="bg-ink pt-[70px] relative overflow-hidden">
          {/* Background orbs */}
          <div className="absolute rounded-full pointer-events-none" style={{ width:600, height:600, top:-200, right:-150, background:'#1A5FFF', opacity:.06, filter:'blur(60px)' }} />
          <div className="absolute rounded-full pointer-events-none" style={{ width:300, height:300, bottom:-80, left:60, background:'#F5C52C', opacity:.05, filter:'blur(40px)' }} />

          <div ref={headerRef} className="max-w-[1240px] mx-auto px-5 sm:px-8 py-20 sm:py-28 relative">

            <motion.span
              variants={fadeUp(0.1)} initial="hidden" animate={headerInView ? 'show' : 'hidden'}
              className="font-mono text-[10px] font-bold tracking-label uppercase text-blue block mb-4"
            >
              Selected work
            </motion.span>

            <motion.h1
              variants={fadeUp(0.22)} initial="hidden" animate={headerInView ? 'show' : 'hidden'}
              className="font-display font-black tracking-tightest text-white leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(2.8rem,7vw,5.5rem)' }}
            >
              Built with intention.
              <br />
              <span className="text-blue">Shipped</span> with precision.
            </motion.h1>

            <motion.p
              variants={fadeUp(0.36)} initial="hidden" animate={headerInView ? 'show' : 'hidden'}
              className="font-body text-white/45 text-[15px] sm:text-lg leading-relaxed max-w-[460px] mb-10"
            >
              A curated selection of client projects, each one a case study in craft,
              collaboration, and results that actually move the needle.
            </motion.p>

            {/* Stats row */}
            <motion.div
              variants={fadeUp(0.48)} initial="hidden" animate={headerInView ? 'show' : 'hidden'}
              className="flex flex-wrap gap-x-10 gap-y-4"
            >
              {[
                { n: `${PROJECTS.length}`, l: 'Projects shown'    },
                { n: '100%',               l: 'On-time delivery'  },
                { n: '94%',                l: 'Client return rate' },
              ].map(({ n, l }) => (
                <div key={l}>
                  <p className="font-display font-black text-2xl text-white tracking-tightest">{n}</p>
                  <p className="font-mono text-[10px] text-white/30 tracking-label uppercase mt-0.5">{l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Fade to base */}
          <div className="h-12 bg-gradient-to-b from-ink to-base" />
        </section>

        {/* ══ Filter hint (visual only) ══════════════════════════════ */}
        <section className="pt-14 pb-2">
          <motion.div
            ref={gridRef}
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={gridInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[1240px] mx-auto px-5 sm:px-8 flex items-center justify-between gap-4 flex-wrap"
          >
            <p className="font-mono text-[10px] text-muted tracking-label uppercase">
              Showing {PROJECTS.length} projects
            </p>
            <div className="flex gap-2 flex-wrap">
              {['All', 'Web App', 'Mobile', 'Brand', 'SaaS'].map((f, i) => (
                <span
                  key={f}
                  className={`font-mono text-[10px] tracking-label uppercase px-3 py-1.5 rounded-full cursor-pointer transition-all ${
                    i === 0
                      ? 'bg-blue text-white'
                      : 'bg-surface border border-edge text-muted hover:border-blue hover:text-blue'
                  }`}
                >
                  {f}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ══ Project grid ══════════════════════════════════════════ */}
        <section className="py-10 pb-24">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROJECTS.map((project, i) => (
                <ProjectCard
                  key={project.slug ?? i}
                  project={project}
                  index={i}
                  inView={gridInView}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════════════════ */}
        <section className="pb-20 px-4 sm:px-8" ref={ctaRef}>
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            animate={ctaInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[1240px] mx-auto bg-ink rounded-2xl p-10 sm:p-16 relative overflow-hidden"
          >
            {/* Orbs */}
            <div className="absolute rounded-full pointer-events-none" style={{ width:500, height:500, top:-180, right:-100, background:'#1A5FFF', opacity:.08, filter:'blur(60px)' }} />
            <div className="absolute rounded-full pointer-events-none" style={{ width:240, height:240, bottom:-80, left:-40, background:'#F5C52C', opacity:.06, filter:'blur(40px)' }} />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
              <div>
                <motion.span
                  initial={{ opacity:0, y:12, filter:'blur(6px)' }}
                  animate={ctaInView ? { opacity:1, y:0, filter:'blur(0px)' } : {}}
                  transition={{ duration:0.7, delay:0.3 }}
                  className="font-mono text-[10px] font-bold tracking-label uppercase text-blue block mb-4"
                >
                  Next up
                </motion.span>
                <motion.h2
                  initial={{ opacity:0, y:16, filter:'blur(8px)' }}
                  animate={ctaInView ? { opacity:1, y:0, filter:'blur(0px)' } : {}}
                  transition={{ duration:0.8, delay:0.42, ease:[0.16,1,0.3,1] }}
                  className="font-display font-black tracking-tightest text-white leading-[1.0]"
                  style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}
                >
                  Want to be our next
                  <br />success story?
                </motion.h2>
              </div>

              <motion.div
                initial={{ opacity:0, x:20, filter:'blur(8px)' }}
                animate={ctaInView ? { opacity:1, x:0, filter:'blur(0px)' } : {}}
                transition={{ duration:0.8, delay:0.55, ease:[0.16,1,0.3,1] }}
                className="flex flex-col items-start lg:items-end gap-4 flex-shrink-0"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-blue text-white font-body font-bold text-[14px] px-9 py-4 rounded-full hover:bg-blue-dark transition-all duration-200 shadow-blue hover:shadow-blue-lift hover:-translate-y-0.5"
                >
                  Start your project →
                </Link>
                <p className="font-mono text-[10px] text-white/25 tracking-wide">
                  hello@buildershub.dev · reply within 24h
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  )
}