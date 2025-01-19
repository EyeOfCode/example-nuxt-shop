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
                to="/"
                class="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium"
              >
                {{ $t('home_menu') }}
              </NuxtLink>
              <NuxtLink
                to="/product"
                class="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium"
              >
                สินค้า
              </NuxtLink>
              <NuxtLink
                to="/category"
                class="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium"
              >
                หมวดหมู่
              </NuxtLink>
            </div>
          </div>

          <div class="flex items-center">
            <SearchModal />
            <button class="ml-4 p-2 rounded-full text-gray-500 hover:text-gray-900 relative">
              <span class="sr-only">ตะกร้าสินค้า</span>
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span
                class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                >2</span
              >
            </button>
            <LanguageSwitcher />
            <!-- Mobile menu button -->
            <button
              class="sm:hidden ml-4 p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
              @click="isOpen = !isOpen"
            >
              <span class="sr-only">เมนู</span>
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

        <!-- Mobile menu -->
        <div class="sm:hidden" :class="{ block: isOpen, hidden: !isOpen }">
          <div class="pt-2 pb-3 space-y-1">
            <NuxtLink
              to="/"
              class="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              {{ $t('home_menu') }}
            </NuxtLink>
            <NuxtLink
              to="/product"
              class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              สินค้า
            </NuxtLink>
            <NuxtLink
              to="/category"
              class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              หมวดหมู่
            </NuxtLink>
            <NuxtLink
              to="/auth/login"
              class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Login
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
const config = useRuntimeConfig()

const isOpen = ref(false)
</script>
