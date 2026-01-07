// app/layout.tsx - WORKING VERSION
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Header from '@/components/Header'
import Footer from '@/components/SimpleFooter'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KIKO ROBOT | Founder Edition',
  description: 'Premium AI-powered robot for modern living',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en" className="dark">
        <body className={`${inter.className} bg-gray-950 text-gray-100`}>
          <Header />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}