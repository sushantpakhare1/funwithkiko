// components/EnhancedContactForm.tsx
'use client'

import { Send, AlertCircle, CheckCircle } from 'lucide-react'
import { useFormValidation } from '@/hooks/useFormValidation'

interface EnhancedContactFormProps {
  onSubmit: (data: any) => Promise<void>
  isLoading?: boolean
  success?: boolean
}

export default function EnhancedContactForm({ 
  onSubmit, 
  isLoading = false,
  success = false 
}: EnhancedContactFormProps) {
  const {
    fields,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleBlur,
    validateForm,
    getFormData,
    hasErrors,
    allTouched
  } = useFormValidation({
    name: {
      value: '',
      rules: {
        required: true,
        minLength: 2,
        maxLength: 100
      }
    },
    email: {
      value: '',
      rules: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        custom: (value) => {
          if (!value.includes('@')) return 'Please enter a valid email'
          return null
        }
      }
    },
    subject: {
      value: '',
      rules: {
        required: true,
        minLength: 5,
        maxLength: 200
      }
    },
    message: {
      value: '',
      rules: {
        required: true,
        minLength: 10,
        maxLength: 5000
      }
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(getFormData())
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFieldStatus = (fieldName: string) => {
    const field = fields[fieldName]
    if (!field.touched) return 'idle'
    if (field.error) return 'error'
    if (field.value.trim() && !field.error) return 'success'
    return 'idle'
  }

  if (success) {
    return (
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-8">
        <div className="flex items-center gap-4">
          <CheckCircle className="w-12 h-12 text-green-400" />
          <div>
            <h3 className="text-xl font-semibold text-green-400 mb-2">Message Sent Successfully!</h3>
            <p className="text-gray-300">
              Thank you for contacting KIKO ROBOT. We'll get back to you within 24 hours.
              A confirmation email has been sent to your inbox.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={fields.name.value}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 bg-gray-900 border rounded-xl focus:outline-none focus:ring-1 transition-all ${
              getFieldStatus('name') === 'error' 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : getFieldStatus('name') === 'success'
                ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                : 'border-gray-800 focus:border-cyan-500 focus:ring-cyan-500'
            }`}
            placeholder="John Doe"
            disabled={isLoading || isSubmitting}
          />
          {fields.name.error && (
            <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              {fields.name.error}
            </div>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={fields.email.value}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 bg-gray-900 border rounded-xl focus:outline-none focus:ring-1 transition-all ${
              getFieldStatus('email') === 'error' 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : getFieldStatus('email') === 'success'
                ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                : 'border-gray-800 focus:border-cyan-500 focus:ring-cyan-500'
            }`}
            placeholder="john@example.com"
            disabled={isLoading || isSubmitting}
          />
          {fields.email.error && (
            <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              {fields.email.error}
            </div>
          )}
        </div>
      </div>

      {/* Subject Field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Subject *
        </label>
        <input
          type="text"
          name="subject"
          value={fields.subject.value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 bg-gray-900 border rounded-xl focus:outline-none focus:ring-1 transition-all ${
            getFieldStatus('subject') === 'error' 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
              : getFieldStatus('subject') === 'success'
              ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
              : 'border-gray-800 focus:border-cyan-500 focus:ring-cyan-500'
          }`}
          placeholder="How can we help you?"
          disabled={isLoading || isSubmitting}
        />
        {fields.subject.error && (
          <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            {fields.subject.error}
          </div>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Message *
        </label>
        <textarea
          name="message"
          value={fields.message.value}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={5}
          className={`w-full px-4 py-3 bg-gray-900 border rounded-xl focus:outline-none focus:ring-1 transition-all resize-none ${
            getFieldStatus('message') === 'error' 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
              : getFieldStatus('message') === 'success'
              ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
              : 'border-gray-800 focus:border-cyan-500 focus:ring-cyan-500'
          }`}
          placeholder="Tell us about your inquiry..."
          disabled={isLoading || isSubmitting}
        />
        {fields.message.error && (
          <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            {fields.message.error}
          </div>
        )}
        <div className="flex justify-between mt-2">
          <span className={`text-sm ${
            fields.message.error ? 'text-red-400' : 'text-gray-500'
          }`}>
            {fields.message.error || `${fields.message.value.length}/5000 characters`}
          </span>
          <span className="text-sm text-gray-500">
            {fields.message.value.length >= 10 ? '✓ Ready to send' : 'Minimum 10 characters'}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || isSubmitting || hasErrors || !allTouched}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
      >
        {isSubmitting || isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Sending Message...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </button>

      {/* Form Status */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          {!allTouched ? 'Fill in all fields to enable send button' : ''}
          {hasErrors ? 'Please fix errors before sending' : ''}
          {allTouched && !hasErrors ? '✓ All fields are valid' : ''}
        </p>
      </div>
    </form>
  )
}