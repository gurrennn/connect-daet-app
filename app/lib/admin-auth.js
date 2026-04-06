// Simple admin authentication check
export const isAdmin = () => {
  // For development - change this to test admin vs tourist access
  // Set to true for admin access, false for tourist access
  const isAdminUser = true // 🔧 CHANGE THIS: true = Admin, false = Tourist
  
  return isAdminUser
}

export const requireAdmin = () => {
  if (!isAdmin()) {
    // Redirect non-admin users to homepage
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
    return false
  }
  return true
}
