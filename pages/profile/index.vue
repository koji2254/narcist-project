<template>
  <Spinner v-if="isLoading" />
  <div class="container mx-auto px-4 py-2 bg-white">
    <header class="mb-8">
      <h1 class="text-xl font-bold text-gray-700 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0BAE3C"><path d="m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg> 
        Profile
      </h1>
    </header>

    <div class="bg-white rounded-lg p-6">
      <div class="shadow p-3 mb-3 pb-6">
        <div v-if="userStats">
          <h2 class="font-bold py-1 text-xl">{{ userStats.fullName }}</h2>
          <h3 class="py-1">{{ userStats.email }}</h3>
          <h4 class="py-1">{{ userStats.phoneNumber ?? 'No phone provided' }}</h4>
        </div>
        <div class="flex justify-between w-full text-xs text-gray-600 py-2 bg-white">
          <div></div>
          <div class="hidden font-semibold">
            <button class="bg-green-700 p-2 text-white hover:bg-green-600">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div v-if="userStats">
          <div class="shadow p-3">
          <div>
              <h3 class="text-md flex items-center py-1">Password</h3> 
              <label for="old_password" class="block text-sm font-medium text-gray-900">
                Insert Old password
              </label>
              <div class="mt-2">
                <input
                  id="old_password"
                  v-model="old_password"
                  type="password"
                  placeholder="***********"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-600 sm:text-sm px-2"
                />
              </div>
          </div>
          <div class="mt-3"> 
              <label for="new_password" class="block text-sm font-medium text-gray-900">
                Insert new password
              </label>
              <div class="mt-2">
                <input
                  id="new_password"
                  v-model="new_password"
                  type="password"
                  placeholder="***********"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-600 sm:text-sm px-2"
                />
              </div>
          </div>
          <div class="mt-2">
              <label for="comfirm_password" class="block text-sm font-medium text-gray-900">
                Comfirm new password
              </label>
              <div class="mt-2">
                <input
                  id="comfirm_password"
                  v-model="comfirm_password"
                  type="password"
                  placeholder="***********"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-600 sm:text-sm px-2"
                />
              </div>
            </div>
            <div class="flex justify-end text-xs text-gray-600 py-2 mt-2 bg-white">
              <button 
                @click="resetPassword"
                class="bg-green-700 p-2 text-white hover:bg-green-600">
                Reset Password
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <p>Loading user stats...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { baseUrl } from '~/assets/proxy'
import Spinner from '~/components/Spinner.vue'
import axios from 'axios'

const router = useRouter()
const isLoading = ref(true)
const userStats = ref(null)
const old_password = ref('')
const new_password = ref('')
const comfirm_password = ref('')

// Get user profile info (name, email, phone, etc.)
const getUserDash = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(`${baseUrl}/dashboard/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    userStats.value = response.data

    console.log(response.data)
  } catch (error) {
    console.error('Error fetching user data:', error)
  } finally {
    isLoading.value = false
  }
}

// Optional: Remove or correct if not needed
const getUser = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(`${baseUrl}/auth/user/get-user-details`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log('Extra user info:', response.data)
  } catch (error) {
    console.error('Error fetching extra user info:', error)
  } finally {
    isLoading.value = false
  }
}

// Handle password reset
const resetPassword = async () => {
  // Comfirm old password to make sure it is correct 
  // if()

  // Check password to be more than 6 chars 
  if (!new_password.value || new_password.value.length < 8) {
    alert('Password must be at least 8 characters.')
    return
  }

  // Compare two password to see it match 
  if (new_password.value !== comfirm_password.value) {
    alert('Password do not match')
    return
  }

  isLoading.value = true
  try {
    const token = localStorage.getItem('auth_token')

    await axios.post(`${baseUrl}/auth/changePassword`, {
      oldPassword: old_password.value,
      newPassword: new_password.value
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    alert('Password updated successfully!')
    new_password.value = ''
  } catch (error) {
    console.error('Error resetting password:', error)
    alert('Failed to reset password.')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getUserDash()
  getUser() // Uncomment only if needed
})
</script>
