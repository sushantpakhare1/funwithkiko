// components/FeatureCards.tsx
export default function FeatureCards() {
  const features = [
    {
      title: "Advanced Emotional AI",
      description: "KIKO understands and responds to human emotions with 99.8% accuracy, creating genuine connections.",
      icon: "🧠",
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Sleek Founder Design",
      description: "Exclusive matte black finish with cyan accents. Limited to 1,000 units worldwide.",
      icon: "🎨",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "24/7 Personal Assistant",
      description: "Manage schedules, control smart home devices, and provide real-time translations in 50+ languages.",
      icon: "🤖",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Future-Ready Hardware",
      description: "Modular components allow for continuous upgrades. Your KIKO evolves with technology.",
      icon: "⚡",
      color: "from-orange-500 to-red-500"
    }
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02] group"
        >
          <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6 text-3xl`}>
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
            {feature.title}
          </h3>
          <p className="text-gray-400">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  )
}