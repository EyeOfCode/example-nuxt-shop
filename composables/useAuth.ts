import { useUserStore } from '~/stores/useUserStore'

export function useAuth() {
  const useUser = useUserStore()

  const getUserByToken = async (token: string) => {
    if (token) {
      // fetch user by token
      useUser.setUser({ name: 'John Doe', email: 'example@example.com' })
      return useUser.getUser
    }
    return null
  }

  const login = (email: string) => {
    useUser.setUser({ name: 'John Doe', email: email })
    const userCookie = useCookie('token')
    userCookie.value = 'token'
  }

  const logout = () => {
    useUser.clearUser()
    const userCookie = useCookie('token')
    userCookie.value = null
  }

  return {
    getUserByToken,
    logout,
    login
  }
}
