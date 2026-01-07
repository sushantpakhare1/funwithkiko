// app/features/page.tsx
export default function FeaturesPage() {
  const detailedFeatures = [
    {
      category: "AI Capabilities",
      icon: "🧠",
      color: "from-cyan-500 to-blue-500",
      items: [
        "Natural Language Processing with 99.8% accuracy",
        "Emotional Intelligence and empathy simulation",
        "Continuous learning from interactions",
        "Multi-language support (50+ languages)",
        "Context-aware conversations",
        "Personality customization"
      ]
    },
    {
      category: "Hardware Specifications",
      icon: "⚙️",
      color: "from-purple-500 to-pink-500",
      items: [
        "8-core Neural Processing Unit (8.2 TFLOPS)",
        "4K 360° camera array with night vision",
        "High-fidelity spatial audio system",
        "Tactile feedback sensors",
        "72-hour battery with wireless charging",
        "Modular expansion ports"
      ]
    },
    {
      category: "Smart Home Integration",
      icon: "🏠",
      color: "from-green-500 to-emerald-500",
      items: [
        "Compatible with Alexa, Google Home, Apple HomeKit",
        "Voice-controlled automation",
        "Energy consumption optimization",
        "Security monitoring and alerts",
        "Predictive maintenance suggestions",
        "Emergency response system"
      ]
    },
    {
      category: "Founder Edition Exclusives",
      icon: "👑",
      color: "from-orange-500 to-red-500",
      items: [
        "Limited serial numbering (1-1000)",
        "Premium matte black titanium finish",
        "Lifetime priority software updates",
        "Direct access to development team",
        "Annual hardware upgrade program",
        "Founder community membership"
      ]
    }
  ]

  const techSpecs = [
    { label: "Dimensions", value: "45cm × 30cm × 30cm" },
    { label: "Weight", value: "8.5 kg" },
    { label: "Battery Life", value: "72 hours (normal use)" },
    { label: "Charging Time", value: "3 hours (0-100%)" },
    { label: "Connectivity", value: "Wi-Fi 6E, Bluetooth 5.3, 5G" },
    { label: "Operating System", value: "KIKO OS v2.0" },
    { label: "Processor", value: "Custom NPU + Qualcomm Snapdragon" },
    { label: "Storage", value: "512GB SSD + cloud sync" }
  ]

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            KIKO ROBOT <span className="text-cyan-400">Features</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Discover the advanced technology and exclusive features that make KIKO
            the most sophisticated personal robot ever created.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {detailedFeatures.map((section, index) => (
            <div key={index} className="space-y-6">
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${section.color} text-3xl`}>
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{section.category}</h3>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Specifications */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Technical Specifications</h2>
            <p className="text-gray-400 text-xl">
              Engineered for performance and reliability
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techSpecs.map((spec, index) => (
              <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="text-sm text-gray-400 mb-2">{spec.label}</div>
                <div className="text-xl font-semibold">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-12">
            <h3 className="text-3xl font-bold mb-6">
              Ready to Experience the Future?
            </h3>
            <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
              Join the select group of innovators who will own the KIKO ROBOT Founder Edition.
              Only 1,000 units will ever be produced.
            </p>
            <a
              href="/product"
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30"
            >
              Reserve Your KIKO Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}