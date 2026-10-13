import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Mohamed Bailla — Backend & Full-Stack Developer',
  description:
    'Portfolio of Mohamed Bailla, Master’s student in Software Engineering. Backend, full-stack and AI projects — seeking a 6-month PFE internship starting January 2027.',
  authors: [{ name: 'Mohamed Bailla' }],
  keywords: [
    'Mohamed Bailla',
    'portfolio',
    'software engineering',
    'Java',
    'Spring Boot',
    'React',
    'TypeScript',
    'PFE internship',
  ],
  openGraph: {
    title: 'Mohamed Bailla — Backend & Full-Stack Developer',
    description:
      'Backend, full-stack and AI projects. Seeking a 6-month PFE internship — January 2027.',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#05060B',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${geist.variable} ${geistMono.variable}`}>
      <body>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
