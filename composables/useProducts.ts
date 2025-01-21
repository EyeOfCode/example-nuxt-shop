import { ref } from 'vue'
import type { IProduct } from '~/types/product'
import mockProducts from '~/assets/mock/products.json'

export function useProducts() {
  const products = ref<IProduct[]>([])

  const setProducts = (newProducts: IProduct[]) => {
    products.value = newProducts
  }

  const searchProducts = (query: string) => {
    return products.value.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    )
  }

  const getProductById = (id: number) => {
    return products.value.find((product) => product.id === id)
  }

  onMounted(() => {
    setProducts(mockProducts)
  })

  return {
    products,
    setProducts,
    searchProducts,
    getProductById
  }
}
