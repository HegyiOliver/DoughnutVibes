import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Doughnut Vibes - Sweet Match-3 Game',
  description: 'A delicious candy-crush clone game featuring colorful doughnuts!',
  keywords: ['game', 'match-3', 'doughnut', 'puzzle', 'candy crush'],
  authors: [{ name: 'DoughnutVibes Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#0192db',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/pics/doughnut_blue.png" as="image" />
        <link rel="preload" href="/pics/doughnut_golden.png" as="image" />
        <link rel="preload" href="/pics/doughnut_vanilla.png" as="image" />
        <link rel="preload" href="/sensenet-logo.svg" as="image" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-game-bg">
          {children}
        </div>
      </body>
    </html>
  )
}
