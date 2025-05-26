

<script setup>
import { baseUrl } from '~/assets/proxy'
import Spinner from '~/components/Spinner.vue'
import axios from 'axios'

import { ref ,onMounted } from 'vue'
import { 
  BanknotesIcon, 
  UserGroupIcon, 
  DocumentTextIcon, 
  CurrencyDollarIcon,
  HomeIcon,
  Cog6ToothIcon,
  UserIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EllipsisHorizontalIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import { Line, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

const sidebarOpen = ref(true)
const profileDropdown = ref(false)
const mainStats = ref(null)
const isLoading = ref(true)
const stats = ref([])
const userDetails = ref(null)
const recentActivities = ref([])



const getMainStats = async () => {
  try {
    const token = localStorage.getItem('auth_token') // This runs only in the browser
    const response = await axios.get(`${baseUrl}/dashboard/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    mainStats.value = response.data

        // For Monthly revenuw section
    const [monthName, revenueAmount] = Object.entries(mainStats.value.monthlyRevenue)[0] || ['N/A', 0]
    const [yearName, yearAmount] = Object.entries(mainStats.value.yearlyRevenue)[0] || ['N/A', 0]



        // Build stats array using fetched data
    stats.value = [
      { 
        name: 'Total Savings', 
        value: mainStats.value.totalSavings, 
        icon: BanknotesIcon, 
        bgColor: 'bg-emerald-600',
        change: '8.2%',
        changeType: 'increase'
      },
      { 
        name: 'Active Loans', 
        value: mainStats.value.totalApprovedLoans, 
        icon: DocumentTextIcon, 
        bgColor: 'bg-blue-600',
        change: '5.1%',
        changeType: 'increase'
      },
      { 
        name: 'Total Users', 
        value: mainStats.value.totalUsers, 
        icon: UserGroupIcon, 
        bgColor: 'bg-purple-600',
        change: '3.2%',
        changeType: 'increase'
      },
      {
      name: `Monthly Revenue (${monthName})`,
      value: `₦${revenueAmount.toLocaleString()}`,
      icon: CurrencyDollarIcon,
      bgColor: 'bg-amber-600',
      change: '2.3%',
      changeType: 'decrease'
    },
      {
      name: `Yearly Revenue (${yearName})`,
      value: `₦${yearAmount.toLocaleString()}`,
      icon: CurrencyDollarIcon,
      bgColor: 'bg-amber-600',
      change: '2.3%',
      changeType: 'decrease'
    },
    ]
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoading.value = false
  }


}

// Get Users Details get-users-details
const getUsersDetails = async () => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(`${baseUrl}/auth/get-users-details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const users = response.data.users
    const activities = []

    users.forEach((user, index) => {
      const lastTxn = user.lastSavingTransaction?.[0]
      if (lastTxn) {
        const amount = `₦${lastTxn.amount.toLocaleString()}`
        const action = lastTxn.type === 'withdrawal' ? 'Withdrew' : 'Deposited'
        const iconColor = lastTxn.type === 'withdrawal' ? 'bg-red-500' : 'bg-emerald-500'
        
        activities.push({
          id: index + 1,
          person: user.fullName,
          description: `${action} ${amount} from savings`,
          date: new Date(lastTxn.date).toLocaleString(), // format to your style
          icon: BanknotesIcon,
          iconBackground: iconColor,
        })
      }
    })

    recentActivities.value = activities
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoading.value = false
  }
}



onMounted(() => {
  getMainStats() // run only after component is mounted in browser

  getUsersDetails()
})


const recentLoans = [
  {
    id: 1,
    user: { name: 'John Doe', id: 'EMP001', initials: 'JD' },
    amount: '₦200,000',
    duration: '12 months',
    status: 'Pending',
    date: 'May 15, 2023'
  },
  {
    id: 2,
    user: { name: 'Sarah Johnson', id: 'EMP015', initials: 'SJ' },
    amount: '₦350,000',
    duration: '24 months',
    status: 'Approved',
    date: 'May 14, 2023'
  },
  {
    id: 3,
    user: { name: 'Michael Brown', id: 'EMP023', initials: 'MB' },
    amount: '₦150,000',
    duration: '6 months',
    status: 'Rejected',
    date: 'May 13, 2023'
  },
  {
    id: 4,
    user: { name: 'Emily Wilson', id: 'EMP042', initials: 'EW' },
    amount: '₦500,000',
    duration: '36 months',
    status: 'Approved',
    date: 'May 12, 2023'
  },
  {
    id: 5,
    user: { name: 'David Lee', id: 'EMP037', initials: 'DL' },
    amount: '₦250,000',
    duration: '18 months',
    status: 'Pending',
    date: 'May 11, 2023'
  }
]

const statusClasses = {
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Approved': 'bg-green-100 text-green-800',
  'Rejected': 'bg-red-100 text-red-800'
}

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Savings',
      data: [65, 80, 81, 85, 90, 95, 100, 110, 115, 120, 125, 130],
      borderColor: '#059669',
      backgroundColor: 'rgba(5, 150, 105, 0.1)',
      tension: 0.3,
      borderWidth: 2,
      pointRadius: 3,
      fill: true,
    },
    {
      label: 'Loans',
      data: [30, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90],
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      tension: 0.3,
      borderWidth: 2,
      pointRadius: 3,
      fill: true,
    }
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: { usePointStyle: true, boxWidth: 6 }
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      titleColor: '#1f2937',
      bodyColor: '#4b5563',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 10,
      boxPadding: 5,
      usePointStyle: true,
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || '';
          if (label) label += ': ';
          if (context.parsed.y !== null) label += '₦' + context.parsed.y.toLocaleString();
          return label;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { display: true, color: 'rgba(229, 231, 235, 0.5)' },
      ticks: {
        maxTicksLimit: 5,
        callback: function(value) { return '₦' + value.toLocaleString(); }
      }
    },
    x: { grid: { display: false } }
  },
  interaction: { intersect: false, mode: 'index' },
  elements: { point: { radius: 0, hoverRadius: 6, hitRadius: 6 } }
}

