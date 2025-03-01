<template>
  <div>
    <header class="mb-8">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <h1 class="text-3xl font-bold text-gray-900">User Management</h1>
        <button class="btn-primary w-full sm:w-auto" @click="openNewUserModal">
          Add New User
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
        <label class="block text-sm font-medium text-gray-700">Role</label>
        <select v-model="roleFilter" class="input-field mt-1">
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="worker">Worker</option>
        </select>
      </div>
    </div>

    <!-- Horizontal Table (Above 1024px) -->
    <div class="bg-white shadow-sm rounded-lg overflow-x-auto hidden lg:block">
      <table class="w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Savings</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Loans</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in filteredUsers" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-10 w-10 flex-shrink-0">
                  <img
                    class="h-10 w-10 rounded-full"
                    :src="user.avatar"
                    alt=""
                  />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                  <div class="text-sm text-gray-500">{{ user.email }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-purple-100 text-purple-800': user.role === 'admin',
                  'bg-blue-100 text-blue-800': user.role === 'worker'
                }"
              >
                {{ user.role }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              ₦{{ formatCurrency(user.totalSavings) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ user.activeLoans }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': user.status === 'active',
                  'bg-red-100 text-red-800': user.status === 'inactive'
                }"
              >
                {{ user.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                @click="viewUserDetails(user)"
                class="text-blue-600 hover:text-blue-900 mr-4"
              >
                View Details
              </button>
              <button
                @click="editUser(user)"
                class="text-blue-600 hover:text-blue-900"
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Vertical Table (1026px or less) -->
    <div class="bg-white shadow-sm rounded-lg block lg:hidden">
      <table v-for="user in filteredUsers" :key="user.id" class="w-full mb-4 border-b divide-y divide-gray-200">
        <tbody>
          <tr>
            <th scope="row" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3 bg-gray-50">User</th>
            <td class="px-4 py-4 whitespace-normal w-2/3">
              <div class="flex items-center">
                <div class="h-10 w-10 flex-shrink-0">
                  <img
                    class="h-10 w-10 rounded-full"
                    :src="user.avatar"
                    alt=""
                  />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                  <div class="text-sm text-gray-500">{{ user.email }}</div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3 bg-gray-50">Role</th>
            <td class="px-4 py-4 whitespace-normal w-2/3">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-purple-100 text-purple-800': user.role === 'admin',
                  'bg-blue-100 text-blue-800': user.role === 'worker'
                }"
              >
                {{ user.role }}
              </span>
            </td>
          </tr>
          <tr>
            <th scope="row" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3 bg-gray-50">Total Savings</th>
            <td class="px-4 py-4 whitespace-normal w-2/3 text-sm text-gray-900">₦{{ formatCurrency(user.totalSavings) }}</td>
          </tr>
          <tr>
            <th scope="row" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3 bg-gray-50">Active Loans</th>
            <td class="px-4 py-4 whitespace-normal w-2/3 text-sm text-gray-900">{{ user.activeLoans }}</td>
          </tr>
          <tr>
            <th scope="row" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3 bg-gray-50">Status</th>
            <td class="px-4 py-4 whitespace-normal w-2/3">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': user.status === 'active',
                  'bg-red-100 text-red-800': user.status === 'inactive'
                }"
              >
                {{ user.status }}
              </span>
            </td>
          </tr>
          <tr>
            <th scope="row" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3 bg-gray-50">Actions</th>
            <td class="px-4 py-4 whitespace-normal w-2/3 text-right text-sm font-medium">
              <button
                @click="viewUserDetails(user)"
                class="text-blue-600 hover:text-blue-900 mr-4"
              >
                View Details
              </button>
              <button
                @click="editUser(user)"
                class="text-blue-600 hover:text-blue-900"
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- User Form Modal -->
    <div v-if="isUserModalOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900">{{ selectedUser ? 'Edit User' : 'Add New User' }}</h3>
          <div class="mt-2">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">ID</label>
              <input
                v-model="formUser.id"
                type="text"
                class="input-field mt-1"
                placeholder="e.g., USR001"
                :disabled="selectedUser !== null"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <input
                v-model="formUser.name"
                type="text"
                class="input-field mt-1"
                placeholder="e.g., John Doe"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input
                v-model="formUser.email"
                type="email"
                class="input-field mt-1"
                placeholder="e.g., john@example.com"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Role</label>
              <select v-model="formUser.role" class="input-field mt-1">
                <option value="admin">Admin</option>
                <option value="worker">Worker</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <select v-model="formUser.status" class="input-field mt-1">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Avatar URL</label>
              <input
                v-model="formUser.avatar"
                type="text"
                class="input-field mt-1"
                placeholder="e.g., https://example.com/avatar.jpg"
              />
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <button @click="closeUserModal" class="btn-secondary">Cancel</button>
            <button @click="handleUserSubmit" class="btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>

    <!-- User Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900">User Details</h3>
          <div class="mt-2 space-y-2">
            <p><strong>ID:</strong> {{ selectedUser.id }}</p>
            <p><strong>Name:</strong> {{ selectedUser.name }}</p>
            <p><strong>Email:</strong> {{ selectedUser.email }}</p>
            <p><strong>Role:</strong> {{ selectedUser.role }}</p>
            <p><strong>Total Savings:</strong> ₦{{ formatCurrency(selectedUser.totalSavings) }}</p>
            <p><strong>Active Loans:</strong> {{ selectedUser.activeLoans }}</p>
            <p><strong>Status:</strong> {{ selectedUser.status }}</p>
            <p><strong>Avatar:</strong> <img :src="selectedUser.avatar" alt="User Avatar" class="h-16 w-16 rounded-full" /></p>
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

// Mock Savings data (from your Savings page)
const savingsData = ref([
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
    date: new Date(Date.now() - 86400000),
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

// Mock Loans data (from your Loans page)
const loansData = ref([
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

// Aggregate users from Savings and Loans
const users = computed(() => {
  const userMap = new Map()

  savingsData.value.forEach(saving => {
    if (!userMap.has(saving.userId)) {
      userMap.set(saving.userId, {
        id: saving.userId,
        name: saving.userName,
        email: `${saving.userName.toLowerCase().replace(' ', '.')}@example.com`,
        role: saving.userId === 'USR002' ? 'admin' : 'worker',
        totalSavings: 0,
        activeLoans: 0,
        status: 'active',
        avatar: `https://images.unsplash.com/photo-${saving.userId === 'USR001' ? '1472099645785-5658abf4ff4e' : saving.userId === 'USR002' ? '1494790108377-be9c29b29330' : saving.userId === 'USR003' ? '1519345182560-3f2917c472ef' : '1517364891578-8e8b9f5b8e8b'}?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`
      })
    }
    const user = userMap.get(saving.userId)
    user.totalSavings = saving.balance
  })

  loansData.value.forEach(loan => {
    if (!userMap.has(loan.userId)) {
      userMap.set(loan.userId, {
        id: loan.userId,
        name: loan.userName,
        email: `${loan.userName.toLowerCase().replace(' ', '.')}@example.com`,
        role: loan.userId === 'USR002' ? 'admin' : 'worker',
        totalSavings: 0,
        activeLoans: 0,
        status: 'active',
        avatar: `https://images.unsplash.com/photo-${loan.userId === 'USR001' ? '1472099645785-5658abf4ff4e' : loan.userId === 'USR002' ? '1494790108377-be9c29b29330' : loan.userId === 'USR003' ? '1519345182560-3f2917c472ef' : '1517364891578-8e8b9f5b8e8b'}?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`
      })
    }
    const user = userMap.get(loan.userId)
    if (loan.status === 'approved' || loan.status === 'pending') {
      user.activeLoans += 1
    }
  })

  return Array.from(userMap.values())
})

// State
const searchQuery = ref('')
const roleFilter = ref('all')
const isUserModalOpen = ref(false)
const showDetailsModal = ref(false)
const selectedUser = ref(null)
const formUser = ref({
  id: '',
  name: '',
  email: '',
  role: 'worker',
  totalSavings: 0,
  activeLoans: 0,
  status: 'active',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
})

// Computed
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    if (!matchesSearch) return false
    
    if (roleFilter.value !== 'all' && user.role !== roleFilter.value) {
      return false
    }
    
    return true
  })
})

// Methods
const formatCurrency = (value) => {
  return value.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

const openNewUserModal = () => {
  selectedUser.value = null
  formUser.value = {
    id: '',
    name: '',
    email: '',
    role: 'worker',
    totalSavings: 0,
    activeLoans: 0,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
  isUserModalOpen.value = true
}

const closeUserModal = () => {
  isUserModalOpen.value = false
  selectedUser.value = null
}

const viewUserDetails = (user) => {
  selectedUser.value = user
  showDetailsModal.value = true
}

const closeDetailsModal = () => {
  showDetailsModal.value = false
  selectedUser.value = null
}

const editUser = (user) => {
  selectedUser.value = user
  formUser.value = { ...user }
  isUserModalOpen.value = true
}

const handleUserSubmit = () => {
  if (!formUser.value.id || !formUser.value.name || !formUser.value.email) {
    alert('Please fill in ID, name, and email')
    return
  }

  if (!selectedUser.value && users.value.some(u => u.id === formUser.value.id)) {
    alert('User ID already exists')
    return
  }

  const newUser = {
    id: formUser.value.id,
    name: formUser.value.name,
    email: formUser.value.email,
    role: formUser.value.role,
    totalSavings: formUser.value.totalSavings || 0,
    activeLoans: formUser.value.activeLoans || 0,
    status: formUser.value.status,
    avatar: formUser.value.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }

  if (selectedUser.value) {
    alert('Editing existing users only updates display data. Savings and Loans data remain unchanged in this mock.')
    closeUserModal()
    return
  } else {
    savingsData.value.push({
      id: String(savingsData.value.length + 1),
      userId: newUser.id,
      userName: newUser.name,
      amount: 0,
      date: new Date(),
      type: 'deposit',
      balance: 0
    })
  }
  
  closeUserModal()
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