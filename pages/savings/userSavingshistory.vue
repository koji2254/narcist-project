<template>
  <Spinner v-if="isLoading" />
    <div class="container mx-auto px-4 py-2 bg-white">
      <header class="mb-8">
        <h1 class="text-xl font-bold text-gray-700 flex items-center gap-2">
         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0BAE3C"><path d="M200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v100h-80v-100H200v560h560v-100h80v100q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Zm280-80v-240H520v240h280Zm-160-60q25 0 42.5-17.5T700-480q0-25-17.5-42.5T640-540q-25 0-42.5 17.5T580-480q0 25 17.5 42.5T640-420Z"/></svg>
          Savings
        </h1>
        <div class="flex items-start justify-between">
          <h4 v-if="userStats" class="font-semibold p-2 my-2 flex items-center gap-1">₦{{ formatCurrency(userStats.totalSaving) }}</h4>
          <h4 class="p-2 my-2 flex items-center gap-1">
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z"/></svg> sort
          </h4>
        </div>
      </header>
  
      <div class="bg-white rounded-lg">
        
        <div class="space-y-2">
            <div v-if="lastSavingTransaction && lastSavingTransaction.length">
              <div
                v-for="(tx, index) in lastSavingTransaction"
                :key="tx._id || index"
                class="bg-gray-50 shadow mb-2"
              >
                <!-- Amount Header -->
                <h3 class="text-md flex items-center p-2 py-1">
                  <!-- Icon changes by type -->
                  <svg
                    v-if="tx.type === 'deposit'"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#38C24D"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 
                        1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-
                        1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-
                        1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 
                        1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 
                        0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 
                        1.5v-.75A.75.75 0 0 0 3 15h-.75M15 
                        10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 
                        0h.008v.008H18V10.5Zm-12 
                        0h.008v.008H6V10.5Z"
                    />
                  </svg>

                  <svg
                    v-else-if="tx.type === 'withdrawal'"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#8B1A10"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0 1 
                        15.797 2.101c.727.198 1.453-.342 
                        1.453-1.096V18.75M3.75 
                        4.5v.75A.75.75 0 0 1 3 6h-.75m0 
                        0v-.375c0-.621.504-1.125 
                        1.125-1.125H20.25M2.25 6v9m18-
                        10.5v.75c0 .414.336.75.75.75h.75m-1.5-
                        1.5h.375c.621 0 1.125.504 
                        1.125 1.125v9.75c0 .621-.504 
                        1.125-1.125 1.125h-.375m1.5-
                        1.5H21a.75.75 0 0 0-.75.75v.75m0 
                        0H3.75m0 0h-.375a1.125 1.125 
                        0 0 1-1.125-1.125V15m1.5 
                        1.5v-.75A.75.75 0 0 0 3 
                        15h-.75M15 10.5a3 3 0 1 1-6 
                        0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 
                        0h.008v.008H6V10.5Z"
                    />
                  </svg>

                  <span class="text-lg font-semibold my-1 p-2 py-1">
                    ₦{{ formatCurrency(tx.amount) }}
                  </span>
                </h3>

                <!-- Label -->
                <div
                  class="flex items-center text-xs px-6"
                  :class="tx.type === 'deposit' ? 'text-green-700' : 'text-red-700'"
                >
                  <svg
                    v-if="tx.type === 'deposit'"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#78A75A"
                  >
                    <path
                      d="M480-240 240-480l56-56 144 144v-368h80v368l144-144 
                        56 56-240 240Z"
                    />
                  </svg>

                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#8B1A10"
                  >
                    <path
                      d="M440-240v-368L296-464l-56-56 240-240 240 
                        240-56 56-144-144v368h-80Z"
                    />
                  </svg>

                  {{ tx.type === 'deposit' ? 'Deposit' : 'Withdrawal' }}
                </div>

                <!-- Date -->
                <div
                  class="flex justify-between w-full text-xs text-gray-600 p-2 bg-white"
                >
                  <div></div>
                  <div class="font-semibold">
                    {{ formatDate(tx.date) }}
                  </div>
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
  import { ref, onMounted} from 'vue'
  import { useRouter } from 'vue-router'
  import { baseUrl } from '~/assets/proxy'
  import Spinner from '~/components/Spinner.vue'
  import axios from 'axios'

  
  // Mock user data (could be fetched from an API in a real app)
  const router = useRouter()
  const isLoading = ref(false)
  const userStats = ref(null)
  const lastSavingTransaction = ref([])
  
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
    lastSavingTransaction.value = response.data.LastSavingTransaction
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
    getUser()
  })

  // Date formatter
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }


  </script>
  
  <style scoped>
  .btn-secondary {
    @apply px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2;
  }
  </style>