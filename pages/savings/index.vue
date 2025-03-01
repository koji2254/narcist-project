<template>
  <div>
    <header class="mb-8">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <h1 class="text-3xl font-bold text-gray-900">Savings Management</h1>
        <button class="btn-primary w-full sm:w-auto" @click="openNewSavingsModal">
          Record New Savings
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
        <label class="block text-sm font-medium text-gray-700">Date Range</label>
        <select v-model="dateFilter" class="input-field mt-1">
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
    </div>

    <!-- Horizontal Table (Above 771px) -->
    <div class="bg-white shadow-sm rounded-lg overflow-x-auto hidden md:block">
      <table class="w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="saving in filteredSavings" :key="saving.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ saving.userName }}</div>
                  <div class="text-sm text-gray-500">ID: {{ saving.userId }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">₦{{ saving.amount.toLocaleString() }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ formatDate(saving.date) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': saving.type === 'deposit',
                  'bg-red-100 text-red-800': saving.type === 'withdrawal'
                }"
              >
                {{ saving.type }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              ₦{{ saving.balance.toLocaleString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                @click="viewDetails(saving)"
                class="text-blue-600 hover:text-blue-900"
              >
                View Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Vertical Table (Below 771px) -->
    <div class="bg-white shadow-sm rounded-lg block md:hidden">
      <table v-for="saving in filteredSavings" :key="saving.id" class="w-full mb-4 border-b divide-y divide-gray-200">
        <tbody>
          <tr>
            <th scope="row" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3 bg-gray-50">User</th>
            <td class="px-4 py-4 whitespace-normal w-2/3">
              <div class="text-sm font-medium text-gray-900">{{ saving.userName }}</div>
              <div class="text-sm text-gray-500">ID: {{ saving.userId }}</div>
            </td>
          </tr>
          <tr>
            <th scope="row" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3 bg-gray-50">Amount</th>
            <td class="px-4 py-4 whitespace-normal w-2/3 text-sm text-gray-900">₦{{ saving.amount.toLocaleString() }}</td>
          </tr>
          <tr>
            <th scope="row" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3 bg-gray-50">Date</th>
            <td class="px-4 py-4 whitespace-normal w-2/3 text-sm text-gray-900">{{ formatDate(saving.date) }}</td>
          </tr>
          <tr>
            <th scope="row" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3 bg-gray-50">Type</th>
            <td class="px-4 py-4 whitespace-normal w-2/3">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': saving.type === 'deposit',
                  'bg-red-100 text-red-800': saving.type === 'withdrawal'
                }"
              >
                {{ saving.type }}
              </span>
            </td>
          </tr>
          <tr>
            <th scope="row" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3 bg-gray-50">Balance</th>
            <td class="px-4 py-4 whitespace-normal w-2/3 text-sm text-gray-900">₦{{ saving.balance.toLocaleString() }}</td>
          </tr>
          <tr>
            <th scope="row" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3 bg-gray-50">Actions</th>
            <td class="px-4 py-4 whitespace-normal w-2/3 text-right text-sm font-medium">
              <button
                @click="viewDetails(saving)"
                class="text-blue-600 hover:text-blue-900"
              >
                View Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- New Savings Modal -->
    <div v-if="showNewSavingsModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900">Record New Savings</h3>
          <div class="mt-2">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">User ID</label>
              <input
                v-model="newSaving.userId"
                type="text"
                class="input-field mt-1"
                placeholder="e.g., USR001"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">User Name</label>
              <input
                v-model="newSaving.userName"
                type="text"
                class="input-field mt-1"
                placeholder="e.g., John Doe"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Amount</label>
              <input
                v-model.number="newSaving.amount"
                type="number"
                class="input-field mt-1"
                placeholder="e.g., 50000"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Type</label>
              <select v-model="newSaving.type" class="input-field mt-1">
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
              </select>
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <button @click="closeNewSavingsModal" class="btn-secondary">Cancel</button>
            <button @click="saveNewSaving" class="btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900">Savings Details</h3>
          <div class="mt-2 space-y-2">
            <p><strong>User:</strong> {{ selectedSaving.userName }} (ID: {{ selectedSaving.userId }})</p>
            <p><strong>Amount:</strong> ₦{{ selectedSaving.amount.toLocaleString() }}</p>
            <p><strong>Date:</strong> {{ formatDate(selectedSaving.date) }}</p>
            <p><strong>Type:</strong> {{ selectedSaving.type }}</p>
            <p><strong>Balance:</strong> ₦{{ selectedSaving.balance.toLocaleString() }}</p>
          </div>
          <div class="mt-4 flex justify-end">
            <button @click="closeDetailsModal" class="btn-secondary">Close</button>
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
const dateFilter = ref('all')
const savings = ref([
  {
    id: '1',
    userId: 'USR001',
    userName: 'John Doe',
    amount: 50000,
    date: new Date(),
    type: 'deposit',
    balance: 150000
  },
  {
    id: '2',
    userId: 'USR002',
    userName: 'Jane Smith',
    amount: 25000,
    date: new Date(Date.now() - 86400000), // Yesterday
    type: 'deposit',
    balance: 75000
  },
  {
    id: '3',
    userId: 'USR003',
    userName: 'Mike Johnson',
    amount: 10000,
    date: new Date(),
    type: 'withdrawal',
    balance: 40000
  }
])
const showNewSavingsModal = ref(false)
const showDetailsModal = ref(false)
const selectedSaving = ref(null)
const newSaving = ref({
  userId: '',
  userName: '',
  amount: 0,
  type: 'deposit'
})

// Computed
const filteredSavings = computed(() => {
  return savings.value.filter(saving => {
    const matchesSearch = 
      saving.userName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      saving.userId.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    if (!matchesSearch) return false
    
    const date = new Date(saving.date)
    const now = new Date()
    
    switch (dateFilter.value) {
      case 'today':
        return date.toDateString() === now.toDateString()
      case 'week':
        const weekAgo = new Date(now.setDate(now.getDate() - 7))
        return date >= weekAgo
      case 'month':
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
      default:
        return true
    }
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

const openNewSavingsModal = () => {
  newSaving.value = { userId: '', userName: '', amount: 0, type: 'deposit' }
  showNewSavingsModal.value = true
}

const closeNewSavingsModal = () => {
  showNewSavingsModal.value = false
}

const saveNewSaving = () => {
  if (!newSaving.value.userId || !newSaving.value.userName || newSaving.value.amount <= 0) {
    alert('Please fill all fields correctly')
    return
  }

  const lastBalance = savings.value.length > 0 
    ? savings.value[savings.value.length - 1].balance 
    : 0
  
  const newBalance = newSaving.value.type === 'deposit'
    ? lastBalance + newSaving.value.amount
    : lastBalance - newSaving.value.amount

  savings.value.push({
    id: String(savings.value.length + 1),
    userId: newSaving.value.userId,
    userName: newSaving.value.userName,
    amount: newSaving.value.amount,
    date: new Date(),
    type: newSaving.value.type,
    balance: newBalance
  })
  
  showNewSavingsModal.value = false
}

const viewDetails = (saving) => {
  selectedSaving.value = saving
  showDetailsModal.value = true
}

const closeDetailsModal = () => {
  showDetailsModal.value = false
  selectedSaving.value = null
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