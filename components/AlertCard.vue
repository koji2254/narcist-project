<script setup>

    defineProps({
    alertdetails: {
        type: Object,
        required: true
    }
    });
</script>

<template>
  <div v-if="alertdetails !== null" class="fixed inset-0 z-150 bg-gray-600 bg-opacity-75 h-full w-full flex items-center justify-center">
    <div class="relative mx-auto p-6 border w-full max-w-md shadow-xl rounded-lg bg-white">
      <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
        <!-- Close icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="flex flex-col items-center text-lg font-medium text-gray-900">
        <div>
          <!-- Success Icon -->
            <svg 
                v-if="alertdetails.type === 'success'"
                xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#75FB4C"><path d="M480-80q-84.33 0-157.33-30.83-73-30.84-127-84.84t-84.84-127Q80-395.67 80-480q0-83.67 30.83-156.67 30.84-73 84.84-127t127-85.16Q395.67-880 480-880q71.67 0 134.33 22.33Q677-835.33 728-796l-48 48.33q-42-31.33-92.33-48.5-50.34-17.16-107.67-17.16-141 0-237.17 96.16Q146.67-621 146.67-480t96.16 237.17Q339-146.67 480-146.67t237.17-96.16Q813.33-339 813.33-480q0-26-3.66-51-3.67-25-11-48.67L851-632q14.33 35.33 21.67 73.33 7.33 38 7.33 78.67 0 84.33-31.17 157.33-31.16 73-85.16 127t-127 84.84Q563.67-80 480-80Zm-58-217.33L255.33-464.67 304-513.33l118 118L831.33-805l49.34 48.67-458.67 459Z"/>
            </svg>
        
            <svg 
                v-if="alertdetails.type === 'error'"
                xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#8B1A10"><path d="m40-120 440-760 440 760H40Zm115.33-66.67h649.34L480-746.67l-324.67 560ZM482.78-238q14.22 0 23.72-9.62 9.5-9.61 9.5-23.83 0-14.22-9.62-23.72-9.61-9.5-23.83-9.5-14.22 0-23.72 9.62-9.5 9.62-9.5 23.83 0 14.22 9.62 23.72 9.62 9.5 23.83 9.5Zm-33.45-114H516v-216h-66.67v216ZM480-466.67Z"/>
            </svg>
        </div>
        <div class="mt-3">
          {{ alertdetails.message }}
        </div>
      </div>
    </div>
  </div>
</template>
