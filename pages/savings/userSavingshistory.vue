<template>
  <Spinner v-if="isLoading" />

  <div class="container mx-auto px-4 py-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#0BAE3C]" viewBox="0 -960 960 960" fill="currentColor">
          <path d="M200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v100h-80v-100H200v560h560v-100h80v100q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Zm280-80v-240H520v240h280Zm-160-60q25 0 42.5-17.5T700-480q0-25-17.5-42.5T640-540q-25 0-42.5 17.5T580-480q0 25 17.5 42.5T640-420Z"/>
        </svg>
        Savings
      </h1>

      <!-- Total Savings -->
      <div class="mt-3 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Balance</p>
            <p class="text-2xl font-bold text-gray-900">₦{{ formatCurrency(userStats?.totalSaving ?? 0) }}</p>
          </div>
          <div class="bg-[#0BAE3C] bg-opacity-10 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#0BAE3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </header>

    <!-- Transactions List -->
    <div class="space-y-3">
      <!-- Empty State -->
      <div v-if="!isLoading && (!savingsTransactions || savingsTransactions.length === 0)" class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div class="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <p class="text-gray-600 font-medium">No savings transactions yet</p>
        <p class="text-sm text-gray-500 mt-1">Your deposits and withdrawals will appear here</p>
      </div>

      <!-- Transactions -->
      <div v-else v-for="tx in savingsTransactions" :key="tx._id" class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <!-- Icon -->
            <div class="rounded-full p-2" :class="tx.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'">
              <svg v-if="tx.type === 'deposit'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
            </div>

            <div>
              <p class="font-medium text-gray-900 capitalize">{{ tx.type }}</p>
              <p class="text-sm text-gray-500">{{ formatDate(tx.date) }}</p>
            </div>
          </div>

          <div class="text-right">
            <p class="text-lg font-semibold" :class="tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'">
              {{ tx.type === 'deposit' ? '+' : '-' }}₦{{ formatCurrency(tx.amount) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  
 <script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { baseUrl } from '~/assets/proxy'
import Spinner from '~/components/Spinner.vue'

const isLoading = ref(true)
const userStats = ref(null)
const savingsTransactions = ref([])

/* ------------------------------------------------------------------ */
/* 1. Formatters                                                      */
/* ------------------------------------------------------------------ */
const formatCurrency = (value) => {
  return Number(value ?? 0).toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-NG', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

/* ------------------------------------------------------------------ */
/* 2. Fetch Dashboard (totalSaving)                                   */
/* ------------------------------------------------------------------ */
const getUserDash = async () => {
  try {
    const token = localStorage.getItem('auth_token')
    const { data } = await axios.get(`${baseUrl}/dashboard/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    userStats.value = data
  } catch (err) {
    console.error('Dashboard fetch error:', err)
  }
}

/* ------------------------------------------------------------------ */
/* 3. Fetch Transactions                                              */
/* ------------------------------------------------------------------ */
const getUserTransactions = async () => {
  try {
    const token = localStorage.getItem('auth_token')
    const { data } = await axios.get(`${baseUrl}/saving/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    // Sort newest first
    savingsTransactions.value = (data.transactions || []).sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )
  } catch (err) {
    console.error('Transactions fetch error:', err)
  } finally {
    isLoading.value = false
  }
}

/* ------------------------------------------------------------------ */
/* 4. Mount                                                           */
/* ------------------------------------------------------------------ */
onMounted(() => {
  isLoading.value = true
  Promise.all([getUserDash(), getUserTransactions()]).finally(() => {
    isLoading.value = false
  })
})
</script>


  
<style scoped>
/* All styles are Tailwind classes */
</style>