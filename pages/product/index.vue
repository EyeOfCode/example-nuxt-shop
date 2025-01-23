<template>
  <Product :products="products" />
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useProducts } from '~~/composables/useProducts'
const route = useRoute()

const { products, searchProducts } = useProducts()

onMounted(async () => {
  const queryParam = route.query.search
  if (queryParam) {
    products.value = await searchProducts(queryParam)
  }
})

watch(
  () => route.query.search,
  async (newQuery) => {
    products.value = await searchProducts(newQuery)
  }
)
</script>
