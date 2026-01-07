// components/Header.tsx
'use client'

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'KIKO', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Profile', href: '/profile' },
  ]

  return (
    <header className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight">
            KIKO<span className="text-cyan-400">.AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Auth & Buy Button */}
            <div className="flex items-center space-x-4">
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/product"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                >
                  Buy Now
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
                <Link
                  href="/product"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                >
                  Buy Now
                </Link>
              </SignedIn>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300"
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-300 hover:text-cyan-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-800 space-y-3">
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="block text-gray-300 hover:text-cyan-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </SignedOut>
              <Link
                href="/product"
                className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Buy Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}