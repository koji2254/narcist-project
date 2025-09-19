<template>
  <Spinner v-if="isLoading" />
    <div class="container mx-auto px-4 py-2 bg-white">
      <header class="mb-8">
        <h1 class="text-xl font-bold text-gray-700 flex items-center gap-2">
         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7781EE"><path d="M336-120q-91 0-153.5-62.5T120-336q0-38 13-74t37-65l142-171-97-194h530l-97 194 142 171q24 29 37 65t13 74q0 91-63 153.5T624-120H336Zm144-200q-33 0-56.5-23.5T400-400q0-33 23.5-56.5T480-480q33 0 56.5 23.5T560-400q0 33-23.5 56.5T480-320Zm-95-360h190l40-80H345l40 80Zm-49 480h288q57 0 96.5-39.5T760-336q0-24-8.5-46.5T728-423L581-600H380L232-424q-15 18-23.5 41t-8.5 47q0 57 39.5 96.5T336-200Z"/></svg>
          Loans Balance
        </h1>
        <div class="flex items-start justify-between">
        <div class="font-light flex items-center">
         <h2 v-if="userStats" class="font-semibold p-2 my-2">₦{{ formatCurrency(userStats.approvedLoanBalance) }}</h2>
        </div>
          <h2 class="p-2 my- flex items-center gap-1">
           <!-- <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z"/></svg> sort -->
          </h2>
        </div>
      </header>
  
      <div class="bg-white rounded-lg">
        
        <!-- <div class="space-y-1">
           <div v-if="userStats">
            <div class="bg-gray-50 shadow mb-2">
              <h3 class="text-md flex items-center p-2 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#8B1A10" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
              </svg>
              <span class="text-lg font-semibold my-1 p-2 py-1">₦{{ formatCurrency(userStats.totalSaving) }}</span>
              </h3> 
              <div class="flex items-center text-xs px-6">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#8B1A10"><path d="M440-240v-368L296-464l-56-56 240-240 240 240-56 56-144-144v368h-80Z"/></svg>
              Widthdraw</div>
              <div class="flex justify-between w-full text-xs text-gray-600 p-2 bg-white">
                <div class=""></div>
                <div class="font-semibold">17/17/2025 2:45 AM</div>
              </div>
            </div>

          </div>
          <div v-else>
            <p>Loading user stats...</p>
          </div>
        </div> -->
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
  const activeLoan = ref([])
  

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