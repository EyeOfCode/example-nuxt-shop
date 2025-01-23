import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuth()
  const token = useCookie('token')

  if (token.value) {
    const user = await auth.getUserByToken(token.value)
    if (user) {
      return navigateTo('/')
    }
  }
})
