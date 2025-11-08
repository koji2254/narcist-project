<template>
  <div class="min-h-screen bg-gray-50">
   <Spinner v-if="isLoading" />
    <!-- Page Header -->
    <header class="bg-white border-b border-gray-200 shadow-sm mb-8 p-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">User Management</h1>
            <p class="mt-1 text-sm text-gray-500">Manage users, roles, and permissions</p>
          </div>
          <button 
            class="px-4 py-2.5 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center w-full sm:w-auto"
            @click="openNewUserModal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Add New User
          </button>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Stats Overview
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <span class="inline-flex items-center justify-center h-12 w-12 rounded-md bg-emerald-100 text-emerald-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ users.length }}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <span class="inline-flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 text-purple-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Admin Users</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">
                      {{ users.filter(u => u.role === 'admin').length }}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <span class="inline-flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Worker Users</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">
                      {{ users.filter(u => u.role === 'worker').length }}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <span class="inline-flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">
                      {{ users.filter(u => u.status === 'active').length }}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <!-- Search and Filters -->
      <div class="bg-white shadow-sm rounded-lg border border-gray-200 p-6 mb-8">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                placeholder="Search by name, email or ID..."
                class="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Filter by Role</label>
            <select 
              v-model="roleFilter" 
              class="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="worker">Worker</option>
              <option value="user">user</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
            <select 
              v-model="statusFilter" 
              class="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="flex justify-between items-center mb-4">
        <p class="text-sm text-gray-600">
          Showing <span class="font-medium">{{ filteredUsers.length }}</span> of <span class="font-medium">{{ users.length }}</span> users
        </p>
        <div class="flex space-x-2">
          <button @click="exportUserData" class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Export
          </button>
          <button class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>
      </div>

      <!-- Horizontal Table (Above 1024px) -->
      <div class="bg-white shadow-sm rounded-lg overflow-hidden hidden lg:block mb-8">
        <table class="min-w-full divide-y divide-gray-200">
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
          <tr v-for="user in filteredUsers" :key="user._id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ user.fullName }}</div>
                  <div class="text-sm text-gray-500">ID: {{ user.ipssNumber }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full"
                    :class="user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'">
                {{ user.role }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              ₦{{ formatCurrency(user.totalSaving) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <span class="text-sm text-gray-900">{{ user.activeLoans }}</span>
                <span v-if="user.activeLoans > 0" class="ml-2 h-2 w-2 rounded-full bg-emerald-500"></span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                {{ user.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="viewUserDetails(user)" class="text-emerald-600 hover:text-emerald-900">View</button>
            </td>
          </tr>
            <tr v-if="filteredUsers.length === 0">
              <td colspan="6" class="px-6 py-10 text-center text-sm text-gray-500">
                <div class="flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>No users found matching your criteria</p>
                  <button 
                    @click="clearFilters" 
                    class="mt-2 text-emerald-600 hover:text-emerald-500 font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Vertical Cards (1024px or less) -->
      <div class="block lg:hidden space-y-4 mb-8">
        <div 
          v-for="user in filteredUsers" 
          :key="user.id" 
          class="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
        >
        <div class="p-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 class="text-sm font-medium text-gray-900">{{ user.fullName }}</h3>
            <p class="text-xs text-gray-500">ID: {{ user.ipssNumber }}</p>
          </div>
          <div class="flex gap-1">
            <span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">Active</span>
            <span class="px-2 py-0.5 text-xs font-semibold rounded-full"
                  :class="user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'">
              {{ user.role }}
            </span>
          </div>
        </div>
        <div class="p-4 grid grid-cols-2 gap-4">
          <div>
            <p class="text-xs font-medium text-gray-500">Savings</p>
            <p class="text-sm font-semibold text-gray-900">₦{{ formatCurrency(user.totalSaving) }}</p>
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500">Loans</p>
            <p class="text-sm font-semibold text-gray-900">{{ user.activeLoans }}</p>
          </div>
        </div>
          <div class="p-4 grid grid-cols-2 gap-4">
            <div>
              <p class="text-xs font-medium text-gray-500">Total Savings</p>
              <p class="text-sm font-semibold text-gray-900">₦{{ users && formatCurrency(user.totalSaving) }}</p>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500">Active Loans</p>
              <div class="flex items-center">
                <p class="text-sm font-semibold text-gray-900">{{ user.activeLoans }}</p>
                <span v-if="user.activeLoans > 0" class="ml-2 flex-shrink-0 h-2 w-2 rounded-full bg-emerald-500"></span>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 flex justify-end space-x-3">
            <button
              @click="viewUserDetails(user)"
              class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-150"
            >
              View Details
            </button>
            <!-- <button
              @click="editUser(user)"
              class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-150"
            >
              Edit
            </button> -->
          </div>
        </div>
        
        <div v-if="filteredUsers.length === 0" class="bg-white shadow-sm rounded-lg border border-gray-200 p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-gray-500 mb-2">No users found matching your criteria</p>
          <button 
            @click="clearFilters" 
            class="text-emerald-600 hover:text-emerald-500 font-medium"
          >
            Clear filters
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border border-gray-200 rounded-lg shadow-sm sm:px-6 mb-8">
        <div class="flex-1 flex justify-between sm:hidden">
          <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing <span class="font-medium">1</span> to <span class="font-medium">{{ Math.min(filteredUsers.length, 10) }}</span> of <span class="font-medium">{{ filteredUsers.length }}</span> results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Previous</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-emerald-50 text-sm font-medium text-emerald-600 hover:bg-emerald-100">
                1
              </button>
              <button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Next</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- User Form Modal -->
    <div v-if="isUserModalOpen" class="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div class="relative mx-auto p-6 border w-full max-w-md shadow-xl rounded-lg bg-white">
        <button 
          @click="closeUserModal" 
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-5">{{ selectedUser ? 'Edit User' : 'Add New User' }}</h3>
          <div class="mt-2 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">IPSS Number</label>
              <input
                v-model="formUser.id"
                type="text"
                class="focus:ring-emerald-500 focus:border-emerald-500 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="e.g., USR001"
                :disabled="selectedUser !== null"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                v-model="formUser.name"
                type="text"
                class="focus:ring-emerald-500 focus:border-emerald-500 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="e.g., John Doe"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                v-model="formUser.phone"
                type="phone"
                class="focus:ring-emerald-500 focus:border-emerald-500 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="+234 90905904"
              />
            </div>
          </div>
          <div class="mt-6 flex justify-end gap-3">
            <button 
              @click="closeUserModal" 
              class="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Cancel
            </button>
            <button 
              @click="handleUserSubmit" 
              class="px-4 py-2 bg-emerald-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- User Details Modal -->
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
          <div class="flex items-center mb-6">
            <div>
              <h3 class="text-xl font-bold text-gray-900 flex items-center gap-1">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </span>
              {{ selectedUser?.fullName }}</h3>
            </div>
          </div>
          
          <div class="bg-gray-50 rounded-lg p-4 mb-5">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-xs font-medium text-gray-500 mb-1">IPSS No.</p>
                <p class="text-sm font-semibold text-gray-900">{{ selectedUser?.ipssNumber }}</p>
              </div>
              <div>
                <p class="text-xs font-medium text-gray-500 mb-1">Role</p>
                <span
                  class="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-purple-100 text-purple-800': selectedUser?.role === 'admin',
                    'bg-emerald-100 text-emerald-800': selectedUser?.role === 'worker',
                    'bg-emerald-100 text-emerald-800': selectedUser?.role === 'user'
                  }"
                >
                  {{ selectedUser?.role }}
                </span>
              </div>
            </div>
          </div>
          

          <!--  -->
        <div class="mb-5">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Financial Summary</h4>
          <div class="bg-gray-50 rounded-lg p-4 space-y-3">
            <div class="flex justify-between">
              <span class="text-xs font-medium text-gray-500">Total Savings</span>
              <span class="text-sm font-bold text-emerald-600">₦{{ formatCurrency(selectedUser?.totalSaving) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-xs font-medium text-gray-500">Active Loans</span>
              <span class="text-sm font-bold text-blue-600">{{ selectedUser?.activeLoans }}</span>
            </div>
            <div v-if="selectedUser?.hasNextPayment" class="flex justify-between pt-2 border-t">
              <span class="text-xs font-medium text-gray-500">Next Payment</span>
              <div class="text-right">
                <span class="text-sm font-bold text-red-600">₦{{ formatCurrency(selectedUser?.nextPaymentAmount) }}</span>
                <p class="text-xs text-gray-500">{{ formatDate(selectedUser?.nextPaymentDate) }}</p>
              </div>
            </div>
            <div v-else class="text-xs text-gray-500 pt-2 border-t">No active loan</div>
          </div>
        </div>
          
        <div class="mb-5">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Reset User Password</h4>
          <div class="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">
            <div>
              <p class="text-xs font-medium text-gray-500 mb-1">New Password</p>
              <input 
                v-model="newPassword" 
                type="password" 
                placeholder="Enter new password (min 8 characters)"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                      ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                      focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              />

              <button
                @click="saveNewPassword"
                :disabled="isLoading"
                class="mt-3 inline-flex items-center px-4 py-1.5 border border-emerald-400 shadow-sm 
                      text-sm font-medium rounded-md text-emerald-700 bg-gray-100 
                      hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 
                      focus:ring-emerald-500"
              >
                <span v-if="!isLoading">Save password</span>
                <span v-else>Saving...</span>
              </button>
            </div>
          </div>
        </div>
          
          <div class="flex justify-between">
            <!-- <button 
              @click="editUser(selectedUser)" 
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit User
            </button> -->
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

      <!--Alert  Modal -->
      <AlertCard 
        v-if="alertDetails !== null" 
        :alertdetails="alertDetails" 
        @close="alertDetails = null"
      />


  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { baseUrl } from '~/assets/proxy'
import Spinner from '~/components/Spinner.vue'
import AlertCard from '~/components/AlertCard.vue'

const users = ref([])
const isLoading = ref(false)
const alertDetails = ref(null)
const newPassword = ref('')
const selectedUser = ref(null)

// Filters
const searchQuery = ref('')
const roleFilter = ref('all')
const statusFilter = ref('all')

// Modals
const isUserModalOpen = ref(false)
const showDetailsModal = ref(false)

// Form
const formUser = ref({
  id: '',
  name: '',
  phone: '',
  role: 'worker'
})

// Format currency
const formatCurrency = (value) => {
  return Number(value || 0).toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

// Format date
const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-NG', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Fetch Users
const getUsersDetails = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('auth_token')
    const { data } = await axios.get(`${baseUrl}/auth/get-users-details`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    // Normalize data
    users.value = (data.users || []).map(user => {
      const loan = user.approvedLoan
      const installments = loan?.monthlyInstallment || []
      const unpaid = installments.find(i => !i.paid)

      let nextPaymentAmount = 0
      let nextPaymentDate = null

      if (unpaid && loan?.createdAt) {
        nextPaymentAmount = unpaid.amount
        const start = new Date(loan.createdAt)
        const due = new Date(start)
        due.setMonth(due.getMonth() + unpaid.month)
        nextPaymentDate = due
      }

      return {
        ...user,
        ipssNumber: String(user.ipssNumber),
        totalSaving: user.totalSaving || 0,
        activeLoans: loan ? 1 : 0,
        status: 'active', // API doesn't have status → assume active
        nextPaymentAmount,
        nextPaymentDate,
        hasNextPayment: !!unpaid
      }
    })

  } catch (error) {
    console.error('Error:', error)
    alertDetails.value = { type: 'error', message: 'Failed to load users' }
  } finally {
    isLoading.value = false
  }
}

// Reset Password
const saveNewPassword = async () => {
  if (!newPassword.value || newPassword.value.length < 8) {
    alertDetails.value = { type: 'error', message: 'Password must be 8+ chars' }
    return
  }

  isLoading.value = true
  try {
    const token = localStorage.getItem('auth_token')
    await axios.post(
      `${baseUrl}/auth/resetPassword`,
      { ipssNumber: selectedUser.value.ipssNumber, newPassword: newPassword.value },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    alertDetails.value = { type: 'success', message: 'Password updated!' }
    newPassword.value = ''
  } catch (error) {
    alertDetails.value = { type: 'error', message: error.response?.data?.error || 'Failed' }
  } finally {
    isLoading.value = false
  }
}

// Computed: Filtered Users
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const search = searchQuery.value.toLowerCase()
    const matchesSearch = !search ||
      user.fullName.toLowerCase().includes(search) ||
      user.ipssNumber.includes(search)

    const matchesRole = roleFilter.value === 'all' || user.role === roleFilter.value
    const matchesStatus = statusFilter.value === 'all' || user.status === statusFilter.value

    return matchesSearch && matchesRole && matchesStatus
  })
})

// Actions
const clearFilters = () => {
  searchQuery.value = ''
  roleFilter.value = 'all'
  statusFilter.value = 'all'
}

const openNewUserModal = () => {
  selectedUser.value = null
  formUser.value = { id: '', name: '', phone: '', role: 'worker' }
  isUserModalOpen.value = true
}

const closeUserModal = () => {
  isUserModalOpen.value = false
}

const viewUserDetails = (user) => {
  selectedUser.value = user
  showDetailsModal.value = true
}

const closeDetailsModal = () => {
  showDetailsModal.value = false
  selectedUser.value = null
}

const handleUserSubmit = async () => {
  if (!formUser.value.id || !formUser.value.name) {
    alertDetails.value = { type: 'error', message: 'Fill ID & Name' }
    return
  }

  const newUser = {
    fullName: formUser.value.name,
    ipssNumber: formUser.value.id,
    phoneNumber: formUser.value.phone,
    role: formUser.value.role
  }

  isLoading.value = true
  try {
    const token = localStorage.getItem('auth_token')
    await axios.post(`${baseUrl}/auth/register`, newUser, {
      headers: { Authorization: `Bearer ${token}` }
    })
    alertDetails.value = { type: 'success', message: 'User created!' }
    getUsersDetails()
  } catch (error) {
    alertDetails.value = { type: 'error', message: error.response?.data?.error || 'Failed' }
  } finally {
    isLoading.value = false
    closeUserModal()
  }
}

// Export (keep your existing)
const exportUserData = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('auth_token')
    const { data } = await axios.get(`${baseUrl}/dashboard/general-stats`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob'
    })
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.download = 'users-stats.xlsx'
    link.click()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getUsersDetails()
})
</script>





// _________________________________________________________________
<style scoped>
/* Custom transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar for tables */
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