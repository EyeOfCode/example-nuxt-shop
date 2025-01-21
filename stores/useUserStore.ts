import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as { name: string; email: string } | null
  }),
  actions: {
    setUser(userData: { name: string; email: string }) {
      this.user = userData
    },
    clearUser() {
      this.user = null
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.user
  }
})
