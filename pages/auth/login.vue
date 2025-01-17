<template>
  <div class="bg-white p-8 rounded-lg shadow">
    <h2 class="text-2xl font-bold mb-6">Login</h2>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          v-model="email"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          v-model="password"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        Sign in
      </button>
    </form>
  </div>
</template>

<script setup>
const email = ref('')
const password = ref('')

useHead({
  title: 'Nuxt Shop Login'
})

definePageMeta({
  layout: 'auth'
})

const handleLogin = () => {
  navigateTo('/')
}
</script>
