'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion, useInView, cubicBezier } from 'framer-motion'
import { PROJECTS } from '../data/constants'

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
      duration: 0.75,
      delay,
      ease: cubicBezier(0.16, 1, 0.3, 1),
    },
  },
})

const cardVariant = (delay = 0) => ({
  hidden: {
    opacity: 0,
    y: 52,
    scale: 0.98,
    filter: 'blur(6px)',
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      delay,
      ease: cubicBezier(0.16, 1, 0.3, 1),
    },
  },
})

export default function Work() {
  const featured = PROJECTS.slice(0, 3)

  const ref = useRef(null)
  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  })

  return (
    <section
      ref={ref}
      id="work"
      className="py-20 sm:py-28 bg-ink overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">

          <div>
            <motion.span
              variants={fadeUp(0.08)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="font-mono text-[10px] font-bold tracking-label uppercase text-blue block mb-3"
            >
              Selected work
            </motion.span>

            <motion.h2
              variants={fadeUp(0.18)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="font-display font-black tracking-tightest text-white leading-[1.05]"
              style={{
                fontSize: 'clamp(2rem,5vw,3rem)',
              }}
            >
              Products we&apos;ve
              <br />
              shipped.
            </motion.h2>
          </div>

          <motion.div
            variants={fadeUp(0.28)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border border-white/15 text-white/50 hover:text-white hover:border-white/30 font-body font-semibold text-sm px-5 py-3 rounded-pill transition-all duration-300 hover:-translate-y-0.5"
            >
              View all projects
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {featured.map((project, i) => (
            <motion.article
              key={i}
              variants={cardVariant(0.4 + i * 0.14)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              whileHover={{
                y: -8,
                transition: {
                  duration: 0.3,
                },
              }}
              className="card-lift rounded-xl overflow-hidden cursor-pointer group"
            >
              {/* Visual */}
              <div
                className="relative h-52 sm:h-56 flex items-center justify-center p-6 overflow-hidden"
                style={{ background: project.bg }}
              >
                {/* Soft glow */}
                <div
                  className="absolute -right-16 -bottom-16 w-44 h-44 rounded-full pointer-events-none"
                  style={{
                    background: `${project.accent}20`,
                    filter: 'blur(40px)',
                  }}
                />

                <div className="relative text-center select-none">
                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={
                      inView
                        ? {
                            opacity: 1,
                            y: 0,
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.6,
                      delay: 0.55 + i * 0.14,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-display font-black tracking-tightest leading-none mb-1"
                    style={{
                      color: project.accent,
                      fontSize: 'clamp(2rem,5vw,2.8rem)',
                    }}
                  >
                    {project.name.split(' ')[0]}
                  </motion.p>

                  <motion.p
                    initial={{
                      opacity: 0,
                    }}
                    animate={
                      inView
                        ? {
                            opacity: 1,
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.55,
                      delay: 0.62 + i * 0.14,
                    }}
                    className="font-display font-light text-xl text-white/30"
                  >
                    {project.name.split(' ').slice(1).join(' ')}
                  </motion.p>
                </div>

                {/* Arrow button — was <Link href={`/projects/${project.slug}`}> */}
                <a href={project.slug}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.name}`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
                  animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.72 + i * 0.14, ease: [0.34, 1.56, 0.64, 1] }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <ArrowUpRight size={14} />
                </motion.div>
                </a>

                <motion.span
                  initial={{
                    opacity: 0,
                  }}
                  animate={
                    inView
                      ? {
                          opacity: 1,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.66 + i * 0.14,
                  }}
                  className="absolute bottom-4 left-5 font-mono text-[10px] text-white/25 tracking-widest"
                >
                  {project.year}
                </motion.span>
              </div>

              {/* Info */}
              <div className="bg-[#181818] p-5">

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={
                    inView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.55,
                    delay: 0.74 + i * 0.14,
                  }}
                  className="font-display font-bold text-[15px] text-white mb-1"
                >
                  {project.name}
                </motion.p>

                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={
                    inView
                      ? {
                          opacity: 1,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.45,
                    delay: 0.8 + i * 0.14,
                  }}
                  className="font-body text-[12px] text-white/40 mb-4"
                >
                  {project.type}
                </motion.p>

                <div className="flex items-center justify-between">

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, index) => (
                      <motion.span
                        key={tag}
                        initial={{
                          opacity: 0,
                          y: 6,
                        }}
                        animate={
                          inView
                            ? {
                                opacity: 1,
                                y: 0,
                              }
                            : {}
                        }
                        transition={{
                          duration: 0.35,
                          delay:
                            0.85 +
                            i * 0.14 +
                            index * 0.04,
                        }}
                        className="font-mono text-[10px] text-white/30 border border-white/10 rounded-full px-2.5 py-1"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <motion.span
                    initial={{
                      opacity: 0,
                      x: 10,
                    }}
                    animate={
                      inView
                        ? {
                            opacity: 1,
                            x: 0,
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.45,
                      delay: 0.95 + i * 0.14,
                    }}
                    className="font-display font-bold text-[11px] ml-3 flex-shrink-0"
                    style={{
                      color: project.accent,
                    }}
                  >
                    {project.metric}
                  </motion.span>

                </div>
              </div>
            </motion.article>
          ))}

        </div>
      </div>
    </section>
  )
}