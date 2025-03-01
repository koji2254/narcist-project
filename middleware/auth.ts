export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  
  // Skip middleware for login page
  if (to.path === '/') {
    return
  }
  
  // Redirect to login if not authenticated
  if (!authStore.isAuthenticated) {
    return navigateTo('/')
  }
  
  // Redirect non-admin users from admin-only routes
  const adminRoutes = ['/users']
  if (adminRoutes.includes(to.path) && !authStore.isAdmin) {
    return navigateTo('/dashboard')
  }
})