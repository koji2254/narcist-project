<template>
  <div class="min-h-screen bg-gray-50">
   <Spinner v-if="isLoading" />
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
              <!-- <option value="all">All Statuses</option> -->
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
          <button @click="exportLoanFile" class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
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
            <tr v-for="loan in filteredLoans" :key="loan.ipssNumber" class="hover:bg-gray-50 transition-colors duration-150">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ loan.userName }}</div>
                    <div class="text-sm text-gray-500">ID: {{ loan.ipssNumber }}</div>
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
                  @click="makeLoanPayment(loan)"
                  class="text-emerald-600 hover:text-emerald-900 transition-colors duration-150"
                >
                  Make Payment
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
                <p class="text-xs text-gray-500">IPSS: {{ loan.ipssNumber }}</p>
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
              <p class="text-sm font-semibold text-gray-900">{{ loan.monthlyInstallment.length }} months</p>
            </div>
            <!-- <div>
              <p class="text-xs font-medium text-gray-500">Next Payment</p>
              <p class="text-sm font-semibold text-gray-900">{{ formatDate(loan.nextPayment) }}</p>
            </div> -->
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
              @click="makeLoanPayment(loan)"
              class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-150"
            >
             Make Payment
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
                <label class="block text-sm font-medium text-gray-700 mb-1">ipssNumber</label>
                <input
                  v-model="newLoan.ipssNumber"
                  type="text"
                  class="focus:ring-emerald-500 focus:border-emerald-500 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="e.g., USR001"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                <input
                  v-model="newLoan.userName"
                  readonly
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
                @click="getLoanTerm" 
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
                  <p class="text-sm font-semibold text-gray-900">{{ selectedLoan.ipssNumber }}</p>
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
              <p class="bg">Amount to be paid upfront ₦{{ processingLoan.totalInterestAmount.toLocaleString() }}</p>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Action</label>
                <select 
                  v-model="processAction" 
                  class="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md"
                >
                  <option value="approved">Approved</option>
                  <option value="rejected">Reject</option>
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

      <!-- Make a LOAN PAYMENT -->
      <div v-if="loanPaymentModal" class="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
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
            <h3 class="text-lg font-medium text-gray-900 mb-5">Make Loan Payment</h3>
            <div class="mt-2">
              <p class="text-sm text-gray-700 mb-4">
                Confirm completion of loan for {{ completingLoan.userName }} 
                (₦{{ completingLoan.amount.toLocaleString() }})
              </p>
            </div>
            <div class="border p-2 rounded max-h-[300px] overflow-scroll">
              <h2>Installments</h2>

                <div 
                  class="bg-white my-1 p-1 border-t border-l-gray-300 text-sm" 
                  v-for="install in completingLoan.installments" 
                  :key="install.amount"
                >
                  <p>Amount: ₦{{ install.amount.toLocaleString() }}</p>
                  <p>Month: {{ install.month }}</p>
                  <p>
                     Paid: 
                      <span :class="install.paid ? 'bg-emerald-600' : 'bg-red-700'" class="px-1 text-gray-200 rounded ">
                        {{ install.paid }}
                      </span>
                  </p>
                </div>
            </div>
            <div class="mt-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Amount (₦)</label>
                <input
                  v-model="loanPaymentForm.amount"
                  type="number"
                  class="focus:ring-emerald-500 focus:border-emerald-500 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder=""
                />
              </div>
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
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- SHOW UI FOR THE LOAN TERM -->
      <div v-if="showLaonTermModal" class="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
        <div class="relative mx-auto p-6 border w-full max-w-md shadow-xl rounded-lg bg-white">
           <button 
            @click="closeLoanTermModal" 
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
            <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-5">Loan Term Properties</h3>
            <div class="mt-2 space-y-4">
              <div class="flex gap-1 text-xl items-center py-1 justify-between border-t border-gray-300">
                <label class="text-md text-gray-700">Amount</label>
                <p class="text-semibold text-lg text-gray-800">₦{{ loanTerm && loanTerm.repaymentAmount.toLocaleString() }}</p>
              </div>
              <div class="flex gap-1 items-center text-lg justify-between border-t border-gray-300">
                <label class="flex text-gray-700">Interest Rate</label>
                <p class="text-semibold text-gray-800">{{ loanTerm && loanTerm.totalInterest }} %</p>
              </div>
              <div class="flex gap-1 items-center text-lg justify-between border-t border-gray-300">
                <label class="text-gray-700">Interest Amount</label>
                <p class="text-semibold text-gray-800">₦{{ loanTerm &&loanTerm.interestAmount.toLocaleString() }}</p>
              </div>
              <div class="flex gap-1 items-center text-lg justify-between border-t border-gray-300">
                <label class="flex text-gray-700">Transaction Fee</label>
                <p class="text-semibold text-gray-800">₦300</p>
              </div>
              <!-- <div class="flex gap-1 items-center text-lg justify-between border-t border-gray-300">
                <label class="text-gray-700">Repayment Amount</label>
                <p class="text-semibold text-gray-800">₦{{  loanTerm && loanTerm.totalInterestAmount.toLocaleString() }}</p>
              </div> -->
              <div class="flex font-semibold gap-1 items-center text-lg justify-between border-t border-gray-300">
                <label class="text-gray-700 ">Total Interest Amount</label>
                <p class="text-semibold text-gray-800">₦{{ loanTerm && loanTerm.totalInterestAmount.toLocaleString() }}</p>
              </div>
              
              <div v-if="loanTerm">
              <div class="bg-gray100 p-2 border rounded max-h-[200px] overflow-scroll">
                <h3 class="text-lg font-medium text-gray-900 mb-5">Installments</h3>
                
                <div 
                  class="bg-white my-1 p-1 border-t border-l-gray-300 text-sm" 
                  v-for="install in loanTerm.installments" 
                  :key="install.amount"
                >
                  <p>Amount: ₦{{ install.amount.toLocaleString() }}</p>
                  <p>Month: {{ install.month }}</p>
                  <p>Paid: {{ install.paid }}</p>
                </div>
              </div>
            </div>

            </div>
            <div class="mt-6 flex justify-end gap-3">
              <button 
                @click="closeLoanTermModal" 
                class="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Cancel
              </button>
              <button 
                @click="saveLoanInfo" 
                class="px-4 py-2 bg-emerald-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Confirm
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { baseUrl } from '~/assets/proxy'
import Spinner from '~/components/Spinner.vue'
import AlertCard from '~/components/AlertCard.vue'