const doughnutData = {
  labels: ['Regular Savings', 'Fixed Deposits', 'Special Savings', 'Emergency Funds'],
  datasets: [
    {
      data: [45, 25, 20, 10],
      backgroundColor: ['#059669', '#2563eb', '#8b5cf6', '#f59e0b'],
      borderWidth: 0,
    }
  ]
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: { usePointStyle: true, boxWidth: 6, padding: 15 }
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          const label = context.label || '';
          const value = context.raw || 0;
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = Math.round((value / total) * 100);
          return `${label}: ${percentage}% (₦${value.toLocaleString()})`;
        }
      }
    }
  },
  cutout: '70%',
  animation: { animateScale: true, animateRotate: true }
}
</script>



<template>
  <Spinner v-if="isLoading" />
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile menu button -->
    <div class="fixed top-4 left-4 z-20 lg:hidden">
      <button @click="sidebarOpen = !sidebarOpen" class="p-2 rounded-md text-gray-500 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon v-if="!sidebarOpen" class="h-6 w-6" />
        <XMarkIcon v-else class="h-6 w-6" />
      </button>
    </div>

    <!-- Main Content -->
    <main>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- Welcome Card -->
        <div class="bg-white shadow-sm rounded-lg border border-gray-200 mb-8 overflow-hidden">
          <div class="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between">
            <div class="mb-4 sm:mb-0">
              <h2 class="text-xl font-bold text-gray-900 mb-2">Welcome back, Admin!</h2>
              <p class="text-gray-500">Here's what's happening with your organization today.</p>
            </div>
            <img src="@/public/narict logo.jpg" alt="Logo" class="h-16 w-16 rounded-full object-cover border-2 border-gray-200 shadow-md" />
          </div>
          <div class="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <div class="flex items-center text-gray-500">
              <ClockIcon class="h-5 w-5 mr-2" />
              <span>Last login: Today at 09:30 AM</span>
            </div>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div v-for="stat in stats" :key="stat.name" class="bg-white shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <span class="inline-flex items-center justify-center h-12 w-12 rounded-md" :class="stat.bgColor">
                    <component :is="stat.icon" class="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">{{ stat.name }}</dt>
                    <dd class="flex items-baseline">
                      <div class="text-2xl font-semibold text-gray-900">{{ stat.name === 'Total Savings' ? '₦' : '' }} {{ stat.value.toLocaleString() }}</div>
                      <!-- <div v-if="stat.change" :class="[stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600', 'ml-2 flex items-baseline text-sm font-semibold']">
                        <ArrowUpIcon v-if="stat.changeType === 'increase'" class="self-center flex-shrink-0 h-4 w-4 text-green-500" aria-hidden="true" />
                        <ArrowDownIcon v-else class="self-center flex-shrink-0 h-4 w-4 text-red-500" aria-hidden="true" />
                        <span class="sr-only">{{ stat.changeType === 'increase' ? 'Increased' : 'Decreased' }} by</span>
                        {{ stat.change }}
                      </div> -->
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3 border-t border-gray-200">
              <div class="text-sm">
                <!-- <a href="#" class="font-medium text-emerald-600 hover:text-emerald-500 transition-colors duration-150">
                  View details
                </a> -->
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
          <!-- Recent Activity -->
          <div class="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <div class="px-6 py-5 border-b border-gray-200 bg-gray-50">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-medium text-gray-900">Recent Activity</h2>
                <div class="flex space-x-2">
                  <button class="p-1 rounded-full text-emerald-600 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-150">
                    <!-- <RefreshIcon class="h-5 w-5" /> -->
                  </button>
                  <button class="p-1 rounded-full text-emerald-600 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-150">
                    <EllipsisHorizontalIcon class="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            <div class="px-6 py-4">
              <div class="flow-root">
                <ul role="list" class="-my-5 divide-y divide-gray-200">
                  <li v-for="activity in recentActivities" :key="activity.id" class="py-4 hover:bg-gray-50 rounded-md px-2 transition-colors duration-150">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <span class="inline-flex items-center justify-center h-10 w-10 rounded-full shadow-sm" :class="activity.iconBackground">
                          <component :is="activity.icon" class="h-5 w-5 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate">{{ activity.person }}</p>
                        <p class="text-sm text-gray-500 truncate">{{ activity.description }}</p>
                      </div>
                      <div>
                        <p class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{{ activity.date }}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="mt-6">
                <a href="#" class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-150">
                  View all
                </a>
              </div>
            </div>
          </div>

          <!-- Savings Summary -->
          <div class="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <div class="px-6 py-5 border-b border-gray-200 bg-gray-50">
              <h2 class="text-lg font-medium text-gray-900">Savings Summary</h2>
            </div>
            <div class="p-6">
              <!-- <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div class="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 class="text-sm font-medium text-gray-700 mb-2">Total Deposits</h3>
                  <p class="text-2xl font-bold text-gray-900">₦3,245,678</p>
                  <div class="mt-2 flex items-center text-sm text-green-600">
                    <ArrowUpIcon class="h-4 w-4 mr-1" />
                    <span>12% from last month</span>
                  </div>
                </div>
                <div class="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 class="text-sm font-medium text-gray-700 mb-2">Total Withdrawals</h3>
                  <p class="text-2xl font-bold text-gray-900">₦1,567,890</p>
                  <div class="mt-2 flex items-center text-sm text-red-600">
                    <ArrowDownIcon class="h-4 w-4 mr-1" />
                    <span>5% from last month</span>
                  </div>
                </div>
              </div> -->
              <div class="mt-6">
                <h3 class="text-sm font-medium text-gray-700 mb-3">Savings Distribution</h3>
                <div class="h-60">
                  <div class="p-6">
                    <div class="h-64">
                      <Line :data="chartData" :options="chartOptions" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

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

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
</style>