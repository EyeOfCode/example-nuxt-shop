<template>
  <Product :products="products" />
</template>

<script setup>
import { useProducts } from '~~/composables/useProducts'

const { products } = useProducts()
</script>
