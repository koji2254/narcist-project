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
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                New Savings Transaction
              </DialogTitle>

              <form @submit.prevent="handleSubmit" class="mt-4">
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">User</label>
                    <select v-model="selectedUser" required class="input-field mt-1">
                      <option v-for="user in users" :key="user.id" :value="user">
                        {{ user.name }}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Transaction Type</label>
                    <select v-model="transactionType" required class="input-field mt-1">
                      <option value="deposit">Deposit</option>
                      <option value="withdrawal">Withdrawal</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Amount (₦)</label>
                    <input
                      type="number"
                      v-model="amount"
                      required
                      min="0"
                      step="100"
                      class="input-field mt-1"
                    />
                  </div>

                  <div v-if="selectedUser">
                    <div class="bg-gray-50 rounded p-4">
                      <h4 class="text-sm font-medium text-gray-900">Current Balance</h4>
                      <p class="mt-1 text-2xl font-semibold text-gray-900">
                        ₦{{ formatCurrency(selectedUser.balance) }}
                      </p>
                      <p class="mt-2 text-sm text-gray-500">
                        New Balance after transaction:
                        <span class="font-medium text-gray-900">
                          ₦{{ formatCurrency(newBalance) }}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea
                      v-model="notes"
                      rows="3"
                      class="input-field mt-1"
                      placeholder="Add any additional notes..."
                    ></textarea>
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
                    type="submit"
                    class="btn-primary"
                    :disabled="!isValidTransaction"
                  >
                    Submit Transaction
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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
  balance: number
}

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: any): void
}>()

// Mock data - replace with API call
const users = ref<User[]>([
  { id: 'USR001', name: 'John Doe', balance: 150000 },
  { id: 'USR002', name: 'Jane Smith', balance: 75000 },
])

const selectedUser = ref<User | null>(null)
const transactionType = ref<'deposit' | 'withdrawal'>('deposit')
const amount = ref<number>(0)
const notes = ref('')

const newBalance = computed(() => {
  if (!selectedUser.value) return 0
  return transactionType.value === 'deposit'
    ? selectedUser.value.balance + amount.value
    : selectedUser.value.balance - amount.value
})

const isValidTransaction = computed(() => {
  if (!selectedUser.value || amount.value <= 0) return false
  if (transactionType.value === 'withdrawal') {
    return newBalance.value >= 0
  }
  return true
})

const formatCurrency = (value: number) => {
  return value.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

const closeModal = () => {
  emit('close')
}

const handleSubmit = () => {
  if (!isValidTransaction.value) return

  emit('submit', {
    userId: selectedUser.value?.id,
    type: transactionType.value,
    amount: amount.value,
    notes: notes.value,
    newBalance: newBalance.value
  })
  closeModal()
}
</script>