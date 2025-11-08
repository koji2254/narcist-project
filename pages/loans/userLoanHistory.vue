<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7781EE">
          <path d="M336-120q-91 0-153.5-62.5T120-336q0-38 13-74t37-65l142-171-97-194h530l-97 194 142 171q24 29 37 65t13 74q0 91-63 153.5T624-120H336Zm144-200q-33 0-56.5-23.5T400-400q0-33 23.5-56.5T480-480q33 0 56.5 23.5T560-400q0 33-23.5 56.5T480-320Zm-95-360h190l40-80H345l40 80Zm-49 480h288q57 0 96.5-39.5T760-336q0-24-8.5-46.5T728-423L581-600H380L232-424q-15 18-23.5 41t-8.5 47q0 57 39.5 96.5T336-200Z"/>
        </svg>
        <h3 class="text-xl font-semibold text-gray-800">
          Loan History
          <span v-if="totalUnpaidAmount > 0" class="text-sm text-red-600 font-medium ml-2">
            (₦{{ formatCurrency(totalUnpaidAmount) }} Unpaid)
          </span>
        </h3>
      </div>

      <!-- ✅ Refresh Button -->
    <button
      @click="refreshLoans"
      :disabled="isLoading"
      class="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v6h6M20 20v-6h-6M4 10a8 8 0 0114.32-4.906M20 14a8 8 0 01-14.32 4.906" />
      </svg>
      <svg v-else class="w-4 h-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <span>{{ isLoading ? 'Refreshing...' : 'Refresh' }}</span>
    </button>

    </div>



    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <Spinner />
    </div>

    <div v-else>
      <div
        v-for="loan in sortedLoans"
        :key="loan._id"
        class="bg-white shadow-sm hover:shadow-md transition-all mb-4 rounded border border-gray-100 overflow-hidden"
      >
        <!-- Header -->
        <div
          class="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
          @click="toggleLoan(loan._id)"
        >
          <div>
            <h3 class="font-semibold text-md text-gray-800">
              ₦{{ formatCurrency(loan.amount) }}
            </h3>
            <p class="text-sm text-gray-600">
              Term: {{ loan.term_month }} months
            </p>
          </div>

          <div class="flex items-center space-x-3">
            <span
              class="px-3 py-1 rounded-full text-xs md:text-sm font-medium capitalize"
              :class="{
                'bg-green-100 text-green-700': loan.status === 'completed',
                'bg-yellow-100 text-yellow-700': loan.status === 'pending',
                'bg-blue-100 text-blue-700': loan.status === 'approved',
                'bg-red-100 text-red-700': loan.status === 'declined'
              }"
            >
              {{ loan.status }}
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 text-gray-500 transition-transform duration-300"
              :class="{ 'rotate-180': expandedLoans.includes(loan._id) }"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>

        <!-- Drop Down Section -->
        <div
          v-if="expandedLoans.includes(loan._id)"
          class="p-4 border-t border-gray-100 bg-white text-gray-700"
        >
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div>
              <span class="font-medium text-gray-600">Interest Rate:</span>
              {{ loan.totalInterest }}%
            </div>
            <div>
              <span class="font-medium text-gray-600">Interest Amount:</span>
              ₦{{ formatCurrency(loan.interestAmount) }}
            </div>
            <div>
              <span class="font-medium text-gray-600">Recurring Fee:</span>
              ₦{{ formatCurrency(loan.recurringFee) }}
            </div>
            <div>
              <span class="font-medium text-gray-600">Final Payment:</span>
              ₦{{ formatCurrency(loan.finalPayment) }}
            </div>
            <div>
              <span class="font-medium text-gray-600">Created:</span>
              {{ formatDate(loan.createdAt) }}
            </div>
            <div>
              <span class="font-medium text-gray-600">Updated:</span>
              {{ formatDate(loan.updatedAt) }}
            </div>
          </div>

          <!-- Monthly Installments -->
          <div class="mt-4">
            <h4 class="font-semibold text-gray-800 mb-2">Monthly Installments</h4>
            <div
              v-for="install in loan.monthlyInstallment"
              :key="install._id"
              class="flex justify-between items-center border border-gray-100 rounded-lg px-3 py-2 mb-2 bg-gray-50"
            >
              <div class="text-sm text-gray-700">
                Month {{ install.month }}: ₦{{ formatCurrency(install.amount) }}
              </div>
              <span
                class="text-xs font-medium px-2 py-1 rounded-full"
                :class="install.paid
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'"
              >
                {{ install.paid ? 'Paid' : 'Unpaid' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import Spinner from '~/components/Spinner.vue'
import axios from 'axios'
import { baseUrl } from '~/assets/proxy'

const isLoading = ref(false)
const activeLoanList = ref({ Loans: [] })
const expandedLoans = ref([])

// ✅ Formatting helpers
const formatCurrency = (value) =>
  Number(value).toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

const formatDate = (dateString) => {
  if (!dateString) return '—'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// ✅ Toggle open/close
const toggleLoan = (id) => {
  if (expandedLoans.value.includes(id)) {
    expandedLoans.value = expandedLoans.value.filter((loanId) => loanId !== id)
  } else {
    expandedLoans.value.push(id)
  }
}

// ✅ Sort by newest first
const sortedLoans = computed(() => {
  if (!activeLoanList.value.Loans) return []
  return [...activeLoanList.value.Loans].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )
})

// ✅ Fetch data
const getUserLoanHistory = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(`${baseUrl}/loan/user-loan-history`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    activeLoanList.value = response.data
  } catch (error) {
    console.error('Error fetching loan history:', error)
  } finally {
    isLoading.value = false
  }
}

const totalUnpaidAmount = computed(() => {
  if (!activeLoanList.value.Loans) return 0

  return activeLoanList.value.Loans.reduce((total, loan) => {
    const unpaidSum = loan.monthlyInstallment
      ?.filter((inst) => !inst.paid)
      .reduce((sum, inst) => sum + inst.amount, 0) || 0

    return total + unpaidSum
  }, 0)
})

const refreshLoans = async () => {
  isLoading.value = true
  try {
    await getUserLoanHistory()
  } finally {
    isLoading.value = false
  }
}



onMounted(() => getUserLoanHistory())
</script>

  
<style scoped>
.text-wine {
  color: #8b1538;
}
.bg-wine {
  background-color: #8b1538;
}
.bg-wine\/10 {
  background-color: rgba(139, 21, 56, 0.1);
}
.bg-wine\/20 {
  background-color: rgba(139, 21, 56, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>