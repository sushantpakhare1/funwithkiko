// app/privacy/page.tsx
export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-gray-400">
              When you contact us through our website, we collect your name, email address, 
              and message content to respond to your inquiry.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-400">
              We use your contact information solely to respond to your inquiries and provide 
              customer support. We do not sell or share your personal information with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
            <p className="text-gray-400">
              All form submissions are encrypted and stored securely. We use industry-standard 
              security measures to protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Contact Us</h2>
            <p className="text-gray-400">
              For privacy-related questions, contact us at{' '}
              <a href="mailto:privacy@kiko.ai" className="text-cyan-400 hover:text-cyan-300">
                privacy@kiko.ai
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}