import type { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/react"
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import GridBackground from '@/components/GridBackground'

export const metadata: Metadata = {
  title: 'Supern0va - Sunny\'s Portfolio',
  description: 'ik im bright :/',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} antialiased colorful-bg`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GridBackground />
          {children}
        </ThemeProvider>
        <Analytics/>
      </body>
    </html>
  )
}

