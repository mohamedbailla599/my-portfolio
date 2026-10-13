'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { orbitBodies, type OrbitBody } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import { Monogram } from './monogram'

const VIEW_W = 1000
const VIEW_H = 800

function positionOf(body: OrbitBody, angle: number) {
  const a = body.phase + angle * body.speed
  const px = body.rx * Math.cos(a)
  const py = body.ry * Math.sin(a)
  const t = (body.tilt * Math.PI) / 180
  return {
    x: px * Math.cos(t) - py * Math.sin(t),
    y: px * Math.sin(t) + py * Math.cos(t),
  }
}

const sphereTone: Record<OrbitBody['tone'], string> = {
  blue: 'bg-[radial-gradient(circle_at_32%_28%,#a9d0ff_0%,#3f8bff_28%,#1b3fd6_62%,#0a0f4d_100%)] shadow-[0_0_28px_rgba(40,123,255,0.55),inset_0_0_14px_rgba(160,200,255,0.35)]',
  violet:
    'bg-[radial-gradient(circle_at_32%_28%,#e1c8ff_0%,#9a5cff_30%,#5a1fd0_64%,#1d0a55_100%)] shadow-[0_0_28px_rgba(130,61,255,0.55),inset_0_0_14px_rgba(220,190,255,0.35)]',
}

