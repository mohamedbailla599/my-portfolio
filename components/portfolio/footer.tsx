import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { navLinks, profile } from '@/lib/portfolio-data'
import { CurrentYear } from './current-year'
import { Monogram } from './monogram'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between xl:px-10">
        <div className="flex items-center gap-3">
          <Monogram className="size-8" />
          <div>
            <p className="text-sm font-medium">{profile.name}</p>
            <p className="text-xs text-soft">
              &copy; <CurrentYear /> · Built with Next.js
            </p>
          </div>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-soft">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="transition-colors hover:text-fg">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-2">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (opens in a new tab)"
            className="grid size-10 place-items-center rounded-full border border-line text-soft transition-colors hover:border-electric/60 hover:text-fg"
          >
            <FaLinkedinIn className="size-4" aria-hidden="true" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (opens in a new tab)"
            className="grid size-10 place-items-center rounded-full border border-line text-soft transition-colors hover:border-electric/60 hover:text-fg"
          >
            <FaGithub className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
