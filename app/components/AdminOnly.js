'use client'

import { requireAdmin } from '../lib/admin-auth'

export const AdminOnly = ({ children, fallback = null }) => {
  // Check if user is admin
  if (!requireAdmin()) {
    return fallback
  }
  
  return children
}

export default AdminOnly
