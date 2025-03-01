<template>
    <div class="container mx-auto px-4 py-8">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Welcome, {{ userName }}</h1>
      </header>
  
      <div class="bg-white shadow-sm rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Your Account Overview</h2>
        <div class="space-y-4">
          <p><strong>Email:</strong> {{ userEmail }}</p>
          <p><strong>Total Savings:</strong> ₦{{ formatCurrency(totalSavings) }}</p>
          <p><strong>Active Loans:</strong> {{ activeLoans }}</p>
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
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  // Mock user data (could be fetched from an API in a real app)
  const userName = ref('User Example')
  const userEmail = ref('user@narict.com')
  const totalSavings = ref(50000)
  const activeLoans = ref(1)
  const router = useRouter()
  
  const formatCurrency = (value) => {
    return value.toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }
  
  const logout = () => {
    // Simple logout: Navigate back to login page
    router.push('/login')
  }
  </script>
  
  <style scoped>
  .btn-secondary {
    @apply px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2;
  }
  </style>