<template>
  <Product :products="products" />
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useProducts } from '~~/composables/useProducts'
const route = useRoute()

const { products, searchProducts } = useProducts()

onMounted(() => {
  const queryParam = route.query.search
  if (queryParam) {
    products.value = searchProducts(queryParam)
  }
})

watch(
  () => route.query.search,
  (newQuery) => {
    products.value = searchProducts(newQuery)
  }
)
</script>
