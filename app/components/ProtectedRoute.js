'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProtectedRoute({ children, requireAuth = true }) {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      // Check if user is logged in
      const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'
      const currentUser = localStorage.getItem('currentUser')
      
      const authenticated = isLoggedIn && currentUser
      
      setIsAuthenticated(authenticated)
      setIsChecking(false)

      if (requireAuth && !authenticated) {
        // Redirect to auth page if not logged in
        router.push('/auth')
      }
    }

    checkAuth()
  }, [router, requireAuth])

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return null // Will redirect
  }

  return children
}
