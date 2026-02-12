import React from "react"
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Lora } from 'next/font/google'

import './globals.css'

const _playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})
const _lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
})

export const metadata: Metadata = {
  title: 'Our Love Story',
  description: 'A digital love diary — from a classroom in 11th standard to forever.',
}

export const viewport: Viewport = {
  themeColor: '#d4727a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-serif antialiased">{children}</body>
    </html>
  )
}
