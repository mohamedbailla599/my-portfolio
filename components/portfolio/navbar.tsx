'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import { Monogram } from './monogram'

function useActiveSection() {
  const [active, setActive] = useState<string>('home')

  useEffect(() => {
    const elements = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return active
}

export function Navbar() {
  const active = useActiveSection()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        scrolled || open
          ? 'border-b border-line bg-ink/80 backdrop-blur-md'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 sm:px-8 xl:px-10">
        <a
          href="#home"
          className="flex items-center gap-2.5 rounded-md"
          aria-label="Mohamed Bailla — back to top"
        >
          <Monogram className="size-8" />
          <span className="text-sm font-medium tracking-tight">Mohamed Bailla</span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.id
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative block px-4 py-2 text-[13px] transition-colors duration-300',
                      isActive ? 'text-fg' : 'text-soft hover:text-fg',
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-3 -bottom-[3px] h-px bg-gradient-to-r from-transparent via-electric to-transparent"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="group hidden items-center gap-3 rounded-full border border-line bg-white/[0.03] py-1 pl-4 pr-1 text-[13px] transition-colors hover:border-electric/50 sm:flex"
          >
            Let&apos;s Talk
            <span className="grid size-8 place-items-center rounded-full bg-white text-electric transition-transform duration-300 group-hover:rotate-12">
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </span>
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-ink/95 lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-[1320px] px-5 py-4 sm:px-8">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={cn(
                    'flex min-h-12 items-center justify-between border-b border-line/60 text-base',
                    active === link.id ? 'text-fg' : 'text-soft',
                  )}
                >
                  {link.label}
                  {active === link.id && (
                    <span className="size-1.5 rounded-full bg-electric" aria-hidden="true" />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="bg-brand-gradient mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full text-sm font-medium"
          >
            Let&apos;s Talk
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  )
}
