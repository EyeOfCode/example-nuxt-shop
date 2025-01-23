import { defineStore } from 'pinia'
import type { ICartProduct } from '~/types/product'

export const useProductStore = defineStore('product', {
  state: () => ({
    cart: [] as ICartProduct[]
  }),
  actions: {
    setCart(data: ICartProduct[]) {
      this.cart = data
    }
  },
  getters: {
    getCart: (state) => state.cart
  }
})
