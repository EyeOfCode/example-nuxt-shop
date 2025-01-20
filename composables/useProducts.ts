import { ref } from 'vue'
import type { IProduct } from '~/types/product'
import mockProducts from '~/assets/mock/products.json'

export function useProducts() {
  const products = ref<IProduct[]>([])
  const searchQuery = ref('')

  const setProducts = (newProducts: IProduct[]) => {
    products.value = newProducts
  }

  const searchProducts = () => {
    return products.value.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  onMounted(() => {
    setProducts(mockProducts)
  })

  return {
    products,
    searchQuery,
    setProducts,
    searchProducts
  }
}
