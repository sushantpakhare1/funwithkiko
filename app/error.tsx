// app/error.tsx
'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console or error tracking service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-black px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-gray-900/50 border border-red-500/30 rounded-3xl p-8 backdrop-blur-sm">
          {/* Error Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-red-500/20 rounded-xl">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Something went wrong</h1>
              <p className="text-gray-400">Our AI encountered an unexpected issue</p>
            </div>
          </div>

          {/* Error Details */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold">Error Details</h2>
              <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full">
                KIKO OS v2.0
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">Error Message</div>
                <div className="font-mono text-red-300 bg-gray-950 p-3 rounded-lg border border-gray-800">
                  {error.message || 'Unknown error occurred'}
                </div>
              </div>
              
              {error.digest && (
                <div>
                  <div className="text-sm text-gray-400 mb-1">Error Digest</div>
                  <div className="font-mono text-sm text-gray-300 bg-gray-950 p-3 rounded-lg border border-gray-800">
                    {error.digest}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* What Happened */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">What happened?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                <div className="text-cyan-400 font-semibold mb-2">Possible Causes</div>
                <ul className="text-gray-400 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-1.5"></div>
                    Temporary network interruption
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-1.5"></div>
                    Browser cache conflict
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-1.5"></div>
                    Unusual user interaction
                  </li>
                </ul>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                <div className="text-cyan-400 font-semibold mb-2">What We're Doing</div>
                <ul className="text-gray-400 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                    Logging the incident for analysis
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                    Notifying our AI maintenance team
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                    Working on a fix
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={reset}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            
            <Link
              href="/"
              className="flex-1 border-2 border-gray-700 hover:border-cyan-400 text-gray-300 hover:text-cyan-400 font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            
            <Link
              href="/contact"
              className="flex-1 border-2 border-gray-700 hover:border-gray-500 text-gray-300 hover:text-gray-200 font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Mail className="w-5 h-5" />
              Contact Support
            </Link>
          </div>

          {/* Technical Info */}
          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-500">
              Need immediate help? Email{' '}
              <a href="mailto:support@kiko.ai" className="text-cyan-400 hover:text-cyan-300">
                support@kiko.ai
              </a>
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Error ID: {Date.now().toString(36).toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}