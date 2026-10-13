import { ArrowUpRight, Download, Mail } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { profile } from '@/lib/portfolio-data'
import { Reveal } from './reveal'
import { Section, SectionLabel } from './section'

const links = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: Mail,
    external: false,
  },
  {
    label: 'LinkedIn',
    value: 'mohamed-bailla',
    href: profile.linkedin,
    Icon: FaLinkedinIn,
    external: true,
  },
  {
    label: 'GitHub',
    value: 'mohamedbailla599',
    href: profile.github,
    Icon: FaGithub,
    external: true,
  },
]

export function Contact() {
  return (
    <Section id="contact" index="06" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[20%] -top-[30%] size-[900px] rounded-full border border-electric/20 bg-[radial-gradient(closest-side,rgba(130,61,255,0.18),rgba(40,123,255,0.08)_55%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-72 w-[80%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(40,123,255,0.16),transparent_70%)]"
      />

      <div className="relative grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
        <Reveal>
          <SectionLabel>06 / Contact</SectionLabel>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
            Let&apos;s build something{' '}
            <span className="text-gradient">meaningful together.</span>
          </h2>
          <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-soft sm:text-lg">
            I&apos;m looking for a 6-month PFE internship starting January 2027, and I&apos;m
            always open to discussing interesting projects, collaborations, or just a chat
            about technology.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-white px-6 text-sm font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              Send an email
              <ArrowUpRight
                className="size-4 text-electric transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <ul className="space-y-3">
            {links.map(({ label, value, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-surface/90 p-4 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-electric/50 sm:p-5"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line bg-ink-2 text-[#8db8ff]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-soft">{label}</span>
                    <span className="block truncate text-sm font-medium sm:text-base">
                      {value}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                    aria-hidden="true"
                  />
                  {external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
