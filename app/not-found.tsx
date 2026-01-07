'use client'
// app/not-found.tsx

import Link from 'next/link'
import { Home, Search, RefreshCw } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-black px-4">
      <div className="text-center max-w-2xl">
        {/* Animated 404 */}
        <div className="relative mb-12">
          <div className="text-9xl font-bold text-cyan-400 opacity-20">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Page Not Found
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-4xl font-bold mb-6">
          Oops! This KIKO seems to have wandered off...
        </h1>
        <p className="text-gray-400 text-xl mb-10 max-w-lg mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Don't worry, our AI is already searching for it!
        </p>

        {/* Animated robot graphic */}
        <div className="mb-12">
          <div className="relative w-48 h-48 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
            <div className="absolute inset-8 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full animate-pulse delay-300"></div>
            <div className="absolute inset-16 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full animate-pulse delay-700"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-5xl">🤖</div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>
          <Link
            href="/product"
            className="border-2 border-gray-700 hover:border-cyan-400 text-gray-300 hover:text-cyan-400 font-semibold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Search className="w-5 h-5" />
            Explore KIKO
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="border-2 border-gray-700 hover:border-gray-500 text-gray-300 hover:text-gray-200 font-semibold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </div>

        {/* Helpful links */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-500 mb-4">Or try these pages:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/features" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Features
            </Link>
            <Link href="/about" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Contact
            </Link>
            <Link href="/community" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}