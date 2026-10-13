import { Briefcase, GraduationCap, Trophy, type LucideIcon } from 'lucide-react'
import { timeline, type TimelineEntry } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'
import { Section, SectionLabel } from './section'

const kindIcon: Record<TimelineEntry['kind'], LucideIcon> = {
  Education: GraduationCap,
  Experience: Briefcase,
  Achievement: Trophy,
}

export function Experience() {
  return (
    <Section id="experience" index="05" className="section-glow">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionLabel>05 / Experience</SectionLabel>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            My journey <span className="text-gradient">so far.</span>
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-soft">
            A timeline of my education, internship and key milestones along the way.
          </p>
        </Reveal>

        <ol className="relative space-y-5 border-l border-line pl-6 sm:pl-10">
          {timeline.map((entry, index) => {
            const Icon = kindIcon[entry.kind]
            return (
              <li key={entry.id} className="relative">
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute -left-[31px] top-7 size-3 rounded-full border-2 border-ink sm:-left-[47px]',
                    entry.current ? 'bg-brand-gradient shadow-[0_0_14px_rgba(40,123,255,0.9)]' : 'bg-[#3a4a8f]',
                  )}
                />
                <Reveal delay={index * 0.05}>
                  <article className="rounded-2xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-electric/40 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                      <div className="flex items-start gap-4">
                        <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-ink-2 text-[#8db8ff]">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="text-base font-medium leading-snug sm:text-lg">
                            {entry.title}
                          </h3>
                          <p className="mt-1 text-sm text-soft">{entry.place}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs tracking-wide text-soft">
                          {entry.period}
                        </span>
                        {entry.current && (
                          <span className="rounded-full border border-electric/50 bg-electric/15 px-2.5 py-0.5 text-[11px] text-[#9cc4ff]">
                            Present
                          </span>
                        )}
                      </div>
                    </div>
                    {entry.points && (
                      <ul className="mt-4 space-y-2 border-t border-line pt-4 sm:pl-[60px]">
                        {entry.points.map((point) => (
                          <li key={point} className="flex gap-3 text-sm leading-relaxed text-soft">
                            <span
                              aria-hidden="true"
                              className="mt-2 size-1 shrink-0 rounded-full bg-electric"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}
