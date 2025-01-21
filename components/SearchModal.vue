<template>
  <div>
    <!-- Search Trigger Button -->
    <button class="p-2 rounded-full text-gray-500 hover:text-gray-900" @click="isOpen = true">
      <span class="sr-only">{{ $t('search') }}</span>
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>

    <!-- Search Modal -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <!-- Background overlay -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        @click="isOpen = false"
      ></div>

      <!-- Modal panel -->
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
          >
            <!-- Close button -->
            <div class="absolute right-0 top-0 pr-2 pt-2">
              <button
                class="rounded-md bg-white text-gray-400 hover:text-gray-500"
                @click="isOpen = false"
              >
                <span class="sr-only">ปิด</span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Search input -->
            <div class="mt-3">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  class="w-full rounded-md border-gray-300 pl-10 pr-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  :placeholder="$t('search') + '...'"
                  @input="handleSearch"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    class="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <!-- Search results -->
              <div class="mt-4 max-h-96 overflow-y-auto">
                <div v-if="searchResults.length > 0">
                  <div
                    v-for="result in searchResults"
                    :key="result.id"
                    class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                    @click="selectResult(result)"
                  >
                    <div class="flex items-center">
                      <img
                        :src="result.imageSrc"
                        :alt="result.name"
                        class="h-10 w-10 object-cover rounded"
                      />
                      <div class="ml-4">
                        <p class="text-sm font-medium text-gray-900">
                          {{ result.name }}
                        </p>
                        <p class="text-sm text-gray-500">
                          {{ result.price }} {{ $t('currency_bath') }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else-if="searchQuery && !isLoading" class="py-4 text-center text-gray-500">
                  {{ $t('data_not_found') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const isOpen = ref(false)
const searchQuery = ref('')
const searchResults = ref([])
const isLoading = ref(false)

const props = defineProps({
  products: {
    type: Array,
    default: () => [],
    required: true
  },
  searchQuery: {
    type: Function,
    required: true
  }
})

const handleSearch = () => {
  isLoading.value = true
  setTimeout(() => {
    if (searchQuery.value) {
      searchResults.value = props.products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    } else {
      searchResults.value = []
    }
    isLoading.value = false
  }, 300)
}

const selectResult = (result) => {
  props.searchQuery(result.name)
  isOpen.value = false
}

// Watch search query changes
watch(searchQuery, () => {
  handleSearch()
})
</script>
