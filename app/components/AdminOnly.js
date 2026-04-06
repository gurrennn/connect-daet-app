'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Real admin authentication check
const isAdminUser = () => {
  // Check if user has admin role in localStorage
  const userRole = localStorage.getItem('userRole')
  const isAdmin = userRole === 'admin'
  
  // Also check for admin session
  const adminSession = sessionStorage.getItem('isAdmin')
  
  return isAdmin || adminSession === 'true'
}

// Helper functions for admin authentication (for development/testing)
export const setAdminRole = (isAdmin = true) => {
  if (isAdmin) {
    localStorage.setItem('userRole', 'admin')
    sessionStorage.setItem('isAdmin', 'true')
  } else {
    localStorage.removeItem('userRole')
    sessionStorage.removeItem('isAdmin')
  }
}

export const isAdminLoggedIn = () => isAdminUser()

export default function AdminOnly({ children }) {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdmin = () => {
      const adminStatus = isAdminUser()
      setIsAdmin(adminStatus)
      setIsChecking(false)

      if (!adminStatus) {
        // Redirect non-admin users to homepage
        router.push('/')
      }
    }

    checkAdmin()
  }, [router])

  if (isChecking) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking permissions...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null // Will redirect
  }

  return children
}
