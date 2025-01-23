import { ref } from 'vue'
import type { IProduct } from '~/types/product'
import mockProducts from '~/assets/mock/products.json'
import { useProductStore } from '~/stores/useProductStore'

export function useProducts() {
  const products = ref<IProduct[]>([])
  const cart = useProductStore()

  const setProducts = (newProducts: IProduct[]) => {
    products.value = newProducts
  }

  const searchProducts = (query: string) => {
    return mockProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    )
  }

  const getProductById = (id: number) => {
    return products.value.find((product) => product.id === id)
  }

  const addToCart = (product: IProduct, qty: number = 1) => {
    const cartProducts = cart.getCart

    if (cartProducts) {
      const productIndex = cartProducts.findIndex((item) => item.product.id === product.id)
      if (productIndex !== -1) {
        cartProducts[productIndex].quantity += qty
      } else {
        cartProducts.push({
          id: product.id,
          user: 'John Doe',
          product,
          quantity: qty,
          status: 'pending'
        })
      }
    }
  }

  onMounted(() => {
    setProducts(mockProducts)
  })

  return {
    cart,
    products,
    setProducts,
    searchProducts,
    getProductById,
    addToCart
  }
}
