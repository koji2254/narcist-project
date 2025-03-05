<template>
    <div class="min-h-screen flex flex-col">
      <!-- Header with logo -->
      <header class="bg-white border-b border-gray-200 py-4">
        <div class="container mx-auto px-4 flex items-center">
          <div class="flex items-center">
            <div class="mr-3">
              <img src="@/public/narict logo.jpg" alt="Logo" class="w-12 h-12 rounded-full object-cover" />
            </div>
            <div>
              <h1 class="text-emerald-700 text-xl font-semibold">NARICT</h1>
              <p class="text-gray-600 text-sm">Savings & Loans Portal</p>
            </div>
          </div>
        </div>
      </header>
  
      <!-- Main content -->
      <main class="flex-grow bg-gray-50">
        <div class="container mx-auto px-4 py-12">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <!-- Information section -->
            <div class="space-y-6">
              <h2 class="text-3xl font-bold text-gray-800">Welcome to NARICT Savings & Loans Portal</h2>
              
              <p class="text-gray-600">
                Welcome to the NARICT financial services portal. All services on this portal are restricted,
                hence, only authenticated users can access them. Please login to continue.
              </p>
              
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mt-8">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Key Features</h3>
                
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <div class="bg-emerald-100 p-1 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span class="text-gray-600">Manage your savings with real-time balance tracking</span>
                  </li>
                  <li class="flex items-start">
                    <div class="bg-emerald-100 p-1 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span class="text-gray-600">Request loans with automated interest calculation</span>
                  </li>
                  <li class="flex items-start">
                    <div class="bg-emerald-100 p-1 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span class="text-gray-600">Track repayment schedules and payment history</span>
                  </li>
                  <li class="flex items-start">
                    <div class="bg-emerald-100 p-1 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span class="text-gray-600">Receive notifications for important updates</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <!-- Login form -->
            <div class="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <div class="flex justify-center mb-6">
                <img src="@/public/narict logo.jpg" alt="Logo" class="w-20 h-20 rounded-full object-cover" />
              </div>
              
              <h3 class="text-center text-lg font-medium text-gray-700 mb-6">Already have an account? Login here</h3>
              
              <!-- Alert messages -->
              <div v-if="loginError" class="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
                {{ loginError }}
              </div>
              
              <div v-if="loginSuccess" class="mb-4 p-3 bg-green-100 border border-green-200 text-green-700 rounded-md text-sm">
                {{ loginSuccess }}
              </div>
              
              <form @submit.prevent="handleLogin" class="space-y-5">
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    id="email"
                    v-model="loginForm.email"
                    type="email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div>
                  <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    id="password"
                    v-model="loginForm.password"
                    type="password"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input
                      id="remember-me"
                      v-model="loginForm.rememberMe"
                      type="checkbox"
                      class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <label for="remember-me" class="ml-2 block text-sm text-gray-700">Remember me</label>
                  </div>
                  
                  <div class="text-sm">
                    <a 
                      href="#" 
                      @click.prevent="showForgotPassword = true" 
                      class="font-medium text-emerald-600 hover:text-emerald-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    :disabled="isLoading"
                  >
                    <span v-if="isLoading" class="flex items-center">
                      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                    <span v-else>Login</span>
                  </button>
                </div>
              </form>
              
              <div class="mt-6">
                <p class="text-center text-sm text-gray-600">
                  Need help? Contact <a href="#" class="text-emerald-600 font-medium">support@narict.org</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <!-- Forgot Password Modal -->
      <div v-if="showForgotPassword" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">Reset Password</h3>
            <button 
              @click="showForgotPassword = false" 
              class="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div v-if="forgotPasswordError" class="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
            {{ forgotPasswordError }}
          </div>
          
          <div v-if="forgotPasswordSuccess" class="mb-4 p-3 bg-green-100 border border-green-200 text-green-700 rounded-md text-sm">
            {{ forgotPasswordSuccess }}
          </div>
          
          <p class="text-sm text-gray-600 mb-4">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          
          <form @submit.prevent="handleForgotPassword">
            <div class="mb-4">
              <label for="reset-email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="reset-email"
                v-model="forgotPasswordEmail"
                type="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="showForgotPassword = false"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                :disabled="isLoadingForgotPassword"
              >
                <span v-if="isLoadingForgotPassword" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
                <span v-else>Send Reset Link</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Footer -->
      <footer class="bg-emerald-600 text-white py-6">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="mb-4 md:mb-0">
              <p>Copyright ©2025 NARICT. All Rights Reserved</p>
            </div>
            
            <div class="flex space-x-6">
              <a href="#" class="text-white hover:text-emerald-200">FAQ</a>
              <a href="#" class="text-white hover:text-emerald-200">Help Desk</a>
              <a href="#" class="text-white hover:text-emerald-200">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  import { jwtDecode } from "jwt-decode";
  
  export default {
    name: 'IndexPage',
    data() {
      return {
        loginForm: {
          email: '',
          password: '',
          rememberMe: false
        },
        isLoading: false,
        loginError: '',
        loginSuccess: '',
        
        // Forgot password
        showForgotPassword: false,
        forgotPasswordEmail: '',
        isLoadingForgotPassword: false,
        forgotPasswordError: '',
        forgotPasswordSuccess: '',
        
        // API base URL
        apiBaseUrl: 'https://narict-app.vercel.app/api'
      }
    },
    methods: {
      async handleLogin() {
        // Reset previous messages
        this.loginError = '';
        this.loginSuccess = '';
        
        // Validate form
        if (!this.loginForm.email || !this.loginForm.password) {
          this.loginError = 'Please enter both email and password';
          return;
        }
        
        this.isLoading = true;
        
        try {
          const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.loginForm.email,
              password: this.loginForm.password
            })
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            // Handle different error status codes
            if (response.status === 400) {
              throw new Error('Invalid email or password');
            } else if (response.status === 401) {
              throw new Error('Invalid credentials. Please check your email and password');
            } else {
              throw new Error(data.message || 'Login failed');
            }
          }
  
          // Login successful
          this.loginSuccess = data.message || 'Login successful!';
          
          // Store token in localStorage
          if (data.token) {
            localStorage.setItem('auth_token', data.token);
            
            // Decode the token to get user info (id, role, email)
            const decoded = jwtDecode(data.token);
            
            // Store user info (id, role, email) in localStorage
            localStorage.setItem('user_info', JSON.stringify({
              id: decoded.id,
              role: decoded.role,
              email: decoded.email
            }));
  
            // Redirect to dashboard after successful login
            this.$router.push('/dashboard');
          }
        } catch (error) {
          console.error('Login error:', error);
          this.loginError = error.message || 'An error occurred during login. Please try again.';
        } finally {
          this.isLoading = false;
        }
      },
      
      async handleForgotPassword() {
        // Reset previous messages
        this.forgotPasswordError = '';
        this.forgotPasswordSuccess = '';
        
        // Validate email
        if (!this.forgotPasswordEmail) {
          this.forgotPasswordError = 'Please enter your email address';
          return;
        }
        
        this.isLoadingForgotPassword = true;
        
        try {
          const response = await fetch(`${this.apiBaseUrl}/auth/forgotPassword`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.forgotPasswordEmail
            })
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            if (response.status === 400) {
              throw new Error('Invalid email format');
            } else if (response.status === 404) {
              throw new Error('Email not found in our records');
            } else {
              throw new Error(data.message || 'Failed to send password reset email');
            }
          }
          
          // Request successful
          this.forgotPasswordSuccess = 'Password reset email sent successfully. Please check your inbox.';
          
          // Close the modal after a delay
          setTimeout(() => {
            this.showForgotPassword = false;
            this.forgotPasswordEmail = '';
          }, 3000);
        } catch (error) {
          console.error('Forgot password error:', error);
          this.forgotPasswordError = error.message || 'An error occurred. Please try again.';
        } finally {
          this.isLoadingForgotPassword = false;
        }
      }
    }
  }
  </script>
    
  <style>
  /* Add any additional custom styles here */
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  </style>