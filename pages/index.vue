<template>
  <div class="min-h-screen bg-gray-100">
    <HeroSection />

    <!-- Products Grid -->
    <Product :products="products" />
  </div>
</template>

<script setup>
import { useProducts } from '~~/composables/useProducts'

definePageMeta({
  layout: 'default'
})

const { products } = useProducts()
</script>
