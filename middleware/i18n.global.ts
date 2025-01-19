export default defineNuxtRouteMiddleware((to) => {
  const locale = to.path.split('/')[1]
  if (!['en', 'th'].includes(locale)) {
    return navigateTo(`/th${to.path}`)
  }
})
