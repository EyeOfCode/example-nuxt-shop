<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-2xl font-bold text-gray-900">MyShop</h1>
              <sup>v{{ config.public.version }}</sup>
            </div>
            <!-- Desktop Menu -->
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink
                v-for="item in navItems"
                :key="item.to"
                :to="item.to"
                :class="[
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                  activeRoute === item.to
                    ? 'text-gray-900 border-indigo-500'
                    : 'text-gray-500 hover:text-gray-900 border-transparent hover:border-gray-300'
                ]"
                @click="setActive(item.to)"
              >
                {{ $t(item.key) }}
              </NuxtLink>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Search Modal -->
            <SearchModal :products="products" :search-query="searchQuery" />

            <!-- Cart -->
            <button class="p-2 rounded-full text-gray-500 hover:text-gray-900 relative">
              <span class="sr-only">Cart</span>
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span
                v-if="currentCart > 0"
                class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                >{{ currentCart }}</span
              >
            </button>

            <!-- Language Switcher -->
            <LanguageSwitcher />

            <!-- User Profile -->
            <button class="hidden sm:block p-2 rounded-full text-gray-500 hover:text-gray-900">
              <span class="sr-only">User Profile</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </button>
            <button
              class="sm:hidden ml-4 p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
              @click="isOpen = !isOpen"
            >
              <span class="sr-only">Menu</span>
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                :class="{ hidden: isOpen, block: !isOpen }"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                :class="{ block: isOpen, hidden: !isOpen }"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div class="sm:hidden" :class="{ block: isOpen, hidden: !isOpen }">
          <div class="pt-2 pb-3 space-y-1">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              :class="[
                activeRoute === item.to
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              ]"
              @click="setActive(item.to)"
            >
              {{ $t(item.key) }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useProducts } from '~~/composables/useProducts'
import { useUserStore } from '~~/stores/useUserStore'
import { useAuth } from '~~/composables/useAuth'

const userStore = useUserStore()
const auth = useAuth()
const { products, cart } = useProducts()
const isOpen = ref(false)
const route = useRoute()
const currentCart = ref()

// Runtime configuration
const config = useRuntimeConfig()

// Active route tracking
const activeRoute = ref('/')

// Navigation items
const navItems = ref([
  { to: '/', key: 'home_menu' },
  { to: '/product', key: 'product_menu' }
])

// Function to set the active route
const setActive = (route) => {
  if (route === '/auth/login') {
    auth.logout()
  }
  activeRoute.value = route
}

const normalizePath = (path) => {
  const strippedPath = path.replace(/^\/[a-z]{2}/, '') || '/' // Removes /{lang} prefix
  return strippedPath
}

const searchQuery = (query) => {
  navigateTo(`/product?search=${query}`)
}

const checkLogin = () => {
  navItems.value = navItems.value.filter(
    (item) => item.key !== 'login_menu' && item.key !== 'logout_menu'
  )

  if (!userStore.isLoggedIn) {
    navItems.value = [...navItems.value, { to: '/auth/login', key: 'login_menu' }]
  } else {
    navItems.value = [...navItems.value, { to: '/auth/login', key: 'logout_menu' }]
  }
}

const countCartItems = () => {
  currentCart.value = cart.getCart.length
}

onMounted(() => {
  activeRoute.value = normalizePath(route.path)
  currentCart.value = cart.getCart.length
  checkLogin()
})

watch(
  () => route.path,
  (newPath) => {
    activeRoute.value = normalizePath(newPath)
  },
  { immediate: true }
)

watch(
  () => cart.getCart.length,
  () => {
    countCartItems()
  }
)
</script>
