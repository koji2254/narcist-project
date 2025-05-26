<template>
  <div class="bg-white border-b border-gray-200">
    <!-- Desktop Navbar -->
    <div class=" mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo and Navigation Links -->
        <div class="flex items-center">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center mr-6">
            <NuxtLink to="/dashboard" class="flex items-center">
              <img 
                src="@/public/narict logo.jpg" 
                alt="NARICT Logo" 
                class="h-10 w-auto mr-2"
                onerror="this.onerror=null; this.src='https://via.placeholder.com/40x40?text=NARICT'; this.classList.add('rounded-md');"
              />
              <div class="flex flex-col">
                <span class="text-lg font-bold text-emerald-700 leading-tight">NARICT</span>
                <span class="text-xs text-gray-500 leading-tight">Savings & Loans</span>
              </div>
            </NuxtLink>
          </div>
          
          <!-- Desktop Navigation Links -->
          <div v-if="role === 'admin'" class="hidden md:flex md:space-x-6">
            <NuxtLink 
              v-for="(item, index) in navItems" 
              :key="index"
              :to="item.to"
              class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
              :class="[
                $route.path === item.to 
                  ? 'text-emerald-700 bg-emerald-50' 
                  : 'text-gray-600 hover:text-emerald-700 hover:bg-gray-50'
              ]"
            >
              <component :is="item.icon" class="h-5 w-5 mr-1.5" />
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>
        
        <!-- Right Side Menu -->
        <div v-if="role === 'admin'" class="flex items-center space-x-4">
          <!-- Notification Bell -->
          <button class="p-2 rounded-full text-gray-500 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 relative">
            <span class="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          
          <!-- User Menu -->
          <div class="relative">
            <button 
              @click.stop="toggleUserMenu"
              class="flex items-center max-w-xs bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <span class="sr-only">Open user menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>

              <span v-if="role === 'admin'"  class="ml-2 text-sm font-medium text-gray-700 hidden sm:block">Admin User</span>
              <span v-if="role === 'user'"  class="ml-2 text-sm font-medium text-gray-700 hidden sm:block">User</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 ml-1 hidden sm:block" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <!-- User Dropdown Menu -->
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div 
                v-if="isUserMenuOpen" 
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50"
              >
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                <a @click="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
              </div>
            </transition>
          </div>
          
          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                v-if="!isMobileMenuOpen"
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                v-else
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isMobileMenuOpen" class="md:hidden bg-white border-b border-gray-200">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NuxtLink
            v-for="(item, index) in navItems"
            :key="index"
            :to="item.to"
            class="flex items-center px-3 py-2 rounded-md text-base font-medium"
            :class="[
              $route.path === item.to
                ? 'text-emerald-700 bg-emerald-50'
                : 'text-gray-600 hover:text-emerald-700 hover:bg-gray-50'
            ]"
            @click="isMobileMenuOpen = false"
          >
            <component :is="item.icon" class="h-5 w-5 mr-2" />
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { defineComponent } from 'vue'
import { role, loadRole } from '~/assets/useUserRole'
  
const router = useRouter()

const route = useRoute()
const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)
const user = ref(null)
console.log(role.value)

onMounted(() => {
  loadRole() // Load role AFTER page is mounted
})

// Toggle user menu and prevent event bubbling
const toggleUserMenu = (event) => {
  event.stopPropagation()
  isUserMenuOpen.value = !isUserMenuOpen.value
}

// Close user menu when clicking outside
const closeUserMenu = (event) => {
  if (isUserMenuOpen.value && !event.target.closest('.relative')) {
    isUserMenuOpen.value = false
  }
}

const logout = () => {
   // Simple logout: Navigate back to login page
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_info')
    router.push('../')
}

if (process.client) {
  window.addEventListener('click', closeUserMenu)
  onUnmounted(() => {
    window.removeEventListener('click', closeUserMenu)
  })
}

// Navigation items with icons
const navItems = [
  {
    name: 'Dashboard',
    to: '/dashboard',
    icon: defineComponent({
      render() {
        return h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          class: 'h-5 w-5',
          fill: 'none',
          viewBox: '0 0 24 24',
          stroke: 'currentColor'
        }, [
          h('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
          })
        ])
      }
    })
  },
  {
    name: 'Savings',
    to: '/savings',
    icon: defineComponent({
      render() {
        return h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          class: 'h-5 w-5',
          fill: 'none',
          viewBox: '0 0 24 24',
          stroke: 'currentColor'
        }, [
          h('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          })
        ])
      }
    })
  },
  {
    name: 'Loans',
    to: '/loans',
    icon: defineComponent({
      render() {
        return h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          class: 'h-5 w-5',
          fill: 'none',
          viewBox: '0 0 24 24',
          stroke: 'currentColor'
        }, [
          h('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
          })
        ])
      }
    })
  },
  {
    name: 'Users',
    to: '/users',
    icon: defineComponent({
      render() {
        return h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          class: 'h-5 w-5',
          fill: 'none',
          viewBox: '0 0 24 24',
          stroke: 'currentColor'
        }, [
          h('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
          })
        ])
      }
    })
  }
]
</script>

<style scoped>
/* Custom styles */
.router-link-active {
  @apply text-emerald-700 bg-emerald-50;
}
</style>