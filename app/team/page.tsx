'use client'

import { useRef } from 'react'
import { motion, useInView, cubicBezier } from 'framer-motion'
import Nav    from '../components/Nav'
import Footer from '../components/Footer'
import { TEAM } from '../data/constants'
import { ArrowUpRight, Building2, CodeXml, Mail, MessageCircle, ScanFace, Search, Sparkles, Target, Zap } from 'lucide-react'


/* ── Animation helpers ──────────────────────────────────────────────── */
const easeCustom = cubicBezier(0.16, 1, 0.3, 1)

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 36, filter: 'blur(10px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.85, delay, ease: easeCustom },
  },
})

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, filter: 'blur(8px)' },
  show: {
    opacity: 1, filter: 'blur(0px)',
    transition: { duration: 0.75, delay, ease: easeCustom },
  },
})

const slideLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -28, filter: 'blur(8px)' },
  show: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, delay, ease: easeCustom },
  },
})

const cardVariant = (delay = 0) => ({
  hidden: { opacity: 0, y: 52, filter: 'blur(12px)', scale: 0.97 },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)', scale: 1,
    transition: { duration: 0.9, delay, ease: easeCustom },
  },
})

/* ── Values strip data ───────────────────────────────────────────────── */
const VALUES = [
  { Icon: Target, title: 'Ownership',    body: 'We treat every project like it\'s our own product on the line.'       },
  { Icon: Search, title: 'Craft',        body: 'Details that most people won\'t notice but everyone will feel.'      },
  { Icon: MessageCircle, title: 'Transparency', body: 'You always know where things stand. No vague updates, ever.'           },
  { Icon: Zap, title: 'Speed',        body: 'We move fast without cutting corners. Momentum matters.'               },
]

