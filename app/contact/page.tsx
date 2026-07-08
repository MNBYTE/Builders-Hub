'use client'

import { useRef } from 'react'
import { motion, useInView, easeInOut } from 'framer-motion'
import Nav          from '../components/Nav'
import Footer       from '../components/Footer'
import ContactForm  from '../components/ContactForm'
import { Mail, MapPin, Clock, ArrowUpRight, CheckCircle2 } from 'lucide-react'

/* ── Animation helpers ──────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 36, filter: 'blur(10px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.85, delay, ease: easeInOut },
  },
})

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, filter: 'blur(8px)' },
  show: {
    opacity: 1, filter: 'blur(0px)',
    transition: { duration: 0.75, delay, ease: easeInOut },
  },
})

const slideLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -24, filter: 'blur(8px)' },
  show: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, delay, ease: easeInOut },
  },
})

const slideRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 24, filter: 'blur(8px)' },
  show: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, delay, ease: easeInOut },
  },
})

/* ── Data ────────────────────────────────────────────────────────────── */
const CONTACT_INFO = [
  { Icon: Mail,   label: 'Email us',  value: 'buildershub@gmail.com'    },
  { Icon: MapPin, label: 'Based in',  value: 'Lagos · London · Remote'  },
  { Icon: Clock,  label: 'Response',  value: 'Within 24 hours'          },
]

const PROMISES = [
  'We read every message personally, zero auto-responders.',
  'Honest feedback, even if we\'re not the right fit for you.',
  'Discovery calls are always free and never a hard sell.',
  'Engagements start at $2,000 depending on scope and timeline.',
]

const FAQS = [
  {
    q: 'How long does a typical project take?',
    a: 'Most web projects run 4–10 weeks. Mobile apps or SaaS platforms are typically 10–20 weeks. We scope everything before we start so there are no surprises.',
  },
  {
    q: 'Do you work with early-stage startups?',
    a: 'Yes, some of our best work has been with founders at the idea stage. We help shape the product, not just build it.',
  },
  {
    q: 'What does the process look like after I reach out?',
    a: 'A quick discovery call → scoping document → proposal with timeline and cost → kick-off. Most people hear from us within a business day.',
  },
]

/* ── FAQ Item ────────────────────────────────────────────────────────── */
function FaqItem({ q, a, delay, inView }: { q: string; a: string; delay: number; inView: boolean }) {
  return (
    <motion.div
      variants={fadeUp(delay)}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className="py-6 border-b border-edge last:border-0"
    >
      <p className="font-display font-black text-[15px] text-body tracking-tight mb-2">{q}</p>
      <p className="font-body text-[13.5px] text-muted leading-relaxed">{a}</p>
    </motion.div>
  )
}

