<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <header class="bg-white border-b border-gray-200 shadow-sm mb-8 p-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Loan Management</h1>
            <p class="mt-1 text-sm text-gray-500">Manage loan requests and statuses</p>
          </div>
          <button 
            class="px-4 py-2.5 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center w-full sm:w-auto"
            @click="openNewLoanModal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            New Loan Request
          </button>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Search and Filters -->
      <div class="bg-white shadow-sm rounded-lg border border-gray-200 p-6 mb-8">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Search Users</label>
            <div class="relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search by name or ID..."
                class="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
            <select 
              v-model="statusFilter" 
              class="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="flex justify-between items-center mb-4">
        <p class="text-sm text-gray-600">
          Showing <span class="font-medium">{{ filteredLoans.length }}</span> of <span class="font-medium">{{ loans.length }}</span> loans
        </p>
        <div class="flex space-x-2">
          <button class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Export
          </button>
        </div>
      </div>

      <!-- Horizontal Table (Above 1024px) -->
      <div class="bg-white shadow-sm rounded-lg overflow-hidden hidden lg:block mb-8">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Payment</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="loan in filteredLoans" :key="loan.id" class="hover:bg-gray-50 transition-colors duration-150">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ loan.userName }}</div>
                    <div class="text-sm text-gray-500">ID: {{ loan.userId }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ₦{{ loan.amount.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ loan.duration }} months
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-yellow-100 text-yellow-800': loan.status === 'pending',
                    'bg-green-100 text-green-800': loan.status === 'approved',
                    'bg-red-100 text-red-800': loan.status === 'rejected',
                    'bg-blue-100 text-blue-800': loan.status === 'completed'
                  }"
                >
                  {{ loan.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(loan.nextPayment) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="viewLoanDetails(loan)"
                  class="text-emerald-600 hover:text-emerald-900 mr-4 transition-colors duration-150"
                >
                  View
                </button>
                <button
                  v-if="loan.status === 'pending'"
                  @click="processLoan(loan)"
                  class="text-emerald-600 hover:text-emerald-900 mr-4 transition-colors duration-150"
                >
                  Process
                </button>
                <button
                  v-if="loan.status === 'approved'"
                  @click="completeLoan(loan)"
                  class="text-emerald-600 hover:text-emerald-900 transition-colors duration-150"
                >
                  Complete
                </button>
              </td>
            </tr>
            <tr v-if="filteredLoans.length === 0">
              <td colspan="6" class="px-6 py-10 text-center text-sm text-gray-500">
                <div class="flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>No loans found matching your criteria</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Vertical Cards (1024px or less) -->
      <div class="block lg:hidden space-y-4 mb-8">
        <div 
          v-for="loan in filteredLoans" 
          :key="loan.id" 
          class="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
        >
          <div class="p-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900">{{ loan.userName }}</h3>
                <p class="text-xs text-gray-500">ID: {{ loan.userId }}</p>
              </div>
              <span
                class="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-yellow-100 text-yellow-800': loan.status === 'pending',
                  'bg-green-100 text-green-800': loan.status === 'approved',
                  'bg-red-100 text-red-800': loan.status === 'rejected',
                  'bg-blue-100 text-blue-800': loan.status === 'completed'
                }"
              >
                {{ loan.status }}
              </span>
            </div>
          </div>
          <div class="p-4 grid grid-cols-2 gap-4">
            <div>
              <p class="text-xs font-medium text-gray-500">Amount</p>
              <p class="text-sm font-semibold text-gray-900">₦{{ loan.amount.toLocaleString() }}</p>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500">Duration</p>
              <p class="text-sm font-semibold text-gray-900">{{ loan.duration }} months</p>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500">Next Payment</p>
              <p class="text-sm font-semibold text-gray-900">{{ formatDate(loan.nextPayment) }}</p>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 flex justify-end space-x-3">
            <button
              @click="viewLoanDetails(loan)"
              class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-150"
            >
              View Details
            </button>
            <button
              v-if="loan.status === 'pending'"
              @click="processLoan(loan)"
              class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-150"
            >
              Process
            </button>
            <button
              v-if="loan.status === 'approved'"
              @click="completeLoan(loan)"
              class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-150"
            >
              Complete
            </button>
          </div>
        </div>
        
        <div v-if="filteredLoans.length === 0" class="bg-white shadow-sm rounded-lg border border-gray-200 p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-gray-500 mb-2">No loans found matching your criteria</p>
        </div>
      </div>

      <!-- New Loan Modal -->
      <div v-if="showNewLoanModal" class="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
        <div class="relative mx-auto p-6 border w-full max-w-md shadow-xl rounded-lg bg-white">
          <button 
            @click="closeNewLoanModal" 
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-5">New Loan Request</h3>
            <div class="mt-2 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                <input
                  v-model="newLoan.userId"
                  type="text"
                  class="focus:ring-emerald-500 focus:border-emerald-500 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="e.g., USR001"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                <input
                  v-model="newLoan.userName"
                  type="text"
                  class="focus:ring-emerald-500 focus:border-emerald-500 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="e.g., John Doe"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  v-model.number="newLoan.amount"
                  type="number"
                  class="focus:ring-emerald-500 focus:border-emerald-500 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="e.g., 100000"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Duration (months)</label>
                <input
                  v-model.number="newLoan.duration"
                  type="number"
                  class="focus:ring-emerald-500 focus:border-emerald-500 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="e.g., 6"
                />
              </div>
            </div>
            <div class="mt-6 flex justify-end gap-3">
              <button 
                @click="closeNewLoanModal" 
                class="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Cancel
              </button>
              <button 
                @click="saveNewLoan" 
                class="px-4 py-2 bg-emerald-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loan Details Modal -->
      <div v-if="showDetailsModal" class="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
        <div class="relative mx-auto p-6 border w-full max-w-md shadow-xl rounded-lg bg-white">
          <button 
            @click="closeDetailsModal" 
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-5">Loan Details</h3>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-xs font-medium text-gray-500 mb-1">User</p>
                  <p class="text-sm font-semibold text-gray-900">{{ selectedLoan.userName }}</p>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-500 mb-1">ID</p>
                  <p class="text-sm font-semibold text-gray-900">{{ selectedLoan.userId }}</p>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-500 mb-1">Amount</p>
                  <p class="text-sm font-semibold text-gray-900">₦{{ selectedLoan.amount.toLocaleString() }}</p>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-500 mb-1">Duration</p>
                  <p class="text-sm font-semibold text-gray-900">{{ selectedLoan.duration }} months</p>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-500 mb-1">Status</p>
                  <span
                    class="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="{
                      'bg-yellow-100 text-yellow-800': selectedLoan.status === 'pending',
                      'bg-green-100 text-green-800': selectedLoan.status === 'approved',
                      'bg-red-100 text-red-800': selectedLoan.status === 'rejected',
                      'bg-blue-100 text-blue-800': selectedLoan.status === 'completed'
                    }"
                  >
                    {{ selectedLoan.status }}
                  </span>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-500 mb-1">Next Payment</p>
                  <p class="text-sm font-semibold text-gray-900">{{ formatDate(selectedLoan.nextPayment) }}</p>
                </div>
              </div>
            </div>
            <div class="mt-6 flex justify-end">
              <button 
                @click="closeDetailsModal" 
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Process Loan Modal -->
      <div v-if="showProcessModal" class="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
        <div class="relative mx-auto p-6 border w-full max-w-md shadow-xl rounded-lg bg-white">
          <button 
            @click="closeProcessModal" 
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-5">Process Loan</h3>
            <div class="mt-2 space-y-4">
              <p class="text-sm text-gray-700">Loan for {{ processingLoan.userName }} (₦{{ processingLoan.amount.toLocaleString() }})</p>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Action</label>
                <select 
                  v-model="processAction" 
                  class="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md"
                >
                  <option value="approve">Approve</option>
                  <option value="reject">Reject</option>
                </select>
              </div>
            </div>
            <div class="mt-6 flex justify-end gap-3">
              <button 
                @click="closeProcessModal" 
                class="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Cancel
              </button>
              <button 
                @click="confirmProcessLoan" 
                class="px-4 py-2 bg-emerald-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Complete Loan Modal -->
      <div v-if="showCompleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
        <div class="relative mx-auto p-6 border w-full max-w-md shadow-xl rounded-lg bg-white">
          <button 
            @click="closeCompleteModal" 
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-5">Mark Loan as Completed</h3>
            <div class="mt-2">
              <p class="text-sm text-gray-700 mb-4">
                Confirm completion of loan for {{ completingLoan.userName }} 
                (₦{{ completingLoan.amount.toLocaleString() }})
              </p>
            </div>
            <div class="mt-6 flex justify-end gap-3">
              <button 
                @click="closeCompleteModal" 
                class="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Cancel
              </button>
              <button 
                @click="confirmCompleteLoan" 
                class="px-4 py-2 bg-emerald-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// State remains unchanged
const searchQuery = ref('')
const statusFilter = ref('all')
const loans = ref([
  {
    id: '1',
    userId: 'USR001',
    userName: 'John Doe',
    amount: 100000,
    duration: 6,
    status: 'pending',
    nextPayment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  },
  {
    id: '2',
    userId: 'USR002',
    userName: 'Jane Smith',
    amount: 250000,
    duration: 12,
    status: 'approved',
    nextPayment: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
  },
  {
    id: '3',
    userId: 'USR003',
    userName: 'Mike Johnson',
    amount: 50000,
    duration: 3,
    status: 'rejected',
    nextPayment: new Date()
  },
  {
    id: '4',
    userId: 'USR004',
    userName: 'Sarah Brown',
    amount: 150000,
    duration: 9,
    status: 'completed',
    nextPayment: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
  }
])
const showNewLoanModal = ref(false)
const showDetailsModal = ref(false)
const showProcessModal = ref(false)
const showCompleteModal = ref(false)
const selectedLoan = ref(null)
const processingLoan = ref(null)
const completingLoan = ref(null)
const processAction = ref('approve')
const newLoan = ref({
  userId: '',
  userName: '',
  amount: 0,
  duration: 0
})

// Computed remains unchanged
const filteredLoans = computed(() => {
  return loans.value.filter(loan => {
    const matchesSearch = 
      loan.userName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      loan.userId.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    if (!matchesSearch) return false
    
    if (statusFilter.value !== 'all' && loan.status !== statusFilter.value) {
      return false
    }
    
    return true
  })
})

// Methods remain unchanged
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const openNewLoanModal = () => {
  newLoan.value = { userId: '', userName: '', amount: 0, duration: 0 }
  showNewLoanModal.value = true
}

const closeNewLoanModal = () => {
  showNewLoanModal.value = false
}

const saveNewLoan = () => {
  if (!newLoan.value.userId || !newLoan.value.userName || newLoan.value.amount <= 0 || newLoan.value.duration <= 0) {
    alert('Please fill all fields correctly')
    return
  }

  loans.value.push({
    id: String(loans.value.length + 1),
    userId: newLoan.value.userId,
    userName: newLoan.value.userName,
    amount: newLoan.value.amount,
    duration: newLoan.value.duration,
    status: 'pending',
    nextPayment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  })
  
  showNewLoanModal.value = false
}

const viewLoanDetails = (loan) => {
  selectedLoan.value = loan
  showDetailsModal.value = true
}

const closeDetailsModal = () => {
  showDetailsModal.value = false
  selectedLoan.value = null
}

const processLoan = (loan) => {
  processingLoan.value = loan
  processAction.value = 'approve'
  showProcessModal.value = true
}

const closeProcessModal = () => {
  showProcessModal.value = false
  processingLoan.value = null
}

const confirmProcessLoan = () => {
  const loanIndex = loans.value.findIndex(l => l.id === processingLoan.value.id)
  if (loanIndex !== -1) {
    if (processAction.value === 'approve') {
      loans.value[loanIndex].status = 'approved'
    } else if (processAction.value === 'reject') {
      loans.value[loanIndex].status = 'rejected'
    }
  }
  showProcessModal.value = false
  processingLoan.value = null
}

const completeLoan = (loan) => {
  completingLoan.value = loan
  showCompleteModal.value = true
}

const closeCompleteModal = () => {
  showCompleteModal.value = false
  completingLoan.value = null
}

const confirmCompleteLoan = () => {
  const loanIndex = loans.value.findIndex(l => l.id === completingLoan.value.id)
  if (loanIndex !== -1) {
    loans.value[loanIndex].status = 'completed'
    loans.value[loanIndex].nextPayment = new Date()
  }
  showCompleteModal.value = false
  completingLoan.value = null
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>