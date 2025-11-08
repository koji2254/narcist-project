<template>
  <Spinner v-if="isLoading" />

  <div class="container mx-auto px-4 py-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <header class="mb-8 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#0BAE3C]" viewBox="0 -960 960 960" fill="currentColor">
        <path d="m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/>
      </svg>
      <h1 class="text-2xl font-bold text-gray-900">Profile</h1>
    </header>

    <!-- Profile Card -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div class="flex items-start gap-4">
        <!-- Avatar placeholder -->
        <div class="bg-gray-200 border-2 border-dashed rounded-full w-20 h-20 flex-shrink-0"></div>

        <div class="flex-1">
          <h2 class="text-xl font-semibold text-gray-900">{{ userStats?.fullName ?? '-' }}</h2>
          <p class="text-sm text-gray-500 mt-1">IPSS Number: <span class="font-medium text-gray-700">{{ userStats?.ipssNumber ?? '-' }}</span></p>

          <div class="mt-3 space-y-2 text-sm">
            <div class="flex items-center gap-2 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+234 {{ formatPhone(userStats?.phoneNumber) }}</span>
            </div>

            <div class="flex items-center gap-2 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="capitalize">{{ userStats?.role ?? 'user' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Password Reset Card -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-medium text-gray-800 mb-5 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#0BAE3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Reset Password
      </h3>

      <form @submit.prevent="resetPassword" class="space-y-4">
        <!-- Old Password -->
        <div>
          <label for="old_password" class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
          <input
            id="old_password"
            v-model="old_password"
            type="password"
            required
            placeholder="Enter current password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0BAE3C] focus:border-transparent"
          />
        </div>

        <!-- New Password -->
        <div>
          <label for="new_password" class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <input
            id="new_password"
            v-model="new_password"
            type="password"
            required
            placeholder="At least 8 characters"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0BAE3C] focus:border-transparent"
          />
          <p v-if="new_password && new_password.length < 8" class="mt-1 text-xs text-red-600">Password must be 8+ characters</p>
        </div>

        <!-- Confirm Password -->
        <div>
          <label for="confirm_password" class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
          <input
            id="confirm_password"
            v-model="confirm_password"
            type="password"
            required
            placeholder="Repeat new password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0BAE3C] focus:border-transparent"
          />
          <p v-if="confirm_password && new_password !== confirm_password" class="mt-1 text-xs text-red-600">Passwords do not match</p>
        </div>

        <!-- Submit -->
        <div class="flex justify-end pt-3">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="inline-flex items-center px-5 py-2 bg-[#0BAE3C] text-white font-medium text-sm rounded-md hover:bg-[#0a9a34] focus:outline-none focus:ring-2 focus:ring-[#0BAE3C] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSubmitting ? 'Updating...' : 'Update Password' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { baseUrl } from '~/assets/proxy'
import Spinner from '~/components/Spinner.vue'

const isLoading = ref(true)
const isSubmitting = ref(false)
const userStats = ref(null)

const old_password = ref('')
const new_password = ref('')
const confirm_password = ref('')

// Format phone: 7055556666 → 705 555 6666
const formatPhone = (num) => {
  if (!num) return '-'
  const str = String(num)
  return `${str.slice(0, 3)} ${str.slice(3, 6)} ${str.slice(6)}`
}

// Fetch user profile
const getUserDash = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('auth_token')
    const { data } = await axios.get(`${baseUrl}/dashboard/user`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    userStats.value = data
  } catch (err) {
    console.error('Failed to load profile:', err)
    alert('Could not load profile. Please try again.')
  } finally {
    isLoading.value = false
  }
}

// Reset password
const resetPassword = async () => {
  // Validation
  if (new_password.value.length < 8) {
    alert('New password must be at least 8 characters.')
    return
  }
  if (new_password.value !== confirm_password.value) {
    alert('New passwords do not match.')
    return
  }

  isSubmitting.value = true
  try {
    const token = localStorage.getItem('auth_token')
    await axios.post(
      `${baseUrl}/auth/changePassword`,
      {
        oldPassword: old_password.value,
        newPassword: new_password.value
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    alert('Password updated successfully!')
    old_password.value = ''
    new_password.value = ''
    confirm_password.value = ''
  } catch (err) {
    const msg = err.response?.data?.error || 'Failed to update password.'
    alert(msg)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  getUserDash()
})
</script>
<style scoped>
/* No extra CSS needed — everything uses Tailwind */
</style>