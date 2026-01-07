// app/page.tsx - Updated Hero Section
import Image from 'next/image'
import Link from 'next/link'
import CommunitySlider from '@/components/CommunitySlider'
import FeedbackForm from '@/components/FeedbackForm'

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Real Image */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-block px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-semibold mb-4">
                  Founder Edition
                </span>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                  Meet <span className="text-cyan-400">KIKO</span>
                  <br />
                  Your AI Companion
                </h1>
                <p className="text-xl text-gray-400 mt-6 max-w-2xl">
                  The world's most advanced personal robot with emotional intelligence,
                  designed to enhance your daily life through seamless AI integration.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/product"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30"
                >
                  Buy Now - $1,499
                </Link>
                <Link
                  href="/features"
                  className="border-2 border-gray-700 hover:border-cyan-400 text-gray-300 hover:text-cyan-400 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300"
                >
                  Explore Features
                </Link>
              </div>
            </div>

            {/* REAL ROBOT IMAGE */}
            <div className="relative">
              <div className="relative h-[500px] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
                <Image
                  src="/images/robot-main.jpg"
                  alt="KIKO ROBOT - Founder Edition"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ... rest of your page */}

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose KIKO?</h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              More than just a robot – your intelligent partner for modern living
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🧠',
                title: 'Emotional Intelligence',
                description: 'KIKO understands and responds to human emotions with 99.8% accuracy.',
                gradient: 'from-cyan-500 to-blue-500'
              },
              {
                icon: '⚡',
                title: 'Always Learning',
                description: 'Adapts and evolves based on your preferences and daily routines.',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: '🛡️',
                title: 'Privacy First',
                description: 'Your data stays private. No cloud storage required for personal data.',
                gradient: 'from-green-500 to-emerald-500'
              }
            ].map((feature, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-3xl transform group-hover:scale-105 transition-transform duration-500"></div>
                <div className="relative p-8">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-3xl mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by Innovators</h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              See what early adopters are saying about their KIKO experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Alex Chen',
                role: 'AI Researcher',
                quote: 'KIKO has transformed how I interact with technology at home.',
                avatar: 'AC'
              },
              {
                name: 'Maria Rodriguez',
                role: 'Tech Entrepreneur',
                quote: 'The emotional intelligence is beyond anything I\'ve experienced.',
                avatar: 'MR'
              },
              {
                name: 'Dr. Kenji Tanaka',
                role: 'Robotics Professor',
                quote: 'A perfect blend of advanced AI and intuitive design.',
                avatar: 'KT'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CommunitySlider />

      


      <section className="py-20 px-4 bg-gradient-to-br from-gray-900/30 to-gray-950/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Shape the Future of KIKO</h2>
            <p className="text-gray-400 text-xl">
              Your ideas help us build a better robot. What features would you love to see?
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-full">
              <span className="text-cyan-400 text-sm">💡 All feedback sent to: kikorobotai@gmail.com</span>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-8 backdrop-blur-sm">
            <FeedbackForm />

            {/* Stats */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-cyan-400 mb-2">1,243</div>
                  <div className="text-sm text-gray-400">Suggestions Received</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400 mb-2">87</div>
                  <div className="text-sm text-gray-400">Features Implemented</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400 mb-2">24h</div>
                  <div className="text-sm text-gray-400">Avg. Response Time</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Features Added */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6 text-center">Recent Features from Community Feedback</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { feature: 'Multi-language Support', status: 'Live', votes: '1.2k' },
                { feature: 'Custom Voice Commands', status: 'Beta', votes: '890' },
                { feature: 'Advanced Gesture Control', status: 'In Development', votes: '540' },
              ].map((item, index) => (
                <div key={index} className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold">{item.feature}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                        item.status === 'Beta' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-purple-500/20 text-purple-400'
                      }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>❤️ {item.votes} votes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 border border-cyan-500/30 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Welcome KIKO Home?</h2>
            <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
              Join the future of human-robot interaction. Limited Founder Edition units available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/product"
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30"
              >
                Order Now - $1,499
              </Link>
              <Link
                href="/features"
                className="border-2 border-gray-700 hover:border-cyan-400 text-gray-300 hover:text-cyan-400 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300"
              >
                View Detailed Features
              </Link>
            </div>
            <p className="text-gray-500 mt-6 text-sm">
              Free worldwide shipping • 30-day return policy • Lifetime software updates
            </p>
          </div>
        </div>
      </section>
    </>
  )
}