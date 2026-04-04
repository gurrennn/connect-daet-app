import React from 'react'

export function Card({ children, className = '', padding = 'md', shadow = 'md' }) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  }

  const classes = `
    bg-white rounded-2xl border border-gray-200
    ${paddingClasses[padding]}
    ${shadowClasses[shadow]}
    ${className}
  `

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  )
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
