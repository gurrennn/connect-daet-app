'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from "../../components/ui/Card"
import Button from "../../components/ui/Button"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (!isLogin) {
        // Registration
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match')
          setLoading(false)
          return
        }
        
        // Get existing registered users
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
        
        // Check if email already exists
        if (existingUsers.find(u => u.email === formData.email)) {
          setError('Email already registered')
          setLoading(false)
          return
        }
        
        // Create new user
        const newUser = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.email === 'admin@connectdaet.com' ? 'admin' : 'user',
          registeredAt: new Date().toISOString(),
          status: 'pending' // Admin approval needed for regular users
        }
        
        // Store user
        existingUsers.push(newUser)
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers))
        
        // Auto-login for admin, show message for regular users
        if (newUser.role === 'admin') {
          // Set admin session
          localStorage.setItem('currentUser', JSON.stringify(newUser))
          sessionStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('userRole', 'admin')
          sessionStorage.setItem('isAdmin', 'true')
          
          setSuccess('Admin account created! Redirecting to analytics...')
          setTimeout(() => {
            router.push('/analytics')
          }, 1500)
        } else {
          setSuccess('Registration successful! Your account is pending admin approval.')
          setTimeout(() => {
            setIsLogin(true)
            setFormData({ email: '', password: '', name: '', confirmPassword: '' })
          }, 2000)
        }
      } else {
        // Login
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
        const user = registeredUsers.find(u => u.email === formData.email && u.password === formData.password)
        
        if (user) {
          // Check if user is approved (except admin)
          if (user.role !== 'admin' && user.status === 'pending') {
            setError('Your account is pending admin approval. Please contact the administrator.')
            setLoading(false)
            return
          }
          
          // Set user session
          localStorage.setItem('currentUser', JSON.stringify(user))
          sessionStorage.setItem('isLoggedIn', 'true')
          
          // Set admin role if applicable
          if (user.role === 'admin') {
            localStorage.setItem('userRole', 'admin')
            sessionStorage.setItem('isAdmin', 'true')
            router.push('/analytics')
          } else {
            // Regular users go to homepage
            router.push('/')
          }
        } else {
          setError('Invalid email or password')
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            🏛️ CONNECT-DAET
          </h2>
          <p className="text-gray-600">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900">
              {isLogin ? '🔐 Sign In' : '📝 Register'}
            </h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
                  {success}
                </div>
              )}

              {!isLogin && (
                <div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Confirm your password"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                      Processing...
                    </>
                  ) : (
                    isLogin ? '🔐 Sign In' : '📝 Register'
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError('')
                  setSuccess('')
                }}
                className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
              >
                {isLogin 
                  ? "Don't have an account? Register" 
                  : "Already have an account? Sign In"
                }
              </button>
            </div>

            {!isLogin && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
                <h4 className="text-sm font-medium text-blue-800 mb-2">📋 Registration Info:</h4>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Register as a regular user first</li>
                  <li>• Wait for admin approval</li>
                  <li>• Admin email: admin@connectdaet.com</li>
                  <li>• Default admin password: admin123</li>
                </ul>
              </div>
            )}

            {isLogin && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <h4 className="text-sm font-medium text-yellow-800 mb-2">🔐 Quick Access:</h4>
                <div className="text-sm text-yellow-600">
                  <p>Admin Login:</p>
                  <p>Email: admin@connectdaet.com</p>
                  <p>Password: admin123</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            🔒 Protected by CONNECT-DAET Security System
          </p>
        </div>
      </div>
    </div>
  )
}
