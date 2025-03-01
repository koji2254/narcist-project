<template>
  <div>
    <header class="mb-8">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <h1 class="text-3xl font-bold text-gray-900">Loan Management</h1>
        <button class="btn-primary w-full sm:w-auto" @click="openNewLoanModal">
          New Loan Request
        </button>
      </div>
    </header>

    <!-- Search and Filters -->
    <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Search Users</label>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by name or ID..."
          class="input-field mt-1"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Status</label>
        <select v-model="statusFilter" class="input-field mt-1">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>

    <!-- Horizontal Table (Above 1024px) -->
    <div class="bg-white shadow-sm rounded-lg overflow-x-auto hidden lg:block">
      <table class="w-full divide-y divide-gray-200">
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
          <tr v-for="loan in filteredLoans" :key="loan.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ loan.userName }}</div>
                  <div class="text-sm text-gray-500">ID: {{ loan.userId }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">₦{{ loan.amount.toLocaleString() }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ loan.duration }} months</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
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
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ formatDate(loan.nextPayment) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                @click="viewLoanDetails(loan)"
                class="text-blue-600 hover:text-blue-900 mr-4"
              >
                View Details
              </button>
              <button
                v-if="loan.status === 'pending'"
                @click="processLoan(loan)"
                class="text-blue-600 hover:text-blue-900 mr-4"
              >
                Process
              </button>
              <button
                v-if="loan.status === 'approved'"
                @click="completeLoan(loan)"
                class="text-blue-600 hover:text-blue-900"
              >
                Mark as Completed
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Vertical Table (1026px or less) -->
    <div class="bg-white shadow-sm rounded-lg block lg:hidden">
      <table v-for="loan in filteredLoans" :key="loan.id" class="w-full mb-4 border-b divide-y divide-gray-200">
        <tbody>
          <tr>
            <th scope="row" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3 bg-gray-50">User</th>
            <td class="px-4 py-4 whitespace-normal w-2/3">
              <div class="text-sm font-medium text-gray-900">{{ loan.userName }}</div>
              <div class="text-sm text-gray-500">ID: {{ loan.userId }}</div>
            </td>
          </tr>
          <tr>
            <th scope="row" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3 bg-gray-50">Amount</th>
            <td class="px-4 py-4 whitespace-normal w-2/3 text-sm text-gray-900">₦{{ loan.amount.toLocaleString() }}</td>
          </tr>
          <tr>
            <th scope="row" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3 bg-gray-50">Duration</th>
            <td class="px-4 py-4 whitespace-normal w-2/3 text-sm text-gray-900">{{ loan.duration }} months</td>
          </tr>
          <tr>
            <th scope="row" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3 bg-gray-50">Status</th>
            <td class="px-4 py-4 whitespace-normal w-2/3">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
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
          </tr>
          <tr>
            <th scope="row" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3 bg-gray-50">Next Payment</th>
            <td class="px-4 py-4 whitespace-normal w-2/3 text-sm text-gray-900">{{ formatDate(loan.nextPayment) }}</td>
          </tr>
          <tr>
            <th scope="row" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3 bg-gray-50">Actions</th>
            <td class="px-4 py-4 whitespace-normal w-2/3 text-right text-sm font-medium">
              <button
                @click="viewLoanDetails(loan)"
                class="text-blue-600 hover:text-blue-900 mr-4"
              >
                View Details
              </button>
              <button
                v-if="loan.status === 'pending'"
                @click="processLoan(loan)"
                class="text-blue-600 hover:text-blue-900 mr-4"
              >
                Process
              </button>
              <button
                v-if="loan.status === 'approved'"
                @click="completeLoan(loan)"
                class="text-blue-600 hover:text-blue-900"
              >
                Mark as Completed
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- New Loan Modal -->
    <div v-if="showNewLoanModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900">New Loan Request</h3>
          <div class="mt-2">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">User ID</label>
              <input
                v-model="newLoan.userId"
                type="text"
                class="input-field mt-1"
                placeholder="e.g., USR001"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">User Name</label>
              <input
                v-model="newLoan.userName"
                type="text"
                class="input-field mt-1"
                placeholder="e.g., John Doe"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Amount</label>
              <input
                v-model.number="newLoan.amount"
                type="number"
                class="input-field mt-1"
                placeholder="e.g., 100000"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Duration (months)</label>
              <input
                v-model.number="newLoan.duration"
                type="number"
                class="input-field mt-1"
                placeholder="e.g., 6"
              />
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <button @click="closeNewLoanModal" class="btn-secondary">Cancel</button>
            <button @click="saveNewLoan" class="btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loan Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900">Loan Details</h3>
          <div class="mt-2 space-y-2">
            <p><strong>User:</strong> {{ selectedLoan.userName }} (ID: {{ selectedLoan.userId }})</p>
            <p><strong>Amount:</strong> ₦{{ selectedLoan.amount.toLocaleString() }}</p>
            <p><strong>Duration:</strong> {{ selectedLoan.duration }} months</p>
            <p><strong>Status:</strong> {{ selectedLoan.status }}</p>
            <p><strong>Next Payment:</strong> {{ formatDate(selectedLoan.nextPayment) }}</p>
          </div>
          <div class="mt-4 flex justify-end">
            <button @click="closeDetailsModal" class="btn-secondary">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Process Loan Modal -->
    <div v-if="showProcessModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900">Process Loan</h3>
          <div class="mt-2">
            <p class="mb-4">Loan for {{ processingLoan.userName }} (₦{{ processingLoan.amount.toLocaleString() }})</p>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Action</label>
              <select v-model="processAction" class="input-field mt-1">
                <option value="approve">Approve</option>
                <option value="reject">Reject</option>
              </select>
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <button @click="closeProcessModal" class="btn-secondary">Cancel</button>
            <button @click="confirmProcessLoan" class="btn-primary">Confirm</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Complete Loan Modal -->
    <div v-if="showCompleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900">Mark Loan as Completed</h3>
          <div class="mt-2">
            <p class="mb-4">
              Confirm completion of loan for {{ completingLoan.userName }} 
              (₦{{ completingLoan.amount.toLocaleString() }})
            </p>
          </div>
          <div class="flex justify-end gap-2">
            <button @click="closeCompleteModal" class="btn-secondary">Cancel</button>
            <button @click="confirmCompleteLoan" class="btn-primary">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// State
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
    nextPayment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  },
  {
    id: '2',
    userId: 'USR002',
    userName: 'Jane Smith',
    amount: 250000,
    duration: 12,
    status: 'approved',
    nextPayment: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days from now
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
    nextPayment: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
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

// Computed
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

// Methods
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
    nextPayment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Default 30 days for next payment
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
.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}

.btn-secondary {
  @apply px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2;
}

.input-field {
  @apply block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm;
}
</style>