// State remains unchanged
const searchQuery = ref('')
const statusFilter = ref('pending')
const isLoading = ref(true)
const loans = ref([
  // {
  //   id: '2',
  //   ipssNumber: 'USR002',
  //   userName: 'Jane Smith',
  //   amount: 250000,
  //   duration: 12,
  //   status: 'approvedd',
  //   nextPayment: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
  // }
])
const showNewLoanModal = ref(false)
const showDetailsModal = ref(false)
const showProcessModal = ref(false)
const loanPaymentModal = ref(false)
const showLaonTermModal = ref(false)
const selectedLoan = ref(null)
const processingLoan = ref({})
const completingLoan = ref({})
const loanPaymentForm = ref({
  ipssNumber: '',
  amount: ''
})
const processAction = ref('approved')
const newLoan = ref({
  ipssNumber: '',
  userName: '',
  amount: 0,
  duration: 0
})
const user = ref(null)
const loanTerm = ref(null)
const alertDetails = ref(null)


const getAlLoans = async () => {
  isLoading.value = true
  try {

    const stats = {
      status: statusFilter.value,
    }

    const token = localStorage.getItem('auth_token')
    const response = await axios.post(`${baseUrl}/loan/get-loans-by-status`, stats,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const fetchedLoans = response.data.Loans
    loans.value = fetchedLoans  // ✅ safe assignment

    console.log(fetchedLoans)   // ✅ safe to log
  } catch (error) {
    console.error('Error fetching savings history:', error)
  } finally {
    isLoading.value = false
  }
}

watch(statusFilter, (newStatus) => {
  console.log('Status changed to:', newStatus)
  getAlLoans() // your function to fetch data based on status
})

onMounted(() => {
  getAlLoans()
})

// Computed remains unchanged
const filteredLoans = computed(() => {
  return loans.value.filter(loan => {
    const matchesSearch = 
      loan.fullName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      loan.ipssNumber.toLowerCase().includes(searchQuery.value.toLowerCase())
    
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
  newLoan.value = { ipssNumber: '', userName: '', amount: 0, duration: 0 }
  showNewLoanModal.value = true
}

const closeNewLoanModal = () => {
  showNewLoanModal.value = false
}

const closeLoanTermModal = () => {
  showLaonTermModal.value = false
}

watch(() => newLoan.value.ipssNumber, async (val) => {
  // Restrict input to 6 characters
  if (val.length > 6) {
    newLoan.value.ipssNumber = val.slice(0, 6)
    return
  }

  // Make request when exactly 6 characters
  if (val.length === 6) {
    isLoading.value = true
    try {
      const token = localStorage.getItem('auth_token')
      const response = await axios.get(`${baseUrl}/auth/user/search?ipssNumber=${val}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

      const user = response.data.user
      user.value = response.data.user
      newLoan.value.userName = user.value.fullName || '' // fallback in case fullName is undefined

    } catch (error) {
      console.error('User search failed:', error)
      alertDetails.value = {type:'error', message:'User not found'}
      showAlertModal.value = true
      user.value = null
    } finally {
       isLoading.value = false
    }
  }
})

const getLoanTerm = async () => {
    if (!newLoan.value.ipssNumber || !newLoan.value.userName || newLoan.value.amount <= 0 || newLoan.value.duration <= 0) {
    alert('Please fill all fields correctly')
    return
  }

  const loanEnq = {
    ipssNumber: newLoan.value.ipssNumber,
    amount: newLoan.value.amount,
    term_month : newLoan.value.duration
  }

  isLoading.value = true
  try {
    
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(`${baseUrl}/loan/loan-terms`, loanEnq, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    loanTerm.value = response.data.loanTerms

    console.log(response.data.loanTerms)

  } catch (error) {
    console.error('User search failed:', error.response.data.error)

    if(error.response.data.error){
      alert(error.response.data.error)

      showLaonTermModal.value = false
    }


  }finally {
    isLoading.value = false
  }

  
  showNewLoanModal.value = false
  showLaonTermModal.value = true
}

const saveLoanInfo = async () => {

  isLoading.value = true
  const loanMain = {
      ...newLoan.value,
      term_month: newLoan.value.duration
    }

  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(`${baseUrl}/loan/create-loan`,loanMain ,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if(response.status >= 200 && response.status < 300){
      // alert(`Loan of ${loanMain.amount} was Successfull`)
      isLoading.value = false
      alertDetails.value = { type:'success', message:`Loan of ${loanMain.amount.toLocaleString()} was Successfull` }
      // get all the loans || it should be with the state manager
      getAlLoans()
      
      showLaonTermModal.value = false
    }
    

  
  } catch (error) {
    console.log(error)    
  }finally {
    isLoading.value = false
  }

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
  processingLoan.value = {
    amount: loan.amount,
    ipssNumber: loan.ipssNumber,
    userName: loan.fullName,
    totalInterestAmount: loan.totalInterestAmount
  }

  processAction.value = 'approved'
  showProcessModal.value = true
}

const closeProcessModal = () => {
  showProcessModal.value = false
  processingLoan.value = null
}

const confirmProcessLoan = async () => {
  
  isLoading.value = true
  const statusInfo = {
      status: processAction.value,
      ipssNumber: processingLoan.value.ipssNumber
    }

  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.patch(`${baseUrl}/loan/update-status`,statusInfo ,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if(response.status >= 200 && response.status < 300){
      alertDetails.value = { type:'success', message:`Loan ${processingLoan.value.amount.toLocaleString()} ${statusInfo.status}`}
      
      // get all the loans || it should be with the state manager
      getAlLoans()
      
      showLaonTermModal.value = false
    }
    

  
  } catch (error) {
    console.log(error)  
    alertDetails.value = { type:'error', message: `${error.response.data.error || error.response.data.message}` }  
  }finally {
    isLoading.value = false
  }


  showProcessModal.value = false
  processingLoan.value = null
}

const makeLoanPayment = (loan) => {
  completingLoan.value = {
    amount: loan.amount,
    ipssNumber: loan.ipssNumber,
    userName: loan.fullName,
    installments: loan.monthlyInstallment
  }

  loanPaymentForm.value = {
    ipssNumber: loan.ipssNumber,
    amount: ''
  }

  loanPaymentModal.value = true
}

const closeCompleteModal = () => {
   loanPaymentForm.value = {
    ipssNumber: '',
    amount: ''
  }

  loanPaymentModal.value = false
  completingLoan.value = null
}



// confirmCompleteLoan = async () => {
const confirmCompleteLoan = async () => {

  if(loanPaymentForm.value.amount === 0 || loanPaymentForm.value.amount === ''){

    return alertDetails.value = {type:'error', message:'Input a valid amount'}
  }

  console.log(loanPaymentForm)
  
  isLoading.value = true
  const dataInfo = {
      amount: loanPaymentForm.value.amount,
      ipssNumber: loanPaymentForm.value.ipssNumber
    }

  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(`${baseUrl}/loan/make-payment`,dataInfo ,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if(response.status >= 200 && response.status < 300){
      alertDetails.value = {type:'success', message: `Payment of ${dataInfo.amount.toLocaleString()} is successfull`}
      
      // get all the loans || it should be with the state manager
      
      

      loanPaymentModal.value = false
      completingLoan.value = null

      loanPaymentForm.value = {
        ipssNumber: '',
        amount: ''
      }
      
      getAlLoans()
     
    }
      
  } catch (error) {
    console.log(error)  

    alertDetails.value = {type:'error', message: `${error.response.data.error || error.response.data.message}`}
  }finally {
     getAlLoans()
    isLoading.value = false


  }
}


// Export data in excel format
const exportLoanFile = async () => {
    isLoading.value = true
  try {
     const token = localStorage.getItem('auth_token')
    const response = await axios.get(`${baseUrl}/loan/loan-stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    
  } catch (error) {
    console.error('Error fetching Loan data:', error)
  } finally {
    isLoading.value = false
  }
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