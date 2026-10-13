'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Code2, Download, Layers, Rocket, Target, Users, type LucideIcon } from 'lucide-react'
import { profile, strengths, type StrengthIconKey } from '@/lib/portfolio-data'
import { Reveal } from './reveal'
import { Section, SectionLabel } from './section'

const strengthIcons: Record<StrengthIconKey, LucideIcon> = {
  layers: Layers,
  target: Target,
  rocket: Rocket,
  users: Users,
}

export function About() {
  const frameRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  })
  const orbY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30])

  return (
    <Section id="about" index="03" className="section-glow">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
        <Reveal>
          <SectionLabel>03 / About me</SectionLabel>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            A curious mind turning ideas into{' '}
            <span className="text-gradient">real-world solutions.</span>
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-soft sm:text-lg">
            I&apos;m Mohamed, a Master&apos;s student in Software Engineering at Université
            Ibn Zohr. I enjoy building backend systems, full-stack applications, and
            practical AI-powered tools — from microservices and observability to
            computer vision and generative-AI features.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {strengths.map((item) => {
              const Icon = strengthIcons[item.icon]
              return (
                <li
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-line bg-white/[0.025] p-4 transition-colors duration-300 hover:border-electric/40"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-ink-2 text-[#8db8ff]">
                    <Icon className="size-4.5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-sm font-medium">{item.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-soft">{item.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href={profile.cv}
              download
              className="bg-brand-gradient inline-flex h-12 items-center gap-3 rounded-full px-6 text-sm font-medium shadow-[0_8px_30px_-8px_rgba(40,123,255,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Download CV
              <Download className="size-4" aria-hidden="true" />
            </a>
            <dl className="flex gap-6 text-sm">
              {profile.languages.map((lang) => (
                <div key={lang.name}>
                  <dt className="text-fg">{lang.name}</dt>
                  <dd className="text-xs text-soft">{lang.level}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal delay={0.15} y={32}>
          <div ref={frameRef} className="relative mx-auto w-full max-w-[460px] px-4 py-8 sm:px-8">
            <motion.div
              aria-hidden="true"
              style={{ y: orbY }}
              className="pointer-events-none absolute -right-2 top-14 z-20 size-9 rounded-full bg-[radial-gradient(circle_at_32%_28%,#e1c8ff_0%,#9a5cff_32%,#5a1fd0_70%,#1d0a55_100%)] shadow-[0_0_28px_rgba(130,61,255,0.7)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[-10%] top-[22%] h-[56%] -rotate-[14deg] rounded-[50%] border border-electric/40 shadow-[0_0_30px_rgba(40,123,255,0.25)]"
            />
            <div className="relative -rotate-3 rounded-[28px] bg-gradient-to-br from-electric/70 via-electric/10 to-violet/70 p-px shadow-[0_30px_80px_-20px_rgba(40,123,255,0.45)] transition-transform duration-700 hover:rotate-0">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[27px] bg-ink-2">
                <Image
                  src={profile.portrait}
                  alt="Portrait of Mohamed Bailla"
                  fill
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover object-[50%_20%]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-electric/10"
                />
              </div>
            </div>

            <div className="absolute -left-1 top-2 z-10 flex items-center gap-2.5 rounded-2xl border border-line bg-ink/80 px-3.5 py-2.5 backdrop-blur-md sm:-left-4">
              <span className="grid size-8 place-items-center rounded-full border border-line text-[#8db8ff]">
                <Code2 className="size-4" aria-hidden="true" />
              </span>
              <span className="text-xs leading-tight">
                Software
                <br />
                Engineering
              </span>
            </div>

            <div className="absolute -bottom-1 right-0 z-10 max-w-[250px] rounded-2xl border border-line bg-ink/85 p-3.5 backdrop-blur-md sm:-right-4">
              <p className="flex items-center gap-2 text-sm font-medium">
                <span className="relative flex size-2" aria-hidden="true">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                Open to opportunities
              </p>
              <p className="mt-1 text-xs leading-snug text-soft">
                Looking for a 6-month PFE internship starting January 2027.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
