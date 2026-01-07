// components/CommunitySlider.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Users, MessageSquare, Trophy, Zap } from 'lucide-react'

export default function CommunitySlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const communitySlides = [
    {
      id: 1,
      title: 'Weekly Live Events',
      description: 'Join our Tuesday tech talks and Thursday Q&A sessions with robotics experts.',
      icon: <MessageSquare className="w-8 h-8" />,
      image: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20',
      members: '250+ attendees weekly',
      stat: 'Live'
    },
    {
      id: 2,
      title: 'Project Showcase',
      description: 'See incredible projects from community members worldwide.',
      icon: <Zap className="w-8 h-8" />,
      image: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
      members: '1,200+ projects',
      stat: 'Featured'
    },
    {
      id: 3,
      title: 'Innovation Challenges',
      description: 'Compete in monthly hackathons and win exclusive KIKO accessories.',
      icon: <Trophy className="w-8 h-8" />,
      image: 'bg-gradient-to-br from-orange-500/20 to-red-500/20',
      members: '45 countries',
      stat: 'Active'
    },
    {
      id: 4,
      title: 'Founder Network',
      description: 'Connect directly with KIKO founders and early adopters.',
      icon: <Users className="w-8 h-8" />,
      image: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
      members: '2,500+ members',
      stat: 'Growing'
    }
  ]

  // Auto-rotate slides
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % communitySlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, communitySlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % communitySlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + communitySlides.length) % communitySlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-semibold mb-6">
            <Users className="w-4 h-4" />
            Join Our Community
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Be Part of the <span className="text-cyan-400">KIKO</span> Revolution
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Connect with innovators, share experiences, and help shape the future of personal robotics.
          </p>
        </div>

        {/* Main Slider Container */}
        <div className="relative">
          {/* Slider Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-cyan-400 hover:border-cyan-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-cyan-400 hover:border-cyan-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slider Content */}
          <div className="overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-950/50">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {communitySlides.map((slide) => (
                <div key={slide.id} className="w-full flex-shrink-0">
                  <div className="grid lg:grid-cols-2 min-h-[500px]">
                    {/* Left - Visual Area */}
                    <div className={`relative ${slide.image} p-12 flex items-center justify-center`}>
                      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                      
                      {/* Animated background elements */}
                      <div className="absolute w-64 h-64 bg-gradient-to-r from-current to-transparent opacity-10 rounded-full blur-3xl"></div>
                      <div className="relative z-10 text-center">
                        <div className="inline-flex p-6 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl mb-8">
                          <div className="text-cyan-400">
                            {slide.icon}
                          </div>
                        </div>
                        <div className="inline-block px-6 py-3 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-full">
                          <span className="text-cyan-400 font-semibold">{slide.stat}</span>
                          <span className="text-gray-300 mx-2">•</span>
                          <span className="text-gray-300">{slide.members}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right - Content Area */}
                    <div className="p-12 flex flex-col justify-center">
                      <div className="mb-8">
                        <h3 className="text-3xl font-bold mb-6 leading-tight">
                          {slide.title}
                        </h3>
                        <p className="text-gray-300 text-lg">
                          {slide.description}
                        </p>
                      </div>

                      <div className="space-y-6">
                        {/* Community Stats */}
                        <div className="flex gap-6">
                          <div className="flex-1 bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                            <div className="text-2xl font-bold text-cyan-400 mb-1">2.5K+</div>
                            <div className="text-sm text-gray-400">Members</div>
                          </div>
                          <div className="flex-1 bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                            <div className="text-2xl font-bold text-cyan-400 mb-1">45+</div>
                            <div className="text-sm text-gray-400">Countries</div>
                          </div>
                          <div className="flex-1 bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                            <div className="text-2xl font-bold text-cyan-400 mb-1">Weekly</div>
                            <div className="text-sm text-gray-400">Events</div>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <Link
                          href="/community"
                          className="block w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-[1.02] text-center group"
                        >
                          <span className="flex items-center justify-center gap-3">
                            Join This Community
                            <span className="group-hover:translate-x-2 transition-transform">→</span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {communitySlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-cyan-500 w-10' 
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Secondary CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-6">
            Ready to connect with fellow innovators?
          </p>
          <Link
            href="/community"
            className="inline-flex items-center gap-3 border-2 border-gray-800 hover:border-cyan-400 text-gray-300 hover:text-cyan-400 font-semibold px-8 py-4 rounded-xl transition-all duration-300 group"
          >
            <Users className="w-5 h-5" />
            Explore Full Community Features
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}