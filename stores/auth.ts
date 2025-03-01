import { defineStore } from 'pinia'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'worker'
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false
  }),
  
  actions: {
    async login(email: string, password: string) {
      // TODO: Implement actual API call
      this.user = {
        id: '1',
        name: 'John Doe',
        email,
        role: 'admin'
      }
      this.isAuthenticated = true
    },
    
    logout() {
      this.user = null
      this.isAuthenticated = false
      navigateTo('/auth/login')
    }
  },
  
  getters: {
    isAdmin: (state) => state.user?.role === 'admin'
  }
})