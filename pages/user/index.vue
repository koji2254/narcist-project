<template>
  <Spinner v-if="isLoading" />
    <div class="container mx-auto px-4 py-8">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Welcome</h1>
      </header>
  
      <div class="bg-white shadow-sm rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Your Account Overview</h2>
        <div class="space-y-4">
           <div v-if="userStats">
            <div class="bg-gray-50 p-2 shadow">
              <h3 class="text-xs block">Total Savings:</h3> 
              <span class="text-lg font-semibold my-1">₦{{ formatCurrency(userStats.totalSaving) }}</span>
            </div>
            <div class="bg-gray-50 p-2 shadow mt-3">
              <h3 class="text-xs">Loan Balance:</h3>
              <span class="text-lg font-semibold my-1"> {{ formatCurrency(userStats.approvedLoanBalance) }}</span>
            </div>
          </div>
          <div v-else>
            <p>Loading user stats...</p>
          </div>
        </div>
      </div>
  
      <div class="mt-6">
        <button
          @click="logout"
          class="btn-secondary w-full sm:w-auto"
        >
          Logout
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted} from 'vue'
  import { useRouter } from 'vue-router'
  import { baseUrl } from '~/assets/proxy'
  import Spinner from '~/components/Spinner.vue'
  import axios from 'axios'

  
  // Mock user data (could be fetched from an API in a real app)
  const router = useRouter()
  const isLoading = ref(false)
  const userStats = ref(null)
  
  const formatCurrency = (value) => {
    return value.toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }
  

const getUserDash = async () => {
  isLoading.value = true
  try {
     const token = localStorage.getItem('auth_token')
    const response = await axios.get(`${baseUrl}/dashboard/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    
    // console.log(user)
    userStats.value = response.data
    console.log(response.data)
  } catch (error) {
    console.error('Error fetching savings history:', error)
  } finally {
    isLoading.value = false
  }
}
  

const getUser = async () => {
  isLoading.value = true
  try {
     const token = localStorage.getItem('auth_token')
     const ipssNumber = {
      ipssNumber
     }
    const response = await axios.post(`${baseUrl}/auth/user/get-user-details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })


    // console.log(user)
    console.log(response.data)
  } catch (error) {
    console.error('Error fetching savings history:', error)
  } finally {
    isLoading.value = false
  }
}


  const logout = () => {
    // Simple logout: Navigate back to login page
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_info')
    router.push('../')
  }

  onMounted(() => {
    getUserDash()

  })

  </script>
  
  <style scoped>
  .btn-secondary {
    @apply px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2;
  }
  </style>