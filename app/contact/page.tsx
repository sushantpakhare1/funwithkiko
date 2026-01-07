// app/contact/page.tsx
'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react'
import EnhancedContactForm from '@/components/EnhancedContactForm'

export default function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "kikoairobot@gmail.com",
      description: "For general inquiries and support"
    },
    // {
    //   icon: <Phone className="w-6 h-6" />,
    //   title: "Phone",
    //   value: "+1 (888) 555-KIKO",
    //   description: "Mon-Fri, 9AM-6PM PST"
    // },
    // {
    //   icon: <MapPin className="w-6 h-6" />,
    //   title: "Headquarters",
    //   value: "123 Innovation Blvd, San Francisco, CA 94107",
    //   description: "Visit by appointment only"
    // },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Response Time",
      value: "Within 24 hours",
      description: "For all customer inquiries"
    }
  ]

  const faqs = [
    {
      question: "What's included in the Founder Edition?",
      answer: "The Founder Edition includes, lifetime priority updates, direct access to our development team, and a unique serial number (1-1000)."
    },
    {
      question: "What is the delivery time?",
      answer: "Founder Edition units ship within 1-2 weeks after purchase. You'll receive tracking information as soon as your unit ships."
    },
    {
      question: "Can I upgrade my KIKO in the future?",
      answer: "Yes! The Founder Edition includes our annual hardware upgrade program. We'll notify you when new modules are available."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 7-day return policy for unopened units. Once activated, KIKO becomes personalized to you and cannot be returned for privacy reasons."
    }
  ]

  const handleSubmit = async (formData: any) => {
    setSubmitStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message. Please try again.')
      }

      setSubmitStatus('success')
      
      // Auto-reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)

    } catch (error: any) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')
      setErrorMessage(error.message || 'An unexpected error occurred. Please try again.')
      
      // Auto-clear error after 10 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
        setErrorMessage('')
      }, 10000)
    }
  }

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-semibold mb-6">
            <MessageSquare className="w-4 h-4" />
            Get in Touch
          </div>
          <h1 className="text-5xl font-bold mb-6">Contact KIKO ROBOT</h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Have questions about KIKO? Our team is here to help you make an informed decision
            about joining the future of human-robot interaction.
          </p>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="mb-8 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-1">Message Sent Successfully!</h3>
                <p className="text-gray-300">
                  Thank you for contacting KIKO ROBOT. We'll get back to you within 24 hours.
                  A confirmation email has been sent to your inbox.
                </p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-8 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-1">Error Sending Message</h3>
                <p className="text-gray-300">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info & FAQs */}
          <div className="space-y-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-cyan-400" />
                Contact Information
              </h2>
              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 p-6 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-cyan-500/30 transition-all duration-300 hover:scale-[1.02] group"
                  >
                    <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 group-hover:text-cyan-300 transition-colors">
                        {info.title}
                      </h3>
                      <p className="text-cyan-400 mb-1 font-medium">{info.value}</p>
                      <p className="text-sm text-gray-400">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 group"
                  >
                    <h3 className="font-semibold mb-3 text-lg group-hover:text-cyan-300 transition-colors">
                      {faq.question}
                    </h3>
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="grid grid-cols-3 gap-4">
                <a 
                  href="https://twitter.com/kikorobot" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105"
                >
                  <div className="font-medium mb-1">Twitter</div>
                  <div className="text-xs text-gray-400">Updates</div>
                </a>
                <a 
                  href="https://linkedin.com/company/kikorobot" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105"
                >
                  <div className="font-medium mb-1">LinkedIn</div>
                  <div className="text-xs text-gray-400">Careers</div>
                </a>
                <a 
                  href="/community" 
                  className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105"
                >
                  <div className="font-medium mb-1">Community</div>
                  <div className="text-xs">Join Now</div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
                <p className="text-gray-400">
                  Fill out the form below and we'll get back to you as soon as possible.
                  All fields marked with * are required.
                </p>
              </div>

              <EnhancedContactForm
                onSubmit={handleSubmit}
                isLoading={submitStatus === 'loading'}
                success={submitStatus === 'success'}
              />

              {/* Privacy Note */}
              <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p className="font-medium text-gray-300 mb-1">Your Privacy Matters</p>
                    <p>
                      We respect your privacy and will never share your information with third parties.
                      Your data is encrypted and stored securely. By submitting this form, you agree to our 
                      <a href="/privacy" className="text-cyan-400 hover:text-cyan-300 ml-1">Privacy Policy</a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time Info */}
            <div className="mt-8 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-xl">
                  <Clock className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Typical Response Time</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center justify-between">
                      <span>General Inquiries:</span>
                      <span className="text-cyan-400">24-48 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Technical Support:</span>
                      <span className="text-cyan-400">1-3 business days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sales Questions:</span>
                      <span className="text-cyan-400">Same day</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        {/* <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Visit Our Headquarters</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-3xl overflow-hidden">
            <div className="h-64 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <p className="text-gray-300">123 Innovation Blvd</p>
                <p className="text-gray-400">San Francisco, CA 94107</p>
                <p className="text-sm text-gray-500 mt-2">By appointment only</p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-800">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-cyan-400 font-semibold">Parking</div>
                  <div className="text-sm text-gray-400">Visitor parking available</div>
                </div>
                <div className="text-center">
                  <div className="text-cyan-400 font-semibold">Hours</div>
                  <div className="text-sm text-gray-400">Mon-Fri, 9AM-6PM PST</div>
                </div>
                <div className="text-center">
                  <div className="text-cyan-400 font-semibold">Tour</div>
                  <div className="text-sm text-gray-400">Schedule a facility tour</div>
                </div>
              </div>
            </div>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  )
}