export function OrbitalScene() {
  const rootRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const coreRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const bodyRefs = useRef<Record<string, HTMLElement | null>>({})
  const pausedRef = useRef(false)
  const [active, setActive] = useState<OrbitBody | null>(null)

  const setHover = useCallback((body: OrbitBody | null) => {
    pausedRef.current = body !== null
    setActive(body)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = root.clientWidth
    let angle = 0
    let speedFactor = 1
    let last = performance.now()
    let raf = 0
    let visible = true
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }

    const paint = () => {
      const scale = width / VIEW_W
      for (const body of orbitBodies) {
        const el = bodyRefs.current[body.id]
        if (!el) continue
        const { x, y } = positionOf(body, angle)
        el.style.transform = `translate3d(${(x * scale).toFixed(2)}px, ${(y * scale).toFixed(2)}px, 0) translate(-50%, -50%)`
        el.style.opacity = '1'
      }
      if (layerRef.current)
        layerRef.current.style.transform = `translate3d(${pointer.x.toFixed(2)}px, ${pointer.y.toFixed(2)}px, 0)`
      if (coreRef.current)
        coreRef.current.style.transform = `translate3d(${(pointer.x * 0.45).toFixed(2)}px, ${(pointer.y * 0.45).toFixed(2)}px, 0)`
      if (glowRef.current)
        glowRef.current.style.transform = `translate3d(${(-pointer.x * 0.6).toFixed(2)}px, ${(-pointer.y * 0.6).toFixed(2)}px, 0)`
    }

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const target = pausedRef.current ? 0.1 : 1
      speedFactor += (target - speedFactor) * Math.min(1, dt * 4)
      angle += dt * speedFactor
      pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 4)
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 4)
      paint()
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (reduced || raf || !visible) return
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const resize = new ResizeObserver(() => {
      width = root.clientWidth
      paint()
    })
    resize.observe(root)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(root)

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || reduced) return
      const rect = root.getBoundingClientRect()
      pointer.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 26
      pointer.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 20
    }
    const onLeave = () => {
      pointer.tx = 0
      pointer.ty = 0
    }
    root.addEventListener('pointermove', onMove)
    root.addEventListener('pointerleave', onLeave)

    paint()
    start()

    return () => {
      stop()
      resize.disconnect()
      io.disconnect()
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  const labelled = orbitBodies.filter((body) => body.label)

  return (
    <div className="w-full">
      <div
        ref={rootRef}
        className="relative mx-auto w-full max-w-[820px]"
        style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
      >
        <div
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(closest-side,rgba(40,123,255,0.22),rgba(130,61,255,0.1)_55%,transparent_75%)]"
        />

        <div
          ref={coreRef}
          className="absolute left-1/2 top-1/2 w-[22%] -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{ aspectRatio: '1 / 1' }}
        >
          <div
            aria-hidden="true"
            className="animate-pulse-soft absolute -inset-[18%] rounded-full bg-[radial-gradient(closest-side,rgba(40,123,255,0.45),transparent_72%)]"
          />
          <div className="relative grid size-full place-items-center rounded-full border border-[#6aa8ff]/40 bg-[radial-gradient(circle_at_34%_28%,#6aa8ff_0%,#2a5bff_26%,#1a1fa8_58%,#080a3a_100%)] shadow-[0_0_80px_rgba(40,123,255,0.5),inset_0_0_50px_rgba(150,190,255,0.3)]">
            <div
              aria-hidden="true"
              className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.28),transparent_42%)]"
            />
            <Monogram className="relative size-[34%] drop-shadow-[0_0_14px_rgba(150,190,255,0.7)]" />
          </div>
        </div>

        <div ref={layerRef} className="absolute inset-0 will-change-transform">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="pointer-events-none absolute inset-0 size-full"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient id="orbit-stroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#4c93ff" stopOpacity="0.55" />
                <stop offset="0.5" stopColor="#4c93ff" stopOpacity="0.12" />
                <stop offset="1" stopColor="#9a5cff" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            {orbitBodies.slice(0, 5).map((body) => (
              <ellipse
                key={body.id}
                cx={VIEW_W / 2}
                cy={VIEW_H / 2}
                rx={body.rx}
                ry={body.ry}
                fill="none"
                stroke="url(#orbit-stroke)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                transform={`rotate(${body.tilt} ${VIEW_W / 2} ${VIEW_H / 2})`}
              />
            ))}
            {orbitBodies.slice(5).map((body) => (
              <ellipse
                key={body.id}
                cx={VIEW_W / 2}
                cy={VIEW_H / 2}
                rx={body.rx}
                ry={body.ry}
                fill="none"
                stroke="#6f8cff"
                strokeOpacity="0.14"
                strokeWidth="1"
                strokeDasharray="2 7"
                vectorEffect="non-scaling-stroke"
                transform={`rotate(${body.tilt} ${VIEW_W / 2} ${VIEW_H / 2})`}
              />
            ))}
          </svg>

          {orbitBodies.map((body) => {
            const sizePct = `${(body.size / VIEW_W) * 100}%`
            const decorative = !body.label
            const common = {
              ref: (el: HTMLElement | null) => {
                bodyRefs.current[body.id] = el
              },
              className: cn(
                'absolute left-1/2 top-1/2 opacity-0 will-change-transform',
                decorative ? 'max-sm:hidden' : 'group',
              ),
              style: { width: sizePct, aspectRatio: '1 / 1' },
            }

            if (decorative) {
              return (
                <span key={body.id} {...common} aria-hidden="true">
                  <span className={cn('block size-full rounded-full', sphereTone[body.tone])} />
                </span>
              )
            }

            return (
              <a
                key={body.id}
                {...common}
                href={body.href}
                aria-label={`${body.label} — ${body.sub}`}
                onPointerEnter={() => setHover(body)}
                onPointerLeave={() => setHover(null)}
                onFocus={() => setHover(body)}
                onBlur={() => setHover(null)}
              >
                <span
                  className={cn(
                    'block size-full rounded-full transition-transform duration-300 group-hover:scale-[1.18] group-focus-visible:scale-[1.18]',
                    sphereTone[body.tone],
                  )}
                />
                <span
                  className={cn(
                    'pointer-events-none absolute left-1/2 top-full mt-1.5 hidden w-max -translate-x-1/2 text-center transition-opacity duration-300 sm:block',
                    active && active.id !== body.id ? 'opacity-45' : 'opacity-100',
                  )}
                >
                  <span className="block text-[13px] font-medium leading-tight text-fg [text-shadow:0_1px_8px_#05060b]">
                    {body.label}
                  </span>
                  <span className="block text-[11px] leading-tight text-soft [text-shadow:0_1px_8px_#05060b]">
                    {body.sub}
                  </span>
                </span>
              </a>
            )
          })}
        </div>

      </div>

      <div className="mt-2 min-h-12 text-center sm:hidden" aria-live="polite">
        {active ? (
          <p className="text-sm text-soft">
            <span className="font-medium text-fg">{active.label}</span> · {active.sub}
          </p>
        ) : (
          <p className="inline-flex items-center gap-1 text-xs text-soft">
            Tap a planet to explore <ArrowUpRight className="size-3" aria-hidden="true" />
          </p>
        )}
      </div>
      <ul className="sr-only">
        {labelled.map((body) => (
          <li key={body.id}>
            {body.label}: {body.sub}
          </li>
        ))}
      </ul>
    </div>
  )
}
