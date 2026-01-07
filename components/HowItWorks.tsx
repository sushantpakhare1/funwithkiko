// components/HowItWorks.tsx
export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Explore & Customize",
      description: "Discover KIKO's features and customize your robot's initial personality settings."
    },
    {
      number: "02",
      title: "Secure Checkout",
      description: "Complete your purchase with our encrypted payment system and choose delivery options."
    },
    {
      number: "03",
      title: "Setup & Onboarding",
      description: "Follow our guided setup process with live support from our AI specialists."
    },
    {
      number: "04",
      title: "Enjoy & Evolve",
      description: "Watch your KIKO learn and adapt to your lifestyle with regular AI updates."
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How KIKO Transforms Your Life</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            A seamless journey from order to daily companionship
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 h-full">
                <div className="text-5xl font-bold text-cyan-400/30 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}