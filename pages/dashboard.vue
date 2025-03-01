<template>
  <div>
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
    </header>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Stats Cards -->
      <div v-for="stat in stats" :key="stat.name" class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <component :is="stat.icon" class="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">{{ stat.name }}</dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl font-semibold text-gray-900">{{ stat.value }}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Recent Activity -->
      <div class="bg-white shadow rounded-lg">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900">Recent Activity</h2>
          <div class="mt-6 flow-root">
            <ul role="list" class="-my-5 divide-y divide-gray-200">
              <li v-for="activity in recentActivity" :key="activity.id" class="py-5">
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                    <span class="inline-flex items-center justify-center h-8 w-8 rounded-full" :class="activity.iconBackground">
                      <component :is="activity.icon" class="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">
                      {{ activity.person }}
                    </p>
                    <p class="text-sm text-gray-500 truncate">{{ activity.description }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">{{ activity.date }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Chart -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Monthly Overview</h2>
        <div class="h-48">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BanknotesIcon, UserGroupIcon, DocumentTextIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const stats = [
  { name: 'Total Savings', value: '₦2,456,789', icon: BanknotesIcon },
  { name: 'Active Loans', value: '43', icon: DocumentTextIcon },
  { name: 'Total Users', value: '156', icon: UserGroupIcon },
  { name: 'Monthly Revenue', value: '₦345,678', icon: CurrencyDollarIcon },
]

const recentActivity = [
  {
    id: 1,
    person: 'John Doe',
    description: 'Deposited ₦50,000',
    date: '2 hours ago',
    icon: BanknotesIcon,
    iconBackground: 'bg-green-500',
  },
  // Add more activities...
]

const chartData = {
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [
    {
      label: 'Savings',
      data: [65, 80, 81],
      borderColor: '#0ea5e9',
      tension: 0.3,
      borderWidth: 2,
      pointRadius: 3,
    }
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: false
      },
      ticks: {
        maxTicksLimit: 5
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}
</script>