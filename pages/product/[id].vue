<template>
  <div class="product-detail-page container mx-auto py-8 bg-white mt-4 rounded-lg">
    <div class="pl-4">
      <p class="cursor-pointer underline" @click="$router.back()">{{ $t('back') }}</p>
    </div>
    <div v-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
      <div class="product-image">
        <img :src="product.imageSrc" :alt="product.name" class="rounded shadow" />
      </div>
      <div class="product-details">
        <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>

        <p class="text-lg text-gray-700 mb-4">{{ product.category }}</p>

        <p class="text-xl font-semibold text-green-600 mb-4">
          {{ product.currency }}{{ formatPrice(product.price) }}
        </p>

        <div class="mb-4">
          <label for="quantity" class="block text-sm font-medium text-gray-700">{{
            $t('quantity')
          }}</label>
          <input
            id="quantity"
            v-model.number="quantity"
            type="number"
            min="1"
            class="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <button
          class="bg-indigo-600 text-white px-6 py-2 rounded shadow hover:bg-indigo-700"
          @click="pickUp"
        >
          {{ $t('add_to_cart') }}
        </button>
      </div>
    </div>
    <div v-else class="p-4">
      <p>{{ $t('data_not_found') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '~~/composables/useProducts'

const { getProductById, addToCart } = useProducts()
const route = useRoute()
const quantity = ref(1)
const product = ref({})

const formatPrice = (price) => {
  if (price) {
    return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

const pickUp = (product) => {
  addToCart(product, quantity.value)
}

onMounted(() => {
  const id = route.params.id
  product.value = getProductById(Number(id))
})

watch(
  () => route.params.id,
  (newId) => {
    product.value = getProductById(newId)
  }
)
</script>