/* ── Member card ─────────────────────────────────────────────────────── */
function MemberCard({
  member, index, inView,
}: {
  member: typeof TEAM[number]
  index:  number
  inView: boolean
}) {
  const col   = index % 3
  const delay = 0.12 + col * 0.14 + Math.floor(index / 3) * 0.1

  return (
    <motion.article
      variants={cardVariant(delay)}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className="bg-surface border border-edge rounded-2xl p-7 flex flex-col group relative overflow-hidden"
      whileHover={{ y: -5, boxShadow: '0 20px 56px rgba(26,95,255,.11)', transition: { duration: 0.25 } }}
    >
      {/* Subtle color glow top-right */}
      <div
        className="absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: member.color, filter: 'blur(32px)', opacity: 0 }}
      />

      {/* Avatar + role row */}
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center font-display font-black text-lg text-white flex-shrink-0"
          style={{ background: member.color, boxShadow: `0 8px 24px ${member.color}44` }}
        >
          {member.initials}
        </div>

        {/* Social icons — top right */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {member.socials.linkedin && (
            <a href={member.socials.linkedin} aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg bg-subtle border border-edge flex items-center justify-center text-muted hover:text-blue hover:border-blue transition-colors">
              <Mail size={13} />
            </a>
          )}
          {member.socials.twitter && (
            <a href={member.socials.twitter} aria-label="Twitter / X"
              className="w-8 h-8 rounded-lg bg-subtle border border-edge flex items-center justify-center text-muted hover:text-blue hover:border-blue transition-colors">
              <ScanFace size={13} />
            </a>
          )}
          {member.socials.github && (
            <a href={member.socials.github} aria-label="GitHub"
              className="w-8 h-8 rounded-lg bg-subtle border border-edge flex items-center justify-center text-muted hover:text-body hover:border-edge transition-colors">
              <CodeXml size={13} />
            </a>
          )}
        </div>
      </div>

      {/* Name + role */}
      <h2 className="font-display font-black text-[18px] text-body tracking-tight mb-0.5 group-hover:text-blue transition-colors duration-200">
        {member.name}
      </h2>
      <p className="font-mono text-[10px] font-bold tracking-label uppercase mb-4" style={{ color: member.color }}>
        {member.role}
      </p>

      {/* Bio */}
      <p className="font-body text-[13.5px] text-muted leading-relaxed flex-1 mb-6">
        {member.bio}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 pt-5 border-t border-edge">
        {member.skills.map(skill => (
          <span
            key={skill}
            className="font-mono text-[9px] text-blue bg-blue-soft border border-blue/12 rounded-full px-2.5 py-1 tracking-wide"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.article>
  )
}

/* ── Page ────────────────────────────────────────────────────────────── */
export default function TeamClient() {
  const headerRef  = useRef(null)
  const valuesRef  = useRef(null)
  const gridRef    = useRef(null)
  const hiringRef  = useRef(null)

  const headerInView  = useInView(headerRef,  { once: true, margin: '-60px' })
  const valuesInView  = useInView(valuesRef,  { once: true, margin: '-60px' })
  const gridInView    = useInView(gridRef,    { once: true, margin: '-60px' })
  const hiringInView  = useInView(hiringRef,  { once: true, margin: '-60px' })

  return (
    <>
      <Nav />
      <main className="bg-base">

        {/* ══ Hero header ═══════════════════════════════════════════ */}
        <section className="bg-ink pt-[70px] relative overflow-hidden">

          {/* Orbs */}
          <div className="absolute rounded-full pointer-events-none"
            style={{ width:640, height:640, top:-220, right:-160, background:'#1A5FFF', opacity:.07, filter:'blur(72px)' }} />
          <div className="absolute rounded-full pointer-events-none"
            style={{ width:300, height:300, bottom:-60, left:60, background:'#F5C52C', opacity:.05, filter:'blur(48px)' }} />

          <div ref={headerRef} className="max-w-[1240px] mx-auto px-5 sm:px-8 py-20 sm:py-28 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">

              {/* Left */}
              <div>
                <motion.span
                  variants={fadeUp(0.1)} initial="hidden" animate={headerInView ? 'show' : 'hidden'}
                  className="font-mono text-[10px] font-bold tracking-label uppercase text-blue block mb-5"
                >
                  The people
                </motion.span>

                <motion.h1
                  variants={fadeUp(0.22)} initial="hidden" animate={headerInView ? 'show' : 'hidden'}
                  className="font-display font-black tracking-tightest text-white leading-[0.95] mb-6"
                  style={{ fontSize: 'clamp(2.8rem,7vw,5.5rem)' }}
                >
                  Built by people
                  <br />who care{' '}
                  <span className="text-blue">deeply.</span>
                </motion.h1>

                <motion.p
                  variants={fadeUp(0.35)} initial="hidden" animate={headerInView ? 'show' : 'hidden'}
                  className="font-body text-white/45 text-[15px] sm:text-lg leading-relaxed max-w-[420px]"
                >
                  Small, senior, and fully invested. Every person at Builders Hub
                  takes ownership of what they ship, from first pixel to final deploy.
                </motion.p>
              </div>

              {/* Right — team size card */}
              <motion.div
                variants={fadeUp(0.44)} initial="hidden" animate={headerInView ? 'show' : 'hidden'}
                className="lg:justify-self-end"
              >
                <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-[300px]">
                  <Building2 size={20} className="text-gold mb-4" />
                  <p className="font-display font-black text-white text-2xl tracking-tightest mb-1">
                    {TEAM.length} people.
                  </p>
                  <p className="font-display font-black text-blue text-2xl tracking-tightest mb-4">
                    Zero middlemen.
                  </p>
                  <p className="font-body text-[13px] text-white/35 leading-relaxed">
                    You work directly with the designer, the engineer, or the strategist doing the actual work.
                    Always.
                  </p>
                  <div className="flex mt-5 pt-5 border-t border-white/8">
                    {TEAM.map((m, i) => (
                      <div
                        key={i}
                        title={m.name}
                        className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center font-display font-black text-[9px] text-white flex-shrink-0"
                        style={{ background: m.color, marginLeft: i === 0 ? 0 : -8 }}
                      >
                        {m.initials[0]}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Fade to base */}
          <div className="h-12 bg-gradient-to-b from-ink to-base" />
        </section>

        {/* ══ Values strip ══════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 border-b border-edge" ref={valuesRef}>
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">

            <motion.p
              variants={fadeIn(0.05)} initial="hidden" animate={valuesInView ? 'show' : 'hidden'}
              className="font-mono text-[10px] font-bold tracking-label uppercase text-muted mb-10"
            >
              What we stand for
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map(({ Icon, title, body }, i) => (
                <motion.div
                  key={title}
                  variants={fadeUp(0.1 + i * 0.12)}
                  initial="hidden"
                  animate={valuesInView ? 'show' : 'hidden'}
                  className="flex flex-col gap-3"
                >
                  <span className="text-2xl">{Icon && <Icon size={24} className="text-gold mb-4"/>}</span>
                  <h3 className="font-display font-black text-[16px] text-body tracking-tight">{title}</h3>
                  <p className="font-body text-[13px] text-muted leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ Team grid ═════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">

            <motion.div
              ref={gridRef}
              variants={fadeUp(0.05)} initial="hidden" animate={gridInView ? 'show' : 'hidden'}
              className="flex items-end justify-between gap-6 mb-12 flex-wrap"
            >
              <div>
                <span className="font-mono text-[10px] font-bold tracking-label uppercase text-blue block mb-3">
                  Meet the team
                </span>
                <h2
                  className="font-display font-black tracking-tightest text-body leading-[1.02]"
                  style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)' }}
                >
                  The minds behind
                  <br />the work.
                </h2>
              </div>
              <p className="font-body text-[13px] text-muted max-w-[280px] leading-relaxed">
                Senior specialists across design, engineering, growth, and delivery.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {TEAM.map((member, i) => (
                <MemberCard key={i} member={member} index={i} inView={gridInView} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ Culture quote ═════════════════════════════════════════ */}
        <section className="bg-subtle py-16 sm:py-20 border-t border-edge">
          <div className="max-w-[860px] mx-auto px-5 sm:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: 0.1, ease: easeCustom }}
            >
              <p className="font-display font-black text-blue mb-5 select-none" style={{ fontSize: '3rem' }}>
                &ldquo;
              </p>
              <p
                className="font-display font-black tracking-tight text-body leading-[1.2] mb-8"
                style={{ fontSize: 'clamp(1.4rem,3vw,2rem)' }}
              >
                We didn&apos;t build Builders Hub to be a big agency.
                We built it to do the best work of our careers
                with clients who care about what they&apos;re building.
              </p>
              <div className="inline-flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-black text-sm text-white flex-shrink-0"
                  style={{ background: TEAM[0]?.color ?? '#1A5FFF' }}
                >
                  {TEAM[0]?.initials}
                </div>
                <div className="text-left">
                  <p className="font-display font-bold text-[14px] text-body">{TEAM[0]?.name}</p>
                  <p className="font-mono text-[10px] text-muted tracking-label">{TEAM[0]?.role}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ Hiring banner ═════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-8" ref={hiringRef}>
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            animate={hiringInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[1240px] mx-auto bg-ink rounded-2xl p-10 sm:p-16 relative overflow-hidden"
          >
            {/* Orbs */}
            <div className="absolute rounded-full pointer-events-none"
              style={{ width:480, height:480, top:-160, right:-100, background:'#1A5FFF', opacity:.08, filter:'blur(60px)' }} />
            <div className="absolute rounded-full pointer-events-none"
              style={{ width:220, height:220, bottom:-70, left:-40, background:'#F5C52C', opacity:.07, filter:'blur(40px)' }} />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
              <div>
                <motion.span
                  initial={{ opacity:0, y:12, filter:'blur(6px)' }}
                  animate={hiringInView ? { opacity:1, y:0, filter:'blur(0px)' } : {}}
                  transition={{ duration:0.7, delay:0.28 }}
                  className="font-mono text-[10px] font-bold tracking-label uppercase text-blue block mb-4"
                >
                  We&apos;re hiring
                </motion.span>
                <motion.h2
                  initial={{ opacity:0, y:18, filter:'blur(8px)' }}
                  animate={hiringInView ? { opacity:1, y:0, filter:'blur(0px)' } : {}}
                  transition={{ duration:0.85, delay:0.38, ease: easeCustom }}
                  className="font-display font-black tracking-tightest text-white leading-[1.0] mb-4"
                  style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}
                >
                  Think you belong
                  <br />on this team?
                </motion.h2>
                <motion.p
                  initial={{ opacity:0, filter:'blur(6px)' }}
                  animate={hiringInView ? { opacity:1, filter:'blur(0px)' } : {}}
                  transition={{ duration:0.75, delay:0.5 }}
                  className="font-body text-white/40 text-[14px] leading-relaxed max-w-[380px]"
                >
                  We&apos;re always open to exceptional people, designers, engineers, and strategists
                  who obsess over craft and want to do the best work of their careers.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity:0, x:20, filter:'blur(8px)' }}
                animate={hiringInView ? { opacity:1, x:0, filter:'blur(0px)' } : {}}
                transition={{ duration:0.8, delay:0.55, ease: easeCustom }}
                className="flex flex-col items-start lg:items-end gap-4 flex-shrink-0"
              >
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-blue text-white font-body font-bold text-[14px] px-9 py-4 rounded-full hover:bg-blue-dark transition-all duration-200 shadow-blue hover:shadow-blue-lift hover:-translate-y-0.5"
                >
                  Get in touch <ArrowUpRight size={15} />
                </a>
                <p className="font-mono text-[10px] text-white/25 tracking-wide">
                  No recruiters · Direct response only
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