'use client'

import { useId, useMemo, useState } from 'react'
import { skillCategories, skillLevelLabels, type SkillLevel } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'
import { Section, SectionLabel } from './section'
import { TechIcon } from './tech-icon'

type Filter = 'all' | 'project' | 'learning'

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'project', label: 'Used in projects' },
  { id: 'learning', label: 'Courses & notions' },
]

const levelStyle: Record<SkillLevel, string> = {
  project: 'border-electric/40 bg-electric/10 text-[#9cc4ff]',
  courses: 'border-line bg-white/[0.04] text-soft',
  studied: 'border-line bg-white/[0.04] text-soft',
  notions: 'border-violet/40 bg-violet/10 text-[#c9a6ff]',
  tutorial: 'border-violet/40 bg-violet/10 text-[#c9a6ff]',
}

export function Skills() {
  const [filter, setFilter] = useState<Filter>('all')
  const groupId = useId()

  const categories = useMemo(
    () =>
      skillCategories
        .map((category) => ({
          ...category,
          skills: category.skills.filter((skill) =>
            filter === 'all'
              ? true
              : filter === 'project'
                ? skill.level === 'project'
                : skill.level !== 'project',
          ),
        }))
        .filter((category) => category.skills.length > 0),
    [filter],
  )

  return (
    <Section id="skills" index="04" className="section-glow">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <Reveal>
          <SectionLabel>04 / Skills</SectionLabel>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            Technologies I <span className="text-gradient">work with.</span>
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-soft">
            Each skill is labeled by how I&apos;ve used it — in a real project, in coursework, or
            as a first-contact notion — so the picture stays honest.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            role="group"
            aria-labelledby={groupId}
            className="inline-flex rounded-full border border-line bg-white/[0.03] p-1"
          >
            <span id={groupId} className="sr-only">
              Filter skills
            </span>
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
                className={cn(
                  'min-h-10 rounded-full px-4 text-[13px] transition-colors duration-300',
                  filter === item.id
                    ? 'bg-brand-gradient font-medium text-fg'
                    : 'text-soft hover:text-fg',
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-x-10 gap-y-12 lg:grid-cols-2">
        {categories.map((category, index) => (
          <Reveal
            key={category.id}
            delay={Math.min(index, 3) * 0.05}
            className={cn(category.wide && 'lg:col-span-2')}
          >
            <section aria-labelledby={`cat-${category.id}`}>
              <div className="flex items-center gap-4">
                <h3
                  id={`cat-${category.id}`}
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8db8ff]"
                >
                  {category.title}
                </h3>
                <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-line to-transparent" />
              </div>
              <ul
                className={cn(
                  'mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3',
                  category.wide ? 'lg:grid-cols-5 xl:grid-cols-6' : 'lg:grid-cols-3',
                )}
              >
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="group relative flex min-h-[104px] flex-col justify-between rounded-2xl border border-line bg-surface p-3.5 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-electric/50 hover:shadow-[0_12px_40px_-12px_rgba(40,123,255,0.45)]"
                  >
                    <TechIcon
                      name={skill.icon}
                      className="size-6 text-[#cfd8f5] transition-colors duration-300 group-hover:text-white"
                    />
                    <div className="mt-4">
                      <p className="text-[13px] font-medium leading-tight">{skill.name}</p>
                      <span
                        className={cn(
                          'mt-2 inline-block rounded-full border px-2 py-0.5 text-[10px] leading-4',
                          levelStyle[skill.level],
                        )}
                      >
                        {skill.level === 'courses' && skill.note
                          ? skill.note
                          : skillLevelLabels[skill.level]}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
