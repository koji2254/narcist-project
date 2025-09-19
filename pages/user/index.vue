<template>
  <Spinner v-if="isLoading" />
    <div class="container mx-auto px-4 py-2 bg-white">
      <header class="mb-8">
        <h1 class="text-xl font-bold text-gray-900 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M180-120q-25 0-42.5-17.5T120-180v-76l160-142v278H180Zm140 0v-160h320v160H320Zm360 0v-328L509-600l121-107 190 169q10 9 15 20.5t5 24.5v313q0 25-17.5 42.5T780-120H680ZM120-310v-183q0-13 5-25t15-20l300-266q8-8 18.5-11.5T480-819q11 0 21.5 3.5T520-804l80 71-480 423Z"/></svg>
          Dashboard
        </h1>
      </header>
  
      <div class="bg-white rounded-lg p-6">
        
        <div class="space-y-4">
           <div v-if="userStats">
            <div class="bg-gray-50  mb-3 shadow">
              <h3 class="text-xs flex p-2 items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0BAE3C"><path d="m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg> Profile:</h3> 
              <span class="text-lg font-semibold my-1 p-2">{{userStats.fullName}}</span>
              <div class="flex justify-between w-full text-xs p-2 bg-white">
                <div class=""></div>
                 <NuxtLink to="profile">
                  <span class="">View Profile</span>
                </NuxtLink>
                
              </div>
            </div>
            <!--  -->
            <!--  -->
            <div class="bg-gray-50 shadow">
              <h3 class="text-xs flex items-center gap-2 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0BAE3C"><path d="M200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v100h-80v-100H200v560h560v-100h80v100q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Zm280-80v-240H520v240h280Zm-160-60q25 0 42.5-17.5T700-480q0-25-17.5-42.5T640-540q-25 0-42.5 17.5T580-480q0 25 17.5 42.5T640-420Z"/></svg>
                Total Savings:
              </h3> 
              <span class="text-lg font-semibold my-1 p-2">₦{{ formatCurrency(userStats.totalSaving) }}</span>
              <div class="flex justify-between w-full text-xs p-2 bg-white">
                <div class=""></div>
                <NuxtLink to="savings/userSavingshistory">
                  <span class="">View history</span>
                </NuxtLink>
                
              </div>
            </div>
            <!--  -->
            <!--  -->
            <div class="bg-gray-50 shadow mt-3">
              <h3 class="text-xs p-2 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7781EE"><path d="M336-120q-91 0-153.5-62.5T120-336q0-38 13-74t37-65l142-171-97-194h530l-97 194 142 171q24 29 37 65t13 74q0 91-63 153.5T624-120H336Zm144-200q-33 0-56.5-23.5T400-400q0-33 23.5-56.5T480-480q33 0 56.5 23.5T560-400q0 33-23.5 56.5T480-320Zm-95-360h190l40-80H345l40 80Zm-49 480h288q57 0 96.5-39.5T760-336q0-24-8.5-46.5T728-423L581-600H380L232-424q-15 18-23.5 41t-8.5 47q0 57 39.5 96.5T336-200Z"/></svg>
                Loan Balance:</h3>
              <span class="text-lg font-semibold p-2 my-1"> {{ formatCurrency(userStats.approvedLoanBalance) }}</span>
               <div class="flex justify-between w-full text-xs p-2 bg-white">
                <div class=""></div>
                <NuxtLink to="/loans/userLoanhistory">
                  <span class="">View history</span>
                </NuxtLink>
                
              </div>
            </div>
            <!--  -->
            <!--  -->
          </div>
          <div v-else>
            <p>Loading user stats...</p>
          </div>
        </div>
      </div>
<!--   
      <div class="mt-6">
        <button
          @click="logout"
          class="btn-secondary w-full sm:w-auto"
        >
          Logout
        </button>
      </div> -->
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