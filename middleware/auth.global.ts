import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { jwtDecode } from 'jwt-decode'

export default defineNuxtRouteMiddleware((to, from) => {
  // console.log(`[Auth Middleware] Navigating to: ${to.path} from: ${from.path}, SSR: ${process.server}`)

  // Allow access to the homepage and login without authentication
  if (to.path === '/') {
    // console.log('[Auth Middleware] Public route allowed:', to.path)
    return
  }

  // Skip middleware logic on server-side; let client handle it
  if (process.server) {
    // console.log('[Auth Middleware] Running on server, skipping to client-side check')
    return
  }

  // Get the token from localStorage (client-side only)
  const token = localStorage.getItem('auth_token')
  // console.log('[Auth Middleware] Token:', token)

  // If no token exists, redirect to homepage
  if (!token) {
    // console.log('[Auth Middleware] No token found, redirecting to /')
    return window.location.replace('/')
  }

  try {
    // Decode the token to check expiration
    const decoded = jwtDecode(token)
    const currentTime = Math.floor(Date.now() / 1000)
    // console.log('[Auth Middleware] Decoded token:', decoded)
    // console.log('[Auth Middleware] Current time:', currentTime, 'Token exp:', decoded.exp)

    // Check if token is expired
    if (decoded.exp && decoded.exp < currentTime) {
      // console.log('[Auth Middleware] Token expired, clearing and redirecting to /')
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_info')
      return window.location.replace('/')
    }

    // Restrict admin routes based on role
    const userInfo = JSON.parse(localStorage.getItem('user_info') || '{}')
    const adminRoutes = ['/users']
    if (adminRoutes.includes(to.path) && userInfo.role !== 'admin') {
      // console.log('[Auth Middleware] Non-admin accessing admin route, redirecting to /dashboard')
      return window.location.replace('/dashboard')
    }

    // console.log('[Auth Middleware] Access granted to:', to.path)
  } catch (error) {
    // console.error('[Auth Middleware] Invalid token:', error)
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_info')
    return window.location.replace('/')
  }
})