'use client'

import { useId } from 'react'

export function Monogram({
  className,
  strokeWidth = 5.5,
}: {
  className?: string
  strokeWidth?: number
}) {
  const id = useId()
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={id} x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4C93FF" />
          <stop offset="1" stopColor="#9A5CFF" />
        </linearGradient>
      </defs>
      <path
        d="M9 38V10l15 18 15-18v28"
        stroke={`url(#${id})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="38" r="2.2" fill="#B8D4FF" opacity="0.9" />
    </svg>
  )
}
