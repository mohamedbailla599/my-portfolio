'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import { ArrowRight, Download } from 'lucide-react'
import { heroStats, profile } from '@/lib/portfolio-data'
import { OrbitalScene } from './orbital-scene'
import { SectionLabel } from './section'

export function Hero() {
  const reduce = useReducedMotion()

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.1 } },
  }
  const item: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section
      id="home"
      className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-32 lg:pt-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_72%_42%,rgba(40,123,255,0.14),transparent_70%),radial-gradient(35%_40%_at_95%_90%,rgba(130,61,255,0.14),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 xl:pl-28 xl:pr-10">
        <div
          aria-hidden="true"
          className="absolute left-8 top-1 hidden flex-col items-start gap-3 xl:flex"
        >
          <span className="font-mono text-sm text-electric">01</span>
          <span className="h-32 w-px bg-gradient-to-b from-electric/60 to-transparent" />
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-6">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <SectionLabel>01 / Software Developer</SectionLabel>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 text-balance text-[clamp(2.6rem,6.2vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
            >
              Building digital solutions{' '}
              <span className="text-gradient">for a better tomorrow.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-soft sm:text-lg"
            >
              I&apos;m Mohamed, a Master&apos;s student in Software Engineering building
              backend systems, full-stack applications, and AI-powered products that solve
              real problems.
            </motion.p>

            <motion.p
              variants={item}
              className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-[13px] text-fg"
            >
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availability}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="group inline-flex h-12 items-center gap-3 rounded-full bg-white px-6 text-sm font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                View My Work
                <ArrowRight
                  className="size-4 text-electric transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href={profile.cv}
                download
                className="inline-flex h-12 items-center gap-3 rounded-full border border-line bg-white/[0.03] px-6 text-sm font-medium transition-colors duration-300 hover:border-electric/60"
              >
                Download CV
                <Download className="size-4 text-soft" aria-hidden="true" />
              </a>
            </motion.div>

            <motion.dl
              variants={item}
              className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-line"
            >
              {heroStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col-reverse justify-end ${i === 0 ? 'pr-4' : 'px-4 sm:px-6'}`}
                >
                  <dt className="mt-1 text-xs leading-snug text-soft">{stat.label}</dt>
                  <dd className="whitespace-nowrap text-xl font-semibold tracking-tight sm:text-3xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <OrbitalScene />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
