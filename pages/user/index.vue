<template>
  <Spinner v-if="isLoading" />

  <div class="container mx-auto p-4 bg-gray-50 min-h-screen">
    <!-- Header -->
    <header class="mb-8 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-900" viewBox="0 -960 960 960" fill="currentColor">
        <path d="M180-120q-25 0-42.5-17.5T120-180v-76l160-142v278H180Zm140 0v-160h320v160H320Zm360 0v-328L509-600l121-107 190 169q10 9 15 20.5t5 24.5v313q0 25-17.5 42.5T780-120H680ZM120-310v-183q0-13 5-25t15-20l300-266q8-8 18.5-11.5T480-819q11 0 21.5 3.5T520-804l80 71-480 423Z"/>
      </svg>
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
    </header>

    <!-- Stats Grid -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <!-- 1. Profile -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-medium text-gray-600 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#0BAE3C]" viewBox="0 -960 960 960" fill="currentColor">
              <path d="m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/>
            </svg>
            Profile
          </h3>
          <NuxtLink to="/profile" class="text-xs text-emerald-600 hover:underline">View →</NuxtLink>
        </div>
        <p class="text-xl font-semibold text-gray-900">{{ userStats?.fullName ?? '-' }}</p>
        <p class="text-xs text-gray-500 mt-1">IPSS: {{ userStats?.ipssNumber ?? '-' }}</p>
      </div>

      <!-- 2. Total Savings -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-medium text-gray-600 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#0BAE3C]" viewBox="0 -960 960 960" fill="currentColor">
              <path d="M200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v100h-80v-100H200v560h560v-100h80v100q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Zm280-80v-240H520v240h280Zm-160-60q25 0 42.5-17.5T700-480q0-25-17.5-42.5T640-540q-25 0-42.5 17.5T580-480q0 25 17.5 42.5T640-420Z"/>
            </svg>
            Total Savings
          </h3>
          <NuxtLink to="/savings/userSavingshistory" class="text-xs text-emerald-600 hover:underline">History →</NuxtLink>
        </div>
        <p class="text-xl font-semibold text-gray-900">₦{{ formatCurrency(userStats?.totalSaving ?? 0) }}</p>
      </div>

      <!-- 3. Loan Balance -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-medium text-gray-600 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#7781EE]" viewBox="0 -960 960 960" fill="currentColor">
              <path d="M336-120q-91 0-153.5-62.5T120-336q0-38 13-74t37-65l142-171-97-194h530l-97 194 142 171q24 29 37 65t13 74q0 91-63 153.5T624-120H336Zm144-200q-33 0-56.5-23.5T400-400q0-33 23.5-56.5T480-480q33 0 56.5 23.5T560-400q0 33-23.5 56.5T480-320Zm-95-360h190l40-80H345l40 80Zm-49 480h288q57 0 96.5-39.5T760-336q0-24-8.5-46.5T728-423L581-600H380L232-424q-15 18-23.5 41t-8.5 47q0 57 39.5 96.5T336-200Z"/>
            </svg>
            Loan Balance
          </h3>
          <NuxtLink to="/loans/userLoanhistory" class="text-xs text-emerald-600 hover:underline">View →</NuxtLink>
        </div>
        <p class="text-xl font-semibold text-gray-900">₦{{ formatCurrency(userStats?.approvedLoanBalance ?? 0) }}</p>
        <p class="text-xs text-gray-500 mt-1">
          {{ userStats?.approvedLoanUnpaidMonths ?? 0 }} month{{ (userStats?.approvedLoanUnpaidMonths ?? 0) !== 1 ? 's' : '' }} unpaid
        </p>
      </div>

      <!-- 4. Next Payment (calculated) -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:col-span-2 lg:col-span-1">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-medium text-gray-600 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Next Payment
          </h3>
        </div>
        <template v-if="nextPayment.amount">
          <p class="text-xl font-semibold text-red-600">₦{{ formatCurrency(nextPayment.amount) }}</p>
          <p class="text-xs text-gray-500 mt-1">Due {{ formatDate(nextPayment.due) }}</p>
        </template>
        <p v-else class="text-sm text-gray-500">No active loan</p>
      </div>
    </div>

    <!-- Logout (optional) -->
    <!-- <div class="mt-8 text-center">
      <button @click="logout" class="btn-secondary">Logout</button>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { baseUrl } from '~/assets/proxy'
import Spinner from '~/components/Spinner.vue'

const router = useRouter()
const isLoading = ref(false)
const userStats = ref(null)

/* ------------------------------------------------------------------ */
/* 1. Helpers                                                         */
/* ------------------------------------------------------------------ */
const formatCurrency = (value) => {
  return Number(value ?? 0).toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('en-NG', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/* ------------------------------------------------------------------ */
/* 2. Fetch Dashboard data                                            */
/* ------------------------------------------------------------------ */
const getUserDash = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('auth_token')
    const { data } = await axios.get(`${baseUrl}/dashboard/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    userStats.value = data
  } catch (err) {
    console.error('Dashboard fetch error', err)
  } finally {
    isLoading.value = false
  }
}

/* ------------------------------------------------------------------ */
/* 3. Compute “Next Payment” (amount + due date)                     */
/* ------------------------------------------------------------------ */
const nextPayment = computed(() => {
  if (!userStats.value?.approvedLoanBalance) return { amount: 0, due: null }

  const recurring = userStats.value.approvedLoanRecurringFee ?? 0
  const final = userStats.value.approvedLoanFinalPayment ?? 0
  const unpaidMonths = userStats.value.approvedLoanUnpaidMonths ?? 0

  // If there is at least one unpaid month → next payment = recurring fee
  // (the final payment is only for the very last month)
  if (unpaidMonths > 0) {
    const amount = unpaidMonths === 1 && final > 0 ? final : recurring
    // Estimate due date = today + 30 days (you can replace with real loan start date)
    const due = new Date()
    due.setDate(due.getDate() + 30)
    return { amount, due }
  }
  return { amount: 0, due: null }
})

/* ------------------------------------------------------------------ */
/* 4. Logout (optional)                                               */
/* ------------------------------------------------------------------ */
const logout = () => {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('user_info')
  router.push('/')
}

/* ------------------------------------------------------------------ */
/* 5. Mount                                                           */
/* ------------------------------------------------------------------ */
onMounted(() => {
  getUserDash()
})
</script>

<style scoped>
.btn-secondary {
  @apply inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2;
}
</style>