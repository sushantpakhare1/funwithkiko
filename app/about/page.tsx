// app/about/page.tsx
import { Award, Users, Globe, Heart } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description: "We push the boundaries of AI and robotics to create products that exceed expectations."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description: "Building a global community of innovators who believe in the power of human-AI collaboration."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Sustainability",
      description: "Ethical AI development with a commitment to environmental responsibility and privacy."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Empathy",
      description: "Creating technology that understands and enhances human emotions and connections."
    }
  ]

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Redefining <span className="text-cyan-400">Human-Robot</span> Interaction
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Founded in 2025, KIKO Robotics emerged from a simple idea: what if technology
            could understand us as deeply as we understand each other?
          </p>
        </div>
        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="inline-block px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-semibold mb-6">
              Our Origin
            </div>
            <h2 className="text-4xl font-bold mb-6">From Vision to Reality</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                What started as a research project at Stanford University evolved into a
                mission to create the world's first emotionally intelligent robot. Our
                founders, Dr. Elena Rodriguez and Dr. Kenji Tanaka, combined their
                expertise in neuroscience and robotics to develop KIKO's breakthrough AI.
              </p>
              <p className="text-gray-300">
                Today, we're a team of 150+ engineers, designers, and AI specialists
                dedicated to creating robots that don't just perform tasks, but understand
                and adapt to human needs.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative h-[400px] rounded-3xl overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Principles that guide every decision we make
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="inline-flex p-3 bg-cyan-500/10 text-cyan-400 rounded-xl mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Stats
        <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold mb-8">Making an Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">150+</div>
              <div className="text-gray-400">Team Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">24</div>
              <div className="text-gray-400">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">99.8%</div>
              <div className="text-gray-400">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">1,000</div>
              <div className="text-gray-400">Founder Editions</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}