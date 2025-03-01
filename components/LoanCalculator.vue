<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <h3 class="text-lg font-medium text-gray-900 mb-4">Loan Calculator</h3>
    
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Loan Amount (₦)</label>
        <input
          type="number"
          v-model="amount"
          class="input-field mt-1"
          min="0"
          step="1000"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700">Duration (Months)</label>
        <select v-model="duration" class="input-field mt-1">
          <option v-for="month in availableDurations" :key="month" :value="month">
            {{ month }} months
          </option>
        </select>
      </div>
      
      <div class="pt-4 border-t border-gray-200">
        <dl class="space-y-3">
          <div class="flex justify-between">
            <dt class="text-sm text-gray-600">Interest Rate (2.5% per 3 months)</dt>
            <dd class="text-sm font-medium text-gray-900">₦{{ formatCurrency(interestAmount) }}</dd>
          </div>
          
          <div class="flex justify-between">
            <dt class="text-sm text-gray-600">Service Fee</dt>
            <dd class="text-sm font-medium text-gray-900">₦{{ formatCurrency(serviceFee) }}</dd>
          </div>
          
          <div class="flex justify-between pt-3 border-t border-gray-200">
            <dt class="text-base font-medium text-gray-900">Total Repayment</dt>
            <dd class="text-base font-medium text-gray-900">₦{{ formatCurrency(totalRepayment) }}</dd>
          </div>
          
          <div class="flex justify-between">
            <dt class="text-sm text-gray-600">Monthly Installment</dt>
            <dd class="text-sm font-medium text-gray-900">₦{{ formatCurrency(monthlyInstallment) }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const amount = ref(100000)
const duration = ref(6)
const serviceFee = 300
const interestRatePerQuarter = 0.025 // 2.5%

const availableDurations = [3, 6, 9, 12, 18, 24]

const interestAmount = computed(() => {
  const quarters = Math.ceil(duration.value / 3)
  return amount.value * interestRatePerQuarter * quarters
})

const totalRepayment = computed(() => {
  return amount.value + interestAmount.value + serviceFee
})

const monthlyInstallment = computed(() => {
  return totalRepayment.value / duration.value
})

const formatCurrency = (value: number) => {
  return value.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
</script>