/* ── Page ────────────────────────────────────────────────────────────── */
export default function ContactClient() {
  const headerRef = useRef(null)
  const bodyRef   = useRef(null)
  const faqRef    = useRef(null)

  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })
  const bodyInView   = useInView(bodyRef,   { once: true, margin: '-60px' })
  const faqInView    = useInView(faqRef,    { once: true, margin: '-60px' })

  return (
    <>
      <Nav />
      <main className="bg-base">

        {/* ══ Hero header ═══════════════════════════════════════════ */}
        <section className="bg-ink pt-[70px] relative overflow-hidden">

          {/* Background orbs */}
          <div className="absolute rounded-full pointer-events-none"
            style={{ width:640, height:640, top:-240, right:-160, background:'#1A5FFF', opacity:.07, filter:'blur(72px)' }} />
          <div className="absolute rounded-full pointer-events-none"
            style={{ width:280, height:280, bottom:-60, left:80, background:'#F5C52C', opacity:.06, filter:'blur(48px)' }} />

          <div ref={headerRef} className="max-w-[1240px] mx-auto px-5 sm:px-8 py-20 sm:py-28 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">

              {/* Left */}
              <div>
                <motion.span
                  variants={fadeUp(0.1)} initial="hidden" animate={headerInView ? 'show' : 'hidden'}
                  className="font-mono text-[10px] font-bold tracking-label uppercase text-blue block mb-5"
                >
                  Get in touch
                </motion.span>

                <motion.h1
                  variants={fadeUp(0.22)} initial="hidden" animate={headerInView ? 'show' : 'hidden'}
                  className="font-display font-black tracking-tightest text-white leading-[0.95] mb-6"
                  style={{ fontSize: 'clamp(2.8rem,7vw,5.5rem)' }}
                >
                  Let&apos;s build
                  <br />
                  <span className="text-blue">something</span>
                  <br />
                  great.
                </motion.h1>

                <motion.p
                  variants={fadeUp(0.35)} initial="hidden" animate={headerInView ? 'show' : 'hidden'}
                  className="font-body text-white/45 text-[15px] sm:text-lg leading-relaxed max-w-[400px]"
                >
                  Tell us what you&apos;re building. We&apos;ll respond within 24 hours
                  with honest thoughts and a clear path forward.
                </motion.p>
              </div>

            </div>
          </div>

          {/* Fade to base */}
          <div className="h-14 bg-gradient-to-b from-ink to-base" />
        </section>

        {/* ══ Main body ═════════════════════════════════════════════ */}
        <section className="pt-10 pb-20 sm:pb-28">
          <div ref={bodyRef} className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-14 lg:gap-20">

              {/* ── Left column ─────────────────────────────────── */}
              <div>

                {/* Promises */}
                <motion.h2
                  variants={slideLeft(0.1)} initial="hidden" animate={bodyInView ? 'show' : 'hidden'}
                  className="font-display font-black text-2xl sm:text-[1.75rem] tracking-tight text-body mb-8 leading-tight"
                >
                  Before you reach out,
                  <br />
                  <span className="text-blue">know this.</span>
                </motion.h2>

                <ul className="flex flex-col gap-4 mb-14">
                  {PROMISES.map((point, i) => (
                    <motion.li
                      key={i}
                      variants={slideLeft(0.18 + i * 0.1)}
                      initial="hidden"
                      animate={bodyInView ? 'show' : 'hidden'}
                      className="flex items-start gap-3.5"
                    >
                      <CheckCircle2 size={17} className="text-blue flex-shrink-0 mt-0.5" />
                      <span className="font-body text-[14px] text-muted leading-relaxed">{point}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Divider */}
                <motion.div
                  variants={fadeIn(0.58)}
                  initial="hidden"
                  animate={bodyInView ? 'show' : 'hidden'}
                  className="h-px bg-edge mb-14"
                />

                {/* Recent client logos / social proof strip */}
                <motion.div
                  variants={fadeUp(0.64)}
                  initial="hidden"
                  animate={bodyInView ? 'show' : 'hidden'}
                >
                  <p className="font-mono text-[10px] text-muted tracking-label uppercase mb-5">
                    Trusted by teams at
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['Vanta Finance', 'Orchard Market', 'Pulse Health', 'Apex Logistics', 'NovaPay'].map(name => (
                      <span
                        key={name}
                        className="font-body font-semibold text-[12px] text-muted/70 bg-surface border border-edge rounded-full px-4 py-2 hover:border-blue hover:text-blue transition-colors duration-200 cursor-default"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Testimonial pull-quote */}
                <motion.blockquote
                  variants={fadeUp(0.76)}
                  initial="hidden"
                  animate={bodyInView ? 'show' : 'hidden'}
                  className="mt-10 bg-blue-soft border-l-2 border-blue rounded-r-xl pl-5 pr-6 py-5"
                >
                  <p className="font-display font-medium text-[14px] text-body leading-relaxed tracking-tight mb-3">
                    &ldquo;They replied within an hour, scoped our project in a single call,
                    and delivered two weeks early. Best agency experience we&apos;ve had.&rdquo;
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue flex items-center justify-center flex-shrink-0">
                      <span className="font-display font-black text-[9px] text-white">KM</span>
                    </div>
                    <span className="font-mono text-[10px] text-muted tracking-wide">
                      Kofi Mensah — CTO, Extraordinary Life
                    </span>
                  </div>
                </motion.blockquote>

              </div>

              {/* ── Right column — form ──────────────────────────── */}
              <motion.div
                variants={slideRight(0.22)}
                initial="hidden"
                animate={bodyInView ? 'show' : 'hidden'}
              >
                <ContactForm />
              </motion.div>

            </div>
          </div>
        </section>

        {/* ══ FAQ ═══════════════════════════════════════════════════ */}
        <section className="pb-24 bg-subtle" ref={faqRef}>
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-16 sm:pt-20">

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
              {/* Label */}
              <div>
                <motion.span
                  variants={fadeUp(0.1)} initial="hidden" animate={faqInView ? 'show' : 'hidden'}
                  className="font-mono text-[10px] font-bold tracking-label uppercase text-blue block mb-4"
                >
                  FAQ
                </motion.span>
                <motion.h2
                  variants={fadeUp(0.2)} initial="hidden" animate={faqInView ? 'show' : 'hidden'}
                  className="font-display font-black text-2xl sm:text-3xl tracking-tight text-body leading-tight"
                >
                  Common
                  <br />questions.
                </motion.h2>
                <motion.a
                  variants={fadeUp(0.3)} initial="hidden" animate={faqInView ? 'show' : 'hidden'}
                  href="mailto:buildershub@gmail.com"
                  className="inline-flex items-center gap-1.5 mt-6 font-body font-semibold text-[13px] text-blue hover:text-blue-dark transition-colors"
                >
                  Ask us anything <ArrowUpRight size={13} />
                </motion.a>
              </div>

              {/* FAQ list */}
              <div>
                {FAQS.map((faq, i) => (
                  <FaqItem key={i} q={faq.q} a={faq.a} delay={0.15 + i * 0.14} inView={faqInView} />
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}