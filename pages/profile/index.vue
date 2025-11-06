<template>
  <Spinner v-if="isLoading" />
  <div class="container mx-auto px-4 py-4 bg-white">
    <!-- Header -->
    <header class="mb-6 flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="22px"
        viewBox="0 -960 960 960"
        width="22px"
        fill="#0BAE3C"
      >
        <path
          d="m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"
        />
      </svg>
      <h1 class="text-lg font-semibold text-gray-700">Profile</h1>
    </header>

    <!-- Profile Info -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
      <div v-if="userStats">
        <h2 class="font-semibold text-base text-gray-800">{{ userStats.fullName }}</h2>

        <div class="flex items-center gap-2 text-gray-600 text-sm mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-4 h-4"
          >
            <path
              fill-rule="evenodd"
              d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
              clip-rule="evenodd"
            />
          </svg>
          <span>+234 {{ userStats.phoneNumber ?? "No phone provided" }}</span>
        </div>
      </div>
    </div>

    <!-- Password Reset Section -->
    <div v-if="userStats" class="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <h3 class="text-gray-800 text-base font-medium mb-3">Reset Password</h3>

      <!-- Old Password -->
      <div class="mb-3">
        <label for="old_password" class="block text-sm text-gray-700 mb-1">
          Old Password
        </label>
        <input
          id="old_password"
          v-model="old_password"
          type="password"
          placeholder="********"
          class="w-full rounded-md border border-gray-300 py-1.5 px-2 text-gray-900 text-sm focus:ring-2 focus:ring-green-600 outline-none"
        />
      </div>

      <!-- New Password -->
      <div class="mb-3">
        <label for="new_password" class="block text-sm text-gray-700 mb-1">
          New Password
        </label>
        <input
          id="new_password"
          v-model="new_password"
          type="password"
          placeholder="********"
          class="w-full rounded-md border border-gray-300 py-1.5 px-2 text-gray-900 text-sm focus:ring-2 focus:ring-green-600 outline-none"
        />
      </div>

      <!-- Confirm Password -->
      <div class="mb-3">
        <label for="confirm_password" class="block text-sm text-gray-700 mb-1">
          Confirm New Password
        </label>
        <input
          id="confirm_password"
          v-model="comfirm_password"
          type="password"
          placeholder="********"
          class="w-full rounded-md border border-gray-300 py-1.5 px-2 text-gray-900 text-sm focus:ring-2 focus:ring-green-600 outline-none"
        />
      </div>

      <!-- Button -->
      <div class="flex justify-end mt-4">
        <button
          @click="resetPassword"
          class="bg-green-700 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 transition-all"
        >
          Reset Password
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { baseUrl } from "~/assets/proxy";
import Spinner from "~/components/Spinner.vue";
import axios from "axios";

const router = useRouter();
const isLoading = ref(true);
const userStats = ref(null);
const old_password = ref("");
const new_password = ref("");
const comfirm_password = ref("");

// Fetch user data
const getUserDash = async () => {
  isLoading.value = true;
  try {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${baseUrl}/dashboard/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    userStats.value = response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  } finally {
    isLoading.value = false;
  }
};

// Reset password
const resetPassword = async () => {
  if (!new_password.value || new_password.value.length < 8) {
    alert("Password must be at least 8 characters.");
    return;
  }

  if (new_password.value !== comfirm_password.value) {
    alert("Passwords do not match.");
    return;
  }

  isLoading.value = true;
  try {
    const token = localStorage.getItem("auth_token");
    await axios.post(
      `${baseUrl}/auth/changePassword`,
      {
        oldPassword: old_password.value,
        newPassword: new_password.value,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    alert("Password updated successfully!");
    old_password.value = "";
    new_password.value = "";
    comfirm_password.value = "";
  } catch (error) {
    console.error("Error resetting password:", error);
    alert("Failed to reset password.");
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => getUserDash());
</script>
