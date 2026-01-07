// components/SimpleFooter.tsx
import Link from 'next/link'

export default function SimpleFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and Copyright */}
          <div className="text-center md:text-left">
            <Link href="/" className="text-xl font-bold inline-block mb-2">
              KIKO<span className="text-cyan-400">.AI</span>
            </Link>
            <p className="text-gray-400 text-sm">
              © {currentYear} KIKO Robotics. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
              Contact
            </Link>
            <Link href="/community" className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
              Community
            </Link>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}