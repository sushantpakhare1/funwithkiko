// components/FeedbackForm.tsx
'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Lightbulb, ThumbsUp } from 'lucide-react'

interface FeedbackFormProps {
  onSuccess?: () => void
}

export default function FeedbackForm({ onSuccess }: FeedbackFormProps) {
  const [formData, setFormData] = useState({
    feature: '',
    description: '',
    urgency: 'medium',
    contactEmail: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const featureCategories = [
    'AI Capabilities',
    'Hardware Improvements',
    'Mobile App Features',
    'Home Integration',
    'Battery Life',
    'Design & Aesthetics',
    'Voice Commands',
    'Safety Features',
    'Other'
  ]

  const urgencyOptions = [
    { value: 'low', label: 'Nice to have', color: 'bg-gray-500' },
    { value: 'medium', label: 'Important', color: 'bg-blue-500' },
    { value: 'high', label: 'Critical', color: 'bg-orange-500' },
    { value: 'critical', label: 'Must have', color: 'bg-red-500' }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.feature.trim() || !formData.description.trim()) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit feedback')
      }

      // Success
      setSuccess(true)
      setFormData({
        feature: '',
        description: '',
        urgency: 'medium',
        contactEmail: ''
      })
      
      if (onSuccess) onSuccess()
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false)
      }, 5000)

    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      console.error('Feedback submission error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-green-400 mb-4">Thank You!</h3>
        <p className="text-gray-300 mb-2">
          Your feedback has been sent to the KIKO team.
        </p>
        <p className="text-gray-400">
          We'll review your suggestion for future updates.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 text-cyan-400 hover:text-cyan-300 text-sm"
        >
          Submit another idea
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex p-3 bg-cyan-500/10 rounded-xl mb-4">
          <Lightbulb className="w-8 h-8 text-cyan-400" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Help Us Improve KIKO</h3>
        <p className="text-gray-400">
          What feature would you love to see in the next edition?
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Feature Category */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Feature Category *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {featureCategories.map((category) => (
            <label
              key={category}
              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                formData.feature === category
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
              }`}
            >
              <input
                type="radio"
                name="feature"
                value={category}
                checked={formData.feature === category}
                onChange={handleChange}
                className="w-4 h-4 text-cyan-500 bg-gray-800 border-gray-700"
                required
              />
              <span className="text-gray-300">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Describe your feature idea *
          <span className="text-gray-500 text-sm ml-2">(Be as detailed as possible)</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
          placeholder="Example: I'd love if KIKO could recognize family members and adapt its behavior accordingly..."
          required
        />
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-500">
            Minimum 20 characters
          </span>
          <span className={`text-sm ${
            formData.description.length < 20 ? 'text-gray-500' : 'text-green-400'
          }`}>
            {formData.description.length}/500
          </span>
        </div>
      </div>

      {/* Urgency */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          How important is this feature to you?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {urgencyOptions.map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                formData.urgency === option.value
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
              }`}
            >
              <input
                type="radio"
                name="urgency"
                value={option.value}
                checked={formData.urgency === option.value}
                onChange={handleChange}
                className="w-4 h-4 text-cyan-500 bg-gray-800 border-gray-700"
              />
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${option.color}`}></div>
                <span className="text-gray-300">{option.label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Contact Email (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Your Email (Optional)
          <span className="text-gray-500 text-sm ml-2">We'll notify you if this feature gets implemented</span>
        </label>
        <input
          type="email"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          placeholder="your.email@example.com"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading || !formData.feature || !formData.description || formData.description.length < 20}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Sending Your Idea...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Feedback to KIKO Team
            </>
          )}
        </button>
        
        <div className="text-center mt-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <ThumbsUp className="w-4 h-4" />
            Your feedback directly influences our roadmap
          </div>
        </div>
      </div>
    </form>
  )
}