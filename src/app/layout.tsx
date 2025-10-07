import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DoughnutVibes - Sweet Match-3 Game',
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
      <body className={inter.className}>
        <div className="min-h-screen bg-game-bg">
          {children}
        </div>
      </body>
    </html>
  )
}
