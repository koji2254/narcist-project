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
                {{ user ? 'Edit User' : 'New User' }}
              </DialogTitle>

              <form @submit.prevent="handleSubmit" class="mt-4">
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      v-model="formData.name"
                      required
                      class="input-field mt-1"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      v-model="formData.email"
                      required
                      class="input-field mt-1"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Role</label>
                    <select v-model="formData.role" required class="input-field mt-1">
                      <option value="worker">Worker</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div v-if="!user">
                    <label class="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      v-model="formData.password"
                      required
                      class="input-field mt-1"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Status</label>
                    <select v-model="formData.status" required class="input-field mt-1">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
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
                  >
                    {{ user ? 'Update' : 'Create' }}
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
import { ref, onMounted } from 'vue'
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
  email: string
  role: 'admin' | 'worker'
  status: 'active' | 'inactive'
}

const props = defineProps<{
  isOpen: boolean
  user?: User | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: Partial<User>): void
}>()

const formData = ref({
  name: '',
  email: '',
  role: 'worker' as const,
  password: '',
  status: 'active' as const
})

onMounted(() => {
  if (props.user) {
    formData.value = {
      ...formData.value,
      ...props.user,
      password: '' // Don't populate password field
    }
  }
})

const closeModal = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('submit', {
    ...formData.value,
    // Only include password for new users
    ...(props.user ? { password: undefined } : {})
  })
}
</script>