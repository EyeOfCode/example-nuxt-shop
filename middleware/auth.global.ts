// global middleware
export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuth()
  const token = useCookie('token')

  if (token.value) {
    await auth.getUserByToken(token.value)
  }

  // const witchList = ['/auth/login']
  // if (!userStore.isLoggedIn && witchList.includes(to.path)) {
  //   return navigateTo('/')
  // }
})
