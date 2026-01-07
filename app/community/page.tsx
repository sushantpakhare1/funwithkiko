// app/community/page.tsx
'use client'

import { useState } from 'react'
import { Users, MessageSquare, Video, Calendar, Trophy, Zap, Star, Award } from 'lucide-react'

export default function CommunityPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSubscribed(true)
    setEmail('')
    setLoading(false)
  }

  const events = [
    { date: 'January', time: '6 PM PST', title: 'Founder Q&A Session', icon: <MessageSquare /> },
    { date: 'February', time: '7 PM PST', title: 'AI & Robotics Showcase', icon: <Video /> },
    // { date: 'Monthly 1st Sat', time: '10 AM PST', title: 'Hardware Workshop', icon: <Zap /> },
    // { date: 'Monthly 3rd Wed', time: '5 PM PST', title: 'Community Hackathon', icon: <Trophy /> },
  ]

  const members = [
    { name: 'Alex Chen', role: 'Robotics Engineer', contribution: '125 posts' },
    { name: 'Sarah Johnson', role: 'AI Researcher', contribution: 'Early Adopter' },
    { name: 'Marcus Lee', role: 'Developer', contribution: 'Module Creator' },
    { name: 'Priya Sharma', role: 'Ethics Specialist', contribution: 'Community Leader' },
  ]

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-semibold mb-6">
            <Users className="w-4 h-4" />
            Join 2,500+ Innovators
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to the <span className="text-cyan-400">KIKO</span> Community
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Connect with fellow innovators, share experiences, and shape the future of human-robot interaction together.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: '2,500+', label: 'Community Members', icon: <Users /> },
            { value: '45+', label: 'Countries', icon: <Star /> },
            { value: 'Weekly', label: 'Live Events', icon: <Calendar /> },
            { value: '1,200+', label: 'Projects Shared', icon: <Award /> },
          ].map((stat, index) => (
            <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center">
              <div className="inline-flex p-3 bg-cyan-500/10 text-cyan-400 rounded-xl mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div>
            {/* Newsletter */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-3xl p-8 mb-12">
              <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
              <p className="text-gray-300 mb-6">
                Get weekly updates on new features, community events, and exclusive content.
              </p>
              
              {subscribed ? (
                <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6 text-center">
                  <div className="text-green-400 font-semibold mb-2">🎉 Successfully Subscribed!</div>
                  <p className="text-gray-300">Welcome to the KIKO community. Check your email for confirmation.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:border-cyan-500"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Subscribing...
                      </>
                    ) : (
                      'Join Newsletter'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Upcoming Events */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {events.map((event, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-900/30 rounded-xl hover:bg-gray-900/50 transition-colors">
                    <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-lg">
                      {event.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{event.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{event.date}</span>
                        <span>•</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-lg transition-colors">
                      RSVP
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            {/* Community Guidelines */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">Community Guidelines</h2>
              <div className="space-y-4">
                {[
                  '🤝 Respect all members and their opinions',
                  '🔒 Keep discussions safe and inclusive',
                  '💡 Share knowledge and help others',
                  '🚫 No spam or self-promotion',
                  '🤖 Keep content relevant to AI & robotics',
                  '📚 Cite sources when sharing information',
                ].map((guideline, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2.5"></div>
                    <span className="text-gray-300">{guideline}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Members */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">Featured Members</h2>
              <div className="space-y-4">
                {members.map((member, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-900/30 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-gray-400">{member.role}</p>
                    </div>
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-sm rounded-full">
                      {member.contribution}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Join Links */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://discord.gg/kiko" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-4 text-center transition-colors"
              >
                <div className="text-lg font-semibold mb-2">Discord</div>
                <div className="text-sm text-gray-400">Live chat & support</div>
              </a>
              <a
                href="https://github.com/kiko-robot" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-4 text-center transition-colors"
              >
                <div className="text-lg font-semibold mb-2">GitHub</div>
                <div className="text-sm text-gray-400">Open-source projects</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}