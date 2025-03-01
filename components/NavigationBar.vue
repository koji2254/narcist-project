<template>
  <nav class="bg-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <NuxtLink to="/login" class="flex items-center">
            <span class="text-xl font-bold text-primary-600">S&L Admin</span>
          </NuxtLink>
          
          <!-- Horizontal Navbar Items (Above 771px) -->
          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <NuxtLink 
              to="/dashboard"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
            >
              Dashboard
            </NuxtLink>
            <NuxtLink 
              to="/savings"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Savings
            </NuxtLink>
            <NuxtLink 
              to="/loans"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Loans
            </NuxtLink>
            <NuxtLink 
              to="/users"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Users
            </NuxtLink>
          </div>
        </div>
        
        <div class="flex items-center">
          <!-- Hamburger Menu Button (Below 771px) -->
          <button
            type="button"
            class="md:hidden p-2 rounded-md text-gray-900 hover:bg-gray-100 focus:outline-none"
            @click="toggleMenu"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          
          <!-- User Menu (Above 771px) -->
          <div class="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
            <UserMenu />
          </div>
        </div>
      </div>

      <!-- Mobile Menu (Below 771px, shown when hamburger is clicked) -->
      <div v-if="isMenuOpen" class="md:hidden pb-4">
        <div class="space-y-1">
          <NuxtLink 
            to="/dashboard"
            class="block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
            @click="toggleMenu"
          >
            Dashboard
          </NuxtLink>
          <NuxtLink 
            to="/savings"
            class="block px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            @click="toggleMenu"
          >
            Savings
          </NuxtLink>
          <NuxtLink 
            to="/loans"
            class="block px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            @click="toggleMenu"
          >
            Loans
          </NuxtLink>
          <NuxtLink 
            to="/users"
            class="block px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            @click="toggleMenu"
          >
            Users
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { NuxtLink } from '#components'

// Assuming UserMenu is a separate component; if not, define it or remove it
import UserMenu from '~/components/UserMenu.vue'

// State for hamburger menu
const isMenuOpen = ref(false)

// Methods
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>