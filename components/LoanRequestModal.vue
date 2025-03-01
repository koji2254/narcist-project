<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                New Loan Request
              </DialogTitle>

              <div class="mt-4">
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">User</label>
                    <select v-model="selectedUser" class="input-field mt-1">
                      <option v-for="user in users" :key="user.id" :value="user">
                        {{ user.name }}
                      </option>
                    </select>
                  </div>

                  <div v-if="selectedUser">
                    <div class="bg-gray-50 rounded p-4">
                      <h4 class="text-sm font-medium text-gray-900">User Details</h4>
                      <dl class="mt-2 text-sm">
                        <div class="flex justify-between">
                          <dt class="text-gray-600">ID:</dt>
                          <dd class="text-gray-900">{{ selectedUser.id }}</dd>
                        </div>
                        <div class="flex justify-between mt-1">
                          <dt class="text-gray-600">Current Savings:</dt>
                          <dd class="text-gray-900">₦{{ formatCurrency(selectedUser.savings) }}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div class="sm:col-span-2">
                    <LoanCalculator />
                  </div>
                </div>
              </div>

              <div class="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  class="btn-secondary"
                  @click="closeModal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn-primary"
                  @click="submitLoanRequest"
                >
                  Submit Request
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

interface User {
  id: string
  name: string
  savings: number
}

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: any): void
}>()

const selectedUser = ref<User | null>(null)

// Mock data - replace with API call
const users = ref<User[]>([
  { id: 'USR001', name: 'John Doe', savings: 150000 },
  { id: 'USR002', name: 'Jane Smith', savings: 75000 },
])

const formatCurrency = (value: number) => {
  return value.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

const closeModal = () => {
  emit('close')
}

const submitLoanRequest = () => {
  // TODO: Implement loan request submission
  emit('submit', {
    user: selectedUser.value,
    // Add other loan details
  })
  closeModal()
}
</script>