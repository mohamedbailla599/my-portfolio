import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Section({
  id,
  index,
  children,
  className,
  innerClassName,
}: {
  id: string
  index: string
  children: ReactNode
  className?: string
  innerClassName?: string
}) {
  return (
    <section
      id={id}
      className={cn('relative overflow-x-clip border-t border-line py-20 sm:py-28', className)}
    >
      <div
        className={cn(
          'relative mx-auto max-w-[1320px] px-5 sm:px-8 xl:pl-28 xl:pr-10',
          innerClassName,
        )}
      >
        <div
          aria-hidden="true"
          className="absolute left-8 top-1 hidden flex-col items-start gap-3 xl:flex"
        >
          <span className="font-mono text-sm text-electric">{index}</span>
          <span className="h-24 w-px bg-gradient-to-b from-electric/60 to-transparent" />
        </div>
        {children}
      </div>
    </section>
  )
}

export function SectionLabel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        'font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-electric',
        className,
      )}
    >
      <span aria-hidden="true" className="mr-2 opacity-60">
        //
      </span>
      {children}
    </p>
  )
}
