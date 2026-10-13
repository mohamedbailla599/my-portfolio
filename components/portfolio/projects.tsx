'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Trophy, X } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import { profile, projects, type Project } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import { ProjectIllustration } from './project-illustrations'
import { Reveal } from './reveal'
import { Section, SectionLabel } from './section'

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: (project: Project) => void
}) {
  const visible = project.stack.slice(0, 4)
  const extra = project.stack.length - visible.length

  return (
    <article
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
        event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
      }}
      className="group relative flex w-[84%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-electric/50 sm:w-[380px] lg:w-[calc((100%-3rem)/3)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 [background:radial-gradient(320px_circle_at_var(--mx,50%)_var(--my,0%),rgba(40,123,255,0.14),transparent_70%)] group-hover:opacity-100"
      />

      <div className="relative aspect-[9/5] overflow-hidden border-b border-line bg-ink-2">
        <ProjectIllustration name={project.illustration} />
        <span className="absolute left-4 top-3 font-mono text-xs tracking-widest text-soft">
          {project.number}
        </span>
        {project.accolade && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-300/10 px-2.5 py-1 text-[11px] font-medium text-amber-200">
            <Trophy className="size-3" aria-hidden="true" />
            {project.accoladeBadge ?? project.accolade}
          </span>
        )}
      </div>

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-electric">
          {project.eyebrow}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight">{project.name}</h3>
        <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-soft">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${project.name} technologies`}>
          {visible.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[11px] text-fg/90"
            >
              {tech}
            </li>
          ))}
          {extra > 0 && (
            <li className="rounded-full border border-line px-2.5 py-1 text-[11px] text-soft">
              +{extra}
            </li>
          )}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="group/btn inline-flex min-h-10 items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-electric"
          >
            Project details
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
              aria-hidden="true"
            />
          </button>
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub (opens in a new tab)`}
              className="grid size-10 place-items-center rounded-full border border-line text-soft transition-colors hover:border-electric/60 hover:text-fg"
            >
              <FaGithub className="size-4" aria-hidden="true" />
            </a>
          ) : (
            <span className="text-[11px] text-soft">No public repo</span>
          )}
        </div>
      </div>
    </article>
  )
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
  }, [project])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose()
      }}
      aria-labelledby="project-dialog-title"
      className="m-auto w-[min(92vw,640px)] max-h-[88vh] overflow-y-auto rounded-2xl border border-line bg-surface p-0 text-fg shadow-[0_0_80px_rgba(40,123,255,0.18)]"
    >
      {project && (
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-electric">
                {project.number} · {project.eyebrow}
              </p>
              <h3 id="project-dialog-title" className="mt-2 text-2xl font-semibold tracking-tight">
                {project.name}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-soft hover:text-fg"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-electric/40 bg-electric/10 px-3 py-1 text-xs text-[#9cc4ff]">
              {project.status}
            </span>
            {project.accolade && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs text-amber-200">
                <Trophy className="size-3" aria-hidden="true" />
                {project.accolade}
              </span>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-soft">{project.description}</p>

          <h4 className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-fg/70">
            Highlights
          </h4>
          <ul className="mt-3 space-y-2.5">
            {project.highlights.map((line) => (
              <li key={line} className="flex gap-3 text-sm leading-relaxed text-fg/90">
                <span aria-hidden="true" className="bg-brand-gradient mt-2 size-1.5 shrink-0 rounded-full" />
                {line}
              </li>
            ))}
          </ul>

          <h4 className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-fg/70">
            Stack
          </h4>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-xs"
              >
                {tech}
              </li>
            ))}
          </ul>

          {project.note && (
            <p className="mt-6 rounded-xl border border-line bg-white/[0.03] p-4 text-sm leading-relaxed text-soft">
              {project.note}
            </p>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-ink"
            >
              <FaGithub className="size-4" aria-hidden="true" />
              View repository
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </dialog>
  )
}

export function Projects() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<Project | null>(null)
  const [progress, setProgress] = useState({ left: 0, width: 100 })
  const [edges, setEdges] = useState({ start: true, end: false })

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const ratio = el.clientWidth / el.scrollWidth
    setProgress({
      left: max > 0 ? (el.scrollLeft / el.scrollWidth) * 100 : 0,
      width: ratio * 100,
    })
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 })
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('article')
    const step = card ? card.getBoundingClientRect().width + 24 : 380
    el.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <Section id="projects" index="02" className="section-glow">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-12">
        <Reveal>
          <SectionLabel>02 / Featured projects</SectionLabel>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            Projects that make an <span className="text-gradient">impact.</span>
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-soft">
            A selection of backend, full-stack and AI projects — from distributed systems
            to computer vision and a hackathon-winning prototype.
          </p>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-full border border-line bg-white/[0.03] px-5 text-sm transition-colors hover:border-electric/60"
          >
            View all on GitHub
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal delay={0.1} className="min-w-0">
          <div
            ref={trackRef}
            onScroll={update}
            tabIndex={0}
            role="region"
            aria-label="Featured projects, scrollable"
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0"
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={setSelected} />
            ))}
          </div>

          <div className="mt-6 flex items-center gap-6">
            <div className="relative h-px flex-1 bg-line" aria-hidden="true">
              <span
                className="bg-brand-gradient absolute -top-px h-[3px] rounded-full transition-[left,width] duration-300"
                style={{ left: `${progress.left}%`, width: `${progress.width}%` }}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={edges.start}
                aria-label="Previous project"
                className={cn(
                  'grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-electric/60',
                  edges.start && 'cursor-not-allowed opacity-40',
                )}
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={edges.end}
                aria-label="Next project"
                className={cn(
                  'grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-electric/60',
                  edges.end && 'cursor-not-allowed opacity-40',
                )}
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </Section>
  )
}
