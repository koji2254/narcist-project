import { ref } from 'vue'

export const role = ref<string | null>(null)

export const loadRole = () => {
  if (import.meta.client) {
    const stored = localStorage.getItem('user_info')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        role.value = parsed?.role || null
      } catch (e) {
        console.error('Invalid JSON in localStorage:', e)
      }
    }
  }
}
