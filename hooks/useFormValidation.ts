// hooks/useFormValidation.ts
'use client'

import { useState, useCallback } from 'react'

interface ValidationRules {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | null
}

interface FormField {
  value: string
  rules?: ValidationRules
  error: string | null
  touched: boolean
}

export function useFormValidation(initialFields: Record<string, Omit<FormField, 'error' | 'touched'>>) {
  const [fields, setFields] = useState<Record<string, FormField>>(
    Object.entries(initialFields).reduce((acc, [key, field]) => ({
      ...acc,
      [key]: { ...field, error: null, touched: false }
    }), {})
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateField = useCallback((name: string, value: string): string | null => {
    const field = fields[name]
    if (!field.rules) return null

    const { required, minLength, maxLength, pattern, custom } = field.rules

    if (required && !value.trim()) {
      return 'This field is required'
    }

    if (minLength && value.length < minLength) {
      return `Must be at least ${minLength} characters`
    }

    if (maxLength && value.length > maxLength) {
      return `Must be less than ${maxLength} characters`
    }

    if (pattern && !pattern.test(value)) {
      return 'Invalid format'
    }

    if (custom) {
      return custom(value)
    }

    return null
  }, [fields])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)

    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        error,
        touched: true
      }
    }))
  }, [validateField])

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)

    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        error,
        touched: true
      }
    }))
  }, [validateField])

  const validateForm = useCallback((): boolean => {
    let isValid = true
    const updatedFields = { ...fields }

    Object.keys(updatedFields).forEach(name => {
      const error = validateField(name, updatedFields[name].value)
      if (error) {
        isValid = false
        updatedFields[name] = {
          ...updatedFields[name],
          error,
          touched: true
        }
      }
    })

    setFields(updatedFields)
    return isValid
  }, [fields, validateField])

  const resetForm = useCallback(() => {
    setFields(
      Object.entries(initialFields).reduce((acc, [key, field]) => ({
        ...acc,
        [key]: { ...field, error: null, touched: false }
      }), {})
    )
  }, [initialFields])

  const getFormData = useCallback(() => {
    return Object.entries(fields).reduce((acc, [key, field]) => ({
      ...acc,
      [key]: field.value
    }), {})
  }, [fields])

  return {
    fields,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    getFormData,
    hasErrors: Object.values(fields).some(field => field.error),
    allTouched: Object.values(fields).every(field => field.touched)
  }
}