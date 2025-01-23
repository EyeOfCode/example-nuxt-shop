<template>
  <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
    <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      <div v-for="product in products" :key="product.id" class="group relative">
        <div
          class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none"
        >
          <img
            :src="product.imageSrc"
            :alt="product.name"
            class="w-full h-full object-center object-cover lg:w-full lg:h-full cursor-pointer"
            @click="handleDetailProduct(product.id)"
          />
        </div>
        <div class="mt-4 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700">
              <p class="cursor-pointer" @click="handleDetailProduct(product.id)">
                {{ product.name }}
              </p>
            </h3>
            <p class="mt-1 text-sm text-gray-500">{{ product.category }}</p>
          </div>
          <p class="text-sm font-medium text-gray-900">{{ product.currency }}{{ product.price }}</p>
        </div>
        <button
          v-if="addToCart"
          class="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          @click="pickUp(product)"
        >
          {{ $t('add_to_cart') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProducts } from '~~/composables/useProducts'

const { addToCart } = useProducts()

defineProps({
  products: {
    type: Array,
    default: () => [],
    required: true
  }
})

const handleDetailProduct = (id) => {
  navigateTo(`/product/${id}`)
}

const pickUp = (product) => {
  addToCart(product, 1)
}
</script>
