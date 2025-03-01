<template>
  <div class="min-h-screen bg-gray-50">
    <NavigationBar v-if="showNav" />
    <main class="container mx-auto px-4 py-6">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const showNav = computed(() => !route.path.includes('/login') && !route.path.includes('/user'))
</script>