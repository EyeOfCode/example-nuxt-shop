<template>
  <div class="bg-white p-8 rounded-lg shadow">
    <h2 class="text-2xl font-bold mb-6">{{ $t('login') }}</h2>
    <form class="space-y-4" @submit.prevent="handleLogin">
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ $t('email') }}</label>
        <input
          v-model="email"
          placeholder="example@example.com"
          type="email"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ $t('password') }}</label>
        <input
          v-model="password"
          type="password"
          placeholder="password"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        {{ $t('sign_in') }}
      </button>
      <button
        type="button"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
        @click="backToHome"
      >
        {{ $t('back') }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const auth = useAuth()
const email = ref('')
const password = ref('')

useHead({
  title: 'Nuxt Shop Login'
})

definePageMeta({
  middleware: ['login'],
  layout: 'auth'
})

const handleLogin = async () => {
  await auth.login(email.value)
  navigateTo('/')
}

const backToHome = () => {
  navigateTo('/')
}
</script>
