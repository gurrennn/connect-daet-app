// Quick Admin Access - Run this in browser console
// Go to http://localhost:3000 and paste this in console:

localStorage.setItem('userRole', 'admin');
sessionStorage.setItem('isAdmin', 'true');
window.location.href = '/analytics';

// This will give you instant admin access to the dashboard
